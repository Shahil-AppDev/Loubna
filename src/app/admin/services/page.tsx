'use client';

import { useEffect, useState } from 'react';
import { ServiceRdv } from '@/types/database';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceRdv[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceRdv | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const response = await fetch('/api/services?admin=true');
      const data = await response.json();
      
      if (data.services) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleServiceActive(id: string, active: boolean) {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active }),
      });

      if (response.ok) {
        loadServices();
      }
    } catch (error) {
      console.error('Error updating service:', error);
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
        <h1 className="font-serif text-3xl font-bold text-encre-900">Services</h1>
        <p className="text-encre-600 mt-2">Gérez vos prestations et tarifs</p>
      </div>

      {/* Services List */}
      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-lg border-2 p-6 transition-all ${
              service.active ? 'border-encre-200' : 'border-encre-100 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-xl font-semibold text-encre-900">
                    {service.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    service.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                
                {service.description && (
                  <p className="text-encre-600 text-sm mb-4">{service.description}</p>
                )}

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-encre-500">Durée:</span>
                    <span className="ml-2 font-medium text-encre-900">
                      {service.duration_minutes} min
                    </span>
                  </div>
                  <div>
                    <span className="text-encre-500">Prix:</span>
                    <span className="ml-2 font-medium text-encre-900">
                      {(service.price_cents / 100).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleServiceActive(service.id, !service.active)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    service.active
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {service.active ? 'Désactiver' : 'Activer'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
