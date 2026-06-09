export interface EmailTemplateParams {
  contactName: string
  body: string
  hotelName: string
  sequencePosition: 1 | 2 | 3
}

export function buildEmailHtml(params: EmailTemplateParams): string {
  const { contactName, body, sequencePosition } = params

  const greeting = contactName ? `Dear ${contactName},` : "Dear team,"

  const bodyHtml = body
    .split("\n\n")
    .map((para) => `<p style="margin:0 0 16px 0;line-height:1.65;color:#2c2c2c;">${para.replace(/\n/g, "<br>")}</p>`)
    .join("")

  const tbs_signature =
    sequencePosition === 3
      ? `
    <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e4e0da;">
      <p style="margin:0 0 4px 0;font-size:13px;color:#4a4744;font-weight:500;">The Boutique Standard</p>
      <p style="margin:0 0 4px 0;font-size:12px;color:#9e9890;">Independent Guest Experience Intelligence</p>
      <p style="margin:0;font-size:12px;color:#9e9890;">theboutiquestandard.com</p>
    </div>`
      : ""

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;padding:48px 48px 40px;">
          <tr>
            <td>
              <p style="margin:0 0 24px 0;font-size:16px;line-height:1.65;color:#2c2c2c;">${greeting}</p>
              ${bodyHtml}
              ${tbs_signature}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
