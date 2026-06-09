import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import type { RawHotelListing } from "@/lib/admin/collectiveScraper"
import { COLLECTIVE_SOURCES } from "@/lib/admin/collectiveScraper"
import { calculateIcpScore } from "@/lib/admin/icpScoring"

const COUNTRY_CODE_MAP: Record<string, string> = {
  Denmark: "DK",
  Sweden: "SE",
  Norway: "NO",
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Portugal: "PT",
  Greece: "GR",
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { hotels }: { hotels: RawHotelListing[] } = body

  if (!Array.isArray(hotels) || hotels.length === 0) {
    return NextResponse.json({ error: "hotels array is required" }, { status: 400 })
  }

  let imported = 0
  let skipped = 0

  for (const listing of hotels) {
    if (!listing.name) { skipped++; continue }

    const existing = await prisma.hotel.findFirst({
      where: { name: listing.name, location: listing.location },
    })
    if (existing) { skipped++; continue }

    const sourceName = COLLECTIVE_SOURCES.find((s) => s.id === listing.sourceId)?.name ?? listing.sourceId
    const countryCode = COUNTRY_CODE_MAP[listing.country] ?? listing.country.substring(0, 2).toUpperCase()

    const icpResult = calculateIcpScore({})

    await prisma.hotel.create({
      data: {
        name: listing.name,
        website: listing.website ?? "",
        location: listing.location,
        country: listing.country,
        countryCode,
        status: "prospect",
        notes: `Source: ${sourceName}${listing.description ? `\n${listing.description}` : ""}`,
        icpScore: icpResult.score,
      },
    })

    imported++
  }

  return NextResponse.json({ imported, skipped })
}
