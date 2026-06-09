"use client"

import { useState, useEffect } from "react"
import styles from "./settings.module.css"

interface Props {
  senderName: string
  senderEmail: string
  sendEnabled: boolean
  apiStatus: {
    resend: boolean
    anthropic: boolean
    openai: boolean
    googlePlaces: boolean
    dataForSeo: boolean
    scrapeGraph: boolean
  }
}

interface Timing {
  touch2DelayDays: number
  touch3DelayDays: number
  nurtureDelayDays: number
}

export default function SettingsClient({ senderName, senderEmail, sendEnabled, apiStatus }: Props) {
  const [timing, setTiming] = useState<Timing>({
    touch2DelayDays: 8,
    touch3DelayDays: 22,
    nurtureDelayDays: 60,
  })
  const [timingLoaded, setTimingLoaded] = useState(false)
  const [timingSaving, setTimingSaving] = useState(false)
  const [timingSaved, setTimingSaved] = useState(false)

  const [testEmail, setTestEmail] = useState("")
  const [testSending, setTestSending] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        setTiming({
          touch2DelayDays: d.touch2DelayDays,
          touch3DelayDays: d.touch3DelayDays,
          nurtureDelayDays: d.nurtureDelayDays,
        })
        setTimingLoaded(true)
      })
  }, [])

  async function saveTiming() {
    setTimingSaving(true)
    setTimingSaved(false)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timing),
      })
      if (res.ok) setTimingSaved(true)
    } finally {
      setTimingSaving(false)
    }
  }

  async function sendTest() {
    if (!testEmail.includes("@")) return
    setTestSending(true)
    setTestResult(null)
    try {
      const res = await fetch("/api/admin/settings/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: testEmail }),
      })
      const d = await res.json()
      if (res.ok) {
        setTestResult({
          success: true,
          message: d.simulated ? "Simulated send (SEND_EMAILS_ENABLED=false)" : "Test email sent successfully",
        })
      } else {
        setTestResult({ success: false, message: d.error ?? "Send failed" })
      }
    } finally {
      setTestSending(false)
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>

      {/* Sender identity */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sender identity</h2>
        <div className={styles.card}>
          <div className={styles.readonlyRow}>
            <span className={styles.readonlyLabel}>From name</span>
            <span className={styles.readonlyValue}>{senderName}</span>
          </div>
          <div className={styles.readonlyRow}>
            <span className={styles.readonlyLabel}>From email</span>
            <span className={styles.readonlyValue}>{senderEmail}</span>
          </div>
          <div className={styles.readonlyRow}>
            <span className={styles.readonlyLabel}>Sending mode</span>
            <span className={`${styles.readonlyValue} ${sendEnabled ? styles.statusOn : styles.statusOff}`}>
              {sendEnabled ? "Live - emails send via Resend" : "Simulated - SEND_EMAILS_ENABLED=false"}
            </span>
          </div>
          <p className={styles.hint}>Edit OUTREACH_FROM_NAME, OUTREACH_FROM_EMAIL, and SEND_EMAILS_ENABLED in .env.local to change these.</p>
        </div>
      </section>

      {/* Sequence timing */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sequence timing</h2>
        <div className={styles.card}>
          {!timingLoaded ? (
            <p className={styles.loading}>Loading...</p>
          ) : (
            <>
              <div className={styles.timingGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Touch 2 delay (days after Touch 1)</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={timing.touch2DelayDays}
                    onChange={(e) => setTiming((t) => ({ ...t, touch2DelayDays: Number(e.target.value) }))}
                    min={1}
                    max={90}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Touch 3 delay (days after Touch 2)</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={timing.touch3DelayDays}
                    onChange={(e) => setTiming((t) => ({ ...t, touch3DelayDays: Number(e.target.value) }))}
                    min={1}
                    max={90}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Nurture delay (days after Touch 3)</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={timing.nurtureDelayDays}
                    onChange={(e) => setTiming((t) => ({ ...t, nurtureDelayDays: Number(e.target.value) }))}
                    min={1}
                    max={365}
                  />
                </div>
              </div>
              <div className={styles.actionRow}>
                <button onClick={saveTiming} disabled={timingSaving} className={styles.primaryBtn}>
                  {timingSaving ? "Saving..." : "Save timing"}
                </button>
                {timingSaved && <span className={styles.savedNote}>Saved</span>}
              </div>
            </>
          )}
        </div>
      </section>

      {/* API status */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>API status</h2>
        <div className={styles.card}>
          <div className={styles.apiGrid}>
            {[
              { key: "resend", label: "Resend (email sending)" },
              { key: "anthropic", label: "Anthropic (outreach generation)" },
              { key: "openai", label: "OpenAI (website analysis)" },
              { key: "googlePlaces", label: "Google Places (prospecting)" },
              { key: "dataForSeo", label: "DataForSEO (reviews)" },
              { key: "scrapeGraph", label: "ScrapeGraphAI (extraction)" },
            ].map(({ key, label }) => (
              <div key={key} className={styles.apiRow}>
                <span
                  className={styles.apiDot}
                  style={{
                    background: apiStatus[key as keyof typeof apiStatus] ? "#3a7a3a" : "#c0c0c0",
                  }}
                />
                <span className={styles.apiLabel}>{label}</span>
                <span className={styles.apiStatus}>
                  {apiStatus[key as keyof typeof apiStatus] ? "Configured" : "Not set"}
                </span>
              </div>
            ))}
          </div>
          <p className={styles.hint}>Status is based on env var presence only - not a live connection check.</p>
        </div>
      </section>

      {/* Test email */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Test email</h2>
        <div className={styles.card}>
          <p className={styles.bodyText}>
            Sends a test email using the current Resend configuration.
            If SEND_EMAILS_ENABLED=false, the send is simulated.
          </p>
          <div className={styles.testRow}>
            <input
              type="email"
              className={styles.input}
              placeholder="your@email.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <button
              onClick={sendTest}
              disabled={testSending || !testEmail.includes("@")}
              className={styles.primaryBtn}
            >
              {testSending ? "Sending..." : "Send test"}
            </button>
          </div>
          {testResult && (
            <p className={testResult.success ? styles.savedNote : styles.errorNote}>
              {testResult.message}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
