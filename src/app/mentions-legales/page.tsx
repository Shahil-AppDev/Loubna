import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de Loubna Abouz Manta, juriste en droit du travail.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">Mentions légales</span>
          </nav>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white leading-tight">
            Mentions légales
          </h1>
          <p className="text-white/40 mt-3 text-sm">
            Dernière mise à jour : {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto prose-legal">

            <h2>1. Éditeur du site</h2>
            <p>
              Le présent site internet est édité par :
            </p>
            <ul>
              <li><strong>Nom :</strong> {SITE_CONFIG.name}</li>
              <li><strong>Qualité :</strong> {SITE_CONFIG.title}</li>
              <li><strong>Adresse :</strong> {SITE_CONFIG.address} — <em>À compléter</em></li>
              <li><strong>Email :</strong> <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></li>
              <li><strong>Téléphone :</strong> {SITE_CONFIG.phone}</li>
              <li><strong>SIRET :</strong> <!-- VOTRE SIRET --></li>
            </ul>

            <h2>2. Hébergeur</h2>
            <p>
              Ce site est hébergé par :
              <br />
              <strong>Vercel Inc.</strong>
              <br />
              340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis
              <br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logos, structure) sont
              la propriété exclusive de {SITE_CONFIG.name} ou de leurs auteurs respectifs. Toute
              reproduction, représentation, modification, publication ou adaptation, totale ou partielle,
              des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
              l'autorisation préalable et écrite de {SITE_CONFIG.name}.
            </p>

            <h2>4. Limitation de responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont fournies à titre indicatif. Elles ne
              constituent pas un conseil juridique personnalisé et ne sauraient engager la responsabilité
              de {SITE_CONFIG.name}. Chaque situation étant unique, il convient de prendre contact
              directement pour obtenir un conseil adapté.
            </p>
            <p>
              {SITE_CONFIG.name} ne saurait être tenu responsable des dommages directs ou indirects
              causés au matériel de l'utilisateur lors de l'accès au site, résultant de l'utilisation
              d'un matériel ne répondant pas aux spécifications requises ou de l'apparition d'un
              bug ou d'une incompatibilité.
            </p>

            <h2>5. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers d'autres sites. {SITE_CONFIG.name} n'exerce aucun
              contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>

            <h2>6. Droit applicable</h2>
            <p>
              Le présent site est soumis au droit français. Tout litige relatif à son utilisation
              sera soumis à la compétence exclusive des tribunaux français.
            </p>

            <h2>7. Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :
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

      {/* Inline prose styles for legal pages */}
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
      `}</style>
    </>
  );
}
