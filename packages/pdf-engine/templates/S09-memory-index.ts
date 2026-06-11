import { ReportCase } from "@tbs/schema"

export function s09MemoryIndex(report: ReportCase): string {
  const positive = report.memoryAnchors.filter((a) => a.type === "positive")
  const negative = report.memoryAnchors.filter((a) => a.type === "negative")

  return `
<section class="tbs-section page-break" style="background:#1C1C1C;color:#F8F5F0;">
  <div class="tbs-header" style="border-bottom:0.5px solid rgba(248,245,240,0.12);">
    <span style="font-size:7pt;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:rgba(248,245,240,0.45);">The Boutique Standard</span>
    <span style="font-size:7pt;color:rgba(248,245,240,0.45);">${report.property.name}</span>
  </div>
  <div style="font-size:7pt;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:rgba(248,245,240,0.45);margin-bottom:8px;">Guest Psychology</div>
  <h2 style="color:#F8F5F0;font-weight:300;margin-bottom:12px;">What Stays After Departure</h2>
  <p style="font-size:10pt;color:rgba(248,245,240,0.6);max-width:520px;line-height:1.7;margin-bottom:32px;">
    Guests do not evaluate hotels as scorecards. They remember experiences as specific emotional moments anchored by feelings rather than facts.
  </p>

  <div class="col-2" style="margin-bottom:32px;">
    <div>
      <div style="font-size:7pt;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#5C6B3E;margin-bottom:16px;">Positive Memory Anchors</div>
      ${positive.map((a) => `
        <div class="no-break" style="padding:16px 0;border-bottom:0.5px solid rgba(248,245,240,0.1);">
          <div style="font-size:10pt;font-weight:500;color:#F8F5F0;margin-bottom:4px;">${a.moment}</div>
          <div style="font-size:9pt;color:rgba(248,245,240,0.55);line-height:1.65;">${a.description}</div>
          ${a.likelyReviewMention ? `<div style="font-size:7pt;color:#4A6FA5;margin-top:6px;letter-spacing:.06em;text-transform:uppercase;">Review signal</div>` : ""}
        </div>
      `).join("")}
    </div>
    <div>
      <div style="font-size:7pt;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#8B6F47;margin-bottom:16px;">Negative Memory Anchors</div>
      ${negative.map((a) => `
        <div class="no-break" style="padding:16px 0;border-bottom:0.5px solid rgba(248,245,240,0.1);">
          <div style="font-size:10pt;font-weight:500;color:#F8F5F0;margin-bottom:4px;">${a.moment}</div>
          <div style="font-size:9pt;color:rgba(248,245,240,0.55);line-height:1.65;">${a.description}</div>
        </div>
      `).join("")}
    </div>
  </div>

  <div style="border-top:0.5px solid rgba(248,245,240,0.15);border-bottom:0.5px solid rgba(248,245,240,0.15);padding:20px 0;">
    <p style="font-family:var(--font-serif);font-size:14pt;font-style:italic;color:#F8F5F0;line-height:1.6;margin:0;">
      The memory gap at ${report.property.name} is not in the quality of the stay itself. It is in the bookends. The strongest experience is concentrated in the middle, while the moments guests remember first and last are currently the weakest.
    </p>
  </div>
</section>`
}
