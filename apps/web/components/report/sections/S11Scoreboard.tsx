import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S11Scoreboard.module.css"
import { ScoreBar } from "../ScoreBar"

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

const LEGEND = [
  { range: "9-10", label: "Exceptional", band: "exceptional" },
  { range: "7-8",  label: "Strong",      band: "strong" },
  { range: "5-6",  label: "Acceptable",  band: "acceptable" },
  { range: "3-4",  label: "Attention",   band: "attention" },
  { range: "0-2",  label: "Critical",    band: "critical" },
]

export default function S11Scoreboard({ data }: Props) {
  const entries = data.scoreboard
  const overall = entries.find((e) => e.label === "Overall Guest Experience")
  const rest = entries.filter((e) => e.label !== "Overall Guest Experience")

  return (
    <section id="scoreboard" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>11 - Scoreboard</p>
          <h2 className={styles.heading}>Full Evaluation</h2>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span className={styles.thCategory}>Category</span>
            <span className={styles.thBar} />
            <span className={styles.thScore}>Score</span>
            <span className={styles.thBand}>Band</span>
            <span className={styles.thNote}>Note</span>
          </div>

          {rest.map((entry) => (
            <div key={entry.label} className={styles.row}>
              <span className={styles.rowCategory}>{entry.label}</span>
              <div className={styles.rowBar}>
                <ScoreBar value={entry.value} />
              </div>
              <span className={styles.rowScore}>{entry.value.toFixed(1)}</span>
              <span className={`${styles.rowBand} ${styles[`band_${entry.band}`]}`}>
                {BAND_LABELS[entry.band] ?? entry.band}
              </span>
              <span className={styles.rowNote}>{entry.note}</span>
            </div>
          ))}

          {overall && (
            <div className={`${styles.row} ${styles.overallRow}`}>
              <span className={styles.rowCategory}>{overall.label}</span>
              <div className={styles.rowBar}>
                <ScoreBar value={overall.value} />
              </div>
              <span className={styles.rowScore}>{overall.value.toFixed(1)}</span>
              <span className={`${styles.rowBand} ${styles[`band_${overall.band}`]}`}>
                {BAND_LABELS[overall.band] ?? overall.band}
              </span>
              <span className={styles.rowNote}>{overall.note}</span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          {LEGEND.map((l) => (
            <div key={l.band} className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles[`band_${l.band}`]}`} />
              <span className={styles.legendRange}>{l.range}</span>
              <span className={styles.legendLabel}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
