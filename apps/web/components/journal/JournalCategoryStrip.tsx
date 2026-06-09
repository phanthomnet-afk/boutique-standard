import Link from "next/link"
import { CATEGORY_LABELS, JournalCategory } from "@/lib/journal/types"
import styles from "./JournalCategoryStrip.module.css"

const CATEGORIES = Object.keys(CATEGORY_LABELS) as JournalCategory[]

interface Props {
  selectedCategory?: string
}

export function JournalCategoryStrip({ selectedCategory }: Props) {
  return (
    <div className={styles.strip}>
      <div className={styles.inner}>
        <Link
          href="/journal"
          className={`${styles.pill} ${!selectedCategory ? styles.active : ""}`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/journal?category=${cat}`}
            className={`${styles.pill} ${selectedCategory === cat ? styles.active : ""}`}
          >
            {CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </div>
    </div>
  )
}
