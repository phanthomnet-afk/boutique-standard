export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import crypto from "crypto"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookie = request.headers.get("cookie") || ""
  if (!cookie.includes("tbs_admin_session")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
    })

    if (!report) {
      return Response.json({ error: "Report not found" }, { status: 404 })
    }

    // Return existing ClientReport if one exists for this slug
    const existing = await prisma.clientReport.findFirst({
      where: { slug: report.slug },
    })

    if (existing) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boutiquestandard.com"
      return Response.json({
        success:   true,
        token:     existing.token,
        clientUrl: `${baseUrl}/client/${existing.token}/report`,
        password:  "rivage2027",
        isNew:     false,
      })
    }

    // Create new ClientReport
    const token        = crypto.randomBytes(16).toString("hex")
    const password     = "rivage2027"
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex")

    const clientReport = await prisma.clientReport.create({
      data: {
        slug:      report.slug,
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
      data:  { clientToken: clientReport.token },
    })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boutiquestandard.com"

    return Response.json({
      success:   true,
      token:     clientReport.token,
      clientUrl: `${baseUrl}/client/${clientReport.token}/report`,
      password,
      isNew:     true,
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    console.error("Create client access error:", msg)
    return Response.json({ success: false, error: msg }, { status: 500 })
  }
}
