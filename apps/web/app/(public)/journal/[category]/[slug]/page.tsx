import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllArticles } from "@/lib/journal/getAllArticles"
import { getArticleBySlug } from "@/lib/journal/getArticleBySlug"
import { generateJsonLd } from "@/lib/journal/generateJsonLd"
import { ArticlePage } from "@/components/journal/ArticlePage"

interface Props {
  params: { category: string; slug: string }
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.seo.title,
    description: article.seo.description,
  }
}

export default function ArticleRoute({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const jsonLd = generateJsonLd(article)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ArticlePage article={article} />
    </>
  )
}
