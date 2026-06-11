/**
 * Seed script - creates initial Sanity documents from existing TypeScript content.
 * Run: npm run sanity:seed (from project root)
 *
 * Requires SANITY_API_DEV_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID to be set.
 */

import { createClient } from "@sanity/client"
import dotenv from "dotenv"
import path from "path"

// Load env from apps/web/.env.local
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "boutique-standard-data",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_DEV_TOKEN!,
  useCdn: false,
})

function loc(en: string, da?: string) {
  return { en, da: da || en }
}

function locText(en: string, da?: string) {
  return { en, da: da || en }
}

async function upsert(doc: any) {
  return client.createOrReplace({ ...doc, _id: doc._id || doc._key })
}

async function seed() {
  console.log("[seed] Starting Sanity content seed...")
  console.log("[seed] Project:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log("[seed] Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET || "boutique-standard-data")

  // ── 1. Global Reviews ─────────────────────────────────────────────────────
  await upsert({
    _id: "sharedSection.globalReviews",
    _type: "sharedSection",
    internalName: "Global Reviews",
    section: [
      {
        _key: "globalReviews",
        _type: "section.reviews",
        internalName: "Global Reviews",
        label: loc("From the field"),
        items: [
          {
            _key: "r1",
            quote: locText(
              "The report showed us things we had stopped noticing. The gap between what we communicate and what we deliver was wider than we thought."
            ),
            attribution: loc("Owner, 4-star boutique hotel, South of France"),
          },
          {
            _key: "r2",
            quote: locText(
              "The departure section alone was worth the investment. We had never considered how that final hour shapes the entire memory of the stay."
            ),
            attribution: loc("General Manager, coastal retreat, Denmark"),
          },
          {
            _key: "r3",
            quote: locText(
              "We used it in a board presentation three months later. It gave us a language for conversations we had been avoiding."
            ),
            attribution: loc("Owner-operator, design hotel, Copenhagen"),
          },
        ],
      },
    ],
  })
  console.log("[seed] Created: Global Reviews")

  // ── 2. Global CTA ─────────────────────────────────────────────────────────
  await upsert({
    _id: "sharedSection.globalCta",
    _type: "sharedSection",
    internalName: "Global CTA",
    section: [
      {
        _key: "globalCta",
        _type: "section.cta",
        internalName: "Global CTA",
        label: loc("Begin"),
        heading: loc("See your property clearly."),
        body: locText("The request takes five minutes."),
        buttonLabel: loc("Request an Audit"),
        buttonHref: "/request",
      },
    ],
  })
  console.log("[seed] Created: Global CTA")

  // ── 3. Maison du Rivage - Report Overview ─────────────────────────────────
  await upsert({
    _id: "sharedSection.maisonReportOverview",
    _type: "sharedSection",
    internalName: "Maison du Rivage - Report Overview",
    section: [
      {
        _key: "maisonOverview",
        _type: "section.reportOverview",
        internalName: "Maison du Rivage - Report Overview",
        label: loc("Case report"),
        heading: loc("An audit in practice."),
        body: locText(
          "A complete guest experience intelligence report for a 14-room property on the French Riviera."
        ),
        propertyName: "Maison du Rivage",
        propertyLocation: "Antibes, French Riviera",
        overallScore: 8.2,
        excerpt: locText(
          "The property excels at physical atmosphere and morning rituals. The gap exists between the warmth of arrival and the flatness of departure - a 90-minute window that determines whether guests return."
        ),
        linkLabel: loc("Read the case report"),
        linkHref: "/report/maison-du-rivage",
      },
    ],
  })
  console.log("[seed] Created: Maison du Rivage Report Overview")

  // ── 4. Journal Teaser ─────────────────────────────────────────────────────
  await upsert({
    _id: "sharedSection.journalTeaser",
    _type: "sharedSection",
    internalName: "Homepage Journal Teaser",
    section: [
      {
        _key: "journalTeaser",
        _type: "section.journalTeaser",
        internalName: "Homepage Journal Teaser",
        label: loc("Observations from the field"),
        heading: loc("Observations on boutique hospitality."),
        articles: [
          {
            _key: "a1",
            title: loc("The Boutique Hotel Guest Has Changed. Most Properties Have Not."),
            excerpt: locText(
              "Where guests once evaluated properties primarily on design and amenities, they now weight something harder to photograph: coherence."
            ),
            category: loc("Boutique hotel trends", "Boutique hotel-tendenser"),
            slug: "boutique-hotel-guest-has-changed",
            readingTime: 6,
          },
          {
            _key: "a2",
            title: loc("The First Ten Minutes of a Hotel Stay Decide Everything That Follows"),
            excerpt: locText(
              "Guests form an emotional baseline during arrival that colours every subsequent experience."
            ),
            category: loc("Hospitality psychology", "Gasterfaringer"),
            slug: "first-ten-minutes-hotel-stay",
            readingTime: 5,
          },
          {
            _key: "a3",
            title: loc("The Qualities That Make Boutique Hotels Memorable Are the First to Go"),
            excerpt: locText(
              "The details that made a property distinctive are often the first casualties of operational pressure."
            ),
            category: loc("Guest experience design", "Gasteoplevelses-design"),
            slug: "qualities-boutique-hotels-memorable-first-to-go",
            readingTime: 7,
          },
        ],
        linkLabel: loc("Read the journal"),
        linkHref: "/journal",
      },
    ],
  })
  console.log("[seed] Created: Homepage Journal Teaser")

  // ── 5. Philosophy Method ──────────────────────────────────────────────────
  await upsert({
    _id: "sharedSection.philosophyMethod",
    _type: "sharedSection",
    internalName: "Philosophy Method",
    section: [
      {
        _key: "philosophyMethod",
        _type: "section.philosophyMethod",
        internalName: "Philosophy Method",
        label: loc("The framework"),
        heading: loc("Four lenses for one truth."),
        pillars: [
          {
            _key: "p1",
            number: "01",
            label: loc("Promise"),
            description: locText("What you communicate"),
          },
          {
            _key: "p2",
            number: "02",
            label: loc("Expectation"),
            description: locText("What guests assume"),
          },
          {
            _key: "p3",
            number: "03",
            label: loc("Experience"),
            description: locText("What actually happens"),
          },
          {
            _key: "p4",
            number: "04",
            label: loc("Memory"),
            description: locText("What guests carry away"),
          },
        ],
      },
    ],
  })
  console.log("[seed] Created: Philosophy Method")

  // ── 6. How We Work ────────────────────────────────────────────────────────
  await upsert({
    _id: "sharedSection.howWeWork",
    _type: "sharedSection",
    internalName: "How We Work",
    section: [
      {
        _key: "howWeWork",
        _type: "section.howWeWork",
        internalName: "How We Work",
        label: loc("Process"),
        heading: loc("How we work."),
        subheading: locText(
          "An undercover guest stay followed by structured evaluation and a private intelligence report."
        ),
        steps: [
          {
            _key: "s1",
            number: "01",
            title: loc("Anonymous Stay"),
            description: locText(
              "We book and stay as regular guests. No introduction, no advance notice. The property experiences us exactly as your guests do."
            ),
          },
          {
            _key: "s2",
            number: "02",
            title: loc("Structured Evaluation"),
            description: locText(
              "Every touchpoint is assessed against a fixed framework. Arrival, rooms, food and beverage, service consistency, departure."
            ),
          },
          {
            _key: "s3",
            number: "03",
            title: loc("Intelligence Report"),
            description: locText(
              "Findings are synthesised into a private report. The gap between your promise and your delivered experience, made precise."
            ),
          },
          {
            _key: "s4",
            number: "04",
            title: loc("Targeted Refinement"),
            description: locText(
              "Specific, actionable observations - not generic recommendations. You know exactly what to address and why it matters."
            ),
          },
        ],
      },
    ],
  })
  console.log("[seed] Created: How We Work")

  // ── 7. The Framework ─────────────────────────────────────────────────────
  await upsert({
    _id: "sharedSection.theFramework",
    _type: "sharedSection",
    internalName: "The Framework",
    section: [
      {
        _key: "theFramework",
        _type: "section.theFramework",
        internalName: "The Framework",
        label: loc("Methodology"),
        heading: loc("Four lenses for one truth."),
        subheading: locText(
          "Every audit passes through the same four-part framework. Nothing is assessed in isolation."
        ),
        lenses: [
          {
            _key: "l1",
            number: "01",
            label: loc("Promise"),
            description: locText(
              "The experience the hotel communicates - through photography, copy, brand voice, and positioning."
            ),
          },
          {
            _key: "l2",
            number: "02",
            label: loc("Expectation"),
            description: locText(
              "What a first-time guest reasonably infers before arrival, based on the available signals."
            ),
          },
          {
            _key: "l3",
            number: "03",
            label: loc("Experience"),
            description: locText(
              "What actually occurs during the stay - evaluated across every touchpoint from arrival to departure."
            ),
          },
          {
            _key: "l4",
            number: "04",
            label: loc("Memory"),
            description: locText(
              "What the guest retains after departure - the emotional residue that determines loyalty and word-of-mouth."
            ),
          },
        ],
      },
    ],
  })
  console.log("[seed] Created: The Framework")

  // ── 8. Pages ──────────────────────────────────────────────────────────────
  const pages = [
    { _id: "page.home", title: "Home", slug: "home" },
    { _id: "page.audit", title: "Audit", slug: "audit" },
    { _id: "page.report", title: "Report", slug: "report" },
    { _id: "page.philosophy", title: "Philosophy", slug: "philosophy" },
    { _id: "page.request", title: "Request an Audit", slug: "request" },
  ]

  for (const p of pages) {
    await client.createIfNotExists({
      _id: p._id,
      _type: "page",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      sections: [],
    })
    console.log(`[seed] Created (if not exists): Page - ${p.title}`)
  }

  console.log("\n[seed] Done. Visit /studio to see your content.")
  console.log("[seed] Pages are created empty - add sections in the studio.")
}

seed().catch((err) => {
  console.error("[seed] Error:", err)
  process.exit(1)
})
