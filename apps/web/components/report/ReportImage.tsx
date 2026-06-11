import Image from "next/image"
import { getReportImage, isImageReady } from "@/lib/reportImages"

interface ReportImageProps {
  assetId: string
  aspectRatio?: "16:9" | "4:3" | "3:4" | "1:1"
  className?: string
  priority?: boolean
  style?: React.CSSProperties
}

const DIMENSIONS: Record<string, [number, number]> = {
  "16:9": [1600, 900],
  "4:3":  [800,  600],
  "3:4":  [600,  800],
  "1:1":  [800,  800],
}

export function ReportImage({
  assetId,
  aspectRatio = "16:9",
  className,
  priority = false,
  style,
}: ReportImageProps) {
  const slot = getReportImage("maison-du-rivage", assetId)

  if (!slot || !isImageReady(slot)) {
    return (
      <div
        className={className}
        data-image-slot={assetId}
        style={{
          background: "var(--color-bg-secondary, #F2EDE6)",
          border: "0.5px solid var(--color-border, #DDD8D0)",
          aspectRatio: aspectRatio.replace(":", " / "),
          width: "100%",
          ...style,
        }}
      />
    )
  }

  const [w, h] = DIMENSIONS[aspectRatio] ?? DIMENSIONS["16:9"]

  return (
    <Image
      src={slot.src}
      alt={slot.alt}
      width={w}
      height={h}
      priority={priority}
      className={className}
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
        display: "block",
        ...style,
      }}
    />
  )
}
