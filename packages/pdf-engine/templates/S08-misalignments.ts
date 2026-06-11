import { ReportCase } from "@tbs/schema"

export function s08Misalignments(report: ReportCase): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Key Findings</div>
  <h2 style="margin-bottom:12px;">Experience Misalignments</h2>
  <p style="font-size:10pt;color:var(--color-text-secondary);max-width:520px;margin-bottom:36px;">
    A misalignment occurs where a specific communicated promise is not matched by the delivered experience. These are not weaknesses in isolation - they are specific failures of alignment.
  </p>

  ${report.misalignments.map((m, i) => `
    <div class="no-break" style="display:grid;grid-template-columns:40px 1fr 70px;gap:20px;padding:24px 0;border-bottom:0.5px solid var(--color-border);">
      <div style="font-family:var(--font-serif);font-size:24pt;color:var(--color-accent);opacity:.3;line-height:1;">${String(i + 1).padStart(2, "0")}</div>
      <div>
        <h4 style="margin-bottom:16px;font-size:14pt;font-weight:400;">${m.title}</h4>
        ${[
          { key: "Promise", val: m.promise,          color: "var(--color-text-muted)" },
          { key: "Reality", val: m.reality,           color: "var(--color-text-muted)" },
          { key: "Impact",  val: m.guestImpact,       color: "var(--color-text-muted)" },
          { key: "Action",  val: m.recommendation,    color: "var(--color-accent)" },
        ].map(({ key, val, color }) => `
          <div style="display:grid;grid-template-columns:68px 1fr;gap:10px;margin-bottom:8px;font-size:9pt;">
            <div style="color:${color};font-weight:500;text-transform:uppercase;letter-spacing:.08em;padding-top:2px;">${key}</div>
            <div style="color:var(--color-text-secondary);line-height:1.65;">${val}</div>
          </div>
        `).join("")}
      </div>
      <div style="text-align:right;padding-top:4px;">
        <span class="tag" style="color:${m.severity === "high" ? "var(--color-accent)" : "var(--color-text-muted)"};border-color:${m.severity === "high" ? "var(--color-accent-light,#D4E0EF)" : "var(--color-border)"};">
          ${(m.severity ?? "").toUpperCase()}
        </span>
      </div>
    </div>
  `).join("")}
</section>`
}
