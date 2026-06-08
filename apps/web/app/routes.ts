/**
 * THE BOUTIQUE STANDARD — Route Map
 * apps/web/app/
 *
 * PUBLIC ROUTES (no auth)
 * ────────────────────────────────────────────────────────────
 * /                              → Home
 * /about                         → Philosophy / Why we exist
 * /audit                         → Service page — what an audit is
 * /request                       → Audit enquiry form (multi-step)
 * /report                        → Case report index (public showcase)
 * /report/[slug]                 → Individual case report (editorial, curated)
 * /journal                       → Journal hub
 * /journal/[category]            → Category listing
 * /journal/[category]/[slug]     → Individual article
 *
 * CLIENT ROUTES (password-protected)
 * ────────────────────────────────────────────────────────────
 * /client/[token]/report         → Full interactive web report (~20 sections)
 *
 * ROUTE GROUPS
 * ────────────────────────────────────────────────────────────
 * (public)/   → all public routes, shared public layout
 * (client)/   → client-only routes, separate layout with auth check
 *
 * FUTURE ROUTES (not built yet)
 * ────────────────────────────────────────────────────────────
 * /guide                         → Annual boutique hotel guide
 * /recognition                   → Recognition program
 * /benchmark                     → Industry benchmark index
 * /api/request                   → Form submission endpoint
 * /api/report/[token]            → Report data API (for client access)
 */
