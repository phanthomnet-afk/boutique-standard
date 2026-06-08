/**
 * THE BOUTIQUE STANDARD — PDF Template Stubs
 *
 * Each template below is a stub ready to be fleshed out.
 * They return valid HTML and type-check correctly.
 * Build each section in order of report priority.
 *
 * Priority order for implementation:
 * 1. executiveSnapshot (done separately)
 * 2. cover (done separately)
 * 3. continuityMap — the signature visual
 * 4. journeyStage — heart of the report
 * 5. misalignments — high value section
 * 6. neverChange — signature differentiator
 * 7. scoreboard, opportunities, closing
 * 8. observerLetter, framework, propertyContext, promise, experienceDNA
 */

import { ReportCase, JourneyStage, getBandLabel } from "@tbs/schema";

// ─── OBSERVER LETTER ──────────────────────────────────────────────────────────

export function observerLetterSection(report: ReportCase): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">A Stay Observed</div>
  <h2 style="margin-bottom: 32px;">Letter from the Observer</h2>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;">
    <div>
      <p style="font-size: 11pt; line-height: 1.8; margin-bottom: 20px;">
        Over the course of ${report.auditMetadata.stayDuration} days, ${report.property.name} was experienced as a first-time guest.
        The purpose of this audit was not to evaluate operational compliance, nor to measure service against a generic luxury standard.
      </p>
      <p style="font-size: 11pt; line-height: 1.8; margin-bottom: 20px;">
        The objective was to understand whether the experience delivered by the property aligns with the promise it presents to prospective guests.
      </p>
      <p style="font-size: 11pt; line-height: 1.8;">
        Boutique hospitality is rarely remembered because every process is flawless. It is remembered because the experience feels coherent.
        The atmosphere, the service, the spaces, and the moments all contribute to a single emotional impression.
      </p>
    </div>
    <div>
      <div class="img-placeholder" style="height: 240px; margin-bottom: 20px;">
        <span class="img-placeholder-text">[ Property detail — stone, linen, or brass ]</span>
      </div>
      <div class="insight-box">
        <p>Guests rarely remember every detail. They remember how a place made them feel.</p>
      </div>
    </div>
  </div>
</section>`;
}

// ─── FRAMEWORK PAGE ───────────────────────────────────────────────────────────

export function frameworkSection(): string {
  const dimensions = [
    { label: "Promise",     desc: "What the hotel communicates externally — website, booking, photography, brand language." },
    { label: "Expectation", desc: "What guests reasonably assume based on category, price point, and positioning." },
    { label: "Experience",  desc: "What guests actually encounter across every touchpoint — arrival through departure." },
    { label: "Memory",      desc: "What guests are likely to remember, discuss, and reference after departure. The ultimate measure." },
  ];

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">Evaluation Framework</span>
  </div>
  <div class="section-label">How We Evaluate</div>
  <h2 style="margin-bottom: 12px;">The Boutique Standard Model</h2>
  <p style="color: var(--color-text-secondary); max-width: 520px; margin-bottom: 48px;">
    Every report evaluates guest experience through four interconnected dimensions. This ensures observations remain grounded in a coherent methodology rather than personal preference.
  </p>

  <div style="display: grid; grid-template-columns: 1fr; gap: 1px; background: var(--color-border);">
    ${dimensions.map((d, i) => `
      <div style="background: var(--color-bg); display: grid; grid-template-columns: 48px 120px 1fr; gap: 24px; padding: 24px; align-items: start;">
        <div style="font-family: var(--font-serif); font-size: 24pt; color: var(--color-accent); opacity: 0.4; line-height: 1;">${String(i + 1).padStart(2, "0")}</div>
        <div style="font-family: var(--font-serif); font-size: 14pt; font-weight: 500; padding-top: 2px;">${d.label}</div>
        <div style="font-size: 10pt; line-height: 1.7; color: var(--color-text-secondary);">${d.desc}</div>
      </div>
    `).join("")}
  </div>

  <div class="insight-box" style="margin-top: 40px;">
    <p>The strongest hospitality experiences create alignment across all four dimensions. The most significant service failures occur not from operational incompetence, but from a gap between what a property promises and what it consistently delivers.</p>
  </div>

  <div style="margin-top: 40px;">
    <div class="section-label" style="margin-bottom: 12px;">Scoring Guide</div>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--color-border);">
      ${[
        { range: "9–10", label: "Exceptional", desc: "Consistently exceeds the promise." },
        { range: "7–8",  label: "Strong",       desc: "Delivers reliably on the promise." },
        { range: "5–6",  label: "Acceptable",   desc: "Meets basic expectations." },
        { range: "3–4",  label: "Attention",    desc: "Noticeable friction present." },
        { range: "0–2",  label: "Critical",     desc: "Significant misalignment." },
      ].map((s) => `
        <div style="background: var(--color-bg); padding: 16px;">
          <div style="font-family: var(--font-serif); font-size: 16pt; margin-bottom: 4px;">${s.range}</div>
          <div style="font-size: 8pt; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 6px;">${s.label}</div>
          <div style="font-size: 9pt; color: var(--color-text-muted);">${s.desc}</div>
        </div>
      `).join("")}
    </div>
  </div>
</section>`;
}

// ─── PROPERTY CONTEXT ─────────────────────────────────────────────────────────

export function propertyContextSection(report: ReportCase): string {
  const { property, guestProfile } = report;
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Understanding the Property</div>
  <h2 style="margin-bottom: 32px;">Property Context</h2>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
    <div>
      <div class="img-placeholder" style="height: 220px; margin-bottom: 24px;">
        <span class="img-placeholder-text">[ Hotel exterior — Mediterranean stone facade ]</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--color-border); margin-bottom: 24px;">
        ${[
          { label: "Category",  value: property.category.replace("-", " ") },
          { label: "Rating",    value: `${property.starRating}-Star` },
          { label: "Rooms",     value: String(property.roomCount) },
          { label: "Location",  value: property.location },
        ].map((item) => `
          <div style="background: var(--color-bg); padding: 14px;">
            <div class="section-label" style="margin-bottom: 4px;">${item.label}</div>
            <div style="font-size: 10pt;">${item.value}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div>
      <div class="section-label" style="margin-bottom: 12px;">Target Guest Profile</div>
      <ul class="tbs-list" style="margin-bottom: 28px;">
        ${guestProfile.primaryTypes.map((t) => `<li>${t}</li>`).join("")}
      </ul>
      <div class="section-label" style="margin-bottom: 12px;">Core Guest Expectations</div>
      <ul class="tbs-list">
        ${guestProfile.coreExpectations.map((e) => `<li>${e}</li>`).join("")}
      </ul>
    </div>
  </div>
</section>`;
}

// ─── PROMISE ANALYSIS ─────────────────────────────────────────────────────────

export function promiseSection(report: ReportCase): string {
  const { promiseAnalysis, property } = report;
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">The Promise</div>
  <h2 style="margin-bottom: 12px;">What ${property.name} Communicates</h2>
  <div class="accent-line"></div>

  <div class="pull-quote" style="margin: 28px 0 36px;">
    "${promiseAnalysis.coreStatement}"
  </div>

  <p style="color: var(--color-text-secondary); margin-bottom: 36px; max-width: 540px;">
    ${promiseAnalysis.narrative}
  </p>

  <div class="section-label" style="margin-bottom: 16px;">Promise Dimensions</div>
  <div style="display: grid; grid-template-columns: 1fr; gap: 1px; background: var(--color-border);">
    ${promiseAnalysis.dimensions.map((d) => `
      <div style="background: var(--color-bg); display: grid; grid-template-columns: 180px 56px 1fr; gap: 24px; padding: 16px; align-items: center;">
        <div style="font-size: 10pt; font-weight: 500;">${d.label}</div>
        <div style="font-family: var(--font-serif); font-size: 18pt; color: var(--color-accent);">${d.score.value}</div>
        <div style="font-size: 9pt; color: var(--color-text-secondary); line-height: 1.6;">${d.observation}</div>
      </div>
    `).join("")}
  </div>
</section>`;
}

// ─── EXPERIENCE DNA ───────────────────────────────────────────────────────────

export function experienceDNASection(report: ReportCase): string {
  const { experienceDNA, property } = report;
  const dimensions = [
    { key: "warmth",           label: "Warmth" },
    { key: "privacy",          label: "Privacy" },
    { key: "locality",         label: "Locality" },
    { key: "design",           label: "Design" },
    { key: "luxuryExpression", label: "Luxury Expression" },
    { key: "serviceIntimacy",  label: "Service Intimacy" },
    { key: "calmness",         label: "Calmness" },
  ] as const;

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Experience DNA</div>
  <h2 style="margin-bottom: 12px;">Property Identity Fingerprint</h2>
  <p style="color: var(--color-text-secondary); max-width: 520px; margin-bottom: 36px;">
    The Experience DNA captures the identity dimensions that define what kind of property ${property.name} fundamentally is — evaluated against its own positioning, not an external standard.
  </p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;">
    <!-- Radar placeholder -->
    <div class="img-placeholder" style="height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
      <span class="img-placeholder-text">[ Experience DNA Radar Chart ]</span>
      <span class="img-placeholder-text" style="font-size: 8pt;">(generated by charts/dnaWheel.ts)</span>
    </div>

    <!-- Scores -->
    <div>
      ${dimensions.map((d) => {
        const val = experienceDNA[d.key] ?? 0;
        return `
          <div style="display: flex; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 0.5px solid var(--color-border-light);">
            <div style="width: 80px; font-size: 9pt; color: var(--color-text-secondary);">${d.label}</div>
            <div style="flex: 1; height: 2px; background: var(--color-bg-tertiary); position: relative;">
              <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${val * 10}%; background: var(--color-accent);"></div>
            </div>
            <div style="font-family: var(--font-serif); font-size: 14pt; width: 32px; text-align: right;">${val.toFixed(1)}</div>
          </div>
        `;
      }).join("")}
    </div>
  </div>
</section>`;
}

// ─── JOURNEY OVERVIEW ─────────────────────────────────────────────────────────

export function journeyOverviewSection(report: ReportCase): string {
  const { property, journey } = report;
  const stageOrder = ["discovery", "booking", "preArrival", "arrival", "room", "dining", "facilities", "serviceCulture", "departure", "postStay"] as const;

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Guest Journey</div>
  <h2 style="margin-bottom: 32px;">Journey Overview</h2>

  <div style="display: grid; grid-template-columns: 1fr; gap: 1px; background: var(--color-border);">
    ${stageOrder.filter((k) => journey[k]).map((k) => {
      const stage = journey[k]!;
      return `
        <div style="background: var(--color-bg); display: grid; grid-template-columns: 160px 48px 80px 1fr; gap: 20px; padding: 14px 16px; align-items: center;">
          <div style="font-size: 10pt; font-weight: 500;">${stage.label}</div>
          <div style="font-family: var(--font-serif); font-size: 18pt; color: var(--color-accent);">${stage.score.value}</div>
          <div class="tag">${getBandLabel(stage.score.band)}</div>
          <div style="font-size: 9pt; color: var(--color-text-secondary);">${stage.score.note ?? ""}</div>
        </div>
      `;
    }).join("")}
  </div>

  <div class="insight-box" style="margin-top: 32px;">
    <p>The guest experience improves significantly after arrival. The weakest continuity moments occur at the beginning and end of the stay — precisely the moments guests remember most clearly.</p>
  </div>
</section>`;
}

// ─── INDIVIDUAL JOURNEY STAGE ─────────────────────────────────────────────────

export function journeyStageSection(stage: JourneyStage): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${stage.label}</span>
  </div>

  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px;">
    <div>
      <div class="section-label" style="margin-bottom: 4px;">${stage.label}</div>
      <h2 style="margin-bottom: 0;">${stage.label}</h2>
    </div>
    <div style="text-align: right;">
      <div class="score-value">${stage.score.value}</div>
      <div style="font-size: 8pt; color: var(--color-text-muted);">/ 10 · ${getBandLabel(stage.score.band)}</div>
    </div>
  </div>

  <div class="img-placeholder" style="height: 200px; margin-bottom: 28px;">
    <span class="img-placeholder-text">[ ${stage.label} — documentary photograph ]</span>
  </div>

  <p style="font-size: 11pt; line-height: 1.8; margin-bottom: 28px; max-width: 580px;">
    ${stage.narrative}
  </p>

  <div class="col-2" style="margin-bottom: 24px;">
    <div>
      <div class="section-label" style="margin-bottom: 12px;">What Worked</div>
      <ul class="tbs-list">
        ${stage.strengths.map((s) => `<li>${s}</li>`).join("")}
      </ul>
    </div>
    <div>
      <div class="section-label" style="margin-bottom: 12px;">Friction Points</div>
      <ul class="tbs-list">
        ${stage.frictionPoints.length > 0
          ? stage.frictionPoints.map((f) => `<li>${f}</li>`).join("")
          : `<li style="color: var(--color-text-muted);">No significant friction points identified.</li>`}
      </ul>
    </div>
  </div>

  ${stage.guestMemoryImpact ? `
  <div class="insight-box">
    <div class="section-label" style="margin-bottom: 8px;">Memory Impact</div>
    <p>${stage.guestMemoryImpact}</p>
  </div>` : ""}

  ${stage.recommendations.length > 0 ? `
  <div style="margin-top: 24px;">
    <div class="section-label" style="margin-bottom: 12px;">Opportunity</div>
    <p style="font-size: 10pt; line-height: 1.7;">${stage.recommendations[0].suggestion}</p>
  </div>` : ""}
</section>`;
}

// ─── CONTINUITY MAP ───────────────────────────────────────────────────────────

export function continuityMapSection(report: ReportCase): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Signature Analysis</div>
  <h2 style="margin-bottom: 12px;">Experience Continuity Map</h2>
  <p style="color: var(--color-text-secondary); max-width: 520px; margin-bottom: 32px;">
    The Continuity Map traces three parallel lines across the guest journey — the promise communicated, the experience delivered, and the memory formed — revealing where alignment exists and where gaps emerge.
  </p>

  <div class="img-placeholder" style="height: 300px; margin-bottom: 28px;">
    <span class="img-placeholder-text">[ Experience Continuity Map — generated by charts/continuityMap.ts ]</span>
  </div>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--color-border); margin-bottom: 28px;">
    ${[
      { color: "#4A6FA5", label: "Promise", desc: "What was communicated before arrival" },
      { color: "#1C1C1C", label: "Experience", desc: "What was actually delivered" },
      { color: "#8B6F47", label: "Memory", desc: "What remains after departure" },
    ].map((item) => `
      <div style="background: var(--color-bg); padding: 16px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <div style="width: 24px; height: 1.5px; background: ${item.color};"></div>
          <div style="font-size: 9pt; font-weight: 500;">${item.label}</div>
        </div>
        <div style="font-size: 9pt; color: var(--color-text-muted);">${item.desc}</div>
      </div>
    `).join("")}
  </div>

  <div class="insight-box">
    <p>${report.property.name} performs above its promise during the core stay — particularly at dining and service — but falls below promise at the critical transitional moments of arrival and departure. The memory curve reflects this, with strongest memory formation at breakfast and staff interactions.</p>
  </div>
</section>`;
}

// ─── MISALIGNMENTS ────────────────────────────────────────────────────────────

export function misalignmentsSection(report: ReportCase): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Key Findings</div>
  <h2 style="margin-bottom: 12px;">Experience Misalignments</h2>
  <p style="color: var(--color-text-secondary); max-width: 520px; margin-bottom: 36px;">
    Misalignments are identified where a specific communicated promise is not matched by the delivered experience. These are not weaknesses in isolation — they are specific failures of alignment.
  </p>

  ${report.misalignments.map((m, i) => `
    <div class="no-break" style="display: grid; grid-template-columns: 40px 1fr; gap: 20px; padding: 24px 0; border-bottom: 0.5px solid var(--color-border);">
      <div style="font-family: var(--font-serif); font-size: 24pt; color: var(--color-accent); opacity: 0.4; line-height: 1;">
        ${String(i + 1).padStart(2, "0")}
      </div>
      <div>
        <h4 style="margin-bottom: 16px;">${m.title}</h4>
        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 12px; margin-bottom: 10px; font-size: 9pt;">
          <div style="color: var(--color-text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; padding-top: 2px;">Promise</div>
          <div style="color: var(--color-text-secondary);">${m.promise}</div>
        </div>
        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 12px; margin-bottom: 10px; font-size: 9pt;">
          <div style="color: var(--color-text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; padding-top: 2px;">Reality</div>
          <div style="color: var(--color-text-secondary);">${m.reality}</div>
        </div>
        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 12px; margin-bottom: 10px; font-size: 9pt;">
          <div style="color: var(--color-text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; padding-top: 2px;">Impact</div>
          <div style="color: var(--color-text-secondary);">${m.guestImpact}</div>
        </div>
        <div style="display: grid; grid-template-columns: 80px 1fr; gap: 12px; font-size: 9pt;">
          <div style="color: var(--color-accent); font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; padding-top: 2px;">Action</div>
          <div style="color: var(--color-text-secondary);">${m.recommendation}</div>
        </div>
      </div>
    </div>
  `).join("")}
</section>`;
}

// ─── MEMORY ANALYSIS ──────────────────────────────────────────────────────────

export function memorySection(report: ReportCase): string {
  const positive = report.memoryAnchors.filter((a) => a.type === "positive");
  const negative = report.memoryAnchors.filter((a) => a.type === "negative");

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Guest Psychology</div>
  <h2 style="margin-bottom: 12px;">What Guests Will Remember</h2>
  <p style="color: var(--color-text-secondary); max-width: 520px; margin-bottom: 36px;">
    Guests do not evaluate hotels as scorecards. They evaluate them as experiences — and they remember those experiences as a collection of specific emotional moments anchored by feelings rather than facts.
  </p>

  <div class="col-2" style="margin-bottom: 32px;">
    <div>
      <div class="section-label" style="color: var(--color-olive); margin-bottom: 16px;">Positive Memory Anchors</div>
      ${positive.map((a) => `
        <div class="no-break" style="padding: 16px 0; border-bottom: 0.5px solid var(--color-border-light);">
          <div style="font-size: 10pt; font-weight: 500; margin-bottom: 4px;">${a.moment}</div>
          <div style="font-size: 9pt; color: var(--color-text-secondary); line-height: 1.6;">${a.description}</div>
          ${a.likelyReviewMention ? `<div style="font-size: 8pt; color: var(--color-accent); margin-top: 4px; letter-spacing: 0.06em;">HIGH LIKELIHOOD OF REVIEW MENTION</div>` : ""}
        </div>
      `).join("")}
    </div>
    <div>
      <div class="section-label" style="color: var(--color-bronze); margin-bottom: 16px;">Negative Memory Anchors</div>
      ${negative.map((a) => `
        <div class="no-break" style="padding: 16px 0; border-bottom: 0.5px solid var(--color-border-light);">
          <div style="font-size: 10pt; font-weight: 500; margin-bottom: 4px;">${a.moment}</div>
          <div style="font-size: 9pt; color: var(--color-text-secondary); line-height: 1.6;">${a.description}</div>
        </div>
      `).join("")}
    </div>
  </div>

  <div class="insight-box">
    <p>The memory gap at ${report.property.name} is not in the quality of the stay itself. It is in the bookends. The strongest experience is concentrated in the middle, while the moments guests remember first and last — arrival and departure — are currently the weakest.</p>
  </div>
</section>`;
}

// ─── WHAT SHOULD NEVER CHANGE ─────────────────────────────────────────────────

export function neverChangeSection(report: ReportCase): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Protection Framework</div>
  <h2 style="margin-bottom: 12px;">What Should Never Change</h2>
  <p style="color: var(--color-text-secondary); max-width: 540px; margin-bottom: 36px;">
    Most reports focus exclusively on what should improve. The Boutique Standard considers this insufficient. The qualities that make a property genuinely distinctive are rarely listed in guest feedback — guests only notice when they are gone.
  </p>

  ${report.neverChangeElements.map((el, i) => `
    <div class="no-break" style="display: grid; grid-template-columns: 24px 1fr 80px; gap: 24px; padding: 24px 0; border-bottom: 0.5px solid var(--color-border);">
      <div style="font-size: 9pt; color: var(--color-text-muted); padding-top: 2px;">0${i + 1}</div>
      <div>
        <h4 style="margin-bottom: 8px;">${el.element}</h4>
        <p style="font-size: 10pt; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 10px;">${el.rationale}</p>
        <p style="font-size: 9pt; color: var(--color-text-muted); line-height: 1.6; font-style: italic;">Risk if lost: ${el.riskIfLost}</p>
      </div>
      <div style="text-align: right;">
        <div class="tag" style="border-color: ${el.priority === "high" ? "var(--color-accent)" : "var(--color-border)"}; color: ${el.priority === "high" ? "var(--color-accent)" : "var(--color-text-muted)"};">
          ${el.priority.toUpperCase()}
        </div>
      </div>
    </div>
  `).join("")}
</section>`;
}

// ─── SCOREBOARD ───────────────────────────────────────────────────────────────

export function scoreboardSection(report: ReportCase): string {
  const { scoreboard, property } = report;
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
  ];

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${property.name}</span>
  </div>
  <div class="section-label">Detailed Scoring</div>
  <h2 style="margin-bottom: 36px;">Scoreboard</h2>

  <div style="display: grid; grid-template-columns: 1fr; gap: 1px; background: var(--color-border);">
    ${rows.map((row, i) => {
      const isOverall = i === rows.length - 1;
      return `
        <div style="background: ${isOverall ? "var(--color-bg-secondary)" : "var(--color-bg)"}; display: grid; grid-template-columns: 1fr 56px 100px 1fr; gap: 20px; padding: ${isOverall ? "20px 16px" : "14px 16px"}; align-items: center;">
          <div style="font-size: ${isOverall ? "11pt" : "10pt"}; font-weight: ${isOverall ? "500" : "400"};">${row.label}</div>
          <div style="font-family: var(--font-serif); font-size: ${isOverall ? "22pt" : "18pt"}; color: var(--color-accent);">${row.score.value}</div>
          <div class="tag">${getBandLabel(row.score.band)}</div>
          <div style="font-size: 9pt; color: var(--color-text-muted);">${row.score.note ?? ""}</div>
        </div>
      `;
    }).join("")}
  </div>
</section>`;
}

// ─── OPPORTUNITIES ────────────────────────────────────────────────────────────

export function opportunitiesSection(report: ReportCase): string {
  const sorted = [...report.recommendations].sort((a, b) => a.priority - b.priority);
  const quickWins = sorted.filter((r) => r.isQuickWin);
  const strategic = sorted.filter((r) => !r.isQuickWin);

  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Recommendations</div>
  <h2 style="margin-bottom: 12px;">Opportunities</h2>
  <p style="color: var(--color-text-secondary); max-width: 520px; margin-bottom: 36px;">
    Ranked by potential guest impact. Presented as directions, not implementation plans — the property leadership is best placed to determine timing and execution approach.
  </p>

  ${quickWins.length > 0 ? `
  <div class="section-label" style="color: var(--color-olive); margin-bottom: 16px;">Quick Wins — Achievable within 30 days</div>
  ${quickWins.map((r) => `
    <div class="no-break" style="padding: 20px 0; border-bottom: 0.5px solid var(--color-border);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <h4>${r.title}</h4>
        <div style="display: flex; gap: 8px;">
          <span class="tag">Cost: ${r.estimatedCost}</span>
          <span class="tag">Effort: ${r.difficulty}</span>
        </div>
      </div>
      <p style="font-size: 9pt; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 8px;">${r.suggestion}</p>
      <p style="font-size: 9pt; color: var(--color-text-muted);">Expected: ${r.expectedOutcome}</p>
    </div>
  `).join("")}` : ""}

  ${strategic.length > 0 ? `
  <div class="section-label" style="color: var(--color-bronze); margin-top: 32px; margin-bottom: 16px;">Experience Enhancements</div>
  ${strategic.map((r) => `
    <div class="no-break" style="padding: 20px 0; border-bottom: 0.5px solid var(--color-border);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <h4>${r.title}</h4>
        <div style="display: flex; gap: 8px;">
          <span class="tag">Cost: ${r.estimatedCost}</span>
          <span class="tag">Effort: ${r.difficulty}</span>
        </div>
      </div>
      <p style="font-size: 9pt; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 8px;">${r.suggestion}</p>
      <p style="font-size: 9pt; color: var(--color-text-muted);">Expected: ${r.expectedOutcome}</p>
    </div>
  `).join("")}` : ""}
</section>`;
}

// ─── CLOSING ASSESSMENT ───────────────────────────────────────────────────────

export function closingSection(report: ReportCase): string {
  return `
<section class="tbs-section page-break">
  <div class="tbs-header">
    <span class="tbs-header-brand">The Boutique Standard</span>
    <span class="tbs-header-property">${report.property.name}</span>
  </div>
  <div class="section-label">Final Assessment</div>
  <h2 style="margin-bottom: 32px;">Closing</h2>

  <div class="pull-quote" style="margin-bottom: 36px;">
    ${report.closingAssessment.split(". ").slice(0, 2).join(". ")}.
  </div>

  <p style="font-size: 11pt; line-height: 1.8; margin-bottom: 32px; max-width: 580px;">
    ${report.closingAssessment}
  </p>

  <div class="accent-line" style="margin: 32px 0;"></div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
    <div>
      <div class="section-label" style="margin-bottom: 16px;">Audit Summary</div>
      ${[
        { label: "Promise Score",          value: report.overallAlignmentScore.value },
        { label: "Expectation Alignment",  value: report.continuityScore.value },
        { label: "Experience Score",       value: report.experienceScore.value },
        { label: "Memory Score",           value: report.memoryImpactScore.value },
        { label: "Overall Alignment",      value: report.overallAlignmentScore.value },
      ].map((item) => `
        <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 0.5px solid var(--color-border-light);">
          <div style="font-size: 10pt; color: var(--color-text-secondary);">${item.label}</div>
          <div style="font-family: var(--font-serif); font-size: 14pt;">${item.value}</div>
        </div>
      `).join("")}
    </div>
    <div>
      <div class="section-label" style="margin-bottom: 16px;">Recommendation Status</div>
      <div class="tag" style="margin-bottom: 16px;">Strongly Recommended for Continued Refinement</div>
      <p style="font-size: 9pt; color: var(--color-text-secondary); line-height: 1.7;">
        The foundations are strong. The identity is clear. The guest experience is already compelling. With targeted improvements, ${report.property.name} can move from an excellent boutique experience to a truly memorable one.
      </p>
    </div>
  </div>

  <div style="margin-top: 64px; padding-top: 24px; border-top: 0.5px solid var(--color-border);">
    <div class="section-label">Prepared by</div>
    <p style="font-family: var(--font-serif); font-size: 14pt; margin-top: 4px;">The Boutique Standard</p>
    <p style="font-size: 9pt; color: var(--color-text-muted);">Independent Guest Experience Intelligence · theboutiquestandard.com</p>
    <p style="font-size: 8pt; color: var(--color-text-muted); margin-top: 12px;">This report is confidential and prepared exclusively for the property named herein.</p>
  </div>
</section>`;
}
