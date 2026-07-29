'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DOCUMENT_AUDIENCE_LABELS, DISCLAIMER_GENERAL } from '@/data/document-categories';

type Faq = { question: string; answer: string; sort_order: number };
type RelatedDoc = { slug: string; name: string; subtitle: string | null; price_amount: number; format: string; page_count: number | null };

type DocumentDetail = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  usage_description: string | null;
  target_audience: string;
  format: string;
  page_count: number | null;
  price_amount: number;
  currency: string;
  product_type: string;
  version: string;
  tags: string[];
  synonyms: string[];
  disclaimer: string | null;
  last_reviewed_at: string | null;
  author: string | null;
  category_name: string | null;
  category_slug: string | null;
  faqs: Faq[];
  related: RelatedDoc[];
};

export default function DocumentDetailClient({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const [doc, setDoc] = useState<DocumentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Checkout form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/documents/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('Document introuvable ou non publié.');
          } else {
            setError('Erreur lors du chargement.');
          }
          return;
        }
        const data = await res.json();
        setDoc(data.document);
      } catch {
        setError('Erreur de connexion.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setCheckoutError(null);

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setCheckoutError('Prénom, nom et e-mail sont requis.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCheckoutError('Adresse e-mail invalide.');
      return;
    }
    if (!acceptTerms) {
      setCheckoutError('Vous devez accepter les conditions de vente.');
      return;
    }

    setSubmitting(true);
    try {
      // Use the generic checkout endpoint (falls back to DUERP-specific for modele-duerp)
      const endpoint = slug === 'modele-duerp'
        ? '/api/digital-products/duerp/checkout'
        : '/api/documents/checkout';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, firstName, lastName, email, acceptTerms }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCheckoutError(data.error || 'Erreur lors du paiement.');
        return;
      }

      // Redirect to SumUp hosted checkout
      window.location.href = data.url;
    } catch {
      setCheckoutError('Erreur de connexion.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-encre-950 flex items-center justify-center">
        <div className="text-encre-500">Chargement...</div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="min-h-screen bg-encre-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-encre-400 mb-4">{error || 'Document introuvable.'}</p>
          <Link href="/documents" className="text-or-500 hover:text-or-400">
            ← Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const priceLabel = `${Number(doc.price_amount).toFixed(2).replace('.', ',')} €`;
  const audienceLabel = DOCUMENT_AUDIENCE_LABELS[doc.target_audience] || '';
  const hasFile = doc.slug === 'modele-duerp'; // Only DUERP has a file for now

  return (
    <div className="min-h-screen bg-encre-950">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-encre-400">
          <Link href="/" className="hover:text-or-500">Accueil</Link>
          <span>/</span>
          <Link href="/documents" className="hover:text-or-500">Documents</Link>
          {doc.category_slug && (
            <>
              <span>/</span>
              <Link href={`/documents?category=${doc.category_slug}`} className="hover:text-or-500">
                {doc.category_name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white">{doc.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium text-or-500 bg-or-500/10 px-2 py-1 rounded">{doc.format}</span>
          {doc.page_count && <span className="text-xs text-encre-400">{doc.page_count} pages</span>}
          <span className="text-xs text-encre-400">•</span>
          <span className="text-xs text-encre-400">{audienceLabel}</span>
          {doc.version && (
            <>
              <span className="text-xs text-encre-400">•</span>
              <span className="text-xs text-encre-400">v{doc.version}</span>
            </>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">{doc.name}</h1>
        {doc.subtitle && <p className="text-lg text-encre-300 mb-6">{doc.subtitle}</p>}

        {/* Tags */}
        {doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {doc.tags.map((tag) => (
              <span key={tag} className="text-xs text-encre-400 bg-encre-800 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Content + Purchase sidebar */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {doc.description && (
              <div>
                <h2 className="font-serif text-xl font-bold text-white mb-3">Description</h2>
                <p className="text-encre-300 leading-relaxed">{doc.description}</p>
              </div>
            )}

            {doc.usage_description && (
              <div>
                <h2 className="font-serif text-xl font-bold text-white mb-3">Quand l'utiliser ?</h2>
                <p className="text-encre-300 leading-relaxed">{doc.usage_description}</p>
              </div>
            )}

            {/* What's included */}
            <div className="p-5 bg-encre-900 rounded-lg border border-encre-800">
              <h3 className="font-semibold text-white mb-3">Ce que vous obtenez</h3>
              <ul className="space-y-2 text-sm text-encre-300">
                <li className="flex items-start gap-2">
                  <span className="text-or-500">✓</span>
                  <span>Document au format {doc.format}{doc.page_count ? ` (${doc.page_count} pages)` : ''}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-or-500">✓</span>
                  <span>Téléchargement immédiat après paiement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-or-500">✓</span>
                  <span>Lien de téléchargement sécurisé valable 72h (3 téléchargements max)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-or-500">✓</span>
                  <span>Modèle à compléter et adapter à votre situation</span>
                </li>
              </ul>
            </div>

            {/* FAQs */}
            {doc.faqs.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-white mb-4">Questions fréquentes</h2>
                <div className="space-y-4">
                  {doc.faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-encre-900 rounded-lg border border-encre-800 overflow-hidden">
                      <summary className="cursor-pointer p-4 font-medium text-white flex items-center justify-between">
                        {faq.question}
                        <span className="text-or-500 transition-transform group-open:rotate-180">▼</span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-encre-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-5 bg-encre-900/50 rounded-lg border border-encre-800/50">
              <div className="flex items-start gap-3">
                <span className="text-or-500">ℹ️</span>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-2">Bon à savoir</h3>
                  <p className="text-sm text-encre-400 leading-relaxed">
                    {doc.disclaimer || DISCLAIMER_GENERAL}
                  </p>
                  {doc.last_reviewed_at && (
                    <p className="text-xs text-encre-500 mt-2">
                      Dernière révision : {new Date(doc.last_reviewed_at).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Purchase sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-6 bg-encre-900 rounded-lg border border-encre-800">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-or-500">{priceLabel}</p>
                <p className="text-sm text-encre-400 mt-1">Téléchargement immédiat</p>
              </div>

              {hasFile ? (
                <>
                  {!showCheckout ? (
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-or-500 hover:bg-or-600 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Acheter ce document
                    </button>
                  ) : (
                    <form onSubmit={handleCheckout} className="space-y-3">
                      <div>
                        <label className="text-xs text-encre-400 block mb-1">Prénom</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded bg-encre-800 text-white border border-encre-700 focus:outline-none focus:border-or-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-encre-400 block mb-1">Nom</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded bg-encre-800 text-white border border-encre-700 focus:outline-none focus:border-or-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-encre-400 block mb-1">E-mail</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded bg-encre-800 text-white border border-encre-700 focus:outline-none focus:border-or-500"
                        />
                      </div>
                      <label className="flex items-start gap-2 text-xs text-encre-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="mt-0.5"
                        />
                        <span>
                          J'accepte les{' '}
                          <Link href="/cgv-numerique" className="text-or-500 underline" target="_blank">
                            CGV numériques
                          </Link>{' '}
                          et reconnais que ce document est un modèle à adapter.
                        </span>
                      </label>

                      {checkoutError && (
                        <p className="text-sm text-red-400">{checkoutError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-or-500 hover:bg-or-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
                      >
                        {submitting ? 'Redirection...' : `Payer ${priceLabel}`}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="w-full text-sm text-encre-400 hover:text-white"
                      >
                        Annuler
                      </button>
                    </form>
                  )}

                  <div className="mt-4 pt-4 border-t border-encre-800 space-y-2 text-xs text-encre-500">
                    <p className="flex items-center gap-2"><span>🔒</span> Paiement sécurisé SumUp</p>
                    <p className="flex items-center gap-2"><span>⚡</span> Téléchargement immédiat</p>
                    <p className="flex items-center gap-2"><span>📧</span> Lien envoyé par e-mail</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-encre-400 mb-4">
                    Ce document sera bientôt disponible au téléchargement.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block text-sm text-or-500 hover:text-or-400"
                  >
                    Être notifié de sa disponibilité
                  </Link>
                </div>
              )}

              {/* Related documents */}
              {doc.related.length > 0 && (
                <div className="mt-6 pt-6 border-t border-encre-800">
                  <h4 className="text-sm font-semibold text-white mb-3">Documents complémentaires</h4>
                  <div className="space-y-2">
                    {doc.related.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/documents/${rel.slug}`}
                        className="block text-sm text-encre-400 hover:text-or-500 transition-colors"
                      >
                        {rel.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
