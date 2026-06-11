# CLAUDE.md - The Boutique Standard
## Shared Project Memory - Always Read This First

**Last updated:** 2026-06-11
**Project status:** Lead Engine complete (4 phases).
Website substantially built. Sanity CMS content layer implemented.
Client web report not yet built.

---

## What This Project Is

The Boutique Standard is an independent guest experience
intelligence company. Undercover hotel audits, luxury editorial
reports. NOT a consultancy, magazine, or mystery shopping agency.

**The positioning sentence:**
"If Nine Orchard commissioned a Scandinavian design studio
to create a hospitality intelligence brand, using the warmth
and confidence of Casablanca Paris."

---

## Critical Rules - Never Break These

1. No em dashes anywhere. Use hyphen (-) only.
2. No hardcoded text. Everything from data or CMS.
3. No stock photography. No laptops. No consultants.
4. Photography only: hotel keys, stone floors, curtains in wind,
   breakfast tables, pool reflections, architectural lines,
   light through windows, room details.
5. No green colour. Brand colours only.
6. Standalone system. Works if NEO, Anibot, CK all go down.
7. No terminal commands for operations. Dashboard buttons only.
8. All sections must be customizable.
9. No em dashes in any copy. Hyphen only.
10. Price is EUR 1,200 per audit. Never mention travel,
    accommodation, or dining costs in outreach or public copy.
11. Outreach speaks only to value: loyal guests, better reviews.

---

## Brand Identity

**Design triangle:**
- 40% Nine Orchard (authority, trust, credibility)
- 35% Casablanca Paris (warmth, aspiration, emotion)
- 25% Scandinavian/Japanese (restraint, whitespace)

**Typography:**
- Headlines: Cormorant Garamond (weight 300-500)
- Body: DM Sans (weight 300-500)
- Both loaded from Google Fonts in root layout.tsx

**Colours (exact hex):**
- `#F8F5F0`  Warm ivory (primary background)
- `#F2EDE6`  Soft stone (secondary sections)
- `#EDE6DC`  Linen (tertiary)
- `#FAFAF8`  Journal background (slightly cooler white)
- `#1C1C1C`  Deep charcoal (primary text, dark sections)
- `#4A4744`  Mid charcoal (secondary text)
- `#9E9890`  Stone grey (muted, captions)
- `#4A6FA5`  French Riviera blue (primary accent)
- `#D4E0EF`  Riviera blue light
- `#2C4A72`  Riviera blue dark
- `#5C6B3E`  Deep olive (secondary accent)
- `#8B6F47`  Weathered bronze (tertiary accent)
- `#DDD8D0`  Default border
- `#EAE5DC`  Light border

**Motion:** Slow. Deliberate. Never flashy.
Scroll reveals: 800ms, cubic-bezier(0.25, 0.46, 0.45, 0.94).
No looping animations.

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Database: Prisma + SQLite (dev) / Vercel Postgres (prod)
- CMS: Sanity v3 (content layer implemented - sanity@3, next-sanity@9)
- Hosting: Vercel
- Styling: CSS Modules + CSS custom properties
- Email: Resend
- Monorepo: npm workspaces

---

## Full File Structure

```
boutique-standard/
  CLAUDE.md                          <- THIS FILE. Read first.
  PROJECT_BRIEF.md
  docs/PROJECT_BRIEF.md              <- Full project brief

  packages/
    schema/
      reportCase.ts                  <- Core data model (LOCKED)
      journal.ts                     <- Journal types
      tokens.ts                      <- Design tokens as TypeScript
      index.ts
    checklist/index.ts               <- Audit input engine stub
    pdf-engine/
      renderer.ts                    <- Puppeteer orchestrator
      layout.ts                      <- Document assembly
      templates/
        cover.ts
        executiveSnapshot.ts
        index.ts
    web-engine/index.ts              <- Client + case report transformers

  apps/web/
    prisma/
      schema.prisma                  <- Hotel, Intelligence, Contact, Outreach,
                                        Settings, WebhookLog, JournalSend
      prisma/dev.db                  <- SQLite (gitignored)

    lib/
      admin/
        prismaClient.ts              <- Singleton Prisma client
        icpScoring.ts                <- ICP score calculator
        outreachGenerator.ts         <- Claude Haiku draft generator
        openaiAnalysis.ts            <- Website brand analysis
        dataForSeo.ts                <- Review ingestion
        gapDetection.ts              <- Gap scoring logic
        scrapeGraph.ts               <- ScrapeGraphAI extraction
        googlePlaces.ts              <- Prospecting search
        emailTemplate.ts             <- HTML email builder (Touch 3 gets TBS sig)
        emailSender.ts               <- Resend wrapper (SEND_EMAILS_ENABLED flag)
        sequenceScheduler.ts         <- Weekly outreach plan (overdue/today/week/ready)
        linkedinCalendar.ts          <- Week-number article rotation + post angles
        neoAuth.ts                   <- validateNeoApiKey, signWebhookPayload
        neoWebhook.ts                <- fireWebhook (fire-and-forget, writes WebhookLog)
      content/
        types.ts
        en/ audit.ts philosophy.ts report.ts request.ts
        da/ audit.ts philosophy.ts report.ts request.ts
      getContent.ts
      journal/
        types.ts
        getAllArticles.ts
        articles/
          boutique-hotel-guest-has-changed.ts
          first-ten-minutes-hotel-stay.ts
          qualities-boutique-hotels-memorable-first-to-go.ts

    app/
      layout.tsx                     <- Root layout (fonts loaded here)
      globals.css                    <- All CSS vars, reset, utilities

      admin/
        layout.tsx                   <- Admin shell (sidebar: Hotels/Prospects/
                                        Pipeline/Outreach/Settings)
        admin.module.css
        page.tsx                     <- Redirect to /admin/hotels
        login/page.tsx               <- Password gate
        hotels/
          page.tsx                   <- Hotel list with filters
          hotels.module.css
          [id]/
            page.tsx                 <- Hotel detail server wrapper
            HotelDetailClient.tsx    <- Tabbed UI: intelligence/contacts/
                                        outreach/notes. Sentiment pills,
                                        send email, booked flow.
            detail.module.css
        prospects/page.tsx           <- Prospect discovery (Places search + import)
        pipeline/page.tsx            <- Kanban-style pipeline view
        outreach/
          page.tsx                   <- Server wrapper (passes LinkedIn plan)
          OutreachPageClient.tsx     <- Stat bar + 4-section plan + OutreachModal
          outreach.module.css
        settings/
          page.tsx                   <- Server wrapper (env vars + VERCEL_URL)
          SettingsClient.tsx         <- Timing, API status, test email, NEO section
          settings.module.css

      api/admin/
        auth/route.ts                <- Session cookie login
        hotels/
          route.ts                   <- GET list, POST create (fires hotel.created)
          [id]/
            route.ts                 <- GET, PATCH, DELETE (fires status_changed/booked)
            analyse/route.ts         <- Full analysis pipeline (fires hotel.analysed)
            outreach/
              route.ts               <- POST generate draft (fires outreach.generated)
              [outreachId]/
                route.ts             <- PATCH update (fires outreach.replied)
                send/route.ts        <- POST send via Resend (fires outreach.sent)
        contacts/route.ts            <- POST create contact
        prospects/
          search/route.ts            <- Google Places search
          collective/route.ts        <- Collective scraper
          collective/import/route.ts <- Collective import
          csv/route.ts               <- CSV upload
          import/route.ts            <- Bulk import
        settings/
          route.ts                   <- GET settings, PATCH (timing + NEO config
                                        + key generation)
          test-email/route.ts        <- Send Resend test
          neo-test-webhook/route.ts  <- Fire test.ping to NEO URL
          webhook-log/route.ts       <- GET last 10 WebhookLog entries
        outreach/
          schedule/route.ts          <- GET weekly outreach plan

      api/neo/                       <- NEO integration (X-Neo-Api-Key auth)
        dashboard/route.ts           <- Full panel data (5min cache)
        actions/
          analyse/route.ts           <- Trigger hotel analysis
          generate-outreach/route.ts <- Generate draft
          update-status/route.ts     <- Change hotel status
          get-hotel/route.ts         <- Full hotel detail

      (public)/
        layout.tsx                   <- Header + Footer
        page.tsx                     <- Homepage
        about/page.tsx               <- Philosophy / Why We Exist
        audit/page.tsx               <- Audit service page
        report/
          page.tsx                   <- Report showcase index
          maison-du-rivage/
            page.tsx                 <- Case report (editorial, public)
            page.module.css
        request/page.tsx             <- Audit enquiry form (multi-step)
        journal/
          page.tsx                   <- Journal hub
          [category]/[slug]/page.tsx <- Article page

      (client)/
        client/[token]/report/       <- (to build) Password-protected client report

    components/
      admin/
        OutreachModal.tsx            <- Reusable slide-in: generate/edit/preview/send
        OutreachModal.module.css
      layout/
        Header.tsx + Header.module.css
        Footer.tsx + Footer.module.css
      shared/
        PageHero.tsx + .module.css
        PageCta.tsx + .module.css
        Reveal.tsx
      home/
        HeroSection + PhilosophySection + AuditTeaserSection
        ReportPreviewSection + JournalStripSection + InquirySection
      audit/
        MethodologySection + ProcessSection + ScopeSection
        DeliverablesSection + PricingSection + FaqSection
      philosophy/
        PerspectiveSection + WhatWeAreNotSection + PhilosophyMethodologySection
      report/
        ReportIntroSection + ReportSectionsSection + CaseStudySection
      request/
        RequestStepsSection + RequestFormSection

    docs/
      neo-integration.md             <- NEO API reference (auth, endpoints, webhooks)

    next.config.js
    package.json

  data/reports/maison-du-rivage.json <- Complete Maison du Rivage data
  outputs/pdf/ outputs/web/
```

---

## The Three Report Surfaces

| Surface | Route | Status |
|---------|-------|--------|
| PDF (~40p) | Generated file | Skeleton built, needs sections |
| Web report (~20 sections) | /client/[token]/report | NOT BUILT |
| Case report (public) | /report/maison-du-rivage | Basic version live |

**All consume data/reports/maison-du-rivage.json**

---

## Website Sitemap

### Public
```
/                Home (6 sections)
/audit           Audit service page
/report          Case report showcase
/report/[slug]   Individual case (Maison du Rivage done)
/journal         Journal hub
/journal/[category]/[slug]  Article pages (3 articles live)
/about           Philosophy / Why We Exist
/request         Audit enquiry form (multi-step)
```

### Private
```
/client/[token]/report   Full web report (password-protected, not yet built)
```

### Admin
```
/admin/hotels            Hotel list + filters
/admin/hotels/[id]       Hotel detail (intelligence/contacts/outreach/notes)
/admin/prospects         Discovery: Places search, Collective scraper, CSV import
/admin/pipeline          Status pipeline view
/admin/outreach          Weekly plan + LinkedIn calendar + OutreachModal
/admin/settings          Timing, API status, email test, NEO integration
```

---

## Lead Engine - Build Status

### Phase 1 - Core Admin (COMPLETE)
- [x] Prisma schema (Hotel, Contact, Outreach, Intelligence)
- [x] Admin shell: login, layout, sidebar
- [x] Hotels CRUD: list, filters, detail tabs
- [x] Contact management
- [x] Outreach draft generation (Claude Haiku)
- [x] Manual send / mark sent / reply logging

### Phase 2 - Intelligence + Prospecting (COMPLETE)
- [x] OpenAI website analysis
- [x] DataForSEO review ingestion
- [x] Claude Haiku theme + gap extraction
- [x] Gap detection (pure logic)
- [x] ICP scoring (1-5)
- [x] ScrapeGraphAI structured extraction
- [x] Google Places prospecting search
- [x] Collective Hotels collective scraper
- [x] CSV import
- [x] Pipeline page

### Phase 3 - Outreach Execution (COMPLETE)
- [x] Resend email integration (SEND_EMAILS_ENABLED flag)
- [x] HTML email template (Touch 3 gets TBS signature)
- [x] Sequence scheduler (overdue/today/thisWeek/readyToStart)
- [x] LinkedIn content calendar (week-number rotation, 3 articles x 3 angles)
- [x] OutreachModal (slide-in: generate/edit/preview/send)
- [x] Outreach page: stat bar + 4-section plan + modal
- [x] Reply sentiment pills (positive/neutral/negative/booked)
- [x] Booked flow: hotel status update + congrats state
- [x] Positive flow: next steps prompts
- [x] Settings page: timing, API status, test email

### Phase 4 - NEO Integration (COMPLETE)
- [x] neoAuth.ts: timingSafeEqual key validation, HMAC signing
- [x] neoWebhook.ts: fire-and-forget, WebhookLog on every attempt
- [x] Outbound webhooks on all key events (7 event types)
- [x] GET /api/neo/dashboard (5min cache)
- [x] POST /api/neo/actions/analyse
- [x] POST /api/neo/actions/generate-outreach
- [x] POST /api/neo/actions/update-status
- [x] GET /api/neo/actions/get-hotel
- [x] Settings: NEO section (toggle, URL, key gen, secret gen, test, log)
- [x] WebhookLog model + delivery log table
- [x] docs/neo-integration.md

### Website - Build Status
- [x] globals.css (all tokens, fonts)
- [x] Header (transparent/solid, mobile menu)
- [x] Footer
- [x] Homepage (all 6 sections)
- [x] Audit page (/audit)
- [x] About/Philosophy page (/about)
- [x] Report showcase (/report)
- [x] Case report: Maison du Rivage (/report/maison-du-rivage)
- [x] Request/enquiry form (/request, multi-step)
- [x] Journal hub (/journal)
- [x] Journal articles (3 live)
- [ ] Client report (/client/[token]/report) - NOT YET BUILT

---

## Lead Engine - Four Phases Complete

**Phase 1:** Intelligence database, OpenAI analysis,
DataForSEO reviews, gap detection, outreach generation,
admin dashboard.

**Phase 2:** Google Places prospecting, ScrapeGraphAI
extraction, hotel collective scrapers (Design Hotels,
Mr & Mrs Smith, i-escape, Tablet Hotels), CSV import,
ICP auto-scoring (1-5, 12 criteria).

**Phase 3:** Resend email sending, sequence scheduler
(touch 1/2/3 timing), LinkedIn content calendar,
reply logging with sentiment, OutreachModal component,
weekly outreach plan page, settings page.

**Phase 4:** NEO API (dashboard data, 4 action endpoints),
outbound webhooks (8 event types), webhook delivery log,
HMAC signature verification, NEO settings in admin UI,
neo-integration.md documentation.

---

## Pricing

- Audit fee: EUR 1,200 / 7.450 kr. (geo-detected)
- Travel, accommodation, dining: NOT included, NEVER mentioned
- Payment: 50% on engagement, 50% on delivery
- Outreach speaks ONLY to value: loyal guests, better reviews

---

## Content Layer Pattern

All page text lives in lib/content/[lang]/[page].ts
getContent(page, lang) is the single swap point for Sanity.
No hardcoded strings in any component.
Bilingual: EN (default) + DA (geo-detected, DK visitors).

**Sanity CMS (IMPLEMENTED):**
- sanity@3, next-sanity@9 (React 18 compatible)
- Studio: redirect from /studio to [projectId].sanity.studio
- Schemas: apps/web/sanity/schemas/ (14 section types + page/sharedSection docs)
- Client: apps/web/sanity/client.ts (NEXT_PUBLIC_SANITY_PROJECT_ID gates usage)
- Seed: npm run sanity:seed (requires SANITY_API_DEV_TOKEN with Editor role)
- Revalidation: POST /api/sanity/revalidate (verify SANITY_WEBHOOK_SECRET)
- getContent.ts tries Sanity first, falls back to local TypeScript files
- NOT a page builder: components never change, only data source changes

---

## Image System

lib/images.ts - typed manifest, 7 website images
lib/reportImages.ts - 10 Maison du Rivage asset slots
public/images/ - organised by use and format
Naming: subject--use--format.png
All images: compress before committing.
Target: 200-350KB per image as WebP or JPEG.

---

## Key Decisions Locked In

- Font: Cormorant Garamond + DM Sans
- No Tailwind anywhere. CSS Modules + custom properties only.
- Report sections: 13, always all present, order fixed
- Journal backgrounds: #FAFAF8 (not ivory - editorial separation)
- Accordion: HTML details/summary, CSS only, no JS
- Form: client component, no HTML form tags, onClick handlers
- ICP target: 4-50 rooms, EUR 150+/night, independent, 8 countries
- Outreach: 3-touch sequence, manual send only, never auto-send
- AI cost per hotel: under EUR 0.20 total
- NEO integration: webhooks only, TBS works without NEO
- Header: fixed, transparent on hero, solid on scroll, 72px height
- Score display: Cormorant Garamond 300 weight, large
- Locked content: backdrop-filter blur, semi-transparent overlay
- Admin auth: session cookie (ADMIN_PASSWORD env var)
- Lead Engine API keys: stored in DB Settings model, not env vars
- Email send guard: SEND_EMAILS_ENABLED=false simulates, still writes DB
- Sanity: NOT a page builder. Layout is code. Content is data. Never mix.
- Sanity studio: embedded NextStudio breaks with React 18 - always redirect

---

## Build Priority Order

1. Resend domain verification (Cloudflare DNS)
2. Client web report (/client/[token]/report) - NOT YET BUILT
3. PDF engine sections (complete the 13 sections)
4. Case report polish (/report/maison-du-rivage)
5. Sanity CMS: create project, add env vars, run seed, configure webhook

---

## How to Continue in a New Session

Say: "Read CLAUDE.md first, then [what to build]"

Next priority: /client/[token]/report
The interactive web report delivered to hotel clients.
Password-protected. ~20 sections. Uses maison-du-rivage.json.

SYSTEM CORE: core/system/BOUTIQUE_STANDARD_SYSTEM.md

---

## Infrastructure Notes

- `apps/web/.env` contains DATABASE_URL and DIRECT_URL for Prisma CLI - gitignored.
  Prisma CLI reads `.env` only, NOT `.env.local`.
- `db:seed` in root `package.json` calls `seed:report` directly (not via workspace).
  The `seed:report` script only exists in root, not in `apps/web`.
- All admin pages and API routes have `force-dynamic` + `revalidate = 0` except
  `admin/login/page.tsx` (client component - static is fine, no DB query).
- `POST /api/admin/system/init` seeds Settings and ClientReport if missing.
  Call from admin settings page "Initialize / Seed" button after first deploy.
- `GET /api/admin/system/health` returns DB connection + table counts + env var presence.
- `GET /api/health` is a public diagnostic route (no auth, no DB). Confirms app is live.
- Admin session cookie: name=`tbs_admin_session`, value=`"authenticated"`, HttpOnly.
  Set by POST /api/admin/auth. Checked by middleware and API routes.
- Claude Code never writes to .env.local. Never writes real values to any file.
  .env.example contains key names only - no secrets, no real passwords.
