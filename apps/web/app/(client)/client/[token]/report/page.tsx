import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import prisma from "@/lib/admin/prismaClient"
import ReportPasswordGate from "@/components/report/ReportPasswordGate"
import ReportLoader from "@/components/report/ReportLoader"

export const dynamic = "force-dynamic"

export default async function ClientReportPage({
  params,
}: {
  params: { token: string }
}) {
  const { token } = params

  const report = await prisma.clientReport.findUnique({
    where: { token },
    select: { hotelName: true, location: true, isActive: true },
  })

  if (!report || !report.isActive) {
    notFound()
  }

  const cookieStore = cookies()
  const authCookie = cookieStore.get(`tbs_report_${token}`)

  if (!authCookie || authCookie.value !== "authenticated") {
    return (
      <ReportPasswordGate
        token={token}
        hotelName={report.hotelName}
        location={report.location}
      />
    )
  }

  return <ReportLoader token={token} hotelName={report.hotelName} />
}
