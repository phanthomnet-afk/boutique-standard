import Image from "next/image"
import styles from "./ImageBreak.module.css"

interface ImageBreakProps {
  src: string
  alt: string
  height?: number
}

export function ImageBreak({ src, alt, height = 520 }: ImageBreakProps) {
  return (
    <div
      className={`${styles.wrapper} reveal-on-scroll`}
      style={{ height: `${height}px` }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
    </div>
  )
}
