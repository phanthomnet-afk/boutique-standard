import Image from "next/image";
import type { AuditPageContent } from "@/lib/content/types";
import styles from "./ScopeSection.module.css";

interface Props {
  content: AuditPageContent["scope"];
}

export function ScopeSection({ content }: Props) {
  return (
    <section className={styles.section} aria-labelledby="audit-scope-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
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
            <div key={i} className={styles.option}>
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

        <div className={styles.addOns}>
          <p className={styles.addOnsLabel}>{content.addOnsLabel}</p>
          <p className={styles.addOnsNote}>{content.addOnsNote}</p>
          <ul className={styles.addOnsList}>
            {content.addOns.map((item, i) => (
              <li key={i} className={styles.addOnsItem}>
                <span className={styles.optionBullet} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
