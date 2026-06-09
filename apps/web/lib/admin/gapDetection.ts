export interface Gap {
  promise: string
  friction: string
  severity: "high" | "medium" | "low"
  type: "perception" | "visual" | "locality" | "differentiation"
}

interface IntelligenceInput {
  brandPromises: string[] | string
  reviewNegativeThemes?: string[] | string | null
  visualCoherenceScore?: number | null
  localityStrength?: string | null
  serviceLanguage?: string[] | string | null
}

const GENERIC_SERVICE_WORDS = [
  "excellent",
  "great",
  "good",
  "nice",
  "friendly",
  "clean",
  "comfortable",
  "professional",
  "attentive",
  "helpful",
]

function semanticOverlap(promise: string, friction: string): boolean {
  const promiseWords = promise.toLowerCase().split(/\W+/)
  const frictionWords = friction.toLowerCase().split(/\W+/)

  const positiveTerms = ["personalised", "personal", "intimate", "local", "character",
    "design", "quiet", "service", "arrival", "breakfast", "view", "location",
    "staff", "room", "experience", "atmosphere", "authentic"]

  return positiveTerms.some(
    (term) =>
      (promiseWords.includes(term) || promise.toLowerCase().includes(term)) &&
      friction.toLowerCase().includes(term)
  )
}

export function detectGaps(intelligence: IntelligenceInput): Gap[] {
  const gaps: Gap[] = []

  const negativeThemes: string[] = (() => {
    const raw = intelligence.reviewNegativeThemes
    if (Array.isArray(raw)) return raw
    try { return JSON.parse(raw ?? "[]") } catch { return [] }
  })()

  const promises: string[] = (() => {
    const raw = intelligence.brandPromises
    if (Array.isArray(raw)) return raw
    try { return JSON.parse(raw ?? "[]") } catch { return [] }
  })()

  const serviceLanguage: string[] = (() => {
    const raw = intelligence.serviceLanguage
    if (Array.isArray(raw)) return raw
    try { return JSON.parse(raw ?? "[]") } catch { return [] }
  })()

  // Perception gaps: promise vs negative review theme
  for (const promise of promises) {
    for (const friction of negativeThemes) {
      if (semanticOverlap(promise, friction)) {
        gaps.push({
          promise,
          friction,
          severity: "high",
          type: "perception",
        })
      }
    }
  }

  // Structural gap: visual coherence
  if (
    intelligence.visualCoherenceScore != null &&
    intelligence.visualCoherenceScore < 3
  ) {
    gaps.push({
      promise: "Brand visual identity",
      friction: "Website visuals do not match the narrative promises",
      severity: intelligence.visualCoherenceScore < 2 ? "high" : "medium",
      type: "visual",
    })
  }

  // Structural gap: locality strength
  if (intelligence.localityStrength === "weak") {
    gaps.push({
      promise: "Local character and sense of place",
      friction: "Little evidence of local specificity in positioning",
      severity: "medium",
      type: "locality",
    })
  }

  // Structural gap: generic service language
  const genericCount = serviceLanguage.filter((word) =>
    GENERIC_SERVICE_WORDS.includes(word.toLowerCase())
  ).length

  if (serviceLanguage.length > 0 && genericCount / serviceLanguage.length > 0.6) {
    gaps.push({
      promise: "Distinctive service identity",
      friction: "Service language is generic and interchangeable with any hotel",
      severity: "low",
      type: "differentiation",
    })
  }

  // Deduplicate by promise+friction
  const seen = new Set<string>()
  return gaps.filter((g) => {
    const key = `${g.promise}::${g.friction}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
