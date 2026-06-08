/**
 * THE BOUTIQUE STANDARD
 * Design Tokens — v1.0
 *
 * Single source for all visual constants.
 * Used by: PDF engine (as CSS variables in HTML templates)
 *          Web engine (as CSS custom properties)
 *          Next.js (imported into globals.css)
 *
 * Aesthetic direction:
 * 40% Nine Orchard (authority, trust, hospitality credibility)
 * 35% Casablanca Paris (warmth, aspiration, emotion)
 * 25% Scandinavian/Japanese (restraint, whitespace, sophistication)
 */

export const tokens = {

  // ─── COLOR ─────────────────────────────────────────────────────────────────

  color: {
    // Backgrounds
    background: {
      primary:   "#F8F5F0",  // warm ivory — main page background
      secondary: "#F2EDE6",  // slightly deeper ivory — cards, sections
      tertiary:  "#EDE6DC",  // stone — subtle section differentiation
    },

    // Typography
    text: {
      primary:   "#1C1C1C",  // deep charcoal — headings, body
      secondary: "#4A4744",  // mid charcoal — secondary text
      muted:     "#9E9890",  // stone grey — captions, metadata
      inverse:   "#F8F5F0",  // ivory on dark backgrounds
    },

    // Accent
    accent: {
      riviera:   "#4A6FA5",  // French Riviera blue — primary accent
      rivieraLight: "#D4E0EF", // light blue — tints, backgrounds
      rivieraDark:  "#2C4A72", // dark blue — hover states
    },

    // Secondary accents
    secondary: {
      olive:     "#5C6B3E",  // deep olive
      bronze:    "#8B6F47",  // weathered bronze
      sand:      "#C4A882",  // warm sand
    },

    // Semantic
    border:      "#DDD8D0",  // default border
    borderLight: "#EAE5DC",  // subtle border
  },

  // ─── TYPOGRAPHY ────────────────────────────────────────────────────────────

  typography: {
    // Headline serif — editorial authority
    // Options: Canela, Editorial New, Freight Display, Playfair Display
    // Fall back to Georgia for PDF rendering
    fontSerif: "'Playfair Display', 'Editorial New', Georgia, serif",

    // Body sans — clean, invisible, professional
    // Options: Suisse Int'l, Inter, Neue Haas Grotesk
    fontSans: "'Suisse Intl', 'Inter', 'Helvetica Neue', Arial, sans-serif",

    // Scale
    scale: {
      display:  "clamp(3rem, 6vw, 5.5rem)",    // 48–88px — cover/hero
      h1:       "clamp(2.25rem, 4vw, 3.5rem)",  // 36–56px — section openers
      h2:       "clamp(1.5rem, 2.5vw, 2rem)",   // 24–32px — subsection headings
      h3:       "clamp(1.125rem, 1.5vw, 1.25rem)", // 18–20px — article headings
      body:     "1rem",                          // 16px
      small:    "0.875rem",                      // 14px — captions, metadata
      micro:    "0.75rem",                       // 12px — labels, tags
    },

    // Line heights
    leading: {
      tight:   1.15,   // display headings
      snug:    1.3,    // h1, h2
      normal:  1.6,    // h3, lead paragraphs
      relaxed: 1.75,   // body text
      loose:   2.0,    // pull quotes
    },

    // Letter spacing
    tracking: {
      tight:   "-0.02em",  // display headings
      normal:  "0",
      wide:    "0.08em",   // labels, metadata, all caps
      wider:   "0.15em",   // micro labels
    },

    // Weights
    weight: {
      light:   300,
      regular: 400,
      medium:  500,
      bold:    600,  // use sparingly
    },
  },

  // ─── SPACING ───────────────────────────────────────────────────────────────

  spacing: {
    // Page margins — generous, luxury pacing
    pagePadding: {
      x: "clamp(1.5rem, 8vw, 8rem)",
      y: "clamp(3rem, 8vh, 6rem)",
    },

    // Section spacing
    section: {
      sm:  "clamp(3rem, 6vh, 4rem)",
      md:  "clamp(5rem, 10vh, 7rem)",
      lg:  "clamp(7rem, 14vh, 10rem)",
      xl:  "clamp(9rem, 18vh, 14rem)",
    },

    // Component spacing
    component: {
      xs:  "0.25rem",
      sm:  "0.5rem",
      md:  "1rem",
      lg:  "1.5rem",
      xl:  "2.5rem",
      xxl: "4rem",
    },
  },

  // ─── LAYOUT ────────────────────────────────────────────────────────────────

  layout: {
    maxWidth:        "1280px",
    contentWidth:    "780px",   // editorial text column
    wideWidth:       "1040px",  // wider content, charts
    gridColumns:     12,
    gridGap:         "clamp(1rem, 2vw, 2rem)",
  },

  // ─── MOTION ────────────────────────────────────────────────────────────────

  motion: {
    // Slow, deliberate — never flashy
    duration: {
      fast:   "200ms",
      normal: "400ms",
      slow:   "700ms",
      reveal: "900ms",   // scroll-triggered reveals
    },
    easing: {
      default:  "cubic-bezier(0.4, 0, 0.2, 1)",
      entrance: "cubic-bezier(0.0, 0.0, 0.2, 1)",
      exit:     "cubic-bezier(0.4, 0.0, 1, 1)",
      elegant:  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  },

  // ─── PDF-SPECIFIC ──────────────────────────────────────────────────────────

  pdf: {
    pageWidth:   "210mm",   // A4
    pageHeight:  "297mm",
    marginOuter: "20mm",
    marginInner: "18mm",
    marginTop:   "18mm",
    marginBottom:"22mm",
    bleed:       "3mm",
    safeZone:    "5mm",
  },

} as const;

// CSS custom properties string — for injecting into HTML/CSS
export function toCSSVariables(): string {
  return `
    :root {
      --color-bg:             ${tokens.color.background.primary};
      --color-bg-secondary:   ${tokens.color.background.secondary};
      --color-bg-tertiary:    ${tokens.color.background.tertiary};
      --color-text:           ${tokens.color.text.primary};
      --color-text-secondary: ${tokens.color.text.secondary};
      --color-text-muted:     ${tokens.color.text.muted};
      --color-text-inverse:   ${tokens.color.text.inverse};
      --color-accent:         ${tokens.color.accent.riviera};
      --color-accent-light:   ${tokens.color.accent.rivieraLight};
      --color-accent-dark:    ${tokens.color.accent.rivieraDark};
      --color-olive:          ${tokens.color.secondary.olive};
      --color-bronze:         ${tokens.color.secondary.bronze};
      --color-border:         ${tokens.color.border};
      --color-border-light:   ${tokens.color.borderLight};
      --font-serif:           ${tokens.typography.fontSerif};
      --font-sans:            ${tokens.typography.fontSans};
      --leading-relaxed:      ${tokens.typography.leading.relaxed};
      --tracking-wide:        ${tokens.typography.tracking.wide};
    }
  `;
}
