import { defineType, defineField } from "sanity"

export const twoColumnSection = defineType({
  name: "section.twoColumn",
  title: "Two Column Content",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      type: "string",
      title: "Internal Name",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", type: "localizedString", title: "Label" }),
    defineField({ name: "leftHeadline", type: "localizedString", title: "Left headline" }),
    defineField({ name: "leftBody", type: "localizedText", title: "Left body" }),
    defineField({ name: "rightHeadline", type: "localizedString", title: "Right headline (optional)" }),
    defineField({ name: "rightBody", type: "localizedText", title: "Right body" }),
    defineField({ name: "image", type: "sectionImage", title: "Image (optional)" }),
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
    prepare: ({ title }) => ({ title, subtitle: "Two Column section" }),
  },
})
