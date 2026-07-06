import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/appointments/[id]/status
 * Public endpoint — returns appointment + payment status without admin auth.
 * Used by the confirmation page and client status checks.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query(
      `SELECT
         a.id,
         a.status,
         a.payment_status,
         a.appointment_date,
         a.sumup_checkout_id,
         a.sumup_checkout_reference,
         a.sumup_transaction_id,
         a.confirmed_at,
         a.expires_at,
         a.created_at,
         s.name as service_name,
         s.price_cents
       FROM appointments a
       LEFT JOIN services_rdv s ON a.service_id = s.id
       WHERE a.id = $1`,
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Rendez-vous introuvable." },
        { status: 404 }
      );
    }

    const row = result.rows[0];

    return NextResponse.json({
      appointment_id: row.id,
      status: row.status,
      payment_status: row.payment_status,
      appointment_date: row.appointment_date,
      service_name: row.service_name,
      price_cents: row.price_cents,
      confirmed_at: row.confirmed_at,
      expires_at: row.expires_at,
      checkout_id: row.sumup_checkout_id,
      checkout_reference: row.sumup_checkout_reference,
    });
  } catch (error) {
    console.error("Error fetching appointment status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
