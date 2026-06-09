import { Article } from "@/lib/journal/types"
import { JournalHero } from "./JournalHero"
import { JournalCategoryStrip } from "./JournalCategoryStrip"
import { JournalFeatured } from "./JournalFeatured"
import { JournalGrid } from "./JournalGrid"
import { JournalCta } from "./JournalCta"
import styles from "./JournalHub.module.css"

interface Props {
  articles: Article[]
  selectedCategory?: string
}

export function JournalHub({ articles, selectedCategory }: Props) {
  const featured = articles[0]
  const gridArticles = articles.slice(1)

  return (
    <div className={styles.page}>
      <JournalHero />
      <JournalCategoryStrip selectedCategory={selectedCategory} />
      {articles.length === 0 ? (
        <div className={styles.empty}>
          <p>No articles in this category yet.</p>
        </div>
      ) : (
        <>
          {!selectedCategory && featured && (
            <JournalFeatured article={featured} />
          )}
          <JournalGrid articles={selectedCategory ? articles : gridArticles} />
        </>
      )}
      <JournalCta />
    </div>
  )
}
