import { TextBlock as TextBlockType } from "@/lib/journal/types"
import styles from "./TextBlock.module.css"

export function TextBlock({ block }: { block: TextBlockType }) {
  return (
    <div className={styles.wrapper}>
      {block.paragraphs.map((p, i) => (
        <p key={i} className={styles.paragraph}>{p}</p>
      ))}
    </div>
  )
}
