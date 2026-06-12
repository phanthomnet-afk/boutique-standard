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
  const [error, setError] = useState<{ code: string; message: string } | null>(null)

  useEffect(() => {
    fetch(`/api/client/${token}/data`)
      .then(async (res) => {
        if (res.status === 401) {
          // Cookie expired or missing - reload to show the password gate
          window.location.reload()
          return null
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          setError({
            code:    body.error   || (res.status === 404 ? "not_found" : "no_data"),
            message: body.message || "Unable to load report.",
          })
          return null
        }
        return res.json()
      })
      .then((json) => {
        if (json) setData(json)
      })
      .catch(() =>
        setError({ code: "network", message: "Unable to connect." })
      )
  }, [token])

  if (error) {
    let displayMessage = error.message
    if (error.code === "not_found") {
      displayMessage = "This report link is no longer active. Contact hello@boutiquestandard.com"
    } else if (error.code === "no_data") {
      displayMessage = "Report temporarily unavailable. Please try again in a few minutes."
    } else if (error.code === "network") {
      displayMessage = "Unable to connect. Please check your connection and refresh."
    }

    return (
      <div className={styles.loading}>
        <p className={styles.errorMsg}>{displayMessage}</p>
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
