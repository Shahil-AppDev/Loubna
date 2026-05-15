import FormationCard from "@/components/formations/FormationCard";
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
        <div className="container-main relative z-10 pt-20 pb-14 md:pb-16">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Accueil
            </Link>
            <span>›</span>
            <span className="text-or-500">Formations</span>
          </nav>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-or-500">
              <span className="h-px w-8 bg-or-500/80" aria-hidden />
              Entreprise &amp; RH
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.1]">
              Formations
            </h1>
            <p className="mt-5 text-[1rem] text-white/85 leading-[1.85] max-w-2xl">
              Des parcours concrets pour sécuriser vos pratiques — prévention des accidents du travail et
              exercice du pouvoir disciplinaire — adaptables à vos enjeux et à votre organisation.
            </p>
          </div>
        </div>
      </section>

      <section className="relative section-pad bg-encre-50 overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[min(100%,720px)] -translate-x-1/2 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.14), transparent 65%)",
          }}
          aria-hidden
        />
        <div className="container-main relative max-w-[880px] space-y-10 md:space-y-14">
          <FormationCard index={1} title={FORMATION_ACCIDENTS_TITRE}>
            {FORMATION_ACCIDENTS_BLOC}
          </FormationCard>
          <FormationCard index={2} title={FORMATION_DISCIPLINAIRE_TITRE}>
            {FORMATION_DISCIPLINAIRE_BLOC}
          </FormationCard>
        </div>
      </section>

      <section className="section-pad bg-encre-950 border-t border-white/5">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-or-500 mb-4">
              Prochaine étape
            </p>
            <h2 className="font-serif text-[clamp(1.65rem,4vw,2.25rem)] text-white leading-tight mb-4">
              Besoin d&apos;une formation sur-mesure ?
            </h2>
            <p className="text-[0.95rem] text-white/65 leading-[1.8] mb-9">
              Décrivez votre contexte : je vous réponds pour ajuster le format, le public et les modalités.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary">
                Prendre contact
              </Link>
              <Link href="/services" className="btn btn-ghost-white">
                Interventions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
