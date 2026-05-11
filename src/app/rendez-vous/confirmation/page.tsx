'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Le webhook Stripe aura déjà mis à jour le rendez-vous
      setSuccess(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-encre-50">
        <div className="text-encre-500">Vérification du paiement...</div>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-encre-50">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-serif text-2xl font-bold text-encre-900 mb-4">
            Erreur
          </h1>
          <p className="text-encre-600 mb-6">
            Une erreur est survenue lors de la confirmation de votre paiement.
          </p>
          <Link href="/rendez-vous" className="btn btn-primary">
            Réessayer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-encre-50">
      <div className="max-w-2xl mx-auto text-center px-6">
        <div className="bg-white rounded-lg border border-encre-200 p-12">
          <div className="text-6xl mb-6">✅</div>
          
          <h1 className="font-serif text-3xl font-bold text-encre-900 mb-4">
            Rendez-vous confirmé !
          </h1>
          
          <p className="text-encre-600 mb-8 leading-relaxed">
            Votre paiement a été effectué avec succès. Vous allez recevoir un email de confirmation 
            à l&apos;adresse que vous avez indiquée avec tous les détails de votre rendez-vous.
          </p>

          <div className="bg-encre-50 border border-encre-200 rounded-lg p-6 mb-8">
            <h2 className="font-serif text-lg font-semibold text-encre-900 mb-3">
              Prochaines étapes
            </h2>
            <ul className="text-left space-y-2 text-sm text-encre-700">
              <li className="flex items-start gap-2">
                <span className="text-or-500 mt-1">•</span>
                <span>Vous recevrez un email de confirmation dans quelques minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-or-500 mt-1">•</span>
                <span>Un rappel vous sera envoyé 24h avant le rendez-vous</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-or-500 mt-1">•</span>
                <span>Le rendez-vous se déroulera en visioconférence (lien envoyé par email)</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              Retour à l&apos;accueil
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
