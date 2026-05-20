import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import TarifsContent from "@/components/tarifs/TarifsContent";

export const metadata: Metadata = {
  title: `Modalités et Tarifs — ${SITE_CONFIG.name}`,
  description:
    "Tarifs transparents pour mes prestations d'accompagnement, d'information et de prévention en droit du travail — salariés et employeurs.",
  openGraph: {
    title: `Modalités et Tarifs — ${SITE_CONFIG.name}`,
    description:
      "Découvrez mes tarifs d'accompagnement en droit du travail, prévention des risques professionnels et DUERP.",
  },
};

export default function TarifsPage() {
  return <TarifsContent />;
}
