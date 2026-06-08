import type { RequestPageContent } from "../types";

const content: RequestPageContent = {
  meta: {
    title: "Anmod om et audit - The Boutique Standard",
    description:
      "Begynd med en kort henvendelse. Ingen forpligtelse kraevet. Vi svarer inden for to arbejdsdage med et tilpasset tilbud.",
  },
  hero: {
    eyebrow: "Anmod om et audit",
    headline: "Begynd med\nen samtale.",
    body: "Udfyld denne korte henvendelse, og vi vender tilbage inden for to arbejdsdage med et omfangsforslag. Ingen forpligtelse kraeves pa dette tidspunkt.",
    imageAlt: "Hotelskrivebord, pen og blankt papir, stille morgenlys",
  },
  steps: [
    {
      number: "01",
      title: "Indsend denne formular",
      description:
        "Udfyld henvendelsen med sa meget eller lidt detalje, du har tilgaengelig. Vi arbejder med det, du giver os.",
    },
    {
      number: "02",
      title: "Vi svarer",
      description:
        "Inden for to arbejdsdage modtager du et omfangsforslag og en prisindikation baseret pa dit hotel og fokusomrader.",
    },
    {
      number: "03",
      title: "Omfangsaftale",
      description:
        "Vi diskuterer og aftaler det praecise omfang, timing og logistik. Auditet planlaegges, naar den forste betaling er modtaget.",
    },
    {
      number: "04",
      title: "Auditet",
      description:
        "Vi overnatter anonymt, evaluerer alt, vi aftalte at evaluere, og producerer rapporten.",
    },
    {
      number: "05",
      title: "Levering",
      description:
        "Webrapporten og PDF'en leveres til din udpegede kontaktperson. Den anden betaling forfalder ved levering.",
    },
  ],
  form: {
    steps: [
      {
        id: "hotel",
        heading: "Dit Hotel",
        fields: [
          {
            id: "hotelName",
            label: "Hotelnavn",
            type: "text",
            placeholder: "Det navn dine gaester kender dig ved",
            required: true,
          },
          {
            id: "location",
            label: "By og land",
            type: "text",
            placeholder: "f.eks. Kobenhavn, Danmark",
            required: true,
          },
          {
            id: "website",
            label: "Hjemmeside",
            type: "url",
            placeholder: "https://",
            required: false,
          },
          {
            id: "propertyType",
            label: "Ejendomstype",
            type: "select",
            required: true,
            options: [
              "Boutiqueluksus",
              "Designhotel",
              "Kystferie",
              "Wellnessretreat",
              "Urban boutique",
              "Landretreat",
              "Arvegodshotel",
              "Andet",
            ],
          },
          {
            id: "roomCount",
            label: "Omtrentligt vaerelsesantal",
            type: "select",
            required: true,
            options: [
              "Under 20 vaerelser",
              "20-40 vaerelser",
              "40-80 vaerelser",
              "Over 80 vaerelser",
            ],
          },
        ],
      },
      {
        id: "scope",
        heading: "Auditomfang",
        fields: [
          {
            id: "scopePreference",
            label: "Hvilket auditomfang passer bedst til dine behov?",
            type: "select",
            required: true,
            options: [
              "Fuld opholdsaudit - minimum 2 naetter, komplet rejse",
              "Fokuseret oplevelsesaudit - 1 nat, definerede beroringsflader",
              "Multi-beroringsflader-audit - udvidet ophold eller flere besog",
              "Ikke sikker - foreslaa venligst et omfang",
            ],
          },
        ],
      },
      {
        id: "guest",
        heading: "Din Gaest",
        fields: [
          {
            id: "targetGuest",
            label: "Beskriv din malrettede gaest",
            type: "textarea",
            placeholder:
              "Hvem er den gaest, du designer oplevelsen for? Fritidspar, designbevidste rejsende, forretningsrejsende, familier?",
            required: true,
          },
          {
            id: "corePromise",
            label: "Hvad lover dit hotel dem?",
            type: "textarea",
            placeholder:
              "Med egne ord - hvad er den oplevelse, du har forpligtet dig til at levere?",
            required: true,
          },
          {
            id: "keyQuestion",
            label: "Hvad onsker du mest at forsta fra dette audit?",
            type: "textarea",
            placeholder:
              "Er der en specifik bekymring, en dimension du er usikker pa, eller en kloeft du formoeder eksisterer?",
            required: true,
          },
        ],
      },
      {
        id: "focus",
        heading: "Fokusomrader",
        fields: [
          {
            id: "focusAreas",
            label: "Hvilke omrader er vigtigst at evaluere?",
            type: "checkbox-group",
            required: false,
            options: [
              "Kommunikation foer ankomst",
              "Ankomstoplevelse",
              "Vaerelse og soveoplevelse",
              "Dining-oplevelse",
              "Faciliteter og rum",
              "Servicekultur",
              "Afrejseoplevelse",
              "Digital tilstedevaerelse",
              "Kommunikation efter ophold",
            ],
          },
        ],
      },
      {
        id: "contact",
        heading: "Dine Kontaktoplysninger",
        fields: [
          {
            id: "contactName",
            label: "Dit navn",
            type: "text",
            placeholder: "Fulde navn",
            required: true,
          },
          {
            id: "contactEmail",
            label: "E-mailadresse",
            type: "email",
            placeholder: "Hvor vi skal sende tilbuddet",
            required: true,
          },
          {
            id: "referralSource",
            label: "Hvordan hoerte du om os?",
            type: "select",
            required: false,
            options: [
              "Anbefaling fra en kollega",
              "Online soegning",
              "Sociale medier",
              "Presseomtale",
              "Andet",
            ],
          },
          {
            id: "additionalContext",
            label: "Andet du gerne vil fortaelle os",
            type: "textarea",
            placeholder: "Valgfrit - enhver kontekst, der vil hjaelpe os med at tilpasse dette engagement",
            required: false,
          },
        ],
      },
    ],
    submitLabel: "Send henvendelse",
    submittingLabel: "Sender...",
    successHeading: "Din henvendelse er modtaget.",
    successBody:
      "Vi vender tilbage inden for to arbejdsdage med et omfangsforslag tilpasset dit hotel. Hvis du har brug for at kontakte os hurtigere, bedes du e-maile os direkte.",
  },
  pricing: {
    label: "Investering",
    body: "Audits starter fra 4.000 EUR. Alle rejse- og overnatningsomkostninger er inkluderet i det opgivne gebyr. Et detaljeret tilbud gives, inden nogen forpligtelse kraeves.",
  },
};

export default content;
