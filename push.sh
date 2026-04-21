#!/bin/bash
# ═══════════════════════════════════════════════════════════
# SCRIPT DE DÉPLOIEMENT — Loubna Abouz Manta
# Usage : chmod +x push.sh && ./push.sh
# ═══════════════════════════════════════════════════════════

echo "🚀 Déploiement du site Loubna Abouz Manta..."
echo ""

# Vérifier si on est dans le bon dossier
if [ ! -f "package.json" ]; then
  echo "❌ Erreur : ce script doit être exécuté depuis la racine du projet."
  exit 1
fi

# Build de vérification
echo "📦 Vérification du build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Corriger les erreurs avant de pusher."
  exit 1
fi

echo "✅ Build réussi"
echo ""

# Git
echo "📤 Push vers GitHub..."
git add .
git commit -m "feat: site juridique premium complet — Next.js 14 + Tailwind"
git push origin main

echo ""
echo "✅ Push réussi !"
echo ""
echo "🌐 Déploiement sur Vercel..."
echo "   → Si Vercel est connecté au repo, le déploiement est automatique."
echo "   → Sinon : vercel --prod"
echo ""
echo "📋 Étapes suivantes :"
echo "   1. Ouvrir src/lib/constants.ts et remplir email, téléphone, ville"
echo "   2. Connecter le formulaire (Formspree / EmailJS / Resend)"
echo "   3. Remplacer les témoignages placeholder"
echo "   4. Ajouter public/og-image.png (1200×630px)"
echo ""
echo "🎉 Site prêt à être mis en ligne !"
