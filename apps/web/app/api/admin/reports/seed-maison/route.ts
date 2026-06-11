export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as path from "path"
import * as fs from "fs"
import prisma from "@/lib/admin/prismaClient"
import type { ReportCase } from "@tbs/schema"

function auth() {
  const session = cookies().get("tbs_admin_session")
  return session?.value === "authenticated"
}

export async function POST() {
  if (!auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const dataPath = "data/reports/maison-du-rivage.json"
  const absPath  = path.resolve(process.cwd(), "../..", dataPath)

  if (!fs.existsSync(absPath)) {
    return NextResponse.json({ error: `Data file not found: ${dataPath}` }, { status: 422 })
  }

  const data: ReportCase = JSON.parse(fs.readFileSync(absPath, "utf-8"))

  const report = await prisma.report.upsert({
    where:  { slug: "maison-du-rivage" },
    update: {
      hotelName: data.property.name,
      location:  data.property.location,
      auditDate: data.auditMetadata.auditDate,
      dataPath,
    },
    create: {
      slug:      "maison-du-rivage",
      hotelName: data.property.name,
      location:  data.property.location,
      auditDate: data.auditMetadata.auditDate,
      dataPath,
      status:    "ready",
    },
  })

  return NextResponse.json({ ok: true, report })
}
