# Guide de Déploiement VPS - Site Loubna

## 📋 Informations du Serveur

- **IP**: 65.21.104.251
- **Domaine**: juriste-droit-du-travail.com
- **Domaine www**: www.juriste-droit-du-travail.com
- **Dossier**: /var/www/loubna-site
- **Port**: 3025 (ou premier port libre si occupé)
- **PM2 Process**: loubna-site

## ⚠️ IMPORTANT - Serveur Multi-Projets

Ce serveur héberge **plusieurs projets en production**. Le script de déploiement est conçu pour :

✅ **NE PAS** toucher aux autres projets  
✅ **NE PAS** modifier les configurations existantes  
✅ **NE PAS** arrêter les autres services  
✅ **SAUVEGARDER** avant toute modification  
✅ **TESTER** avant de recharger Nginx  

## 🚀 Déploiement en 3 Étapes

### Étape 1 : Connexion au Serveur

```bash
ssh root@65.21.104.251
# ou
ssh votre-user@65.21.104.251
```

### Étape 2 : Télécharger et Exécuter le Script

```bash
# Télécharger le script
wget https://raw.githubusercontent.com/Shahil-AppDev/Loubna/main/deploy-to-vps.sh

# Rendre le script exécutable
chmod +x deploy-to-vps.sh

# Exécuter le script
sudo ./deploy-to-vps.sh
```

### Étape 3 : Configuration DNS

Chez votre registrar de domaine, configurez :

**Enregistrements A** (pour juriste-droit-du-travail.com) :
```
Type: A
Nom: @
Valeur: 65.21.104.251
TTL: 3600
```

**Enregistrement CNAME** (pour www) :
```
Type: CNAME
Nom: www
Valeur: juriste-droit-du-travail.com
TTL: 3600
```

## 🔒 Certificat SSL (Après Propagation DNS)

Une fois les DNS propagés (1-2h), installez le certificat SSL :

```bash
# Installer Certbot si nécessaire
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat SSL
sudo certbot --nginx -d juriste-droit-du-travail.com -d www.juriste-droit-du-travail.com

# Le certificat sera automatiquement configuré
# Certbot modifiera la config Nginx pour activer HTTPS
```

## 📊 Vérifications Post-Déploiement

### Vérifier que le site fonctionne

```bash
# Vérifier le process PM2
pm2 list

# Vérifier les logs
pm2 logs loubna-site

# Vérifier que le port écoute
ss -tulpn | grep 3025

# Tester Nginx
sudo nginx -t

# Vérifier le site
curl -I http://juriste-droit-du-travail.com
```

### Vérifier que les autres projets fonctionnent

```bash
# Lister tous les projets
ls -la /var/www/

# Lister tous les process PM2
pm2 list

# Vérifier les configs Nginx actives
ls -la /etc/nginx/sites-enabled/
```

## 🛠️ Commandes Utiles

### Gestion PM2

```bash
# Voir les logs en temps réel
pm2 logs loubna-site

# Redémarrer le site
pm2 restart loubna-site

# Arrêter le site
pm2 stop loubna-site

# Supprimer le site de PM2
pm2 delete loubna-site
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
sudo tail -f /var/log/nginx/loubna-access.log
sudo tail -f /var/log/nginx/loubna-error.log
```

### Mise à jour du Site

```bash
cd /var/www/loubna-site
git pull origin main
npm install
npm run build
pm2 restart loubna-site
```

## 🔧 Dépannage

### Le site ne répond pas

```bash
# Vérifier que PM2 tourne
pm2 list

# Vérifier les logs
pm2 logs loubna-site --lines 50

# Redémarrer le process
pm2 restart loubna-site
```

### Erreur Nginx

```bash
# Vérifier la config
sudo nginx -t

# Voir les logs d'erreur
sudo tail -f /var/log/nginx/error.log

# Restaurer une sauvegarde
sudo cp /etc/nginx/sites-available/loubna-site.bak-YYYYMMDD-HHMM /etc/nginx/sites-available/loubna-site
sudo nginx -t
sudo systemctl reload nginx
```

### Port déjà utilisé

Le script détecte automatiquement si le port 3025 est occupé et trouve un port libre entre 3026 et 3100.

Pour vérifier manuellement :
```bash
ss -tulpn | grep 3025
```

## 📝 Structure des Fichiers

```
/var/www/loubna-site/          # Dossier du projet
├── .next/                      # Build Next.js
├── public/                     # Assets statiques
├── src/                        # Code source
├── ecosystem.config.js         # Config PM2
└── package.json                # Dépendances

/etc/nginx/sites-available/
└── loubna-site                 # Config Nginx

/etc/nginx/sites-enabled/
└── loubna-site -> ../sites-available/loubna-site

/var/log/nginx/
├── loubna-access.log          # Logs d'accès
└── loubna-error.log           # Logs d'erreur
```

## ✅ Checklist de Déploiement

- [ ] Script exécuté avec succès
- [ ] Process PM2 `loubna-site` actif
- [ ] Port 3025 (ou autre) en écoute
- [ ] Config Nginx créée et testée
- [ ] Nginx rechargé sans erreur
- [ ] DNS configurés (A + CNAME)
- [ ] Site accessible via HTTP
- [ ] Certificat SSL installé
- [ ] Site accessible via HTTPS
- [ ] Autres projets toujours fonctionnels

## 🆘 Support

En cas de problème :

1. Vérifier les logs : `pm2 logs loubna-site`
2. Vérifier Nginx : `sudo nginx -t`
3. Vérifier les autres projets : `pm2 list`
4. Restaurer une sauvegarde si nécessaire

---

**Dernière mise à jour** : 29 avril 2026  
**Version** : 1.0.0
