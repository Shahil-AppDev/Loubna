import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Positionnement légal et avertissements | Loubna Abouz Manta",
  description:
    "Information sur le positionnement légal de Loubna Abouz Manta : juriste en droit du travail, accompagnement rédactionnel, limites des services, disclaimers.",
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/positionnement-legal",
  },
};

export default function PositionnementLegalPage() {
  return (
    <div className="min-h-screen bg-encre-950">
      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <nav className="flex items-center gap-2 text-sm text-encre-400 mb-8">
          <Link href="/" className="hover:text-or-500">Accueil</Link>
          <span className="mx-1">/</span>
          <span className="text-white">Positionnement légal</span>
        </nav>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
          Positionnement légal et avertissements
        </h1>

        <div className="space-y-8 text-encre-200 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">Nature des services</h2>
            <p className="mb-3">
              Loubna Abouz Manta est juriste en droit du travail. Les services proposés consistent en :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accompagnement et conseil en droit du travail (consultations, analyse de situation)</li>
              <li>Rédaction de courriers et documents professionnels</li>
              <li>Modèles et documents téléchargeables (DUERP, courriers, checklists)</li>
              <li>Guides pratiques d'information générale</li>
            </ul>
            <p className="mt-3">
              Ces services s'inscrivent dans le cadre d'un accompagnement juridique et rédactionnel.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">Limites de l'accompagnement</h2>
            <p className="mb-3">
              Les informations, guides et modèles fournis constituent une information générale et
              ne remplacent pas une consultation personnalisée. Chaque situation étant unique,
              il est recommandé de prendre rendez-vous pour une analyse adaptée.
            </p>
            <p>
              Les documents téléchargeables (DUERP, courriers, checklists) sont des modèles généraux
              à compléter et à adapter à la situation réelle de l'entreprise ou du salarié.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">Documents numériques</h2>
            <p className="mb-3">
              Les documents numériques proposés au téléchargement sont des modèles et trames. Ils ne
              constituent pas un conseil juridique personnalisé. L'utilisation de ces documents se
              fait sous la responsabilité de l'utilisateur.
            </p>
            <p>
              Aucun document payant n'est accessible publiquement sans achat préalable. Les fichiers
              sont stockés de manière sécurisée et ne sont accessibles qu'après paiement et génération
              d'un token de téléchargement temporaire.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">Intervention en Suisse</h2>
            <p>
              Pour les clients situés en Suisse, les services proposés se limitent à un accompagnement
              rédactionnel. Les courriers et documents fournis ne constituent pas un conseil juridique
              suisse. Pour une analyse juridique spécifique au droit suisse, il est recommandé de
              consulter un professionnel du droit suisse.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">Protection des données (RGPD)</h2>
            <p className="mb-3">
              Les données personnelles collectées sur ce site (nom, e-mail, informations de commande)
              sont traitées conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
            <p>
              Pour plus d'informations, consultez notre{" "}
              <Link href="/confidentialite" className="text-or-500 hover:text-or-400">
                politique de confidentialité
              </Link>
              {" "}et nos{" "}
              <Link href="/cgu" className="text-or-500 hover:text-or-400">
                conditions générales d'utilisation
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">Paiements et remboursements</h2>
            <p className="mb-3">
              Les paiements pour les documents numériques sont traités de manière sécurisée via SumUp.
              Les données de carte bancaire ne sont jamais stockées sur nos serveurs.
            </p>
            <p>
              Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai
              de 14 jours pour exercer votre droit de rétractation. Toutefois, pour les contenus
              numériques fournis par téléchargement, ce droit peut être renoncé si vous avez explicitement
              accepté le début de la fourniture du contenu avant la fin du délai de rétractation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-3">Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur ce site (textes, guides, modèles, logos, design) sont la
              propriété de Loubna Abouz Manta, sauf mention contraire. Toute reproduction, représentation,
              modification ou diffusion, totale ou partielle, sans autorisation écrite préalable, est
              interdite.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-encre-900 rounded-xl border border-encre-800">
          <p className="text-encre-300 text-sm leading-relaxed">
            <strong className="text-white">Contact :</strong> Pour toute question relative au
            positionnement légal ou à l'utilisation de ce site, vous pouvez contacter Loubna Abouz Manta
            via le formulaire de contact ou par e-mail.
          </p>
        </div>
      </article>
    </div>
  );
}
