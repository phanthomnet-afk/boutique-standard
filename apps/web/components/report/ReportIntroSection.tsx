import styles from "./ReportIntroSection.module.css";

interface ReportIntroContent {
  label: string;
  heading: string;
  body: string[];
}

interface Props {
  content: ReportIntroContent;
}

export function ReportIntroSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="report-intro-heading">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>{content.label}</p>
          <div className={styles.accentLine} aria-hidden="true" />
          <h2 id="report-intro-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>

        <div className={styles.right}>
          {content.body.map((para, i) => (
            <p key={i} className={styles.bodyText}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
