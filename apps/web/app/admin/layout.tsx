import type { Metadata } from "next"
import { AdminErrorBoundary } from "@/components/admin/AdminErrorBoundary"
import { AdminShell } from "./AdminShell"
import styles from "./admin.module.css"

export const metadata: Metadata = {
  title: "Admin - The Boutique Standard",
  robots: "noindex,nofollow",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <AdminShell>
          <AdminErrorBoundary>{children}</AdminErrorBoundary>
        </AdminShell>
      </body>
    </html>
  )
}
