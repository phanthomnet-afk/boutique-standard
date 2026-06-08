/**
 * THE BOUTIQUE STANDARD
 * Journal Schema — v1.0
 *
 * The journal is a separate world inside the website.
 * It shares the design DNA but has its own content structure,
 * navigation rhythm, and internal linking logic.
 *
 * Built for:
 * - SEO authority (topical clusters)
 * - GEO / AI Overview visibility (structured answer blocks)
 * - Editorial credibility (Kinfolk/Monocle feel, not blog)
 */

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export type JournalCategoryKey =
  | "guest-experience-design"
  | "boutique-hotel-trends"
  | "hospitality-psychology"
  | "service-culture"
  | "experience-frameworks"
  | "industry-benchmarks";

export type JournalCategory = {
  key: JournalCategoryKey;
  label: string;
  description: string;       // shown on category hub page
  seoDescription: string;    // for meta description
};

export const JOURNAL_CATEGORIES: JournalCategory[] = [
  {
    key: "guest-experience-design",
    label: "Guest Experience Design",
    description: "How hotels shape perception across the complete guest journey.",
    seoDescription: "Insights on how boutique hotels design and refine the full guest experience from booking to departure.",
  },
  {
    key: "boutique-hotel-trends",
    label: "Boutique Hotel Trends",
    description: "Emerging shifts in boutique hospitality positioning and guest expectations.",
    seoDescription: "Analysis of the latest trends shaping boutique hotel experiences and guest expectations globally.",
  },
  {
    key: "hospitality-psychology",
    label: "Hospitality Psychology",
    description: "Understanding what guests actually perceive, feel, and remember.",
    seoDescription: "How guest psychology shapes hotel perception, memory formation, and loyalty in boutique hospitality.",
  },
  {
    key: "service-culture",
    label: "Service Culture",
    description: "The human dimension of exceptional boutique hospitality.",
    seoDescription: "How boutique hotels build, protect, and sustain authentic service cultures that guests remember.",
  },
  {
    key: "experience-frameworks",
    label: "Experience Frameworks",
    description: "The models and methodologies behind guest experience intelligence.",
    seoDescription: "Proprietary frameworks for evaluating guest experience continuity, promise alignment, and memory formation.",
  },
  {
    key: "industry-benchmarks",
    label: "Industry Benchmarks",
    description: "How boutique properties compare across experience dimensions.",
    seoDescription: "Benchmarking data and insights on boutique hotel performance across guest experience dimensions.",
  },
];

// ─── CONTENT BLOCKS ───────────────────────────────────────────────────────────
// The journal uses a block system — each article is composed of typed blocks.
// This enables the "mini world" feel: each block renders differently,
// giving editorial pacing control without a full page-builder.

export type ArticleBlockType =
  | "answer"        // GEO-critical: direct answer block, top of article
  | "text"          // rich text / prose
  | "heading"       // H2 or H3 within article
  | "quote"         // pull quote — large serif, generous whitespace
  | "insight"       // boxed insight — becomes AI citation snippet
  | "definition"    // term + definition — entity training for GEO
  | "image"         // image with caption
  | "divider"       // visual section break
  | "cta";          // soft conversion block

export type AnswerBlock = {
  type: "answer";
  content: string;   // 100–150 words, factual, structured, non-marketing
};

export type TextBlock = {
  type: "text";
  content: string;   // markdown / rich text
};

export type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  text: string;
};

export type QuoteBlock = {
  type: "quote";
  text: string;
  attribution?: string;
};

export type InsightBlock = {
  type: "insight";
  text: string;      // boxed — becomes reusable AI citation snippet
};

export type DefinitionBlock = {
  type: "definition";
  term: string;
  definition: string;
};

export type ImageBlock = {
  type: "image";
  url?: string;
  alt: string;
  caption?: string;
  aspectRatio: "16:9" | "4:3" | "3:2" | "1:1";
  isFullWidth: boolean;
};

export type DividerBlock = {
  type: "divider";
};

export type CtaBlock = {
  type: "cta";
  text: string;
  buttonLabel: string;
  buttonHref: string;
};

export type ArticleBlock =
  | AnswerBlock
  | TextBlock
  | HeadingBlock
  | QuoteBlock
  | InsightBlock
  | DefinitionBlock
  | ImageBlock
  | DividerBlock
  | CtaBlock;

// ─── SEO ──────────────────────────────────────────────────────────────────────

export type ArticleSEO = {
  title: string;             // 50–60 chars
  description: string;       // 150–160 chars
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
};

// ─── ARTICLE ──────────────────────────────────────────────────────────────────

export type ArticleStatus = "draft" | "review" | "published";

export type Article = {
  id: string;
  slug: string;
  language: "en" | "da";
  status: ArticleStatus;

  title: string;
  excerpt: string;           // 2–3 sentences, shown in listings
  category: JournalCategoryKey;
  tags: string[];

  // GEO requirements
  answerBlock: string;       // direct answer, first 100–150 words
  keyTakeaways: string[];    // bullet list, shown near top

  // Content
  blocks: ArticleBlock[];

  // Internal linking (required: min 3 per article)
  relatedArticles: string[]; // slugs
  pillarPage?: string;       // slug of pillar page this supports

  // Meta
  readingTimeMinutes: number;
  publishedAt?: string;      // ISO date
  updatedAt?: string;        // ISO date

  seo: ArticleSEO;

  // Frequently Asked Questions — for schema markup + GEO
  faqs?: { question: string; answer: string }[];
};

// ─── PILLAR PAGE ──────────────────────────────────────────────────────────────
// Each category has one pillar page — the authoritative long-form piece
// that all supporting articles link back to.

export type PillarPage = {
  id: string;
  slug: string;
  category: JournalCategoryKey;
  title: string;
  blocks: ArticleBlock[];
  supportingArticles: string[]; // slugs of articles in this cluster
  seo: ArticleSEO;
};
