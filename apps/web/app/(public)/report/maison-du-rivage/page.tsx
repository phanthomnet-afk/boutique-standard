import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Maison du Rivage - Case Report - The Boutique Standard",
  description:
    "Guest experience intelligence report: Maison du Rivage, Antibes, French Riviera. Composite alignment score: 8.2. A 28-room coastal retreat evaluated across fourteen experience dimensions.",
};

const property = {
  name: "Maison du Rivage",
  location: "Antibes, French Riviera",
  category: "Coastal Retreat",
  roomCount: 28,
  corePromise:
    "A refined coastal retreat where thoughtful hospitality and Riviera charm create an effortless sense of escape.",
};

const scores = {
  overall: { value: 8.2, band: "Strong", label: "Overall Alignment" },
  experience: { value: 8.4, band: "Strong", label: "Experience Score" },
  continuity: { value: 8.1, band: "Strong", label: "Continuity Score" },
  memory: { value: 7.9, band: "Strong", label: "Memory Impact" },
};

const executiveSummary = {
  headline: "A property that largely delivers on its promise - with identifiable friction at the moments guests remember most.",
  body: "Maison du Rivage communicates its promise with restraint and authenticity. The challenge is not in the communication - it is in operational consistency at the transitional moments guests remember most. The arrival experience introduces hesitation that stands in contrast to the effortless retreat the property promises. Once inside, the atmosphere, room quality, and service warmth are consistently strong. The gaps are specific and addressable.",
  topFindings: [
    "Arrival wayfinding creates early uncertainty before what should be the first moment of confidence",
    "Room experience delivers genuine alignment with promise - materials, light, and local character all present",
    "Dining service is warm but inconsistent across service moments, creating uneven memory",
    "Pre-arrival communication is appropriate in tone but light on practical orientation",
  ],
};

const journeyDining = {
  stage: "Dining Experience",
  score: 7.8,
  narrative:
    "The dining experience at Maison du Rivage is the most emotionally complex stage of the stay - simultaneously the property's warmest expression of local identity and the source of its most significant service inconsistency. Breakfast is exceptional: produce quality, light, pace, and staff attentiveness combine to create one of the stay's strongest memories. Dinner, however, reveals a gap between the warmth of the welcome and the precision of delivery. The menu communicates regional provenance with confidence; execution arrives at uneven intervals with notable differences between the first and second table service.",
  strengths: [
    "Breakfast quality consistently high across both mornings",
    "Local produce provenance communicated with genuine knowledge",
    "Staff warmth and hospitality throughout dining",
  ],
  frictionPoints: [
    "Dinner service cadence inconsistent - long intervals between courses on evening two",
    "No wine guidance offered proactively - guests who did not ask received none",
    "Ambient sound management in the dining room requires attention on busier evenings",
  ],
};

const promiseDimensions = [
  { label: "Discretion and privacy", score: 9.1 },
  { label: "Sense of place", score: 8.8 },
  { label: "Personal attention", score: 7.6 },
  { label: "Effortless arrival", score: 7.2 },
];

export default function MaisonDuRivagePage() {
  return (
    <article className={styles.article}>
      {/* Editorial header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerMeta}>
            <Link href="/report" className={styles.backLink}>
              Case Reports
            </Link>
            <span className={styles.headerDivider} aria-hidden="true" />
            <span className={styles.headerCategory}>{property.category}</span>
          </div>

          <h1 className={styles.headerTitle}>{property.name}</h1>
          <p className={styles.headerLocation}>{property.location}</p>

          <div className={styles.headerScores}>
            {Object.values(scores).map((s) => (
              <div key={s.label} className={styles.scoreBlock}>
                <span className={styles.scoreValue}>{s.value}</span>
                <span className={styles.scoreMax}>/10</span>
                <span className={styles.scoreLabel}>{s.label}</span>
                <span className={styles.scoreBand}>{s.band}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Property promise */}
      <section className={styles.promise} aria-label="Property promise">
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>The Promise</p>
          <blockquote className={styles.promiseQuote}>
            {property.corePromise}
          </blockquote>
        </div>
      </section>

      {/* Executive summary */}
      <section className={styles.executive} aria-labelledby="exec-heading">
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>Executive Snapshot</p>
          <h2 id="exec-heading" className={styles.executiveHeadline}>
            {executiveSummary.headline}
          </h2>
          <p className={styles.executiveBody}>{executiveSummary.body}</p>
          <ul className={styles.findingsList}>
            {executiveSummary.topFindings.map((finding, i) => (
              <li key={i} className={styles.finding}>
                <span className={styles.findingLine} aria-hidden="true" />
                {finding}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Score breakdown */}
      <section className={styles.scoreGrid} aria-label="Promise dimension scores">
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>Promise Analysis</p>
          <h2 className={styles.sectionHeading}>
            How delivery aligned with the promise
          </h2>
          <div className={styles.dimensionGrid}>
            {promiseDimensions.map((dim) => (
              <div key={dim.label} className={styles.dimension}>
                <div className={styles.dimensionBar}>
                  <div
                    className={styles.dimensionFill}
                    style={{ width: `${dim.score * 10}%` }}
                    aria-label={`${dim.score} out of 10`}
                  />
                </div>
                <div className={styles.dimensionMeta}>
                  <span className={styles.dimensionLabel}>{dim.label}</span>
                  <span className={styles.dimensionScore}>{dim.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey stage: dining */}
      <section className={styles.journeyStage} aria-labelledby="dining-heading">
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>Journey Stage</p>
          <div className={styles.stageHeader}>
            <h2 id="dining-heading" className={styles.stageTitle}>
              {journeyDining.stage}
            </h2>
            <div className={styles.stageScore}>
              <span className={styles.stageScoreValue}>{journeyDining.score}</span>
              <span className={styles.stageScoreMax}>/10</span>
            </div>
          </div>
          <p className={styles.stageNarrative}>{journeyDining.narrative}</p>

          <div className={styles.stageColumns}>
            <div className={styles.stageColumn}>
              <p className={styles.stageColumnLabel}>Strengths</p>
              <ul className={styles.stageList}>
                {journeyDining.strengths.map((s, i) => (
                  <li key={i} className={styles.stageListItem}>
                    <span className={styles.stageListBullet} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.stageColumn}>
              <p className={styles.stageColumnLabel}>Friction Points</p>
              <ul className={styles.stageList}>
                {journeyDining.frictionPoints.map((f, i) => (
                  <li key={i} className={styles.stageListItem}>
                    <span className={styles.stageListBullet} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Locked section - misalignments */}
      <section className={styles.lockedSection} aria-label="Misalignment report - restricted">
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>Misalignment Report</p>
          <h2 className={styles.sectionHeading}>
            Where promise and delivery diverge
          </h2>
          <div className={styles.lockedWrapper}>
            <div className={styles.lockedContent} aria-hidden="true">
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.lockedCard}>
                  <div className={styles.lockedBar} />
                  <div className={styles.lockedText} />
                  <div className={styles.lockedText} style={{ width: "70%" }} />
                </div>
              ))}
            </div>
            <div className={styles.lockedOverlay}>
              <div className={styles.lockedOverlayContent}>
                <p className={styles.lockedEyebrow}>Full Report</p>
                <p className={styles.lockedHeading}>
                  The misalignment report is included in the complete audit.
                </p>
                <Link href="/request" className={styles.lockedCta}>
                  Request an Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.pageCta} aria-label="Enquiry call to action">
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>Ready</p>
          <h2 className={styles.pageCtaHeading}>
            See what this produces for your property.
          </h2>
          <p className={styles.pageCtaBody}>
            Every engagement begins with a brief, no-commitment enquiry. We respond within two business days.
          </p>
          <Link href="/request" className={styles.pageCtaButton}>
            Request an Audit
          </Link>
        </div>
      </section>
    </article>
  );
}
