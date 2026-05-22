'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

type PaymentState = 'loading' | 'paid' | 'pending' | 'failed';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const checkoutReference = searchParams.get('checkout_reference');
  const appointmentId = searchParams.get('appointment_id');

  const [state, setState] = useState<PaymentState>('loading');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!checkoutReference) {
      setState('failed');
      return;
    }

    const MAX_ATTEMPTS = 6;
    const INTERVAL_MS = 3000;

    async function checkStatus() {
      try {
        const params = new URLSearchParams({ checkout_reference: checkoutReference! });
        if (appointmentId) params.set('appointment_id', appointmentId);

        const res = await fetch(`/api/payments/sumup/status/?${params.toString()}`);
        if (!res.ok) {
          setState('failed');
          return;
        }

        const data = await res.json();

        if (data.status === 'PAID') {
          setState('paid');
        } else if (data.status === 'FAILED' || data.status === 'EXPIRED') {
          setState('failed');
        } else {
          // PENDING — réessayer
          setAttempts((prev) => prev + 1);
        }
      } catch {
        setState('failed');
      }
    }

    checkStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutReference]);

  // Polling si PENDING
  useEffect(() => {
    if (state !== 'loading' || attempts === 0) return;
    if (attempts >= 6) {
      setState('pending');
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ checkout_reference: checkoutReference! });
        if (appointmentId) params.set('appointment_id', appointmentId);

        const res = await fetch(`/api/payments/sumup/status/?${params.toString()}`);
        if (!res.ok) { setState('failed'); return; }

        const data = await res.json();
        if (data.status === 'PAID') setState('paid');
        else if (data.status === 'FAILED' || data.status === 'EXPIRED') setState('failed');
        else setAttempts((prev) => prev + 1);
      } catch {
        setState('failed');
      }
    }, 3000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts, state]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-encre-50">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-encre-700">Vérification du paiement en cours…</p>
        </div>
      </div>
    );
  }

  if (state === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-encre-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-serif text-2xl font-bold text-encre-900 mb-4">
            Paiement non confirmé
          </h1>
          <p className="text-encre-700 mb-6">
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

  if (state === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-encre-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🕐</div>
          <h1 className="font-serif text-2xl font-bold text-encre-900 mb-4">
            Paiement en cours de traitement
          </h1>
          <p className="text-encre-700 mb-6">
            Votre paiement est en cours de validation. Vous recevrez un email de confirmation sous peu.
            Si le problème persiste, contactez-nous.
          </p>
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
    );
  }

  // state === 'paid'
  return (
    <div className="min-h-screen flex items-center justify-center bg-encre-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-serif text-3xl font-bold text-encre-900 mb-4">
            Rendez-vous confirmé !
          </h1>
          <p className="text-lg text-encre-700 mb-8">
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
        <div className="text-encre-700">Chargement…</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
