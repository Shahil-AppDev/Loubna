import { parseContactAttachments } from "@/lib/contact/attachments";
import { sendAppointmentEmail } from "@/lib/email/send-appointment-email";
import { sendPendingPaymentEmail } from "@/lib/email/send-appointment-emails";
import { query } from "@/lib/db/postgres";
import { requireAdmin } from "@/lib/auth/require-admin";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type CreateAppointmentBody = {
  client_name: string;
  client_email: string;
  client_phone: string | null;
  service_id: string;
  appointment_date: string;
  duration_minutes: number;
  notes: string | null;
};

async function parseCreateAppointmentRequest(
  request: NextRequest
): Promise<
  | {
      ok: true;
      body: CreateAppointmentBody;
      attachments: Awaited<ReturnType<typeof parseContactAttachments>>["attachments"];
    }
  | { ok: false; response: NextResponse }
> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const { attachments, error: attachError } = await parseContactAttachments(formData);
    if (attachError) {
      return {
        ok: false,
        response: NextResponse.json({ error: attachError }, { status: 400 }),
      };
    }

    const duration = Number(formData.get("duration_minutes"));
    const body: CreateAppointmentBody = {
      client_name: String(formData.get("client_name") ?? "").trim(),
      client_email: String(formData.get("client_email") ?? "").trim().toLowerCase(),
      client_phone: formData.get("client_phone")
        ? String(formData.get("client_phone")).trim()
        : null,
      service_id: String(formData.get("service_id") ?? "").trim(),
      appointment_date: String(formData.get("appointment_date") ?? "").trim(),
      duration_minutes: Number.isFinite(duration) ? duration : 0,
      notes: formData.get("notes") ? String(formData.get("notes")).trim() : null,
    };

    return { ok: true, body, attachments };
  }

  let json: Record<string, unknown>;
  try {
    json = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 }),
    };
  }

  const body: CreateAppointmentBody = {
    client_name: String(json.client_name ?? "").trim(),
    client_email: String(json.client_email ?? "").trim().toLowerCase(),
    client_phone: json.client_phone ? String(json.client_phone).trim() : null,
    service_id: String(json.service_id ?? "").trim(),
    appointment_date: String(json.appointment_date ?? "").trim(),
    duration_minutes: Number(json.duration_minutes) || 0,
    notes: json.notes ? String(json.notes).trim() : null,
  };

  return { ok: true, body, attachments: [] };
}

// GET - Récupérer tous les rendez-vous (admin only)
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("payment_status");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    let sql = `
      SELECT 
        a.*,
        row_to_json(s.*) as service
      FROM appointments a
      LEFT JOIN services_rdv s ON a.service_id = s.id
      WHERE 1=1
    `;
    const params: unknown[] = [];
    let paramIndex = 1;

    if (status) {
      sql += ` AND a.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (paymentStatus) {
      sql += ` AND a.payment_status = $${paramIndex}`;
      params.push(paymentStatus);
      paramIndex++;
    }

    if (startDate) {
      sql += ` AND a.appointment_date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      sql += ` AND a.appointment_date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    sql += ` ORDER BY a.appointment_date DESC`;

    const result = await query(sql, params);

    return NextResponse.json({ appointments: result.rows });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Créer un nouveau rendez-vous
export async function POST(request: NextRequest) {
  try {
    const parsed = await parseCreateAppointmentRequest(request);
    if (!parsed.ok) return parsed.response;

    const {
      client_name,
      client_email,
      client_phone,
      service_id,
      appointment_date,
      duration_minutes,
      notes,
    } = parsed.body;

    if (!client_name || !client_email || !service_id || !appointment_date || duration_minutes === undefined || duration_minutes === null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const checkResult = await query(
      `SELECT * FROM appointments
       WHERE appointment_date = $1 AND status IN ('confirmed', 'paid', 'completed')`,
      [appointment_date]
    );

    if (checkResult.rows.length > 0) {
      return NextResponse.json(
        { error: "Ce créneau est déjà réservé" },
        { status: 409 }
      );
    }

    const serviceResult = await query(
      `SELECT name, price_cents FROM services_rdv WHERE id = $1`,
      [service_id]
    );
    const service = serviceResult.rows[0] as
      | { name: string; price_cents: number }
      | undefined;

    let notesToStore = notes;
    if (parsed.attachments.length > 0) {
      const list = parsed.attachments.map((a) => a.filename).join(", ");
      const suffix = `Pièces jointes : ${list}`;
      notesToStore = notesToStore ? `${notesToStore}\n\n${suffix}` : suffix;
    }

    const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();

    const insertResult = await query(
      `INSERT INTO appointments
       (client_name, client_email, client_phone, service_id, appointment_date, duration_minutes, notes, status, payment_status, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending_payment', 'pending', $8)
       RETURNING *`,
      [
        client_name,
        client_email,
        client_phone,
        service_id,
        appointment_date,
        duration_minutes,
        notesToStore,
        expiresAt,
      ]
    );

    const appointment = insertResult.rows[0];
    const priceLabel = service
      ? `${(service.price_cents / 100).toFixed(2)} €`
      : "Non renseigné";

    // Email admin (non bloquant)
    try {
      await sendAppointmentEmail({
        clientName: client_name,
        clientEmail: client_email,
        clientPhone: client_phone,
        serviceName: service?.name || "Prestation",
        appointmentDate: appointment_date,
        durationMinutes: duration_minutes,
        priceLabel,
        notes: notesToStore,
        attachments: parsed.attachments,
      });
    } catch (emailError) {
      console.error("Appointment API — admin email (non bloquant):", emailError);
    }

    // Email client — paiement en attente (non bloquant)
    try {
      await sendPendingPaymentEmail({
        clientName: client_name,
        clientEmail: client_email,
        serviceName: service?.name || "Prestation",
        appointmentDate: appointment_date,
        priceLabel,
      });
    } catch (emailError) {
      console.error("Appointment API — client email (non bloquant):", emailError);
    }

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
