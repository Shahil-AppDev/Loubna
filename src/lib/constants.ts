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
  {
    question: "Quelle est la différence entre un juriste et un avocat ?",
    answer:
      "Un juriste est un professionnel du droit diplômé qui peut accompagner ses clients dans la compréhension de leurs situations, rédiger des documents et les orienter dans leurs démarches. Il n'est pas inscrit au barreau et ne peut pas représenter ses clients devant les juridictions. Un avocat, inscrit au barreau, est habilité à plaider et à représenter en justice. Mon rôle est d'intervenir en amont : compréhension de situation, accompagnement préventif, rédaction de documents. Si votre situation nécessite une procédure judiciaire, je vous oriente vers un avocat compétent en droit du travail. Les informations que je fournis ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.",
    category: "general",
  },
  {
    question: "Qu'est-ce qu'un accident du travail et comment dois-je réagir ?",
    answer:
      "Un accident du travail est un accident survenu par le fait ou à l'occasion du travail, quelle qu'en soit la cause. Il doit être déclaré à l'employeur dans les 24 heures et à la CPAM. La reconnaissance en accident du travail ouvre des droits spécifiques : prise en charge des soins à 100 %, indemnités journalières plus favorables, protection contre le licenciement. Si vous avez été victime d'un accident du travail et que la procédure n'a pas été respectée, ou si vous souhaitez comprendre vos droits, je peux vous accompagner dans votre démarche et vous apporter un éclairage sur votre situation.",
    category: "salarie",
  },
  {
    question: "Quelle est la différence entre maladie professionnelle et maladie ordinaire ?",
    answer:
      "Une maladie professionnelle est une maladie contractée directement à la suite de l'exposition habituelle à un risque lié à l'exercice du travail. Elle figure dans des tableaux réglementaires ou peut être reconnue hors tableau sous certaines conditions. À la différence d'une maladie ordinaire, la maladie professionnelle reconnue ouvre des droits renforcés : prise en charge intégrale des soins, indemnités journalières majorées, protection contre le licenciement et, en cas de faute inexcusable de l'employeur, possibilité d'obtenir une indemnisation complémentaire.",
    category: "salarie",
  },
  {
    question: "Comment identifier une situation de harcèlement moral ?",
    answer:
      "Le harcèlement moral se caractérise par des agissements répétés qui ont pour objet ou pour effet une dégradation des conditions de travail susceptible de porter atteinte aux droits et à la dignité du salarié, d'altérer sa santé physique ou mentale ou de compromettre son avenir professionnel. Pour identifier votre situation : conservez tous les éléments factuels (emails, messages, comptes-rendus), notez les faits avec dates et témoins éventuels, et signalez les faits au médecin du travail si votre santé est affectée. Je peux vous accompagner et vous apporter un éclairage pour identifier les éléments pertinents.",
    category: "salarie",
  },
  {
    question: "Mon employeur peut-il me licencier sans motif valable ?",
    answer:
      "Non. En France, tout licenciement doit reposer sur une cause réelle et sérieuse — motif personnel (faute, insuffisance professionnelle) ou économique. Un licenciement sans motif valable est qualifié d'abusif et peut donner lieu à des indemnités significatives. Si vous pensez être dans cette situation, n'attendez pas : les délais pour contester sont strictement encadrés (12 mois à compter de la notification). Je peux vous accompagner et vous apporter un éclairage pour comprendre vos droits.",
    category: "salarie",
  },
  {
    question: "Qu'est-ce qu'une rupture conventionnelle ?",
    answer:
      "La rupture conventionnelle est un accord amiable entre le salarié et l'employeur pour mettre fin au contrat de travail. Elle ouvre droit aux allocations chômage et à une indemnité spécifique de rupture qui ne peut pas être inférieure au minimum légal. La procédure est encadrée : entretien(s), délai de rétractation de 15 jours, homologation par la DREETS. Je vous accompagne pour vérifier les conditions proposées, contrôler le respect de la procédure et sécuriser vos droits.",
    category: "salarie",
  },
  {
    question: "J'ai reçu une convocation à un entretien préalable. Que faire ?",
    answer:
      "Cette convocation est une étape obligatoire avant tout licenciement. Ne la prenez pas à la légère. Vous avez le droit d'être assisté lors de cet entretien par un représentant du personnel ou, si votre entreprise n'en a pas, par un conseiller du salarié. Préparez votre exposé des faits, restez factuel et ne signez rien sans avoir bien compris. Contactez-moi dès réception — les délais sont souvent très courts.",
    category: "salarie",
  },
  {
    question: "Qu'est-ce que le DUERP et quelle entreprise est concernée ?",
    answer:
      "Le Document Unique d'Évaluation des Risques Professionnels (DUERP) est obligatoire pour toute entreprise ayant au moins un salarié. Il recense l'ensemble des risques professionnels auxquels sont exposés les salariés et les mesures de prévention mises en place. Sa mise à jour est obligatoire au minimum une fois par an, lors de toute décision d'aménagement important et après tout accident du travail. J'accompagne les entreprises dans la réalisation ou la mise à jour de leur DUERP, en procédant à un audit des situations de travail et en rédigeant le document en collaboration avec les équipes.",
    category: "employeur",
  },
  {
    question: "Qu'est-ce que la prévention des risques professionnels ?",
    answer:
      "La prévention des risques professionnels regroupe l'ensemble des dispositions à mettre en œuvre pour préserver la santé et la sécurité des salariés, améliorer les conditions de travail et tendre à la suppression des risques. Elle comprend la prévention des risques physiques (accidents du travail, TMS), des risques psychosociaux (RPS, harcèlement, burn-out) et des risques liés aux conditions de travail. L'employeur est légalement tenu d'assurer la sécurité et de protéger la santé physique et mentale de ses salariés. J'accompagne les entreprises dans l'identification, l'évaluation et la prévention de ces risques.",
    category: "employeur",
  },
  {
    question: "Comment sécuriser juridiquement une procédure de licenciement ?",
    answer:
      "Une procédure de licenciement sécurisée nécessite : un motif réel et sérieux bien documenté, le respect strict des étapes procédurales (convocation, entretien, délais légaux, notification écrite), et un calcul correct des indemnités dues. Chaque étape mal exécutée peut invalider la procédure et exposer l'entreprise à des condamnations prud'homales. J'accompagne les employeurs en amont pour comprendre la situation, sécuriser la procédure et anticiper les risques.",
    category: "employeur",
  },
  {
    question: "Mes informations sont-elles confidentielles ?",
    answer:
      "Absolument. La confidentialité est un principe fondamental de mon exercice professionnel. Toutes les informations que vous me communiquez — situation, documents, données personnelles — sont traitées avec la plus stricte discrétion. Elles ne sont jamais transmises à des tiers sans votre consentement explicite. Mon traitement des données est conforme au RGPD.",
    category: "general",
  },
  {
    question: "Intervenez-vous uniquement en présentiel ou aussi à distance ?",
    answer:
      "Toutes mes interventions sont disponibles à distance : téléphone, visioconférence, échange sécurisé de documents. Cela me permet d'accompagner des salariés et des entreprises partout en France, sans contrainte géographique. La distance ne diminue en rien la qualité de l'accompagnement et de l'information apportée.",
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
