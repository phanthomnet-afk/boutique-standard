import { defineType, defineField } from "sanity"

export const journalTeaserSection = defineType({
  name: "section.journalTeaser",
  title: "Journal Teaser",
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
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "localizedString", title: "Title" },
            { name: "excerpt", type: "localizedText", title: "Excerpt" },
            { name: "category", type: "localizedString", title: "Category" },
            { name: "slug", type: "string", title: "Slug" },
            { name: "image", type: "sectionImage", title: "Image" },
            { name: "readingTime", type: "number", title: "Reading time (minutes)" },
          ],
        },
      ],
      validation: (r) => r.max(3),
    }),
    defineField({ name: "linkLabel", type: "localizedString", title: "Link label" }),
    defineField({ name: "linkHref", type: "string", title: "Link URL" }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Journal Teaser section" }),
  },
})
