import type { AuditPageContent } from "@/lib/content/types";
import styles from "./ProcessSection.module.css";

interface Props {
  content: AuditPageContent["process"];
}

export function ProcessSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="audit-process-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="audit-process-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>

        <div className={styles.steps}>
          {content.steps.map((step) => (
            <div key={step.number} className={styles.step}>
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
