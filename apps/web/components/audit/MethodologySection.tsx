import type { AuditPageContent } from "@/lib/content/types";
import styles from "./MethodologySection.module.css";

interface Props {
  content: AuditPageContent["methodology"];
}

export function MethodologySection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="audit-methodology-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>{content.label}</p>
          <div className={styles.accentLine} aria-hidden="true" />
          <h2 id="audit-methodology-heading" className={styles.headline}>
            {content.headline}
          </h2>
        </div>

        <div className={styles.body}>
          {content.body.map((para, i) => (
            <p key={i} className={styles.bodyText}>
              {para}
            </p>
          ))}
        </div>

        <div className={styles.pillars}>
          {content.pillars.map((pillar) => (
            <div key={pillar.number} className={styles.pillar}>
              <span className={styles.pillarNumber}>{pillar.number}</span>
              <h3 className={styles.pillarLabel}>{pillar.label}</h3>
              <p className={styles.pillarDesc}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
