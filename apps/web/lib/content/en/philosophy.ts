import type { PhilosophyPageContent } from "../types";

const content: PhilosophyPageContent = {
  meta: {
    title: "Why We Exist - The Boutique Standard",
    description:
      "Most hospitality feedback arrives too late and measures the wrong thing. The Boutique Standard evaluates hotels against their own promise, not generic benchmarks.",
  },
  hero: {
    eyebrow: "Why We Exist",
    headline: "Honest evaluation\nis the beginning\nof refinement.",
    imageAlt: "Light through hotel window, architectural detail, quiet interior",
  },
  perspective: {
    label: "Our Perspective",
    headline: "Most hospitality feedback arrives too late, measured against the wrong standard.",
    body: [
      "Review platforms capture sentiment in the hours after checkout, when the emotional residue of the experience - positive or negative - has already shaped what the guest chooses to say. Survey tools reduce a complex sensory experience to a five-point scale. Mystery shopping agencies evaluate properties against generic hospitality criteria that may have nothing to do with what a given hotel is actually trying to create.",
      "The result is that most boutique hotels are evaluated against everything except what they actually promised. They receive feedback on how well they performed against a generic idea of hospitality - not against their own positioning, their own communicated character, their own target guest.",
      "The Boutique Standard exists to close that gap. We evaluate properties against their own promise. Not against the industry. Not against competitors. Against the specific experience they have committed to delivering.",
    ],
    pullQuote:
      "We do not measure hotels against a generic standard. We measure them against the standard they set for themselves.",
  },
  whatWeAreNot: {
    label: "Clearly Defined",
    heading: "What we are - and what we are not",
    notList: [
      "Not a mystery shopping agency - we are not checking boxes against generic hospitality criteria",
      "Not a consultancy - we do not tell you how to operate your hotel",
      "Not a magazine - we do not publish what we find",
      "Not a review platform - your report is private, for your eyes only",
      "Not a compliance auditor - we evaluate guest experience, not regulation",
    ],
    isStatement:
      "We are an independent guest experience intelligence practice. Our single deliverable is honesty: a clear, considered account of your guest experience measured against the promise your property has made to the world.",
  },
  methodology: {
    label: "The Framework",
    heading: "Four lenses for one truth",
    body: "Every audit passes through four analytical lenses. Together they reveal the full picture of how a property performs against its own standard - and where the distance between promise and delivery is most significant.",
    pillars: [
      {
        number: "01",
        label: "Promise",
        description:
          "The experience the hotel communicates across every channel - digital, visual, written, and implicit in the price. This is the contract the guest has signed before they arrive.",
      },
      {
        number: "02",
        label: "Expectation",
        description:
          "What a first-time guest reasonably infers from that promise. Not what the hotel intends - what the guest receives as signal. The two are often not the same.",
      },
      {
        number: "03",
        label: "Experience",
        description:
          "What actually occurs during the stay. Every touchpoint, interaction, and moment - the friction points, the strengths, the gaps between what was implied and what was delivered.",
      },
      {
        number: "04",
        label: "Memory",
        description:
          "What the guest retains after departure. The residue that shapes reviews, recommendations, and return decisions. Often different from what the hotel believes it has delivered.",
      },
    ],
  },
  cta: {
    label: "Next Step",
    heading: "Learn how the audit works.",
    body: "The framework above is only as useful as the report it produces. See what an audit looks like in practice.",
    buttonLabel: "Explore the Audit",
    buttonHref: "/audit",
  },
};

export default content;
