import { existsSync } from "fs"
import { join } from "path"
import Image from "next/image"
import Link from "next/link"
import { getAllArticles } from "@/lib/journal/getAllArticles"
import { CATEGORY_LABELS } from "@/lib/journal/types"
import styles from "./JournalStripSection.module.css"

export function JournalStripSection() {
  const articles = getAllArticles().slice(0, 3)

  return (
    <section className={styles.section} aria-labelledby="journal-heading">
      <div className={styles.inner}>

        <div className={styles.header}>
          <div>
            <p className={styles.label}>Journal</p>
            <h2 id="journal-heading" className={styles.heading}>
              Observations from the field
            </h2>
          </div>
          <Link href="/journal" className={styles.allLink}>
            All articles
          </Link>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => {
            const imagePath = join(
              process.cwd(),
              "public",
              article.heroImage.src.replace(/^\//, "")
            )
            const imageExists = existsSync(imagePath)
            return (
              <Link
                key={article.slug}
                href={`/journal/${article.category}/${article.slug}`}
                className={styles.article}
              >
                <div className={styles.articleImagePlaceholder} aria-hidden="true">
                  {imageExists ? (
                    <Image
                      src={article.heroImage.src}
                      alt={article.heroImage.alt}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className={styles.imageFallback}
                      data-image-slot={article.heroImage.src}
                    />
                  )}
                </div>
                <div className={styles.articleContent}>
                  <p className={styles.articleCategory}>
                    {CATEGORY_LABELS[article.category]}
                  </p>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                  <p className={styles.articleMeta}>{article.readingTime} min read</p>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
