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
          className="md:hidden flex flex-col gap-[5px] p-2 z-[110] relative"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={!!mobileOpen}
        >
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300 origin-center", mobileOpen && "translate-y-[7px] rotate-45")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300 origin-center", mobileOpen && "-translate-y-[7px] -rotate-45")} />
        </button>
      </nav>

      {/* ─── MOBILE MENU ──────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 bg-encre-950/98 backdrop-blur-sm z-[100] flex flex-col items-start justify-start md:hidden overflow-y-auto pt-20",
          "transition-all duration-300 ease-in-out",
          mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-start gap-3 w-full max-w-md px-8 py-8 min-h-screen">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-2xl font-serif font-semibold text-white/70 hover:text-white transition-all duration-200 py-3 px-6 w-full text-center",
                pathname === link.href && "text-white scale-105"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "mt-6 bg-rouge-800 text-white hover:bg-rouge-900 text-sm font-sans tracking-widest uppercase font-bold py-4 px-10 w-full text-center rounded-sm transition-all duration-200 shadow-lg",
              pathname === "/contact" && "opacity-90"
            )}
          >
            Prendre contact
          </Link>
          <div className="mt-8 pt-6 border-t border-white/10 w-full flex flex-col gap-3">
            <Link
              href="/mentions-legales"
              className="text-sm text-white/50 hover:text-white/70 transition-colors text-center py-2"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-sm text-white/50 hover:text-white/70 transition-colors text-center py-2"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
