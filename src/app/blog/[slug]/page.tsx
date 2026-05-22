import { BLOG_ARTICLE_DOC_BODIES } from "@/content/blog-article-doc-bodies";
import { getAllArticles, getArticleBySlug } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: article.metaTitle,
    description: article.description,
    openGraph: {
      title: article.metaTitle,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const body = BLOG_ARTICLE_DOC_BODIES[params.slug];

  if (!body) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${SITE_CONFIG.url}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: "Loubna Abouz Manta",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
  };

  return (
    <>
      <article>
        <section className="page-hero">
          <div className="hero-grid-bg" />
          <div className="container-main relative z-10 pt-20 pb-12">
            <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2">
              <Link href="/" className="hover:text-white/80 transition-colors">
                Accueil
              </Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-white/80 transition-colors">
                Blog
              </Link>
              <span>›</span>
              <span className="text-or-500">{article.category}</span>
            </nav>
            <div className="flex items-center gap-3 text-xs text-white/65 mb-4">
              <span className="px-3 py-1 bg-or-500 text-encre-950 font-bold tracking-wider uppercase rounded-sm">
                {article.category}
              </span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </section>

        <section className="section-pad bg-encre-50">
          <div className="container-main">
            <div className="max-w-[820px] mx-auto">
              <div className="text-[0.95rem] md:text-[1rem] text-encre-800 leading-[1.85] whitespace-pre-line">
                {body}
              </div>

              <div className="mt-12 text-center">
                <Link href="/rendez-vous/?service=a1000001-0000-0000-0000-000000000001" className="btn btn-primary">
                  Prendre contact
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
