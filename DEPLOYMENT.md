# 🚀 GUIDE DE DÉPLOIEMENT - SITE LOUBNA

## 📋 ARCHITECTURE

**Stack technique** :
- **Frontend** : Next.js 14 (mode serveur)
- **Backend** : PostgreSQL + API Routes Next.js
- **Auth** : bcrypt + iron-session
- **Paiement** : Stripe
- **Process Manager** : PM2
- **Web Server** : Nginx (reverse proxy)
- **Serveur** : Hetzner VPS Ubuntu

**Ports utilisés** :
- `3000` : Next.js (interne)
- `80` : HTTP (Nginx)
- `443` : HTTPS (Nginx + Let's Encrypt)
- `5432` : PostgreSQL (interne)

---

## 🔧 CONFIGURATION INITIALE SERVEUR (Une seule fois)

### 1. Prérequis Serveur

```bash
# Se connecter au serveur
ssh user@your-server-ip

# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2 globalement
sudo npm install -g pm2

# Installer PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Installer Nginx
sudo apt install -y nginx

# Installer Certbot pour SSL
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Configuration PostgreSQL

```bash
# Démarrer PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Créer la base de données
sudo -u postgres psql

# Dans psql :
CREATE DATABASE loubna_db;
CREATE USER loubna_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE_SECURISE';
GRANT ALL PRIVILEGES ON DATABASE loubna_db TO loubna_user;
\q

# Exécuter le schéma SQL (après premier déploiement)
cd /var/www/juriste-droit-du-travail/current
psql -U loubna_user -d loubna_db -f supabase/schema-postgres.sql
```

### 3. Configuration Nginx Reverse Proxy

```bash
# Créer la configuration
sudo nano /etc/nginx/sites-available/juriste-droit-du-travail
```

**Contenu** :
```nginx
server {
    listen 80;
    server_name juriste-droit-du-travail.com www.juriste-droit-du-travail.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Logs
    access_log /var/log/nginx/loubna-access.log;
    error_log /var/log/nginx/loubna-error.log;
}
```

**Activer la configuration** :
```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/juriste-droit-du-travail /etc/nginx/sites-enabled/

# Supprimer la config par défaut
sudo rm -f /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

### 4. Configuration SSL (Let's Encrypt)

```bash
# Installer le certificat SSL
sudo certbot --nginx -d juriste-droit-du-travail.com -d www.juriste-droit-du-travail.com

# Renouvellement automatique (déjà configuré par Certbot)
sudo certbot renew --dry-run
```

### 5. Variables d'Environnement

```bash
# Créer le fichier .env.local
cd /var/www/juriste-droit-du-travail/current
nano .env.local
```

**Contenu** :
```env
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=loubna_db
POSTGRES_USER=loubna_user
POSTGRES_PASSWORD=VOTRE_MOT_DE_PASSE

# Session (générer avec: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET=VOTRE_CLE_ALEATOIRE_32_CARACTERES_MINIMUM

# Stripe
STRIPE_SECRET_KEY=sk_live_VOTRE_CLE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE

# Site
NEXT_PUBLIC_SITE_URL=https://www.juriste-droit-du-travail.com
```

### 6. Créer un Compte Admin

```bash
cd /var/www/juriste-droit-du-travail/current
node scripts/create-admin.js admin@example.com VotreMotDePasse123
```

---

## 🔄 DÉPLOIEMENT AUTOMATIQUE (GitHub Actions)

Le déploiement est **automatique** à chaque push sur la branche `main`.

### Workflow

1. **Push vers GitHub** → Déclenche le workflow
2. **Build Next.js** → Compile l'application
3. **Transfert fichiers** → Rsync vers le serveur
4. **Exécution script** → `deploy-nextjs.sh` démarre l'app avec PM2
5. **Vérification** → Teste que l'app répond

### GitHub Secrets Requis

Configurer dans **Settings → Secrets and variables → Actions** :

| Secret | Description | Exemple |
|--------|-------------|---------|
| `VPS_HOST` | IP du serveur Hetzner | `123.45.67.89` |
| `VPS_USER` | Utilisateur SSH | `root` ou `ubuntu` |
| `VPS_PORT` | Port SSH | `22` |
| `VPS_SSH_KEY` | Clé privée SSH | Contenu de `~/.ssh/id_rsa` |
| `DEPLOY_PATH` | Chemin de déploiement | `/var/www/juriste-droit-du-travail` |

---

## 📦 STRUCTURE DÉPLOIEMENT

```
/var/www/juriste-droit-du-travail/
├── current/                    # Version actuelle
│   ├── .next/                 # Build Next.js
│   ├── node_modules/          # Dépendances
│   ├── public/                # Assets statiques
│   ├── package.json
│   ├── .env.local            # Variables d'environnement
│   └── deploy-nextjs.sh      # Script de déploiement
├── backup-20260511-140000/   # Backup automatique
└── backup-20260510-120000/   # Anciens backups (max 3)
```

---

## 🛠️ COMMANDES UTILES

### Gestion PM2

```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs nextjs-loubna

# Redémarrer l'application
pm2 restart nextjs-loubna

# Arrêter l'application
pm2 stop nextjs-loubna

# Démarrer l'application
pm2 start nextjs-loubna

# Voir les métriques
pm2 monit
```

### Gestion Nginx

```bash
# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir les logs
sudo tail -f /var/log/nginx/loubna-error.log
sudo tail -f /var/log/nginx/loubna-access.log
```

### Gestion PostgreSQL

```bash
# Se connecter à la base
psql -U loubna_user -d loubna_db

# Voir les tables
\dt

# Backup de la base
pg_dump -U loubna_user loubna_db > backup.sql

# Restaurer un backup
psql -U loubna_user -d loubna_db < backup.sql
```

---

## 🔙 PROCÉDURE ROLLBACK

En cas de problème avec un déploiement :

```bash
# Se connecter au serveur
ssh user@your-server-ip

# Aller dans le dossier de déploiement
cd /var/www/juriste-droit-du-travail

# Voir les backups disponibles
ls -la | grep backup

# Arrêter l'application actuelle
pm2 stop nextjs-loubna
pm2 delete nextjs-loubna

# Restaurer le backup
sudo rm -rf current
sudo cp -r backup-TIMESTAMP current
sudo chown -R $USER:$USER current

# Redémarrer l'application
cd current
pm2 start npm --name "nextjs-loubna" -- start
pm2 save

# Vérifier
pm2 status
curl http://localhost:3000
```

---

## 🧪 TESTS POST-DÉPLOIEMENT

### 1. Vérifier l'Application

```bash
# Test local sur le serveur
curl http://localhost:3000

# Test via Nginx
curl http://localhost

# Test depuis internet
curl https://www.juriste-droit-du-travail.com
```

### 2. Vérifier PM2

```bash
pm2 status
# Doit montrer "nextjs-loubna" en status "online"
```

### 3. Vérifier PostgreSQL

```bash
psql -U loubna_user -d loubna_db -c "SELECT COUNT(*) FROM admin_users;"
# Doit retourner au moins 1 admin
```

### 4. Tester le Back Office

- Aller sur https://www.juriste-droit-du-travail.com/admin/login
- Se connecter avec le compte admin
- Vérifier le dashboard

---

## 🚨 TROUBLESHOOTING

### Erreur 502 Bad Gateway

**Cause** : Next.js ne tourne pas

**Solution** :
```bash
pm2 status
pm2 logs nextjs-loubna
pm2 restart nextjs-loubna
```

### Erreur 403 Forbidden

**Cause** : Problème de permissions

**Solution** :
```bash
sudo chown -R $USER:$USER /var/www/juriste-droit-du-travail/current
```

### Application ne démarre pas

**Cause** : Erreur dans le code ou dépendances manquantes

**Solution** :
```bash
cd /var/www/juriste-droit-du-travail/current
npm ci --production
pm2 logs nextjs-loubna --lines 50
```

### Base de données inaccessible

**Cause** : PostgreSQL non démarré ou mauvaises credentials

**Solution** :
```bash
sudo systemctl status postgresql
sudo systemctl start postgresql
psql -U loubna_user -d loubna_db
```

---

## 📊 MONITORING

### Logs à surveiller

```bash
# Logs Next.js
pm2 logs nextjs-loubna

# Logs Nginx
sudo tail -f /var/log/nginx/loubna-error.log

# Logs système
sudo journalctl -u nginx -f
```

### Métriques PM2

```bash
# Dashboard temps réel
pm2 monit

# Statistiques
pm2 show nextjs-loubna
```

---

## 🔐 SÉCURITÉ

### Checklist Sécurité

- [ ] SSL/HTTPS activé (Let's Encrypt)
- [ ] Firewall configuré (UFW)
- [ ] PostgreSQL accessible uniquement en local
- [ ] Variables d'environnement sécurisées (.env.local)
- [ ] SESSION_SECRET aléatoire et unique
- [ ] Mots de passe forts pour PostgreSQL et admin
- [ ] Backups réguliers de la base de données
- [ ] Logs rotatifs configurés

### Configuration Firewall

```bash
# Activer UFW
sudo ufw enable

# Autoriser SSH
sudo ufw allow 22/tcp

# Autoriser HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Vérifier
sudo ufw status
```

---

## ✅ CHECKLIST DÉPLOIEMENT

### Configuration Initiale (Une fois)

- [ ] Serveur Hetzner provisionné
- [ ] Node.js 20 installé
- [ ] PM2 installé globalement
- [ ] PostgreSQL installé et configuré
- [ ] Nginx installé et configuré
- [ ] SSL Let's Encrypt configuré
- [ ] DNS pointant vers le serveur
- [ ] GitHub Secrets configurés
- [ ] .env.local créé sur le serveur
- [ ] Schéma SQL exécuté
- [ ] Compte admin créé

### À Chaque Déploiement (Automatique)

- [ ] Build Next.js réussi
- [ ] Transfert fichiers réussi
- [ ] PM2 redémarre l'application
- [ ] Application répond sur port 3000
- [ ] Site accessible via HTTPS
- [ ] Back office accessible

---

## 📞 SUPPORT

**En cas de problème** :

1. Vérifier les logs PM2 : `pm2 logs nextjs-loubna`
2. Vérifier les logs Nginx : `sudo tail -f /var/log/nginx/loubna-error.log`
3. Vérifier le statut : `pm2 status`
4. Tester localement : `curl http://localhost:3000`
5. Rollback si nécessaire (voir procédure ci-dessus)

---

**Dernière mise à jour** : 11 mai 2026
