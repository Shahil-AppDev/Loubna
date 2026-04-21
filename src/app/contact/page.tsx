import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Prendre rendez-vous",
  description:
    "Contactez Loubna Abouz Manta, juriste en droit du travail. Réponse sous 24–48h ouvrées. Premier échange confidentiel pour analyser votre situation.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-encre-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.5) 0%, transparent 70%)" }} />
        <div className="container-site relative z-10 text-center">
          <SectionLabel light>Prise de contact</SectionLabel>
          <h1 className="font-serif text-4xl lg:text-5xl text-white font-bold mt-2">
            Parlons de votre situation
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-or-500 to-or-300 my-6 mx-auto" />
          <p className="text-encre-300 text-base leading-relaxed max-w-xl mx-auto">
            Décrivez votre demande et je vous réponds sous 24 à 48h ouvrées.
            Premier échange confidentiel, sans engagement.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-encre-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Info */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <SectionLabel>Informations</SectionLabel>
                <h2 className="font-serif text-2xl text-encre-950 font-bold mt-2 mb-6">
                  Restons en contact
                </h2>
                <p className="text-encre-500 text-sm leading-relaxed">
                  Vous avez une question, un doute ou une situation urgente ?
                  N&apos;hésitez pas à me contacter. Je m&apos;engage à vous répondre
                  rapidement avec une première analyse de votre situation.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-4 p-5 bg-white border border-encre-100 rounded-sm hover:border-rouge-800/30 hover:shadow-rouge-sm transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-rouge-50 border border-rouge-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rouge-800 group-hover:border-rouge-800 transition-all duration-200">
                    <svg className="w-4 h-4 text-rouge-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-encre-400 tracking-wide uppercase mb-1">Email</p>
                    <p className="text-encre-800 text-sm font-medium">{SITE_CONFIG.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-4 p-5 bg-white border border-encre-100 rounded-sm hover:border-rouge-800/30 hover:shadow-rouge-sm transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-rouge-50 border border-rouge-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rouge-800 group-hover:border-rouge-800 transition-all duration-200">
                    <svg className="w-4 h-4 text-rouge-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-encre-400 tracking-wide uppercase mb-1">Téléphone</p>
                    <p className="text-encre-800 text-sm font-medium">{SITE_CONFIG.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 bg-white border border-encre-100 rounded-sm">
                  <div className="w-10 h-10 rounded-sm bg-rouge-50 border border-rouge-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-rouge-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-encre-400 tracking-wide uppercase mb-1">Horaires</p>
                    <p className="text-encre-800 text-sm font-medium">{SITE_CONFIG.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white border border-encre-100 rounded-sm">
                  <div className="w-10 h-10 rounded-sm bg-rouge-50 border border-rouge-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-rouge-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-encre-400 tracking-wide uppercase mb-1">Localisation</p>
                    <p className="text-encre-800 text-sm font-medium">{SITE_CONFIG.address}</p>
                    <p className="text-encre-400 text-xs mt-0.5">Interventions 100% distanciel</p>
                  </div>
                </div>
              </div>

              {/* Engagements */}
              <div className="bg-encre-950 rounded-sm p-6">
                <h3 className="font-serif text-white text-base font-semibold mb-4">
                  Mes engagements
                </h3>
                <ul className="space-y-3">
                  {[
                    "Réponse sous 24–48h ouvrées",
                    "Premier échange sans engagement",
                    "Confidentialité absolue garantie",
                    "Devis transparent avant toute prestation",
                    "Accompagnement personnalisé",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-or-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-encre-300 text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-encre-100 rounded-sm p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="font-serif text-2xl text-encre-950 font-bold mb-2">
                    Votre demande
                  </h2>
                  <p className="text-encre-400 text-sm">
                    Remplissez ce formulaire et je vous recontacte sous 24–48h.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
