"use client"

import { useState, useEffect } from "react"
import { buildEmailHtml } from "@/lib/admin/emailTemplate"
import styles from "./OutreachModal.module.css"

interface Contact {
  id: string
  name: string | null
  email: string | null
  linkedinUrl: string | null
}

interface OutreachRecord {
  id: string
  channel: string
  sequencePosition: number
  subject: string | null
  bodyDraft: string
  bodySent: string | null
  status: string
  sentAt: string | null
  repliedAt: string | null
}

interface OutreachModalProps {
  hotelId: string
  hotelName: string
  gapSummary: string | null
  contacts: Contact[]
  defaultPosition?: 1 | 2 | 3
  onClose: () => void
  onDone?: (outreach: OutreachRecord) => void
}

type Step = "compose" | "preview" | "success"

export default function OutreachModal({
  hotelId,
  hotelName,
  gapSummary,
  contacts,
  defaultPosition = 1,
  onClose,
  onDone,
}: OutreachModalProps) {
  const [channel, setChannel] = useState<"email" | "linkedin">("email")
  const [position, setPosition] = useState<1 | 2 | 3>(defaultPosition)
  const [contactId, setContactId] = useState<string>(contacts[0]?.id ?? "")
  const [generating, setGenerating] = useState(false)
  const [outreach, setOutreach] = useState<OutreachRecord | null>(null)
  const [editBody, setEditBody] = useState("")
  const [editSubject, setEditSubject] = useState("")
  const [step, setStep] = useState<Step>("compose")
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ simulated?: boolean } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewHtml, setPreviewHtml] = useState("")

  // Dismiss on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  async function generate() {
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/hotels/${hotelId}/outreach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, sequencePosition: position, contactId: contactId || null }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? "Failed to generate")
        return
      }
      const data: OutreachRecord = await res.json()
      setOutreach(data)
      setEditBody(data.bodyDraft)
      setEditSubject(
        channel === "email"
          ? `Re: Guest Experience at ${hotelName}`
          : ""
      )
    } finally {
      setGenerating(false)
    }
  }

  function openPreview() {
    const contact = contacts.find((c) => c.id === contactId)
    const html = buildEmailHtml({
      contactName: contact?.name ?? "",
      body: editBody,
      hotelName,
      sequencePosition: position,
    })
    setPreviewHtml(html)
    setStep("preview")
  }

  async function sendEmail() {
    if (!outreach) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/admin/hotels/${hotelId}/outreach/${outreach.id}/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: editSubject,
            bodyText: editBody,
            contactId: contactId || null,
          }),
        }
      )
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? "Send failed")
        return
      }
      const d = await res.json()
      setSendResult({ simulated: d.simulated })
      setOutreach(d.outreach)
      setStep("success")
      onDone?.(d.outreach)
    } finally {
      setSending(false)
    }
  }

  async function markSent() {
    if (!outreach) return
    const res = await fetch(`/api/admin/hotels/${hotelId}/outreach/${outreach.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sent", sentAt: new Date().toISOString(), bodySent: editBody }),
    })
    if (res.ok) {
      const updated: OutreachRecord = await res.json()
      setOutreach(updated)
      setStep("success")
      onDone?.(updated)
    }
  }

  const emailContact = contacts.find((c) => c.id === contactId)
  const hasEmail = !!emailContact?.email
  const hasLinkedIn = contacts.some((c) => c.linkedinUrl)

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelHotel}>{hotelName}</p>
            {gapSummary && <p className={styles.panelGap}>{gapSummary}</p>}
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
            ×
          </button>
        </div>

        {step === "compose" && (
          <div className={styles.panelBody}>
            {!outreach ? (
              <>
                {/* Channel + Position */}
                <div className={styles.controlRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Channel</label>
                    <div className={styles.segmented}>
                      <button
                        className={`${styles.seg} ${channel === "email" ? styles.segActive : ""}`}
                        onClick={() => setChannel("email")}
                      >
                        Email
                      </button>
                      <button
                        className={`${styles.seg} ${channel === "linkedin" ? styles.segActive : ""}`}
                        onClick={() => setChannel("linkedin")}
                      >
                        LinkedIn
                      </button>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Touch</label>
                    <div className={styles.segmented}>
                      {([1, 2, 3] as const).map((p) => (
                        <button
                          key={p}
                          className={`${styles.seg} ${position === p ? styles.segActive : ""}`}
                          onClick={() => setPosition(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact selector */}
                {contacts.length > 1 && (
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Contact</label>
                    <select
                      className={styles.select}
                      value={contactId}
                      onChange={(e) => setContactId(e.target.value)}
                    >
                      {contacts.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name ?? "Unnamed"}{c.email ? ` - ${c.email}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {contacts.length === 0 && (
                  <p className={styles.warningNote}>No contacts on this hotel. Add a contact first.</p>
                )}

                {error && <p className={styles.errorNote}>{error}</p>}

                <button
                  onClick={generate}
                  disabled={generating || contacts.length === 0}
                  className={styles.primaryBtn}
                >
                  {generating ? "Generating..." : `Generate Touch ${position} draft`}
                </button>
              </>
            ) : (
              <>
                {/* Draft editor */}
                {channel === "email" && (
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Subject line</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value)}
                      placeholder="Subject line"
                    />
                  </div>
                )}

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    {channel === "email" ? "Email body" : "LinkedIn message"}
                    {channel === "linkedin" && (
                      <span className={styles.charNote}> {editBody.length} chars</span>
                    )}
                  </label>
                  <textarea
                    className={styles.textarea}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={channel === "email" ? 14 : 6}
                  />
                </div>

                {error && <p className={styles.errorNote}>{error}</p>}

                <div className={styles.actionRow}>
                  {channel === "email" && (
                    <button onClick={openPreview} className={styles.ghostBtn}>
                      Preview email
                    </button>
                  )}
                  {channel === "linkedin" && hasLinkedIn && (
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
                    onClick={() => navigator.clipboard.writeText(
                      channel === "linkedin" ? editBody : `Subject: ${editSubject}\n\n${editBody}`
                    )}
                    className={styles.ghostBtn}
                  >
                    Copy
                  </button>
                  {channel === "email" && hasEmail && (
                    <button
                      onClick={sendEmail}
                      disabled={sending || !editSubject.trim()}
                      className={styles.primaryBtn}
                    >
                      {sending ? "Sending..." : "Send email"}
                    </button>
                  )}
                  {(channel === "linkedin" || !hasEmail) && (
                    <button onClick={markSent} className={styles.primaryBtn}>
                      Mark as sent
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {step === "preview" && (
          <div className={styles.panelBody}>
            <div className={styles.previewHeader}>
              <div>
                <p className={styles.previewMeta}>To: {emailContact?.email ?? "unknown"}</p>
                <p className={styles.previewMeta}>Subject: {editSubject}</p>
              </div>
              <button onClick={() => setStep("compose")} className={styles.ghostBtn}>
                Back to edit
              </button>
            </div>
            <iframe
              srcDoc={previewHtml}
              className={styles.previewFrame}
              title="Email preview"
              sandbox="allow-same-origin"
            />
            {error && <p className={styles.errorNote}>{error}</p>}
            <div className={styles.actionRow}>
              <button
                onClick={sendEmail}
                disabled={sending}
                className={styles.primaryBtn}
              >
                {sending ? "Sending..." : "Confirm and send"}
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className={styles.panelBody}>
            <div className={styles.successState}>
              <p className={styles.successIcon}>&#10003;</p>
              <p className={styles.successTitle}>
                {channel === "email" ? "Email sent" : "Outreach logged"}{" "}
                {sendResult?.simulated && <span className={styles.simulatedNote}>(simulated)</span>}
              </p>
              <p className={styles.successSub}>
                Touch {outreach?.sequencePosition} to {hotelName} has been recorded.
              </p>
              <div className={styles.actionRow}>
                <button onClick={onClose} className={styles.ghostBtn}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
