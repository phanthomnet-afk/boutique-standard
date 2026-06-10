import Image from "next/image"
import type { SectionHero } from "@/lib/content/types"
import styles from "./PhilosophyHeroSection.module.css"

interface Props {
  content: SectionHero
  imageSrc: string
}

export function PhilosophyHeroSection({ content, imageSrc }: Props) {
  return (
    <section className={styles.hero} aria-label="Page hero">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <div className={styles.accentLine} aria-hidden="true" />
          <h1 className={styles.headline}>
            {content.headline.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>

        <div className={styles.imageWrapper}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="White linen curtain in a Mediterranean window"
              fill
              priority
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
      </div>
    </section>
  )
}
