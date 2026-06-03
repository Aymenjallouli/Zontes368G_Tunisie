#!/bin/bash
# ═══════════════════════════════════════════════
#  Zontes 368 G — VPS Deploy Script
#  Run on VPS: bash deploy.sh
# ═══════════════════════════════════════════════
set -euo pipefail

REPO="https://github.com/Aymenjallouli/Zontes368G_Tunisie.git"
APP_DIR="/opt/zontes368g"
COMPOSE="docker compose -f docker-compose.prod.yml"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🏍  Zontes 368 G — VPS Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Docker ──────────────────────────────
if ! command -v docker &>/dev/null; then
  echo "📦 Installing Docker..."
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker ubuntu
  echo ""
  echo "✓ Docker installed. Log out and back in, then re-run this script."
  exit 0
fi

# ── 2. Clone or pull ───────────────────────
if [ -d "$APP_DIR/.git" ]; then
  echo "⬇  Pulling latest from GitHub..."
  git -C "$APP_DIR" pull
else
  echo "⬇  Cloning repository..."
  git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR"

# ── 3. .env must be present ────────────────
if [ ! -f ".env" ]; then
  echo ""
  echo "❌  .env missing. Copy it from your local machine:"
  echo "    scp .env ubuntu@<VPS_IP>:/opt/zontes368g/.env"
  echo ""
  exit 1
fi
source .env
echo "✓  .env loaded"

# ── 4. Stop old containers if running ──────
$COMPOSE down 2>/dev/null || true

# ── 5. Build & start all services ──────────
echo "🐳 Building and starting (first run takes ~2 min)..."
$COMPOSE up -d --build

# ── 6. Health check ────────────────────────
echo "⏳ Waiting for API..."
for i in $(seq 1 20); do
  if curl -sf http://localhost/api/health > /dev/null 2>&1; then
    echo "✓  API is up"
    break
  fi
  sleep 3
done

# ── 7. Status ──────────────────────────────
echo ""
$COMPOSE ps
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅  Deployed!"
echo ""
echo "  🌐  Site   → ${FRONTEND_URL}"
echo "  🔧  Admin  → ${FRONTEND_URL}/admin/login"
echo "  💊  Health → ${FRONTEND_URL}/api/health"
echo ""
echo "  📌 First-time: create admin account:"
echo "     bash create-admin.sh admin@zontes.tn YourPassword"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
