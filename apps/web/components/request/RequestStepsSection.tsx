import type { RequestPageContent } from "@/lib/content/types";
import styles from "./RequestStepsSection.module.css";

interface Props {
  content: RequestPageContent["steps"];
}

export function RequestStepsSection({ content }: Props) {
  return (
    <section className={styles.section} aria-label="What happens after you submit">
      <div className={styles.inner}>
        <div className={styles.steps}>
          {content.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
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
