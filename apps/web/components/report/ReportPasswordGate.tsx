"use client"

import { useState } from "react"
import styles from "./ReportPasswordGate.module.css"

interface Props {
  token: string
  hotelName: string
  location: string
}

export default function ReportPasswordGate({ token, hotelName, location }: Props) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit() {
    if (!password.trim() || loading) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/client/${token}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        window.location.reload()
      } else {
        const data = await res.json()
        setError(data.error ?? "Incorrect access code. Please try again.")
        setLoading(false)
      }
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.rule} />
        <p className={styles.property}>{hotelName}</p>
        <p className={styles.location}>{location}</p>
        <div className={styles.spacer} />
        <p className={styles.reportLabel}>Guest Experience Intelligence Report</p>
        <div className={styles.spacerLg} />
        <input
          className={styles.input}
          type="password"
          placeholder="Enter your access code"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoComplete="current-password"
        />
        <div className={styles.spacerMd} />
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={loading || !password.trim()}
        >
          {loading ? "Checking..." : "Access Report"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  )
}
