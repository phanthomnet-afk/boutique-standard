export const dynamic = "force-dynamic"
export const revalidate = 0

import prisma from "@/lib/admin/prismaClient"
import { ReportsClient } from "./ReportsClient"

export default async function ReportsPage() {
  let reports: Awaited<ReturnType<typeof prisma.report.findMany>> = []
  let error: string | null = null

  try {
    reports = await prisma.report.findMany({ orderBy: { createdAt: "desc" } })
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", fontFamily: "monospace" }}>
        <h2 style={{ marginBottom: "1rem" }}>Database error - reports page</h2>
        <pre style={{ background: "#f4f4f4", padding: "1rem", overflow: "auto", fontSize: "0.875rem", whiteSpace: "pre-wrap" }}>
          {error}
        </pre>
      </div>
    )
  }

  return <ReportsClient initialReports={JSON.parse(JSON.stringify(reports))} />
}
