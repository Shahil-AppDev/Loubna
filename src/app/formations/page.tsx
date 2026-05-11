import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Formations — Loubna Abouz Manta, Juriste en Droit du Travail",
  description:
    "Formations en droit du travail et prévention des risques professionnels : réduction des accidents du travail, exercice du pouvoir disciplinaire de l'employeur.",
  openGraph: {
    title: `Formations – ${SITE_CONFIG.name}`,
    description:
      "Formations professionnelles en droit du travail et prévention des risques.",
  },
};

const FORMATIONS = [
  {
    id: "accidents-travail",
    icon: "⚠️",
    title: "Réduire les zones de risque en matière d'accidents du travail",
    duration: "1 journée (7h)",
    public: "Employeurs, DRH, Responsables HSE, Managers",
    objectifs: [
      "Identifier les situations à risque dans l'entreprise",
      "Comprendre les obligations légales en matière de prévention",
      "Mettre en place des mesures préventives efficaces",
      "Connaître les conséquences d'un accident du travail pour l'entreprise",
      "Maîtriser la procédure de déclaration et de gestion d'un AT"
    ],
    programme: [
      {
        titre: "Les accidents du travail : définition et enjeux",
        contenu: "Définition juridique, statistiques, coûts directs et indirects pour l'entreprise"
      },
      {
        titre: "Les obligations de l'employeur",
        contenu: "Obligation de sécurité, DUERP, formation à la sécurité, équipements de protection"
      },
      {
        titre: "Identifier et évaluer les risques",
        contenu: "Méthodologie d'identification des risques, analyse des postes de travail, visite terrain"
      },
      {
        titre: "Mettre en place des actions préventives",
        contenu: "Priorisation des actions, plan d'action, suivi et évaluation"
      },
      {
        titre: "Gérer un accident du travail",
        contenu: "Procédure de déclaration, enquête interne, mesures correctives"
      }
    ],
    methodes: "Apports théoriques, études de cas, exercices pratiques, analyse de situations réelles",
    tarif: "Sur devis selon effectif et modalités"
  },
  {
    id: "pouvoir-disciplinaire",
    icon: "⚖️",
    title: "Exercice du pouvoir disciplinaire de l'employeur",
    duration: "1 journée (7h)",
    public: "Employeurs, DRH, Responsables RH, Managers",
    objectifs: [
      "Maîtriser le cadre juridique du pouvoir disciplinaire",
      "Identifier les faits justifiant une sanction",
      "Respecter la procédure disciplinaire obligatoire",
      "Choisir la sanction appropriée et proportionnée",
      "Sécuriser juridiquement les décisions disciplinaires"
    ],
    programme: [
      {
        titre: "Le cadre juridique du pouvoir disciplinaire",
        contenu: "Définition, fondements légaux, règlement intérieur, échelle des sanctions"
      },
      {
        titre: "Les faits justifiant une sanction",
        contenu: "Faute professionnelle, manquement aux obligations, distinction faute/insuffisance professionnelle"
      },
      {
        titre: "La procédure disciplinaire obligatoire",
        contenu: "Convocation à entretien préalable, délais, notification de la sanction, prescription"
      },
      {
        titre: "Le choix de la sanction",
        contenu: "Proportionnalité, non-discrimination, principe du non bis in idem, sanctions interdites"
      },
      {
        titre: "Les risques juridiques et contentieux",
        contenu: "Contestation de la sanction, annulation, dommages et intérêts, sécurisation des procédures"
      }
    ],
    methodes: "Apports juridiques, cas pratiques, rédaction de documents, jeux de rôle (entretien préalable)",
    tarif: "Sur devis selon effectif et modalités"
  }
];

export default function FormationsPage() {
  return (
    <>
      {/* ─── PAGE HERO ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,.22) 0%, transparent 70%)" }}
        />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">Formations</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Formations professionnelles
            <br />
            <em className="text-or-500 font-light" style={{ fontStyle: "italic" }}>
              en droit du travail.
            </em>
          </h1>
          <p className="text-white/50 text-[1rem] max-w-[520px] mt-5 leading-[1.8]">
            Formations ciblées pour les employeurs, DRH et managers souhaitant maîtriser
            les enjeux juridiques et pratiques du droit du travail et de la prévention des risques.
          </p>
        </div>
      </section>

      {/* ─── INTRO ─────────────────────────────────────── */}
      <section className="pt-16 pb-4 bg-encre-50">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Prévention · Droit du travail</span>
            <p className="text-[1.02rem] text-encre-500 leading-[1.85]">
              Des formations pratiques et opérationnelles, conçues pour répondre aux besoins
              concrets des entreprises en matière de prévention des risques professionnels
              et de gestion des relations de travail.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORMATIONS ────────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="space-y-16">
            {FORMATIONS.map((formation, index) => (
              <div key={formation.id} className="bg-white border border-encre-100 rounded-sm shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-encre-950 p-8">
                  <div className="flex items-start gap-5">
                    <span className="text-[2.5rem] flex-shrink-0">{formation.icon}</span>
                    <div className="flex-1">
                      <h2 className="font-serif text-[1.6rem] text-white mb-3 leading-[1.3]">
                        {formation.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-[0.85rem]">
                        <div className="flex items-center gap-2 text-or-400">
                          <span>⏱️</span>
                          <span>{formation.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-encre-300">
                          <span>👥</span>
                          <span>{formation.public}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Objectifs */}
                  <div>
                    <h3 className="font-serif text-[1.2rem] text-encre-800 mb-4 flex items-center gap-2">
                      <span className="text-rouge-800">🎯</span>
                      Objectifs pédagogiques
                    </h3>
                    <ul className="space-y-2">
                      {formation.objectifs.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3 text-[0.9rem] text-encre-600">
                          <span className="text-or-500 mt-1 flex-shrink-0">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Programme */}
                  <div>
                    <h3 className="font-serif text-[1.2rem] text-encre-800 mb-4 flex items-center gap-2">
                      <span className="text-rouge-800">📋</span>
                      Programme détaillé
                    </h3>
                    <div className="space-y-4">
                      {formation.programme.map((module, i) => (
                        <div key={i} className="border-l-[3px] border-l-or-500 pl-5 py-2">
                          <h4 className="font-semibold text-[0.95rem] text-encre-800 mb-1">
                            {module.titre}
                          </h4>
                          <p className="text-[0.85rem] text-encre-500 leading-[1.7]">
                            {module.contenu}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Méthodes */}
                  <div className="bg-encre-50 border border-encre-100 rounded-sm p-5">
                    <h4 className="font-semibold text-[0.95rem] text-encre-800 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Méthodes pédagogiques
                    </h4>
                    <p className="text-[0.85rem] text-encre-600 leading-[1.7]">
                      {formation.methodes}
                    </p>
                  </div>

                  {/* Tarif & CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-encre-100">
                    <div>
                      <p className="text-[0.8rem] text-encre-400 uppercase tracking-[0.08em] mb-1">
                        Tarif
                      </p>
                      <p className="text-[0.95rem] text-encre-700 font-medium">
                        {formation.tarif}
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="btn btn-primary"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Info box ──────────────────────────── */}
          <div className="mt-16 bg-white border border-encre-100 border-l-[4px] border-l-or-500 p-8 rounded-sm max-w-2xl">
            <h4 className="font-serif text-[1.15rem] text-encre-800 mb-3 flex items-center gap-2">
              <span>ℹ️</span>
              Modalités pratiques
            </h4>
            <div className="space-y-2 text-[0.9rem] text-encre-600 leading-[1.8]">
              <p>
                <strong>Format :</strong> Inter-entreprises ou intra-entreprise (dans vos locaux)
              </p>
              <p>
                <strong>Effectif :</strong> 4 à 12 participants maximum pour garantir l'interactivité
              </p>
              <p>
                <strong>Supports :</strong> Livret pédagogique remis à chaque participant
              </p>
              <p>
                <strong>Adaptation :</strong> Programmes personnalisables selon vos besoins spécifiques
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Besoin d'une formation sur-mesure ?
          </h2>
          <p className="text-white/70 mb-9 max-w-md mx-auto leading-[1.75]">
            Contactez-moi pour échanger sur vos besoins et construire ensemble
            une formation adaptée à votre contexte.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Demander un devis
            </Link>
            <Link href="/services" className="btn btn-ghost-white">
              Voir les interventions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
