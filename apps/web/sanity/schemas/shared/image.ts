import { defineType, defineField } from "sanity"

export const sectionImage = defineType({
  name: "sectionImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "desktop",
      title: "Desktop Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "mobile",
      title: "Mobile Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
})
