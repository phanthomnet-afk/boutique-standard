export const dynamic = "force-dynamic"

import prisma from "@/lib/admin/prismaClient"

export async function GET() {
  let dbStatus: "ok" | "error" = "error"
  let dbError: string | null = null
  let hotelCount: number | null = null

  try {
    await prisma.$queryRaw`SELECT 1`
    hotelCount = await prisma.hotel.count()
    dbStatus = "ok"
  } catch (e: any) {
    dbError = e.message
  }

  return Response.json({
    status: dbStatus === "ok" ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "not set",
    database: {
      status: dbStatus,
      configured: !!process.env.DATABASE_URL,
      error: dbError,
      hotelCount,
    },
    adminPasswordConfigured: !!process.env.ADMIN_PASSWORD,
  })
}
