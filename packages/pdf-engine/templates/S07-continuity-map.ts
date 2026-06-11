import { ReportCase } from "@tbs/schema"

const STAGE_LABELS: Record<string, string> = {
  discovery:      "Discovery",
  booking:        "Booking",
  preArrival:     "Pre-Arr",
  arrival:        "Arrival",
  room:           "Room",
  dining:         "Dining",
  facilities:     "Facilities",
  serviceCulture: "Service",
  departure:      "Depart",
  postStay:       "Post-Stay",
}

function buildContinuityMapSVG(data: ReportCase["continuityMapData"]): string {
  const W = 560
  const H = 200
  const padL = 20
  const padT = 12
  const padB = 28
  const chartH = H - padT - padB
  const chartW = W - padL - 10
  const n = data.length

  const xOf = (i: number) => padL + (i / (n - 1)) * chartW
  const yOf = (score: number) => padT + (1 - score / 10) * chartH

  // Build fill polygons per segment
  let fills = ""
  for (let i = 0; i < n - 1; i++) {
    const px1 = xOf(i),     py1 = yOf(data[i].promiseScore)
    const px2 = xOf(i + 1), py2 = yOf(data[i + 1].promiseScore)
    const ex1 = xOf(i),     ey1 = yOf(data[i].experienceScore)
    const ex2 = xOf(i + 1), ey2 = yOf(data[i + 1].experienceScore)

    const above1 = data[i].experienceScore >= data[i].promiseScore
    const above2 = data[i + 1].experienceScore >= data[i + 1].promiseScore

    const colorAbove = "rgba(74,111,165,0.18)"
    const colorBelow = "rgba(139,58,58,0.18)"

    if (above1 === above2) {
      fills += `<polygon points="${px1},${py1} ${px2},${py2} ${ex2},${ey2} ${ex1},${ey1}" fill="${above1 ? colorAbove : colorBelow}" />`
    } else {
      // Lines cross - find intersection
      const dProm = py2 - py1
      const dExp  = ey2 - ey1
      const denom = dProm - dExp
      const t = denom !== 0 ? (ey1 - py1) / denom : 0.5
      const cx = px1 + t * (px2 - px1)
      const cy = py1 + t * (py2 - py1)

      fills += `<polygon points="${px1},${py1} ${cx},${cy} ${ex1},${ey1}" fill="${above1 ? colorAbove : colorBelow}" />`
      fills += `<polygon points="${cx},${cy} ${px2},${py2} ${ex2},${ey2}" fill="${above2 ? colorAbove : colorBelow}" />`
    }
  }

  const polyPoints = (scores: number[]) =>
    scores.map((s, i) => `${xOf(i)},${yOf(s)}`).join(" ")

  const promisePoints  = data.map((d) => d.promiseScore)
  const expPoints      = data.map((d) => d.experienceScore)
  const memPoints      = data.map((d) => d.memoryScore)

  const labels = data.map((d, i) => {
    const label = STAGE_LABELS[d.stage] || d.stage
    return `<text x="${xOf(i)}" y="${H - 4}" font-size="6.5" fill="rgba(248,245,240,0.55)" text-anchor="middle" font-family="'DM Sans',sans-serif">${label}</text>`
  }).join("")

  const yAxisLabels = [0, 5, 10].map((v) =>
    `<text x="${padL - 4}" y="${yOf(v) + 2.5}" font-size="6" fill="rgba(248,245,240,0.35)" text-anchor="end" font-family="'DM Sans',sans-serif">${v}</text>`
  ).join("")

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-height:200px;display:block;">
  ${fills}
  <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="rgba(248,245,240,0.12)" stroke-width="0.5"/>
  <polyline points="${polyPoints(promisePoints)}" fill="none" stroke="#8B6F47" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polyline points="${polyPoints(expPoints)}" fill="none" stroke="#4A6FA5" stroke-width="2"/>
  <polyline points="${polyPoints(memPoints)}" fill="none" stroke="rgba(248,245,240,0.55)" stroke-width="1.5" stroke-dasharray="2,3"/>
  ${labels}
  ${yAxisLabels}
</svg>`
}

export function s07ContinuityMap(report: ReportCase): string {
  const svgChart = buildContinuityMapSVG(report.continuityMapData)

  return `
<section class="tbs-section page-break" style="background:#1C1C1C;color:#F8F5F0;">
  <div class="tbs-header" style="border-bottom:0.5px solid rgba(248,245,240,0.12);">
    <span style="font-size:7pt;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:rgba(248,245,240,0.45);">The Boutique Standard</span>
    <span style="font-size:7pt;color:rgba(248,245,240,0.45);">${report.property.name}</span>
  </div>
  <div style="font-size:7pt;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:rgba(248,245,240,0.45);margin-bottom:8px;">Experience Continuity</div>
  <h2 style="color:#F8F5F0;font-weight:300;margin-bottom:8px;">Promise. Experience. Memory.</h2>
  <p style="font-size:10pt;color:rgba(248,245,240,0.6);max-width:520px;line-height:1.7;margin-bottom:32px;">
    The Continuity Map traces three parallel lines across the guest journey. Where the experience line falls below the promise line, a gap exists. Where it rises above, the property exceeds its own standard.
  </p>

  <div style="background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.08);padding:20px;margin-bottom:20px;">
    ${svgChart}
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.06);margin-bottom:24px;">
    ${[
      { color: "#8B6F47", label: "Promise",    desc: "What was communicated before arrival", dash: "5,3" },
      { color: "#4A6FA5", label: "Experience", desc: "What was actually delivered",          dash: "" },
      { color: "rgba(248,245,240,0.55)", label: "Memory", desc: "What remains after departure", dash: "2,3" },
    ].map((item) => `
      <div style="background:rgba(28,28,28,0.8);padding:14px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <svg width="24" height="4" viewBox="0 0 24 4" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="2" x2="24" y2="2" stroke="${item.color}" stroke-width="2" ${item.dash ? `stroke-dasharray="${item.dash}"` : ""}/>
          </svg>
          <span style="font-size:9pt;font-weight:500;color:#F8F5F0;">${item.label}</span>
        </div>
        <div style="font-size:9pt;color:rgba(248,245,240,0.5);">${item.desc}</div>
      </div>
    `).join("")}
  </div>

  <div style="background:rgba(255,255,255,0.06);border:0.5px solid rgba(255,255,255,0.1);padding:18px 20px;">
    <p style="font-family:var(--font-serif);font-size:11pt;font-style:italic;color:#F8F5F0;line-height:1.65;margin:0;">
      ${report.property.name} performs above its promise during the core stay - particularly at dining and service - but falls below promise at the critical transitional moments of arrival and departure. The memory curve reflects this, with strongest formation at breakfast and staff interactions.
    </p>
  </div>
</section>`
}
