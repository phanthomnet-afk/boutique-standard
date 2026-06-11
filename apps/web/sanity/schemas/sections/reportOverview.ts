import { defineType, defineField } from "sanity"

export const reportOverviewSection = defineType({
  name: "section.reportOverview",
  title: "Report Overview",
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
    defineField({ name: "body", type: "localizedText", title: "Body" }),
    defineField({ name: "propertyName", type: "string", title: "Property name" }),
    defineField({ name: "propertyLocation", type: "string", title: "Property location" }),
    defineField({ name: "overallScore", type: "number", title: "Overall score (0-10)" }),
    defineField({ name: "excerpt", type: "localizedText", title: "Case report excerpt" }),
    defineField({ name: "linkLabel", type: "localizedString", title: "Link label" }),
    defineField({ name: "linkHref", type: "string", title: "Link URL" }),
    defineField({ name: "image", type: "sectionImage", title: "Case image" }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Report Overview section" }),
  },
})
