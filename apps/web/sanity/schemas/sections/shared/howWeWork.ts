import { defineType, defineField } from "sanity"

export const howWeWorkSection = defineType({
  name: "section.howWeWork",
  title: "How We Work",
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
    defineField({ name: "subheading", type: "localizedText", title: "Subheading" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Number" },
            { name: "title", type: "localizedString", title: "Title" },
            { name: "description", type: "localizedText", title: "Description" },
          ],
        },
      ],
      validation: (r) => r.max(4),
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "How We Work section" }),
  },
})
