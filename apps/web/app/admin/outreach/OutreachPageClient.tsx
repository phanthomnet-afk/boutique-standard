"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import OutreachModal from "@/components/admin/OutreachModal"
import styles from "./outreach.module.css"

interface Contact {
  id: string
  name: string | null
  email: string | null
  linkedinUrl: string | null
}

interface SequenceItem {
  hotelId: string
  hotelName: string
  location: string
  countryCode: string
  gapSummary: string | null
  contacts: Contact[]
  nextPosition: 1 | 2 | 3 | "nurture"
  dueDate: string
  lastSentAt: string | null
  urgency: "overdue" | "today" | "thisWeek"
}

interface ReadyItem {
  hotelId: string
  hotelName: string
  location: string
  countryCode: string
  gapSummary: string | null
  contacts: Contact[]
  icpScore: number | null
}

interface WeeklyPlan {
  overdue: SequenceItem[]
  today: SequenceItem[]
  thisWeek: SequenceItem[]
  readyToStart: ReadyItem[]
  stats: {
    totalHotels: number
    totalSent: number
    totalReplied: number
    totalBooked: number
  }
}

interface LinkedinPlan {
  weekNumber: number
  articleSlug: string
  articleTitle: string
  articleUrl: string
  post: { hook: string; angle: string; cta: string }
}

interface ModalState {
  hotelId: string
  hotelName: string
  gapSummary: string | null
  contacts: Contact[]
  defaultPosition: 1 | 2 | 3
}

function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
}

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function touchLabel(position: 1 | 2 | 3 | "nurture"): string {
  if (position === "nurture") return "Nurture"
  return `Touch ${position}`
}

export default function OutreachPageClient({ linkedin }: { linkedin: LinkedinPlan }) {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState | null>(null)

  const loadPlan = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/outreach/schedule")
      if (res.ok) setPlan(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPlan()
  }, [loadPlan])

  function openModal(item: SequenceItem) {
    const pos = item.nextPosition === "nurture" ? 3 : (item.nextPosition as 1 | 2 | 3)
    setModal({
      hotelId: item.hotelId,
      hotelName: item.hotelName,
      gapSummary: item.gapSummary,
      contacts: item.contacts,
      defaultPosition: pos,
    })
  }

  function openModalReady(item: ReadyItem) {
    setModal({
      hotelId: item.hotelId,
      hotelName: item.hotelName,
      gapSummary: item.gapSummary,
      contacts: item.contacts,
      defaultPosition: 1,
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Outreach</h1>
      </div>

      {/* Stat bar */}
      {plan && (
        <div className={styles.statBar}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{plan.stats.totalHotels}</span>
            <span className={styles.statLabel}>hotels</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{plan.stats.totalSent}</span>
            <span className={styles.statLabel}>sent</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{plan.stats.totalReplied}</span>
            <span className={styles.statLabel}>replied</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{plan.stats.totalBooked}</span>
            <span className={styles.statLabel}>booked</span>
          </div>
        </div>
      )}

      {loading && <p className={styles.loading}>Loading schedule...</p>}

      {plan && (
        <>
          {/* Overdue */}
          {plan.overdue.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.urgencyDot} style={{ background: "#c0392b" }} />
                Overdue ({plan.overdue.length})
              </h2>
              <div className={styles.list}>
                {plan.overdue.map((item) => (
                  <div key={item.hotelId} className={styles.row}>
                    <div className={styles.rowMain}>
                      <Link href={`/admin/hotels/${item.hotelId}`} className={styles.hotelName}>
                        {item.hotelName}
                      </Link>
                      <p className={styles.sub}>{item.location}, {item.countryCode}</p>
                      {item.gapSummary && <p className={styles.gapNote}>{item.gapSummary}</p>}
                    </div>
                    <div className={styles.rowMeta}>
                      <span className={`${styles.badge} ${styles.badgeOverdue}`}>
                        {touchLabel(item.nextPosition)}
                      </span>
                      {item.lastSentAt && (
                        <span className={styles.date}>
                          Last sent {daysSince(item.lastSentAt)}d ago
                        </span>
                      )}
                      <button
                        onClick={() => openModal(item)}
                        className={styles.generateBtn}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Due today */}
          {plan.today.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.urgencyDot} style={{ background: "#e67e22" }} />
                Due today ({plan.today.length})
              </h2>
              <div className={styles.list}>
                {plan.today.map((item) => (
                  <div key={item.hotelId} className={styles.row}>
                    <div className={styles.rowMain}>
                      <Link href={`/admin/hotels/${item.hotelId}`} className={styles.hotelName}>
                        {item.hotelName}
                      </Link>
                      <p className={styles.sub}>{item.location}, {item.countryCode}</p>
                    </div>
                    <div className={styles.rowMeta}>
                      <span className={`${styles.badge} ${styles.badgeToday}`}>
                        {touchLabel(item.nextPosition)}
                      </span>
                      <button onClick={() => openModal(item)} className={styles.generateBtn}>
                        Generate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* This week */}
          {plan.thisWeek.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.urgencyDot} style={{ background: "#4a6fa5" }} />
                This week ({plan.thisWeek.length})
              </h2>
              <div className={styles.list}>
                {plan.thisWeek.map((item) => (
                  <div key={item.hotelId} className={styles.row}>
                    <div className={styles.rowMain}>
                      <Link href={`/admin/hotels/${item.hotelId}`} className={styles.hotelName}>
                        {item.hotelName}
                      </Link>
                      <p className={styles.sub}>{item.location}, {item.countryCode}</p>
                    </div>
                    <div className={styles.rowMeta}>
                      <span className={`${styles.badge} ${styles.badgeWeek}`}>
                        {touchLabel(item.nextPosition)} in {daysUntil(item.dueDate)}d
                      </span>
                      <button onClick={() => openModal(item)} className={styles.generateBtn}>
                        Generate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Ready to start */}
          {plan.readyToStart.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.urgencyDot} style={{ background: "#5c6b3e" }} />
                Ready to start ({plan.readyToStart.length})
              </h2>
              <div className={styles.list}>
                {plan.readyToStart.map((item) => (
                  <div key={item.hotelId} className={styles.row}>
                    <div className={styles.rowMain}>
                      <Link href={`/admin/hotels/${item.hotelId}`} className={styles.hotelName}>
                        {item.hotelName}
                      </Link>
                      <p className={styles.sub}>{item.location}, {item.countryCode}</p>
                      {item.gapSummary && <p className={styles.gapNote}>{item.gapSummary}</p>}
                    </div>
                    <div className={styles.rowMeta}>
                      {item.icpScore && (
                        <span className={styles.icpBadge}>ICP {item.icpScore}</span>
                      )}
                      <button onClick={() => openModalReady(item)} className={styles.generateBtn}>
                        Start Touch 1
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {plan.overdue.length === 0 &&
            plan.today.length === 0 &&
            plan.thisWeek.length === 0 &&
            plan.readyToStart.length === 0 && (
              <div className={styles.emptyPlan}>
                <p>No outreach activity scheduled this week.</p>
                <Link href="/admin/hotels" className={styles.ghostBtn}>View all hotels</Link>
              </div>
            )}
        </>
      )}

      {/* LinkedIn calendar */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>LinkedIn - Week {linkedin.weekNumber}</h2>
        <div className={styles.linkedinBlock}>
          <p className={styles.linkedinArticle}>
            <span className={styles.linkedinArticleLabel}>Article</span>
            <a
              href={linkedin.articleUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.linkedinArticleLink}
            >
              {linkedin.articleTitle}
            </a>
          </p>
          <p className={styles.linkedinHook}>{linkedin.post.hook}</p>
          <p className={styles.linkedinAngle}>{linkedin.post.angle}</p>
          <p className={styles.linkedinCta}>{linkedin.post.cta}</p>
          <div className={styles.linkedinActions}>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${linkedin.post.hook}\n\n${linkedin.post.angle}\n\n${linkedin.post.cta}`
                )
              }
              className={styles.ghostBtn}
            >
              Copy post
            </button>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noreferrer"
              className={styles.ghostBtn}
            >
              Open LinkedIn
            </a>
          </div>
          <p className={styles.linkedinReminder}>
            Post on your personal profile. Manual only. Engage with prospects before messaging.
          </p>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <OutreachModal
          hotelId={modal.hotelId}
          hotelName={modal.hotelName}
          gapSummary={modal.gapSummary}
          contacts={modal.contacts}
          defaultPosition={modal.defaultPosition}
          onClose={() => setModal(null)}
          onDone={() => {
            setModal(null)
            loadPlan()
          }}
        />
      )}
    </div>
  )
}
