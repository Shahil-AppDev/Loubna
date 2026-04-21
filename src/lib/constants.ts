export const SITE_CONFIG = {
  name: "Loubna Abouz Manta",
  title: "Loubna Abouz Manta — Juriste en Droit du Travail",
  titleShort: "Loubna Abouz Manta",
  description:
    "Loubna Abouz Manta, juriste en droit du travail. Accompagnement des salariés et des entreprises dans l'analyse de leurs situations professionnelles et la prévention des risques, en amont des procédures.",
  url: "https://loubna-abouz-manta.fr", // À MODIFIER
  email: "contact@loubna-abouz-manta.fr", // À MODIFIER
  phone: "+33 X XX XX XX XX", // À MODIFIER
  address: "Paris, France", // À MODIFIER
  hours: "Lun–Ven : 9h–18h", // À MODIFIER
  linkedin: "https://linkedin.com/in/loubna-abouz-manta", // À MODIFIER
  instagram: "", // À MODIFIER (laisser vide pour masquer)
};

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    id: "analyse",
    icon: "🔎",
    title: "Analyse de situation professionnelle",
    description:
      "Analyse approfondie de la situation de travail pour identifier les enjeux, clarifier le cadre applicable et orienter vers les options les plus adaptées, en amont de toute démarche.",
    tags: ["Analyse", "Orientation", "Amont"],
  },
  {
    id: "prevention-conflits",
    icon: "🛡️",
    title: "Prévention des conflits",
    description:
      "Identification des tensions en amont pour agir avant leur escalade. Accompagnement dans la mise en place de pratiques visant à préserver la qualité des relations professionnelles.",
    tags: ["Prévention", "Anticipation", "Relations"],
  },
  {
    id: "salaries",
    icon: "👤",
    title: "Accompagnement des salariés",
    description:
      "Analyse de la situation professionnelle, compréhension du cadre applicable et orientation dans les démarches à engager. Intervention en amont pour clarifier les enjeux et les options disponibles.",
    tags: ["Analyse", "Information", "Orientation"],
  },
  {
    id: "employeurs",
    icon: "🏢",
    title: "Accompagnement des entreprises",
    description:
      "Accompagnement des dirigeants et équipes RH dans la mise en conformité de leurs pratiques, la sécurisation de leurs procédures et la prévention des risques liés aux relations de travail.",
    tags: ["RH", "Conformité", "Prévention"],
  },
  {
    id: "prevention-risques",
    icon: "⚠️",
    title: "Prévention des risques professionnels",
    description:
      "Identification et évaluation des risques professionnels — physiques, psychosociaux, organisationnels. Accompagnement dans la mise en place d'une démarche structurée de prévention.",
    tags: ["Risques", "Santé", "Sécurité"],
  },
  {
    id: "duerp",
    icon: "📋",
    title: "DUERP — Document Unique",
    description:
      "Accompagnement dans la réalisation et la mise à jour du Document Unique d'Évaluation des Risques Professionnels (DUERP), en collaboration avec les acteurs de l'entreprise.",
    tags: ["DUERP", "Audit", "Obligation légale"],
  },
  {
    id: "sante-securite",
    icon: "🏥",
    title: "Santé, sécurité et conditions de travail",
    description:
      "Accompagnement sur les obligations légales en matière de santé et sécurité au travail, analyse des conditions de travail et identification des actions correctives à mettre en place.",
    tags: ["Santé", "Sécurité", "CSSCT"],
  },
  {
    id: "contrats",
    icon: "📄",
    title: "Contrats de travail",
    description:
      "Analyse et rédaction de contrats de travail, avenants et clauses spécifiques. Vérification de la conformité des documents contractuels au regard du cadre légal et conventionnel applicable.",
    tags: ["Rédaction", "Analyse", "Conformité"],
  },
  {
    id: "licenciement",
    icon: "📁",
    title: "Sécurisation d'une procédure de licenciement",
    description:
      "Accompagnement en amont d'une procédure de licenciement : vérification du cadre, analyse des éléments constitutifs, sécurisation des étapes procédurales avant toute mise en œuvre.",
    tags: ["Procédure", "Sécurisation", "Amont"],
  },
  {
    id: "rupture",
    icon: "🤝",
    title: "Rupture conventionnelle",
    description:
      "Analyse du cadre et accompagnement dans la compréhension des conditions et enjeux d'une rupture conventionnelle. Information sur les démarches, les étapes et les points de vigilance.",
    tags: ["Information", "Accompagnement", "Rupture"],
  },
  {
    id: "harcelement",
    icon: "🔒",
    title: "Harcèlement & risques psychosociaux",
    description:
      "Analyse des situations pouvant caractériser un harcèlement moral ou sexuel, ou des risques psychosociaux (RPS). Accompagnement dans l'identification des mesures préventives adaptées.",
    tags: ["RPS", "Prévention", "Analyse"],
  },
  {
    id: "relecture",
    icon: "✏️",
    title: "Relecture et analyse de documents",
    description:
      "Examen de tout document professionnel — règlement intérieur, accord d'entreprise, charte, procédure interne — afin d'en vérifier la conformité et la cohérence avec le cadre légal applicable.",
    tags: ["Vérification", "Conformité", "Documents"],
  },
];

export const FAQ_ITEMS = [
  {
    question: "Quelle est la différence entre un juriste et un avocat ?",
    answer:
      "Un juriste intervient dans l'analyse des situations professionnelles, la rédaction de documents et l'orientation des personnes ou des entreprises dans leurs démarches. Il n'est pas avocat et ne représente pas les clients devant les juridictions. Lorsqu'une situation nécessite une procédure judiciaire ou une représentation, une orientation vers un avocat compétent en droit du travail est proposée. Les informations fournies ne constituent pas une consultation au sens de la réglementation applicable à la profession d'avocat.",
  },
  {
    question: "À qui s'adressent vos interventions ?",
    answer:
      "J'interviens aussi bien auprès des salariés souhaitant comprendre leur situation professionnelle, que des entreprises, dirigeants et équipes RH cherchant à sécuriser leurs pratiques et à prévenir les risques liés aux relations de travail. Chaque situation est traitée avec la même rigueur et confidentialité.",
  },
  {
    question: "Comment se déroule un premier échange ?",
    answer:
      "Le premier échange se fait par téléphone ou visioconférence. Vous présentez votre situation, j'analyse les éléments essentiels et vous propose une orientation adaptée. Si un accompagnement plus approfondi est nécessaire, nous en définissons ensemble les contours. Remplissez le formulaire de contact pour initier cet échange.",
  },
  {
    question: "Quels sont vos tarifs ?",
    answer:
      "Les honoraires sont définis en fonction de la nature et de la complexité de la situation. Un devis clair vous est communiqué avant tout engagement. Contactez-moi pour obtenir une estimation personnalisée.",
  },
  {
    question: "Qu'est-ce qu'un accident du travail ?",
    answer:
      "Un accident du travail est un accident survenu par le fait ou à l'occasion du travail. Il doit être déclaré à l'employeur dans les 24 heures et à la CPAM. Sa qualification ouvre droit à une prise en charge spécifique (soins à 100 %, indemnités journalières majorées). J'interviens en amont pour analyser les éléments de la situation et orienter vers les démarches adaptées.",
  },
  {
    question: "Qu'est-ce qu'une maladie professionnelle ?",
    answer:
      "Une maladie professionnelle résulte directement de l'exercice habituel d'une profession. Elle figure dans les tableaux de maladies professionnelles ou peut être reconnue après instruction. Sa reconnaissance ouvre des droits spécifiques. J'interviens pour analyser votre situation et vous orienter vers les démarches appropriées.",
  },
  {
    question: "Quelle différence entre maladie professionnelle et maladie non professionnelle ?",
    answer:
      "La maladie professionnelle est directement liée aux conditions d'exercice du travail et reconnue selon des critères précis par la Sécurité sociale. La maladie non professionnelle, dite de droit commun, relève du régime général. La distinction a des conséquences importantes sur la prise en charge, les indemnités et les droits du salarié. Une analyse préalable de votre situation permet d'identifier la qualification applicable.",
  },
  {
    question: "Qu'est-ce que le DUERP et pourquoi le mettre à jour ?",
    answer:
      "Le Document Unique d'Évaluation des Risques Professionnels (DUERP) est obligatoire pour toute entreprise dès le premier salarié. Il recense l'ensemble des risques auxquels sont exposés les travailleurs et doit être mis à jour au moins une fois par an, lors de tout aménagement important, ou après un accident du travail. Sa mise à jour est une obligation légale et un levier essentiel de prévention. J'accompagne les entreprises dans sa réalisation et sa mise à jour.",
  },
  {
    question: "Comment prévenir les risques professionnels dans mon entreprise ?",
    answer:
      "La prévention repose sur une démarche structurée : identification et évaluation des risques (physiques, psychosociaux, organisationnels), mise à jour du DUERP, définition d'un plan d'action et suivi de sa mise en œuvre. J'accompagne les entreprises dans cette démarche, en lien avec les acteurs internes (RH, direction, CSE/CSSCT) et en tenant compte des spécificités de chaque environnement de travail.",
  },
  {
    question: "Comment sécuriser une procédure de licenciement ?",
    answer:
      "La sécurisation passe par une vérification en amont des éléments constitutifs : motif, respect de la procédure, chronologie. J'interviens avant l'engagement de la procédure pour analyser le dossier, vérifier la conformité des étapes envisagées et identifier les points de vigilance. Cette intervention en amont permet de limiter les risques de contestation ultérieure. Si une procédure judiciaire s'avérait nécessaire, une orientation vers un avocat compétent serait proposée.",
  },
  {
    question: "Peut-on travailler entièrement à distance ?",
    answer:
      "Oui. Toutes mes interventions sont disponibles à distance : téléphone, visioconférence, échange de documents sécurisé. Vous pouvez être n'importe où en France.",
  },
  {
    question: "Mes informations sont-elles confidentielles ?",
    answer:
      "La confidentialité est un principe fondamental de mon activité. Toutes les informations que vous me transmettez sont traitées avec la plus stricte discrétion et ne sont jamais communiquées à des tiers sans votre accord explicite.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Marie D.",
    role: "Salariée, secteur tertiaire",
    content:
      "Loubna m'a accompagnée dans une situation professionnelle difficile avec beaucoup de sérieux. Elle a su analyser ma situation avec précision et m'expliquer clairement les enjeux. Un accompagnement rigoureux et vraiment humain.",
    rating: 5,
  },
  {
    name: "Thomas R.",
    role: "Directeur RH, PME",
    content:
      "Un accompagnement professionnel et réactif. Son analyse nous a permis de sécuriser nos procédures internes et d'anticiper plusieurs risques en amont. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Isabelle M.",
    role: "Salariée, cadre",
    content:
      "J'ai sollicité Loubna dans une situation professionnelle complexe. Son écoute, sa rigueur et sa disponibilité ont été essentielles. Elle m'a orientée clairement, avec beaucoup d'humanité et de compétence.",
    rating: 5,
  },
];
