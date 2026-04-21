// ═══════════════════════════════════════════════════════════
// LOUBNA ABOUZ MANTA — Configuration du site
// Modifiez ce fichier pour personnaliser le contenu du site
// ═══════════════════════════════════════════════════════════

export const SITE_CONFIG = {
  name: "Loubna Abouz Manta",
  title: "Juriste en droit du travail et en responsabilité sociale des entreprises",
  url: "https://loubna-abouz-manta.fr",
  email: "louamjuristeconseil@gmail.com",
  phone: "06 59 11 11 08",
  address: "France",
  hours: "Du lundi au jeudi : 10h–12h et 14h–18h · Vendredi : 10h–12h30",
  siret: "984 609 255 00018",
  linkedin: "https://www.linkedin.com/in/loubna-abouz-manta-27a5032b7/",
  instagram: "https://www.instagram.com/louaamm/",
  tiktok: "https://www.tiktok.com/@loubna.am25",
  description:
    "Juriste spécialisée en droit du travail et en responsabilité sociale des entreprises. Conseil juridique pour salariés et employeurs : contrat de travail, licenciement, rupture conventionnelle, sanctions disciplinaires, recrutement de salariés étrangers.",
};

export const SERVICES = [
  {
    icon: "📄",
    title: "Contrat de travail",
    description:
      "Rédaction, révision et sécurisation de vos contrats de travail (CDI, CDD, temps partiel). Analyse des clauses, conformité juridique et adaptation à votre situation professionnelle.",
    category: "all",
    slug: "contrat-travail",
  },
  {
    icon: "⚡",
    title: "Sanctions disciplinaires",
    description:
      "Accompagnement face aux procédures disciplinaires : avertissement, mise à pied, convocation à un entretien préalable. Défense de vos droits et préparation de votre réponse.",
    category: "salarie",
    slug: "sanctions-disciplinaires",
  },
  {
    icon: "🌍",
    title: "Recrutement de salariés étrangers",
    description:
      "Conseil et accompagnement pour le recrutement de salariés étrangers : démarches administratives, autorisations de travail, conformité réglementaire et sécurisation juridique.",
    category: "employeur",
    slug: "recrutement-salaries-etrangers",
  },
  {
    icon: "🚫",
    title: "Licenciement",
    description:
      "Analyse de votre situation de licenciement (économique, personnel, faute). Vérification de la procédure, calcul des indemnités et orientation vers la meilleure stratégie juridique.",
    category: "salarie",
    slug: "licenciement",
  },
  {
    icon: "🤝",
    title: "Négociation",
    description:
      "Négociation amiable de vos conditions de départ, indemnités transactionnelles, protocoles d'accord. Recherche de solutions équilibrées avant tout contentieux.",
    category: "all",
    slug: "negociation",
  },
  {
    icon: "✍️",
    title: "Rupture conventionnelle",
    description:
      "Accompagnement complet dans votre rupture conventionnelle : négociation des conditions, calcul des indemnités, rédaction de la convention et sécurisation de vos droits au chômage.",
    category: "all",
    slug: "rupture-conventionnelle",
  },
  {
    icon: "�️",
    title: "Sensibilisation prévention",
    description:
      "Formation et sensibilisation de vos équipes aux risques juridiques en droit du travail : harcèlement, discrimination, obligations de l'employeur. Prévention des contentieux.",
    category: "employeur",
    slug: "sensibilisation-prevention",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Mon employeur peut-il me licencier sans motif valable ?",
    answer:
      "Non. En France, tout licenciement doit reposer sur une cause réelle et sérieuse — motif personnel (faute, insuffisance professionnelle) ou économique. Un licenciement sans motif valable est qualifié d'abusif et peut donner lieu à des indemnités prud'homales significatives. Si vous pensez être dans cette situation, n'attendez pas : les délais pour contester sont strictement encadrés.",
    category: "salarie",
  },
  {
    question: "Qu'est-ce qu'une rupture conventionnelle et comment la négocier ?",
    answer:
      "La rupture conventionnelle est un accord amiable entre le salarié et l'employeur pour mettre fin au contrat de travail. Elle ouvre droit aux allocations chômage et à une indemnité spécifique de rupture. La négociation du montant de cette indemnité est essentielle — elle ne peut pas être inférieure au minimum légal, mais vous pouvez obtenir davantage selon votre ancienneté et votre situation. Je vous accompagne dans cette négociation pour défendre vos intérêts.",
    category: "salarie",
  },
  {
    question: "Comment prouver un harcèlement moral au travail ?",
    answer:
      "La preuve du harcèlement moral est partagée : vous devez présenter des éléments laissant supposer son existence, et c'est à l'employeur de prouver que ces agissements ne constituent pas du harcèlement. Concrètement : conservez tous les emails, SMS et comptes-rendus. Notez les faits avec dates et témoins. Signalez les faits en interne (RH, médecin du travail). Plus vous documentez, plus votre dossier est solide.",
    category: "salarie",
  },
  {
    question: "J'ai reçu une convocation à un entretien préalable. Que faire ?",
    answer:
      "Cette convocation est une étape obligatoire avant tout licenciement. Ne la prenez pas à la légère. Vous avez le droit d'être assisté lors de cet entretien par un représentant du personnel ou, si votre entreprise n'en a pas, par un conseiller du salarié. Préparez votre défense, restez factuel et ne signez rien sans avoir bien compris. Contactez-moi dès réception — les délais sont souvent très courts.",
    category: "salarie",
  },
  {
    question: "Comment sécuriser juridiquement une procédure de licenciement ?",
    answer:
      "Une procédure sécurisée nécessite : un motif réel et sérieux bien documenté, le respect strict des étapes procédurales (convocation, entretien, délais légaux, notification), et un calcul correct des indemnités dues. Chaque étape mal exécutée peut invalider la procédure et exposer l'entreprise à des condamnations. Je vous accompagne en amont pour éviter ces écueils.",
    category: "employeur",
  },
  {
    question: "Quelle est la différence entre un juriste et un avocat ?",
    answer:
      "Un juriste est un professionnel du droit qui apporte des conseils juridiques, rédige des documents et accompagne les clients dans leurs démarches. Il n'est pas inscrit au barreau et ne peut pas représenter ses clients en justice. Un avocat, lui, est habilité à plaider devant les tribunaux. Mon rôle couvre le conseil, l'analyse, la rédaction et l'assistance précontentieuse. Pour les procédures judiciaires, je vous oriente vers un avocat partenaire si nécessaire.",
    category: "general",
  },
  {
    question: "Mes informations sont-elles confidentielles ?",
    answer:
      "Absolument. La confidentialité est un principe fondamental de mon exercice professionnel. Toutes les informations que vous me communiquez — situation, documents, données personnelles — sont traitées avec la plus stricte discrétion. Elles ne sont jamais transmises à des tiers sans votre consentement explicite. Mon traitement des données est conforme au RGPD.",
    category: "general",
  },
  {
    question: "Puis-je contester mon licenciement après l'avoir reçu ?",
    answer:
      "Oui. Recevoir et lire votre lettre de licenciement ne vaut pas renonciation à contester. Vous disposez d'un délai de 12 mois à compter de la notification du licenciement pour saisir le Conseil de Prud'hommes. Ce délai est impératif — passé ce délai, votre action est prescrite. N'attendez donc pas pour consulter.",
    category: "salarie",
  },
];

export const TESTIMONIALS = [
  // ← Remplacez par vos vrais témoignages clients
  {
    initials: "S.M.",
    name: "S. Moreau",
    role: "Salarié · Cadre RH",
    text: "Maître Abouz Manta a su analyser ma situation de licenciement avec une précision remarquable. Son accompagnement m'a permis d'obtenir une issue favorable que je n'espérais plus.",
  },
  {
    initials: "P.L.",
    name: "P. Laurent",
    role: "Employeur · PDG PME",
    text: "En tant que dirigeant de PME, j'avais besoin d'un conseil fiable sur nos procédures disciplinaires. Réponses claires, délais respectés, professionnalisme exemplaire.",
  },
  {
    initials: "A.D.",
    name: "A. Dubois",
    role: "Salariée · Secteur public",
    text: "Face à une situation de harcèlement complexe, j'ai trouvé une juriste à l'écoute, humaine et d'une efficacité redoutable. Je la recommande sans réserve.",
  },
];

export const DEMAND_TYPES = [
  { value: "contrat-travail", label: "Contrat de travail" },
  { value: "sanctions-disciplinaires", label: "Sanctions disciplinaires" },
  { value: "recrutement-etrangers", label: "Recrutement de salariés étrangers" },
  { value: "licenciement", label: "Licenciement" },
  { value: "negociation", label: "Négociation" },
  { value: "rupture-conventionnelle", label: "Rupture conventionnelle" },
  { value: "sensibilisation-prevention", label: "Sensibilisation prévention" },
  { value: "autre", label: "Autre demande" },
];

export const STATUTS = [
  { value: "salarie", label: "Salarié(e)" },
  { value: "employeur", label: "Employeur / DRH" },
  { value: "autre", label: "Autre" },
];
