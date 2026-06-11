import { ReportCase } from "@tbs/schema"

export function s10NeverChange(report: ReportCase): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Protection Framework</div>
  <h2 style="margin-bottom:12px;">What Should Never Change</h2>
  <p style="font-size:10pt;color:var(--color-text-secondary);max-width:540px;margin-bottom:36px;">
    Most reports focus exclusively on what should improve. The Boutique Standard considers this insufficient. The qualities that make a property genuinely distinctive are rarely listed in guest feedback - guests only notice when they are gone.
  </p>

  ${report.neverChangeElements.map((el, i) => `
    <div class="no-break" style="display:grid;grid-template-columns:28px 1fr 80px;gap:24px;padding:24px 0;border-bottom:0.5px solid var(--color-border);">
      <div style="font-size:9pt;color:var(--color-text-muted);padding-top:2px;">0${i + 1}</div>
      <div>
        <h4 style="font-size:14pt;font-weight:400;margin-bottom:8px;">${el.element}</h4>
        <p style="font-size:10pt;color:var(--color-text-secondary);line-height:1.7;margin-bottom:10px;">${el.rationale}</p>
        <p style="font-size:9pt;color:var(--color-text-muted);line-height:1.6;font-style:italic;">Risk if lost: ${el.riskIfLost}</p>
      </div>
      <div style="text-align:right;padding-top:2px;">
        <span class="tag" style="color:#8B6F47;border-color:rgba(139,111,71,0.3);">${(el.priority ?? "high").toUpperCase()}</span>
      </div>
    </div>
  `).join("")}
</section>`
}
