import { Article } from "@/lib/journal/types"
import { ArticleHeader } from "./ArticleHeader"
import { ArticleBody } from "./ArticleBody"
import styles from "./ArticlePage.module.css"

interface Props {
  article: Article
}

export function ArticlePage({ article }: Props) {
  return (
    <article className={styles.article}>
      <ArticleHeader article={article} />
      <ArticleBody blocks={article.blocks} />
    </article>
  )
}
