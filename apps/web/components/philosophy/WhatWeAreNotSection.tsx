import type { PhilosophyPageContent } from "@/lib/content/types";
import styles from "./WhatWeAreNotSection.module.css";

interface Props {
  content: PhilosophyPageContent["whatWeAreNot"];
}

export function WhatWeAreNotSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="philosophy-identity-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="philosophy-identity-heading" className={styles.heading}>
            {content.heading}
          </h2>
        </div>

        <div className={styles.body}>
          <ul className={styles.notList}>
            {content.notList.map((item, i) => (
              <li key={i} className={styles.notItem}>
                <span className={styles.notBullet} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={styles.isStatement}>
            <div className={styles.isAccent} aria-hidden="true" />
            <p className={styles.isText}>{content.isStatement}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
