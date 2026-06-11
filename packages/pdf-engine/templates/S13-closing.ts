import { ReportCase, getBandLabel } from "@tbs/schema"

export function s13Closing(report: ReportCase): string {
  const sentences = report.closingAssessment.split(". ")
  const pullQuote = sentences.slice(0, 2).join(". ") + "."
  const remainder = sentences.slice(2).join(". ")

  const scores = [
    { label: "Overall Alignment", value: report.overallAlignmentScore.value, band: report.overallAlignmentScore.band },
    { label: "Experience Score",  value: report.experienceScore.value,        band: report.experienceScore.band },
    { label: "Continuity Score",  value: report.continuityScore.value,        band: report.continuityScore.band },
    { label: "Memory Impact",     value: report.memoryImpactScore.value,      band: report.memoryImpactScore.band },
  ]

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Final Assessment</div>
  <h2 style="margin-bottom:32px;">Closing</h2>

  <div style="border-top:0.5px solid var(--color-accent);border-bottom:0.5px solid var(--color-accent);padding:24px 0;margin-bottom:32px;">
    <p style="font-family:var(--font-serif);font-size:16pt;font-style:italic;font-weight:300;line-height:1.6;color:var(--color-text);margin:0;">
      ${pullQuote}
    </p>
  </div>

  ${remainder ? `
  <p style="font-size:10pt;line-height:1.8;margin-bottom:36px;max-width:580px;">
    ${remainder}
  </p>` : ""}

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--color-border);margin-bottom:32px;">
    ${scores.map(({ label, value, band }) => `
      <div style="background:var(--color-bg);padding:16px;">
        <div class="section-label" style="margin-bottom:8px;">${label}</div>
        <div style="font-family:var(--font-serif);font-size:28pt;font-weight:300;line-height:1;">${value}</div>
        <div style="font-size:7pt;color:var(--color-text-muted);margin-top:4px;">/ 10 &middot; ${getBandLabel(band)}</div>
      </div>
    `).join("")}
  </div>

  <div style="display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start;margin-bottom:48px;">
    <div>
      <div class="section-label" style="margin-bottom:8px;">Recommendation Status</div>
      <span class="tag" style="color:var(--color-accent);border-color:var(--color-accent-light,#D4E0EF);">
        Strongly Recommended for Continued Refinement
      </span>
      <p style="font-size:9pt;color:var(--color-text-secondary);line-height:1.7;margin-top:12px;max-width:380px;">
        The foundations are strong. The identity is clear. With targeted improvements at the transitional moments, ${report.property.name} can move from an excellent boutique experience to a truly memorable one.
      </p>
    </div>
  </div>

  <div style="padding-top:24px;border-top:0.5px solid var(--color-border);">
    <div class="section-label" style="margin-bottom:4px;">Prepared by</div>
    <p style="font-family:var(--font-serif);font-size:14pt;font-weight:400;margin-top:4px;margin-bottom:2px;">The Boutique Standard</p>
    <p style="font-size:9pt;color:var(--color-text-muted);">Independent Guest Experience Intelligence &middot; boutiquestandard.com</p>
    <p style="font-size:8pt;color:var(--color-text-muted);margin-top:12px;">This report is confidential and prepared exclusively for the property named herein. Not for distribution.</p>
  </div>
</section>`
}
