import { defineType, defineField } from "sanity"

export const reviewsSection = defineType({
  name: "section.reviews",
  title: "Reviews / Testimonials",
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
      name: "items",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", type: "localizedText", title: "Quote", validation: (r: any) => r.required() },
            { name: "attribution", type: "localizedString", title: "Attribution" },
          ],
        },
      ],
      validation: (r) => r.max(3),
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Reviews section" }),
  },
})
