import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S13Closing.module.css"
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

export default function S13Closing({ data }: Props) {
  const sentences = data.closingAssessment.split(". ").filter(Boolean)
  const pullQuoteSentences = sentences.slice(0, 2).join(". ") + "."
  const remainder = sentences.slice(2).join(". ").trim()

  return (
    <section id="closing" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>13 - Closing Assessment</p>

        {/* Pull quote */}
        <div className={styles.pullQuoteBlock}>
          <p className={styles.pullQuote}>{pullQuoteSentences}</p>
        </div>

        {/* Remainder */}
        {remainder && (
          <p className={styles.body}>{remainder}</p>
        )}

        {/* Summary score grid */}
        <div className={styles.scoreGrid}>
          {SCORE_TILES.map((tile) => (
            <div key={tile.key} className={styles.scoreTile}>
              <p className={styles.scoreNumber}>
                {data.scores[tile.key].toFixed(1)}
                <span className={styles.scoreDenom}>/10</span>
              </p>
              <p className={styles.scoreLabel}>{tile.label}</p>
              <ScoreBar value={data.scores[tile.key]} />
            </div>
          ))}
        </div>

        {/* Recommendation status */}
        <div className={styles.statusRow}>
          <span className={styles.statusBadge}>
            Strongly Recommended for Continued Refinement
          </span>
        </div>

        {/* Signature */}
        <div className={styles.signature}>
          <div className={styles.sigRule} />
          <p className={styles.sigPrepared}>Prepared by</p>
          <p className={styles.sigName}>The Boutique Standard</p>
          <p className={styles.sigTagline}>Independent Guest Experience Intelligence</p>
          <p className={styles.sigUrl}>boutiquestandard.com</p>
          <p className={styles.confidential}>
            This report is confidential and prepared exclusively for the property named herein.
          </p>
        </div>
      </div>
    </section>
  )
}
