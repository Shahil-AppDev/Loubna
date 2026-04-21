export const BLOG_ARTICLES = {
  "rupture-conventionnelle-procedure-indemnites-2024": {
    title: "Rupture conventionnelle 2024 : procédure et calcul des indemnités",
    metaTitle: "Rupture conventionnelle en 2024 : Procédure & Calcul",
    description: "Employeur ou salarié, découvrez les étapes clés de la rupture conventionnelle en 2024, les délais légaux et comment calculer l'indemnité spécifique.",
    date: "2024-05-01",
    category: "Salariés",
    readTime: "8 min",
    image: "/images/blog/rupture-conventionnelle.jpg",
    relatedService: "/services/rupture-conventionnelle",
    relatedLinks: [
      { href: "/services/rupture-conventionnelle", label: "Service : Rupture conventionnelle" },
      { href: "/services/negociation-accord-transactionnel", label: "Service : Négociation" }
    ]
  },
  "comment-contester-sanction-disciplinaire-avertissement": {
    title: "Comment contester une sanction disciplinaire (avertissement, mise à pied) ?",
    metaTitle: "Contester une sanction disciplinaire (avertissement, mise à pied)",
    description: "Avertissement, blâme ou mise à pied : découvrez comment réagir et contester efficacement une sanction disciplinaire injustifiée auprès de votre employeur.",
    date: "2024-05-08",
    category: "Salariés",
    readTime: "7 min",
    image: "/images/blog/sanction-disciplinaire.jpg",
    relatedService: "/services/sanctions-disciplinaires",
    relatedLinks: [
      { href: "/services/sanctions-disciplinaires", label: "Service : Sanctions disciplinaires" },
      { href: "/contact", label: "Contester une sanction" }
    ]
  },
  "recrutement-salarie-etranger-demarches-employeur": {
    title: "Embaucher un salarié étranger en France : démarches et obligations 2024",
    metaTitle: "Comment recruter un salarié étranger (Hors UE) en 2024 ?",
    description: "Employeurs, découvrez les démarches, autorisations de travail et obligations légales pour recruter un salarié étranger en toute conformité.",
    date: "2024-05-15",
    category: "Employeurs",
    readTime: "9 min",
    image: "/images/blog/recrutement-etranger.jpg",
    relatedService: "/services/recrutement-salaries-etrangers",
    relatedLinks: [
      { href: "/services/recrutement-salaries-etrangers", label: "Service : Recrutement de salariés étrangers" },
      { href: "/contact", label: "Externaliser mes démarches" }
    ]
  },
  "rediger-contrat-travail-cdi-clauses-obligatoires": {
    title: "Rédiger un contrat de travail CDI : clauses obligatoires et pièges à éviter",
    metaTitle: "Comment bien rédiger un contrat de travail CDI en 2024 ?",
    description: "Employeurs : découvrez les règles de rédaction d'un CDI, les clauses indispensables (période d'essai, mobilité) et les erreurs juridiques à éviter.",
    date: "2024-05-22",
    category: "Employeurs",
    readTime: "10 min",
    image: "/images/blog/contrat-cdi.jpg",
    relatedService: "/services/redaction-contrat-travail",
    relatedLinks: [
      { href: "/services/redaction-contrat-travail", label: "Service : Rédaction de contrats" },
      { href: "/contact", label: "Sécuriser mes contrats" }
    ]
  },
  "obligations-employeur-rse-prevention-risques-duerp": {
    title: "RSE et droit du travail : les obligations de l'employeur",
    metaTitle: "RSE et Prévention des risques : Obligations de l'employeur",
    description: "Document Unique (DUERP), risques psychosociaux, droit à la déconnexion : faites le point sur vos obligations d'employeur en matière de RSE.",
    date: "2024-05-29",
    category: "RSE & Prévention",
    readTime: "8 min",
    image: "/images/blog/rse-obligations.jpg",
    relatedService: "/services/sensibilisation-rse-prevention",
    relatedLinks: [
      { href: "/services/sensibilisation-rse-prevention", label: "Service : Sensibilisation RSE" },
      { href: "/contact", label: "Audit de conformité RSE" }
    ]
  }
};

export type BlogArticleSlug = keyof typeof BLOG_ARTICLES;

export function getAllArticles() {
  return Object.entries(BLOG_ARTICLES).map(([slug, data]) => ({
    slug,
    ...data
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string) {
  return BLOG_ARTICLES[slug as BlogArticleSlug];
}
