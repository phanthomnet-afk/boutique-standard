import type { Metadata } from "next"
import Link from "next/link"
import styles from "./admin.module.css"

export const metadata: Metadata = {
  title: "Admin - The Boutique Standard",
  robots: "noindex,nofollow",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.shell}>
          <nav className={styles.sidebar}>
            <div className={styles.sidebarTop}>
              <p className={styles.wordmark}>TBS</p>
              <ul className={styles.nav}>
                <li>
                  <Link href="/admin/hotels" className={styles.navLink}>
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/admin/prospects" className={styles.navLink}>
                    Prospects
                  </Link>
                </li>
                <li>
                  <Link href="/admin/pipeline" className={styles.navLink}>
                    Pipeline
                  </Link>
                </li>
                <li>
                  <Link href="/admin/outreach" className={styles.navLink}>
                    Outreach
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.sidebarBottom}>
              <Link href="/" className={styles.siteLink} target="_blank">
                View site
              </Link>
            </div>
          </nav>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  )
}
