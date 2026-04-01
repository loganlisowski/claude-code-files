# PolyRecycle — Polystyrene Recycling Education Platform

Interactive educational web app for polystyrene (EPS/HIPS/XPS) recycling education and @PolystyreneGuy content engagement.

**Live:** [polystyrene-recycling.vercel.app](https://polystyrene-recycling.vercel.app)

## Features

- **Educational Content** — Comprehensive guides on polystyrene types, recycling methods (mechanical + chemical), and environmental impact
- **Interactive Quiz** — 17 questions across 3 difficulty levels with XP/achievement system
- **Sorting Game** — Drag-and-drop recycling game with combos and streaks
- **30+ Fun Facts** — Categorized, searchable, with favorites
- **Blog** — 10+ articles on polystyrene recycling topics
- **Myths vs Facts** — Interactive flip-card debunking common misconceptions
- **Environmental Impact** — Data visualizations (bar, pie, line charts) with material comparisons
- **State Policy Finder** — All 50 US states' polystyrene policies (bans, restrictions)
- **AI Chatbot** — GPT-4 Mini powered "PolystyreneGuy" expert chatbot
- **Lead Capture** — Contact form + newsletter signup for PolyRecycle consulting
- **Gamification** — XP system, achievements, leaderboards

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Radix UI + Framer Motion
- **AI:** OpenAI GPT-4 Mini (chatbot)
- **Charts:** Recharts
- **Email:** Resend (lead notifications)
- **Database:** Supabase (optional, for lead capture)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your API keys
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for chatbot |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase URL (for lead capture) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key |
| `RESEND_API_KEY` | No | Resend API key (lead email notifications) |
| `NOTIFICATION_EMAIL` | No | Email for lead notifications |
| `NEXT_PUBLIC_APP_URL` | No | App URL |

## SEO

Optimized for keywords: polystyrene recycling, EPS recycling, foam recycling, HIPS recycling, styrofoam recycling.

- Per-page metadata with Open Graph and Twitter cards
- Dynamic sitemap.xml
- robots.txt
- Structured data ready

## Pages

| Page | Description |
|------|-------------|
| `/` | Landing page with hero, beginner guide, fun facts carousel |
| `/about` | Polystyrene types, timeline, EPS vs XPS comparison |
| `/how-to-recycle` | 5 recycling methods, step-by-step wizard, state policies |
| `/quiz` | 17-question quiz with difficulty levels and scoring |
| `/games` | Recycling sorting game with combos |
| `/fun-facts` | 30+ searchable/filterable facts |
| `/blog` | Article listing with search and categories |
| `/myths-vs-facts` | Flip-card myth debunking |
| `/environmental-impact` | Charts and data visualizations |
| `/contact` | Lead capture form for PolyRecycle inquiries |

## Deployment

```bash
npm run build   # Zero errors
vercel deploy
```
