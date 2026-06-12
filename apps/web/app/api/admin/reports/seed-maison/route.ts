export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import { prisma } from "@/lib/admin/prismaClient"
import crypto from "crypto"

const SLUG      = "maison-du-rivage"
const PASSWORD  = "rivage2027"
const HOTEL     = "Maison du Rivage"
const LOCATION  = "Antibes, French Riviera"
const DATA_PATH = "data/reports/maison-du-rivage.json"

export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") || ""
  if (!cookie.includes("tbs_admin_session")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const passwordHash = crypto.createHash("sha256").update(PASSWORD).digest("hex")
  const token        = crypto.randomBytes(16).toString("hex")

  await prisma.report.upsert({
    where:  { slug: SLUG },
    update: {},
    create: {
      slug:      SLUG,
      hotelName: HOTEL,
      location:  LOCATION,
      auditDate: "2025-01-15",
      dataPath:  DATA_PATH,
      status:    "draft",
    },
  })

  await prisma.clientReport.upsert({
    where:  { slug: SLUG },
    update: { isActive: true },
    create: {
      slug:         SLUG,
      token,
      passwordHash,
      hotelName:    HOTEL,
      location:     LOCATION,
      language:     "en",
      dataPath:     DATA_PATH,
      isActive:     true,
    },
  })

  const existing = await prisma.clientReport.findUnique({ where: { slug: SLUG } })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boutiquestandard.com"

  return Response.json({
    success:   true,
    clientUrl: `${baseUrl}/client/${existing!.token}/report`,
    password:  PASSWORD,
    token:     existing!.token,
  })
}
