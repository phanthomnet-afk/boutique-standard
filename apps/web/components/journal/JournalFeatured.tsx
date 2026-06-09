import { existsSync } from "fs"
import { join } from "path"
import Link from "next/link"
import Image from "next/image"
import { Article, CATEGORY_LABELS } from "@/lib/journal/types"
import styles from "./JournalFeatured.module.css"

interface Props {
  article: Article
}

export function JournalFeatured({ article }: Props) {
  const imagePath = join(process.cwd(), "public", article.heroImage.src.replace(/^\//, ""))
  const imageExists = existsSync(imagePath)

  const publishDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Link href={`/journal/${article.category}/${article.slug}`} className={styles.featured}>
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
            <p className={styles.label}>Latest</p>
            <p className={styles.category}>{CATEGORY_LABELS[article.category]}</p>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.excerpt}>{article.excerpt}</p>
            <div className={styles.meta}>
              <span className={styles.readTime}>{article.readingTime} min read</span>
              <span className={styles.date}>{publishDate}</span>
            </div>
            <span className={styles.readLink}>
              Read article <span className={styles.arrow} aria-hidden="true">&#8594;</span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
