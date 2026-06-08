import Link from "next/link";
import type { SectionCta } from "@/lib/content/types";
import styles from "./PageCta.module.css";

interface PageCtaProps {
  content: SectionCta;
}

export function PageCta({ content }: PageCtaProps) {
  return (
    <section className={styles.section} aria-labelledby="page-cta-heading">
      <div className={styles.inner}>
        <p className={styles.label}>{content.label}</p>
        <h2 id="page-cta-heading" className={styles.heading}>
          {content.heading}
        </h2>
        <p className={styles.body}>{content.body}</p>
        <Link href={content.buttonHref} className={styles.button}>
          {content.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
