# WHEN YOU GET BACK

**Generated:** April 3, 2026

---

## 1. loganlisowski.com Status

**Build status:** Passing (Next.js 14, TypeScript, Tailwind, Framer Motion)
**Location:** `apps/portfolio/`

The portfolio site is fully built and builds clean. It includes:
- Cinematic hero with animated counters (40+ apps, 32 deployed, 10 revenue, 15+ AI)
- "Open to opportunities - Graduating May 2026" badge
- About section with "What I Build" and "Current Focus" cards
- Full project grid (38 projects) with category filtering (Trading, SaaS, AI, Productivity, Education)
- External links to all deployed apps (EdgeFinder, InvoiceFlow, WaitlistPro, etc.)
- Experience timeline (SFIN Media, @PolystyreneGuy, EdgeFinder, Rollins College)
- Tech stack grid (frontend, backend, AI, tools, finance)
- Contact form (mailto-based, no backend needed)
- Glass morphism design, dark/light mode, dot-grid background, aurora glow
- SEO metadata, sitemap, robots.txt, error/loading/404 pages

### What you need to do to go live:

1. **Deploy to Vercel:**
   ```bash
   cd apps/portfolio
   npx vercel --prod
   ```
   When prompted, set the root directory to `apps/portfolio`.

2. **Configure custom domain in Vercel:**
   - Go to your Vercel project settings > Domains
   - Add `loganlisowski.com`
   - Vercel will give you DNS records to add

3. **Update Namecheap DNS:**
   - Log into Namecheap > Domain List > loganlisowski.com > Advanced DNS
   - Add the A record and CNAME record Vercel provides
   - Remove any conflicting DNS records
   - DNS propagation takes 5-30 minutes

---

## 2. Every File Created

### Portfolio Site (`apps/portfolio/`)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript config
- `next.config.mjs` - Next.js config
- `postcss.config.mjs` - PostCSS config
- `tailwind.config.ts` - Tailwind with custom animations and blue/indigo theme
- `.eslintrc.json` - ESLint config
- `src/app/globals.css` - Theme variables, glass morphism, dot-grid, aurora
- `src/app/layout.tsx` - Root layout with ThemeProvider, Navbar, Footer
- `src/app/page.tsx` - Main cinematic single-page portfolio
- `src/app/robots.ts` - SEO robots
- `src/app/sitemap.ts` - SEO sitemap
- `src/app/not-found.tsx` - 404 page
- `src/app/loading.tsx` - Loading spinner
- `src/app/error.tsx` - Error boundary
- `src/components/layout/Navbar.tsx` - Glass nav with mobile menu
- `src/components/layout/Footer.tsx` - Footer with social links
- `src/components/shared/SectionReveal.tsx` - Scroll-triggered animations
- `src/hooks/useInView.ts` - IntersectionObserver hook
- `src/lib/utils.ts` - cn() utility
- `src/data/portfolio-data.ts` - All projects, experiences, skills, stats

### Japan Video Production Packages (`JAPAN_VIDEOS/`)
5 video folders, each with 4 files (20 files total):
- `japan-does-recycling-different/` - SCRIPT.md, CAPTIONS.md, BROLL_SHOT_LIST.md, AI_VIDEO_PROMPT.md
- `this-cup-is-98-percent-air/` - SCRIPT.md, CAPTIONS.md, BROLL_SHOT_LIST.md, AI_VIDEO_PROMPT.md
- `what-that-symbol-means/` - SCRIPT.md, CAPTIONS.md, BROLL_SHOT_LIST.md, AI_VIDEO_PROMPT.md
- `one-country-zero-excuses/` - SCRIPT.md, CAPTIONS.md, BROLL_SHOT_LIST.md, AI_VIDEO_PROMPT.md
- `three-things-polystyrene/` - SCRIPT.md, CAPTIONS.md, BROLL_SHOT_LIST.md, AI_VIDEO_PROMPT.md

### Other Documents (root)
- `AI_TOOLS_REPORT.md` - 6-category AI toolkit with pricing, use cases, priority stack
- `CRE_FOLLOWUP_EMAILS.md` - 6 ready-to-send CRE networking emails
- `OUTREACH_BATCH.md` - 6 outreach drafts (text, email, LinkedIn)
- `SIE_STUDY_PLAN.md` - 30-day daily study plan with practice questions

---

## 3. Design and Copy Decisions Made

| Decision | Why |
|----------|-----|
| Blue/indigo color scheme instead of green | Differentiates portfolio from the green polystyrene site. Blue reads as professional/tech/finance. |
| Single-page design | A portfolio should be scannable in one scroll. No need for multi-page routing. |
| Dark mode default | Matches the cinematic feel and aligns with every other app in the portfolio. |
| Glass morphism cards | Consistent with the design system used across all 32+ apps. |
| mailto: contact form | No backend needed for launch. Can upgrade to Resend later. |
| Category filter on projects | 38 projects is overwhelming without filtering. Categories make it browsable. |
| "FEATURED" badges on EdgeFinder, PitchDeck, ClipSync, Orlando CRE, PolyRecycle | These are the strongest portfolio pieces spanning different verticals. |
| Animated stat counters | Creates the cinematic "wow" moment on first visit. |
| No chatbot on portfolio | Unlike the polystyrene site, the portfolio doesn't need AI chat. Keep it clean. |

---

## 4. Top 3 AI Tools to Install Right Now

1. **Kickresume AI** - Free with your .edu email. Expires when you graduate in May. Activate Premium now for AI resume tailoring per job posting.
2. **Kling AI** - Best realism for your Japan b-roll. The AI_VIDEO_PROMPT.md files are already formatted for it. Sign up and start generating shots.
3. **Descript** - Edit your Japan video footage by editing the transcript. Fastest turnaround for turning raw clips into polished Reels.

---

## 5. Three Most Urgent Action Items (within 24 hours)

1. **Deploy portfolio to Vercel and configure Namecheap DNS** - The site is built and ready. Run `cd apps/portfolio && npx vercel --prod`, then update DNS. Should take 15 minutes.

2. **Send the Apr 5 follow-up emails** - Jordan Bohannon (Avison Young), Nick Poole/Cody Manzella (JLL), and Penny Ezell (Newmark) all have follow-up targets of April 5. The drafts are ready in `CRE_FOLLOWUP_EMAILS.md`. Copy, paste, send.

3. **Start SIE Day 1** - The 30-day plan starts April 4. Day 1 is common stock basics (shareholder rights, IPO process, primary vs secondary markets). 30 minutes. The practice question is in the plan.

---

## 6. Items Requiring Your Input

- **Vercel account:** You need to be logged in to deploy. If the portfolio project doesn't exist in Vercel yet, the CLI will create it.
- **Namecheap DNS records:** Vercel will provide the exact A/CNAME records. You need your Namecheap login to add them.
- **CRE email review:** All 6 emails are drafted. Read them before sending to make sure the tone matches your voice. They reference the Damien Madsen introduction and your Asia trip food poisoning.
- **Outreach batch review:** The texts to BofA Guy and Vijai are casual. The email to Sam Bodlick references Professor Jen Lee. Confirm these details are accurate before sending.
- **AI Tools Report:** Some pricing may have changed since April 2026. Confirm pricing on Kling AI and Descript before committing to a paid plan.
