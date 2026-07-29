-- ═══════════════════════════════════════════════════════════
-- Migration: Document Marketplace Platform
-- Idempotent — safe to run multiple times
-- Extends digital_products + creates new tables for catalog
-- ═══════════════════════════════════════════════════════════

-- ─── Extend digital_products with catalog fields ───────────
ALTER TABLE digital_products
  ADD COLUMN IF NOT EXISTS subtitle           TEXT,
  ADD COLUMN IF NOT EXISTS usage_description  TEXT,
  ADD COLUMN IF NOT EXISTS target_audience    VARCHAR(20) DEFAULT 'all',
  ADD COLUMN IF NOT EXISTS category_id        UUID,
  ADD COLUMN IF NOT EXISTS subcategory        TEXT,
  ADD COLUMN IF NOT EXISTS synonyms           TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tags               TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS format             VARCHAR(10) DEFAULT 'PDF',
  ADD COLUMN IF NOT EXISTS page_count         INTEGER,
  ADD COLUMN IF NOT EXISTS product_type       VARCHAR(20) DEFAULT 'template',
  ADD COLUMN IF NOT EXISTS preview_key        TEXT,
  ADD COLUMN IF NOT EXISTS version            VARCHAR(20) DEFAULT '1.0',
  ADD COLUMN IF NOT EXISTS status             VARCHAR(20) DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS is_featured        BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_popular         BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS published_at       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_reviewed_at   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS author             TEXT,
  ADD COLUMN IF NOT EXISTS reviewer           TEXT,
  ADD COLUMN IF NOT EXISTS legal_sources      TEXT,
  ADD COLUMN IF NOT EXISTS disclaimer         TEXT,
  ADD COLUMN IF NOT EXISTS seo_title          TEXT,
  ADD COLUMN IF NOT EXISTS seo_description    TEXT;

-- ─── document_categories ───────────────────────────────────
CREATE TABLE IF NOT EXISTS document_categories (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  description       TEXT,
  target_audience   VARCHAR(20) DEFAULT 'all',
  seo_title         TEXT,
  seo_description   TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_doc_categories_slug ON document_categories(slug);
CREATE INDEX IF NOT EXISTS idx_doc_categories_active ON document_categories(is_active);

-- Link digital_products to categories
ALTER TABLE digital_products
  ADD CONSTRAINT IF NOT EXISTS fk_digital_products_category
  FOREIGN KEY (category_id) REFERENCES document_categories(id) ON DELETE SET NULL;

-- ─── document_faqs ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS document_faqs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id   UUID NOT NULL REFERENCES digital_products(id) ON DELETE CASCADE,
  question      TEXT NOT NULL,
  answer        TEXT NOT NULL,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_doc_faqs_document_id ON document_faqs(document_id);

-- ─── document_related_items ─────────────────────────────────
CREATE TABLE IF NOT EXISTS document_related_items (
  document_id          UUID NOT NULL REFERENCES digital_products(id) ON DELETE CASCADE,
  related_document_id  UUID NOT NULL REFERENCES digital_products(id) ON DELETE CASCADE,
  relation_type        VARCHAR(30) DEFAULT 'related',
  PRIMARY KEY (document_id, related_document_id)
);

-- ─── search_logs ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS search_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query         TEXT NOT NULL,
  filters       JSONB,
  result_count  INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_logs_created ON search_logs(created_at);

-- ─── Seed categories ────────────────────────────────────────
INSERT INTO document_categories (name, slug, description, target_audience, sort_order)
VALUES
  ('Salariés', 'salaries', 'Documents pour les salariés : réponses, courriers, démarches.', 'salarie', 1),
  ('Employeurs', 'employeurs', 'Documents pour les employeurs : prévention, procédures, RH.', 'employeur', 2),
  ('DUERP et prévention', 'duerp-prevention', 'Documents uniques d''évaluation des risques et outils de prévention.', 'all', 3),
  ('Accidents du travail et maladies professionnelles', 'at-mp', 'Documents liés aux AT/MP : checklists, démarches, courriers.', 'salarie', 4),
  ('Procédures disciplinaires', 'procedures-disciplinaires', 'Documents pour faire face ou mener une procédure disciplinaire.', 'all', 5),
  ('Harcèlement et risques psychosociaux', 'harcelement-rps', 'Documents pour signaler, qualifier et agir face aux RPS.', 'salarie', 6),
  ('Contrats et rupture du contrat', 'contrats-rupture', 'Documents liés aux contrats de travail et à leur rupture.', 'all', 7),
  ('Courriers professionnels', 'courriers-professionnels', 'Modèles de courriers professionnels en droit du travail.', 'all', 8),
  ('Suisse — rédaction uniquement', 'suisse', 'Courriers professionnels pour la Suisse, sans conseil juridique suisse.', 'all', 9),
  ('Packs thématiques', 'packs-thematiques', 'Packs regroupant plusieurs documents complémentaires.', 'all', 10)
ON CONFLICT (slug) DO UPDATE SET
  name            = EXCLUDED.name,
  description     = EXCLUDED.description,
  target_audience = EXCLUDED.target_audience,
  sort_order      = EXCLUDED.sort_order,
  updated_at      = NOW();

-- ─── Seed documents (status=draft, pas de fichier) ─────────
-- Le DUERP existant est mis à jour avec les nouvelles colonnes
UPDATE digital_products SET
  subtitle = 'Trame professionnelle à compléter et adapter',
  usage_description = 'Pour toute entreprise devant établir son Document Unique d''Évaluation des Risques Professionnels (DUERP), obligatoire depuis 2001.',
  target_audience = 'employeur',
  category_id = (SELECT id FROM document_categories WHERE slug = 'duerp-prevention'),
  subcategory = 'Évaluation des risques',
  synonyms = ARRAY['document unique', 'évaluation des risques', 'DUERP', 'risques professionnels'],
  tags = ARRAY['DUERP', 'prévention', 'évaluation des risques', 'obligation employeur'],
  format = 'PDF',
  page_count = 20,
  product_type = 'template',
  version = '1.0',
  status = 'published',
  is_featured = true,
  is_popular = true,
  author = 'Loubna Abouz Manta',
  disclaimer = 'Ce document constitue un modèle général à compléter et à adapter à la situation réelle. Il ne remplace pas une analyse personnalisée par un professionnel compétent lorsque celle-ci est nécessaire.',
  seo_title = 'Modèle DUERP à compléter — Document unique d''évaluation des risques',
  seo_description = 'Téléchargez un modèle de DUERP à compléter et adapter à votre activité. Format PDF, 20 pages. 18,99 € seulement.',
  published_at = NOW(),
  last_reviewed_at = NOW()
WHERE slug = 'modele-duerp';

-- Insert new documents (all draft — no file yet)
INSERT INTO digital_products (slug, name, subtitle, description, usage_description, target_audience, category_id, subcategory, synonyms, tags, format, page_count, price_amount, currency, product_type, status, is_featured, author, disclaimer, seo_title, seo_description)
SELECT * FROM (VALUES
  ('tableau-evaluation-risques',
   'Tableau d''évaluation des risques professionnels',
   'Grille d''analyse des risques par poste',
   'Tableau structuré pour identifier, évaluer et hiérarchiser les risques professionnels par poste de travail.',
   'Pour compléter le DUERP ou mener une évaluation des risques dans le cadre d''une démarche de prévention.',
   'employeur', NULL, 'Évaluation des risques',
   ARRAY['grille risques', 'matrice risques', 'évaluation risques'],
   ARRAY['DUERP', 'évaluation', 'risques', 'prévention'],
   'PDF', 5, 9.90, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Tableau d''évaluation des risques professionnels — Grille d''analyse',
   'Grille d''évaluation des risques professionnels par poste de travail. Format PDF.'),

  ('plan-actions-prevention',
   'Plan d''actions de prévention',
   'Plan d''actions suite à l''évaluation des risques',
   'Modèle de plan d''actions de prévention des risques professionnels, structuré par priorité et échéance.',
   'Après l''évaluation des risques (DUERP), pour formaliser les actions de prévention.',
   'employeur', NULL, 'Prévention',
   ARRAY['plan prévention', 'actions préventives', 'plan d''action'],
   ARRAY['prévention', 'DUERP', 'actions', 'plan'],
   'PDF', 4, 9.90, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Plan d''actions de prévention — Modèle à compléter',
   'Modèle de plan d''actions de prévention des risques professionnels.'),

  ('checklist-accident-travail',
   'Checklist accident du travail',
   'Étapes à suivre en cas d''accident du travail',
   'Checklist complète des démarches à effectuer en cas d''accident du travail : déclaration, soins, suivi.',
   'Dès la survenue d''un accident du travail, pour ne rien oublier.',
   'salarie', NULL, 'Accidents du travail',
   ARRAY['checklist AT', 'démarches accident', 'accident travail'],
   ARRAY['accident du travail', 'AT', 'checklist', 'démarches'],
   'PDF', 3, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Checklist accident du travail — Démarches à suivre',
   'Checklist des démarches en cas d''accident du travail.'),

  ('trame-reserves-employeur',
   'Trame de réserves employeur',
   'Modèle pour formuler des réserves',
   'Trame pour formuler des réserves suite à un avertissement, une sanction ou une décision de l''employeur.',
   'Pour répondre formellement à une décision de l''employeur.',
   'salarie', NULL, 'Procédures disciplinaires',
   ARRAY['réserves', 'contestation', 'réponse sanction'],
   ARRAY['réserves', 'employeur', 'sanction', 'contestation'],
   'PDF', 2, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Trame de réserves employeur — Modèle de réponse',
   'Modèle pour formuler des réserves suite à une décision de l''employeur.'),

  ('reponse-avertissement',
   'Réponse à un avertissement',
   'Modèle de réponse écrite à un avertissement',
   'Modèle de courrier pour répondre à un avertissement disciplinaire, formuler des réserves et demander un entretien.',
   'Après réception d''un avertissement disciplinaire.',
   'salarie', NULL, 'Procédures disciplinaires',
   ARRAY['réponse avertissement', 'contestation avertissement', 'lettre avertissement'],
   ARRAY['avertissement', 'sanction', 'réponse', 'réserves'],
   'PDF', 2, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Réponse à un avertissement — Modèle de courrier',
   'Modèle de réponse écrite à un avertissement disciplinaire.'),

  ('demande-communication-documents',
   'Demande de communication de documents',
   'Modèle de demande de communication de pièces',
   'Courrier pour demander la communication de documents professionnels (contrat, fiches de paie, etc.).',
   'Pour exercer son droit à la communication de documents professionnels.',
   'salarie', NULL, 'Courriers professionnels',
   ARRAY['communication documents', 'demande pièces', 'communication pièces'],
   ARRAY['communication', 'documents', 'contrat', 'fiches de paie'],
   'PDF', 2, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Demande de communication de documents — Modèle',
   'Modèle de demande de communication de documents professionnels.'),

  ('demande-paiement-salaire',
   'Demande de paiement de salaire',
   'Courrier de réclamation de salaire',
   'Modèle de courrier pour réclamer le paiement d''un salaire ou d''arriérés de salaire.',
   'En cas de non-paiement ou de retard de paiement du salaire.',
   'salarie', NULL, 'Courriers professionnels',
   ARRAY['réclamation salaire', 'paiement salaire', 'arriérés salaire'],
   ARRAY['salaire', 'paiement', 'réclamation', 'courrier'],
   'PDF', 2, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Demande de paiement de salaire — Modèle de courrier',
   'Modèle de réclamation de paiement de salaire.'),

  ('chronologie-situation-professionnelle',
   'Chronologie de situation professionnelle',
   'Trame pour reconstituer une chronologie',
   'Trame structurée pour reconstituer la chronologie des faits d''une situation professionnelle (dates, événements, témoins).',
   'Pour préparer un dossier, un entretien ou une procédure en reconstituant les faits.',
   'all', NULL, 'Outils',
   ARRAY['chronologie', 'frise chronologique', 'reconstitution faits'],
   ARRAY['chronologie', 'faits', 'dossier', 'préparation'],
   'PDF', 3, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Chronologie de situation professionnelle — Trame',
   'Trame pour reconstituer la chronologie des faits.'),

  ('fiche-signalement-rps',
   'Fiche de signalement RPS',
   'Formulaire de signalement de risques psychosociaux',
   'Fiche structurée pour signaler des faits de harcèlement ou de risques psychosociaux (RPS) en milieu professionnel.',
   'Pour formaliser un signalement de RPS ou de harcèlement.',
   'salarie', NULL, 'Harcèlement et RPS',
   ARRAY['signalement RPS', 'fiche harcèlement', 'signalement harcèlement'],
   ARRAY['RPS', 'harcèlement', 'signalement', 'risques psychosociaux'],
   'PDF', 3, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Fiche de signalement RPS — Risques psychosociaux',
   'Fiche de signalement de risques psychosociaux en milieu professionnel.'),

  ('courrier-rh',
   'Courrier RH',
   'Modèle de courrier aux ressources humaines',
   'Modèle de courrier professionnel à destination des ressources humaines pour diverses demandes formelles.',
   'Pour toute communication formelle avec les RH.',
   'all', NULL, 'Courriers professionnels',
   ARRAY['courrier RH', 'lettre RH', 'demande RH'],
   ARRAY['RH', 'courrier', 'ressources humaines', 'demande'],
   'PDF', 2, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document constitue un modèle général à compléter et à adapter à la situation réelle.',
   'Courrier RH — Modèle de courrier professionnel',
   'Modèle de courrier à destination des ressources humaines.'),

  ('courrier-professionnel-suisse',
   'Courrier professionnel Suisse',
   'Modèle de courrier pour la Suisse — rédaction uniquement',
   'Modèle de courrier professionnel adapté au contexte suisse, dans le cadre d''un accompagnement rédactionnel. Ne constitue pas un conseil juridique suisse.',
   'Pour rédiger un courrier professionnel dans le contexte suisse.',
   'all', NULL, 'Suisse — rédaction uniquement',
   ARRAY['courrier suisse', 'lettre suisse', 'courrier professionnel suisse'],
   ARRAY['Suisse', 'courrier', 'rédaction', 'professionnel'],
   'PDF', 2, 4.99, 'EUR', 'template', 'draft', false,
   'Loubna Abouz Manta',
   'Ce document est proposé dans le cadre d''un accompagnement rédactionnel. Il ne constitue pas un conseil juridique suisse.',
   'Courrier professionnel Suisse — Rédaction uniquement',
   'Modèle de courrier professionnel pour la Suisse, rédaction uniquement.')
) AS t(slug, name, subtitle, description, usage_description, target_audience, category_id, subcategory, synonyms, tags, format, page_count, price_amount, currency, product_type, status, is_featured, author, disclaimer, seo_title, seo_description)
WHERE NOT EXISTS (SELECT 1 FROM digital_products dp WHERE dp.slug = t.slug);

-- Update category_id for new documents based on subcategory mapping
UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'tableau-evaluation-risques' AND dc.slug = 'duerp-prevention';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'plan-actions-prevention' AND dc.slug = 'duerp-prevention';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'checklist-accident-travail' AND dc.slug = 'at-mp';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'trame-reserves-employeur' AND dc.slug = 'procedures-disciplinaires';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'reponse-avertissement' AND dc.slug = 'procedures-disciplinaires';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'demande-communication-documents' AND dc.slug = 'courriers-professionnels';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'demande-paiement-salaire' AND dc.slug = 'courriers-professionnels';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'chronologie-situation-professionnelle' AND dc.slug = 'salaries';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'fiche-signalement-rps' AND dc.slug = 'harcelement-rps';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'courrier-rh' AND dc.slug = 'courriers-professionnels';

UPDATE digital_products dp
SET category_id = dc.id
FROM document_categories dc
WHERE dp.category_id IS NULL
  AND dp.slug = 'courrier-professionnel-suisse' AND dc.slug = 'suisse';

-- ─── Seed FAQ for DUERP ─────────────────────────────────────
INSERT INTO document_faqs (document_id, question, answer, sort_order)
SELECT dp.id, q.question, q.answer, q.sort_order
FROM digital_products dp,
LATERAL (VALUES
  ('Le modèle DUERP est-il adapté à toutes les activités ?', 'Le modèle propose une trame générale applicable à la plupart des commerces, artisans et petites entreprises. Il doit être adapté à l''activité réelle de votre entreprise.', 1),
  ('Le DUERP est-il obligatoire ?', 'Oui, le Document Unique d''Évaluation des Risques Professionnels est obligatoire pour toute entreprise ayant au moins un salarié, depuis le décret du 5 novembre 2001.', 2),
  ('À quelle fréquence doit-on mettre à jour le DUERP ?', 'Le DUERP doit être mis à jour au moins une fois par an, et à chaque modification des conditions de travail.', 3)
) AS q(question, answer, sort_order)
WHERE dp.slug = 'modele-duerp'
ON CONFLICT DO NOTHING;
