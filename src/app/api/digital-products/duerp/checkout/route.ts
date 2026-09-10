import { createSumUpCheckout, getSumUpHostedCheckoutUrl } from "@/lib/sumup";
import { query } from "@/lib/db/postgres";
import { sendDigitalPendingEmail } from "@/lib/email/send-digital-emails";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { isFeatureEnabled } from "@/lib/feature-flags";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DUERP_SLUG = "modele-duerp";

export async function POST(request: NextRequest) {
  const salesEnabled = isFeatureEnabled(process.env.DIGITAL_DUERP_SALES_ENABLED);
  if (!salesEnabled) {
    return NextResponse.json(
      { error: "La vente de documents numériques n'est pas encore disponible." },
      { status: 503 }
    );
  }

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rate = checkRateLimit(`duerp-checkout:${ip}`, 5, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const acceptTerms = Boolean(body.acceptTerms);
  const acceptWithdrawalWaiver = Boolean(body.acceptWithdrawalWaiver);

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Prénom, nom et e-mail sont requis." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Adresse e-mail invalide." },
      { status: 400 }
    );
  }

  if (!acceptTerms) {
    return NextResponse.json(
      { error: "Vous devez accepter les conditions de vente." },
      { status: 400 }
    );
  }

  if (!acceptWithdrawalWaiver) {
    return NextResponse.json(
      { error: "Vous devez confirmer la livraison immédiate et la renonciation au droit de rétractation." },
      { status: 400 }
    );
  }

  // ─── Load product from DB (server-side price) ─────────────
  let product;
  try {
    const result = await query(
      `SELECT * FROM digital_products WHERE slug = $1 AND is_active = true`,
      [DUERP_SLUG]
    );
    product = result.rows[0];
  } catch (dbErr) {
    console.error("Digital checkout — DB error:", dbErr);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }

  if (!product) {
    return NextResponse.json(
      { error: "Produit introuvable ou inactif." },
      { status: 404 }
    );
  }

  // ─── Use server-side price from DB (never trust frontend) ─
  const amount = Number(product.price_amount);
  const currency = product.currency || "EUR";

  if (!Number.isFinite(amount) || amount <= 0) {
    console.error("Digital checkout — invalid price_amount for product", product.id);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }

  // ─── Create order in DB ───────────────────────────────────
  let orderId: string;
  try {
    const orderResult = await query(
      `INSERT INTO digital_orders
         (product_id, customer_first_name, customer_last_name, customer_email,
          amount, currency, status, payment_provider)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending_payment', 'sumup')
       RETURNING id`,
      [product.id, firstName, lastName, email, amount, currency]
    );
    orderId = orderResult.rows[0].id;
  } catch (dbErr) {
    console.error("Digital checkout — order creation:", dbErr);
    return NextResponse.json({ error: "Erreur lors de la création de la commande." }, { status: 500 });
  }

  // ─── Create SumUp checkout ────────────────────────────────
  const checkoutReference = `DUERP-${orderId.replace(/-/g, "").slice(0, 12).toUpperCase()}`;
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/documents/modele-duerp/confirmation?order_id=${orderId}&checkout_reference=${checkoutReference}`;

  let checkout;
  try {
    checkout = await createSumUpCheckout({
      checkoutReference,
      amount,
      currency,
      description: "Modèle DUERP à compléter — téléchargement PDF",
      redirectUrl,
    });
  } catch (sumupErr) {
    console.error("Digital checkout — SumUp error:", sumupErr);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement." },
      { status: 502 }
    );
  }

  // ─── Save checkout info in order ──────────────────────────
  try {
    await query(
      `UPDATE digital_orders
       SET provider_checkout_id = $1, provider_reference = $2
       WHERE id = $3`,
      [checkout.id, checkoutReference, orderId]
    );
  } catch (dbErr) {
    console.error("Digital checkout — update order (non bloquant):", dbErr);
  }

  // ─── Send pending payment email ───────────────────────────
  try {
    await sendDigitalPendingEmail({
      orderId,
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      productName: product.name,
      amount,
      currency,
      checkoutReference,
      paymentLink: getSumUpHostedCheckoutUrl(checkout),
    });
  } catch (emailErr) {
    console.error("Digital checkout — email (non bloquant):", emailErr);
  }

  return NextResponse.json({
    orderId,
    checkoutId: checkout.id,
    checkoutReference,
    url: getSumUpHostedCheckoutUrl(checkout),
  });
}
