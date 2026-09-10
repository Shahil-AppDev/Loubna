import type { Metadata } from "next";
import Link from "next/link";
import ModeleDuerpClient from "./ModeleDuerpClient";

export const metadata: Metadata = {
  title: "Modèle DUERP à compléter — Document unique d'évaluation des risques",
  description:
    "Téléchargez un modèle de DUERP (Document Unique d'Évaluation des Risques Professionnels) à compléter et adapter à votre activité. Format PDF, 20 pages. 18,99 € seulement.",
  keywords: [
    "DUERP",
    "modèle DUERP",
    "document unique évaluation risques",
    "évaluation risques professionnels",
    "prévention risques",
    "DUERP PDF",
    "modèle DUERP à compléter",
  ],
  openGraph: {
    title: "Modèle DUERP à compléter — Document unique d'évaluation des risques",
    description:
      "Téléchargez un modèle de DUERP à compléter et adapter à votre activité. Format PDF, 20 pages. 18,99 € seulement.",
    url: "https://juriste-droit-du-travail.com/documents/modele-duerp",
    siteName: "Loubna Abouz Manta",
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modèle DUERP à compléter",
    description:
      "Document unique d'évaluation des risques professionnels à compléter. PDF, 20 pages. 18,99 €.",
  },
  alternates: {
    canonical: "https://juriste-droit-du-travail.com/documents/modele-duerp",
  },
};

export default function ModeleDuerpPage() {
  return <ModeleDuerpClient />;
}
