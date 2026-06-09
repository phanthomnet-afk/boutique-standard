import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { validateNeoApiKey, recordNeoApiCall } from "@/lib/admin/neoAuth"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const valid = await validateNeoApiKey(req)
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  recordNeoApiCall()

  const { searchParams } = new URL(req.url)
  const hotelId = searchParams.get("hotelId")

  if (!hotelId) return NextResponse.json({ error: "hotelId is required" }, { status: 400 })

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      intelligence: {
        select: {
          gapSummary: true,
          positioningSummary: true,
          reviewCount: true,
          averageRating: true,
          analysedAt: true,
          analysisVersion: true,
        },
      },
      contacts: {
        select: { id: true, name: true, role: true, email: true, linkedinUrl: true },
      },
      outreach: {
        select: {
          id: true,
          channel: true,
          sequencePosition: true,
          status: true,
          sentAt: true,
          repliedAt: true,
          replySentiment: true,
          subject: true,
        },
        orderBy: { generatedAt: "desc" },
      },
    },
  })

  if (!hotel) return NextResponse.json({ error: "Hotel not found" }, { status: 404 })

  return NextResponse.json(hotel)
}
