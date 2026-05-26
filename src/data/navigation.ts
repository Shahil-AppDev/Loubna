/**
 * Navigation centralisée pour tout le site
 * Utilisée par Header, MobileMenu, Footer
 */

export const MAIN_NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/droit-travail-suisse", label: "Suisse" },
  { href: "/tarifs", label: "Modalités et Tarifs" },
  { href: "/formations", label: "Formations" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
] as const;

export const MOBILE_NAV_LINKS = [
  ...MAIN_NAV_LINKS,
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
] as const;

export const FOOTER_NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Interventions" },
  { href: "/droit-travail-suisse", label: "Suisse" },
  { href: "/formations", label: "Formations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { href: "/services", label: "Compréhension de situation" },
  { href: "/services", label: "DUERP" },
  { href: "/services", label: "Prévention des risques" },
  { href: "/services", label: "Accompagnement – fin de contrat" },
  { href: "/services", label: "Information en droit du travail" },
  { href: "/droit-travail-suisse", label: "Droit du travail suisse" },
] as const;
