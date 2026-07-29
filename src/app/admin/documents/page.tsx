'use client';

import { useEffect, useState } from 'react';

type DigitalOrder = {
  id: string;
  product_id: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  status: string;
  payment_provider: string;
  provider_reference: string | null;
  provider_transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  product_name?: string;
};

export default function AdminDocumentsPage() {
  const [orders, setOrders] = useState<DigitalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const response = await fetch('/api/admin/digital-orders');
      const data = await response.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Error loading digital orders:', err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = orders.filter((order) => {
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

  const totalRevenue = orders
    .filter((o) => o.status === 'fulfilled' || o.status === 'paid')
    .reduce((sum, o) => sum + Number(o.amount), 0);

  const statusColors: Record<string, string> = {
    fulfilled: 'bg-green-100 text-green-800',
    paid: 'bg-green-100 text-green-800',
    pending_payment: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    expired: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-gray-100 text-gray-600',
    refunded: 'bg-orange-100 text-orange-800',
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-encre-900 mb-6">
        Ventes de documents numériques
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Total ventes</p>
          <p className="text-2xl font-bold text-encre-900 mt-1">{orders.length}</p>
        </div>
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Revenu total</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{totalRevenue.toFixed(2)} €</p>
        </div>
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">En attente</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {orders.filter((o) => o.status === 'pending_payment').length}
          </p>
        </div>
        <div className="admin-panel p-4">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Échouées</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {orders.filter((o) => o.status === 'failed' || o.status === 'expired').length}
          </p>
        </div>
      </div>

      {/* Filters */}
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

      {/* Table */}
      {loading ? (
        <p className="text-encre-500">Chargement...</p>
      ) : filtered.length === 0 ? (
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
              {filtered.map((order) => (
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
    </div>
  );
}
