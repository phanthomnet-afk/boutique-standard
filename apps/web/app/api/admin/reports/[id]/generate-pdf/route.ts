export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { execSync } from "child_process"
import * as path from "path"
import * as fs from "fs"
import prisma from "@/lib/admin/prismaClient"

function auth() {
  const session = cookies().get("tbs_admin_session")
  return session?.value === "authenticated"
}

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const report = await prisma.report.findUnique({ where: { id: params.id } })
  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const repoRoot = path.resolve(process.cwd(), "../..")
  const dataPath = path.join(repoRoot, report.dataPath)

  if (!fs.existsSync(dataPath)) {
    return NextResponse.json({ error: `Data file not found: ${report.dataPath}` }, { status: 422 })
  }

  await prisma.report.update({ where: { id: params.id }, data: { status: "generating" } })

  try {
    execSync(
      `npx tsx packages/pdf-engine/renderer.ts --report=${report.slug}`,
      { cwd: repoRoot, timeout: 120_000 }
    )

    const outputDir = path.join(repoRoot, "outputs", "pdf")
    const files     = fs.existsSync(outputDir) ? fs.readdirSync(outputDir) : []
    const match     = files.find((f) => f.startsWith(report.slug))
    const pdfPath   = match ? `outputs/pdf/${match}` : null

    const updated = await prisma.report.update({
      where: { id: params.id },
      data: {
        status:         "ready",
        pdfPath,
        pdfGeneratedAt: new Date(),
      },
    })

    return NextResponse.json({ ok: true, pdfPath, report: updated })
  } catch (err: unknown) {
    await prisma.report.update({ where: { id: params.id }, data: { status: "draft" } })
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "PDF generation failed", detail: message }, { status: 500 })
  }
}
