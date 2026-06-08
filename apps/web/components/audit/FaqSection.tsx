"use client"

import { useReveal } from "@/lib/useReveal";
import type { AuditPageContent } from "@/lib/content/types";
import styles from "./FaqSection.module.css";

interface Props {
  content: AuditPageContent["faq"];
}

export function FaqSection({ content }: Props) {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="audit-faq-heading"
    >
      <div className={styles.inner}>
        <h2 id="audit-faq-heading" className={`${styles.heading} reveal-on-scroll`}>
          {content.heading}
        </h2>

        <div className={styles.items}>
          {content.items.map((item, i) => (
            <details key={i} className={`${styles.item} reveal-on-scroll delay-${Math.min(i + 1, 4)}`}>
              <summary className={styles.question}>
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
