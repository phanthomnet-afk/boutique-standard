import type { ReportPageContent } from "../types";

const content: ReportPageContent = {
  meta: {
    title: "Analyserapporten - The Boutique Standard",
    description:
      "Ikke et resume. Ikke et scorecard. Et redaktionelt luksusprodukt, der med praecision og omhu afsloerer, hvor en ejendom lever op til sit loefte.",
  },
  hero: {
    eyebrow: "Analyserapporten",
    headline: "Rapporten er produktet.",
    body: "Ikke et resume. Ikke et scorecard. Et redaktionelt luksusdokument, der med praecision og omhu afsloerer, praecist hvor en ejendom lever op til sit loefte - og hvor den fejler.",
    ctaPrimary: { label: "Se case-rapporten", href: "/report/maison-du-rivage" },
    ctaSecondary: { label: "Anmod om et audit", href: "/request" },
    imageAlt: "Aaben rapport, hotelbord, morgenlys",
  },
  intro: {
    label: "Om rapporten",
    heading: "Designet til at blive laest - ikke arkiveret",
    body: [
      "De fleste auditrapporter er driftsdokumenter. Tabeller, tjeklister, scores. De eksisterer for at tilfredsstille en proces, ikke for at formidle indsigt. The Boutique Standard-rapport er anderledes i bade struktur og hensigt.",
      "Hver rapport er skrevet som et redaktionelt dokument - dybgaende analyse, struktureret narrativ, praecis observation. Den er designet til at blive laest fra start til slut, ikke skimmet for handlingspunkter. Indsigten sidder i detaljerne.",
      "Rapporten findes i to formater: en privat weboplevelse optimeret til skaermlaesning og en hojoplosnings-PDF. Begge indeholder det samme indhold. Webversionen er navigerbar og internt linket. PDF'en er formateret til arkivering og deling med dit team.",
    ],
  },
  sections: {
    label: "Rapportens indhold",
    heading: "Hvad en rapport indeholder",
    items: [
      {
        number: "01",
        title: "Udfoerende snapshot",
        description:
          "En enkelt-sides oversigt: den samlede alignment-score, de tre mest indflydelsesrige misalignments og den mest vaesentlige forbedringsmulighed.",
      },
      {
        number: "02",
        title: "Ejendomsprofil",
        description:
          "En vurdering af hotellets positionering, kommunikerede loefte og malrettede gaesteprofil - det udgangspunkt, som alt andet males mod.",
      },
      {
        number: "03",
        title: "Lofteanalyse",
        description:
          "En detaljeret evaluering af, hvad ejendommen kommunikerer pa tvaers af alle gaest-beroringsflader: hjemmeside, fotografier, beskrivelser, priser og offentlige materialer.",
      },
      {
        number: "04",
        title: "Forventningskortlaegning",
        description:
          "Dokumentation af, hvad en foerstegangsgaest rimeligt ville forvente baseret pa loefte, kategori og prisniveau - inden de ankommer.",
      },
      {
        number: "05",
        title: "Rejseetape-narrativer",
        description:
          "Udvidet narrativ rapportering om hvert trin i gaestens rejse - ankomst, vaerelse, dining, faciliteter, service, afrejse - med observationer og praecis analyse.",
      },
      {
        number: "06",
        title: "Oplevelsesscoring",
        description:
          "En granuleret score-opdeling pr. beroringsflader, vurderet mod loefte-forventnings-udgangspunktet. Ikke en generisk vurdering mod branchenormer - en relativ vurdering mod din egen standard.",
      },
      {
        number: "07",
        title: "Misaligneringsrapporten",
        description:
          "En praecis identifikation af hver vaesen-tlig kloeft mellem det lovede og det leverede, rangordnet efter gaestepaavirkning.",
      },
      {
        number: "08",
        title: "Erindringindeks",
        description:
          "En vurdering af, hvad en gaest sandsynligvis vil bevare og kommunikere efter afrejse - den staerkeste pradikator for mund-til-mund-omtale og tilbagekomst.",
      },
      {
        number: "09",
        title: "Mulighedsmatrix",
        description:
          "Prioriterede forbedringsmuligheder rangordnet efter potentiel gaestepaavirkning - ikke driftsmaessig lethed eller omkostning.",
      },
      {
        number: "10",
        title: "Servicekultureobservation",
        description:
          "Detaljeret narrativ om medarbejderinteraktioner, konsistens i servicelevering og kloeften - hvis nogen - mellem hotellets erklaerede servicefilosofi og dets faktiske praksis.",
      },
      {
        number: "11",
        title: "Digital og for-ankomst-vurdering",
        description:
          "Evaluering af den digitale rejse inden opholdet: hjemmesideoplevelse, bookinproces, bekraeftelseskommunikation og beroringsflader foer ankomst.",
      },
      {
        number: "12",
        title: "Kommunikation efter opholdet",
        description:
          "Vurdering af, hvordan ejendommen haandterer kommunikation i dagene efter afrejse og om det forstaerker eller underminerer den oplevelse gaesten havde.",
      },
      {
        number: "13",
        title: "Redaktionel konklusion",
        description:
          "En afsluttende, udscoret reflektion over ejendommes samlede karakter og om det opnar det, det sagte skabt for sine gaester.",
      },
    ],
  },
  caseStudy: {
    label: "Case-rapport",
    heading: "Maison du Rivage",
    body: "Den forste offentlige case-rapport fra The Boutique Standard. En kystbolig med 28 vaerel-ser pa den franske Riviera, evalueret pa tvaers af fjorten oplevelseselementer over et to-naetters ophold. Samlet alignment-score: 8,2. Primaert fund: ejendommen leverer ekstraordinaer atmosfaere og vaerelseskvalitet med identificerbar friktion ved ankomst og i kommunikation foer ankomst.",
    linkLabel: "Laes case-rapporten",
  },
  cta: {
    label: "Klar",
    heading: "Se, hvad et audit producerer for dit hotel.",
    body: "Hvert engagement begynder med en kort, uforpligtende henvendelse. Vi svarer inden for to arbejdsdage.",
    buttonLabel: "Anmod om et audit",
    buttonHref: "/request",
  },
};

export default content;
