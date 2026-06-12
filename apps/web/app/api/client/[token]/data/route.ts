export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import { prisma } from "@/lib/admin/prismaClient"
import { existsSync, readFileSync } from "fs"
import { join } from "path"
import { toClientReportData } from "@tbs/web-engine"
import type { ReportCase } from "@tbs/schema"

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  // Check auth cookie
  const cookie   = request.headers.get("cookie") || ""
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

  // Resolve file path
  const cwd      = process.cwd()
  const filePath = join(cwd, "..", "..", clientReport.dataPath)
  console.log("[data] cwd:", cwd)
  console.log("[data] dataPath:", clientReport.dataPath)
  console.log("[data] filePath:", filePath)
  console.log("[data] fileExists:", existsSync(filePath))

  if (!existsSync(filePath)) {
    // Try alternate path - on Vercel cwd may already be the repo root
    const altPath = join(cwd, clientReport.dataPath)
    console.log("[data] altPath:", altPath, "exists:", existsSync(altPath))
    if (existsSync(altPath)) {
      return serveReport(altPath, token)
    }
    return Response.json(
      { error: "no_data", message: "Report data file not found." },
      { status: 500 }
    )
  }

  return serveReport(filePath, token)
}

async function serveReport(filePath: string, token: string) {
  try {
    const raw: ReportCase = JSON.parse(readFileSync(filePath, "utf8"))
    const data = toClientReportData(raw)
    console.log("[data] Report served successfully for token:", token)

    // Update last accessed without blocking the response
    prisma.clientReport
      .update({ where: { token }, data: { lastAccessedAt: new Date() } })
      .catch((e: unknown) =>
        console.warn("[data] lastAccessedAt update failed:", e)
      )

    return Response.json(data)
  } catch (parseError: unknown) {
    const msg = parseError instanceof Error ? parseError.message : String(parseError)
    console.error("[data] Parse/transform error:", msg)
    return Response.json(
      { error: "no_data", message: "Report data unavailable." },
      { status: 500 }
    )
  }
}
