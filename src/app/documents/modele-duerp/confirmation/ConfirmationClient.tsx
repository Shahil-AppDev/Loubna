'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type OrderStatus = 'pending_payment' | 'paid' | 'fulfilled' | 'failed' | 'expired' | 'cancelled' | 'refunded' | 'loading';

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const checkoutReference = searchParams.get('checkout_reference');

  const [status, setStatus] = useState<OrderStatus>('loading');
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState(0);
  const [hasDownloadToken, setHasDownloadToken] = useState(false);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<string | null>(null);
  const [downloadsRemaining, setDownloadsRemaining] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) {
      setError('Identifiant de commande manquant.');
      setStatus('failed');
      return;
    }

    let pollInterval: NodeJS.Timeout;
    let pollCount = 0;

    async function checkStatus() {
      try {
        const response = await fetch(`/api/digital-orders/${orderId}/status`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Erreur lors de la vérification.');
          setStatus('failed');
          return;
        }

        setProductName(data.productName || 'Modèle DUERP');
        setAmount(data.amount || 18.99);
        setStatus(data.status as OrderStatus);
        setHasDownloadToken(data.hasDownloadToken || false);
        setTokenExpiresAt(data.tokenExpiresAt || null);
        setDownloadsRemaining(data.downloadsRemaining || 0);

        // Stop polling if terminal state
        if (data.status === 'fulfilled' || data.status === 'paid' || data.status === 'failed' || data.status === 'expired') {
          clearInterval(pollInterval);
        }

        pollCount++;
        if (pollCount > 30) {
          clearInterval(pollInterval);
        }
      } catch {
        setError('Erreur de connexion au serveur.');
        setStatus('failed');
        clearInterval(pollInterval);
      }
    }

    checkStatus();
    pollInterval = setInterval(checkStatus, 3000);

    return () => clearInterval(pollInterval);
  }, [orderId]);

  const expiryDate = tokenExpiresAt
    ? new Date(tokenExpiresAt).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-encre-50 to-white py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        {/* Loading */}
        {status === 'loading' && (
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-or-200 border-t-or-500 rounded-full animate-spin mb-6"></div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Vérification de votre paiement...
            </h1>
            <p className="text-encre-600">
              Nous confirmons votre paiement auprès de notre prestataire. Cela peut prendre quelques secondes.
            </p>
          </div>
        )}

        {/* Pending */}
        {status === 'pending_payment' && (
          <div className="text-center">
            <div className="text-5xl mb-6">⏳</div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Paiement en cours de traitement
            </h1>
            <p className="text-encre-600 mb-6">
              Votre paiement est en cours de vérification. Cette page s'actualise automatiquement.
            </p>
            <p className="text-sm text-encre-500">
              Référence : {checkoutReference}
            </p>
          </div>
        )}

        {/* Success */}
        {(status === 'fulfilled' || status === 'paid') && (
          <div className="text-center">
            <div className="text-5xl mb-6">✅</div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Votre paiement est confirmé !
            </h1>
            <p className="text-encre-600 mb-6">
              Votre <strong>{productName}</strong> est prêt à être téléchargé.
            </p>

            {hasDownloadToken ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <p className="text-encre-700 mb-2">
                  <strong>Téléchargements restants :</strong> {downloadsRemaining}
                </p>
                {expiryDate && (
                  <p className="text-sm text-encre-600 mb-4">
                    Lien valable jusqu'au : {expiryDate}
                  </p>
                )}
                <p className="text-sm text-encre-600 mb-4">
                  Un e-mail avec votre lien de téléchargement sécurisé a été envoyé à votre adresse.
                </p>
                <p className="text-sm text-encre-500">
                  Consultez votre boîte de réception (et vos spams) pour accéder à votre document.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <p className="text-encre-700">
                  Votre paiement est confirmé. Un e-mail avec le lien de téléchargement est en cours d'envoi.
                </p>
              </div>
            )}

            <Link
              href="/documents/modele-duerp"
              className="inline-block text-or-600 hover:underline font-medium"
            >
              ← Retour à la page du produit
            </Link>
          </div>
        )}

        {/* Failed */}
        {(status === 'failed' || status === 'expired') && (
          <div className="text-center">
            <div className="text-5xl mb-6">❌</div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Le paiement n'a pas pu être confirmé
            </h1>
            <p className="text-encre-600 mb-6">
              {status === 'expired'
                ? 'Le délai de paiement a expiré. Vous pouvez recommencer votre commande.'
                : 'Le paiement a échoué. Aucun téléchargement n\'a été activé.'}
            </p>
            <Link
              href="/documents/modele-duerp"
              className="inline-block bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Recommencer la commande
            </Link>
          </div>
        )}

        {/* Error */}
        {error && status === 'failed' && !orderId && (
          <div className="text-center">
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="font-serif text-2xl font-bold text-encre-900 mb-3">
              Une erreur est survenue
            </h1>
            <p className="text-encre-600 mb-6">{error}</p>
            <Link
              href="/documents/modele-duerp"
              className="inline-block text-or-600 hover:underline font-medium"
            >
              ← Retour
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
