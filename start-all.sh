#!/bin/zsh
# Start all 28 apps on localhost
# Usage: ./start-all.sh
# Stop all: ./stop-all.sh

BASE="/Users/sfino/Desktop/Claude Code/apps"
LOG_DIR="/Users/sfino/Desktop/Claude Code/logs"
mkdir -p "$LOG_DIR"

APPS=(
  "stonex-pro:3000"
  "hip-ma-analyzer:3001"
  "edgefinder:3002"
  "adr-intelligence:3003"
  "adr-market-intel:3004"
  "commodity-risk-dashboard:3005"
  "global-payments:3006"
  "alma-retreat:3007"
  "bible-ai:3008"
  "carsource-ai:3009"
  "comercial-del-valle:3010"
  "commodity-risk:3011"
  "content-ai:3012"
  "flux-budget:3013"
  "habit-forge:3014"
  "haven-education-hub:3015"
  "history-ai:3016"
  "life-os:3017"
  "meal-genie:3018"
  "mentor-ai:3019"
  "mycloset-ai:3020"
  "polystyrene-recycling:3021"
  "pulse-ai:3022"
  "real-estate-ai:3023"
  "sidehustle-ai:3024"
  "sie-exam-prep:3025"
  "snap-cv:3026"
  "portfolio:3027"
)

echo "🚀 Starting all 28 apps on localhost..."
echo ""

STARTED=0
FAILED=0

for ENTRY in "${APPS[@]}"; do
  APP="${ENTRY%%:*}"
  PORT="${ENTRY##*:}"
  APP_DIR="$BASE/$APP"

  if [ ! -d "$APP_DIR" ]; then
    echo "  ❌ $APP — directory not found"
    ((FAILED++))
    continue
  fi

  # Check if port is already in use
  if lsof -i :$PORT -sTCP:LISTEN > /dev/null 2>&1; then
    echo "  ⚡ $APP — already running on port $PORT"
    ((STARTED++))
    continue
  fi

  # Start the dev server
  cd "$APP_DIR"
  npx next dev -p $PORT > "$LOG_DIR/$APP.log" 2>&1 &
  echo $! > "$LOG_DIR/$APP.pid"
  echo "  ✅ $APP — http://localhost:$PORT (PID: $!)"
  ((STARTED++))
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Started: $STARTED | Failed: $FAILED"
echo "  Logs: $LOG_DIR/<app-name>.log"
echo "  Stop all: ./stop-all.sh"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 All localhost URLs:"
echo ""
for ENTRY in "${APPS[@]}"; do
  APP="${ENTRY%%:*}"
  PORT="${ENTRY##*:}"
  printf "  %-28s http://localhost:%s\n" "$APP" "$PORT"
done
