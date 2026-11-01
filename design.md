# SafeRoute Nepal design baseline

Approved direction recorded during Phase 1; no UI or render validation exists yet.
Preserve React/TypeScript/Vite/Tailwind and MapLibre; backend remains Express/MongoDB.

Use installed Hallmark in app scope, reading SKILL.md and flow.md Harnesses/App
screens. The user-approved map-first workspace overrides marketing-page defaults.
No hero, stock photography, decorative KPI dashboard, or reveal-on-load.

Desktop: compact top navigation, adjoining search/route/evidence panel, remaining
space for the map. Mobile: explicit Map/List switching, accessible collapsible
incident panel, full-screen evidence/form pages when needed. Signature interaction:
select an incident and see its route location and supporting evidence together.

Use warm neutral background, white surfaces, charcoal text, restrained blue primary
actions, and a readable system sans with tested Devanagari fallback. Colors/fonts
must use semantic tokens through Tailwind. Exact values and contrast remain to be
tested during UI implementation. Body text approximately 16px, modest radii,
consistent spacing, minimal shadow. Risk indicators combine text/symbol/color;
never green "safe" signals. Verification/freshness/condition are separate labels.

Use centered, bounded desktop layout, narrow reading/forms, responsive map space,
visible attribution, immediate focus, keyboard access, roughly 44px touch targets,
reduced motion, and accessible list alternative. Include loading/empty/error/full
states and stale/offline/disputed/insufficient-information states. Use Nepal time
with absolute timestamps available. Never substitute collection age for event age.

Hallmark implementation will use the required app-scope stamp/token conventions
and static/render checks against Vite. No theme was dealt or rendering claimed in
Phase 1. This records approved design decisions, not a fabricated lint pass.
