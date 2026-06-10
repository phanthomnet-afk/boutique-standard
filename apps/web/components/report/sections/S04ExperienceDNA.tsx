import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S04ExperienceDNA.module.css"
import DnaWheel from "../charts/DnaWheel"
import { ScoreBar } from "../ScoreBar"

interface Props {
  data: ClientReportData
}

const DIMENSION_LABELS: Record<string, string> = {
  warmth:           "Warmth",
  privacy:          "Privacy",
  locality:         "Locality",
  design:           "Design",
  luxuryExpression: "Luxury Expression",
  serviceIntimacy:  "Service Intimacy",
  calmness:         "Calmness",
  energy:           "Energy",
}

export default function S04ExperienceDNA({ data }: Props) {
  const dims = Object.entries(data.experienceDNA)
    .filter(([, v]) => typeof v === "number")
    .sort(([a], [b]) => {
      const order = ["warmth", "privacy", "locality", "design", "luxuryExpression", "serviceIntimacy", "calmness"]
      return order.indexOf(a) - order.indexOf(b)
    })

  return (
    <section id="dna" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>04 - Experience DNA</p>
          <h2 className={styles.heading}>The Seven Dimensions of This Property</h2>
        </div>

        <div className={styles.body}>
          <div className={styles.wheelCol}>
            <DnaWheel dna={data.experienceDNA} />
          </div>

          <div className={styles.tableCol}>
            {dims.map(([key, value]) => (
              <div key={key} className={styles.dimRow}>
                <p className={styles.dimLabel}>{DIMENSION_LABELS[key] ?? key}</p>
                <div className={styles.dimBar}>
                  <ScoreBar value={value as number} />
                  <span className={styles.dimScore}>{(value as number).toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
