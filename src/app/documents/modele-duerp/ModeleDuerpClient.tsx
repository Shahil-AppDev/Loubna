'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ModeleDuerpClient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!acceptTerms) {
      setError('Vous devez accepter les conditions de vente.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/digital-products/duerp/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, acceptTerms }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erreur lors de la commande.');
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-encre-50 to-white">
      {/* Hero */}
      <section className="bg-encre-950 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <nav className="text-sm text-encre-400 mb-6">
            <Link href="/" className="hover:text-or-500">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-or-500">Documents</span>
            <span className="mx-2">/</span>
            <span className="text-white">Modèle DUERP</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-or-500 mb-4">
            Modèle DUERP à compléter
          </h1>
          <p className="text-lg text-encre-200 max-w-2xl leading-relaxed">
            Document Unique d'Évaluation des Risques Professionnels — trame professionnelle à compléter et adapter à l'activité réelle de votre entreprise.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-3xl font-bold text-white">18,99 €</span>
            <span className="text-sm text-encre-400">Téléchargement immédiat après paiement</span>
            <span className="text-sm bg-or-500 text-white px-3 py-1 rounded-full font-medium">PDF · 20 pages</span>
          </div>
        </div>
      </section>

      {/* Content + Purchase form */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Description */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-encre-900 mb-6">
              Ce que contient ce document
            </h2>
            <ul className="space-y-3 text-encre-700 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold text-lg">✓</span>
                <span>Trame structurée du DUERP conforme aux obligations réglementaires</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold text-lg">✓</span>
                <span>Grille d'évaluation des risques par unité de travail</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold text-lg">✓</span>
                <span>Plan d'action de prévention à compléter</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold text-lg">✓</span>
                <span>Méthodologie de cotation (fréquence, gravité, maîtrise)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-or-500 font-bold text-lg">✓</span>
                <span>Format PDF imprimable, 20 pages</span>
              </li>
            </ul>

            <div className="bg-encre-50 border border-encre-200 rounded-lg p-6 mb-8">
              <h3 className="font-serif text-lg font-semibold text-encre-900 mb-3">
                ⚠️ Avertissement important
              </h3>
              <p className="text-sm text-encre-700 leading-relaxed mb-3">
                Ce document est une <strong>trame à compléter</strong>. Il doit être adapté à l'activité réelle de votre entreprise.
                Le DUERP doit être mis à jour <strong>au moins une fois par an</strong> et à chaque modification des conditions de travail.
              </p>
              <p className="text-sm text-encre-700 leading-relaxed">
                L'évaluation des risques professionnels est une obligation légale pour tous les employeurs (Code du travail, art. R. 4121-1 et suivants).
                Ce modèle ne remplace pas l'accompagnement d'un professionnel pour les situations complexes.
              </p>
            </div>

            <div className="bg-bordeaux-50 border border-bordeaux-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-semibold text-bordeaux-900 mb-3">
                Conditions de vente
              </h3>
              <ul className="text-sm text-encre-700 space-y-2">
                <li>• Paiement sécurisé via SumUp (carte bancaire)</li>
                <li>• Téléchargement disponible immédiatement après confirmation du paiement</li>
                <li>• Lien de téléchargement valable 72 heures, 3 téléchargements maximum</li>
                <li>• Document numérique — <strong>aucun remboursement</strong> après téléchargement</li>
                <li>• En achetant, vous acceptez les <Link href="/cgv-numerique" className="text-or-600 hover:underline">CGV numériques</Link></li>
              </ul>
            </div>
          </div>

          {/* Right: Purchase form */}
          <div className="md:sticky md:top-8 h-fit">
            <div className="bg-white border-2 border-encre-200 rounded-xl p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-encre-900 mb-2">
                Acheter ce document
              </h2>
              <p className="text-sm text-encre-600 mb-6">
                Paiement sécurisé · Téléchargement immédiat
              </p>

              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-encre-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full border border-encre-300 rounded-lg px-4 py-2.5 text-encre-900 focus:ring-2 focus:ring-or-500 focus:border-or-500 outline-none"
                    placeholder="Votre prénom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-encre-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full border border-encre-300 rounded-lg px-4 py-2.5 text-encre-900 focus:ring-2 focus:ring-or-500 focus:border-or-500 outline-none"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-encre-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-encre-300 rounded-lg px-4 py-2.5 text-encre-900 focus:ring-2 focus:ring-or-500 focus:border-or-500 outline-none"
                    placeholder="vous@exemple.com"
                  />
                  <p className="text-xs text-encre-500 mt-1">
                    Le lien de téléchargement sera envoyé à cette adresse.
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-or-500"
                  />
                  <span className="text-sm text-encre-700">
                    J'accepte les <Link href="/cgv-numerique" className="text-or-600 hover:underline">conditions générales de vente numériques</Link> et comprends qu'aucun remboursement n'est possible après téléchargement.
                  </span>
                </label>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !acceptTerms}
                  className="w-full bg-or-500 hover:bg-or-600 disabled:bg-encre-300 text-white font-semibold py-3.5 rounded-lg transition-colors text-lg"
                >
                  {loading ? 'Redirection...' : 'Acheter — 18,99 €'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-encre-200">
                <p className="text-xs text-encre-500 text-center">
                  🔒 Paiement 100% sécurisé par SumUp<br />
                  Vos données ne sont jamais partagées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Modèle DUERP à compléter",
            description: "Document Unique d'Évaluation des Risques Professionnels — trame à compléter et adapter à votre activité. Format PDF, 20 pages.",
            brand: { "@type": "Brand", name: "Loubna Abouz Manta" },
            offers: {
              "@type": "Offer",
              price: "18.99",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: "https://juriste-droit-du-travail.com/documents/modele-duerp",
            },
          }),
        }}
      />
    </div>
  );
}
