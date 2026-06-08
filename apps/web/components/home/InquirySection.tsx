import Link from "next/link";
import styles from "./InquirySection.module.css";

export function InquirySection() {
  return (
    <section className={styles.section} aria-labelledby="inquiry-heading">
      <div className={styles.inner}>

        <div className={styles.content}>
          <p className={styles.label}>Request an Audit</p>
          <h2 id="inquiry-heading" className={styles.heading}>
            Understand your property<br />
            the way your guests do.
          </h2>
          <p className={styles.body}>
            Engagements begin from €4,000. Each audit is scoped individually based on property size, location, and the experience dimensions most relevant to your positioning.
          </p>
          <Link href="/request" className={styles.button}>
            Request an Audit
          </Link>
        </div>

        <div className={styles.decoration} aria-hidden="true">
          {/* Architectural image - light through window, quiet */}
        </div>

      </div>
    </section>
  );
}
