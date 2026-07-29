'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAdmin, signOut } = useAuth();

  useEffect(() => {
    // Ne pas rediriger si on est sur la page de login
    if (pathname === '/admin/login') return;

    // Rediriger vers login si pas authentifié
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, router, pathname]);

  // Afficher la page de login sans le layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-encre-50 flex items-center justify-center">
        <div className="text-encre-500">Vérification...</div>
      </div>
    );
  }

  // Ne rien afficher si pas authentifié (redirection en cours)
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-encre-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-encre-950 hidden md:flex flex-col">
        <div className="px-6 py-7 border-b border-encre-800/60">
          <h1 className="font-serif text-xl font-bold text-or-500 leading-tight">
            Back Office
          </h1>
          <p className="font-sans text-[0.7rem] tracking-[0.12em] uppercase text-encre-500 mt-1">
            Loubna Abouz Manta
          </p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {[
            { href: '/admin',              label: 'Dashboard',    icon: '📊' },
            { href: '/admin/appointments', label: 'Rendez-vous',  icon: '📅' },
            { href: '/admin/calendar',     label: 'Calendrier',   icon: '🗓️' },
            { href: '/admin/services',     label: 'Services',     icon: '💼' },
            { href: '/admin/leads',        label: 'Leads',        icon: '📥' },
            { href: '/admin/documents',    label: 'Documents',    icon: '📄' },
            { href: '/admin/cms',          label: 'CMS',          icon: '📝' },
            { href: '/admin/settings',     label: 'Paramètres',   icon: '⚙️' },
          ].map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`admin-nav-link ${pathname === href ? 'admin-nav-link-active' : ''}`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-encre-800/60 space-y-3">
          {user && (
            <div className="font-sans text-xs text-encre-400 mb-2 truncate">
              <span className="text-white/70 font-medium">{user.email}</span>
            </div>
          )}
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 font-sans text-xs text-encre-500 hover:text-white transition-colors"
          >
            <span>🚪</span>
            <span>Déconnexion</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 font-sans text-xs text-encre-500 hover:text-or-500 transition-colors"
          >
            <span>←</span>
            <span>Retour au site</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 p-4 md:p-8">
        {/* Mobile nav */}
        <div className="md:hidden mb-5 admin-panel p-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { href: '/admin',              label: 'Dashboard' },
              { href: '/admin/appointments', label: 'RDV' },
              { href: '/admin/services',     label: 'Services' },
              { href: '/admin/leads',        label: 'Leads' },
              { href: '/admin/documents',    label: 'Docs' },
              { href: '/admin/cms',          label: 'CMS' },
              { href: '/admin/settings',     label: 'Paramètres' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans text-xs px-3 py-1.5 rounded-sm transition-colors ${
                  pathname === href
                    ? 'bg-encre-900 text-white'
                    : 'bg-encre-50 text-encre-700 hover:bg-encre-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
