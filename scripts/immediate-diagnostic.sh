#!/bin/bash

# IMMEDIATE DIAGNOSTIC AND FIX SCRIPT
# Execute directly on server to resolve 403 Forbidden

set -euo pipefail

echo "🔥 IMMEDIATE DIAGNOSTIC - 403 FORBIDDEN RESOLUTION"

# ============================================================================
# PHASE 1: BASIC INFO
# ============================================================================

echo "📍 PHASE 1: BASIC INFO"
echo "Current directory: $(pwd)"
echo "Current user: $(whoami)"
echo "Hostname: $(hostname)"

# ============================================================================
# PHASE 2: FIND PROJECT LOCATION
# ============================================================================

echo -e "\n📍 PHASE 2: FIND PROJECT LOCATION"

# Check common locations
if [ -d "/var/www/juriste-droit-du-travail/current" ]; then
    PROJECT_PATH="/var/www/juriste-droit-du-travail/current"
    echo "✅ Found project at: $PROJECT_PATH"
elif [ -d "/var/www/loubna-site/current" ]; then
    PROJECT_PATH="/var/www/loubna-site/current"
    echo "✅ Found project at: $PROJECT_PATH"
else
    echo "🔍 Searching for project..."
    find /var/www -name "package.json" -type f 2>/dev/null | head -5
    PROJECT_PATH=$(find /var/www -name "package.json" -type f 2>/dev/null | head -1 | xargs dirname)
    if [ -n "$PROJECT_PATH" ]; then
        echo "✅ Found project at: $PROJECT_PATH"
    else
        echo "❌ Project not found in /var/www"
        find /home -name "package.json" -type f 2>/dev/null | head -5
        PROJECT_PATH=$(find /home -name "package.json" -type f 2>/dev/null | head -1 | xargs dirname)
    fi
fi

if [ -z "$PROJECT_PATH" ]; then
    echo "❌ NO PROJECT FOUND - EXITING"
    exit 1
fi

echo "📁 Using project path: $PROJECT_PATH"
cd "$PROJECT_PATH"

# ============================================================================
# PHASE 3: PM2 STATUS AND LOGS
# ============================================================================

echo -e "\n📍 PHASE 3: PM2 STATUS AND LOGS"

if command -v pm2 &> /dev/null; then
    echo "✅ PM2 is installed"
    echo "PM2 Status:"
    pm2 status
    
    echo -e "\n📋 PM2 Logs (last 30 lines):"
    pm2 logs --lines 30 || echo "No PM2 logs available"
else
    echo "❌ PM2 not installed"
fi

# ============================================================================
# PHASE 4: NEXT.JS PROCESS CHECK
# ============================================================================

echo -e "\n📍 PHASE 4: NEXT.JS PROCESS CHECK"

# Check if Next.js is running on port 3000
echo "🔍 Checking port 3000:"
if lsof -i :3000 2>/dev/null; then
    echo "✅ Port 3000 is occupied"
    lsof -i :3000
else
    echo "❌ Port 3000 is free"
fi

# Check for Next.js processes
echo "🔍 Checking for Next.js processes:"
ps aux | grep -E "(next|npm)" | grep -v grep || echo "No Next.js processes found"

# ============================================================================
# PHASE 5: NGINX CONFIGURATION
# ============================================================================

echo -e "\n📍 PHASE 5: NGINX CONFIGURATION"

echo "🔍 Nginx status:"
if command -v nginx &> /dev/null; then
    echo "✅ Nginx is installed"
    
    echo "Nginx configuration test:"
    if sudo nginx -t; then
        echo "✅ Nginx configuration is valid"
    else
        echo "❌ Nginx configuration has errors"
    fi
    
    echo "Nginx service status:"
    sudo systemctl status nginx --no-pager || echo "Could not get nginx status"
    
    echo -e "\n📋 Nginx sites available:"
    ls -la /etc/nginx/sites-available/ 2>/dev/null || echo "No sites-available directory"
    
    echo -e "\n📋 Nginx sites enabled:"
    ls -la /etc/nginx/sites-enabled/ 2>/dev/null || echo "No sites-enabled directory"
    
    echo -e "\n📋 Current Nginx configuration for juriste-droit-du-travail:"
    if [ -f "/etc/nginx/sites-available/juriste-droit-du-travail" ]; then
        echo "Found config file:"
        cat /etc/nginx/sites-available/juriste-droit-du-travail
    elif [ -f "/etc/nginx/sites-enabled/juriste-droit-du-travail" ]; then
        echo "Found enabled config file:"
        cat /etc/nginx/sites-enabled/juriste-droit-du-travail
    else
        echo "❌ No Nginx config found for juriste-droit-du-travail"
    fi
else
    echo "❌ Nginx not installed"
fi

# ============================================================================
# PHASE 6: HTTP TESTS
# ============================================================================

echo -e "\n📍 PHASE 6: HTTP TESTS"

echo "🧪 Testing localhost:"
curl -I http://localhost --connect-timeout 5 2>/dev/null || echo "❌ localhost failed"

echo "🧪 Testing port 3000:"
curl -I http://localhost:3000 --connect-timeout 5 2>/dev/null || echo "❌ port 3000 failed"

echo "🧪 Testing domain:"
curl -I https://www.juriste-droit-du-travail.com --connect-timeout 10 2>/dev/null || echo "❌ domain failed"

# ============================================================================
# PHASE 7: PROJECT FILES CHECK
# ============================================================================

echo -e "\n📍 PHASE 7: PROJECT FILES CHECK"

echo "📁 Project directory contents:"
ls -la | head -10

echo -e "\n📋 package.json exists:"
if [ -f "package.json" ]; then
    echo "✅ package.json found"
    echo "Package name:"
    grep '"name"' package.json || echo "No name field"
else
    echo "❌ package.json not found"
fi

echo -e "\n📋 .next directory:"
if [ -d ".next" ]; then
    echo "✅ .next directory exists"
    echo "Size: $(du -sh .next)"
else
    echo "❌ .next directory not found"
fi

echo -e "\n📋 node_modules:"
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
    echo "Size: $(du -sh node_modules)"
else
    echo "❌ node_modules not found"
fi

echo -e "\n📋 .env.local:"
if [ -f ".env.local" ]; then
    echo "✅ .env.local exists"
    echo "Contents (first 5 lines):"
    head -5 .env.local
else
    echo "❌ .env.local not found"
fi

# ============================================================================
# PHASE 8: LOGS ANALYSIS
# ============================================================================

echo -e "\n📍 PHASE 8: LOGS ANALYSIS"

echo "📋 Nginx error logs (last 20 lines):"
if [ -f "/var/log/nginx/error.log" ]; then
    sudo tail -20 /var/log/nginx/error.log || echo "Could not read nginx error log"
else
    echo "❌ No nginx error log found"
fi

echo -e "\n📋 Nginx access logs (last 10 lines):"
if [ -f "/var/log/nginx/access.log" ]; then
    sudo tail -10 /var/log/nginx/access.log || echo "Could not read nginx access log"
else
    echo "❌ No nginx access log found"
fi

echo -e "\n📋 System logs for nginx:"
sudo journalctl -u nginx --no-pager -n 20 2>/dev/null || echo "Could not read nginx journalctl"

# ============================================================================
# PHASE 9: IMMEDIATE FIXES
# ============================================================================

echo -e "\n📍 PHASE 9: IMMEDIATE FIXES"

# Fix 1: Create .env.local if missing
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating .env.local..."
    cat > .env.local << 'EOF'
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=loubna_db
POSTGRES_USER=loubna_user
POSTGRES_PASSWORD=temp_password123
SESSION_SECRET=temp_session_secret_32_chars_minimum_abcdef123456789012
NEXT_PUBLIC_SITE_URL=https://www.juriste-droit-du-travail.com
STRIPE_SECRET_KEY=sk_test_placeholder_key_123456789
STRIPE_WEBHOOK_SECRET=whsec_placeholder_webhook_123456789
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder_publishable_123456789
EOF
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

# Fix 2: Install dependencies if missing
if [ ! -d "node_modules" ]; then
    echo "🔧 Installing dependencies..."
    npm ci --production
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Fix 3: Create Nginx config if missing
if [ ! -f "/etc/nginx/sites-available/juriste-droit-du-travail" ]; then
    echo "🔧 Creating Nginx config..."
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
    
    # Enable site
    sudo ln -sf /etc/nginx/sites-available/juriste-droit-du-travail /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default || true
    
    echo "✅ Nginx config created and enabled"
else
    echo "✅ Nginx config already exists"
fi

# ============================================================================
# PHASE 10: START NEXT.JS
# ============================================================================

echo -e "\n📍 PHASE 10: START NEXT.JS"

# Kill any existing processes
echo "🛑 Killing existing Next.js processes..."
pkill -f "next start" || true
pkill -f "npm start" || true
pm2 stop nextjs-loubna || true
pm2 delete nextjs-loubna || true
sleep 3

# Free port 3000
echo "🔧 Freeing port 3000..."
sudo fuser -k 3000/tcp 2>/dev/null || true
sleep 2

# Start with PM2
echo "🚀 Starting Next.js with PM2..."
PORT=3000 pm2 start npm --name "nextjs-loubna" -- start
pm2 save

# Wait for startup
echo "⏳ Waiting 10 seconds for startup..."
sleep 10

# ============================================================================
# PHASE 11: FINAL VALIDATION
# ============================================================================

echo -e "\n📍 PHASE 11: FINAL VALIDATION"

echo "📊 Final PM2 status:"
pm2 status

echo -e "\n🧪 Final tests:"
echo "Testing port 3000:"
if curl -s -I http://localhost:3000 | head -1; then
    echo "✅ Port 3000 SUCCESS!"
else
    echo "❌ Port 3000 FAILED"
    echo "📋 PM2 logs:"
    pm2 logs nextjs-loubna --lines 20
fi

echo -e "\nTesting via nginx:"
if curl -s -I http://localhost | head -1; then
    echo "✅ Nginx proxy SUCCESS!"
else
    echo "❌ Nginx proxy FAILED"
fi

echo -e "\nTesting domain:"
if curl -s -I https://www.juriste-droit-du-travail.com | head -1; then
    echo "✅ Domain SUCCESS!"
else
    echo "❌ Domain FAILED"
fi

echo -e "\n🔥 IMMEDIATE DIAGNOSTIC COMPLETED"
echo "🌐 Site should be available at: https://www.juriste-droit-du-travail.com"
