import type { ReportPageContent } from "../types";

const content: ReportPageContent = {
  meta: {
    title: "The Intelligence Report - The Boutique Standard",
    description:
      "Not a summary. Not a scorecard. A luxury editorial document that reveals, with precision and care, exactly where a property delivers on its promise.",
  },
  hero: {
    eyebrow: "The Intelligence Report",
    headline: "The report is the product.",
    body: "Not a summary. Not a scorecard. A luxury editorial document that reveals, with precision and care, exactly where a property delivers on its promise and where it falls short.",
    ctaPrimary: { label: "View the Case Report", href: "/report/maison-du-rivage" },
    ctaSecondary: { label: "Request an Audit", href: "/request" },
    imageAlt: "Open report document, hotel table, morning light",
  },
  intro: {
    label: "About the Report",
    heading: "Designed to be read, not filed",
    body: [
      "Most audit reports are operational documents. Tables, checklists, scores. They exist to satisfy a process, not to communicate insight. The Boutique Standard report is different in both structure and intent.",
      "Every report is written as an editorial document - long-form analysis, structured narrative, precise observation. It is designed to be read from beginning to end, not skimmed for action items. The intelligence is in the detail.",
      "The report exists in two formats: a private web experience optimised for screen reading, and a high-resolution PDF. Both carry the same content. The web version is navigable and linked internally. The PDF is formatted for archiving and selective sharing with your team.",
    ],
  },
  sections: {
    label: "Inside the Report",
    heading: "What a report contains",
    items: [
      {
        number: "01",
        title: "Executive Snapshot",
        description:
          "A single-page summary: the composite alignment score, the three highest-impact misalignments, and the most significant refinement opportunity.",
      },
      {
        number: "02",
        title: "Property Profile",
        description:
          "An assessment of the hotel's positioning, communicated promise, and target guest profile - the baseline against which everything else is measured.",
      },
      {
        number: "03",
        title: "Promise Analysis",
        description:
          "A detailed evaluation of what the property communicates across all guest touchpoints: website, photography, descriptions, rates, and public materials.",
      },
      {
        number: "04",
        title: "Expectation Mapping",
        description:
          "Documentation of what a first-time guest would reasonably expect based on the promise, the category, and the price point - before they arrive.",
      },
      {
        number: "05",
        title: "Journey Stage Narratives",
        description:
          "Extended narrative reporting on each stage of the guest journey - arrival, room, dining, facilities, service, departure - with observations and precise analysis.",
      },
      {
        number: "06",
        title: "Experience Scoring",
        description:
          "A granular score breakdown by touchpoint, rated against the promise-expectation baseline. Not a generic rating against industry norms - a relative one against your own standard.",
      },
      {
        number: "07",
        title: "The Misalignment Report",
        description:
          "A precise identification of every significant gap between what was promised and what was delivered, ranked by guest impact rather than operational severity.",
      },
      {
        number: "08",
        title: "Memory Index",
        description:
          "An assessment of what a guest is likely to retain and communicate after departure - the strongest predictor of word-of-mouth, online reviews, and return visits.",
      },
      {
        number: "09",
        title: "Opportunity Matrix",
        description:
          "Prioritised refinement opportunities ranked by potential guest impact, not by operational ease or cost. What matters most to the guest, in order.",
      },
      {
        number: "10",
        title: "Service Culture Observation",
        description:
          "Detailed narrative on staff interactions, the consistency of service delivery, and the gap - if any - between the hotel's stated service philosophy and its actual practice.",
      },
      {
        number: "11",
        title: "Digital and Pre-Arrival Assessment",
        description:
          "Evaluation of the digital journey before the stay: website experience, booking process, confirmation communications, and pre-arrival touchpoints.",
      },
      {
        number: "12",
        title: "Post-Stay Communication",
        description:
          "Assessment of how the property handles communication in the days after departure and whether it reinforces or undermines the experience the guest had.",
      },
      {
        number: "13",
        title: "Editorial Conclusion",
        description:
          "A final, unscored reflection on the overall character of the property and whether it achieves what it set out to create for its guests.",
      },
    ],
  },
  caseStudy: {
    label: "Case Report",
    heading: "Maison du Rivage",
    body: "The first public case report from The Boutique Standard. A 28-room coastal property on the French Riviera, evaluated across fourteen experience dimensions over a two-night stay. Composite alignment score: 8.2. Primary finding: the property delivers exceptional atmosphere and room quality with identifiable friction at arrival and in pre-arrival communication.",
    linkLabel: "Read the case report",
  },
  cta: {
    label: "Ready",
    heading: "See what an audit produces for your property.",
    body: "Every engagement begins with a brief, no-commitment enquiry. We respond within two business days.",
    buttonLabel: "Request an Audit",
    buttonHref: "/request",
  },
};

export default content;
