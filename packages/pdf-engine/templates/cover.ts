import { ReportCase } from "@tbs/schema";

export function coverSection(report: ReportCase): string {
  const { property, auditMetadata } = report;

  return `
<section class="tbs-section tbs-section--full page-break" style="
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 297mm;
  background: var(--color-bg);
  padding: 0;
  overflow: hidden;
">
  <!-- Full-bleed image area -->
  <div class="img-placeholder" style="
    position: absolute;
    inset: 0;
    height: 65%;
    top: 0;
    background: var(--color-bg-tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    ${property.assets?.cover
      ? `<img src="${property.assets.cover}" alt="${property.name}" style="width:100%;height:100%;object-fit:cover;" />`
      : `<span class="img-placeholder-text">[ Full-bleed exterior photograph — ${property.name} ]</span>`
    }
  </div>

  <!-- Content block — bottom third -->
  <div style="
    position: relative;
    padding: 20mm 20mm 22mm 18mm;
    background: var(--color-bg);
    border-top: 0.5px solid var(--color-border);
  ">
    <div style="margin-bottom: 6px;">
      <span class="section-label">The Boutique Standard</span>
    </div>
    <div style="margin-bottom: 4px;">
      <span class="section-label" style="color: var(--color-text-muted);">Guest Experience Intelligence Report</span>
    </div>

    <div class="accent-line" style="margin: 20px 0;"></div>

    <h1 style="font-size: 28pt; margin-bottom: 8px; letter-spacing: -0.02em;">
      ${property.name}
    </h1>
    <p style="font-size: 11pt; color: var(--color-text-secondary); margin-bottom: 24px;">
      ${property.location}
    </p>

    <div style="display: flex; gap: 32px; align-items: flex-end;">
      <div>
        <div class="section-label">Property</div>
        <div style="font-size: 10pt; margin-top: 3px;">${property.starRating}-Star Boutique Hotel</div>
      </div>
      <div>
        <div class="section-label">Audit Date</div>
        <div style="font-size: 10pt; margin-top: 3px;">${formatDate(auditMetadata.auditDate)}</div>
      </div>
      <div>
        <div class="section-label">Report Type</div>
        <div style="font-size: 10pt; margin-top: 3px;">Confidential — Client Only</div>
      </div>
    </div>
  </div>
</section>`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
