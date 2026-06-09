import styles from "./JournalHero.module.css"

export function JournalHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.label}>Journal</p>
        <h1 className={styles.heading}>Observations from the field</h1>
        <p className={styles.sub}>
          Thinking on guest experience, boutique hospitality, and what makes a property worth returning to.
        </p>
      </div>
    </section>
  )
}
