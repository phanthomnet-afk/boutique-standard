export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as path from "path"
import * as fs from "fs"
import * as crypto from "crypto"
import prisma from "@/lib/admin/prismaClient"
import type { ReportCase } from "@tbs/schema"

function auth() {
  const session = cookies().get("tbs_admin_session")
  return session?.value === "authenticated"
}

const DEMO_PASSWORD = "rivage2027"
const SLUG = "maison-du-rivage"

export async function POST() {
  if (!auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const dataPath = "data/reports/maison-du-rivage.json"
  const absPath  = path.resolve(process.cwd(), "../..", dataPath)

  if (!fs.existsSync(absPath)) {
    return NextResponse.json({ error: `Data file not found: ${dataPath}` }, { status: 422 })
  }

  const data: ReportCase = JSON.parse(fs.readFileSync(absPath, "utf-8"))

  const report = await prisma.report.upsert({
    where:  { slug: SLUG },
    update: {
      hotelName: data.property.name,
      location:  data.property.location,
      auditDate: data.auditMetadata.auditDate,
      dataPath,
    },
    create: {
      slug:      SLUG,
      hotelName: data.property.name,
      location:  data.property.location,
      auditDate: data.auditMetadata.auditDate,
      dataPath,
      status:    "ready",
    },
  })

  // Find or create the ClientReport for this demo report
  let token: string | null = report.clientToken
  let isNew = false

  if (token) {
    const existing = await prisma.clientReport.findUnique({ where: { token } })
    if (!existing) token = null // token on report but ClientReport was deleted
  }

  if (!token) {
    isNew = true
    token = crypto.randomBytes(24).toString("hex")
    const passwordHash = crypto.createHash("sha256").update(DEMO_PASSWORD).digest("hex")

    await prisma.clientReport.create({
      data: {
        slug:      SLUG,
        token,
        passwordHash,
        hotelName: report.hotelName,
        location:  report.location,
        language:  "en",
        dataPath:  report.dataPath,
        isActive:  true,
      },
    })

    await prisma.report.update({
      where: { id: report.id },
      data:  { clientToken: token },
    })
  }

  const baseUrl   = process.env.NEXT_PUBLIC_SITE_URL || "https://boutiquestandard.com"
  const clientUrl = `${baseUrl}/client/${token}/report`

  return NextResponse.json({ success: true, clientUrl, password: DEMO_PASSWORD, isNew })
}
