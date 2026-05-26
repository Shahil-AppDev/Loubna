import { HOMEPAGE_CONTENT } from "@/data/homepage";
import { LEGAL_DISCLAIMERS } from "@/data/legal";
import { SITE_CONFIG } from "@/data/site-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
  description: SITE_CONFIG.description,
  openGraph: {
    title: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
    description: SITE_CONFIG.description,
  },
};

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════ */}
      {/* HERO */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-encre-950"
        style={{ paddingTop: "var(--nav-h)" }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Red glow */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,.28) 0%, transparent 70%)" }}
        />

        <div className="container-main relative z-10 py-12 md:py-24">
          {/* Badge */}
          <div className="flex items-center gap-2 md:gap-4 mb-5 md:mb-7">
            <span className="block w-6 md:w-8 h-px bg-or-500 opacity-60" />
            <span className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.18em] md:tracking-[0.22em] uppercase text-or-500">
              {HOMEPAGE_CONTENT.hero.badge}
            </span>
            <span className="block w-6 md:w-8 h-px bg-or-500 opacity-60" />
          </div>

          {/* H1 */}
          <h1 className="font-serif text-[clamp(2rem,7vw,4.6rem)] font-semibold text-white leading-[1.1] mb-4 md:mb-6 max-w-3xl">
            {HOMEPAGE_CONTENT.hero.title}
            <br />
            <span className="font-light text-or-500">
              {HOMEPAGE_CONTENT.hero.titleAccent}
            </span>
          </h1>

          <p className="text-[0.95rem] md:text-[1.05rem] text-white/85 max-w-[540px] leading-[1.7] md:leading-[1.8] mb-6 md:mb-10">
            {HOMEPAGE_CONTENT.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-10 md:mb-16">
            <Link href="/rendez-vous/?service=a1000001-0000-0000-0000-000000000001" className="btn btn-primary text-center justify-center">
              Prendre contact
            </Link>
            <Link href="/services" className="btn btn-ghost text-center justify-center">
              Découvrir les interventions
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 z-10">
          <span className="text-[0.62rem] tracking-[0.2em] uppercase text-white/35">Défiler</span>
          <div
            className="w-px h-12 animate-scroll-pulse"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,.3), transparent)" }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* DOMAINES */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="text-center mb-10 md:mb-14">
            <span className="section-label">{HOMEPAGE_CONTENT.domainesSection.label}</span>
            <h2 className="font-serif text-[clamp(1.6rem,5vw,2.8rem)] text-encre-800 leading-[1.2]">
              {HOMEPAGE_CONTENT.domainesSection.title}
              <br />
              <span className="text-rouge-800 font-light">
                {HOMEPAGE_CONTENT.domainesSection.titleAccent}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {HOMEPAGE_CONTENT.domainesSection.cards.map((card, i) => (
              <Link href="/services" key={i} className="expertise-card group block">
                <span className="text-2xl md:text-3xl mb-4 md:mb-5 block">{card.icon}</span>
                <h3 className="font-serif text-[1.1rem] md:text-[1.25rem] text-encre-800 mb-2 md:mb-3">{card.title}</h3>
                <p className="text-[0.85rem] md:text-[0.88rem] text-encre-700 leading-[1.6] md:leading-[1.7] mb-4 md:mb-5">{card.description}</p>
                <span className="text-[0.7rem] md:text-[0.75rem] font-bold tracking-[0.08em] uppercase text-rouge-800 group-hover:tracking-[0.12em] transition-all">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/rendez-vous/?service=a1000001-0000-0000-0000-000000000001" className="btn btn-white">
              Prendre contact
            </Link>
            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="btn btn-ghost-white">
              📞 {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      <div className="bg-encre-900 border-t border-encre-800">
        <div className="container-main py-5">
          <p className="text-encre-200 text-xs text-center leading-relaxed">
            <span className="text-or-400 mr-1">ℹ️</span>
            <span className="text-encre-100">{LEGAL_DISCLAIMERS.general}</span>
          </p>
        </div>
      </div>
    </>
  );
}
