import { ReportCase, getBandLabel } from "@tbs/schema";

export function executiveSnapshotSection(report: ReportCase): string {
  const { property, overallAlignmentScore, experienceScore, continuityScore, memoryImpactScore } = report;

  const strengths = report.protectedElements
    .filter((e) => e.priority === "high")
    .slice(0, 4);

  const topRecs = report.recommendations
    .filter((r) => r.priority <= 3)
    .slice(0, 4);

  const neverChange = report.neverChangeElements.slice(0, 4);

  return `
<section class="tbs-section page-break">
  <!-- Header -->
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name} · ${property.location}</span>
  </div>

  <div class="section-label">Executive Snapshot</div>
  <h2 style="margin-bottom: 32px;">Overall Alignment</h2>

  <!-- Score row -->
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--color-border); margin-bottom: 40px;">
    ${[
      { label: "Overall Alignment", score: overallAlignmentScore },
      { label: "Experience Score", score: experienceScore },
      { label: "Continuity Score", score: continuityScore },
      { label: "Memory Impact", score: memoryImpactScore },
    ].map(({ label, score }) => `
      <div style="background: var(--color-bg); padding: 20px;">
        <div class="section-label" style="margin-bottom: 8px;">${label}</div>
        <div class="score-value">${score.value}</div>
        <div style="font-size: 8pt; color: var(--color-text-muted); margin-top: 4px;">/ 10 · ${getBandLabel(score.band)}</div>
      </div>
    `).join("")}
  </div>

  <!-- Summary -->
  <p style="font-size: 11pt; line-height: 1.7; color: var(--color-text-secondary); margin-bottom: 40px; max-width: 560px;">
    ${report.executiveSummary}
  </p>

  <div class="accent-line"></div>

  <!-- Three columns: strengths / opportunities / what should never change -->
  <div class="col-2" style="grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-top: 32px;">

    <div>
      <div class="section-label" style="margin-bottom: 16px;">Key Strengths</div>
      <ul class="tbs-list">
        ${strengths.map((e) => `<li>${e.element}</li>`).join("")}
        ${report.journey.dining ? `<li>Exceptional breakfast experience</li>` : ""}
      </ul>
    </div>

    <div>
      <div class="section-label" style="margin-bottom: 16px;">Priority Opportunities</div>
      <ul class="tbs-list">
        ${topRecs.map((r, i) => `<li>${i + 1}. ${r.title}</li>`).join("")}
      </ul>
    </div>

    <div>
      <div class="section-label" style="margin-bottom: 16px;">What Should Never Change</div>
      <ul class="tbs-list">
        ${neverChange.map((e) => `<li>${e.element}</li>`).join("")}
      </ul>
    </div>

  </div>
</section>`;
}
