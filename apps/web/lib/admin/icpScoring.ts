interface HotelInput {
  starRating?: number | null
  roomCountEstimate?: number | null
  onBookingCom?: boolean
  instagramHandle?: string | null
  averageRating?: number | null
  reviewCount?: number | null
}

interface IntelligenceInput {
  localityStrength?: string | null
  visualCoherenceScore?: number | null
  pricePointSignal?: string | null
  gaps?: string | null
  brandPromises?: string | null
}

export interface IcpScore {
  score: number
  signals: string[]
  flags: string[]
}

export function calculateIcpScore(
  hotel: HotelInput,
  intelligence?: IntelligenceInput | null
): IcpScore {
  let points = 0
  const signals: string[] = []
  const flags: string[] = []

  // --- From hotel record ---
  if ((hotel.starRating ?? 0) >= 4) {
    points += 2
    signals.push("4+ star rating")
  }

  const rooms = hotel.roomCountEstimate
  if (rooms != null && rooms >= 4 && rooms <= 50) {
    points += 2
    signals.push(`Room count in ideal range (${rooms})`)
    if (rooms <= 15) {
      points += 1
      signals.push("Very small property (under 16 rooms)")
    }
  }
  if (rooms != null && rooms > 80) {
    points -= 3
    flags.push("Too large (80+ rooms)")
  }

  if (!hotel.onBookingCom) {
    points += 1
    signals.push("Not listed on Booking.com (independent signal)")
  }

  if (hotel.instagramHandle) {
    points += 1
    signals.push("Instagram presence (design-conscious)")
  }

  // --- From intelligence ---
  if (intelligence) {
    if (intelligence.localityStrength === "strong") {
      points += 2
      signals.push("Strong local identity")
    }

    const visualScore = intelligence.visualCoherenceScore
    if (visualScore != null && visualScore >= 4) {
      points += 1
      signals.push("High visual coherence")
    }
    if (visualScore != null && visualScore <= 2) {
      points -= 2
      flags.push("Poor visual coherence")
    }

    const priceSig = intelligence.pricePointSignal
    if (priceSig === "luxury" || priceSig === "premium") {
      points += 2
      signals.push(`${priceSig} price positioning`)
    } else if (priceSig === "boutique") {
      points += 1
      signals.push("Boutique price positioning")
    } else if (priceSig === "unclear") {
      points -= 1
      flags.push("Price positioning unclear")
    }

    let gapCount = 0
    try { gapCount = JSON.parse(intelligence.gaps ?? "[]").length } catch {}
    if (gapCount > 0) {
      points += 2
      signals.push(`${gapCount} detectable experience gap${gapCount > 1 ? "s" : ""}`)
    }

    try {
      const promises: string[] = JSON.parse(intelligence.brandPromises ?? "[]")
      const localWords = ["authentic", "local", "character", "story", "intimate", "family"]
      if (promises.some((p) => localWords.some((w) => p.toLowerCase().includes(w)))) {
        points += 1
        signals.push("Local/authentic language in brand promises")
      }
    } catch {}
  }

  // --- From Google Places data (passed via hotel) ---
  const rating = hotel.averageRating ?? 0
  const reviewCount = hotel.reviewCount ?? 0

  if (rating >= 4.0 && rating <= 4.8) {
    points += 1
    signals.push(`Strong review rating (${rating.toFixed(1)})`)
  }
  if (reviewCount >= 30 && reviewCount <= 400) {
    points += 1
    signals.push(`Healthy review volume (${reviewCount})`)
  }
  if (reviewCount > 600) {
    points -= 2
    flags.push("Very high review count (may be chain property)")
  }

  // Normalise: raw range roughly -5 to +15, map to 1-5
  const normalised = Math.round(((points + 5) / 20) * 4) + 1
  const score = Math.max(1, Math.min(5, normalised))

  return { score, signals, flags }
}
