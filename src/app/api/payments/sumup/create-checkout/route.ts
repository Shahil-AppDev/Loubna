import {
  buildCheckoutReference,
  createSumUpCheckout,
  getSumUpHostedCheckoutUrl,
} from "@/lib/sumup";
import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 }
    );
  }

  const { appointment_id, service_id } = body;

  if (!appointment_id || !service_id) {
    return NextResponse.json(
      { error: "appointment_id et service_id sont requis." },
      { status: 400 }
    );
  }

  // --- Récupérer le rendez-vous et son service ---
  let aptResult;
  try {
    aptResult = await query(
      `SELECT a.*, row_to_json(s.*) as service
       FROM appointments a
       LEFT JOIN services_rdv s ON a.service_id = s.id
       WHERE a.id = $1`,
      [appointment_id]
    );
  } catch (dbErr) {
    console.error("SumUp create-checkout — DB fetch:", dbErr);
    return NextResponse.json(
      { error: "Erreur base de données." },
      { status: 500 }
    );
  }

  if (aptResult.rows.length === 0) {
    return NextResponse.json(
      { error: "Rendez-vous introuvable." },
      { status: 404 }
    );
  }

  const appointment = aptResult.rows[0] as {
    id: string;
    client_email: string;
    client_name: string;
    service: { name: string; description: string | null; price_cents: number } | null;
  };

  if (!appointment.service) {
    return NextResponse.json(
      { error: "Service introuvable." },
      { status: 404 }
    );
  }

  const amountEuros = appointment.service.price_cents / 100;
  const checkoutReference = buildCheckoutReference(String(appointment_id));
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/rendez-vous/confirmation?checkout_reference=${checkoutReference}&appointment_id=${appointment_id}`;

  // --- Créer le checkout SumUp (hosted checkout) ---
  let checkout;
  try {
    checkout = await createSumUpCheckout({
      checkoutReference,
      amount: amountEuros,
      description: appointment.service.name,
      redirectUrl,
    });
  } catch (sumupErr) {
    const msg = sumupErr instanceof Error ? sumupErr.message : "unknown";
    console.error("SumUp create-checkout — API:", msg);
    const isConfig =
      msg.includes("SUMUP_API_KEY") || msg.includes("SUMUP_MERCHANT_CODE");
    return NextResponse.json(
      {
        error: isConfig
          ? "Paiement non configuré sur le serveur."
          : `Erreur SumUp : ${msg}`,
      },
      { status: 502 }
    );
  }

  const hostedUrl = getSumUpHostedCheckoutUrl(checkout);

  // --- Stocker la référence checkout dans appointments ---
  try {
    await query(
      `UPDATE appointments
       SET sumup_checkout_id = $1, sumup_checkout_reference = $2
       WHERE id = $3`,
      [checkout.id, checkoutReference, appointment_id]
    );
  } catch (dbErr) {
    // Non bloquant : le paiement peut quand même se faire
    console.error("SumUp create-checkout — DB update (non bloquant):", dbErr);
  }

  return NextResponse.json({
    checkoutId: checkout.id,
    checkoutReference,
    url: hostedUrl,
  });
}
