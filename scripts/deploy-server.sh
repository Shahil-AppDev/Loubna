#!/bin/bash

# ============================================================================
# SCRIPT DE DÉPLOIEMENT SERVEUR - SITE LOUBNA (Fichiers Statiques)
# ============================================================================
# Domaine: juriste-droit-du-travail.com
# Type: Site statique Next.js (export)
# Serveur: Nginx uniquement (pas de PM2 nécessaire)
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

# Créer la configuration Nginx pour site statique
sudo tee "$NGINX_CONFIG" > /dev/null << 'EOF'
# Configuration Nginx pour juriste-droit-du-travail.com
# Site statique Next.js
# Créé automatiquement par GitHub Actions

server {
    listen 80;
    listen [::]:80;
    server_name juriste-droit-du-travail.com www.juriste-droit-du-travail.com;

    # Logs dédiés
    access_log /var/log/nginx/loubna-access.log;
    error_log /var/log/nginx/loubna-error.log;

    # Root directory pour fichiers statiques
    root /var/www/loubna-site/current;
    index index.html;

    # Gestion des trailing slashes (Next.js export)
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Cache pour les assets statiques
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Désactiver les logs pour les fichiers statiques courants
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

# Configuration HTTPS (sera activée après certificat SSL)
# server {
#     listen 443 ssl http2;
#     listen [::]:443 ssl http2;
#     server_name juriste-droit-du-travail.com www.juriste-droit-du-travail.com;
#
#     ssl_certificate /etc/letsencrypt/live/juriste-droit-du-travail.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/juriste-droit-du-travail.com/privkey.pem;
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_ciphers HIGH:!aNULL:!MD5;
#     ssl_prefer_server_ciphers on;
#
#     access_log /var/log/nginx/loubna-access.log;
#     error_log /var/log/nginx/loubna-error.log;
#
#     root /var/www/loubna-site/current;
#     index index.html;
#
#     location / {
#         try_files $uri $uri.html $uri/ =404;
#     }
#
#     location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
#         expires 1y;
#         add_header Cache-Control "public, immutable";
#     }
#
#     location = /favicon.ico {
#         log_not_found off;
#         access_log off;
#     }
#
#     location = /robots.txt {
#         log_not_found off;
#         access_log off;
#     }
#
#     add_header X-Frame-Options "SAMEORIGIN" always;
#     add_header X-Content-Type-Options "nosniff" always;
#     add_header X-XSS-Protection "1; mode=block" always;
#
#     gzip on;
#     gzip_vary on;
#     gzip_min_length 1024;
#     gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
# }
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

# Vérifier que les fichiers existent
if [ -f "index.html" ]; then
    echo -e "${GREEN}✓ Fichiers statiques présents${NC}"
else
    echo -e "${RED}❌ index.html non trouvé${NC}"
    exit 1
fi

# Vérifier les permissions
echo -e "${YELLOW}Vérification des permissions...${NC}"
sudo chown -R www-data:www-data /var/www/loubna-site/current
sudo chmod -R 755 /var/www/loubna-site/current
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

echo -e "\n${GREEN}✅ Site statique déployé avec succès${NC}"
echo -e "${BLUE}============================================${NC}"
