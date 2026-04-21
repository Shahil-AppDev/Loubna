import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable — 404",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-encre-950 flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-or-500 to-transparent" />

      <div className="text-center max-w-lg">
        {/* 404 */}
        <div className="relative inline-block mb-8">
          <span className="font-serif text-[120px] lg:text-[160px] font-bold text-encre-900 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-0.5 bg-gradient-to-r from-or-500 to-or-300" />
          </div>
        </div>

        <h1 className="font-serif text-2xl lg:text-3xl text-white font-bold mb-4">
          Page introuvable
        </h1>

        <p className="text-encre-300 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Utilisez la navigation ci-dessous pour retrouver votre chemin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-rouge-800 text-white px-7 py-3.5 rounded-sm font-medium text-sm tracking-wide transition-all duration-300 hover:bg-rouge-700 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-encre-700 text-encre-300 hover:text-white hover:border-encre-500 px-7 py-3.5 rounded-sm font-medium text-sm tracking-wide transition-all duration-300"
          >
            Me contacter
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-14 pt-8 border-t border-encre-800">
          <p className="text-encre-500 text-xs tracking-wide uppercase mb-5">
            Pages principales
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "À propos", href: "/a-propos" },
              { label: "Services", href: "/services" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-encre-400 hover:text-or-400 text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
