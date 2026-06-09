import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { validateNeoApiKey, recordNeoApiCall } from "@/lib/admin/neoAuth"
import { fireWebhook } from "@/lib/admin/neoWebhook"
import { generateDraft } from "@/lib/admin/outreachGenerator"

export async function POST(req: NextRequest) {
  const valid = await validateNeoApiKey(req)
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  recordNeoApiCall()

  const body = await req.json()
  const { hotelId, channel, sequencePosition } = body

  if (!hotelId || !channel || !sequencePosition) {
    return NextResponse.json(
      { error: "hotelId, channel, and sequencePosition are required" },
      { status: 400 }
    )
  }

  if (!["email", "linkedin"].includes(channel)) {
    return NextResponse.json({ error: "channel must be email or linkedin" }, { status: 400 })
  }

  if (![1, 2, 3].includes(sequencePosition)) {
    return NextResponse.json({ error: "sequencePosition must be 1, 2, or 3" }, { status: 400 })
  }

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { intelligence: true },
  })

  if (!hotel) return NextResponse.json({ error: "Hotel not found" }, { status: 404 })
  if (!hotel.intelligence) {
    return NextResponse.json(
      { error: "Hotel has no intelligence. Run analysis first." },
      { status: 422 }
    )
  }

  const brandPromises: string[] = (() => {
    try { return JSON.parse(hotel.intelligence.brandPromises) } catch { return [] }
  })()

  const draft = await generateDraft({
    hotelName: hotel.name,
    location: hotel.location,
    brandPromises,
    positioningSummary: hotel.intelligence.positioningSummary,
    gapSummary: hotel.intelligence.gapSummary ?? "",
    channel,
    sequencePosition,
  })

  const outreach = await prisma.outreach.create({
    data: {
      hotelId: hotel.id,
      channel,
      sequencePosition,
      bodyDraft: draft,
      status: "draft",
    },
  })

  fireWebhook("outreach.generated", hotel, { channel, sequencePosition }).catch(console.error)

  return NextResponse.json({
    success: true,
    outreachId: outreach.id,
    bodyDraft: outreach.bodyDraft,
    subject: outreach.subject,
  })
}
