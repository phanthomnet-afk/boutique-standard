import { Article } from "@/lib/journal/types"
import { JournalCard } from "./JournalCard"
import styles from "./JournalGrid.module.css"

interface Props {
  articles: Article[]
}

export function JournalGrid({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No articles in this category yet.</p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {articles.map((article) => (
            <JournalCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
