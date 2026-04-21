import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} – ${SITE_CONFIG.title} | Conseil & Accompagnement`,
  description: SITE_CONFIG.description,
  openGraph: {
    title: `${SITE_CONFIG.name} – ${SITE_CONFIG.title}`,
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
        className="relative min-h-screen flex items-center overflow-hidden bg-encre-950"
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

        <div className="container-main relative z-10 py-24">
          {/* Badge */}
          <div className="flex items-center gap-4 mb-7">
            <span className="block w-8 h-px bg-or-500 opacity-60" />
            <span className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-or-500">
              Juriste spécialisée · Droit du travail
            </span>
            <span className="block w-8 h-px bg-or-500 opacity-60" />
          </div>

          {/* H1 */}
          <h1 className="font-serif text-[clamp(2.8rem,5.5vw,4.6rem)] font-semibold text-white leading-[1.1] mb-6 max-w-3xl">
            Votre droit du travail,
            <br />
            <em className="font-light text-or-500 not-italic" style={{ fontStyle: "italic" }}>
              défendu avec rigueur.
            </em>
          </h1>

          <p className="text-[1.05rem] text-white/60 max-w-[540px] leading-[1.8] mb-10">
            Loubna Abouz Manta vous accompagne dans toutes vos situations
            juridiques liées au travail — avec clarté, écoute et un engagement
            sans compromis.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/contact" className="btn btn-primary">
              Prendre rendez-vous
            </Link>
            <Link href="/services" className="btn btn-ghost">
              Découvrir les services
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-0">
            {[
              { num: "+ 10", label: "ans d'expérience" },
              { num: "100%", label: "confidentialité" },
              { num: "48h", label: "délai de réponse" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && (
                  <div className="w-px h-9 bg-white/15 mx-7" />
                )}
                <div>
                  <div className="font-serif text-[2.1rem] font-bold text-white leading-none">
                    {stat.num}
                  </div>
                  <div className="text-[0.68rem] text-white/45 tracking-[0.08em] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-[0.62rem] tracking-[0.2em] uppercase text-white/35">Défiler</span>
          <div
            className="w-px h-12 animate-scroll-pulse"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,.3), transparent)" }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* EXPERTISE */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="section-label">Domaines d'expertise</span>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] text-encre-950 leading-[1.2]">
              Un accompagnement complet
              <br />
              <em className="text-rouge-800 font-light not-italic" style={{ fontStyle: "italic" }}>
                en droit du travail
              </em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "⚖️", title: "Salariés", desc: "Licenciement abusif, harcèlement, rupture conventionnelle — je défends vos droits face à l'employeur." },
              { icon: "🏢", title: "Employeurs", desc: "Sécurisation des contrats, procédures disciplinaires, gestion des conflits internes." },
              { icon: "📄", title: "Documents juridiques", desc: "Rédaction, relecture et analyse de contrats et tout document à portée juridique." },
              { icon: "🛡️", title: "Prévention & conseil", desc: "Anticiper les risques, sécuriser vos pratiques RH et prévenir les litiges." },
            ].map((card, i) => (
              <Link href="/services" key={i} className="expertise-card group block">
                <span className="text-3xl mb-5 block">{card.icon}</span>
                <h3 className="font-serif text-[1.25rem] text-encre-950 mb-3">{card.title}</h3>
                <p className="text-[0.88rem] text-encre-500 leading-[1.7] mb-5">{card.desc}</p>
                <span className="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-rouge-800 group-hover:tracking-[0.12em] transition-all">
                  En savoir plus →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* WHY TRUST */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-900">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <span className="section-label-gold">Pourquoi me faire confiance</span>
              <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] text-white leading-[1.2] mb-6">
                Une expertise juridique
                <br />
                <em className="text-or-500 font-light" style={{ fontStyle: "italic" }}>
                  à votre service
                </em>
              </h2>
              <p className="text-white/55 text-[0.95rem] leading-[1.85] mb-9">
                En droit du travail, chaque situation est unique. Ma mission est de vous apporter
                une réponse juridique précise, claire et adaptée à votre contexte — que vous soyez
                salarié en difficulté ou employeur face à un litige.
              </p>
              <Link href="/a-propos" className="btn btn-outline-white">
                Mon parcours →
              </Link>
            </div>
            <div>
              {[
                ["01", "Spécialisation exclusive", "Je concentre toute mon expertise sur le droit du travail. Pas de généralisme — une maîtrise pointue de votre domaine."],
                ["02", "Écoute et clarté", "Je traduis le droit en langage accessible. Vous comprenez chaque étape, chaque décision."],
                ["03", "Confidentialité absolue", "Vos informations sont strictement confidentielles. Discrétion et professionnalisme sont au cœur de mon exercice."],
                ["04", "Réactivité garantie", "Réponse sous 48h ouvrées. Parce qu'une situation juridique ne peut pas toujours attendre."],
              ].map(([num, title, desc], i) => (
                <div key={i} className={`trust-item ${i === 0 ? "pt-0" : ""} ${i === 3 ? "border-b-0 pb-0" : ""}`}>
                  <div className="font-serif text-[2.2rem] font-bold leading-none flex-shrink-0 w-14"
                    style={{ color: "rgba(201,168,76,.18)" }}>
                    {num}
                  </div>
                  <div>
                    <h4 className="font-serif text-[1.1rem] text-white mb-2">{title}</h4>
                    <p className="text-[0.88rem] text-white/45 leading-[1.75]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* PROCESS */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="section-label">Comment ça fonctionne</span>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] text-encre-950 leading-[1.2]">
              Un accompagnement
              <br />
              <em className="text-rouge-800 font-light" style={{ fontStyle: "italic" }}>
                structuré et humain
              </em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px"
              style={{ background: "linear-gradient(to right, #8B0000, rgba(139,0,0,.1))" }}
            />
            {[
              ["1", "Premier contact", "Vous m'exposez votre situation via le formulaire ou par téléphone. Je prends le temps d'écouter."],
              ["2", "Analyse juridique", "J'analyse votre dossier avec rigueur et vous propose une première orientation claire sous 48h."],
              ["3", "Stratégie adaptée", "Ensemble, nous définissons la meilleure approche juridique en fonction de vos objectifs."],
              ["4", "Suivi continu", "Je vous accompagne à chaque étape, de la consultation jusqu'à la résolution de votre situation."],
            ].map(([n, t, d], i) => (
              <div key={i} className="process-step">
                <div className="w-16 h-16 rounded-full bg-rouge-800 text-white font-serif text-[1.4rem] font-bold flex items-center justify-center mx-auto mb-6 relative z-10 shadow-rouge-md">
                  {n}
                </div>
                <h4 className="font-serif text-[1.12rem] text-encre-950 mb-3">{t}</h4>
                <p className="text-[0.86rem] text-encre-500 leading-[1.75]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* TESTIMONIALS */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="section-pad bg-encre-100">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="section-label">Témoignages</span>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] text-encre-950 leading-[1.2]">
              Ce que disent
              <br />
              <em className="text-rouge-800 font-light" style={{ fontStyle: "italic" }}>
                mes clients
              </em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div
                  className="font-serif text-[5rem] leading-[0.8] absolute top-5 left-8 select-none"
                  style={{ color: "rgba(139,0,0,.12)" }}
                >
                  "
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
            une réponse juridique précise.
          </h2>
          <p className="text-white/70 text-[1rem] mb-10 max-w-[500px] mx-auto leading-[1.75]">
            Ne laissez pas votre dossier sans réponse. Prenez contact dès
            aujourd'hui — première analyse sous 48h.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Prendre contact maintenant
            </Link>
            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="btn btn-ghost-white">
              📞 {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
