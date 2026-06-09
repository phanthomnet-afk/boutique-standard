import { existsSync } from "fs"
import { join } from "path"
import Image from "next/image"
import { ImageBlock as ImageBlockType } from "@/lib/journal/types"
import styles from "./ImageBlock.module.css"

const ASPECT_MAP: Record<string, string> = {
  "16:9": "56.25%",
  "4:3": "75%",
  "1:1": "100%",
}

export function ImageBlock({ block }: { block: ImageBlockType }) {
  const imagePath = join(process.cwd(), "public", block.src.replace(/^\//, ""))
  const imageExists = existsSync(imagePath)
  const paddingTop = ASPECT_MAP[block.aspectRatio] ?? "75%"

  return (
    <figure className={`${styles.figure} ${styles[block.width]}`}>
      <div className={styles.imageWrapper} style={{ paddingTop }}>
        {imageExists ? (
          <Image src={block.src} alt={block.alt} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className={styles.placeholder} data-image-slot={block.src} />
        )}
      </div>
      {block.caption && (
        <figcaption className={styles.caption}>{block.caption}</figcaption>
      )}
    </figure>
  )
}
