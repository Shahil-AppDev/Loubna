# Audit Technique — Plateforme Documents Loubna Abouz Manta

## 1. Architecture actuelle

### Stack
- **Framework**: Next.js 14+ App Router
- **DB**: PostgreSQL (Hetzner VPS)
- **Paiement**: SumUp (hosted checkout)
- **Emails**: Resend
- **Auth admin**: iron-session (bcrypt)
- **CI/CD**: GitHub Actions → SSH → PM2
- **Serveur**: Hetzner VPS, Nginx reverse proxy, Node 20

### Routes existantes pertinentes
| Route | Type | Rôle |
|-------|------|------|
| `/` | Public | Accueil |
| `/services` | Public | Liste services |
| `/services/[slug]` | Public | Fiche service |
| `/rendez-vous` | Public | Prise de RDV + paiement SumUp |
| `/rendez-vous/confirmation` | Public | Confirmation paiement RDV |
| `/blog` | Public | Liste articles |
| `/blog/[slug]` | Public | Article blog |
| `/documents/modele-duerp` | Public | Fiche produit DUERP (déjà créé) |
| `/documents/modele-duerp/confirmation` | Public | Confirmation achat DUERP |
| `/telechargement/duerp` | Public | Téléchargement sécurisé DUERP |
| `/cgv-numerique` | Public | CGV numériques |
| `/admin` | Auth | Dashboard |
| `/admin/appointments` | Auth | Gestion RDV |
| `/admin/documents` | Auth | Ventes documents numériques |
| `/admin/cms` | Auth | CMS pages/blog/FAQ/SEO |
| `/api/payments/sumup/*` | API | SumUp checkout + webhook + status |
| `/api/digital-products/duerp/checkout` | API | Checkout DUERP |
| `/api/digital-orders/[orderId]/status` | API | Statut commande + fulfillOrder |
| `/api/downloads/duerp` | API | Téléchargement sécurisé |
| `/api/admin/digital-orders` | API | Admin ventes |

### Briques déjà réutilisables
1. **SumUp service layer** (`src/lib/sumup.ts`) — createSumUpCheckout, getSumUpCheckoutByReference, status mapping. **100% réutilisable**.
2. **DB pool** (`src/lib/db/postgres.ts`) — query + getClient. **Réutilisable**.
3. **Email templates** (`src/lib/email/template.ts`) — EmailLayout, EmailButton, EmailCard, EmailInfoTable. **Réutilisable**.
4. **Digital emails** (`src/lib/email/send-digital-emails.ts`) — 4 templates (pending, delivery, failed, admin). **Réutilisable, à généraliser** (actuellement hardcodé "DUERP").
5. **Download secure route** (`src/app/api/downloads/duerp/route.ts`) — Token validation, path traversal prevention, atomic count. **Réutilisable, à généraliser**.
6. **Webhook handler** (`src/app/api/payments/sumup/webhook/route.ts`) — handleDigitalOrderWebhook avec vérification montant/devise + idempotence. **Réutilisable, à étendre** (prefix `DUERP-` → `DOC-`).
7. **fulfillOrder** (`src/app/api/digital-orders/[orderId]/status/route.ts`) — Génération token + email. **Réutilisable, à généraliser**.
8. **Admin layout** (`src/app/admin/layout.tsx`) — Sidebar + auth. **Réutilisable**.
9. **SEO config** (`src/data/seo.ts`) — Centralisé. **Réutilisable**.
10. **Sitemap** (`src/app/sitemap.ts`) — Dynamique. **Réutilisable**.
11. **Robots.txt** (`src/app/robots.ts`) — Disallow /admin, /api. **Réutilisable**.
12. **Feature flag pattern** — `DIGITAL_DUERP_SALES_ENABLED`. **Réutilisable, à étendre**.

### Tables DB existantes
- `digital_products` — slug, name, description, price_amount, currency, file_key, private_file_path, file_sha256, is_active
- `digital_orders` — product_id, customer info, amount, status, provider info, paid_at
- `download_tokens` — order_id, token_hash, expires_at, max_downloads, download_count, revoked_at
- `digital_audit_log` — order_id, action, performed_by, details

## 2. Risques de régression

| Risque | Mitigation |
|--------|------------|
| Casser le tunnel DUERP existant | Migration ADDITIVE (ALTER TABLE + nouvelles tables), jamais DROP |
| Webhook confusion DUERP vs nouveaux documents | Prefix `DOC-` pour nouveaux, `DUERP-` conservé |
| Conflit de routes `/documents/modele-duerp` vs `/documents/[slug]` | Route statique prioritaire sur dynamique dans App Router |
| Feature flag désactivé par défaut | `DOCUMENT_STORE_ENABLED=false` jusqu'à validation |

## 3. Dette technique

- Emails hardcodés "DUERP" → à généraliser avec param `productName`
- Download route spécifique DUERP → à généraliser avec `document_id`
- Checkout route spécifique DUERP → à généraliser avec `slug` param
- Pas de table `document_categories` → à créer
- Pas de table `document_faqs` → à créer
- Pas de recherche → à créer

## 4. Dépendances

- `resend` — déjà installé
- `pg` — déjà installé
- `iron-session` — déjà installé
- `bcryptjs` — déjà installé
- Aucune nouvelle dépendance requise pour le Lot 1

## 5. Recommandations

1. **Migration additive** — Étendre `digital_products` avec nouvelles colonnes + créer nouvelles tables
2. **Généraliser les routes** — `/api/documents/checkout` (slug param) au lieu de route par produit
3. **Prefix webhook** — `DOC-` pour tous documents, `DUERP-` conservé pour backward compat
4. **Feature flags séparés** — `DOCUMENT_STORE_ENABLED`, `DOCUMENT_SEARCH_ENABLED`
5. **Catalogue en DB** — Pas de fichiers statiques pour les documents, tout en base

## 6. Plan de migration

1. Migration SQL additive (nouvelles colonnes + nouvelles tables)
2. Seed catégories + 10 documents (status=draft)
3. Types TypeScript étendus
4. Routes catalogue + recherche + fiche
5. Généralisation checkout/download/emails
6. Admin catalogue
7. SEO + sitemap
8. Feature flags + deploy
