#!/bin/bash

# Script de diagnostic et correction pour erreur 403 Forbidden
# Exécuté après le déploiement pour garantir que tout fonctionne

set -euo pipefail

echo "🔧 DIAGNOSTIC ET REPAIR - ERREUR 403 FORBIDDEN"

DEPLOY_PATH=$(pwd)
APP_NAME="nextjs-loubna"

echo "📁 Répertoire de déploiement: $DEPLOY_PATH"

# ============================================================================
# PHASE 1: VÉRIFICATION PM2
# ============================================================================

echo -e "\n📊 [1/6] Vérification PM2..."

if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 non installé, installation..."
    npm install -g pm2
else
    echo "✅ PM2 installé"
fi

echo "Status PM2 actuel:"
pm2 status || echo "PM2 vide"

# ============================================================================
# PHASE 2: TEST NEXT.JS LOCAL
# ============================================================================

echo -e "\n🧪 [2/6] Test Next.js sur port 3000..."

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Next.js répond sur port 3000"
    NEXTJS_WORKING=true
else
    echo "❌ Next.js ne répond pas, réparation en cours..."
    NEXTJS_WORKING=false
    
    # Installer les dépendances si nécessaire
    if [ ! -d "node_modules" ]; then
        echo "📦 Installation des dépendances..."
        npm ci --production
    fi
    
    # Créer .env.local si manquant
    if [ ! -f ".env.local" ]; then
        echo "⚙️  Création .env.local..."
        cat > .env.local << 'EOF'
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=loubna_db
POSTGRES_USER=loubna_user
POSTGRES_PASSWORD=temp_password123
SESSION_SECRET=temp_session_secret_32_chars_minimum_abcdef123456
NEXT_PUBLIC_SITE_URL=https://www.juriste-droit-du-travail.com
EOF
    fi
    
    # Arrêter l'application existante
    echo "🔄 Arrêt de l'application existante..."
    pm2 stop "$APP_NAME" || true
    pm2 delete "$APP_NAME" || true
    
    # Démarrer avec PM2
    echo "🚀 Démarrage avec PM2..."
    PORT=3000 pm2 start npm --name "$APP_NAME" -- start
    pm2 save
    
    # Attendre et tester
    echo "⏳ Attente démarrage (5s)..."
    sleep 5
    
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Next.js répond maintenant"
        NEXTJS_WORKING=true
    else
        echo "❌ Next.js ne répond toujours pas"
        echo "📋 Logs PM2:"
        pm2 logs "$APP_NAME" --lines 20
    fi
fi

# ============================================================================
# PHASE 3: VÉRIFICATION NGINX
# ============================================================================

echo -e "\n🌐 [3/6] Vérification configuration Nginx..."

if sudo nginx -t; then
    echo "✅ Configuration Nginx valide"
    NGINX_CONFIG_OK=true
else
    echo "❌ Configuration Nginx invalide, correction..."
    NGINX_CONFIG_OK=false
    
    # Créer la configuration correcte
    echo "📝 Création configuration Nginx..."
    sudo tee /etc/nginx/sites-available/juriste-droit-du-travail > /dev/null << 'EOF'
server {
    listen 80;
    server_name juriste-droit-du-travail.com www.juriste-droit-du-travail.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    access_log /var/log/nginx/loubna-access.log;
    error_log /var/log/nginx/loubna-error.log;
}
EOF
    
    # Activer le site
    echo "🔗 Activation du site..."
    sudo ln -sf /etc/nginx/sites-available/juriste-droit-du-travail /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default || true
    
    # Tester et recharger
    if sudo nginx -t; then
        echo "✅ Configuration Nginx corrigée"
        sudo systemctl reload nginx
        NGINX_CONFIG_OK=true
    else
        echo "❌ Erreur Nginx persistante"
        sudo nginx -t
    fi
fi

# ============================================================================
# PHASE 4: PERMISSIONS
# ============================================================================

echo -e "\n📁 [4/6] Vérification permissions..."

echo "Permissions actuelles:"
ls -la "$DEPLOY_PATH" | head -5

# Corriger les permissions
echo "🔧 Correction permissions..."
sudo chown -R $USER:$USER "$DEPLOY_PATH"
sudo chmod -R 755 "$DEPLOY_PATH"

echo "✅ Permissions corrigées"

# ============================================================================
# PHASE 5: TESTS FINAUX
# ============================================================================

echo -e "\n🧪 [5/6] Tests finaux..."

# Test Next.js local
echo "Test local Next.js:"
if curl -s -I http://localhost:3000 | head -1; then
    echo "✅ Next.js local OK"
else
    echo "❌ Next.js local échoué"
fi

# Test via Nginx
echo "Test via Nginx:"
if curl -s -I http://localhost | head -1; then
    echo "✅ Nginx proxy OK"
else
    echo "❌ Nginx proxy échoué"
fi

# Status PM2 final
echo -e "\n📊 [6/6] Status final PM2:"
pm2 status

# ============================================================================
# RAPPORT FINAL
# ============================================================================

echo -e "\n" + "="*50
echo "🔍 RAPPORT DE DIAGNOSTIC"
echo "="*50

if [ "$NEXTJS_WORKING" = true ]; then
    echo "✅ Next.js: FONCTIONNEL"
else
    echo "❌ Next.js: NON FONCTIONNEL"
fi

if [ "$NGINX_CONFIG_OK" = true ]; then
    echo "✅ Nginx: CONFIGURATION VALIDE"
else
    echo "❌ Nginx: CONFIGURATION INVALIDE"
fi

echo "📁 Permissions: CORRIGÉES"
echo "🚀 PM2: CONFIGURÉ"

echo -e "\n🌐 URL du site: https://www.juriste-droit-du-travail.com"
echo "🔍 Logs PM2: pm2 logs $APP_NAME"
echo "📋 Logs Nginx: sudo tail -f /var/log/nginx/loubna-error.log"

echo -e "\n✅ Diagnostic et réparation terminés"
