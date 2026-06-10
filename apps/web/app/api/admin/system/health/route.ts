import { NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"

export const dynamic = "force-dynamic"

type ServiceStatus =
  | { status: "ok"; message?: string }
  | { status: "error"; message: string }
  | { status: "configured" }
  | { status: "missing" }
  | { status: "skipped" }

export async function GET() {
  const services: Record<string, ServiceStatus> = {}

  // Database - live ping
  try {
    await prisma.$queryRaw`SELECT 1`
    services.database = { status: "ok" }
  } catch (err) {
    services.database = { status: "error", message: err instanceof Error ? err.message : "Connection failed" }
  }

  // API keys - presence only
  services.openai       = process.env.OPENAI_API_KEY      ? { status: "configured" } : { status: "missing" }
  services.anthropic    = process.env.ANTHROPIC_API_KEY   ? { status: "configured" } : { status: "missing" }
  services.resend       = process.env.RESEND_API_KEY       ? { status: "configured" } : { status: "missing" }
  services.googlePlaces = process.env.GOOGLE_PLACES_API_KEY ? { status: "configured" } : { status: "missing" }
  services.scrapegraph  = process.env.SCRAPEGRAPH_API_KEY  ? { status: "configured" } : { status: "missing" }
  services.dataforseo   = { status: "skipped" }
  services.adminPassword = process.env.ADMIN_PASSWORD      ? { status: "configured" } : { status: "missing" }

  const dbOk = services.database.status === "ok"
  const coreOk = services.anthropic.status === "configured" && services.resend.status === "configured"
  const overallStatus = !dbOk ? "error" : !coreOk ? "degraded" : "ok"

  return NextResponse.json({
    status: overallStatus,
    timestamp: new Date().toISOString(),
    services,
    sendEmailsEnabled: process.env.SEND_EMAILS_ENABLED === "true",
  })
}
