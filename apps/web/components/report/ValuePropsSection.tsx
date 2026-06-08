import type { SectionValueProps } from "@/lib/content/types";
import styles from "./ValuePropsSection.module.css";

interface Props {
  content: SectionValueProps;
}

export function ValuePropsSection({ content }: Props) {
  return (
    <section className={styles.section} aria-label={content.label}>
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>{content.label}</p>
        <div className={styles.items}>
          {content.items.map((item) => (
            <div key={item.number} className={styles.item}>
              <span className={styles.number}>{item.number}</span>
              <div className={styles.content}>
                <p className={styles.statement}>{item.statement}</p>
                <p className={styles.body}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
