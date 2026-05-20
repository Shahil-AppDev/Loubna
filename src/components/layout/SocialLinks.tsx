import { SITE_CONFIG } from "@/lib/constants";

const linkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={SITE_CONFIG.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn — Loubna Abouz Manta"
        className={linkClass}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#0A66C2"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.437 2.437 0 01-2.063-2.065 2.437 2.437 0 012.063-2.064 2.437 2.437 0 012.064 2.065 2.437 2.437 0 01-2.064 2.063zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      </a>
      <a
        href={SITE_CONFIG.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram — Loubna Abouz Manta"
        className={linkClass}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <defs>
            <linearGradient id="ig-brand" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEDA75" />
              <stop offset="25%" stopColor="#FA7E1E" />
              <stop offset="50%" stopColor="#D62976" />
              <stop offset="75%" stopColor="#962FBF" />
              <stop offset="100%" stopColor="#4F5BD5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#ig-brand)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069 3.205 0 3.584.013 4.849.069 3.26.149 4.772 1.699 4.919 4.92.058 1.265.07 1.645.07 4.849 0 3.203-.012 3.583-.069 4.849-.149 3.23-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.947-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.644-1.44-1.44-1.44z"
          />
        </svg>
      </a>
      <a
        href={SITE_CONFIG.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok — Loubna Abouz Manta"
        className={linkClass}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#000000"
            d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
          />
        </svg>
      </a>
    </div>
  );
}
