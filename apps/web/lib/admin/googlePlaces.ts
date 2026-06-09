// TODO (Phase 2+): Add region-specific filtering to narrow results to
// boutique-specific categories (lodging, hotel, bed_and_breakfast).

import {
  Client,
  PlaceType1,
  PlaceType2,
} from "@googlemaps/google-maps-services-js"

export interface PlacesSearchResult {
  googlePlaceId: string
  name: string
  address: string
  location: string
  country: string
  countryCode: string
  rating: number
  reviewCount: number
  website: string | null
  priceLevel: number | null
  types: string[]
  photoRef: string | null
  icpScore: number
}

export interface PlaceDetails {
  name: string
  website: string | null
  address: string
  phone: string | null
  rating: number | null
  reviewCount: number | null
  priceLevel: number | null
}

const COUNTRY_CODE_MAP: Record<string, string> = {
  Denmark: "DK",
  Sweden: "SE",
  Norway: "NO",
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Portugal: "PT",
  Greece: "GR",
  Netherlands: "NL",
  Germany: "DE",
  Austria: "AT",
  Switzerland: "CH",
  Belgium: "BE",
  "United Kingdom": "GB",
}

function extractCountryFromAddress(address: string): { country: string; countryCode: string } {
  const parts = address.split(",").map((p) => p.trim())
  const last = parts[parts.length - 1]
  return {
    country: last,
    countryCode: COUNTRY_CODE_MAP[last] ?? last.substring(0, 2).toUpperCase(),
  }
}

function extractLocation(address: string): string {
  const parts = address.split(",").map((p) => p.trim())
  if (parts.length >= 2) return parts.slice(0, 2).join(", ")
  return parts[0] ?? address
}

function scoreIcp(result: {
  rating: number
  reviewCount: number
  website: string | null
  priceLevel: number | null
}): number {
  let points = 2 // baseline

  if (result.rating >= 4.0) points += 1
  if ((result.priceLevel ?? 0) >= 3) points += 1
  if (result.reviewCount >= 20 && result.reviewCount <= 500) points += 1
  if (result.website) points += 1
  if (result.reviewCount > 800) points -= 2
  if (result.priceLevel === 1) points -= 2

  return Math.max(1, Math.min(5, points))
}

export async function searchBoutiqueHotels(
  query: string,
  countryCode: string
): Promise<PlacesSearchResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return []

  const client = new Client({})

  const response = await client.textSearch({
    params: {
      query,
      key: apiKey,
      type: "lodging" as PlaceType1,
    },
  })

  const results = (response.data.results ?? []).slice(0, 20)

  return results
    .filter((place) => {
      const types = (place.types ?? []) as string[]
      return types.some((t) => t === "lodging" || t === "hotel")
    })
    .map((place) => {
      const address = place.formatted_address ?? ""
      const { country, countryCode: detectedCode } = extractCountryFromAddress(address)
      const location = extractLocation(address)
      const rating = place.rating ?? 0
      const reviewCount = place.user_ratings_total ?? 0
      const website = null // details endpoint required for website
      const priceLevel = place.price_level ?? null

      return {
        googlePlaceId: place.place_id ?? "",
        name: place.name ?? "",
        address,
        location,
        country,
        countryCode: detectedCode || countryCode,
        rating,
        reviewCount,
        website,
        priceLevel,
        types: place.types ?? [],
        photoRef: place.photos?.[0]?.photo_reference ?? null,
        icpScore: scoreIcp({ rating, reviewCount, website, priceLevel }),
      }
    })
    .sort((a, b) => b.icpScore - a.icpScore)
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    return { name: "", website: null, address: "", phone: null, rating: null, reviewCount: null, priceLevel: null }
  }

  const client = new Client({})

  const response = await client.placeDetails({
    params: {
      place_id: placeId,
      key: apiKey,
      fields: [
        "name",
        "website",
        "formatted_address",
        "international_phone_number",
        "price_level",
        "rating",
        "user_ratings_total",
      ] as any,
    },
  })

  const r = response.data.result
  return {
    name: r.name ?? "",
    website: r.website ?? null,
    address: r.formatted_address ?? "",
    phone: r.international_phone_number ?? null,
    rating: r.rating ?? null,
    reviewCount: r.user_ratings_total ?? null,
    priceLevel: r.price_level ?? null,
  }
}
