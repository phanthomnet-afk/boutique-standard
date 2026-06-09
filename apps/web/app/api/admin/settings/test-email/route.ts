import { NextRequest, NextResponse } from "next/server"
import { sendOutreachEmail } from "@/lib/admin/emailSender"
import { buildEmailHtml } from "@/lib/admin/emailTemplate"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { to } = body

  if (!to || !to.includes("@")) {
    return NextResponse.json({ error: "Valid email address required" }, { status: 400 })
  }

  const html = buildEmailHtml({
    contactName: "Test Recipient",
    body: "This is a test email from The Boutique Standard outreach system.\n\nIf you received this, your Resend configuration is working correctly.",
    hotelName: "Test Hotel",
    sequencePosition: 3,
  })

  const result = await sendOutreachEmail({
    to,
    subject: "TBS Outreach System - Test Email",
    html,
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ success: true, simulated: result.simulated ?? false })
}
