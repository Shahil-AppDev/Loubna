'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

type DocItem = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  status: string;
  is_active: boolean;
  is_featured: boolean;
  is_popular: boolean;
  price_amount: number;
  currency: string;
  format: string;
  page_count: number | null;
  product_type: string;
  target_audience: string;
  category_name: string | null;
  category_slug: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  order_count: number;
  paid_count: number;
  revenue: number;
};

type DigitalOrder = {
  id: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  status: string;
  provider_reference: string | null;
  provider_transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
  product_name?: string;
};

export default function AdminDocumentsPage() {
  const [tab, setTab] = useState<'catalog' | 'orders'>('catalog');
  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [orders, setOrders] = useState<DigitalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadCatalog = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/documents');
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      setDocuments([]);
    }
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/digital-orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (tab === 'catalog') {
      loadCatalog().finally(() => setLoading(false));
    } else {
      loadOrders().finally(() => setLoading(false));
    }
  }, [tab, loadCatalog, loadOrders]);

  async function toggleField(id: string, field: string, value: boolean) {
    try {
      await fetch('/api/admin/documents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: value }),
      });
      loadCatalog();
    } catch {
      // ignore
    }
  }

  async function changeStatus(id: string, status: string) {
    try {
      await fetch('/api/admin/documents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      loadCatalog();
    } catch {
      // ignore
    }
  }

  const totalRevenue = documents.reduce((sum, d) => sum + Number(d.revenue), 0);
  const publishedCount = documents.filter((d) => d.status === 'published').length;
  const draftCount = documents.filter((d) => d.status === 'draft').length;
  const orderRevenue = orders
    .filter((o) => o.status === 'fulfilled' || o.status === 'paid')
    .reduce((sum, o) => sum + Number(o.amount), 0);

  const filteredOrders = orders.filter((order) => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        order.customer_email.toLowerCase().includes(s) ||
        `${order.customer_first_name} ${order.customer_last_name}`.toLowerCase().includes(s) ||
        order.provider_reference?.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const statusColors: Record<string, string> = {
    fulfilled: 'bg-green-100 text-green-800',
    paid: 'bg-green-100 text-green-800',
    pending_payment: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    expired: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-gray-100 text-gray-600',
    refunded: 'bg-orange-100 text-orange-800',
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-600',
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-encre-900 mb-6">
        Documents & ventes
      </h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('catalog')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            tab === 'catalog' ? 'bg-encre-900 text-white' : 'bg-white text-encre-700 border'
          }`}
        >
          Catalogue ({documents.length})
        </button>
        <button
          onClick={() => setTab('orders')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            tab === 'orders' ? 'bg-encre-900 text-white' : 'bg-white text-encre-700 border'
          }`}
        >
          Commandes ({orders.length})
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Documents publiés</p>
          <p className="text-2xl font-bold text-encre-900 mt-1">{publishedCount}</p>
        </div>
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Brouillons</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{draftCount}</p>
        </div>
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Total ventes</p>
          <p className="text-2xl font-bold text-encre-900 mt-1">{orders.length}</p>
        </div>
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Revenu total</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{(tab === 'catalog' ? totalRevenue : orderRevenue).toFixed(2)} €</p>
        </div>
      </div>

      {tab === 'catalog' ? (
        loading ? (
          <p className="text-encre-500">Chargement...</p>
        ) : documents.length === 0 ? (
          <p className="text-encre-500">Aucun document dans le catalogue.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-encre-200 text-left text-encre-500">
                  <th className="py-2 px-3">Document</th>
                  <th className="py-2 px-3">Catégorie</th>
                  <th className="py-2 px-3">Prix</th>
                  <th className="py-2 px-3">Statut</th>
                  <th className="py-2 px-3">Ventes</th>
                  <th className="py-2 px-3">Revenu</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-encre-100 hover:bg-encre-50">
                    <td className="py-2 px-3">
                      <div className="font-medium text-encre-900">{doc.name}</div>
                      <div className="text-xs text-encre-500">/{doc.slug}</div>
                    </td>
                    <td className="py-2 px-3 text-encre-600">{doc.category_name || '—'}</td>
                    <td className="py-2 px-3 font-medium">{Number(doc.price_amount).toFixed(2)} €</td>
                    <td className="py-2 px-3">
                      <select
                        value={doc.status}
                        onChange={(e) => changeStatus(doc.id, e.target.value)}
                        className={`px-2 py-0.5 rounded text-xs font-medium border-0 cursor-pointer ${statusColors[doc.status] || 'bg-gray-100'}`}
                      >
                        <option value="draft">Brouillon</option>
                        <option value="published">Publié</option>
                        <option value="archived">Archivé</option>
                      </select>
                    </td>
                    <td className="py-2 px-3 text-encre-600">{doc.paid_count}</td>
                    <td className="py-2 px-3 text-green-600 font-medium">{Number(doc.revenue).toFixed(2)} €</td>
                    <td className="py-2 px-3">
                      <div className="flex gap-2">
                        <label className="flex items-center gap-1 text-xs">
                          <input
                            type="checkbox"
                            checked={doc.is_active}
                            onChange={(e) => toggleField(doc.id, 'is_active', e.target.checked)}
                          />
                          Actif
                        </label>
                        <label className="flex items-center gap-1 text-xs">
                          <input
                            type="checkbox"
                            checked={doc.is_featured}
                            onChange={(e) => toggleField(doc.id, 'is_featured', e.target.checked)}
                          />
                          Une
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-encre-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="fulfilled">Livrées</option>
              <option value="pending_payment">En attente</option>
              <option value="failed">Échouées</option>
              <option value="expired">Expirées</option>
            </select>
            <input
              type="text"
              placeholder="Rechercher (nom, email, réf.)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-encre-300 rounded px-3 py-2 text-sm flex-1 min-w-[200px]"
            />
          </div>

          {loading ? (
            <p className="text-encre-500">Chargement...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-encre-500">Aucune commande trouvée.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-encre-200 text-left text-encre-500">
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Client</th>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Montant</th>
                    <th className="py-2 px-3">Statut</th>
                    <th className="py-2 px-3">Référence</th>
                    <th className="py-2 px-3">Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-encre-100 hover:bg-encre-50">
                      <td className="py-2 px-3 text-encre-600">
                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-2 px-3 font-medium text-encre-900">
                        {order.customer_first_name} {order.customer_last_name}
                      </td>
                      <td className="py-2 px-3 text-encre-600">{order.customer_email}</td>
                      <td className="py-2 px-3 font-medium">{Number(order.amount).toFixed(2)} €</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-xs text-encre-500">{order.provider_reference || '—'}</td>
                      <td className="py-2 px-3 text-xs text-encre-500">{order.provider_transaction_id || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
