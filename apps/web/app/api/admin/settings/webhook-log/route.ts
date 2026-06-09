import { NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"

export const dynamic = "force-dynamic"

export async function GET() {
  const logs = await prisma.webhookLog.findMany({
    orderBy: { firedAt: "desc" },
    take: 10,
    select: {
      id: true,
      event: true,
      hotelName: true,
      status: true,
      statusCode: true,
      error: true,
      firedAt: true,
    },
  })

  return NextResponse.json(logs)
}
