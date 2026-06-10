export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { fireWebhook } from "@/lib/admin/neoWebhook"

interface Params {
  params: { id: string }
}

export async function GET(_req: NextRequest, { params }: Params) {
  const hotel = await prisma.hotel.findUnique({
    where: { id: params.id },
    include: {
      intelligence: true,
      contacts: { orderBy: { addedAt: "asc" } },
      outreach: { orderBy: { generatedAt: "desc" } },
    },
  })

  if (!hotel) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(hotel)
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const body = await req.json()

  const allowed = [
    "status",
    "notes",
    "starRating",
    "roomCountEstimate",
    "instagramHandle",
    "onBookingCom",
  ]

  const data: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) data[key] = body[key]
  }

  const hotel = await prisma.hotel.update({
    where: { id: params.id },
    data,
  })

  if ("status" in data) {
    fireWebhook("hotel.status_changed", hotel, { newStatus: hotel.status }).catch(console.error)
    if (hotel.status === "booked") {
      fireWebhook("hotel.booked", hotel).catch(console.error)
    }
  }

  return NextResponse.json(hotel)
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  await prisma.hotel.update({
    where: { id: params.id },
    data: { status: "archived" },
  })

  return NextResponse.json({ ok: true })
}
