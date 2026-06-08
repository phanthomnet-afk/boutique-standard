import type { SectionReviews } from "@/lib/content/types";
import styles from "./ReviewsSection.module.css";

interface Props {
  content: SectionReviews;
}

export function ReviewsSection({ content }: Props) {
  return (
    <section className={styles.section} aria-label={content.label}>
      <div className={styles.inner}>
        <p className={styles.label}>{content.label}</p>
        <div className={styles.quotes}>
          {content.items.map((item, i) => (
            <blockquote key={i} className={styles.quote}>
              <p className={styles.quoteText}>{item.quote}</p>
              <footer className={styles.attribution}>{item.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
