import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez le parcours et les valeurs de Loubna Abouz Manta, juriste spécialisée en droit du travail. Écoute, rigueur, confidentialité et clarté au service de vos droits.",
  openGraph: {
    title: `À propos – ${SITE_CONFIG.name}`,
    description:
      "Parcours, valeurs et engagement d'une juriste spécialisée en droit du travail.",
  },
};

const VALUES = [
  {
    icon: "🎯",
    title: "Rigueur",
    desc: "Chaque dossier est traité avec la même exigence analytique, quelle que soit sa complexité apparente.",
  },
  {
    icon: "👂",
    title: "Écoute",
    desc: "Comprendre votre situation dans sa globalité est la première étape d'un conseil juridique pertinent.",
  },
  {
    icon: "🔒",
    title: "Confidentialité",
    desc: "Vos informations restent strictement confidentielles. La discrétion est un engagement non négociable.",
  },
  {
    icon: "💡",
    title: "Clarté",
    desc: "Je traduis le droit en langage clair et concret, pour que vous preniez des décisions éclairées.",
  },
];

const FORMATION = [
  {
    icon: "🎓",
    title: "Master II Droit Social — Droit du Travail & Protection Sociale",
    desc: "Formation approfondie en droit individuel et collectif du travail, droit de la sécurité sociale, contentieux prud'homal et relations professionnelles.",
  },
  {
    icon: "🏢",
    title: "Expérience en cabinet juridique spécialisé",
    desc: "Traitement de dossiers en droit du travail pour une clientèle de salariés et d'entreprises : licenciements, négociations, procédures disciplinaires, contentieux.",
  },
  {
    icon: "📋",
    title: "Conseil RH en entreprise",
    desc: "Accompagnement de directions RH dans la sécurisation de leurs pratiques, la rédaction de documents contractuels et la prévention des risques sociaux.",
  },
];

export default function AProposPage() {
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
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">À propos</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Une juriste engagée,
            <br />
            <em className="text-or-500 font-light" style={{ fontStyle: "italic" }}>
              à votre côté.
            </em>
          </h1>
          <p className="text-white/50 text-[1rem] max-w-[500px] mt-5 leading-[1.8]">
            Le droit du travail est un domaine complexe, en perpétuelle évolution.
            Mon rôle : vous aider à le comprendre, le défendre et l'utiliser à votre avantage.
          </p>
        </div>
      </section>

      {/* ─── ABOUT MAIN ────────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-20 items-start">

            {/* Portrait */}
            <div className="lg:sticky lg:top-24">
              <div className="relative">
                {/* Portrait placeholder */}
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
                {/* Badge */}
                <div className="absolute -bottom-5 -right-5 bg-rouge-800 text-white p-5 rounded-sm shadow-rouge-lg text-center">
                  <strong className="block font-serif text-[1.9rem] leading-none">+10</strong>
                  <span className="text-[0.65rem] opacity-80 leading-tight block mt-1">
                    ans d'expertise
                    <br />droit du travail
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-2">
              <span className="section-label">Mon parcours</span>

              <blockquote className="font-serif text-[1.3rem] italic text-encre-950 leading-[1.65] mb-7 border-l-[3px] border-rouge-800 pl-5">
                « Le droit du travail protège des droits fondamentaux. Chaque dossier que je
                traite mérite la même rigueur et la même attention. »
              </blockquote>

              <div className="space-y-5 mb-12">
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  Juriste spécialisée en droit du travail, j'accompagne salariés et employeurs
                  depuis plus de dix ans dans l'ensemble des problématiques liées à la relation
                  de travail. Diplômée en droit privé et titulaire d'un master spécialisé en
                  droit social, j'ai construit mon expertise au contact des réalités du terrain,
                  aussi bien au sein de cabinets juridiques que d'entreprises.
                </p>
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  Mon exercice repose sur une conviction profonde : un conseil juridique de
                  qualité doit être accessible, compréhensible et pleinement adapté à la
                  situation de chaque client. Ni jargon inutile, ni réponse générique — chaque
                  situation est unique et mérite une analyse sur mesure.
                </p>
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  Qu'il s'agisse d'un licenciement contestable, d'une rupture conventionnelle
                  à négocier, d'un contrat à sécuriser ou d'un conflit à résoudre, j'apporte
                  une réponse juridique précise, stratégique et humaine.
                </p>
              </div>

              {/* Values */}
              <span className="section-label">Mes valeurs</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {VALUES.map((v, i) => (
                  <div
                    key={i}
                    className="bg-encre-100 border border-encre-200/50 border-l-[3px] border-l-rouge-800 p-6 rounded-sm"
                  >
                    <h4 className="font-serif text-[1.05rem] text-encre-950 mb-2">
                      {v.icon} {v.title}
                    </h4>
                    <p className="text-[0.84rem] text-encre-500 leading-[1.7]">{v.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/contact" className="btn btn-primary">
                  Prendre rendez-vous →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORMATION ─────────────────────────────────── */}
      <section className="section-pad bg-encre-100">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="section-label">Formation & expérience</span>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.6rem)] text-encre-950 leading-[1.2]">
              Un socle académique
              <br />
              <em className="text-rouge-800 font-light" style={{ fontStyle: "italic" }}>
                et pratique solide
              </em>
            </h2>
          </div>
          <div className="max-w-[700px] mx-auto space-y-0 divide-y divide-encre-200">
            {FORMATION.map((f, i) => (
              <div key={i} className="flex gap-7 py-8">
                <div className="text-[2rem] flex-shrink-0 pt-1">{f.icon}</div>
                <div>
                  <h4 className="font-serif text-[1.12rem] text-encre-950 mb-2">{f.title}</h4>
                  <p className="text-[0.9rem] text-encre-500 leading-[1.8]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Prêt à faire valoir vos droits ?
          </h2>
          <p className="text-white/70 mb-9">
            Première analyse personnalisée sous 48h.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Prendre rendez-vous
            </Link>
            <Link href="/services" className="btn btn-ghost-white">
              Voir les services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
