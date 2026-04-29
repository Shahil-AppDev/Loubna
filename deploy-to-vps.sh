#!/bin/bash

# ============================================================================
# SCRIPT DE DÉPLOIEMENT SÉCURISÉ - SITE LOUBNA
# ============================================================================
# VPS: 65.21.104.251
# Domaine: juriste-droit-du-travail.com
# Port prévu: 3025 (vérifié avant utilisation)
# Dossier: /var/www/loubna-site
# PM2: loubna-site
# ============================================================================

set -e  # Arrêt en cas d'erreur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
PROJECT_DIR="/var/www/loubna-site"
PM2_NAME="loubna-site"
DOMAIN="juriste-droit-du-travail.com"
WWW_DOMAIN="www.juriste-droit-du-travail.com"
REPO_URL="https://github.com/Shahil-AppDev/Loubna.git"
PREFERRED_PORT=3025
TIMESTAMP=$(date +%Y%m%d-%H%M)

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  DÉPLOIEMENT SITE LOUBNA - AUDIT INITIAL${NC}"
echo -e "${BLUE}============================================${NC}"

# ============================================================================
# PHASE 1: AUDIT DU SERVEUR (LECTURE SEULE)
# ============================================================================

echo -e "\n${YELLOW}[1/9] Audit des projets existants dans /var/www${NC}"
echo "Projets existants:"
ls -la /var/www/ 2>/dev/null || echo "Aucun projet trouvé"

echo -e "\n${YELLOW}[2/9] Audit des process PM2 existants${NC}"
echo "Process PM2 actifs:"
pm2 list || echo "PM2 non installé ou aucun process"

echo -e "\n${YELLOW}[3/9] Audit des ports utilisés${NC}"
echo "Ports en écoute:"
ss -tulpn | grep LISTEN || echo "Aucun port en écoute détecté"

echo -e "\n${YELLOW}[4/9] Vérification du port $PREFERRED_PORT${NC}"
PORT_CHECK=$(ss -tulpn | grep ":$PREFERRED_PORT " || echo "")
if [ -n "$PORT_CHECK" ]; then
    echo -e "${RED}⚠️  Port $PREFERRED_PORT déjà utilisé:${NC}"
    echo "$PORT_CHECK"
    echo -e "${YELLOW}Recherche d'un port libre...${NC}"
    
    # Trouver un port libre entre 3026 et 3100
    ACTUAL_PORT=""
    for port in {3026..3100}; do
        if ! ss -tulpn | grep -q ":$port "; then
            ACTUAL_PORT=$port
            echo -e "${GREEN}✓ Port libre trouvé: $ACTUAL_PORT${NC}"
            break
        fi
    done
    
    if [ -z "$ACTUAL_PORT" ]; then
        echo -e "${RED}❌ Aucun port libre trouvé entre 3026 et 3100${NC}"
        exit 1
    fi
else
    ACTUAL_PORT=$PREFERRED_PORT
    echo -e "${GREEN}✓ Port $PREFERRED_PORT est libre${NC}"
fi

echo -e "\n${YELLOW}[5/9] Audit des configurations Nginx${NC}"
echo "Configurations Nginx actives:"
ls -la /etc/nginx/sites-enabled/ 2>/dev/null || echo "Aucune config trouvée"

echo -e "\n${BLUE}============================================${NC}"
echo -e "${BLUE}  PHASE DE DÉPLOIEMENT${NC}"
echo -e "${BLUE}============================================${NC}"

# ============================================================================
# PHASE 2: PRÉPARATION DU PROJET
# ============================================================================

echo -e "\n${YELLOW}[6/9] Préparation du dossier projet${NC}"

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}Le dossier existe déjà, mise à jour...${NC}"
    cd "$PROJECT_DIR"
    git pull origin main
else
    echo -e "${GREEN}Création du dossier et clonage du repo...${NC}"
    sudo mkdir -p "$PROJECT_DIR"
    sudo chown -R $USER:$USER "$PROJECT_DIR"
    git clone "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

echo -e "${GREEN}✓ Projet cloné/mis à jour dans $PROJECT_DIR${NC}"

# ============================================================================
# PHASE 3: INSTALLATION ET BUILD
# ============================================================================

echo -e "\n${YELLOW}[7/9] Installation des dépendances${NC}"
npm install

echo -e "\n${YELLOW}Build du projet Next.js${NC}"
npm run build

echo -e "${GREEN}✓ Build terminé${NC}"

# ============================================================================
# PHASE 4: CONFIGURATION PM2
# ============================================================================

echo -e "\n${YELLOW}[8/9] Configuration PM2${NC}"

# Créer le fichier ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$PM2_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$PROJECT_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: $ACTUAL_PORT
    }
  }]
};
EOF

# Vérifier si le process PM2 existe déjà
if pm2 list | grep -q "$PM2_NAME"; then
    echo -e "${YELLOW}Process PM2 '$PM2_NAME' existe, redémarrage...${NC}"
    pm2 restart $PM2_NAME
else
    echo -e "${GREEN}Démarrage du process PM2 '$PM2_NAME'...${NC}"
    pm2 start ecosystem.config.js
fi

pm2 save

echo -e "${GREEN}✓ PM2 configuré sur le port $ACTUAL_PORT${NC}"

# ============================================================================
# PHASE 5: CONFIGURATION NGINX
# ============================================================================

echo -e "\n${YELLOW}[9/9] Configuration Nginx${NC}"

NGINX_CONFIG="/etc/nginx/sites-available/loubna-site"
NGINX_ENABLED="/etc/nginx/sites-enabled/loubna-site"

# Sauvegarde si le fichier existe déjà
if [ -f "$NGINX_CONFIG" ]; then
    echo -e "${YELLOW}Sauvegarde de la config existante...${NC}"
    sudo cp "$NGINX_CONFIG" "${NGINX_CONFIG}.bak-${TIMESTAMP}"
    echo -e "${GREEN}✓ Sauvegarde: ${NGINX_CONFIG}.bak-${TIMESTAMP}${NC}"
fi

# Créer la configuration Nginx
sudo tee "$NGINX_CONFIG" > /dev/null << EOF
# Configuration Nginx pour Loubna Site
# Domaine: $DOMAIN et $WWW_DOMAIN
# Port backend: $ACTUAL_PORT
# Créé le: $(date)

server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW_DOMAIN;

    # Logs dédiés
    access_log /var/log/nginx/loubna-access.log;
    error_log /var/log/nginx/loubna-error.log;

    # Redirection HTTPS (à activer après certificat SSL)
    # return 301 https://\$server_name\$request_uri;

    location / {
        proxy_pass http://localhost:$ACTUAL_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}

# Configuration HTTPS (à activer après certificat SSL)
# server {
#     listen 443 ssl http2;
#     listen [::]:443 ssl http2;
#     server_name $DOMAIN $WWW_DOMAIN;
#
#     ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
#
#     access_log /var/log/nginx/loubna-access.log;
#     error_log /var/log/nginx/loubna-error.log;
#
#     location / {
#         proxy_pass http://localhost:$ACTUAL_PORT;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade \$http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host \$host;
#         proxy_set_header X-Real-IP \$remote_addr;
#         proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto \$scheme;
#         proxy_cache_bypass \$http_upgrade;
#     }
# }
EOF

echo -e "${GREEN}✓ Configuration Nginx créée: $NGINX_CONFIG${NC}"

# Activer la configuration
if [ ! -L "$NGINX_ENABLED" ]; then
    sudo ln -s "$NGINX_CONFIG" "$NGINX_ENABLED"
    echo -e "${GREEN}✓ Configuration activée${NC}"
fi

# Test de la configuration Nginx
echo -e "\n${YELLOW}Test de la configuration Nginx...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✓ Configuration Nginx valide${NC}"
    echo -e "${YELLOW}Rechargement de Nginx...${NC}"
    sudo systemctl reload nginx
    echo -e "${GREEN}✓ Nginx rechargé${NC}"
else
    echo -e "${RED}❌ Erreur dans la configuration Nginx${NC}"
    echo -e "${YELLOW}Restauration de la sauvegarde...${NC}"
    if [ -f "${NGINX_CONFIG}.bak-${TIMESTAMP}" ]; then
        sudo cp "${NGINX_CONFIG}.bak-${TIMESTAMP}" "$NGINX_CONFIG"
        echo -e "${GREEN}✓ Configuration restaurée${NC}"
    fi
    exit 1
fi

# ============================================================================
# RAPPORT FINAL
# ============================================================================

echo -e "\n${BLUE}============================================${NC}"
echo -e "${BLUE}  RAPPORT DE DÉPLOIEMENT${NC}"
echo -e "${BLUE}============================================${NC}"

echo -e "\n${GREEN}✓ DÉPLOIEMENT RÉUSSI${NC}\n"

echo "📁 Dossier utilisé: $PROJECT_DIR"
echo "🔌 Port utilisé: $ACTUAL_PORT"
echo "⚙️  Process PM2: $PM2_NAME"
echo "📝 Config Nginx: $NGINX_CONFIG"
echo "💾 Sauvegarde: ${NGINX_CONFIG}.bak-${TIMESTAMP} (si existait)"
echo "🌐 Domaines: $DOMAIN, $WWW_DOMAIN"
echo "🔗 URL: http://$DOMAIN (après propagation DNS)"

echo -e "\n${YELLOW}📋 VÉRIFICATION DES AUTRES PROJETS${NC}"
echo "Process PM2 actifs:"
pm2 list

echo -e "\n${YELLOW}🔒 PROCHAINES ÉTAPES${NC}"
echo "1. Configurer les DNS A et CNAME chez le registrar"
echo "2. Installer le certificat SSL avec:"
echo "   sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"
echo "3. Activer la section HTTPS dans $NGINX_CONFIG"
echo "4. Recharger Nginx: sudo systemctl reload nginx"

echo -e "\n${GREEN}✓ Tous les autres projets restent inchangés${NC}"
echo -e "${BLUE}============================================${NC}"
