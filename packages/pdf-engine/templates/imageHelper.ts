import * as fs from "fs"
import * as path from "path"

const PUBLIC_DIR = path.join(process.cwd(), "../../apps/web/public")

export function findImage(basePath: string): string | null {
  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const withExt = basePath.endsWith(ext) ? basePath : `${basePath}${ext}`
    const abs = path.join(PUBLIC_DIR, withExt)
    if (fs.existsSync(abs)) return withExt
  }
  // Also check if basePath already has extension and exists
  const abs = path.join(PUBLIC_DIR, basePath)
  if (fs.existsSync(abs)) return basePath
  return null
}

export function imgOrPlaceholder(
  src: string | null,
  alt: string,
  style: string = "width:100%;height:200px;object-fit:cover;"
): string {
  if (src) {
    return `<img src="${src}" alt="${alt}" style="${style}" />`
  }
  return `<div class="img-placeholder" style="${style.replace("object-fit:cover;", "")}display:flex;align-items:center;justify-content:center;">
    <span class="img-placeholder-text">${alt}</span>
  </div>`
}
