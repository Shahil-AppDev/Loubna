# Architecture — CI/CD & Déploiement

## GitHub Actions Workflow

**Fichier** : `.github/workflows/deploy.yml`

### Déclencheur
- Push sur `main`
- Manual dispatch

### Étapes

1. **Checkout** — Récupération du code
2. **Setup Node.js** — Node 20 + cache npm
3. **Install** — `npm ci`
4. **Build Next.js** — `npm run build` (CI gate, non bloquant sur warnings)
5. **SSH Deploy** — Connexion au VPS via SSH key

### Déploiement SSH (script inline)

```
1. Création répertoire temporaire
2. rsync des fichiers (excluding .git, node_modules, .next)
3. Installation dépendances (npm ci --production)
4. Copie des migrations SQL
5. Exécution migrations (idempotentes) :
   a. migration-payment-gated.sql
   b. migration-digital-products.sql
   c. migration-document-marketplace.sql
6. Écriture du fichier .env (avec secrets GitHub)
7. Build Next.js sur serveur
8. Swap atomique (mv current → old, mv temp → current)
9. Restart PM2 (delete + free port + fresh start)
10. Health check
```

## Secrets GitHub requis

| Secret | Description |
|--------|-------------|
| `SSH_HOST` | Hôte du VPS |
| `SSH_USER` | Utilisateur SSH |
| `SSH_KEY` | Clé privée SSH |
| `POSTGRES_HOST` | Hôte PostgreSQL |
| `POSTGRES_PORT` | Port PostgreSQL |
| `POSTGRES_USER` | Utilisateur PostgreSQL |
| `POSTGRES_PASSWORD` | Mot de passe PostgreSQL |
| `POSTGRES_DATABASE` | Nom de la base |
| `SUMUP_MERCHANT_CODE` | Code marchand SumUp |
| `SUMUP_API_KEY` | Clé API SumUp |
| `SUMUP_WEBHOOK_SECRET` | Secret webhook SumUp |
| `RESEND_API_KEY` | Clé API Resend |
| `SESSION_PASSWORD` | Mot de passe iron-session |
| `ADMIN_USERNAME` | Nom d'utilisateur admin |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt admin |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site |
| `DOCUMENT_STORE_ENABLED` | Feature flag boutique (`false`) |
| `DIGITAL_DUERP_SALES_ENABLED` | Feature flag DUERP (`false`) |
| `DUERP_PDF_PRIVATE_PATH` | Chemin fichier DUERP privé |

## Configuration serveur

- **OS** : Ubuntu 22.04 LTS
- **Node.js** : 20.x (via nvm)
- **Process manager** : PM2
- **Reverse proxy** : nginx (HTTPS via Let's Encrypt)
- **PostgreSQL** : 15.x
- **Port** : 3000 (Next.js) → nginx → 443 (HTTPS)

## Rollback

En cas d'échec après swap :
```bash
mv /var/www/projects/juriste-droit-du-travail/current \
   /var/www/projects/juriste-droit-du-travail/failed-$(date +%s)
mv /var/www/projects/juriste-droit-du-travail/old \
   /var/www/projects/juriste-droit-du-travail/current
pm2 restart loubna
```
