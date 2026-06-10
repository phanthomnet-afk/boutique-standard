import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { readFileSync } from "fs"
import { join } from "path"
import prisma from "@/lib/admin/prismaClient"
import { toClientReportData } from "@tbs/web-engine"
import type { ReportCase } from "@tbs/schema"

export const dynamic = "force-dynamic"

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params
  const cookieStore = cookies()
  const authCookie = cookieStore.get(`tbs_report_${token}`)

  if (!authCookie || authCookie.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const report = await prisma.clientReport.findUnique({ where: { token } })

  if (!report || !report.isActive) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const filePath = join(process.cwd(), "..", "..", "data", "reports", report.dataPath)
  const raw: ReportCase = JSON.parse(readFileSync(filePath, "utf8"))
  const data = toClientReportData(raw)

  await prisma.clientReport.update({
    where: { token },
    data: { lastAccessedAt: new Date() },
  })

  return NextResponse.json(data)
}
