import { defineType, defineField } from "sanity"

export const richTextSection = defineType({
  name: "section.richText",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      type: "string",
      title: "Internal Name",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "content",
      type: "object",
      title: "Content",
      fields: [
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "da", title: "Danish", type: "array", of: [{ type: "block" }] },
      ],
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Rich Text section" }),
  },
})
