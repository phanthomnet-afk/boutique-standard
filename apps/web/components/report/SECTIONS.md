# Report Sections Reference

| ID  | Section | File | PDF Template |
|-----|---------|------|--------------|
| S01 | Executive Snapshot | S01-ExecutiveSnapshot.tsx | packages/pdf-engine/templates/S01-executive-snapshot.ts |
| S02 | Property Context | S02-PropertyContext.tsx | packages/pdf-engine/templates/S02-property-context.ts |
| S03 | Promise Analysis | S03-PromiseAnalysis.tsx | packages/pdf-engine/templates/S03-promise-analysis.ts |
| S04 | Experience DNA | S04-ExperienceDNA.tsx | packages/pdf-engine/templates/S04-experience-dna.ts |
| S05 | Journey Overview | S05-JourneyOverview.tsx | packages/pdf-engine/templates/S05-journey-overview.ts |
| S06 | Journey Narratives | S06-JourneyNarratives.tsx | packages/pdf-engine/templates/S06-journey-narratives.ts |
| S07 | Continuity Map | S07-ContinuityMap.tsx | packages/pdf-engine/templates/S07-continuity-map.ts |
| S08 | Misalignments | S08-Misalignments.tsx | packages/pdf-engine/templates/S08-misalignments.ts |
| S09 | Memory Index | S09-MemoryIndex.tsx | packages/pdf-engine/templates/S09-memory-index.ts |
| S10 | Never Change | S10-NeverChange.tsx | packages/pdf-engine/templates/S10-never-change.ts |
| S11 | Scoreboard | S11-Scoreboard.tsx | packages/pdf-engine/templates/S11-scoreboard.ts |
| S12 | Opportunities | S12-Opportunities.tsx | packages/pdf-engine/templates/S12-opportunities.ts |
| S13 | Closing | S13-Closing.tsx | packages/pdf-engine/templates/S13-closing.ts |

To fix a specific section:
  Web report: edit apps/web/components/report/sections/S[XX]-*.tsx
  PDF: edit packages/pdf-engine/templates/S[XX]-*.ts

## Known Issues

- S04 DnaWheel has no section id (id="dna") - not in nav, intentionally grouped under property scroll zone
- S06 service culture stage (06.5) shows placeholder image (no asset-service-1 image file exists)
- S06 departure stage (06.6) shows no image (no asset available - by design)
- ContinuityMap tooltip renders outside SVG bounds on last data point (cosmetic)
- PDF generation requires local Node.js with Puppeteer installed; not available on Vercel serverless
