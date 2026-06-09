import { Article, CATEGORY_LABELS } from "./types"

export function generateJsonLd(article: Article): string {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo.description,
    datePublished: article.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "The Boutique Standard",
      url: "https://theboutiquestandard.com",
    },
    articleSection: CATEGORY_LABELS[article.category],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return JSON.stringify([articleSchema, faqSchema])
}
