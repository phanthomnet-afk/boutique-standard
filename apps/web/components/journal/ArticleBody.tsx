import { Article, ArticleBlock } from "@/lib/journal/types"
import { RevealWrapper } from "@/components/ui/RevealWrapper"
import { AnswerBlock } from "./blocks/AnswerBlock"
import { TextBlock } from "./blocks/TextBlock"
import { InsightBlock } from "./blocks/InsightBlock"
import { HeadingBlock } from "./blocks/HeadingBlock"
import { ImageBlock } from "./blocks/ImageBlock"
import { CtaBlock } from "./blocks/CtaBlock"
import styles from "./ArticleBody.module.css"

function renderBlock(block: ArticleBlock) {
  switch (block.type) {
    case "answer":  return <AnswerBlock block={block} />
    case "text":    return <TextBlock block={block} />
    case "insight": return <InsightBlock block={block} />
    case "heading": return <HeadingBlock block={block} />
    case "image":   return <ImageBlock block={block} />
    case "cta":     return <CtaBlock block={block} />
  }
}

interface Props {
  blocks: Article["blocks"]
}

export function ArticleBody({ blocks }: Props) {
  return (
    <div className={styles.body}>
      <div className={styles.column}>
        {blocks.map((block, i) => (
          <RevealWrapper key={i}>
            {renderBlock(block)}
          </RevealWrapper>
        ))}
      </div>
    </div>
  )
}
