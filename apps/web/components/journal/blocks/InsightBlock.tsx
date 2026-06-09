import { InsightBlock as InsightBlockType } from "@/lib/journal/types"
import styles from "./InsightBlock.module.css"

export function InsightBlock({ block }: { block: InsightBlockType }) {
  return (
    <blockquote className={styles.insight}>
      <p>{block.text}</p>
    </blockquote>
  )
}
