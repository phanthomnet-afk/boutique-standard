# The Boutique Standard — Repository

Independent guest experience intelligence for boutique hotels.

---

## What this is

This repo contains the complete technical system for The Boutique Standard:

- **The website** — public marketing, journal, case report showcase, audit request
- **The PDF engine** — generates the ~40-page luxury client report
- **The web report engine** — powers the interactive client report (password-protected)
- **The schema** — single source of truth shared by all surfaces

---

## Structure

```
boutique-standard/
│
├── packages/
│   ├── schema/          ← TypeScript types — the contract everything else depends on
│   │   ├── reportCase.ts   ← ReportCase — the core data model
│   │   ├── journal.ts      ← Journal articles, categories, blocks
│   │   ├── tokens.ts       ← Design tokens shared across all surfaces
│   │   └── index.ts
│   │
│   ├── checklist/       ← Audit input engine (questions → ReportCase JSON)
│   │
│   ├── pdf-engine/      ← THE product — generates ~40-page luxury PDF
│   │   ├── renderer.ts     ← Puppeteer orchestrator
│   │   ├── layout.ts       ← Document assembly, base styles
│   │   └── templates/      ← Per-section HTML templates (one file per section)
│   │
│   └── web-engine/      ← Transforms ReportCase for the two web surfaces
│       └── index.ts        ← toClientReportData() + toCaseReportData()
│
├── apps/
│   └── web/             ← Next.js 14 (App Router)
│       └── app/
│           ├── (public)/   ← All public routes
│           │   ├── page.tsx              → /  (home)
│           │   ├── about/page.tsx        → /about
│           │   ├── audit/page.tsx        → /audit
│           │   ├── request/page.tsx      → /request
│           │   ├── report/page.tsx       → /report (case listing)
│           │   ├── report/[slug]/page.tsx→ /report/[slug] (case preview)
│           │   └── journal/             → /journal + categories + articles
│           │
│           └── (client)/   ← Password-protected client area
│               └── client/[token]/report/page.tsx
│
├── data/
│   └── reports/
│       └── maison-du-rivage.json  ← Canonical test case (complete)
│
└── outputs/
    ├── pdf/             ← Generated PDF files land here
    └── web/             ← Generated web report snapshots
```

---

## The three report surfaces

| Surface | Route | Audience | Length | Auth |
|---------|-------|----------|--------|------|
| PDF report | generated file | Hotel client | ~40 pages | Delivered privately |
| Web report | `/client/[token]/report` | Hotel client | ~20 sections | Password-protected |
| Case report | `/report/[slug]` | Public | Curated excerpt | None |

**One data source. Three renderers.** All consume `data/reports/[slug].json`.

---

## The website sitemap

### Public
- `/` — Home: hero, philosophy, audit teaser, case preview strip, journal highlights, CTA
- `/about` — Why we exist. The methodology. The four-lens model.
- `/audit` — What an audit is. Scope. Process. Pricing philosophy.
- `/request` — Multi-step audit enquiry form.
- `/report` — Case report showcase (public). Currently: Maison du Rivage.
- `/report/[slug]` — Individual case report: editorial excerpts, some sections locked.
- `/journal` — The editorial/SEO layer. Its own world inside the site.
- `/journal/[category]` — Category hub.
- `/journal/[category]/[slug]` — Individual article.

### Private (client)
- `/client/[token]/report` — Full interactive web report. Unique URL per client. Password gate.

### Future
- `/guide` — Annual boutique hotel guide
- `/recognition` — Recognition program
- `/benchmark` — Industry benchmark index

---

## Data flow

```
Audit checklist (packages/checklist)
         ↓
  ReportCase JSON (data/reports/)
         ↓
  ┌──────┴──────┐
  │             │
PDF engine   Web engine
(~40p PDF)   ↓
             ┌──────────┴──────────┐
             │                     │
      Client web report      Public case report
      /client/[token]/report  /report/[slug]
      (password-protected)    (curated, some locked)
```

---

## Design system

See `packages/schema/tokens.ts`.

**Aesthetic direction:**
- 40% Nine Orchard — authority, trust, hospitality credibility
- 35% Casablanca Paris — warmth, aspiration, emotion
- 25% Scandinavian/Japanese — restraint, whitespace, sophistication

**Typography:**
- Headlines: Playfair Display (serif) — editorial authority
- Body: Inter — clean, invisible, professional

**Color:**
- Background: warm ivory `#F8F5F0`
- Text: deep charcoal `#1C1C1C`
- Accent: French Riviera blue `#4A6FA5`
- Secondary: deep olive, weathered bronze

---

## Running locally

```bash
# Install dependencies
npm install

# Run the web app
npm run dev

# Generate a PDF
npm run pdf -- --report=maison-du-rivage
```

---

## Future: NEO Dashboard integration

The system is designed to be controlled externally when ready. The `packages/checklist` will accept input from the NEO API. The `data/reports/` directory will be populated by an API call rather than manual JSON files. No architectural changes needed — only the data source changes.

---

*The Boutique Standard — Independent Guest Experience Intelligence*
*theboutiquestandard.com*
