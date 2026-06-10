// TODO (Phase 2): Add Google Maps prospecting search via DataForSEO SERP API.

export interface ReviewData {
  reviews: Array<{ text: string; rating: number; date?: string }>
  reviewCount: number
  averageRating: number | null
  raw: string
}

export async function getReviews(
  hotelName: string,
  location: string
): Promise<ReviewData> {
  const login = process.env.DATAFORSEO_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD

  if (!login || !password) {
    console.log("DataForSEO not configured - skipping reviews")
    return { reviews: [], reviewCount: 0, averageRating: null, raw: "" }
  }

  const credentials = Buffer.from(`${login}:${password}`).toString("base64")

  try {
    const taskRes = await fetch(
      "https://api.dataforseo.com/v3/business_data/google/reviews/task_post",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            keyword: `${hotelName} ${location}`,
            depth: 50,
            language_name: "English",
          },
        ]),
      }
    )

    const taskData = await taskRes.json()
    const taskId = taskData?.tasks?.[0]?.id

    if (!taskId) {
      return { reviews: [], reviewCount: 0, averageRating: null, raw: JSON.stringify(taskData) }
    }

    // Poll for results - up to 30 seconds
    for (let attempt = 0; attempt < 6; attempt++) {
      await new Promise((r) => setTimeout(r, 5000))

      const resultRes = await fetch(
        `https://api.dataforseo.com/v3/business_data/google/reviews/task_get/${taskId}`,
        {
          headers: { Authorization: `Basic ${credentials}` },
        }
      )

      const resultData = await resultRes.json()
      const items = resultData?.tasks?.[0]?.result?.[0]?.items

      if (items?.length) {
        const reviews = items
          .filter((item: any) => item.review_text)
          .map((item: any) => ({
            text: item.review_text,
            rating: item.rating?.value ?? 0,
            date: item.timestamp,
          }))

        const ratings = reviews.map((r: any) => r.rating).filter((r: number) => r > 0)
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
            : null

        return {
          reviews,
          reviewCount: reviews.length,
          averageRating,
          raw: JSON.stringify(resultData),
        }
      }
    }

    return { reviews: [], reviewCount: 0, averageRating: null, raw: "" }
  } catch (err) {
    console.error("DataForSEO error:", err)
    return { reviews: [], reviewCount: 0, averageRating: null, raw: "" }
  }
}
