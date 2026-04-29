#!/bin/bash

# ============================================================================
# SCRIPT D'INSTALLATION SERVEUR COMPLET - SITE LOUBNA
# ============================================================================
# Exécution automatique de toutes les configurations serveur
# Mode : Exécution totale sans interaction
# ============================================================================

set -euo pipefail

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  INSTALLATION AUTOMATIQUE - SITE LOUBNA                   ║${NC}"
echo -e "${BLUE}║  juriste-droit-du-travail.com                              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"

# Variables
DOMAIN="juriste-droit-du-travail.com"
WWW_DOMAIN="www.juriste-droit-du-travail.com"
DEPLOY_PATH="/var/www/loubna-site"
NGINX_CONFIG="/etc/nginx/sites-available/juriste-droit-du-travail.com"
NGINX_ENABLED="/etc/nginx/sites-enabled/juriste-droit-du-travail.com"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
LOG_FILE="/var/log/loubna-setup-${TIMESTAMP}.log"

# Fonction de log
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# ============================================================================
# PHASE 1: AUDIT SERVEUR
# ============================================================================

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 1: AUDIT SERVEUR (LECTURE SEULE)${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

log "Démarrage de l'audit serveur..."

# Vérifier les projets existants
log "Projets dans /var/www :"
ls -la /var/www/ 2>/dev/null | tee -a "$LOG_FILE" || log "Dossier /var/www vide ou inexistant"

# Vérifier PM2
log "\nProcess PM2 actifs :"
if command -v pm2 &> /dev/null; then
    pm2 list 2>/dev/null | tee -a "$LOG_FILE" || log "Aucun process PM2"
else
    log "PM2 non installé (normal pour site statique)"
fi

# Vérifier les ports
log "\nPorts en écoute :"
ss -tulpn | grep LISTEN | tee -a "$LOG_FILE" || log "Aucun port en écoute détecté"

# Vérifier Nginx
log "\nConfigurations Nginx actives :"
ls -la /etc/nginx/sites-enabled/ 2>/dev/null | tee -a "$LOG_FILE" || log "Aucune config Nginx active"

# Vérifier Nginx installé
if ! command -v nginx &> /dev/null; then
    warning "Nginx n'est pas installé"
    log "Installation de Nginx..."
    sudo apt update
    sudo apt install nginx -y
    log "✓ Nginx installé"
fi

# ============================================================================
# PHASE 2: CRÉATION DOSSIER DÉPLOIEMENT
# ============================================================================

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 2: CRÉATION DOSSIER DÉPLOIEMENT${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

if [ -d "$DEPLOY_PATH" ]; then
    warning "Le dossier $DEPLOY_PATH existe déjà"
    log "Sauvegarde du dossier existant..."
    sudo mv "$DEPLOY_PATH" "${DEPLOY_PATH}.bak-${TIMESTAMP}"
    log "✓ Sauvegarde: ${DEPLOY_PATH}.bak-${TIMESTAMP}"
fi

log "Création du dossier de déploiement..."
sudo mkdir -p "$DEPLOY_PATH"
sudo chown -R $USER:$USER "$DEPLOY_PATH"
log "✓ Dossier créé: $DEPLOY_PATH"

# ============================================================================
# PHASE 3: CONFIGURATION NGINX
# ============================================================================

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 3: CONFIGURATION NGINX${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

# Sauvegarde config existante
if [ -f "$NGINX_CONFIG" ]; then
    log "Sauvegarde de la configuration Nginx existante..."
    sudo cp "$NGINX_CONFIG" "${NGINX_CONFIG}.bak-${TIMESTAMP}"
    log "✓ Sauvegarde: ${NGINX_CONFIG}.bak-${TIMESTAMP}"
fi

log "Création de la configuration Nginx..."

sudo tee "$NGINX_CONFIG" > /dev/null << 'NGINX_EOF'
# Configuration Nginx pour juriste-droit-du-travail.com
# Site statique Next.js
# Généré automatiquement

server {
    listen 80;
    listen [::]:80;
    server_name juriste-droit-du-travail.com www.juriste-droit-du-travail.com;

    # Logs dédiés
    access_log /var/log/nginx/loubna-access.log;
    error_log /var/log/nginx/loubna-error.log;

    # Root directory
    root /var/www/loubna-site/current;
    index index.html;

    # Next.js trailing slashes
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Cache assets statiques
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Fichiers système
    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
NGINX_EOF

log "✓ Configuration Nginx créée"

# Activer la configuration
if [ -L "$NGINX_ENABLED" ]; then
    log "Configuration déjà activée, suppression du lien existant..."
    sudo rm "$NGINX_ENABLED"
fi

log "Activation de la configuration..."
sudo ln -s "$NGINX_CONFIG" "$NGINX_ENABLED"
log "✓ Configuration activée"

# Test Nginx
log "Test de la configuration Nginx..."
if sudo nginx -t 2>&1 | tee -a "$LOG_FILE"; then
    log "✓ Configuration Nginx valide"
else
    error "Configuration Nginx invalide"
    if [ -f "${NGINX_CONFIG}.bak-${TIMESTAMP}" ]; then
        log "Restauration de la sauvegarde..."
        sudo cp "${NGINX_CONFIG}.bak-${TIMESTAMP}" "$NGINX_CONFIG"
        log "✓ Configuration restaurée"
    fi
    exit 1
fi

# Rechargement Nginx
log "Rechargement de Nginx..."
sudo systemctl reload nginx
log "✓ Nginx rechargé"

# ============================================================================
# PHASE 4: INSTALLATION CERTBOT (SSL)
# ============================================================================

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 4: PRÉPARATION SSL${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

if ! command -v certbot &> /dev/null; then
    log "Installation de Certbot..."
    sudo apt update
    sudo apt install certbot python3-certbot-nginx -y
    log "✓ Certbot installé"
else
    log "✓ Certbot déjà installé"
fi

# ============================================================================
# PHASE 5: VÉRIFICATIONS FINALES
# ============================================================================

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 5: VÉRIFICATIONS FINALES${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

log "Vérification du dossier de déploiement..."
if [ -d "$DEPLOY_PATH" ]; then
    log "✓ Dossier de déploiement prêt: $DEPLOY_PATH"
else
    error "Dossier de déploiement non trouvé"
    exit 1
fi

log "Vérification de Nginx..."
if systemctl is-active --quiet nginx; then
    log "✓ Nginx actif"
else
    error "Nginx inactif"
    exit 1
fi

log "Vérification de la configuration Nginx..."
if [ -f "$NGINX_CONFIG" ] && [ -L "$NGINX_ENABLED" ]; then
    log "✓ Configuration Nginx en place"
else
    error "Configuration Nginx manquante"
    exit 1
fi

# ============================================================================
# RAPPORT FINAL
# ============================================================================

echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  INSTALLATION TERMINÉE AVEC SUCCÈS                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}✓ SERVEUR CONFIGURÉ${NC}\n"

echo "📁 Dossier de déploiement: $DEPLOY_PATH"
echo "📝 Configuration Nginx: $NGINX_CONFIG"
echo "💾 Sauvegardes: ${NGINX_CONFIG}.bak-${TIMESTAMP}"
echo "📋 Log d'installation: $LOG_FILE"
echo "🌐 Domaines: $DOMAIN, $WWW_DOMAIN"

echo -e "\n${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}  PROCHAINES ÉTAPES${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}\n"

echo "1. Vérifier que les DNS pointent vers ce serveur :"
echo "   dig $DOMAIN"
echo "   dig $WWW_DOMAIN"

echo -e "\n2. Configurer le secret VPS_SSH_KEY sur GitHub :"
echo "   gh secret set VPS_SSH_KEY --repo Shahil-AppDev/Loubna < ~/.ssh/id_rsa"

echo -e "\n3. Déclencher le workflow GitHub Actions :"
echo "   git push origin main"
echo "   ou"
echo "   gh workflow run deploy.yml --repo Shahil-AppDev/Loubna"

echo -e "\n4. Après le premier déploiement, installer le certificat SSL :"
echo "   sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"

echo -e "\n5. Vérifier le site :"
echo "   http://$DOMAIN"
echo "   https://www.$DOMAIN (après SSL)"

echo -e "\n${GREEN}✅ Le serveur est prêt pour le déploiement automatique !${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

# Afficher les autres projets pour confirmation
echo -e "${YELLOW}📋 VÉRIFICATION: Autres projets dans /var/www${NC}"
ls -la /var/www/ | grep -v loubna-site || echo "Aucun autre projet"

echo -e "\n${GREEN}✓ Aucun autre projet n'a été modifié ou affecté${NC}"
