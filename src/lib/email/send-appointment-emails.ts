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
  formatAppointmentDateOnly,
  formatAppointmentTimeOnly,
  getFirstName,
  readEnv,
} from "./template";

export type ClientEmailPayload = {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  appointmentDate: string;
  priceLabel: string;
  paymentLink?: string | null;
  recapLink?: string | null;
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
    `Loubna Abouz Manta <contact@juriste-droit-du-travail.com>`;

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

export async function sendPendingPaymentEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.clientName);

  const recapTable = EmailInfoTable([
    { label: "Prestation", value: data.serviceName },
    { label: "Date", value: formatAppointmentDateOnly(data.appointmentDate) },
    { label: "Heure", value: formatAppointmentTimeOnly(data.appointmentDate) },
    { label: "Montant", value: data.priceLabel },
  ]);

  const paymentButton = data.paymentLink
    ? EmailButton(data.paymentLink, "Finaliser mon paiement")
    : "";

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Je vous remercie pour votre confiance.</p>
    <p style="margin:0 0 16px;">Votre demande de rendez-vous a bien été enregistrée.</p>
    <p style="margin:0 0 16px;">Afin de confirmer définitivement votre créneau, il reste une dernière étape : la validation de votre règlement.</p>
    <p style="margin:0 0 16px;">Dès réception de votre paiement, vous recevrez automatiquement un e-mail confirmant votre rendez-vous ainsi qu'un récapitulatif complet.</p>
    <p style="margin:0 0 8px;"><strong>Tant que le paiement n'est pas confirmé, votre rendez-vous reste en attente et n'est pas définitivement réservé.</strong></p>
    ${recapTable}
    ${paymentButton}
    <p style="margin:16px 0 0;font-size:14px;color:${EMAIL_COLORS.textMuted};">Si vous rencontrez la moindre difficulté lors du paiement, vous pouvez me contacter directement.</p>
  `;

  const html = EmailLayout(
    "Votre demande est enregistrée, le rendez-vous sera confirmé après validation du paiement.",
    body,
    { headerTitle: "Votre demande de rendez-vous" }
  );

  const text = buildTextVersion([
    "Votre demande de rendez-vous a bien été enregistrée",
    "",
    `Bonjour ${firstName},`,
    "",
    "Je vous remercie pour votre confiance.",
    "Votre demande de rendez-vous a bien été enregistrée.",
    "",
    "Afin de confirmer définitivement votre créneau, il reste une dernière étape : la validation de votre règlement.",
    "Dès réception de votre paiement, vous recevrez automatiquement un e-mail confirmant votre rendez-vous ainsi qu'un récapitulatif complet.",
    "",
    "Tant que le paiement n'est pas confirmé, votre rendez-vous reste en attente et n'est pas définitivement réservé.",
    "",
    `Prestation : ${data.serviceName}`,
    `Date : ${formatAppointmentDateOnly(data.appointmentDate)}`,
    `Heure : ${formatAppointmentTimeOnly(data.appointmentDate)}`,
    `Montant : ${data.priceLabel}`,
    "",
    data.paymentLink ? `Finalisez votre règlement : ${data.paymentLink}` : "",
    "",
    "Si vous rencontrez la moindre difficulté lors du paiement, vous pouvez me contacter directement.",
  ].filter(Boolean));

  await sendEmail(
    data.clientEmail,
    "Votre demande de rendez-vous a bien été enregistrée",
    html,
    text
  );
}

export async function sendConfirmedEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.clientName);

  const recapTable = EmailInfoTable([
    { label: "Nom", value: data.clientName },
    { label: "Date", value: formatAppointmentDateOnly(data.appointmentDate) },
    { label: "Heure", value: formatAppointmentTimeOnly(data.appointmentDate) },
    { label: "Prestation", value: data.serviceName },
    { label: "Montant réglé", value: data.priceLabel },
  ]);

  const recapButton = data.recapLink
    ? EmailButton(data.recapLink, "Accéder au récapitulatif", "outline")
    : "";

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Je vous remercie.</p>
    <p style="margin:0 0 16px;">Votre paiement a bien été confirmé.</p>
    <p style="margin:0 0 16px;"><strong>Votre rendez-vous est désormais définitivement réservé.</strong></p>
    ${EmailCard(`
      <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:${EMAIL_COLORS.bordeaux};text-transform:uppercase;letter-spacing:1px;">Récapitulatif</p>
      ${recapTable}
    `)}
    <p style="margin:0 0 16px;">Avant notre échange, je vous invite à préparer tous les documents utiles à la compréhension de votre situation : courriers, contrats, échanges, décisions, justificatifs ou tout autre élément lié à votre demande.</p>
    <p style="margin:0 0 8px;">Cela me permettra de disposer d'une vision claire de votre situation dès notre premier entretien.</p>
    ${recapButton}
    <p style="margin:16px 0 0;">Je vous remercie pour votre confiance.</p>
  `;

  const html = EmailLayout(
    "Votre paiement a bien été confirmé et votre rendez-vous est désormais réservé.",
    body,
    { headerTitle: "Votre rendez-vous est confirmé", headerColor: EMAIL_COLORS.success }
  );

  const text = buildTextVersion([
    "Votre rendez-vous est confirmé",
    "",
    `Bonjour ${firstName},`,
    "",
    "Je vous remercie.",
    "Votre paiement a bien été confirmé.",
    "Votre rendez-vous est désormais définitivement réservé.",
    "",
    "Récapitulatif :",
    `- Nom : ${data.clientName}`,
    `- Date : ${formatAppointmentDateOnly(data.appointmentDate)}`,
    `- Heure : ${formatAppointmentTimeOnly(data.appointmentDate)}`,
    `- Prestation : ${data.serviceName}`,
    `- Montant réglé : ${data.priceLabel}`,
    "",
    "Avant notre échange, je vous invite à préparer tous les documents utiles à la compréhension de votre situation : courriers, contrats, échanges, décisions, justificatifs ou tout autre élément lié à votre demande.",
    "",
    "Cela me permettra de disposer d'une vision claire de votre situation dès notre premier entretien.",
    "",
    data.recapLink ? `Accéder au récapitulatif : ${data.recapLink}` : "",
    "",
    "Je vous remercie pour votre confiance.",
  ].filter(Boolean));

  await sendEmail(
    data.clientEmail,
    "Votre rendez-vous est confirmé",
    html,
    text
  );
}

export async function sendFailedPaymentEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.clientName);

  const retryButton = data.paymentLink
    ? EmailButton(data.paymentLink, "Reprendre le paiement")
    : "";

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Votre demande de rendez-vous a bien été enregistrée.</p>
    <p style="margin:0 0 16px;">En revanche, le paiement n'a pas encore pu être validé.</p>
    <p style="margin:0 0 16px;"><strong>Aucun créneau n'a donc été définitivement réservé à ce stade.</strong></p>
    <p style="margin:0 0 8px;">Vous pouvez reprendre votre règlement en cliquant sur le bouton ci-dessous.</p>
    ${retryButton}
    <p style="margin:16px 0 0;font-size:14px;color:${EMAIL_COLORS.textMuted};">Si le problème persiste, vous pouvez me contacter afin de vérifier la situation.</p>
  `;

  const html = EmailLayout(
    "Le paiement n'a pas été confirmé, votre rendez-vous n'est pas encore réservé.",
    body,
    { headerTitle: "Votre rendez-vous est toujours en attente", headerColor: EMAIL_COLORS.bordeaux }
  );

  const text = buildTextVersion([
    "Votre rendez-vous est toujours en attente",
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre demande de rendez-vous a bien été enregistrée.",
    "En revanche, le paiement n'a pas encore pu être validé.",
    "Aucun créneau n'a donc été définitivement réservé à ce stade.",
    "",
    "Vous pouvez reprendre votre règlement en cliquant sur le lien ci-dessous.",
    "",
    data.paymentLink ? `Reprendre le paiement : ${data.paymentLink}` : "",
    "",
    "Si le problème persiste, vous pouvez me contacter afin de vérifier la situation.",
  ].filter(Boolean));

  await sendEmail(
    data.clientEmail,
    "Votre rendez-vous est toujours en attente",
    html,
    text
  );
}

export async function sendCancelledEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.clientName);

  const newAppointmentButton = EmailButton(
    `${EMAIL_SITE_URL}/rendez-vous`,
    "Prendre un nouveau rendez-vous",
    "outline"
  );

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Votre rendez-vous a été annulé.</p>
    <p style="margin:0 0 8px;">Si cette annulation est involontaire ou si vous souhaitez convenir d'un nouveau créneau, je vous invite à effectuer une nouvelle demande directement depuis le site.</p>
    ${newAppointmentButton}
  `;

  const html = EmailLayout(
    "Votre rendez-vous n'est plus programmé.",
    body,
    { headerTitle: "Votre rendez-vous a été annulé", headerColor: EMAIL_COLORS.bordeaux }
  );

  const text = buildTextVersion([
    "Votre rendez-vous a été annulé",
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre rendez-vous a été annulé.",
    "",
    "Si cette annulation est involontaire ou si vous souhaitez convenir d'un nouveau créneau, je vous invite à effectuer une nouvelle demande directement depuis le site.",
    "",
    `Prendre un nouveau rendez-vous : ${EMAIL_SITE_URL}/rendez-vous`,
  ]);

  await sendEmail(
    data.clientEmail,
    "Votre rendez-vous a été annulé",
    html,
    text
  );
}

export async function sendReminderEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.clientName);

  const recapTable = EmailInfoTable([
    { label: "Date", value: formatAppointmentDateOnly(data.appointmentDate) },
    { label: "Heure", value: formatAppointmentTimeOnly(data.appointmentDate) },
    { label: "Prestation", value: data.serviceName },
  ]);

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Je vous rappelle que notre rendez-vous aura lieu demain.</p>
    ${EmailCard(`
      <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:${EMAIL_COLORS.bordeaux};text-transform:uppercase;letter-spacing:1px;">Récapitulatif</p>
      ${recapTable}
    `)}
    <p style="margin:0 0 8px;">Afin d'optimiser notre échange, pensez à préparer les documents utiles à la compréhension de votre situation.</p>
    <p style="margin:16px 0 0;">Au plaisir d'échanger avec vous.</p>
  `;

  const html = EmailLayout(
    "Votre rendez-vous aura lieu demain.",
    body,
    { headerTitle: "Rappel de votre rendez-vous de demain" }
  );

  const text = buildTextVersion([
    "Rappel de votre rendez-vous de demain",
    "",
    `Bonjour ${firstName},`,
    "",
    "Je vous rappelle que notre rendez-vous aura lieu demain.",
    "",
    "Récapitulatif :",
    `- Date : ${formatAppointmentDateOnly(data.appointmentDate)}`,
    `- Heure : ${formatAppointmentTimeOnly(data.appointmentDate)}`,
    `- Prestation : ${data.serviceName}`,
    "",
    "Afin d'optimiser notre échange, pensez à préparer les documents utiles à la compréhension de votre situation.",
    "",
    "Au plaisir d'échanger avec vous.",
  ]);

  await sendEmail(
    data.clientEmail,
    "Rappel de votre rendez-vous de demain",
    html,
    text
  );
}

export async function sendPostAppointmentEmail(
  data: ClientEmailPayload
): Promise<void> {
  const firstName = getFirstName(data.clientName);

  const newRequestButton = EmailButton(
    `${EMAIL_SITE_URL}/rendez-vous`,
    "Effectuer une nouvelle demande",
    "outline"
  );

  const body = `
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Je vous remercie pour votre confiance.</p>
    <p style="margin:0 0 16px;">J'espère que notre échange vous aura permis de mieux comprendre votre situation et de structurer les prochaines étapes.</p>
    <p style="margin:0 0 8px;">Si vous avez besoin d'un accompagnement complémentaire, notamment pour la rédaction de courriers ou l'analyse de nouveaux éléments, vous pouvez effectuer une nouvelle demande directement depuis le site.</p>
    ${newRequestButton}
    <p style="margin:16px 0 0;">Je vous souhaite une excellente continuation.</p>
  `;

  const html = EmailLayout(
    "Merci pour votre confiance.",
    body,
    { headerTitle: "Merci pour notre échange" }
  );

  const text = buildTextVersion([
    "Merci pour notre échange",
    "",
    `Bonjour ${firstName},`,
    "",
    "Je vous remercie pour votre confiance.",
    "J'espère que notre échange vous aura permis de mieux comprendre votre situation et de structurer les prochaines étapes.",
    "",
    "Si vous avez besoin d'un accompagnement complémentaire, notamment pour la rédaction de courriers ou l'analyse de nouveaux éléments, vous pouvez effectuer une nouvelle demande directement depuis le site.",
    "",
    `Effectuer une nouvelle demande : ${EMAIL_SITE_URL}/rendez-vous`,
    "",
    "Je vous souhaite une excellente continuation.",
  ]);

  await sendEmail(
    data.clientEmail,
    "Merci pour notre échange",
    html,
    text
  );
}
