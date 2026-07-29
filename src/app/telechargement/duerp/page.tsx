import type { Metadata } from "next";
import { Suspense } from "react";
import DownloadDuerpClient from "./DownloadDuerpClient";

export const metadata: Metadata = {
  title: "Téléchargement — Modèle DUERP",
  description: "Téléchargez votre modèle DUERP.",
  robots: { index: false, follow: false },
};

export default function DownloadDuerpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-encre-500">Chargement...</div></div>}>
      <DownloadDuerpClient />
    </Suspense>
  );
}
