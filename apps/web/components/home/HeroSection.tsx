import Image from "next/image";
import Link from "next/link";
import { getImageById } from "@/lib/images";
import styles from "./HeroSection.module.css";

const heroImage = getImageById("facade-golden-hour")!;

export function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Full-bleed image */}
      <div className={styles.imageWrapper}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className={styles.image}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
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
