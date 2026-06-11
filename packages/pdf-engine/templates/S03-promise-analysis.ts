import { ReportCase, getBandLabel } from "@tbs/schema"

export function s03PromiseAnalysis(report: ReportCase): string {
  const { promiseAnalysis, property } = report

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">The Promise</div>
  <h2 style="margin-bottom:12px;">What ${property.name} Communicates</h2>
  <div class="accent-line"></div>

  <div class="pull-quote" style="margin:28px 0 32px;">"${promiseAnalysis.coreStatement}"</div>

  <p style="font-size:10pt;line-height:1.75;color:var(--color-text-secondary);max-width:540px;margin-bottom:36px;">
    ${promiseAnalysis.narrative}
  </p>

  <div class="section-label" style="margin-bottom:16px;">Promise Dimensions</div>
  <div style="display:grid;grid-template-columns:1fr;gap:1px;background:var(--color-border);">
    ${promiseAnalysis.dimensions.map((d) => `
      <div style="background:var(--color-bg);padding:16px;display:grid;grid-template-columns:180px 1fr 60px;gap:20px;align-items:center;">
        <div style="font-size:10pt;font-weight:500;">${d.label}</div>
        <div style="height:2px;background:var(--color-bg-tertiary,#EDE6DC);position:relative;">
          <div style="position:absolute;left:0;top:0;height:100%;width:${d.score.value * 10}%;background:var(--color-accent,#4A6FA5);"></div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;">
          <div style="font-family:var(--font-serif);font-size:18pt;color:var(--color-accent);">${d.score.value}</div>
          <div style="font-size:7pt;color:var(--color-text-muted);letter-spacing:.08em;text-transform:uppercase;">${getBandLabel(d.score.band)}</div>
        </div>
      </div>
    `).join("")}
  </div>

  <div style="display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center;padding:20px;background:var(--color-bg-secondary);border:0.5px solid var(--color-border);margin-top:24px;">
    <div>
      <div class="section-label" style="margin-bottom:4px;">Overall Promise Alignment</div>
      <p style="font-size:9pt;color:var(--color-text-secondary);">${promiseAnalysis.overallAlignment.note ?? ""}</p>
    </div>
    <div style="text-align:right;">
      <div style="font-family:var(--font-serif);font-size:36pt;font-weight:300;color:var(--color-text);line-height:1;">${promiseAnalysis.overallAlignment.value}</div>
      <div style="font-size:8pt;color:var(--color-text-muted);">/ 10 &middot; ${getBandLabel(promiseAnalysis.overallAlignment.band)}</div>
    </div>
  </div>
</section>`
}
