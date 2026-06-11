import { ReportCase, JourneyStage, getBandLabel } from "@tbs/schema"
import { findImage, imgOrPlaceholder } from "./imageHelper"

const STAGE_IMAGES: Record<string, string> = {
  arrival:        "/images/reports/maison-du-rivage/arrival-approach--arrival--16x9",
  room:           "/images/reports/maison-du-rivage/guest-room--room--16x9",
  dining:         "/images/reports/maison-du-rivage/breakfast-dining-room--dining--16x9",
  facilities:     "/images/reports/maison-du-rivage/pool-area--facilities--16x9",
  serviceCulture: "/images/reports/maison-du-rivage/reception-desk--arrival--4x3",
  departure:      "/images/reports/maison-du-rivage/cover-exterior--cover--16x9",
}

function stageSection(stage: JourneyStage): string {
  const imgBase = STAGE_IMAGES[stage.key ?? ""]
  const imgSrc = imgBase ? findImage(imgBase) : null
  const imgHtml = imgOrPlaceholder(
    imgSrc,
    `${stage.label} - documentary photograph`,
    "width:100%;height:180px;object-fit:cover;margin-bottom:24px;"
  )

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${stage.label}</span>
  </div>

  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
    <div>
      <div class="section-label" style="margin-bottom:4px;">${stage.label}</div>
      <h2 style="margin-bottom:0;">${stage.label}</h2>
    </div>
    <div style="text-align:right;">
      <div class="score-value">${stage.score.value}</div>
      <div style="font-size:8pt;color:var(--color-text-muted);">/ 10 &middot; ${getBandLabel(stage.score.band)}</div>
    </div>
  </div>

  ${imgHtml}

  <p style="font-size:10pt;line-height:1.75;margin-bottom:24px;max-width:580px;">
    ${stage.narrative}
  </p>

  <div class="col-2" style="margin-bottom:20px;">
    <div>
      <div class="section-label" style="margin-bottom:12px;">What Worked</div>
      <ul class="tbs-list">
        ${stage.strengths.map((s) => `<li>${s}</li>`).join("")}
      </ul>
    </div>
    <div>
      <div class="section-label" style="margin-bottom:12px;">Friction Points</div>
      <ul class="tbs-list">
        ${stage.frictionPoints.length > 0
          ? stage.frictionPoints.map((f) => `<li>${f}</li>`).join("")
          : `<li style="color:var(--color-text-muted);">No significant friction points identified.</li>`}
      </ul>
    </div>
  </div>

  ${stage.guestMemoryImpact ? `
  <div style="background:var(--color-bg-secondary,#F2EDE6);border-left:2px solid #8B6F47;padding:14px 18px;margin-bottom:16px;">
    <div class="section-label" style="margin-bottom:6px;color:#8B6F47;">Memory Impact</div>
    <p style="font-size:10pt;line-height:1.7;">${stage.guestMemoryImpact}</p>
  </div>` : ""}

  ${stage.recommendations.length > 0 ? `
  <div>
    <div class="section-label" style="margin-bottom:8px;">Priority Opportunity</div>
    <p style="font-size:10pt;line-height:1.7;color:var(--color-text-secondary);">${stage.recommendations[0].suggestion}</p>
  </div>` : ""}
</section>`
}

const NARRATIVE_STAGES = [
  "arrival", "room", "dining", "facilities", "serviceCulture", "departure",
] as const

export function s06JourneyNarratives(report: ReportCase): string {
  return NARRATIVE_STAGES
    .filter((k) => report.journey[k])
    .map((k) => stageSection(report.journey[k]!))
    .join("\n\n")
}
