import type { Metadata } from "next";
import DocumentsClient from "./DocumentsClient";

export const metadata: Metadata = {
  title: "Documents droit du travail à télécharger | Loubna Abouz Manta",
  description:
    "Découvrez des modèles et outils à télécharger en droit du travail, DUERP, prévention des risques professionnels, AT/MP et courriers professionnels.",
  keywords: [
    "documents droit du travail",
    "modèles juridiques",
    "DUERP",
    "prévention risques",
    "courriers professionnels",
    "accident du travail",
  ],
  openGraph: {
    title: "Documents droit du travail à télécharger | Loubna Abouz Manta",
    description:
      "Modèles et outils à télécharger en droit du travail, DUERP, prévention des risques, AT/MP et courriers professionnels.",
    url: "https://juriste-droit-du-travail.com/documents",
    siteName: "Loubna Abouz Manta",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/documents",
  },
};

export default function DocumentsPage() {
  return <DocumentsClient />;
}
