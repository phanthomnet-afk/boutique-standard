import type { AuditPageContent } from "@/lib/content/types";
import styles from "./DeliverablesSection.module.css";

interface Props {
  content: AuditPageContent["deliverables"];
}

export function DeliverablesSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="audit-deliverables-heading">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>{content.label}</p>
          <div className={styles.accentLine} aria-hidden="true" />
          <h2 id="audit-deliverables-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>

        <div className={styles.right}>
          {content.items.map((item, i) => (
            <div key={i} className={styles.item}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
