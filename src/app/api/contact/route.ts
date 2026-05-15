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

    await sendContactEmail(payload);

    return NextResponse.json(
      { success: true, message: "Votre message a bien été envoyé." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    const message =
      error instanceof Error && error.message.includes("RESEND_API_KEY")
        ? "L'envoi par email n'est pas configuré sur le serveur. Contactez-nous directement par email."
        : "Une erreur interne est survenue. Veuillez réessayer.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
