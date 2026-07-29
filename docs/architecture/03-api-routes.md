# Architecture — API Routes

## Routes publiques

### `/api/documents/catalog`
- **GET** : Liste des documents publiés (filtrage par catégorie, audience)
- **Feature flag** : `DOCUMENT_STORE_ENABLED` — retourne `{ documents: [], disabled: true }` si désactivé

### `/api/documents/search`
- **GET** : Recherche full-text dans documents publiés (name, subtitle, description, synonyms, tags)
- **Params** : `q`, `audience`, `category`, `format`, `limit`
- **Feature flag** : `DOCUMENT_STORE_ENABLED`

### `/api/documents/[slug]`
- **GET** : Détail d'un document publié (inclut FAQs + documents liés)
- **Feature flag** : `DOCUMENT_STORE_ENABLED` — retourne 503 si désactivé

### `/api/documents/checkout`
- **POST** : Crée une commande + initie un paiement SumUp
- **Feature flag** : `DOCUMENT_STORE_ENABLED` ou `DIGITAL_DUERP_SALES_ENABLED`
- **Body** : `{ slug, firstName, lastName, email, acceptTerms }`
- **Réponse** : `{ orderId, checkoutId, checkoutReference, url }`

## Routes admin (auth requis)

### `/api/admin/documents`
- **GET** : Liste tous les documents (tous statuts) avec stats (commandes, revenus)
- **PATCH** : Met à jour un document (statut, prix, SEO, catégorie, etc.)

### `/api/admin/digital-orders`
- **GET** : Liste des commandes de produits numériques

## Webhooks

### `/api/payments/sumup/webhook`
- **POST** : Webhook SumUp pour confirmer les paiements
- **Vérification** : Signature webhook SumUp
- **Actions** :
  - Met à jour le statut de la commande
  - Génère un token de téléchargement
  - Envoie l'email de livraison
  - Notifie l'admin
- **Idempotence** : Vérifie si la commande est déjà traitée

## Sécurité

- Toutes les routes admin passent par `requireAdmin()` (vérification session iron-session)
- Les routes publiques de documents sont protégées par feature flag
- Les webhooks vérifient la signature SumUp
- Validation des entrées sur toutes les routes POST/PATCH
