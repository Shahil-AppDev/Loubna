export const SITE_CONFIG = {
  name: "Loubna Abouz Manta",
  title: "Juriste en droit du travail – Prévention des risques professionnels",
  url: "https://www.juriste-droit-du-travail.com",
  email: "louamjuristeconseil@gmail.com",
  phone: "06 59 11 11 08",
  address: "45 rue des Mines, 25400 Audincourt",
  hours: "Du lundi au jeudi : 10h–12h et 14h–18h · Vendredi : 10h–12h30",
  siret: "984 609 255 00018",
  siren: "984 609 255",
  ape: "6910Z - Activités juridiques",
  linkedin: "https://www.linkedin.com/in/loubna-abouz-manta-27a5032b7/",
  instagram: "https://www.instagram.com/louaamm/",
  tiktok: "https://www.tiktok.com/@loubna.am25",
  description:
    "J'interviens dans une démarche de prévention, d'accompagnement et de sécurisation des situations en droit du travail.",
};

export const SERVICES = [
  // POUR LES SALARIÉS
  {
    id: "sanctions",
    icon: "⚡",
    title: "Procédures disciplinaires",
    description:
      "Comprendre, anticiper et sécuriser votre situation. Je vous accompagne face aux procédures disciplinaires (avertissement, mise à pied, entretien préalable) pour analyser votre situation, comprendre vos droits et préparer votre réponse.",
    category: "salarie",
    slug: "sanctions-disciplinaires",
    tags: ["Avertissement", "Mise à pied", "Entretien préalable"],
  },
  {
    id: "harcelement",
    icon: "🔍",
    title: "Harcèlement et RPS",
    description:
      "Identifier les situations et agir avec clarté. Analyse des situations de harcèlement, discrimination ou risques psychosociaux. Je vous aide à qualifier les faits, comprendre les mécanismes et identifier les actions adaptées.",
    category: "salarie",
    slug: "harcelement-rps",
    tags: ["Harcèlement moral", "RPS", "Discrimination"],
  },
  {
    id: "atmp",
    icon: "🏥",
    title: "Accidents du travail & maladies professionnelles (AT/MP)",
    description:
      "Constituer un dossier solide et éviter les erreurs. Je vous accompagne dans vos démarches de reconnaissance (y compris TMS), notamment en cas de contestation ou de refus. Aide à la compréhension des attentes de la CPAM et à la structuration de votre dossier.\n\nOrientation vers un avocat si une procédure devient nécessaire.",
    category: "salarie",
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
    category: "employeur",
    slug: "prevention-risques",
    tags: ["RPS", "TMS", "AT/MP"],
  },
  {
    id: "duerp",
    icon: "📋",
    title: "DUERP – Document Unique",
    description:
      "Un outil de prévention, pas seulement une obligation\n\nRéalisation ou mise à jour du DUERP avec une approche opérationnelle : analyse des situations de travail, identification des risques et structuration du document.",
    category: "employeur",
    slug: "duerp",
    tags: ["DUERP", "Document Unique", "Obligation légale"],
  },
  {
    id: "procedures-disciplinaires-employeur",
    icon: "⚖️",
    title: "Procédures disciplinaires",
    description:
      "Sécuriser vos décisions et éviter les erreurs\n\nAccompagnement en amont des procédures disciplinaires : analyse de la situation, qualification des faits, respect des étapes et sécurisation des décisions.",
    category: "employeur",
    slug: "procedures-disciplinaires-employeur",
    tags: ["Sanctions", "Procédure", "Sécurisation"],
  },
  {
    id: "situations-sensibles",
    icon: "🛡️",
    title: "Gestion des situations sensibles RH",
    description:
      "Anticiper les risques et sécuriser vos décisions\n\nIntervention en amont sur des situations à risque :signalement de harcèlement, conflit, situation dégradée ou problématique disciplinaire.\n\nAnalyse de la situation, identification des enjeux et accompagnement pour sécuriser les décisions et éviter les erreurs.",
    category: "employeur",
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
    category: "all",
    slug: "contrat-travail",
    tags: ["CDI", "CDD", "Clauses contractuelles"],
  },
  {
    id: "analyse",
    icon: "🔍",
    title: "Analyse de situation professionnelle",
    description:
      "Prendre du recul et sécuriser vos décisions\n\nAnalyse approfondie de votre situation au regard du droit du travail et du contexte professionnel. Identification des enjeux, des risques et des leviers d'action en amont de toute démarche.",
    category: "all",
    slug: "analyse-situation",
    tags: ["Compréhension", "Éclairage", "Droit du travail"],
  },
  {
    id: "securisation-demarches",
    icon: "⚖️",
    title: "Sécurisation des démarches",
    description:
      "Éviter les erreurs et structurer vos actions\n\nAccompagnement dans la compréhension des procédures et des étapes à respecter, afin d'éviter les erreurs et sécuriser vos démarches.",
    category: "all",
    slug: "securisation-demarches",
    tags: ["Procédure", "Sécurisation", "Accompagnement"],
  },
  {
    id: "negociation",
    icon: "🤝",
    title: "Négociation amiable",
    description:
      "Trouver une solution sans passer par le contentieux\n\nAccompagnement dans les démarches de négociation : conditions de départ, protocole d'accord, conciliation. Évaluation des enjeux et sécurisation des intérêts de chaque partie.",
    category: "all",
    slug: "negociation",
    tags: ["Négociation", "Accord amiable", "Médiation"],
  },
  {
    id: "information",
    icon: "📚",
    title: "Information en droit du travail",
    description:
      "Comprendre pour agir avec clarté\n\nApport d'éclairages juridiques adaptés à votre situation pour vous permettre de prendre des décisions éclairées.",
    category: "all",
    slug: "information",
    tags: ["Information", "Éclairage", "Droit du travail"],
  },
  {
    id: "droit-travail-suisse",
    icon: "🇨🇭",
    title: "Droit du travail suisse",
    description:
      "Accompagnement rédactionnel pour vos courriers liés au travail en Suisse\n\nJe vous accompagne dans la préparation, la reformulation et la mise en forme de vos courriers professionnels liés au travail en Suisse, sans conseil juridique suisse.",
    category: "all",
    slug: "droit-travail-suisse",
    tags: ["Suisse", "Rédaction", "Courriers"],
  },
];

export { FAQ_ITEMS } from "./client-faq-items";

export const TESTIMONIALS = [
  {
    initials: "S.M.",
    name: "S. Moreau",
    role: "Salarié · Cadre RH",
    text: "Son accompagnement m'a permis de comprendre mes droits et d'aborder la procédure sereinement. Un suivi rigoureux et humain.",
  },
  {
    initials: "P.L.",
    name: "P. Laurent",
    role: "Employeur · PDG PME",
    text: "En tant que dirigeant de PME, j'avais besoin d'un regard éclairé sur nos procédures. Réponses claires, délais respectés, professionnalisme exemplaire.",
  },
  {
    initials: "A.D.",
    name: "A. Dubois",
    role: "Salariée · Secteur public",
    text: "Face à une situation complexe, j'ai trouvé une juriste à l'écoute, humaine et efficace. Elle m'a orientée vers les bonnes démarches. Je la recommande sans réserve.",
  },
];

export const DEMAND_TYPES = [
  { value: "analyse-situation", label: "Compréhension de situation professionnelle" },
  { value: "contrat-travail", label: "Contrat de travail" },
  { value: "sanctions-disciplinaires", label: "Procédure disciplinaire" },
  { value: "licenciement", label: "Accompagnement – fin de contrat" },
  { value: "rupture-conventionnelle", label: "Information en droit du travail" },
  { value: "prevention-risques", label: "Prévention des risques professionnels" },
  { value: "duerp", label: "DUERP — Document Unique" },
  { value: "sante-securite", label: "Santé, sécurité au travail" },
  { value: "harcelement-rps", label: "Harcèlement / RPS" },
  { value: "negociation", label: "Négociation amiable" },
  { value: "autre", label: "Autre demande" },
];

export const STATUTS = [
  { value: "salarie", label: "Salarié(e)" },
  { value: "employeur", label: "Employeur / DRH" },
  { value: "autre", label: "Autre" },
];

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Interventions" },
  { href: "/droit-travail-suisse", label: "Suisse" },
  { href: "/formations", label: "Formations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
