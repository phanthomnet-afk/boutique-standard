import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { fireWebhook } from "@/lib/admin/neoWebhook"

interface Params {
  params: { id: string; outreachId: string }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const body = await req.json()

  const allowed = ["bodySent", "status", "sentAt", "repliedAt", "replyText", "notes", "subject", "replySentiment", "readAt"]
  const data: Record<string, unknown> = {}

  for (const key of allowed) {
    if (key in body) {
      if ((key === "sentAt" || key === "repliedAt" || key === "readAt") && body[key]) {
        data[key] = new Date(body[key])
      } else {
        data[key] = body[key]
      }
    }
  }

  const outreach = await prisma.outreach.update({
    where: { id: params.outreachId, hotelId: params.id },
    data,
  })

  if ("replySentiment" in data) {
    const hotel = await prisma.hotel.findUnique({ where: { id: params.id } })
    if (hotel) {
      fireWebhook("outreach.replied", hotel, {
        replySentiment: outreach.replySentiment,
        sequencePosition: outreach.sequencePosition,
      }).catch(console.error)
    }
  }

  return NextResponse.json(outreach)
}
