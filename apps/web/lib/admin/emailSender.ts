import { Resend } from "resend"

export const TBS_EMAILS = {
  hello:   "hello@boutiquestandard.com",   // primary outreach
  reports: "reports@boutiquestandard.com", // report delivery
  leads:   "leads@boutiquestandard.com",   // form submissions
  casper:  "casper@boutiquestandard.com",  // personal
} as const

export interface SendEmailParams {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export interface EmailSendResult {
  success: boolean
  messageId?: string
  error?: string
  simulated?: boolean
}

export async function sendOutreachEmail(params: SendEmailParams): Promise<EmailSendResult> {
  const enabled = process.env.SEND_EMAILS_ENABLED === "true"
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.OUTREACH_FROM_EMAIL ?? TBS_EMAILS.hello
  const fromName = process.env.OUTREACH_FROM_NAME ?? "The Boutique Standard"

  if (!enabled) {
    return { success: true, simulated: true, messageId: `sim_${Date.now()}` }
  }

  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY is not configured" }
  }

  const resend = new Resend(apiKey)

  const result = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: params.to,
    replyTo: params.replyTo ?? TBS_EMAILS.hello,
    subject: params.subject,
    html: params.html,
  })

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  return { success: true, messageId: result.data?.id }
}

export async function sendDirectEmail(params: SendEmailParams & { from?: string }): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY is not configured" }
  }

  const resend = new Resend(apiKey)
  const fromName = process.env.OUTREACH_FROM_NAME ?? "The Boutique Standard"
  const fromEmail = params.from ?? TBS_EMAILS.hello

  const result = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: params.to,
    replyTo: params.replyTo ?? TBS_EMAILS.hello,
    subject: params.subject,
    html: params.html,
  })

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  return { success: true, messageId: result.data?.id }
}
