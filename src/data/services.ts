/**
 * Services centralisés - Source unique de vérité
 */

export const SERVICES = [
  // POUR LES SALARIÉS
  {
    id: "sanctions",
    icon: "⚡",
    title: "Procédures disciplinaires",
    description:
      "Comprendre, anticiper et sécuriser votre situation. Je vous accompagne face aux procédures disciplinaires (avertissement, mise à pied, entretien préalable) pour analyser votre situation, comprendre vos droits et préparer votre réponse.",
    category: "salarie" as const,
    slug: "sanctions-disciplinaires",
    tags: ["Avertissement", "Mise à pied", "Entretien préalable"],
  },
  {
    id: "harcelement",
    icon: "🔍",
    title: "Harcèlement et RPS",
    description:
      "Identifier les situations et agir avec clarté. Analyse des situations de harcèlement, discrimination ou risques psychosociaux. Je vous aide à qualifier les faits, comprendre les mécanismes et identifier les actions adaptées.",
    category: "salarie" as const,
    slug: "harcelement-rps",
    tags: ["Harcèlement moral", "RPS", "Discrimination"],
  },
  {
    id: "atmp",
    icon: "🏥",
    title: "Accidents du travail & maladies professionnelles (AT/MP)",
    description:
      "Constituer un dossier solide et éviter les erreurs. Je vous accompagne dans vos démarches de reconnaissance (y compris TMS), notamment en cas de contestation ou de refus. Aide à la compréhension des attentes de la CPAM et à la structuration de votre dossier.\n\nOrientation vers un avocat si une procédure devient nécessaire.",
    category: "salarie" as const,
    slug: "atmp",
    tags: ["Accident du travail", "Maladie professionnelle", "TMS"],
  },
  // POUR LES EMPLOYEURS
  {
    id: "prevention-risques",
    icon: "⚠️",
    title: "Prévention des risques professionnels",
    description:
      "Structurer votre démarche et réduire les risques\n\nAccompagnement dans l'évaluation des risques professionnels (RPS, TMS, AT/MP) et la mise en place d'actions concrètes de prévention adaptées à votre organisation.",
    category: "employeur" as const,
    slug: "prevention-risques",
    tags: ["RPS", "TMS", "AT/MP"],
  },
  {
    id: "duerp",
    icon: "📋",
    title: "DUERP – Document Unique",
    description:
      "Un outil de prévention, pas seulement une obligation\n\nRéalisation ou mise à jour du DUERP avec une approche opérationnelle : analyse des situations de travail, identification des risques et structuration du document.",
    category: "employeur" as const,
    slug: "duerp",
    tags: ["DUERP", "Document Unique", "Obligation légale"],
  },
  {
    id: "procedures-disciplinaires-employeur",
    icon: "⚖️",
    title: "Procédures disciplinaires",
    description:
      "Sécuriser vos décisions et éviter les erreurs\n\nAccompagnement en amont des procédures disciplinaires : analyse de la situation, qualification des faits, respect des étapes et sécurisation des décisions.",
    category: "employeur" as const,
    slug: "procedures-disciplinaires-employeur",
    tags: ["Sanctions", "Procédure", "Sécurisation"],
  },
  {
    id: "situations-sensibles",
    icon: "🛡️",
    title: "Gestion des situations sensibles RH",
    description:
      "Anticiper les risques et sécuriser vos décisions\n\nIntervention en amont sur des situations à risque : signalement de harcèlement, conflit, situation dégradée ou problématique disciplinaire.\n\nAnalyse de la situation, identification des enjeux et accompagnement pour sécuriser les décisions et éviter les erreurs.",
    category: "employeur" as const,
    slug: "situations-sensibles",
    tags: ["Harcèlement", "Conflit", "Prévention"],
  },
  // SALARIÉS & EMPLOYEURS
  {
    id: "contrat",
    icon: "📄",
    title: "Contrats de travail",
    description:
      "Sécuriser vos engagements contractuels\n\nRelecture, vérification et sécurisation de vos contrats de travail (CDI, CDD, temps partiel). Analyse des clauses, conformité juridique et adaptation à votre situation.\n\nPossibilité d'accompagnement à la rédaction, avec une approche orientée prévention des risques.",
    category: "all" as const,
    slug: "contrat-travail",
    tags: ["CDI", "CDD", "Clauses contractuelles"],
  },
  {
    id: "analyse",
    icon: "🔍",
    title: "Analyse de situation professionnelle",
    description:
      "Prendre du recul et sécuriser vos décisions\n\nAnalyse approfondie de votre situation au regard du droit du travail et du contexte professionnel. Identification des enjeux, des risques et des leviers d'action en amont de toute démarche.",
    category: "all" as const,
    slug: "analyse-situation",
    tags: ["Compréhension", "Éclairage", "Droit du travail"],
  },
  {
    id: "securisation-demarches",
    icon: "⚖️",
    title: "Sécurisation des démarches",
    description:
      "Éviter les erreurs et structurer vos actions\n\nAccompagnement dans la compréhension des procédures et des étapes à respecter, afin d'éviter les erreurs et sécuriser vos démarches.",
    category: "all" as const,
    slug: "securisation-demarches",
    tags: ["Procédure", "Sécurisation", "Accompagnement"],
  },
  {
    id: "negociation",
    icon: "🤝",
    title: "Négociation amiable",
    description:
      "Trouver une solution sans passer par le contentieux\n\nAccompagnement dans les démarches de négociation : conditions de départ, protocole d'accord, conciliation. Évaluation des enjeux et sécurisation des intérêts de chaque partie.",
    category: "all" as const,
    slug: "negociation",
    tags: ["Négociation", "Accord amiable", "Médiation"],
  },
  {
    id: "information",
    icon: "📚",
    title: "Information en droit du travail",
    description:
      "Comprendre pour agir avec clarté\n\nApport d'éclairages juridiques adaptés à votre situation pour vous permettre de prendre des décisions éclairées.",
    category: "all" as const,
    slug: "information",
    tags: ["Information", "Éclairage", "Droit du travail"],
  },
  {
    id: "droit-travail-suisse",
    icon: "🇨🇭",
    title: "Droit du travail suisse",
    description:
      "Accompagnement rédactionnel pour vos courriers liés au travail en Suisse\n\nJe vous accompagne dans la préparation, la reformulation et la mise en forme de vos courriers professionnels liés au travail en Suisse, sans conseil juridique suisse.",
    category: "all" as const,
    slug: "droit-travail-suisse",
    tags: ["Suisse", "Rédaction", "Courriers"],
  },
] as const;

export const SERVICE_CATEGORIES = [
  { key: "salarie", label: "Pour les salariés" },
  { key: "employeur", label: "Pour les employeurs" },
  { key: "all", label: "Salariés & employeurs" },
] as const;
