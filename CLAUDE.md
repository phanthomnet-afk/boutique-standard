# CLAUDE.md - The Boutique Standard
## Shared Project Memory - Always Read This First

**Last updated:** 2026-06-08
**Project status:** Website build in progress. Four inner pages done (audit, about/philosophy, report, request). Content layer complete with EN + DA.

---

## What This Project Is

The Boutique Standard is an independent guest experience intelligence company. Undercover hotel audits, luxury editorial reports. NOT a consultancy, magazine, or mystery shopping agency.

**The positioning sentence:**
"If Nine Orchard commissioned a Scandinavian design studio to create a hospitality intelligence brand, using the warmth and confidence of Casablanca Paris."

---

## Critical Rules - Never Break These

1. No em dashes. Use hyphen (-) only.
2. No hardcoded text. Everything comes from data/CMS.
3. No stock photography. No laptops. No consultants. No meetings.
4. Photography: hotel keys, stone floors, curtains in wind, breakfast tables, pool reflections, architectural lines, light through windows.
5. No green colour. Brand colours only.
6. This system is standalone. Works if other CK systems are down.
7. No terminal commands for operations. Dashboard buttons only (future Neo integration).
8. All sections must be customizable.
9. Headers transparent over hero, solid when scrolled.

---

## Brand Identity (Non-Negotiable)

**Design triangle:**
- 40% Nine Orchard (authority, trust, credibility)
- 35% Casablanca Paris (warmth, aspiration, emotion)
- 25% Scandinavian/Japanese (restraint, whitespace, sophistication)

**Typography:**
- Headlines: Cormorant Garamond (weight 300-500) - loaded from Google Fonts
- Body: DM Sans (weight 300-500) - loaded from Google Fonts

**Colour palette (exact hex values):**
- `#F8F5F0` Warm ivory (primary background)
- `#F2EDE6` Soft stone (secondary sections)
- `#EDE6DC` Linen (tertiary)
- `#1C1C1C` Deep charcoal (primary text, dark sections)
- `#4A4744` Mid charcoal (secondary text)
- `#9E9890` Stone grey (muted, captions)
- `#4A6FA5` French Riviera blue (primary accent)
- `#D4E0EF` Riviera blue light
- `#2C4A72` Riviera blue dark
- `#5C6B3E` Deep olive (secondary accent)
- `#8B6F47` Weathered bronze (tertiary accent)
- `#DDD8D0` Default border
- `#EAE5DC` Light border

**Motion:** Slow. Deliberate. Never flashy. Scroll reveals at 800ms. No loops.

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- CMS: Sanity (future - everything editable)
- Hosting: Vercel
- Styling: CSS Modules + CSS custom properties (no Tailwind)
- Monorepo: npm workspaces
- Languages: EN + DA (bilingual, geo-detected, future)

---

## File Structure

```
boutique-standard/
  CLAUDE.md                          <- THIS FILE. Read first.
  PROJECT_BRIEF.md                   <- (root, copy)
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
        cover.ts                     <- Cover page template
        executiveSnapshot.ts         <- Executive snapshot template
        index.ts                     <- All other section stubs
    web-engine/index.ts              <- Client + case report transformers
  apps/web/
    lib/
      content/
        types.ts                     <- Shared content types (all 4 page shapes)
        en/
          audit.ts                   <- EN audit page content
          philosophy.ts              <- EN philosophy/about page content
          report.ts                  <- EN report page content
          request.ts                 <- EN request form content
        da/
          audit.ts                   <- DA audit page content
          philosophy.ts              <- DA philosophy/about page content
          report.ts                  <- DA report page content
          request.ts                 <- DA request form content
      getContent.ts                  <- getContent(page, lang) + getLang(searchParams)
    app/
      layout.tsx                     <- Root layout (fonts loaded here)
      globals.css                    <- All CSS variables, reset, utilities
      (public)/
        layout.tsx                   <- Public layout (Header + Footer)
        page.tsx                     <- Homepage (imports section components)
        about/
          page.tsx                   <- Philosophy / Why We Exist
        audit/
          page.tsx                   <- Audit service page
        report/
          page.tsx                   <- Report showcase index
          maison-du-rivage/
            page.tsx                 <- Case report (editorial, public)
            page.module.css
        request/
          page.tsx                   <- Audit enquiry multi-step form
        journal/                     <- (empty, to build)
      (client)/
        client/[token]/report/       <- (empty, password-protected client report)
    components/
      layout/
        Header.tsx + Header.module.css
        Footer.tsx + Footer.module.css
      shared/
        PageHero.tsx + .module.css   <- Reusable hero (image or typographic variant)
        PageCta.tsx + .module.css    <- Reusable dark CTA section
        Reveal.tsx                   <- IntersectionObserver scroll reveal wrapper
      home/
        HeroSection.tsx + .module.css
        PhilosophySection.tsx + .module.css
        AuditTeaserSection.tsx + .module.css
        ReportPreviewSection.tsx + .module.css
        JournalStripSection.tsx + .module.css
        InquirySection.tsx + .module.css
      audit/
        MethodologySection.tsx + .module.css  <- 4-pillar dark section
        ProcessSection.tsx + .module.css      <- 4 process steps grid
        ScopeSection.tsx + .module.css        <- 3 scope option cards
        DeliverablesSection.tsx + .module.css <- What you receive (sticky left)
        PricingSection.tsx + .module.css      <- Pricing (editorial, no table)
        FaqSection.tsx + .module.css          <- details/summary accordion
      philosophy/
        PerspectiveSection.tsx + .module.css       <- Sticky left + editorial body
        WhatWeAreNotSection.tsx + .module.css      <- Not/Is list
        PhilosophyMethodologySection.tsx + .module.css <- 4 pillars (light bg)
      report/
        ReportIntroSection.tsx + .module.css       <- Sticky left + body paragraphs
        ReportSectionsSection.tsx + .module.css    <- 13 report sections numbered list
        CaseStudySection.tsx + .module.css         <- Maison du Rivage editorial card
      request/
        RequestStepsSection.tsx + .module.css      <- 5-step process overview
        RequestFormSection.tsx + .module.css       <- Multi-step form (client component)
    next.config.js
    package.json
  data/reports/maison-du-rivage.json <- Complete Maison du Rivage data
  outputs/pdf/ outputs/web/
```

---

## Website Sitemap

### Public
```
/             Home (6 sections - all done as components)
/audit        Audit service page
/report       Case report showcase
/report/[slug] Individual case (Maison du Rivage)
/journal      Journal hub
/journal/[category]/[slug] Articles
/about        "Why We Exist"
/request      Audit enquiry form (multi-step)
```

### Private
```
/client/[token]/report  Full web report (password-protected)
```

---

## Build Status

### Done
- [x] Full repo structure + packages
- [x] ReportCase schema (locked)
- [x] Journal schema
- [x] Design tokens (TypeScript + CSS)
- [x] Maison du Rivage data (complete JSON)
- [x] PDF engine skeleton
- [x] Web engine transformers
- [x] CLAUDE.md (this file)
- [x] PROJECT_BRIEF.md
- [x] globals.css (Cormorant Garamond + DM Sans, all tokens)
- [x] Header component (transparent/solid, mobile menu)
- [x] Footer component
- [x] Public layout
- [x] Homepage page.tsx (imports all sections)
- [x] HeroSection (full-viewport, transparent header, animated)
- [x] PhilosophySection (sticky left, 4-pillar framework)
- [x] AuditTeaserSection (4-step process, image + quote)
- [x] ReportPreviewSection (score preview, locked teaser)
- [x] JournalStripSection (3 articles, grid)
- [x] InquirySection (dark, full-width CTA)

### Next to build (in order)
- [ ] Audit page (/audit) - all sections
- [ ] About page (/about)
- [ ] Report case page (/report + /report/[slug])
- [ ] Request form (/request) - multi-step
- [ ] Journal hub (/journal)
- [ ] Client report (/client/[token]/report)

---

## Key Decisions

- Font: Cormorant Garamond (serif) + DM Sans (sans)
- Header: fixed, transparent on hero, solid on scroll, 72px height
- Footer: warm stone background, 2-column nav
- Homepage sections: HeroSection, PhilosophySection, AuditTeaserSection, ReportPreviewSection, JournalStripSection, InquirySection
- Score display: Cormorant Garamond 300 weight, large
- Locked content: backdrop-filter blur, semi-transparent overlay
- CTA arrows: CSS pseudo-element with width transition on hover
- Image placeholders: var(--color-bg-tertiary) fills, to be replaced with Next.js Image from Sanity

---

SYSTEM CORE: core/system/BOUTIQUE_STANDARD_SYSTEM.md

## How to Continue in a New Session

Say: "Read CLAUDE.md first, then [what you want to build next]"

The file path in the repo is: `/CLAUDE.md` at root.

The next priority is the `/audit` page, then `/about`, then the report pages.
