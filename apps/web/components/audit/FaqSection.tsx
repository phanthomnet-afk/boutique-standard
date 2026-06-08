import type { AuditPageContent } from "@/lib/content/types";
import styles from "./FaqSection.module.css";

interface Props {
  content: AuditPageContent["faq"];
}

export function FaqSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="audit-faq-heading">
      <div className={styles.inner}>
        <h2 id="audit-faq-heading" className={styles.heading}>
          {content.heading}
        </h2>

        <div className={styles.items}>
          {content.items.map((item, i) => (
            <details key={i} className={styles.item}>
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
