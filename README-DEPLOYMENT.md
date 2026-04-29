# Déploiement Automatique - Site Loubna

## 🎯 Vue d'Ensemble

Ce projet est configuré pour un **déploiement automatique** sur le serveur VPS Hetzner via **GitHub Actions**.

- **Type** : Site statique Next.js (export)
- **Serveur** : Nginx (pas de Node.js runtime nécessaire)
- **Domaine** : juriste-droit-du-travail.com
- **Déploiement** : Automatique à chaque push sur `main`

---

## 🚀 Comment ça Fonctionne

### Workflow Automatique

```
1. Push sur main
   ↓
2. GitHub Actions se déclenche
   ↓
3. Build du site Next.js (fichiers statiques)
   ↓
4. Transfert des fichiers vers le VPS
   ↓
5. Déploiement sur Nginx
   ↓
6. Site en ligne sur juriste-droit-du-travail.com
```

### Architecture de Déploiement

```
/var/www/loubna-site/
├── current/              # Version actuelle (fichiers statiques)
├── backup-YYYYMMDD-HHMMSS/  # Backups automatiques
└── backup-YYYYMMDD-HHMMSS/  # (3 derniers backups conservés)
```

---

## 📋 Configuration Initiale (Une Seule Fois)

### 1. Configurer les Secrets GitHub

Voir le fichier **GITHUB-SECRETS.md** pour la liste complète.

Secrets requis :
- `VPS_HOST` : 65.21.104.251
- `VPS_USER` : root (ou votre utilisateur)
- `VPS_SSH_KEY` : Votre clé privée SSH
- `VPS_PORT` : 22
- `DEPLOY_PATH` : /var/www/loubna-site

### 2. Préparer le Serveur (Première Fois)

```bash
# Connexion au serveur
ssh root@65.21.104.251

# Créer le dossier de déploiement
sudo mkdir -p /var/www/loubna-site
sudo chown -R $USER:$USER /var/www/loubna-site

# Installer Nginx si nécessaire
sudo apt update
sudo apt install nginx -y
```

### 3. Configurer les DNS

Chez votre registrar de domaine :

**Enregistrement A** :
```
Type: A
Nom: @
Valeur: 65.21.104.251
```

**Enregistrement CNAME** :
```
Type: CNAME
Nom: www
Valeur: juriste-droit-du-travail.com
```

---

## 🔄 Déploiement Quotidien

### Déploiement Automatique

```bash
# Sur votre machine locale
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main

# Le workflow GitHub Actions se déclenche automatiquement
# Suivez les logs sur : https://github.com/Shahil-AppDev/Loubna/actions
```

### Déploiement Manuel (si nécessaire)

```bash
# Sur GitHub, onglet "Actions"
# Cliquez sur "Deploy to Hetzner VPS"
# Cliquez sur "Run workflow"
# Sélectionnez la branche "main"
# Cliquez sur "Run workflow"
```

---

## 🔒 Installer le Certificat SSL (Première Fois)

Après le premier déploiement et la propagation DNS :

```bash
# Connexion au serveur
ssh root@65.21.104.251

# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat SSL
sudo certbot --nginx -d juriste-droit-du-travail.com -d www.juriste-droit-du-travail.com

# Certbot configurera automatiquement Nginx pour HTTPS
# Le certificat se renouvellera automatiquement
```

---

## 📊 Monitoring et Vérifications

### Vérifier le Statut du Déploiement

1. **GitHub Actions** : https://github.com/Shahil-AppDev/Loubna/actions
2. **Logs du workflow** : Cliquez sur le dernier workflow pour voir les détails

### Vérifier le Site

```bash
# Test HTTP
curl -I http://juriste-droit-du-travail.com

# Test HTTPS (après SSL)
curl -I https://www.juriste-droit-du-travail.com

# Vérifier les fichiers sur le serveur
ssh root@65.21.104.251
ls -lh /var/www/loubna-site/current
```

### Vérifier Nginx

```bash
# Sur le serveur
sudo nginx -t                    # Tester la configuration
sudo systemctl status nginx      # Statut du service
sudo tail -f /var/log/nginx/loubna-access.log   # Logs d'accès
sudo tail -f /var/log/nginx/loubna-error.log    # Logs d'erreur
```

---

## 🛠️ Dépannage

### Le Workflow Échoue

1. Vérifiez les logs dans l'onglet "Actions"
2. Vérifiez que tous les secrets sont correctement configurés
3. Vérifiez la connexion SSH au serveur

### Le Site ne s'Affiche Pas

```bash
# Vérifier Nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier les fichiers
ls -lh /var/www/loubna-site/current

# Vérifier les permissions
sudo chown -R www-data:www-data /var/www/loubna-site/current
sudo chmod -R 755 /var/www/loubna-site/current
```

### Restaurer une Version Précédente

```bash
# Sur le serveur
cd /var/www/loubna-site

# Lister les backups disponibles
ls -lh | grep backup

# Restaurer un backup
sudo rm -rf current
sudo cp -r backup-YYYYMMDD-HHMMSS current
sudo chown -R www-data:www-data current
sudo systemctl reload nginx
```

---

## 📁 Structure du Projet

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow GitHub Actions
├── scripts/
│   └── deploy-server.sh        # Script de déploiement serveur
├── src/                        # Code source Next.js
├── public/                     # Assets statiques
├── out/                        # Build statique (généré)
├── GITHUB-SECRETS.md           # Documentation des secrets
├── DEPLOYMENT-GUIDE.md         # Guide de déploiement manuel
└── README-DEPLOYMENT.md        # Ce fichier
```

---

## 🔐 Sécurité

### Bonnes Pratiques

- ✅ Secrets GitHub chiffrés
- ✅ Connexion SSH par clé (pas de mot de passe)
- ✅ Backups automatiques avant chaque déploiement
- ✅ Test Nginx avant rechargement
- ✅ Isolation complète des autres projets
- ✅ HTTPS avec Let's Encrypt

### Isolation Multi-Projets

Le déploiement est conçu pour **ne jamais toucher** aux autres projets :

- ✅ Dossier dédié : `/var/www/loubna-site`
- ✅ Configuration Nginx séparée
- ✅ Logs dédiés
- ✅ Pas d'impact sur les autres sites

---

## 📞 Support

### Logs Utiles

```bash
# Logs GitHub Actions
https://github.com/Shahil-AppDev/Loubna/actions

# Logs Nginx
sudo tail -f /var/log/nginx/loubna-access.log
sudo tail -f /var/log/nginx/loubna-error.log

# Logs système
sudo journalctl -u nginx -f
```

### Commandes Rapides

```bash
# Redéployer manuellement
git push origin main

# Vérifier le site
curl -I https://www.juriste-droit-du-travail.com

# Recharger Nginx
sudo nginx -t && sudo systemctl reload nginx

# Voir les backups
ls -lh /var/www/loubna-site/ | grep backup
```

---

## ✅ Checklist de Déploiement

- [ ] Secrets GitHub configurés
- [ ] DNS configurés (A + CNAME)
- [ ] Serveur préparé (/var/www/loubna-site créé)
- [ ] Premier déploiement réussi
- [ ] Site accessible en HTTP
- [ ] Certificat SSL installé
- [ ] Site accessible en HTTPS
- [ ] Workflow GitHub Actions vert
- [ ] Autres projets non affectés

---

**Dernière mise à jour** : 29 avril 2026  
**Version** : 2.0.0 (Déploiement automatique)
