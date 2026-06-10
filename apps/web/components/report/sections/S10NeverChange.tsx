import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S10NeverChange.module.css"

interface Props {
  data: ClientReportData
}

export default function S10NeverChange({ data }: Props) {
  return (
    <section id="protected" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>10 - Protected Identity</p>
          <h2 className={styles.heading}>What Should Never Change</h2>
          <p className={styles.subtext}>
            These are the qualities that define this property in the minds of guests.
            They are not features - they are the reason guests return and recommend.
          </p>
        </div>

        <div className={styles.list}>
          {data.neverChange.map((item, i) => (
            <div key={item.element} className={styles.item}>
              <div className={styles.itemNumber}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.element}>{item.element}</h3>
                  {item.priority === "high" && (
                    <span className={styles.priorityBadge}>High Priority</span>
                  )}
                </div>
                <p className={styles.rationale}>{item.rationale}</p>
                <p className={styles.riskLabel}>Risk if lost</p>
                <p className={styles.risk}>{item.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
