"use client"

import { useState, useEffect, useCallback } from "react"
import styles from "./settings.module.css"

interface Props {
  senderName: string
  senderEmail: string
  sendEnabled: boolean
  vercelUrl: string | null
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

interface NeoSettings {
  neoEnabled: boolean
  neoWebhookUrl: string
  neoApiKeySet: boolean
  neoApiKeyPrefix: string | null
  neoWebhookSecretSet: boolean
  neoWebhookSecretPrefix: string | null
  neoLastWebhookFiredAt: string | null
  neoLastApiCallAt: string | null
}

interface WebhookLog {
  id: string
  event: string
  hotelName: string | null
  status: string
  statusCode: number | null
  error: string | null
  firedAt: string
}

function formatTs(ts: string | null): string {
  if (!ts) return "never"
  return new Date(ts).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  })
}

export default function SettingsClient({ senderName, senderEmail, sendEnabled, vercelUrl, apiStatus }: Props) {
  const [timing, setTiming] = useState<Timing>({ touch2DelayDays: 8, touch3DelayDays: 22, nurtureDelayDays: 60 })
  const [timingLoaded, setTimingLoaded] = useState(false)
  const [timingSaving, setTimingSaving] = useState(false)
  const [timingSaved, setTimingSaved] = useState(false)

  const [testEmail, setTestEmail] = useState("")
  const [testSending, setTestSending] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const [healthChecking, setHealthChecking] = useState(false)
  const [healthData, setHealthData] = useState<{
    status: "ok" | "degraded" | "error"
    services: Record<string, any>
    sendEmailsEnabled: boolean
  } | null>(null)

  const [initLoading, setInitLoading] = useState(false)
  const [initResult, setInitResult] = useState<{
    success: boolean
    seeded?: string[]
    message?: string
    reportUrl?: string
    reportPassword?: string
    error?: string
  } | null>(null)

  // NEO state
  const [neo, setNeo] = useState<NeoSettings>({
    neoEnabled: false,
    neoWebhookUrl: "",
    neoApiKeySet: false,
    neoApiKeyPrefix: null,
    neoWebhookSecretSet: false,
    neoWebhookSecretPrefix: null,
    neoLastWebhookFiredAt: null,
    neoLastApiCallAt: null,
  })
  const [neoLoaded, setNeoLoaded] = useState(false)
  const [neoSaving, setNeoSaving] = useState(false)
  const [neoSaved, setNeoSaved] = useState(false)
  const [newApiKey, setNewApiKey] = useState<string | null>(null)
  const [newWebhookSecret, setNewWebhookSecret] = useState<string | null>(null)
  const [webhookTesting, setWebhookTesting] = useState(false)
  const [webhookTestResult, setWebhookTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([])
  const [logsLoaded, setLogsLoaded] = useState(false)

  const loadSettings = useCallback(async () => {
    const res = await fetch("/api/admin/settings")
    const d = await res.json()
    setTiming({
      touch2DelayDays: d.touch2DelayDays,
      touch3DelayDays: d.touch3DelayDays,
      nurtureDelayDays: d.nurtureDelayDays,
    })
    setNeo({
      neoEnabled: d.neoEnabled ?? false,
      neoWebhookUrl: d.neoWebhookUrl ?? "",
      neoApiKeySet: d.neoApiKeySet ?? false,
      neoApiKeyPrefix: d.neoApiKeyPrefix ?? null,
      neoWebhookSecretSet: d.neoWebhookSecretSet ?? false,
      neoWebhookSecretPrefix: d.neoWebhookSecretPrefix ?? null,
      neoLastWebhookFiredAt: d.neoLastWebhookFiredAt ?? null,
      neoLastApiCallAt: d.neoLastApiCallAt ?? null,
    })
    setTimingLoaded(true)
    setNeoLoaded(true)
  }, [])

  const loadWebhookLogs = useCallback(async () => {
    const res = await fetch("/api/admin/settings/webhook-log")
    if (res.ok) {
      setWebhookLogs(await res.json())
      setLogsLoaded(true)
    }
  }, [])

  useEffect(() => {
    loadSettings()
    loadWebhookLogs()
  }, [loadSettings, loadWebhookLogs])

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

  async function runHealthCheck() {
    setHealthChecking(true)
    setHealthData(null)
    try {
      const res = await fetch("/api/admin/system/health")
      if (res.ok) setHealthData(await res.json())
    } finally {
      setHealthChecking(false)
    }
  }

  async function initDatabase() {
    if (!window.confirm("Initialize database? This creates default settings and seeds the Maison du Rivage report if missing.")) return
    setInitLoading(true)
    setInitResult(null)
    try {
      const res = await fetch("/api/admin/system/init", { method: "POST" })
      const d = await res.json()
      setInitResult(d)
      if (res.ok) runHealthCheck()
    } finally {
      setInitLoading(false)
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
      setTestResult({
        success: res.ok,
        message: res.ok
          ? `Test email sent (ID: ${d.messageId ?? "?"})`
          : d.error ?? "Send failed",
      })
    } finally {
      setTestSending(false)
    }
  }

  async function saveNeo(extra: Record<string, unknown> = {}) {
    setNeoSaving(true)
    setNeoSaved(false)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ neoEnabled: neo.neoEnabled, neoWebhookUrl: neo.neoWebhookUrl, ...extra }),
      })
      if (res.ok) {
        const d = await res.json()
        setNeo((prev) => ({
          ...prev,
          neoEnabled: d.neoEnabled ?? prev.neoEnabled,
          neoApiKeySet: d.neoApiKeySet ?? prev.neoApiKeySet,
          neoApiKeyPrefix: d.neoApiKeyPrefix ?? prev.neoApiKeyPrefix,
          neoWebhookSecretSet: d.neoWebhookSecretSet ?? prev.neoWebhookSecretSet,
          neoWebhookSecretPrefix: d.neoWebhookSecretPrefix ?? prev.neoWebhookSecretPrefix,
        }))
        if (d.newNeoApiKey) setNewApiKey(d.newNeoApiKey)
        if (d.newNeoWebhookSecret) setNewWebhookSecret(d.newNeoWebhookSecret)
        setNeoSaved(true)
      }
    } finally {
      setNeoSaving(false)
    }
  }

  async function regenerateKey(field: "regenerateNeoApiKey" | "regenerateNeoWebhookSecret") {
    if (!window.confirm("Regenerate this key? The old key will stop working immediately.")) return
    await saveNeo({ [field]: true })
  }

  async function testWebhook() {
    setWebhookTesting(true)
    setWebhookTestResult(null)
    try {
      const res = await fetch("/api/admin/settings/neo-test-webhook", { method: "POST" })
      const d = await res.json()
      setWebhookTestResult({
        success: res.ok,
        message: res.ok
          ? `Delivered - HTTP ${d.statusCode}`
          : d.error ?? "Failed",
      })
      loadWebhookLogs()
    } finally {
      setWebhookTesting(false)
    }
  }

  const tbsApiBase = vercelUrl ? `https://${vercelUrl}/api/neo` : "https://[your-vercel-domain]/api/neo"

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
                  <input type="number" className={styles.input} value={timing.touch2DelayDays}
                    onChange={(e) => setTiming((t) => ({ ...t, touch2DelayDays: Number(e.target.value) }))} min={1} max={90} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Touch 3 delay (days after Touch 2)</label>
                  <input type="number" className={styles.input} value={timing.touch3DelayDays}
                    onChange={(e) => setTiming((t) => ({ ...t, touch3DelayDays: Number(e.target.value) }))} min={1} max={90} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Nurture delay (days after Touch 3)</label>
                  <input type="number" className={styles.input} value={timing.nurtureDelayDays}
                    onChange={(e) => setTiming((t) => ({ ...t, nurtureDelayDays: Number(e.target.value) }))} min={1} max={365} />
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
                <span className={styles.apiDot} style={{ background: apiStatus[key as keyof typeof apiStatus] ? "#3a7a3a" : "#c0c0c0" }} />
                <span className={styles.apiLabel}>{label}</span>
                <span className={styles.apiStatus}>{apiStatus[key as keyof typeof apiStatus] ? "Configured" : "Not set"}</span>
              </div>
            ))}
          </div>
          <p className={styles.hint}>Status is based on env var presence only - not a live connection check.</p>
        </div>
      </section>

      {/* Database Status */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Database Status</h2>
        <div className={styles.card}>
          <div className={styles.apiGrid}>
            {healthData ? (
              (() => {
                const db = healthData.services?.database
                if (!db) return <p className={styles.hint}>No database info available.</p>
                return (
                  <>
                    <div className={styles.apiRow}>
                      <span className={styles.apiDot} style={{ background: db.status === "ok" ? "#3a7a3a" : "#c03030" }} />
                      <span className={styles.apiLabel}>Connection</span>
                      <span className={styles.apiStatus}>{String(db.status)}{db.message ? ` - ${db.message}` : ""}</span>
                    </div>
                    {db.status === "ok" && typeof db.hotels === "number" && (
                      <>
                        <div className={styles.apiRow}>
                          <span className={styles.apiDot} style={{ background: "#d0d0d0" }} />
                          <span className={styles.apiLabel}>Hotels</span>
                          <span className={styles.apiStatus}>{db.hotels} records</span>
                        </div>
                        <div className={styles.apiRow}>
                          <span className={styles.apiDot} style={{ background: "#d0d0d0" }} />
                          <span className={styles.apiLabel}>Contacts</span>
                          <span className={styles.apiStatus}>{db.contacts} records</span>
                        </div>
                        <div className={styles.apiRow}>
                          <span className={styles.apiDot} style={{ background: "#d0d0d0" }} />
                          <span className={styles.apiLabel}>Reports</span>
                          <span className={styles.apiStatus}>{db.reports} records</span>
                        </div>
                      </>
                    )}
                  </>
                )
              })()
            ) : (
              <p className={styles.hint}>Run a health check below to see database status.</p>
            )}
          </div>
          <div className={styles.actionRow}>
            <button onClick={initDatabase} disabled={initLoading} className={styles.primaryBtn}>
              {initLoading ? "Initializing..." : "Initialize / Seed"}
            </button>
          </div>
          {initResult && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p className={initResult.success ? styles.savedNote : styles.errorNote}>
                {initResult.success
                  ? (initResult.message ?? `Initialized: ${initResult.seeded?.join(", ") || "nothing new"}`)
                  : (initResult.error ?? "Failed")}
              </p>
              {initResult.reportUrl && (
                <>
                  <div className={styles.readonlyRow}>
                    <span className={styles.readonlyLabel}>Report URL</span>
                    <code className={styles.keyCode}>{initResult.reportUrl}</code>
                  </div>
                  <div className={styles.readonlyRow}>
                    <span className={styles.readonlyLabel}>Password</span>
                    <code className={styles.keyCode}>{initResult.reportPassword}</code>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* System health */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>System Health</h2>
        <div className={styles.card}>
          <div className={styles.healthActionRow}>
            <button onClick={runHealthCheck} disabled={healthChecking} className={styles.primaryBtn}>
              {healthChecking ? "Checking..." : "Run health check"}
            </button>
            {healthData && (
              <span className={`${styles.healthOverall} ${styles[`healthOverall_${healthData.status}`]}`}>
                {healthData.status.toUpperCase()}
              </span>
            )}
          </div>
          {healthData && (
            <div className={styles.healthGrid}>
              {Object.entries(healthData.services).map(([key, svc]) => {
                const isOk = svc.status === "ok" || svc.status === "configured"
                const isSkipped = svc.status === "skipped"
                const dotColor = isSkipped ? "#c0c0c0" : isOk ? "#3a7a3a" : "#c03030"
                return (
                  <div key={key} className={styles.healthRow}>
                    <span className={styles.healthDot} style={{ background: dotColor }} />
                    <span className={styles.healthLabel}>{key}</span>
                    <span className={styles.healthStatus}>
                      {svc.status}{svc.message ? ` - ${svc.message}` : ""}
                    </span>
                  </div>
                )
              })}
              <div className={styles.healthRow}>
                <span className={styles.healthDot} style={{ background: healthData.sendEmailsEnabled ? "#3a7a3a" : "#c0c0c0" }} />
                <span className={styles.healthLabel}>sendEmailsEnabled</span>
                <span className={styles.healthStatus}>{healthData.sendEmailsEnabled ? "true" : "false"}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Test email */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Test email</h2>
        <div className={styles.card}>
          <p className={styles.bodyText}>Sends a test email using the current Resend configuration. If SEND_EMAILS_ENABLED=false, the send is simulated.</p>
          <div className={styles.testRow}>
            <input type="email" className={styles.input} placeholder="your@email.com" value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)} />
            <button onClick={sendTest} disabled={testSending || !testEmail.includes("@")} className={styles.primaryBtn}>
              {testSending ? "Sending..." : "Send test"}
            </button>
          </div>
          {testResult && (
            <p className={testResult.success ? styles.savedNote : styles.errorNote}>{testResult.message}</p>
          )}
        </div>
      </section>

      {/* NEO integration */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>NEO Dashboard Integration</h2>
        <div className={styles.card}>
          {!neoLoaded ? (
            <p className={styles.loading}>Loading...</p>
          ) : (
            <>
              {/* Enable toggle */}
              <div className={styles.neoToggleRow}>
                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={neo.neoEnabled}
                    onChange={(e) => setNeo((n) => ({ ...n, neoEnabled: e.target.checked }))}
                  />
                  Enable NEO integration
                </label>
                <span className={neo.neoEnabled ? styles.statusOn : styles.statusOff}>
                  {neo.neoEnabled ? "Active" : "Disabled"}
                </span>
              </div>

              {/* Webhook URL */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>NEO Webhook URL (TBS fires events here)</label>
                <input
                  type="url"
                  className={styles.input}
                  style={{ maxWidth: "100%" }}
                  placeholder="https://neo.yourdomain.com/webhooks/tbs"
                  value={neo.neoWebhookUrl}
                  onChange={(e) => setNeo((n) => ({ ...n, neoWebhookUrl: e.target.value }))}
                />
              </div>

              <div className={styles.actionRow}>
                <button onClick={() => saveNeo()} disabled={neoSaving} className={styles.primaryBtn}>
                  {neoSaving ? "Saving..." : "Save NEO settings"}
                </button>
                {neoSaved && <span className={styles.savedNote}>Saved</span>}
              </div>

              <div className={styles.neoKeyGrid}>
                {/* API Key */}
                <div className={styles.neoKeyBlock}>
                  <p className={styles.label}>NEO API Key (NEO uses this to call TBS)</p>
                  {newApiKey ? (
                    <div className={styles.newKeyBlock}>
                      <p className={styles.newKeyNote}>Copy this key now - it will not be shown again.</p>
                      <div className={styles.keyRow}>
                        <code className={styles.keyCode}>{newApiKey}</code>
                        <button onClick={() => { navigator.clipboard.writeText(newApiKey); setNewApiKey(null) }} className={styles.ghostBtn}>
                          Copy and dismiss
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.keyRow}>
                      <code className={styles.keyCode}>
                        {neo.neoApiKeySet ? `${neo.neoApiKeyPrefix}••••••••••••••••` : "Not generated"}
                      </code>
                      <button onClick={() => regenerateKey("regenerateNeoApiKey")} className={styles.ghostBtn}>
                        {neo.neoApiKeySet ? "Regenerate" : "Generate"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Webhook Secret */}
                <div className={styles.neoKeyBlock}>
                  <p className={styles.label}>Webhook Secret (TBS signs outbound webhooks)</p>
                  {newWebhookSecret ? (
                    <div className={styles.newKeyBlock}>
                      <p className={styles.newKeyNote}>Copy this secret now - it will not be shown again.</p>
                      <div className={styles.keyRow}>
                        <code className={styles.keyCode}>{newWebhookSecret}</code>
                        <button onClick={() => { navigator.clipboard.writeText(newWebhookSecret); setNewWebhookSecret(null) }} className={styles.ghostBtn}>
                          Copy and dismiss
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.keyRow}>
                      <code className={styles.keyCode}>
                        {neo.neoWebhookSecretSet ? `${neo.neoWebhookSecretPrefix}••••••••••••••••` : "Not generated"}
                      </code>
                      <button onClick={() => regenerateKey("regenerateNeoWebhookSecret")} className={styles.ghostBtn}>
                        {neo.neoWebhookSecretSet ? "Regenerate" : "Generate"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* TBS API base URL */}
              <div className={styles.neoReadonlyBlock}>
                <p className={styles.label}>TBS API Base URL (share with NEO configuration)</p>
                <div className={styles.keyRow}>
                  <code className={styles.keyCode}>{tbsApiBase}</code>
                  <button onClick={() => navigator.clipboard.writeText(tbsApiBase)} className={styles.ghostBtn}>
                    Copy
                  </button>
                </div>
              </div>

              {/* Test webhook */}
              <div className={styles.neoTestRow}>
                <button
                  onClick={testWebhook}
                  disabled={webhookTesting || !neo.neoEnabled || !neo.neoWebhookUrl}
                  className={styles.ghostBtn}
                >
                  {webhookTesting ? "Testing..." : "Test webhook"}
                </button>
                {webhookTestResult && (
                  <span className={webhookTestResult.success ? styles.savedNote : styles.errorNote}>
                    {webhookTestResult.message}
                  </span>
                )}
              </div>

              {/* Last activity */}
              <div className={styles.neoActivityRow}>
                <span className={styles.hint}>Last webhook fired: <strong>{formatTs(neo.neoLastWebhookFiredAt)}</strong></span>
                <span className={styles.hint}>Last NEO API call: <strong>{formatTs(neo.neoLastApiCallAt)}</strong></span>
              </div>

              {/* Webhook delivery log */}
              <div className={styles.logSection}>
                <p className={styles.logTitle}>Recent webhook deliveries</p>
                {!logsLoaded ? (
                  <p className={styles.loading}>Loading...</p>
                ) : webhookLogs.length === 0 ? (
                  <p className={styles.hint}>No webhook deliveries yet.</p>
                ) : (
                  <table className={styles.logTable}>
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Hotel</th>
                        <th>Status</th>
                        <th>Fired</th>
                      </tr>
                    </thead>
                    <tbody>
                      {webhookLogs.map((log) => (
                        <tr key={log.id}>
                          <td className={styles.logEvent}>{log.event}</td>
                          <td className={styles.logHotel}>{log.hotelName ?? "-"}</td>
                          <td>
                            <span className={`${styles.logStatus} ${styles[`logStatus_${log.status}`]}`}>
                              {log.status}{log.statusCode ? ` ${log.statusCode}` : ""}
                            </span>
                          </td>
                          <td className={styles.logDate}>{formatTs(log.firedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
