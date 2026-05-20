#!/bin/bash

# ============================================================================
# SCRIPT DE DÉPLOIEMENT SERVEUR - SITE LOUBNA (Nginx → Next.js / PM2)
# ============================================================================
# Domaine: juriste-droit-du-travail.com
# Type: Next.js mode serveur (reverse proxy vers le port de l’app, ex. 3000)
# ============================================================================

set -euo pipefail

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  DÉPLOIEMENT SERVEUR - SITE STATIQUE${NC}"
echo -e "${BLUE}============================================${NC}"

# Variables
DOMAIN="juriste-droit-du-travail.com"
WWW_DOMAIN="www.juriste-droit-du-travail.com"
NGINX_CONFIG="/etc/nginx/sites-available/juriste-droit-du-travail.com"
NGINX_ENABLED="/etc/nginx/sites-enabled/juriste-droit-du-travail.com"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# ============================================================================
# PHASE 1: CONFIGURATION NGINX
# ============================================================================

echo -e "\n${YELLOW}[1/3] Configuration Nginx${NC}"

# Sauvegarde si le fichier existe déjà
if [ -f "$NGINX_CONFIG" ]; then
    echo -e "${YELLOW}Sauvegarde de la config existante...${NC}"
    sudo cp "$NGINX_CONFIG" "${NGINX_CONFIG}.bak-${TIMESTAMP}"
    echo -e "${GREEN}✓ Sauvegarde: ${NGINX_CONFIG}.bak-${TIMESTAMP}${NC}"
fi

# Créer la configuration Nginx (reverse proxy vers Next.js sur 127.0.0.1:3000)
sudo tee "$NGINX_CONFIG" > /dev/null << 'EOF'
# juriste-droit-du-travail.com — Next.js via PM2

server {
    listen 80;
    listen [::]:80;
    server_name juriste-droit-du-travail.com www.juriste-droit-du-travail.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name juriste-droit-du-travail.com www.juriste-droit-du-travail.com;

    ssl_certificate /etc/letsencrypt/live/juriste-droit-du-travail.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/juriste-droit-du-travail.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    access_log /var/log/nginx/loubna-access.log;
    error_log /var/log/nginx/loubna-error.log;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /favicon.ico {
        proxy_pass http://127.0.0.1:3000;
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        proxy_pass http://127.0.0.1:3000;
        log_not_found off;
        access_log off;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
EOF

echo -e "${GREEN}✓ Configuration Nginx créée: $NGINX_CONFIG${NC}"

# Activer la configuration
if [ ! -L "$NGINX_ENABLED" ]; then
    sudo ln -s "$NGINX_CONFIG" "$NGINX_ENABLED"
    echo -e "${GREEN}✓ Configuration activée${NC}"
else
    echo -e "${YELLOW}Configuration déjà activée${NC}"
fi

# ============================================================================
# PHASE 2: TEST ET RECHARGEMENT NGINX
# ============================================================================

echo -e "\n${YELLOW}[2/3] Test de la configuration Nginx${NC}"

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
# PHASE 3: VÉRIFICATIONS
# ============================================================================

echo -e "\n${YELLOW}[3/3] Vérifications${NC}"

# Vérifier que l’app Next répond (PM2 / npm start sur le port 3000)
if curl -sf -o /dev/null http://127.0.0.1:3000; then
    echo -e "${GREEN}✓ Backend Next.js joignable sur le port 3000${NC}"
else
    echo -e "${RED}❌ Rien ne répond sur http://127.0.0.1:3000 — démarrez l’app (ex. deploy-nextjs.sh / PM2)${NC}"
    exit 1
fi

# Permissions (éviter 777 ; 755 récursif conserve l’exécutable sur les scripts déjà +x)
echo -e "${YELLOW}Vérification des permissions...${NC}"
sudo chown -R www-data:www-data /var/www/loubna-site/current 2>/dev/null || true
sudo chmod -R 755 /var/www/loubna-site/current 2>/dev/null || true
echo -e "${GREEN}✓ Permissions configurées${NC}"

# Vérifier que Nginx est actif
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx est actif${NC}"
else
    echo -e "${RED}❌ Nginx n'est pas actif${NC}"
    exit 1
fi

# ============================================================================
# RAPPORT FINAL
# ============================================================================

echo -e "\n${BLUE}============================================${NC}"
echo -e "${BLUE}  DÉPLOIEMENT TERMINÉ${NC}"
echo -e "${BLUE}============================================${NC}"

echo -e "\n${GREEN}✓ DÉPLOIEMENT RÉUSSI${NC}\n"

echo "📁 Dossier: /var/www/loubna-site/current"
echo "📝 Config Nginx: $NGINX_CONFIG"
echo "💾 Sauvegarde: ${NGINX_CONFIG}.bak-${TIMESTAMP} (si existait)"
echo "🌐 Domaines: $DOMAIN, $WWW_DOMAIN"
echo "🔗 URL HTTP: http://$DOMAIN"

echo -e "\n${YELLOW}🔒 PROCHAINES ÉTAPES${NC}"
echo "1. Vérifier que les DNS pointent vers ce serveur"
echo "2. Installer le certificat SSL avec:"
echo "   sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"
echo "3. La section HTTPS sera automatiquement activée par Certbot"

echo -e "\n${GREEN}✅ Nginx configuré en reverse proxy (Next.js)${NC}"
echo -e "${BLUE}============================================${NC}"
