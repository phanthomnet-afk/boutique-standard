import { getAllArticles } from "./getAllArticles"
import { Article } from "./types"

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug)
}
