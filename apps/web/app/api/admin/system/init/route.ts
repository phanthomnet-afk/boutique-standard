export const dynamic = "force-dynamic"
export const revalidate = 0

import { prisma } from "@/lib/admin/prismaClient"
import crypto from "crypto"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") || ""
  if (!cookie.includes("tbs_admin_session")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await prisma.$queryRaw`SELECT 1`

    const hotelCount = await prisma.hotel.count()
    const reportCount = await prisma.clientReport.count()
    const settingsCount = await prisma.settings.count()

    const seeded: string[] = []

    if (settingsCount === 0) {
      await prisma.settings.create({
        data: {
          id: "singleton",
          touch2DelayDays: 8,
          touch3DelayDays: 22,
          nurtureDelayDays: 60,
          linkedinTargets: "[]",
        },
      })
      seeded.push("settings")
    }

    if (reportCount === 0) {
      const token = crypto.randomBytes(16).toString("hex")
      const passwordHash = crypto
        .createHash("sha256")
        .update("rivage2027")
        .digest("hex")

      await prisma.clientReport.create({
        data: {
          slug: "maison-du-rivage",
          token,
          passwordHash,
          hotelName: "Maison du Rivage",
          location: "Antibes, French Riviera",
          language: "en",
          dataPath: "maison-du-rivage.json",
          isActive: true,
        },
      })
      seeded.push("clientReport")

      return Response.json({
        success: true,
        seeded,
        reportUrl: `/client/${token}/report`,
        reportPassword: "rivage2027",
        hotels: hotelCount,
      })
    }

    return Response.json({
      success: true,
      message: "Already initialized",
      seeded: [],
      hotels: hotelCount,
      reports: reportCount,
    })
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
