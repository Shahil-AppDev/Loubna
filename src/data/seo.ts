/**
 * Configuration SEO centralisée pour toutes les pages
 */

import { SITE_CONFIG } from "@/lib/constants";

export const SEO_CONFIG = {
  defaultTitle: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
  titleTemplate: "%s | Loubna Abouz Manta",
  defaultDescription: "J'interviens dans une démarche de prévention, d'accompagnement et de sécurisation des situations en droit du travail.",
  siteUrl: "https://www.juriste-droit-du-travail.com",
  siteName: "Loubna Abouz Manta - Juriste en Droit du Travail",
  locale: "fr_FR",
  type: "website",
} as const;

export const PAGE_SEO = {
  home: {
    title: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
    description: "Spécialisée en prévention des risques professionnels et en accompagnement des situations sensibles, j'interviens en amont des procédures en apportant de la clarté.",
    keywords: ["juriste droit du travail", "prévention risques professionnels", "DUERP", "accompagnement salariés", "accompagnement employeurs"],
  },
  about: {
    title: "À propos — Juriste en Droit du Travail",
    description: "Mon parcours, ma démarche et mes domaines d'intervention en droit du travail et prévention des risques professionnels.",
    keywords: ["juriste", "droit du travail", "parcours", "prévention", "accompagnement"],
  },
  services: {
    title: "Interventions — Loubna Abouz Manta, Juriste en Droit du Travail",
    description: "Découvrez mes domaines d'intervention : analyse de situation professionnelle, DUERP, prévention des risques, accompagnement des salariés et des entreprises.",
    keywords: ["services juridiques", "droit du travail", "DUERP", "prévention risques", "accompagnement"],
  },
  suisse: {
    title: "Droit du travail suisse | Accompagnement rédactionnel — Loubna Abouz Manta",
    description: "Accompagnement dans la rédaction, reformulation et mise en forme de courriers professionnels liés au travail en Suisse, sans conseil juridique suisse.",
    keywords: ["droit travail suisse", "rédaction courrier suisse", "accompagnement rédactionnel", "courrier professionnel suisse"],
  },
  formations: {
    title: "Formations en Droit du Travail — Loubna Abouz Manta",
    description: "Formations professionnelles en droit du travail : prévention des risques, accidents du travail, pouvoir disciplinaire.",
    keywords: ["formation droit du travail", "formation prévention", "formation accidents travail", "formation employeurs"],
  },
  blog: {
    title: "Actualités juridiques — Droit du Travail",
    description: "Actualités, analyses et informations en droit du travail et prévention des risques professionnels.",
    keywords: ["actualités droit du travail", "blog juridique", "information droit travail", "RSE"],
  },
  faq: {
    title: "FAQ — Questions fréquentes en Droit du Travail",
    description: "Retrouvez les réponses aux questions les plus courantes en droit du travail et en prévention des risques professionnels.",
    keywords: ["FAQ droit du travail", "questions juridiques", "accident du travail", "harcèlement", "DUERP"],
  },
  contact: {
    title: "Contact — Loubna Abouz Manta, Juriste",
    description: "Prenez contact pour un accompagnement personnalisé en droit du travail et prévention des risques professionnels.",
    keywords: ["contact juriste", "rendez-vous", "accompagnement", "droit du travail"],
  },
  tarifs: {
    title: "Modalités et Tarifs — Accompagnement en Droit du Travail",
    description: "Découvrez les modalités d'intervention et les tarifs pour un accompagnement en droit du travail.",
    keywords: ["tarifs juriste", "modalités", "accompagnement", "droit du travail"],
  },
} as const;

export function generateMetadata(page: keyof typeof PAGE_SEO) {
  const pageSeo = PAGE_SEO[page];
  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    openGraph: {
      title: pageSeo.title,
      description: pageSeo.description,
      url: `${SEO_CONFIG.siteUrl}${page === 'home' ? '' : `/${page}`}`,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      type: SEO_CONFIG.type,
    },
    twitter: {
      card: "summary_large_image",
      title: pageSeo.title,
      description: pageSeo.description,
    },
  };
}
