import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comment compléter un DUERP — Guide pratique | Loubna Abouz Manta",
  description:
    "Guide pas à pas pour établir et compléter votre Document Unique d'Évaluation des Risques Professionnels (DUERP), obligatoire pour toute entreprise ayant au moins un salarié.",
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/guides/completer-duerp",
  },
};

export default function GuideDUERPPage() {
  return (
    <div className="min-h-screen bg-encre-950">
      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-sm text-encre-400 mb-8">
          <Link href="/" className="hover:text-or-500">Accueil</Link>
          <span className="mx-1">/</span>
          <Link href="/guides" className="hover:text-or-500">Guides</Link>
          <span className="mx-1">/</span>
          <span className="text-white">Comment compléter un DUERP</span>
        </nav>

        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-or-500/10 text-or-500 mb-4 inline-block">
          Employeurs · 10 min
        </span>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
          Comment compléter un DUERP
        </h1>

        <p className="text-encre-300 leading-relaxed mb-8">
          Le Document Unique d'Évaluation des Risques Professionnels (DUERP) est obligatoire
          pour toute entreprise ayant au moins un salarié, depuis le décret du 5 novembre 2001.
          Ce guide vous accompagne étape par étape dans son élaboration.
        </p>

        <div className="space-y-8 text-encre-200 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">1. Identifier les risques par poste</h2>
            <p className="mb-3">
              Pour chaque poste de travail, recensez les risques auxquels le salarié est exposé :
              risques physiques (bruit, chaleur, produits chimiques), risques biologiques, risques
              liés aux postures et aux gestes répétitifs, risques psychosociaux (stress, harcèlement,
              charge de travail).
            </p>
            <p>
              Impliquez les salariés dans cette étape : ils sont les mieux placés pour identifier
              les situations dangereuses de leur quotidien.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">2. Évaluer et hiérarchiser les risques</h2>
            <p className="mb-3">
              Pour chaque risque identifié, évaluez sa probabilité d'occurrence et sa gravité.
              Utilisez une grille simple (faible, moyen, élevé) ou une matrice plus détaillée.
            </p>
            <p>
              Cette hiérarchisation permet de prioriser les actions de prévention sur les risques
              les plus critiques.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">3. Définir des actions de prévention</h2>
            <p className="mb-3">
              Pour chaque risque identifié, proposez une ou plusieurs actions de prévention :
              suppression du risque à la source, protection collective, protection individuelle
              (EPI), formation, information.
            </p>
            <p>
              Associez à chaque action un responsable et une échéance de mise en œuvre.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">4. Formaliser le document</h2>
            <p className="mb-3">
              Le DUERP doit être formalisé par écrit et mis à la disposition des travailleurs,
              du comité social et économique (CSE) et de l'inspection du travail.
            </p>
            <p>
              Il doit être mis à jour au moins une fois par an, et à chaque modification des
              conditions de travail.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">5. Suivre et réévaluer</h2>
            <p>
              Le DUERP est un document vivant. Planifiez des revues régulières pour vérifier
              l'effectivité des actions de prévention et intégrer les nouveaux risques.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-encre-900 rounded-xl border border-encre-800">
          <p className="text-encre-300 text-sm leading-relaxed">
            <strong className="text-white">Disclaimer :</strong> Ce guide constitue une information
            générale et ne remplace pas une analyse personnalisée. Pour un accompagnement dans
            l'élaboration de votre DUERP, n'hésitez pas à prendre rendez-vous ou à télécharger
            notre modèle de DUERP.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/documents/modele-duerp"
            className="bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Télécharger le modèle DUERP
          </Link>
          <Link
            href="/rendez-vous"
            className="border border-encre-700 hover:border-or-500 text-encre-200 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </article>
    </div>
  );
}
