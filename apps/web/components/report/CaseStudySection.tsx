import Image from "next/image";
import Link from "next/link";
import type { ReportPageContent } from "@/lib/content/types";
import styles from "./CaseStudySection.module.css";

interface Props {
  content: ReportPageContent["caseStudy"];
}

export function CaseStudySection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="report-case-heading">
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <Image
              src="/images/website/sections/pool-afternoon - section-2-16x9.png"
              alt="Boutique hotel pool at late afternoon, stone surround, Riviera setting"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.label}>{content.label}</p>
            <h2 id="report-case-heading" className={styles.heading}>
              {content.heading}
            </h2>
            <p className={styles.body}>{content.body}</p>
            <Link href="/report/maison-du-rivage" className={styles.link}>
              <span>{content.linkLabel}</span>
              <span className={styles.linkArrow} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
