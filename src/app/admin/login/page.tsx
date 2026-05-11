'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erreur lors de la connexion');
        setLoading(false);
        return;
      }

      // Rediriger vers le dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-encre-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-or-500 mb-2">
            Back Office
          </h1>
          <p className="text-encre-400 text-sm">
            Gestion des rendez-vous
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-encre-900 rounded-lg border border-encre-800 p-8">
          <h2 className="font-serif text-2xl font-semibold text-white mb-6">
            Connexion administrateur
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="admin-label-dark">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="admin-input-dark"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="admin-label-dark">Mot de passe</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="admin-input-dark"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-encre-800">
            <p className="text-encre-400 text-xs text-center">
              Accès réservé aux administrateurs autorisés
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-encre-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Retour au site</span>
          </a>
        </div>
      </div>
    </div>
  );
}
