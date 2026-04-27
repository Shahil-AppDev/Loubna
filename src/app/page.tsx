import { SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";
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
              Accompagnement &amp; information en droit du travail (FR/AR)
            </span>
            <span className="block w-6 md:w-8 h-px bg-or-500 opacity-60" />
          </div>

          {/* H1 */}
          <h1 className="font-serif text-[clamp(2rem,7vw,4.6rem)] font-semibold text-white leading-[1.1] mb-4 md:mb-6 max-w-3xl">
            Juriste en droit du travail,
            <br />
            <em className="font-light text-or-500 not-italic" style={{ fontStyle: "italic" }}>
              prévention des risques professionnels.
            </em>
          </h1>

          <p className="text-[0.95rem] md:text-[1.05rem] text-white/60 max-w-[540px] leading-[1.7] md:leading-[1.8] mb-3 md:mb-4">
            Loubna Abouz Manta accompagne salariés et entreprises dans la compréhension
            de leurs situations professionnelles et la prévention des risques —
            en amont des procédures, avec rigueur et confidentialité.
          </p>
          <p className="text-[0.85rem] md:text-[0.9rem] text-or-400/80 max-w-[540px] leading-[1.6] mb-6 md:mb-10 font-medium">
            J&apos;interviens dans une démarche d&apos;accompagnement, d&apos;information et de prévention en droit du travail. · Accompagnement bilingue français / arabe
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-10 md:mb-16">
            <Link href="/contact" className="btn btn-primary text-center justify-center">
              Prendre contact
            </Link>
            <Link href="/services" className="btn btn-ghost text-center justify-center">
              Découvrir les interventions
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:flex md:flex-wrap md:items-center md:gap-0">
            {[
              { num: "Master", label: "Droit & Management" },
              { num: "100%", label: "Confidentialité" },
              { num: "48h", label: "Délai de réponse" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-center md:justify-start">
                {i > 0 && (
                  <div className="hidden md:block w-px h-9 bg-white/15 mx-7" />
                )}
                <div className="text-center md:text-left">
                  <div className="font-serif text-[1.2rem] md:text-[1.8rem] font-bold text-white leading-none">
                    {stat.num}
                  </div>
                  <div className="text-[0.6rem] md:text-[0.68rem] text-white/45 tracking-[0.08em] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
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
            <span className="section-label">Domaines d&apos;intervention</span>
            <h2 className="font-serif text-[clamp(1.6rem,5vw,2.8rem)] text-encre-950 leading-[1.2]">
              Un accompagnement centré
              <br />
              <em className="text-rouge-800 font-light not-italic" style={{ fontStyle: "italic" }}>
                sur la prévention
              </em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { icon: "🔍", title: "Salariés", desc: "Compréhension de situation, procédure disciplinaire, fin de contrat, harcèlement — comprenez vos droits et les enjeux de votre situation." },
              { icon: "🏢", title: "Employeurs", desc: "Sécurisation des contrats, DUERP, prévention des risques professionnels, procédures disciplinaires — anticipez les risques juridiques." },
              { icon: "⚠️", title: "Prévention des risques", desc: "Identification et évaluation des risques professionnels, RPS, accidents du travail, maladies professionnelles. Mise en place de mesures préventives." },
              { icon: "📋", title: "DUERP", desc: "Réalisation et mise à jour du Document Unique d'Évaluation des Risques Professionnels. Obligation légale pour toute entreprise employant des salariés." },
            ].map((card, i) => (
              <Link href="/services" key={i} className="expertise-card group block">
                <span className="text-2xl md:text-3xl mb-4 md:mb-5 block">{card.icon}</span>
                <h3 className="font-serif text-[1.1rem] md:text-[1.25rem] text-encre-950 mb-2 md:mb-3">{card.title}</h3>
                <p className="text-[0.85rem] md:text-[0.88rem] text-encre-500 leading-[1.6] md:leading-[1.7] mb-4 md:mb-5">{card.desc}</p>
                <span className="text-[0.7rem] md:text-[0.75rem] font-bold tracking-[0.08em] uppercase text-rouge-800 group-hover:tracking-[0.12em] transition-all">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* POURQUOI */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-900">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
            <div>
              <span className="section-label-gold">Pourquoi me faire confiance</span>
              <h2 className="font-serif text-[clamp(1.6rem,5vw,2.8rem)] text-white leading-[1.2] mb-4 md:mb-6">
                Une approche préventive,
                <br />
                <em className="text-or-500 font-light" style={{ fontStyle: "italic" }}>
                  adaptée à chaque situation
                </em>
              </h2>
              <p className="text-white/55 text-[0.9rem] md:text-[0.95rem] leading-[1.75] md:leading-[1.85] mb-6 md:mb-9">
                En droit du travail, chaque situation est unique. Mon objectif est de vous apporter
                un accompagnement rigoureux, accessible et adapté — que vous soyez salarié souhaitant
                comprendre votre situation ou employeur cherchant à sécuriser vos pratiques.
              </p>
              <Link href="/a-propos" className="btn btn-outline-white">
                Mon parcours →
              </Link>
            </div>
            <div>
              {[
                ["01", "Intervention en amont", "J'interviens avant que les situations ne dégénèrent. Intervenir tôt, c'est éviter l'escalade vers des procédures coûteuses et épuisantes."],
                ["02", "Écoute et clarté", "Je traduis le droit en langage accessible. Vous comprenez chaque enjeu, chaque décision."],
                ["03", "Confidentialité absolue", "Vos informations sont strictement confidentielles. Discrétion et professionnalisme sont au cœur de mon exercice."],
                ["04", "Orientation si nécessaire", "Si votre situation nécessite une procédure judiciaire, vous êtes orienté(e) vers un avocat compétent en droit du travail."],
              ].map(([num, title, desc], i) => (
                <div key={i} className={`trust-item ${i === 0 ? "pt-0" : ""} ${i === 3 ? "border-b-0 pb-0" : ""}`}>
                  <div className="font-serif text-[1.8rem] md:text-[2.2rem] font-bold leading-none flex-shrink-0 w-12 md:w-14"
                    style={{ color: "rgba(201,168,76,.18)" }}>
                    {num}
                  </div>
                  <div>
                    <h4 className="font-serif text-[1rem] md:text-[1.1rem] text-white mb-1.5 md:mb-2">{title}</h4>
                    <p className="text-[0.85rem] md:text-[0.88rem] text-white/45 leading-[1.65] md:leading-[1.75]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* PROCESSUS */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="text-center mb-10 md:mb-16">
            <span className="section-label">Comment ça fonctionne</span>
            <h2 className="font-serif text-[clamp(1.6rem,5vw,2.8rem)] text-encre-950 leading-[1.2]">
              Un accompagnement
              <br />
              <em className="text-rouge-800 font-light" style={{ fontStyle: "italic" }}>
                structuré et humain
              </em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
            <div
              className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px"
              style={{ background: "linear-gradient(to right, #8B0000, rgba(139,0,0,.1))" }}
            />
            {[
              ["1", "Premier contact", "Vous m'exposez votre situation via le formulaire ou par téléphone. Je prends le temps d'écouter."],
              ["2", "Évaluation de la situation", "J'évalue votre situation avec rigueur et vous propose une première orientation claire sous 48h."],
              ["3", "Accompagnement adapté", "Ensemble, nous définissons la meilleure approche en fonction de vos objectifs et de votre situation."],
              ["4", "Orientation si besoin", "Si votre situation nécessite une représentation en justice, vous êtes orienté(e) vers un avocat compétent."],
            ].map(([n, t, d], i) => (
              <div key={i} className="process-step">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-rouge-800 text-white font-serif text-[1.2rem] md:text-[1.4rem] font-bold flex items-center justify-center mx-auto mb-4 md:mb-6 relative z-10 shadow-rouge-md">
                  {n}
                </div>
                <h4 className="font-serif text-[1rem] md:text-[1.12rem] text-encre-950 mb-2 md:mb-3">{t}</h4>
                <p className="text-[0.82rem] md:text-[0.86rem] text-encre-500 leading-[1.65] md:leading-[1.75]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* TÉMOIGNAGES */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-100">
        <div className="container-main">
          <div className="text-center mb-10 md:mb-14">
            <span className="section-label">Témoignages</span>
            <h2 className="font-serif text-[clamp(1.6rem,5vw,2.8rem)] text-encre-950 leading-[1.2]">
              Ce que disent
              <br />
              <em className="text-rouge-800 font-light" style={{ fontStyle: "italic" }}>
                mes clients
              </em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div
                  className="font-serif text-[5rem] leading-[0.8] absolute top-5 left-8 select-none"
                  style={{ color: "rgba(139,0,0,.12)" }}
                >
                  &ldquo;
                </div>
                <p className="font-serif text-[1.02rem] italic text-encre-900 leading-[1.75] mb-7 relative z-10">
                  {t.text}
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-rouge-800 text-white flex items-center justify-center text-[0.72rem] font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <span className="block font-semibold text-[0.9rem] text-encre-950">
                      {t.name}
                    </span>
                    <span className="block text-[0.75rem] text-encre-400 tracking-[0.04em]">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[0.75rem] text-encre-400 italic">
            * Témoignages illustratifs — à remplacer par vos vrais avis clients
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CTA BANNER */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-5 leading-[1.2]">
            Votre situation mérite
            <br />
            un accompagnement sérieux.
          </h2>
          <p className="text-white/70 text-[1rem] mb-10 max-w-[500px] mx-auto leading-[1.75]">
            N&apos;attendez pas que la situation s&apos;aggrave. Prenez contact dès aujourd&apos;hui
            — première orientation sous 48h.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Prendre contact
            </Link>
            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="btn btn-ghost-white">
              📞 {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* DISCLAIMER */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="bg-encre-900 border-t border-encre-800">
        <div className="container-main py-5">
          <p className="text-encre-400 text-xs text-center leading-relaxed mb-1">
            <span className="text-or-400 mr-1">ℹ</span>
            <strong className="text-encre-300">Prestations d&apos;accompagnement, d&apos;information et de prévention – hors consultation juridique réglementée.</strong>
          </p>
          <p className="text-encre-400 text-xs text-center leading-relaxed">
            Les prestations proposées relèvent de l&apos;information, de l&apos;accompagnement et de la prévention en droit du travail. Elles ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d&apos;avocat.
          </p>
        </div>
      </div>
    </>
  );
}
