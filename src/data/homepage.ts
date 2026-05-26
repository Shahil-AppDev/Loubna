/**
 * Contenu de la page d'accueil centralisé
 */

export const HOMEPAGE_CONTENT = {
  hero: {
    badge: "Accompagnement & information en droit du travail (FR/AR)",
    title: "Juriste en droit du travail,",
    titleAccent: "prévention des risques professionnels.",
    description: "Spécialisée en prévention des risques professionnels et en accompagnement des situations sensibles, j'interviens en amont des procédures en apportant de la clarté. J'accompagne à la fois les salariés et les employeurs dans la compréhension et la gestion de leurs situations professionnelles.",
  },
  
  domainesSection: {
    label: "Domaines d'intervention",
    title: "Un accompagnement centré",
    titleAccent: "sur la prévention",
    cards: [
      {
        icon: "🔍",
        title: "Salariés",
        description: "J'accompagne salariés et entreprises en droit du travail, en apportant une analyse des situations professionnelles, une identification des risques et des solutions visant à sécuriser les pratiques.",
      },
      {
        icon: "🏢",
        title: "Employeurs",
        description: "J'interviens pour analyser les situations de travail, identifier les risques et orienter salariés et entreprises vers des pratiques sécurisées.",
      },
      {
        icon: "⚠️",
        title: "Prévention des risques",
        description: "J'interviens pour comprendre les situations de travail, identifier les risques et orienter salariés et entreprises vers des pratiques sécurisées, dans une démarche d'accompagnement, d'information et de prévention.",
      },
      {
        icon: "📋",
        title: "DUERP",
        description: "J'accompagne les entreprises dans la réalisation et la mise à jour du document unique d'évaluation des risques professionnels (DUERP), afin d'identifier les risques, d'analyser les situations de travail et de sécuriser leurs pratiques.",
      },
    ],
  },
} as const;
