import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Découvrez tous les services juridiques de Loubna Abouz Manta : licenciement, rupture conventionnelle, harcèlement, contrats de travail, conseil RH et assistance précontentieuse.",
  openGraph: {
    title: `Services – ${SITE_CONFIG.name}`,
    description:
      "Accompagnement juridique complet en droit du travail pour salariés et employeurs.",
  },
};

const CATEGORIES = [
  { key: "salarie", label: "Pour les salariés" },
  { key: "employeur", label: "Pour les employeurs" },
  { key: "all", label: "Documents & prévention" },
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
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">Services</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Un accompagnement
            <br />
            <em className="text-or-500 font-light" style={{ fontStyle: "italic" }}>
              sur mesure.
            </em>
          </h1>
          <p className="text-white/50 text-[1rem] max-w-[520px] mt-5 leading-[1.8]">
            Du conseil préventif à l'assistance précontentieuse, je vous accompagne à chaque
            étape de votre situation juridique en droit du travail.
          </p>
        </div>
      </section>

      {/* ─── INTRO ─────────────────────────────────────── */}
      <section className="pt-16 pb-4 bg-encre-50">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Expertise complète</span>
            <p className="text-[1.02rem] text-encre-500 leading-[1.85]">
              Chaque service est pensé pour répondre à une problématique précise du droit du travail.
              Que vous soyez salarié confronté à une situation difficile ou employeur cherchant à sécuriser
              vos pratiques, vous trouverez ici un accompagnement adapté à votre contexte.
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
                {/* Category header */}
                <div className="flex items-center gap-5 mb-9">
                  <h2 className="font-serif text-[1.65rem] text-encre-950 whitespace-nowrap">
                    {cat.label}
                  </h2>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "linear-gradient(to right, rgba(139,0,0,.3), transparent)" }}
                  />
                </div>

                {/* Service cards grid */}
                <div
                  className={`grid gap-5 ${
                    cat.key === "all"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-[66%]"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {items.map((service, i) => (
                    <ServiceCard key={i} service={service} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* ─── Disclaimer ──────────────────────────── */}
          <div className="mt-16 bg-white border border-encre-100 border-l-[4px] border-l-or-500 p-8 rounded-sm max-w-2xl">
            <h4 className="font-serif text-[1.15rem] text-encre-950 mb-3">
              ℹ️ Note importante
            </h4>
            <p className="text-[0.9rem] text-encre-500 leading-[1.85]">
              En tant que juriste (et non avocate inscrite au barreau), mon intervention
              se situe en conseil, accompagnement et assistance précontentieuse. Pour la
              représentation en justice, je vous oriente vers un avocat partenaire si
              nécessaire. Cette précision vous garantit un accompagnement transparent
              et parfaitement adapté.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Discutons de votre situation.
          </h2>
          <p className="text-white/70 mb-9 max-w-md mx-auto leading-[1.75]">
            Chaque dossier est unique. Prenez contact pour une analyse personnalisée.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Prendre rendez-vous
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

/* ─── Service Card ────────────────────────────────────────── */
function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  return (
    <Link
      href="/contact"
      className="service-card group flex flex-col h-full"
    >
      <span className="text-[1.75rem] mb-4 block">{service.icon}</span>
      <h3 className="font-serif text-[1.18rem] text-encre-950 mb-2.5">
        {service.title}
      </h3>
      <p className="text-[0.87rem] text-encre-500 leading-[1.75] mb-6 flex-1">
        {service.description}
      </p>
      <span className="text-[0.73rem] font-bold tracking-[0.08em] uppercase text-rouge-800 group-hover:tracking-[0.12em] transition-all inline-flex items-center gap-1.5">
        Demander conseil
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </Link>
  );
}
