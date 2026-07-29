# Architecture — Sécurité & RGPD

## Authentification

### Admin
- **Méthode** : iron-session (cookies signés, httpOnly)
- **Stockage mot de passe** : bcrypt (cost 12)
- **Session** : 24h, renouvellement automatique
- **Middleware** : `requireAdmin()` sur toutes les routes `/api/admin/*` et pages `/admin/*`

### Client (futur)
- Espace client `/mon-compte` — actuellement désactivé
- Sera basé sur iron-session avec un flux similaire

## Feature Flags

| Flag | Effet quand `false` |
|------|---------------------|
| `DOCUMENT_STORE_ENABLED` | API catalog/search/detail retournent `{ disabled: true }`, checkout retourne 503, pages affichent message "en préparation" |
| `DIGITAL_DUERP_SALES_ENABLED` | Checkout DUERP spécifique désactivé |

## Sécurité des fichiers

### Fichiers payants
- Stockés dans `/var/www/projects/juriste-droit-du-travail/private-products/`
- **Hors web root** — non accessibles via URL directe
- Accès uniquement via `/api/digital-products/download?token=xxx`
- Token : hash SHA-256, expiration 7 jours, usage limité
- Audit : chaque téléchargement loggé dans `digital_audit_log`
- Intégrité : vérification SHA-256 du fichier

### Fichiers publics
- Aucun fichier payant dans `public/`
- `.gitignore` exclut `*.pdf` du repo

## Webhooks SumUp

- Vérification de signature : `HMAC-SHA256` avec `SUMUP_WEBHOOK_SECRET`
- Idempotence : vérification du statut de la commande avant traitement
- Erreurs loggées mais ne renvoient pas d'erreur à SumUp (pour éviter retries)

## RGPD

### Données collectées

| Donnée | Source | Durée de conservation |
|--------|--------|----------------------|
| Nom, prénom, email | Formulaire checkout | 3 ans (obligation comptable) |
| Détails commande | Achat | 10 ans (obligation comptable) |
| Logs de recherche | Recherche catalogue | 1 an |
| Audit de téléchargement | Téléchargement | 3 ans |

### Droits des utilisateurs

- **Accès** : l'utilisateur peut demander ses données
- **Rectification** : modification des données personnelles
- **Suppression** : suppression des données (sauf obligations comptables)
- **Portabilité** : export des données

### Contact RGPD

Via le formulaire de contact ou par email.

## Headers de sécurité (nginx)

```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

## HTTPS

- Let's Encrypt (renouvellement automatique)
- Redirection 301 HTTP → HTTPS
- TLS 1.2+ uniquement
