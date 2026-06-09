"use client"

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import type { SectionCta } from "@/lib/content/types";
import styles from "./PageCta.module.css";

interface PageCtaProps {
  content: SectionCta;
}

export function PageCta({ content }: PageCtaProps) {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="page-cta-heading"
    >
      <div className={`${styles.inner} reveal-on-scroll`}>
        <p className={styles.label}>{content.label}</p>
        <h2 id="page-cta-heading" className={styles.heading}>
          {content.heading}
        </h2>
        <p className={styles.body}>{content.body}</p>
        <div className={styles.buttons}>
          <Link href={content.buttonHref} className={styles.button}>
            {content.buttonLabel}
          </Link>
          {content.buttonSecondaryLabel && content.buttonSecondaryHref && (
            <Link href={content.buttonSecondaryHref} className={styles.buttonSecondary}>
              {content.buttonSecondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
