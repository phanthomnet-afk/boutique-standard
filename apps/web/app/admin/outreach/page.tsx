import Link from "next/link"
import prisma from "@/lib/admin/prismaClient"
import { getAllArticles } from "@/lib/journal/getAllArticles"
import styles from "./outreach.module.css"

const FOLLOW_UP_DAYS = 8

export default async function OutreachPage() {
  const now = new Date()
  const cutoff = new Date(now.getTime() - FOLLOW_UP_DAYS * 24 * 60 * 60 * 1000)

  const [needFollowUp, hasReplies, notYetContacted, latestArticle] = await Promise.all([
    // Sent > 8 days ago, no reply, not dead
    prisma.outreach.findMany({
      where: {
        status: "sent",
        sentAt: { lt: cutoff },
        repliedAt: null,
      },
      include: {
        hotel: { select: { id: true, name: true, location: true, countryCode: true } },
        contact: { select: { name: true, role: true } },
      },
      orderBy: { sentAt: "asc" },
    }),

    // Hotels with replies that need action
    prisma.outreach.findMany({
      where: { status: "replied" },
      include: {
        hotel: { select: { id: true, name: true, location: true, countryCode: true } },
        contact: { select: { name: true, role: true } },
      },
      orderBy: { repliedAt: "desc" },
    }),

    // Hotels added but never had any outreach sent
    prisma.hotel.findMany({
      where: {
        status: { in: ["prospect", "enriched", "outreach-ready"] },
        outreach: { none: { status: { in: ["sent", "replied"] } } },
      },
      orderBy: { addedAt: "asc" },
      take: 20,
      select: { id: true, name: true, location: true, countryCode: true, status: true, addedAt: true },
    }),

    Promise.resolve(getAllArticles()[0]),
  ])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Outreach</h1>

      {hasReplies.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Replies to action ({hasReplies.length})</h2>
          <div className={styles.list}>
            {hasReplies.map((o) => (
              <Link key={o.id} href={`/admin/hotels/${o.hotelId}?tab=outreach`} className={styles.row}>
                <div className={styles.rowMain}>
                  <p className={styles.hotelName}>{o.hotel.name}</p>
                  <p className={styles.sub}>{o.hotel.location}, {o.hotel.countryCode}</p>
                </div>
                <div className={styles.rowMeta}>
                  <span className={styles.badge} style={{ background: "#f0d9a0", color: "#6b4a00" }}>
                    replied
                  </span>
                  {o.repliedAt && (
                    <span className={styles.date}>
                      {new Date(o.repliedAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short"
                      })}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Follow-up needed ({needFollowUp.length})</h2>
        {needFollowUp.length === 0 ? (
          <p className={styles.empty}>No follow-ups overdue.</p>
        ) : (
          <div className={styles.list}>
            {needFollowUp.map((o) => {
              const daysSince = o.sentAt
                ? Math.floor((now.getTime() - new Date(o.sentAt).getTime()) / (1000 * 60 * 60 * 24))
                : null

              return (
                <Link key={o.id} href={`/admin/hotels/${o.hotelId}`} className={styles.row}>
                  <div className={styles.rowMain}>
                    <p className={styles.hotelName}>{o.hotel.name}</p>
                    <p className={styles.sub}>
                      {o.hotel.location}, {o.hotel.countryCode}
                      {o.contact?.name && ` - ${o.contact.name}${o.contact.role ? ` (${o.contact.role})` : ""}`}
                    </p>
                    <p className={styles.sub}>Touch {o.sequencePosition} via {o.channel}</p>
                  </div>
                  <div className={styles.rowMeta}>
                    {daysSince != null && (
                      <span className={`${styles.badge} ${daysSince > 14 ? styles.badgeUrgent : styles.badgeNormal}`}>
                        {daysSince}d ago
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Not yet contacted ({notYetContacted.length})</h2>
        {notYetContacted.length === 0 ? (
          <p className={styles.empty}>All prospects have outreach in progress.</p>
        ) : (
          <div className={styles.list}>
            {notYetContacted.map((h) => (
              <Link key={h.id} href={`/admin/hotels/${h.id}`} className={styles.row}>
                <div className={styles.rowMain}>
                  <p className={styles.hotelName}>{h.name}</p>
                  <p className={styles.sub}>{h.location}, {h.countryCode}</p>
                </div>
                <div className={styles.rowMeta}>
                  <span className={`${styles.badge} ${styles.badgeNormal}`}>{h.status}</span>
                  <span className={styles.date}>
                    Added {new Date(h.addedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {latestArticle && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>LinkedIn content</h2>
          <div className={styles.linkedinBlock}>
            <p className={styles.articleLine}>
              <strong>Latest article:</strong> {latestArticle.title}
            </p>
            <p className={styles.articleAngle}>
              <strong>Suggested angle:</strong> Share one observation from this article that relates to a challenge boutique hotel owners face. No product mention. Pure value.
            </p>
            <p className={styles.linkedinReminder}>
              Post on your personal LinkedIn profile. Manual posting only.
              Engage with your prospects' posts before sending cold messages.
            </p>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noreferrer"
              className={styles.linkedinBtn}
            >
              Open LinkedIn
            </a>
          </div>
        </section>
      )}
    </div>
  )
}
