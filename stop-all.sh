#!/bin/zsh
# Stop all running dev servers
# Usage: ./stop-all.sh

LOG_DIR="/Users/sfino/Desktop/Claude Code/logs"

echo "🛑 Stopping all dev servers..."
echo ""

STOPPED=0

if [ -d "$LOG_DIR" ]; then
  for PID_FILE in "$LOG_DIR"/*.pid(N); do
    if [ -f "$PID_FILE" ]; then
      APP=$(basename "$PID_FILE" .pid)
      PID=$(cat "$PID_FILE")
      if kill -0 "$PID" 2>/dev/null; then
        kill "$PID" 2>/dev/null
        pkill -P "$PID" 2>/dev/null
        echo "  ✅ Stopped $APP (PID: $PID)"
        ((STOPPED++))
      else
        echo "  ⚪ $APP — already stopped"
      fi
      rm -f "$PID_FILE"
    fi
  done
fi

# Also kill any stray next dev processes
STRAY=$(pgrep -f "next dev" 2>/dev/null | wc -l | tr -d ' ')
if [ "$STRAY" -gt 0 ]; then
  pkill -f "next dev" 2>/dev/null
  echo ""
  echo "  🧹 Cleaned up $STRAY stray Next.js processes"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Stopped: $STOPPED servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
