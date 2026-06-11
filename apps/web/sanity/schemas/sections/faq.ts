import { defineType, defineField } from "sanity"

export const faqSection = defineType({
  name: "section.faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      type: "string",
      title: "Internal Name",
      validation: (r) => r.required(),
    }),
    defineField({ name: "heading", type: "localizedString", title: "Heading" }),
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "localizedString", title: "Question" },
            { name: "answer", type: "localizedText", title: "Answer" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "FAQ section" }),
  },
})
