import Link from "next/link";
import styles from "./ReportPreviewSection.module.css";

// This data will come from Sanity when CMS is live
const CASE_DATA = {
  property: "Maison du Rivage",
  location: "Antibes, French Riviera",
  overallScore: 8.2,
  headline: "A refined coastal retreat where thoughtful hospitality and Riviera charm create an effortless sense of escape.",
  excerpt: "Maison du Rivage delivers a guest experience that is largely coherent, emotionally warm, and authentically connected to its Riviera setting. The most significant opportunities lie in the refinement of transitional moments.",
  scores: [
    { label: "Brand Promise", value: 8.6, band: "Strong" },
    { label: "Arrival Experience", value: 7.4, band: "Strong" },
    { label: "Dining Experience", value: 9.1, band: "Exceptional" },
    { label: "Service Culture", value: 8.9, band: "Exceptional" },
    { label: "Departure Experience", value: 6.9, band: "Acceptable" },
    { label: "Overall Alignment", value: 8.2, band: "Strong" },
  ],
  keyFindings: [
    "Genuine and personable hospitality throughout the stay",
    "Exceptional breakfast experience - the defining signature",
    "Arrival orientation gap creates unnecessary friction",
    "Departure experience ends the journey as a transaction",
  ],
};

export function ReportPreviewSection() {
  return (
    <section className={styles.section} aria-labelledby="report-preview-heading">
      <div className={styles.inner}>

        {/* Label */}
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Sample Report</p>
          <h2 id="report-preview-heading" className={styles.heading}>
            This is what your guests experience<br />
            when you are not looking.
          </h2>
        </div>

        {/* Report card */}
        <div className={styles.reportCard}>

          {/* Left: property info + image */}
          <div className={styles.cardLeft}>
            <div className={styles.cardImage} aria-hidden="true">
              {/* Stone facade, Mediterranean, golden hour */}
            </div>
            <div className={styles.propertyMeta}>
              <p className={styles.propertyName}>{CASE_DATA.property}</p>
              <p className={styles.propertyLocation}>{CASE_DATA.location}</p>
            </div>
          </div>

          {/* Right: scores + excerpt */}
          <div className={styles.cardRight}>
            {/* Overall score */}
            <div className={styles.overallScore}>
              <span className={styles.scoreNumber}>{CASE_DATA.overallScore}</span>
              <div className={styles.scoreContext}>
                <span className={styles.scoreDivisor}>/10</span>
                <span className={styles.scoreBand}>Overall Alignment</span>
              </div>
            </div>

            {/* Score grid */}
            <div className={styles.scoreGrid}>
              {CASE_DATA.scores.slice(0, 5).map((s) => (
                <div key={s.label} className={styles.scoreItem}>
                  <span className={styles.scoreItemLabel}>{s.label}</span>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreBarFill}
                      style={{ width: `${s.value * 10}%` }}
                    />
                  </div>
                  <span className={styles.scoreItemValue}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Excerpt */}
            <p className={styles.excerpt}>{CASE_DATA.excerpt}</p>

            {/* Blurred / locked teaser */}
            <div className={styles.lockedTeaser} aria-hidden="true">
              <div className={styles.lockedContent}>
                <p>Experience Continuity Analysis reveals three critical misalignments between the communicated promise and the delivered experience. The departure moment...</p>
              </div>
              <div className={styles.lockedOverlay}>
                <span className={styles.lockedLabel}>Full report for clients only</span>
              </div>
            </div>

            <Link href="/report/maison-du-rivage" className={styles.viewLink}>
              View the case report
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
