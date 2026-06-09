export type JournalCategory =
  | "boutique-hotel-trends"
  | "hospitality-psychology"
  | "guest-experience-design"
  | "service-culture"
  | "experience-audits"
  | "industry-benchmarks"

export const CATEGORY_LABELS: Record<JournalCategory, string> = {
  "boutique-hotel-trends":     "Boutique Hotel Trends",
  "hospitality-psychology":    "Hospitality Psychology",
  "guest-experience-design":   "Guest Experience Design",
  "service-culture":           "Service Culture",
  "experience-audits":         "Experience Audits",
  "industry-benchmarks":       "Industry Benchmarks",
}

export const CATEGORY_DESCRIPTIONS: Record<JournalCategory, string> = {
  "boutique-hotel-trends":     "Emerging shifts in boutique hospitality positioning and guest expectations.",
  "hospitality-psychology":    "How guests perceive, feel, and remember their stays.",
  "guest-experience-design":   "How hotels shape perception across the complete guest journey.",
  "service-culture":           "The human dimension of memorable boutique hospitality.",
  "experience-audits":         "How independent evaluation reveals what internal review cannot.",
  "industry-benchmarks":       "How boutique properties compare across experience dimensions.",
}

export type AnswerBlock = {
  type: "answer"
  content: string
}

export type TextBlock = {
  type: "text"
  paragraphs: string[]
}

export type InsightBlock = {
  type: "insight"
  text: string
}

export type HeadingBlock = {
  type: "heading"
  level: 2 | 3
  text: string
}

export type ImageBlock = {
  type: "image"
  src: string
  alt: string
  caption?: string
  aspectRatio: "16:9" | "4:3" | "1:1"
  width: "full" | "half"
}

export type CtaBlock = {
  type: "cta"
  label: string
  text: string
  buttonLabel: string
  buttonHref: string
}

export type ArticleBlock =
  | AnswerBlock
  | TextBlock
  | InsightBlock
  | HeadingBlock
  | ImageBlock
  | CtaBlock

export type Article = {
  slug: string
  category: JournalCategory
  title: string
  excerpt: string
  readingTime: number
  publishedAt: string
  heroImage: {
    src: string
    alt: string
  }
  seo: {
    title: string
    description: string
  }
  keyTakeaways: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
  relatedSlugs: string[]
  blocks: ArticleBlock[]
}
