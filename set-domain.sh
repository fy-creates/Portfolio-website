#!/usr/bin/env bash
# Usage: ./set-domain.sh yourdomain.com
set -e
NEW="$1"; [ -z "$NEW" ] && { echo "usage: $0 yourdomain.com"; exit 1; }
sed -i "s#ifeanyiokorie.vercel.app#$NEW#g" frontend/index.html frontend/public/sitemap.xml frontend/public/robots.txt
echo "Updated canonical/og/sitemap/robots to https://$NEW"
echo "Next: add https://$NEW and https://www.$NEW to FRONTEND_URL on Render, then redeploy."
