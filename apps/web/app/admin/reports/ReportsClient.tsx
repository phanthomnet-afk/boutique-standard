"use client"

import { useState, useCallback } from "react"
import styles from "./reports.module.css"

interface Report {
  id:             string
  slug:           string
  hotelName:      string
  location:       string
  auditDate:      string
  dataPath:       string
  status:         string
  pdfPath:        string | null
  pdfGeneratedAt: string | null
  clientToken:    string | null
  notes:          string | null
  createdAt:      string
  updatedAt:      string
}

interface AccessResult {
  url:      string
  password: string | null
}

interface SeedReportResult {
  name:      string
  clientUrl: string
  password:  string
}

interface Props {
  initialReports: Report[]
}

const STATUS_LABEL: Record<string, string> = {
  draft:      "Draft",
  generating: "Generating",
  ready:      "Ready",
  delivered:  "Delivered",
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://boutiquestandard.com"

function makeClientUrl(token: string): string {
  return `${BASE_URL}/client/${token}/report`
}

export function ReportsClient({ initialReports }: Props) {
  const [reports, setReports]             = useState<Report[]>(initialReports)
  const [loading, setLoading]             = useState<string | null>(null)
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null)
  const [seedResults, setSeedResults]     = useState<SeedReportResult[]>([])
  const [accessResults, setAccessResults] = useState<Record<string, AccessResult>>({})
  const [copied, setCopied]           = useState<string | null>(null)
  const [error, setError]             = useState<string | null>(null)
  const [message, setMessage]         = useState<string | null>(null)

  const stats = {
    total:     reports.length,
    ready:     reports.filter((r) => r.status === "ready").length,
    delivered: reports.filter((r) => r.status === "delivered").length,
  }

  async function refresh() {
    const res  = await fetch("/api/admin/reports/list")
    const data = await res.json()
    if (data.reports) setReports(data.reports)
  }

  const handleCopy = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard API unavailable - silent fail
    }
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  async function seedMaison() {
    setLoading("seed")
    setError(null)
    const res = await fetch("/api/admin/reports/seed-maison", { method: "POST" })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Seed failed")
    } else {
      setSeedResults(data.reports || [])
      await refresh()
    }
    setLoading(null)
  }

  async function handleGeneratePDF(reportId: string) {
    setGeneratingPdf(reportId)
    setError(null)
    setMessage(null)
    try {
      const response = await fetch(
        `/api/admin/reports/${reportId}/generate-pdf`,
        { method: "POST" }
      )

      if (!response.ok) {
        const err = await response.json()
        if (err.action === "create_access_first") {
          setMessage("Create client access first, then generate PDF.")
        } else {
          setError("PDF generation failed: " + (err.error || "Unknown error"))
        }
        return
      }

      // Download the PDF
      const blob = await response.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement("a")
      a.href     = url
      a.download = `${reportId}-report.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setMessage("PDF downloaded successfully.")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setError("Error: " + msg)
    } finally {
      setGeneratingPdf(null)
    }
  }

  async function createClientAccess(id: string) {
    setLoading(`client-${id}`)
    setError(null)
    const res = await fetch(`/api/admin/reports/${id}/create-client-access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Failed to create client access")
    } else {
      const token    = data.token || data.clientReport?.token
      const password = data.password || null
      if (token) {
        setAccessResults((prev) => ({
          ...prev,
          [id]: { url: makeClientUrl(token), password },
        }))
      }
      await refresh()
    }
    setLoading(null)
  }

  async function markDelivered(id: string) {
    setLoading(`status-${id}`)
    const res = await fetch(`/api/admin/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "delivered" }),
    })
    if (res.ok) await refresh()
    setLoading(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reports</h1>
          <p className={styles.subtitle}>Audit deliverables - PDF and client web report management.</p>
        </div>
        <button
          className={styles.seedBtn}
          onClick={seedMaison}
          disabled={loading === "seed"}
        >
          {loading === "seed" ? "Seeding..." : "Seed Demo Report"}
        </button>
      </div>

      {seedResults.length > 0 && (
        <div className={styles.seedResult}>
          <span className={styles.seedResultLabel}>Demo reports ready</span>
          {seedResults.map((r) => (
            <div key={r.clientUrl} className={styles.seedResultRow}>
              <span className={styles.seedResultName}>{r.name}</span>
              <a
                href={r.clientUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.seedResultLink}
              >
                {r.clientUrl}
              </a>
              <span className={styles.seedResultPassword}>
                Password: <strong>{r.password}</strong>
              </span>
              <button
                className={styles.copyBtn}
                onClick={() => handleCopy(r.clientUrl)}
              >
                {copied === r.clientUrl ? "Copied!" : "Copy URL"}
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className={styles.errorBar}>{error}</div>
      )}

      {message && (
        <div className={styles.messageBar}>{message}</div>
      )}

      <div className={styles.statBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.total}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.ready}</span>
          <span className={styles.statLabel}>Ready</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.delivered}</span>
          <span className={styles.statLabel}>Delivered</span>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className={styles.empty}>
          <p>No reports yet. Click "Seed Demo Report" to add the sample report.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Property</th>
                <th>Location</th>
                <th>Audit Date</th>
                <th>Status</th>
                <th>PDF</th>
                <th>Client Access</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => {
                const rowResult  = accessResults[r.id]
                const viewUrl    = r.clientToken ? makeClientUrl(r.clientToken) : null
                const displayUrl = rowResult?.url || viewUrl

                return (
                  <tr key={r.id}>
                    <td>
                      <span className={styles.hotelName}>{r.hotelName}</span>
                      <span className={styles.slug}>{r.slug}</span>
                    </td>
                    <td>{r.location}</td>
                    <td>{r.auditDate}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge_${r.status}`]}`}>
                        {STATUS_LABEL[r.status] ?? r.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleGeneratePDF(r.id)}
                        disabled={generatingPdf === r.id}
                      >
                        {generatingPdf === r.id ? "Generating..." : "Download PDF"}
                      </button>
                    </td>
                    <td>
                      {displayUrl ? (
                        <div className={styles.accessCell}>
                          <a
                            href={displayUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.clientLink}
                          >
                            View Report
                          </a>
                          {rowResult?.password && (
                            <span className={styles.cellPassword}>
                              pw: <strong>{rowResult.password}</strong>
                            </span>
                          )}
                          <button
                            className={styles.copyBtnSmall}
                            onClick={() => handleCopy(displayUrl)}
                          >
                            {copied === displayUrl ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      ) : (
                        <button
                          className={styles.actionBtn}
                          onClick={() => createClientAccess(r.id)}
                          disabled={loading === `client-${r.id}`}
                        >
                          {loading === `client-${r.id}` ? "Creating..." : "Create Access"}
                        </button>
                      )}
                    </td>
                    <td>
                      {r.status === "ready" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => markDelivered(r.id)}
                          disabled={loading === `status-${r.id}`}
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className={styles.pdfNote}>
        PDF generation uses Chromium headless. Allow 15-30 seconds. Client access must exist before generating.
      </p>
    </div>
  )
}
