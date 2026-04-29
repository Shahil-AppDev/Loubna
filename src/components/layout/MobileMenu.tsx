"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Interventions" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] lg:hidden",
        "bg-[#050505]",
        "flex flex-col",
        "animate-in fade-in duration-300"
      )}
    >
      {/* ─── SECTION HAUTE ─────────────────────────── */}
      <div className="flex-shrink-0 px-6 py-6 border-b border-or-500/20">
        <div className="flex items-start justify-between mb-4">
          {/* Logo + Identité */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Loubna Abouz Manta"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold text-white leading-tight">
                Loubna Abouz Manta
              </span>
              <span className="text-[0.65rem] font-bold tracking-wider uppercase text-or-500 leading-none mt-1">
                Juriste · Droit du travail
              </span>
            </div>
          </div>

          {/* Bouton X */}
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Fermer le menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sous-titre */}
        <p className="text-xs text-white/60 leading-relaxed pl-15">
          Accompagnement & information en droit du travail FR/AR
        </p>
      </div>

      {/* ─── SECTION CENTRALE : NAVIGATION ──────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-8">
        <div className="space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "block w-full text-left py-4 px-5 rounded-lg",
                "font-serif text-xl font-semibold",
                "transition-all duration-200",
                "border-l-4",
                pathname === link.href
                  ? "text-white bg-rouge-800/30 border-rouge-800 shadow-lg shadow-rouge-800/10"
                  : "text-white/80 hover:text-white hover:bg-white/5 border-transparent hover:border-or-500/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Liens légaux */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/mentions-legales"
            onClick={onClose}
            className="block text-sm text-white/50 hover:text-white/80 transition-colors py-2 px-5"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-de-confidentialite"
            onClick={onClose}
            className="block text-sm text-white/50 hover:text-white/80 transition-colors py-2 px-5"
          >
            Politique de confidentialité
          </Link>
        </div>
      </nav>

      {/* ─── SECTION BASSE : CONTACTS ───────────────── */}
      <div className="flex-shrink-0 px-6 py-6 border-t border-or-500/20 bg-encre-900/30">
        {/* Coordonnées cliquables */}
        <div className="space-y-3 mb-5">
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

        {/* Mention bilingue */}
        <p className="text-xs text-white/50 text-center leading-relaxed">
          Accompagnement bilingue français / arabe
        </p>
      </div>
    </div>
  );
}
