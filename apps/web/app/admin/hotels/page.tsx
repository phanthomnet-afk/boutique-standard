export const dynamic = "force-dynamic"
export const revalidate = 0

import prisma from "@/lib/admin/prismaClient"
import { TARGET_COUNTRIES } from "@/lib/admin/countries"
import { HotelListClient } from "./HotelListClient"

interface PageProps {
  searchParams: { country?: string; status?: string; search?: string }
}

const STATUSES = [
  "prospect",
  "enriched",
  "outreach-ready",
  "contacted",
  "replied",
  "booked",
  "closed",
  "not-a-fit",
]

function DbError({ message }: { message: string }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2 style={{ marginBottom: "1rem" }}>Database error - hotels page</h2>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "1rem",
          overflow: "auto",
          fontSize: "0.875rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </pre>
      <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#4a4744" }}>
        Verify that DATABASE_URL is set in Vercel environment variables
        and that prisma db push has been run against the production database.
      </p>
    </div>
  )
}

export default async function HotelsPage({ searchParams }: PageProps) {
  const where: Record<string, unknown> = {}
  if (searchParams.country) where.countryCode = searchParams.country
  if (searchParams.status) where.status = searchParams.status
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search } },
      { location: { contains: searchParams.search } },
    ]
  }

  try {
    const [hotels, statusRows] = await Promise.all([
      prisma.hotel.findMany({
        where,
        orderBy: [{ icpScore: "desc" }, { updatedAt: "desc" }],
        include: {
          intelligence: {
            select: { analysedAt: true, averageRating: true, reviewCount: true },
          },
          _count: { select: { contacts: true } },
        },
      }),
      prisma.hotel.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
    ])

    const counts: Record<string, number> = {}
    for (const row of statusRows) {
      counts[row.status] = row._count.status
    }

    return (
      <HotelListClient
        hotels={hotels}
        counts={counts}
        countries={TARGET_COUNTRIES}
        statuses={STATUSES}
        filters={searchParams}
      />
    )
  } catch (e: any) {
    return <DbError message={e.message} />
  }
}
