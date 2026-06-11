import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S03-PromiseAnalysis.module.css"
import { ScoreBar } from "../ScoreBar"

interface Props {
  data: ClientReportData
}

export default function S03PromiseAnalysis({ data }: Props) {
  const { promiseAnalysis, property } = data

  return (
    <section id="promise" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>03 - Promise Analysis</p>
          <h2 className={styles.heading}>What {property.name} Communicates</h2>
        </div>

        <blockquote className={styles.pullQuote}>
          &ldquo;{promiseAnalysis.coreStatement}&rdquo;
        </blockquote>

        <p className={styles.narrative}>{promiseAnalysis.narrative}</p>

        <div className={styles.dimensions}>
          {promiseAnalysis.dimensions.map((d) => (
            <div key={d.label} className={styles.dimension}>
              <div className={styles.dimensionHeader}>
                <span className={styles.dimensionLabel}>{d.label}</span>
                <span className={styles.dimensionScore}>{d.score.value}</span>
              </div>
              <ScoreBar value={d.score.value} />
              <p className={styles.dimensionObservation}>{d.observation}</p>
            </div>
          ))}
        </div>

        <div className={styles.overallTile}>
          <span className={styles.overallLabel}>Overall Promise Alignment</span>
          <span className={styles.overallScore}>{promiseAnalysis.overallAlignment.value}</span>
          <span className={styles.overallNote}>{promiseAnalysis.overallAlignment.note}</span>
        </div>
      </div>
    </section>
  )
}
