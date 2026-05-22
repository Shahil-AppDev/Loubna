-- =====================================================
-- Migration : SumUp payments (remplace Stripe)
-- Date : 2026-05-22
-- =====================================================

-- 1. Ajouter les colonnes SumUp dans appointments
ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS sumup_checkout_id        VARCHAR(120),
  ADD COLUMN IF NOT EXISTS sumup_checkout_reference VARCHAR(120),
  ADD COLUMN IF NOT EXISTS sumup_transaction_id     VARCHAR(120);

-- Index pour lookup rapide par référence
CREATE INDEX IF NOT EXISTS idx_appointments_sumup_checkout_reference
  ON appointments (sumup_checkout_reference);

-- 2. Adapter la table payments pour multi-provider
ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS provider           VARCHAR(20) NOT NULL DEFAULT 'stripe',
  ADD COLUMN IF NOT EXISTS checkout_reference VARCHAR(120),
  ADD COLUMN IF NOT EXISTS checkout_id        VARCHAR(120),
  ADD COLUMN IF NOT EXISTS transaction_id     VARCHAR(120);

-- Contrainte d'unicité sur checkout_reference (pour idempotence webhook)
ALTER TABLE payments
  DROP CONSTRAINT IF EXISTS payments_checkout_reference_key;
ALTER TABLE payments
  ADD CONSTRAINT payments_checkout_reference_key
    UNIQUE (checkout_reference);

-- Index
CREATE INDEX IF NOT EXISTS idx_payments_checkout_reference
  ON payments (checkout_reference);

-- 3. Supprimer stripe_price_id de services_rdv (plus nécessaire)
ALTER TABLE services_rdv
  DROP COLUMN IF EXISTS stripe_price_id;

-- =====================================================
-- Fin migration
-- =====================================================
