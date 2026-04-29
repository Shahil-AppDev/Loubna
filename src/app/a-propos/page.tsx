import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "À propos — Loubna Abouz Manta, Juriste en Droit du Travail",
  description:
    "Découvrez mon parcours de juriste en droit du travail et prévention des risques professionnels. Master en droit et management, intervention en amont des procédures.",
  openGraph: {
    title: `À propos – ${SITE_CONFIG.name}`,
    description:
      "Parcours et engagement d'une juriste spécialisée en droit du travail et prévention des risques professionnels.",
  },
};

const VALUES = [
  {
    icon: "⚖️",
    title: "Rigueur",
    desc: "Chaque situation est étudiée avec précision, en tenant compte du cadre applicable et de la réalité concrète du terrain.",
  },
  {
    icon: "👂",
    title: "Écoute",
    desc: "Comprendre votre situation dans sa globalité est la condition d'un accompagnement réellement adapté.",
  },
  {
    icon: "🔒",
    title: "Confidentialité",
    desc: "Vos informations restent strictement confidentielles. La discrétion est un engagement non négociable.",
  },
  {
    icon: "💡",
    title: "Clarté",
    desc: "Je m'engage à vous expliquer les enjeux en langage accessible, sans jargon inutile.",
  },
  {
    icon: "🛡️",
    title: "Prévention",
    desc: "Mon approche est résolument préventive : j'interviens en amont pour éviter l'escalade des situations.",
  },
  {
    icon: "🎯",
    title: "Pragmatisme",
    desc: "Mon objectif n'est pas de théoriser, mais de vous apporter des réponses concrètes, adaptées à votre réalité.",
  },
];

const FORMATION = [
  {
    icon: "🎓",
    title: "Master en Droit et Management",
    desc: "Double approche à l'intersection du droit du travail et du management des organisations, permettant de comprendre les situations professionnelles en tenant compte à la fois du cadre juridique et de la réalité du terrain.",
  },
  {
    icon: "⚠️",
    title: "Spécialisation en prévention des risques professionnels",
    desc: "Spécialisation en identification et évaluation des risques (RPS, accidents du travail, maladies professionnelles), rédaction du DUERP, et accompagnement des entreprises dans leur démarche de prévention.",
  },
  {
    icon: "📚",
    title: "Formation continue",
    desc: "Dans une démarche d'amélioration continue, je maintiens mes connaissances à jour via des formations régulières en droit du travail, santé-sécurité au travail et management des risques professionnels.",
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
            Loubna Abouz Manta
          </h1>
          <p className="text-white/50 text-[1rem] max-w-[500px] mt-5 leading-[1.8]">
            Juriste en droit du travail — je me spécialise dans la prévention des risques
            professionnels et l&apos;accompagnement des salariés et des entreprises,
            en amont des procédures.
          </p>
        </div>
      </section>

      {/* ─── ABOUT MAIN ────────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-20 items-start">

            {/* Identité */}
            <div className="lg:sticky lg:top-24">
              <div className="relative">
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
                  <strong className="block font-serif text-[1.4rem] leading-none">Master</strong>
                  <span className="text-[0.65rem] opacity-80 leading-tight block mt-1">
                    Droit &amp; Management
                  </span>
                </div>
              </div>

              <div className="mt-10 bg-encre-950 rounded-sm p-6">
                <p className="font-serif text-white font-semibold text-sm mb-0.5">
                  Loubna Abouz Manta
                </p>
                <p className="text-or-500 text-[0.65rem] tracking-[0.15em] uppercase font-medium">
                  Juriste · Droit du Travail
                </p>
                <div className="w-10 h-px bg-or-400 my-4" />
                <div className="space-y-2.5">
                  <p className="text-encre-300 text-xs flex items-center gap-2">
                    <span className="text-or-500">🎓</span>
                    Master 2 Droit &amp; Management
                  </p>
                  <p className="text-encre-300 text-xs flex items-center gap-2">
                    <span className="text-or-500">⚠️</span>
                    Prévention des risques professionnels
                  </p>
                  <p className="text-encre-300 text-xs flex items-center gap-2">
                    <span className="text-or-500">🌐</span>
                    Interventions 100% distanciel
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-2">
              <span className="section-label">Mon parcours</span>

              <blockquote className="font-serif text-[1.3rem] italic text-encre-800 leading-[1.65] mb-7 border-l-[3px] border-rouge-800 pl-5">
                « Mon objectif est d&apos;apporter un accompagnement rigoureux, accessible
                et adapté à chaque situation, dans une logique de prévention et de
                sécurisation des pratiques professionnelles. »
              </blockquote>

              <div className="space-y-5 mb-12">
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  J&apos;interviens en amont afin de comprendre les situations de travail,
                  d&apos;identifier les risques professionnels et d&apos;accompagner les entreprises
                  dans la rédaction et la mise à jour de leur DUERP, dans une logique de
                  prévention et de sécurisation des pratiques.
                </p>
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  Titulaire d&apos;un Master en droit et management, j&apos;ai développé une
                  spécialisation à l&apos;intersection du droit du travail et du management des
                  organisations. Cette double approche me permet d&apos;appréhender avec précision
                  les situations professionnelles, en tenant compte à la fois du cadre
                  juridique et de la réalité du terrain.
                </p>
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  J&apos;interviens principalement en droit du travail, avec une attention
                  particulière portée à la prévention des risques professionnels, notamment
                  en matière de santé, sécurité et conditions de travail. Dans ce cadre,
                  j&apos;accompagne les entreprises dans l&apos;identification et l&apos;évaluation des
                  risques, à travers la réalisation d&apos;audits et la mise à jour du Document
                  Unique d&apos;Évaluation des Risques Professionnels (DUERP), en collaboration
                  avec les acteurs de l&apos;entreprise.
                </p>
                <p className="text-[0.95rem] text-encre-600 leading-[1.88]">
                  Mon approche ne se limite pas à la rédaction de documents : elle repose
                  sur une compréhension concrète des situations de travail et une volonté d&apos;agir
                  en amont, afin de prévenir les tensions et éviter les situations conflictuelles.
                </p>
              </div>

              {/* Information importante */}
              <div className="bg-encre-950 border border-encre-700 rounded-sm p-6 mb-10">
                <div className="flex items-start gap-3">
                  <span className="text-or-400 text-lg flex-shrink-0 mt-0.5">ℹ️</span>
                  <div>
                    <h4 className="text-white font-serif text-sm font-semibold mb-2">
                      Information importante
                    </h4>
                    <p className="text-encre-300 text-xs leading-relaxed">
                      Les informations fournies ne constituent pas une consultation
                      juridique au sens de la réglementation applicable à la profession
                      d&apos;avocat. Lorsqu&apos;une situation nécessite une représentation en
                      justice ou une procédure judiciaire, une orientation vers un avocat
                      compétent est proposée.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <span className="section-label">Mes valeurs</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {VALUES.map((v, i) => (
                  <div
                    key={i}
                    className="bg-encre-100 border border-encre-200/50 border-l-[3px] border-l-rouge-800 p-6 rounded-sm"
                  >
                    <h4 className="font-serif text-[1.05rem] text-encre-800 mb-2">
                      {v.icon} {v.title}
                    </h4>
                    <p className="text-[0.84rem] text-encre-500 leading-[1.7]">{v.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Prendre contact →
                </Link>
                <Link href="/services" className="btn btn-ghost">
                  Voir mes interventions
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
            <span className="section-label">Formation &amp; spécialisation</span>
            <h2 className="font-serif text-[clamp(1.9rem,3vw,2.6rem)] text-encre-800 leading-[1.2]">
              Une double approche
              <br />
              <em className="text-rouge-800 font-light" style={{ fontStyle: "italic" }}>
                droit du travail et management
              </em>
            </h2>
          </div>
          <div className="max-w-[700px] mx-auto space-y-0 divide-y divide-encre-200">
            {FORMATION.map((f, i) => (
              <div key={i} className="flex gap-7 py-8">
                <div className="text-[2rem] flex-shrink-0 pt-1">{f.icon}</div>
                <div>
                  <h4 className="font-serif text-[1.12rem] text-encre-800 mb-2">{f.title}</h4>
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
            Prêt(e) à être accompagné(e) ?
          </h2>
          <p className="text-white/70 mb-9">
            Contactez-moi pour un premier échange sur votre situation professionnelle.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Prendre contact
            </Link>
            <Link href="/services" className="btn btn-ghost-white">
              Voir les interventions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
