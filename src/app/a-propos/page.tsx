import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "À propos — Juriste en Droit du Travail",
  description:
    "Découvrez le parcours et les valeurs de Loubna Abouz Manta, juriste spécialisée en droit du travail. Rigueur, écoute, confidentialité et pédagogie au service de vos droits.",
};

const VALUES = [
  {
    icon: "⚖️",
    title: "Rigueur",
    desc: "Chaque dossier est traité avec une analyse précise de la situation légale, de la jurisprudence applicable et des options disponibles.",
  },
  {
    icon: "👂",
    title: "Écoute",
    desc: "Avant tout conseil, j'écoute. Comprendre votre situation dans sa globalité est la condition d'un accompagnement vraiment adapté.",
  },
  {
    icon: "🔒",
    title: "Confidentialité",
    desc: "Tout ce que vous me confiez reste entre nous. La discrétion absolue est un engagement non négociable dans mon exercice.",
  },
  {
    icon: "💡",
    title: "Clarté",
    desc: "Je m'engage à traduire le droit en langage clair. Vous comprenez votre situation, vos options et les conséquences de vos choix.",
  },
  {
    icon: "🤝",
    title: "Engagement",
    desc: "Je m'implique pleinement dans chaque dossier. Votre problème devient le mien le temps de votre accompagnement.",
  },
  {
    icon: "🎯",
    title: "Pragmatisme",
    desc: "Mon objectif n'est pas de vous noyer dans le jargon juridique, mais de vous offrir des solutions concrètes et applicables.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-encre-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,168,76,0.5) 0%, transparent 60%)" }} />
        <div className="container-site relative z-10 text-center">
          <SectionLabel light>À propos</SectionLabel>
          <h1 className="font-serif text-4xl lg:text-5xl text-white font-bold mt-2">
            Qui suis-je ?
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-or-500 to-or-300 my-6 mx-auto" />
          <p className="text-encre-300 text-base leading-relaxed max-w-xl mx-auto">
            Juriste spécialisée en droit du travail, engagée pour défendre les droits de
            salariés et accompagner les employeurs dans leurs obligations légales.
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-20 lg:py-28 bg-encre-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Photo / Logo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-or-300/30 rounded-sm" />
                <div className="relative bg-encre-950 rounded-sm p-10 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <Image
                      src="/logo.png"
                      alt="Loubna Abouz Manta"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 bg-white border border-encre-100 rounded-sm p-5">
                  <p className="font-serif text-lg text-encre-950 font-semibold">Loubna Abouz Manta</p>
                  <p className="text-or-500 text-xs tracking-[0.15em] uppercase font-medium mt-0.5">
                    Juriste · Droit du Travail
                  </p>
                  <div className="w-12 h-0.5 bg-or-400 my-4" />
                  <div className="space-y-1.5">
                    <p className="text-encre-500 text-xs flex items-center gap-2">
                      <span className="text-or-500">📍</span>
                      Paris, France {/* À MODIFIER */}
                    </p>
                    <p className="text-encre-500 text-xs flex items-center gap-2">
                      <span className="text-or-500">🎓</span>
                      Master en Droit du Travail {/* À MODIFIER */}
                    </p>
                    <p className="text-encre-500 text-xs flex items-center gap-2">
                      <span className="text-or-500">⏱</span>
                      10+ années d&apos;expertise {/* À MODIFIER */}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Texte */}
            <div className="lg:col-span-8">
              <SectionLabel>Mon histoire</SectionLabel>
              <h2 className="font-serif text-3xl lg:text-4xl text-encre-950 font-bold mt-2 mb-6">
                Une expertise née d&apos;une conviction profonde
              </h2>
              <div className="space-y-5 text-encre-600 text-sm leading-relaxed">
                <p>
                  Le droit du travail est un domaine où les enjeux sont profondément humains.
                  Derrière chaque dossier, il y a une personne — un salarié qui se bat pour
                  ses droits, un employeur qui cherche à agir correctement, une situation qui
                  peut avoir des conséquences majeures sur une vie professionnelle et personnelle.
                </p>
                <p>
                  C&apos;est cette conviction qui m&apos;a amenée à me spécialiser dans ce domaine.
                  Après un parcours académique solide en droit — avec un Master en droit social
                  et du travail — j&apos;ai développé une expertise de terrain en accompagnant aussi
                  bien des salariés que des entreprises de toutes tailles.
                </p>
                <p>
                  Mon approche est claire : je refuse de traiter les dossiers comme de simples
                  procédures. Chaque situation est unique, chaque client mérite une attention
                  individualisée et des conseils adaptés à sa réalité. Je m&apos;engage à être
                  disponible, transparente et efficace — sans jargon inutile.
                </p>
                <p>
                  Que vous soyez salarié confronté à une situation difficile ou employeur
                  cherchant à sécuriser vos pratiques, je suis là pour vous offrir un
                  accompagnement de qualité, rigoureux et bienveillant.
                </p>
              </div>

              <div className="mt-10 p-6 bg-white border-l-2 border-or-500 rounded-sm">
                <p className="font-serif text-base text-encre-800 italic leading-relaxed">
                  &ldquo;Je crois profondément que l&apos;accès à un conseil juridique de qualité
                  ne devrait pas être un privilège. Mon rôle est de vous donner les clés
                  pour comprendre votre situation et agir en connaissance de cause.&rdquo;
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
                  Mes services
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

      {/* Domaines de compétence */}
      <section className="py-20 lg:py-28 bg-encre-950">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel light>Compétences</SectionLabel>
              <h2 className="font-serif text-3xl lg:text-4xl text-white font-bold mt-2 mb-6">
                Domaines d&apos;intervention
              </h2>
              <p className="text-encre-300 text-sm leading-relaxed mb-8">
                Ma spécialisation exclusive en droit du travail me permet de
                traiter en profondeur l&apos;ensemble des problématiques liées aux
                relations professionnelles, au bénéfice des salariés comme des employeurs.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Contrats de travail",
                  "Licenciement",
                  "Rupture conventionnelle",
                  "Procédures disciplinaires",
                  "Harcèlement moral",
                  "Harcèlement sexuel",
                  "Discrimination",
                  "Heures supplémentaires",
                  "Congés & absences",
                  "Accord d'entreprise",
                  "Clause de non-concurrence",
                  "Assistance précontentieuse",
                ].map((comp) => (
                  <div key={comp} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-or-500 flex-shrink-0" />
                    <span className="text-encre-300 text-xs">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Droit du travail — salariés", level: 98 },
                { label: "Droit du travail — employeurs", level: 95 },
                { label: "Assistance précontentieuse", level: 90 },
                { label: "Rédaction de contrats", level: 97 },
                { label: "Gestion des conflits", level: 92 },
              ].map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-encre-300 text-xs font-medium">{skill.label}</span>
                    <span className="text-or-400 text-xs font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-encre-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rouge-800 to-or-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rouge-800">
        <div className="container-site text-center">
          <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold mb-4">
            Prêt(e) à être accompagné(e) ?
          </h2>
          <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
            Contactez-moi pour un premier échange confidentiel sur votre situation.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-rouge-800 px-8 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-encre-50 hover:-translate-y-0.5">
            Prendre contact
          </Link>
        </div>
      </section>
    </>
  );
}
