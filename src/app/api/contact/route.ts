import { NextRequest, NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════
// API Route — /api/contact
// Gestion des soumissions du formulaire de contact
//
// Pour activer cette route avec Resend :
// 1. npm install resend
// 2. Ajouter RESEND_API_KEY dans .env.local
// 3. Décommenter le code ci-dessous
// ═══════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
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

    // ─── Validation serveur ────────────────────────────────
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

    // ─── Envoi avec Resend ────────────────────────────────
    // Décommentez et installez : npm install resend
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: "Site web <noreply@loubna-abouz-manta.fr>",
    //   to: [process.env.CONTACT_EMAIL_TO!],
    //   replyTo: email,
    //   subject: `[Contact] ${sujet} — ${prenom} ${nom}`,
    //   html: `
    //     <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
    //       <div style="background: #8B0000; padding: 24px; text-align: center;">
    //         <h1 style="color: white; margin: 0; font-size: 1.4rem;">Nouvelle demande de contact</h1>
    //       </div>
    //       <div style="padding: 32px; background: #fff; border: 1px solid #eee;">
    //         <table style="width: 100%; border-collapse: collapse;">
    //           <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem; width: 140px;"><strong>Nom</strong></td><td style="padding: 8px 0;">${prenom} ${nom}</td></tr>
    //           <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
    //           <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;"><strong>Téléphone</strong></td><td style="padding: 8px 0;">${tel || "Non renseigné"}</td></tr>
    //           <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;"><strong>Statut</strong></td><td style="padding: 8px 0;">${statut || "Non précisé"}</td></tr>
    //           <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;"><strong>Type</strong></td><td style="padding: 8px 0;">${typeDemande || "Non précisé"}</td></tr>
    //           <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;"><strong>Sujet</strong></td><td style="padding: 8px 0;">${sujet}</td></tr>
    //         </table>
    //         <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
    //         <h3 style="color: #8B0000; margin-bottom: 12px;">Message</h3>
    //         <p style="color: #333; line-height: 1.7; white-space: pre-wrap;">${message}</p>
    //       </div>
    //       <div style="padding: 16px; text-align: center; color: #999; font-size: 0.75rem;">
    //         Loubna Abouz Manta — Juriste en droit du travail
    //       </div>
    //     </div>
    //   `,
    // });

    // Simulation pour développement (à retirer en production)
    console.log("📧 Form submission:", { nom, prenom, email, sujet, statut, typeDemande });
    await new Promise((r) => setTimeout(r, 500));

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

// Bloquer les méthodes non autorisées
export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
