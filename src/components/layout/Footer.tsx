import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-encre-950 text-white">
      {/* Main footer */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Loubna Abouz Manta"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-serif text-white text-base font-semibold">
                  Loubna Abouz Manta
                </p>
                <p className="text-or-400 text-xs tracking-[0.15em] uppercase font-medium">
                  Juriste · Droit du Travail
                </p>
              </div>
            </div>
            <p className="text-encre-300 text-sm leading-relaxed max-w-sm">
              Accompagnement en droit du travail et prévention des risques professionnels,
              en amont des procédures. Pour les salariés et les entreprises.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-encre-300 hover:text-or-400 text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <span className="text-or-500">✉</span>
                {SITE_CONFIG.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="text-encre-300 hover:text-or-400 text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <span className="text-or-500">☎</span>
                {SITE_CONFIG.phone}
              </a>
              <p className="text-encre-300 text-sm flex items-center gap-2">
                <span className="text-or-500">⏱</span>
                {SITE_CONFIG.hours}
              </p>
              <p className="text-encre-300 text-sm flex items-center gap-2">
                <span className="text-or-500">📍</span>
                {SITE_CONFIG.address}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-[0.1em] uppercase mb-6">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-encre-300 hover:text-or-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Legal */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-[0.1em] uppercase mb-6">
              Informations
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-encre-300 hover:text-or-400 text-sm transition-colors duration-200"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-encre-300 hover:text-or-400 text-sm transition-colors duration-200"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-encre-300 hover:text-or-400 text-sm transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              {SITE_CONFIG.linkedin && (
                <li>
                  <a
                    href={SITE_CONFIG.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-encre-300 hover:text-or-400 text-sm transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-8 p-4 border border-encre-800 rounded-sm">
              <p className="text-encre-400 text-xs leading-relaxed">
                Les informations fournies ne constituent pas une consultation
                juridique au sens de la réglementation applicable à la
                profession d&apos;avocat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-encre-800">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-encre-500 text-xs">
            © {year} Loubna Abouz Manta. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-or-500" />
            <p className="text-encre-500 text-xs">
              Juriste spécialisée en droit du travail
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
