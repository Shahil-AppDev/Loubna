import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

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
    title: "Prévention et gestion des accidents du travail",
    duration: "1 journée (7h)",
    public: "Employeurs, DRH, Responsables HSE, Managers",
    intro: "Les accidents du travail représentent un enjeu majeur pour les entreprises, tant sur le plan humain que juridique et financier. Cette formation vous permet de comprendre les obligations légales, d'identifier les situations à risque et de mettre en place une démarche de prévention efficace.",
    pourquoi: "Parce qu'un accident du travail peut avoir des conséquences lourdes : arrêt de travail, impact sur la santé du salarié, coûts directs et indirects pour l'entreprise, responsabilité de l'employeur. Anticiper et prévenir, c'est protéger vos salariés et sécuriser votre activité.",
    objectifs: [
      "Comprendre ce qu'est un accident du travail et ses conséquences",
      "Identifier les situations à risque dans votre entreprise",
      "Connaître vos obligations légales en matière de prévention",
      "Savoir réagir en cas d'accident : déclaration, enquête, mesures correctives",
      "Mettre en place une démarche de prévention adaptée"
    ],
    programme: [
      {
        titre: "Qu'est-ce qu'un accident du travail ?",
        contenu: "Définition juridique, critères de reconnaissance, distinction avec l'accident de trajet et la maladie professionnelle"
      },
      {
        titre: "Les obligations de l'employeur",
        contenu: "Obligation de sécurité de résultat, évaluation des risques, DUERP, formation et information des salariés"
      },
      {
        titre: "Identifier les situations à risque",
        contenu: "Méthodologie d'analyse des postes de travail, facteurs de risque, outils d'identification"
      },
      {
        titre: "Que faire en cas d'accident ?",
        contenu: "Procédure de déclaration (délais, documents), enquête interne, analyse des causes, mesures correctives"
      },
      {
        titre: "Mettre en place une démarche de prévention",
        contenu: "Plan d'action, priorisation des mesures, suivi et évaluation, implication des équipes"
      }
    ],
    methodes: "Apports théoriques et juridiques, études de cas concrets, exercices pratiques, analyse de situations réelles issues de votre secteur d'activité, échanges et retours d'expérience",
    tarif: "Sur devis selon effectif et modalités"
  },
  {
    id: "pouvoir-disciplinaire",
    icon: "⚖️",
    title: "Gestion des procédures disciplinaires",
    duration: "1 journée (7h)",
    public: "Employeurs, DRH, Responsables RH, Managers",
    intro: "Gérer une procédure disciplinaire nécessite de maîtriser le cadre juridique, de respecter des étapes précises et de sécuriser chaque décision. Une erreur peut fragiliser la sanction et exposer l'entreprise à un contentieux. Cette formation vous donne les clés pour agir avec rigueur et sécurité.",
    pourquoi: "Parce qu'une procédure mal menée peut être annulée, même si les faits reprochés sont avérés. Parce que chaque étape compte : qualification des faits, respect des délais, proportionnalité de la sanction. Sécuriser vos décisions, c'est éviter les erreurs et limiter les risques contentieux.",
    objectifs: [
      "Maîtriser le cadre juridique du pouvoir disciplinaire",
      "Savoir qualifier les faits et choisir la sanction appropriée",
      "Respecter la procédure disciplinaire obligatoire",
      "Rédiger les documents (convocation, notification) de manière sécurisée",
      "Anticiper les risques contentieux et sécuriser vos décisions"
    ],
    programme: [
      {
        titre: "Le cadre juridique du pouvoir disciplinaire",
        contenu: "Définition de la faute, fondements légaux, règlement intérieur, échelle des sanctions, sanctions interdites"
      },
      {
        titre: "Qualifier les faits",
        contenu: "Distinction faute / insuffisance professionnelle, gravité de la faute, éléments de preuve, prescription"
      },
      {
        titre: "La procédure disciplinaire obligatoire",
        contenu: "Convocation à entretien préalable (forme, délais, contenu), déroulement de l'entretien, notification de la sanction, délais à respecter"
      },
      {
        titre: "Choisir la sanction",
        contenu: "Proportionnalité, non-discrimination, principe du non bis in idem, gradation des sanctions"
      },
      {
        titre: "Sécuriser la procédure et anticiper les risques",
        contenu: "Erreurs fréquentes à éviter, contestation de la sanction, contentieux prud'homal, rédaction sécurisée des documents"
      }
    ],
    methodes: "Apports juridiques, cas pratiques et mises en situation, rédaction de documents (convocation, notification), jeux de rôle (simulation d'entretien préalable), analyse de jurisprudence récente",
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
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">Formations</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Formations
          </h1>
          <p className="text-white/85 text-[1rem] max-w-[520px] mt-5 leading-[1.8]">
            Formations concrètes et directement applicables en entreprise pour les employeurs, DRH, responsables RH et managers.
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
                        <div className="flex items-center gap-2 text-white/75">
                          <span>👥</span>
                          <span>{formation.public}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Introduction */}
                  <div className="bg-encre-50 border border-encre-200 rounded-sm p-6">
                    <p className="text-[0.95rem] text-encre-700 leading-[1.85]">
                      {formation.intro}
                    </p>
                  </div>

                  {/* Pourquoi c'est essentiel */}
                  <div className="border-l-[4px] border-l-rouge-800 pl-6 py-2">
                    <h4 className="font-semibold text-[1rem] text-encre-800 mb-2 flex items-center gap-2">
                      <span>❓</span>
                      Pourquoi c&apos;est essentiel
                    </h4>
                    <p className="text-[0.9rem] text-encre-600 leading-[1.8]">
                      {formation.pourquoi}
                    </p>
                  </div>

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
