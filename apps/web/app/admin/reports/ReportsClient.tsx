"use client"

import { useState } from "react"
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

interface Props {
  initialReports: Report[]
}

const STATUS_LABEL: Record<string, string> = {
  draft:      "Draft",
  generating: "Generating",
  ready:      "Ready",
  delivered:  "Delivered",
}

export function ReportsClient({ initialReports }: Props) {
  const [reports, setReports]     = useState<Report[]>(initialReports)
  const [loading, setLoading]     = useState<string | null>(null)
  const [seedDone, setSeedDone]   = useState(false)
  const [error, setError]         = useState<string | null>(null)

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

  async function seedMaison() {
    setLoading("seed")
    setError(null)
    const res = await fetch("/api/admin/reports/seed-maison", { method: "POST" })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Seed failed")
    } else {
      setSeedDone(true)
      await refresh()
    }
    setLoading(null)
  }

  async function generatePDF(id: string) {
    setLoading(`pdf-${id}`)
    setError(null)
    const res = await fetch(`/api/admin/reports/${id}/generate-pdf`, { method: "POST" })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "PDF generation failed")
    } else {
      await refresh()
    }
    setLoading(null)
  }

  async function createClientAccess(id: string) {
    setLoading(`client-${id}`)
    setError(null)
    const res = await fetch(`/api/admin/reports/${id}/create-client-access`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Failed to create client access")
    } else {
      const token    = data.clientReport?.token
      const password = data.password
      const url      = token ? `/client/${token}/report` : null
      if (url && password) alert(`Client access created.\n\nURL: ${url}\nPassword: ${password}\n\nSave the password - it cannot be recovered.`)
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
          {loading === "seed" ? "Seeding..." : seedDone ? "Seeded" : "Seed Maison du Rivage"}
        </button>
      </div>

      {error && (
        <div className={styles.errorBar}>{error}</div>
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
          <p>No reports yet. Click "Seed Maison du Rivage" to add the sample report.</p>
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
              {reports.map((r) => (
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
                    {r.pdfPath ? (
                      <span className={styles.pdfReady}>Ready</span>
                    ) : (
                      <button
                        className={styles.actionBtn}
                        onClick={() => generatePDF(r.id)}
                        disabled={loading === `pdf-${r.id}` || r.status === "generating"}
                      >
                        {loading === `pdf-${r.id}` ? "Generating..." : "Generate PDF"}
                      </button>
                    )}
                  </td>
                  <td>
                    {r.clientToken ? (
                      <a
                        href={`/client/${r.clientToken}/report`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.clientLink}
                      >
                        View
                      </a>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
