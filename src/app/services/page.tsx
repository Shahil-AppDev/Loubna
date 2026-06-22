import { SERVICE_NOTE_IMPORTANTE } from "@/lib/client-service-note";
import PricingDisclaimer from "@/components/ui/PricingDisclaimer";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services & Interventions Juridiques | Loubna Abouz Manta",
  description: "Accompagnement en droit du travail pour salariés et employeurs : rédaction de contrat, sanctions disciplinaires, DUERP, accidents du travail, RPS, rupture conventionnelle.",
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/services",
  },
  openGraph: {
    title: "Services & Interventions Juridiques | Loubna Abouz Manta",
    description: "Accompagnement en droit du travail pour salariés et employeurs : rédaction de contrat, sanctions disciplinaires, DUERP, accidents du travail, RPS, rupture conventionnelle.",
    url: "https://juriste-droit-du-travail.com/services",
    siteName: "Loubna Abouz Manta - Juriste en Droit du Travail",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Interventions Juridiques | Loubna Abouz Manta",
    description: "Accompagnement en droit du travail pour salariés et employeurs : rédaction de contrat, sanctions disciplinaires, DUERP, accidents du travail, RPS, rupture conventionnelle.",
  },
};

const CATEGORIES = [
  { key: "salarie", label: "Pour les salariés" },
  { key: "employeur", label: "Pour les employeurs" },
  { key: "all", label: "Salariés & employeurs" },
];

export default function ServicesPage() {
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
            <span className="text-or-500">Interventions</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Des interventions
            <br />
            <span className="text-or-500 font-light">
              adaptées à chaque situation.
            </span>
          </h1>
          <p className="text-white/85 text-[1rem] max-w-[520px] mt-5 leading-[1.8] whitespace-pre-line">
            {`J'interviens dans une démarche de prévention, d'accompagnement et de sécurisation des situations en droit du travail.`}
          </p>
        </div>
      </section>

      {/* ─── INTRO ─────────────────────────────────────── */}
      <section className="pt-16 pb-4 bg-encre-50">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Droit du travail · Prévention</span>
            <p className="text-[1.02rem] text-encre-700 leading-[1.85] whitespace-pre-line">
              {`J'interviens dans une démarche de prévention, d'accompagnement et de sécurisation des situations en droit du travail.`}
            </p>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          {CATEGORIES.map((cat) => {
            const items = SERVICES.filter((s) => s.category === cat.key);
            if (items.length === 0) return null;
            return (
              <div key={cat.key} className="mb-20 last:mb-0">
                <div className="flex items-center gap-5 mb-9">
                  <h2 className="font-serif text-[1.65rem] text-encre-800 whitespace-nowrap">
                    {cat.label}
                  </h2>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "linear-gradient(to right, rgba(139,0,0,.3), transparent)" }}
                  />
                </div>

                <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((service, i) => (
                    <ServiceCard key={i} service={service} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* ─── Disclaimer ──────────────────────────── */}
          <div className="mt-16 bg-white border border-encre-100 border-l-[4px] border-l-or-500 p-8 rounded-sm max-w-2xl">
            <h4 className="font-serif text-[1.15rem] text-encre-800 mb-3">
              ℹ️ Note importante
            </h4>
            <div className="text-[0.9rem] text-encre-700 leading-[1.85] space-y-3 whitespace-pre-line">
              {SERVICE_NOTE_IMPORTANTE[0]}
              {"\n\n"}
              {SERVICE_NOTE_IMPORTANTE[1]}
              {"\n\n"}
              {SERVICE_NOTE_IMPORTANTE.slice(2, 5).join("\n")}
              {"\n\n"}
              {SERVICE_NOTE_IMPORTANTE[5]}
              {"\n\n"}
              {SERVICE_NOTE_IMPORTANTE[6]}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-encre-50 border-t border-encre-200">
        <div className="container-main py-10">
          <PricingDisclaimer className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Discutons de votre situation.
          </h2>
          <p className="text-white/70 mb-9 max-w-md mx-auto leading-[1.75]">
            Chaque situation est unique. Prenez contact pour un accompagnement personnalisé.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rendez-vous/?service=a1000001-0000-0000-0000-000000000001" className="btn btn-white">
              Prendre contact
            </Link>
            <Link href="/faq" className="btn btn-ghost-white">
              Consulter la FAQ
            </Link>
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
                "name": "Interventions",
                "item": "https://juriste-droit-du-travail.com/services"
              }
            ]
          })
        }}
      />
    </>
  );
}

const SLUGS_WITH_DETAIL_PAGE = new Set([
  "prevention-risques",
  "duerp",
  "sante-securite",
]);

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  const hasDetailPage = SLUGS_WITH_DETAIL_PAGE.has(service.slug);
  const href = hasDetailPage ? `/services/${service.slug}` : "/rendez-vous/?service=a1000001-0000-0000-0000-000000000001";

  return (
    <Link
      href={href}
      className="service-card group flex flex-col h-full"
    >
      <span className="text-[1.75rem] mb-4 block">{service.icon}</span>
      <h3 className="font-serif text-[1.18rem] text-encre-800 mb-2.5">
        {service.title}
      </h3>
      <p className="text-[0.87rem] text-encre-700 leading-[1.75] mb-6 flex-1 whitespace-pre-line">
        {service.description}
      </p>
      <span className="text-[0.73rem] font-bold tracking-[0.08em] uppercase text-rouge-800 group-hover:tracking-[0.12em] transition-all inline-flex items-center gap-1.5">
        {hasDetailPage ? "En savoir plus" : "Prendre contact"}
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </Link>
  );
}
