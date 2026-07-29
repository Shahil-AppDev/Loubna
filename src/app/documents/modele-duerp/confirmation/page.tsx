import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationClient from "./ConfirmationClient";

export const metadata: Metadata = {
  title: "Confirmation de votre commande — Modèle DUERP",
  description: "Statut de votre commande du modèle DUERP.",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-encre-500">Chargement...</div></div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
