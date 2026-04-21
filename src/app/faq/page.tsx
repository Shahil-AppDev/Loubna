import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import FaqAccordion from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ — Loubna Abouz Manta, Juriste en Droit du Travail",
  description:
    "Questions fréquentes sur l'activité de Loubna Abouz Manta : accident du travail, maladie professionnelle, DUERP, prévention des risques, licenciement et plus.",
};

export default function FaqPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-encre-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 40% 50%, rgba(201,168,76,0.5) 0%, transparent 60%)",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <SectionLabel light>FAQ</SectionLabel>
          <h1 className="font-serif text-4xl lg:text-5xl text-white font-bold mt-2">
            Questions fréquentes
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-or-500 to-or-300 my-6 mx-auto" />
          <p className="text-encre-300 text-base leading-relaxed max-w-xl mx-auto">
            Les réponses aux questions les plus fréquentes sur mon activité,
            mes modalités d&apos;intervention et les thématiques du droit du travail.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-encre-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Accordion */}
            <div className="lg:col-span-8">
              <FaqAccordion />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-encre-950 rounded-sm p-8">
                <div className="text-2xl mb-4">💬</div>
                <h3 className="font-serif text-xl text-white font-semibold mb-3">
                  Vous ne trouvez pas votre réponse ?
                </h3>
                <p className="text-encre-300 text-sm leading-relaxed mb-6">
                  Chaque situation est unique. Contactez-moi directement
                  pour un premier échange personnalisé et confidentiel.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center text-sm"
                >
                  Poser ma question
                </Link>
              </div>

              <div className="bg-white border border-encre-100 rounded-sm p-6">
                <h3 className="font-serif text-lg text-encre-950 font-semibold mb-4">
                  À savoir
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      icon: "⚖️",
                      text: "Je ne suis pas avocat et n'assure pas de représentation en justice",
                    },
                    {
                      icon: "🔀",
                      text: "Si votre situation nécessite un avocat, vous serez orienté(e)",
                    },
                    {
                      icon: "🔒",
                      text: "Toutes vos informations restent strictement confidentielles",
                    },
                    {
                      icon: "🌐",
                      text: "Interventions à distance sur toute la France",
                    },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <span className="text-encre-600 text-xs leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer légal */}
              <div className="bg-encre-50 border border-encre-200 rounded-sm p-5">
                <p className="text-encre-500 text-xs leading-relaxed">
                  <span className="font-semibold text-encre-700 block mb-1">Note importante</span>
                  Les informations fournies ne constituent pas une consultation juridique
                  au sens de la réglementation applicable à la profession d&apos;avocat.
                </p>
              </div>

              <div className="bg-rouge-800 rounded-sm p-6 text-center">
                <p className="font-serif text-white text-lg font-semibold mb-2">
                  Situation urgente ?
                </p>
                <p className="text-white/70 text-xs mb-5">
                  Précisez &ldquo;URGENT&rdquo; dans votre message pour un traitement prioritaire.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-rouge-800 px-6 py-3 rounded-sm font-semibold text-xs tracking-wide transition-all duration-300 hover:bg-encre-50 w-full"
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thèmes FAQ */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <SectionLabel>Thématiques</SectionLabel>
            <h2 className="font-serif text-2xl lg:text-3xl text-encre-950 font-bold mt-2">
              Domaines abordés dans la FAQ
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Juriste vs Avocat",
              "Accident du travail",
              "Maladie professionnelle",
              "DUERP",
              "Prévention des risques",
              "Licenciement",
              "Rupture conventionnelle",
              "Distanciel",
              "Confidentialité",
              "Tarifs",
            ].map((theme) => (
              <span
                key={theme}
                className="px-4 py-2 bg-encre-50 border border-encre-200 text-encre-600 text-sm rounded-sm"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
