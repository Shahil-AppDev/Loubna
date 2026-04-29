import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Interventions" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "/services", label: "Compréhension de situation" },
  { href: "/services", label: "DUERP" },
  { href: "/services", label: "Prévention des risques" },
  { href: "/services", label: "Accompagnement – fin de contrat" },
  { href: "/services", label: "Information en droit du travail" },
];

export default function Footer() {
  return (
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
                  alt="Loubna Abouz Manta"
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
            <p className="text-white/40 text-[0.85rem] md:text-sm leading-6 md:leading-7 mb-2 md:mb-3">
              Accompagnement &amp; information en droit du travail (FR/AR) —
              prévention des risques professionnels, en amont des procédures.
            </p>
            <p className="text-or-500/60 text-[0.72rem] mb-5 md:mb-6 tracking-wide">
              Accompagnement bilingue français / arabe
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex w-9 h-9 border border-white/15 rounded-full items-center justify-center text-white/50 hover:border-or-500 hover:text-or-500 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex w-9 h-9 border border-white/15 rounded-full items-center justify-center text-white/50 hover:border-or-500 hover:text-or-500 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069 3.205 0 3.584.013 4.849.069 3.26.149 4.772 1.699 4.919 4.92.058 1.265.07 1.645.07 4.849 0 3.203-.012 3.583-.069 4.849-.149 3.23-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07zm0-2.163c-3.259 0-3.667.014-4.947.072-2.558.12-3.979 1.536-4.099 4.099-.059 1.28-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.12 2.558 1.537 3.979 4.099 4.099 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 2.558-.12 3.979-1.537 4.099-4.099.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.12-2.558-1.536-3.979-4.099-4.099-1.279-.058-1.689-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.645-1.44-1.44-1.44z" fill="url(#instagram-gradient)" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex w-9 h-9 border border-white/15 rounded-full items-center justify-center text-white/50 hover:border-or-500 hover:text-or-500 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#000000" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.64 2.82 1.46 3.9.31.38.78.62 1.26.62v3.8c-.37-.02-.75-.03-1.11-.09-.25-.04-.5-.12-.75-.21-.17-.07-.33-.16-.49-.25-.02.81-.04 1.62-.07 2.43-.02.31-.06.62-.1.92-.05.43-.12.86-.22 1.28-.08.29-.19.56-.32.83-.15.3-.33.58-.53.85-.08.12-.16.23-.25.34-.09.1-.18.19-.28.28-.1.09-.2.17-.31.25-.23.17-.47.32-.73.45-.25.12-.52.22-.79.31-.27.09-.55.16-.84.21-.28.05-.57.08-.86.09v-3.8c.48 0 .95-.23 1.26-.62.82-1.08 1.38-2.37 1.46-3.9.01-.1.01-.2.01-.3.02-1.31.01-2.61.02-3.91zM5.75 8.03c.2.01.4.03.59.06.26.04.52.1.77.18.25.08.49.18.72.3.23.12.45.26.66.41.21.15.41.32.59.5.18.18.34.37.48.57.14.2.26.41.37.62.11.21.2.43.27.65.07.22.12.45.15.68.03.23.04.46.04.69 0 .23-.01.46-.04.69-.03.23-.08.46-.15.68-.07.22-.16.44-.27.65-.11.21-.23.42-.37.62-.14.2-.3.39-.48.57-.18.18-.38.35-.59.5-.21.15-.43.29-.66.41-.23.12-.47.22-.72.3-.25.08-.51.14-.77.18-.19.03-.39.05-.59.06-.2.01-.4.02-.6.02-.2 0-.4-.01-.6-.02-.2-.01-.4-.03-.59-.06-.26-.04-.52-.1-.77-.18-.25-.08-.49-.18-.72-.3-.23-.12-.45-.26-.66-.41-.21-.15-.41-.32-.59-.5-.18-.18-.34-.37-.48-.57-.14-.2-.26-.41-.37-.62-.11-.21-.2-.43-.27-.65-.07-.22-.12-.45-.15-.68-.03-.23-.04-.46-.04-.69 0-.23.01-.46.04-.69.03-.23.08-.46.15-.68.07-.22.16-.44.27-.65.11-.21.23-.42.37-.62.14-.2-.3.39-.48.57-.18.38-.35-.59-.5-.21-.15-.43-.29-.66-.41-.23-.12-.47-.22-.72-.3-.25-.08-.51-.14-.77-.18-.19-.03-.39-.05-.59-.06-.2-.01-.4-.02-.6-.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="footer-nav-title">Navigation</h5>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors"
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
                    className="text-sm text-white/45 hover:text-white transition-colors"
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
              <li className="flex items-start gap-2.5 text-sm text-white/45">
                <span>📧</span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/45">
                <span>📞</span>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/45">
                <span>📍</span>
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/45">
                <span>🕐</span>
                <span>{SITE_CONFIG.hours}</span>
              </li>
            </ul>

            <div className="mt-6 p-4 border border-encre-800 rounded-sm">
              <p className="text-encre-300 text-xs leading-relaxed font-semibold mb-1.5">
                Prestations d&apos;accompagnement, d&apos;information et de prévention – hors consultation juridique réglementée.
              </p>
              <p className="text-encre-400 text-xs leading-relaxed">
                Les prestations proposées relèvent de l&apos;information, de l&apos;accompagnement et de la prévention en droit du travail. Elles ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d&apos;avocat.
              </p>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM ────────────────────────────── */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {SITE_CONFIG.name} · Juriste en droit du travail
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="text-xs text-white/25 hover:text-white/60 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="text-xs text-white/25 hover:text-white/60 transition-colors"
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
  );
}
