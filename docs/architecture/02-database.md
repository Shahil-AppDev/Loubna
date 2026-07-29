# Architecture — Base de données

## Schéma

### Tables principales

#### `appointments`
Rendez-vous clients (consultations, suivis).

#### `payments`
Paiements liés aux rendez-vous (SumUp).

#### `digital_products`
Produits numériques téléchargeables (DUERP, courriers, modèles).

| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID PK | Identifiant unique |
| slug | TEXT UNIQUE | Slug URL |
| name | TEXT | Nom du produit |
| subtitle | TEXT | Sous-titre |
| description | TEXT | Description longue |
| usage_description | TEXT | Comment utiliser le document |
| target_audience | TEXT | `employeur`, `salarie`, `all` |
| category_id | UUID FK | Référence vers `document_categories` |
| subcategory | TEXT | Sous-catégorie |
| synonyms | TEXT[] | Synonymes pour recherche |
| tags | TEXT[] | Tags |
| format | TEXT | `PDF`, `DOCX` |
| page_count | INT | Nombre de pages |
| price_amount | NUMERIC(10,2) | Prix |
| currency | TEXT | `EUR` |
| product_type | TEXT | `template`, `guide` |
| status | TEXT | `draft`, `published` |
| is_featured | BOOL | Mis en avant |
| is_popular | BOOL | Populaire |
| is_active | BOOL | Actif |
| private_file_path | TEXT | Chemin fichier privé (hors web root) |
| file_sha256 | TEXT | Hash pour intégrité |
| preview_key | TEXT | Clé d'aperçu |
| version | TEXT | Version du document |
| published_at | TIMESTAMPTZ | Date de publication |
| last_reviewed_at | TIMESTAMPTZ | Dernière révision |
| author | TEXT | Auteur |
| reviewer | TEXT | Réviseur |
| legal_sources | TEXT | Sources légales |
| disclaimer | TEXT | Disclaimer spécifique |
| seo_title | TEXT | Title SEO |
| seo_description | TEXT | Meta description SEO |

#### `digital_orders`
Commandes de produits numériques.

#### `download_tokens`
Tokens de téléchargement temporaires (liés à une commande payée).

#### `digital_audit_log`
Journal d'audit des téléchargements.

#### `document_categories`
Catégories de documents (10 catégories seedées).

#### `document_faqs`
FAQ par document (contrainte unique sur `document_id + question`).

#### `document_related_items`
Documents liés (relations manuelles entre documents).

#### `search_logs`
Journal des recherches utilisateurs (query, filtres, nombre de résultats).

## Migrations

Les migrations sont idempotentes et exécutées dans l'ordre suivant :
1. `migration-payment-gated.sql` — Tables paiements + rendez-vous
2. `migration-digital-products.sql` — Tables produits numériques + DUERP
3. `migration-document-marketplace.sql` — Extension catalogue + catégories + FAQs

## Index

- `idx_digital_products_slug` — Recherche par slug
- `idx_digital_products_status` — Filtrage par statut
- `idx_digital_orders_product_id` — Commandes par produit
- `idx_digital_orders_status` — Commandes par statut
- `idx_digital_orders_email` — Commandes par email client
- `idx_download_tokens_token_hash` — Recherche token
- `idx_doc_categories_slug` — Catégories par slug
- `idx_doc_faqs_document_id` — FAQs par document
