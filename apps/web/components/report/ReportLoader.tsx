"use client"

import { useEffect, useState } from "react"
import type { ClientReportData } from "@tbs/web-engine"
import ReportShell from "./ReportShell"
import styles from "./ReportLoader.module.css"

interface Props {
  token: string
  hotelName: string
}

export default function ReportLoader({ token, hotelName }: Props) {
  const [data, setData] = useState<ClientReportData | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/client/${token}/data`)
      .then((res) => {
        if (res.status === 401) {
          window.location.reload()
          return null
        }
        if (!res.ok) throw new Error("Failed to load report")
        return res.json()
      })
      .then((json) => {
        if (json) setData(json)
      })
      .catch(() => setError("Unable to load report. Please refresh the page."))
  }, [token])

  if (error) {
    return (
      <div className={styles.loading}>
        <p className={styles.errorMsg}>{error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={styles.loading}>
        <p className={styles.propertyName}>{hotelName}</p>
        <div className={styles.bar}>
          <div className={styles.barFill} />
        </div>
      </div>
    )
  }

  return <ReportShell data={data} token={token} />
}
