import {
  getSumUpCheckoutByReference,
} from "@/lib/sumup";
import { query, getClient } from "@/lib/db/postgres";
import {
  sendDigitalDeliveryEmail,
  sendDigitalFailedEmail,
  sendDigitalAdminEmail,
} from "@/lib/email/send-digital-emails";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

const TOKEN_VALIDITY_HOURS = 72;
const MAX_DOWNLOADS = 3;

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  if (!orderId) {
    return NextResponse.json({ error: "orderId requis." }, { status: 400 });
  }

  // ─── Load order from DB ───────────────────────────────────
  let order;
  try {
    const result = await query(
      `SELECT o.*, p.name as product_name, p.slug as product_slug
       FROM digital_orders o
       LEFT JOIN digital_products p ON o.product_id = p.id
       WHERE o.id = $1`,
      [orderId]
    );
    order = result.rows[0];
  } catch (dbErr) {
    console.error("Digital order status — DB error:", dbErr);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  // ─── If already fulfilled, return status ──────────────────
  if (order.status === "fulfilled" || order.status === "paid") {
    // Check if there's an active download token
    const tokenResult = await query(
      `SELECT expires_at, max_downloads, download_count, revoked_at
       FROM download_tokens
       WHERE order_id = $1 AND revoked_at IS NULL
       ORDER BY created_at DESC LIMIT 1`,
      [orderId]
    );
    const token = tokenResult.rows[0];

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      productName: order.product_name,
      amount: order.amount,
      currency: order.currency,
      customerEmail: order.customer_email,
      hasDownloadToken: !!token && new Date(token.expires_at) > new Date(),
      tokenExpiresAt: token?.expires_at || null,
      downloadsRemaining: token
        ? Math.max(0, token.max_downloads - token.download_count)
        : 0,
    });
  }

  // ─── If pending, check SumUp ──────────────────────────────
  if (order.status === "pending_payment" && order.provider_reference) {
    try {
      const checkout = await getSumUpCheckoutByReference(order.provider_reference);

      if (!checkout) {
        return NextResponse.json({
          orderId: order.id,
          status: "pending_payment",
          productName: order.product_name,
          amount: order.amount,
          currency: order.currency,
        });
      }

      if (checkout.status === "PAID") {
        // ─── Verify amount and currency ────────────────────
        if (Math.abs(checkout.amount - order.amount) > 0.01) {
          console.error("Digital order — amount mismatch:", checkout.amount, order.amount);
          return NextResponse.json({
            orderId: order.id,
            status: "failed",
            productName: order.product_name,
            amount: order.amount,
            currency: order.currency,
          });
        }

        if (checkout.currency !== order.currency) {
          console.error("Digital order — currency mismatch:", checkout.currency, order.currency);
          return NextResponse.json({
            orderId: order.id,
            status: "failed",
            productName: order.product_name,
            amount: order.amount,
            currency: order.currency,
          });
        }

        // ─── Fulfill order: generate token + send email ────
        await fulfillOrder(order, checkout.transactions?.[0]?.transaction_code || null);

        // Reload to get updated status
        const updated = await query(
          `SELECT o.*, p.name as product_name FROM digital_orders o
           LEFT JOIN digital_products p ON o.product_id = p.id
           WHERE o.id = $1`,
          [orderId]
        );
        const updatedOrder = updated.rows[0];

        const tokenResult = await query(
          `SELECT expires_at, max_downloads, download_count FROM download_tokens
           WHERE order_id = $1 AND revoked_at IS NULL
           ORDER BY created_at DESC LIMIT 1`,
          [orderId]
        );
        const token = tokenResult.rows[0];

        return NextResponse.json({
          orderId: updatedOrder.id,
          status: updatedOrder.status,
          productName: updatedOrder.product_name,
          amount: updatedOrder.amount,
          currency: updatedOrder.currency,
          customerEmail: updatedOrder.customer_email,
          hasDownloadToken: !!token && new Date(token.expires_at) > new Date(),
          tokenExpiresAt: token?.expires_at || null,
          downloadsRemaining: token
            ? Math.max(0, token.max_downloads - token.download_count)
            : 0,
        });
      } else if (checkout.status === "FAILED" || checkout.status === "EXPIRED") {
        // Update order status
        await query(
          `UPDATE digital_orders SET status = $1, updated_at = NOW() WHERE id = $2`,
          [checkout.status === "FAILED" ? "failed" : "expired", orderId]
        );

        // Send failed email (idempotent: only if not already sent)
        try {
          await sendDigitalFailedEmail({
            orderId: order.id,
            customerName: `${order.customer_first_name} ${order.customer_last_name}`,
            customerEmail: order.customer_email,
            productName: order.product_name,
            amount: order.amount,
            currency: order.currency,
            checkoutReference: order.provider_reference,
          });
        } catch (emailErr) {
          console.error("Digital order status — failed email (non bloquant):", emailErr);
        }

        return NextResponse.json({
          orderId: order.id,
          status: checkout.status === "FAILED" ? "failed" : "expired",
          productName: order.product_name,
          amount: order.amount,
          currency: order.currency,
        });
      }

      // Still pending
      return NextResponse.json({
        orderId: order.id,
        status: "pending_payment",
        productName: order.product_name,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (err) {
      console.error("Digital order status — SumUp check:", err);
      return NextResponse.json({
        orderId: order.id,
        status: "pending_payment",
        productName: order.product_name,
        amount: order.amount,
        currency: order.currency,
      });
    }
  }

  // ─── Other statuses ───────────────────────────────────────
  return NextResponse.json({
    orderId: order.id,
    status: order.status,
    productName: order.product_name,
    amount: order.amount,
    currency: order.currency,
  });
}

// ─── Fulfill order: generate token + send delivery email ───
type FulfillOrderInput = {
  id: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  provider_reference: string | null;
  product_name?: string;
};

export async function fulfillOrder(
  order: FulfillOrderInput,
  transactionId: string | null
): Promise<void> {
  const client = await getClient();
  try {
    await client.query("BEGIN");

    // Update order to paid + fulfilled
    await client.query(
      `UPDATE digital_orders
       SET status = 'fulfilled', paid_at = NOW(),
           provider_transaction_id = COALESCE($1, provider_transaction_id),
           updated_at = NOW()
       WHERE id = $2`,
      [transactionId, order.id]
    );

    // Generate secure token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + TOKEN_VALIDITY_HOURS * 60 * 60 * 1000);

    await client.query(
      `INSERT INTO download_tokens (order_id, token_hash, expires_at, max_downloads)
       VALUES ($1, $2, $3, $4)`,
      [order.id, tokenHash, expiresAt, MAX_DOWNLOADS]
    );

    // Audit log
    await client.query(
      `INSERT INTO digital_audit_log (order_id, action, details)
       VALUES ($1, 'order_fulfilled', $2::jsonb)`,
      [order.id, JSON.stringify({ transaction_id: transactionId })]
    );

    await client.query("COMMIT");

    // Send delivery email with download link
    const downloadLink = `${process.env.NEXT_PUBLIC_SITE_URL}/telechargement/duerp?token=${rawToken}`;
    try {
      await sendDigitalDeliveryEmail({
        orderId: order.id,
        customerName: `${order.customer_first_name} ${order.customer_last_name}`,
        customerEmail: order.customer_email,
        productName: order.product_name || "Modèle DUERP",
        amount: order.amount,
        currency: order.currency,
        checkoutReference: order.provider_reference || "",
        downloadLink,
        downloadExpiresAt: expiresAt.toISOString(),
        maxDownloads: MAX_DOWNLOADS,
        downloadsRemaining: MAX_DOWNLOADS,
      });

      // Admin notification
      await sendDigitalAdminEmail({
        orderId: order.id,
        customerName: `${order.customer_first_name} ${order.customer_last_name}`,
        customerEmail: order.customer_email,
        productName: order.product_name || "Modèle DUERP",
        amount: order.amount,
        currency: order.currency,
        checkoutReference: order.provider_reference || "",
        status: "fulfilled",
        transactionId,
      });
    } catch (emailErr) {
      console.error("fulfillOrder — email (non bloquant):", emailErr);
    }
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
