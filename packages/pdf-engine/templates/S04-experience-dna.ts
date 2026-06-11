import { ReportCase } from "@tbs/schema"

const DNA_DIMENSIONS = [
  { key: "warmth",           label: "Warmth" },
  { key: "privacy",          label: "Privacy" },
  { key: "locality",         label: "Locality" },
  { key: "design",           label: "Design" },
  { key: "luxuryExpression", label: "Luxury Expression" },
  { key: "serviceIntimacy",  label: "Service Intimacy" },
  { key: "calmness",         label: "Calmness" },
] as const

export function s04ExperienceDNA(report: ReportCase): string {
  const { experienceDNA, property } = report

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Experience DNA</div>
  <h2 style="margin-bottom:12px;">Property Identity Fingerprint</h2>
  <p style="font-size:10pt;color:var(--color-text-secondary);max-width:520px;margin-bottom:36px;">
    The Experience DNA captures the identity dimensions that define what kind of property ${property.name} fundamentally is - evaluated against its own positioning, not an external standard.
  </p>

  <div class="col-2" style="align-items:start;">
    <div>
      <div class="section-label" style="margin-bottom:20px;">Identity Profile</div>
      ${DNA_DIMENSIONS.map((d) => {
        const val = (experienceDNA as any)[d.key] ?? 0
        return `
          <div style="display:flex;align-items:center;gap:16px;padding:10px 0;border-bottom:0.5px solid var(--color-border-light,#EAE5DC);">
            <div style="width:100px;font-size:9pt;color:var(--color-text-secondary);">${d.label}</div>
            <div style="flex:1;height:2px;background:var(--color-bg-tertiary,#EDE6DC);position:relative;">
              <div style="position:absolute;left:0;top:0;height:100%;width:${val * 10}%;background:var(--color-accent,#4A6FA5);"></div>
            </div>
            <div style="font-family:var(--font-serif);font-size:14pt;width:36px;text-align:right;">${typeof val === "number" ? val.toFixed(1) : val}</div>
          </div>
        `
      }).join("")}
    </div>

    <div>
      <div class="section-label" style="margin-bottom:16px;">What This Reveals</div>
      <p style="font-size:10pt;line-height:1.75;color:var(--color-text-secondary);margin-bottom:20px;">
        The DNA profile reveals where ${property.name} concentrates its identity. High scores in warmth, service intimacy, and calmness indicate a property that leads with atmosphere rather than visible luxury signals.
      </p>
      <div class="insight-box">
        <p>A property's identity fingerprint matters most when a guest cannot immediately articulate why they feel at home. The DNA defines the feeling before the facts.</p>
      </div>

      <div style="margin-top:24px;">
        <div class="section-label" style="margin-bottom:12px;">Strongest Dimensions</div>
        ${DNA_DIMENSIONS
          .map((d) => ({ label: d.label, val: (experienceDNA as any)[d.key] ?? 0 }))
          .sort((a, b) => b.val - a.val)
          .slice(0, 3)
          .map((d) => `
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:0.5px solid var(--color-border-light,#EAE5DC);">
              <span style="font-size:10pt;">${d.label}</span>
              <span style="font-family:var(--font-serif);font-size:14pt;color:var(--color-accent);">${d.val}</span>
            </div>
          `).join("")}
      </div>
    </div>
  </div>
</section>`
}
