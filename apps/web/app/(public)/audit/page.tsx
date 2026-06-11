import type { Metadata } from "next";
import { getContent, getLang } from "@/lib/getContent";
import type { AuditPageContent } from "@/lib/content/types";
import { PageHero } from "@/components/shared/PageHero";
import { ProblemSection } from "@/components/audit/ProblemSection";
import { WhatWeDoSection } from "@/components/audit/WhatWeDoSection";
import { ReportOutcomeSection } from "@/components/audit/ReportOutcomeSection";
import { ProcessSection } from "@/components/audit/ProcessSection";
import { TrustSnippetsSection } from "@/components/audit/TrustSnippetsSection";
import { PricingSection } from "@/components/audit/PricingSection";
import { PageCta } from "@/components/shared/PageCta";
import { FaqSection } from "@/components/audit/FaqSection";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<AuditPageContent>("audit", lang);
  if (!content) {
    return {
      title: "The Audit - The Boutique Standard",
      description: "",
    };
  }
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function AuditPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<AuditPageContent>("audit", lang);

  if (!content) {
    return (
      <div style={{ padding: "4rem 2rem", fontFamily: "sans-serif" }}>
        <p>Content temporarily unavailable.</p>
        <p>Please try again in a moment.</p>
      </div>
    );
  }

  return (
    <>
      <PageHero
        content={content.hero}
        variant="image"
        imageSrc="/images/website/hero/pool-afternoon - section - 16x9.jpeg"
        imageAlt="Hotel pool in afternoon light"
      />
      <ProblemSection content={content.problem} />
      <WhatWeDoSection content={content.whatWeDo} />
      <ReportOutcomeSection content={content.reportOutcome} />
      <ProcessSection content={content.process} />
      <TrustSnippetsSection content={content.trustSnippets} />
      <PricingSection content={content.pricing} />
      <PageCta content={content.cta} />
      <FaqSection content={content.faq} />
    </>
  );
}
