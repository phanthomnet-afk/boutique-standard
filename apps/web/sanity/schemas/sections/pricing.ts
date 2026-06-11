import { defineType, defineField } from "sanity"

export const pricingSection = defineType({
  name: "section.pricing",
  title: "Pricing",
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
    defineField({ name: "body", type: "localizedText", title: "Body text" }),
    defineField({
      name: "priceEur",
      type: "string",
      title: "Price (EUR)",
      description: "e.g. from €1,200",
    }),
    defineField({
      name: "priceDkk",
      type: "string",
      title: "Price (DKK)",
      description: "e.g. fra 7.450 kr.",
    }),
    defineField({
      name: "stages",
      type: "array",
      title: "Payment stages",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "localizedString", title: "Stage label" },
            { name: "description", type: "localizedText", title: "Stage description" },
          ],
        },
      ],
    }),
    defineField({ name: "note", type: "localizedText", title: "Note (optional)" }),
  ],
  preview: {
    select: { title: "internalName" },
    prepare: ({ title }) => ({ title, subtitle: "Pricing section" }),
  },
})
