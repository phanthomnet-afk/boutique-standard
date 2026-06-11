import { defineType, defineField } from "sanity"

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title (internal)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
      description: "home, audit, report, philosophy, request",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "section.hero" },
        { type: "section.richText" },
        { type: "section.twoColumn" },
        { type: "section.process" },
        { type: "section.pricing" },
        { type: "section.faq" },
        { type: "section.reviews" },
        { type: "section.cta" },
        { type: "section.reportOverview" },
        { type: "section.imageText" },
        { type: "section.journalTeaser" },
        { type: "section.philosophyMethod" },
        { type: "section.howWeWork" },
        { type: "section.theFramework" },
        {
          type: "object",
          name: "sharedSectionRef",
          title: "Shared Section",
          fields: [
            {
              name: "reference",
              type: "reference",
              to: [{ type: "sharedSection" }],
              validation: (r: any) => r.required(),
            },
          ],
          preview: {
            select: { title: "reference.internalName" },
            prepare: ({ title }: any) => ({
              title: title || "Shared section",
              subtitle: "-> Shared",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug}` }),
  },
})
