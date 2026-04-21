import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
    template: `%s | Loubna Abouz Manta`,
  },
  description:
    "Loubna Abouz Manta, juriste en droit du travail. Accompagnement des salariés et des entreprises dans l'analyse de leurs situations professionnelles et la prévention des risques, en amont des procédures.",
  keywords: [
    "Loubna Abouz Manta",
    "juriste droit du travail",
    "prévention risques professionnels",
    "DUERP",
    "Document Unique Évaluation Risques",
    "accompagnement salarié",
    "accompagnement entreprise RH",
    "accident du travail",
    "maladie professionnelle",
    "santé sécurité travail",
    "analyse situation professionnelle",
    "juriste Paris",
    "droit du travail France",
    "prévention conflits professionnels",
  ],
  authors: [{ name: "Loubna Abouz Manta" }],
  creator: "Loubna Abouz Manta",
  publisher: "Loubna Abouz Manta",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.url,
    siteName: "Loubna Abouz Manta — Juriste en Droit du Travail",
    title: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
    description:
      "Loubna Abouz Manta, juriste en droit du travail. Accompagnement des salariés et des entreprises dans l'analyse de leurs situations professionnelles et la prévention des risques professionnels.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loubna Abouz Manta — Juriste en Droit du Travail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loubna Abouz Manta — Juriste en Droit du Travail",
    description:
      "Accompagnement des salariés et des entreprises en droit du travail et prévention des risques professionnels.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B1A1A",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/#person`,
      name: "Loubna Abouz Manta",
      jobTitle: "Juriste en droit du travail",
      description:
        "Juriste en droit du travail, spécialisée dans la prévention des risques professionnels et l'accompagnement des salariés et des entreprises en amont des procédures.",
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      knowsAbout: [
        "Droit du travail",
        "Prévention des risques professionnels",
        "DUERP",
        "Santé et sécurité au travail",
        "Accompagnement des salariés",
        "Accompagnement des entreprises",
        "Accident du travail",
        "Maladie professionnelle",
      ],
      sameAs: SITE_CONFIG.linkedin ? [SITE_CONFIG.linkedin] : [],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_CONFIG.url}/#service`,
      name: "Loubna Abouz Manta — Juriste en Droit du Travail",
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      description:
        "Accompagnement des salariés et des entreprises en droit du travail et prévention des risques professionnels, en amont des procédures.",
      areaServed: "France",
      availableLanguage: "Français",
      openingHours: "Mo-Fr 09:00-18:00",
      founder: { "@id": `${SITE_CONFIG.url}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: "Loubna Abouz Manta — Juriste en Droit du Travail",
      description:
        "Site officiel de Loubna Abouz Manta, juriste en droit du travail et prévention des risques professionnels.",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_CONFIG.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-encre-50 text-encre-900 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
