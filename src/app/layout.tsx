'use client';

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileMenu from "@/components/layout/MobileMenu";
import { MobileMenuProvider } from "@/components/layout/MobileMenuProvider";
import { getAssetPath } from "@/lib/basePath";
import { SITE_CONFIG } from "@/lib/constants";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { usePathname } from "next/navigation";
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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

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
        availableLanguage: ["Français", "Arabe"],
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
      <body className="font-sans bg-encre-50 text-encre-800 antialiased" suppressHydrationWarning>
        {isAdminRoute ? (
          <>{children}</>
        ) : (
          <MobileMenuProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <MobileMenu />
          </MobileMenuProvider>
        )}
      </body>
    </html>
  );
}
