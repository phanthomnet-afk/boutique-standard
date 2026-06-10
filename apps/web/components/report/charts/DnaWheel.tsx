"use client"

import { useEffect, useRef } from "react"
import styles from "./DnaWheel.module.css"

interface Props {
  dna: Record<string, number>
}

const DIMENSIONS = [
  { key: "warmth",           label: "Warmth" },
  { key: "privacy",          label: "Privacy" },
  { key: "locality",         label: "Locality" },
  { key: "design",           label: "Design" },
  { key: "luxuryExpression", label: "Luxury" },
  { key: "serviceIntimacy",  label: "Service" },
  { key: "calmness",         label: "Calmness" },
]

const CX = 200
const CY = 200
const RADIUS = 130
const LABEL_RADIUS = 158

function angle(i: number, total: number): number {
  return (-90 + (i * 360) / total) * (Math.PI / 180)
}

function point(r: number, a: number): [number, number] {
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

export default function DnaWheel({ dna }: Props) {
  const polygonRef = useRef<SVGPolygonElement>(null)

  const totalDims = DIMENSIONS.length
  const scores = DIMENSIONS.map((d) => dna[d.key] ?? 0)

  const dataPoints = scores.map((s, i) => {
    const a = angle(i, totalDims)
    return point((s / 10) * RADIUS, a)
  })

  const polygonPoints = dataPoints.map(([x, y]) => `${x},${y}`).join(" ")

  // background rings at 25%, 50%, 75%, 100%
  const rings = [0.25, 0.5, 0.75, 1].map((pct) => {
    const pts = Array.from({ length: totalDims }, (_, i) => {
      const a = angle(i, totalDims)
      return point(pct * RADIUS, a)
    })
    return pts.map(([x, y]) => `${x},${y}`).join(" ")
  })

  // axis lines
  const axes = DIMENSIONS.map((_, i) => {
    const a = angle(i, totalDims)
    return point(RADIUS, a)
  })

  // label positions
  const labels = DIMENSIONS.map((d, i) => {
    const a = angle(i, totalDims)
    const [x, y] = point(LABEL_RADIUS, a)
    let anchor = "middle"
    if (x < CX - 10) anchor = "end"
    else if (x > CX + 10) anchor = "start"
    return { label: d.label, x, y, anchor }
  })

  // Animate polygon on mount
  useEffect(() => {
    const el = polygonRef.current
    if (!el) return

    const parent = el.closest("section") ?? el.closest(".report-shell") ?? document.body
    let triggered = false

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true
          el.style.opacity = "1"
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el.closest("section") ?? el)

    return () => obs.disconnect()
  }, [])

  return (
    <svg
      viewBox="0 0 400 400"
      className={styles.wheel}
      aria-label="Experience DNA radar chart"
    >
      {/* Background rings */}
      {rings.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="var(--color-border, #DDD8D0)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis lines */}
      {axes.map(([x, y], i) => (
        <line
          key={i}
          x1={CX}
          y1={CY}
          x2={x}
          y2={y}
          stroke="var(--color-border, #DDD8D0)"
          strokeWidth="0.5"
        />
      ))}

      {/* Data polygon */}
      <polygon
        ref={polygonRef}
        points={polygonPoints}
        fill="rgba(74, 111, 165, 0.18)"
        stroke="var(--color-accent, #4A6FA5)"
        strokeWidth="1.5"
        style={{
          opacity: 0,
          transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Data dots */}
      {dataPoints.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={4}
          fill="var(--color-accent, #4A6FA5)"
        />
      ))}

      {/* Labels */}
      {labels.map(({ label, x, y, anchor }, i) => (
        <text
          key={i}
          x={x}
          y={y + 4}
          textAnchor={anchor as "middle" | "start" | "end"}
          fontSize="11"
          fontFamily="DM Sans, sans-serif"
          fill="var(--color-text-secondary, #4A4744)"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}
