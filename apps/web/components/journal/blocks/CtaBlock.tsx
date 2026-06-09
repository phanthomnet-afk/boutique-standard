import Link from "next/link"
import { CtaBlock as CtaBlockType } from "@/lib/journal/types"
import styles from "./CtaBlock.module.css"

export function CtaBlock({ block }: { block: CtaBlockType }) {
  return (
    <aside className={styles.wrapper}>
      <p className={styles.label}>{block.label}</p>
      <p className={styles.text}>{block.text}</p>
      <Link href={block.buttonHref} className={styles.button}>
        {block.buttonLabel}
      </Link>
    </aside>
  )
}
