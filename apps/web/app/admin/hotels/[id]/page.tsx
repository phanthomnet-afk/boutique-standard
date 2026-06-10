export const dynamic = "force-dynamic"
export const revalidate = 0

import { notFound } from "next/navigation"
import prisma from "@/lib/admin/prismaClient"
import { HotelDetailClient } from "./HotelDetailClient"

interface PageProps {
  params: { id: string }
}

function DbError({ message }: { message: string }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2 style={{ marginBottom: "1rem" }}>Database error - hotel detail page</h2>
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

export default async function HotelDetailPage({ params }: PageProps) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: params.id },
      include: {
        intelligence: true,
        contacts: { orderBy: { addedAt: "asc" } },
        outreach: { orderBy: [{ sequencePosition: "asc" }, { generatedAt: "desc" }] },
      },
    })

    if (!hotel) notFound()

    return <HotelDetailClient hotel={hotel} />
  } catch (e: any) {
    return <DbError message={e.message} />
  }
}
