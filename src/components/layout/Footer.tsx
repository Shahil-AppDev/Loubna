import SocialLinks from "@/components/layout/SocialLinks";
import { SERVICE_NOTE_IMPORTANTE } from "@/lib/client-service-note";
import { SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Interventions" },
  { href: "/droit-travail-suisse", label: "Suisse" },
  { href: "/formations", label: "Formations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "/services", label: "Compréhension de situation" },
  { href: "/services", label: "DUERP" },
  { href: "/services", label: "Prévention des risques" },
  { href: "/services", label: "Accompagnement – fin de contrat" },
  { href: "/services", label: "Information en droit du travail" },
  { href: "/droit-travail-suisse", label: "Droit du travail suisse" },
];

const WHATSAPP_URL = `https://wa.me/33${SITE_CONFIG.phone.replace(/\D/g, "").replace(/^0/, "")}?text=${encodeURIComponent(
  "Bonjour, je souhaite obtenir des informations concernant un accompagnement en droit du travail."
)}`;

// Bulle WhatsApp flottante
function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter via WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 w-14 h-14 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:opacity-95 group"
    >
      <Image
        src="/whatsapp-fab.png"
        alt=""
        width={56}
        height={56}
        className="h-full w-full object-cover"
        aria-hidden
        priority
      />
      <span className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
        Échanger sur WhatsApp
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="bg-encre-950 pt-12 md:pt-20 border-t border-or-500/12">
        <div className="container-main">
          {/* ─── GRID ──────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-5">
                <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                  <img
                    src="/logo.png"
                    alt="Loubna Abouz Manta, Juriste en droit du travail"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <p className="font-serif text-white font-semibold leading-tight text-[0.95rem] md:text-base">
                    Loubna Abouz Manta
                  </p>
                  <p className="text-[0.55rem] md:text-[0.6rem] text-or-500 tracking-[0.12em] uppercase mt-0.5">
                    Juriste · Droit du travail
                  </p>
                </div>
              </div>
              <p className="text-white/75 text-[0.85rem] md:text-sm leading-6 md:leading-7 mb-2 md:mb-3">
                Accompagnement &amp; information en droit du travail (FR/AR) —
                prévention des risques professionnels, en amont des procédures.
              </p>
              <p className="text-or-500/60 text-[0.72rem] mb-5 md:mb-6 tracking-wide">
                Accompagnement bilingue français / arabe
              </p>
              <SocialLinks />
            </div>

            {/* Navigation */}
            <div>
              <h5 className="footer-nav-title">Navigation</h5>
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interventions */}
            <div>
              <h5 className="footer-nav-title">Interventions</h5>
              <ul className="flex flex-col gap-2.5">
                {SERVICE_LINKS.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="footer-nav-title">Contact</h5>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2.5 text-sm text-white/70">
                  <span>📧</span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/70">
                  <span>📞</span>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/70">
                  <span>📍</span>
                  <span>{SITE_CONFIG.address}</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/70">
                  <span>🕐</span>
                  <span>{SITE_CONFIG.hours}</span>
                </li>
              </ul>

              <div className="mt-6 p-4 border border-encre-800 rounded-sm space-y-2 text-[0.8rem] text-white/90 leading-relaxed whitespace-pre-line">
                {SERVICE_NOTE_IMPORTANTE.join("\n\n")}
              </div>
            </div>
          </div>

          {/* ─── BOTTOM ────────────────────────────── */}
          <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} {SITE_CONFIG.name} · Juriste en droit du travail
            </p>
            <div className="flex gap-6">
              <Link
                href="/mentions-legales"
                className="text-xs text-white/45 hover:text-white/75 transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-xs text-white/45 hover:text-white/75 transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
          <div className="border-t border-white/[0.04] py-3 text-center">
            <p className="text-[0.65rem] text-white/20">
              Réalisé par Shahil AppDev ·{" "}
              <a
                href="https://www.francenum.gouv.fr/activateurs/shahil-appdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-or-500/70 transition-colors underline underline-offset-2"
              >
                Activateurs France Numérique
              </a>
            </p>
          </div>
        </div>
      </footer>
      <WhatsAppFloatingButton />
    </>
  );
}
