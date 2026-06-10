import { NextRequest, NextResponse } from "next/server"
import { sendDirectEmail, TBS_EMAILS } from "@/lib/admin/emailSender"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { to } = body

  if (!to || !to.includes("@")) {
    return NextResponse.json({ error: "Valid email address required" }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 400 })
  }

  const result = await sendDirectEmail({
    to,
    from: TBS_EMAILS.hello,
    subject: "Test email from The Boutique Standard",
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;padding:48px;">
        <tr><td>
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#2c2c2c;">This is a test email confirming your Resend configuration is working correctly.</p>
          <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#2c2c2c;">Sent from the boutiquestandard.com admin panel.</p>
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
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ success: true, messageId: result.messageId })
}
