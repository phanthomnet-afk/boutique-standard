"use client"

import { useEffect, useRef } from "react"
import styles from "./ScoreBar.module.css"

interface Props {
  value: number
  max?: number
  variant?: "default" | "dark"
}

export function ScoreBar({ value, max = 10, variant = "default" }: Props) {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fill = fillRef.current
    if (!fill) return
    const track = fill.parentElement!
    let triggered = false

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true
          fill.style.width = `${(value / max) * 100}%`
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(track)
    return () => obs.disconnect()
  }, [value, max])

  return (
    <div className={`${styles.track} ${variant === "dark" ? styles.dark : ""}`}>
      <div
        ref={fillRef}
        className={styles.fill}
        style={{ width: 0, transition: "width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      />
    </div>
  )
}
