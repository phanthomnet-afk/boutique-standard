"use client"

import { useRef, useEffect, useState } from "react"
import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S05-JourneyOverview.module.css"

interface Props {
  data: ClientReportData
}

const BAND_LABELS: Record<string, string> = {
  exceptional: "Exceptional",
  strong: "Strong",
  acceptable: "Acceptable",
  attention: "Requires Attention",
  critical: "Critical",
}

export default function S05JourneyOverview({ data }: Props) {
  const [animated, setAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const stages = data.journey

  return (
    <section id="journey" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>05 - Guest Journey</p>
          <h2 className={styles.heading}>The Experience Mapped</h2>
        </div>

        {/* Desktop timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineTrack} />
          {stages.map((stage, i) => {
            const isTop = i % 2 === 0
            const scoreNorm = (stage.score / 10)
            const dotOffset = isTop
              ? `calc(50% - ${scoreNorm * 60}px)`
              : `calc(50% + ${scoreNorm * 60}px)`

            return (
              <div key={stage.key} className={styles.stageCol}>
                <div
                  className={`${styles.stageCard} ${isTop ? styles.top : styles.bottom}`}
                  style={{ opacity: animated ? 1 : 0, transform: animated ? "none" : "translateY(8px)", transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms` }}
                >
                  <p className={styles.stageName}>{stage.label}</p>
                  <p className={styles.stageScore}>{stage.score.toFixed(1)}</p>
                  <p className={`${styles.stageBand} ${styles[`band_${stage.band}`]}`}>
                    {BAND_LABELS[stage.band] ?? stage.band}
                  </p>
                </div>

                <div
                  className={styles.stageDot}
                  style={{ top: dotOffset }}
                />
              </div>
            )
          })}
        </div>

        {/* Mobile list */}
        <div className={styles.mobileList}>
          {stages.map((stage) => (
            <div key={stage.key} className={styles.mobileRow}>
              <div className={styles.mobileLeft}>
                <p className={styles.stageName}>{stage.label}</p>
                <span className={`${styles.mobileBand} ${styles[`band_${stage.band}`]}`}>
                  {BAND_LABELS[stage.band] ?? stage.band}
                </span>
              </div>
              <p className={styles.mobileScore}>{stage.score.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
