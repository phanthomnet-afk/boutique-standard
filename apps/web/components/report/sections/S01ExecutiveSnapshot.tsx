import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S01ExecutiveSnapshot.module.css"
import { ScoreBar } from "../ScoreBar"

interface Props {
  data: ClientReportData
}

const SCORE_TILES = [
  { key: "overall" as const,     label: "Overall Alignment" },
  { key: "experience" as const,  label: "Guest Experience" },
  { key: "continuity" as const,  label: "Continuity" },
  { key: "memory" as const,      label: "Memory Impact" },
]

export default function S01ExecutiveSnapshot({ data }: Props) {
  const quickWins = data.recommendations.filter((r) => r.isQuickWin).slice(0, 3)
  const protectedHigh = data.neverChange.filter((e) => e.priority === "high")

  return (
    <section id="overview" className={styles.section}>
      <div className={styles.inner}>
        {/* Left: sticky summary */}
        <div className={styles.left}>
          <p className={styles.sectionLabel}>01 - Executive Snapshot</p>
          <h1 className={styles.propertyName}>{data.property.name}</h1>
          <p className={styles.location}>{data.property.location}</p>
          <p className={styles.auditDate}>
            Audit date - {new Date(data.auditDate).toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </p>
          <div className={styles.accentLine} />
          <p className={styles.summary}>{data.executiveSummary}</p>
        </div>

        {/* Right: scores + key findings */}
        <div className={styles.right}>
          {/* 2x2 score grid */}
          <div className={styles.scoreGrid}>
            {SCORE_TILES.map((tile, i) => (
              <div
                key={tile.key}
                className={styles.scoreTile}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <p className={styles.scoreNumber}>
                  {data.scores[tile.key].toFixed(1)}
                  <span className={styles.scoreDenom}>/10</span>
                </p>
                <p className={styles.scoreLabel}>{tile.label}</p>
                <ScoreBar value={data.scores[tile.key]} />
              </div>
            ))}
          </div>

          {/* Three column summary */}
          <div className={styles.summary3col}>
            <div className={styles.summaryCol}>
              <p className={styles.colLabel}>Key Strengths</p>
              <ul className={styles.list}>
                {data.neverChange.slice(0, 4).map((e) => (
                  <li key={e.element}>- {e.element}</li>
                ))}
              </ul>
            </div>

            <div className={styles.summaryCol}>
              <p className={styles.colLabel}>Priority Opportunities</p>
              <ul className={styles.list}>
                {quickWins.map((r) => (
                  <li key={r.title}>- {r.title}</li>
                ))}
              </ul>
            </div>

            <div className={styles.summaryCol}>
              <p className={styles.colLabel}>Never Change</p>
              <ul className={styles.list}>
                {protectedHigh.slice(0, 4).map((e) => (
                  <li key={e.element}>- {e.element}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
