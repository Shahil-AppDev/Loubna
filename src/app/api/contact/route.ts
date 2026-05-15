import { sendContactEmail } from "@/lib/email/send-contact-email";
import { ensureCmsTables } from "@/lib/db/cms";
import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await ensureCmsTables();
    const body = await request.json();

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
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    if (message.trim().length < 20) {
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

    try {
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
      console.error("Contact API — base de données:", dbError);
      return NextResponse.json(
        {
          error:
            "Impossible d'enregistrer votre demande pour le moment. Réessayez ou écrivez-nous directement par email.",
        },
        { status: 500 }
      );
    }

    try {
      await sendContactEmail(payload);
    } catch (emailError) {
      console.error("Contact API — Resend:", emailError);
      const detail =
        emailError instanceof Error ? emailError.message : "unknown";
      const message = contactEmailErrorMessage(detail);
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json(
      { success: true, message: "Votre message a bien été envoyé." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue. Veuillez réessayer." },
      { status: 500 }
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
  return "Votre demande est enregistrée mais l'email de notification a échoué. Nous vous recontacterons si besoin.";
}

export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
