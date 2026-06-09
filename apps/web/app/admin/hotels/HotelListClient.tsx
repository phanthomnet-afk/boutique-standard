"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./hotels.module.css"

interface Hotel {
  id: string
  name: string
  website: string
  location: string
  country: string
  countryCode: string
  starRating: number | null
  roomCountEstimate: number | null
  category: string | null
  status: string
  updatedAt: string | Date
  intelligence: { analysedAt: string | Date; averageRating: number | null; reviewCount: number | null } | null
  _count: { contacts: number }
}

interface Props {
  hotels: Hotel[]
  counts: Record<string, number>
  countries: Array<{ code: string; name: string }>
  statuses: string[]
  filters: { country?: string; status?: string; search?: string }
}

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

export function HotelListClient({ hotels, counts, countries, statuses, filters }: Props) {
  const router = useRouter()
  const [showAddForm, setShowAddForm] = useState(false)
  const [isPending, startTransition] = useTransition()

  function applyFilter(key: string, value: string) {
    const params = new URLSearchParams(filters as Record<string, string>)
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/admin/hotels?${params.toString()}`)
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hotels</h1>
        <button className={styles.addBtn} onClick={() => setShowAddForm(true)}>
          + Add hotel
        </button>
      </div>

      <div className={styles.stats}>
        <span className={styles.stat}>Total: <strong>{total}</strong></span>
        {["enriched", "outreach-ready", "contacted", "replied", "booked"].map((s) => (
          <span key={s} className={styles.stat}>
            {STATUS_LABELS[s]}: <strong>{counts[s] ?? 0}</strong>
          </span>
        ))}
      </div>

      <div className={styles.filters}>
        <select
          value={filters.country ?? ""}
          onChange={(e) => applyFilter("country", e.target.value)}
          className={styles.select}
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>

        <select
          value={filters.status ?? ""}
          onChange={(e) => applyFilter("status", e.target.value)}
          className={styles.select}
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s] ?? s}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search name or location..."
          defaultValue={filters.search ?? ""}
          onChange={(e) => applyFilter("search", e.target.value)}
          className={styles.search}
        />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Country</th>
              <th>Rooms</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Contacts</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length === 0 && (
              <tr>
                <td colSpan={9} className={styles.empty}>No hotels found.</td>
              </tr>
            )}
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td className={styles.nameCell}>
                  <Link href={`/admin/hotels/${hotel.id}`} className={styles.hotelLink}>
                    {hotel.name}
                  </Link>
                </td>
                <td>{hotel.location}</td>
                <td>{hotel.countryCode}</td>
                <td>{hotel.roomCountEstimate ?? "-"}</td>
                <td>
                  <span className={`${styles.badge} ${styles[`badge_${hotel.status.replace(/-/g, "_")}`]}`}>
                    {STATUS_LABELS[hotel.status] ?? hotel.status}
                  </span>
                </td>
                <td>{hotel.intelligence?.averageRating?.toFixed(1) ?? "-"}</td>
                <td>{hotel._count.contacts}</td>
                <td className={styles.dateCell}>
                  {new Date(hotel.updatedAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short"
                  })}
                </td>
                <td className={styles.actions}>
                  <Link href={`/admin/hotels/${hotel.id}`} className={styles.actionBtn}>
                    View
                  </Link>
                  <AnalyseButton hotelId={hotel.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <AddHotelModal
          onClose={() => setShowAddForm(false)}
          onAdded={() => {
            setShowAddForm(false)
            startTransition(() => router.refresh())
          }}
          countries={countries}
        />
      )}
    </div>
  )
}

function AnalyseButton({ hotelId }: { hotelId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function run() {
    setLoading(true)
    await fetch(`/api/admin/hotels/${hotelId}/analyse`, { method: "POST" })
    setLoading(false)
    router.refresh()
  }

  return (
    <button onClick={run} disabled={loading} className={styles.actionBtn}>
      {loading ? "..." : "Analyse"}
    </button>
  )
}

function AddHotelModal({
  onClose,
  onAdded,
  countries,
}: {
  onClose: () => void
  onAdded: () => void
  countries: Array<{ code: string; name: string }>
}) {
  const [form, setForm] = useState({
    name: "",
    website: "",
    location: "",
    country: "",
    countryCode: "",
    starRating: "",
    roomCountEstimate: "",
    category: "",
    googlePlaceId: "",
    instagramHandle: "",
    onBookingCom: false,
    notes: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function set(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const body = {
      ...form,
      starRating: form.starRating ? parseInt(form.starRating) : null,
      roomCountEstimate: form.roomCountEstimate ? parseInt(form.roomCountEstimate) : null,
    }

    const res = await fetch("/api/admin/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      onAdded()
    } else {
      const data = await res.json()
      setError(data.error ?? "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add hotel</h2>
          <button onClick={onClose} className={styles.closeBtn}>x</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.addForm}>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Name *</label>
            <input className={styles.input} value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Website *</label>
            <input className={styles.input} value={form.website} onChange={(e) => set("website", e.target.value)} required type="url" placeholder="https://" />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Location *</label>
            <input className={styles.input} value={form.location} onChange={(e) => set("location", e.target.value)} required placeholder="City, Region" />
          </div>
          <div className={styles.row2}>
            <div className={styles.fieldRow}>
              <label className={styles.label}>Country *</label>
              <select
                className={styles.input}
                value={form.countryCode}
                onChange={(e) => {
                  const c = countries.find((x) => x.code === e.target.value)
                  set("countryCode", e.target.value)
                  if (c) set("country", c.name)
                }}
                required
              >
                <option value="">Select</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.label}>Stars</label>
              <input className={styles.input} value={form.starRating} onChange={(e) => set("starRating", e.target.value)} type="number" min={1} max={5} />
            </div>
          </div>
          <div className={styles.row2}>
            <div className={styles.fieldRow}>
              <label className={styles.label}>Rooms (est.)</label>
              <input className={styles.input} value={form.roomCountEstimate} onChange={(e) => set("roomCountEstimate", e.target.value)} type="number" min={1} />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.label}>Category</label>
              <input className={styles.input} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="coastal-retreat" />
            </div>
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Google Place ID</label>
            <input className={styles.input} value={form.googlePlaceId} onChange={(e) => set("googlePlaceId", e.target.value)} />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Instagram</label>
            <input className={styles.input} value={form.instagramHandle} onChange={(e) => set("instagramHandle", e.target.value)} placeholder="@handle" />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={form.onBookingCom} onChange={(e) => set("onBookingCom", e.target.checked)} />
              On Booking.com
            </label>
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label}>Notes</label>
            <textarea className={styles.textarea} value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} />
          </div>
          {error && <p className={styles.formError}>{error}</p>}
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Adding..." : "Add hotel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
