import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { COLLECTIVE_SOURCES, scrapeCollective } from "@/lib/admin/collectiveScraper"

export async function GET() {
  return NextResponse.json({ sources: COLLECTIVE_SOURCES })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { sourceId, region } = body

  if (!sourceId) {
    return NextResponse.json({ error: "sourceId is required" }, { status: 400 })
  }

  const listings = await scrapeCollective(sourceId, region)

  if (listings.length === 0) {
    return NextResponse.json({ results: [], message: "No hotels extracted" })
  }

  // Check each against DB by name + location to flag existing
  const names = listings.map((l) => l.name)
  const existingByName = await prisma.hotel.findMany({
    where: { name: { in: names } },
    select: { name: true, location: true },
  })
  const existingKeys = new Set(existingByName.map((h) => `${h.name}::${h.location}`))

  const results = listings.map((l) => ({
    ...l,
    existing: existingKeys.has(`${l.name}::${l.location}`),
  }))

  return NextResponse.json({ results })
}
