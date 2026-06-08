import type { AuditPageContent } from "@/lib/content/types";
import styles from "./PricingSection.module.css";

interface Props {
  content: AuditPageContent["pricing"];
}

export function PricingSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="audit-pricing-heading">
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="audit-pricing-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>{content.body}</p>
          <p className={styles.note}>{content.note}</p>
        </div>
      </div>
    </section>
  );
}
