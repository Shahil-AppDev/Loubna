import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "À propos — Loubna Abouz Manta, Juriste en Droit du Travail",
  description:
    "Découvrez le parcours de Loubna Abouz Manta, juriste en droit du travail et prévention des risques professionnels. Master en droit et management, intervention en amont des procédures.",
};

const VALUES = [
  {
    icon: "⚖️",
    title: "Rigueur",
    desc: "Chaque situation est analysée avec précision, en tenant compte du cadre juridique applicable et de la réalité concrète du terrain.",
  },
  {
    icon: "👂",
    title: "Écoute",
    desc: "Avant toute analyse, j'écoute. Comprendre votre situation dans sa globalité est la condition d'un accompagnement réellement adapté.",
  },
  {
    icon: "🔒",
    title: "Confidentialité",
    desc: "Tout ce que vous me confiez reste strictement confidentiel. La discrétion est un engagement non négociable dans mon activité.",
  },
  {
    icon: "💡",
    title: "Clarté",
    desc: "Je m'engage à vous expliquer les enjeux en langage accessible, sans jargon inutile, pour que vous compreniez pleinement votre situation.",
  },
  {
    icon: "🛡️",
    title: "Prévention",
    desc: "Mon approche est résolument préventive : j'interviens en amont pour éviter l'escalade des situations et sécuriser les pratiques.",
  },
  {
    icon: "🎯",
    title: "Pragmatisme",
    desc: "Mon objectif n'est pas de théoriser, mais de vous apporter des réponses concrètes, adaptées à votre réalité professionnelle.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-encre-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(201,168,76,0.5) 0%, transparent 60%)",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <SectionLabel light>À propos</SectionLabel>
          <h1 className="font-serif text-4xl lg:text-5xl text-white font-bold mt-2">
            Loubna Abouz Manta
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-or-500 to-or-300 my-6 mx-auto" />
          <p className="text-encre-300 text-base leading-relaxed max-w-xl mx-auto">
            Juriste en droit du travail, spécialisée dans la prévention des risques
            professionnels et l&apos;accompagnement des salariés et des entreprises
            en amont des procédures.
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-20 lg:py-28 bg-encre-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Logo / identité */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-xs">
                <div className="absolute -top-4 -left-4 w-full h-full border border-or-300/30 rounded-sm" />
                <div className="relative bg-encre-950 rounded-sm p-10 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <Image
                      src="/logo.png"
                      alt="Loubna Abouz Manta — Juriste en Droit du Travail"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 bg-white border border-encre-100 rounded-sm p-5">
                  <p className="font-serif text-lg text-encre-950 font-semibold">
                    Loubna Abouz Manta
                  </p>
                  <p className="text-or-500 text-xs tracking-[0.15em] uppercase font-medium mt-0.5">
                    Juriste · Droit du Travail
                  </p>
                  <div className="w-12 h-0.5 bg-or-400 my-4" />
                  <div className="space-y-2">
                    <p className="text-encre-500 text-xs flex items-center gap-2">
                      <span className="text-or-500">🎓</span>
                      Master 2 Droit &amp; Management
                    </p>
                    <p className="text-encre-500 text-xs flex items-center gap-2">
                      <span className="text-or-500">⚠️</span>
                      Prévention des risques professionnels
                    </p>
                    <p className="text-encre-500 text-xs flex items-center gap-2">
                      <span className="text-or-500">🌐</span>
                      Interventions 100% distanciel
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Texte — bio fournie par la cliente */}
            <div className="lg:col-span-8">
              <SectionLabel>Mon parcours</SectionLabel>
              <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2 mb-6">
                Une double approche : droit du travail et management des organisations
              </h2>
              <div className="space-y-5 text-encre-600 text-sm leading-relaxed">
                <p>
                  J&apos;interviens en amont afin d&apos;analyser les situations de travail,
                  d&apos;identifier les risques professionnels et d&apos;accompagner les entreprises
                  dans la rédaction et la mise à jour de leur DUERP, dans une logique de
                  prévention et de sécurisation des pratiques.
                </p>
                <p>
                  Titulaire d&apos;un Master en droit et management, j&apos;ai développé une
                  expertise à l&apos;intersection du droit du travail et du management des
                  organisations. Cette double approche me permet d&apos;analyser en profondeur
                  les situations professionnelles, en tenant compte à la fois du cadre
                  juridique et de la réalité du terrain.
                </p>
                <p>
                  J&apos;interviens principalement en droit du travail, avec une attention
                  particulière portée à la prévention des risques professionnels, notamment
                  en matière de santé, sécurité et conditions de travail. Dans ce cadre,
                  j&apos;accompagne les entreprises dans l&apos;identification et l&apos;évaluation des
                  risques, à travers la réalisation d&apos;audits et la mise à jour du Document
                  Unique d&apos;Évaluation des Risques Professionnels (DUERP), en collaboration
                  avec les acteurs de l&apos;entreprise.
                </p>
                <p>
                  Mon approche ne se limite pas à la rédaction de documents : elle repose
                  sur une analyse concrète des situations de travail et une volonté d&apos;agir
                  en amont, afin de prévenir les tensions et éviter les situations
                  conflictuelles.
                </p>
                <p>
                  Dans une démarche d&apos;amélioration continue, je poursuis régulièrement
                  des formations afin de maintenir un haut niveau d&apos;exigence et
                  d&apos;actualisation de mes connaissances en droit du travail et en santé
                  et sécurité au travail.
                </p>
              </div>

              <div className="mt-10 p-6 bg-white border-l-2 border-or-500 rounded-sm">
                <p className="font-serif text-base text-encre-800 italic leading-relaxed">
                  &ldquo;Mon objectif est d&apos;apporter un accompagnement rigoureux, accessible
                  et adapté à chaque situation, dans une logique de prévention et de
                  sécurisation des pratiques professionnelles.&rdquo;
                </p>
                <p className="mt-3 text-or-500 text-xs font-semibold tracking-wide uppercase">
                  — Loubna Abouz Manta
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary text-sm">
                  Prendre contact
                </Link>
                <Link href="/services" className="btn-secondary text-sm">
                  Mes interventions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <SectionLabel>Ce qui me définit</SectionLabel>
            <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2">
              Mes valeurs, au cœur de mon accompagnement
            </h2>
            <div className="divider-or mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="card-premium">
                <div className="w-12 h-12 rounded-sm bg-rouge-50 border border-rouge-100 flex items-center justify-center text-xl mb-6">
                  {v.icon}
                </div>
                <h3 className="font-serif text-lg text-encre-950 font-semibold mb-3">{v.title}</h3>
                <p className="text-encre-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domaines d'intervention */}
      <section className="py-20 lg:py-28 bg-encre-950">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel light>Domaines</SectionLabel>
              <h2 className="font-serif text-3xl lg:text-4xl text-white font-bold mt-2 mb-6">
                Domaines d&apos;intervention
              </h2>
              <p className="text-encre-300 text-sm leading-relaxed mb-8">
                Ma spécialisation en droit du travail et en prévention des risques
                professionnels me permet d&apos;intervenir sur l&apos;ensemble des problématiques
                liées aux relations professionnelles, en amont des situations conflictuelles.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Analyse de situation professionnelle",
                  "Prévention des risques (RPS, AT, MP)",
                  "DUERP — Document Unique",
                  "Santé, sécurité au travail",
                  "Contrats de travail",
                  "Procédures disciplinaires",
                  "Licenciement — sécurisation",
                  "Rupture conventionnelle",
                  "Harcèlement moral / sexuel",
                  "Conditions de travail",
                  "Accidents du travail",
                  "Maladies professionnelles",
                ].map((comp) => (
                  <div key={comp} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-or-500 flex-shrink-0 mt-1.5" />
                    <span className="text-encre-300 text-xs leading-relaxed">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Disclaimer légal mis en valeur */}
              <div className="bg-encre-900 border border-encre-700 rounded-sm p-6">
                <div className="flex items-start gap-3">
                  <span className="text-or-400 text-lg flex-shrink-0 mt-0.5">ℹ️</span>
                  <div>
                    <h4 className="text-white font-serif text-sm font-semibold mb-2">
                      Information importante
                    </h4>
                    <p className="text-encre-300 text-xs leading-relaxed">
                      Les informations fournies ne constituent pas une consultation
                      juridique au sens de la réglementation applicable à la profession
                      d&apos;avocat. Lorsqu&apos;une situation nécessite une représentation en
                      justice ou une procédure judiciaire, une orientation vers un avocat
                      compétent est proposée.
                    </p>
                  </div>
                </div>
              </div>

              {/* Formations continues */}
              <div className="bg-encre-900 border border-encre-800 rounded-sm p-6">
                <h4 className="font-serif text-white text-base font-semibold mb-4">
                  Formation continue
                </h4>
                <p className="text-encre-300 text-xs leading-relaxed">
                  Dans une démarche d&apos;amélioration continue, je maintiens mes
                  connaissances à jour via des formations régulières en droit du travail,
                  santé-sécurité au travail et management des risques professionnels.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-rouge-800 rounded-sm p-6">
                <h4 className="font-serif text-white text-base font-semibold mb-3">
                  Vous avez une question ?
                </h4>
                <p className="text-white/70 text-xs mb-5 leading-relaxed">
                  Contactez-moi pour un premier échange confidentiel et sans engagement
                  sur votre situation.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-rouge-800 px-6 py-3 rounded-sm font-semibold text-xs tracking-wide transition-all duration-300 hover:bg-encre-50 w-full"
                >
                  Prendre contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-encre-50 border-t border-encre-100">
        <div className="container-site text-center">
          <h2 className="font-serif text-2xl lg:text-3xl text-encre-950 font-bold mb-4">
            Prêt(e) à être accompagné(e) ?
          </h2>
          <p className="text-encre-500 text-sm mb-8 max-w-md mx-auto">
            Contactez-moi pour un premier échange sur votre situation professionnelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-sm">
              Prendre contact
            </Link>
            <Link href="/services" className="btn-secondary text-sm">
              Voir mes interventions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
