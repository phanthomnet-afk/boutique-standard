import type { Metadata } from "next";
import { getContent, getLang } from "@/lib/getContent";
import type { RequestPageContent } from "@/lib/content/types";
import { PageHero } from "@/components/shared/PageHero";
import { RequestStepsSection } from "@/components/request/RequestStepsSection";
import { RequestFormSection } from "@/components/request/RequestFormSection";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<RequestPageContent>("request", lang);
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function RequestPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<RequestPageContent>("request", lang);

  return (
    <>
      <PageHero content={content.hero} variant="typographic" />
      <RequestStepsSection content={content.steps} />
      <RequestFormSection content={content.form} pricingContent={content.pricing} />
    </>
  );
}
