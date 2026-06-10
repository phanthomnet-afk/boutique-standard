import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { sendDirectEmail, TBS_EMAILS } from "@/lib/admin/emailSender"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(req: NextRequest) {
  const body = await req.json()

  const hotelName = body.hotelName ?? body["hotel-name"] ?? ""
  const website   = body.website ?? body["hotel-website"] ?? ""
  const location  = body.location ?? body["hotel-location"] ?? ""
  const contactName  = body.contactName ?? body["contact-name"] ?? ""
  const contactEmail = body.contactEmail ?? body["contact-email"] ?? body.email ?? ""
  const contactRole  = body.contactRole ?? body["contact-role"] ?? ""
  const notes     = body.notes ?? body.message ?? ""

  if (!hotelName || !website || !location) {
    return NextResponse.json({ error: "Hotel name, website, and location are required" }, { status: 400 })
  }

  // Create hotel record as prospect
  let hotelId: string | null = null
  try {
    const hotel = await prisma.hotel.create({
      data: {
        name: hotelName,
        website,
        location,
        country: body.country ?? "Unknown",
        countryCode: body.countryCode ?? "XX",
        status: "prospect",
        notes: [
          contactName  ? `Contact: ${contactName}` : null,
          contactRole  ? `Role: ${contactRole}` : null,
          contactEmail ? `Email: ${contactEmail}` : null,
          notes        ? `Notes: ${notes}` : null,
          `Source: audit request form`,
        ].filter(Boolean).join("\n"),
      },
    })
    hotelId = hotel.id

    if (contactEmail) {
      await prisma.contact.create({
        data: {
          hotelId: hotel.id,
          name: contactName || null,
          role: contactRole || null,
          email: contactEmail,
          source: "request-form",
          verified: false,
        },
      })
    }
  } catch (err) {
    console.error("Failed to create hotel from request:", err)
  }

  // Internal notification to leads@
  if (process.env.RESEND_API_KEY) {
    const fieldsText = Object.entries(body)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join("\n")

    await sendDirectEmail({
      to: TBS_EMAILS.leads,
      from: TBS_EMAILS.leads,
      subject: `New audit request: ${hotelName}`,
      html: `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:24px;color:#1c1c1c;">
<h2 style="margin:0 0 16px;">New audit request</h2>
<p><strong>Hotel:</strong> ${hotelName}</p>
<p><strong>Website:</strong> ${website}</p>
<p><strong>Location:</strong> ${location}</p>
${contactName  ? `<p><strong>Contact:</strong> ${contactName}</p>` : ""}
${contactRole  ? `<p><strong>Role:</strong> ${contactRole}</p>` : ""}
${contactEmail ? `<p><strong>Email:</strong> ${contactEmail}</p>` : ""}
${notes        ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
${hotelId      ? `<p style="margin-top:24px;font-size:12px;color:#9e9890;">Hotel ID: ${hotelId}</p>` : ""}
<pre style="margin-top:24px;font-size:11px;color:#9e9890;white-space:pre-wrap;">${fieldsText}</pre>
</body></html>`,
    }).catch(console.error)

    // Confirmation to requester
    if (contactEmail) {
      await sendDirectEmail({
        to: contactEmail,
        from: TBS_EMAILS.hello,
        subject: "We received your audit request",
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;padding:48px;">
        <tr><td>
          <p style="margin:0 0 24px 0;font-size:16px;line-height:1.65;color:#2c2c2c;">${contactName ? `Dear ${contactName},` : "Thank you,"}</p>
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#2c2c2c;">We have received your audit enquiry for ${hotelName} and will be in touch within 48 hours.</p>
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#2c2c2c;">In the meantime, you can read more about our process at boutiquestandard.com/audit.</p>
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e4e0da;">
            <p style="margin:0 0 4px 0;font-size:13px;color:#4a4744;font-weight:500;">The Boutique Standard</p>
            <p style="margin:0 0 2px 0;font-size:12px;color:#9e9890;">hello@boutiquestandard.com</p>
            <p style="margin:0;font-size:12px;color:#9e9890;">boutiquestandard.com</p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }).catch(console.error)
    }
  }

  return NextResponse.json({ success: true, hotelId })
}
