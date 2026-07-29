import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mon compte | Loubna Abouz Manta",
  description: "Espace client — bientôt disponible.",
  robots: { index: false, follow: false },
};

export default function MonComptePage() {
  return (
    <div className="min-h-screen bg-encre-950 flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
          Espace client
        </h1>
        <p className="text-encre-300 leading-relaxed mb-6">
          L'espace client est actuellement en développement. Il sera bientôt disponible.
          Vous pourrez y retrouver vos commandes, vos documents téléchargés et vos rendez-vous.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/rendez-vous"
            className="inline-block border border-encre-700 hover:border-or-500 text-encre-200 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}
