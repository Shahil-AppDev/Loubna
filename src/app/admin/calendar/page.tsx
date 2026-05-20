'use client';

import { useEffect, useState } from 'react';
import { AppointmentWithService } from '@/types/database';

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<AppointmentWithService[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, [currentDate]);

  async function loadAppointments() {
    try {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const params = new URLSearchParams({
        start_date: startOfMonth.toISOString(),
        end_date: endOfMonth.toISOString(),
      });

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

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthName = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  function getAppointmentsForDay(day: number) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointment_date);
      return aptDate.getDate() === day &&
             aptDate.getMonth() === currentDate.getMonth() &&
             aptDate.getFullYear() === currentDate.getFullYear();
    });
  }

  function previousMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
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
        <h1 className="font-serif text-3xl font-bold text-encre-900">Calendrier</h1>
        <p className="text-encre-600 mt-2">Vue mensuelle de vos rendez-vous</p>
      </div>

      {/* Calendar Header */}
      <div className="bg-white rounded-lg border border-encre-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="px-4 py-2 bg-encre-900 text-white rounded-lg hover:bg-encre-800 transition-colors"
          >
            ← Mois précédent
          </button>
          <h2 className="font-serif text-2xl font-semibold text-encre-900 capitalize">
            {monthName}
          </h2>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-encre-900 text-white rounded-lg hover:bg-encre-800 transition-colors"
          >
            Mois suivant →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} className="text-center font-semibold text-encre-700 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayAppointments = getAppointmentsForDay(day);
            const isToday = new Date().getDate() === day &&
                           new Date().getMonth() === currentDate.getMonth() &&
                           new Date().getFullYear() === currentDate.getFullYear();

            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg p-2 ${
                  isToday ? 'border-or-500 bg-or-50' : 'border-encre-200'
                }`}
              >
                <div className="font-semibold text-encre-900 mb-1">{day}</div>
                <div className="space-y-1">
                  {dayAppointments.map(apt => (
                    <div
                      key={apt.id}
                      className={`text-xs px-2 py-1 rounded ${
                        apt.payment_status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                      title={`${apt.client_name} - ${apt.service?.name}`}
                    >
                      {new Date(apt.appointment_date).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
          <span className="text-encre-700">Payé</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
          <span className="text-encre-700">En attente de paiement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-or-50 border border-or-500 rounded"></div>
          <span className="text-encre-700">Aujourd&apos;hui</span>
        </div>
      </div>
    </div>
  );
}
