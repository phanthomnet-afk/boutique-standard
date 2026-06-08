import type { Metadata } from "next";
import { getContent, getLang } from "@/lib/getContent";
import type { AuditPageContent } from "@/lib/content/types";
import { PageHero } from "@/components/shared/PageHero";
import { MethodologySection } from "@/components/audit/MethodologySection";
import { ProcessSection } from "@/components/audit/ProcessSection";
import { ScopeSection } from "@/components/audit/ScopeSection";
import { DeliverablesSection } from "@/components/audit/DeliverablesSection";
import { PricingSection } from "@/components/audit/PricingSection";
import { FaqSection } from "@/components/audit/FaqSection";
import { PageCta } from "@/components/shared/PageCta";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<AuditPageContent>("audit", lang);
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function AuditPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<AuditPageContent>("audit", lang);

  return (
    <>
      <PageHero content={content.hero} variant="image" />
      <MethodologySection content={content.methodology} />
      <ProcessSection content={content.process} />
      <ScopeSection content={content.scope} />
      <DeliverablesSection content={content.deliverables} />
      <PricingSection content={content.pricing} />
      <FaqSection content={content.faq} />
      <PageCta content={content.cta} />
    </>
  );
}
