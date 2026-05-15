import {
  FORMATION_ACCIDENTS_BLOC,
  FORMATION_ACCIDENTS_TITRE,
  FORMATION_DISCIPLINAIRE_BLOC,
  FORMATION_DISCIPLINAIRE_TITRE,
} from "@/content/client-formations";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Formations — Loubna Abouz Manta, Juriste en Droit du Travail",
  description:
    "Formations en droit du travail et prévention des risques professionnels — textes conformes au document de référence.",
  openGraph: {
    title: `Formations – ${SITE_CONFIG.name}`,
    description:
      "Formations professionnelles en droit du travail et prévention des risques.",
  },
};

export default function FormationsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,.22) 0%, transparent 70%)" }}
        />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Accueil
            </Link>
            <span>›</span>
            <span className="text-or-500">Formations</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Formations
          </h1>
        </div>
      </section>

      <section className="section-pad bg-encre-50">
        <div className="container-main space-y-16 max-w-3xl">
          <article className="bg-white border border-encre-100 rounded-sm shadow-sm overflow-hidden">
            <header className="bg-encre-950 p-8">
              <h2 className="font-serif text-[1.25rem] md:text-[1.45rem] text-white leading-snug whitespace-pre-line">
                {FORMATION_ACCIDENTS_TITRE}
              </h2>
            </header>
            <div className="p-8 text-[0.95rem] text-encre-700 leading-[1.85] whitespace-pre-line">
              {FORMATION_ACCIDENTS_BLOC}
            </div>
          </article>

          <article className="bg-white border border-encre-100 rounded-sm shadow-sm overflow-hidden">
            <header className="bg-encre-950 p-8">
              <h2 className="font-serif text-[1.25rem] md:text-[1.45rem] text-white leading-snug whitespace-pre-line">
                {FORMATION_DISCIPLINAIRE_TITRE}
              </h2>
            </header>
            <div className="p-8 text-[0.95rem] text-encre-700 leading-[1.85] whitespace-pre-line">
              {FORMATION_DISCIPLINAIRE_BLOC}
            </div>
          </article>

          <div className="flex flex-wrap gap-4 justify-center pb-8">
            <Link href="/contact" className="btn btn-primary">
              Prendre contact
            </Link>
            <Link href="/services" className="btn btn-ghost">
              Interventions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
