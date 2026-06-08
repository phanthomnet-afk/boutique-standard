"use client";

import { usePrice } from "@/lib/usePrice";
import { useReveal } from "@/lib/useReveal";
import type { AuditPageContent } from "@/lib/content/types";
import styles from "./PricingSection.module.css";

interface Props {
  content: AuditPageContent["pricing"];
}

export function PricingSection({ content }: Props) {
  const price = usePrice();
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.section}
      aria-labelledby="audit-pricing-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.priceBlock} reveal-on-scroll`}>
          <p className={styles.priceLabel}>{content.label}</p>
          <p id="audit-pricing-heading" className={styles.price}>{price}</p>
          <div className={styles.accentLine} aria-hidden="true" />
        </div>

        <p className={`${styles.body} reveal-on-scroll delay-1`}>{content.body}</p>

        <div className={`${styles.stages} reveal-on-scroll delay-2`}>
          {content.stages.map((stage, i) => (
            <div key={i} className={styles.stage}>
              <p className={styles.stageLabel}>{stage.label}</p>
              <p className={styles.stageDesc}>{stage.description}</p>
            </div>
          ))}
        </div>

        <p className={`${styles.note} reveal-on-scroll delay-3`}>{content.note}</p>
      </div>
    </section>
  );
}
