export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"

export async function GET(request: NextRequest) {
  const cookie = request.headers.get("cookie") || ""
  if (!cookie.includes("tbs_admin_session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const checks: Record<string, any> = {}

  try {
    await prisma.$queryRaw`SELECT 1`
    checks.database = {
      status: "ok",
      hotels: await prisma.hotel.count(),
      contacts: await prisma.contact.count(),
      reports: await prisma.clientReport.count(),
      settings: await prisma.settings.count(),
    }
  } catch (e: any) {
    checks.database = { status: "error", message: e.message }
  }

  const envKeys = [
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "RESEND_API_KEY",
    "GOOGLE_PLACES_API_KEY",
    "SCRAPEGRAPH_API_KEY",
    "ADMIN_PASSWORD",
    "DATABASE_URL",
    "DIRECT_URL",
  ]

  for (const key of envKeys) {
    checks[key] = { status: process.env[key] ? "configured" : "missing" }
  }

  checks.SEND_EMAILS_ENABLED = {
    status: process.env.SEND_EMAILS_ENABLED === "true" ? "enabled" : "disabled",
  }
  checks.DATAFORSEO = { status: "skipped - not required" }
  checks.DB_HOST = {
    status: "info",
    value: process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] ?? "not set",
  }

  const hasErrors = Object.values(checks).some((c: any) => c.status === "error")
  const hasMissing = Object.values(checks).some((c: any) => c.status === "missing")

  return NextResponse.json({
    overall: hasErrors ? "error" : hasMissing ? "degraded" : "ok",
    status: hasErrors ? "error" : hasMissing ? "degraded" : "ok",
    timestamp: new Date().toISOString(),
    checks,
    services: checks,
    sendEmailsEnabled: process.env.SEND_EMAILS_ENABLED === "true",
  })
}
