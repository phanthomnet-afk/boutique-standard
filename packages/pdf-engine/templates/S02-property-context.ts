import { ReportCase } from "@tbs/schema"
import { findImage, imgOrPlaceholder } from "./imageHelper"

export function s02PropertyContext(report: ReportCase): string {
  const { property, guestProfile } = report

  const coverImg = findImage("/images/reports/maison-du-rivage/cover-exterior--cover--16x9")
  const imgHtml = imgOrPlaceholder(coverImg, "Hotel exterior", "width:100%;height:220px;object-fit:cover;")

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Property Profile</div>
  <h2 style="margin-bottom:32px;">Property Context</h2>

  <div class="col-2">
    <div>
      ${imgHtml}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--color-border);margin-top:16px;">
        ${[
          { label: "Category",    value: property.category.replace(/-/g, " ") },
          { label: "Star Rating", value: `${property.starRating}-Star` },
          { label: "Rooms",       value: String(property.roomCount) },
          { label: "Location",    value: property.location },
        ].map((item) => `
          <div style="background:var(--color-bg);padding:14px;">
            <div class="section-label" style="margin-bottom:4px;">${item.label}</div>
            <div style="font-size:10pt;">${item.value}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div>
      <div class="pull-quote" style="margin-bottom:28px;">"${property.corePromise}"</div>

      <div class="section-label" style="margin-bottom:12px;">Target Guest Profile</div>
      <ul class="tbs-list" style="margin-bottom:28px;">
        ${guestProfile.primaryTypes.map((t) => `<li>${t}</li>`).join("")}
      </ul>

      <div class="section-label" style="margin-bottom:12px;">Core Guest Expectations</div>
      <ul class="tbs-list">
        ${guestProfile.coreExpectations.map((e) => `<li>${e}</li>`).join("")}
      </ul>
    </div>
  </div>
</section>`
}
