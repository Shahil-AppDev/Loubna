import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accident du travail : premières étapes — Guide | Loubna Abouz Manta",
  description:
    "Que faire en cas d'accident du travail ? Délais, déclarations, soins, suivi médical. Guide pratique étape par étape pour les salariés.",
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/guides/accident-travail-premieres-etapes",
  },
};

export default function GuideAccidentTravailPage() {
  return (
    <div className="min-h-screen bg-encre-950">
      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-sm text-encre-400 mb-8">
          <Link href="/" className="hover:text-or-500">Accueil</Link>
          <span className="mx-1">/</span>
          <Link href="/guides" className="hover:text-or-500">Guides</Link>
          <span className="mx-1">/</span>
          <span className="text-white">Accident du travail : premières étapes</span>
        </nav>

        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-or-500/10 text-or-500 mb-4 inline-block">
          Salariés · 8 min
        </span>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
          Accident du travail : premières étapes
        </h1>

        <p className="text-encre-300 leading-relaxed mb-8">
          Un accident du travail (AT) est un accident survenu par le fait ou à l'occasion du travail.
          Voici les démarches à effectuer, étape par étape, pour faire valoir vos droits.
        </p>

        <div className="space-y-8 text-encre-200 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">1. Obtenir des soins immédiats</h2>
            <p className="mb-3">
              En cas d'urgence, appelez le SAMU (15) ou les secours (112). Si vous pouvez vous déplacer,
              consultez un médecin au plus vite. Précisez qu'il s'agit d'un accident du travail.
            </p>
            <p>
              Le médecin établira un certificat médical initial décrivant vos lésions. Conservez
              précieusement ce document.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">2. Informer l'employeur</h2>
            <p className="mb-3">
              Informez votre employeur de l'accident dans les 24 heures. L'employeur a ensuite
              48 heures pour faire la déclaration d'accident du travail à la CPAM.
            </p>
            <p>
              Si l'employeur refuse ou tarde à déclarer l'accident, vous pouvez faire la déclaration
              vous-même directement auprès de la CPAM.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">3. Conserver toutes les preuves</h2>
            <p className="mb-3">
              Rassemblez et conservez tous les documents : certificat médical, témoignages,
              photographs, échanges d'e-mails, messages, plannings. Ces éléments seront précieux
              en cas de contestation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">4. Suivre l'évolution</h2>
            <p className="mb-3">
              La CPAM vous informera de sa décision : reconnaissance en accident du travail,
              ou refus. En cas de refus, vous disposez de 2 mois pour contester.
            </p>
            <p>
              Pendant votre arrêt, vous percevrez des indemnités journalières. Veillez à transmettre
              les prolongations d'arrêt à votre employeur et à la CPAM.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">5. En cas de contestation</h2>
            <p>
              Si la CPAM refuse de reconnaître l'accident du travail, ou si l'employeur conteste
              le caractère professionnel, vous pouvez saisir le tribunal du contentieux de
              l'incapacité (TCI). Un accompagnement juridique est recommandé.
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
