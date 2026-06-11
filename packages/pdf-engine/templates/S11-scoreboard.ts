import { ReportCase, getBandLabel } from "@tbs/schema"

const BAND_COLOR: Record<string, string> = {
  exceptional: "#5C6B3E",
  strong:      "#4A6FA5",
  acceptable:  "#8B6F47",
  attention:   "#B55A3A",
  critical:    "#8B3A3A",
}

export function s11Scoreboard(report: ReportCase): string {
  const { scoreboard, property } = report

  const rows = [
    { label: "Brand Promise Alignment",  score: scoreboard.brandPromiseAlignment },
    { label: "Pre-Arrival Experience",   score: scoreboard.preArrivalExperience },
    { label: "Arrival Experience",       score: scoreboard.arrivalExperience },
    { label: "Room Experience",          score: scoreboard.roomExperience },
    { label: "Dining Experience",        score: scoreboard.diningExperience },
    { label: "Facilities",               score: scoreboard.facilities },
    { label: "Service Culture",          score: scoreboard.serviceCulture },
    { label: "Experience Continuity",    score: scoreboard.experienceContinuity },
    { label: "Departure Experience",     score: scoreboard.departureExperience },
    { label: "Overall Guest Experience", score: scoreboard.overallGuestExperience },
  ]

  const bandLegend = [
    { range: "9-10", label: "Exceptional" },
    { range: "7-8",  label: "Strong" },
    { range: "5-6",  label: "Acceptable" },
    { range: "3-4",  label: "Attention" },
    { range: "0-2",  label: "Critical" },
  ]

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Detailed Scoring</div>
  <h2 style="margin-bottom:20px;">Full Evaluation</h2>

  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;">
    ${bandLegend.map((b) => `
      <span style="font-size:7pt;font-weight:500;letter-spacing:.08em;text-transform:uppercase;border:0.5px solid var(--color-border);padding:3px 8px;color:var(--color-text-muted);">${b.range} ${b.label}</span>
    `).join("")}
  </div>

  <div style="display:grid;grid-template-columns:1fr;gap:1px;background:var(--color-border);">
    ${rows.map((row, i) => {
      const isOverall = i === rows.length - 1
      const bandColor = BAND_COLOR[row.score.band] ?? "var(--color-accent)"
      return `
        <div style="background:${isOverall ? "var(--color-bg-secondary)" : "var(--color-bg)"};display:grid;grid-template-columns:1fr 120px 52px 100px;gap:16px;padding:${isOverall ? "18px 16px" : "13px 16px"};align-items:center;">
          <div style="font-size:${isOverall ? "11pt" : "10pt"};font-weight:${isOverall ? "500" : "400"};">${row.label}</div>
          <div style="height:2px;background:var(--color-bg-tertiary,#EDE6DC);position:relative;">
            <div style="position:absolute;left:0;top:0;height:100%;width:${row.score.value * 10}%;background:${bandColor};"></div>
          </div>
          <div style="font-family:var(--font-serif);font-size:${isOverall ? "22pt" : "18pt"};color:${bandColor};text-align:right;">${row.score.value}</div>
          <div class="tag" style="color:${bandColor};border-color:${bandColor}33;">${getBandLabel(row.score.band)}</div>
        </div>
      `
    }).join("")}
  </div>
</section>`
}
