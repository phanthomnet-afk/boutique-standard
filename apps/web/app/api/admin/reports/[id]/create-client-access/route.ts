export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as crypto from "crypto"
import prisma from "@/lib/admin/prismaClient"

function auth() {
  const session = cookies().get("tbs_admin_session")
  return session?.value === "authenticated"
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const report = await prisma.report.findUnique({ where: { id: params.id } })
  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 })

  if (report.clientToken) {
    const existing = await prisma.clientReport.findUnique({ where: { token: report.clientToken } })
    if (existing) return NextResponse.json({ clientReport: existing, alreadyExists: true })
  }

  const body = await req.json().catch(() => ({}))
  const password     = body.password || crypto.randomBytes(6).toString("hex")
  const token        = crypto.randomBytes(24).toString("hex")
  const passwordHash = crypto.createHash("sha256").update(password).digest("hex")
  const slug         = report.slug

  const clientReport = await prisma.clientReport.create({
    data: {
      slug,
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
    where: { id: params.id },
    data: { clientToken: token },
  })

  return NextResponse.json({ clientReport, password, token })
}
