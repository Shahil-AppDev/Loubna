# Architecture — Vue d'ensemble

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 14 (App Router) + React 18 + Tailwind CSS |
| Backend | Next.js API Routes (Node.js runtime) |
| Base de données | PostgreSQL 15 (Supabase / VPS) |
| Authentification | iron-session (cookies signés) + bcrypt |
| Paiement | SumUp (hosted checkout + webhooks) |
| Email | Resend (transactionnel) |
| Déploiement | GitHub Actions → VPS (SSH + PM2 + nginx) |
| Monitoring | PM2 + logs serveur |

## Structure du projet

```
src/
├── app/                    # App Router (pages + API routes)
│   ├── (public)/           # Pages publiques
│   ├── admin/              # Backoffice (auth requis)
│   ├── api/                # API routes
│   │   ├── documents/      # API marketplace documents
│   │   ├── payments/       # Webhooks SumUp
│   │   └── admin/          # API admin
│   ├── documents/          # Pages boutique documents
│   ├── guides/             # Pages guides pratiques
│   └── ...
├── lib/                    # Logique métier
│   ├── db/                 # Pool PostgreSQL
│   ├── auth/               # Auth + middleware
│   ├── sumup.ts            # Intégration SumUp
│   └── email/              # Templates email
├── data/                   # Données statiques (catégories, etc.)
├── types/                  # Types TypeScript
supabase/                   # Migrations SQL
.github/workflows/          # CI/CD
```

## Flux de déploiement

1. Push sur `main` → GitHub Actions déclenché
2. Build Next.js (CI gate — vérifie types + build)
3. SSH vers VPS → rsync des fichiers
4. Migrations SQL idempotentes (payment, digital-products, document-marketplace)
5. Swap atomique (mv)
6. Restart PM2 (delete + fresh start)
7. Health check

## Feature flags

| Variable | Description | Défaut |
|----------|-------------|--------|
| `DOCUMENT_STORE_ENABLED` | Active la boutique de documents publique | `false` |
| `DIGITAL_DUERP_SALES_ENABLED` | Active la vente du DUERP | `false` |

## Sécurité

- Mots de passe : bcrypt (cost 12)
- Sessions : iron-session (cookies httpOnly, signed)
- Paiement : SumUp hosted checkout (pas de stockage CB)
- Fichiers payants : stockage privé hors web root
- Webhooks : vérification signature SumUp
- Admin : middleware d'authentification sur toutes les routes
