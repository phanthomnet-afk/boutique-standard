import type { AuditPageContent } from "../types";

const content: AuditPageContent = {
  meta: {
    title: "The Audit - The Boutique Standard",
    description:
      "Undercover guest experience audits for boutique hotels. We evaluate the alignment between your promise and what your guests actually experience.",
  },
  hero: {
    eyebrow: "Guest Experience Intelligence",
    headline: "Every hotel promises a great stay.\nNot every hotel delivers one.",
    body: "The Boutique Standard audit reveals the precise distance between what your property communicates and what your guests actually experience.",
    ctaPrimary: { label: "Request an Audit", href: "/request" },
    ctaSecondary: { label: "View a Sample Report", href: "/report/maison-du-rivage" },
    imageAlt: "Hotel corridor, architectural detail, light across stone floor",
  },
  methodology: {
    label: "The Methodology",
    headline: "Four lenses. One framework.",
    body: [
      "We evaluate every property against its own declared promise - not against category norms or competitor benchmarks. The framework identifies the gaps between what a hotel communicates and what guests actually receive.",
      "The same four lenses apply to every audit. Together they produce a precise, honest picture of where a property delivers and where it falls short.",
    ],
    pillars: [
      {
        number: "01",
        label: "Promise",
        description:
          "What the hotel communicates across all touchpoints - website, photography, written descriptions, price point, and brand positioning.",
      },
      {
        number: "02",
        label: "Expectation",
        description:
          "What a first-time guest reasonably assumes based on the promise, the category, and the price they have paid.",
      },
      {
        number: "03",
        label: "Experience",
        description:
          "What actually happens during the stay - every touchpoint, every interaction, every moment of friction or delight.",
      },
      {
        number: "04",
        label: "Memory",
        description:
          "What the guest retains and tells others after departure. The lasting residue that drives reviews, recommendations, and return visits.",
      },
    ],
  },
  process: {
    label: "The Process",
    heading: "How an audit works",
    steps: [
      {
        number: "01",
        title: "Anonymous Stay",
        description:
          "We experience your property as a first-time guest would. No advance notice. No special treatment. No courtesy upgrades. Just the stay your guests actually receive.",
      },
      {
        number: "02",
        title: "Structured Evaluation",
        description:
          "Every touchpoint is documented and assessed against your own promise, your price category, and the expectations of your target guest profile.",
      },
      {
        number: "03",
        title: "Intelligence Report",
        description:
          "A luxury editorial report delivered as a private web experience and a high-resolution PDF. Designed to be read, understood, and acted on - not filed away.",
      },
      {
        number: "04",
        title: "Priority Refinement",
        description:
          "Prioritised opportunities ranked by guest impact. We do not provide implementation plans. You decide what to do with the intelligence.",
      },
    ],
  },
  scope: {
    label: "Scope Options",
    heading: "Choose your audit scope",
    body: "Every engagement is scoped individually. The options below are starting frameworks - final scope is agreed in the initial consultation.",
    options: [
      {
        title: "Full Stay Audit",
        description:
          "A comprehensive evaluation of the complete guest journey from first digital contact through post-stay communication. The most complete picture of your property.",
        includes: [
          "Two-night minimum stay",
          "All arrival and in-stay touchpoints",
          "Dining - minimum one dinner service",
          "Full room and facilities evaluation",
          "Service culture assessment throughout",
          "Post-stay communication analysis",
        ],
      },
      {
        title: "Focused Experience Audit",
        description:
          "A targeted evaluation of specific experience dimensions where you most need intelligence. One night, three to five defined touchpoints, with deep-dive narrative.",
        includes: [
          "One-night stay",
          "Three to five agreed touchpoints",
          "Deep-dive narrative for each focus area",
          "Comparative benchmarking within your category",
        ],
      },
      {
        title: "Multi-Touchpoint Audit",
        description:
          "An extended evaluation spanning multiple visits or experience dimensions over time. For properties where a single visit cannot capture the full picture.",
        includes: [
          "Two or more visits",
          "Pre-arrival journey mapping in depth",
          "Multiple dining occasions",
          "Seasonal comparison where relevant",
          "Full post-stay follow-through",
        ],
      },
    ],
  },
  deliverables: {
    label: "What You Receive",
    heading: "The deliverables",
    items: [
      {
        title: "Private Web Report",
        description:
          "A designed, navigable web document with a unique URL. Structured for screen reading with linked sections. Active for twelve months from delivery.",
      },
      {
        title: "PDF Export",
        description:
          "A high-resolution document formatted for archiving, printing, or selective sharing with your team. Yours permanently.",
      },
      {
        title: "Scored Journey Map",
        description:
          "Every major touchpoint scored against the Promise-Expectation-Experience-Memory framework. A precise visual account of where the experience holds and where it does not.",
      },
      {
        title: "Misalignment Index",
        description:
          "A precise identification of where your guest experience diverges from your communicated positioning. Ranked by significance, not by department.",
      },
      {
        title: "Opportunity Matrix",
        description:
          "Prioritised refinement opportunities ranked by potential guest impact. Not by operational ease or cost - by what matters most to the guest.",
      },
    ],
  },
  pricing: {
    label: "Investment",
    heading: "Pricing",
    body: "Audits start from 4,000 EUR. Final pricing depends on scope, property location, and the number of experience dimensions evaluated. The investment is structured in two stages: fifty percent on engagement confirmation - covering audit travel, accommodation, and initial evaluation - and fifty percent on delivery of the completed report.",
    note: "All audit travel and accommodation costs are included within the quoted fee. No hidden costs.",
  },
  faq: {
    heading: "Common questions",
    items: [
      {
        question: "What exactly do we receive?",
        answer:
          "You receive a private web report with a unique URL, a high-resolution PDF version, a scored journey map, a misalignment index, and an opportunity matrix. The web report is live for twelve months. The PDF is yours permanently.",
      },
      {
        question: "How long does the process take?",
        answer:
          "From engagement confirmation to report delivery is typically three to four weeks. This includes the stay itself, the structured evaluation period, and the editorial production of the report.",
      },
      {
        question: "Does anyone at the property know about the audit?",
        answer:
          "No. The stay is entirely anonymous. We book through standard channels, arrive as a regular guest, and depart without disclosure. Your team receives no indication that an evaluation is in progress.",
      },
      {
        question: "What happens after we receive the report?",
        answer:
          "That is entirely your decision. We provide the intelligence - what you do with it is yours. We do not offer implementation consulting, follow-up audits, or operational guidance beyond the report itself.",
      },
      {
        question: "Can we request specific focus areas?",
        answer:
          "Yes. Scope is agreed before the audit begins. If there are specific dimensions - arrival experience, dining, digital pre-arrival - that are most important to you, we structure the evaluation accordingly.",
      },
      {
        question: "How is the report delivered?",
        answer:
          "Via a private URL sent directly to the contact you designate. The web report is designed for screen reading with navigable sections. The PDF export is included for archiving or team distribution.",
      },
    ],
  },
  cta: {
    label: "Ready to Begin",
    heading: "Request your audit.",
    body: "Engagements are scoped individually. Begin with a brief enquiry - no commitment required.",
    buttonLabel: "Request an Audit",
    buttonHref: "/request",
  },
};

export default content;
