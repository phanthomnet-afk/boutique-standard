import article1 from "./articles/boutique-hotel-guest-has-changed"
import article2 from "./articles/first-ten-minutes-hotel-stay"
import article3 from "./articles/qualities-boutique-hotels-memorable-first-to-go"
import { Article } from "./types"

const articles: Article[] = [article1, article2, article3]

export function getAllArticles(): Article[] {
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category)
}
