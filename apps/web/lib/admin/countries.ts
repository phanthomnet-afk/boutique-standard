export const TARGET_COUNTRIES = [
  {
    code: "DK",
    name: "Denmark",
    currency: "DKK",
    priceDisplay: "7.450 kr.",
    regions: ["Copenhagen", "Bornholm", "Jutland coast"],
  },
  {
    code: "SE",
    name: "Sweden",
    currency: "EUR",
    priceDisplay: "EUR 1.200",
    regions: ["Stockholm", "Gothenburg", "Swedish west coast"],
  },
  {
    code: "NO",
    name: "Norway",
    currency: "EUR",
    priceDisplay: "EUR 1.200",
    regions: ["Oslo", "Bergen", "Norwegian fjords"],
  },
  {
    code: "FR",
    name: "France",
    currency: "EUR",
    priceDisplay: "EUR 1.200",
    regions: ["French Riviera", "Provence", "Brittany", "Paris"],
  },
  {
    code: "IT",
    name: "Italy",
    currency: "EUR",
    priceDisplay: "EUR 1.200",
    regions: ["Tuscany", "Amalfi Coast", "Sicily", "Puglia", "Lake Como"],
  },
  {
    code: "ES",
    name: "Spain",
    currency: "EUR",
    priceDisplay: "EUR 1.200",
    regions: ["Mallorca", "Costa Brava", "Andalusia", "Basque Country"],
  },
  {
    code: "PT",
    name: "Portugal",
    currency: "EUR",
    priceDisplay: "EUR 1.200",
    regions: ["Alentejo", "Algarve", "Lisbon surroundings"],
  },
  {
    code: "GR",
    name: "Greece",
    currency: "EUR",
    priceDisplay: "EUR 1.200",
    regions: ["Greek islands", "Athens surroundings"],
  },
]

export const ICP_SIGNALS = {
  roomCount: {
    min: 4,
    max: 50,
    note: "flexible - even 4 rooms if positioning is strong",
  },
  pricePoint: { minPerNight: 150 },
  positiveSignals: [
    "uses words like authentic, intimate, local, character, story",
    "strong photography of architectural details",
    "references to local producers, cuisine, or culture",
    "owner or family narrative on about page",
    "not a chain, not a franchise",
  ],
  negativeSignals: [
    "conference facilities as primary feature",
    "primarily corporate travel positioning",
    "generic luxury language with no local specificity",
    "chain hotel design language",
  ],
}
