import type { ClientReportData } from "@tbs/web-engine"
import styles from "./S02PropertyContext.module.css"
import { ScoreBar } from "../ScoreBar"

interface Props {
  data: ClientReportData
}

const CATEGORY_LABELS: Record<string, string> = {
  "boutique-luxury": "Boutique Luxury",
  "design-hotel": "Design Hotel",
  "wellness-retreat": "Wellness Retreat",
  "coastal-retreat": "Coastal Retreat",
  "urban-boutique": "Urban Boutique",
  "countryside-retreat": "Countryside Retreat",
}

export default function S02PropertyContext({ data }: Props) {
  const { property } = data

  return (
    <section id="property" className={styles.section}>
      <div className={styles.inner}>
        {/* Left: image */}
        <div className={styles.imageCol}>
          <div
            className={styles.imagePlaceholder}
            data-image-slot="asset-cover"
            style={{ aspectRatio: "3/4" }}
          >
            <span className={styles.imageNote}>Cover image</span>
          </div>
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
              <p className={styles.metaLabel}>Star Rating</p>
              <p className={styles.metaValue}>{property.starRating}-Star</p>
            </div>
          </div>

          {/* Core promise */}
          <blockquote className={styles.promise}>
            {property.corePromise}
          </blockquote>

          <div className={styles.divider} />

          {/* Guest profile */}
          <p className={styles.subLabel}>Target Guest</p>
          <ul className={styles.list}>
            {data.journey.slice(0, 1).map(() => null)}
          </ul>

          <p className={styles.subLabel}>The Promise</p>
          <p className={styles.pullQuote}>{property.corePromise}</p>

          <div className={styles.divider} />

          {/* Promise dimensions */}
          <p className={styles.subLabel}>Promise Analysis</p>
          <div className={styles.dimensions}>
            {["Discretion and privacy", "Sense of place", "Personal attention", "Effortless arrival"].map((label, i) => {
              const score = [9.1, 8.8, 7.6, 7.2][i]
              return (
                <div key={label} className={styles.dimensionRow}>
                  <p className={styles.dimensionLabel}>{label}</p>
                  <div className={styles.dimensionScore}>
                    <ScoreBar value={score} />
                    <span className={styles.dimensionValue}>{score}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
