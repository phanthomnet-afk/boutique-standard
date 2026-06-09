import SettingsClient from "./SettingsClient"

export default function SettingsPage() {
  const senderName = process.env.OUTREACH_FROM_NAME ?? "(not set)"
  const senderEmail = process.env.OUTREACH_FROM_EMAIL ?? "(not set)"
  const sendEnabled = process.env.SEND_EMAILS_ENABLED === "true"

  const apiStatus = {
    resend: !!process.env.RESEND_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    openai: !!process.env.OPENAI_API_KEY,
    googlePlaces: !!process.env.GOOGLE_PLACES_API_KEY,
    dataForSeo: !!process.env.DATAFORSEO_LOGIN,
    scrapeGraph: !!process.env.SCRAPEGRAPH_API_KEY,
  }

  return (
    <SettingsClient
      senderName={senderName}
      senderEmail={senderEmail}
      sendEnabled={sendEnabled}
      apiStatus={apiStatus}
    />
  )
}
