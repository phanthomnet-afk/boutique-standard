import Link from "next/link"
import styles from "./JournalCta.module.css"

export function JournalCta() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>The Boutique Standard</p>
        <h2 className={styles.heading}>
          Independent evaluation for properties that take the experience seriously.
        </h2>
        <Link href="/request" className={styles.button}>
          Request an Audit
        </Link>
      </div>
    </section>
  )
}
