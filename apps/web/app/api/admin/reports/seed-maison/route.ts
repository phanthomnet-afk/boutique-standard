export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import { prisma } from "@/lib/admin/prismaClient"
import crypto from "crypto"

const REPORTS = [
  {
    slug:      "maison-du-rivage",
    name:      "Maison du Rivage",
    password:  "rivage2027",
    hotelName: "Maison du Rivage",
    location:  "Antibes, French Riviera",
    auditDate: "2025-01-15",
    dataPath:  "data/reports/maison-du-rivage.json",
  },
  {
    slug:      "hotel-lumiere",
    name:      "Hotel Lumiere",
    password:  "lumiere2027",
    hotelName: "Hotel Lumiere",
    location:  "Mallorca, Spain",
    auditDate: "2027-09-14",
    dataPath:  "hotel-lumiere.json",
  },
]

export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") || ""
  if (!cookie.includes("tbs_admin_session")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boutiquestandard.com"
  const results = []

  for (const r of REPORTS) {
    const passwordHash = crypto.createHash("sha256").update(r.password).digest("hex")
    const token        = crypto.randomBytes(16).toString("hex")

    await prisma.report.upsert({
      where:  { slug: r.slug },
      update: {},
      create: {
        slug:      r.slug,
        hotelName: r.hotelName,
        location:  r.location,
        auditDate: r.auditDate,
        dataPath:  r.dataPath,
        status:    "draft",
      },
    })

    await prisma.clientReport.upsert({
      where:  { slug: r.slug },
      update: { isActive: true },
      create: {
        slug:         r.slug,
        token,
        passwordHash,
        hotelName:    r.hotelName,
        location:     r.location,
        language:     "en",
        dataPath:     r.dataPath,
        isActive:     true,
      },
    })

    const existing = await prisma.clientReport.findUnique({ where: { slug: r.slug } })
    results.push({
      name:      r.name,
      clientUrl: `${baseUrl}/client/${existing!.token}/report`,
      password:  r.password,
    })
  }

  return Response.json({ success: true, reports: results })
}
