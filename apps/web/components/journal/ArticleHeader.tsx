import { existsSync } from "fs"
import { join } from "path"
import Image from "next/image"
import { Article, CATEGORY_LABELS } from "@/lib/journal/types"
import styles from "./ArticleHeader.module.css"

interface Props {
  article: Article
}

export function ArticleHeader({ article }: Props) {
  const imagePath = join(process.cwd(), "public", article.heroImage.src.replace(/^\//, ""))
  const imageExists = existsSync(imagePath)

  const publishDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <header className={styles.header}>
      <div className={styles.heroImage}>
        {imageExists ? (
          <Image
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.heroPlaceholder} data-image-slot={article.heroImage.src} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{CATEGORY_LABELS[article.category]}</span>
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.date}>{publishDate}</span>
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.readTime}>{article.readingTime} min read</span>
        </div>

        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.excerpt}>{article.excerpt}</p>

        {article.keyTakeaways.length > 0 && (
          <div className={styles.takeaways}>
            <p className={styles.takeawaysLabel}>Key takeaways</p>
            <ul className={styles.takeawaysList}>
              {article.keyTakeaways.map((item, i) => (
                <li key={i} className={styles.takeawayItem}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
