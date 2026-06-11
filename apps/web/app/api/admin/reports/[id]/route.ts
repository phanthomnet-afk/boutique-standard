export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/admin/prismaClient"

function auth() {
  const session = cookies().get("tbs_admin_session")
  return session?.value === "authenticated"
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const report = await prisma.report.findUnique({ where: { id: params.id } })
  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(report)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { notes, status } = body

  const allowed = ["draft", "generating", "ready", "delivered"]
  if (status && !allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const updated = await prisma.report.update({
    where: { id: params.id },
    data: {
      ...(notes  !== undefined && { notes }),
      ...(status !== undefined && { status }),
    },
  })

  return NextResponse.json(updated)
}
