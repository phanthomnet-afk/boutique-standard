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
          {content.items.map((item, i) => (
            <div key={item.number} className={`${styles.item} ${i % 2 === 1 ? styles.itemReversed : ""}`}>
              <div className={styles.numberBlock} aria-hidden="true">
                {item.number}
              </div>
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
