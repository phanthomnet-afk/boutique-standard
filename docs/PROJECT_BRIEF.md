# The Boutique Standard — Master Project Brief
## Version 1.0 | June 2026

---

## 1. Project Identity

**Name:** The Boutique Standard
**Tagline:** Independent Guest Experience Audits for Boutique Hotels
**Domain:** boutiquestandard.com
**Type:** Standalone independent company. Not connected to Anibot or other CK entities operationally. Controllable via NEO Dashboard Core.

**The one positioning sentence:**
"We evaluate the alignment between what a boutique hotel promises and what its guests actually experience."

**What it is not:**
- Not a consultancy
- Not a mystery shopping agency
- Not a magazine or review platform
- Not a compliance auditor

**What it is:**
A guest experience intelligence studio. The design should feel like a boutique hotel, fashion house, or design studio — not a content site, agency, or SaaS product.

---

## 2. Business Model

**Core service:** Undercover guest stay + structured audit + luxury editorial report delivered as private web experience.

**Pricing philosophy:** Starting from €4,000+, adjusted by scope, location, and complexity. Not rigid tiers. Positioned as investment, not service.

**Payment:** 50% upfront (covers stay + travel), 50% on delivery.

**Lead funnel:** Website -> Journal (authority) -> /request (conversion) -> audit -> report delivery.

---

## 3. Target Audience

**Primary:**
- Boutique hotel founders and owner-operators
- General managers of design-led independent properties

**Secondary:**
- Hospitality investors
- Boutique hospitality groups

**Who they are:** Design-conscious, have travelled extensively in Southern Europe, value authenticity over status, not seeking theatrical luxury. They should look at the website and think "this looks like us" - not "another company trying to sell to us."

---

## 4. Design System

### Design Triangle
- 40% Nine Orchard (authority, trust, hospitality credibility)
- 35% Casablanca Paris (warmth, aspiration, emotion)
- 25% Scandinavian/Japanese (restraint, whitespace, sophistication)

### Colour Palette
```
Primary backgrounds:
  #F8F5F0  Warm ivory (main)
  #F2EDE6  Soft stone (secondary sections)
  #EDE6DC  Linen (tertiary/borders)
  #1C1C1C  Deep charcoal (dark sections)

Typography:
  #1C1C1C  Primary text
  #4A4744  Secondary text
  #9E9890  Muted / captions

Accents:
  #4A6FA5  French Riviera blue (primary accent)
  #D4E0EF  Riviera blue light (tints)
  #2C4A72  Riviera blue dark (hover)
  #5C6B3E  Deep olive (secondary)
  #8B6F47  Weathered bronze (tertiary)

Borders:
  #DDD8D0  Default border
  #EAE5DC  Light border
```

### Typography
**Headlines:** Cormorant Garamond (preferred) or Playfair Display — luxury heritage serif. Must feel like it could appear on a boutique hotel menu or welcome letter.

**Body:** DM Sans or Suisse Int'l — clean, invisible, professional. Never Inter, Roboto, or Arial.

**Scale:**
- Display: clamp(3rem, 6vw, 5.5rem)
- H1: clamp(2.25rem, 4vw, 3.5rem)
- H2: clamp(1.75rem, 3vw, 2.5rem)
- H3: clamp(1.25rem, 2vw, 1.625rem)
- Body: 1rem / 1.75 line-height
- Caption/label: 0.6875rem / 0.14em tracking / uppercase

### Motion
- Slow. Confident. Deliberate. Never flashy.
- Scroll-triggered reveals: opacity + translateY, 900ms, cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Page transitions: 400ms fade
- No looping animations. No particles. No flashy entrances.
- Micro-interactions: subtle hover states, 200ms

### Photography Rules
- Architecture, light, materials, details, atmosphere
- Hotel keys, stone floors, curtains moving in wind, breakfast tables, pool reflections, architectural lines, light through windows, lobby corners, room details
- NEVER: laptops, meetings, audits, clipboards, consultants, posed people, stock images

### Layout
- Generous whitespace. Luxury pacing.
- Large imagery with deliberate placement
- Minimal navigation chrome
- Editorial grid: 12 columns, generous gutters
- Content max-width: 780px | Wide: 1040px | Site: 1280px
- Page horizontal padding: clamp(1.5rem, 8vw, 8rem)

---

## 5. Technical Architecture

### Stack
- **Framework:** Next.js 14 (App Router, React Server Components)
- **CMS:** Sanity (single source of truth, zero hardcoded text)
- **Hosting:** Vercel (with ISR for journal, SSR for key pages)
- **Styling:** CSS Modules + CSS custom properties
- **Monorepo:** npm workspaces

### Package Structure
```
boutique-standard/
  CLAUDE.md              <- Shared memory, read first every session
  PROJECT_BRIEF.md       <- This document
  packages/
    schema/              <- TypeScript types (the contract)
    checklist/           <- Audit input engine
    pdf-engine/          <- PDF generation (Puppeteer + HTML templates)
    web-engine/          <- Data transformers for web surfaces
  apps/
    web/                 <- Next.js website
  data/
    reports/             <- Report JSON files (source of truth for all surfaces)
  outputs/
    pdf/                 <- Generated PDFs
    web/                 <- Web exports
  docs/
    PROJECT_BRIEF.md     <- This file
```

### Independence Requirement
This system must function if Anibot, CK, NEO, or any other system is down. The only permitted external dependencies:
- Sanity (CMS)
- Vercel (hosting)
- Google Fonts (typography, can be self-hosted as fallback)

### NEO Dashboard Integration (Future - Phase 4)
- View incoming audit requests
- Trigger report generation
- No terminal commands - dashboard buttons only
- Webhook-based, not hard-wired dependency
- TBS operates fully without NEO

### Multilingual
- EN (primary, default for non-DK visitors)
- DA (default for DK visitors, detected by IP)
- Browser language override with cookie persistence
- Routes: `/en/...` and `/da/...`
- All content in Sanity has language field
- Report templates eventually support both languages

---

## 6. Website Pages - Detailed Spec

### Home (/)
**Purpose:** Establish identity. Create desire. One CTA.
**Sections (all CMS-controlled, all customizable):**
1. Hero - One strong image, one sentence, one CTA
2. Philosophy - What is The Boutique Standard? (2-3 paragraphs, editorial tone)
3. Audit Teaser - How we work, brief (not the full page)
4. Report Preview Strip - Teaser of the case report (creates desire)
5. Journal Strip - Latest 3 articles
6. Future Guide - Subtle, "coming soon" feeling
7. Inquiry CTA - Full-width, elegant, single button

**Navigation:** Minimal. Top left: wordmark. Top right: nav items (Audit, Report, Journal, About) + "Request Audit" CTA button.

### Audit (/audit)
**Purpose:** Explain the service. Qualify leads.
**Sections:**
1. Hero - Editorial statement about what an audit is
2. Methodology - The 4-lens framework (Promise → Expectation → Experience → Memory)
3. Process - Step by step (anonymous stay, structured evaluation, report, delivery)
4. Scope Options - Not rigid tiers. Descriptive scopes.
5. Deliverables - What they receive (web report, PDF export, priority list)
6. Pricing Philosophy - "Starting from..." language
7. FAQ - 5-8 questions
8. CTA - Request an audit

### Report (/report)
**Purpose:** Show the product. This is the primary conversion page.
**Extremely important. Must create desire.**
**Sections:**
1. Editorial intro to the report concept
2. Case report showcase (Maison du Rivage) - editorial excerpts
3. Report structure explanation (what's inside)
4. Locked sections preview (blurred, creates mystery)
5. CTA

**Note:** The case report at `/report/[slug]` is curated excerpts. Beautiful. Some sections locked/blurred. Not a watermark - more like the report naturally trails off.

### Journal (/journal)
**Purpose:** SEO authority + GEO (AI Overview) visibility + editorial credibility.
**This is a mini world inside the website.** Different rhythm, own internal navigation.
**Sections:**
1. Hero - editorial statement
2. Featured article (large)
3. Category grid (6 categories)
4. Article listing (filterable)
5. Newsletter signup (no marketing language)

**Article structure (every article):**
1. Direct answer block (top, for AI Overview extraction)
2. Key takeaways (bullet list)
3. H2/H3 structured body
4. Insight/definition blocks (for GEO entity training)
5. Related articles (min 3 internal links)
6. CTA to audit

**Journal categories:**
1. Guest Experience Design
2. Boutique Hotel Trends
3. Hospitality Psychology
4. Service Culture
5. Experience Frameworks
6. Industry Benchmarks

### About (/about)
**NOT "About Us"** - call it "Our Perspective" or "Why We Exist"
**Sections:**
1. Editorial statement (the philosophy)
2. How we evaluate (the methodology)
3. What we are not (positioning clarity)
4. CTA

### Request Audit (/request)
**Purpose:** Lead qualification + conversion.
**Multi-step form:**
1. Hotel basics (name, location, website, type)
2. Experience scope (full stay / focused / multi-touchpoint)
3. Guest profile (target guest type, experience promise)
4. Focus areas (checkboxes: arrival, room, dining, service, facilities, departure)
5. Review + pricing acknowledgment + submit

**Backend:** Form submissions to Sanity (or simple webhook to email). No third-party form services initially.

### Client Report (/client/[token]/report)
**Password-protected.** Unique URL per client.
**Full interactive web report - ~20 sections.**
**The private product delivered to hotel clients.**
**Password set in Sanity admin when report is created.**

---

## 7. The Report System

### Three surfaces, one data source
All three consume `data/reports/[slug].json` (the ReportCase schema).

| Surface | Route | Pages | Auth |
|---------|-------|-------|------|
| PDF | Generated file | ~40 pages | Delivered privately |
| Web report | `/client/[token]/report` | ~20 interactive sections | Password per report |
| Case report | `/report/[slug]` | Curated excerpts | None |

### 13 Report Sections (fixed order)
1. Cover
2. Executive Snapshot
3. Property Context
4. The Promise
5. Experience DNA
6. Guest Journey Review
7. Experience Continuity Map (hero visual - static SVG from data)
8. Experience Misalignments
9. What Guests Will Remember
10. What Should Never Change
11. Detailed Scoreboard
12. Opportunities
13. Closing Assessment

### Visuals
- Experience Continuity Map: line graph, promise vs experience vs memory
- Experience DNA Wheel: radar chart, 6-7 dimensions
- Guest Journey Map: horizontal with scores
- Misalignment Matrix: promise vs reality table
- Scoreboard: minimal table

All generated from data, not designed manually per report.

### Report Generation Workflow (current)
1. Auditor does stay with iPhone, voice notes
2. Voice notes transcribed (AI)
3. Transcription mapped to checklist fields
4. Checklist data populates ReportCase JSON
5. AI generates editorial narrative in brand voice, filling placeholders
6. Auditor reviews and edits in Sanity
7. Images uploaded to Sanity, mapped to asset slots
8. Web report URL generated with password
9. PDF generated via Puppeteer
10. Both delivered to client

---

## 8. Audit Checklist System

**Purpose:** Operational backbone. Field instrument that maps directly to report template.

**The checklist IS the report, viewed from the input angle.**

**9 sections, 42+ scored criteria:**
1. Pre-arrival & Discovery
2. Arrival Experience
3. Room Experience
4. Dining Experience
5. Facilities
6. Service Culture
7. Departure
8. Guest Psychology (memory anchors)
9. Experience DNA

**Scoring:** Manual entry 0-10 per criterion. Band auto-calculated.

**Voice notes:** Each section has a voice note field where iPhone recordings are transcribed and dropped in directly.

**Checklist interface:** TBD - Options: Notion template, Airtable, or custom mobile-optimised web form. Must work on iPhone.

---

## 9. NEO Dashboard Integration

**What NEO can do (future Phase 4):**
- View incoming audit requests
- Trigger report generation (button, not terminal)
- See report status
- Publish/unpublish journal articles

**What NEO cannot do:**
- Break TBS if it goes down
- Hard-control any content (CMS is independent)

**Implementation:** Webhooks. Simple API. No shared database.

---

## 10. Email Infrastructure

**Current:** None configured.
**Need:** One address for testing (can use existing Anibot mail initially).
**Future:** Custom domain email (boutiquestandard.com).
**Transactional:** Resend (for form submissions, report delivery notifications).
**No Google Workspace right now.**

---

## 11. Build Phases

### Phase 0 - Foundation (done)
- [x] Repo structure
- [x] Schema (TypeScript types)
- [x] Design tokens
- [x] Maison du Rivage data
- [x] PDF engine skeleton
- [x] Web engine transformers

### Phase 1 - Website (NOW)
- [ ] Shared components (header, footer, navigation)
- [ ] Home page - all sections
- [ ] Audit page
- [ ] Report page (case showcase)
- [ ] About page
- [ ] Request form page

### Phase 2 - Report Surfaces
- [ ] Case report (`/report/[slug]`) - editorial, curated
- [ ] Client web report (`/client/[token]/report`) - full, password-protected
- [ ] PDF engine - complete all section templates

### Phase 3 - Journal
- [ ] Journal hub
- [ ] Category pages
- [ ] Article template (GEO-optimized)
- [ ] 5 seed articles

### Phase 4 - CMS & Operations
- [ ] Sanity setup with full schema
- [ ] Report creation workflow in Sanity
- [ ] Password generation for client reports
- [ ] Email infrastructure (Resend)
- [ ] Checklist interface design

### Phase 5 - NEO Integration
- [ ] Webhook layer
- [ ] Dashboard buttons
- [ ] Lead view

---

## 12. Quality Standards

Every component, every page, every section must pass this test:

**"Would a boutique hotel owner look at this and think 'this looks like us'?"**

If yes: ship it.
If it looks like consulting, SaaS, or a startup: redesign it.

**No compromises on:**
- Typography - must feel editorial and luxurious
- Whitespace - generous, never cramped
- Colour - only the defined palette
- Photography - only the defined style
- Copy - editorial, observational, precise, non-judgmental
- Motion - slow, deliberate, never flashy

---

*The Boutique Standard - Independent Guest Experience Intelligence*
*boutiquestandard.com*
