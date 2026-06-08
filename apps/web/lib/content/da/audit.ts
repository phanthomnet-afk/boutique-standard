import type { AuditPageContent } from "../types";

const content: AuditPageContent = {
  meta: {
    title: "Audit - The Boutique Standard",
    description:
      "Undercover gaesteoplevelsesaudits for boutiquehoteller. Vi evaluerer overensstemmelsen mellem dit loefte og det dine gaester faktisk oplever.",
  },
  hero: {
    eyebrow: "Gaesteoplevelsesanalyse",
    headline: "Alle hoteller lover et fantastisk ophold.\nIkke alle hoteller leverer det.",
    body: "The Boutique Standard-audit afdaekker den praecise afstand mellem det, dit hotel kommunikerer, og det dine gaester faktisk oplever.",
    ctaPrimary: { label: "Anmod om en audit", href: "/request" },
    ctaSecondary: { label: "Se en eksempelrapport", href: "/report/maison-du-rivage" },
    imageAlt: "Hotelkorridor, arkitektonisk detalje, lys over stengulv",
  },
  methodology: {
    label: "Metodologien",
    headline: "Fire linser. Et framework.",
    body: [
      "Vi evaluerer hvert enkelt hotel ud fra dets eget erklaerede loefte - ikke ud fra branchenormer eller konkurrenternes benchmarks. Frameworket identificerer kloeften mellem det, et hotel kommunikerer, og det gaesterne faktisk modtager.",
      "De samme fire linser anvendes pa hvert audit. Tilsammen skaber de et praecist og aerligt billede af, hvor et hotel leverer, og hvor det falder til kort.",
    ],
    pillars: [
      {
        number: "01",
        label: "Loefte",
        description:
          "Hvad hotellet kommunikerer pa tvaers af alle beroringsflader - hjemmeside, fotografier, skriftlige beskrivelser, prisniveau og brandpositionering.",
      },
      {
        number: "02",
        label: "Forventning",
        description:
          "Hvad en foerstegangsgaest rimeligt antager baseret pa loefte, kategori og den pris, de har betalt.",
      },
      {
        number: "03",
        label: "Oplevelse",
        description:
          "Hvad der faktisk sker under opholdet - hvert beroringsflader, hvert samspil, hvert moment af friktion eller glaede.",
      },
      {
        number: "04",
        label: "Erindring",
        description:
          "Hvad gaesten bevarer og fortaeller andre efter afrejse. Det vedvarende sediment, der driver anmeldelser, anbefalinger og tilbagekomst.",
      },
    ],
  },
  process: {
    label: "Processen",
    heading: "Sadan fungerer et audit",
    steps: [
      {
        number: "01",
        title: "Anonymt ophold",
        description:
          "Vi oplever dit hotel som en foerstegangsgaest ville. Ingen forudgaende varsel. Ingen saerbehandling. Ingen hofligheds-opgraderinger. Kun det ophold dine gaester faktisk modtager.",
      },
      {
        number: "02",
        title: "Struktureret evaluering",
        description:
          "Hvert beroringsflader dokumenteres og vurderes ud fra dit eget loefte, din priskategori og forventningerne hos din malrettet gaesteprofil.",
      },
      {
        number: "03",
        title: "Analyserapport",
        description:
          "En redaktionel luksusrapport leveret som en privat weboplevelse og en hojoplosningspdf. Designet til at blive laest, forstaet og handlet pa.",
      },
      {
        number: "04",
        title: "Prioriteret forbedring",
        description:
          "Prioriterede muligheder rangordnet efter gaestepaavirkning. Vi leverer ikke implementeringsplaner. Du bestemmer, hvad du vil goere med indsigterne.",
      },
    ],
  },
  scope: {
    label: "Omfangsmuligheder",
    heading: "Vaelg dit auditomfang",
    body: "Hvert engagement tilpasses individuelt. Mulighederne nedenfor er udgangspunkter - det endelige omfang aftales i den indledende konsultation.",
    options: [
      {
        title: "Fuld opholdsaudit",
        description:
          "En omfattende evaluering af den komplette gaesteoplevelse fra foerste digitale kontakt til kommunikation efter opholdet. Det mest fuldstaendige billede af dit hotel.",
        includes: [
          "Minimum to naetters ophold",
          "Alle ankomst- og opholdsberoringsflader",
          "Dining - minimum en middagstjeneste",
          "Fuld vurdering af vaerelse og faciliteter",
          "Servicekulturevaluering gennem hele opholdet",
          "Analyse af kommunikation efter opholdet",
        ],
      },
      {
        title: "Fokuseret oplevelsesaudit",
        description:
          "En malrettet evaluering af specifikke oplevelseselementer, hvor du mest har brug for indsigt. En nat, tre til fem definerede beroringsflader med dybgaende narrativ.",
        includes: [
          "Et naetters ophold",
          "Tre til fem aftalte beroringsflader",
          "Dybgaende narrativ for hvert fokusomrade",
          "Sammenlignende benchmarking inden for din kategori",
        ],
      },
      {
        title: "Multi-beroringsflader-audit",
        description:
          "En udvidet evaluering over flere besog eller oplevelseselementer over tid. Til hoteller, hvor et enkelt besog ikke kan give det fulde billede.",
        includes: [
          "To eller flere besog",
          "Dybgaende kortlaegning af ankomstrejsen",
          "Flere dining-lejligheder",
          "Saesonmaessig sammenligning, hvor relevant",
          "Fuld opfolgning efter opholdet",
        ],
      },
    ],
  },
  deliverables: {
    label: "Hvad du modtager",
    heading: "Leverancerne",
    items: [
      {
        title: "Privat webrapport",
        description:
          "Et designet, navigerbart webdokument med en unik URL. Struktureret til skaermlaesning med interne links. Aktivt i tolv maneder fra levering.",
      },
      {
        title: "PDF-eksport",
        description:
          "Et hojoplosningsdokument formateret til arkivering, print eller deling med udvalgte teammedlemmer. Dit for bestandigt.",
      },
      {
        title: "Scoret rejsekort",
        description:
          "Hvert vaesentligt beroringsflader scoret ud fra loefte-forventning-oplevelse-erindring-frameworket. Et praecist visuelt overblik over, hvor oplevelsen holder, og hvor den svigter.",
      },
      {
        title: "Misaligneringsindeks",
        description:
          "En praecis identifikation af, hvor din gaesteoplevelse afviger fra din kommunikerede positionering. Rangordnet efter betydning, ikke efter afdeling.",
      },
      {
        title: "Mulighedsmatrix",
        description:
          "Prioriterede forbedringsmuligheder rangordnet efter potentiel gaestepaavirkning - ikke driftsmaessig lethed eller omkostning.",
      },
    ],
  },
  pricing: {
    label: "Investering",
    heading: "Priser",
    body: "Audits starter fra 4.000 EUR. Den endelige pris afhaenger af omfang, hotellets beliggenhed og antallet af oplevelseselementer, der evalueres. Investeringen er struktureret i to etaper: halvtreds procent ved engagementets bekraeftelse - daekker auditrejse, overnatning og indledende evaluering - og halvtreds procent ved levering af den faerdige rapport.",
    note: "Alle rejse- og overnatningsomkostninger er inkluderet i det opgivne gebyr. Ingen skjulte omkostninger.",
  },
  faq: {
    heading: "Almindelige spoergsmaal",
    items: [
      {
        question: "Hvad modtager vi praecist?",
        answer:
          "Du modtager en privat webrapport med en unik URL, en hojoplosnings-PDF, et scoret rejsekort, et misaligneringsindeks og en mulighedsmatrix. Webrapporten er aktiv i tolv maneder. PDF'en er din for bestandigt.",
      },
      {
        question: "Hvor lang tid tager processen?",
        answer:
          "Fra bekraeftelse til rapportlevering er typisk tre til fire uger. Det inkluderer selve opholdet, den strukturerede evalueringsperiode og den redaktionelle produktion af rapporten.",
      },
      {
        question: "Ved nogen pa hotellet, at der er et audit i gang?",
        answer:
          "Nej. Opholdet er fuldt anonymt. Vi booker via normale kanaler, ankommer som regulaere gaester og afrejser uden at afsloere os. Dit personale modtager ingen indikation om, at en evaluering er i gang.",
      },
      {
        question: "Hvad sker der, naer vi modtager rapporten?",
        answer:
          "Det er fuldt ud din beslutning. Vi leverer indsigterne - hvad du goer med dem, er dit ansvar. Vi tilbyder ikke implementeringskonsultation, opfolgende audits eller driftsvejledning ud over rapporten.",
      },
      {
        question: "Kan vi anmode om specifikke fokusomrader?",
        answer:
          "Ja. Omfanget aftales, inden auditet begynder. Hvis der er specifikke elementer - ankomstsoplevelse, dining, digital forankort - der er vigtigst for dig, strukturerer vi evalueringen derefter.",
      },
      {
        question: "Hvordan leveres rapporten?",
        answer:
          "Via en privat URL sendt direkte til den kontaktperson, du udpeger. Webrapporten er designet til skaermlaesning med navigerbare sektioner. PDF-eksporten er inkluderet til arkivering eller teamdeling.",
      },
    ],
  },
  cta: {
    label: "Klar til at begynde",
    heading: "Anmod om dit audit.",
    body: "Engagementer tilpasses individuelt. Begynd med en kort henvendelse - ingen forpligtelse kraevet.",
    buttonLabel: "Anmod om et audit",
    buttonHref: "/request",
  },
};

export default content;
