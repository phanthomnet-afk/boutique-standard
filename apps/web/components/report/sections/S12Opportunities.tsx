import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S12Opportunities.module.css"

interface Props {
  data: ClientReportData
}

const DIFFICULTY_LABELS: Record<string, string> = {
  low: "Low effort",
  medium: "Medium effort",
  high: "High effort",
}

const COST_LABELS: Record<string, string> = {
  low: "Low cost",
  medium: "Medium cost",
  high: "High cost",
}

export default function S12Opportunities({ data }: Props) {
  const quickWins = data.recommendations.filter((r) => r.isQuickWin)
  const other = data.recommendations.filter((r) => !r.isQuickWin)

  function renderItem(rec: ClientReportData["recommendations"][0], idx: number) {
    return (
      <div key={rec.title} className={styles.item}>
        <div className={styles.itemTop}>
          <span className={styles.itemNumber}>
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className={styles.itemBody}>
            <h3 className={styles.itemTitle}>{rec.title}</h3>
            <p className={styles.itemObservation}>{rec.observation}</p>
            <p className={styles.itemSuggestion}>{rec.suggestion}</p>
            <p className={styles.itemOutcomeLabel}>Expected outcome</p>
            <p className={styles.itemOutcome}>{rec.expectedOutcome}</p>
            <div className={styles.badges}>
              <span className={styles.badge}>{DIFFICULTY_LABELS[rec.difficulty] ?? rec.difficulty}</span>
              <span className={styles.badge}>{COST_LABELS[rec.cost] ?? rec.cost}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="opportunities" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>12 - Opportunities</p>
          <h2 className={styles.heading}>Prioritised Refinements</h2>
          <p className={styles.subtext}>Ranked by guest impact.</p>
        </div>

        {quickWins.length > 0 && (
          <div className={styles.group}>
            <p className={styles.groupLabel}>Quick Wins - achievable within 30 days</p>
            <div className={styles.list}>
              {quickWins.map((r, i) => renderItem(r, i))}
            </div>
          </div>
        )}

        {other.length > 0 && (
          <div className={styles.group}>
            <p className={styles.groupLabel}>Strategic Refinements</p>
            <div className={styles.list}>
              {other.map((r, i) => renderItem(r, quickWins.length + i))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
