import {
  getSumUpCheckoutByReference,
  getSumUpCheckoutById,
  mapSumUpStatusToPaymentStatus,
  mapSumUpStatusToAppointmentStatus,
} from "@/lib/sumup";
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

      if (appointmentId) {
        await query(
          `UPDATE appointments
           SET status = $1, payment_status = $2, sumup_transaction_id = $3
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
           SET status = $1, payment_status = $2, sumup_transaction_id = $3
           WHERE sumup_checkout_reference = $4`,
          [appointmentStatus, paymentStatus, transactionId, checkoutReference]
        );
      }
    } catch (dbErr) {
      console.error("SumUp status — DB update (non bloquant):", dbErr);
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
