# Architecture — Paiement & Livraison

## Flux de paiement (SumUp)

```
Utilisateur → Page document → Formulaire checkout
    ↓
POST /api/documents/checkout
    ↓
1. Validation des champs (slug, nom, email, acceptTerms)
2. Vérification feature flag (DOCUMENT_STORE_ENABLED)
3. Chargement produit depuis DB (status=published, is_active=true)
4. Vérification private_file_path existe
5. Création commande en DB (status=pending_payment)
6. Création checkout SumUp (hosted checkout)
7. Envoi email "paiement en attente"
    ↓
Redirection vers SumUp hosted checkout
    ↓
Paiement CB sur SumUp
    ↓
SumUp → POST /api/payments/sumup/webhook
    ↓
1. Vérification signature webhook
2. Chargement commande par checkout_reference
3. Idempotence : vérifie si déjà traité
4. Mise à jour statut commande (paid → fulfilled)
5. Génération token de téléchargement (hash + expiry 7 jours)
6. Envoi email "livraison" avec lien de téléchargement
7. Notification admin
```

## Préfixes de référence

| Préfixe | Type |
|---------|------|
| `DUERP-` | Commande DUERP (route dédiée) |
| `DOC-` | Commande document générique |

## Token de téléchargement

- Généré après paiement confirmé
- Stocké hashé en DB (`download_tokens`)
- Expiration : 7 jours
- URL format : `/api/digital-products/download?token=xxx`
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

## Remboursements

- Traitement manuel via l'admin ou l'API SumUp
- Droit de rétractation : 14 jours (sauf renoncement explicite pour contenu numérique)
