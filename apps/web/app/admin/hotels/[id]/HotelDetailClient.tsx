"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import styles from "./detail.module.css"

interface Gap {
  promise: string
  friction: string
  severity: "high" | "medium" | "low"
  type: string
}

interface Intelligence {
  brandPromises: string
  positioningSummary: string
  visualCoherenceScore: number | null
  pricePointSignal: string | null
  reviewPositiveThemes: string | null
  reviewNegativeThemes: string | null
  reviewCount: number | null
  averageRating: number | null
  gaps: string
  gapSummary: string | null
  analysedAt: string | Date
  analysisVersion: number
}

interface Contact {
  id: string
  name: string | null
  role: string | null
  email: string | null
  linkedinUrl: string | null
  source: string | null
  verified: boolean
  notes: string | null
}

interface OutreachRecord {
  id: string
  channel: string
  sequencePosition: number
  subject: string | null
  bodyDraft: string
  bodySent: string | null
  status: string
  generatedAt: string | Date
  sentAt: string | Date | null
  repliedAt: string | Date | null
  replyText: string | null
  replySentiment: string | null
  notes: string | null
}

interface Hotel {
  id: string
  name: string
  website: string
  location: string
  country: string
  countryCode: string
  starRating: number | null
  roomCountEstimate: number | null
  status: string
  icpScore: number | null
  notes: string | null
  intelligence: Intelligence | null
  contacts: Contact[]
  outreach: OutreachRecord[]
}

function IcpDots({ score }: { score: number | null }) {
  if (!score) return null
  return (
    <span className={styles.icpDots} title={`ICP score: ${score}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`${styles.icpDot} ${i <= score ? styles.icpDotFilled : ""}`} />
      ))}
    </span>
  )
}

interface Props {
  hotel: Hotel
}

const STATUS_OPTIONS = [
  "prospect", "enriched", "outreach-ready", "contacted",
  "replied", "booked", "closed", "not-a-fit"
]

const STATUS_LABELS: Record<string, string> = {
  prospect: "Prospect",
  enriched: "Enriched",
  "outreach-ready": "Outreach ready",
  contacted: "Contacted",
  replied: "Replied",
  booked: "Booked",
  closed: "Closed",
  "not-a-fit": "Not a fit",
}

function safeParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback
  try { return JSON.parse(json) } catch { return fallback }
}

export function HotelDetailClient({ hotel }: Props) {
  const [tab, setTab] = useState<"intelligence" | "contacts" | "outreach" | "notes">("intelligence")
  const [status, setStatus] = useState(hotel.status)
  const [notes, setNotes] = useState(hotel.notes ?? "")
  const [analysing, setAnalysing] = useState(false)
  const [intelligence, setIntelligence] = useState<Intelligence | null>(hotel.intelligence)
  const [outreach, setOutreach] = useState<OutreachRecord[]>(hotel.outreach)
  const [contacts, setContacts] = useState<Contact[]>(hotel.contacts)
  const [, startTransition] = useTransition()
  const router = useRouter()

  async function runAnalysis() {
    setAnalysing(true)
    const res = await fetch(`/api/admin/hotels/${hotel.id}/analyse`, { method: "POST" })
    if (res.ok) {
      const data = await res.json()
      setIntelligence(data)
      setStatus("enriched")
    }
    setAnalysing(false)
  }

  async function updateStatus(newStatus: string) {
    setStatus(newStatus)
    await fetch(`/api/admin/hotels/${hotel.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    startTransition(() => router.refresh())
  }

  async function saveNotes() {
    await fetch(`/api/admin/hotels/${hotel.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.titleBlock}>
          <div className={styles.hotelNameRow}>
            <h1 className={styles.hotelName}>{hotel.name}</h1>
            <IcpDots score={hotel.icpScore} />
          </div>
          <p className={styles.location}>{hotel.location}, {hotel.country}</p>
          <a href={hotel.website} target="_blank" rel="noreferrer" className={styles.websiteLink}>
            {hotel.website}
          </a>
        </div>
        <div className={styles.topActions}>
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            className={styles.statusSelect}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s] ?? s}</option>
            ))}
          </select>
        </div>
      </div>

      {!intelligence && status === "prospect" && (
        <div className={styles.unanalysedBanner}>
          This hotel has not been analysed yet.{" "}
          <button
            onClick={() => { setTab("intelligence"); runAnalysis() }}
            disabled={analysing}
            className={styles.bannerBtn}
          >
            {analysing ? "Analysing..." : "Run analysis"}
          </button>{" "}
          to generate brand intelligence and gap detection.
        </div>
      )}

      <div className={styles.tabs}>
        {(["intelligence", "contacts", "outreach", "notes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "intelligence" && (
        <IntelligenceTab
          intelligence={intelligence}
          analysing={analysing}
          onRunAnalysis={runAnalysis}
        />
      )}

      {tab === "contacts" && (
        <ContactsTab
          hotelId={hotel.id}
          contacts={contacts}
          onAdded={(c) => setContacts((prev) => [...prev, c])}
        />
      )}

      {tab === "outreach" && (
        <OutreachTab
          hotelId={hotel.id}
          contacts={contacts}
          outreach={outreach}
          hasIntelligence={!!intelligence}
          onGenerated={(o) => setOutreach((prev) => [o, ...prev])}
          onUpdated={(updated) =>
            setOutreach((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
          }
          onHotelBooked={() => {
            setStatus("booked")
            startTransition(() => router.refresh())
          }}
        />
      )}

      {tab === "notes" && (
        <div className={styles.tabContent}>
          <textarea
            className={styles.notesArea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            placeholder="Notes about this property..."
            rows={16}
          />
          <p className={styles.hint}>Saved automatically on blur.</p>
        </div>
      )}
    </div>
  )
}

function IntelligenceTab({
  intelligence,
  analysing,
  onRunAnalysis,
}: {
  intelligence: Intelligence | null
  analysing: boolean
  onRunAnalysis: () => void
}) {
  if (!intelligence) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.emptyState}>
          <p>This hotel has not been analysed yet.</p>
          <button onClick={onRunAnalysis} disabled={analysing} className={styles.primaryBtn}>
            {analysing ? "Analysing... (this may take 30-60 seconds)" : "Run analysis"}
          </button>
        </div>
      </div>
    )
  }

  const brandPromises = safeParse<string[]>(intelligence.brandPromises, [])
  const positiveThemes = safeParse<string[]>(intelligence.reviewPositiveThemes, [])
  const negativeThemes = safeParse<string[]>(intelligence.reviewNegativeThemes, [])
  const gaps = safeParse<Gap[]>(intelligence.gaps, [])

  return (
    <div className={styles.tabContent}>
      <div className={styles.intelGrid}>
        <section className={styles.intelSection}>
          <h3 className={styles.sectionTitle}>Brand promises</h3>
          <div className={styles.pills}>
            {brandPromises.map((p, i) => <span key={i} className={styles.pill}>{p}</span>)}
            {brandPromises.length === 0 && <span className={styles.muted}>None detected</span>}
          </div>
        </section>

        <section className={styles.intelSection}>
          <h3 className={styles.sectionTitle}>Positioning</h3>
          <p className={styles.bodyText}>{intelligence.positioningSummary || "-"}</p>
          <div className={styles.metaRow}>
            {intelligence.pricePointSignal && (
              <span className={styles.metaBadge}>{intelligence.pricePointSignal}</span>
            )}
            {intelligence.visualCoherenceScore != null && (
              <span className={styles.metaBadge}>
                Visual coherence: {intelligence.visualCoherenceScore}/5
              </span>
            )}
          </div>
        </section>

        {(positiveThemes.length > 0 || negativeThemes.length > 0) && (
          <section className={styles.intelSection}>
            <h3 className={styles.sectionTitle}>
              Review themes
              {intelligence.reviewCount ? ` (${intelligence.reviewCount} reviews, avg ${intelligence.averageRating?.toFixed(1)})` : ""}
            </h3>
            <div className={styles.themeColumns}>
              <div>
                <p className={styles.themeLabel}>Positive</p>
                <ul className={styles.themeList}>
                  {positiveThemes.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
              <div>
                <p className={styles.themeLabel}>Negative</p>
                <ul className={styles.themeList}>
                  {negativeThemes.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}

        {gaps.length > 0 && (
          <section className={styles.intelSection}>
            <h3 className={styles.sectionTitle}>Gap analysis</h3>
            {intelligence.gapSummary && (
              <p className={styles.gapSummary}>{intelligence.gapSummary}</p>
            )}
            <div className={styles.gapList}>
              {gaps.map((g, i) => (
                <div key={i} className={styles.gapCard}>
                  <div className={styles.gapTop}>
                    <span className={styles.gapPromise}>{g.promise}</span>
                    <span className={`${styles.severityBadge} ${styles[`sev_${g.severity}`]}`}>
                      {g.severity}
                    </span>
                  </div>
                  <p className={styles.gapFriction}>{g.friction}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.intelSection}>
          <p className={styles.hint}>
            Analysed {new Date(intelligence.analysedAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric"
            })} - version {intelligence.analysisVersion}
          </p>
          <button onClick={onRunAnalysis} disabled={analysing} className={styles.ghostBtn}>
            {analysing ? "Re-analysing..." : "Re-run analysis (overwrites cache)"}
          </button>
        </section>
      </div>
    </div>
  )
}

function ContactsTab({
  hotelId,
  contacts,
  onAdded,
}: {
  hotelId: string
  contacts: Contact[]
  onAdded: (c: Contact) => void
}) {
  const [form, setForm] = useState({ name: "", role: "", email: "", linkedinUrl: "", source: "manual", notes: "" })
  const [loading, setLoading] = useState(false)

  async function addContact(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/admin/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotelId, ...form }),
    })
    if (res.ok) {
      const c = await res.json()
      onAdded(c)
      setForm({ name: "", role: "", email: "", linkedinUrl: "", source: "manual", notes: "" })
    }
    setLoading(false)
  }

  return (
    <div className={styles.tabContent}>
      {contacts.length > 0 ? (
        <div className={styles.contactList}>
          {contacts.map((c) => (
            <div key={c.id} className={styles.contactCard}>
              <div className={styles.contactMain}>
                <p className={styles.contactName}>{c.name ?? "Unknown"}</p>
                {c.role && <span className={styles.contactRole}>{c.role}</span>}
              </div>
              <div className={styles.contactLinks}>
                {c.email && <a href={`mailto:${c.email}`} className={styles.contactLink}>{c.email}</a>}
                {c.linkedinUrl && (
                  <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className={styles.contactLink}>
                    LinkedIn
                  </a>
                )}
              </div>
              {c.notes && <p className={styles.contactNotes}>{c.notes}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.muted}>No contacts added yet.</p>
      )}

      <h3 className={styles.sectionTitle} style={{ marginTop: "1.5rem" }}>Add contact</h3>
      <form onSubmit={addContact} className={styles.contactForm}>
        <div className={styles.row2}>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Name</label>
            <input className={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Role</label>
            <input className={styles.input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="owner / gm" />
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label}>LinkedIn URL</label>
            <input className={styles.input} value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.label}>Source</label>
          <select className={styles.input} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
            <option value="manual">Manual</option>
            <option value="linkedin">LinkedIn</option>
            <option value="website">Website</option>
            <option value="press">Press</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className={styles.primaryBtn}>
          {loading ? "Adding..." : "Add contact"}
        </button>
      </form>
    </div>
  )
}

function OutreachTab({
  hotelId,
  contacts,
  outreach,
  hasIntelligence,
  onGenerated,
  onUpdated,
  onHotelBooked,
}: {
  hotelId: string
  contacts: Contact[]
  outreach: OutreachRecord[]
  hasIntelligence: boolean
  onGenerated: (o: OutreachRecord) => void
  onUpdated: (o: OutreachRecord) => void
  onHotelBooked: () => void
}) {
  const positions: Array<1 | 2 | 3> = [1, 2, 3]

  return (
    <div className={styles.tabContent}>
      <div className={styles.linkedinNote}>
        <strong>LinkedIn strategy:</strong> Connect with the owner or GM directly. Share one journal article per week on your personal profile. Engage with their posts before sending a cold message. The warm approach converts significantly better.
      </div>

      {!hasIntelligence && (
        <div className={styles.warningBanner}>
          Run analysis first before generating outreach.
        </div>
      )}

      {positions.map((pos) => {
        const emailRecord = outreach.find((o) => o.channel === "email" && o.sequencePosition === pos)
        const linkedinRecord = outreach.find((o) => o.channel === "linkedin" && o.sequencePosition === pos)

        return (
          <div key={pos} className={styles.touchBlock}>
            <h3 className={styles.touchTitle}>Touch {pos}</h3>
            <div className={styles.channelRow}>
              <OutreachCard
                label="Email"
                record={emailRecord}
                hotelId={hotelId}
                position={pos}
                channel="email"
                contacts={contacts}
                disabled={!hasIntelligence}
                onGenerated={onGenerated}
                onUpdated={onUpdated}
                onHotelBooked={onHotelBooked}
              />
              <OutreachCard
                label="LinkedIn"
                record={linkedinRecord}
                hotelId={hotelId}
                position={pos}
                channel="linkedin"
                contacts={contacts}
                disabled={!hasIntelligence}
                onGenerated={onGenerated}
                onUpdated={onUpdated}
                onHotelBooked={onHotelBooked}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function OutreachCard({
  label,
  record,
  hotelId,
  position,
  channel,
  contacts,
  disabled,
  onGenerated,
  onUpdated,
  onHotelBooked,
}: {
  label: string
  record: OutreachRecord | undefined
  hotelId: string
  position: 1 | 2 | 3
  channel: "email" | "linkedin"
  contacts: Contact[]
  disabled: boolean
  onGenerated: (o: OutreachRecord) => void
  onUpdated: (o: OutreachRecord) => void
  onHotelBooked: () => void
}) {
  const [generating, setGenerating] = useState(false)
  const [editBody, setEditBody] = useState(record?.bodyDraft ?? "")
  const [editSubject, setEditSubject] = useState(record?.subject ?? "")
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState(record?.replyText ?? "")
  const [replySentiment, setReplySentiment] = useState<string>(record?.replySentiment ?? "")
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ simulated: boolean } | null>(null)
  const [showBookedNote, setShowBookedNote] = useState(record?.replySentiment === "booked")
  const [showPositiveSteps, setShowPositiveSteps] = useState(record?.replySentiment === "positive")
  const [contactId, setContactId] = useState(contacts[0]?.id ?? "")

  async function generate() {
    setGenerating(true)
    const res = await fetch(`/api/admin/hotels/${hotelId}/outreach`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel, sequencePosition: position, contactId: contactId || null }),
    })
    if (res.ok) {
      const data = await res.json()
      onGenerated(data)
      setEditBody(data.bodyDraft)
    }
    setGenerating(false)
  }

  async function markSent() {
    if (!record) return
    const res = await fetch(`/api/admin/hotels/${hotelId}/outreach/${record.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sent", sentAt: new Date().toISOString(), bodySent: editBody }),
    })
    if (res.ok) onUpdated(await res.json())
  }

  async function saveReply() {
    if (!record) return
    const res = await fetch(`/api/admin/hotels/${hotelId}/outreach/${record.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "replied",
        repliedAt: new Date().toISOString(),
        replyText,
        replySentiment: replySentiment || null,
      }),
    })
    if (res.ok) {
      onUpdated(await res.json())
      setShowReply(false)
      if (replySentiment === "booked") {
        await fetch(`/api/admin/hotels/${hotelId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "booked" }),
        })
        onHotelBooked()
        setShowBookedNote(true)
      } else if (replySentiment === "positive") {
        setShowPositiveSteps(true)
      }
    }
  }

  async function sendEmail() {
    if (!record) return
    setSending(true)
    const res = await fetch(`/api/admin/hotels/${hotelId}/outreach/${record.id}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: editSubject, bodyText: editBody, contactId: contactId || null }),
    })
    if (res.ok) {
      const d = await res.json()
      onUpdated(d.outreach)
      setSendResult({ simulated: d.simulated })
    }
    setSending(false)
  }

  return (
    <div className={styles.outreachCard}>
      <p className={styles.outreachLabel}>{label}</p>

      {!record ? (
        <button onClick={generate} disabled={disabled || generating} className={styles.generateBtn}>
          {generating ? "Generating..." : `Generate ${label.toLowerCase()}`}
        </button>
      ) : (
        <>
          <div className={styles.outreachMeta}>
            <span className={`${styles.badge} ${styles[`badge_${record.status.replace(/-/g, "_")}`]}`}>
              {record.status}
            </span>
            {record.sentAt && (
              <span className={styles.metaDate}>
                Sent {new Date(record.sentAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </span>
            )}
          </div>

          {record.subject && (
            <p className={styles.outreachSubject}>Subject: {record.subject}</p>
          )}

          <textarea
            className={styles.draftArea}
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={channel === "linkedin" ? 4 : 10}
          />

          {channel === "linkedin" && (
            <p className={styles.charCount}>{editBody.length} characters</p>
          )}

          {channel === "email" && record.status !== "sent" && record.status !== "replied" && (
            <div className={styles.fieldRow}>
              <label className={styles.label} style={{ fontSize: "0.75rem" }}>Subject</label>
              <input
                className={styles.input}
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                placeholder="Email subject line"
              />
            </div>
          )}

          <div className={styles.outreachActions}>
            {contacts.length > 0 && channel === "linkedin" && contacts.find((c) => c.linkedinUrl) && (
              <a
                href={contacts.find((c) => c.linkedinUrl)?.linkedinUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className={styles.ghostBtn}
              >
                Open LinkedIn
              </a>
            )}
            <button
              onClick={() => navigator.clipboard.writeText(editBody)}
              className={styles.ghostBtn}
            >
              Copy
            </button>
            {record.status !== "sent" && record.status !== "replied" && channel === "email" &&
              contacts.find((c) => c.id === contactId)?.email && (
              <button
                onClick={sendEmail}
                disabled={sending || !editSubject.trim()}
                className={styles.primaryBtn}
              >
                {sending ? "Sending..." : "Send email"}
              </button>
            )}
            {record.status !== "sent" && record.status !== "replied" && (channel !== "email" || !contacts.find((c) => c.id === contactId)?.email) && (
              <button onClick={markSent} className={styles.ghostBtn}>
                Mark sent
              </button>
            )}
            {record.status === "sent" && !record.repliedAt && (
              <button onClick={() => setShowReply(!showReply)} className={styles.ghostBtn}>
                Log reply
              </button>
            )}
          </div>

          {sendResult && (
            <p className={styles.hint}>
              {sendResult.simulated ? "Simulated send (SEND_EMAILS_ENABLED=false)" : "Email sent via Resend"}
            </p>
          )}

          {showReply && (
            <div className={styles.replyBlock}>
              <div className={styles.sentimentRow}>
                {(["positive", "neutral", "negative", "booked"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setReplySentiment(replySentiment === s ? "" : s)}
                    className={`${styles.sentimentPill} ${replySentiment === s ? styles[`sentiment_${s}`] : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <textarea
                className={styles.draftArea}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Paste their reply here..."
                rows={4}
              />
              <button onClick={saveReply} className={styles.primaryBtn}>Save reply</button>
            </div>
          )}

          {record.repliedAt && record.replyText && (
            <div className={styles.replyDisplay}>
              <p className={styles.themeLabel}>
                Reply received
                {record.replySentiment && (
                  <span className={`${styles.sentimentPill} ${styles[`sentiment_${record.replySentiment}`]}`} style={{ marginLeft: "0.5rem" }}>
                    {record.replySentiment}
                  </span>
                )}
              </p>
              <p className={styles.bodyText}>{record.replyText}</p>
            </div>
          )}

          {showBookedNote && (
            <div className={styles.bookedNote}>
              Congratulations - hotel status updated to Booked.
            </div>
          )}

          {showPositiveSteps && !showBookedNote && (
            <div className={styles.positiveSteps}>
              <p className={styles.themeLabel}>Suggested next steps</p>
              <ul className={styles.stepsList}>
                <li>Follow up within 24 hours</li>
                <li>Share a sample report section to demonstrate depth</li>
                <li>Propose a 15-minute call to discuss scope</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
