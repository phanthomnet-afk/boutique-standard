/**
 * THE BOUTIQUE STANDARD
 * PDF Layout - Document Assembly
 *
 * Assembles S01-S13 sections into a single HTML document
 * that Puppeteer renders to A4 PDF (~35-40 pages).
 */

import { ReportCase } from "@tbs/schema"
import { toCSSVariables } from "@tbs/schema/tokens"

import { s01ExecutiveSnapshot } from "./templates/S01-executive-snapshot"
import { s02PropertyContext }   from "./templates/S02-property-context"
import { s03PromiseAnalysis }   from "./templates/S03-promise-analysis"
import { s04ExperienceDNA }     from "./templates/S04-experience-dna"
import { s05JourneyOverview }   from "./templates/S05-journey-overview"
import { s06JourneyNarratives } from "./templates/S06-journey-narratives"
import { s07ContinuityMap }     from "./templates/S07-continuity-map"
import { s08Misalignments }     from "./templates/S08-misalignments"
import { s09MemoryIndex }       from "./templates/S09-memory-index"
import { s10NeverChange }       from "./templates/S10-never-change"
import { s11Scoreboard }        from "./templates/S11-scoreboard"
import { s12Opportunities }     from "./templates/S12-opportunities"
import { s13Closing }           from "./templates/S13-closing"

export function buildFullDocument(report: ReportCase): string {
  const sections = [
    s01ExecutiveSnapshot(report),
    s02PropertyContext(report),
    s03PromiseAnalysis(report),
    s04ExperienceDNA(report),
    s05JourneyOverview(report),
    s06JourneyNarratives(report),
    s07ContinuityMap(report),
    s08Misalignments(report),
    s09MemoryIndex(report),
    s10NeverChange(report),
    s11Scoreboard(report),
    s12Opportunities(report),
    s13Closing(report),
  ]

  return buildHTML(report, sections.join("\n\n"))
}

function buildHTML(report: ReportCase, body: string): string {
  return `<!DOCTYPE html>
<html lang="${report.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Boutique Standard - ${report.property.name}</title>
  <style>
    ${toCSSVariables()}
    ${pdfBaseStyles()}
  </style>
</head>
<body>
  ${body}
</body>
</html>`
}

function pdfBaseStyles(): string {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      width: 210mm;
      background: var(--color-bg, #F8F5F0);
      color: var(--color-text, #1C1C1C);
      font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
      font-size: 10pt;
      line-height: 1.7;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page-break        { page-break-after: always; break-after: page; }
    .page-break-before { page-break-before: always; break-before: page; }
    .no-break          { page-break-inside: avoid; break-inside: avoid; }

    .tbs-section {
      padding: 18mm 20mm 22mm 18mm;
      min-height: 100vh;
    }

    h1, h2, h3, h4 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-weight: 300;
      color: var(--color-text, #1C1C1C);
      letter-spacing: -0.01em;
    }
    h2 { font-size: 22pt; line-height: 1.2; }
    h4 { font-size: 11pt; line-height: 1.4; }
    p  { font-size: 10pt; line-height: 1.75; }

    .score-value {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 48pt;
      font-weight: 300;
      color: var(--color-text, #1C1C1C);
      line-height: 1;
    }

    .score-band {
      font-size: 7pt;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-muted, #9E9890);
    }

    .accent-line {
      width: 40px;
      height: 1px;
      background: var(--color-accent, #4A6FA5);
      margin: 16px 0;
    }

    .pull-quote {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 14pt;
      font-style: italic;
      font-weight: 300;
      line-height: 1.6;
      color: var(--color-text, #1C1C1C);
      border-left: 1.5px solid var(--color-accent, #4A6FA5);
      padding-left: 20px;
      margin: 24px 0;
    }

    .section-label {
      font-size: 7pt;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-muted, #9E9890);
      margin-bottom: 8px;
    }

    .img-placeholder {
      background: var(--color-bg-secondary, #F2EDE6);
      border: 0.5px solid var(--color-border, #DDD8D0);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .img-placeholder-text {
      font-size: 8pt;
      color: var(--color-text-muted, #9E9890);
      letter-spacing: 0.06em;
    }

    .tbs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 0.5px solid var(--color-border, #DDD8D0);
      margin-bottom: 32px;
    }

    .tbs-header-brand {
      font-size: 7pt;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-text-muted, #9E9890);
    }

    .tbs-header-property {
      font-size: 7pt;
      color: var(--color-text-muted, #9E9890);
    }

    .tbs-list {
      list-style: none;
      padding: 0;
    }

    .tbs-list li {
      font-size: 9.5pt;
      line-height: 1.65;
      padding: 5px 0;
      border-bottom: 0.5px solid var(--color-border-light, #EAE5DC);
    }

    .col-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .insight-box {
      background: var(--color-bg-secondary, #F2EDE6);
      border-left: 2px solid var(--color-accent, #4A6FA5);
      padding: 16px 20px;
      margin: 20px 0;
    }

    .insight-box p {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 11pt;
      font-style: italic;
      font-weight: 300;
      line-height: 1.65;
    }

    .tag {
      display: inline-block;
      font-size: 7pt;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-accent, #4A6FA5);
      border: 0.5px solid var(--color-accent-light, #D4E0EF);
      padding: 3px 8px;
    }

    @media print {
      html, body { width: 210mm; }
    }
  `
}
