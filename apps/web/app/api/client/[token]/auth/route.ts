import { NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"
import prisma from "@/lib/admin/prismaClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params
  const body = await req.json()
  const { password } = body

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 })
  }

  const report = await prisma.clientReport.findUnique({ where: { token } })

  if (!report || !report.isActive) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const submitted = createHash("sha256").update(password).digest("hex")

  if (submitted !== report.passwordHash) {
    return NextResponse.json({ error: "Incorrect access code. Please try again." }, { status: 401 })
  }

  await prisma.clientReport.update({
    where: { token },
    data: {
      lastAccessedAt: new Date(),
      accessCount: { increment: 1 },
    },
  })

  const response = NextResponse.json({ success: true })
  response.cookies.set(`tbs_report_${token}`, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 86400,
  })

  return response
}
