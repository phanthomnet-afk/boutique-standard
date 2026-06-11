import { defineType, defineField } from "sanity"

export const processSection = defineType({
  name: "section.process",
  title: "Process / How It Works",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "localizedString", title: "Label" }),
    defineField({ name: "heading", type: "localizedString", title: "Heading" }),
    defineField({ name: "subheading", type: "localizedText", title: "Subheading (optional)" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Step number (e.g. 01)" },
            { name: "title", type: "localizedString", title: "Step title" },
            { name: "description", type: "localizedText", title: "Step description" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Process section" }),
  },
})
