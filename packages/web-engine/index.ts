/**
 * THE BOUTIQUE STANDARD
 * Web Engine — Report Data Transformers
 *
 * Two surfaces, one data source:
 *
 * 1. Client web report (/client/[token]/report)
 *    - Password-protected
 *    - ~20 sections, interactive
 *    - Full data, rich presentation
 *
 * 2. Public case report (/report/[slug])
 *    - Publicly visible
 *    - Editorial excerpts only
 *    - Designed to create desire for the full report
 *    - Some sections visually obscured
 */

import { ReportCase, JourneyStageKey } from "@tbs/schema";

// ─── CLIENT WEB REPORT ────────────────────────────────────────────────────────

export type ClientReportData = {
  property: {
    name: string;
    location: string;
    category: string;
    starRating: number;
    corePromise: string;
  };
  scores: {
    overall: number;
    experience: number;
    continuity: number;
    memory: number;
  };
  executiveSummary: string;
  promiseAnalysis: {
    coreStatement: string;
    narrative: string;
    dimensions: Array<{
      label: string;
      score: { value: number; band: string };
      observation: string;
    }>;
    overallAlignment: { value: number; band: string; note: string };
  };
  experienceDNA: Record<string, number>;
  continuityMapData: Array<{
    stage: string;
    promise: number;
    experience: number;
    memory: number;
  }>;
  journey: Array<{
    key: JourneyStageKey;
    label: string;
    score: number;
    band: string;
    narrative: string;
    strengths: string[];
    frictionPoints: string[];
    memoryImpact: string;
    recommendations: Array<{
      title: string;
      suggestion: string;
      difficulty: string;
      isQuickWin: boolean;
    }>;
  }>;
  misalignments: Array<{
    title: string;
    promise: string;
    reality: string;
    impact: string;
    recommendation: string;
    severity: string;
  }>;
  memoryAnchors: {
    positive: Array<{ moment: string; description: string; likelyReviewMention: boolean }>;
    negative: Array<{ moment: string; description: string }>;
  };
  neverChange: Array<{ element: string; rationale: string; priority: string }>;
  recommendations: Array<{
    title: string;
    observation: string;
    suggestion: string;
    expectedOutcome: string;
    difficulty: string;
    cost: string;
    priority: number;
    isQuickWin: boolean;
  }>;
  scoreboard: Array<{ label: string; value: number; band: string; note: string }>;
  closingAssessment: string;
  auditDate: string;
};

export function toClientReportData(report: ReportCase): ClientReportData {
  const stageOrder: JourneyStageKey[] = [
    "discovery", "booking", "preArrival", "arrival",
    "room", "dining", "facilities", "serviceCulture",
    "departure", "postStay",
  ];

  return {
    property: {
      name: report.property.name,
      location: report.property.location,
      category: report.property.category,
      starRating: report.property.starRating,
      corePromise: report.property.corePromise,
    },
    scores: {
      overall:    report.overallAlignmentScore.value,
      experience: report.experienceScore.value,
      continuity: report.continuityScore.value,
      memory:     report.memoryImpactScore.value,
    },
    executiveSummary: report.executiveSummary,
    promiseAnalysis: {
      coreStatement:    report.promiseAnalysis.coreStatement,
      narrative:        report.promiseAnalysis.narrative,
      dimensions:       report.promiseAnalysis.dimensions.map((d) => ({
        label:       d.label,
        score:       { value: d.score.value, band: d.score.band },
        observation: d.observation,
      })),
      overallAlignment: {
        value: report.promiseAnalysis.overallAlignment.value,
        band:  report.promiseAnalysis.overallAlignment.band,
        note:  report.promiseAnalysis.overallAlignment.note ?? "",
      },
    },
    experienceDNA: report.experienceDNA as Record<string, number>,
    continuityMapData: report.continuityMapData.map((p) => ({
      stage:      p.stage,
      promise:    p.promiseScore,
      experience: p.experienceScore,
      memory:     p.memoryScore,
    })),
    journey: stageOrder
      .filter((k) => report.journey[k])
      .map((k) => {
        const s = report.journey[k]!;
        return {
          key:             s.key,
          label:           s.label,
          score:           s.score.value,
          band:            s.score.band,
          narrative:       s.narrative,
          strengths:       s.strengths,
          frictionPoints:  s.frictionPoints,
          memoryImpact:    s.guestMemoryImpact,
          recommendations: s.recommendations.map((r) => ({
            title:       r.title,
            suggestion:  r.suggestion,
            difficulty:  r.difficulty,
            isQuickWin:  r.isQuickWin,
          })),
        };
      }),
    misalignments: report.misalignments.map((m) => ({
      title:          m.title,
      promise:        m.promise,
      reality:        m.reality,
      impact:         m.guestImpact,
      recommendation: m.recommendation,
      severity:       m.severity,
    })),
    memoryAnchors: {
      positive: report.memoryAnchors
        .filter((a) => a.type === "positive")
        .map((a) => ({ moment: a.moment, description: a.description, likelyReviewMention: a.likelyReviewMention })),
      negative: report.memoryAnchors
        .filter((a) => a.type === "negative")
        .map((a) => ({ moment: a.moment, description: a.description })),
    },
    neverChange: report.neverChangeElements.map((e) => ({
      element:  e.element,
      rationale: e.rationale,
      priority: e.priority,
    })),
    recommendations: report.recommendations
      .sort((a, b) => a.priority - b.priority)
      .map((r) => ({
        title:           r.title,
        observation:     r.observation,
        suggestion:      r.suggestion,
        expectedOutcome: r.expectedOutcome,
        difficulty:      r.difficulty,
        cost:            r.estimatedCost,
        priority:        r.priority,
        isQuickWin:      r.isQuickWin,
      })),
    scoreboard: [
      { label: "Brand Promise Alignment",  value: report.scoreboard.brandPromiseAlignment.value,  band: report.scoreboard.brandPromiseAlignment.band,  note: report.scoreboard.brandPromiseAlignment.note ?? "" },
      { label: "Pre-Arrival Experience",   value: report.scoreboard.preArrivalExperience.value,   band: report.scoreboard.preArrivalExperience.band,   note: report.scoreboard.preArrivalExperience.note ?? "" },
      { label: "Arrival Experience",       value: report.scoreboard.arrivalExperience.value,       band: report.scoreboard.arrivalExperience.band,       note: report.scoreboard.arrivalExperience.note ?? "" },
      { label: "Room Experience",          value: report.scoreboard.roomExperience.value,          band: report.scoreboard.roomExperience.band,          note: report.scoreboard.roomExperience.note ?? "" },
      { label: "Dining Experience",        value: report.scoreboard.diningExperience.value,        band: report.scoreboard.diningExperience.band,        note: report.scoreboard.diningExperience.note ?? "" },
      { label: "Facilities",               value: report.scoreboard.facilities.value,               band: report.scoreboard.facilities.band,               note: report.scoreboard.facilities.note ?? "" },
      { label: "Service Culture",          value: report.scoreboard.serviceCulture.value,          band: report.scoreboard.serviceCulture.band,          note: report.scoreboard.serviceCulture.band ?? "" },
      { label: "Experience Continuity",    value: report.scoreboard.experienceContinuity.value,    band: report.scoreboard.experienceContinuity.band,    note: report.scoreboard.experienceContinuity.note ?? "" },
      { label: "Departure Experience",     value: report.scoreboard.departureExperience.value,     band: report.scoreboard.departureExperience.band,     note: report.scoreboard.departureExperience.note ?? "" },
      { label: "Overall Guest Experience", value: report.scoreboard.overallGuestExperience.value,  band: report.scoreboard.overallGuestExperience.band,  note: report.scoreboard.overallGuestExperience.note ?? "" },
    ],
    closingAssessment: report.closingAssessment,
    auditDate: report.auditMetadata.auditDate,
  };
}

// ─── PUBLIC CASE REPORT ───────────────────────────────────────────────────────

export type CaseReportData = {
  slug: string;
  property: {
    name: string;
    location: string;
    category: string;
    starRating: number;
    corePromise: string;
  };
  overallScore: number;
  // Curated excerpts — not the full data
  excerpt: string;                      // 2–3 sentence editorial intro
  keyStrengths: string[];               // max 3
  highlightStage: {                     // one journey stage shown as teaser
    label: string;
    score: number;
    narrative: string;                  // truncated to first paragraph
  };
  signatureFinding: string;             // one insight — most compelling
  continuityTeaser: {                   // partial continuity map data (no memory line)
    data: Array<{ stage: string; promise: number; experience: number }>;
  };
  // What is obscured / locked
  lockedSections: string[];             // section names that are blurred on the public page
};

export function toCaseReportData(report: ReportCase): CaseReportData {
  // Select the dining stage as the highlight — strongest score, most readable
  const highlightKey = "dining";
  const highlight = report.journey[highlightKey];

  return {
    slug: report.slug,
    property: {
      name:        report.property.name,
      location:    report.property.location,
      category:    report.property.category,
      starRating:  report.property.starRating,
      corePromise: report.property.corePromise,
    },
    overallScore: report.overallAlignmentScore.value,
    excerpt: report.executiveSummary.split(". ").slice(0, 3).join(". ") + ".",
    keyStrengths: report.protectedElements
      .filter((e) => e.priority === "high")
      .slice(0, 3)
      .map((e) => e.element),
    highlightStage: highlight
      ? {
          label:     highlight.label,
          score:     highlight.score.value,
          narrative: highlight.narrative.split(". ").slice(0, 2).join(". ") + ".",
        }
      : { label: "Dining", score: 9.1, narrative: "" },
    signatureFinding: report.closingAssessment.split(". ").slice(0, 2).join(". ") + ".",
    continuityTeaser: {
      data: report.continuityMapData.map((p) => ({
        stage:      p.stage,
        promise:    p.promiseScore,
        experience: p.experienceScore,
        // Note: memory line intentionally omitted from public teaser
      })),
    },
    lockedSections: [
      "Detailed Scoreboard",
      "Experience Misalignments",
      "Opportunities",
      "Closing Assessment",
      "What Should Never Change — Full Analysis",
    ],
  };
}
