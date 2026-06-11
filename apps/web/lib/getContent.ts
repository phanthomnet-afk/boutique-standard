export type Lang = "en" | "da"

// GROQ query: fetch a page and resolve shared section references
const PAGE_QUERY = `
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    seo,
    "sections": sections[]{
      ...,
      _type == "sharedSectionRef" => {
        "shared": true,
        ...reference->{
          "section": section[0]
        }
      }
    }
  }
`

export async function getContent<T>(page: string, lang: Lang = "en"): Promise<T | null> {
  // Try Sanity first (only when project is configured)
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { sanityClient } = await import("@/sanity/client")
      const data = await sanityClient.fetch(PAGE_QUERY, { slug: page }, { next: { revalidate: 60 } })
      if (data?.sections?.length > 0) {
        const transformed = transformPageData(data, lang)
        // Only use Sanity data if it contains the full page shape (has hero).
        // transformPageData currently returns { meta, sections } only - fall
        // through to local TypeScript content until the transform is complete.
        if (transformed && 'hero' in (transformed as Record<string, unknown>)) {
          return transformed as T
        }
      }
    } catch {
      console.warn(`[getContent] Sanity unavailable for "${page}", using local content`)
    }
  }

  // Fallback: local TypeScript content files
  try {
    const mod = await import(`./content/${lang}/${page}`)
    return mod.default as T
  } catch {
    // Try English fallback if localised import fails
    if (lang !== "en") {
      try {
        const mod = await import(`./content/en/${page}`)
        return mod.default as T
      } catch {
        // fall through
      }
    }
    console.warn(`[getContent] No content found for "${page}" (${lang})`)
    return null
  }
}

// Transform Sanity page document to the shape components expect
function transformPageData(data: any, lang: Lang): any {
  if (!data?.sections) return null
  return {
    meta: {
      title: data.seo?.title || data.title || "",
      description: data.seo?.description || "",
    },
    sections: data.sections.map((section: any) => {
      const s = section.shared ? section.section : section
      return resolveLocalized(s, lang)
    }),
  }
}

// Recursively resolve localizedString / localizedText objects to the active language
function resolveLocalized(obj: any, lang: Lang): any {
  if (!obj || typeof obj !== "object") return obj
  if (Array.isArray(obj)) return obj.map((item) => resolveLocalized(item, lang))

  // Localized object: has "en" and/or "da" keys
  if ("en" in obj || "da" in obj) {
    return obj[lang] ?? obj.en ?? ""
  }

  const resolved: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    resolved[key] = resolveLocalized(obj[key], lang)
  }
  return resolved
}

export function getLang(
  searchParams: Record<string, string | string[] | undefined>
): Lang {
  const raw = searchParams["lang"]
  const value = Array.isArray(raw) ? raw[0] : raw
  return value === "da" ? "da" : "en"
}
