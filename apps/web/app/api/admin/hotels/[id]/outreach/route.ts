export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { generateDraft } from "@/lib/admin/outreachGenerator"
import { fireWebhook } from "@/lib/admin/neoWebhook"

interface Params {
  params: { id: string }
}

export async function POST(req: NextRequest, { params }: Params) {
  const body = await req.json()
  const { channel, sequencePosition, contactId } = body

  if (!channel || !sequencePosition) {
    return NextResponse.json(
      { error: "channel and sequencePosition are required" },
      { status: 400 }
    )
  }

  const hotel = await prisma.hotel.findUnique({
    where: { id: params.id },
    include: { intelligence: true },
  })

  if (!hotel) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (!hotel.intelligence) {
    return NextResponse.json(
      { error: "Hotel has not been analysed yet. Run analysis first." },
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
      contactId: contactId ?? null,
      channel,
      sequencePosition,
      bodyDraft: draft,
      status: "draft",
    },
  })

  fireWebhook("outreach.generated", hotel, { channel, sequencePosition }).catch(console.error)

  return NextResponse.json(outreach, { status: 201 })
}
