/**
 * THE BOUTIQUE STANDARD
 * Checklist Engine — v1.0 (Stub)
 *
 * This package takes structured audit input and produces
 * a valid ReportCase JSON that feeds both rendering engines.
 *
 * Current state: stub — data comes directly from JSON files.
 *
 * Future state:
 * - Multi-step web form (apps/web/app/(public)/request)
 * - Or: internal studio interface (apps/studio)
 * - Or: NEO dashboard API integration
 *
 * The checklist questions are defined below and map
 * directly to the ReportCase schema fields.
 */

import { ReportCase, makeScore } from "@tbs/schema";

// ─── CHECKLIST SECTIONS ───────────────────────────────────────────────────────

export type ChecklistSection = {
  id: string;
  label: string;
  questions: ChecklistQuestion[];
};

export type ChecklistQuestion = {
  id: string;
  text: string;
  type: "score" | "text" | "bullets" | "boolean";
  mapsTo: string;        // dot-notation path in ReportCase
  required: boolean;
  hint?: string;
};

export const CHECKLIST: ChecklistSection[] = [
  {
    id: "property",
    label: "Property",
    questions: [
      { id: "p-name",     text: "Property name",            type: "text",  mapsTo: "property.name",      required: true },
      { id: "p-location", text: "Location",                 type: "text",  mapsTo: "property.location",  required: true },
      { id: "p-promise",  text: "Core promise statement",   type: "text",  mapsTo: "property.corePromise", required: true, hint: "1–2 sentences from website/marketing" },
      { id: "p-stars",    text: "Star rating",              type: "score", mapsTo: "property.starRating", required: true },
      { id: "p-rooms",    text: "Room count",               type: "text",  mapsTo: "property.roomCount",  required: true },
    ],
  },
  {
    id: "arrival",
    label: "Arrival Experience",
    questions: [
      { id: "arr-score",    text: "Score (0–10)",                  type: "score",   mapsTo: "journey.arrival.score",         required: true },
      { id: "arr-narrative",text: "Narrative observation",          type: "text",    mapsTo: "journey.arrival.narrative",     required: true, hint: "Editorial — what happened, how it felt" },
      { id: "arr-strengths",text: "What worked",                   type: "bullets", mapsTo: "journey.arrival.strengths",     required: true },
      { id: "arr-friction", text: "Friction points",               type: "bullets", mapsTo: "journey.arrival.frictionPoints",required: false },
      { id: "arr-memory",   text: "What guests will likely remember",type: "text", mapsTo: "journey.arrival.guestMemoryImpact",required: true },
    ],
  },
  {
    id: "room",
    label: "Room Experience",
    questions: [
      { id: "room-score",     text: "Score (0–10)",     type: "score",   mapsTo: "journey.room.score",          required: true },
      { id: "room-narrative", text: "Narrative",        type: "text",    mapsTo: "journey.room.narrative",      required: true },
      { id: "room-strengths", text: "What worked",      type: "bullets", mapsTo: "journey.room.strengths",      required: true },
      { id: "room-friction",  text: "Friction points",  type: "bullets", mapsTo: "journey.room.frictionPoints", required: false },
      { id: "room-memory",    text: "Memory impact",    type: "text",    mapsTo: "journey.room.guestMemoryImpact", required: true },
    ],
  },
  {
    id: "dining",
    label: "Dining Experience",
    questions: [
      { id: "din-score",     text: "Score (0–10)",     type: "score",   mapsTo: "journey.dining.score",          required: true },
      { id: "din-narrative", text: "Narrative",        type: "text",    mapsTo: "journey.dining.narrative",      required: true },
      { id: "din-strengths", text: "What worked",      type: "bullets", mapsTo: "journey.dining.strengths",      required: true },
      { id: "din-friction",  text: "Friction points",  type: "bullets", mapsTo: "journey.dining.frictionPoints", required: false },
      { id: "din-memory",    text: "Memory impact",    type: "text",    mapsTo: "journey.dining.guestMemoryImpact", required: true },
    ],
  },
  {
    id: "departure",
    label: "Departure Experience",
    questions: [
      { id: "dep-score",     text: "Score (0–10)",    type: "score",   mapsTo: "journey.departure.score",          required: true },
      { id: "dep-narrative", text: "Narrative",       type: "text",    mapsTo: "journey.departure.narrative",      required: true },
      { id: "dep-strengths", text: "What worked",     type: "bullets", mapsTo: "journey.departure.strengths",      required: true },
      { id: "dep-friction",  text: "Friction points", type: "bullets", mapsTo: "journey.departure.frictionPoints", required: false },
    ],
  },
  {
    id: "dna",
    label: "Experience DNA",
    questions: [
      { id: "dna-warmth",    text: "Warmth (0–10)",            type: "score", mapsTo: "experienceDNA.warmth",           required: true },
      { id: "dna-privacy",   text: "Privacy (0–10)",           type: "score", mapsTo: "experienceDNA.privacy",          required: true },
      { id: "dna-locality",  text: "Locality / Sense of place",type: "score", mapsTo: "experienceDNA.locality",         required: true },
      { id: "dna-design",    text: "Design coherence",         type: "score", mapsTo: "experienceDNA.design",           required: true },
      { id: "dna-luxury",    text: "Luxury expression",        type: "score", mapsTo: "experienceDNA.luxuryExpression", required: true },
      { id: "dna-service",   text: "Service intimacy",         type: "score", mapsTo: "experienceDNA.serviceIntimacy",  required: true },
      { id: "dna-calmness",  text: "Calmness",                 type: "score", mapsTo: "experienceDNA.calmness",         required: true },
    ],
  },
];

// ─── VALIDATION ───────────────────────────────────────────────────────────────

export function validateChecklist(
  data: Record<string, unknown>
): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  for (const section of CHECKLIST) {
    for (const q of section.questions) {
      if (q.required && !data[q.id]) {
        missing.push(`${section.label}: ${q.text}`);
      }
    }
  }

  return { valid: missing.length === 0, missing };
}
