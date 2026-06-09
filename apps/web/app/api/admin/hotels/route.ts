import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const country = searchParams.get("country")
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  const where: Record<string, unknown> = {}
  if (country) where.countryCode = country
  if (status) where.status = status
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { location: { contains: search } },
    ]
  }

  const [hotels, statusCounts] = await Promise.all([
    prisma.hotel.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: {
        intelligence: {
          select: {
            analysedAt: true,
            gapSummary: true,
            averageRating: true,
            reviewCount: true,
          },
        },
        _count: { select: { contacts: true, outreach: true } },
      },
    }),
    prisma.hotel.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ])

  const counts: Record<string, number> = {}
  for (const row of statusCounts) {
    counts[row.status] = row._count.status
  }

  return NextResponse.json({ hotels, counts })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { name, website } = body
  if (!name || !website) {
    return NextResponse.json(
      { error: "name and website are required" },
      { status: 400 }
    )
  }

  const hotel = await prisma.hotel.create({
    data: {
      name: body.name,
      website: body.website,
      location: body.location ?? "",
      country: body.country ?? "",
      countryCode: body.countryCode ?? "",
      starRating: body.starRating ?? null,
      roomCountEstimate: body.roomCountEstimate ?? null,
      category: body.category ?? null,
      googlePlaceId: body.googlePlaceId ?? null,
      instagramHandle: body.instagramHandle ?? null,
      onBookingCom: body.onBookingCom ?? false,
      notes: body.notes ?? null,
    },
  })

  return NextResponse.json(hotel, { status: 201 })
}
