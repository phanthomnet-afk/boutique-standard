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

          <div className={styles.pillars}>
            {[
              { label: "Promise", desc: "What you communicate" },
              { label: "Expectation", desc: "What guests assume" },
              { label: "Experience", desc: "What actually happens" },
              { label: "Memory", desc: "What guests carry away" },
            ].map((p, i) => (
              <div key={p.label} className={styles.pillar}>
                <span className={styles.pillarNumber}>0{i + 1}</span>
                <span className={styles.pillarLabel}>{p.label}</span>
                <span className={styles.pillarDesc}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
