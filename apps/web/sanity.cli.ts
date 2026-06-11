import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
  api: {
    projectId: "tj5t0866",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "boutique-standard-data",
  },
  studioHost: "boutique-standard",
})
