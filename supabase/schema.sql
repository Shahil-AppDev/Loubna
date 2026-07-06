-- =============================================
-- SCHEMA BASE DE DONNÉES - BACK OFFICE RDV
-- =============================================

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: services_rdv
-- Services proposés pour les rendez-vous
-- =============================================
CREATE TABLE IF NOT EXISTS services_rdv (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  price_cents INTEGER NOT NULL, -- Prix en centimes (ex: 8000 = 80€)
  price_label TEXT,
  is_quote_only BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  stripe_price_id TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: appointments
-- Rendez-vous clients
-- =============================================
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'paid', 'cancelled', 'completed');
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded');

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service_id UUID REFERENCES services_rdv(id) ON DELETE SET NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status appointment_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'unpaid',
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: payments
-- Historique des paiements
-- =============================================
CREATE TYPE payment_status_type AS ENUM ('pending', 'succeeded', 'failed', 'refunded');

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT,
  status payment_status_type DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: admin_users
-- Utilisateurs admin du back office
-- =============================================
CREATE TYPE admin_role AS ENUM ('admin', 'super_admin');

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role admin_role DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: availability_settings
-- Paramètres de disponibilité
-- =============================================
CREATE TABLE IF NOT EXISTS availability_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Dimanche, 6=Samedi
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: blocked_dates
-- Dates bloquées (congés, jours fériés)
-- =============================================
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES pour performance
-- =============================================
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_payment_status ON appointments(payment_status);
CREATE INDEX idx_appointments_email ON appointments(client_email);
CREATE INDEX idx_payments_appointment ON payments(appointment_id);
CREATE INDEX idx_payments_stripe_intent ON payments(stripe_payment_intent_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Activer RLS sur toutes les tables
ALTER TABLE services_rdv ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Policy: services_rdv - lecture publique des services actifs
CREATE POLICY "Public can view active services"
  ON services_rdv FOR SELECT
  USING (active = true);

-- Policy: services_rdv - admin full access
CREATE POLICY "Admin full access to services"
  ON services_rdv FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy: appointments - clients peuvent créer leurs RDV
CREATE POLICY "Anyone can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

-- Policy: appointments - admin full access
CREATE POLICY "Admin full access to appointments"
  ON appointments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy: payments - admin only
CREATE POLICY "Admin full access to payments"
  ON payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy: availability_settings - lecture publique
CREATE POLICY "Public can view availability"
  ON availability_settings FOR SELECT
  USING (active = true);

-- Policy: availability_settings - admin full access
CREATE POLICY "Admin full access to availability"
  ON availability_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy: blocked_dates - lecture publique
CREATE POLICY "Public can view blocked dates"
  ON blocked_dates FOR SELECT
  USING (true);

-- Policy: blocked_dates - admin full access
CREATE POLICY "Admin full access to blocked dates"
  ON blocked_dates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- =============================================
-- TRIGGERS pour updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_rdv_updated_at
  BEFORE UPDATE ON services_rdv
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- DONNÉES INITIALES
-- =============================================

-- Services par défaut
INSERT INTO services_rdv (id, name, description, duration_minutes, price_cents, price_label, is_quote_only, sort_order, active) VALUES
  ('a1000001-0000-0000-0000-000000000000', 'Dépôt et analyse de dossier', 'Déposez vos documents et obtenez une analyse écrite personnalisée de votre situation, avec les orientations adaptées.', 60, 8000, 'À partir de 80 €', false, 1, true),
  ('4c717f21-0184-4623-b7f6-e4177455d11b', 'Consultation initiale - 30 min', 'Première consultation pour analyser votre situation et définir les actions à mener.', 30, 8000, 'À partir de 80 €', false, 2, true),
  ('aa9772ce-486e-4f3b-ac2d-f91467d0a91c', 'Consultation approfondie - 1h', 'Analyse détaillée de votre dossier avec recommandations personnalisées.', 60, 14000, 'À partir de 140 €', false, 3, true),
  ('9e2740c3-224f-4725-b136-16e33a6df919', 'Accompagnement DUERP', 'Accompagnement pour la création ou mise à jour du Document Unique d''Évaluation des Risques Professionnels.', 90, 14000, 'À partir de 140 €', false, 4, true),
  ('0c85ff36-fd03-4dc3-a202-cb09967a5f7a', 'Analyse dossier AT/MP', 'Analyse complète d''un dossier d''accident du travail ou maladie professionnelle.', 60, 14000, 'À partir de 140 €', false, 5, true)
ON CONFLICT (id) DO NOTHING;

-- Disponibilités par défaut (Lundi à Vendredi, 9h-17h)
INSERT INTO availability_settings (day_of_week, start_time, end_time, active) VALUES
  (1, '09:00', '17:00', true), -- Lundi
  (2, '09:00', '17:00', true), -- Mardi
  (3, '09:00', '17:00', true), -- Mercredi
  (4, '09:00', '17:00', true), -- Jeudi
  (5, '09:00', '17:00', true); -- Vendredi

-- Note: Pour ajouter un admin, exécuter après création du compte Supabase Auth:
-- INSERT INTO admin_users (id, email, role) VALUES ('uuid-from-auth', 'admin@example.com', 'super_admin');
