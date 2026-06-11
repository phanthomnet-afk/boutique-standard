import { defineType, defineField } from "sanity"

export const theFrameworkSection = defineType({
  name: "section.theFramework",
  title: "The Framework",
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
      name: "lenses",
      title: "Lenses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Number" },
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
    prepare: ({ title }) => ({ title, subtitle: "The Framework section" }),
  },
})
