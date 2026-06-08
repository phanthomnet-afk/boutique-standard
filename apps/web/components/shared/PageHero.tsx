import Image from "next/image";
import Link from "next/link";
import type { SectionHero } from "@/lib/content/types";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  content: SectionHero;
  variant?: "image" | "typographic";
  imageSrc?: string;
  imageAlt?: string;
}

export function PageHero({ content, variant = "image", imageSrc, imageAlt = "" }: PageHeroProps) {
  return (
    <section
      className={`${styles.hero} ${variant === "typographic" ? styles.heroTypographic : styles.heroImage}`}
      aria-label="Page hero"
    >
      {variant === "image" && (
        <div className={styles.imageWrapper} aria-hidden="true">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className={styles.image}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
          <div className={styles.imageOverlay} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 className={styles.headline}>
            {content.headline.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
          {content.body && <p className={styles.body}>{content.body}</p>}
          {(content.ctaPrimary || content.ctaSecondary) && (
            <div className={styles.cta}>
              {content.ctaPrimary && (
                <Link href={content.ctaPrimary.href} className={styles.ctaPrimary}>
                  {content.ctaPrimary.label}
                </Link>
              )}
              {content.ctaSecondary && (
                <Link href={content.ctaSecondary.href} className={styles.ctaSecondary}>
                  {content.ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
