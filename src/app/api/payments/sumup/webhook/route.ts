/**
 * SumUp Webhook endpoint
 * SumUp envoie des événements POST vers cette URL.
 * Configurer dans SumUp Dashboard > Webhooks :
 *   URL : https://www.juriste-droit-du-travail.com/api/payments/sumup/webhook
 */
import {
  getSumUpCheckoutByReference,
  mapSumUpStatusToPaymentStatus,
  mapSumUpStatusToAppointmentStatus,
} from "@/lib/sumup";
import { sendConfirmedEmail, sendFailedPaymentEmail } from "@/lib/email/send-appointment-emails";
import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type SumUpWebhookPayload = {
  event_type: string;
  checkout_reference?: string;
  id?: string;
  merchant_code?: string;
  status?: string;
  timestamp?: string;
};

export async function POST(request: NextRequest) {
  let payload: SumUpWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  console.log("SumUp webhook received:", payload.event_type, payload.checkout_reference);

  // Optionnel : vérifier le secret webhook si configuré
  const webhookSecret = process.env.SUMUP_WEBHOOK_SECRET;
  if (webhookSecret) {
    const providedSecret = request.headers.get("x-sumup-webhook-secret") ||
      request.headers.get("x-webhook-secret");
    if (providedSecret !== webhookSecret) {
      console.error("SumUp webhook — invalid secret");
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  const { event_type, checkout_reference } = payload;

  if (!checkout_reference) {
    return NextResponse.json({ received: true });
  }

  // Récupérer les infos à jour depuis l'API SumUp
  try {
    const checkout = await getSumUpCheckoutByReference(checkout_reference);
    if (!checkout) {
      console.warn("SumUp webhook — checkout not found:", checkout_reference);
      return NextResponse.json({ received: true });
    }

    const paymentStatus = mapSumUpStatusToPaymentStatus(checkout.status);
    const appointmentStatus = mapSumUpStatusToAppointmentStatus(checkout.status);
    const transactionId = checkout.transactions?.[0]?.transaction_code || null;

    // Mettre à jour le rendez-vous
    const prevResult = await query(
      `SELECT status, payment_status, client_name, client_email, appointment_date,
              s.name as service_name, s.price_cents
       FROM appointments a
       LEFT JOIN services_rdv s ON a.service_id = s.id
       WHERE a.sumup_checkout_reference = $1`,
      [checkout_reference]
    );
    const prev = prevResult.rows[0];
    const wasConfirmed = prev?.status === 'confirmed' || prev?.status === 'paid';

    await query(
      `UPDATE appointments
       SET status = $1, payment_status = $2, sumup_transaction_id = $3,
           confirmed_at = CASE WHEN $1 = 'confirmed' THEN COALESCE(confirmed_at, NOW()) ELSE confirmed_at END
       WHERE sumup_checkout_reference = $4`,
      [appointmentStatus, paymentStatus, transactionId, checkout_reference]
    );

    // Enregistrement paiement (idempotent)
    if (checkout.status === "PAID") {
      const aptResult = await query(
        `SELECT id FROM appointments WHERE sumup_checkout_reference = $1`,
        [checkout_reference]
      );
      const appointmentId = aptResult.rows[0]?.id;

      if (appointmentId) {
        await query(
          `INSERT INTO payments
             (appointment_id, amount_cents, provider, checkout_reference, checkout_id,
              transaction_id, status, metadata)
           VALUES ($1, $2, 'sumup', $3, $4, $5, 'succeeded', $6::jsonb)
           ON CONFLICT (checkout_reference) DO NOTHING`,
          [
            appointmentId,
            Math.round(checkout.amount * 100),
            checkout.checkout_reference,
            checkout.id,
            transactionId,
            JSON.stringify({ event_type, sumup_status: checkout.status }),
          ]
        );
      }

      // Email client — confirmation (idempotent: seulement si pas déjà confirmé)
      if (!wasConfirmed && prev) {
        try {
          await sendConfirmedEmail({
            clientName: prev.client_name,
            clientEmail: prev.client_email,
            serviceName: prev.service_name || "Prestation",
            appointmentDate: prev.appointment_date,
            priceLabel: prev.price_cents
              ? `${(prev.price_cents / 100).toFixed(2)} €`
              : "Non renseigné",
            recapLink: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/rendez-vous/confirmation?checkout_reference=${prev.sumup_checkout_reference || ""}`,
          });
        } catch (emailErr) {
          console.error("SumUp webhook — confirmation email (non bloquant):", emailErr);
        }
      }
    } else if ((checkout.status === "FAILED" || checkout.status === "EXPIRED") && prev) {
      // Email client — paiement échoué (idempotent: seulement si pas déjà confirmé)
      if (!wasConfirmed) {
        try {
          await sendFailedPaymentEmail({
            clientName: prev.client_name,
            clientEmail: prev.client_email,
            serviceName: prev.service_name || "Prestation",
            appointmentDate: prev.appointment_date,
            priceLabel: prev.price_cents
              ? `${(prev.price_cents / 100).toFixed(2)} €`
              : "Non renseigné",
          });
        } catch (emailErr) {
          console.error("SumUp webhook — failed email (non bloquant):", emailErr);
        }
      }
    }

    console.log(
      `SumUp webhook processed: ${checkout_reference} → ${checkout.status}`
    );
  } catch (err) {
    console.error("SumUp webhook — processing error:", err);
    // On répond 200 pour éviter que SumUp retente indéfiniment
  }

  return NextResponse.json({ received: true });
}
