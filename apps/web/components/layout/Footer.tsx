import Link from "next/link";
import styles from "./Footer.module.css";

const FOOTER_LINKS = {
  services: [
    { label: "Audit", href: "/audit" },
    { label: "Report", href: "/report" },
    { label: "Request an Audit", href: "/request" },
  ],
  company: [
    { label: "Philosophy", href: "/philosophy" },
    { label: "Journal", href: "/journal" },
    { label: "Future Guide", href: "/guide" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Top row: wordmark + nav columns */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.wordmark}>
              The Boutique Standard
            </Link>
            <p className={styles.tagline}>
              Independent Guest Experience Intelligence
            </p>
            <p className={styles.tagline} style={{ marginTop: "0.25rem" }}>
              theboutiquestandard.com
            </p>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <p className={styles.columnHeading}>Services</p>
              <ul className={styles.columnList}>
                {FOOTER_LINKS.services.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.columnLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <p className={styles.columnHeading}>Company</p>
              <ul className={styles.columnList}>
                {FOOTER_LINKS.company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.columnLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} The Boutique Standard. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            {FOOTER_LINKS.legal.map((l) => (
              <Link key={l.href} href={l.href} className={styles.legalLink}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
