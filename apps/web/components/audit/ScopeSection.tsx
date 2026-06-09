"use client"

import Image from "next/image";
import { useReveal } from "@/lib/useReveal";
import styles from "./ScopeSection.module.css";

interface ScopeContent {
  label: string
  heading: string
  body: string
  options: Array<{ title: string; description: string; includes: string[] }>
}

interface Props {
  content: ScopeContent;
}

export function ScopeSection({ content }: Props) {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="audit-scope-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} reveal-on-scroll`}>
          <p className={styles.label}>{content.label}</p>
          <h2 id="audit-scope-heading" className={styles.heading}>
            {content.heading}
          </h2>
          <p className={styles.body}>{content.body}</p>
        </div>

        <div className={styles.imageWrapper} aria-hidden="true">
          <Image
            src="/images/website/sections/pool-afternoon--section--16x9.jpg"
            alt="Boutique hotel pool at late afternoon, stone surround, still water reflecting the sky"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.options}>
          {content.options.map((option, i) => (
            <div key={i} className={`${styles.option} reveal-on-scroll delay-${i + 1}`}>
              <h3 className={styles.optionTitle}>{option.title}</h3>
              <p className={styles.optionDesc}>{option.description}</p>
              <ul className={styles.optionList}>
                {option.includes.map((item, j) => (
                  <li key={j} className={styles.optionItem}>
                    <span className={styles.optionBullet} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
