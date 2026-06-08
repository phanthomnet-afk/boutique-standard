import type { AuditPageContent } from "../types";

const content: AuditPageContent = {
  meta: {
    title: "Audit - The Boutique Standard",
    description: "Et gaesteoplevelsesaudit for boutiquehoteller. En fuld rapport.",
  },
  hero: {
    eyebrow: "The Boutique Standard Audit",
    headline: "Det dine gaester oplever.",
    body: "En struktureret evaluering af den komplette gaesteoplevelse. Leveret som en redaktionel analyserapport.",
    ctaPrimary: { label: "Anmod om et audit", href: "/request" },
    imageAlt: "Stenkorridor med eftermiddagslys",
  },
  valueProps: {
    label: "Hvorfor dette audit",
    items: [
      {
        number: "01",
        statement: "Du ser dit hotel hver dag. Dine gaester ser det kun en gang.",
        body: "Afstand afslorer, hvad fortrolighed skjuler. En foerstegangsgaest laegger maerke til det, dit team holdt op med at se for mange aar siden.",
      },
      {
        number: "02",
        statement: "Intention og oplevelse er sjaeldent det samme.",
        body: "Kloeften mellem det, en ejendom stiler mod at levere, og det en gaest faktisk modtager, er der, de fleste muligheder lever. Det er ogsa der, de fleste tab opstaer.",
      },
      {
        number: "03",
        statement: "Det gaester husker seks maneder senere paavirker dine bookinger mere end nogen anmeldelse fra i forgaars.",
        body: "Tilfredshed forsvinder. Erindring bliver. Rapporten identificerer, hvilke ojeblikke gaester baerer med sig, og hvilke de stille glemmer.",
      },
      {
        number: "04",
        statement: "At vide, hvad man skal beskytte, er ligesat vaerdifuldt som at vide, hvad man skal forbedre.",
        body: "Enhver ejendom har egenskaber, der definerer dens karakter. Auditet navngiver dem eksplicit, saa de ikke fortabes til vaekst, pres eller velmenende forandring.",
      },
    ],
  },
  methodology: {
    label: "Hvordan vi evaluerer",
    headline: "Mod dit loefte. Ikke branchen.",
    body: [
      "Vi evaluerer en ting: om den oplevelse din ejendom leverer, matcher den oplevelse den kommunikerer.",
      "Ikke mod et branchegennemsnit. Ikke mod konkurrenter. Mod din egen standard - din positionering, dine fotografier, dit prisniveau, dine ord.",
    ],
    pillars: [
      {
        number: "01",
        label: "Loefte",
        description: "Hvad din ejendom kommunikerer til potentielle gaester.",
      },
      {
        number: "02",
        label: "Forventning",
        description: "Hvad en gaest rimeligt antager, inden de ankommer.",
      },
      {
        number: "03",
        label: "Oplevelse",
        description: "Hvad der faktisk sker pa tvaers af alle beroringsflader.",
      },
      {
        number: "04",
        label: "Erindring",
        description: "Hvad gaesten baerer med sig efter afrejse.",
      },
    ],
  },
  process: {
    label: "Processen",
    heading: "Simpel. Stringent. Gentagelig.",
    steps: [
      {
        number: "01",
        title: "Tilpasning",
        description: "Vi aftaler opholdets varighed, dining-lejligheder og eventuelle specifikke fokusomraader, inden noget bekraeftes.",
      },
      {
        number: "02",
        title: "Opholdet",
        description: "Vi oplever din ejendom som en standard foerstegangsgaest. Hvert beroringsflader evalueret mod det strukturerede framework.",
      },
      {
        number: "03",
        title: "Rapporten",
        description: "Den fulde 13-sektions analyserapport leveret inden for 14 dage. Skrevet som narrativ. Designet til at blive laest.",
      },
      {
        number: "04",
        title: "Levering",
        description: "En privat webrapport med din unikke URL. En downloadbar PDF. En debriefsamtale paa foresporgsel.",
      },
    ],
  },
  scope: {
    label: "Omfang",
    heading: "Altid den fulde rapport.",
    body: "Hvert engagement producerer den samme 13-sektions rapport. Det, der varierer, er opholdets omfang - aftalt foer bekraeftelse, ikke efter.",
    options: [
      {
        title: "Enkeltophold",
        description: "Standardengagementet. Et ophold, typisk to naetter. Den komplette gaesteoplevelse.",
        includes: [
          "Minimum to naetter",
          "Ankomst til afrejse",
          "En morgenmad, en middag",
          "Fuldt vaerelse og faciliteter",
          "Servicekultur gennem hele opholdet",
        ],
      },
      {
        title: "Fokuseret ophold",
        description: "En nat. Tre til fem aftalte dimensioner evalueret i dybden.",
        includes: [
          "En nat",
          "Tre til fem fokusomraader",
          "Dybere narrativ pr. dimension",
          "Fuld 13-sektions rapport produceret",
        ],
      },
      {
        title: "Udvidet ophold",
        description: "Til ejendomme, hvor et enkelt besog ikke kan fange det fulde billede.",
        includes: [
          "To eller flere besog",
          "Flere dining-lejligheder",
          "For-ankomst-oplevelse i dybden",
          "Saesonsammenlaegning, hvor relevant",
        ],
      },
    ],
    addOnsLabel: "Yderligere moduler",
    addOnsNote: "Tilgaengelig paa ethvert engagement.",
    addOns: [
      "Digital for-ankomst-audit",
      "Evaluering af opfolgning efter opholdet",
      "Konkurrentsammenligning",
      "Returnbesog efter 90 dage",
    ],
  },
  deliverables: {
    label: "Hvad du modtager",
    heading: "En rapport. Leveret to veje.",
    items: [
      {
        title: "Privat webrapport",
        description: "Adgangskodebeskyttet. Din unikke URL. Navigerbar efter sektion. Delbar internt.",
      },
      {
        title: "PDF",
        description: "Klar til print. Formateret til ejere, investorer og ledelsesteams.",
      },
      {
        title: "13 sektioner",
        description: "Fra udfoerende snapshot til redaktionel konklusion. Fuld narrativ gennemgaaende.",
      },
      {
        title: "Debrief",
        description: "En samtale efter levering. Inkluderet paa foresporgsel.",
      },
    ],
  },
  pricing: {
    label: "Investering",
    heading: "Et honorar. Intet skjult.",
    body: "Investeringen daekker hele engagementet: tilpasning, opholdet, al rejse og overnatning, rapportproduktion og levering.",
    priceDisplay: true,
    stages: [
      {
        label: "Ved bekraeftelse",
        description: "Halvtreds procent bekraefter engagementet og daekker rejse, overnatning og dining under opholdet.",
      },
      {
        label: "Ved levering",
        description: "Halvtreds procent ved levering af den faerdige rapport. Ingen rapport, ingen anden betaling.",
      },
    ],
    note: "Den endelige investering aftales foer engagement baseret paa ejendommens beliggenhed og opholdets omfang. Fra den offentliggjorte sats.",
  },
  faq: {
    heading: "Almindelige spoergsmaal",
    items: [
      {
        question: "Ved nogen paa ejendommen det?",
        answer: "Nej. Vi bor som en standard betalende gaest, booket via dine normale kanaler. Rapportens integritet afhaenger af det.",
      },
      {
        question: "Hvor lang tid tager rapporten?",
        answer: "Leveret inden for 14 dage efter opholdet. Naejagtig tidsplan bekraeftet ved engagement.",
      },
      {
        question: "Hvem modtager rapporten?",
        answer: "En navngiven kontakt - typisk ejeren eller direktoren. Vi offentliggor, diskuterer eller refererer ikke til nogen rapport uden skriftlig tilladelse.",
      },
      {
        question: "Kan vi angive fokusomraader?",
        answer: "Ja. Tilpasning er en del af engagementet. Fortael os, hvor du har spoergsmaal, og vi sikrer, at auditet adresserer dem.",
      },
      {
        question: "Hvad sker der efter levering?",
        answer: "En debriefsamtale, inkluderet paa foresporgsel. Vi tilbyder ikke raadgivning eller implementeringsstoette. Vi holder kontakten.",
      },
      {
        question: "Hvor arbejder I?",
        answer: "Primaert Skandinavien, Frankrig og Middelhavet. Beliggenheden paavirker investeringsniveauet.",
      },
    ],
  },
  reviews: {
    label: "Fra praksis",
    items: [
      {
        quote: "Rapporten viste os ting, vi var holdt op med at laegge maerke til. Ikke fordi de var skjulte - men fordi vi havde vaeret for taet paa dem i for lang tid.",
        attribution: "Ejer, 4-stjernet boutiquehotel, Sydfrankrig",
      },
      {
        quote: "Afrejsesektionen alene var investeringen vaerd.",
        attribution: "Direktoer, kystresort, Danmark",
      },
      {
        quote: "Vi brugte den i en bestyrelsesproesentation tre maneder senere. Formatet gor resultaterne umulige at afvise.",
        attribution: "Ejer-operatoer, designhotel, Kobenhavn",
      },
    ],
  },
  cta: {
    label: "Begynd",
    heading: "Se din ejendom tydeligt.",
    body: "Foresporgsel tager fem minutter.",
    buttonLabel: "Anmod om et audit",
    buttonHref: "/request",
  },
};

export default content;
