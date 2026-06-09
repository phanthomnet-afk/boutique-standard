import { HeadingBlock as HeadingBlockType } from "@/lib/journal/types"
import styles from "./HeadingBlock.module.css"

export function HeadingBlock({ block }: { block: HeadingBlockType }) {
  if (block.level === 3) {
    return <h3 className={styles.h3}>{block.text}</h3>
  }
  return <h2 className={styles.h2}>{block.text}</h2>
}
