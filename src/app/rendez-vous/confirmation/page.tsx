'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (sessionId) {
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
      <div className="min-h-screen flex items-center justify-center bg-encre-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-serif text-2xl font-bold text-encre-900 mb-4">
            Paiement non confirmé
          </h1>
          <p className="text-encre-600 mb-6">
            Nous n&apos;avons pas pu confirmer votre paiement. Si vous avez été débité, veuillez nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rendez-vous" className="btn btn-primary">
              Réessayer
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-encre-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-serif text-3xl font-bold text-encre-900 mb-4">
            Rendez-vous confirmé !
          </h1>
          <p className="text-lg text-encre-600 mb-8">
            Votre paiement a été accepté et votre rendez-vous est confirmé.
          </p>

          <div className="bg-encre-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-serif text-xl font-bold text-encre-900 mb-4">
              Prochaines étapes
            </h2>
            <ul className="space-y-3 text-encre-700">
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold">1.</span>
                <span>Vous allez recevoir un email de confirmation avec tous les détails</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold">2.</span>
                <span>Un rappel vous sera envoyé 24h avant le rendez-vous</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold">3.</span>
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

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-encre-50">
        <div className="text-encre-500">Chargement...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
