import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getAssetPath } from "@/lib/basePath";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B1A1A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
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
    "juriste Audincourt",
    "droit du travail France",
    "prévention conflits professionnels",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  icons: {
    icon: getAssetPath("/logo.png"),
    apple: getAssetPath("/logo.png"),
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Loubna Abouz Manta — Juriste en Droit du Travail · Prévention des Risques",
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Juriste en droit du travail`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loubna Abouz Manta — Juriste en Droit du Travail",
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          streetAddress: "45 rue des Mines",
          addressLocality: "Audincourt",
          postalCode: "25400",
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
        sameAs: [SITE_CONFIG.linkedin, SITE_CONFIG.instagram, SITE_CONFIG.tiktok],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_CONFIG.url}/#service`,
        name: "Loubna Abouz Manta — Juriste en Droit du Travail",
        url: SITE_CONFIG.url,
        email: SITE_CONFIG.email,
        telephone: SITE_CONFIG.phone,
        image: `${SITE_CONFIG.url}${getAssetPath("/logo.png")}`,
        description:
          "Accompagnement des salariés et des entreprises en droit du travail et prévention des risques professionnels, en amont des procédures.",
        areaServed: "France",
        availableLanguage: "Français",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "10:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Friday",
            opens: "10:00",
            closes: "12:30",
          },
        ],
        founder: { "@id": `${SITE_CONFIG.url}/#person` },
      },
    ],
  };

  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-encre-50 text-encre-950 antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
