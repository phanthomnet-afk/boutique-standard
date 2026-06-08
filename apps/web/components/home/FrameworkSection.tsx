import styles from "./FrameworkSection.module.css";

const pillars = [
  { number: "01", label: "Promise", desc: "What you communicate" },
  { number: "02", label: "Expectation", desc: "What guests assume" },
  { number: "03", label: "Experience", desc: "What actually happens" },
  { number: "04", label: "Memory", desc: "What guests carry away" },
];

export function FrameworkSection() {
  return (
    <section className={styles.section} aria-label="Evaluation framework">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {pillars.map((p) => (
            <div key={p.number} className={styles.pillar}>
              <span className={styles.number} aria-hidden="true">{p.number}</span>
              <span className={styles.label}>{p.label}</span>
              <span className={styles.desc}>{p.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
