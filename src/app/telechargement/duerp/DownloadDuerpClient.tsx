'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DownloadDuerpClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg('Token de téléchargement manquant.');
      return;
    }
    // Auto-trigger download
    triggerDownload();
  }, [token]);

  function triggerDownload() {
    if (!token) return;
    setStatus('downloading');

    // Use a hidden iframe to trigger the download (keeps user on page)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = `/api/downloads/duerp?token=${encodeURIComponent(token)}`;

    iframe.onload = () => {
      try {
        // If the response is JSON (error), the iframe content will be text
        const content = iframe.contentDocument?.body?.innerText;
        if (content && content.includes('"error"')) {
          const parsed = JSON.parse(content);
          setErrorMsg(parsed.error || 'Erreur de téléchargement.');
          setStatus('error');
        } else {
          setStatus('success');
        }
      } catch {
        setStatus('success');
      }
      setTimeout(() => iframe.remove(), 1000);
    };

    iframe.onerror = () => {
      setErrorMsg('Erreur de connexion.');
      setStatus('error');
      iframe.remove();
    };

    document.body.appendChild(iframe);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-encre-50 to-white py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
        {status === 'downloading' && (
          <>
            <div className="inline-block w-12 h-12 border-4 border-or-200 border-t-or-500 rounded-full animate-spin mb-6"></div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Téléchargement en cours...
            </h1>
            <p className="text-encre-600">
              Votre modèle DUERP est en cours de téléchargement. Veuillez patienter.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-5xl mb-6">✅</div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Téléchargement réussi !
            </h1>
            <p className="text-encre-600 mb-6">
              Votre modèle DUERP a été téléchargé. Si le téléchargement n'a pas démarré automatiquement,
              <button
                onClick={triggerDownload}
                className="text-or-600 hover:underline font-medium ml-1"
              >
                cliquez ici pour réessayer
              </button>.
            </p>
            <div className="bg-encre-50 border border-encre-200 rounded-lg p-4 mb-6 text-sm text-encre-600">
              <p className="mb-2"><strong>Rappel :</strong> Ce document est une trame à compléter et adapter à votre activité.</p>
              <p>Le DUERP doit être mis à jour au moins une fois par an.</p>
            </div>
            <Link
              href="/"
              className="inline-block text-or-600 hover:underline font-medium"
            >
              ← Retour à l'accueil
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-5xl mb-6">❌</div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Téléchargement impossible
            </h1>
            <p className="text-encre-600 mb-6">{errorMsg}</p>
            <p className="text-sm text-encre-500 mb-6">
              Si le problème persiste, vérifiez que votre lien n'a pas expiré (validité : 72 heures)
              et que vous n'avez pas dépassé le nombre maximum de téléchargements (3).
            </p>
            <Link
              href="/contact"
              className="inline-block bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Contacter le support
            </Link>
          </>
        )}

        {status === 'idle' && (
          <div className="inline-block w-12 h-12 border-4 border-or-200 border-t-or-500 rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
