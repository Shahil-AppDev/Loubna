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
      <aside className="fixed left-0 top-0 h-full w-64 bg-encre-950 text-white hidden md:block">
        <div className="p-6">
          <h1 className="font-serif text-2xl font-bold text-or-500">
            Back Office
          </h1>
          <p className="text-xs text-encre-400 mt-1">Gestion des rendez-vous</p>
        </div>

        <nav className="mt-8">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-encre-900 transition-colors"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/appointments"
            className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-encre-900 transition-colors"
          >
            <span>📅</span>
            <span>Rendez-vous</span>
          </Link>
          <Link
            href="/admin/calendar"
            className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-encre-900 transition-colors"
          >
            <span>🗓️</span>
            <span>Calendrier</span>
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-encre-900 transition-colors"
          >
            <span>💼</span>
            <span>Services</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-encre-900 transition-colors"
          >
            <span>⚙️</span>
            <span>Paramètres</span>
          </Link>
          <Link
            href="/admin/cms"
            className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-encre-900 transition-colors"
          >
            <span>📝</span>
            <span>CMS</span>
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 px-6 py-3 text-sm hover:bg-encre-900 transition-colors"
          >
            <span>📥</span>
            <span>Leads</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-encre-800 space-y-3">
          {user && (
            <div className="text-xs text-encre-400 mb-3">
              <div className="font-medium text-white">{user.email}</div>
            </div>
          )}
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 text-sm text-encre-400 hover:text-white transition-colors"
          >
            <span>🚪</span>
            <span>Déconnexion</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-encre-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Retour au site</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 p-4 md:p-8">
        <div className="md:hidden mb-4 rounded-lg border border-encre-200 bg-white p-3 text-sm">
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="px-2 py-1 rounded bg-encre-100">Dashboard</Link>
            <Link href="/admin/appointments" className="px-2 py-1 rounded bg-encre-100">RDV</Link>
            <Link href="/admin/services" className="px-2 py-1 rounded bg-encre-100">Services</Link>
            <Link href="/admin/cms" className="px-2 py-1 rounded bg-encre-100">CMS</Link>
            <Link href="/admin/leads" className="px-2 py-1 rounded bg-encre-100">Leads</Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
