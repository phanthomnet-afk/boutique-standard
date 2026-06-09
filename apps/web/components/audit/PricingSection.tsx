"use client"

import { useReveal } from "@/lib/useReveal"
import type { AuditPageContent } from "@/lib/content/types"
import styles from "./PricingSection.module.css"

interface Props {
  content: AuditPageContent["pricing"]
}

export function PricingSection({ content }: Props) {
  const ref = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="pricing-heading"
    >
      <div className={`${styles.inner} reveal-on-scroll`}>
        <div className={styles.top}>
          <p id="pricing-heading" className={styles.label}>{content.heading}</p>
          <p className={styles.price}>{content.price}</p>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>{content.description}</p>

          <div className={styles.columns}>
            <div className={styles.col}>
              <p className={styles.colLabel}>Includes</p>
              <ul className={styles.list}>
                {content.includes.map((item, i) => (
                  <li key={i} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.col}>
              <p className={styles.colLabel}>{content.deliveryFormat.heading}</p>
              <ul className={styles.list}>
                {content.deliveryFormat.items.map((item, i) => (
                  <li key={i} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className={styles.closingLine}>{content.closingLine}</p>
        </div>
      </div>
    </section>
  )
}
