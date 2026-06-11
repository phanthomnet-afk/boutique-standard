import { defineType, defineField } from "sanity"

export const seoFields = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      validation: (r) => r.max(160),
    }),
    defineField({ name: "ogImage", title: "OG Image", type: "image" }),
  ],
})
