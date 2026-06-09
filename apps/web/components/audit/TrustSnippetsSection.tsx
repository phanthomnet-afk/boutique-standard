"use client"

import { useReveal } from "@/lib/useReveal"
import type { AuditPageContent } from "@/lib/content/types"
import styles from "./TrustSnippetsSection.module.css"

interface Props {
  content: AuditPageContent["trustSnippets"]
}

export function TrustSnippetsSection({ content }: Props) {
  const ref = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="snippets-heading"
    >
      <div className={styles.inner}>
        <p id="snippets-heading" className={`${styles.label} reveal-on-scroll`}>
          {content.heading}
        </p>
        <div className={styles.grid}>
          {content.items.map((item, i) => (
            <blockquote
              key={i}
              className={`${styles.snippet} reveal-on-scroll delay-${Math.min(i + 1, 4)}`}
            >
              <p className={styles.quote}>{item}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
