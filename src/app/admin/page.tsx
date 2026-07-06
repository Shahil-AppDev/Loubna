'use client';

import { useEffect, useState } from 'react';
import { AppointmentWithService } from '@/types/database';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    pending: 0,
    paid: 0,
    revenue: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState<AppointmentWithService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      
      if (data.appointments) {
        const appointments = data.appointments;
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const todayCount = appointments.filter((apt: AppointmentWithService) => 
          new Date(apt.appointment_date) >= today
        ).length;

        const weekCount = appointments.filter((apt: AppointmentWithService) => 
          new Date(apt.appointment_date) >= weekAgo
        ).length;

        const monthCount = appointments.filter((apt: AppointmentWithService) => 
          new Date(apt.appointment_date) >= monthAgo
        ).length;

        const pendingCount = appointments.filter((apt: AppointmentWithService) => 
          apt.status === 'pending_payment'
        ).length;

        const paidCount = appointments.filter((apt: AppointmentWithService) => 
          apt.payment_status === 'paid'
        ).length;

        const revenue = appointments
          .filter((apt: AppointmentWithService) => apt.payment_status === 'paid')
          .reduce((sum: number, apt: AppointmentWithService) => {
            return sum + (apt.service?.price_cents || 0);
          }, 0);

        setStats({
          today: todayCount,
          thisWeek: weekCount,
          thisMonth: monthCount,
          pending: pendingCount,
          paid: paidCount,
          revenue: revenue / 100,
        });

        setRecentAppointments(appointments.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
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
      <div className="mb-8">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard title="Aujourd'hui"       value={stats.today}                        icon="📅" accent="default" />
        <StatCard title="Cette semaine"     value={stats.thisWeek}                     icon="📊" accent="default" />
        <StatCard title="Ce mois"           value={stats.thisMonth}                    icon="📈" accent="default" />
        <StatCard title="En attente"        value={stats.pending}                      icon="⏳" accent="rouge" />
        <StatCard title="Payés"             value={stats.paid}                         icon="✅" accent="default" />
        <StatCard title="Chiffre d'affaires" value={`${stats.revenue.toFixed(2)} €`}  icon="💰" accent="gold" />
      </div>

      {/* Recent Appointments */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2 className="admin-panel-title">Rendez-vous récents</h2>
        </div>
        <div className="p-6">
          {recentAppointments.length === 0 ? (
            <p className="text-encre-700 text-sm text-center py-8">Aucun rendez-vous</p>
          ) : (
            <div className="divide-y divide-encre-100">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 hover:bg-encre-50/50 -mx-2 px-2 transition-colors rounded-sm"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-encre-900 truncate">
                      {appointment.client_name}
                    </div>
                    <div className="text-xs text-encre-500 mt-0.5">
                      {appointment.service?.name || 'Service non défini'}
                    </div>
                    <div className="text-xs text-encre-400 mt-0.5">
                      {new Date(appointment.appointment_date).toLocaleString('fr-FR')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <span className={`admin-badge ${
                      appointment.payment_status === 'paid' ? 'admin-badge-paid' : 'admin-badge-unpaid'
                    }`}>
                      {appointment.payment_status === 'paid' ? 'Payé' : 'En attente'}
                    </span>
                    <span className={`admin-badge ${
                      appointment.status === 'confirmed' || appointment.status === 'paid'
                        ? 'admin-badge-confirmed'
                        : appointment.status === 'cancelled'
                        ? 'admin-badge-cancelled'
                        : 'admin-badge-pending'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, accent }: {
  title: string;
  value: string | number;
  icon: string;
  accent: 'default' | 'rouge' | 'gold';
}) {
  const accentClass = accent === 'rouge' ? 'admin-stat-card-accent' : accent === 'gold' ? 'admin-stat-card-gold' : '';
  return (
    <div className={`admin-stat-card ${accentClass}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xl">{icon}</span>
      </div>
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-label">{title}</div>
    </div>
  );
}
