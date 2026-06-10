export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/admin/prismaClient"

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const session = cookieStore.get("tbs_admin_session")
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const hotelName = req.nextUrl.searchParams.get("hotelName")
  if (!hotelName) {
    return NextResponse.json({ error: "hotelName required" }, { status: 400 })
  }

  const report = await prisma.clientReport.findFirst({
    where: { hotelName, isActive: true },
    select: { token: true, slug: true },
  })

  return NextResponse.json(report ?? null)
}
