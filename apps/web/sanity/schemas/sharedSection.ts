import { defineType, defineField } from "sanity"

export const sharedSection = defineType({
  name: "sharedSection",
  title: "Shared Section",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (r) => r.required(),
      description: "e.g. 'Global CTA', 'Homepage Reviews'",
    }),
    defineField({
      name: "section",
      title: "Section content",
      type: "array",
      of: [
        { type: "section.hero" },
        { type: "section.reviews" },
        { type: "section.cta" },
        { type: "section.reportOverview" },
        { type: "section.journalTeaser" },
        { type: "section.philosophyMethod" },
        { type: "section.howWeWork" },
        { type: "section.theFramework" },
        { type: "section.process" },
        { type: "section.faq" },
        { type: "section.pricing" },
        { type: "section.richText" },
        { type: "section.twoColumn" },
        { type: "section.imageText" },
      ],
      validation: (r) => r.max(1),
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Shared section" }),
  },
})
