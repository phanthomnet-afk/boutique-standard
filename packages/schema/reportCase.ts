/**
 * THE BOUTIQUE STANDARD
 * Core Report Schema — v1.0
 *
 * This is the contract. Every engine (PDF, web report, case report)
 * consumes this shape. Nothing is hardcoded in renderers.
 *
 * Produced by: packages/checklist (audit input engine)
 * Consumed by: packages/pdf-engine, packages/web-engine
 */

// ─── SCORING ──────────────────────────────────────────────────────────────────

export type ScoreBand =
  | "exceptional"   // 9–10
  | "strong"        // 7–8
  | "acceptable"    // 5–6
  | "attention"     // 3–4
  | "critical";     // 0–2

export type Score = {
  value: number;           // 0–10, one decimal place
  band: ScoreBand;
  note?: string;           // short interpretive sentence
};

// ─── PROPERTY ─────────────────────────────────────────────────────────────────

export type PropertyCategory =
  | "boutique-luxury"
  | "design-hotel"
  | "wellness-retreat"
  | "coastal-retreat"
  | "urban-boutique"
  | "countryside-retreat";

export type Property = {
  name: string;
  location: string;
  country: string;
  category: PropertyCategory;
  starRating: 3 | 4 | 5;
  roomCount: number;
  averageRateEur?: number;
  corePromise: string;         // 1–2 sentence promise statement
  website?: string;
};

// ─── GUEST PROFILE ────────────────────────────────────────────────────────────

export type GuestProfile = {
  primaryTypes: string[];      // e.g. ["design-conscious travellers", "couples 35–65"]
  coreExpectations: string[];  // what they expect before arrival
  motivations: string[];       // why they chose this property
};

// ─── EXPERIENCE DNA ───────────────────────────────────────────────────────────

export type ExperienceDNA = {
  warmth: number;           // 0–10
  privacy: number;          // 0–10
  locality: number;         // 0–10
  design: number;           // 0–10
  luxuryExpression: number; // 0–10
  serviceIntimacy: number;  // 0–10
  calmness: number;         // 0–10
  energy?: number;          // 0–10 (optional — relevant for social/active properties)
};

// ─── JOURNEY STAGES ───────────────────────────────────────────────────────────

export type JourneyStageKey =
  | "discovery"
  | "booking"
  | "preArrival"
  | "arrival"
  | "room"
  | "dining"
  | "facilities"
  | "serviceCulture"
  | "departure"
  | "postStay";

export type JourneyStage = {
  key: JourneyStageKey;
  label: string;             // display name
  score: Score;
  narrative: string;         // editorial observation paragraph(s)
  strengths: string[];
  frictionPoints: string[];
  guestMemoryImpact: string; // what guests likely remember from this stage
  recommendations: Recommendation[];
};

// ─── MISALIGNMENT ─────────────────────────────────────────────────────────────

export type MisalignmentSeverity = "high" | "medium" | "low";

export type Misalignment = {
  id: string;
  title: string;
  promise: string;           // what the hotel communicated
  reality: string;           // what actually happened
  guestImpact: string;       // how this affects the guest
  severity: MisalignmentSeverity;
  recommendation: string;
};

// ─── MEMORY ANCHORS ───────────────────────────────────────────────────────────

export type MemoryAnchor = {
  moment: string;            // e.g. "Breakfast on the terrace"
  description: string;
  type: "positive" | "negative" | "neutral";
  likelyReviewMention: boolean;
};

// ─── PROTECTION ELEMENTS ──────────────────────────────────────────────────────

export type ProtectionPriority = "high" | "medium" | "low";

export type ProtectedElement = {
  element: string;           // e.g. "Human warmth"
  rationale: string;         // why this must be preserved
  priority: ProtectionPriority;
  riskIfLost: string;        // what happens if this erodes
};

// ─── RECOMMENDATIONS ──────────────────────────────────────────────────────────

export type RecommendationDifficulty = "low" | "medium" | "high";
export type RecommendationPriority = 1 | 2 | 3 | 4 | 5;

export type Recommendation = {
  id: string;
  title: string;
  observation: string;
  guestImpact: string;
  suggestion: string;
  expectedOutcome: string;
  difficulty: RecommendationDifficulty;
  estimatedCost: "low" | "medium" | "high";
  priority: RecommendationPriority;
  isQuickWin: boolean;       // achievable within 30 days at low cost
};

// ─── PROMISE ANALYSIS ─────────────────────────────────────────────────────────

export type PromiseDimension = {
  label: string;             // e.g. "Discretion", "Personal attention"
  score: Score;
  observation: string;
};

export type PromiseAnalysis = {
  coreStatement: string;     // extracted promise statement from hotel comms
  dimensions: PromiseDimension[];
  overallAlignment: Score;
  narrative: string;         // editorial analysis of the promise
};

// ─── CONTINUITY MAP DATA ──────────────────────────────────────────────────────

export type ContinuityPoint = {
  stage: JourneyStageKey;
  promiseScore: number;      // what was promised at this stage
  experienceScore: number;   // what was delivered
  memoryScore: number;       // what remains in memory
};

// ─── SCOREBOARD ───────────────────────────────────────────────────────────────

export type Scoreboard = {
  brandPromiseAlignment: Score;
  preArrivalExperience: Score;
  arrivalExperience: Score;
  roomExperience: Score;
  diningExperience: Score;
  facilities: Score;
  serviceCulture: Score;
  experienceContinuity: Score;
  departureExperience: Score;
  overallGuestExperience: Score;
};

// ─── AUDIT METADATA ───────────────────────────────────────────────────────────

export type AuditMetadata = {
  auditDate: string;         // ISO date string
  reportDate: string;        // ISO date string
  reportVersion: string;     // e.g. "1.0"
  auditorProfile: string;    // guest profile used (not auditor name)
  stayDuration: number;      // nights
  roomCategory: string;      // type of room audited
  scope: string[];           // touchpoints included in audit
};

// ─── ASSETS (IMAGE PLACEHOLDERS) ─────────────────────────────────────────────

export type AssetPlaceholder = {
  id: string;
  section: string;           // which report section this belongs to
  description: string;       // what should go here
  aspectRatio: "16:9" | "4:3" | "1:1" | "3:4" | "2:3";
  url?: string;              // populated when real image is available
  alt?: string;
};

// ─── ROOT REPORT CASE ─────────────────────────────────────────────────────────

export type ReportCase = {
  id: string;                // e.g. "mdr-001"
  slug: string;              // e.g. "maison-du-rivage" — used in URLs
  language: "en" | "da";

  // Visibility control
  isPublicCase: boolean;     // whether this appears on /report
  clientToken?: string;      // hashed token for /client/[token]/report access

  property: Property;
  guestProfile: GuestProfile;
  auditMetadata: AuditMetadata;

  // Core framework scores
  overallAlignmentScore: Score;
  experienceScore: Score;
  continuityScore: Score;
  memoryImpactScore: Score;

  // Analysis layers
  promiseAnalysis: PromiseAnalysis;
  experienceDNA: ExperienceDNA;
  journey: Partial<Record<JourneyStageKey, JourneyStage>>;
  continuityMapData: ContinuityPoint[];

  // Key findings
  misalignments: Misalignment[];
  memoryAnchors: MemoryAnchor[];
  protectedElements: ProtectedElement[];
  recommendations: Recommendation[];

  // Narrative
  executiveSummary: string;
  closingAssessment: string;
  scoreboard: Scoreboard;

  // Assets
  assets: AssetPlaceholder[];

  // What should never change — the signature section
  neverChangeElements: ProtectedElement[];
};

// ─── SCORE HELPERS ────────────────────────────────────────────────────────────

export function getBand(value: number): ScoreBand {
  if (value >= 9) return "exceptional";
  if (value >= 7) return "strong";
  if (value >= 5) return "acceptable";
  if (value >= 3) return "attention";
  return "critical";
}

export function getBandLabel(band: ScoreBand): string {
  const labels: Record<ScoreBand, string> = {
    exceptional: "Exceptional",
    strong: "Strong",
    acceptable: "Acceptable",
    attention: "Requires Attention",
    critical: "Critical",
  };
  return labels[band];
}

export function makeScore(value: number, note?: string): Score {
  return { value, band: getBand(value), note };
}
