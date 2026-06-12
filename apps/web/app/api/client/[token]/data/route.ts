export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import { prisma } from "@/lib/admin/prismaClient"
import { toClientReportData } from "@tbs/web-engine"
import type { ReportCase } from "@tbs/schema"
import mdrData from "@/data/reports/maison-du-rivage.json"
import hlData  from "@/data/reports/hotel-lumiere.json"

// Embedded report data - bundled at build time, no file system access at runtime.
// Add new report slugs here when new audits are delivered.
const EMBEDDED_REPORTS: Record<string, ReportCase> = {
  "data/reports/maison-du-rivage.json": mdrData as unknown as ReportCase,
  "maison-du-rivage.json":              mdrData as unknown as ReportCase,
  "data/reports/hotel-lumiere.json":    hlData  as unknown as ReportCase,
  "hotel-lumiere.json":                 hlData  as unknown as ReportCase,
}

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  // Check auth cookie
  const cookie     = request.headers.get("cookie") || ""
  const cookieName = `tbs_report_${token}`
  if (!cookie.includes(cookieName)) {
    console.log("[data] No auth cookie for token:", token)
    return Response.json(
      { error: "unauthorized", message: "Please enter your access code" },
      { status: 401 }
    )
  }

  // Load ClientReport from DB
  let clientReport: Awaited<ReturnType<typeof prisma.clientReport.findUnique>>
  try {
    clientReport = await prisma.clientReport.findUnique({ where: { token } })
    console.log("[data] ClientReport found:", !!clientReport, "active:", clientReport?.isActive)
  } catch (dbError: unknown) {
    const msg = dbError instanceof Error ? dbError.message : String(dbError)
    console.error("[data] DB error:", msg)
    return Response.json(
      { error: "no_data", message: "Database error. Try again in a moment." },
      { status: 500 }
    )
  }

  if (!clientReport || !clientReport.isActive) {
    console.log("[data] Report not found or inactive")
    return Response.json(
      { error: "not_found", message: "This report link is no longer active." },
      { status: 404 }
    )
  }

  // Look up embedded data by dataPath
  const raw = EMBEDDED_REPORTS[clientReport.dataPath]
  if (!raw) {
    console.error("[data] No embedded data for:", clientReport.dataPath)
    return Response.json(
      { error: "no_data", message: "Report data not found." },
      { status: 500 }
    )
  }

  try {
    const data = toClientReportData(raw)
    console.log("[data] Report served for token:", token)

    // Non-blocking last-accessed update
    prisma.clientReport
      .update({ where: { token }, data: { lastAccessedAt: new Date() } })
      .catch((e: unknown) => console.warn("[data] lastAccessedAt update failed:", e))

    return Response.json(data)
  } catch (transformError: unknown) {
    const msg = transformError instanceof Error ? transformError.message : String(transformError)
    console.error("[data] Transform error:", msg)
    return Response.json(
      { error: "no_data", message: "Report data unavailable." },
      { status: 500 }
    )
  }
}
