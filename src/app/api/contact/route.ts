import { parseContactAttachments } from "@/lib/contact/attachments";
import { sendContactEmail } from "@/lib/email/send-contact-email";
import { ensureCmsTables } from "@/lib/db/cms";
import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactFields = {
  nom: string;
  prenom: string;
  email: string;
  tel: string | null;
  typeDemande: string | null;
  statut: string | null;
  sujet: string;
  message: string;
};

async function parseContactRequest(
  request: NextRequest
): Promise<
  | { ok: true; fields: ContactFields; attachments: Awaited<ReturnType<typeof parseContactAttachments>>["attachments"] }
  | { ok: false; response: NextResponse }
> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const { attachments, error: attachError } = await parseContactAttachments(formData);
    if (attachError) {
      return {
        ok: false,
        response: NextResponse.json({ error: attachError }, { status: 400 }),
      };
    }

    const fields: ContactFields = {
      nom: String(formData.get("nom") ?? "").trim(),
      prenom: String(formData.get("prenom") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim().toLowerCase(),
      tel: formData.get("tel") ? String(formData.get("tel")).trim() : null,
      typeDemande: formData.get("typeDemande")
        ? String(formData.get("typeDemande")).trim()
        : null,
      statut: formData.get("statut") ? String(formData.get("statut")).trim() : null,
      sujet: String(formData.get("sujet") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    return { ok: true, fields, attachments };
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 }),
    };
  }

  const fields: ContactFields = {
    nom: String(body.nom ?? "").trim(),
    prenom: String(body.prenom ?? "").trim(),
    email: String(body.email ?? "").trim().toLowerCase(),
    tel: body.tel ? String(body.tel).trim() : null,
    typeDemande: body.typeDemande ? String(body.typeDemande).trim() : null,
    statut: body.statut ? String(body.statut).trim() : null,
    sujet: String(body.sujet ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  return { ok: true, fields, attachments: [] };
}

function validateContactFields(fields: ContactFields): NextResponse | null {
  const { nom, prenom, email, sujet, message } = fields;

  if (!nom || !prenom || !email || !sujet || !message) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  if (message.length < 20) {
    return NextResponse.json(
      { error: "Message trop court." },
      { status: 400 }
    );
  }

  return null;
}

export async function POST(request: NextRequest) {
  const parsed = await parseContactRequest(request);
  if (!parsed.ok) return parsed.response;

  const validationError = validateContactFields(parsed.fields);
  if (validationError) return validationError;

  const payload = {
    ...parsed.fields,
    attachments: parsed.attachments,
  };

  try {
    await ensureCmsTables();
    await query(
      `INSERT INTO leads (first_name, last_name, email, phone, demand_type, subject, message, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'contact_form')`,
      [
        payload.prenom,
        payload.nom,
        payload.email,
        payload.tel,
        payload.typeDemande,
        payload.sujet,
        payload.message,
      ]
    );
  } catch (dbError) {
    console.error("Contact API — base de données (non bloquant):", dbError);
  }

  try {
    await sendContactEmail(payload);
    return NextResponse.json(
      { success: true, message: "Votre message a bien été envoyé." },
      { status: 200 }
    );
  } catch (emailError) {
    console.error("Contact API — Resend:", emailError);
    const detail =
      emailError instanceof Error ? emailError.message : "unknown";
    return NextResponse.json(
      { error: contactEmailErrorMessage(detail) },
      { status: 502 }
    );
  }
}

function contactEmailErrorMessage(detail: string): string {
  const lower = detail.toLowerCase();
  if (detail === "RESEND_API_KEY" || lower.includes("resend_api_key")) {
    return "L'envoi par email n'est pas configuré sur le serveur. Contactez-nous directement par email.";
  }
  if (detail.includes("CONTACT_EMAIL_FROM invalide")) {
    return "Configuration email incorrecte sur le serveur (expéditeur).";
  }
  if (
    lower.includes("only send") ||
    lower.includes("testing") ||
    lower.includes("verified") ||
    lower.includes("not authorized")
  ) {
    return "L'email de notification n'est pas encore autorisé chez Resend. Vérifiez le domaine ou l'adresse destinataire de test.";
  }
  if (lower.includes("invalid") && lower.includes("from")) {
    return "Adresse expéditeur invalide dans la configuration Resend.";
  }
  if (lower.includes("attachment") || lower.includes("too large")) {
    return "Les pièces jointes sont trop volumineuses ou non acceptées. Taille totale max. : 30 Mo.";
  }
  return "L'envoi du message a échoué. Réessayez ou écrivez-nous directement par email.";
}

export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
