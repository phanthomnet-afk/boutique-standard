// TODO (Phase 2+): Add pagination support for larger member directories.
// TODO (Phase 3): Schedule weekly re-scrapes to catch new members.

export interface CollectiveSource {
  id: string
  name: string
  url: string
  region: string
  creditCost: number
  note?: string
}

export const COLLECTIVE_SOURCES: CollectiveSource[] = [
  {
    id: "design-hotels",
    name: "Design Hotels",
    url: "https://www.designhotels.com/hotels",
    region: "Europe",
    creditCost: 30,
  },
  {
    id: "mr-mrs-smith",
    name: "Mr & Mrs Smith",
    url: "https://www.mrandmrssmith.com/luxury-hotels/europe",
    region: "Europe",
    creditCost: 30,
  },
  {
    id: "i-escape",
    name: "i-escape",
    url: "https://www.i-escape.com/hotels/europe",
    region: "Europe",
    creditCost: 30,
  },
  {
    id: "tablet-hotels",
    name: "Tablet Hotels",
    url: "https://www.tablethotels.com",
    region: "Europe",
    creditCost: 30,
    note: "Requires region-specific search - results may be limited",
  },
]

export interface RawHotelListing {
  name: string
  location: string
  country: string
  website: string | null
  description: string | null
  sourceId: string
  sourceName: string
}

export async function scrapeCollective(
  sourceId: string,
  region?: string
): Promise<RawHotelListing[]> {
  const apiKey = process.env.SCRAPEGRAPH_API_KEY
  const source = COLLECTIVE_SOURCES.find((s) => s.id === sourceId)
  if (!apiKey || !source) return []

  const url = region
    ? `${source.url}${source.url.endsWith("/") ? "" : "/"}${region.toLowerCase().replace(/\s+/g, "-")}`
    : source.url

  try {
    const res = await fetch("https://v2-api.scrapegraphai.com/api/smartscraper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "SGAI-APIKEY": apiKey,
      },
      body: JSON.stringify({
        website_url: url,
        user_prompt: `Extract a list of boutique hotels from this page.
For each hotel return: name, location (city/region), country, website URL, description (1 sentence max).
Return as JSON array with fields: name, location, country, website, description.
Extract up to 30 hotels. Only include hotels, not other content.`,
        output_schema: {
          type: "object",
          properties: {
            hotels: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  location: { type: "string" },
                  country: { type: "string" },
                  website: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
      }),
    })

    if (!res.ok) return []

    const data = await res.json()
    const hotels: any[] = data?.result?.hotels ?? data?.hotels ?? []

    return hotels
      .filter((h) => h.name && h.location)
      .map((h) => ({
        name: h.name,
        location: h.location,
        country: h.country ?? "",
        website: h.website ?? null,
        description: h.description ?? null,
        sourceId: source.id,
        sourceName: source.name,
      }))
  } catch {
    return []
  }
}
