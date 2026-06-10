import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S06JourneyNarratives.module.css"

interface Props {
  data: ClientReportData
}

const STAGE_KEYS = ["arrival", "room", "dining", "facilities", "serviceCulture", "departure"]

const STAGE_NUMBERS: Record<string, string> = {
  arrival: "06.1",
  room: "06.2",
  dining: "06.3",
  facilities: "06.4",
  serviceCulture: "06.5",
  departure: "06.6",
}

const BAND_LABELS: Record<string, string> = {
  exceptional: "Exceptional",
  strong: "Strong",
  acceptable: "Acceptable",
  attention: "Requires Attention",
  critical: "Critical",
}

export default function S06JourneyNarratives({ data }: Props) {
  const stages = data.journey.filter((s) => STAGE_KEYS.includes(s.key))

  return (
    <>
      {stages.map((stage, idx) => (
        <section
          key={stage.key}
          className={`${styles.stage} ${idx % 2 === 1 ? styles.stageAlt : ""}`}
        >
          <div className={styles.inner}>
            {/* Header row */}
            <div className={styles.stageHeader}>
              <p className={styles.stageNumber}>{STAGE_NUMBERS[stage.key]}</p>
              <div className={styles.stageMeta}>
                <h2 className={styles.stageName}>{stage.label}</h2>
                <div className={`${styles.scorePill} ${styles[`band_${stage.band}`]}`}>
                  <span className={styles.scoreVal}>{stage.score.toFixed(1)}</span>
                  <span className={styles.scoreBand}>{BAND_LABELS[stage.band] ?? stage.band}</span>
                </div>
              </div>
            </div>

            {/* Image placeholder */}
            <div
              className={styles.imagePlaceholder}
              data-image-slot={`asset-${stage.key}`}
            >
              <span className={styles.imageNote}>{stage.label} image</span>
            </div>

            {/* Narrative */}
            <p className={styles.narrative}>{stage.narrative}</p>

            {/* Strengths + friction */}
            <div className={styles.twoCol}>
              <div className={styles.col}>
                <p className={styles.colLabel}>What Worked</p>
                <ul className={styles.list}>
                  {stage.strengths.map((s) => (
                    <li key={s}>- {s}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.col}>
                <p className={styles.colLabel}>Friction Points</p>
                <ul className={styles.list}>
                  {stage.frictionPoints.length > 0
                    ? stage.frictionPoints.map((f) => <li key={f}>- {f}</li>)
                    : <li className={styles.none}>None identified</li>}
                </ul>
              </div>
            </div>

            {/* Memory impact */}
            <div className={styles.memoryBox}>
              <p className={styles.memoryLabel}>Memory Impact</p>
              <p className={styles.memoryText}>{stage.memoryImpact}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
