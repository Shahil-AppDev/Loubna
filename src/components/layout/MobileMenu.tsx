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
      <div className="flex-shrink-0 px-6 py-8 border-b border-or-500/30">
        <div className="flex items-center justify-between">
          {/* Logo + Identité */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Loubna Abouz Manta"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-white leading-tight">
                Loubna Abouz Manta
              </span>
              <span className="text-xs font-semibold tracking-wide uppercase text-or-500 mt-1">
                Juriste · Droit du travail
              </span>
            </div>
          </div>

          {/* Bouton X */}
          <button
            type="button"
            onClick={onClose}
            className="p-3 text-white hover:text-or-500 transition-colors rounded-lg hover:bg-white/5"
            aria-label="Fermer le menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── SECTION CENTRALE : NAVIGATION ──────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-10">
        <div className="space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "block w-full text-left py-5 px-6 rounded-xl",
                "font-serif text-2xl font-bold",
                "transition-all duration-200",
                pathname === link.href
                  ? "text-white bg-gradient-to-r from-rouge-800/40 to-rouge-900/40"
                  : "text-white hover:text-or-500 hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Liens légaux */}
        <div className="mt-10 pt-8 border-t border-white/20 space-y-3">
          <Link
            href="/mentions-legales"
            onClick={onClose}
            className="block text-base text-white/70 hover:text-white transition-colors py-3 px-6"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-de-confidentialite"
            onClick={onClose}
            className="block text-base text-white/70 hover:text-white transition-colors py-3 px-6"
          >
            Politique de confidentialité
          </Link>
        </div>
      </nav>

      {/* ─── SECTION BASSE : CONTACTS ───────────────── */}
      <div className="flex-shrink-0 px-6 py-8 border-t border-or-500/30 bg-gradient-to-b from-transparent to-encre-900/50">
        {/* Coordonnées cliquables */}
        <div className="space-y-4 mb-6">
          <a
            href="tel:+33659111108"
            className="flex items-center gap-4 text-white hover:text-or-500 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-base font-semibold">06 59 11 11 08</span>
          </a>

          <a
            href="mailto:louamjuristeconseil@gmail.com"
            className="flex items-center gap-4 text-white hover:text-or-500 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-base font-semibold break-all">louamjuristeconseil@gmail.com</span>
          </a>
        </div>

        {/* Mention bilingue */}
        <p className="text-sm text-white/60 text-center leading-relaxed px-4">
          Accompagnement & information en droit du travail FR/AR
        </p>
      </div>
    </div>
  );
}
