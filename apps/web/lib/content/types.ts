export interface SectionHero {
  eyebrow: string
  headline: string
  subheadline?: string
  body?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  imageAlt: string
}

export interface SectionStatement {
  label: string
  headline: string
  body: string[]
}

export interface SectionProcess {
  label: string
  heading: string
  steps: Array<{ number: string; title: string; description: string }>
}

export interface SectionFaq {
  heading: string
  items: Array<{ question: string; answer: string }>
}

export interface SectionCta {
  label: string
  heading: string
  body: string
  buttonLabel: string
  buttonHref: string
  buttonSecondaryLabel?: string
  buttonSecondaryHref?: string
}

export interface SectionGrid<T> {
  label: string
  heading: string
  items: T[]
}

export interface SectionValueProps {
  label: string
  items: Array<{ number: string; statement: string; body: string }>
}

export interface SectionReviews {
  label: string
  items: Array<{ quote: string; attribution: string }>
}

export interface SectionEditorialBlock {
  heading: string
  paragraphs: string[]
  listPreamble?: string
  list: string[]
  closing?: string
}

export interface AuditPageContent {
  meta: { title: string; description: string }
  hero: SectionHero
  problem: SectionEditorialBlock
  whatWeDo: SectionEditorialBlock
  reportOutcome: {
    heading: string
    subheading: string
    versions: Array<{ title: string; pages: string; items: string[] }>
    note: string
  }
  process: SectionProcess
  trustSnippets: {
    heading: string
    items: string[]
  }
  pricing: {
    heading: string
    price: string
    description: string
    includes: string[]
    deliveryFormat: { heading: string; items: string[] }
    closingLine: string
  }
  cta: SectionCta
  faq: SectionFaq
}

export interface PhilosophyPageContent {
  meta: { title: string; description: string }
  hero: SectionHero
  perspective: {
    label: string
    headline: string
    body: string[]
    pullQuote: string
  }
  whatWeAreNot: {
    label: string
    heading: string
    notList: string[]
    isStatement: string
  }
  methodology: {
    label: string
    heading: string
    body: string
    pillars: Array<{ number: string; label: string; description: string }>
  }
  cta: SectionCta
}

export interface ReportPageContent {
  meta: { title: string; description: string }
  hero: SectionHero
  valueProps: SectionValueProps
  sections: {
    label: string
    heading: string
    body: string
    items: Array<{ number: string; title: string; description: string }>
  }
  format: {
    label: string
    heading: string
    points: string[]
  }
  caseStudy: {
    label: string
    heading: string
    location: string
    score: number
    scoreLabel: string
    body: string
    linkLabel: string
    linkHref: string
  }
  reviews: SectionReviews
  cta: SectionCta
  intro?: {
    label: string
    heading: string
    body: string[]
  }
}

export interface RequestPageContent {
  meta: { title: string; description: string }
  hero: SectionHero
  steps: Array<{
    number: string
    title: string
    description: string
  }>
  form: {
    steps: Array<{
      id: string
      heading: string
      fields: Array<{
        id: string
        label: string
        type: "text" | "email" | "url" | "select" | "textarea" | "checkbox-group"
        placeholder?: string
        required: boolean
        options?: string[]
      }>
    }>
    submitLabel: string
    submittingLabel: string
    successHeading: string
    successBody: string
  }
  pricing: {
    label: string
    body: string
  }
}
