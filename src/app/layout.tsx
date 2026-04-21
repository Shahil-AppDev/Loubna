import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.titleShort}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "juriste droit du travail",
    "avocat droit travail",
    "conseil juridique salarié",
    "conseil juridique employeur",
    "licenciement",
    "rupture conventionnelle",
    "harcèlement travail",
    "contrat travail",
    "Loubna Abouz Manta",
    "juriste Paris",
    "droit du travail France",
    "assistance juridique distanciel",
  ],
  authors: [{ name: "Loubna Abouz Manta" }],
  creator: "Loubna Abouz Manta",
  publisher: "Loubna Abouz Manta",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.titleShort,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
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
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
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
        "Licenciement",
        "Rupture conventionnelle",
        "Harcèlement au travail",
        "Contrats de travail",
        "Procédures disciplinaires",
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
      description: SITE_CONFIG.description,
      areaServed: "France",
      availableLanguage: "Français",
      priceRange: "€€",
      openingHours: "Mo-Fr 09:00-18:00",
      founder: { "@id": `${SITE_CONFIG.url}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.titleShort,
      description: SITE_CONFIG.description,
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
