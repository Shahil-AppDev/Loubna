'use client';

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-encre-900">Paramètres</h1>
        <p className="text-encre-600 mt-2">Configuration de votre back office</p>
      </div>

      <div className="bg-white rounded-lg border border-encre-200 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl font-semibold text-encre-900 mb-4">
              Horaires de disponibilité
            </h3>
            <p className="text-encre-600 text-sm mb-4">
              Configurez vos horaires de travail pour définir les créneaux disponibles à la réservation.
            </p>
            <div className="bg-encre-50 border border-encre-200 rounded-lg p-4">
              <p className="text-sm text-encre-700">
                <strong>Par défaut :</strong> Lundi à Vendredi, 9h00 - 17h00
              </p>
              <p className="text-xs text-encre-500 mt-2">
                Modifiez directement dans la base de données (table <code>availability_settings</code>)
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-encre-900 mb-4">
              Jours fériés et congés
            </h3>
            <p className="text-encre-600 text-sm mb-4">
              Bloquez des dates spécifiques pour vos congés ou jours fériés.
            </p>
            <div className="bg-encre-50 border border-encre-200 rounded-lg p-4">
              <p className="text-sm text-encre-700">
                Gérez les dates bloquées dans la table <code>blocked_dates</code>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-encre-900 mb-4">
              Notifications
            </h3>
            <p className="text-encre-600 text-sm mb-4">
              Recevez des notifications par email pour les nouveaux rendez-vous.
            </p>
            <div className="bg-encre-50 border border-encre-200 rounded-lg p-4">
              <p className="text-sm text-encre-700">
                Email admin : <strong>louamjuristeconseil@gmail.com</strong>
              </p>
              <p className="text-xs text-encre-500 mt-2">
                Les notifications sont envoyées automatiquement via les webhooks Stripe
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-encre-900 mb-4">
              Configuration Stripe
            </h3>
            <div className="bg-encre-50 border border-encre-200 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <p className="text-encre-700">
                  <strong>Mode :</strong> {process.env.NODE_ENV === 'production' ? 'Production' : 'Test'}
                </p>
                <p className="text-xs text-encre-500">
                  Configurez vos clés API Stripe dans les variables d&apos;environnement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
