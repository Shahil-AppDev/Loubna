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
          apt.status === 'pending'
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
        <h1 className="font-serif text-3xl font-bold text-encre-900">Dashboard</h1>
        <p className="text-encre-600 mt-2">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Aujourd'hui"
          value={stats.today}
          icon="📅"
          color="blue"
        />
        <StatCard
          title="Cette semaine"
          value={stats.thisWeek}
          icon="📊"
          color="green"
        />
        <StatCard
          title="Ce mois"
          value={stats.thisMonth}
          icon="📈"
          color="purple"
        />
        <StatCard
          title="En attente"
          value={stats.pending}
          icon="⏳"
          color="orange"
        />
        <StatCard
          title="Payés"
          value={stats.paid}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Chiffre d'affaires"
          value={`${stats.revenue.toFixed(2)} €`}
          icon="💰"
          color="gold"
        />
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg border border-encre-200 p-6">
        <h2 className="font-serif text-xl font-semibold text-encre-900 mb-4">
          Rendez-vous récents
        </h2>
        
        {recentAppointments.length === 0 ? (
          <p className="text-encre-500 text-center py-8">Aucun rendez-vous</p>
        ) : (
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-encre-100 rounded-lg hover:bg-encre-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-semibold text-encre-900">
                    {appointment.client_name}
                  </div>
                  <div className="text-sm text-encre-600">
                    {appointment.service?.name || 'Service non défini'}
                  </div>
                  <div className="text-xs text-encre-500 mt-1">
                    {new Date(appointment.appointment_date).toLocaleString('fr-FR')}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.payment_status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {appointment.payment_status === 'paid' ? 'Payé' : 'En attente'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' || appointment.status === 'paid'
                      ? 'bg-blue-100 text-blue-800'
                      : appointment.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
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
  );
}

function StatCard({ title, value, icon, color }: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    gold: 'bg-yellow-50 border-yellow-200',
  }[color] || 'bg-gray-50 border-gray-200';

  return (
    <div className={`${colorClasses} border rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-encre-900 mb-1">{value}</div>
      <div className="text-sm text-encre-600">{title}</div>
    </div>
  );
}
