#!/bin/bash
set -euo pipefail
CONF="/etc/nginx/sites-available/juriste-droit-du-travail.com"
cp -a "$CONF" "${CONF}.bak-$(date +%Y%m%d-%H%M%S)"
cat > "$CONF" << 'NGINX_EOF'
# juriste-droit-du-travail.com — Next.js via PM2 (reverse proxy)

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
NGINX_EOF
nginx -t
systemctl reload nginx
echo "nginx updated"
