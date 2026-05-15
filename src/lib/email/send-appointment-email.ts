import type { ContactAttachment } from "@/lib/contact/attachments";
import { SITE_CONFIG } from "@/lib/constants";
import { Resend } from "resend";

export const APPOINTMENT_EMAIL_SUBJECT = "Nouveau rendez-vous via site";

export type AppointmentEmailPayload = {
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  serviceName: string;
  appointmentDate: string;
  durationMinutes: number;
  priceLabel: string;
  notes?: string | null;
  attachments?: ContactAttachment[];
};

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

export async function sendAppointmentEmail(
  data: AppointmentEmailPayload
): Promise<void> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    throw new Error("RESEND_API_KEY");
  }

  const to = readEnv("CONTACT_EMAIL_TO") || SITE_CONFIG.email;
  const from =
    readEnv("CONTACT_EMAIL_FROM") ||
    `${SITE_CONFIG.name} <contact@juriste-droit-du-travail.com>`;

  const tel = data.clientPhone?.trim() || "Non renseigné";
  const notes = data.notes?.trim() || "Aucun message";

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #8B1A1A; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 1.35rem;">Nouveau rendez-vous</h1>
      </div>
      <div style="padding: 28px 32px; background: #ffffff; border: 1px solid #e8e5e0; font-size: 0.95rem; line-height: 1.7;">
        <p><strong>Client :</strong> ${escapeHtml(data.clientName)}</p>
        <p><strong>Email :</strong> <a href="mailto:${escapeHtml(data.clientEmail)}">${escapeHtml(data.clientEmail)}</a></p>
        <p><strong>Téléphone :</strong> ${escapeHtml(tel)}</p>
        <p><strong>Prestation :</strong> ${escapeHtml(data.serviceName)}</p>
        <p><strong>Date :</strong> ${escapeHtml(formatAppointmentDate(data.appointmentDate))}</p>
        <p><strong>Durée :</strong> ${data.durationMinutes} min</p>
        <p><strong>Tarif :</strong> ${escapeHtml(data.priceLabel)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap; margin: 0 0 12px;">${escapeHtml(notes)}</p>
        ${
          data.attachments?.length
            ? `<p><strong>Pièces jointes :</strong> ${data.attachments.map((a) => escapeHtml(a.filename)).join(", ")}</p>`
            : ""
        }
      </div>
      <p style="text-align: center; color: #918a7f; font-size: 0.75rem; margin: 16px 0 0;">
        ${escapeHtml(SITE_CONFIG.name)} — ${escapeHtml(SITE_CONFIG.url)}
      </p>
    </div>
  `.trim();

  const text = [
    "Nouveau rendez-vous via le site",
    "",
    `Client : ${data.clientName}`,
    `Email : ${data.clientEmail}`,
    `Téléphone : ${tel}`,
    `Prestation : ${data.serviceName}`,
    `Date : ${formatAppointmentDate(data.appointmentDate)}`,
    `Durée : ${data.durationMinutes} min`,
    `Tarif : ${data.priceLabel}`,
    "",
    "Message :",
    notes,
    ...(data.attachments?.length
      ? ["", `Pièces jointes : ${data.attachments.map((a) => a.filename).join(", ")}`]
      : []),
  ].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.clientEmail,
    subject: APPOINTMENT_EMAIL_SUBJECT,
    html,
    text,
    attachments: data.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
    })),
  });

  if (error) {
    throw new Error(error.message || "Échec de l'envoi de l'email");
  }
}
