import { defineType, defineField } from "sanity"

export const ctaSection = defineType({
  name: "section.cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      type: "string",
      title: "Internal Name",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "localizedString", title: "Label" }),
    defineField({
      name: "heading",
      type: "localizedString",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", type: "localizedText", title: "Body text" }),
    defineField({ name: "buttonLabel", type: "localizedString", title: "Button label" }),
    defineField({ name: "buttonHref", type: "string", title: "Button URL" }),
    defineField({ name: "image", type: "sectionImage", title: "Background image (optional)" }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "CTA section" }),
  },
})
