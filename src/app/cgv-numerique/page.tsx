import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente Numériques — Loubna Abouz Manta",
  description: "Conditions générales de vente applicables à l'achat de documents numériques (modèle DUERP).",
  robots: { index: true, follow: true },
};

export default function CGVNumeriquePage() {
  return (
    <div className="min-h-screen bg-encre-50">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h1 className="font-serif text-3xl font-bold text-encre-900 mb-8">
          Conditions Générales de Vente Numériques
        </h1>

        <div className="prose prose-encre max-w-none text-encre-700 leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 1 — Objet</h2>
            <p>
              Les présentes conditions générales de vente régissent l'achat et le téléchargement
              de documents numériques proposés sur le site juriste-droit-du-travail.com par
              Loubna Abouz Manta, juriste en droit du travail.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 2 — Produits concernés</h2>
            <p>
              Les produits numériques vendus sont des documents téléchargeables au format PDF,
              notamment le « Modèle DUERP à compléter ». Ces documents sont des trames à remplir
              et à adapter à l'activité réelle de chaque entreprise.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 3 — Prix</h2>
            <p>
              Les prix sont indiqués en euros (€) toutes taxes comprises. Le paiement s'effectue
              en ligne via le prestataire de paiement SumUp, par carte bancaire.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 4 — Livraison</h2>
            <p>
              La livraison est numérique et immatérielle. Dès confirmation du paiement par le
              prestataire de paiement, un lien de téléchargement sécurisé est envoyé par e-mail
              à l'adresse indiquée lors de la commande.
            </p>
            <p>
              Ce lien est valable 72 heures et permet un maximum de 3 téléchargements.
              Au-delà de ces limites, un nouveau lien devra être demandé via le formulaire de contact.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 5 — Droit de rétractation</h2>
            <p>
              Conformément à l'article L. 221-18 du Code de la consommation, le consommateur
              dispose d'un délai de 14 jours pour exercer son droit de rétractation.
            </p>
            <p>
              <strong>Exception :</strong> Conformément à l'article L. 221-28 du Code de la consommation,
              le droit de rétractation ne peut être exercé pour les fournitures de biens
              ou de services dont le contenu a été délivré et dont l'exécution a commencé
              avec l'accord préalable exprès du consommateur, qui a renoncé à son droit de rétractation.
            </p>
            <p>
              Dès lors que l'utilisateur a téléchargé le document, celui-ci est considéré
              comme livré et <strong>aucun remboursement ne peut être demandé</strong>.
            </p>
            <p>
              Si le téléchargement n'a pas eu lieu et que le paiement a été effectué,
              l'utilisateur peut demander un remboursement dans un délai de 14 jours
              via le formulaire de contact.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 6 — Utilisation du document</h2>
            <p>
              Le document acheté est destiné à un usage professionnel interne. Il ne peut être
              revendu, redistribué ou publié. L'acheteur est responsable de l'adaptation du
              document à son activité réelle et de sa mise à jour régulière (au moins annuelle).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 7 — Limitation de responsabilité</h2>
            <p>
              Le modèle fourni est une trame à compléter. Il ne constitue pas une consultation
              juridique personnalisée. Loubna Abouz Manta ne saurait être tenue responsable
              de l'utilisation qui en est faite ni des omissions ou erreurs résultant d'un
              remplissage incomplet ou inadapté.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 8 — Données personnelles</h2>
            <p>
              Les données collectées lors de la commande (nom, e-mail) sont utilisées
              exclusivement pour le traitement de la commande et l'envoi du lien de téléchargement.
              Elles ne sont jamais partagées avec des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-encre-900 mb-3">Article 9 — Contact</h2>
            <p>
              Pour toute question relative à une commande, contactez-nous via le formulaire
              de contact du site ou à l'adresse : contact@juriste-droit-du-travail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
