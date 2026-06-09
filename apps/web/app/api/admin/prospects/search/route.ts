import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { searchBoutiqueHotels } from "@/lib/admin/googlePlaces"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { query, countryCode } = body

  if (!query) {
    return NextResponse.json({ error: "query is required" }, { status: 400 })
  }

  const results = await searchBoutiqueHotels(query, countryCode ?? "")

  // Check which place IDs already exist in DB
  const placeIds = results.map((r) => r.googlePlaceId).filter(Boolean)
  const existing = await prisma.hotel.findMany({
    where: { googlePlaceId: { in: placeIds } },
    select: { googlePlaceId: true },
  })
  const existingIds = new Set(existing.map((h) => h.googlePlaceId))

  const annotated = results.map((r) => ({
    ...r,
    existing: existingIds.has(r.googlePlaceId),
  }))

  return NextResponse.json({ results: annotated })
}
