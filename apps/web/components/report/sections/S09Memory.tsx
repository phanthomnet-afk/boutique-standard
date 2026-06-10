import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S09Memory.module.css"

interface Props {
  data: ClientReportData
}

export default function S09Memory({ data }: Props) {
  const { positive, negative } = data.memoryAnchors

  return (
    <section id="memory" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>09 - Memory Index</p>
          <h2 className={styles.heading}>What Stays After Departure</h2>
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <p className={styles.colLabel}>Positive Memory Anchors</p>
            <div className={styles.anchorList}>
              {positive.map((anchor) => (
                <div key={anchor.moment} className={styles.anchor}>
                  <div className={styles.anchorTop}>
                    <h3 className={styles.anchorMoment}>{anchor.moment}</h3>
                    {anchor.likelyReviewMention && (
                      <span className={styles.reviewBadge}>Review signal</span>
                    )}
                  </div>
                  <p className={styles.anchorDescription}>{anchor.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.colLabel}>Negative Memory Anchors</p>
            <div className={styles.anchorList}>
              {negative.map((anchor) => (
                <div key={anchor.moment} className={styles.anchor}>
                  <h3 className={styles.anchorMoment}>{anchor.moment}</h3>
                  <p className={styles.anchorDescription}>{anchor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.insight}>
          <p className={styles.insightText}>
            The positive anchors are multi-sensory and emotionally resonant - precisely the kind of memory that drives both reviews and return visits.
            The negative anchors are operational rather than experiential, which means they are correctable without disrupting what the property does best.
          </p>
        </div>
      </div>
    </section>
  )
}
