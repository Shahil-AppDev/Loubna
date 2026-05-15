import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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


const FORMATION = [
  {
    icon: "🎓",
    title: "Master en Droit et Management",
    desc: "Approche à l'intersection du droit du travail et du management des organisations.",
  },
  {
    icon: "⚠️",
    title: "Spécialisation en prévention des risques professionnels",
    desc: "Identification et évaluation des risques (RPS / TMS, AT/MP), rédaction du DUERP, accompagnement des entreprises.",
  },
  {
    icon: "📚",
    title: "Formation continue",
    desc: "Actualisation régulière des connaissances en droit du travail, santé-sécurité et management des risques.",
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
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">À propos</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Loubna Abouz Manta
          </h1>
          <p className="text-white/85 text-[1rem] max-w-[500px] mt-5 leading-[1.8] whitespace-pre-line">
            {`Spécialisée en prévention des risques professionnels et en accompagnement des situations sensibles, j'interviens en amont des procédures pour sécuriser les décisions et apporter de la clarté. J'accompagne à la fois les salariés et les employeurs dans la compréhension et la gestion de leurs situations professionnelles.`}
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
                <div className="relative aspect-[3/4] max-w-sm rounded-sm border border-or-500/20 bg-encre-950 p-6 sm:p-8 md:p-10 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Loubna Abouz Manta - Juriste en droit du travail"
                    fill
                    sizes="(max-width: 1024px) 90vw, 384px"
                    className="object-contain object-center"
                    priority
                  />
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
                  <p className="text-white/80 text-xs flex items-center gap-2">
                    <span className="text-or-500">🎓</span>
                    Master 2 Droit &amp; Management
                  </p>
                  <p className="text-white/80 text-xs flex items-center gap-2">
                    <span className="text-or-500">⚠️</span>
                    Prévention des risques professionnels
                  </p>
                  <p className="text-white/80 text-xs flex items-center gap-2">
                    <span className="text-or-500">🌐</span>
                    Interventions 100% distanciel
                  </p>
                  <p className="text-white/80 text-xs flex items-center gap-2">
                    <span className="text-or-500 shrink-0" aria-hidden>
                      🔗
                    </span>
                    <a
                      href={SITE_CONFIG.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-or-400 hover:text-or-300 underline underline-offset-2 break-all"
                    >
                      Profil LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-2">
              <h3 className="font-serif text-[1.5rem] text-encre-800 mb-6">
                Mon parcours
              </h3>

              <div className="space-y-5 mb-12">
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  J&apos;accompagne à la fois les salariés et les employeurs dans la compréhension et la gestion de leurs situations professionnelles.
                </p>
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  Titulaire d&apos;un Master en droit et management, j&apos;ai développé une approche globale des relations de travail, à la croisée du juridique et du fonctionnement concret des organisations.
                </p>
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  Cette double compétence me permet d&apos;intervenir sur des situations réelles, souvent complexes, en prenant en compte :
                </p>
                <ul className="list-none space-y-2 ml-5">
                  <li className="text-[0.95rem] text-encre-700 leading-[1.88] flex items-start gap-2">
                    <span className="text-or-500 mt-1">•</span>
                    <span>les règles juridiques applicables</span>
                  </li>
                  <li className="text-[0.95rem] text-encre-700 leading-[1.88] flex items-start gap-2">
                    <span className="text-or-500 mt-1">•</span>
                    <span>les pratiques professionnelles</span>
                  </li>
                  <li className="text-[0.95rem] text-encre-700 leading-[1.88] flex items-start gap-2">
                    <span className="text-or-500 mt-1">•</span>
                    <span>les conditions de travail</span>
                  </li>
                </ul>
                <p className="text-[0.95rem] text-encre-700 leading-[1.88] font-medium">
                  Mon objectif : apporter de la lisibilité, structurer les démarches et sécuriser les situations.
                </p>
              </div>

              <h3 className="font-serif text-[1.5rem] text-encre-800 mb-6">
                Ce que je fais au quotidien
              </h3>

              <div className="space-y-6 mb-12">
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  J&apos;interviens principalement lorsque les situations deviennent difficiles à comprendre ou à gérer.
                </p>

                <div className="bg-encre-50 border border-encre-200 rounded-sm p-6">
                  <h4 className="font-serif text-[1.15rem] text-encre-800 mb-3 flex items-center gap-2">
                    <span>👤</span> Auprès des salariés
                  </h4>
                  <p className="text-[0.9rem] text-encre-700 leading-[1.8] mb-3">
                    J&apos;accompagne notamment dans :
                  </p>
                  <ul className="list-none space-y-2 ml-5">
                    <li className="text-[0.9rem] text-encre-700 leading-[1.8] flex items-start gap-2">
                      <span className="text-or-500 mt-1">•</span>
                      <span>les démarches liées aux accidents du travail et maladies professionnelles (AT/MP)</span>
                    </li>
                    <li className="text-[0.9rem] text-encre-700 leading-[1.8] flex items-start gap-2">
                      <span className="text-or-500 mt-1">•</span>
                      <span>les situations de licenciement, sanctions disciplinaires ou ruptures de contrat</span>
                    </li>
                    <li className="text-[0.9rem] text-encre-700 leading-[1.8] flex items-start gap-2">
                      <span className="text-or-500 mt-1">•</span>
                      <span>les situations de mal-être au travail ou de harcèlement→ analyse, compréhension des documents et structuration des démarches</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-encre-50 border border-encre-200 rounded-sm p-6">
                  <h4 className="font-serif text-[1.15rem] text-encre-800 mb-3 flex items-center gap-2">
                    <span>🏢</span> Auprès des employeurs
                  </h4>
                  <p className="text-[0.9rem] text-encre-700 leading-[1.8] mb-3">
                    J&apos;accompagne les entreprises dans la prévention des risques et la sécurisation de leurs pratiques :
                  </p>
                  <ul className="list-none space-y-2 ml-5">
                    <li className="text-[0.9rem] text-encre-700 leading-[1.8] flex items-start gap-2">
                      <span className="text-or-500 mt-1">•</span>
                      <span>DUERP : rédaction, mise à jour et appropriation</span>
                    </li>
                    <li className="text-[0.9rem] text-encre-700 leading-[1.8] flex items-start gap-2">
                      <span className="text-or-500 mt-1">•</span>
                      <span>Prévention des risques professionnels (RPS / TMS) : identification des situations à risque et mise en place d&apos;une démarche adaptée</span>
                    </li>
                    <li className="text-[0.9rem] text-encre-700 leading-[1.8] flex items-start gap-2">
                      <span className="text-or-500 mt-1">•</span>
                      <span>Pratiques RH et situations sensibles : intervention en amont pour éviter les erreurs et sécuriser les décisions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="font-serif text-[1.5rem] text-encre-800 mb-6">
                Formation & transmission
              </h3>

              <div className="space-y-5 mb-12">
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  J&apos;accompagne également les professionnels à travers des formations concrètes et directement applicables en entreprise.
                </p>
                <p className="text-[0.95rem] text-encre-700 leading-[1.88] font-medium">
                  Thématiques principales :
                </p>
                <ul className="list-none space-y-2 ml-5">
                  <li className="text-[0.95rem] text-encre-700 leading-[1.88] flex items-start gap-2">
                    <span className="text-or-500 mt-1">•</span>
                    <span>Prévention et gestion des accidents du travail</span>
                  </li>
                  <li className="text-[0.95rem] text-encre-700 leading-[1.88] flex items-start gap-2">
                    <span className="text-or-500 mt-1">•</span>
                    <span>Gestion des procédures disciplinaires</span>
                  </li>
                  <li className="text-[0.95rem] text-encre-700 leading-[1.88] flex items-start gap-2">
                    <span className="text-or-500 mt-1">•</span>
                    <span>Prud&apos;hommes : les clés pour gérer un contentieux efficacement</span>
                  </li>
                </ul>
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  Ces formations sont construites à partir de situations réelles pour permettre une mise en pratique immédiate.
                </p>

                <div className="mt-8 space-y-5 text-[0.95rem] text-encre-700 leading-[1.88] whitespace-pre-line">
                  {`Objectifs :

Prévenir les risques professionnels

Adopter les bons réflexes dès la survenance d'un accident

Sécuriser les pratiques et les décisions

Éviter les erreurs à risque, notamment en cas de contentieux

Pourquoi c'est essentiel

Même lorsqu'un employeur a mis en place les mesures nécessaires, un accident peut survenir.

Dans ces moments, les premières réactions sont déterminantes.Elles conditionnent la suite de la gestion et peuvent avoir des conséquences importantes.

La formation permet notamment de :

Comprendre les obligations en matière de prévention

Maîtriser le rôle du DUERP

Adopter les bons réflexes immédiatement

Éviter les erreurs fréquentes

Sécuriser les premières démarches administratives`}
                </div>
              </div>

              <h3 className="font-serif text-[1.5rem] text-encre-800 mb-6">
                Ma démarche
              </h3>

              <div className="space-y-5 mb-12">
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  J&apos;apporte de la méthode, de la clarté et une lecture structurée des situations pour permettre à chacun d&apos;agir avec plus de sécurité.
                </p>
                <p className="text-[0.95rem] text-encre-700 leading-[1.88]">
                  Mon rôle est d&apos;accompagner et d&apos;éclairer les décisions.
                </p>
                <p className="text-[0.95rem] text-encre-700 leading-[1.88] font-medium">
                  Je n&apos;interviens pas à la place des professions réglementées.
                </p>
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
              <span className="text-rouge-800 font-light">
                droit du travail et management
              </span>
            </h2>
          </div>
          <div className="max-w-[700px] mx-auto space-y-0 divide-y divide-encre-200">
            {FORMATION.map((f, i) => (
              <div key={i} className="flex gap-7 py-8">
                <div className="text-[2rem] flex-shrink-0 pt-1">{f.icon}</div>
                <div>
                  <h4 className="font-serif text-[1.12rem] text-encre-800 mb-2">{f.title}</h4>
                  <p className="text-[0.9rem] text-encre-700 leading-[1.8]">{f.desc}</p>
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
