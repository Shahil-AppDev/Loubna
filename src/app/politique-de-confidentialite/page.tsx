import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles du site de Loubna Abouz Manta, juriste en droit du travail.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section className="bg-encre-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />
        <div className="container-site relative z-10">
          <SectionLabel light>RGPD</SectionLabel>
          <h1 className="font-serif text-3xl lg:text-4xl text-white font-bold mt-2">
            Politique de confidentialité
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-encre-50">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="bg-white border border-encre-100 rounded-sm p-8 lg:p-10 space-y-10 text-sm text-encre-600 leading-relaxed">

              <div>
                <p>
                  La présente politique de confidentialité décrit la manière dont
                  Loubna Abouz Manta collecte, utilise et protège vos données
                  personnelles dans le cadre de l&apos;utilisation de ce site internet
                  et de ses services.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  1. Responsable du traitement
                </h2>
                <div className="space-y-1.5">
                  <p><strong className="text-encre-800">Identité :</strong> Loubna Abouz Manta</p>
                  <p><strong className="text-encre-800">Adresse :</strong> {SITE_CONFIG.address}</p>
                  <p><strong className="text-encre-800">Email :</strong>{" "}
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-rouge-700 hover:underline">
                      {SITE_CONFIG.email}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  2. Données collectées
                </h2>
                <p className="mb-4">
                  Les données collectées via le formulaire de contact sont les suivantes :
                </p>
                <ul className="space-y-2 ml-4">
                  {[
                    "Nom et prénom",
                    "Adresse email",
                    "Numéro de téléphone (facultatif)",
                    "Type de demande et statut (salarié / employeur / autre)",
                    "Sujet et contenu du message",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rouge-700 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  3. Finalité du traitement
                </h2>
                <p className="mb-4">Vos données sont collectées uniquement pour :</p>
                <ul className="space-y-2 ml-4">
                  {[
                    "Répondre à votre demande de contact",
                    "Analyser votre situation et vous proposer un accompagnement adapté",
                    "Gérer la relation client dans le cadre d'une prestation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rouge-700 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  4. Base légale
                </h2>
                <p>
                  Le traitement de vos données repose sur votre consentement explicite,
                  exprimé lors de la soumission du formulaire (case RGPD obligatoire).
                  Vous pouvez retirer ce consentement à tout moment.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  5. Durée de conservation
                </h2>
                <p>
                  Vos données sont conservées pendant la durée nécessaire au traitement
                  de votre demande et, le cas échéant, pendant la durée de la relation
                  contractuelle. Elles sont ensuite supprimées ou anonymisées dans un
                  délai de 3 ans maximum après le dernier contact.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  6. Destinataires des données
                </h2>
                <p>
                  Vos données sont strictement confidentielles et ne sont jamais
                  transmises à des tiers à des fins commerciales. Elles peuvent
                  être partagées uniquement avec des prestataires techniques
                  strictement nécessaires (hébergeur, outil d&apos;envoi d&apos;emails),
                  dans le respect du RGPD.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  7. Vos droits
                </h2>
                <p className="mb-4">
                  Conformément au RGPD et à la loi Informatique et Libertés,
                  vous disposez des droits suivants :
                </p>
                <ul className="space-y-2 ml-4">
                  {[
                    "Droit d'accès à vos données",
                    "Droit de rectification",
                    "Droit à l'effacement (droit à l'oubli)",
                    "Droit à la limitation du traitement",
                    "Droit à la portabilité",
                    "Droit d'opposition",
                    "Droit de retirer votre consentement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rouge-700 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-moi à l&apos;adresse :{" "}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-rouge-700 hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="mt-3">
                  En cas de réclamation non résolue, vous pouvez saisir la{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rouge-700 hover:underline"
                  >
                    Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  8. Sécurité
                </h2>
                <p>
                  Des mesures techniques et organisationnelles appropriées sont mises
                  en place pour protéger vos données contre tout accès non autorisé,
                  perte ou divulgation. L&apos;ensemble des échanges est chiffré via
                  le protocole HTTPS.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  9. Cookies
                </h2>
                <p>
                  Ce site utilise uniquement des cookies techniques indispensables
                  à son fonctionnement (session, sécurité). Aucun cookie publicitaire
                  ou de traçage comportemental n&apos;est utilisé sans votre consentement.
                </p>
              </div>

              <div className="pt-4 border-t border-encre-100">
                <p className="text-encre-400 text-xs">
                  Dernière mise à jour : Avril 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
