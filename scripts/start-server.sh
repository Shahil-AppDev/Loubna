#!/bin/bash

# Script pour démarrer le serveur Next.js sur Hetzner

set -e

DEPLOY_PATH="/var/www/juriste-droit-du-travail/current"

cd "$DEPLOY_PATH"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances..."
  npm ci --production
fi

# Arrêter le serveur existant si en cours
if [ -f ".next-server.pid" ]; then
  echo "🛑 Arrêt du serveur existant..."
  kill $(cat .next-server.pid) 2>/dev/null || true
  rm .next-server.pid
fi

# Démarrer le serveur Next.js
echo "🚀 Démarrage du serveur Next.js..."
PORT=3000 npm start > /var/log/nextjs.log 2>&1 &
echo $! > .next-server.pid

echo "✅ Serveur Next.js démarré sur le port 3000"
