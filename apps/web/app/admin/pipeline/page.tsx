import Link from "next/link"
import prisma from "@/lib/admin/prismaClient"
import styles from "./pipeline.module.css"

const COLUMNS = [
  { key: "prospect", label: "Prospect" },
  { key: "enriched", label: "Enriched" },
  { key: "outreach-ready", label: "Outreach ready" },
  { key: "contacted", label: "Contacted" },
  { key: "replied", label: "Replied" },
  { key: "booked", label: "Booked" },
]

export default async function PipelinePage() {
  const hotels = await prisma.hotel.findMany({
    where: { status: { in: COLUMNS.map((c) => c.key) } },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      location: true,
      countryCode: true,
      status: true,
      updatedAt: true,
      _count: { select: { outreach: true } },
    },
  })

  const grouped: Record<string, typeof hotels> = {}
  for (const col of COLUMNS) grouped[col.key] = []
  for (const hotel of hotels) {
    if (grouped[hotel.status]) grouped[hotel.status].push(hotel)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Pipeline</h1>
      <div className={styles.board}>
        {COLUMNS.map((col) => (
          <div key={col.key} className={styles.column}>
            <div className={styles.colHeader}>
              <span className={styles.colLabel}>{col.label}</span>
              <span className={styles.colCount}>{grouped[col.key].length}</span>
            </div>
            <div className={styles.cards}>
              {grouped[col.key].map((hotel) => (
                <Link key={hotel.id} href={`/admin/hotels/${hotel.id}`} className={styles.card}>
                  <p className={styles.cardName}>{hotel.name}</p>
                  <p className={styles.cardLocation}>{hotel.location}, {hotel.countryCode}</p>
                  <p className={styles.cardMeta}>
                    {hotel._count.outreach} outreach
                    <span className={styles.dot}>-</span>
                    {new Date(hotel.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short"
                    })}
                  </p>
                </Link>
              ))}
              {grouped[col.key].length === 0 && (
                <p className={styles.empty}>-</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
