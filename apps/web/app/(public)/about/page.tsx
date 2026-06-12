import type { Metadata } from "next";
import { getContent, getLang } from "@/lib/getContent";
import type { PhilosophyPageContent } from "@/lib/content/types";
import { PhilosophyHeroSection } from "@/components/philosophy/PhilosophyHeroSection";
import { PerspectiveSection } from "@/components/philosophy/PerspectiveSection";
import { WhatWeAreNotSection } from "@/components/philosophy/WhatWeAreNotSection";
import { PhilosophyMethodologySection } from "@/components/philosophy/PhilosophyMethodologySection";
import { PageCta } from "@/components/shared/PageCta";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<PhilosophyPageContent>("philosophy", lang);
  if (!content) {
    return {
      title: "Our Philosophy - The Boutique Standard",
      description: "",
    };
  }
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function AboutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<PhilosophyPageContent>("philosophy", lang);

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
      <PhilosophyHeroSection
        content={content.hero}
        imageSrc="/images/website/details/welcome-note.png"
      />
      <PerspectiveSection content={content.perspective} />
      <WhatWeAreNotSection content={content.whatWeAreNot} />
      <PhilosophyMethodologySection content={content.methodology} />
      <PageCta content={content.cta} />
    </>
  );
}
