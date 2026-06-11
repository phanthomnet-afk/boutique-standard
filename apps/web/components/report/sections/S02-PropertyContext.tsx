import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S02-PropertyContext.module.css"
import { ScoreBar } from "../ScoreBar"
import { ReportImage } from "../ReportImage"

interface Props {
  data: ClientReportData
}

const CATEGORY_LABELS: Record<string, string> = {
  "boutique-luxury":    "Boutique Luxury",
  "design-hotel":       "Design Hotel",
  "wellness-retreat":   "Wellness Retreat",
  "coastal-retreat":    "Coastal Retreat",
  "urban-boutique":     "Urban Boutique",
  "countryside-retreat":"Countryside Retreat",
}

export default function S02PropertyContext({ data }: Props) {
  const { property, promiseAnalysis } = data

  return (
    <section id="property" className={styles.section}>
      <div className={styles.inner}>
        {/* Left: cover image */}
        <div className={styles.imageCol}>
          <ReportImage
            assetId="asset-cover"
            aspectRatio="3:4"
            priority
          />
        </div>

        {/* Right: property details */}
        <div className={styles.content}>
          <p className={styles.sectionLabel}>02 - Property Profile</p>
          <h2 className={styles.heading}>{property.name}</h2>

          {/* Meta grid */}
          <div className={styles.metaGrid}>
            <div className={styles.metaCell}>
              <p className={styles.metaLabel}>Location</p>
              <p className={styles.metaValue}>{property.location}</p>
            </div>
            <div className={styles.metaCell}>
              <p className={styles.metaLabel}>Category</p>
              <p className={styles.metaValue}>{CATEGORY_LABELS[property.category] ?? property.category}</p>
            </div>
            <div className={styles.metaCell}>
              <p className={styles.metaLabel}>Classification</p>
              <p className={styles.metaValue}>{property.starRating}-Star</p>
            </div>
          </div>

          {/* Core promise */}
          <div className={styles.divider} />
          <p className={styles.subLabel}>The Promise</p>
          <blockquote className={styles.promise}>
            {property.corePromise}
          </blockquote>

          <div className={styles.divider} />

          {/* Promise dimensions from real data */}
          <p className={styles.subLabel}>Promise Analysis</p>
          <div className={styles.dimensions}>
            {promiseAnalysis.dimensions.map((d) => (
              <div key={d.label} className={styles.dimensionRow}>
                <p className={styles.dimensionLabel}>{d.label}</p>
                <div className={styles.dimensionScore}>
                  <ScoreBar value={d.score.value} />
                  <span className={styles.dimensionValue}>{d.score.value.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
