"use client"

import { useEffect, useState, useCallback } from "react"
import type { ClientReportData } from "@tbs/web-engine"
import styles from "./ReportShell.module.css"
import "./report.css"
import { ReportImage } from "./ReportImage"

import S01ExecutiveSnapshot from "./sections/S01-ExecutiveSnapshot"
import S02PropertyContext from "./sections/S02-PropertyContext"
import S03PromiseAnalysis from "./sections/S03-PromiseAnalysis"
import S04ExperienceDNA from "./sections/S04-ExperienceDNA"
import S05JourneyOverview from "./sections/S05-JourneyOverview"
import S06JourneyNarratives from "./sections/S06-JourneyNarratives"
import S07ContinuityMap from "./sections/S07-ContinuityMap"
import S08Misalignments from "./sections/S08-Misalignments"
import S09MemoryIndex from "./sections/S09-MemoryIndex"
import S10NeverChange from "./sections/S10-NeverChange"
import S11Scoreboard from "./sections/S11-Scoreboard"
import S12Opportunities from "./sections/S12-Opportunities"
import S13Closing from "./sections/S13-Closing"

const NAV_ITEMS = [
  { key: "overview",       label: "Overview",      sectionId: "overview" },
  { key: "property",       label: "Property",      sectionId: "property" },
  { key: "promise",        label: "Promise",       sectionId: "promise" },
  { key: "journey",        label: "Journey",       sectionId: "journey" },
  { key: "continuity",     label: "Continuity",    sectionId: "continuity" },
  { key: "misalignments",  label: "Misalignments", sectionId: "misalignments" },
  { key: "memory",         label: "Memory",        sectionId: "memory" },
  { key: "scoreboard",     label: "Scoreboard",    sectionId: "scoreboard" },
  { key: "opportunities",  label: "Opportunities", sectionId: "opportunities" },
]

interface Props {
  data: ClientReportData
  token: string
}

export default function ReportShell({ data, token: _token }: Props) {
  const [activeSection, setActiveSection] = useState("overview")
  const [activeSectionName, setActiveSectionName] = useState("Overview")

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.sectionId)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const nav = NAV_ITEMS.find((n) => n.sectionId === id)
            if (nav) {
              setActiveSection(nav.key)
              setActiveSectionName(nav.label)
            }
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const keys = NAV_ITEMS.map((n) => n.sectionId)
      const current = NAV_ITEMS.findIndex((n) => n.key === activeSection)

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        const next = Math.min(current + 1, keys.length - 1)
        scrollTo(keys[next])
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        const prev = Math.max(current - 1, 0)
        scrollTo(keys[prev])
      } else if (e.key === "Home") {
        e.preventDefault()
        scrollTo(keys[0])
      } else if (e.key === "End") {
        e.preventDefault()
        scrollTo(keys[keys.length - 1])
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [activeSection, scrollTo])

  return (
    <div className={`${styles.shell} report-shell`}>
      {/* Desktop dot navigation */}
      <nav className={`${styles.nav} report-nav`} aria-label="Report sections">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`${styles.dot} ${activeSection === item.key ? styles.dotActive : ""}`}
            onClick={() => scrollTo(item.sectionId)}
            aria-label={item.label}
            title={item.label}
          >
            <span className={styles.tooltip}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile bottom bar */}
      <div className={`${styles.mobileNav} report-nav-mobile`}>
        <p className={styles.mobileLabel}>{activeSectionName}</p>
        <div className={styles.mobileDots}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`${styles.mobileDot} ${activeSection === item.key ? styles.mobileDotActive : ""}`}
              onClick={() => scrollTo(item.sectionId)}
              aria-label={item.label}
            />
          ))}
        </div>
      </div>

      {/* Print button */}
      <button
        className={`${styles.printBtn} report-print-btn`}
        onClick={() => window.print()}
      >
        Print / Save PDF
      </button>

      {/* Hero */}
      <div className={styles.reportHero}>
        <div className={styles.reportHeroBg}>
          <ReportImage
            assetId="asset-cover"
            aspectRatio="16:9"
            priority
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Guest Experience Intelligence Report</p>
          <h1 className={styles.heroTitle}>{data.property.name}</h1>
          <p className={styles.heroLocation}>{data.property.location}</p>
        </div>
      </div>

      {/* Report sections */}
      <main className={styles.main}>
        <S01ExecutiveSnapshot data={data} />
        <S02PropertyContext data={data} />
        <S03PromiseAnalysis data={data} />
        <S04ExperienceDNA data={data} />
        <S05JourneyOverview data={data} />
        <S06JourneyNarratives data={data} />
        <S07ContinuityMap data={data} />
        <S08Misalignments data={data} />
        <S09MemoryIndex data={data} />
        <S10NeverChange data={data} />
        <S11Scoreboard data={data} />
        <S12Opportunities data={data} />
        <S13Closing data={data} />
      </main>
    </div>
  )
}
