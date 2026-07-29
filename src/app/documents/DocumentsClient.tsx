'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { DOCUMENT_CATEGORIES, DOCUMENT_AUDIENCE_LABELS, DISCLAIMER_GENERAL } from '@/data/document-categories';

type Document = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  target_audience: string;
  format: string;
  page_count: number | null;
  price_amount: number;
  currency: string;
  product_type: string;
  is_featured: boolean;
  is_popular: boolean;
  tags: string[];
  category_name: string | null;
  category_slug: string | null;
};

export default function DocumentsClient() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Document[] | null>(null);
  const [filterAudience, setFilterAudience] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [storeDisabled, setStoreDisabled] = useState(false);

  const loadCatalog = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterAudience) params.set('audience', filterAudience);
      if (filterCategory) params.set('category', filterCategory);
      const res = await fetch(`/api/documents/catalog?${params.toString()}`);
      const data = await res.json();
      if (data.disabled) {
        setStoreDisabled(true);
        setDocuments([]);
        return;
      }
      setStoreDisabled(false);
      setDocuments(data.documents || []);
    } catch {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [filterAudience, filterCategory]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults(null);
      return;
    }
    try {
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      if (filterAudience) params.set('audience', filterAudience);
      if (filterCategory) params.set('category', filterCategory);
      const res = await fetch(`/api/documents/search?${params.toString()}`);
      const data = await res.json();
      setSearchResults(data.documents || []);
    } catch {
      setSearchResults([]);
    }
  }

  function clearSearch() {
    setSearchQuery('');
    setSearchResults(null);
  }

  const displayed = searchResults !== null ? searchResults : documents;
  const popularDocs = documents.filter((d) => d.is_popular || d.is_featured);
  const featuredDocs = documents.filter((d) => d.is_featured);

  if (storeDisabled) {
    return (
      <div className="min-h-screen bg-encre-950 flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
            Documents en droit du travail
          </h1>
          <p className="text-encre-300 leading-relaxed mb-6">
            La boutique de documents est actuellement en préparation. Elle sera bientôt disponible.
          </p>
          <Link href="/" className="inline-block bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-encre-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-encre-950 via-encre-900 to-encre-950 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-encre-400 mb-6">
            <Link href="/" className="hover:text-or-500">Accueil</Link>
            <span className="mx-1">/</span>
            <span className="text-white">Documents</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Documents en droit du travail
          </h1>
          <p className="text-lg text-encre-200 max-w-2xl leading-relaxed mb-8">
            Modèles, courriers et outils à télécharger. DUERP, prévention des risques, procédures disciplinaires, AT/MP et courriers professionnels.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un document (ex: avertissement, DUERP, salaire...)"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-encre-900 placeholder:text-encre-400 focus:outline-none focus:ring-2 focus:ring-or-500"
            />
            <button
              type="submit"
              className="bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Rechercher
            </button>
          </form>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => { setFilterAudience(''); setFilterCategory(''); }}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                !filterAudience && !filterCategory ? 'bg-or-500 text-white' : 'bg-encre-800 text-encre-300 hover:bg-encre-700'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => { setFilterAudience('salarie'); setFilterCategory(''); }}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                filterAudience === 'salarie' ? 'bg-or-500 text-white' : 'bg-encre-800 text-encre-300 hover:bg-encre-700'
              }`}
            >
              Salariés
            </button>
            <button
              onClick={() => { setFilterAudience('employeur'); setFilterCategory(''); }}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                filterAudience === 'employeur' ? 'bg-or-500 text-white' : 'bg-encre-800 text-encre-300 hover:bg-encre-700'
              }`}
            >
              Employeurs
            </button>
            {DOCUMENT_CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat.slug}
                onClick={() => { setFilterCategory(cat.slug); setFilterAudience(''); }}
                className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                  filterCategory === cat.slug ? 'bg-or-500 text-white' : 'bg-encre-800 text-encre-300 hover:bg-encre-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {searchResults !== null && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-encre-400">
                {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} pour «&nbsp;{searchQuery}&nbsp;»
              </span>
              <button onClick={clearSearch} className="text-sm text-or-500 hover:text-or-400">
                ✕ Effacer
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Featured documents */}
        {searchResults === null && !filterCategory && featuredDocs.length > 0 && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-6">Documents à la une</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredDocs.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        )}

        {/* Categories grid */}
        {searchResults === null && !filterAudience && !filterCategory && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-6">Par catégorie</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {DOCUMENT_CATEGORIES.filter((c) => c.slug !== 'packs-thematiques').map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/documents?category=${cat.slug}`}
                  onClick={() => { setFilterCategory(cat.slug); setFilterAudience(''); }}
                  className="block p-5 bg-encre-900 rounded-lg border border-encre-800 hover:border-or-500 transition-colors group"
                >
                  <h3 className="font-semibold text-white group-hover:text-or-500 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-encre-400 mt-2 line-clamp-2">{cat.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All documents / search results */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            {searchResults !== null ? 'Résultats de recherche' : filterCategory ? DOCUMENT_CATEGORIES.find((c) => c.slug === filterCategory)?.name || 'Documents' : 'Tous les documents'}
          </h2>

          {loading ? (
            <p className="text-encre-400">Chargement...</p>
          ) : displayed.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-encre-400 mb-4">Aucun document trouvé.</p>
              <p className="text-sm text-encre-500 mb-6">Vous cherchez autre chose ? Contactez-moi directement.</p>
              <Link href="/contact" className="inline-block bg-or-500 hover:bg-or-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Prendre contact
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-encre-900 rounded-lg border border-encre-800">
          <div className="flex items-start gap-3">
            <span className="text-or-500 text-xl">ℹ️</span>
            <div>
              <h3 className="font-semibold text-white mb-2">Information importante</h3>
              <p className="text-sm text-encre-300 leading-relaxed">{DISCLAIMER_GENERAL}</p>
              <p className="text-sm text-encre-400 mt-2">
                Loubna Abouz Manta est juriste en droit du travail. Les documents proposés sont des modèles généraux d'information et de rédaction, et non des consultations juridiques réglementées.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-4">Besoin d'un accompagnement personnalisé ?</h2>
          <p className="text-encre-300 mb-6">Au-delà des modèles, je propose un accompagnement adapté à votre situation.</p>
          <Link href="/rendez-vous" className="inline-block bg-or-500 hover:bg-or-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg">
            Être accompagné(e)
          </Link>
        </div>
      </section>
    </div>
  );
}

function DocumentCard({ doc }: { doc: Document }) {
  const audienceLabel = DOCUMENT_AUDIENCE_LABELS[doc.target_audience] || '';
  const priceLabel = `${Number(doc.price_amount).toFixed(2).replace('.', ',')} €`;

  return (
    <Link
      href={`/documents/${doc.slug}`}
      className="block p-6 bg-encre-900 rounded-lg border border-encre-800 hover:border-or-500 transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-or-500 bg-or-500/10 px-2 py-1 rounded">{doc.format}</span>
        <span className="text-xs text-encre-500">{audienceLabel}</span>
      </div>
      <h3 className="font-serif text-lg font-bold text-white group-hover:text-or-500 transition-colors mb-2">
        {doc.name}
      </h3>
      {doc.subtitle && (
        <p className="text-sm text-encre-400 mb-3 line-clamp-2">{doc.subtitle}</p>
      )}
      {doc.description && (
        <p className="text-sm text-encre-500 line-clamp-3 mb-4">{doc.description}</p>
      )}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-encre-800">
        <span className="text-lg font-bold text-or-500">{priceLabel}</span>
        <span className="text-sm text-encre-400 group-hover:text-or-500 transition-colors">
          Découvrir →
        </span>
      </div>
    </Link>
  );
}
