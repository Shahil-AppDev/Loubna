// ═══════════════════════════════════════════════════════════
// LOUBNA ABOUZ MANTA — Configuration du site
// Modifiez ce fichier pour personnaliser le contenu du site
// ═══════════════════════════════════════════════════════════

export const SITE_CONFIG = {
  name: "Loubna Abouz Manta",
  title: "Juriste en Droit du Travail",
  url: "https://loubna-abouz-manta.fr", // ← Remplacez par votre URL
  email: "contact@loubna-abouz-manta.fr", // ← Votre email
  phone: "+33 6 00 00 00 00",             // ← Votre téléphone
  address: "Paris, France",               // ← Votre ville / adresse
  hours: "Lundi – Vendredi : 9h00 – 18h00", // ← Vos horaires
  linkedin: "https://linkedin.com/in/loubna-abouz-manta", // ← LinkedIn
  description:
    "Juriste spécialisée en droit du travail. Conseil et accompagnement pour salariés et employeurs : licenciement, rupture conventionnelle, harcèlement, contrats de travail.",
};

export const SERVICES = [
  // ─── POUR LES SALARIÉS ──────────────────────────────────
  {
    icon: "⚖️",
    title: "Conseil en droit du travail",
    description:
      "Analyse de votre situation, orientation juridique précise et conseil personnalisé pour toute question relative au droit du travail. Une réponse claire, adaptée à votre contexte.",
    category: "salarie",
    slug: "conseil-droit-travail",
  },
  {
    icon: "🛡️",
    title: "Accompagnement salariés",
    description:
      "Face à votre employeur — licenciement, harcèlement, discrimination — je défends vos droits avec rigueur et méthode. Vous n'êtes pas seul(e).",
    category: "salarie",
    slug: "accompagnement-salaries",
  },
  {
    icon: "🚫",
    title: "Licenciement",
    description:
      "Licenciement abusif, sans cause réelle et sérieuse, économique ou personnel. J'analyse votre dossier et vous oriente vers la meilleure stratégie juridique.",
    category: "salarie",
    slug: "licenciement",
  },
  {
    icon: "🤝",
    title: "Rupture conventionnelle",
    description:
      "Négociation des conditions, calcul des indemnités, protection de vos droits au chômage. Un accompagnement de A à Z pour une sortie dans les meilleures conditions.",
    category: "salarie",
    slug: "rupture-conventionnelle",
  },
  {
    icon: "🔴",
    title: "Harcèlement & conflits au travail",
    description:
      "Harcèlement moral, discrimination, violence au travail — documentation, signalement, protection. Une réaction rapide et structurée pour défendre vos droits.",
    category: "salarie",
    slug: "harcelement-conflits",
  },
  {
    icon: "⚡",
    title: "Procédures disciplinaires",
    description:
      "Convocation à un entretien préalable, avertissement, mise à pied. Je vous explique vos droits et vous prépare à chaque étape de la procédure.",
    category: "salarie",
    slug: "procedures-disciplinaires-salarie",
  },
  // ─── POUR LES EMPLOYEURS ────────────────────────────────
  {
    icon: "🏢",
    title: "Accompagnement employeurs",
    description:
      "Sécurisez vos décisions RH, anticipez les risques juridiques et gérez vos relations de travail en pleine conformité. Un partenaire juridique de confiance.",
    category: "employeur",
    slug: "accompagnement-employeurs",
  },
  {
    icon: "📄",
    title: "Contrats de travail",
    description:
      "Rédaction, révision et sécurisation de tout contrat de travail (CDI, CDD, temps partiel, clauses spécifiques), adapté à votre secteur et votre situation.",
    category: "employeur",
    slug: "contrats-travail",
  },
  // ─── COMMUN ─────────────────────────────────────────────
  {
    icon: "🔍",
    title: "Relecture de documents",
    description:
      "Avant de signer quoi que ce soit, faites relire votre document. Je détecte les clauses risquées et protège vos intérêts — contrat, accord de rupture, protocole.",
    category: "all",
    slug: "relecture-documents",
  },
  {
    icon: "🔮",
    title: "Assistance précontentieuse",
    description:
      "Négociation amiable, médiation, protocole transactionnel — explorons d'abord les solutions sans recours judiciaire. Souvent plus rapides et moins coûteuses.",
    category: "all",
    slug: "assistance-precontentieuse",
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
  { value: "licenciement", label: "Licenciement" },
  { value: "rupture-conventionnelle", label: "Rupture conventionnelle" },
  { value: "harcelement", label: "Harcèlement / Conflit" },
  { value: "contrat", label: "Contrat de travail" },
  { value: "procedure-disciplinaire", label: "Procédure disciplinaire" },
  { value: "conseil-rh", label: "Conseil RH (employeur)" },
  { value: "relecture", label: "Relecture de document" },
  { value: "autre", label: "Autre demande" },
];

export const STATUTS = [
  { value: "salarie", label: "Salarié(e)" },
  { value: "employeur", label: "Employeur / DRH" },
  { value: "autre", label: "Autre" },
];
