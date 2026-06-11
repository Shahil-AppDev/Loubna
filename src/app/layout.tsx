import LayoutShell from "@/components/layout/LayoutShell";
import { getAssetPath } from "@/lib/basePath";
import { SITE_CONFIG } from "@/lib/constants";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-WCG3KTXK";

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
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-encre-50 text-encre-800 antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
