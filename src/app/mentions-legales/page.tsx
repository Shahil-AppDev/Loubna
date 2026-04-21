import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de Loubna Abouz Manta, juriste en droit du travail.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-encre-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />
        <div className="container-site relative z-10">
          <SectionLabel light>Légal</SectionLabel>
          <h1 className="font-serif text-3xl lg:text-4xl text-white font-bold mt-2">
            Mentions légales
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-encre-50">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="bg-white border border-encre-100 rounded-sm p-8 lg:p-10 space-y-10 text-sm text-encre-600 leading-relaxed">

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  1. Éditeur du site
                </h2>
                <div className="space-y-1.5">
                  <p><strong className="text-encre-800">Nom :</strong> Loubna Abouz Manta</p>
                  <p><strong className="text-encre-800">Activité :</strong> Juriste en droit du travail</p>
                  <p><strong className="text-encre-800">Adresse :</strong> {SITE_CONFIG.address} {/* À MODIFIER */}</p>
                  <p><strong className="text-encre-800">Email :</strong>{" "}
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-rouge-700 hover:underline">
                      {SITE_CONFIG.email}
                    </a>
                  </p>
                  <p><strong className="text-encre-800">Téléphone :</strong> {SITE_CONFIG.phone}</p>
                  <p><strong className="text-encre-800">SIRET :</strong> XXX XXX XXX XXXXX {/* À MODIFIER */}</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  2. Hébergement
                </h2>
                <div className="space-y-1.5">
                  <p><strong className="text-encre-800">Hébergeur :</strong> Vercel Inc. {/* À MODIFIER si besoin */}</p>
                  <p><strong className="text-encre-800">Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
                  <p><strong className="text-encre-800">Site web :</strong> vercel.com</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  3. Propriété intellectuelle
                </h2>
                <p>
                  L&apos;ensemble du contenu de ce site (textes, visuels, logo, architecture)
                  est protégé par le droit de la propriété intellectuelle et appartient
                  exclusivement à Loubna Abouz Manta, sauf mentions contraires.
                  Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  4. Limitation de responsabilité
                </h2>
                <p>
                  Les informations publiées sur ce site ont un caractère général et
                  informatif. Elles ne constituent en aucun cas un conseil juridique
                  personnalisé et ne sauraient engager la responsabilité de
                  Loubna Abouz Manta. Pour toute problématique juridique spécifique,
                  il convient de consulter un professionnel du droit.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  5. Données personnelles
                </h2>
                <p>
                  Le traitement des données personnelles collectées via le formulaire
                  de contact est effectué conformément au Règlement Général sur la
                  Protection des Données (RGPD). Pour en savoir plus, consultez notre{" "}
                  <a href="/politique-de-confidentialite" className="text-rouge-700 hover:underline">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  6. Cookies
                </h2>
                <p>
                  Ce site peut utiliser des cookies techniques nécessaires à son
                  fonctionnement. Aucun cookie de traçage publicitaire n&apos;est
                  déposé sans votre consentement explicite.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl text-encre-950 font-semibold mb-4">
                  7. Droit applicable
                </h2>
                <p>
                  Le présent site et ses mentions légales sont soumis au droit français.
                  Tout litige relatif à l&apos;utilisation de ce site sera soumis à la
                  compétence exclusive des tribunaux français.
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
