import Link from "next/link";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Full-bleed image */}
      <div className={styles.imageWrapper}>
        {/* When Sanity is live, this becomes a Next.js <Image> from CMS */}
        <div className={styles.imagePlaceholder} aria-hidden="true">
          {/* Placeholder: architectural hotel photography, golden hour, stone facade */}
          <div className={styles.imagePlaceholderInner} />
        </div>
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <p className={styles.eyebrow}>
            Independent Guest Experience Intelligence
          </p>
          <h1 className={styles.headline}>
            Does your hotel deliver<br />
            what it promises?
          </h1>
          <div className={styles.cta}>
            <Link href="/audit" className={styles.ctaPrimary}>
              Discover the Audit
            </Link>
            <Link href="/report" className={styles.ctaSecondary}>
              View a Sample Report
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
