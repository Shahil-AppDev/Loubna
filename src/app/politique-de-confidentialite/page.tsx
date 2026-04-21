import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données personnelles — conformité RGPD.",
  robots: { index: false, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">Politique de confidentialité</span>
          </nav>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white leading-tight">
            Politique de confidentialité
          </h1>
          <p className="text-white/40 mt-3 text-sm">
            Conformité RGPD — Dernière mise à jour : {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto prose-legal">

            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            <ul>
              <li><strong>Identité :</strong> {SITE_CONFIG.name}</li>
              <li><strong>Qualité :</strong> {SITE_CONFIG.title}</li>
              <li><strong>Email :</strong> <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></li>
              <li><strong>Téléphone :</strong> {SITE_CONFIG.phone}</li>
            </ul>

            <h2>2. Données collectées</h2>
            <p>
              Dans le cadre de l'utilisation du formulaire de contact, les données suivantes sont collectées :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Type de demande et statut (salarié / employeur)</li>
              <li>Sujet et contenu du message</li>
            </ul>
            <p>
              Ces données sont collectées uniquement sur la base de votre consentement explicite,
              matérialisé par le cochage de la case RGPD dans le formulaire.
            </p>

            <h2>3. Finalités du traitement</h2>
            <p>Vos données sont collectées et traitées pour les finalités suivantes :</p>
            <ul>
              <li>Répondre à vos demandes de conseil et d'information</li>
              <li>Assurer le suivi de votre dossier</li>
              <li>Améliorer la qualité du service proposé</li>
            </ul>

            <h2>4. Base légale du traitement</h2>
            <p>
              Le traitement de vos données repose sur votre consentement (article 6.1.a du RGPD),
              que vous exprimez lors de l'envoi du formulaire de contact. Vous pouvez retirer ce
              consentement à tout moment en nous contactant.
            </p>

            <h2>5. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pour la durée strictement nécessaire au
              traitement de votre demande, et au maximum <strong>3 ans</strong> à compter du dernier
              contact, conformément aux recommandations de la CNIL.
            </p>

            <h2>6. Destinataires des données</h2>
            <p>
              Vos données personnelles sont traitées exclusivement par {SITE_CONFIG.name} et ne sont
              jamais transmises, vendues ou louées à des tiers, sauf obligation légale.
            </p>
            <p>
              Les données transmises via le formulaire peuvent transiter par des prestataires
              techniques (hébergeur, service d'envoi d'email) qui agissent en tant que sous-traitants
              et s'engagent à respecter la confidentialité de vos données.
            </p>

            <h2>7. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la limitation</strong> : restreindre le traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Droit de retrait du consentement</strong> : à tout moment, sans affecter la licéité du traitement antérieur</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous par email à{" "}
              <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a> en joignant une
              copie d'une pièce d'identité.
            </p>
            <p>
              En cas de réclamation, vous pouvez également saisir la{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                Commission Nationale de l'Informatique et des Libertés (CNIL)
              </a>.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Ce site peut utiliser des cookies techniques strictement nécessaires à son
              fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est utilisé
              sans votre consentement préalable.
            </p>

            <h2>9. Sécurité</h2>
            <p>
              Des mesures techniques et organisationnelles appropriées sont mises en place pour
              garantir la sécurité de vos données personnelles contre toute perte, destruction,
              altération ou accès non autorisé.
            </p>

            <h2>10. Modifications de la politique</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour à tout moment. Toute
              modification sera publiée sur cette page avec une date de mise à jour. Nous vous
              encourageons à la consulter régulièrement.
            </p>

            <h2>11. Contact</h2>
            <p>
              Pour toute question relative à la présente politique ou au traitement de vos données :
            </p>
            <ul>
              <li>
                Par email : <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </li>
              <li>
                Via le{" "}
                <Link href="/contact" className="text-rouge-800 underline">formulaire de contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        .prose-legal h2 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.45rem;
          color: #0A0A0A;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #E8E5E0;
        }
        .prose-legal p {
          font-size: 0.93rem;
          color: #6E6760;
          line-height: 1.9;
          margin-bottom: 1rem;
        }
        .prose-legal ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose-legal ul li {
          font-size: 0.93rem;
          color: #6E6760;
          line-height: 1.8;
          margin-bottom: 0.5rem;
        }
        .prose-legal a {
          color: #8B0000;
          text-decoration: underline;
        }
        .prose-legal strong {
          color: #353230;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
