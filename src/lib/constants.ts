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
    "Juriste en droit du travail (FR/AR) — j'accompagne salariés et entreprises dans la compréhension de leurs situations professionnelles et la prévention des risques, en amont des procédures.",
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
    icon: "�",
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
      "Constituer un dossier solide et éviter les erreurs. Je vous accompagne dans vos démarches de reconnaissance (y compris TMS), notamment en cas de contestation ou de refus. Aide à la compréhension des attentes de la CPAM et à la structuration de votre dossier. Orientation vers un avocat si une procédure devient nécessaire.",
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
      "Structurer votre démarche et réduire les risques. Accompagnement dans l'évaluation des risques professionnels (RPS, TMS, AT/MP) et la mise en place d'actions concrètes de prévention adaptées à votre organisation.",
    category: "employeur",
    slug: "prevention-risques",
    tags: ["RPS", "TMS", "AT/MP"],
  },
  {
    id: "duerp",
    icon: "📋",
    title: "DUERP – Document Unique",
    description:
      "Un outil de prévention, pas seulement une obligation. Réalisation ou mise à jour du DUERP avec une approche opérationnelle : analyse des situations de travail, identification des risques et structuration du document.",
    category: "employeur",
    slug: "duerp",
    tags: ["DUERP", "Document Unique", "Obligation légale"],
  },
  {
    id: "procedures-disciplinaires-employeur",
    icon: "⚖️",
    title: "Procédures disciplinaires",
    description:
      "Sécuriser vos décisions et éviter les erreurs. Accompagnement en amont des procédures disciplinaires : analyse de la situation, qualification des faits, respect des étapes et sécurisation des décisions.",
    category: "employeur",
    slug: "procedures-disciplinaires-employeur",
    tags: ["Sanctions", "Procédure", "Sécurisation"],
  },
  {
    id: "situations-sensibles",
    icon: "�",
    title: "Gestion des situations sensibles RH",
    description:
      "Anticiper les risques et sécuriser vos décisions. Intervention en amont sur des situations à risque : signalement de harcèlement, conflit, situation dégradée ou problématique disciplinaire. Analyse de la situation, identification des enjeux et accompagnement pour sécuriser les décisions et éviter les erreurs.",
    category: "employeur",
    slug: "situations-sensibles",
    tags: ["Harcèlement", "Conflit", "Prévention"],
  },
  // SALARIÉS & EMPLOYEURS
  {
    id: "contrat",
    icon: "�",
    title: "Contrats de travail",
    description:
      "Sécuriser vos engagements contractuels. Relecture, vérification et sécurisation de vos contrats de travail (CDI, CDD, temps partiel). Analyse des clauses, conformité juridique et adaptation à votre situation. Possibilité d'accompagnement à la rédaction, avec une approche orientée prévention des risques.",
    category: "all",
    slug: "contrat-travail",
    tags: ["CDI", "CDD", "Clauses contractuelles"],
  },
  {
    id: "analyse",
    icon: "�",
    title: "Analyse de situation professionnelle",
    description:
      "Prendre du recul et sécuriser vos décisions. Analyse approfondie de votre situation au regard du droit du travail et du contexte professionnel. Identification des enjeux, des risques et des leviers d'action en amont de toute démarche.",
    category: "all",
    slug: "analyse-situation",
    tags: ["Compréhension", "Éclairage", "Droit du travail"],
  },
  {
    id: "securisation-demarches",
    icon: "✅",
    title: "Sécurisation des démarches",
    description:
      "Éviter les erreurs et structurer vos actions. Accompagnement dans la compréhension des procédures et des étapes à respecter, afin d'éviter les erreurs et sécuriser vos démarches.",
    category: "all",
    slug: "securisation-demarches",
    tags: ["Procédure", "Sécurisation", "Accompagnement"],
  },
  {
    id: "negociation",
    icon: "🤝",
    title: "Négociation amiable",
    description:
      "Trouver une solution sans passer par le contentieux. Accompagnement dans les démarches de négociation : conditions de départ, protocole d'accord, conciliation. Évaluation des enjeux et sécurisation des intérêts de chaque partie.",
    category: "all",
    slug: "negociation",
    tags: ["Négociation", "Accord amiable", "Médiation"],
  },
  {
    id: "information",
    icon: "📚",
    title: "Information en droit du travail",
    description:
      "Comprendre pour agir avec clarté. Apport d'éclairages juridiques adaptés à votre situation pour vous permettre de prendre des décisions éclairées.",
    category: "all",
    slug: "information",
    tags: ["Information", "Éclairage", "Droit du travail"],
  },
];

export const FAQ_ITEMS = [
  // POUR LES SALARIÉS
  {
    question: "Qu'est-ce qu'un accident du travail et comment réagir ?",
    answer:
      "Un accident du travail est un événement soudain survenu dans le cadre de votre activité professionnelle, ayant entraîné une lésion physique ou psychologique. En cas d'accident, il est important de : informer votre employeur rapidement, consulter un médecin, faire établir un certificat médical initial, vérifier que la déclaration est bien effectuée. Une bonne gestion dès le départ est essentielle pour la reconnaissance de l'accident et la prise en charge par la CPAM.",
    category: "salarie",
  },
  {
    question: "Quelle est la différence entre une maladie professionnelle et une maladie ordinaire ?",
    answer:
      "Une maladie professionnelle est reconnue comme étant liée à votre activité professionnelle. Elle ouvre droit à une prise en charge spécifique (indemnisation, protection renforcée). Une maladie ordinaire, en revanche, n'est pas directement liée au travail. La reconnaissance d'une maladie professionnelle repose sur des critères précis (tableaux ou procédure spécifique), d'où l'importance de bien constituer son dossier.",
    category: "salarie",
  },
  {
    question: "Comment identifier une situation de harcèlement moral ?",
    answer:
      "Le harcèlement moral se caractérise par des agissements répétés qui dégradent vos conditions de travail et peuvent porter atteinte à vos droits, votre dignité ou votre santé. Il peut s'agir par exemple : de remarques répétées ou dévalorisantes, d'une mise à l'écart, d'une surcharge ou d'un retrait injustifié de travail. L'analyse de la situation dans son ensemble est essentielle pour qualifier les faits et identifier les actions possibles.",
    category: "salarie",
  },
  {
    question: "Mon employeur peut-il me licencier sans motif valable ?",
    answer:
      "Non, un licenciement doit être fondé sur une cause réelle et sérieuse. Cela signifie que : le motif doit être réel (existant et vérifiable) et sérieux (suffisamment important pour justifier la rupture). En cas de doute, il est important de faire analyser votre situation pour comprendre les enjeux et les options possibles.",
    category: "salarie",
  },
  {
    question: "Qu'est-ce qu'une rupture conventionnelle ?",
    answer:
      "La rupture conventionnelle est un accord entre le salarié et l'employeur pour mettre fin au contrat de travail. Elle nécessite : un accord des deux parties, une procédure encadrée, une validation par l'administration. Elle ouvre droit, sous conditions, aux allocations chômage. Il est important de bien comprendre les implications avant de s'engager.",
    category: "salarie",
  },
  {
    question: "J'ai reçu une convocation à un entretien préalable : que faire ?",
    answer:
      "La convocation à un entretien préalable est une étape importante dans une procédure disciplinaire ou de licenciement. Il est recommandé de : lire attentivement la convocation, comprendre les faits reprochés, préparer vos explications, vous faire assister si nécessaire. Une bonne préparation permet de mieux défendre votre position et d'éviter certaines erreurs.",
    category: "salarie",
  },
  // POUR LES EMPLOYEURS
  {
    question: "Qu'est-ce que le DUERP et quelles entreprises sont concernées ?",
    answer:
      "Le Document Unique d'Évaluation des Risques Professionnels (DUERP) recense les risques auxquels sont exposés les salariés et les mesures de prévention mises en place. Il est obligatoire pour toutes les entreprises dès l'embauche du premier salarié. Le DUERP doit être : mis à jour régulièrement, adapté aux situations de travail, utilisé comme un véritable outil de prévention.",
    category: "employeur",
  },
  {
    question: "Qu'implique la prévention des risques professionnels ?",
    answer:
      "La prévention des risques consiste à identifier, évaluer et limiter les risques auxquels les salariés sont exposés. Elle concerne notamment : les risques psychosociaux (RPS), les troubles musculosquelettiques (TMS), les accidents du travail. Une démarche structurée permet de sécuriser les pratiques et de limiter les risques juridiques et humains.",
    category: "employeur",
  },
  {
    question: "Comment sécuriser une procédure de licenciement ?",
    answer:
      "Une procédure de licenciement doit respecter des étapes précises : qualification du motif, respect de la procédure, respect des délais, rédaction des documents. Une erreur, même formelle, peut fragiliser la décision. Il est donc essentiel d'anticiper et de structurer chaque étape.",
    category: "employeur",
  },
  // QUESTIONS GÉNÉRALES
  {
    question: "Quelle est la différence entre un juriste et un avocat ?",
    answer:
      "Le juriste et l'avocat interviennent tous deux en droit du travail, notamment pour analyser les situations et accompagner les personnes concernées. La différence tient principalement au cadre d'intervention : Le juriste intervient en amont, dans une logique de compréhension, de structuration et de sécurisation des démarches. L'avocat est habilité à représenter et défendre les intérêts d'une personne dans le cadre d'une procédure contentieuse (tribunal). Les deux approches sont complémentaires. Lorsque la situation nécessite une action en justice, une orientation vers un avocat est proposée.",
    category: "general",
  },
  {
    question: "Mes informations sont-elles confidentielles ?",
    answer:
      "Oui, les échanges et les informations que vous partagez sont traités avec confidentialité. Le respect de la discrétion est essentiel dans l'accompagnement des situations professionnelles.",
    category: "general",
  },
  {
    question: "Intervenez-vous uniquement à distance ?",
    answer:
      "J'interviens principalement à distance (visioconférence), un format souple, efficace et adapté aux contraintes actuelles, permettant des échanges rapides et confidentiels. Ce mode d'accompagnement offre également une grande flexibilité et permet de limiter les déplacements, dans une démarche plus responsable. Des modalités spécifiques peuvent être envisagées en fonction des besoins.",
    category: "general",
  },
];

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
  { href: "/formations", label: "Formations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
