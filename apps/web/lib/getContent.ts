export type Lang = "en" | "da";

export async function getContent<T>(page: string, lang: Lang = "en"): Promise<T> {
  const mod = await import(`./content/${lang}/${page}`);
  return mod.default as T;
}

export function getLang(
  searchParams: Record<string, string | string[] | undefined>
): Lang {
  const raw = searchParams["lang"];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === "da" ? "da" : "en";
}
