import { sendContactEmail } from "@/lib/email/send-contact-email";
import { ensureCmsTables } from "@/lib/db/cms";
import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const {
    nom,
    prenom,
    email,
    tel,
    typeDemande,
    statut,
    sujet,
    message,
  } = body;

  if (!nom || !prenom || !email || !sujet || !message) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  if (String(message).trim().length < 20) {
    return NextResponse.json(
      { error: "Message trop court." },
      { status: 400 }
    );
  }

  const payload = {
    nom: String(nom).trim(),
    prenom: String(prenom).trim(),
    email: String(email).trim().toLowerCase(),
    tel: tel ? String(tel).trim() : null,
    typeDemande: typeDemande ? String(typeDemande).trim() : null,
    statut: statut ? String(statut).trim() : null,
    sujet: String(sujet).trim(),
    message: String(message).trim(),
  };

  // Enregistrement en base (optionnel — ne bloque pas l'email)
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
  return "L'envoi du message a échoué. Réessayez ou écrivez-nous directement par email.";
}

export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
