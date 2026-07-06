import type { ContactAttachment } from "@/lib/contact/attachments";
import { Resend } from "resend";
import {
  EMAIL_COLORS,
  EMAIL_SITE_URL,
  EmailButton,
  EmailCard,
  EmailInfoTable,
  EmailLayout,
  escapeHtml,
  formatAppointmentDate,
  formatAppointmentDateOnly,
  formatAppointmentTimeOnly,
  readEnv,
} from "./template";

export const APPOINTMENT_EMAIL_SUBJECT = "Nouvelle demande de rendez-vous";

export type AppointmentEmailPayload = {
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  serviceName: string;
  appointmentDate: string;
  durationMinutes: number;
  priceLabel: string;
  notes?: string | null;
  paymentStatus?: string;
  attachments?: ContactAttachment[];
};

export async function sendAppointmentEmail(
  data: AppointmentEmailPayload
): Promise<void> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    throw new Error("RESEND_API_KEY");
  }

  const to = readEnv("CONTACT_EMAIL_TO") || "contact@juriste-droit-du-travail.com";
  const from =
    readEnv("CONTACT_EMAIL_FROM") ||
    `Loubna Abouz Manta <contact@juriste-droit-du-travail.com>`;

  const tel = data.clientPhone?.trim() || "Non renseigné";
  const notes = data.notes?.trim() || "Aucun message";
  const paymentStatus = data.paymentStatus || "pending";

  const parts = data.clientName.split(" ");
  const prenom = parts[0] || data.clientName;
  const nom = parts.slice(1).join(" ") || "—";

  const recapTable = EmailInfoTable([
    { label: "Nom", value: nom },
    { label: "Prénom", value: prenom },
    { label: "Email", value: data.clientEmail },
    { label: "Téléphone", value: tel },
    { label: "Prestation", value: data.serviceName },
    { label: "Date souhaitée", value: formatAppointmentDateOnly(data.appointmentDate) },
    { label: "Heure souhaitée", value: formatAppointmentTimeOnly(data.appointmentDate) },
    { label: "Durée", value: `${data.durationMinutes} min` },
    { label: "Montant", value: data.priceLabel },
    { label: "Statut du paiement", value: paymentStatus },
  ]);

  const adminButton = EmailButton(`${EMAIL_SITE_URL}/admin/appointments`, "Ouvrir le backoffice");

  const body = `
    <p style="margin:0 0 16px;font-size:16px;font-weight:600;">Nouvelle demande de rendez-vous</p>
    ${EmailCard(recapTable)}
    <p style="margin:0 0 12px;"><strong>Message :</strong></p>
    <p style="margin:0 0 16px;white-space:pre-wrap;font-size:14px;line-height:1.7;color:${EMAIL_COLORS.text};">${escapeHtml(notes)}</p>
    ${
      data.attachments?.length
        ? `<p style="margin:0 0 16px;font-size:14px;color:${EMAIL_COLORS.textMuted};"><strong>Pièces jointes :</strong> ${data.attachments.map((a) => escapeHtml(a.filename)).join(", ")}</p>`
        : ""
    }
    ${adminButton}
    <p style="margin:16px 0 0;padding:12px 16px;background:#FFF3CD;border:1px solid #FFE69C;border-radius:6px;font-size:13px;color:#856404;">Le rendez-vous ne doit pas être considéré comme confirmé tant que le statut du paiement n'est pas “paid”.</p>
  `;

  const html = EmailLayout(
    "Une nouvelle demande vient d'être enregistrée sur le site.",
    body,
    { headerTitle: "Nouvelle demande de rendez-vous" }
  );

  const text = [
    "Nouvelle demande de rendez-vous",
    "",
    "Informations client :",
    `- Nom : ${nom}`,
    `- Prénom : ${prenom}`,
    `- Email : ${data.clientEmail}`,
    `- Téléphone : ${tel}`,
    `- Prestation : ${data.serviceName}`,
    `- Date souhaitée : ${formatAppointmentDateOnly(data.appointmentDate)}`,
    `- Heure souhaitée : ${formatAppointmentTimeOnly(data.appointmentDate)}`,
    `- Durée : ${data.durationMinutes} min`,
    `- Montant : ${data.priceLabel}`,
    `- Statut du paiement : ${paymentStatus}`,
    "",
    "Message :",
    notes,
    ...(data.attachments?.length
      ? ["", `Pièces jointes : ${data.attachments.map((a) => a.filename).join(", ")}`]
      : []),
    "",
    `Backoffice : ${EMAIL_SITE_URL}/admin/appointments`,
    "",
    "Le rendez-vous ne doit pas être considéré comme confirmé tant que le statut du paiement n'est pas \"paid\".",
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
