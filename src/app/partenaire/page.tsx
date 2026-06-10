import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Maître Lahlouh, Avocate à Paris — Partenaire juridique | ${SITE_CONFIG.name}`,
  description:
    "Maître Lahlouh, avocate au barreau de Paris, partenaire de Loubna Abouz Manta pour les situations nécessitant une représentation en justice en droit du travail.",
  openGraph: {
    title: "Maître Lahlouh — Avocate à Paris, partenaire juridique",
    description:
      "Avocate spécialisée en droit du travail, partenaire de confiance pour les dossiers nécessitant une représentation en justice.",
  },
};

// ─────────────────────────────────────────────────────────────
// CONTENU À COMPLÉTER avec les informations réelles de l'avocate
// ─────────────────────────────────────────────────────────────

const SPECIALITES = [
  {
    icon: "⚖️",
    title: "Droit du travail",
    desc: "Représentation et défense des salariés et employeurs devant le Conseil de prud'hommes et les juridictions d'appel.",
  },
  {
    icon: "🔴",
    title: "Harcèlement & discrimination",
    desc: "Défense des victimes de harcèlement moral, sexuel ou de discrimination dans le cadre professionnel.",
  },
  {
    icon: "🚫",
    title: "Licenciement & rupture",
    desc: "Contestation de licenciements abusifs, négociation et contentieux liés aux fins de contrat.",
  },
  {
    icon: "🏢",
    title: "Conseil aux entreprises",
    desc: "Accompagnement juridique des employeurs dans la gestion de leurs relations sociales et la sécurisation de leurs procédures.",
  },
];

export default function PartenairePage() {
  return (
    <>
      {/* ─── PAGE HERO ────────────────────────────────── */}
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,.22) 0%, transparent 70%)" }}
        />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>›</span>
            <Link href="/a-propos" className="hover:text-white/60 transition-colors">À propos</Link>
            <span>›</span>
            <span className="text-or-500">Partenaire juridique</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-or-500 border border-or-500/40 px-3 py-1 rounded-full">
              Partenariat juridique
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Maître Lahlouh
          </h1>
          <p className="text-or-400 font-serif text-[1.1rem] mt-2 mb-5">
            Avocate au Barreau de Paris
          </p>
          <p className="text-white/50 text-[1rem] max-w-[520px] leading-[1.8]">
            Partenaire de confiance pour les situations nécessitant une représentation
            en justice ou une procédure contentieuse en droit du travail.
          </p>
        </div>
      </section>

      {/* ─── COMMENT FONCTIONNE LE PARTENARIAT ────────── */}
      <section className="bg-encre-950 border-b border-or-500/15">
        <div className="container-main py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "📋",
                title: "Vous me contactez",
                desc: "Décrivez votre situation via le formulaire de contact. Précisez si vous pensez avoir besoin d'une représentation en justice.",
              },
              {
                step: "2",
                icon: "🔍",
                title: "J'évalue votre dossier",
                desc: "Je fais un premier point sur votre situation et détermine si un accompagnement de ma part suffit ou si une orientation vers l'avocate est nécessaire.",
              },
              {
                step: "3",
                icon: "⚖️",
                title: "Je vous mets en relation",
                desc: "Si votre dossier nécessite une représentation judiciaire, je transmets directement votre demande à Maître Lahlouh avec le contexte complet.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-rouge-800/30 border border-rouge-800/50 flex items-center justify-center text-rouge-400 font-serif font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="text-white text-[0.88rem] font-semibold mb-1.5">
                    {item.icon} {item.title}
                  </p>
                  <p className="text-white/50 text-[0.8rem] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRÉSENTATION ─────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-20 items-start">

            {/* Identité */}
            <div className="lg:sticky lg:top-24">
              <div className="relative">
                {/* Photo placeholder */}
                <div
                  className="aspect-[3/4] rounded-sm border border-or-500/20 flex flex-col items-center justify-center gap-4 text-white/25 max-w-sm"
                  style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}
                >
                  <span className="text-5xl">⚖️</span>
                  <span className="text-[0.75rem] tracking-[0.1em] uppercase">Photo professionnelle</span>
                  <span className="text-[0.65rem] tracking-[0.08em] opacity-60">
                    À remplacer dans /public/
                  </span>
                </div>
                <div className="absolute -bottom-5 -right-5 bg-rouge-800 text-white p-5 rounded-sm shadow-rouge-lg text-center">
                  <strong className="block font-serif text-[1.2rem] leading-none">Barreau</strong>
                  <span className="text-[0.65rem] opacity-80 leading-tight block mt-1">
                    de Paris
                  </span>
                </div>
              </div>

              <div className="mt-10 bg-encre-950 rounded-sm p-6">
                <p className="font-serif text-white font-semibold text-sm mb-0.5">
                  Maître Lahlouh
                </p>
                <p className="text-or-500 text-[0.65rem] tracking-[0.15em] uppercase font-medium">
                  Avocate · Droit du travail
                </p>
                <div className="w-10 h-px bg-or-400 my-4" />
                <div className="space-y-2.5">
                  <p className="text-encre-300 text-xs flex items-center gap-2">
                    <span className="text-or-500">📍</span>
                    Paris
                  </p>
                  <p className="text-encre-300 text-xs flex items-center gap-2">
                    <span className="text-or-500">⚖️</span>
                    Barreau de Paris
                  </p>
                  <p className="text-encre-300 text-xs flex items-center gap-2">
                    <span className="text-or-500">🌐</span>
                    <a
                      href="https://www.lahlouh-avocat-paris.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-or-400 transition-colors"
                    >
                      lahlouh-avocat-paris.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="pt-2">
              <span className="section-label">À propos</span>

              {/* NOTE: Remplacer ce texte par la vraie biographie de Maître Lahlouh */}
              <blockquote className="font-serif text-[1.3rem] italic text-encre-800 leading-[1.65] mb-7 border-l-[3px] border-rouge-800 pl-5">
                « À compléter avec la citation ou le positionnement de Maître Lahlouh. »
              </blockquote>

              <div className="space-y-5 mb-12">
                {/* NOTE: Remplacer par la vraie biographie */}
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  Maître Lahlouh est avocate au Barreau de Paris, spécialisée en droit du travail.
                  {/* → À compléter avec son parcours, ses formations, ses années d'expérience */}
                </p>
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  {/* → À compléter avec sa spécialisation et ses domaines d'intervention */}
                  Elle intervient aussi bien pour les salariés que pour les employeurs, en
                  conseil comme en contentieux devant les juridictions compétentes.
                </p>
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  {/* → À compléter avec sa philosophie, son approche */}
                  Son approche combine rigueur juridique et écoute des situations concrètes,
                  en recherchant la solution la plus adaptée à chaque dossier.
                </p>
              </div>

              {/* Spécialités */}
              <span className="section-label">Domaines d&apos;intervention</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-10">
                {SPECIALITES.map((s, i) => (
                  <div
                    key={i}
                    className="bg-encre-100 border border-encre-200/50 border-l-[3px] border-l-rouge-800 p-6 rounded-sm"
                  >
                    <h4 className="font-serif text-[1.05rem] text-encre-800 mb-2">
                      {s.icon} {s.title}
                    </h4>
                    <p className="text-[0.84rem] text-encre-500 leading-[1.7]">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Complémentarité */}
              <div className="bg-encre-950 border border-encre-700 rounded-sm p-6 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-or-400 text-lg flex-shrink-0 mt-0.5">🤝</span>
                  <div>
                    <h4 className="text-white font-serif text-sm font-semibold mb-2">
                      Une complémentarité juriste — avocate
                    </h4>
                    <p className="text-encre-300 text-xs leading-relaxed">
                      Mon rôle de juriste est d&apos;intervenir en amont : comprendre,
                      structurer, prévenir. Lorsqu&apos;une situation évolue vers le contentieux
                      ou nécessite une représentation devant les juridictions, Maître Lahlouh
                      prend le relais avec l&apos;expertise et les prérogatives de l&apos;avocat.
                      Une continuité d&apos;accompagnement, du début à la fin.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Me contacter pour être mis(e) en relation →
                </Link>
                <a
                  href="https://www.lahlouh-avocat-paris.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Site de Maître Lahlouh ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Votre situation nécessite un avocat ?
          </h2>
          <p className="text-white/70 mb-9 max-w-md mx-auto">
            Contactez-moi — j&apos;évaluerai votre dossier et vous mettrai en relation
            directement avec Maître Lahlouh si votre situation le nécessite.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Prendre contact
            </Link>
            <Link href="/a-propos" className="btn btn-ghost-white">
              En savoir plus sur moi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
