'use client';

import { useEffect, useState } from 'react';
import { AppointmentWithService } from '@/types/database';
import Link from 'next/link';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentWithService[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{
    status?: string;
    payment_status?: string;
  }>({});

  useEffect(() => {
    loadAppointments();
  }, [filter]);

  async function loadAppointments() {
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.payment_status) params.append('payment_status', filter.payment_status);

      const response = await fetch(`/api/appointments?${params.toString()}`);
      const data = await response.json();
      
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateAppointmentStatus(id: string, status: string) {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        loadAppointments();
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-encre-500">Chargement...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-encre-900">Rendez-vous</h1>
          <p className="text-encre-600 mt-2">Gérez tous vos rendez-vous</p>
        </div>
        <div className="text-2xl font-bold text-encre-900">
          {appointments.length} RDV
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-encre-200 p-4 mb-6">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-encre-700 mb-2">
              Statut
            </label>
            <select
              value={filter.status || ''}
              onChange={(e) => setFilter({ ...filter, status: e.target.value || undefined })}
              className="px-4 py-2 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
            >
              <option value="">Tous</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="paid">Payé</option>
              <option value="cancelled">Annulé</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-encre-700 mb-2">
              Paiement
            </label>
            <select
              value={filter.payment_status || ''}
              onChange={(e) => setFilter({ ...filter, payment_status: e.target.value || undefined })}
              className="px-4 py-2 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
            >
              <option value="">Tous</option>
              <option value="unpaid">Non payé</option>
              <option value="paid">Payé</option>
              <option value="refunded">Remboursé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg border border-encre-200 overflow-hidden">
        {appointments.length === 0 ? (
          <div className="text-center py-12 text-encre-500">
            Aucun rendez-vous trouvé
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-encre-50 border-b border-encre-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-encre-700 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-encre-700 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-encre-700 uppercase tracking-wider">
                    Date & Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-encre-700 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-encre-700 uppercase tracking-wider">
                    Paiement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-encre-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-encre-100">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-encre-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-encre-900">{appointment.client_name}</div>
                      <div className="text-sm text-encre-600">{appointment.client_email}</div>
                      {appointment.client_phone && (
                        <div className="text-sm text-encre-500">{appointment.client_phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-encre-900">
                        {appointment.service?.name || 'N/A'}
                      </div>
                      <div className="text-xs text-encre-600">
                        {appointment.duration_minutes} min
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-encre-900">
                        {new Date(appointment.appointment_date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-encre-600">
                        {new Date(appointment.appointment_date).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={appointment.status}
                        onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                          appointment.status === 'confirmed' || appointment.status === 'paid'
                            ? 'bg-blue-100 text-blue-800'
                            : appointment.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : appointment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="paid">Payé</option>
                        <option value="cancelled">Annulé</option>
                        <option value="completed">Terminé</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.payment_status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : appointment.payment_status === 'refunded'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {appointment.payment_status === 'paid' ? 'Payé' : 
                         appointment.payment_status === 'refunded' ? 'Remboursé' : 'Non payé'}
                      </span>
                      {appointment.service && (
                        <div className="text-xs text-encre-600 mt-1">
                          {(appointment.service.price_cents / 100).toFixed(2)} €
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="text-xs px-3 py-1 bg-encre-900 text-white rounded hover:bg-encre-800 transition-colors"
                          onClick={() => {
                            const notes = prompt('Notes admin:', appointment.admin_notes || '');
                            if (notes !== null) {
                              fetch(`/api/appointments/${appointment.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ admin_notes: notes }),
                              }).then(() => loadAppointments());
                            }
                          }}
                        >
                          Notes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
