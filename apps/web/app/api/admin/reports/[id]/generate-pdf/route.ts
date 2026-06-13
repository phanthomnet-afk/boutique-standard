export const dynamic = "force-dynamic"
export const maxDuration = 60

import { NextRequest } from "next/server"
import { prisma } from "@/lib/admin/prismaClient"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookie = request.headers.get("cookie") || ""
  if (!cookie.includes("tbs_admin_session")) {
    return Response.json(
      { error: "Unauthorized" }, { status: 401 }
    )
  }

  try {
    // Load report and find its token
    const report = await prisma.report.findUnique({
      where: { id: params.id }
    })
    if (!report) {
      return Response.json(
        { error: "Report not found" }, { status: 404 }
      )
    }

    // Find the client report token
    const clientReport = await prisma.clientReport.findFirst({
      where: { slug: report.slug }
    })

    if (!clientReport) {
      return Response.json({
        error: "No client access created yet. Create client access first.",
        action: "create_access_first"
      }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
      || "https://boutiquestandard.com"
    const reportUrl = `${baseUrl}/client/${clientReport.token}/report`

    // Generate PDF
    const { generateReportPdf } = await import("@/lib/report/generatePdf")
    const pdfBuffer = await generateReportPdf(reportUrl, clientReport.token)

    // Return PDF as download
    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${report.slug}-report.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      }
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("PDF generation error:", message)
    return Response.json({
      success: false,
      error: message,
      hint: "Check Vercel function logs for details"
    }, { status: 500 })
  }
}
