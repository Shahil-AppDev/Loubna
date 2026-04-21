import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Interventions — Loubna Abouz Manta, Juriste en Droit du Travail",
  description:
    "Découvrez les domaines d'intervention de Loubna Abouz Manta : analyse de situation professionnelle, DUERP, prévention des risques, accompagnement des salariés et des entreprises.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-encre-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, rgba(201,168,76,0.5) 0%, transparent 60%)",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <SectionLabel light>Mes interventions</SectionLabel>
          <h1 className="font-serif text-4xl lg:text-5xl text-white font-bold mt-2">
            Des interventions adaptées à chaque situation
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-or-500 to-or-300 my-6 mx-auto" />
          <p className="text-encre-300 text-base leading-relaxed max-w-2xl mx-auto">
            J&apos;interviens en amont afin d&apos;analyser les situations de travail,
            identifier les risques et accompagner salariés et entreprises dans
            une logique de prévention et de sécurisation des pratiques.
          </p>
        </div>
      </section>

      {/* Disclaimer légal visible */}
      <div className="bg-encre-900 border-b border-encre-800">
        <div className="container-site py-4">
          <p className="text-encre-400 text-xs text-center leading-relaxed">
            <span className="text-or-400 mr-1">ℹ</span>
            Les informations fournies ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d&apos;avocat.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-20 lg:py-28 bg-encre-50">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <article
                key={service.id}
                className="bg-white border border-encre-100 rounded-sm p-8 hover:shadow-premium hover:-translate-y-1 hover:border-rouge-800/20 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-sm bg-rouge-50 border border-rouge-100 flex items-center justify-center text-xl group-hover:bg-rouge-800 group-hover:border-rouge-800 transition-all duration-300">
                    <span className="group-hover:grayscale group-hover:brightness-0 group-hover:invert transition-all duration-300">
                      {service.icon}
                    </span>
                  </div>
                  <span className="font-serif text-3xl text-encre-100 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4 group-hover:text-rouge-800 transition-colors duration-200">
                  {service.title}
                </h2>

                <p className="text-encre-500 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                <div className="mt-6 pt-5 border-t border-encre-100">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 bg-encre-50 text-encre-500 rounded-sm border border-encre-100 group-hover:bg-rouge-50 group-hover:text-rouge-700 group-hover:border-rouge-100 transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modalités */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <SectionLabel>Comment travailler ensemble</SectionLabel>
            <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2">
              Modalités d&apos;intervention
            </h2>
            <div className="divider-or mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🖥️",
                title: "100% Distanciel",
                desc: "Toutes mes interventions sont disponibles à distance : téléphone, visioconférence, échange de documents sécurisé. Où que vous soyez en France.",
              },
              {
                icon: "⚡",
                title: "Réactivité",
                desc: "Je m'engage à répondre à toute demande sous 24 à 48h ouvrées. En cas d'urgence, précisez-le dans votre message.",
              },
              {
                icon: "💰",
                title: "Tarification claire",
                desc: "Devis transparent établi avant tout engagement. Pas de surprise, pas de frais cachés. Échange ponctuel ou accompagnement sur-mesure.",
              },
            ].map((item) => (
              <div key={item.title} className="card-premium text-center">
                <div className="text-3xl mb-5">{item.icon}</div>
                <h3 className="font-serif text-xl text-encre-950 font-semibold mb-3">{item.title}</h3>
                <p className="text-encre-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-encre-950">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-0.5 bg-or-500 mx-auto mb-8" />
            <h2 className="font-serif text-3xl lg:text-4xl text-white font-bold mb-6">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-encre-300 text-sm leading-relaxed mb-10">
              Chaque situation est unique. Contactez-moi directement pour que nous
              puissions analyser votre problématique et définir l&apos;accompagnement
              le plus adapté à vos besoins.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-rouge-800 text-white px-8 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-rouge-700 hover:shadow-rouge-lg hover:-translate-y-0.5"
            >
              Me contacter
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
