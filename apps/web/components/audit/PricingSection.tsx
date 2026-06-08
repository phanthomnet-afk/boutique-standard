"use client";

import { usePrice } from "@/lib/usePrice";
import type { AuditPageContent } from "@/lib/content/types";
import styles from "./PricingSection.module.css";

interface Props {
  content: AuditPageContent["pricing"];
}

export function PricingSection({ content }: Props) {
  const price = usePrice();

  return (
    <section className={styles.section} aria-labelledby="audit-pricing-heading">
      <div className={styles.inner}>
        <div className={styles.priceBlock}>
          <p className={styles.priceLabel}>{content.label}</p>
          <p id="audit-pricing-heading" className={styles.price}>{price}</p>
          <div className={styles.accentLine} aria-hidden="true" />
        </div>

        <p className={styles.body}>{content.body}</p>

        <div className={styles.stages}>
          {content.stages.map((stage, i) => (
            <div key={i} className={styles.stage}>
              <p className={styles.stageLabel}>{stage.label}</p>
              <p className={styles.stageDesc}>{stage.description}</p>
            </div>
          ))}
        </div>

        <p className={styles.note}>{content.note}</p>
      </div>
    </section>
  );
}
