/**
 * THE BOUTIQUE STANDARD
 * PDF Layout — Document Assembly
 *
 * Assembles all section templates into a single HTML document
 * that Puppeteer renders to PDF.
 *
 * Each section is a named template function.
 * Section order follows the final report architecture.
 */

import { ReportCase } from "@tbs/schema";
import { toCSSVariables } from "@tbs/schema/tokens";

import { coverSection }           from "./templates/cover";
import { observerLetterSection }  from "./templates/observerLetter";
import { frameworkSection }       from "./templates/framework";
import { propertyContextSection } from "./templates/propertyContext";
import { promiseSection }         from "./templates/promise";
import { experienceDNASection }   from "./templates/experienceDNA";
import { journeyOverviewSection } from "./templates/journeyOverview";
import { journeyStageSection }    from "./templates/journeyStage";
import { continuityMapSection }   from "./templates/continuityMap";
import { misalignmentsSection }   from "./templates/misalignments";
import { memorySection }          from "./templates/memory";
import { neverChangeSection }     from "./templates/neverChange";
import { scoreboardSection }      from "./templates/scoreboard";
import { opportunitiesSection }   from "./templates/opportunities";
import { closingSection }         from "./templates/closing";

export function buildFullDocument(report: ReportCase): string {
  const sections = [
    coverSection(report),
    observerLetterSection(report),
    frameworkSection(),
    propertyContextSection(report),
    promiseSection(report),
    experienceDNASection(report),
    journeyOverviewSection(report),
    // Individual journey stage sections
    ...(["arrival", "room", "dining", "facilities", "serviceCulture", "departure"] as const)
      .filter((key) => report.journey[key])
      .map((key) => journeyStageSection(report.journey[key]!)),
    continuityMapSection(report),
    misalignmentsSection(report),
    memorySection(report),
    neverChangeSection(report),
    scoreboardSection(report),
    opportunitiesSection(report),
    closingSection(report),
  ];

  return `<!DOCTYPE html>
<html lang="${report.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Boutique Standard — ${report.property.name}</title>
  <style>
    ${toCSSVariables()}
    ${pdfBaseStyles()}
  </style>
</head>
<body>
  ${sections.join("\n\n")}
</body>
</html>`;
}

function pdfBaseStyles(): string {
  return `
    /* PDF Base — The Boutique Standard */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      width: 210mm;
      background: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-sans);
      font-size: 10pt;
      line-height: 1.7;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Page breaks */
    .page-break        { page-break-after: always; break-after: page; }
    .page-break-before { page-break-before: always; break-before: page; }
    .no-break          { page-break-inside: avoid; break-inside: avoid; }

    /* Section base */
    .tbs-section {
      padding: 18mm 20mm 22mm 18mm;
      min-height: 100vh;
    }

    .tbs-section--full {
      padding: 0;
      min-height: 100vh;
    }

    /* Typography */
    h1, h2, h3, h4 {
      font-family: var(--font-serif);
      font-weight: 500;
      color: var(--color-text);
      letter-spacing: -0.02em;
    }

    h1 { font-size: 36pt; line-height: 1.1; }
    h2 { font-size: 22pt; line-height: 1.2; }
    h3 { font-size: 14pt; line-height: 1.3; }
    h4 { font-size: 11pt; line-height: 1.4; }

    p {
      font-size: 10pt;
      line-height: 1.75;
      color: var(--color-text);
    }

    /* Score display */
    .score-value {
      font-family: var(--font-serif);
      font-size: 48pt;
      font-weight: 400;
      color: var(--color-text);
      line-height: 1;
      letter-spacing: -0.03em;
    }

    .score-band {
      font-size: 8pt;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    /* Accent line */
    .accent-line {
      width: 40px;
      height: 1px;
      background: var(--color-accent);
      margin: 16px 0;
    }

    /* Pull quote */
    .pull-quote {
      font-family: var(--font-serif);
      font-size: 16pt;
      font-style: italic;
      font-weight: 400;
      line-height: 1.5;
      color: var(--color-text);
      border-left: 1.5px solid var(--color-accent);
      padding-left: 20px;
      margin: 24px 0;
    }

    /* Section label — small caps style */
    .section-label {
      font-size: 7pt;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-bottom: 8px;
    }

    /* Image placeholder */
    .img-placeholder {
      background: var(--color-bg-secondary);
      border: 0.5px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .img-placeholder-text {
      font-size: 8pt;
      color: var(--color-text-muted);
      letter-spacing: 0.06em;
    }

    /* TBS header — appears on interior pages */
    .tbs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 0.5px solid var(--color-border);
      margin-bottom: 32px;
    }

    .tbs-header-brand {
      font-size: 7pt;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .tbs-header-property {
      font-size: 7pt;
      color: var(--color-text-muted);
    }

    /* Score grid */
    .score-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .score-item {
      padding: 16px;
      background: var(--color-bg-secondary);
      border: 0.5px solid var(--color-border);
    }

    /* Tag */
    .tag {
      display: inline-block;
      font-size: 7pt;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-accent);
      border: 0.5px solid var(--color-accent-light);
      padding: 3px 8px;
    }

    /* List */
    .tbs-list {
      list-style: none;
      padding: 0;
    }

    .tbs-list li {
      font-size: 10pt;
      line-height: 1.6;
      padding: 6px 0;
      border-bottom: 0.5px solid var(--color-border-light);
      display: flex;
      gap: 12px;
    }

    .tbs-list li::before {
      content: "—";
      color: var(--color-accent);
      flex-shrink: 0;
    }

    /* Two-column layout */
    .col-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    /* Insight box */
    .insight-box {
      background: var(--color-bg-secondary);
      border-left: 2px solid var(--color-accent);
      padding: 16px 20px;
      margin: 20px 0;
    }

    .insight-box p {
      font-family: var(--font-serif);
      font-size: 11pt;
      font-style: italic;
      line-height: 1.6;
    }

    @media print {
      html, body { width: 210mm; }
    }
  `;
}
