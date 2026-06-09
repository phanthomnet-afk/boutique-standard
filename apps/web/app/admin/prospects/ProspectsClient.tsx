"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { TARGET_COUNTRIES } from "@/lib/admin/countries"
import { COLLECTIVE_SOURCES } from "@/lib/admin/collectiveScraper"
import styles from "./prospects.module.css"

// ── Types ────────────────────────────────────────────────────────────────────

interface SearchResult {
  googlePlaceId: string
  name: string
  address: string
  location: string
  country: string
  countryCode: string
  rating: number
  reviewCount: number
  website: string | null
  priceLevel: number | null
  icpScore: number
  existing: boolean
}

interface CollectiveListing {
  name: string
  location: string
  country: string
  website: string | null
  description: string | null
  sourceId: string
  sourceName: string
  existing: boolean
}

// ── Search suggestions ────────────────────────────────────────────────────────

const SEARCH_SUGGESTIONS: Array<{ label: string; query: string; countryCode: string }> = [
  { label: "Copenhagen", query: "boutique hotel Copenhagen", countryCode: "DK" },
  { label: "Bornholm", query: "boutique hotel Bornholm", countryCode: "DK" },
  { label: "Antibes", query: "boutique hotel Antibes", countryCode: "FR" },
  { label: "Saint-Tropez", query: "boutique hotel Saint-Tropez", countryCode: "FR" },
  { label: "Aix-en-Provence", query: "boutique hotel Aix-en-Provence", countryCode: "FR" },
  { label: "Florence", query: "boutique hotel Florence", countryCode: "IT" },
  { label: "Positano", query: "boutique hotel Positano", countryCode: "IT" },
  { label: "Taormina", query: "boutique hotel Taormina", countryCode: "IT" },
  { label: "Siena", query: "boutique hotel Siena", countryCode: "IT" },
  { label: "Palma", query: "boutique hotel Palma Mallorca", countryCode: "ES" },
  { label: "San Sebastian", query: "boutique hotel San Sebastian", countryCode: "ES" },
  { label: "Evora", query: "boutique hotel Evora", countryCode: "PT" },
  { label: "Lagos", query: "boutique hotel Lagos Algarve", countryCode: "PT" },
  { label: "Santorini", query: "boutique hotel Santorini", countryCode: "GR" },
  { label: "Mykonos", query: "boutique hotel Mykonos", countryCode: "GR" },
]

// ── ICP score dots ────────────────────────────────────────────────────────────

function IcpDots({ score }: { score: number }) {
  return (
    <span className={styles.dots} title={`ICP score: ${score}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`${styles.dot} ${i <= score ? styles.dotFilled : ""}`} />
      ))}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ProspectsClient() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Prospects</h1>
      <p className={styles.subtitle}>Find and import qualified boutique hotels into the pipeline.</p>

      <div className={styles.sections}>
        <GoogleSearchSection />
        <CollectivesSection />
        <CsvSection />
      </div>
    </div>
  )
}

// ── Google Places search ──────────────────────────────────────────────────────

function GoogleSearchSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [countryCode, setCountryCode] = useState("FR")
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<{ imported: number } | null>(null)
  const [searched, setSearched] = useState(false)

  async function runSearch(q?: string, cc?: string) {
    const finalQuery = q ?? query
    const finalCode = cc ?? countryCode
    if (!finalQuery.trim()) return

    setSearching(true)
    setResults([])
    setSelected(new Set())
    setImportResult(null)
    setSearched(false)

    const res = await fetch("/api/admin/prospects/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: finalQuery, countryCode: finalCode }),
    })

    if (res.ok) {
      const data = await res.json()
      setResults(data.results ?? [])
    }

    setSearched(true)
    setSearching(false)
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAll() {
    setSelected(new Set(results.filter((r) => !r.existing).map((r) => r.googlePlaceId)))
  }

  function deselectAll() {
    setSelected(new Set())
  }

  async function importSelected() {
    if (selected.size === 0) return
    setImporting(true)

    const res = await fetch("/api/admin/prospects/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeIds: Array.from(selected) }),
    })

    if (res.ok) {
      const data = await res.json()
      setImportResult({ imported: data.imported })
      setSelected(new Set())
      // Mark imported results as existing
      setResults((prev) =>
        prev.map((r) => (selected.has(r.googlePlaceId) ? { ...r, existing: true } : r))
      )
    }

    setImporting(false)
  }

  const newResults = results.filter((r) => !r.existing)

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Google Places search</h2>
      </div>

      <div className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runSearch()}
          placeholder="boutique hotel Florence"
        />
        <select
          className={styles.select}
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {TARGET_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        <button
          className={styles.primaryBtn}
          onClick={() => runSearch()}
          disabled={searching || !query.trim()}
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      <div className={styles.pills}>
        {SEARCH_SUGGESTIONS.map((s) => (
          <button
            key={s.query}
            className={styles.pill}
            onClick={() => {
              setQuery(s.query)
              setCountryCode(s.countryCode)
              runSearch(s.query, s.countryCode)
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {searched && results.length === 0 && (
        <p className={styles.empty}>No results found. Try a different query or check your Google Places API key.</p>
      )}

      {results.length > 0 && (
        <>
          <div className={styles.resultsHeader}>
            <span className={styles.resultCount}>{results.length} results</span>
            <div className={styles.bulkActions}>
              <button className={styles.ghostBtn} onClick={selectAll}>Select all new</button>
              <button className={styles.ghostBtn} onClick={deselectAll}>Deselect all</button>
              {selected.size > 0 && (
                <button
                  className={styles.importBtn}
                  onClick={importSelected}
                  disabled={importing}
                >
                  {importing ? `Importing ${selected.size}...` : `Import ${selected.size} hotel${selected.size > 1 ? "s" : ""}`}
                </button>
              )}
            </div>
          </div>

          {importResult && (
            <div className={styles.successBanner}>
              {importResult.imported} hotel{importResult.imported !== 1 ? "s" : ""} added.{" "}
              <button className={styles.linkBtn} onClick={() => router.push("/admin/hotels")}>
                View in Hotels
              </button>
            </div>
          )}

          <div className={styles.resultsGrid}>
            {results.map((r) => (
              <label
                key={r.googlePlaceId}
                className={`${styles.resultCard} ${r.existing ? styles.cardExisting : ""} ${selected.has(r.googlePlaceId) ? styles.cardSelected : ""}`}
              >
                {!r.existing && (
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selected.has(r.googlePlaceId)}
                    onChange={() => toggleSelect(r.googlePlaceId)}
                  />
                )}
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <p className={styles.cardName}>{r.name}</p>
                    <IcpDots score={r.icpScore} />
                  </div>
                  <p className={styles.cardLocation}>{r.location}</p>
                  <div className={styles.cardMeta}>
                    {r.rating > 0 && (
                      <span className={styles.metaTag}>
                        {r.rating.toFixed(1)} ({r.reviewCount})
                      </span>
                    )}
                    {r.priceLevel && (
                      <span className={styles.metaTag}>{"€".repeat(r.priceLevel)}</span>
                    )}
                    {r.existing && (
                      <span className={`${styles.metaTag} ${styles.existingTag}`}>Already in system</span>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

// ── Hotel collectives ─────────────────────────────────────────────────────────

function CollectivesSection() {
  const router = useRouter()
  const [scraping, setScraping] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, CollectiveListing[]>>({})
  const [selected, setSelected] = useState<Record<string, Set<number>>>({})
  const [importing, setImporting] = useState<string | null>(null)
  const [importResults, setImportResults] = useState<Record<string, number>>({})

  async function scrape(sourceId: string) {
    setScraping(sourceId)
    const res = await fetch("/api/admin/prospects/collective", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceId }),
    })
    if (res.ok) {
      const data = await res.json()
      setResults((prev) => ({ ...prev, [sourceId]: data.results ?? [] }))
      setSelected((prev) => ({ ...prev, [sourceId]: new Set() }))
    }
    setScraping(null)
  }

  function toggleSelect(sourceId: string, idx: number) {
    setSelected((prev) => {
      const set = new Set(prev[sourceId] ?? [])
      if (set.has(idx)) set.delete(idx)
      else set.add(idx)
      return { ...prev, [sourceId]: set }
    })
  }

  function selectAllNew(sourceId: string) {
    const list = results[sourceId] ?? []
    setSelected((prev) => ({
      ...prev,
      [sourceId]: new Set(list.map((_, i) => i).filter((i) => !list[i].existing)),
    }))
  }

  async function importSelected(sourceId: string) {
    const list = results[sourceId] ?? []
    const sel = selected[sourceId] ?? new Set()
    const hotels = Array.from(sel).map((i) => list[i])
    if (hotels.length === 0) return

    setImporting(sourceId)
    const res = await fetch("/api/admin/prospects/collective/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotels }),
    })
    if (res.ok) {
      const data = await res.json()
      setImportResults((prev) => ({ ...prev, [sourceId]: data.imported }))
      setSelected((prev) => ({ ...prev, [sourceId]: new Set() }))
      setResults((prev) => ({
        ...prev,
        [sourceId]: (prev[sourceId] ?? []).map((l, i) =>
          sel.has(i) ? { ...l, existing: true } : l
        ),
      }))
    }
    setImporting(null)
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Hotel collectives</h2>
        <p className={styles.sectionNote}>Each scrape uses ~30 ScrapeGraphAI credits.</p>
      </div>

      <div className={styles.collectiveGrid}>
        {COLLECTIVE_SOURCES.map((source) => {
          const list = results[source.id]
          const sel = selected[source.id] ?? new Set()
          const isScraping = scraping === source.id
          const isImporting = importing === source.id
          const imported = importResults[source.id]

          return (
            <div key={source.id} className={styles.collectiveCard}>
              <div className={styles.collectiveTop}>
                <div>
                  <p className={styles.collectiveName}>{source.name}</p>
                  <p className={styles.collectiveRegion}>{source.region}</p>
                  {source.note && <p className={styles.collectiveNote}>{source.note}</p>}
                </div>
                <button
                  className={styles.scrapeBtn}
                  onClick={() => scrape(source.id)}
                  disabled={isScraping}
                >
                  {isScraping ? "Scraping..." : list ? "Re-scrape" : "Scrape"}
                </button>
              </div>

              {imported != null && (
                <div className={styles.successBanner}>
                  {imported} hotel{imported !== 1 ? "s" : ""} added.{" "}
                  <button className={styles.linkBtn} onClick={() => router.push("/admin/hotels")}>
                    View
                  </button>
                </div>
              )}

              {list && list.length > 0 && (
                <>
                  <div className={styles.collectiveResultsHeader}>
                    <span className={styles.resultCount}>{list.length} found</span>
                    <div className={styles.bulkActions}>
                      <button className={styles.ghostBtn} onClick={() => selectAllNew(source.id)}>
                        Select new
                      </button>
                      {sel.size > 0 && (
                        <button
                          className={styles.importBtn}
                          onClick={() => importSelected(source.id)}
                          disabled={isImporting}
                        >
                          {isImporting ? "Importing..." : `Import ${sel.size}`}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={styles.collectiveList}>
                    {list.map((listing, i) => (
                      <label
                        key={i}
                        className={`${styles.collectiveRow} ${listing.existing ? styles.rowExisting : ""} ${sel.has(i) ? styles.rowSelected : ""}`}
                      >
                        {!listing.existing && (
                          <input
                            type="checkbox"
                            checked={sel.has(i)}
                            onChange={() => toggleSelect(source.id, i)}
                          />
                        )}
                        <div className={styles.collectiveRowBody}>
                          <span className={styles.collectiveRowName}>{listing.name}</span>
                          <span className={styles.collectiveRowLocation}>{listing.location}, {listing.country}</span>
                          {listing.existing && (
                            <span className={`${styles.metaTag} ${styles.existingTag}`}>In system</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {list && list.length === 0 && (
                <p className={styles.empty}>No hotels extracted. Try again or check ScrapeGraphAI key.</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── CSV import ────────────────────────────────────────────────────────────────

function CsvSection() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ imported: number; skipped: number; errors: string[] } | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/admin/prospects/csv", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      setResult(data)
    } else {
      setResult({ imported: 0, skipped: 0, errors: ["Upload failed"] })
    }

    setUploading(false)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>CSV bulk import</h2>
      </div>

      <div className={styles.csvBlock}>
        <p className={styles.csvNote}>
          Upload a CSV with hotel data. Required column: <code>name</code>.
          Recommended: <code>website</code>, <code>location</code>, <code>country</code>.
        </p>

        <div className={styles.csvActions}>
          <button
            className={styles.primaryBtn}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Importing..." : "Choose CSV file"}
          </button>
          <a
            href="/admin/hotel-import-template.csv"
            download
            className={styles.ghostBtn}
          >
            Download template
          </a>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          onChange={handleFile}
          style={{ display: "none" }}
        />

        {result && (
          <div className={`${styles.csvResult} ${result.errors.length > 0 ? styles.csvWarn : styles.csvSuccess}`}>
            <p>
              <strong>{result.imported} imported</strong>
              {result.skipped > 0 && `, ${result.skipped} skipped`}
            </p>
            {result.errors.length > 0 && (
              <ul className={styles.csvErrors}>
                {result.errors.slice(0, 5).map((e, i) => <li key={i}>{e}</li>)}
                {result.errors.length > 5 && <li>...and {result.errors.length - 5} more</li>}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
