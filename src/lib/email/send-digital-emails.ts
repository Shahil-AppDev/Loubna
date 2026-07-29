import { Resend } from "resend";
import {
  EMAIL_COLORS,
  EMAIL_SITE_URL,
  EmailButton,
  EmailCard,
  EmailInfoTable,
  EmailLayout,
  buildTextVersion,
  escapeHtml,
  getFirstName,
  readEnv,
} from "./template";

export type DigitalOrderEmailPayload = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: number;
  currency: string;
  checkoutReference: string;
  paymentLink?: string | null;
  downloadLink?: string | null;
  downloadExpiresAt?: string | null;
  maxDownloads?: number;
  downloadsRemaining?: number;
};

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("send-digital-emails: RESEND_API_KEY not configured");
    return;
  }

  const from =
    readEnv("CONTACT_EMAIL_FROM") ||
    `Loubna Abouz Manta <contact@juriste-droit-du-travail.com>`;

  const resend = new Resend(apiKey);
  await resend.emails.send({ from, to, subject, html, text });
}

// ─── EMAIL 1: Pending payment ──────────────────────────────
export async function sendDigitalPendingEmail(
  data: DigitalOrderEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.customerName);
  const amountLabel = `${data.amount.toFixed(2)} €`;

  const payButton = data.paymentLink
    ? EmailButton(data.paymentLink, "Finaliser le paiement")
    : "";

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Votre commande du <strong>${escapeHtml(data.productName)}</strong> a bien été enregistrée.</p>
    <p style="margin:0 0 16px;">Le document sera disponible au téléchargement dès confirmation de votre paiement de <strong>${amountLabel}</strong>.</p>
    <p style="margin:0 0 16px;">Tant que le paiement n'est pas confirmé, aucun lien de téléchargement actif ne sera délivré.</p>
    ${payButton}
  `;

  const html = EmailLayout(
    "Votre commande est en attente de paiement.",
    body,
    { headerTitle: "Commande en attente", headerColor: EMAIL_COLORS.warning }
  );

  const text = buildTextVersion([
    "Votre commande est en attente de paiement",
    "",
    `Bonjour ${firstName},`,
    "",
    `Votre commande du ${data.productName} a bien été enregistrée.`,
    `Le document sera disponible au téléchargement dès confirmation de votre paiement de ${amountLabel}.`,
    "Tant que le paiement n'est pas confirmé, aucun lien de téléchargement actif ne sera délivré.",
    "",
    data.paymentLink ? `Finaliser le paiement : ${data.paymentLink}` : "",
  ].filter(Boolean));

  await sendEmail(data.customerEmail, `Votre commande « ${data.productName} » est en attente de paiement`, html, text);
}

// ─── EMAIL 2: Payment confirmed + delivery ─────────────────
export async function sendDigitalDeliveryEmail(
  data: DigitalOrderEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.customerName);
  const amountLabel = `${data.amount.toFixed(2)} €`;
  const expiry = data.downloadExpiresAt
    ? new Date(data.downloadExpiresAt).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })
    : "72 heures";
  const remaining = data.downloadsRemaining ?? 3;

  const downloadButton = data.downloadLink
    ? EmailButton(data.downloadLink, `Télécharger « ${data.productName} »`)
    : "";

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Votre paiement de <strong>${amountLabel}</strong> a bien été confirmé.</p>
    <p style="margin:0 0 16px;">Votre <strong>${escapeHtml(data.productName)}</strong> est désormais disponible au téléchargement.</p>
    ${EmailCard(`
      <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:${EMAIL_COLORS.bordeaux};text-transform:uppercase;letter-spacing:1px;">Informations de téléchargement</p>
      ${EmailInfoTable([
        { label: "Lien valable jusqu'au", value: expiry },
        { label: "Téléchargements restants", value: String(remaining) },
        { label: "Montant réglé", value: amountLabel },
      ])}
    `)}
    ${downloadButton}
    <p style="margin:16px 0 0;font-size:13px;color:${EMAIL_COLORS.textMuted};">Conservez cet e-mail précieusement : il contient votre lien de téléchargement sécurisé. Le modèle doit être adapté à l'activité réelle de votre entreprise.</p>
  `;

  const html = EmailLayout(
    `Votre ${escapeHtml(data.productName)} est prêt à être téléchargé.`,
    body,
    { headerTitle: "Votre document est prêt", headerColor: EMAIL_COLORS.success }
  );

  const text = buildTextVersion([
    `Votre ${data.productName} est prêt à être téléchargé`,
    "",
    `Bonjour ${firstName},`,
    "",
    `Votre paiement de ${amountLabel} a bien été confirmé.`,
    `Votre ${data.productName} est désormais disponible au téléchargement.`,
    "",
    `Lien valable jusqu'au : ${expiry}`,
    `Téléchargements restants : ${remaining}`,
    "",
    data.downloadLink ? `Télécharger : ${data.downloadLink}` : "",
    "",
    "Conservez cet e-mail précieusement. Le modèle doit être adapté à l'activité réelle de votre entreprise.",
  ].filter(Boolean));

  await sendEmail(data.customerEmail, `Votre ${data.productName} est prêt à être téléchargé`, html, text);
}

// ─── EMAIL 3: Payment failed ───────────────────────────────
export async function sendDigitalFailedEmail(
  data: DigitalOrderEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.customerName);
  const amountLabel = `${data.amount.toFixed(2)} €`;

  const retryButton = data.paymentLink
    ? EmailButton(data.paymentLink, "Reprendre le paiement")
    : "";

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Le paiement de votre commande n'a pas pu être confirmé.</p>
    <p style="margin:0 0 16px;">Aucun téléchargement n'a donc été activé.</p>
    ${retryButton}
  `;

  const html = EmailLayout(
    "Le paiement de votre commande n'a pas pu être confirmé.",
    body,
    { headerTitle: "Paiement non confirmé", headerColor: EMAIL_COLORS.error }
  );

  const text = buildTextVersion([
    `Votre commande « ${data.productName} » n'a pas encore été délivrée`,
    "",
    `Bonjour ${firstName},`,
    "",
    "Le paiement de votre commande n'a pas pu être confirmé.",
    "Aucun téléchargement n'a donc été activé.",
    "",
    data.paymentLink ? `Reprendre le paiement : ${data.paymentLink}` : "",
  ].filter(Boolean));

  await sendEmail(data.customerEmail, `Votre commande « ${data.productName} » n'a pas encore été délivrée`, html, text);
}

// ─── EMAIL ADMIN: New sale ─────────────────────────────────
export async function sendDigitalAdminEmail(
  data: DigitalOrderEmailPayload & { status: string; transactionId?: string | null }
): Promise<void> {
  const adminEmail = readEnv("CONTACT_EMAIL_TO") || "louamjuristeconseil@gmail.com";
  const amountLabel = `${data.amount.toFixed(2)} €`;

  const body = `
    <p style="margin:0 0 16px;">Une nouvelle vente de document numérique a été enregistrée.</p>
    ${EmailCard(`
      ${EmailInfoTable([
        { label: "Commande", value: data.orderId },
        { label: "Produit", value: data.productName },
        { label: "Client", value: data.customerName },
        { label: "E-mail", value: data.customerEmail },
        { label: "Montant", value: amountLabel },
        { label: "Statut", value: data.status },
        { label: "Référence SumUp", value: data.checkoutReference },
        { label: "Transaction", value: data.transactionId || "N/A" },
      ])}
    `)}
  `;

  const html = EmailLayout(
    "Nouvelle vente de document numérique.",
    body,
    { headerTitle: "Nouvelle vente document", headerColor: EMAIL_COLORS.bordeaux }
  );

  const text = buildTextVersion([
    `Nouvelle vente — ${data.productName}`,
    "",
    `Commande : ${data.orderId}`,
    `Produit : ${data.productName}`,
    `Client : ${data.customerName}`,
    `E-mail : ${data.customerEmail}`,
    `Montant : ${amountLabel}`,
    `Statut : ${data.status}`,
    `Référence SumUp : ${data.checkoutReference}`,
    `Transaction : ${data.transactionId || "N/A"}`,
  ]);

  await sendEmail(adminEmail, `Nouvelle vente — ${data.productName}`, html, text);
}
