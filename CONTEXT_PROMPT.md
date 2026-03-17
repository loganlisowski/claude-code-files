# Full Context Prompt for New Claude Code Session

Paste everything below this line into a new Claude Code session:

---

## Who I Am

I'm building a portfolio of 27+ AI-powered web apps. My working directory is `/Users/sfino/Desktop/Claude Code`. All apps live under `/Users/sfino/Desktop/Claude Code/apps/`. I deploy everything to Vercel.

## My Live Apps and Production URLs

| # | App | Directory | Production URL | Status |
|---|-----|-----------|----------------|--------|
| 1 | Personal Portfolio | `apps/portfolio` | https://portfolio-five-sigma-78.vercel.app | Live |
| 2 | EdgePro (StonexPro) | `apps/stonex-pro` | https://edgepro-three.vercel.app | Live |
| 3 | HIP M&A Analyzer | `apps/hip-ma-analyzer` | https://hip-ma-analyzer.vercel.app | Live |
| 4 | EdgeFinder | `apps/edgefinder` | https://edgefinder-five.vercel.app | Live |
| 5 | ADR Intelligence | `apps/adr-intelligence` | https://adr-intelligence.vercel.app | Live |
| 6 | ADR Market Intel | `apps/adr-market-intel` | https://adr-market-intel.vercel.app | Live |
| 7 | CommodityEdge | `apps/commodity-risk-dashboard` | https://commodity-risk-dashboard.vercel.app | Live |
| 8 | PaymentFlow | `apps/global-payments` | https://global-payments.vercel.app | Live |
| 9 | SIE Exam Prep | `apps/sie-exam-prep` | https://sie-exam-prep.vercel.app | Live |
| 10 | Haven Education Hub | `apps/haven-education-hub` | https://haven-education-hub.vercel.app | Live |
| 11 | History.ai | `apps/history-ai` | https://history-ai-chi.vercel.app | Live |
| 12 | Bible.ai | `apps/bible-ai` | https://bible-ai-brown.vercel.app | Live |
| 13 | Mentor.ai | `apps/mentor-ai` | https://mentor-ai-wine-chi.vercel.app | Live |
| 14 | Content.ai | `apps/content-ai` | https://content-ai-mu-seven.vercel.app | Live |
| 15 | Snap CV | `apps/snap-cv` | https://snap-cv.vercel.app | Live |
| 16 | MyCloset.ai | `apps/mycloset-ai` | https://mycloset-ai.vercel.app | Live |
| 17 | CarSource AI | `apps/carsource-ai` | https://carsource-ai.vercel.app | Live |
| 18 | Real Estate AI | `apps/real-estate-ai` | https://real-estate-ai-rosy.vercel.app | Live |
| 19 | SideHustle.ai | `apps/sidehustle-ai` | https://sidehustle-ai-rose.vercel.app | Live |
| 20 | Life OS | `apps/life-os` | https://life-os.vercel.app | Live |
| 21 | Habit Forge | `apps/habit-forge` | https://habit-forge.vercel.app | Live |
| 22 | Meal Genie | `apps/meal-genie` | https://meal-genie.vercel.app | Live |
| 23 | Alma Retreat | `apps/alma-retreat` | https://alma-retreat.vercel.app | Live |
| 24 | Comercial del Valle | `apps/comercial-del-valle` | https://comercial-del-valle.vercel.app | Live |
| 25 | Polystyrene Recycling | `apps/polystyrene-recycling` | https://polystyrene-recycling.vercel.app | Live |
| 26 | Commodity Risk | `apps/commodity-risk` | https://commodity-risk.vercel.app | 404 — Not deployed |
| 27 | Flux Budget | `apps/flux-budget` | https://flux-budget.vercel.app | 500 — Server error |
| 28 | Pulse AI | `apps/pulse-ai` | https://pulse-ai.vercel.app | 500 — Server error |

The personal portfolio (app #1) is the central hub linking to all other apps.

## Tech Stack (All Apps)

- **Framework:** Next.js 14 App Router with TypeScript
- **Styling:** Tailwind CSS (most apps use a dark theme with emerald/green accents)
- **Deployment:** Vercel (each app has its own Vercel project)
- **Package manager:** npm
- **No monorepo tooling** — each app under `apps/` is independent with its own `package.json`

## EdgePro (StonexPro) — Detailed Architecture

EdgePro is a professional-grade trading analytics platform. It was recently overhauled to use **100% real market data** — no demo data, no `Math.random()`, no hardcoded fake values.

### Data Flow

```
Yahoo Finance v7 (quotes + fundamentals)
Yahoo Finance v8 (historical OHLCV charts)
        |
  Next.js API Routes (server-side, with in-memory cache)
        |
  Technical Indicator Computation (technicalindicators npm package)
        |
  Signal Generation Engine (vote-based system, 15 indicator checks)
        |
  React Client Components (real-time updates via polling)
```

### Key Files and What They Do

#### Core Libraries (`src/lib/`)

| File | Purpose |
|------|---------|
| `data.ts` | Master data module — BASE_ASSETS (50+ tickers with seed prices), `useLivePrices()` hook (fetches `/api/prices` every 30s), `fetchRealSignals()`, momentum-based simulation tick for inter-fetch animation, VaR calculation using real volatility |
| `indicators.ts` | Wraps `technicalindicators` package — `computeIndicators(ohlcv)` returns RSI(14), MACD(12,26,9), SMA(20/50/200), EMA(12/26), Bollinger Bands(20,2), ATR(14), Stochastic(14,3), ADX(14), CCI(20), Williams %R(14), OBV, PSAR, Keltner Channels, 30d volatility, priceVsSMA200. Also exports `pearsonCorrelation()`, `computeLogReturns()`, `computeCorrelationMatrix()`, `computeMonthlyReturns()`, `computeAnnualizedVolatility()` |
| `signal-engine.ts` | Real signal generation — `collectVotes(indicators)` checks 15 conditions (RSI oversold/overbought, MACD crossover, SMA200 position, golden/death cross, Bollinger proximity, Stochastic, Williams %R, CCI, ADX, PSAR, OBV, Keltner, EMA crossover). Needs margin of 2+ votes. Confidence: margin>=5 then 78-92%, margin>=3 then 68-77%, margin=2 then 55-65%. Entry/stop/target based on ATR (stop=1.5xATR, target=3xATR). |
| `cache.ts` | Server-side in-memory Map cache with TTL. `getCached<T>(key)` / `setCache(key, data, ttlMs)`. Evicts expired entries when size > 500. |

#### API Routes (`src/app/api/`)

| Route | Method | Purpose | Cache TTL |
|-------|--------|---------|-----------|
| `/api/prices` | POST | Real-time quotes from Yahoo v7, fallback to v8. Returns price, change, percentChange, volume, trailingPE, marketCap, beta, sector, 52wk high/low | None (real-time) |
| `/api/history` | POST | Historical OHLCV from Yahoo v8. Accepts `{symbol, market, range?, interval?}`, defaults 1y daily | 5 min |
| `/api/signals` | POST | Fetches history, computes indicators, generates signals. Batches 15 symbols, 300ms delay between batches. Max 60 symbols | 5 min |
| `/api/analytics` | POST | Correlation matrix (Pearson from daily log returns), monthly returns, annualized volatility | 15 min |
| `/api/fundamentals` | POST | P/E, market cap, beta, sector from Yahoo v7 | 10 min |

#### Page Components (`src/app/`)

| Page | Key Features |
|------|-------------|
| `page.tsx` (Home) | Dashboard with ticker tape, portfolio summary, equity curve chart, position cards |
| `signals/page.tsx` | Real signals from technical indicators, loading spinner during computation, "Refresh Signals" button, NO demo labels |
| `analytics/page.tsx` | Real correlation matrix, monthly returns heatmap (Trailing 12M), real historical volatility. Uses progressive enhancement (fallback then real data) |
| `commodities/page.tsx` | 112 commodity indicators (no fake win rates/avg returns), live technical indicator panel with commodity selector, stress test scenarios |
| `equities/page.tsx` | Country risk profiles (curated editorial data, kept as-is with attribution note), sector analysis |

### Yahoo Finance Integration

- **v7 endpoint:** `https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,MSFT,...`
  - Returns: regularMarketPrice, regularMarketChange, regularMarketChangePercent, regularMarketVolume, trailingPE, marketCap, beta, sector, fiftyTwoWeekHigh, fiftyTwoWeekLow
- **v8 endpoint:** `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range=1y`
  - Returns: timestamps[], indicators.quote[0].{open,high,low,close,volume}[]
  - Also has meta.regularMarketPrice, meta.chartPreviousClose for real-time fallback

### Symbol Mapping (`toYahooSymbol()`)

- Commodity: `ticker=F` (e.g., `GC=F` for gold)
- Crypto: `ticker-USD` (e.g., `BTC-USD`)
- Forex: `ticker=X` with slash removed (e.g., `EURUSD=X`)
- Equity/ADR: ticker as-is (e.g., `AAPL`)

### Important TypeScript Notes

- **No `downlevelIteration`** — cannot iterate Maps directly. Use `Array.from(map.keys())` or `Array.from(map.entries()).forEach()`
- KeltnerChannels from `technicalindicators` requires `useSMA: false` and `multiplier: 1.5` (not `useTrueRange`)
- Signal interface in data.ts uses `any[]` return type with `as Signal[]` cast due to type narrowing issues with `riskReward` field

### Dependencies

- `technicalindicators` — pure TypeScript technical analysis library (RSI, MACD, SMA, EMA, Bollinger, ATR, Stochastic, ADX, CCI, Williams %R, OBV, PSAR, KeltnerChannels)
- `recharts` — charting library for equity curves, heatmaps, etc.
- `next` 14.x with App Router
- `tailwindcss`

## What Was Already Completed

1. **Ticker tape fix** — Home page ticker tape shows real % changes from Yahoo Finance
2. **Equity curve chart** — Real portfolio performance visualization
3. **EdgePro real data overhaul** — ALL demo/simulated data replaced with real market data:
   - Created 4 new lib files (cache, indicators, signal-engine, + data.ts modifications)
   - Created 4 new API routes (history, signals, analytics, fundamentals)
   - Enhanced prices API to extract fundamentals
   - Updated 4 page components (signals, analytics, commodities, equities)
   - Removed all "Demo Signals" badges and disclaimers
   - Removed all `Math.random()` from data generation
   - Removed 112 fake indicator win rates and impossible dates
   - Clean `npm run build` and deployed to Vercel
4. **Portfolio URL fix** — Fixed 6 broken app URLs in the portfolio page:
   - SideHustle.ai, Content.ai, History.ai, Real Estate AI, Mentor.ai, Bible.ai
   - All now point to correct Vercel deployment URLs
   - Deployed to https://portfolio-five-sigma-78.vercel.app

## Known Issues

- `commodity-risk.vercel.app` returns 404 — project may not be deployed yet
- `flux-budget.vercel.app` returns 500 — server error in the app
- `pulse-ai.vercel.app` returns 500 — server error in the app

## My Preferences

- Dark theme UI with emerald/green accents
- Professional, institutional-grade design aesthetic
- No demo/fake/simulated data — everything should be real
- Deploy to Vercel after significant changes
- I prefer you work autonomously and just get things done
- Be direct and concise

## Build & Deploy Commands

```bash
# Build any app
cd /Users/sfino/Desktop/Claude\ Code/apps/<app-name>
npm run build

# Deploy to Vercel (from app directory)
npx vercel --prod
```

## Directory Structure

```
/Users/sfino/Desktop/Claude Code/
├── apps/
│   ├── portfolio/               (Personal Portfolio — central hub)
│   ├── stonex-pro/              (EdgePro)
│   ├── hip-ma-analyzer/         (HIP M&A Analyzer)
│   ├── edgefinder/              (EdgeFinder)
│   ├── adr-intelligence/        (ADR Intelligence)
│   ├── adr-market-intel/        (ADR Market Intel)
│   ├── commodity-risk-dashboard/ (CommodityEdge)
│   ├── global-payments/         (PaymentFlow)
│   ├── commodity-risk/          (Commodity Risk — not deployed)
│   ├── sie-exam-prep/           (SIE Exam Prep)
│   ├── haven-education-hub/     (Haven Education Hub)
│   ├── history-ai/              (History.ai)
│   ├── bible-ai/                (Bible.ai)
│   ├── mentor-ai/               (Mentor.ai)
│   ├── content-ai/              (Content.ai)
│   ├── snap-cv/                 (Snap CV)
│   ├── mycloset-ai/             (MyCloset.ai)
│   ├── carsource-ai/            (CarSource AI)
│   ├── real-estate-ai/          (Real Estate AI)
│   ├── sidehustle-ai/           (SideHustle.ai)
│   ├── life-os/                 (Life OS)
│   ├── habit-forge/             (Habit Forge)
│   ├── flux-budget/             (Flux Budget — server error)
│   ├── meal-genie/              (Meal Genie)
│   ├── pulse-ai/                (Pulse AI — server error)
│   ├── alma-retreat/            (Alma Retreat)
│   ├── comercial-del-valle/     (Comercial del Valle)
│   └── polystyrene-recycling/   (Polystyrene Recycling)
└── CONTEXT_PROMPT.md            (This file)
```
