# 🔐 GitHub Secrets Configuration

Ce document décrit tous les secrets GitHub nécessaires pour le déploiement automatique du site Loubna sur le serveur Hetzner.

---

## 📋 LISTE DES SECRETS REQUIS

### **1. VPS Connection Secrets**

| Secret | Description | Valeur Exemple | Comment l'obtenir |
|--------|-------------|----------------|-------------------|
| `VPS_HOST` | Adresse IP du serveur Hetzner | `123.45.67.89` | Dashboard Hetzner → Servers → IP |
| `VPS_USER` | Utilisateur SSH du serveur | `root` ou `ubuntu` | Créé lors de la création du serveur |
| `VPS_PORT` | Port SSH | `22` | Généralement 22 (par défaut) |
| `VPS_SSH_KEY` | Clé privée SSH pour connexion | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Générez une paire de clés SSH |

### **2. Déploiement Path**

| Secret | Description | Valeur Exemple | Comment l'obtenir |
|--------|-------------|----------------|-------------------|
| `DEPLOY_PATH` | Chemin de déploiement sur serveur | `/var/www/juriste-droit-du-travail` | Fixé dans le script de déploiement |

---

## 🔧 CONFIGURATION PAS À PAS

### Étape 1: Générer une paire de clés SSH

**Sur votre machine locale** :
```bash
# Générer une nouvelle paire de clés
ssh-keygen -t ed25519 -a 100 -C "github-deploy-key" -f ~/.ssh/hetzner-deploy

# La clé privée sera: ~/.ssh/hetzner-deploy
# La clé publique sera: ~/.ssh/hetzner-deploy.pub
```

### Étape 2: Ajouter la clé publique au serveur

**Afficher la clé publique** :
```bash
cat ~/.ssh/hetzner-deploy.pub
```

**Ajouter au serveur Hetzner** :
```bash
# Se connecter au serveur
ssh root@VOTRE_IP

# Ajouter la clé publique
echo "VOTRE_CLE_PUBLIQUE" >> ~/.ssh/authorized_keys

# Configurer les permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Étape 3: Configurer les GitHub Secrets

**Aller sur GitHub** :
1. Repository : `Shahil-AppDev/Loubna`
2. Settings → Secrets and variables → Actions
3. Cliquer sur "New repository secret"

**Ajouter chaque secret** :

#### 1. VPS_HOST
```
Name: VPS_HOST
Secret: 123.45.67.89  # Remplacer par l'IP réelle
```

#### 2. VPS_USER
```
Name: VPS_USER
Secret: root  # ou ubuntu selon votre config
```

#### 3. VPS_PORT
```
Name: VPS_PORT
Secret: 22
```

#### 4. VPS_SSH_KEY
```
Name: VPS_SSH_KEY
Secret: 
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbmNzc2gtc3BlZ...  # Contenu COMPLET de ~/.ssh/hetzner-deploy
-----END OPENSSH PRIVATE KEY-----
```

#### 5. DEPLOY_PATH
```
Name: DEPLOY_PATH
Secret: /var/www/juriste-droit-du-travail
```

---

## 🧪 TEST DE CONNEXION

### Tester la connexion SSH locale

```bash
# Tester avec la clé générée
ssh -i ~/.ssh/hetzner-deploy root@VOTRE_IP

# Si ça fonctionne, vous êtes connecté au serveur
# Quitter avec: exit
```

### Tester le déploiement

Après avoir configuré les secrets, chaque push sur la branche `main` déclenchera automatiquement le déploiement.

**Vérifier le workflow** :
1. Allez sur GitHub → Actions
2. Cliquez sur le workflow en cours
3. Vérifiez que toutes les étapes réussissent

---

## 🚨 SÉCURITÉ

### Bonnes pratiques

1. **Clé SSH dédiée** : Utilisez une clé différente de votre clé personnelle
2. **Permissions restreintes** : La clé ne doit avoir que les droits nécessaires
3. **Rotation régulière** : Changez les clés périodiquement
4. **Surveillance** : Surveillez les logs de connexion sur le serveur

### Logs de connexion

**Sur le serveur Hetzner** :
```bash
# Voir les connexions SSH récentes
sudo journalctl -u sshd -f

# Voir les authentifications
sudo tail -f /var/log/auth.log
```

### Révocation des clés

**Si une clé est compromise** :
```bash
# Sur le serveur, supprimer la clé compromise
nano ~/.ssh/authorized_keys
# Supprimer la ligne correspondante

# Redémarrer SSH
sudo systemctl restart ssh
```

---

## 🔄 WORKFLOW DE DÉPLOIEMENT

### Ce que fait le workflow GitHub Actions

1. **Build** : Compile l'application Next.js
2. **Transfert** : Envoie les fichiers vers le serveur via rsync
3. **Déploiement** : Exécute `deploy-nextjs.sh` sur le serveur
4. **PM2** : Redémarre l'application avec PM2
5. **Vérification** : Teste que l'application répond

### Fichiers transférés

```
.next/           # Build Next.js optimisé
public/          # Assets statiques
package.json     # Dépendances
package-lock.json
next.config.mjs  # Configuration Next.js
scripts/         # Scripts de déploiement
```

---

## 🛠️ DÉPANNAGE

### Erreur: Permission denied (publickey)

**Causes possibles** :
- Clé SSH incorrecte dans `VPS_SSH_KEY`
- Clé publique non ajoutée au serveur
- Permissions incorrectes sur `~/.ssh/authorized_keys`

**Solution** :
```bash
# Vérifier la clé publique sur le serveur
cat ~/.ssh/authorized_keys

# Vérifier les permissions
ls -la ~/.ssh/
# Doit être: 700 pour .ssh, 600 pour authorized_keys
```

### Erreur: Host key verification failed

**Solution** : Le workflow gère automatiquement `StrictHostKeyChecking=no`

### Erreur: rsync: command not found

**Sur le serveur** :
```bash
# Installer rsync
sudo apt update
sudo apt install rsync
```

### Erreur: npm: command not found

**Sur le serveur** :
```bash
# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 📊 MONITORING

### Vérifier le déploiement

**Sur GitHub** :
- Actions → Workflow en cours
- Vérifiez que chaque étape est verte ✓

**Sur le serveur** :
```bash
# Vérifier que PM2 tourne
pm2 status

# Vérifier les logs
pm2 logs nextjs-loubna

# Vérifier que le site répond
curl http://localhost:3000
```

### Logs du workflow

**Dans GitHub Actions** :
- Chaque étape a ses logs
- Erreurs détaillées en cas d'échec
- Historique des déploiements précédents

---

## ✅ CHECKLIST FINALE

Avant de déployer en production :

- [ ] Serveur Hetzner configuré (Node.js, PM2, Nginx, PostgreSQL)
- [ ] Clé SSH générée et ajoutée au serveur
- [ ] Tous les GitHub Secrets configurés
- [ ] Connexion SSH testée manuellement
- [ ] Variables d'environnement `.env.local` créées sur serveur
- [ ] Base de données PostgreSQL configurée
- [ ] Compte admin créé
- [ ] SSL/Let's Encrypt configuré
- [ ] DNS pointant vers le serveur

---

## 📞 SUPPORT

**En cas de problème** :

1. **Vérifier les logs GitHub Actions** : Repository → Actions
2. **Vérifier les logs serveur** : `pm2 logs nextjs-loubna`
3. **Tester la connexion SSH** : `ssh -i ~/.ssh/hetzner-deploy root@IP`
4. **Vérifier les secrets** : GitHub → Settings → Secrets

---

**Dernière mise à jour** : 11 mai 2026  
**Version** : 1.0 (Next.js 14 + PM2 + Hetzner)
