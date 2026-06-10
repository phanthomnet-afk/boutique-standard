export const dynamic = "force-dynamic"
export const revalidate = 0

import { notFound } from "next/navigation"
import prisma from "@/lib/admin/prismaClient"
import { HotelDetailClient } from "./HotelDetailClient"

interface PageProps {
  params: { id: string }
}

export default async function HotelDetailPage({ params }: PageProps) {
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
}
