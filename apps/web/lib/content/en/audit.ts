import type { AuditPageContent } from "../types";

const content: AuditPageContent = {
  meta: {
    title: "Guest Experience Evaluation - The Boutique Standard",
    description:
      "A structured intelligence report that identifies the gap between your brand promise and how guests actually experience your hotel.",
  },

  hero: {
    eyebrow: "The Experience Gap Report",
    headline: "Identify the gap between your guest experience and your brand promise.",
    subheadline:
      "A structured intelligence report that shows how guests actually experience your hotel - compared to how you intend it to be experienced.",
    body: "Used by boutique hotels to improve guest consistency, return visits, and review perception.",
    ctaPrimary: { label: "Request a guest experience evaluation", href: "/request" },
    imageAlt: "Hotel facade at golden hour, warm light on stone and glass",
  },

  problem: {
    heading:
      "Most boutique hotels don't have a performance problem. They have a perception gap.",
    paragraphs: [
      "Your hotel may deliver excellent service, design, and hospitality.",
      "But guests don't experience your hotel through intention - they experience it through moments.",
      "Arrival. Check-in. Room entry. Breakfast. Departure.",
    ],
    listPreamble:
      "Small inconsistencies across these moments often determine:",
    list: [
      "whether guests return",
      "what they write in reviews",
      "how they describe your hotel to others",
    ],
    closing: "Most of these patterns are invisible internally.",
  },

  whatWeDo: {
    heading: "We make the guest experience measurable.",
    paragraphs: [
      "The Boutique Standard Experience Report evaluates your hotel across 13 dimensions of guest experience.",
    ],
    listPreamble: "We analyse:",
    list: [
      "how your brand is positioned",
      "how guests actually describe their stay",
      "where expectations and reality diverge",
      "which moments shape memory and return intent",
    ],
    closing: "Not as a consultancy. As structured guest experience intelligence.",
  },

  reportOutcome: {
    heading: "What you receive",
    subheading: "A complete guest experience intelligence report.",
    versions: [
      {
        title: "Executive Insight Version",
        pages: "10-20 pages",
        items: [
          "key misalignments",
          "summary of guest perception patterns",
          "high-impact opportunities",
        ],
      },
      {
        title: "Full Intelligence Report",
        pages: "30-40 page PDF",
        items: [
          "full 13-dimension analysis",
          "complete guest journey breakdown",
          "scoring by experience dimension",
          "structured opportunity matrix",
        ],
      },
    ],
    note: "Every report follows the same methodology, allowing consistent benchmarking across properties.",
  },

  process: {
    label: "How It Works",
    heading: "How it works",
    steps: [
      {
        number: "01",
        title: "Experience Mapping",
        description:
          "We evaluate your hotel's positioning and guest perception across digital and physical touchpoints.",
      },
      {
        number: "02",
        title: "Guest Journey Analysis",
        description:
          "We analyse the full guest experience from arrival to departure, identifying where expectations and reality diverge.",
      },
      {
        number: "03",
        title: "Intelligence Report",
        description:
          "You receive a structured report highlighting misalignments and high-impact improvement opportunities.",
      },
    ],
  },

  trustSnippets: {
    heading: "What hotels typically discover",
    items: [
      "We realised guests loved the rooms, but remembered the arrival experience more than anything else.",
      "Small inconsistencies in service timing were affecting our review patterns more than we expected.",
      "The experience we thought we were delivering was not the one guests were actually describing.",
      "Improving one part of the journey changed how guests talked about the entire stay.",
    ],
  },

  pricing: {
    heading: "Experience Report",
    price: "From €1,200",
    description:
      "A structured guest experience intelligence report identifying the gap between your brand promise and guest perception.",
    includes: [
      "13-dimension guest experience analysis",
      "brand promise evaluation",
      "guest perception mapping",
      "misalignment detection",
      "opportunity prioritisation",
    ],
    deliveryFormat: {
      heading: "Delivery format",
      items: [
        "Digital PDF report",
        "Executive Insight Version (10-20 pages)",
        "Full Intelligence Report (30-40 pages)",
      ],
    },
    closingLine:
      "Clear insight into how guests actually experience your hotel - and where small changes create disproportionate impact.",
  },

  cta: {
    label: "Begin",
    heading: "Understand your guest experience gap.",
    body: "Request a structured evaluation of your hotel experience.",
    buttonLabel: "Request a guest experience evaluation",
    buttonHref: "/request",
    buttonSecondaryLabel: "Discuss your hotel",
    buttonSecondaryHref: "/request",
  },

  faq: {
    heading: "Common questions",
    items: [
      {
        question: "Is this a consultancy service?",
        answer:
          "No. This is a structured guest experience intelligence report based on observed guest perception and journey mapping.",
      },
      {
        question: "Do you need access to our operations?",
        answer:
          "No. We evaluate guest experience through external and guest-facing touchpoints.",
      },
      {
        question: "How is the report used?",
        answer:
          "It helps identify gaps between intended brand experience and actual guest perception, informing improvements in guest satisfaction and return visits.",
      },
    ],
  },
};

export default content;
