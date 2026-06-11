"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import styles from "./admin.module.css"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <div className={styles.shell}>
      {/* Mobile hamburger */}
      <button
        className={styles.menuButton}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open navigation"
      >
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect y="0" width="16" height="1.5" fill="currentColor" />
          <rect y="5.25" width="16" height="1.5" fill="currentColor" />
          <rect y="10.5" width="16" height="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`} aria-label="Admin navigation">
        <div className={styles.sidebarTop}>
          <p className={styles.wordmark}>TBS</p>
          <ul className={styles.nav}>
            {[
              { href: "/admin/hotels",    label: "Hotels" },
              { href: "/admin/reports",   label: "Reports" },
              { href: "/admin/prospects", label: "Prospects" },
              { href: "/admin/pipeline",  label: "Pipeline" },
              { href: "/admin/outreach",  label: "Outreach" },
              { href: "/admin/settings",  label: "Settings" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={styles.navLink} onClick={close}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sidebarBottom}>
          <Link href="/" className={styles.siteLink} target="_blank">
            View site
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
