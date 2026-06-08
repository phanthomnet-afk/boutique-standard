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
}

export interface SectionGrid<T> {
  label: string
  heading: string
  items: T[]
}

export interface AuditPageContent {
  meta: { title: string; description: string }
  hero: SectionHero
  methodology: SectionStatement & {
    pillars: Array<{ number: string; label: string; description: string }>
  }
  process: SectionProcess
  scope: {
    label: string
    heading: string
    body: string
    options: Array<{ title: string; description: string; includes: string[] }>
  }
  deliverables: {
    label: string
    heading: string
    items: Array<{ title: string; description: string }>
  }
  pricing: {
    label: string
    heading: string
    body: string
    note: string
  }
  faq: SectionFaq
  cta: SectionCta
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
  intro: {
    label: string
    heading: string
    body: string[]
  }
  sections: {
    label: string
    heading: string
    items: Array<{ number: string; title: string; description: string }>
  }
  caseStudy: {
    label: string
    heading: string
    body: string
    linkLabel: string
  }
  cta: SectionCta
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
