import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { getPlaceDetails } from "@/lib/admin/googlePlaces"
import { calculateIcpScore } from "@/lib/admin/icpScoring"

const COUNTRY_CODE_MAP: Record<string, string> = {
  DK: "Denmark",
  SE: "Sweden",
  NO: "Norway",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  PT: "Portugal",
  GR: "Greece",
}

function extractLocation(address: string): string {
  const parts = address.split(",").map((p) => p.trim())
  return parts.slice(0, 2).join(", ") || address
}

function extractCountry(address: string): { country: string; countryCode: string } {
  const parts = address.split(",").map((p) => p.trim())
  const last = parts[parts.length - 1] ?? ""
  const entry = Object.entries(COUNTRY_CODE_MAP).find(([, name]) => name === last)
  return {
    country: last,
    countryCode: entry ? entry[0] : last.substring(0, 2).toUpperCase(),
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { placeIds }: { placeIds: string[] } = body

  if (!Array.isArray(placeIds) || placeIds.length === 0) {
    return NextResponse.json({ error: "placeIds array is required" }, { status: 400 })
  }

  // Filter out already-existing place IDs
  const existing = await prisma.hotel.findMany({
    where: { googlePlaceId: { in: placeIds } },
    select: { googlePlaceId: true },
  })
  const existingIds = new Set(existing.map((h) => h.googlePlaceId))
  const newIds = placeIds.filter((id) => !existingIds.has(id))

  let imported = 0
  const errors: string[] = []

  for (const placeId of newIds) {
    try {
      const details = await getPlaceDetails(placeId)
      const location = extractLocation(details.address)
      const { country, countryCode } = extractCountry(details.address)

      const hotelData = {
        name: details.name || "Unknown Hotel",
        website: details.website ?? "",
        location,
        country,
        countryCode,
        googlePlaceId: placeId,
        status: "prospect" as const,
      }

      const icpResult = calculateIcpScore({
        averageRating: details.rating ?? undefined,
        reviewCount: details.reviewCount ?? undefined,
      })

      await prisma.hotel.create({
        data: {
          ...hotelData,
          icpScore: icpResult.score,
        },
      })

      imported++
    } catch (err) {
      errors.push(`Failed to import ${placeId}: ${err}`)
    }
  }

  return NextResponse.json({ imported, skipped: existingIds.size, errors })
}
