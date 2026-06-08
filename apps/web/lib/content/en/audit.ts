import type { AuditPageContent } from "../types";

const content: AuditPageContent = {
  meta: {
    title: "The Audit - The Boutique Standard",
    description: "A guest experience intelligence audit for boutique hotels. One full report.",
  },
  hero: {
    eyebrow: "The Boutique Standard Audit",
    headline: "What your guests experience.",
    body: "A structured evaluation of the complete guest journey. Delivered as an editorial intelligence report.",
    ctaPrimary: { label: "Request an Audit", href: "/request" },
    imageAlt: "Stone hotel corridor with afternoon light",
  },
  valueProps: {
    label: "Why this audit",
    items: [
      {
        number: "01",
        statement: "You see your hotel every day. Your guests see it once.",
        body: "Distance reveals what familiarity conceals. A first-time guest notices what your team stopped seeing years ago.",
      },
      {
        number: "02",
        statement: "Intention and experience are rarely the same thing.",
        body: "The gap between what a property sets out to deliver and what a guest actually receives is where most opportunities live. It is also where most losses occur.",
      },
      {
        number: "03",
        statement: "What guests remember six months later shapes your bookings more than any review you read last week.",
        body: "Satisfaction fades. Memory stays. The report identifies which moments guests carry with them and which they quietly forget.",
      },
      {
        number: "04",
        statement: "Knowing what to protect is as valuable as knowing what to fix.",
        body: "Every property has qualities that define its character. The audit names them explicitly so they are not lost to growth, pressure, or well-intentioned change.",
      },
    ],
  },
  methodology: {
    label: "How We Evaluate",
    headline: "Against your promise. Not the industry.",
    body: [
      "We evaluate one thing: whether the experience your property delivers matches the experience it communicates.",
      "Not against a category average. Not against competitors. Against your own standard - your positioning, your photography, your price point, your words.",
    ],
    pillars: [
      {
        number: "01",
        label: "Promise",
        description: "What your property communicates to prospective guests.",
      },
      {
        number: "02",
        label: "Expectation",
        description: "What a guest reasonably assumes before they arrive.",
      },
      {
        number: "03",
        label: "Experience",
        description: "What actually happens across every touchpoint.",
      },
      {
        number: "04",
        label: "Memory",
        description: "What the guest carries with them after departure.",
      },
    ],
  },
  process: {
    label: "The Process",
    heading: "Simple. Rigorous. Repeatable.",
    steps: [
      {
        number: "01",
        title: "Scoping",
        description: "We agree the stay duration, dining occasions, and any specific focus areas before anything is confirmed.",
      },
      {
        number: "02",
        title: "The stay",
        description: "We experience your property as a standard first-time guest. Every touchpoint evaluated against the structured framework.",
      },
      {
        number: "03",
        title: "The report",
        description: "The full 13-section intelligence report delivered within 14 days. Written in narrative. Designed to be read.",
      },
      {
        number: "04",
        title: "Delivery",
        description: "A private web report with your unique URL. A downloadable PDF. A debrief conversation on request.",
      },
    ],
  },
  scope: {
    label: "Scope",
    heading: "Always the full report.",
    body: "Every engagement produces the same 13-section report. What varies is the scope of the stay - agreed before confirmation, not after.",
    options: [
      {
        title: "Single Stay",
        description: "The standard engagement. One stay, typically two nights. The complete guest journey.",
        includes: [
          "Two nights minimum",
          "Arrival through departure",
          "One breakfast, one dinner",
          "Full room and facilities",
          "Service culture throughout",
        ],
      },
      {
        title: "Focused Stay",
        description: "One night. Three to five agreed dimensions evaluated in depth.",
        includes: [
          "One night",
          "Three to five focus areas",
          "Deeper narrative per dimension",
          "Full 13-section report produced",
        ],
      },
      {
        title: "Extended Stay",
        description: "For properties where a single visit cannot capture the full picture.",
        includes: [
          "Two or more visits",
          "Multiple dining occasions",
          "Pre-arrival journey in depth",
          "Seasonal comparison where relevant",
        ],
      },
    ],
  },
  deliverables: {
    label: "What You Receive",
    heading: "One report. Delivered two ways.",
    items: [
      {
        title: "Private web report",
        description: "Password-protected. Your unique URL. Navigable by section. Shareable internally.",
      },
      {
        title: "PDF",
        description: "Print-ready. Formatted for owners, investors, and leadership teams.",
      },
      {
        title: "13 sections",
        description: "Executive snapshot through to editorial conclusion. Full narrative throughout.",
      },
      {
        title: "Debrief",
        description: "One conversation after delivery. Included on request.",
      },
    ],
  },
  pricing: {
    label: "Investment",
    heading: "One fee. Nothing hidden.",
    body: "The investment covers the full engagement: scoping, the stay, report production, and delivery.",
    priceDisplay: true,
    stages: [
      {
        label: "On confirmation",
        description: "Fifty percent confirms the engagement and covers dining during the stay.",
      },
      {
        label: "On delivery",
        description: "Fifty percent on delivery of the completed report. No report, no second payment.",
      },
    ],
    note: "Final investment is agreed before engagement based on property location and stay scope. Starts from the published rate.",
  },
  faq: {
    heading: "Common questions",
    items: [
      {
        question: "Will anyone at the property know?",
        answer: "No. We stay as a standard paying guest, booked through your normal channels. The integrity of the report depends on it.",
      },
      {
        question: "How long does the report take?",
        answer: "Delivered within 14 days of the stay. Exact timeline confirmed at engagement.",
      },
      {
        question: "Who receives the report?",
        answer: "One named contact - typically the owner or general manager. We do not publish, discuss, or reference any report without written permission.",
      },
      {
        question: "Can we specify focus areas?",
        answer: "Yes. Scoping is part of the engagement. Tell us where you have questions and we will make sure the audit addresses them.",
      },
      {
        question: "What happens after delivery?",
        answer: "One debrief conversation, included on request. We do not offer consulting or implementation support. We stay in touch.",
      },
      {
        question: "Where do you work?",
        answer: "Primarily Scandinavia, France, and the Mediterranean. Location affects the investment level.",
      },
    ],
  },
  reviews: {
    label: "From the field",
    items: [
      {
        quote: "The report showed us things we had stopped noticing. Not because they were hidden - because we had been too close to them for too long.",
        attribution: "Owner, 4-star boutique hotel, South of France",
      },
      {
        quote: "The departure section alone was worth the investment.",
        attribution: "General Manager, coastal retreat, Denmark",
      },
      {
        quote: "We used it in a board presentation three months later. The format makes the findings impossible to dismiss.",
        attribution: "Owner-operator, design hotel, Copenhagen",
      },
    ],
  },
  cta: {
    label: "Begin",
    heading: "See your property clearly.",
    body: "The request takes five minutes.",
    buttonLabel: "Request an Audit",
    buttonHref: "/request",
  },
};

export default content;
