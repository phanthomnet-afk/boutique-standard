import { ReportCase } from "@tbs/schema"

export function s12Opportunities(report: ReportCase): string {
  const sorted    = [...report.recommendations].sort((a, b) => a.priority - b.priority)
  const quickWins = sorted.filter((r) => r.isQuickWin)
  const strategic = sorted.filter((r) => !r.isQuickWin)

  const recBlock = (r: typeof sorted[0], i: number) => `
    <div class="no-break" style="padding:20px 0;border-bottom:0.5px solid var(--color-border);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div style="display:flex;align-items:baseline;gap:12px;">
          <span style="font-family:var(--font-serif);font-size:20pt;opacity:.25;line-height:1;">${String(i + 1).padStart(2, "0")}</span>
          <h4 style="font-size:12pt;font-weight:400;">${r.title}</h4>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <span class="tag">Cost: ${r.estimatedCost}</span>
          <span class="tag">Effort: ${r.difficulty}</span>
        </div>
      </div>
      <p style="font-size:9pt;color:var(--color-text-secondary);line-height:1.65;margin-bottom:8px;">${r.observation}</p>
      <p style="font-size:9pt;color:var(--color-text-secondary);line-height:1.65;margin-bottom:8px;">${r.suggestion}</p>
      <p style="font-size:9pt;color:var(--color-text-muted);font-style:italic;">Expected: ${r.expectedOutcome}</p>
    </div>
  `

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Recommendations</div>
  <h2 style="margin-bottom:12px;">Prioritised Opportunities</h2>
  <p style="font-size:9pt;color:var(--color-text-muted);margin-bottom:32px;">Ranked by guest impact.</p>

  ${quickWins.length > 0 ? `
    <div class="section-label" style="color:#5C6B3E;margin-bottom:16px;">Quick Wins - achievable within 30 days</div>
    ${quickWins.map((r, i) => recBlock(r, i)).join("")}
  ` : ""}

  ${strategic.length > 0 ? `
    <div class="section-label" style="color:#8B6F47;margin-top:32px;margin-bottom:16px;">Experience Enhancements</div>
    ${strategic.map((r, i) => recBlock(r, i)).join("")}
  ` : ""}
</section>`
}
