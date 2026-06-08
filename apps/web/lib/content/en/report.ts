import type { ReportPageContent } from "../types";

const content: ReportPageContent = {
  meta: {
    title: "The Report - The Boutique Standard",
    description: "A 13-section guest experience intelligence report for boutique hotels.",
  },
  hero: {
    eyebrow: "The Report",
    headline: "What your guests actually experience.",
    body: "A 13-section intelligence report on the complete guest journey. Written in narrative. Designed to be presented.",
    ctaPrimary: { label: "Request an Audit", href: "/request" },
    ctaSecondary: { label: "View sample report", href: "/report/maison-du-rivage" },
    imageAlt: "Stone hotel corridor, afternoon light on the floor",
  },
  valueProps: {
    label: "The value",
    items: [
      {
        number: "01",
        statement: "You see your hotel every day. Your guests see it once.",
        body: "Distance reveals what familiarity conceals.",
      },
      {
        number: "02",
        statement: "Intention and experience are rarely the same thing.",
        body: "The gap between what a property sets out to deliver and what a guest receives is where most opportunities live.",
      },
      {
        number: "03",
        statement: "What guests remember shapes your bookings more than last week's reviews.",
        body: "The report identifies which moments guests carry with them and which they quietly forget.",
      },
      {
        number: "04",
        statement: "Knowing what to protect is as valuable as knowing what to fix.",
        body: "Every report names the qualities that define your property's character so they are not lost to growth or pressure.",
      },
    ],
  },
  sections: {
    label: "13 Sections",
    heading: "Always complete. Always the same report.",
    body: "The scope of the stay varies. The depth of the report does not.",
    items: [
      {
        number: "01",
        title: "Executive Snapshot",
        description: "The composite score, the three highest-impact misalignments, and the most significant opportunity. One page.",
      },
      {
        number: "02",
        title: "Property Profile",
        description: "Positioning, promise, and target guest profile. The baseline for everything that follows.",
      },
      {
        number: "03",
        title: "Promise Analysis",
        description: "What the property communicates across all pre-arrival touchpoints.",
      },
      {
        number: "04",
        title: "Expectation Mapping",
        description: "What a first-time guest reasonably assumes before arriving.",
      },
      {
        number: "05",
        title: "Journey Narratives",
        description: "Extended narrative on each stage: arrival, room, dining, facilities, service, departure.",
      },
      {
        number: "06",
        title: "Experience Scoring",
        description: "Scored against your own standard. Not a category average.",
      },
      {
        number: "07",
        title: "Misalignment Report",
        description: "Every gap between promise and delivery, ranked by guest impact.",
      },
      {
        number: "08",
        title: "Memory Index",
        description: "What the guest retains after departure.",
      },
      {
        number: "09",
        title: "Opportunity Matrix",
        description: "Refinement opportunities ranked by guest impact, not operational ease.",
      },
      {
        number: "10",
        title: "Service Culture",
        description: "Staff interactions, consistency of delivery, service philosophy versus practice.",
      },
      {
        number: "11",
        title: "Pre-Arrival Assessment",
        description: "Digital journey, booking process, confirmation communications.",
      },
      {
        number: "12",
        title: "Post-Stay",
        description: "Communication after departure and whether it reinforces the experience.",
      },
      {
        number: "13",
        title: "Editorial Conclusion",
        description: "A final reflection on the character of the property and whether it achieves what it set out to create.",
      },
    ],
  },
  format: {
    label: "The Format",
    heading: "Written like a publication. Delivered like a product.",
    points: [
      "Private URL, unique to your property",
      "Password-protected web report",
      "Downloadable PDF",
      "35 to 40 pages",
      "Full narrative throughout",
    ],
  },
  caseStudy: {
    label: "Case Report",
    heading: "Maison du Rivage",
    location: "Antibes, French Riviera",
    score: 8.2,
    scoreLabel: "Alignment score",
    body: "A 4-star coastal retreat. 28 rooms. A property that delivers what it promises in almost every dimension - and falls short in two moments that matter more than any other.",
    linkLabel: "Read the case report",
    linkHref: "/report/maison-du-rivage",
  },
  reviews: {
    label: "From the field",
    items: [
      {
        quote: "I have read many hotel reports. This is the first one I read twice.",
        attribution: "Owner, boutique hotel, Copenhagen",
      },
      {
        quote: "The misalignment section named three things we had discussed for years but never been able to act on.",
        attribution: "General Manager, Provence",
      },
    ],
  },
  cta: {
    label: "Begin",
    heading: "Commission your report.",
    body: "Audits start from €995. The request takes five minutes.",
    buttonLabel: "Request an Audit",
    buttonHref: "/request",
  },
};

export default content;
