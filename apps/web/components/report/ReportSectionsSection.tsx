import type { ReportPageContent } from "@/lib/content/types";
import styles from "./ReportSectionsSection.module.css";

interface Props {
  content: ReportPageContent["sections"];
}

export function ReportSectionsSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="report-contents-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="report-contents-heading" className={styles.heading}>
            {content.heading}
          </h2>
          <p className={styles.body}>{content.body}</p>
        </div>

        <div className={styles.grid}>
          {content.items.map((item) => (
            <div key={item.number} className={styles.item}>
              <span className={styles.number}>{item.number}</span>
              <div className={styles.itemContent}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
