"use client"

import { useReveal } from "@/lib/useReveal"
import type { AuditPageContent } from "@/lib/content/types"
import styles from "./ReportOutcomeSection.module.css"

interface Props {
  content: AuditPageContent["reportOutcome"]
}

export function ReportOutcomeSection({ content }: Props) {
  const ref = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="outcome-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} reveal-on-scroll`}>
          <p className={styles.eyebrow}>{content.heading}</p>
          <h2 id="outcome-heading" className={styles.heading}>
            {content.subheading}
          </h2>
        </div>

        <div className={styles.versions}>
          {content.versions.map((version, i) => (
            <div key={i} className={`${styles.version} reveal-on-scroll delay-${i + 1}`}>
              <div className={styles.versionHeader}>
                <p className={styles.versionTitle}>{version.title}</p>
                <p className={styles.versionPages}>{version.pages}</p>
              </div>
              <ul className={styles.versionList}>
                {version.items.map((item, j) => (
                  <li key={j} className={styles.versionItem}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={`${styles.note} reveal-on-scroll delay-3`}>{content.note}</p>
      </div>
    </section>
  )
}
