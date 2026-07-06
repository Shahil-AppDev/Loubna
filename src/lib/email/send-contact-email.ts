import type { ContactAttachment } from "@/lib/contact/attachments";
import { Resend } from "resend";
import {
  EMAIL_COLORS,
  EMAIL_SITE_URL,
  EmailCard,
  EmailInfoTable,
  EmailLayout,
  buildTextVersion,
  escapeHtml,
  getFirstName,
  readEnv,
} from "./template";

export const CONTACT_EMAIL_SUBJECT = "Nouvelle demande via le site";

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

function buildContactAdminHtml(data: ContactEmailPayload): string {
  const tel = data.tel?.trim() || "Non renseigné";
  const typeDemande = data.typeDemande?.trim() || "Non précisé";
  const statut = data.statut?.trim() || "Non précisé";

  const recapTable = EmailInfoTable([
    { label: "Nom", value: `${data.prenom} ${data.nom}` },
    { label: "Email", value: data.email },
    { label: "Téléphone", value: tel },
    { label: "Statut", value: statut },
    { label: "Type de demande", value: typeDemande },
    { label: "Sujet", value: data.sujet },
  ]);

  const body = `
    <p style="margin:0 0 16px;font-size:16px;font-weight:600;">Nouvelle demande via le formulaire de contact</p>
    ${EmailCard(recapTable)}
    <p style="margin:0 0 12px;"><strong>Message :</strong></p>
    <p style="margin:0 0 16px;white-space:pre-wrap;font-size:14px;line-height:1.7;color:${EMAIL_COLORS.text};">${escapeHtml(data.message)}</p>
    ${
      data.attachments?.length
        ? `<p style="margin:0 0 16px;font-size:14px;color:${EMAIL_COLORS.textMuted};"><strong>Pièces jointes :</strong> ${data.attachments.map((a) => escapeHtml(a.filename)).join(", ")}</p>`
        : ""
    }
  `;

  return EmailLayout(
    "Une nouvelle demande vient d'être enregistrée sur le site.",
    body,
    { headerTitle: "Nouvelle demande de contact" }
  );
}

function buildContactAdminText(data: ContactEmailPayload): string {
  return [
    "Nouvelle demande de contact",
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

function buildContactAutoReplyHtml(data: ContactEmailPayload): string {
  const firstName = getFirstName(data.prenom);

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Je vous confirme la bonne réception de votre message.</p>
    <p style="margin:0 0 16px;">Votre demande sera relue avec attention afin de vous apporter une réponse adaptée à votre situation, dans le cadre de mon activité d'information, d'accompagnement et d'orientation en droit du travail.</p>
    <p style="margin:0 0 8px;">Si votre situation nécessite une intervention relevant d'une profession réglementée, une orientation vers un professionnel compétent pourra être envisagée.</p>
  `;

  return EmailLayout(
    "Votre demande a été reçue et sera traitée avec attention.",
    body,
    { headerTitle: "Votre message a bien été transmis" }
  );
}

function buildContactAutoReplyText(data: ContactEmailPayload): string {
  const firstName = getFirstName(data.prenom);
  return buildTextVersion([
    "Votre message a bien été transmis",
    "",
    `Bonjour ${firstName},`,
    "",
    "Je vous confirme la bonne réception de votre message.",
    "Votre demande sera relue avec attention afin de vous apporter une réponse adaptée à votre situation, dans le cadre de mon activité d'information, d'accompagnement et d'orientation en droit du travail.",
    "",
    "Si votre situation nécessite une intervention relevant d'une profession réglementée, une orientation vers un professionnel compétent pourra être envisagée.",
  ]);
}

export async function sendContactEmail(data: ContactEmailPayload): Promise<void> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    throw new Error("RESEND_API_KEY");
  }

  const to = readEnv("CONTACT_EMAIL_TO") || "contact@juriste-droit-du-travail.com";
  const from =
    readEnv("CONTACT_EMAIL_FROM") ||
    `Loubna Abouz Manta <contact@juriste-droit-du-travail.com>`;

  if (!from.includes("@")) {
    throw new Error(
      "CONTACT_EMAIL_FROM invalide — utilisez des guillemets, ex. \"Nom <onboarding@resend.dev>\""
    );
  }

  const resend = new Resend(apiKey);

  // 1. Email admin
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: CONTACT_EMAIL_SUBJECT,
    html: buildContactAdminHtml(data),
    text: buildContactAdminText(data),
    attachments: data.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
    })),
  });

  if (error) {
    throw new Error(error.message || "Échec de l'envoi de l'email");
  }

  // 2. Auto-réponse visiteur (non bloquant)
  try {
    await resend.emails.send({
      from,
      to: [data.email],
      subject: "Votre message a bien été transmis",
      html: buildContactAutoReplyHtml(data),
      text: buildContactAutoReplyText(data),
    });
  } catch (autoReplyError) {
    console.error("Contact auto-reply (non bloquant):", autoReplyError);
  }
}
