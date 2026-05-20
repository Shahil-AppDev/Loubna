'use client';

import { useEffect, useState } from 'react';

type Lead = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  admin_notes?: string;
  created_at: string;
};

export default function AdminLeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);

  async function load() {
    const res = await fetch('/api/admin/cms/leads');
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateLead(id: string, status: string) {
    await fetch('/api/admin/cms/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-encre-900">Leads & Contact</h1>
        <p className="text-encre-600 mt-2">Suivi des demandes clients, statuts et priorisation.</p>
      </div>

      <div className="grid gap-4">
        {items.map((lead) => (
          <div key={lead.id} className="bg-white border rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-semibold">{lead.first_name} {lead.last_name}</div>
                <div className="text-sm text-encre-600 break-all">{lead.email}</div>
              </div>
              <select
                value={lead.status}
                aria-label="Mettre a jour le statut du lead"
                onChange={(e) => updateLead(lead.id, e.target.value)}
                className="border rounded px-2 py-1 text-sm min-w-[130px]"
              >
                <option value="new">Nouveau</option>
                <option value="in_progress">En cours</option>
                <option value="closed">Traite</option>
              </select>
            </div>
            <div className="mt-2 font-medium">{lead.subject}</div>
            <p className="text-sm text-encre-700 mt-1 whitespace-pre-wrap">{lead.message}</p>
            {lead.phone && <div className="text-sm text-encre-600 mt-2">Tel: {lead.phone}</div>}
            <div className="text-xs text-encre-500 mt-2">
              Recu le {new Date(lead.created_at).toLocaleString('fr-FR')}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-encre-500 bg-white border rounded-lg p-6">
            Aucun lead pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}

