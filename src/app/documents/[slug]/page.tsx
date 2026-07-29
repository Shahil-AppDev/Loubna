import type { Metadata } from "next";
import { Suspense } from "react";
import DocumentDetailClient from "./DocumentDetailClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Default metadata — the client component will handle dynamic SEO
  const title = "Document à télécharger | Loubna Abouz Manta";
  const description =
    "Modèle et document en droit du travail à télécharger. DUERP, prévention des risques, courriers professionnels.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://juriste-droit-du-travail.com/documents/${params.slug}`,
      siteName: "Loubna Abouz Manta",
      locale: "fr_FR",
      type: "article",
    },
    alternates: {
      canonical: `https://juriste-droit-du-travail.com/documents/${params.slug}`,
    },
  };
}

export default function DocumentDetailPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-encre-950">
          <div className="text-encre-500">Chargement...</div>
        </div>
      }
    >
      <DocumentDetailClient slug={params.slug} />
    </Suspense>
  );
}
