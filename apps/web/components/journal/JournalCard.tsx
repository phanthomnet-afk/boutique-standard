import { existsSync } from "fs"
import { join } from "path"
import Link from "next/link"
import Image from "next/image"
import { Article, CATEGORY_LABELS } from "@/lib/journal/types"
import styles from "./JournalCard.module.css"

interface Props {
  article: Article
}

export function JournalCard({ article }: Props) {
  const imagePath = join(process.cwd(), "public", article.heroImage.src.replace(/^\//, ""))
  const imageExists = existsSync(imagePath)

  return (
    <Link href={`/journal/${article.category}/${article.slug}`} className={styles.card}>
      <div className={styles.image}>
        {imageExists ? (
          <Image
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.imagePlaceholder} data-image-slot={article.heroImage.src} />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{CATEGORY_LABELS[article.category]}</p>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.meta}>
          <span className={styles.readTime}>{article.readingTime} min read</span>
          <span className={styles.arrow} aria-hidden="true">&#8594;</span>
        </div>
      </div>
    </Link>
  )
}
