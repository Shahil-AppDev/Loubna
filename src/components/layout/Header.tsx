"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
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
        scrolled ? "h-[68px] border-or-500/25" : "h-20"
      )}
    >
      <nav className="container-main h-full flex items-center justify-between">

        {/* ─── LOGO ─────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Loubna Abouz Manta"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[1.05rem] font-semibold text-white leading-tight">
              Loubna Abouz Manta
            </span>
            <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-or-500 leading-none mt-0.5">
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
          className="md:hidden flex flex-col gap-[5px] p-2 z-50 relative"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300 origin-center", mobileOpen && "translate-y-[7px] rotate-45")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300 origin-center", mobileOpen && "-translate-y-[7px] -rotate-45")} />
        </button>
      </nav>

      {/* ─── MOBILE MENU ──────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 bg-encre-950 z-40 flex flex-col items-center justify-center gap-3 md:hidden",
          "transition-transform duration-400 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {[...NAV_LINKS, { href: "/contact", label: "Prendre contact" }].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-2xl font-serif font-semibold text-white/60 hover:text-white transition-colors py-3 px-8 w-full text-center",
              pathname === link.href && "text-white",
              link.href === "/contact" && "mt-4 bg-rouge-800 text-white hover:bg-rouge-900 text-base font-sans tracking-widest uppercase font-bold py-4 mx-8 rounded-sm"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
