import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_ITEMS, SITE_CONFIG } from "@/lib/constants";
import FaqAccordion from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ – Questions fréquentes",
  description:
    "Réponses aux questions fréquentes en droit du travail : licenciement, rupture conventionnelle, harcèlement, droits du salarié, procédures disciplinaires.",
  openGraph: {
    title: `FAQ – ${SITE_CONFIG.name}`,
    description:
      "Questions fréquentes en droit du travail : réponses claires et professionnelles.",
  },
};

const FAQ_CATEGORIES = [
  { key: "salarie",   label: "Pour les salariés" },
  { key: "employeur", label: "Pour les employeurs" },
  { key: "general",   label: "Questions générales" },
];

export default function FaqPage() {
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
            <span className="text-or-500">FAQ</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Questions
            <br />
            <em className="text-or-500 font-light" style={{ fontStyle: "italic" }}>
              fréquentes.
            </em>
          </h1>
          <p className="text-white/50 text-[1rem] max-w-[500px] mt-5 leading-[1.8]">
            Retrouvez ici les réponses aux questions les plus courantes en droit du travail.
            Votre situation est différente ? Contactez-moi directement.
          </p>
        </div>
      </section>

      {/* ─── FAQ CONTENT ───────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto">

            {FAQ_CATEGORIES.map((cat) => {
              const items = FAQ_ITEMS.filter((f) => f.category === cat.key);
              if (items.length === 0) return null;
              return (
                <div key={cat.key} className="mb-16 last:mb-0">
                  {/* Category header */}
                  <div className="flex items-center gap-5 mb-8">
                    <h2 className="font-serif text-[1.55rem] text-encre-950 whitespace-nowrap">
                      {cat.label}
                    </h2>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(139,0,0,.3), transparent)",
                      }}
                    />
                  </div>
                  <FaqAccordion items={items} />
                </div>
              );
            })}

            {/* ─── CTA card ────────────────────────── */}
            <div className="mt-14 text-center p-12 bg-white border border-encre-100 rounded-sm shadow-sm">
              <h3 className="font-serif text-[1.8rem] text-encre-950 mb-3">
                Vous ne trouvez pas la réponse ?
              </h3>
              <p className="text-encre-500 text-[0.93rem] mb-8 max-w-md mx-auto leading-[1.75]">
                Chaque situation est unique. Posez-moi directement votre question —
                je vous réponds personnellement sous 48h.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Poser ma question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCHEMA.ORG FAQ structured data ───────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
