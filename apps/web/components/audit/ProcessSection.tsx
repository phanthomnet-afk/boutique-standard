"use client"

import { useReveal } from "@/lib/useReveal";
import type { SectionProcess } from "@/lib/content/types";
import styles from "./ProcessSection.module.css";

interface Props {
  content: SectionProcess;
}

export function ProcessSection({ content }: Props) {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="audit-process-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} reveal-on-scroll`}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="audit-process-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>

        <div className={styles.steps}>
          {content.steps.map((step, i) => (
            <div key={step.number} className={`${styles.step} reveal-on-scroll delay-${i + 1}`}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
