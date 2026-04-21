import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  typedemande: string;
  statut: string;
  sujet: string;
  message: string;
}

function validatePayload(data: Partial<ContactPayload>): string | null {
  if (!data.nom?.trim()) return "Nom requis";
  if (!data.prenom?.trim()) return "Prénom requis";
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Email invalide";
  if (!data.typedemande) return "Type de demande requis";
  if (!data.statut) return "Statut requis";
  if (!data.sujet?.trim()) return "Sujet requis";
  if (!data.message?.trim() || data.message.trim().length < 20)
    return "Message trop court (20 caractères minimum)";
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: Partial<ContactPayload> = await request.json();

    const validationError = validatePayload(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // ─── Option 1 : Resend ────────────────────────────────────────────
    // npm install resend
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Site web <noreply@loubna-abouz-manta.fr>",
    //   to: process.env.CONTACT_EMAIL!,
    //   replyTo: body.email,
    //   subject: `Nouvelle demande : ${body.sujet}`,
    //   text: `
    //     Nom : ${body.prenom} ${body.nom}
    //     Email : ${body.email}
    //     Téléphone : ${body.telephone || "Non renseigné"}
    //     Type : ${body.typedemande}
    //     Statut : ${body.statut}
    //     Sujet : ${body.sujet}
    //
    //     Message :
    //     ${body.message}
    //   `,
    // });

    // ─── Option 2 : Nodemailer (SMTP) ────────────────────────────────
    // npm install nodemailer @types/nodemailer
    // import nodemailer from "nodemailer";
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });

    // ─── Option 3 : Formspree (webhook forward) ───────────────────────
    // Redirigez directement depuis le front vers Formspree (pas besoin d'API route).

    // Pour l'instant, on simule un succès.
    // Remplacez ce bloc par l'intégration de votre choix.
    console.log("Nouvelle demande de contact :", {
      nom: `${body.prenom} ${body.nom}`,
      email: body.email,
      sujet: body.sujet,
      type: body.typedemande,
      statut: body.statut,
    });

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
