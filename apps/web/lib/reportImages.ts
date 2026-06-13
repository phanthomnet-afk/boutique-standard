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
    src: "/images/reports/maison-du-rivage/cover-exterior--cover--16x9.jpg",
    alt: "Full-bleed exterior of boutique Mediterranean hotel at golden hour, warm light on stone facade",
    section: "cover",
  },
  {
    assetId: "asset-cover-2",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/cover-courtyard--cover--16x9.png",
    alt: "Courtyard view, afternoon light, Mediterranean garden",
    section: "cover",
  },
  {
    assetId: "asset-arrival-1",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/arrival-approach--arrival--16x9.png",
    alt: "Parking entrance approach from street, minimal signage visible, walking path unclear",
    section: "arrival",
  },
  {
    assetId: "asset-arrival-2",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/reception-desk--arrival--4x3.jpg",
    alt: "Reception desk - intimate, well-lit, materials consistent with property identity",
    section: "arrival",
  },
  {
    assetId: "asset-room-1",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/guest-room--room--16x9.jpg",
    alt: "Room wide shot - natural light from Mediterranean windows, quality linen, considered furniture",
    section: "room",
  },
  {
    assetId: "asset-room-2",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/welcome-amenities--room--4x3.jpg",
    alt: "Welcome amenities - regional products, handwritten note, natural presentation",
    section: "room",
  },
  {
    assetId: "asset-room-3",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/bathroom-detail--room--4x3.jpg",
    alt: "Bathroom - quality materials, product selection, lighting detail",
    section: "room",
  },
  {
    assetId: "asset-dining-1",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/breakfast-dining-room--dining--16x9.jpg",
    alt: "Breakfast dining room - morning light, tables elegantly set, courtyard garden visible",
    section: "dining",
  },
  {
    assetId: "asset-dining-2",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/breakfast-food-detail--dining--4x3.png",
    alt: "Signature local breakfast items - regional produce, seasonal selection",
    section: "dining",
  },
  {
    assetId: "asset-pool-1",
    reportSlug: "maison-du-rivage",
    src: "/images/reports/maison-du-rivage/pool-area--facilities--16x9.jpg",
    alt: "Pool area - elegant design, consistent with brand identity, natural stone surround",
    section: "facilities",
  },
  {
    assetId: "asset-service-1",
    reportSlug: "maison-du-rivage",
    alt: "Reception interaction - staff engaged, natural body language, authentic connection",
    section: "serviceCulture",
  },

  // Hotel Lumiere
  {
    assetId: "asset-cover",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-exterior--cover--16x9.png",
    alt: "Hotel Lumiere, Mallorca",
    section: "cover",
  },
  {
    assetId: "asset-cover-2",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-courtyard--cover--16x9.png",
    alt: "Hotel Lumiere courtyard",
    section: "cover",
  },
  {
    assetId: "asset-arrival-1",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-arrival--arrival--16x9.png",
    alt: "Arrival, Hotel Lumiere",
    section: "arrival",
  },
  {
    assetId: "asset-arrival-2",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-reception--arrival--4x3.png",
    alt: "Reception, Hotel Lumiere",
    section: "arrival",
  },
  {
    assetId: "asset-room-1",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-room--room--16x9.png",
    alt: "Garden suite, Hotel Lumiere",
    section: "room",
  },
  {
    assetId: "asset-room-2",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-terrace-detail--room--4x3.png",
    alt: "Room terrace, Hotel Lumiere",
    section: "room",
  },
  {
    assetId: "asset-room-3",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-corridor--departure--4x3.png",
    alt: "Hotel Lumiere",
    section: "room",
  },
  {
    assetId: "asset-dining-1",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-breakfast-terrace--dining--16x9.png",
    alt: "Breakfast terrace, Hotel Lumiere",
    section: "dining",
  },
  {
    assetId: "asset-dining-2",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-breakfast-detail--dining--4x3.png",
    alt: "Breakfast, Hotel Lumiere",
    section: "dining",
  },
  {
    assetId: "asset-pool-1",
    reportSlug: "hotel-lumiere",
    src: "/images/reports/hotel-lumiere/lumiere-pool--facilities--16x9.png",
    alt: "Pool at golden hour, Hotel Lumiere",
    section: "facilities",
  },
  {
    assetId: "asset-service-1",
    reportSlug: "hotel-lumiere",
    alt: "Hotel Lumiere",
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
