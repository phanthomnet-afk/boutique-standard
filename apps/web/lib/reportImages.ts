export type ReportImageSlot = {
  assetId: string
  reportSlug: string
  src?: string
  alt: string
  section: string
}

const REPORT_IMAGES: ReportImageSlot[] = [
  {
    assetId: "asset-cover",
    reportSlug: "maison-du-rivage",
    alt: "Full-bleed exterior of boutique Mediterranean hotel at golden hour, warm light on stone facade",
    section: "cover",
  },
  {
    assetId: "asset-arrival-1",
    reportSlug: "maison-du-rivage",
    alt: "Parking entrance approach from street, minimal signage visible, walking path unclear",
    section: "arrival",
  },
  {
    assetId: "asset-arrival-2",
    reportSlug: "maison-du-rivage",
    alt: "Reception desk - intimate, well-lit, materials consistent with property identity",
    section: "arrival",
  },
  {
    assetId: "asset-room-1",
    reportSlug: "maison-du-rivage",
    alt: "Room wide shot - natural light from Mediterranean windows, quality linen, considered furniture",
    section: "room",
  },
  {
    assetId: "asset-room-2",
    reportSlug: "maison-du-rivage",
    alt: "Welcome amenities - regional products, handwritten note, natural presentation",
    section: "room",
  },
  {
    assetId: "asset-room-3",
    reportSlug: "maison-du-rivage",
    alt: "Bathroom - quality materials, product selection, lighting detail",
    section: "room",
  },
  {
    assetId: "asset-dining-1",
    reportSlug: "maison-du-rivage",
    alt: "Breakfast dining room - morning light, tables elegantly set, courtyard garden visible",
    section: "dining",
  },
  {
    assetId: "asset-dining-2",
    reportSlug: "maison-du-rivage",
    alt: "Signature local breakfast items - regional produce, seasonal selection",
    section: "dining",
  },
  {
    assetId: "asset-pool-1",
    reportSlug: "maison-du-rivage",
    alt: "Pool area - elegant design, consistent with brand identity, natural stone surround",
    section: "facilities",
  },
  {
    assetId: "asset-service-1",
    reportSlug: "maison-du-rivage",
    alt: "Reception interaction - staff engaged, natural body language, authentic connection",
    section: "serviceCulture",
  },
]

export function getReportImage(
  reportSlug: string,
  assetId: string
): ReportImageSlot | undefined {
  return REPORT_IMAGES.find(
    (slot) => slot.reportSlug === reportSlug && slot.assetId === assetId
  )
}

export function isImageReady(
  slot: ReportImageSlot
): slot is ReportImageSlot & { src: string } {
  return typeof slot.src === "string"
}
