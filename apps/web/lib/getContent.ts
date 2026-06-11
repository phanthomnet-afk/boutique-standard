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

export async function getContent<T>(page: string, lang: Lang = "en"): Promise<T> {
  // Try Sanity first when project is configured
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      // Dynamic import so sanity client is never bundled when Sanity is not configured
      const { sanityClient } = await import("@/sanity/client")
      const data = await sanityClient.fetch(PAGE_QUERY, { slug: page })
      if (data) {
        return transformPageData(data, lang) as T
      }
    } catch (error) {
      console.warn("[getContent] Sanity fetch failed, falling back to local content:", error)
    }
  }

  // Fallback: local TypeScript content files (always present, zero breaking changes)
  const mod = await import(`./content/${lang}/${page}`)
  return mod.default as T
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
