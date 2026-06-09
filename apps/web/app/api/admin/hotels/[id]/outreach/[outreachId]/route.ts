import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"

interface Params {
  params: { id: string; outreachId: string }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const body = await req.json()

  const allowed = ["bodySent", "status", "sentAt", "repliedAt", "replyText", "notes", "subject"]
  const data: Record<string, unknown> = {}

  for (const key of allowed) {
    if (key in body) {
      if ((key === "sentAt" || key === "repliedAt") && body[key]) {
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

  return NextResponse.json(outreach)
}
