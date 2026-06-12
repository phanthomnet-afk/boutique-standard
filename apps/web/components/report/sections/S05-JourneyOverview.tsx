"use client"

import { useRef, useEffect, useState } from "react"
import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S05-JourneyOverview.module.css"

interface Props {
  data: ClientReportData
}

const BAND_LABELS: Record<string, string> = {
  exceptional: "Exceptional",
  strong:      "Strong",
  acceptable:  "Acceptable",
  attention:   "Requires Attention",
  critical:    "Critical",
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

        <div className={styles.stageList}>
          {stages.map((stage, i) => (
            <div
              key={stage.key}
              className={styles.stageRow}
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? "none" : "translateY(8px)",
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
              }}
            >
              <span className={styles.stageName}>{stage.label}</span>
              <div className={styles.stageBar}>
                <div
                  className={styles.stageBarFill}
                  style={{
                    width: animated ? `${stage.score * 10}%` : "0%",
                    transition: `width 0.6s ease ${i * 60 + 200}ms`,
                  }}
                />
              </div>
              <span className={styles.stageScore}>{stage.score.toFixed(1)}</span>
              <span className={`${styles.stageBand} ${styles[`band_${stage.band}`]}`}>
                {BAND_LABELS[stage.band] ?? stage.band}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
