#!/bin/bash

# ============================================================================
# SCRIPT DE DÉPLOIEMENT NEXT.JS SERVEUR - SITE LOUBNA
# ============================================================================
# Domaine: juriste-droit-du-travail.com
# Type: Next.js 14 (mode serveur avec API routes)
# Stack: Next.js + PostgreSQL + PM2 + Nginx reverse proxy
# ============================================================================

set -euo pipefail

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  DÉPLOIEMENT NEXT.JS SERVEUR${NC}"
echo -e "${BLUE}============================================${NC}"

# Variables
DEPLOY_PATH=$(pwd)
APP_NAME="nextjs-loubna"
PORT=3000

# ============================================================================
# PHASE 1: INSTALLATION DÉPENDANCES
# ============================================================================

echo -e "\n${YELLOW}[1/4] Installation des dépendances${NC}"

if [ -f "package.json" ]; then
    npm ci --production
    echo -e "${GREEN}✓ Dépendances installées${NC}"
else
    echo -e "${RED}❌ package.json non trouvé${NC}"
    exit 1
fi

# ============================================================================
# PHASE 2: VÉRIFICATION PM2
# ============================================================================

echo -e "\n${YELLOW}[2/4] Configuration PM2${NC}"

if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installation de PM2...${NC}"
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 installé${NC}"
fi

# ============================================================================
# PHASE 3: DÉMARRAGE APPLICATION
# ============================================================================

echo -e "\n${YELLOW}[3/4] Démarrage de l'application${NC}"

# Arrêter l'application existante
if pm2 list | grep -q "$APP_NAME"; then
    echo -e "${YELLOW}Arrêt de l'application existante...${NC}"
    pm2 stop "$APP_NAME"
    pm2 delete "$APP_NAME"
fi

# Démarrer avec PM2
echo -e "${YELLOW}Démarrage avec PM2...${NC}"
PORT=$PORT pm2 start npm --name "$APP_NAME" -- start

# Sauvegarder la configuration
pm2 save

# Configuration démarrage automatique
pm2 startup systemd -u $USER --hp $HOME 2>/dev/null || true

echo -e "${GREEN}✓ Application démarrée${NC}"

# ============================================================================
# PHASE 4: VÉRIFICATIONS
# ============================================================================

echo -e "\n${YELLOW}[4/4] Vérifications${NC}"

# Attendre que l'app démarre
sleep 3

# Vérifier que l'app tourne
if pm2 list | grep -q "$APP_NAME.*online"; then
    echo -e "${GREEN}✓ Application en ligne${NC}"
else
    echo -e "${RED}❌ Application non démarrée${NC}"
    pm2 logs "$APP_NAME" --lines 20
    exit 1
fi

# Tester la réponse HTTP
if curl -s http://localhost:$PORT > /dev/null; then
    echo -e "${GREEN}✓ Application répond sur le port $PORT${NC}"
else
    echo -e "${RED}❌ Application ne répond pas${NC}"
    exit 1
fi

# ============================================================================
# RAPPORT FINAL
# ============================================================================

echo -e "\n${BLUE}============================================${NC}"
echo -e "${BLUE}  DÉPLOIEMENT TERMINÉ${NC}"
echo -e "${BLUE}============================================${NC}"

echo -e "\n${GREEN}✓ DÉPLOIEMENT RÉUSSI${NC}\n"

echo "📁 Dossier: $DEPLOY_PATH"
echo "🚀 Application: $APP_NAME"
echo "🔌 Port: $PORT"
echo "📊 Statut: $(pm2 list | grep $APP_NAME)"

echo -e "\n${YELLOW}📝 COMMANDES UTILES${NC}"
echo "  pm2 status              - Voir le statut"
echo "  pm2 logs $APP_NAME      - Voir les logs"
echo "  pm2 restart $APP_NAME   - Redémarrer"
echo "  pm2 stop $APP_NAME      - Arrêter"

echo -e "\n${GREEN}✅ Next.js déployé avec succès${NC}"
echo -e "${BLUE}============================================${NC}"
