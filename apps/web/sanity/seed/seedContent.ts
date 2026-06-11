/**
 * Seed script - creates and patches all page documents with full section lists.
 * Run: npm run sanity:seed (from project root)
 *
 * Requires SANITY_API_DEV_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID to be set.
 */

import { createClient } from "@sanity/client"
import { readFileSync } from "fs"
import { resolve } from "path"

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), "apps/web/.env.local")
    const envFile = readFileSync(envPath, "utf-8")
    for (const line of envFile.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const [key, ...valueParts] = trimmed.split("=")
      const value = valueParts.join("=").replace(/^["']|["']$/g, "")
      if (key && value && !process.env[key]) process.env[key] = value
    }
  } catch {
    // env vars may already be set in environment
  }
}

loadEnv()

const client = createClient({
  projectId: "tj5t0866",
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

function block(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
    markDefs: [],
  }
}

function ref(key: string, refId: string) {
  return {
    _type: "sharedSectionRef",
    _key: key,
    reference: { _type: "reference", _ref: refId },
  }
}

async function upsert(doc: any) {
  return client.createOrReplace(doc)
}

async function seed() {
  console.log("[seed] Starting Sanity content seed...")
  console.log("[seed] Project: tj5t0866")
  console.log("[seed] Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET || "boutique-standard-data")

  // ── Shared sections ───────────────────────────────────────────────────────

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
            quote: locText("The report showed us things we had stopped noticing. The gap between what we communicate and what we deliver was wider than we thought."),
            attribution: loc("Owner, 4-star boutique hotel, South of France"),
          },
          {
            _key: "r2",
            quote: locText("The departure section alone was worth the investment. We had never considered how that final hour shapes the entire memory of the stay."),
            attribution: loc("General Manager, coastal retreat, Denmark"),
          },
          {
            _key: "r3",
            quote: locText("We used it in a board presentation three months later. It gave us a language for conversations we had been avoiding."),
            attribution: loc("Owner-operator, design hotel, Copenhagen"),
          },
        ],
      },
    ],
  })
  console.log("[seed] Upserted: Global Reviews")

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
  console.log("[seed] Upserted: Global CTA")

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
          { _key: "p1", number: "01", label: loc("Promise"), description: locText("What you communicate") },
          { _key: "p2", number: "02", label: loc("Expectation"), description: locText("What guests assume") },
          { _key: "p3", number: "03", label: loc("Experience"), description: locText("What actually happens") },
          { _key: "p4", number: "04", label: loc("Memory"), description: locText("What guests carry away") },
        ],
      },
    ],
  })
  console.log("[seed] Upserted: Philosophy Method")

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
        subheading: locText("An undercover guest stay followed by structured evaluation and a private intelligence report."),
        steps: [
          {
            _key: "s1",
            number: "01",
            title: loc("Anonymous Stay"),
            description: locText("We book and stay as regular guests. No introduction, no advance notice. The property experiences us exactly as your guests do."),
          },
          {
            _key: "s2",
            number: "02",
            title: loc("Structured Evaluation"),
            description: locText("Every touchpoint is assessed against a fixed framework. Arrival, rooms, food and beverage, service consistency, departure."),
          },
          {
            _key: "s3",
            number: "03",
            title: loc("Intelligence Report"),
            description: locText("Findings are synthesised into a private report. The gap between your promise and your delivered experience, made precise."),
          },
          {
            _key: "s4",
            number: "04",
            title: loc("Targeted Refinement"),
            description: locText("Specific, actionable observations - not generic recommendations. You know exactly what to address and why it matters."),
          },
        ],
      },
    ],
  })
  console.log("[seed] Upserted: How We Work")

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
        subheading: locText("Every audit passes through the same four-part framework. Nothing is assessed in isolation."),
        lenses: [
          {
            _key: "l1",
            number: "01",
            label: loc("Promise"),
            description: locText("The experience the hotel communicates - through photography, copy, brand voice, and positioning."),
          },
          {
            _key: "l2",
            number: "02",
            label: loc("Expectation"),
            description: locText("What a first-time guest reasonably infers before arrival, based on the available signals."),
          },
          {
            _key: "l3",
            number: "03",
            label: loc("Experience"),
            description: locText("What actually occurs during the stay - evaluated across every touchpoint from arrival to departure."),
          },
          {
            _key: "l4",
            number: "04",
            label: loc("Memory"),
            description: locText("What the guest retains after departure - the emotional residue that determines loyalty and word-of-mouth."),
          },
        ],
      },
    ],
  })
  console.log("[seed] Upserted: The Framework")

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
            excerpt: locText("Where guests once evaluated properties primarily on design and amenities, they now weight something harder to photograph: coherence."),
            category: loc("Boutique hotel trends", "Boutique hotel-tendenser"),
            slug: "boutique-hotel-guest-has-changed",
            readingTime: 6,
          },
          {
            _key: "a2",
            title: loc("The First Ten Minutes of a Hotel Stay Decide Everything That Follows"),
            excerpt: locText("Guests form an emotional baseline during arrival that colours every subsequent experience."),
            category: loc("Hospitality psychology", "Gasterfaringer"),
            slug: "first-ten-minutes-hotel-stay",
            readingTime: 5,
          },
          {
            _key: "a3",
            title: loc("The Qualities That Make Boutique Hotels Memorable Are the First to Go"),
            excerpt: locText("The details that made a property distinctive are often the first casualties of operational pressure."),
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
  console.log("[seed] Upserted: Homepage Journal Teaser")

  // ── Pages with full section arrays ────────────────────────────────────────

  // HOME
  await upsert({
    _id: "page.home",
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    sections: [
      {
        _key: "homeHero",
        _type: "section.hero",
        internalName: "Home Hero",
        eyebrow: loc("Independent Guest Experience Intelligence"),
        headline: loc("Does your hotel deliver what it promises?"),
        ctaPrimary: { label: loc("Discover the Audit"), href: "/audit" },
        ctaSecondary: { label: loc("View a Sample Report"), href: "/report" },
      },
      ref("homePhilosophyMethod", "sharedSection.philosophyMethod"),
      ref("homeHowWeWork", "sharedSection.howWeWork"),
      {
        _key: "homeReportOverview",
        _type: "section.reportOverview",
        internalName: "Maison du Rivage Preview",
        label: loc("Sample Report"),
        heading: loc("This is what your guests experience when you are not looking."),
        propertyName: "Maison du Rivage",
        propertyLocation: "Antibes, French Riviera",
        overallScore: 8.2,
        excerpt: locText("Maison du Rivage delivers a guest experience that is largely coherent, emotionally warm, and authentically connected to its Riviera setting. The most significant opportunities lie in the refinement of transitional moments."),
        linkLabel: loc("View the case report"),
        linkHref: "/report/maison-du-rivage",
      },
      ref("homeJournalTeaser", "sharedSection.journalTeaser"),
      ref("homeGlobalCta", "sharedSection.globalCta"),
    ],
  })
  console.log("[seed] Upserted: Page - Home (6 sections)")

  // AUDIT
  await upsert({
    _id: "page.audit",
    _type: "page",
    title: "Audit",
    slug: { _type: "slug", current: "audit" },
    sections: [
      {
        _key: "auditHero",
        _type: "section.hero",
        internalName: "Audit Hero",
        eyebrow: loc("The Experience Gap Report"),
        headline: loc("Identify the gap between your guest experience and your brand promise."),
        ctaPrimary: { label: loc("Request a guest experience evaluation"), href: "/request" },
      },
      ref("auditFramework", "sharedSection.theFramework"),
      ref("auditHowWeWork", "sharedSection.howWeWork"),
      {
        _key: "auditPricing",
        _type: "section.pricing",
        internalName: "Audit Pricing",
        label: loc("Investment"),
        heading: loc("Experience Report"),
        body: locText("A structured guest experience intelligence report identifying the gap between your brand promise and guest perception."),
        priceEur: "From EUR 1,200",
        priceDkk: "Fra 7.450 kr.",
        stages: [
          {
            _key: "stage1",
            label: loc("On engagement"),
            description: locText("50% of the audit fee is due on agreement of scope."),
          },
          {
            _key: "stage2",
            label: loc("On delivery"),
            description: locText("50% is due when your report is delivered."),
          },
        ],
        note: locText("Every report follows the same methodology, allowing consistent benchmarking across properties."),
      },
      {
        _key: "auditReviews",
        _type: "section.reviews",
        internalName: "Audit Reviews",
        label: loc("From the field"),
        items: [
          {
            _key: "ar1",
            quote: locText("I have read many hotel reports. This is the first one I read twice."),
            attribution: loc("Owner, boutique hotel, Copenhagen"),
          },
          {
            _key: "ar2",
            quote: locText("The misalignment section named three things we had discussed for years but never been able to act on."),
            attribution: loc("General Manager, Provence"),
          },
          {
            _key: "ar3",
            quote: locText("We used it in a board presentation three months later. It gave us a language for conversations we had been avoiding."),
            attribution: loc("Owner-operator, design hotel, Copenhagen"),
          },
        ],
      },
      {
        _key: "auditFaq",
        _type: "section.faq",
        internalName: "Audit FAQ",
        heading: loc("Common questions"),
        items: [
          {
            _key: "faq1",
            question: loc("Is this a consultancy service?"),
            answer: locText("No. This is a structured guest experience intelligence report based on observed guest perception and journey mapping."),
          },
          {
            _key: "faq2",
            question: loc("Do you need access to our operations?"),
            answer: locText("No. We evaluate guest experience through external and guest-facing touchpoints."),
          },
          {
            _key: "faq3",
            question: loc("How is the report used?"),
            answer: locText("It helps identify gaps between intended brand experience and actual guest perception, informing improvements in guest satisfaction and return visits."),
          },
        ],
      },
      ref("auditGlobalCta", "sharedSection.globalCta"),
    ],
  })
  console.log("[seed] Upserted: Page - Audit (7 sections)")

  // PHILOSOPHY
  await upsert({
    _id: "page.philosophy",
    _type: "page",
    title: "Philosophy",
    slug: { _type: "slug", current: "philosophy" },
    sections: [
      {
        _key: "philosophyHero",
        _type: "section.hero",
        internalName: "Philosophy Hero",
        eyebrow: loc("Why We Exist"),
        headline: loc("Honest evaluation is the beginning of refinement."),
      },
      {
        _key: "philosophyPerspective",
        _type: "section.twoColumn",
        internalName: "Philosophy Perspective",
        label: loc("Our Perspective"),
        leftHeadline: loc("Most hospitality feedback arrives too late, measured against the wrong standard."),
        leftBody: locText("Review platforms capture sentiment in the hours after checkout, when the emotional residue of the experience has already shaped what the guest chooses to say. Survey tools reduce a complex sensory experience to a five-point scale. Mystery shopping agencies evaluate properties against generic hospitality criteria that may have nothing to do with what a given hotel is actually trying to create."),
        rightBody: locText("The Boutique Standard exists to close that gap. We evaluate properties against their own promise. Not against the industry. Not against competitors. Against the specific experience they have committed to delivering."),
      },
      ref("philosophyMethod", "sharedSection.philosophyMethod"),
      ref("philosophyFramework", "sharedSection.theFramework"),
      ref("philosophyGlobalCta", "sharedSection.globalCta"),
    ],
  })
  console.log("[seed] Upserted: Page - Philosophy (5 sections)")

  // REPORT
  await upsert({
    _id: "page.report",
    _type: "page",
    title: "Report",
    slug: { _type: "slug", current: "report" },
    sections: [
      {
        _key: "reportHero",
        _type: "section.hero",
        internalName: "Report Hero",
        eyebrow: loc("The Report"),
        headline: loc("What your guests actually experience."),
        body: locText("A 13-section intelligence report on the complete guest journey. Written in narrative. Designed to be presented."),
        ctaPrimary: { label: loc("Request an Audit"), href: "/request" },
        ctaSecondary: { label: loc("View sample report"), href: "/report/maison-du-rivage" },
      },
      {
        _key: "reportValueProps",
        _type: "section.richText",
        internalName: "Report Value Props",
        content: {
          en: [
            block("vp1", "01   You see your hotel every day. Your guests see it once."),
            block("vp2", "Distance reveals what familiarity conceals."),
            block("vp3", "02   Intention and experience are rarely the same thing."),
            block("vp4", "The gap between what a property sets out to deliver and what a guest receives is where most opportunities live."),
            block("vp5", "03   What guests remember shapes your bookings more than last week's reviews."),
            block("vp6", "The report identifies which moments guests carry with them and which they quietly forget."),
            block("vp7", "04   Knowing what to protect is as valuable as knowing what to fix."),
            block("vp8", "Every report names the qualities that define your property's character so they are not lost to growth or pressure."),
          ],
          da: [
            block("vp1da", "01   Du ser dit hotel hver dag. Dine gaester ser det en gang."),
            block("vp2da", "Afstand afslorer det, som fortrolighed skjuler."),
            block("vp3da", "02   Intention og oplevelse er sjaldent det samme."),
            block("vp4da", "Forskellen mellem det et hotel satser pa at levere og det gaesten modtager er, hvor de fleste muligheder befinder sig."),
            block("vp5da", "03   Det gaesterne husker, former dine reservationer mere end forrige uges anmeldelser."),
            block("vp6da", "Rapporten identificerer, hvilke ojeblikke gaesterne barer med sig, og hvilke de stille glemmer."),
            block("vp7da", "04   At vide, hvad man skal beskytte, er ligeså vaerdifuldt som at vide, hvad man skal fixe."),
            block("vp8da", "Hver rapport naevner de kvaliteter, der definerer din ejendoms karakter, sa de ikke fortabes under vaekst eller pres."),
          ],
        },
      },
      {
        _key: "reportMaisonOverview",
        _type: "section.reportOverview",
        internalName: "Maison du Rivage",
        label: loc("Case Report"),
        heading: loc("Maison du Rivage"),
        body: locText("A 4-star coastal retreat. 28 rooms. A property that delivers what it promises in almost every dimension - and falls short in two moments that matter more than any other."),
        propertyName: "Maison du Rivage",
        propertyLocation: "Antibes, French Riviera",
        overallScore: 8.2,
        excerpt: locText("A complete guest experience intelligence report for a 14-room property on the French Riviera."),
        linkLabel: loc("Read the case report"),
        linkHref: "/report/maison-du-rivage",
      },
      ref("reportGlobalReviews", "sharedSection.globalReviews"),
      ref("reportGlobalCta", "sharedSection.globalCta"),
    ],
  })
  console.log("[seed] Upserted: Page - Report (5 sections)")

  // REQUEST
  await upsert({
    _id: "page.request",
    _type: "page",
    title: "Request an Audit",
    slug: { _type: "slug", current: "request" },
    sections: [
      {
        _key: "requestHero",
        _type: "section.hero",
        internalName: "Request Hero",
        eyebrow: loc("Request an Audit"),
        headline: loc("Begin with a conversation."),
        body: locText("Complete this brief enquiry and we will respond within two business days with a scope proposal. No commitment is required at this stage."),
      },
      {
        _key: "requestIntro",
        _type: "section.richText",
        internalName: "Request Intro",
        content: {
          en: [
            block("ri1", "Audits from EUR 1,200. A detailed proposal is provided before any commitment is required."),
            block("ri2", "We respond within two business days with a scope proposal tailored to your property."),
          ],
          da: [
            block("ri1da", "Revisioner fra 7.450 kr. Et detaljeret forslag gives, inden nogen forpligtelse er krevet."),
            block("ri2da", "Vi svarer inden for to arbejdsdage med et omfangsforslag tilpasset din ejendom."),
          ],
        },
      },
      ref("requestGlobalCta", "sharedSection.globalCta"),
    ],
  })
  console.log("[seed] Upserted: Page - Request (3 sections)")

  console.log("\n[seed] Done. All pages seeded with full section lists.")
  console.log("[seed] Visit https://boutique-standard.sanity.studio to review.")
}

seed().catch((err) => {
  console.error("[seed] Error:", err)
  process.exit(1)
})
