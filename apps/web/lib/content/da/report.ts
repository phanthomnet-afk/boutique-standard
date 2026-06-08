import type { ReportPageContent } from "../types";

const content: ReportPageContent = {
  meta: {
    title: "Rapporten - The Boutique Standard",
    description: "En 13-sektions gaesteoplevelsesrapport for boutiquehoteller.",
  },
  hero: {
    eyebrow: "Rapporten",
    headline: "Det dine gaester faktisk oplever.",
    body: "En 13-sektions analyserapport om den komplette gaesteoplevelse. Skrevet som narrativ. Designet til at blive praesenteret.",
    ctaPrimary: { label: "Anmod om et audit", href: "/request" },
    ctaSecondary: { label: "Se eksempelrapport", href: "/report/maison-du-rivage" },
    imageAlt: "Stenkorridor, eftermiddagslys paa gulvet",
  },
  valueProps: {
    label: "Vaerdien",
    items: [
      {
        number: "01",
        statement: "Du ser dit hotel hver dag. Dine gaester ser det kun en gang.",
        body: "Afstand afslorer, hvad fortrolighed skjuler.",
      },
      {
        number: "02",
        statement: "Intention og oplevelse er sjaeldent det samme.",
        body: "Kloeften mellem det, en ejendom stiler mod at levere, og det en gaest modtager, er der, de fleste muligheder lever.",
      },
      {
        number: "03",
        statement: "Det gaester husker paavirker dine bookinger mere end forgaars anmeldelser.",
        body: "Rapporten identificerer, hvilke ojeblikke gaester baerer med sig, og hvilke de stille glemmer.",
      },
      {
        number: "04",
        statement: "At vide, hvad man skal beskytte, er ligesat vaerdifuldt som at vide, hvad man skal forbedre.",
        body: "Enhver rapport navngiver de egenskaber, der definerer din ejendoms karakter, saa de ikke fortabes til vaekst eller pres.",
      },
    ],
  },
  sections: {
    label: "13 sektioner",
    heading: "Altid komplet. Altid den samme rapport.",
    body: "Opholdets omfang varierer. Rapportens dybde goor ikke.",
    items: [
      {
        number: "01",
        title: "Executive Snapshot",
        description: "Den samlede score, de tre mest indflydelsesrige misalignments og den mest vaesentlige mulighed. En side.",
      },
      {
        number: "02",
        title: "Property Profile",
        description: "Positionering, loefte og malrettet gaesteprofil. Udgangspunktet for alt, der folger.",
      },
      {
        number: "03",
        title: "Promise Analysis",
        description: "Hvad ejendommen kommunikerer pa tvaers af alle for-ankomst-beroringsflader.",
      },
      {
        number: "04",
        title: "Expectation Mapping",
        description: "Hvad en foerstegangsgaest rimeligt antager, inden de ankommer.",
      },
      {
        number: "05",
        title: "Journey Narratives",
        description: "Udvidet narrativ om hvert trin: ankomst, vaerelse, dining, faciliteter, service, afrejse.",
      },
      {
        number: "06",
        title: "Experience Scoring",
        description: "Scoret mod din egen standard. Ikke et branchegennemsnit.",
      },
      {
        number: "07",
        title: "Misalignment Report",
        description: "Enhver kloeft mellem loefte og levering, rangordnet efter gaestepaavirkning.",
      },
      {
        number: "08",
        title: "Memory Index",
        description: "Hvad gaesten bevarer efter afrejse.",
      },
      {
        number: "09",
        title: "Opportunity Matrix",
        description: "Refinementmuligheder rangordnet efter gaestepaavirkning, ikke driftsmaessig lethed.",
      },
      {
        number: "10",
        title: "Service Culture",
        description: "Medarbejderinteraktioner, konsistens i levering, servicefilosofi versus praksis.",
      },
      {
        number: "11",
        title: "Pre-Arrival Assessment",
        description: "Digital rejse, bookinproces, bekraeftelseskommunikation.",
      },
      {
        number: "12",
        title: "Post-Stay",
        description: "Kommunikation efter afrejse og om den forstaerker oplevelsen.",
      },
      {
        number: "13",
        title: "Editorial Conclusion",
        description: "En afsluttende reflektion over ejendommens karakter og om den opnaar det, den sigtede mod at skabe.",
      },
    ],
  },
  format: {
    label: "Formatet",
    heading: "Skrevet som en publikation. Leveret som et produkt.",
    points: [
      "Privat URL, unik for din ejendom",
      "Adgangskodebeskyttet webrapport",
      "Downloadbar PDF",
      "35 til 40 sider",
      "Fuld narrativ gennemgaaende",
    ],
  },
  caseStudy: {
    label: "Case-rapport",
    heading: "Maison du Rivage",
    location: "Antibes, French Riviera",
    score: 8.2,
    scoreLabel: "Alignment-score",
    body: "Et 4-stjernet kystresort. 28 vaerelser. En ejendom, der lever op til sit loefte i naesten alle dimensioner - og svigter i to ojeblikke, der betyder mere end alle andre.",
    linkLabel: "Laes case-rapporten",
    linkHref: "/report/maison-du-rivage",
  },
  reviews: {
    label: "Fra praksis",
    items: [
      {
        quote: "Jeg har laest mange hotelrapporter. Dette er den forste, jeg laeste to gange.",
        attribution: "Ejer, boutiquehotel, Kobenhavn",
      },
      {
        quote: "Misalignment-sektionen navngav tre ting, vi havde diskuteret i aarevis, men aldrig formaaet at handle paa.",
        attribution: "Direktoer, Provence",
      },
    ],
  },
  cta: {
    label: "Begynd",
    heading: "Bestil din rapport.",
    body: "Fra 7.450 kr. Foresporgsel tager fem minutter.",
    buttonLabel: "Anmod om et audit",
    buttonHref: "/request",
  },
};

export default content;
