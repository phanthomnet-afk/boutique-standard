// TODO (Phase 3): Add retry logic for rate-limited responses.
// TODO (Phase 3): Cache results to avoid re-scraping within 30 days.

export interface StructuredHotelData {
  roomCount: number | null
  ownerName: string | null
  contactEmail: string | null
  contactPhone: string | null
  exactTaglines: string[]
  amenities: string[]
  priceRange: string | null
}

const EMPTY: StructuredHotelData = {
  roomCount: null,
  ownerName: null,
  contactEmail: null,
  contactPhone: null,
  exactTaglines: [],
  amenities: [],
  priceRange: null,
}

export async function extractStructuredData(website: string): Promise<StructuredHotelData> {
  const apiKey = process.env.SCRAPEGRAPH_API_KEY
  if (!apiKey) return EMPTY

  try {
    const res = await fetch("https://v2-api.scrapegraphai.com/api/smartscraper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "SGAI-APIKEY": apiKey,
      },
      body: JSON.stringify({
        website_url: website,
        user_prompt: `Extract from this boutique hotel website:
1. Number of rooms or suites (room_count as integer)
2. Owner name if mentioned (owner_name)
3. Contact email address (contact_email)
4. Contact phone number (contact_phone)
5. Exact taglines or slogans used (taglines array)
6. Main amenities listed (amenities array)
7. Price range or starting price if shown (price_range)
Return as JSON with these exact field names. If a field is not found, return null.`,
        output_schema: {
          type: "object",
          properties: {
            room_count: { type: "integer" },
            owner_name: { type: "string" },
            contact_email: { type: "string" },
            contact_phone: { type: "string" },
            taglines: { type: "array", items: { type: "string" } },
            amenities: { type: "array", items: { type: "string" } },
            price_range: { type: "string" },
          },
        },
      }),
    })

    if (!res.ok) return EMPTY

    const data = await res.json()
    const result = data?.result ?? data

    return {
      roomCount: typeof result.room_count === "number" ? result.room_count : null,
      ownerName: result.owner_name ?? null,
      contactEmail: result.contact_email ?? null,
      contactPhone: result.contact_phone ?? null,
      exactTaglines: Array.isArray(result.taglines) ? result.taglines : [],
      amenities: Array.isArray(result.amenities) ? result.amenities : [],
      priceRange: result.price_range ?? null,
    }
  } catch {
    return EMPTY
  }
}
