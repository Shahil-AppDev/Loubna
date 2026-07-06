import {
  getSumUpCheckoutByReference,
  getSumUpCheckoutById,
  mapSumUpStatusToPaymentStatus,
  mapSumUpStatusToAppointmentStatus,
} from "@/lib/sumup";
import { sendConfirmedEmail, sendFailedPaymentEmail } from "@/lib/email/send-appointment-emails";
import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkoutReference = searchParams.get("checkout_reference");
  const checkoutId = searchParams.get("checkout_id");
  const appointmentId = searchParams.get("appointment_id");

  if (!checkoutReference && !checkoutId) {
    return NextResponse.json(
      { error: "checkout_reference ou checkout_id requis." },
      { status: 400 }
    );
  }

  // --- Récupérer le checkout SumUp ---
  let checkout;
  try {
    if (checkoutReference) {
      checkout = await getSumUpCheckoutByReference(checkoutReference);
    } else if (checkoutId) {
      checkout = await getSumUpCheckoutById(checkoutId!);
    }
  } catch (err) {
    console.error("SumUp status — API fetch:", err);
    return NextResponse.json(
      { error: "Impossible de vérifier le statut du paiement." },
      { status: 502 }
    );
  }

  if (!checkout) {
    return NextResponse.json(
      { error: "Checkout introuvable." },
      { status: 404 }
    );
  }

  const paymentStatus = mapSumUpStatusToPaymentStatus(checkout.status);
  const appointmentStatus = mapSumUpStatusToAppointmentStatus(checkout.status);

  // --- Mettre à jour la base si paiement confirmé ---
  if (checkout.status === "PAID" && (appointmentId || checkoutReference)) {
    try {
      const transactionId =
        checkout.transactions?.[0]?.transaction_code || null;

      // Récupérer l'état précédent pour idempotence email
      const prevResult = await query(
        `SELECT a.status, a.client_name, a.client_email, a.appointment_date,
                s.name as service_name, s.price_cents
         FROM appointments a
         LEFT JOIN services_rdv s ON a.service_id = s.id
         WHERE ${appointmentId ? 'a.id = $1' : 'a.sumup_checkout_reference = $1'}`,
        [appointmentId || checkoutReference]
      );
      const prev = prevResult.rows[0];
      const wasConfirmed = prev?.status === 'confirmed' || prev?.status === 'paid';

      if (appointmentId) {
        await query(
          `UPDATE appointments
           SET status = $1, payment_status = $2, sumup_transaction_id = $3,
               confirmed_at = CASE WHEN $1 = 'confirmed' THEN COALESCE(confirmed_at, NOW()) ELSE confirmed_at END
           WHERE id = $4`,
          [appointmentStatus, paymentStatus, transactionId, appointmentId]
        );

        // Enregistrement dans la table payments (idempotent via ON CONFLICT)
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
            JSON.stringify({ sumup_status: checkout.status }),
          ]
        );
      } else if (checkoutReference) {
        await query(
          `UPDATE appointments
           SET status = $1, payment_status = $2, sumup_transaction_id = $3,
               confirmed_at = CASE WHEN $1 = 'confirmed' THEN COALESCE(confirmed_at, NOW()) ELSE confirmed_at END
           WHERE sumup_checkout_reference = $4`,
          [appointmentStatus, paymentStatus, transactionId, checkoutReference]
        );
      }

      // Email client — confirmation (idempotent)
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
            recapLink: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/rendez-vous/confirmation?checkout_reference=${checkoutReference}`,
          });
        } catch (emailErr) {
          console.error("SumUp status — confirmation email (non bloquant):", emailErr);
        }
      }
    } catch (dbErr) {
      console.error("SumUp status — DB update (non bloquant):", dbErr);
    }
  } else if ((checkout.status === "FAILED" || checkout.status === "EXPIRED") && (appointmentId || checkoutReference)) {
    // Email client — paiement échoué
    try {
      const prevResult = await query(
        `SELECT a.status, a.client_name, a.client_email, a.appointment_date,
                s.name as service_name, s.price_cents
         FROM appointments a
         LEFT JOIN services_rdv s ON a.service_id = s.id
         WHERE ${appointmentId ? 'a.id = $1' : 'a.sumup_checkout_reference = $1'}`,
        [appointmentId || checkoutReference]
      );
      const prev = prevResult.rows[0];
      const wasConfirmed = prev?.status === 'confirmed' || prev?.status === 'paid';

      if (!wasConfirmed && prev) {
        await sendFailedPaymentEmail({
          clientName: prev.client_name,
          clientEmail: prev.client_email,
          serviceName: prev.service_name || "Prestation",
          appointmentDate: prev.appointment_date,
          priceLabel: prev.price_cents
            ? `${(prev.price_cents / 100).toFixed(2)} €`
            : "Non renseigné",
        });
      }
    } catch (emailErr) {
      console.error("SumUp status — failed email (non bloquant):", emailErr);
    }
  }

  return NextResponse.json({
    checkoutId: checkout.id,
    checkoutReference: checkout.checkout_reference,
    status: checkout.status,
    paymentStatus,
    appointmentStatus,
    amount: checkout.amount,
    currency: checkout.currency,
    transactionId: checkout.transactions?.[0]?.transaction_code || null,
  });
}
