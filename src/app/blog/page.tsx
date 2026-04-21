import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog Droit du Travail & RSE | Loubna Abouz Manta",
  description: "Retrouvez nos articles, décryptages et conseils juridiques en droit du travail, ressources humaines et obligations RSE pour salariés et employeurs.",
  openGraph: {
    title: "Blog Droit du Travail & RSE | Loubna Abouz Manta",
    description: "Retrouvez nos articles, décryptages et conseils juridiques en droit du travail, ressources humaines et obligations RSE pour salariés et employeurs.",
  },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>›</span>
            <span className="text-or-500">Blog</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Actualités et conseils en droit du travail
          </h1>
          <p className="text-white/50 text-[1rem] max-w-[500px] mt-5 leading-[1.8]">
            Décryptages juridiques, guides pratiques et actualités pour salariés et employeurs.
          </p>
        </div>
      </section>

      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-sm border border-or-500/10 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[16/9] bg-encre-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rouge-900/80 to-encre-950/80 flex items-center justify-center">
                    <span className="text-6xl opacity-20">⚖️</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-or-500 text-encre-950 text-xs font-bold tracking-wider uppercase rounded-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-encre-500 mb-3">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl text-encre-950 mb-3 group-hover:text-rouge-800 transition-colors line-clamp-2">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-encre-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-rouge-800 hover:text-rouge-900 font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    Lire l'article
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-encre-500 text-lg">
                Aucun article pour le moment. Revenez bientôt !
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-main text-center">
          <h2 className="font-serif text-[2rem] text-encre-950 mb-4">
            Une question juridique spécifique ?
          </h2>
          <p className="text-encre-600 max-w-[600px] mx-auto mb-8">
            Chaque situation est unique. Contactez-nous pour une analyse personnalisée de votre dossier.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Prendre contact
          </Link>
        </div>
      </section>
    </>
  );
}
