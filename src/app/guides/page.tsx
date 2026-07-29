import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides pratiques en droit du travail | Loubna Abouz Manta",
  description:
    "Guides pratiques pour comprendre et agir en droit du travail : DUERP, accident du travail, avertissement disciplinaire. Rédigés par une juriste en droit du travail.",
  keywords: [
    "guide droit du travail",
    "guide DUERP",
    "guide accident du travail",
    "guide avertissement",
    "prévention risques professionnels",
  ],
  openGraph: {
    title: "Guides pratiques en droit du travail | Loubna Abouz Manta",
    description:
      "Guides pratiques pour comprendre et agir en droit du travail : DUERP, accident du travail, avertissement disciplinaire.",
    url: "https://juriste-droit-du-travail.com/guides",
    siteName: "Loubna Abouz Manta",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/guides",
  },
};

const GUIDES = [
  {
    slug: "completer-duerp",
    title: "Comment compléter un DUERP",
    excerpt:
      "Guide pas à pas pour établir et compléter votre Document Unique d'Évaluation des Risques Professionnels, obligatoire pour toute entreprise ayant au moins un salarié.",
    audience: "Employeurs",
    readTime: "10 min",
    status: "draft",
  },
  {
    slug: "accident-travail-premieres-etapes",
    title: "Accident du travail : premières étapes",
    excerpt:
      "Que faire en cas d'accident du travail ? Délais, déclarations, soins, suivi médical. Ce guide vous accompagne étape par étape.",
    audience: "Salariés",
    readTime: "8 min",
    status: "draft",
  },
  {
    slug: "repondre-avertissement",
    title: "Répondre à un avertissement",
    excerpt:
      "Comment répondre à un avertissement disciplinaire ? Réserves, délais, entretien, recours. Modèles et conseils pratiques inclus.",
    audience: "Salariés",
    readTime: "7 min",
    status: "draft",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-encre-950">
      <section className="bg-gradient-to-br from-encre-950 via-encre-900 to-encre-950 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-encre-400 mb-6">
            <Link href="/" className="hover:text-or-500">Accueil</Link>
            <span className="mx-1">/</span>
            <span className="text-white">Guides</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Guides pratiques en droit du travail
          </h1>
          <p className="text-lg text-encre-200 max-w-2xl leading-relaxed">
            Des guides clairs et concrets pour comprendre vos droits et obligations en droit du travail.
            Rédigés par Loubna Abouz Manta, juriste en droit du travail.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((guide) => (
              <article
                key={guide.slug}
                className="bg-encre-900 rounded-xl p-6 border border-encre-800 hover:border-or-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-or-500/10 text-or-500">
                    {guide.audience}
                  </span>
                  <span className="text-xs text-encre-400">{guide.readTime}</span>
                  {guide.status === "draft" && (
                    <span className="text-xs text-encre-500 italic">(Brouillon)</span>
                  )}
                </div>
                <h2 className="font-serif text-xl font-bold text-white mb-3">
                  {guide.title}
                </h2>
                <p className="text-encre-300 text-sm leading-relaxed mb-4">
                  {guide.excerpt}
                </p>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="text-or-500 hover:text-or-400 text-sm font-medium"
                >
                  Lire le guide →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 p-6 bg-encre-900/50 rounded-xl border border-encre-800">
            <p className="text-encre-300 text-sm leading-relaxed">
              <strong className="text-white">Disclaimer :</strong> Ces guides constituent une information
              générale et ne remplacent pas une consultation personnalisée. Pour une analyse adaptée à
              votre situation, n'hésitez pas à prendre rendez-vous.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
