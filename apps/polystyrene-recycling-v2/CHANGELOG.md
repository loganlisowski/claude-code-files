# Changelog

## [1.0.0] - 2026-03-19

### Phase 1 Audit — Lead Generation + SEO

#### Lead Capture System (NEW)
- Created contact form component with Zod validation (name, email, company, phone, message, inquiry type)
- Created `/contact` page with company info, FAQ, and full contact form
- Created `/api/leads` endpoint with Supabase storage + Resend email notifications
- Rate limiting: 5 submissions per IP per hour
- Added "Contact Us" link to navbar
- Added CTA section on landing page linking to contact
- Created newsletter signup component for footer area
- Created `/api/newsletter` endpoint with Supabase storage

#### SEO Optimization (NEW)
- Added per-page metadata with unique titles and descriptions for all 9 pages
- Added Open Graph tags (title, description, url, siteName, type) to every page
- Added Twitter Card tags (summary_large_image) to every page
- Added `metadataBase` to root layout for proper OG URL resolution
- Created dynamic `sitemap.xml` covering all 10+ pages
- Created `robots.txt` with sitemap reference
- Target keywords: polystyrene recycling, EPS recycling, foam recycling, HIPS recycling

#### Infrastructure
- Installed `@supabase/supabase-js`, `resend`, `zod` dependencies
- Created `.env.example` with all 7 environment variables documented
- Rewrote README.md with full setup guide and feature list

#### Build
- `npm run build` → zero errors, zero warnings
- 18 routes generated (13 original + 5 new)
- sitemap.xml and robots.txt auto-generated
