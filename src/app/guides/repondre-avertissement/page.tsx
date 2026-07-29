import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Répondre à un avertissement — Guide pratique | Loubna Abouz Manta",
  description:
    "Comment répondre à un avertissement disciplinaire ? Réserves, délais, entretien, recours. Modèles et conseils pratiques inclus.",
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/guides/repondre-avertissement",
  },
};

export default function GuideAvertissementPage() {
  return (
    <div className="min-h-screen bg-encre-950">
      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-sm text-encre-400 mb-8">
          <Link href="/" className="hover:text-or-500">Accueil</Link>
          <span className="mx-1">/</span>
          <Link href="/guides" className="hover:text-or-500">Guides</Link>
          <span className="mx-1">/</span>
          <span className="text-white">Répondre à un avertissement</span>
        </nav>

        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-or-500/10 text-or-500 mb-4 inline-block">
          Salariés · 7 min
        </span>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
          Répondre à un avertissement
        </h1>

        <p className="text-encre-300 leading-relaxed mb-8">
          L'avertissement est la sanction disciplinaire la plus légère. Il doit être justifié
          par un motif précis et notifié par écrit. Voici comment y répondre efficacement.
        </p>

        <div className="space-y-8 text-encre-200 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">1. Vérifier la régularité de la procédure</h2>
            <p className="mb-3">
              L'employeur doit respecter la procédure disciplinaire prévue par le code du travail
              et la convention collective : convocation à entretien, entretien préalable,
              notification motivée dans les délais légaux.
            </p>
            <p>
              Vérifiez que tous les délais ont été respectés. Une procédure irrégulière peut
              entraîner l'annulation de la sanction.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">2. Analyser le motif</h2>
            <p className="mb-3">
              L'avertissement doit être fondé sur des faits précis et vérifiables. Si les faits
              sont inexacts, contestés ou prescrits (au-delà de 2 mois), vous avez des arguments
              solides pour contester.
            </p>
            <p>
              Réunissez les preuves qui contredisent les faits allégués : témoignages, e-mails,
              plannings, etc.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">3. Formuler des réserves par écrit</h2>
            <p className="mb-3">
              Il est recommandé de répondre par écrit à votre employeur, en formulant des réserves
              sur les faits reprochés et/ou sur la procédure suivie.
            </p>
            <p>
              Ce courrier doit être factuel, courtois et précis. Il peut être envoyé par lettre
              recommandée avec accusé de réception ou remis en main propre contre décharge.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">4. Demander un entretien</h2>
            <p>
              Vous pouvez demander un entretien avec votre employeur pour discuter de la sanction.
              Cet échange permet parfois de clarifier la situation et de désamorcer le conflit.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">5. En cas de sanction injustifiée</h2>
            <p className="mb-3">
              Si l'avertissement est injustifié ou si la procédure est irrégulière, vous pouvez
              saisir le conseil de prud'hommes pour demander l'annulation de la sanction.
            </p>
            <p>
              Un accompagnement juridique est recommandé pour cette démarche.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-encre-900 rounded-xl border border-encre-800">
          <p className="text-encre-300 text-sm leading-relaxed">
            <strong className="text-white">Disclaimer :</strong> Ce guide constitue une information
            générale et ne remplace pas une consultation personnalisée. Pour une analyse adaptée
            à votre situation, n'hésitez pas à prendre rendez-vous.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/rendez-vous"
            className="bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Prendre rendez-vous
          </Link>
          <Link
            href="/documents"
            className="border border-encre-700 hover:border-or-500 text-encre-200 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Voir les documents
          </Link>
        </div>
      </article>
    </div>
  );
}
