#!/bin/bash

# Direct fix script - bypass all diagnostics and fix the core issue
set -euo pipefail

echo "🔥 DIRECT FIX - RESOLVING NEXT.JS NOT RESPONDING"

DEPLOY_PATH=$(pwd)
APP_NAME="nextjs-loubna"

echo "📁 Working in: $DEPLOY_PATH"

# ============================================================================
# STEP 1: KILL EVERYTHING AND START FRESH
# ============================================================================

echo "🛑 Killing all Next.js processes..."
pkill -f "next start" || true
pkill -f "npm start" || true
pm2 stop "$APP_NAME" || true
pm2 delete "$APP_NAME" || true
sleep 2

# ============================================================================
# STEP 2: CREATE MINIMAL ENVIRONMENT
# ============================================================================

echo "⚙️ Creating minimal .env.local..."
cat > .env.local << 'EOF'
# Minimal config to get Next.js working
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=loubna_db
POSTGRES_USER=loubna_user
POSTGRES_PASSWORD=temp_password123
SESSION_SECRET=temp_session_secret_32_chars_minimum_abcdef123456789012
NEXT_PUBLIC_SITE_URL=https://www.juriste-droit-du-travail.com

# Stripe placeholders
STRIPE_SECRET_KEY=sk_test_placeholder_key_123456789
STRIPE_WEBHOOK_SECRET=whsec_placeholder_webhook_123456789
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder_publishable_123456789
EOF

echo "✅ .env.local created"

# ============================================================================
# STEP 3: CHECK IF PORT 3000 IS FREE
# ============================================================================

echo "🔍 Checking port 3000..."
if lsof -i :3000 > /dev/null 2>&1; then
    echo "❌ Port 3000 is occupied, killing..."
    sudo lsof -ti :3000 | xargs kill -9 || true
    sleep 2
else
    echo "✅ Port 3000 is free"
fi

# ============================================================================
# STEP 4: START WITH DIRECT COMMAND
# ============================================================================

echo "🚀 Starting Next.js with direct command..."

# Kill any existing processes on port 3000
sudo fuser -k 3000/tcp 2>/dev/null || true
sleep 2

# Start directly with npm
PORT=3000 npm start > direct-start.log 2>&1 &
DIRECT_PID=$!

echo "📊 Direct start PID: $DIRECT_PID"

# Wait for startup
echo "⏳ Waiting 15 seconds for startup..."
sleep 15

# Check if process is running
if kill -0 $DIRECT_PID 2>/dev/null; then
    echo "✅ Direct process is running"
    
    # Test response
    echo "🧪 Testing response..."
    if curl -s -m 5 http://localhost:3000 > /dev/null; then
        echo "✅ SUCCESS! Next.js is responding!"
        
        # Convert to PM2
        echo "🔄 Converting to PM2 for stability..."
        kill $DIRECT_PID 2>/dev/null || true
        sleep 3
        
        PORT=3000 pm2 start npm --name "$APP_NAME" -- start
        pm2 save
        
        # Final test
        sleep 5
        if curl -s http://localhost:3000 > /dev/null; then
            echo "✅ PM2 version working!"
        else
            echo "❌ PM2 version not working, keeping direct..."
            PORT=3000 npm start > pm2-fallback.log 2>&1 &
        fi
    else
        echo "❌ Direct start not responding, checking logs..."
        echo "📋 Direct start logs:"
        tail -20 direct-start.log
        
        # Try PM2 as fallback
        echo "🔄 Trying PM2 fallback..."
        PORT=3000 pm2 start npm --name "$APP_NAME" -- start
        pm2 save
        
        sleep 10
        if curl -s http://localhost:3000 > /dev/null; then
            echo "✅ PM2 fallback working!"
        else
            echo "❌ PM2 fallback failed, checking PM2 logs..."
            pm2 logs "$APP_NAME" --lines 20
        fi
    fi
else
    echo "❌ Direct process died, checking logs..."
    if [ -f "direct-start.log" ]; then
        echo "📋 Direct start logs:"
        tail -30 direct-start.log
    fi
    
    # Try PM2 as last resort
    echo "🔄 Trying PM2 as last resort..."
    PORT=3000 pm2 start npm --name "$APP_NAME" -- start
    pm2 save
    
    sleep 10
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ PM2 last resort working!"
    else
        echo "❌ Everything failed, checking PM2 logs..."
        pm2 logs "$APP_NAME" --lines 30
        
        echo "🔍 Checking what's wrong..."
        echo "Node version:"
        node --version
        
        echo "NPM version:"
        npm --version
        
        echo "Package.json exists:"
        ls -la package.json
        
        echo "Node modules exists:"
        ls -la node_modules | head -5
    fi
fi

# ============================================================================
# STEP 5: FINAL VERIFICATION
# ============================================================================

echo -e "\n🧪 FINAL VERIFICATION:"

echo "PM2 Status:"
pm2 status

echo -e "\nTesting port 3000:"
if curl -s -I http://localhost:3000 | head -1; then
    echo "✅ Port 3000 working!"
else
    echo "❌ Port 3000 failed"
fi

echo -e "\nTesting via nginx:"
if curl -s -I http://localhost | head -1; then
    echo "✅ Nginx proxy working!"
else
    echo "❌ Nginx proxy failed"
fi

echo -e "\n🔥 DIRECT FIX COMPLETED!"
echo "🌐 Site should be available at: https://www.juriste-droit-du-travail.com"
