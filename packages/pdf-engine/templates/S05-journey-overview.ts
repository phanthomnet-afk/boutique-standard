import { ReportCase, getBandLabel } from "@tbs/schema"

const STAGE_ORDER = [
  "discovery", "booking", "preArrival", "arrival",
  "room", "dining", "facilities", "serviceCulture", "departure", "postStay",
] as const

export function s05JourneyOverview(report: ReportCase): string {
  const { property, journey } = report
  const stages = STAGE_ORDER.filter((k) => journey[k])

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Guest Journey</div>
  <h2 style="margin-bottom:32px;">The Experience Mapped</h2>

  <div style="display:grid;grid-template-columns:1fr;gap:1px;background:var(--color-border);">
    <div style="background:var(--color-bg-secondary);display:grid;grid-template-columns:180px 1fr 56px 90px;gap:16px;padding:10px 16px;align-items:center;">
      <div class="section-label">Stage</div>
      <div class="section-label">Score</div>
      <div class="section-label" style="text-align:right;">Score</div>
      <div class="section-label">Band</div>
    </div>
    ${stages.map((k) => {
      const stage = journey[k]!
      return `
        <div style="background:var(--color-bg);display:grid;grid-template-columns:180px 1fr 56px 90px;gap:16px;padding:14px 16px;align-items:center;">
          <div style="font-size:10pt;font-weight:500;">${stage.label}</div>
          <div style="height:2px;background:var(--color-bg-tertiary,#EDE6DC);position:relative;">
            <div style="position:absolute;left:0;top:0;height:100%;width:${stage.score.value * 10}%;background:var(--color-accent,#4A6FA5);"></div>
          </div>
          <div style="font-family:var(--font-serif);font-size:18pt;text-align:right;color:var(--color-accent);">${stage.score.value}</div>
          <div class="tag">${getBandLabel(stage.score.band)}</div>
        </div>
      `
    }).join("")}
    <div style="background:var(--color-bg-secondary);display:grid;grid-template-columns:180px 1fr 56px 90px;gap:16px;padding:16px;align-items:center;">
      <div style="font-size:10pt;font-weight:500;">Overall</div>
      <div style="height:2px;background:var(--color-bg-tertiary,#EDE6DC);position:relative;">
        <div style="position:absolute;left:0;top:0;height:100%;width:${report.overallAlignmentScore.value * 10}%;background:var(--color-accent,#4A6FA5);"></div>
      </div>
      <div style="font-family:var(--font-serif);font-size:22pt;text-align:right;color:var(--color-accent);">${report.overallAlignmentScore.value}</div>
      <div class="tag">${getBandLabel(report.overallAlignmentScore.band)}</div>
    </div>
  </div>

  <div class="insight-box" style="margin-top:28px;">
    <p>The guest experience improves significantly after arrival. The weakest continuity moments occur at the beginning and end of the stay - precisely the moments guests remember most clearly.</p>
  </div>
</section>`
}
