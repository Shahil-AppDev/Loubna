import LegalNotice from "@/components/ui/LegalNotice";
import { SUISSE_CONTENT } from "@/data/suisse";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Droit du travail suisse | Accompagnement rédactionnel — Loubna Abouz Manta",
  description:
    "Accompagnement dans la rédaction, reformulation et mise en forme de courriers professionnels liés au travail en Suisse, sans conseil juridique suisse.",
  openGraph: {
    title: "Droit du travail suisse — Accompagnement rédactionnel",
    description:
      "Accompagnement rédactionnel pour vos courriers liés au travail en Suisse.",
  },
};


export default function DroitTravailSuissePage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
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
            <span className="text-or-500">Suisse</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-3xl">
            {SUISSE_CONTENT.hero.title}
          </h1>
          <p className="text-or-500 text-[1.05rem] md:text-[1.15rem] max-w-[600px] mt-4 leading-[1.8]">
            {SUISSE_CONTENT.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact" className="btn btn-primary">
              Me contacter
            </Link>
            <Link href="#tarifs" className="btn btn-ghost-white">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION ───────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            <p className="text-[1.05rem] md:text-[1.08rem] text-encre-700 leading-[1.85] whitespace-pre-line mb-10">
              {SUISSE_CONTENT.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ─── MON ACCOMPAGNEMENT ────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto">
            <span className="section-label">Ce que je propose</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-8">
              Mon accompagnement
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {SUISSE_CONTENT.accompagnementItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 bg-encre-50 border border-encre-100 rounded-sm"
                >
                  <span className="text-rouge-800 font-bold mt-0.5 flex-shrink-0">—</span>
                  <span className="text-[0.97rem] text-encre-700 leading-[1.7]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXEMPLES DE COURRIERS ─────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto">
            <span className="section-label">Types de documents</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-8">
              Exemples de courriers
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SUISSE_CONTENT.courriersExemples.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-white border border-encre-100 rounded-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-or-500 flex-shrink-0" />
                  <span className="text-[0.92rem] text-encre-700 leading-[1.6]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPORTANT ─────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            <LegalNotice variant="suisse" />
          </div>
        </div>
      </section>

      {/* ─── POURQUOI CET ACCOMPAGNEMENT ───────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            <span className="section-label">Pourquoi ?</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-6">
              Pourquoi cet accompagnement ?
            </h2>
            <p className="text-[1rem] text-encre-700 leading-[1.85] mb-6">
              Parce qu'il n'est pas toujours facile :
            </p>
            <ul className="space-y-3 mb-8">
              {SUISSE_CONTENT.pourquoiItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.97rem] text-encre-700 leading-[1.7]">
                  <span className="text-rouge-800 font-bold mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[1rem] text-encre-700 leading-[1.85]">
              {SUISSE_CONTENT.pourquoiConclusion}
            </p>
          </div>
        </div>
      </section>

      {/* ─── TARIFS ────────────────────────────────────── */}
      <section id="tarifs" className="section-pad bg-white">
        <div className="container-main">
          <div className="max-w-[900px] mx-auto">
            <span className="section-label">Investissement</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-10">
              Tarifs
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {SUISSE_CONTENT.tarifs.map((tarif, i) => (
                <div
                  key={i}
                  className={`p-6 md:p-8 border rounded-sm flex flex-col ${i === 1
                      ? "border-rouge-800/30 bg-rouge-50/30"
                      : "border-encre-100 bg-encre-50/50"
                    }`}
                >
                  <h3 className="font-serif text-[1.15rem] text-encre-800 mb-2 leading-[1.3]">
                    {tarif.title}
                  </h3>
                  <p className={`text-[1.3rem] font-semibold mb-5 ${i === 1 ? "text-rouge-800" : "text-encre-800"}`}>
                    {tarif.price}
                  </p>
                  <p className="text-[0.82rem] text-encre-600 mb-4 leading-[1.7]">
                    {tarif.description}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {tarif.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[0.9rem] text-encre-700 leading-[1.6]"
                      >
                        <span className="text-or-500 mt-0.5 flex-shrink-0">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Note tarifs */}
            <div className="mt-10 p-6 bg-encre-50 border border-encre-100 rounded-sm">
              <h4 className="font-serif text-[1.05rem] text-encre-800 mb-3">Important</h4>
              <p className="text-[0.92rem] text-encre-700 leading-[1.8]">
                {SUISSE_CONTENT.tarifsNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Besoin d'aide pour rédiger vos courriers ?
          </h2>
          <p className="text-white/70 mb-9 max-w-md mx-auto leading-[1.75]">
            Décrivez-moi votre situation — je vous réponds personnellement sous 48 heures.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Me contacter
            </Link>
            <Link href="/faq" className="btn btn-ghost-white">
              Consulter la FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
