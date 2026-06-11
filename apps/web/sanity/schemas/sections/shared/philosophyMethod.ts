import { defineType, defineField } from "sanity"

export const philosophyMethodSection = defineType({
  name: "section.philosophyMethod",
  title: "Philosophy / Method",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      type: "string",
      title: "Internal Name",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "localizedString", title: "Label" }),
    defineField({ name: "heading", type: "localizedString", title: "Heading" }),
    defineField({ name: "body", type: "localizedText", title: "Body (optional)" }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Number (01, 02, 03, 04)" },
            { name: "label", type: "localizedString", title: "Label" },
            { name: "description", type: "localizedText", title: "Description" },
          ],
        },
      ],
      validation: (r) => r.max(4),
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Philosophy Method section" }),
  },
})
