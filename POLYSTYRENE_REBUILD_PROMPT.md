# Polystyrene Recycling App — Complete Rebuild Prompt

Paste everything below the line into a new Claude Code session:

---

Build me a complete polystyrene recycling educational web app called **PolyRecycle** from scratch. This is a comprehensive, production-grade Next.js application. Build the ENTIRE thing — every page, every component, every data file, every feature. Do not skip or summarize anything. I want a fully working app when you're done.

## Tech Stack

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS 3.4** with `tailwindcss-animate`
- **Radix UI** — `@radix-ui/react-accordion`, `@radix-ui/react-slot`
- **lucide-react** for all icons (60+ icons used throughout)
- **class-variance-authority** (CVA) for button variants
- **clsx** + **tailwind-merge** for className utility (`cn()`)
- **AI SDK** — `@ai-sdk/openai`, `@ai-sdk/react`, `ai` for streaming chatbot
- **Fonts** — Geist Sans and Geist Mono (variable weight, local woff files)
- Deploy target: Vercel

Install all dependencies with npm.

## Design System

Dark mode ONLY (always-on, `dark` class on `<html>`). The color scheme uses HSL CSS variables:

```css
:root {
  --background: 155 30% 8%;          /* Very dark green-black */
  --foreground: 150 20% 96%;         /* Off-white */
  --primary: 160 84% 39%;            /* Bright emerald green — main accent */
  --primary-foreground: 155 30% 8%;
  --secondary: 155 25% 20%;          /* Dark muted green */
  --secondary-foreground: 150 20% 96%;
  --accent: 155 25% 20%;
  --accent-foreground: 150 20% 96%;
  --muted: 155 25% 20%;
  --muted-foreground: 150 15% 55%;
  --card: 155 25% 13%;               /* Dark green card backgrounds */
  --card-foreground: 150 20% 96%;
  --destructive: 0 84.2% 60.2%;
  --border: 155 25% 20%;
  --input: 155 25% 20%;
  --ring: 160 84% 39%;
  --radius: 0.75rem;
}
```

Custom scrollbar styling (thin emerald-colored scrollbar). Smooth scrolling. All backgrounds use subtle radial gradients and gradient overlays for depth.

## Path Alias

`@/*` maps to `./src/*` in tsconfig.json.

## Shared UI Components (src/components/ui/)

Create these reusable shadcn-style components:

1. **`button.tsx`** — CVA-based with variants: `default` (emerald bg), `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`, `sm`, `lg`, `icon`. Uses `@radix-ui/react-slot` for `asChild` prop.

2. **`card.tsx`** — `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Dark card bg with border.

3. **`badge.tsx`** — CVA variants: `default`, `secondary`, `destructive`, `outline`. Small rounded pill.

4. **`input.tsx`** — Styled text input with focus ring.

5. **`accordion.tsx`** — Wraps `@radix-ui/react-accordion` with Tailwind animation classes (accordion-down/accordion-up at 0.2s ease-out).

## Utility (src/lib/utils.ts)

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Root Layout (src/app/layout.tsx)

- Geist Sans + Geist Mono fonts loaded locally from `src/app/fonts/`
- Metadata: title "PolyRecycle | Polystyrene Recycling Education", description about polystyrene being 100% recyclable
- OpenGraph with siteName "PolyRecycle", locale "en_US", type "website"
- metadataBase: "https://polystyrene-recycling.vercel.app"
- Body has `dark` class, antialiased, min-h-screen, flex-col
- Renders: `<Navbar />`, `{children}`, `<Footer />`, `<ChatBot />`

## Navigation — Navbar Component

Fixed-position top navbar with glassmorphic background (`backdrop-blur-xl bg-background/80`).

- Logo: Recycle icon + "PolyRecycle" text
- Desktop links (hidden on mobile): Home, About, How to Recycle, Fun Facts, Quiz, Games, Blog, Myths vs Facts, Environmental Impact
- Mobile: hamburger icon toggles a dropdown menu with all links
- Active link highlighting with emerald/primary color
- Smooth transitions on hover

## Footer Component

3-column grid footer:
- Column 1: Logo + description + "Making polystyrene recycling accessible for everyone"
- Column 2: "Learn" links — About, How to Recycle, Fun Facts, Blog
- Column 3: "Explore" links — Quiz, Games, Myths vs Facts, Environmental Impact
- Bottom bar: copyright + "Quick Facts" badges showing "100% Recyclable", "Resin Code #6", "95% Air"
- Dark card-style background with subtle border top

## ChatBot Component (Floating AI Chat)

Floating chat widget in bottom-right corner (z-50):
- Circular emerald button with MessageCircle icon + animated pulse indicator
- Click opens a chat window (400px wide, 500px tall)
- Header: "PolystyreneGuy" title with Bot icon, X close button
- Message list: user messages in emerald bg (right-aligned), assistant messages in card bg (left-aligned)
- Input bar at bottom with send button
- Uses `useChat()` from `@ai-sdk/react` hitting `/api/chat`
- Loading state shows animated bouncing dots
- Auto-scrolls to bottom on new messages

## API Route — /api/chat (src/app/api/chat/route.ts)

Edge runtime. Uses `@ai-sdk/openai` with `gpt-4o-mini` model. System prompt defines "PolystyreneGuy" persona — a friendly, enthusiastic recycling expert. Key facts embedded in system prompt:
- PS is 100% recyclable, EPS is 95% air, resin code #6
- 88% energy savings, 25B cups/year, 500+ year decomposition
- Chemical recycling converts back to food-grade styrene monomer
- PS can be compacted 50:1
- Paper alternatives use 3-4x more water
- "Styrofoam" is a Dow Chemical trademark for XPS insulation, not EPS cups
- 680+ EPS drop-off locations in US
- Advocates recycling over bans (bans lead to heavier alternatives with higher carbon footprints)

Uses `streamText()` and returns `result.toTextStreamResponse()`.

## Master Data File (src/data/polystyrene-data.ts)

This is a massive file (~1750 lines) containing ALL content. Create the following:

### Interfaces
- `FunFact` — id, stat, unit, description, source?, iconName, category (production|waste|recycling|environment|science)
- `BlogPost` — slug, title, excerpt, date, readingTime, category, tags[], content, featured?, image?, imageAlt?
- `MythFact` — id, myth, fact, explanation, iconName
- `RecyclingMethod` — id, name, category (mechanical|chemical), description, steps[], pros[], cons[], iconName
- `PolystyreneType` — id, name, fullName, description, characteristics[], commonUses[], recyclingDifficulty (easy|moderate|difficult)
- `EnvironmentalStat` — id, label, value, description, iconName, color
- `PolicyItem` — state, abbreviation, description, year, type (ban|restriction|no-ban), banReason?, unbanEfforts?

### Fun Facts (45+ entries)
Create 45+ facts across all 5 categories. Key facts to include:
- 25B cups/year (waste), 15M tons/year global production (production), 500+ year decomposition (environment)
- 95% air by volume (science), 88% energy savings (recycling), 50:1 compaction ratio (recycling)
- Resin code #6 (recycling), 680+ US drop-off locations (recycling), 3-4x more water for paper alternatives (environment)
- EPS discovered 1839 by Eduard Simon (science), "Styrofoam" is a Dow trademark (science)
- $1.4B recycled PS market by 2027 (production), 100% recyclable to food-grade (recycling)
- Ocean pollution stats, landfill stats, manufacturing stats, chemical recycling stats
- Each fact has an iconName string matching a lucide-react icon (Coffee, Factory, Droplets, Recycle, Beaker, etc.)

### Blog Posts (8 articles)
Create 8 full blog posts with 800-1500 words of content each:
1. **"The Complete Guide to Polystyrene Recycling"** (featured, category: Guide) — comprehensive overview
2. **"7 Myths About Polystyrene Debunked"** (Education) — common misconceptions
3. **"10 Creative DIY Ways to Reuse Polystyrene"** (DIY) — practical reuse ideas
4. **"The State of Polystyrene Bans in America"** (Policy) — policy landscape
5. **"Chemical Recycling: The Future of Polystyrene"** (Innovation) — depolymerization tech
6. **"From Cup to Cup: Food-Grade Polystyrene Recycling"** (Innovation) — closed-loop recycling
7. **"Polystyrene and Ocean Pollution: What You Should Know"** (Environment) — marine impact
8. **"The Economics of Polystyrene Recycling"** (Business) — cost/benefit analysis

Each with: slug, title, excerpt, date (2024 dates), readingTime (5-12 min), category, tags, full `content` string, image path, imageAlt.

### Myths vs Facts (8 entries)
Create 8 myth/fact pairs:
1. Polystyrene is not recyclable (MYTH — it's 100% recyclable)
2. You can put it in curbside recycling (MYTH — need specialized drop-off)
3. It releases toxic chemicals at room temp (MYTH — stable below 200°C)
4. It biodegrades eventually (MYTH — 500+ years)
5. Recycling PS is too expensive (MYTH — economic when done at scale)
6. Paper alternatives are always better (MYTH — higher water/energy use)
7. All polystyrene is the same (MYTH — EPS vs XPS vs GPPS)
8. Banning it solves the problem (MYTH — alternatives often worse)

### Recycling Methods (6 methods)
Create 6 detailed methods:
1. **Compaction** (mechanical) — densifiers compress 50:1, steps, pros (cost-effective), cons (still needs reprocessing)
2. **Shredding & Extrusion** (mechanical) — pelletizing for reuse
3. **Solvent-Based Recycling** (chemical) — dissolves PS, recovers pure polymer
4. **Pyrolysis** (chemical) — thermal decomposition to styrene oil
5. **Depolymerization** (chemical) — back to styrene monomer, food-grade output
6. **Catalytic Upcycling** (chemical) — converts to higher-value chemicals

Each with: id, name, category, description, steps[], pros[], cons[], iconName.

### Polystyrene Types (2 types)
- **EPS** (Expanded) — 95% air, white beaded foam, cups/packaging, recyclingDifficulty: "moderate"
- **XPS** (Extruded) — denser, smooth surface, insulation boards, recyclingDifficulty: "moderate"

With characteristics[] and commonUses[] for each.

### Environmental Stats (8 entries)
Stats with iconName, color (emerald/blue/amber/red/purple), and descriptions covering: landfill volume, energy savings, water savings vs paper, carbon footprint reduction, marine debris %, compaction ratio, recycling rate potential, drop-off locations.

### Policy Data (All 50 US States)
Create entries for ALL 50 states with:
- state name, abbreviation, description of current policy
- year of most recent relevant legislation
- type: "ban", "restriction", or "no-ban"
- banReason for states with bans (e.g., "Environmental concerns, marine pollution")
- unbanEfforts for states considering reversal

States with notable bans: Maine, Maryland, Vermont, New York, Colorado, Virginia, Washington, Oregon. Many have city-level bans. Include specific details for each state.

## IconMap Component (src/components/IconMap.tsx)

Maps string icon names from data to actual lucide-react components. Takes `iconName` string prop, returns the matching `<Icon />` component. Must handle all icon names used in the data file (Coffee, Factory, Droplets, Recycle, Beaker, TreePine, Globe, Truck, Lightbulb, FlaskConical, Leaf, Scale, Building2, Waves, Wind, Thermometer, Package, ShieldCheck, Zap, Timer, Users, TrendingUp, DollarSign, BarChart3, etc.).

## Pages

### Home Page (src/app/page.tsx) — Server Component

Sections in order:
1. **Hero** — Full-width with `<video>` background (`/videos/hero-bg.mp4`, autoPlay, loop, muted, playsInline). Gradient overlay (emerald-950/90 via background/80 to emerald-900/50). Badge "Polystyrene Recycling Education". Large heading "Making Polystyrene **Recycling Accessible**" (gradient text on "Recycling Accessible"). Subheading about PS being 100% recyclable. Two CTAs: "Start Recycling" (filled emerald) → /how-to-recycle, "Learn More" (outline) → /about.
2. **Stats Bar** — 4 StatCards overlapping the hero (-mt-8): "25B Cups/Year", "100% Recyclable", "88% Energy Saved", "50:1 Compaction"
3. **Beginner's Guide** — BeginnerGuide component (expandable 4-step accordion)
4. **Video Section** — YouTubeEmbed of Chick-fil-A PS cup recycling (videoId: "JxO_601oru8")
5. **Recycling Map** — RecyclingMap component (BatchGeo embed + Earth911 links)
6. **Interactive Activities** — Two side-by-side CTA cards: Quiz (violet themed) and Sorting Game (amber themed), each with icon, description, arrow link
7. **Fun Facts Carousel** — First 6 facts in FunFactsCarousel
8. **Quick Links Grid** — 8 cards linking to all major sections (Fun Facts, Quiz, Sorting Game, Blog, About, How to Recycle, Environmental Impact, Myths vs Facts). Each with icon, title, description, "Explore →" link

### About Page (src/app/about/page.tsx)

- Hero with image background (`/images/hero-about.jpg`)
- "What is Polystyrene?" explanation section
- EPS vs XPS comparison using ComparisonCard components (side by side on desktop)
- Manufacturing process timeline (6 steps with ProcessStep components)
- Industry statistics cards
- Common applications grid

### How to Recycle Page (src/app/how-to-recycle/page.tsx)

- Hero section
- 4-step consumer recycling guide (Identify → Clean → Find Location → Drop Off)
- YouTube video embed showing recycling process
- RecyclingMap embed
- 6 Recycling Methods cards (mechanical and chemical, from data)
- State Policy tabbed view — StatePolicyTabs component showing all 50 states organized by ban/restriction/no-ban with search/filter

### Fun Facts Page (src/app/fun-facts/page.tsx)

- Has its own layout.tsx wrapper
- Category filter tabs: All, Production, Waste, Recycling, Environment, Science
- Grid of FactCard components for all 45+ facts
- Each FactCard shows: big stat number, unit, category badge (color-coded by category), icon, description, source if available
- Category colors: production=blue, waste=red, recycling=emerald, environment=amber, science=purple

### Quiz Page (src/app/quiz/page.tsx)

Renders the RecyclingQuiz component.

**RecyclingQuiz Component (client component):**
- 20 total questions with difficulty levels (easy/medium/hard)
- Start screen: difficulty selector (Easy, Medium, Hard, All) with themed icons (Sparkles, Brain, Target)
- Shuffles and picks 10 random questions per session
- Shows: progress bar, question number (X/10), difficulty badge, question text, 4 answer options
- On answer: highlights correct (green) and wrong (red), shows explanation
- "Next Question" button
- Final score screen: trophy icon, score/10, percentage, themed message (Perfect!/Great Job!/Good effort/Keep learning), "Try Again" button
- Score messages: 10=Perfect, 8-9=Great, 6-7=Good, <6=Keep learning

### Sorting Game Page (src/app/games/page.tsx)

Renders the SortingGame component.

**SortingGame Component (~530 lines, client component):**
- 15+ waste items to sort, each with: name, description, isRecyclable boolean, explanation
- Items include: EPS foam cup, PS takeout container, packing peanuts, PS meat tray, CD jewel case, foam egg carton, XPS insulation board, PS yogurt cup, foam cooler, PS petri dish, foam plate, packaging foam blocks, PS cutlery, foam noodle (pool), PS clamshell container
- Game states: "ready" → "playing" → "finished"
- Ready screen: title, rules explanation, start button
- Playing: shows current item with name/description, two buttons: "Recycle ♻️" (emerald) and "Trash 🗑️" (red)
- Immediate feedback on each answer: correct (green check) or wrong (red X) with explanation
- Timer tracking (formatted as MM:SS)
- Progress indicator (X of 15)
- Score tracking with streak counter
- Finished screen: final score, accuracy %, time taken, review of all answers, play again button

### Blog Page (src/app/blog/page.tsx)

- Featured post at top (large card with image, title, excerpt, "Read Article" button)
- BlogFilter component for category filtering
- Grid of BlogCard components
- Each BlogCard: title, excerpt, date, reading time, category badge, tags

### Blog Post Page (src/app/blog/[slug]/page.tsx)

- Dynamic route, finds post by slug from data
- Full article display with: title, date, reading time, category badge, tags
- Hero image if available
- Full content rendered (content is stored as a long string with paragraph breaks)
- Back to blog link
- Newsletter signup at bottom

### Myths vs Facts Page (src/app/myths-vs-facts/page.tsx)

- Hero section with image (`/images/myths-debunked.jpg`)
- Grid of MythCard components (8 cards)
- Each MythCard: numbered, shows myth text with red "MYTH" badge, click reveals fact with green "FACT" badge + detailed explanation
- Icon from data, color changes on reveal

### Environmental Impact Page (src/app/environmental-impact/page.tsx)

- Hero with image (`/images/hero-environment.jpg`)
- Grid of 8 environmental stat cards with large values, icons, color-coded
- "The Case for Recycling" section — detailed argument for recycling over banning
- Comparison section: PS recycling vs paper alternatives (water, energy, weight, carbon)
- CTA to how-to-recycle page

## Custom Components

### StatCard
- Props: stat (string), label, icon (ReactNode), description
- Large stat number, small label, icon in top-right corner
- Card bg with hover:scale-[1.02] and border-primary/30 on hover

### FactCard
- Props: FunFact object
- Large stat + unit display
- Category badge (color varies by category)
- Icon from IconMap
- Description text
- Hover scale effect

### MythCard
- Props: MythFact object + index number
- Two states: collapsed (shows myth) and expanded (shows myth + fact + explanation)
- MYTH badge (red/destructive) → FACT badge (emerald/green)
- Toggle button text changes
- Smooth expand animation

### FunFactsCarousel
- Props: facts array
- Horizontal scrolling carousel showing 3 facts at a time on desktop
- Navigation arrows (left/right) or auto-advance
- Shows FactCard components

### BeginnerGuide
- 4-step expandable guide: "Identify Polystyrene", "Clean & Prepare", "Find Drop-Off", "Recycle!"
- Progress tracker showing completion (X of 4)
- Each step has: icon, title, description, tips in amber alert box
- Accordion-style expand/collapse
- Completion CTA buttons

### RecyclingMap
- Embeds BatchGeo map via iframe (EPS Recycling drop-off locations map)
- "Load Map" button for lazy loading (doesn't load iframe until clicked)
- Links to Earth911 search as fallback
- Full-screen map link
- Responsive container

### YouTubeEmbed
- Props: videoId, title
- Responsive 16:9 container
- Standard YouTube embed iframe with privacy-enhanced mode (youtube-com)
- Allow fullscreen, picture-in-picture

### ComparisonCard
- Props: PolystyreneType object
- Shows: name, full name, description
- Difficulty badge (colored: easy=green, moderate=amber, difficult=red)
- Characteristics as tags
- Common uses as bullet list

### ProcessStep
- Props: step number, title, description, icon
- Numbered circle with connecting vertical line
- Icon display, title + description text

### StatePolicyTabs
- Props: policyData array
- 3 tabs: Bans, Restrictions, No Bans
- Search input to filter states
- Each state shows: name, abbreviation, description, year, type badge
- Ban entries show banReason and unbanEfforts if available

### BlogCard
- Props: BlogPost object
- Image if available, category badge
- Title, excerpt (2-line clamp)
- Date + reading time
- Tags as small badges
- Hover effects, links to /blog/[slug]

### BlogFilter
- Category filter buttons: All, Guide, Education, DIY, Policy, Innovation, Environment, Business
- Active state highlighting

### NewsletterSignup
- Email input + submit button
- "Stay Updated" heading
- Emerald gradient background banner

## Images Needed

Create placeholder or get appropriate images for `/public/images/`:
- `hero-recycling.jpg` — recycling/sustainability hero
- `hero-about.jpg` — polystyrene/foam close-up
- `hero-environment.jpg` — nature/environment
- `hero-factory.jpg` — manufacturing
- `recycling-guide.jpg` — step-by-step guide visual
- `myths-debunked.jpg` — myth-busting visual
- `state-bans.jpg` — US map/policy
- `chemical-recycling.jpg` — chemical process
- `food-grade.jpg` — food containers
- `ocean-recycling.jpg` — ocean/marine
- `diy-reuse.jpg` — DIY crafts
- `economics.jpg` — business/economics

And `/public/videos/hero-bg.mp4` — looping background video of recycling/sustainability (can be a placeholder).

## SEO

Every page has its own `Metadata` export with:
- Unique title: "Page Name | PolyRecycle"
- Unique description
- OpenGraph image

## Key Design Patterns

- Server components for pages (data fetching, metadata)
- Client components only where needed ("use client" — quiz, game, chatbot, carousel, myth cards, filters)
- All content lives in the single data file
- Icons are mapped from string names via IconMap component
- Consistent section spacing: `py-20` or `py-24` between sections, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Cards use `bg-card border-border/50 hover:border-primary/30` pattern
- Gradient text: `text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600`
- Radial gradient overlays: `bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent`

## IMPORTANT

- Build EVERYTHING. Do not skip any component, page, or data entry.
- The data file should have ALL 45+ fun facts, ALL 8 blog posts with FULL content, ALL 50 state policies, ALL 20 quiz questions, ALL 15+ sorting game items.
- Make sure `npm run build` passes with zero errors before finishing.
- The chatbot needs the OPENAI_API_KEY environment variable to work, but should fail gracefully without it.
- Use TypeScript strict mode throughout.
- The app should be fully navigable and functional on mobile.
