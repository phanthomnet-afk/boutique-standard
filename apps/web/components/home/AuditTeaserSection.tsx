import Link from "next/link";
import styles from "./AuditTeaserSection.module.css";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Anonymous Stay",
    description: "We experience your property as a first-time guest. No advance notice. No special treatment.",
  },
  {
    number: "02",
    title: "Structured Evaluation",
    description: "Every touchpoint is assessed against your own promise, your category, and your target guest profile.",
  },
  {
    number: "03",
    title: "Intelligence Report",
    description: "A luxury editorial report - delivered as a private web experience and PDF - revealing the full picture.",
  },
  {
    number: "04",
    title: "Targeted Refinement",
    description: "Prioritised opportunities ranked by guest impact. No implementation plans. You decide what to do with the intelligence.",
  },
];

export function AuditTeaserSection() {
  return (
    <section className={styles.section} aria-labelledby="audit-heading">
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.label}>The Audit</p>
          <h2 id="audit-heading" className={styles.heading}>
            How we work
          </h2>
          <p className={styles.subheading}>
            An undercover guest stay. A structured evaluation framework. A report your team will actually use.
          </p>
        </div>

        {/* Process steps */}
        <div className={styles.steps}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image + CTA */}
        <div className={styles.bottom}>
          <div className={styles.imagePlaceholder} aria-hidden="true">
            {/* Pool reflection / architectural detail */}
          </div>
          <div className={styles.bottomContent}>
            <blockquote className={styles.quote}>
              "We do not audit operations. We audit whether the experience delivered matches the experience promised."
            </blockquote>
            <Link href="/audit" className={styles.link}>
              Read the full methodology
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
