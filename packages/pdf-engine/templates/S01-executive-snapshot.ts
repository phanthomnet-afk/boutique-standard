import { ReportCase, getBandLabel } from "@tbs/schema"

export function s01ExecutiveSnapshot(report: ReportCase): string {
  const { property, overallAlignmentScore, experienceScore, continuityScore, memoryImpactScore } = report

  const strengths = report.protectedElements.filter((e) => e.priority === "high").slice(0, 4)
  const topRecs = report.recommendations.filter((r) => r.priority <= 3).slice(0, 4)
  const neverChange = report.neverChangeElements.slice(0, 4)

  const scores = [
    { label: "Overall Alignment", score: overallAlignmentScore },
    { label: "Experience Score",  score: experienceScore },
    { label: "Continuity Score",  score: continuityScore },
    { label: "Memory Impact",     score: memoryImpactScore },
  ]

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name} &middot; ${property.location}</span>
  </div>

  <div class="section-label">Executive Snapshot</div>
  <h2 style="font-size:28pt;font-weight:300;margin-bottom:6px;">${property.name}</h2>
  <p style="font-size:10pt;color:var(--color-text-muted);margin-bottom:4px;">${property.location}</p>
  <p style="font-size:9pt;color:var(--color-text-muted);margin-bottom:20px;">
    Audit date: ${report.auditMetadata.auditDate} &nbsp;&middot;&nbsp; Report: ${report.auditMetadata.reportDate}
  </p>
  <div class="accent-line"></div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--color-border);margin:24px 0 36px;">
    ${scores.map(({ label, score }) => `
      <div style="background:var(--color-bg);padding:20px;">
        <div class="section-label" style="margin-bottom:8px;">${label}</div>
        <div class="score-value">${score.value}</div>
        <div style="font-size:8pt;color:var(--color-text-muted);margin-top:4px;">/ 10</div>
        <div class="score-band" style="margin-top:2px;">${getBandLabel(score.band)}</div>
      </div>
    `).join("")}
  </div>

  <p style="font-size:10pt;line-height:1.75;color:var(--color-text-secondary);margin-bottom:36px;max-width:560px;">
    ${report.executiveSummary}
  </p>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;">
    <div>
      <div class="section-label" style="margin-bottom:12px;">Key Strengths</div>
      <ul class="tbs-list">
        ${strengths.map((e) => `<li>- ${e.element}</li>`).join("")}
      </ul>
    </div>
    <div>
      <div class="section-label" style="margin-bottom:12px;">Priority Opportunities</div>
      <ul class="tbs-list">
        ${topRecs.map((r, i) => `<li>- ${i + 1}. ${r.title}</li>`).join("")}
      </ul>
    </div>
    <div>
      <div class="section-label" style="margin-bottom:12px;">What Should Never Change</div>
      <ul class="tbs-list">
        ${neverChange.map((e) => `<li>- ${e.element}</li>`).join("")}
      </ul>
    </div>
  </div>
</section>`
}
