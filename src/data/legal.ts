/**
 * Textes juridiques et disclaimers centralisés
 * Source: document client SITE INTERNET.docx
 */

export const LEGAL_DISCLAIMERS = {
  /** Note importante générale - FAQ et footer */
  general: "Les informations fournies sur ce site ont une vocation informative et ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.",

  /** Note importante services */
  services: [
    "J'interviens dans une démarche de prévention, d'accompagnement et de sécurisation des situations en droit du travail.",
    "Mes prestations portent notamment sur :",
    "l'analyse et la compréhension des situations",
    "la structuration des démarches",
    "la sécurisation des pratiques et des documents (notamment contrats de travail)",
    "Elles ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.",
    "En tant que juriste, mon intervention se situe en amont des procédures. Lorsque la situation nécessite une action contentieuse ou une représentation en justice, je vous oriente vers Maître Lahlouh, avocate à Paris, partenaire de confiance.",
  ],

  /** Disclaimer spécifique Suisse */
  suisse: {
    title: "Important",
    paragraphs: [
      "Je n'exerce pas comme avocate en Suisse et je ne fournis aucun conseil juridique suisse.",
      "Mon rôle consiste exclusivement à vous accompagner dans la rédaction et la reformulation de vos écrits, à partir des éléments que vous me transmettez ou d'informations déjà validées par un professionnel compétent en Suisse.",
      "Pour toute analyse juridique, stratégie de défense ou représentation devant une autorité ou un tribunal, il convient de consulter un avocat, un juriste suisse ou une organisation compétente.",
    ],
  },

  /** Disclaimer pages détaillées services */
  serviceDetail: "Prestations d'accompagnement, d'information et de prévention — hors consultation juridique réglementée. Les prestations proposées ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.",
} as const;

export const INTERVENTION_SCOPE = {
  allowed: [
    "analyse",
    "information",
    "accompagnement",
    "orientation",
    "prévention",
    "sécurisation",
    "structuration",
    "aide rédactionnelle",
    "compréhension",
    "identification des risques",
  ],
  forbidden: [
    "conseil juridique",
    "consultation juridique",
    "défense",
    "représentation",
    "plaidoirie",
    "stratégie contentieuse",
  ],
} as const;
