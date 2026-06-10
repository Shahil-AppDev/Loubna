import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez-moi pour un accompagnement en droit du travail. Formulaire sécurisé, réponse personnelle sous 48h. Fin de contrat, rupture conventionnelle, harcèlement.",
  openGraph: {
    title: `Contact – ${SITE_CONFIG.name}`,
    description: "Prenez contact avec moi, juriste en droit du travail. Réponse sous 48h.",
  },
};

const CONTACT_ITEMS = [
  {
    icon: "📧",
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: "📞",
    label: "Téléphone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
  },
  {
    icon: "📍",
    label: "Localisation",
    value: `${SITE_CONFIG.address}\n(Présentiel & visioconférence)`,
    href: null,
  },
  {
    icon: "🕐",
    label: "Disponibilités",
    value: SITE_CONFIG.hours,
    href: null,
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "Loubna Abouz Manta",
    href: SITE_CONFIG.linkedin,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ─── PAGE HERO ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,.22) 0%, transparent 70%)" }}
        />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">Contact</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Parlons de
            <br />
            <span className="text-or-500 font-light">
              votre situation.
            </span>
          </h1>
          <p className="text-white/85 text-[1rem] max-w-[510px] mt-5 leading-[1.8]">
            Décrivez-moi votre situation. Je vous réponds personnellement sous 48h ouvrées,
            avec une première orientation claire sur vos options en droit du travail.
          </p>
        </div>
      </section>

      {/* ─── CONTACT LAYOUT ────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-20 items-start">

            {/* ─── Info column ───────────────────────── */}
            <div className="lg:sticky lg:top-24">
              <h2 className="font-serif text-[1.8rem] text-encre-800 mb-2">
                Coordonnées
              </h2>
              <p className="text-[0.9rem] text-encre-700 leading-[1.75] mb-10">
                Toutes vos demandes sont traitées avec la plus stricte confidentialité.
                Je réponds personnellement à chaque message.
              </p>

              {/* Contact details */}
              <div className="space-y-6 mb-8">
                {CONTACT_ITEMS.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-full bg-rouge-800/8 flex items-center justify-center text-[1.05rem] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-encre-600 mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="text-[0.93rem] text-encre-800 font-medium hover:text-rouge-800 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[0.93rem] text-encre-800 font-medium whitespace-pre-line leading-[1.6]">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Confidentiality notice */}
              <div className="bg-encre-100 border border-encre-200/50 border-l-[3px] border-l-rouge-800 p-5 rounded-sm">
                <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-rouge-800 mb-2">
                  🔒 Confidentialité garantie
                </p>
                <p className="text-[0.85rem] text-encre-700 leading-[1.75]">
                  Toutes les informations que vous partagez sont strictement
                  confidentielles et traitées conformément au RGPD.
                  Aucune donnée n'est transmise à des tiers.
                </p>
              </div>

              {/* Response time */}
              <div className="mt-4 bg-encre-100 border border-encre-200/50 border-l-[3px] border-l-or-500 p-5 rounded-sm">
                <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-or-600 mb-2">
                  ⏱ Délai de réponse
                </p>
                <p className="text-[0.85rem] text-encre-700 leading-[1.75]">
                  Je m'engage à répondre à chaque demande sous{" "}
                  <strong className="text-encre-900">48h ouvrées</strong>.
                  Pour les situations urgentes, contactez-moi directement par téléphone.
                </p>
              </div>

              {/* Partenariat avocat */}
              <div className="mt-4 bg-encre-950 border border-or-500/25 border-l-[3px] border-l-or-500 p-5 rounded-sm">
                <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-or-500 mb-2">
                  ⚖️ Partenariat juridique
                </p>
                <p className="text-[0.85rem] text-white/80 leading-[1.75] mb-3">
                  Pour les situations nécessitant une{" "}
                  <strong className="text-white">représentation en justice</strong>{" "}
                  ou une procédure contentieuse, je travaille en partenariat avec{" "}
                  <strong className="text-or-400">Maître Lahlouh, avocate à Paris</strong>.
                </p>
                <p className="text-[0.82rem] text-white/55 leading-[1.7]">
                  Signalez-le dans votre message — je transmettrai votre demande
                  directement après un premier échange sur votre situation.
                </p>
              </div>
            </div>

            {/* ─── Form column ───────────────────────── */}
            <div className="bg-white border border-encre-100 rounded-lg p-8 md:p-12 shadow-premium">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
