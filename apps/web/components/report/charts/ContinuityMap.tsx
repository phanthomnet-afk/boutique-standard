"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./ContinuityMap.module.css"

interface DataPoint {
  stage: string
  promise: number
  experience: number
  memory: number
}

interface Props {
  data: DataPoint[]
}

const W = 800
const H = 300
const PAD_LEFT = 60
const PAD_RIGHT = 20
const PAD_TOP = 20
const PAD_BOTTOM = 40
const CHART_W = W - PAD_LEFT - PAD_RIGHT
const CHART_H = H - PAD_TOP - PAD_BOTTOM

const STAGE_LABELS: Record<string, string> = {
  discovery: "Discovery",
  booking: "Booking",
  preArrival: "Pre-Arrival",
  arrival: "Arrival",
  room: "Room",
  dining: "Dining",
  facilities: "Facilities",
  serviceCulture: "Service",
  departure: "Departure",
  postStay: "Post-Stay",
}

function xPos(i: number, total: number): number {
  return PAD_LEFT + (i / (total - 1)) * CHART_W
}

function yPos(score: number): number {
  return PAD_TOP + (1 - score / 10) * CHART_H
}

function smoothPath(points: [number, number][]): string {
  if (points.length < 2) return ""
  let d = `M ${points[0][0]},${points[0][1]}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 2] ?? points[i - 1]
    const curr = points[i - 1]
    const next = points[i]
    const after = points[i + 1] ?? next

    const cp1x = curr[0] + (next[0] - prev[0]) * 0.3
    const cp1y = curr[1] + (next[1] - prev[1]) * 0.3
    const cp2x = next[0] - (after[0] - curr[0]) * 0.3
    const cp2y = next[1] - (after[1] - curr[1]) * 0.3

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next[0]},${next[1]}`
  }
  return d
}

export default function ContinuityMap({ data }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [animated, setAnimated] = useState(false)
  const [hoverX, setHoverX] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; stage: string; promise: number; experience: number; memory: number } | null>(null)

  const n = data.length

  const promisePts: [number, number][] = data.map((d, i) => [xPos(i, n), yPos(d.promise)])
  const expPts: [number, number][] = data.map((d, i) => [xPos(i, n), yPos(d.experience)])
  const memPts: [number, number][] = data.map((d, i) => [xPos(i, n), yPos(d.memory)])

  const promisePath = smoothPath(promisePts)
  const expPath = smoothPath(expPts)
  const memPath = smoothPath(memPts)

  // Gap fill between promise and experience
  function gapPath(above: [number, number][], below: [number, number][]): string {
    const top = smoothPath(above)
    const bottomRev = smoothPath([...below].reverse())
    const lastAbove = above[above.length - 1]
    const firstBelow = below[below.length - 1]
    return `${top} L ${firstBelow[0]},${firstBelow[1]} ${bottomRev.slice(1)} Z`
  }

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const scaleX = W / rect.width
    const mx = (e.clientX - rect.left) * scaleX

    const i = Math.round(((mx - PAD_LEFT) / CHART_W) * (n - 1))
    const clamped = Math.max(0, Math.min(n - 1, i))
    const d = data[clamped]
    const x = xPos(clamped, n)
    setHoverX(x)
    setTooltip({
      x,
      y: yPos(d.experience),
      stage: STAGE_LABELS[d.stage] ?? d.stage,
      promise: d.promise,
      experience: d.experience,
      memory: d.memory,
    })
  }

  const expPromiseGap = gapPath(promisePts, expPts)

  const pathStyle = (delay: number) => ({
    opacity: animated ? 1 : 0,
    transition: animated
      ? `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`
      : "none",
  })

  return (
    <div className={styles.wrapper}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={styles.chart}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setHoverX(null); setTooltip(null) }}
        aria-label="Experience continuity map"
      >
        {/* Y-axis labels */}
        {[0, 5, 10].map((v) => (
          <text
            key={v}
            x={PAD_LEFT - 8}
            y={yPos(v) + 4}
            textAnchor="end"
            fontSize="10"
            fontFamily="DM Sans, sans-serif"
            fill="rgba(248,245,240,0.4)"
          >
            {v}
          </text>
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={xPos(i, n)}
            y={H - 6}
            textAnchor="middle"
            fontSize="9"
            fontFamily="DM Sans, sans-serif"
            fill="rgba(248,245,240,0.4)"
          >
            {STAGE_LABELS[d.stage] ?? d.stage}
          </text>
        ))}

        {/* Gap fill: experience vs promise */}
        <path
          d={expPromiseGap}
          fill="rgba(139, 58, 58, 0.12)"
          stroke="none"
          style={{ opacity: animated ? 1 : 0, transition: "opacity 0.6s ease 1.4s" }}
        />

        {/* Promise line */}
        <path
          d={promisePath}
          fill="none"
          stroke="#8B6F47"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          style={pathStyle(0)}
        />

        {/* Experience line */}
        <path
          d={expPath}
          fill="none"
          stroke="#4A6FA5"
          strokeWidth="2"
          style={pathStyle(400)}
        />

        {/* Memory line */}
        <path
          d={memPath}
          fill="none"
          stroke="rgba(248,245,240,0.5)"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          style={pathStyle(800)}
        />

        {/* Hover line */}
        {hoverX !== null && (
          <line
            x1={hoverX}
            y1={PAD_TOP}
            x2={hoverX}
            y2={H - PAD_BOTTOM}
            stroke="rgba(248,245,240,0.2)"
            strokeWidth="1"
          />
        )}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={Math.min(tooltip.x - 50, W - 120)}
              y={PAD_TOP}
              width={110}
              height={62}
              rx={3}
              fill="#1C1C1C"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
            <text
              x={Math.min(tooltip.x - 50, W - 120) + 8}
              y={PAD_TOP + 14}
              fontSize="10"
              fontFamily="DM Sans, sans-serif"
              fill="rgba(248,245,240,0.8)"
              fontWeight="600"
            >
              {tooltip.stage}
            </text>
            <text x={Math.min(tooltip.x - 50, W - 120) + 8} y={PAD_TOP + 28} fontSize="9" fontFamily="DM Sans, sans-serif" fill="#8B6F47">
              Promise {tooltip.promise}
            </text>
            <text x={Math.min(tooltip.x - 50, W - 120) + 8} y={PAD_TOP + 42} fontSize="9" fontFamily="DM Sans, sans-serif" fill="#4A6FA5">
              Experience {tooltip.experience}
            </text>
            <text x={Math.min(tooltip.x - 50, W - 120) + 8} y={PAD_TOP + 56} fontSize="9" fontFamily="DM Sans, sans-serif" fill="rgba(248,245,240,0.5)">
              Memory {tooltip.memory}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="#8B6F47" strokeWidth="1.5" strokeDasharray="4 2" /></svg>
          <span>Promise</span>
        </div>
        <div className={styles.legendItem}>
          <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="#4A6FA5" strokeWidth="2" /></svg>
          <span>Experience</span>
        </div>
        <div className={styles.legendItem}>
          <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="rgba(248,245,240,0.5)" strokeWidth="1.5" strokeDasharray="2 2" /></svg>
          <span>Memory</span>
        </div>
      </div>
    </div>
  )
}
