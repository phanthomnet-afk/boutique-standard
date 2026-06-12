export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/admin/prismaClient"

export async function GET() {
  const cookieStore = cookies()
  const session = cookieStore.get("tbs_admin_session")
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
  })

  const stats = {
    total:     reports.length,
    ready:     reports.filter((r) => r.clientToken !== null).length,
    delivered: reports.filter((r) => r.status === "delivered").length,
    draft:     reports.filter((r) => r.status === "draft").length,
  }

  return NextResponse.json({ reports, stats })
}
