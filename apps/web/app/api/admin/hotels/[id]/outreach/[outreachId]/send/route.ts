import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { buildEmailHtml } from "@/lib/admin/emailTemplate"
import { sendOutreachEmail } from "@/lib/admin/emailSender"

interface Params {
  params: { id: string; outreachId: string }
}

export async function POST(req: NextRequest, { params }: Params) {
  const body = await req.json()
  const { subject, bodyText, contactId } = body

  if (!subject || !bodyText) {
    return NextResponse.json({ error: "subject and bodyText are required" }, { status: 400 })
  }

  const outreach = await prisma.outreach.findUnique({
    where: { id: params.outreachId, hotelId: params.id },
    include: {
      hotel: { select: { name: true } },
    },
  })

  if (!outreach) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  // Resolve contact email
  const resolvedContactId = contactId ?? outreach.contactId
  let toEmail: string | null = null
  let contactName: string | null = null

  if (resolvedContactId) {
    const contact = await prisma.contact.findUnique({
      where: { id: resolvedContactId },
      select: { email: true, name: true },
    })
    toEmail = contact?.email ?? null
    contactName = contact?.name ?? null
  }

  if (!toEmail) {
    return NextResponse.json({ error: "No email address found for this contact" }, { status: 422 })
  }

  const html = buildEmailHtml({
    contactName: contactName ?? "",
    body: bodyText,
    hotelName: outreach.hotel.name,
    sequencePosition: outreach.sequencePosition as 1 | 2 | 3,
  })

  const result = await sendOutreachEmail({ to: toEmail, subject, html })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  const updated = await prisma.outreach.update({
    where: { id: params.outreachId },
    data: {
      status: "sent",
      sentAt: new Date(),
      bodySent: bodyText,
      subject,
      contactId: resolvedContactId ?? undefined,
    },
  })

  return NextResponse.json({
    outreach: updated,
    simulated: result.simulated ?? false,
    messageId: result.messageId,
  })
}
