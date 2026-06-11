import { defineType, defineField } from "sanity"

export const imageTextSection = defineType({
  name: "section.imageText",
  title: "Image + Text",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      type: "string",
      title: "Internal Name",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "sectionImage",
      title: "Image",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "localizedString", title: "Label" }),
    defineField({ name: "headline", type: "localizedString", title: "Headline" }),
    defineField({ name: "body", type: "localizedText", title: "Body" }),
    defineField({
      name: "imagePosition",
      type: "string",
      title: "Image position",
      options: { list: ["left", "right"] },
      initialValue: "right",
    }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Image + Text section" }),
  },
})
