import Image from "next/image";
import type { PhilosophyPageContent } from "@/lib/content/types";
import styles from "./PerspectiveSection.module.css";

interface Props {
  content: PhilosophyPageContent["perspective"];
}

export function PerspectiveSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="philosophy-perspective-heading">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.label}>{content.label}</p>
          <div className={styles.accentLine} aria-hidden="true" />
          <h2 id="philosophy-perspective-heading" className={styles.headline}>
            {content.headline}
          </h2>
        </div>

        <div className={styles.right}>
          <div className={styles.body}>
            {content.body.map((para, i) => (
              <p key={i} className={styles.bodyText}>
                {para}
              </p>
            ))}
          </div>
          <blockquote className={styles.pullQuote}>
            {content.pullQuote}
          </blockquote>
        </div>

        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/website/details/welcome-note.png"
              alt="Handwritten welcome note"
              fill
              className={styles.image}
              sizes="(max-width: 900px) 0px, 280px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
