import styles from "./PhilosophySection.module.css";

export function PhilosophySection() {
  return (
    <section className={styles.section} aria-labelledby="philosophy-heading">
      <div className={styles.inner}>

        {/* Left: label + statement */}
        <div className={styles.left}>
          <p className={styles.label}>Our Philosophy</p>
          <div className={styles.accentLine} />
          <h2 id="philosophy-heading" className={styles.statement}>
            Guests rarely remember perfection.<br />
            They remember how a place made them feel.
          </h2>
        </div>

        {/* Right: editorial paragraphs */}
        <div className={styles.right}>
          <p className={styles.body}>
            The Boutique Standard evaluates the alignment between what a boutique hotel promises and what its guests actually experience. We evaluate properties against their own positioning - not against generic industry benchmarks.
          </p>
          <p className={styles.body}>
            Every audit passes through four lenses: the promise communicated before arrival, the expectations guests form, the experience they receive, and the memory they carry afterward. The strongest hospitality creates alignment across all four.
          </p>
          <p className={styles.body}>
            The result is a guest experience intelligence report - a luxury editorial document that reveals, with precision and care, exactly where a property delivers on its character and where it falls short.
          </p>
        </div>

      </div>
    </section>
  );
}
