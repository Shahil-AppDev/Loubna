"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-encre-950/97 backdrop-blur-md border-b border-or-500/15",
        scrolled ? "h-16 md:h-[68px] border-or-500/25" : "h-16 md:h-20"
      )}
    >
      <nav className="container-main h-full flex items-center justify-between">

        {/* ─── LOGO ─────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 md:gap-3.5 group">
          <div className="relative w-9 h-9 md:w-11 md:h-11 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Loubna Abouz Manta"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[0.9rem] md:text-[1.05rem] font-semibold text-white leading-tight">
              Loubna Abouz Manta
            </span>
            <span className="text-[0.5rem] md:text-[0.6rem] font-bold tracking-[0.12em] md:tracking-[0.15em] uppercase text-or-500 leading-none mt-0.5">
              Juriste · Droit du travail
            </span>
          </div>
        </Link>

        {/* ─── DESKTOP LINKS ────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link",
                pathname === link.href && "nav-link-active text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "ml-3 btn btn-primary text-[0.75rem] py-2.5 px-5",
              pathname === "/contact" && "opacity-90"
            )}
          >
            Prendre contact
          </Link>
        </div>

        {/* ─── MOBILE TOGGLE ────────────────────────── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 z-[200] relative"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={!!mobileOpen}
        >
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300 origin-center", mobileOpen && "translate-y-[7px] rotate-45")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300 origin-center", mobileOpen && "-translate-y-[7px] -rotate-45")} />
        </button>
      </nav>

      {/* ─── MOBILE MENU PREMIUM ──────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-[150] md:hidden",
          "bg-encre-950",
          "transition-all duration-300 ease-out",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Conteneur menu scrollable */}
        <div className="relative h-full overflow-y-auto overflow-x-hidden flex flex-col">

          {/* Header du menu mobile */}
          <div className="flex-shrink-0 px-6 py-6 border-b border-or-500/20">
            <div className="flex items-center justify-between">
              {/* Logo + Nom */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <img
                    src="/logo.png"
                    alt="Loubna Abouz Manta"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base font-semibold text-white leading-tight">
                    Loubna Abouz Manta
                  </span>
                  <span className="text-[0.6rem] font-bold tracking-wider uppercase text-or-500 leading-none mt-0.5">
                    Juriste · Droit du travail
                  </span>
                </div>
              </div>

              {/* Bouton fermer */}
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Fermer le menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation principale */}
          <nav className="flex-1 px-6 py-8 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block w-full text-left py-4 px-5 rounded-lg",
                  "font-serif text-xl font-semibold",
                  "transition-all duration-200",
                  pathname === link.href
                    ? "text-white bg-rouge-800/30 border-l-4 border-rouge-800"
                    : "text-white/80 hover:text-white hover:bg-white/5 border-l-4 border-transparent hover:border-or-500/50"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Bouton Contact */}
            <Link
              href="/contact"
              className={cn(
                "block w-full text-center mt-6",
                "bg-gradient-to-r from-rouge-800 to-rouge-900",
                "text-white font-sans font-bold text-sm tracking-widest uppercase",
                "py-4 px-6 rounded-lg",
                "border border-rouge-700/50",
                "shadow-lg shadow-rouge-900/30",
                "transition-all duration-200",
                "hover:shadow-xl hover:scale-[1.02]",
                "active:scale-[0.98]"
              )}
            >
              Prendre contact
            </Link>
          </nav>

          {/* Footer du menu mobile */}
          <div className="flex-shrink-0 px-6 py-6 border-t border-or-500/20 bg-encre-900/50">
            {/* Coordonnées */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+33659111108"
                className="flex items-center gap-3 text-white/90 hover:text-or-500 transition-colors py-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium">06 59 11 11 08</span>
              </a>

              <a
                href="mailto:louamjuristeconseil@gmail.com"
                className="flex items-center gap-3 text-white/90 hover:text-or-500 transition-colors py-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium break-all">louamjuristeconseil@gmail.com</span>
              </a>
            </div>

            {/* Mention */}
            <p className="text-xs text-white/60 text-center leading-relaxed mb-4">
              Accompagnement & information en droit du travail FR/AR
            </p>

            {/* Liens légaux */}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <Link
                href="/mentions-legales"
                className="text-xs text-white/40 hover:text-white/70 transition-colors text-center py-1"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-xs text-white/40 hover:text-white/70 transition-colors text-center py-1"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
