import type { PhilosophyPageContent } from "@/lib/content/types";
import styles from "./PhilosophyMethodologySection.module.css";

interface Props {
  content: PhilosophyPageContent["methodology"];
}

export function PhilosophyMethodologySection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="philosophy-method-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="philosophy-method-heading" className={styles.heading}>
            {content.heading}
          </h2>
          <p className={styles.body}>{content.body}</p>
        </div>

        <div className={styles.pillars}>
          {content.pillars.map((pillar) => (
            <div key={pillar.number} className={styles.pillar}>
              <div className={styles.pillarTop}>
                <span className={styles.pillarNumber}>{pillar.number}</span>
                <h3 className={styles.pillarLabel}>{pillar.label}</h3>
              </div>
              <p className={styles.pillarDesc}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
