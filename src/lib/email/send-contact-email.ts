import type { ContactAttachment } from "@/lib/contact/attachments";
import { SITE_CONFIG } from "@/lib/constants";
import { Resend } from "resend";

export const CONTACT_EMAIL_SUBJECT = "Demande reçu via site";

export type ContactEmailPayload = {
  nom: string;
  prenom: string;
  email: string;
  tel?: string | null;
  typeDemande?: string | null;
  statut?: string | null;
  sujet: string;
  message: string;
  attachments?: ContactAttachment[];
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmailHtml(data: ContactEmailPayload): string {
  const tel = data.tel?.trim() || "Non renseigné";
  const typeDemande = data.typeDemande?.trim() || "Non précisé";
  const statut = data.statut?.trim() || "Non précisé";

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #8B1A1A; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 1.35rem; font-weight: 600;">Nouvelle demande via le site</h1>
      </div>
      <div style="padding: 28px 32px; background: #ffffff; border: 1px solid #e8e5e0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #625d58; width: 140px; vertical-align: top;"><strong>Nom</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(data.prenom)} ${escapeHtml(data.nom)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #625d58; vertical-align: top;"><strong>Email</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #625d58; vertical-align: top;"><strong>Téléphone</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(tel)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #625d58; vertical-align: top;"><strong>Statut</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(statut)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #625d58; vertical-align: top;"><strong>Type de demande</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(typeDemande)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #625d58; vertical-align: top;"><strong>Sujet</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(data.sujet)}</td>
          </tr>
        </table>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e8e5e0;" />
        <h2 style="color: #8B1A1A; font-size: 1.05rem; margin: 0 0 12px;">Message</h2>
        <p style="margin: 0; line-height: 1.75; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        ${
          data.attachments?.length
            ? `<p style="margin: 16px 0 0; font-size: 0.9rem; color: #625d58;"><strong>Pièces jointes :</strong> ${data.attachments.map((a) => escapeHtml(a.filename)).join(", ")}</p>`
            : ""
        }
      </div>
      <p style="text-align: center; color: #918a7f; font-size: 0.75rem; margin: 16px 0 0;">
        ${escapeHtml(SITE_CONFIG.name)} — ${escapeHtml(SITE_CONFIG.url)}
      </p>
    </div>
  `.trim();
}

function buildContactEmailText(data: ContactEmailPayload): string {
  return [
    "Nouvelle demande via le site",
    "",
    `Nom : ${data.prenom} ${data.nom}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.tel?.trim() || "Non renseigné"}`,
    `Statut : ${data.statut?.trim() || "Non précisé"}`,
    `Type de demande : ${data.typeDemande?.trim() || "Non précisé"}`,
    `Sujet : ${data.sujet}`,
    "",
    "Message :",
    data.message,
    ...(data.attachments?.length
      ? ["", `Pièces jointes : ${data.attachments.map((a) => a.filename).join(", ")}`]
      : []),
  ].join("\n");
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

export async function sendContactEmail(data: ContactEmailPayload): Promise<void> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    throw new Error("RESEND_API_KEY");
  }

  const to = readEnv("CONTACT_EMAIL_TO") || SITE_CONFIG.email;
  const from =
    readEnv("CONTACT_EMAIL_FROM") ||
    `${SITE_CONFIG.name} <contact@juriste-droit-du-travail.com>`;

  if (!from.includes("@")) {
    throw new Error(
      "CONTACT_EMAIL_FROM invalide — utilisez des guillemets, ex. \"Nom <onboarding@resend.dev>\""
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: CONTACT_EMAIL_SUBJECT,
    html: buildContactEmailHtml(data),
    text: buildContactEmailText(data),
    attachments: data.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
    })),
  });

  if (error) {
    throw new Error(error.message || "Échec de l'envoi de l'email");
  }
}
