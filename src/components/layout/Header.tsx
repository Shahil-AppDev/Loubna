"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-encre-950/98 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Loubna Abouz Manta — Juriste"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-white text-sm font-semibold leading-tight tracking-wide">
                Loubna Abouz Manta
              </p>
              <p className="text-or-400 text-xs tracking-[0.15em] uppercase font-medium">
                Juriste · Droit du travail
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-all duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-or-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary text-xs px-5 py-2.5"
            >
              Prendre contact
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-white p-2 rounded-sm"
            aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 bg-white transition-all duration-300",
                  isMobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-white transition-all duration-300",
                  isMobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-white transition-all duration-300",
                  isMobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-20 bg-encre-950 z-40 transition-all duration-300 flex flex-col",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col p-8 gap-2">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "text-white/80 hover:text-white text-2xl font-serif font-medium py-3 border-b border-encre-800 transition-all duration-200",
                isMobileOpen && "animate-fade-up"
              )}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="btn-primary w-full justify-center text-base py-4"
            >
              Prendre contact
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-encre-800">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-or-400 text-sm font-medium"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
