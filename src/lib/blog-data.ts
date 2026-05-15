export const BLOG_ARTICLES = {
  "rupture-conventionnelle-procedure-indemnites-2024": {
    title: "Rupture conventionnelle en 2026 : procédure et calcul de l'indemnité",
    metaTitle: "Rupture conventionnelle en 2026 : procédure et calcul de l'indemnité",
    description:
      "La rupture conventionnelle s'est imposée comme le mode de rupture amiable privilégié entre employeur et salarié en CDI. Encadrée par le Code du travail, elle permet de sécuriser la fin du contrat tout en ouvrant droit, pour le salarié, aux allocations chômage.",
    date: "2024-05-01",
    category: "Salariés",
    readTime: "8 min",
    image: "/images/blog/rupture-conventionnelle.jpg",
  },
  "comment-contester-sanction-disciplinaire-avertissement": {
    title: "Contester une sanction disciplinaire (avertissement, mise à pied) : procédure et recours",
    metaTitle: "Contester une sanction disciplinaire (avertissement, mise à pied) : procédure et recours",
    description:
      "Recevoir un avertissement, un blâme ou une mise à pied disciplinaire constitue une mesure qui peut avoir des conséquences durables sur la relation de travail.",
    date: "2024-05-08",
    category: "Salariés",
    readTime: "7 min",
    image: "/images/blog/sanction-disciplinaire.jpg",
  },
  "recrutement-salarie-etranger-demarches-employeur": {
    title: "Embaucher un salarié étranger en France : démarches et obligations en 2026",
    metaTitle: "Embaucher un salarié étranger en France : démarches et obligations en 2026",
    description:
      "Recruter un salarié étranger (hors Union européenne) constitue un levier stratégique pour de nombreuses entreprises confrontées à des tensions de recrutement.",
    date: "2024-05-15",
    category: "Employeurs",
    readTime: "9 min",
    image: "/images/blog/recrutement-etranger.jpg",
  },
  "rediger-contrat-travail-cdi-clauses-obligatoires": {
    title: "Rédiger un contrat de travail en CDI : clauses obligatoires et pièges à éviter",
    metaTitle: "Rédiger un contrat de travail en CDI : clauses obligatoires et pièges à éviter",
    description:
      "Le contrat de travail à durée indéterminée (CDI) constitue la forme normale et générale de la relation de travail, conformément à l'article Code du travail (art. L1221-2).",
    date: "2024-05-22",
    category: "Employeurs",
    readTime: "10 min",
    image: "/images/blog/contrat-cdi.jpg",
  },
  "obligations-employeur-rse-prevention-risques-duerp": {
    title: "RSE ET DROIT DU TRAVAIL : LES OBLIGATIONS DE L'EMPLOYEUR",
    metaTitle: "RSE ET DROIT DU TRAVAIL : LES OBLIGATIONS DE L'EMPLOYEUR",
    description:
      "Responsabilité sociétale des entreprises (RSE) : obligations et prévention des risques en 2026",
    date: "2024-05-29",
    category: "RSE & Prévention",
    readTime: "8 min",
    image: "/images/blog/rse-obligations.jpg",
  },
};

export type BlogArticleSlug = keyof typeof BLOG_ARTICLES;

export function getAllArticles() {
  return Object.entries(BLOG_ARTICLES)
    .map(([slug, data]) => ({
      slug,
      ...data,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string) {
  return BLOG_ARTICLES[slug as BlogArticleSlug];
}
