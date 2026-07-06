'use client';

import { AppointmentWithService } from '@/types/database';
import { useEffect, useState } from 'react';

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

  async function updateAppointmentStatus(id: string, status: string, paymentStatus?: string) {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, payment_status: paymentStatus }),
      });

      if (response.ok) {
        loadAppointments();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  }

  async function resendPaymentLink(appointment: AppointmentWithService) {
    if (!appointment.sumup_checkout_id) {
      alert('Aucun checkout SumUp associé à ce rendez-vous.');
      return;
    }

    const confirmed = confirm(
      `Renvoyer le lien de paiement à ${appointment.client_email} ?`
    );
    if (!confirmed) return;

    try {
      const response = await fetch('/api/payments/sumup/create-checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointment_id: appointment.id,
          service_id: appointment.service?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.open(data.url, '_blank');
        }
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la création du lien');
      }
    } catch (error) {
      console.error('Error resending payment link:', error);
      alert('Une erreur est survenue');
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
      <div className="admin-panel p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="admin-label">Statut</label>
            <select
              value={filter.status || ''}
              onChange={(e) => setFilter({ ...filter, status: e.target.value || undefined })}
              className="admin-input"
              title="Filtrer par statut"
            >
              <option value="">Tous</option>
              <option value="pending_payment">Paiement en attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="cancelled">Annulé</option>
              <option value="expired">Expiré</option>
              <option value="failed">Échec</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Paiement</label>
            <select
              value={filter.payment_status || ''}
              onChange={(e) => setFilter({ ...filter, payment_status: e.target.value || undefined })}
              className="admin-input"
              title="Filtrer par statut de paiement"
            >
              <option value="">Tous</option>
              <option value="pending">En attente</option>
              <option value="paid">Payé</option>
              <option value="failed">Échec</option>
              <option value="cancelled">Annulé</option>
              <option value="refunded">Remboursé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="admin-panel overflow-hidden">
        {appointments.length === 0 ? (
          <div className="text-center py-12 text-encre-500">
            Aucun rendez-vous trouvé
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-encre-50 border-b border-encre-200">
                <tr>
                  {['Client', 'Service', 'Date & Heure', 'Statut', 'Paiement', 'Actions'].map(h => (
                    <th key={h} className="admin-th">{h}</th>
                  ))}
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
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          if (newStatus === 'confirmed' && appointment.payment_status !== 'paid') {
                            const force = confirm(
                              '⚠ ATTENTION: Un rendez-vous ne doit pas être validé sans paiement confirmé.\n\n' +
                              'Voulez-vous vraiment forcer la confirmation ET marquer le paiement comme payé ?'
                            );
                            if (force) {
                              updateAppointmentStatus(appointment.id, newStatus, 'paid');
                            }
                          } else {
                            updateAppointmentStatus(appointment.id, newStatus);
                          }
                        }}
                        className="admin-input py-1 text-xs"
                        title="Modifier le statut du rendez-vous"
                      >
                        <option value="pending_payment">Paiement en attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="cancelled">Annulé</option>
                        <option value="expired">Expiré</option>
                        <option value="failed">Échec</option>
                        <option value="completed">Terminé</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`admin-badge ${
                        appointment.payment_status === 'paid'
                          ? 'admin-badge-paid'
                          : appointment.payment_status === 'refunded'
                          ? 'admin-badge-refunded'
                          : appointment.payment_status === 'failed'
                          ? 'admin-badge-unpaid'
                          : 'admin-badge-pending'
                      }`}>
                        {appointment.payment_status === 'paid' ? 'Payé' :
                          appointment.payment_status === 'refunded' ? 'Remboursé' :
                          appointment.payment_status === 'failed' ? 'Échec' :
                          appointment.payment_status === 'cancelled' ? 'Annulé' :
                          'En attente'}
                      </span>
                      {appointment.service && (
                        <div className="text-xs text-encre-600 mt-1">
                          {(appointment.service.price_cents / 100).toFixed(2)} €
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {appointment.status === 'pending_payment' && (
                          <button
                            className="text-xs px-3 py-1 bg-or-500 text-white rounded hover:bg-or-600 transition-colors"
                            onClick={() => resendPaymentLink(appointment)}
                            title="Renvoyer le lien de paiement au client"
                          >
                            Renvoyer paiement
                          </button>
                        )}
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
    </div >
  );
}
