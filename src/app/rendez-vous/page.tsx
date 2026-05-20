'use client';

import AttachmentField from '@/components/forms/AttachmentField';
import { validateContactFiles } from '@/lib/contact/attachments';
import { ServiceRdv } from '@/types/database';
import { useEffect, useState } from 'react';

export default function RendezVousPage() {
  const [services, setServices] = useState<ServiceRdv[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceRdv | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachError, setAttachError] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const response = await fetch('/api/services?active=true');
      const data = await response.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;

    const fileError = validateContactFiles(attachments);
    if (fileError) {
      setAttachError(fileError);
      return;
    }

    setLoading(true);
    setAttachError('');

    try {
      const appointmentDate = new Date(`${selectedDate}T${selectedTime}`);

      const body = new FormData();
      body.append('client_name', `${formData.firstName} ${formData.lastName}`.trim());
      body.append('client_email', formData.email);
      body.append('client_phone', formData.phone);
      body.append('service_id', selectedService.id);
      body.append('appointment_date', appointmentDate.toISOString());
      body.append('duration_minutes', String(selectedService.duration_minutes));
      body.append('notes', formData.notes);
      attachments.forEach((file) => body.append('piecesJointes', file));

      const appointmentResponse = await fetch('/api/appointments/', {
        method: 'POST',
        body,
      });

      const appointmentData = await appointmentResponse.json();

      if (!appointmentResponse.ok) {
        alert(appointmentData.error || 'Erreur lors de la création du rendez-vous');
        setLoading(false);
        return;
      }

      // Créer la session Stripe
      const checkoutResponse = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointment_id: appointmentData.appointment.id,
          service_id: selectedService.id
        })
      });

      const checkoutData = await checkoutResponse.json();

      if (checkoutData.url) {
        // Rediriger vers Stripe Checkout
        window.location.href = checkoutData.url;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur est survenue');
      setLoading(false);
    }
  }

  // Générer les créneaux disponibles (9h-17h, par tranches de 30min)
  const availableTimeSlots = [];
  for (let hour = 9; hour < 17; hour++) {
    availableTimeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    availableTimeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="container-main relative z-10 pt-20 pb-12">
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Prendre rendez-vous
          </h1>
          <p className="text-white/85 text-[1rem] max-w-[500px] mt-5 leading-[1.8]">
            Réservez votre consultation en ligne et payez de manière sécurisée.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-pad bg-encre-50">
        <div className="container-main max-w-4xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              <StepIndicator number={1} label="Service" active={step >= 1} />
              <div className="w-12 h-px bg-encre-300" />
              <StepIndicator number={2} label="Date & Heure" active={step >= 2} />
              <div className="w-12 h-px bg-encre-300" />
              <StepIndicator number={3} label="Coordonnées" active={step >= 3} />
              <div className="w-12 h-px bg-encre-300" />
              <StepIndicator number={4} label="Paiement" active={step >= 4} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-encre-200 p-8">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-encre-900 mb-6">
                  Choisissez votre prestation
                </h2>
                <div className="grid gap-4">
                  {services.map(service => (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setStep(2);
                      }}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${selectedService?.id === service.id
                        ? 'border-or-500 bg-or-50'
                        : 'border-encre-200 hover:border-or-300'
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-semibold text-encre-900 mb-2">
                            {service.name}
                          </h3>
                          {service.description && (
                            <p className="text-sm text-encre-700 mb-3">{service.description}</p>
                          )}
                          <div className="flex gap-4 text-sm text-encre-700">
                            <span>⏱️ {service.duration_minutes} min</span>
                            <span>💰 {(service.price_cents / 100).toFixed(2)} €</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-encre-700 hover:text-encre-900 mb-4"
                >
                  ← Retour
                </button>
                <h2 className="font-serif text-2xl font-semibold text-encre-900 mb-6">
                  Choisissez la date et l&apos;heure
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-encre-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
                      title="Sélectionner une date"
                      placeholder="JJ/MM/AAAA"
                      required
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-encre-700 mb-2">
                        Heure
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {availableTimeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTime === time
                              ? 'bg-or-500 text-white'
                              : 'bg-encre-100 text-encre-700 hover:bg-encre-200'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-full btn btn-primary"
                    >
                      Continuer
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm text-encre-700 hover:text-encre-900 mb-4"
                >
                  ← Retour
                </button>
                <h2 className="font-serif text-2xl font-semibold text-encre-900 mb-6">
                  Vos coordonnées
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-encre-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
                      title="Prénom"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encre-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
                      title="Nom"
                      placeholder="Votre nom"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encre-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
                      title="Email"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encre-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encre-700 mb-2">
                      Message (optionnel)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-encre-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-or-500"
                      placeholder="Décrivez brièvement votre situation..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encre-700 mb-2">
                      Pièces jointes (optionnel)
                    </label>
                    <AttachmentField
                      id="rdv-piecesJointes"
                      files={attachments}
                      onChange={setAttachments}
                      onValidationError={setAttachError}
                      error={attachError}
                      helpId="rdv-pieces-jointes-help"
                    />
                    {attachError && (
                      <p className="text-[0.75rem] text-red-500 mt-2">⚠ {attachError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn btn-primary"
                  >
                    {loading ? 'Traitement...' : 'Procéder au paiement'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function StepIndicator({ number, label, active }: { number: number; label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${active ? 'bg-or-500 text-white' : 'bg-encre-200 text-encre-700'
        }`}>
        {number}
      </div>
      <span className={`text-xs ${active ? 'text-encre-900 font-medium' : 'text-encre-700'}`}>
        {label}
      </span>
    </div>
  );
}
