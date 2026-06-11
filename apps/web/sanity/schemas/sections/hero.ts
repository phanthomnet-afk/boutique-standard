import { defineType, defineField } from "sanity"

export const heroSection = defineType({
  name: "section.hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (r) => r.required(),
      description: "e.g. 'Home Hero', 'Audit Hero'",
    }),
    defineField({ name: "eyebrow", type: "localizedString", title: "Eyebrow label" }),
    defineField({
      name: "headline",
      type: "localizedString",
      title: "Headline",
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", type: "localizedText", title: "Body text (optional)" }),
    defineField({
      name: "ctaPrimary",
      type: "object",
      title: "Primary CTA",
      fields: [
        { name: "label", type: "localizedString", title: "Label" },
        { name: "href", type: "string", title: "URL" },
      ],
    }),
    defineField({
      name: "ctaSecondary",
      type: "object",
      title: "Secondary CTA (optional)",
      fields: [
        { name: "label", type: "localizedString", title: "Label" },
        { name: "href", type: "string", title: "URL" },
      ],
    }),
    defineField({ name: "image", type: "sectionImage", title: "Background image (optional)" }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Hero section" }),
  },
})
