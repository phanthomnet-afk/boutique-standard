"use client"

import { useReveal } from "@/lib/useReveal";
import type { AuditPageContent } from "@/lib/content/types";
import styles from "./DeliverablesSection.module.css";

interface Props {
  content: AuditPageContent["deliverables"];
}

export function DeliverablesSection({ content }: Props) {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="audit-deliverables-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.left} reveal-on-scroll`}>
          <p className={styles.label}>{content.label}</p>
          <div className={styles.accentLine} aria-hidden="true" />
          <h2 id="audit-deliverables-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>

        <div className={styles.right}>
          {content.items.map((item, i) => (
            <div key={i} className={`${styles.item} reveal-on-scroll delay-${i + 1}`}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
