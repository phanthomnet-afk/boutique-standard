"use client"

import { useReveal } from "@/lib/useReveal"
import type { SectionEditorialBlock } from "@/lib/content/types"
import styles from "./WhatWeDoSection.module.css"

interface Props {
  content: SectionEditorialBlock
}

export function WhatWeDoSection({ content }: Props) {
  const ref = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="whatwedo-heading"
    >
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.left}>
            <h2 id="whatwedo-heading" className={`${styles.heading} reveal-on-scroll`}>
              {content.heading}
            </h2>
          </div>
          <div className={styles.right}>
            {content.paragraphs.map((p, i) => (
              <p key={i} className={`${styles.paragraph} reveal-on-scroll delay-${Math.min(i + 1, 4)}`}>
                {p}
              </p>
            ))}
            {content.listPreamble && (
              <p className={`${styles.listPreamble} reveal-on-scroll delay-2`}>
                {content.listPreamble}
              </p>
            )}
            {content.list.length > 0 && (
              <ul className={`${styles.list} reveal-on-scroll delay-3`}>
                {content.list.map((item, i) => (
                  <li key={i} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            )}
            {content.closing && (
              <p className={`${styles.closing} reveal-on-scroll delay-4`}>
                {content.closing}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
