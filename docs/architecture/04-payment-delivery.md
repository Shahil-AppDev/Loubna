# Architecture — Paiement & Livraison

## Flux de paiement (SumUp)

```
Utilisateur → Page document → Formulaire checkout
    ↓
POST /api/digital-products/duerp/checkout   (DUERP, route dédiée)
  ou POST /api/documents/checkout           (autres documents, route générique)
    ↓
1. Rate limiting par IP (5 requêtes / 15 min)
2. Validation des champs (slug, nom, email, acceptTerms, acceptWithdrawalWaiver)
3. Vérification feature flag (DIGITAL_DUERP_SALES_ENABLED et/ou DOCUMENT_STORE_ENABLED)
4. Chargement produit depuis DB (status=published, is_active=true)
5. Prix = product.price_amount lu en DB — jamais transmis par le frontend
6. Vérification private_file_path existe (route générique)
7. Création commande en DB (status=pending_payment, amount = prix DB)
8. Création checkout SumUp (hosted checkout)
9. Envoi email "paiement en attente"
    ↓
Redirection vers SumUp hosted checkout
    ↓
Paiement CB sur SumUp
    ↓
SumUp → POST /api/payments/sumup/webhook
    ↓
1. Vérification du header secret (x-sumup-webhook-secret), obligatoire en
   production — SumUp ne signe pas ses webhooks par HMAC, ce header partagé
   est notre seule barrière avant re-vérification API.
2. Re-vérification systématique auprès de l'API SumUp (getSumUpCheckoutByReference)
   — le payload webhook n'est jamais considéré comme source de vérité seule.
3. Chargement commande par checkout_reference (provider_reference)
4. Idempotence : skip si order.status déjà 'paid'/'fulfilled'
5. Vérification montant + devise (checkout.amount vs order.amount, tolérance 0.01)
6. Mise à jour statut commande (paid → fulfilled)
7. Génération token de téléchargement (hash SHA-256 + expiry 72h)
8. Envoi email "livraison" avec lien de téléchargement
9. Notification admin
```

> Le statut de commande est aussi vérifié en polling côté client
> (`GET /api/digital-orders/[orderId]/status`, toutes les 3s) qui répète la
> même re-vérification SumUp — utile si le webhook est en retard ou manqué.

## Préfixes de référence

| Préfixe | Type |
|---------|------|
| `DUERP-` | Commande DUERP (route dédiée) |
| `DOC-` | Commande document générique |

## Token de téléchargement

- Généré après paiement confirmé (`fulfillOrder()`, transaction DB atomique)
- Token brut = `crypto.randomBytes(32)` ; seul le hash SHA-256 est stocké en DB (`download_tokens.token_hash`)
- Expiration : **72 heures** (`TOKEN_VALIDITY_HOURS = 72`)
- Maximum **3 téléchargements** (`MAX_DOWNLOADS = 3`), incrément atomique
  (`UPDATE ... WHERE download_count < max_downloads`) pour éviter toute
  race condition
- URL réelle : `GET /api/downloads/duerp?token=xxx`
  (le lien envoyé au client pointe en fait vers `/telechargement/duerp?token=xxx`,
  une page qui appelle cette route)
- Rate limiting : 20 requêtes / 15 min par IP sur la route de téléchargement
- Audit : chaque téléchargement est loggé dans `digital_audit_log`

## Stockage sécurisé

```
/var/www/projects/juriste-droit-du-travail/
├── public/              # Web root (nginx) — AUCUN fichier payant
├── private-products/    # Hors web root — fichiers payants
│   └── duerp-modele.pdf
└── current/             # Build Next.js (PM2)
```

- Les fichiers payants ne sont JAMAIS dans `public/`
- Accès uniquement via token de téléchargement
- Vérification d'intégrité via SHA-256
- `.gitignore` exclut `*.pdf` et `private-products/` sans exception — voir
  `docs/PRIVATE_PRODUCT_DEPLOYMENT.md` pour la procédure de dépôt du fichier
  réel sur le serveur

## Feature flags requis

| Variable | Effet |
|----------|-------|
| `DIGITAL_DUERP_SALES_ENABLED=true` | Active `/api/digital-products/duerp/checkout` (achat DUERP) |
| `DOCUMENT_STORE_ENABLED=true` | Active `/api/documents/catalog`, `/api/documents/[slug]`, `/api/documents/search` (visibilité dans `/documents`) |

Les deux flags sont des secrets GitHub Actions injectés au déploiement — ils
ne gèrent que la **visibilité/disponibilité** des routes. La confidentialité
des documents non publiés est garantie indépendamment par le filtre SQL
`status = 'published' AND is_active = true`, présent sur toutes les requêtes :
activer `DOCUMENT_STORE_ENABLED` n'expose donc jamais les documents en
`draft` (actuellement tous les documents sauf `modele-duerp`).

## Remboursements

- Traitement manuel via l'admin ou l'API SumUp
- Droit de rétractation : 14 jours, avec renoncement explicite recueilli par
  une case à cocher dédiée (distincte de l'acceptation des CGV) au moment de
  l'achat — voir `ModeleDuerpClient.tsx` / `DocumentDetailClient.tsx`.
  ⚠️ La formulation exacte de cette case reprend le principe standard de
  l'art. L.221-28 13° du Code de la consommation mais n'a pas été relue par
  un professionnel du droit — voir le TODO bloquant dans le code avant tout
  lancement commercial à grande échelle.
