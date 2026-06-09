import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { validateNeoApiKey, recordNeoApiCall } from "@/lib/admin/neoAuth"
import { fireWebhook } from "@/lib/admin/neoWebhook"

const VALID_STATUSES = [
  "prospect", "enriched", "outreach-ready", "contacted",
  "replied", "booked", "closed", "not-a-fit", "dead",
]

export async function POST(req: NextRequest) {
  const valid = await validateNeoApiKey(req)
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  recordNeoApiCall()

  const body = await req.json()
  const { hotelId, status, notes } = body

  if (!hotelId || !status) {
    return NextResponse.json({ error: "hotelId and status are required" }, { status: 400 })
  }

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    )
  }

  const existing = await prisma.hotel.findUnique({ where: { id: hotelId } })
  if (!existing) return NextResponse.json({ error: "Hotel not found" }, { status: 404 })

  const updateData: Record<string, unknown> = { status }
  if (notes) {
    updateData.notes = existing.notes ? `${existing.notes}\n\n${notes}` : notes
  }

  const hotel = await prisma.hotel.update({
    where: { id: hotelId },
    data: updateData,
    select: { id: true, name: true, status: true, location: true, country: true, icpScore: true },
  })

  fireWebhook("hotel.status_changed", hotel, { oldStatus: existing.status, newStatus: status }).catch(console.error)
  if (status === "booked") {
    fireWebhook("hotel.booked", hotel).catch(console.error)
  }

  return NextResponse.json({ success: true, hotel })
}
