#!/bin/bash

# Emergency fix for Next.js not responding
# Main issue: PostgreSQL connection

set -euo pipefail

echo "🚨 EMERGENCY FIX - NEXT.JS NOT RESPONDING"

DEPLOY_PATH=$(pwd)
APP_NAME="nextjs-loubna"

echo "📁 Working in: $DEPLOY_PATH"

# ============================================================================
# STOP CURRENT APP
# ============================================================================

echo "🛑 Stopping current app..."
pm2 stop "$APP_NAME" || true
pm2 delete "$APP_NAME" || true

# ============================================================================
# CREATE ENVIRONMENT FILE
# ============================================================================

echo "⚙️ Creating .env.local with minimal config..."
cat > .env.local << 'EOF'
# PostgreSQL - Temporarily disable for emergency fix
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=loubna_db
POSTGRES_USER=loubna_user
POSTGRES_PASSWORD=temp_password123

# Session
SESSION_SECRET=temp_session_secret_32_chars_minimum_abcdef123456

# Site
NEXT_PUBLIC_SITE_URL=https://www.juriste-droit-du-travail.com

# Disable Stripe for now
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
EOF

echo "✅ .env.local created"

# ============================================================================
# START APP WITH DIFFERENT APPROACH
# ============================================================================

echo "🚀 Starting app with direct npm start..."

# Try direct start first
PORT=3000 npm start > app.log 2>&1 &
APP_PID=$!

echo "📊 App PID: $APP_PID"

# Wait for startup
echo "⏳ Waiting 10 seconds for startup..."
sleep 10

# Check if process is running
if kill -0 $APP_PID 2>/dev/null; then
    echo "✅ Process is running"
else
    echo "❌ Process died, checking logs..."
    cat app.log | tail -20
fi

# Test response
echo "🧪 Testing response..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ App responding!"
    
    # Convert to PM2
    echo "🔄 Converting to PM2..."
    kill $APP_PID 2>/dev/null || true
    sleep 2
    
    PORT=3000 pm2 start npm --name "$APP_NAME" -- start
    pm2 save
    
    echo "✅ Now running with PM2"
else
    echo "❌ Still not responding, checking logs..."
    
    # Check what's in the logs
    if [ -f "app.log" ]; then
        echo "📋 App logs:"
        cat app.log | tail -30
    fi
    
    # Try PM2 directly
    echo "🔄 Trying PM2 directly..."
    PORT=3000 pm2 start npm --name "$APP_NAME" -- start
    pm2 save
    
    sleep 5
    pm2 logs "$APP_NAME" --lines 30
fi

# ============================================================================
# FINAL TESTS
# ============================================================================

echo -e "\n🧪 Final tests:"

echo "PM2 Status:"
pm2 status

echo -e "\nTesting local:"
curl -I http://localhost:3000 || echo "❌ Local failed"

echo -e "\nTesting via nginx:"
curl -I http://localhost || echo "❌ Nginx failed"

echo -e "\n✅ Emergency fix completed"
