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
          "bg-gradient-to-br from-encre-950 via-encre-900 to-encre-950",
          "transition-all duration-500 ease-out",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Backdrop avec effet blur */}
        <div className="absolute inset-0 backdrop-blur-md bg-encre-950/95" />

        {/* Effet décoratif premium */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-or-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rouge-800/5 rounded-full blur-3xl" />

        {/* Conteneur menu scrollable */}
        <div className={cn(
          "relative h-full overflow-y-auto overflow-x-hidden",
          "flex flex-col items-center justify-center",
          "px-6 py-20 safe-area-inset",
          "transition-transform duration-500 ease-out",
          mobileOpen ? "translate-y-0" : "translate-y-8"
        )}>

          {/* Navigation principale */}
          <nav className="w-full max-w-sm space-y-2">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block w-full text-center py-4 px-6 rounded-lg",
                  "font-serif text-2xl font-semibold",
                  "transition-all duration-300 ease-out",
                  "border border-transparent",
                  pathname === link.href
                    ? "text-white bg-rouge-800/20 border-rouge-800/40 shadow-lg shadow-rouge-800/10"
                    : "text-white/70 hover:text-white hover:bg-white/5 hover:border-white/10",
                  mobileOpen && `animate-slide-in-${index}`
                )}
                style={{
                  animationDelay: mobileOpen ? `${index * 80}ms` : '0ms'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bouton Contact premium */}
          <Link
            href="/contact"
            className={cn(
              "mt-8 w-full max-w-sm block text-center",
              "bg-gradient-to-r from-rouge-800 to-rouge-900",
              "text-white font-sans font-bold text-sm tracking-widest uppercase",
              "py-5 px-8 rounded-lg",
              "border border-rouge-700/50",
              "shadow-xl shadow-rouge-900/30",
              "transition-all duration-300",
              "hover:shadow-2xl hover:shadow-rouge-900/50 hover:scale-[1.02]",
              "active:scale-[0.98]",
              pathname === "/contact" && "opacity-90"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              <span>Prendre contact</span>
              <span className="text-or-500">→</span>
            </span>
          </Link>

          {/* Liens secondaires */}
          <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-sm space-y-3">
            <Link
              href="/mentions-legales"
              className="block text-center text-sm text-white/40 hover:text-white/70 transition-colors py-2"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="block text-center text-sm text-white/40 hover:text-white/70 transition-colors py-2"
            >
              Politique de confidentialité
            </Link>
          </div>

          {/* Signature */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/20 font-serif italic">
              Cabinet juridique premium
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
