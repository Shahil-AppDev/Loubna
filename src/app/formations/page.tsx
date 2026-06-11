import FormationBlock from "@/components/formations/FormationBlock";
import { FORMATIONS_LIST } from "@/content/client-formations-data";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Formations en Droit du Travail & Prévention | Loubna Abouz Manta",
  description: "Formations professionnelles en droit du travail pour entreprises et RH : prévention des risques, accidents du travail, DUERP, et pouvoir disciplinaire.",
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/formations",
  },
  openGraph: {
    title: "Formations en Droit du Travail & Prévention | Loubna Abouz Manta",
    description: "Formations professionnelles en droit du travail pour entreprises et RH : prévention des risques, accidents du travail, DUERP, et pouvoir disciplinaire.",
    url: "https://juriste-droit-du-travail.com/formations",
    siteName: "Loubna Abouz Manta - Juriste en Droit du Travail",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formations en Droit du Travail & Prévention | Loubna Abouz Manta",
    description: "Formations professionnelles en droit du travail pour entreprises et RH : prévention des risques, accidents du travail, DUERP, et pouvoir disciplinaire.",
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
            <span className="text-rouge-800">Formations</span>
          </nav>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-rouge-800">
              <span className="h-px w-8 bg-rouge-800/80" aria-hidden />
              Entreprise &amp; RH
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.1]">
              Formations
            </h1>
            <p className="mt-5 text-[1rem] text-white/85 leading-[1.85] max-w-2xl">
              Parcours en prévention des accidents du travail et en exercice du pouvoir disciplinaire —
              formats adaptables, en présentiel ou à distance.
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
        <div className="container-main relative max-w-[920px] space-y-12 md:space-y-16">
          {FORMATIONS_LIST.map((formation, i) => (
            <FormationBlock key={formation.id} data={formation} index={i + 1} />
          ))}
        </div>
      </section>

      <section className="section-pad bg-encre-950 border-t border-white/5">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-rouge-800 mb-4">
              Prochaine étape
            </p>
            <h2 className="font-serif text-[clamp(1.65rem,4vw,2.25rem)] text-white leading-tight mb-4">
              Une autre thématique à aborder ?
            </h2>
            <p className="text-[0.95rem] text-white/65 leading-[1.8] mb-9">
              Contactez-moi pour adapter le contenu, la durée et le format à votre organisation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/rendez-vous/?service=a1000001-0000-0000-0000-000000000001" className="btn btn-primary">
                Prendre contact
              </Link>
              <Link href="/services" className="btn btn-ghost-white">
                Interventions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://juriste-droit-du-travail.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Formations",
                "item": "https://juriste-droit-du-travail.com/formations"
              }
            ]
          })
        }}
      />
    </>
  );
}
