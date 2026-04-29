# Configuration de la Clé SSH - DERNIÈRE ÉTAPE

## ✅ Secrets Déjà Configurés

J'ai automatiquement créé ces secrets GitHub :

- ✅ `VPS_HOST` = 65.21.104.251
- ✅ `VPS_USER` = root
- ✅ `VPS_PORT` = 22
- ✅ `DEPLOY_PATH` = /var/www/loubna-site

## ⚠️ Secret Manquant : VPS_SSH_KEY

Il reste **1 secret** à configurer manuellement : `VPS_SSH_KEY`

### Option 1 : Via GitHub CLI (Recommandé)

```bash
# Sur ta machine locale
gh secret set VPS_SSH_KEY --repo Shahil-AppDev/Loubna < ~/.ssh/id_rsa
# ou
gh secret set VPS_SSH_KEY --repo Shahil-AppDev/Loubna < ~/.ssh/id_ed25519
```

### Option 2 : Via Interface Web

1. Obtenir ta clé privée :
```bash
cat ~/.ssh/id_rsa
# ou
cat ~/.ssh/id_ed25519
```

2. Copier TOUT le contenu (y compris BEGIN et END)

3. Aller sur : https://github.com/Shahil-AppDev/Loubna/settings/secrets/actions

4. Cliquer "New repository secret"

5. Nom : `VPS_SSH_KEY`

6. Valeur : Coller la clé complète

7. Cliquer "Add secret"

## ✅ Vérification

Après avoir ajouté le secret, vérifier :

```bash
gh secret list --repo Shahil-AppDev/Loubna
```

Tu devrais voir :
```
DEPLOY_PATH  ✓
VPS_HOST     ✓
VPS_PORT     ✓
VPS_SSH_KEY  ✓
VPS_USER     ✓
```

## 🚀 Ensuite

Une fois `VPS_SSH_KEY` configuré, exécute :

```bash
# Connexion au serveur pour configuration initiale
ssh root@65.21.104.251

# Télécharger et exécuter le script d'installation
wget https://raw.githubusercontent.com/Shahil-AppDev/Loubna/main/server-setup.sh
chmod +x server-setup.sh
sudo ./server-setup.sh
```

Le workflow GitHub Actions sera alors prêt à fonctionner !
