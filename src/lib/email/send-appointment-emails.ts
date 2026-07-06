import { SITE_CONFIG } from "@/lib/constants";
import { Resend } from "resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function formatAppointmentDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export type ClientEmailPayload = {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  appointmentDate: string;
  priceLabel: string;
  paymentLink?: string | null;
};

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("send-appointment-emails: RESEND_API_KEY not configured");
    return;
  }

  const from =
    readEnv("CONTACT_EMAIL_FROM") ||
    `${SITE_CONFIG.name} <contact@juriste-droit-du-travail.com>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
  });

  if (error) {
    console.error("send-appointment-emails: Resend error:", error.message);
  }
}

/**
 * Email A — Demande reçue, paiement en attente
 */
export async function sendPendingPaymentEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = data.clientName.split(" ")[0] || data.clientName;
  const paymentLinkHtml = data.paymentLink
    ? `<p style="text-align:center;margin:24px 0;">
         <a href="${escapeHtml(data.paymentLink)}"
            style="display:inline-block;background:#8B1A1A;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;">
           Finaliser mon paiement
         </a>
       </p>`
    : "";

  const paymentLinkText = data.paymentLink
    ? `\nFinalisez votre règlement via ce lien :\n${data.paymentLink}\n`
    : "";

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:#8B1A1A;padding:24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:1.35rem;">Demande de rendez-vous reçue</h1>
      </div>
      <div style="padding:28px 32px;background:#fff;border:1px solid #e8e5e0;font-size:0.95rem;line-height:1.7;">
        <p>Bonjour ${escapeHtml(firstName)},</p>
        <p>Votre demande de rendez-vous a bien été reçue.</p>
        <p><strong>Votre créneau ne sera confirmé qu'après validation du paiement.</strong></p>
        <p><strong>Prestation :</strong> ${escapeHtml(data.serviceName)}<br/>
           <strong>Date :</strong> ${escapeHtml(formatAppointmentDate(data.appointmentDate))}<br/>
           <strong>Tarif :</strong> ${escapeHtml(data.priceLabel)}</p>
        ${paymentLinkHtml}
        <p>À bientôt,<br/>Loubna Abouz Manta</p>
      </div>
      <p style="text-align:center;color:#918a7f;font-size:0.75rem;margin:16px 0 0;">
        ${escapeHtml(SITE_CONFIG.name)} — ${escapeHtml(SITE_CONFIG.url)}
      </p>
    </div>
  `.trim();

  const text = [
    `Demande de rendez-vous reçue — paiement en attente`,
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre demande de rendez-vous a bien été reçue.",
    "Votre créneau ne sera confirmé qu'après validation du paiement.",
    "",
    `Prestation : ${data.serviceName}`,
    `Date : ${formatAppointmentDate(data.appointmentDate)}`,
    `Tarif : ${data.priceLabel}`,
    paymentLinkText,
    "À bientôt,",
    "Loubna Abouz Manta",
  ].join("\n");

  await sendEmail(
    data.clientEmail,
    "Demande de rendez-vous reçue — paiement en attente",
    html,
    text
  );
}

/**
 * Email B — Rendez-vous confirmé (après paiement)
 */
export async function sendConfirmedEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = data.clientName.split(" ")[0] || data.clientName;

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:#2d7a3e;padding:24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:1.35rem;">Rendez-vous confirmé</h1>
      </div>
      <div style="padding:28px 32px;background:#fff;border:1px solid #e8e5e0;font-size:0.95rem;line-height:1.7;">
        <p>Bonjour ${escapeHtml(firstName)},</p>
        <p>Votre rendez-vous est confirmé.</p>
        <div style="background:#f8f7f5;border-radius:8px;padding:20px;margin:20px 0;">
          <p style="margin:4px 0;"><strong>Prestation :</strong> ${escapeHtml(data.serviceName)}</p>
          <p style="margin:4px 0;"><strong>Date / créneau :</strong> ${escapeHtml(formatAppointmentDate(data.appointmentDate))}</p>
          <p style="margin:4px 0;"><strong>Montant réglé :</strong> ${escapeHtml(data.priceLabel)}</p>
        </div>
        <p>Merci de préparer les éléments utiles à l'échange.</p>
        <p>À bientôt,<br/>Loubna Abouz Manta</p>
      </div>
      <p style="text-align:center;color:#918a7f;font-size:0.75rem;margin:16px 0 0;">
        ${escapeHtml(SITE_CONFIG.name)} — ${escapeHtml(SITE_CONFIG.url)}
      </p>
    </div>
  `.trim();

  const text = [
    "Rendez-vous confirmé",
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre rendez-vous est confirmé.",
    "",
    "Récapitulatif :",
    `- Prestation : ${data.serviceName}`,
    `- Date / créneau : ${formatAppointmentDate(data.appointmentDate)}`,
    `- Montant réglé : ${data.priceLabel}`,
    "",
    "Merci de préparer les éléments utiles à l'échange.",
    "",
    "À bientôt,",
    "Loubna Abouz Manta",
  ].join("\n");

  await sendEmail(
    data.clientEmail,
    "Rendez-vous confirmé",
    html,
    text
  );
}

/**
 * Email C — Paiement échoué ou expiré
 */
export async function sendFailedPaymentEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = data.clientName.split(" ")[0] || data.clientName;

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:#8B1A1A;padding:24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:1.35rem;">Paiement non confirmé</h1>
      </div>
      <div style="padding:28px 32px;background:#fff;border:1px solid #e8e5e0;font-size:0.95rem;line-height:1.7;">
        <p>Bonjour ${escapeHtml(firstName)},</p>
        <p>Votre demande de rendez-vous n'a pas encore pu être confirmée, car le paiement n'a pas été validé.</p>
        <p>Vous pouvez reprendre votre demande ou nous contacter si besoin.</p>
        <p>À bientôt,<br/>Loubna Abouz Manta</p>
      </div>
      <p style="text-align:center;color:#918a7f;font-size:0.75rem;margin:16px 0 0;">
        ${escapeHtml(SITE_CONFIG.name)} — ${escapeHtml(SITE_CONFIG.url)}
      </p>
    </div>
  `.trim();

  const text = [
    "Paiement non confirmé",
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre demande de rendez-vous n'a pas encore pu être confirmée, car le paiement n'a pas été validé.",
    "Vous pouvez reprendre votre demande ou nous contacter si besoin.",
    "",
    "À bientôt,",
    "Loubna Abouz Manta",
  ].join("\n");

  await sendEmail(
    data.clientEmail,
    "Paiement non confirmé",
    html,
    text
  );
}
