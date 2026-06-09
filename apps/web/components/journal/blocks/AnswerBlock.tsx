import { AnswerBlock as AnswerBlockType } from "@/lib/journal/types"
import styles from "./AnswerBlock.module.css"

export function AnswerBlock({ block }: { block: AnswerBlockType }) {
  return <p className={styles.answer}>{block.content}</p>
}
