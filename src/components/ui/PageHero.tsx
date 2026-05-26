/**
 * Composant Hero réutilisable pour toutes les pages
 */

import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="hero-grid-bg" />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,0,0,.22) 0%, transparent 70%)" }}
      />
      <div className="container-main relative z-10 pt-20 pb-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>›</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-or-500">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white/80 transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/85 text-[1rem] max-w-[520px] mt-5 leading-[1.8]">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
