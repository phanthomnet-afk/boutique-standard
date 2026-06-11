import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S08-Misalignments.module.css"

interface Props {
  data: ClientReportData
}

const SEVERITY_LABEL: Record<string, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
}

export default function S08Misalignments({ data }: Props) {
  return (
    <section id="misalignments" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>08 - Experience Misalignments</p>
          <h2 className={styles.heading}>Where Promise and Delivery Diverge</h2>
          <p className={styles.subtext}>
            A misalignment occurs when what a property communicates to guests does not match what they experience on arrival.
          </p>
        </div>

        <div className={styles.list}>
          {data.misalignments.map((m, i) => (
            <div key={m.title} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemNumber}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.itemTitleRow}>
                  <h3 className={styles.itemTitle}>{m.title}</h3>
                  <span className={`${styles.severityBadge} ${styles[`sev_${m.severity}`]}`}>
                    {SEVERITY_LABEL[m.severity]}
                  </span>
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.gridRow}>
                  <p className={styles.rowLabel}>Promise</p>
                  <p className={styles.rowText}>{m.promise}</p>
                </div>
                <div className={styles.gridRow}>
                  <p className={styles.rowLabel}>Reality</p>
                  <p className={styles.rowText}>{m.reality}</p>
                </div>
                <div className={styles.gridRow}>
                  <p className={styles.rowLabel}>Impact</p>
                  <p className={styles.rowText}>{m.impact}</p>
                </div>
                <div className={`${styles.gridRow} ${styles.recRow}`}>
                  <p className={`${styles.rowLabel} ${styles.recLabel}`}>Recommendation</p>
                  <p className={styles.rowText}>{m.recommendation}</p>
                </div>
              </div>

              {i < data.misalignments.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
