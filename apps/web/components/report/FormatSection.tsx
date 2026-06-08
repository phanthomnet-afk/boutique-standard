import type { ReportPageContent } from "@/lib/content/types";
import styles from "./FormatSection.module.css";

interface Props {
  content: ReportPageContent["format"];
}

export function FormatSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="report-format-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="report-format-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>
        <ul className={styles.points}>
          {content.points.map((point, i) => (
            <li key={i} className={styles.point}>
              <span className={styles.dash} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
