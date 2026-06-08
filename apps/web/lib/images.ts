export type SiteImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  use: "hero" | "section" | "detail" | "journal" | "report"
  format: "16:9" | "1:1" | "4:3"
  subject: string
}

const IMAGES: SiteImage[] = [
  {
    id: "facade-golden-hour",
    src: "/images/website/hero/facade-golden-hour--hero--16x9.png",
    alt: "Stone facade of a Mediterranean boutique hotel at golden hour",
    width: 1920,
    height: 1080,
    use: "hero",
    format: "16:9",
    subject: "hotel exterior, golden hour, stone facade",
  },
  {
    id: "breakfast-table",
    src: "/images/website/sections/breakfast-table--section--16x9.png",
    alt: "Morning light through arched window onto a breakfast table set with local produce",
    width: 1920,
    height: 1080,
    use: "section",
    format: "16:9",
    subject: "breakfast, morning light, arched window",
  },
  {
    id: "pool-afternoon",
    src: "/images/website/sections/pool-afternoon--section--16x9.jpg",
    alt: "Boutique hotel pool at late afternoon, stone surround, still water reflecting the sky",
    width: 1920,
    height: 1080,
    use: "section",
    format: "16:9",
    subject: "pool, afternoon light, stone surround, reflection",
  },
  {
    id: "brass-door-handle",
    src: "/images/website/details/brass-door-handle--detail--1x1.png",
    alt: "Aged brass door handle on a whitewashed wall",
    width: 1080,
    height: 1080,
    use: "detail",
    format: "1:1",
    subject: "brass door handle, whitewashed wall",
  },
  {
    id: "stone-corridor",
    src: "/images/website/details/stone-corridor--detail--1x1.png",
    alt: "Stone hotel corridor with a single stripe of afternoon light on the floor",
    width: 1080,
    height: 1080,
    use: "detail",
    format: "1:1",
    subject: "stone corridor, afternoon light",
  },
  {
    id: "linen-curtain",
    src: "/images/website/details/linen-curtain--detail--1x1.png",
    alt: "White linen curtain billowing through an open Mediterranean window",
    width: 1080,
    height: 1080,
    use: "detail",
    format: "1:1",
    subject: "linen curtain, Mediterranean window",
  },
  {
    id: "espresso-windowsill",
    src: "/images/website/details/espresso-windowsill--detail--1x1.png",
    alt: "Single espresso cup on a stone windowsill with a garden beyond",
    width: 1080,
    height: 1080,
    use: "detail",
    format: "1:1",
    subject: "espresso, stone windowsill, garden",
  },
  {
    id: "pool-afternoon-2",
    src: "/images/website/sections/pool-afternoon - section-2-16x9.png",
    alt: "Boutique hotel pool at late afternoon, second angle",
    width: 1920,
    height: 1080,
    use: "section",
    format: "16:9",
    subject: "pool, afternoon light, stone surround",
  },
  {
    id: "pool-afternoon-alt",
    src: "/images/website/sections/pool-afternoon - section - 16x9.jpeg",
    alt: "Boutique hotel pool at late afternoon, stone surround and still water",
    width: 1920,
    height: 1080,
    use: "section",
    format: "16:9",
    subject: "pool, afternoon, reflection",
  },
  {
    id: "welcome-note",
    src: "/images/website/sections/welcome-note.png",
    alt: "Handwritten welcome note beside regional amenities on a hotel room surface",
    width: 1080,
    height: 1080,
    use: "detail",
    format: "1:1",
    subject: "welcome note, arrival, amenities",
  },
  {
    id: "view-portrait",
    src: "/images/website/sections/view_1_1X2.png",
    alt: "View through a hotel window framing the landscape beyond",
    width: 1080,
    height: 2160,
    use: "section",
    format: "1:1",
    subject: "view, window, landscape",
  },
  {
    id: "breakfast-table-portrait",
    src: "/images/website/sections/breakfast-table - section - 1X2.png",
    alt: "Breakfast table set beside a window, morning light on local produce",
    width: 1080,
    height: 2160,
    use: "section",
    format: "1:1",
    subject: "breakfast, portrait, morning light",
  },
  {
    id: "bed-curtains",
    src: "/images/website/journal/Bed_curtains.png",
    alt: "Linen curtains beside a hotel bed, soft light, stillness",
    width: 1080,
    height: 1080,
    use: "journal",
    format: "1:1",
    subject: "linen, curtains, bed, identity",
  },
]

export function getImagesByUse(use: SiteImage["use"]): SiteImage[] {
  return IMAGES.filter((img) => img.use === use)
}

export function getImageById(id: string): SiteImage | undefined {
  return IMAGES.find((img) => img.id === id)
}
