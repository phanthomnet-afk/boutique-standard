import Image from "next/image";
import Link from "next/link";
import styles from "./InquirySection.module.css";

export function InquirySection() {
  return (
    <section className={styles.section} aria-labelledby="inquiry-heading">
      <div className={styles.inner}>

        <div className={styles.content}>
          <p className={styles.label}>Request an Audit</p>
          <h2 id="inquiry-heading" className={styles.heading}>
            Understand your property<br />
            the way your guests do.
          </h2>
          <p className={styles.body}>
            Audits from €995. Scoped individually before confirmation.
          </p>
          <Link href="/request" className={styles.button}>
            Request an Audit
          </Link>
        </div>

        <div className={styles.decoration} aria-hidden="true">
          <Image
            src="/images/website/details/linen-curtain--detail--1x1.png"
            alt="White linen curtain billowing through an open Mediterranean window"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

      </div>
    </section>
  );
}
