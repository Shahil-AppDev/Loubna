# Configuration des Secrets GitHub

## 📋 Secrets Requis pour le Workflow

Pour que le workflow de déploiement automatique fonctionne, vous devez configurer les secrets suivants dans votre repository GitHub.

### Comment Ajouter les Secrets

1. Allez sur : `https://github.com/Shahil-AppDev/Loubna/settings/secrets/actions`
2. Cliquez sur "New repository secret"
3. Ajoutez chaque secret ci-dessous

---

## 🔑 Liste des Secrets à Créer

### 1. **VPS_HOST**
- **Nom** : `VPS_HOST`
- **Valeur** : `65.21.104.251`
- **Description** : Adresse IP du serveur VPS Hetzner

### 2. **VPS_USER**
- **Nom** : `VPS_USER`
- **Valeur** : `root` (ou votre nom d'utilisateur SSH)
- **Description** : Nom d'utilisateur pour la connexion SSH

### 3. **VPS_SSH_KEY**
- **Nom** : `VPS_SSH_KEY`
- **Valeur** : Votre clé privée SSH complète
- **Description** : Clé privée SSH pour l'authentification

**Comment obtenir votre clé privée SSH** :
```bash
# Sur votre machine locale
cat ~/.ssh/id_rsa
# ou
cat ~/.ssh/id_ed25519

# Copiez TOUT le contenu, y compris :
# -----BEGIN OPENSSH PRIVATE KEY-----
# [contenu de la clé]
# -----END OPENSSH PRIVATE KEY-----
```

⚠️ **IMPORTANT** : 
- Ne partagez JAMAIS cette clé publiquement
- Copiez la clé COMPLÈTE avec les lignes BEGIN et END
- Incluez tous les retours à la ligne

### 4. **VPS_PORT**
- **Nom** : `VPS_PORT`
- **Valeur** : `22`
- **Description** : Port SSH du serveur (généralement 22)

### 5. **DEPLOY_PATH**
- **Nom** : `DEPLOY_PATH`
- **Valeur** : `/var/www/loubna-site`
- **Description** : Chemin de déploiement sur le serveur

---

## ✅ Vérification des Secrets

Une fois tous les secrets ajoutés, vous devriez voir :

```
VPS_HOST          ✓
VPS_USER          ✓
VPS_SSH_KEY       ✓
VPS_PORT          ✓
DEPLOY_PATH       ✓
```

---

## 🔒 Sécurité

- Les secrets sont **chiffrés** par GitHub
- Ils ne sont **jamais affichés** dans les logs
- Seuls les workflows autorisés peuvent y accéder
- Vous pouvez les **modifier** ou **supprimer** à tout moment

---

## 🧪 Test du Workflow

Après avoir configuré les secrets :

1. Faites un commit et push sur la branche `main`
2. Le workflow se déclenchera automatiquement
3. Vérifiez les logs dans l'onglet "Actions" de GitHub
4. Le site sera déployé sur `https://www.juriste-droit-du-travail.com`

---

## 🆘 Dépannage

### Erreur "Permission denied (publickey)"
- Vérifiez que `VPS_SSH_KEY` contient la clé privée complète
- Vérifiez que la clé publique correspondante est dans `~/.ssh/authorized_keys` sur le serveur

### Erreur "Connection refused"
- Vérifiez `VPS_HOST` (IP correcte)
- Vérifiez `VPS_PORT` (généralement 22)
- Vérifiez que le serveur est accessible

### Erreur "Permission denied" lors du déploiement
- Vérifiez que `VPS_USER` a les permissions sudo
- Vérifiez que le dossier `/var/www/loubna-site` est accessible

---

**Dernière mise à jour** : 29 avril 2026
