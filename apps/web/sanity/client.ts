import { createClient } from "next-sanity"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tj5t0866",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "boutique-standard-data",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_DEV_TOKEN,
})
