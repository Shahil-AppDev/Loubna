-- ═══════════════════════════════════════════════════════════
-- Migration: Digital Products (DUERP PDF sales)
-- Idempotent — safe to run multiple times
-- ═══════════════════════════════════════════════════════════

-- ─── digital_products ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS digital_products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  price_amount    NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency        VARCHAR(3) NOT NULL DEFAULT 'EUR',
  file_key        TEXT,
  private_file_path TEXT,
  file_sha256     TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── digital_orders ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS digital_orders (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id            UUID NOT NULL REFERENCES digital_products(id),
  customer_first_name   TEXT NOT NULL,
  customer_last_name    TEXT NOT NULL,
  customer_email        TEXT NOT NULL,
  amount                NUMERIC(10,2) NOT NULL,
  currency              VARCHAR(3) NOT NULL DEFAULT 'EUR',
  status                VARCHAR(30) NOT NULL DEFAULT 'pending_payment',
  payment_provider      VARCHAR(20) NOT NULL DEFAULT 'sumup',
  provider_checkout_id  TEXT,
  provider_reference    TEXT UNIQUE,
  provider_transaction_id TEXT,
  paid_at               TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_digital_orders_product_id ON digital_orders(product_id);
CREATE INDEX IF NOT EXISTS idx_digital_orders_status ON digital_orders(status);
CREATE INDEX IF NOT EXISTS idx_digital_orders_email ON digital_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_digital_orders_provider_ref ON digital_orders(provider_reference);

-- ─── download_tokens ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS download_tokens (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            UUID NOT NULL REFERENCES digital_orders(id) ON DELETE CASCADE,
  token_hash          TEXT UNIQUE NOT NULL,
  expires_at          TIMESTAMPTZ NOT NULL,
  max_downloads       INTEGER NOT NULL DEFAULT 3,
  download_count      INTEGER NOT NULL DEFAULT 0,
  last_downloaded_at  TIMESTAMPTZ,
  revoked_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_download_tokens_order_id ON download_tokens(order_id);
CREATE INDEX IF NOT EXISTS idx_download_tokens_token_hash ON download_tokens(token_hash);

-- ─── digital_audit_log ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS digital_audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID REFERENCES digital_orders(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  performed_by TEXT,
  details     JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_digital_audit_order_id ON digital_audit_log(order_id);

-- ─── Seed: DUERP product ───────────────────────────────────
INSERT INTO digital_products (slug, name, description, price_amount, currency, file_key, private_file_path, file_sha256, is_active)
VALUES (
  'modele-duerp',
  'Modèle DUERP à compléter',
  'Document unique d''évaluation des risques professionnels pour commerces, artisans et petites entreprises. Format PDF, 20 pages. Trame à compléter et à adapter à l''activité réelle de l''entreprise.',
  4.99,
  'EUR',
  'duerp-modele.pdf',
  '/var/www/projects/juriste-droit-du-travail/private-products/duerp-modele.pdf',
  '57f562dc6c245e9b33d9b31555ea86cba7e10bd42491de957706600110b8c24c',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name            = EXCLUDED.name,
  description     = EXCLUDED.description,
  price_amount    = EXCLUDED.price_amount,
  currency        = EXCLUDED.currency,
  file_key        = EXCLUDED.file_key,
  private_file_path = EXCLUDED.private_file_path,
  file_sha256     = EXCLUDED.file_sha256,
  is_active       = EXCLUDED.is_active,
  updated_at      = NOW();
