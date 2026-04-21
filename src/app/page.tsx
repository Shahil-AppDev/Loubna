import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, SERVICES, TESTIMONIALS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import StarRating from "@/components/ui/StarRating";

export const metadata: Metadata = {
  title: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
  description:
    "Loubna Abouz Manta, juriste en droit du travail. Accompagnement des salariés et entreprises dans l'analyse de leurs situations professionnelles et la prévention des risques, en amont des procédures.",
};

const EXPERTISE_SALARIES = [
  "Analyser votre situation professionnelle et identifier les enjeux",
  "Comprendre le cadre applicable à votre contrat ou à votre situation",
  "Être orienté(e) dans les démarches à engager",
  "Identifier les situations de harcèlement ou de risques psychosociaux",
  "Comprendre les enjeux d'une rupture conventionnelle ou d'un licenciement",
];

const EXPERTISE_EMPLOYEURS = [
  "Sécuriser vos procédures internes et pratiques RH",
  "Réaliser ou mettre à jour votre DUERP",
  "Prévenir les risques professionnels et les situations conflictuelles",
  "Vérifier la conformité de vos documents contractuels",
  "Anticiper les risques en amont de toute procédure",
];

const STATS = [
  { value: "Master", label: "Droit & Management" },
  { value: "100%", label: "Distanciel possible" },
  { value: "Amont", label: "Intervention préventive" },
  { value: "100%", label: "Confidentialité" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-encre-950 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(201,168,76,0.3) 2px,
              rgba(201,168,76,0.3) 3px
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rouge-950/60 via-transparent to-encre-950/80" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />

        <div className="container-site relative z-10 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="animate-fade-up" style={{ animationFillMode: "both" }}>
                <SectionLabel light>Juriste · Droit du Travail · Prévention des Risques</SectionLabel>
              </div>

              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-[1.1] animate-fade-up animate-delay-100"
                style={{ animationFillMode: "both" }}
              >
                Juriste en droit du travail —{" "}
                <span className="relative">
                  <span className="text-or-400">prévention</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-or-500 to-transparent" />
                </span>{" "}
                des risques professionnels
              </h1>

              <p
                className="text-encre-300 text-base lg:text-lg leading-relaxed max-w-xl animate-fade-up animate-delay-200"
                style={{ animationFillMode: "both" }}
              >
                J&apos;interviens en amont afin d&apos;analyser les situations de travail,
                d&apos;identifier les risques professionnels et d&apos;accompagner salariés
                et entreprises dans une logique de prévention et de sécurisation
                des pratiques.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-300"
                style={{ animationFillMode: "both" }}
              >
                <Link href="/contact" className="btn-primary text-sm px-8 py-4">
                  Prendre contact
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/services" className="btn-outline-white text-sm px-8 py-4">
                  Découvrir mes interventions
                </Link>
              </div>

              {/* Trust signals */}
              <div
                className="flex flex-wrap gap-6 pt-4 animate-fade-up animate-delay-400"
                style={{ animationFillMode: "both" }}
              >
                {[
                  "Droit du travail",
                  "Salariés & Entreprises",
                  "Prévention des risques",
                  "100% Distanciel",
                ].map((tag) => (
                  <div key={tag} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-or-500" />
                    <span className="text-encre-300 text-xs tracking-wide">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo / Visual */}
            <div
              className="lg:col-span-5 flex justify-center lg:justify-end animate-scale-in animate-delay-200"
              style={{ animationFillMode: "both" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-or-500/10 rounded-full blur-3xl scale-110" />
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                  <Image
                    src="/logo.png"
                    alt="Loubna Abouz Manta — Juriste en Droit du Travail"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-encre-800 rounded-sm overflow-hidden border border-encre-800">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-encre-900 px-6 py-5 text-center">
                <p className="font-serif text-xl lg:text-2xl text-or-400 font-bold">{stat.value}</p>
                <p className="text-encre-400 text-xs mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOMAINES D'INTERVENTION ──────────────────── */}
      <section className="py-20 lg:py-28 bg-encre-50">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <SectionLabel>Domaines d&apos;intervention</SectionLabel>
            <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2">
              Une intervention centrée sur l&apos;amont et la prévention
            </h2>
            <div className="divider-or mx-auto" />
            <p className="text-encre-500 text-sm leading-relaxed">
              Mon approche repose sur l&apos;analyse préalable des situations professionnelles
              pour prévenir les risques et éviter les situations conflictuelles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Pour les salariés",
                icon: "👤",
                items: EXPERTISE_SALARIES,
              },
              {
                title: "Pour les entreprises",
                icon: "🏢",
                items: EXPERTISE_EMPLOYEURS,
              },
            ].map((col) => (
              <div
                key={col.title}
                className="bg-white border border-encre-100 rounded-sm p-8 hover:shadow-premium transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{col.icon}</span>
                  <h3 className="font-serif text-xl text-encre-950 font-semibold">{col.title}</h3>
                </div>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 w-4 h-4 rounded-full bg-rouge-50 border border-rouge-200 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-rouge-700" />
                      </span>
                      <span className="text-encre-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/services"
                    className="text-rouge-800 text-xs font-semibold tracking-wide uppercase hover:text-rouge-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    Voir mes interventions
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POURQUOI ME FAIRE CONFIANCE ──────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel>Mon positionnement</SectionLabel>
              <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2 mb-6">
                Agir en amont, analyser avec rigueur, orienter avec clarté
              </h2>
              <p className="text-encre-500 text-sm leading-relaxed mb-8">
                Mon activité repose sur une conviction : mieux vaut prévenir que subir.
                J&apos;interviens en amont des situations conflictuelles pour analyser,
                informer et orienter — avec rigueur, transparence et confidentialité.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: "⚖️",
                    title: "Rigueur analytique",
                    desc: "Chaque situation est analysée avec précision, en tenant compte du cadre juridique applicable et de la réalité du terrain.",
                  },
                  {
                    icon: "👂",
                    title: "Écoute & disponibilité",
                    desc: "Comprendre votre situation dans sa globalité est la condition d'un accompagnement vraiment adapté à vos besoins.",
                  },
                  {
                    icon: "🔒",
                    title: "Confidentialité absolue",
                    desc: "Tout échange est strictement confidentiel. Vos informations ne sont jamais transmises à des tiers sans votre accord explicite.",
                  },
                  {
                    icon: "💡",
                    title: "Clarté & pédagogie",
                    desc: "Je m'engage à vous expliquer les enjeux en langage clair, sans jargon inutile, pour que vous puissiez agir en connaissance de cause.",
                  },
                ].map((v) => (
                  <div key={v.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-rouge-50 border border-rouge-100 flex items-center justify-center flex-shrink-0 text-lg">
                      {v.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-encre-900 font-semibold mb-1">{v.title}</h4>
                      <p className="text-encre-500 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/a-propos" className="btn-secondary text-sm">
                  En savoir plus sur mon parcours
                </Link>
              </div>
            </div>

            {/* Quote block */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-or-300/30 rounded-sm" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-rouge-800/20 rounded-sm" />
              <div className="relative bg-encre-950 rounded-sm p-10 lg:p-12">
                <div className="font-serif text-5xl text-or-400 leading-none mb-6 opacity-60">&ldquo;</div>
                <blockquote className="font-serif text-lg lg:text-xl text-white/90 leading-relaxed italic mb-8">
                  Mon objectif est d&apos;apporter un accompagnement rigoureux, accessible
                  et adapté à chaque situation, dans une logique de prévention et de
                  sécurisation des pratiques professionnelles.
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-0.5 bg-or-500" />
                  <div>
                    <p className="text-white font-serif font-semibold text-sm">Loubna Abouz Manta</p>
                    <p className="text-or-400 text-xs tracking-wide mt-0.5">Juriste en droit du travail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES APERÇU ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-encre-50">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Mes interventions</SectionLabel>
              <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2">
                Un accompagnement complet
              </h2>
            </div>
            <Link
              href="/services"
              className="text-rouge-800 text-xs font-semibold tracking-wide uppercase hover:text-rouge-700 transition-colors duration-200 flex items-center gap-2 flex-shrink-0"
            >
              Voir toutes les interventions
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((service) => (
              <div key={service.id} className="card-premium group">
                <div className="text-2xl mb-4">{service.icon}</div>
                <h3 className="font-serif text-lg text-encre-950 font-semibold mb-3 group-hover:text-rouge-800 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-encre-500 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-encre-50 text-encre-500 rounded-sm border border-encre-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary text-sm">
              Voir les {SERVICES.length} domaines d&apos;intervention
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ────────────────────────── */}
      <section className="py-20 lg:py-28 bg-encre-950">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <SectionLabel light>Comment ça marche</SectionLabel>
            <h2 className="font-serif text-3xl lg:text-4xl text-white font-bold mt-2">
              Un accompagnement simple et structuré
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-or-500 to-or-300 my-6 mx-auto" />
            <p className="text-encre-300 text-sm leading-relaxed">
              De la première prise de contact à l&apos;orientation finale, chaque étape
              est pensée pour vous offrir clarté et sérénité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Prise de contact",
                desc: "Remplissez le formulaire ou contactez-moi directement. Je vous réponds sous 24–48h ouvrées.",
              },
              {
                num: "02",
                title: "Analyse de la situation",
                desc: "Premier échange pour comprendre votre situation, identifier les enjeux et les risques éventuels.",
              },
              {
                num: "03",
                title: "Accompagnement",
                desc: "Analyse approfondie, rédaction de documents, mise à jour du DUERP ou suivi selon vos besoins.",
              },
              {
                num: "04",
                title: "Orientation",
                desc: "Si votre situation nécessite une procédure judiciaire, vous êtes orienté(e) vers un avocat compétent en droit du travail.",
              },
            ].map((step, i) => (
              <div key={step.num} className="relative">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px border-t border-dashed border-encre-700 z-0" />
                )}
                <div className="relative z-10 bg-encre-900 border border-encre-800 rounded-sm p-7 hover:border-rouge-800/30 transition-all duration-300 h-full">
                  <div className="font-serif text-3xl text-or-500/40 font-bold mb-4">{step.num}</div>
                  <div className="w-8 h-0.5 bg-or-500 mb-4" />
                  <h3 className="font-serif text-lg text-white font-semibold mb-3">{step.title}</h3>
                  <p className="text-encre-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/contact" className="btn-primary text-sm px-8 py-4">
              Initier un échange
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ──────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <SectionLabel>Témoignages</SectionLabel>
            <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2">
              La confiance de mes clients
            </h2>
            <div className="divider-or mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-encre-50 border border-encre-100 rounded-sm p-8 hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
              >
                <StarRating rating={t.rating} />
                <blockquote className="mt-5 text-encre-700 text-sm leading-relaxed italic font-serif">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rouge-100 border border-rouge-200 flex items-center justify-center">
                    <span className="text-rouge-700 font-serif font-bold text-xs">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-encre-900 text-sm font-semibold">{t.name}</p>
                    <p className="text-encre-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-encre-400 text-xs mt-8">
            * Témoignages à personnaliser avec vos vrais avis clients.
          </p>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-rouge-800 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,0.6) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, rgba(201,168,76,0.4) 0%, transparent 50%)`,
          }}
        />
        <div className="container-site relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-0.5 bg-or-400/50 mx-auto mb-8" />
            <h2 className="font-serif text-3xl lg:text-5xl text-white font-bold leading-tight mb-6">
              Votre situation mérite une analyse sérieuse
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-10">
              N&apos;attendez pas que la situation se détériore. Contactez-moi pour
              un premier échange confidentiel et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-rouge-800 px-8 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-encre-50 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Prendre contact
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 rounded-sm font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE_CONFIG.phone}
              </a>
            </div>
            <p className="mt-8 text-white/50 text-xs">
              Réponse sous 24–48h ouvrées · {SITE_CONFIG.hours}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
