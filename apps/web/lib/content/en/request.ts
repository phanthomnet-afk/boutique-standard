import type { RequestPageContent } from "../types";

const content: RequestPageContent = {
  meta: {
    title: "Request an Audit - The Boutique Standard",
    description:
      "Begin with a brief enquiry. No commitment required. We respond within two business days with a scope proposal tailored to your property.",
  },
  hero: {
    eyebrow: "Request an Audit",
    headline: "Begin with\na conversation.",
    body: "Complete this brief enquiry and we will respond within two business days with a scope proposal. No commitment is required at this stage.",
    imageAlt: "Hotel writing desk, pen and blank paper, quiet morning light",
  },
  steps: [
    {
      number: "01",
      title: "Submit this form",
      description:
        "Complete the enquiry with as much or as little detail as you have available. We work with what you give us.",
    },
    {
      number: "02",
      title: "We respond",
      description:
        "Within two business days you receive a scope proposal and a fee indication based on your property and focus areas.",
    },
    {
      number: "03",
      title: "Scope agreement",
      description:
        "We discuss and agree the exact scope, timing, and logistics. The audit is scheduled once the first payment is received.",
    },
    {
      number: "04",
      title: "The audit",
      description:
        "We stay anonymously, evaluate everything we agreed to evaluate, and produce the report.",
    },
    {
      number: "05",
      title: "Delivery",
      description:
        "The web report and PDF are delivered to your designated contact. The second payment is due on delivery.",
    },
  ],
  form: {
    steps: [
      {
        id: "hotel",
        heading: "Your Hotel",
        fields: [
          {
            id: "hotelName",
            label: "Hotel name",
            type: "text",
            placeholder: "The name your guests know you by",
            required: true,
          },
          {
            id: "location",
            label: "City and country",
            type: "text",
            placeholder: "e.g. Lisbon, Portugal",
            required: true,
          },
          {
            id: "website",
            label: "Website",
            type: "url",
            placeholder: "https://",
            required: false,
          },
          {
            id: "propertyType",
            label: "Property type",
            type: "select",
            required: true,
            options: [
              "Boutique Luxury",
              "Design Hotel",
              "Coastal Retreat",
              "Wellness Retreat",
              "Urban Boutique",
              "Countryside Retreat",
              "Heritage Property",
              "Other",
            ],
          },
          {
            id: "roomCount",
            label: "Approximate room count",
            type: "select",
            required: true,
            options: [
              "Under 20 rooms",
              "20-40 rooms",
              "40-80 rooms",
              "Over 80 rooms",
            ],
          },
        ],
      },
      {
        id: "scope",
        heading: "Audit Scope",
        fields: [
          {
            id: "scopePreference",
            label: "Which audit scope best fits your needs?",
            type: "select",
            required: true,
            options: [
              "Full Stay Audit - 2 nights minimum, complete journey",
              "Focused Experience Audit - 1 night, defined touchpoints",
              "Multi-Touchpoint Audit - extended stay or multiple visits",
              "Not sure - please propose a scope",
            ],
          },
        ],
      },
      {
        id: "guest",
        heading: "Your Guest",
        fields: [
          {
            id: "targetGuest",
            label: "Describe your target guest",
            type: "textarea",
            placeholder:
              "Who is the guest you are designing the experience for? Leisure couples, design-conscious travellers, business guests, families?",
            required: true,
          },
          {
            id: "corePromise",
            label: "What does your property promise them?",
            type: "textarea",
            placeholder:
              "In your own words - what is the experience you have committed to delivering?",
            required: true,
          },
          {
            id: "keyQuestion",
            label: "What do you most want to understand from this audit?",
            type: "textarea",
            placeholder:
              "Is there a specific concern, a dimension you are uncertain about, or a gap you suspect exists?",
            required: true,
          },
        ],
      },
      {
        id: "focus",
        heading: "Focus Areas",
        fields: [
          {
            id: "focusAreas",
            label: "Which areas are most important to evaluate?",
            type: "checkbox-group",
            required: false,
            options: [
              "Pre-Arrival Communication",
              "Arrival Experience",
              "Room and Sleeping Experience",
              "Dining Experience",
              "Facilities and Spaces",
              "Service Culture",
              "Departure Experience",
              "Digital Presence",
              "Post-Stay Communication",
            ],
          },
        ],
      },
      {
        id: "contact",
        heading: "Your Contact Details",
        fields: [
          {
            id: "contactName",
            label: "Your name",
            type: "text",
            placeholder: "Full name",
            required: true,
          },
          {
            id: "contactEmail",
            label: "Email address",
            type: "email",
            placeholder: "Where we should send the proposal",
            required: true,
          },
          {
            id: "referralSource",
            label: "How did you hear about us?",
            type: "select",
            required: false,
            options: [
              "Referral from a colleague",
              "Online search",
              "Social media",
              "Press mention",
              "Other",
            ],
          },
          {
            id: "additionalContext",
            label: "Anything else you would like us to know",
            type: "textarea",
            placeholder: "Optional - any context that will help us scope this engagement",
            required: false,
          },
        ],
      },
    ],
    submitLabel: "Send Enquiry",
    submittingLabel: "Sending...",
    successHeading: "Your enquiry has been received.",
    successBody:
      "We will respond within two business days with a scope proposal tailored to your property. If you need to reach us sooner, please email us directly.",
  },
  pricing: {
    label: "Investment",
    body: "Audits start from 4,000 EUR. All audit travel and accommodation costs are included within the quoted fee. A detailed proposal is provided before any commitment is required.",
  },
};

export default content;
