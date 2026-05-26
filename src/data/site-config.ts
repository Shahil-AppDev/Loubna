/**
 * Configuration globale du site centralisée
 */

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
} as const;

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
] as const;

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
] as const;

export const STATUTS = [
  { value: "salarie", label: "Salarié(e)" },
  { value: "employeur", label: "Employeur / DRH" },
  { value: "autre", label: "Autre" },
] as const;
