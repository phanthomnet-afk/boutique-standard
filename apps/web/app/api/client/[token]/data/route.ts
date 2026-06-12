import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { existsSync, readFileSync } from "fs"
import { join } from "path"
import prisma from "@/lib/admin/prismaClient"
import { toClientReportData } from "@tbs/web-engine"
import type { ReportCase } from "@tbs/schema"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params
  const cookieStore = cookies()
  const authCookie = cookieStore.get(`tbs_report_${token}`)

  if (!authCookie || authCookie.value !== "authenticated") {
    return NextResponse.json(
      { error: "unauthorized", message: "Please enter your access code" },
      { status: 401 }
    )
  }

  const report = await prisma.clientReport.findUnique({ where: { token } })

  if (!report || !report.isActive) {
    return NextResponse.json(
      { error: "not_found", message: "Report not found" },
      { status: 404 }
    )
  }

  const filePath = join(process.cwd(), "..", "..", report.dataPath)

  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: "no_data", message: "Report data unavailable" },
      { status: 500 }
    )
  }

  try {
    const raw: ReportCase = JSON.parse(readFileSync(filePath, "utf8"))
    const data = toClientReportData(raw)

    await prisma.clientReport.update({
      where: { token },
      data: { lastAccessedAt: new Date() },
    })

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "no_data", message: "Report data unavailable" },
      { status: 500 }
    )
  }
}
