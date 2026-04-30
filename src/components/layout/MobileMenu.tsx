"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMobileMenu } from "./MobileMenuProvider";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Interventions" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const { isOpen, close } = useMobileMenu();

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
        close();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[99999] lg:hidden",
        "bg-[#050505]",
        "overflow-y-auto",
        "flex flex-col"
      )}
    >
      {/* ─── HEADER DU MENU ─────────────────────────── */}
      <div className="flex-shrink-0 px-6 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {/* Logo + Nom */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              <img
                src="/logo.png"
                alt="Loubna Abouz Manta"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-white">
                Loubna Abouz Manta
              </span>
              <span className="text-xs text-or-500 font-semibold uppercase tracking-wide">
                Juriste · Droit du travail
              </span>
            </div>
          </div>

          {/* Bouton X */}
          <button
            type="button"
            onClick={close}
            className="p-3 text-white hover:text-or-500 transition-colors rounded-lg hover:bg-white/5"
            aria-label="Fermer le menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── NAVIGATION SIMPLE ──────────────────────── */}
      <nav className="flex-1 px-6 py-8">
        <ul className="space-y-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className={cn(
                  "block w-full text-left py-4 px-5 rounded-lg",
                  "font-serif text-xl font-bold",
                  "transition-colors duration-200",
                  pathname === link.href
                    ? "text-white bg-rouge-800/30"
                    : "text-white hover:text-or-500 hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ─── BAS DU MENU : CONTACTS ─────────────────── */}
      <div className="flex-shrink-0 px-6 py-6 border-t border-white/10">
        <div className="space-y-4 mb-6">
          <a
            href="tel:+33659111108"
            className="flex items-center gap-3 text-white hover:text-or-500 transition-colors py-2"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-base font-semibold">06 59 11 11 08</span>
          </a>

          <a
            href="mailto:louamjuristeconseil@gmail.com"
            className="flex items-center gap-3 text-white hover:text-or-500 transition-colors py-2"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-base font-semibold break-all">louamjuristeconseil@gmail.com</span>
          </a>
        </div>

        <p className="text-sm text-white/60 text-center">
          Accompagnement & information en droit du travail FR/AR
        </p>
      </div>
    </div>
  );
}
