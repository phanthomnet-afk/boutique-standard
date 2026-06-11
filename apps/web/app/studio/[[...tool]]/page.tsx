// The Sanity Studio is deployed separately to Sanity's CDN.
// Run: npx sanity deploy (from apps/web/) to publish it.
// It will be available at: https://[project-id].sanity.studio
//
// This redirect page helps editors find it while keeping
// the /studio path bookmarkable.
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (projectId) {
    redirect(`https://${projectId}.sanity.studio`)
  }
  redirect("https://www.sanity.io/manage")
}
