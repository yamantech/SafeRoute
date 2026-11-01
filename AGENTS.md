# SafeRoute Nepal — Project Instructions

## Purpose and specification precedence

SafeRoute Nepal is a web-based BIT final-year project for a single student. It
provides location-specific, evidence-based road-disruption advisories for Nepal.
Prefer understandable, maintainable implementations over technical spectacle.

Project specification precedence:
1. Latest explicit user-approved decisions.
2. `SafeRoute_Nepal_Defense.pptx` (primary specification).
3. `SafeRoute Nepal.pdf` and
   `MERN-Stack Final-Year Project Opportunities for a BIT Student in Nepal.pdf`
   (supporting research only).

Defense slides 4–5 specify ten features; slide 6 describes the technology stack.
The user explicitly replaced defense Feature #2, originally BIPAD Integration,
with the requirement below. The other nine features remain required.
The proposal PDF, pp. 8–9, labels offline reporting and alternative routes as
advanced; this does not override their required status in the defense.
Research estimates, example incidents, and illustrative counts are not verified
live facts. Preserve the original research documents without editing them.

## All ten required features

1. **Interactive Nepal Map:** MapLibre map, filters, incident details, provenance,
   and a usable list alternative.
2. **Internet-First Location-Based Road Disruption Monitoring:** selected permitted
   internet sources and community observations first, with BIPAD fallback and
   ongoing supplementary background synchronization; see the detailed rules below.
3. **Road Reporting:** location, category, observation time, description, and
   optional supporting photo.
4. **Alternative Route Suggestion:** compare available routing-provider candidates
   using reported incidents and their evidence; explain limitations.
5. **Community Verification:** confirmation/dispute with supporting context,
   one current vote per user/report, no self-verification, and moderator oversight.
6. **Automatic Report Expiry:** stop treating expired observations as current;
   preserve history and never equate expiry with road clearance.
7. **Route Risk Checker:** spatially match relevant incidents to a selected route.
8. **Risk Explanation:** explain Low, Moderate, High, and Severe reported-risk
   levels; support insufficient information instead of inventing a risk level.
9. **Moderator Dashboard:** review reports, evidence, locations, duplicates,
   disputes, and resolution decisions with an audit trail.
10. **Offline Reporting:** persistent local drafts/outbox and reliable subsequent
    synchronization, with retry and visible submission states.

Never silently remove or demote a defense feature. Phase ordering is not a scope
reduction. Notifications, reputation systems, machine learning, and extensive
analytics are not required additions unless separately approved.

## Feature #2: collection, fallback, and evidence

- Collect and normalize selected permitted feeds, news sources, official traffic
  announcements, and community submissions into MongoDB. Do not search the whole
  internet during each user request. Process community reports on receipt.
- For location/route queries, prioritize relevant recent internet/community
  observations. When absent, evaluate applicable synchronized BIPAD records.
- Synchronize BIPAD periodically, and let it supplement/corroborate incidents
  even when primary observations exist. BIPAD is not the primary early-warning
  dependency. A failed BIPAD request must not block other-source results.
- Query cached BIPAD records by default. An overdue sync can trigger a bounded
  background refresh; disclose stale/unavailable source status.
- Internet-first is retrieval/presentation priority, not automatic credibility.
  Preserve contradictions instead of silently replacing one source with another.
- If no relevant recent evidence exists, show exactly:
  **"No recent incident information found"**. This does not mean the road is safe.
  Distinguish an empty successful search from failed source collection.
- Do not assume APIs, scraping permission, complete coverage, real-time updates,
  or a fixed BIPAD publication delay. The roughly one-day delay is a reported
  concern, not an established universal fact.
- Validate each source's access method, terms, attribution, permitted storage,
  rate limits, and publication behavior. Prefer documented APIs and permitted
  RSS/Atom feeds; use source-specific extraction only when allowed. Manual
  moderator entry is a fallback, not proof of completed automated monitoring.
- Use configured source hosts, bounded responses, timeouts, backoff, checkpoints,
  and collection logs. Do not fetch arbitrary user URLs or bypass access controls.

Keep an **observation** (a source claim) separate from an **incident** (the event
that several observations may describe). Preserve source IDs/URLs and provenance.
Detect exact duplicates idempotently; suggest uncertain incident merges for review.
Several publishers repeating one announcement are not independent corroboration.

Each incident's evidence must expose location/precision, category, original
source, publication time (or explicitly unknown), detection time, event/observation
time when known, last confirmation time when supported, and verification status.
Community submissions use submission time and separately retain observation time.
Collection/republication does not refresh an event or confirm road conditions.
Moderator review is not proof of a physical inspection.

Keep road-condition status, freshness, verification, and source health separate.
Unresolved locations must not become invented precise pins or route impacts.
Expired evidence does not prove reopening; retain unresolved/stale context.

## Stack and architecture constraints

- Frontend: React, TypeScript, Vite, Tailwind CSS.
- Map: MapLibre GL JS, separately configured tile/style provider with attribution.
- Backend: Node.js, Express, TypeScript, modular REST APIs under `/api/v1`.
- Database: MongoDB with Mongoose, GeoJSON, and `2dsphere` indexes.
- Structure: `client/`, `server/`, and a small `shared/` contract/schema workspace.
- Use a modular monolith and a small scheduled-job process sharing backend logic.
  Scheduled collection needs an actually running worker/scheduler, not a timer
  assumed to operate while its host sleeps.
- Separate source, routing, geocoding, and media-storage adapters. Verify provider
  access, Nepal behavior, quotas, and current terms before committing integrations.
- Use server-side, explainable, versioned risk rules and runtime validation.
  TypeScript types alone do not validate external data.
- Model users/sessions, road reports, verifications, sources, source observations,
  incidents, moderation actions, and collection runs. BIPAD can use the common
  observation model while retaining its source identifiers.
- Keep photos in suitable object storage, with validated uploads and bounded size;
  MongoDB stores references/metadata. Minimize identity/location retention.
- Public users can browse/check routes. Reporting and voting require accounts.
  Enforce user/moderator/admin roles, ownership, password hashing, protected
  sessions, rate limits, and audit records on the server.
- Prefer necessary, narrowly scoped dependencies. React Router, TanStack Query,
  React Hook Form, Zod, selected Turf functions, IndexedDB helpers, and Vite PWA
  tooling are appropriate when their functionality is implemented.
- No Next.js, NestJS, major UI framework, microservices, Redis/queue platform,
  or other major architectural replacement without explicit user approval.

## Route assessment and offline invariants

Use a routing service for road-following candidates; MongoDB is not a routing
engine. Distinguish spatial proximity from evidence of impact on the road.
Compare alternatives against the same evidence snapshot and rules. Handle one
candidate, no routes, disputed evidence, and insufficient coverage explicitly.
Say "lower reported risk among available routes" only when supported; never
claim "safest" or guaranteed safety. Missing reports must not imply Low risk.
Do not dilute a credible closure by averaging unrelated minor observations.
Keep severe unverified claims visible as unverified warnings.

Use IndexedDB for offline drafts and bounded photo blobs. Persist stable client
submission IDs and enforce server-side idempotency. Preserve observation time
during upload. Provide queued/uploading/failed/synced states, automatic retry when
supported, manual retry, authentication recovery, and storage-failure feedback.
Do not guarantee closed-browser background sync on every browser or infer offline
map downloads/routing from the offline-reporting requirement.

## Hallmark design baseline

Use `.agents/skills/hallmark/SKILL.md` (installed v2.0.0) as the design/quality guide.
Read `references/flow.md`, particularly Harnesses and App screens, before UI work.
Read further applicable references when implementing the relevant components.
User-approved architecture, content, and scope take precedence over skill defaults.

The approved direction is a calm, restrained, professional, Nepal-focused,
map-first workspace. Desktop uses a compact top navigation and adjoining
search/route/evidence panel; mobile provides map/list switching and accessible
collapsible detail panels. Evidence stays connected to the selected route/marker.

Hallmark **app scope** applies: no marketing hero, screen word budget, section
rhythm, stand-in photographs, or reveal-on-load is required. Preserve essential
evidence instead of removing it to satisfy marketing conventions.

- Use semantic color/font tokens integrated with Tailwind; no scattered literal
  colors. Coordinate application and map-overlay meanings.
- Approved direction: warm neutral backgrounds, white surfaces, charcoal text,
  restrained blue actions, readable sans-serif and Devanagari fallback. Exact
  tokens/font choices require implementation validation, not assumed approval.
- Keep risk bands distinct from verification/freshness/road-condition labels.
  Use text and symbols as well as color; avoid green "safe route" signals.
- Use sentence-case labels, consistent spacing, modest radii, and minimal depth.
  Avoid decorative dashboards, invented figures, testimonials, excessive cards,
  gradients, emoji icons, and unnecessary animation/dependencies.
- Provide keyboard access, instant visible focus, readable contrast, roughly
  44px touch targets, reduced-motion behavior, and a map-independent incident list.
- Implement loading, empty, error, and populated states for data regions, plus
  stale/offline/disputed/insufficient-information states where applicable.
- Preserve filters/tabs/pagination in the URL where useful; do not expose precise
  personal journeys unnecessarily. Confirm or undo destructive actions.
- Follow Hallmark's applicable token/stamp and review conventions. Use app-scope
  linting against the running Vite route, e.g. `sloplint.mjs ... --scope app
  --render --url ...`. Never claim render/static checks ran when unavailable.
- In the Codex harness, Hallmark's fresh-context review runs in-thread as specified
  by its Harnesses guidance. Do not introduce delegation for ordinary work.

## Workflow and validation

Inspect applicable instructions, current files, and existing changes before edits.
Preserve user work, research files, installed skills, and unrelated configuration.
Present concrete files and milestones before implementing an approved phase.
Continue routine work within an authorized phase without repeated permission asks.
Pause when the user explicitly requests roadmap/phase approval.

Do not bypass sandbox controls. Report exact commands/errors when execution or
document extraction fails; do not claim inspection succeeded without evidence.
Never expose secrets or treat fixture data as current observations. Clearly label
synthetic/historical demo data and distinguish recommendations from verified facts.

Run checks appropriate to the change: TypeScript/build, rule and spatial tests,
API authorization and ingestion idempotency, duplicate/source-independence cases,
expiry/fallback semantics, route comparison, offline retry, and browser workflows.
Evaluate mobile/accessibility and Hallmark app-scope checks for UI work.
Record limitations and a reproducible demonstration fallback. External-service
outages must not be silently converted into live-looking synthetic results.

## Current checkpoint

The roadmap is approved with refinements: start with one pilot corridor and a
small permitted source set; validate geolocation and road matching early; deliver
a single permitted-report -> MongoDB -> MapLibre proof before broad expansion;
test continuously. Ambiguous locations must not become confirmed road hazards.

Only Phase 1 (feasibility, architecture, design baseline, and acceptance documents)
is currently authorized. No application scaffold exists. Present Phase 1 findings
for review before Phase 2 or application implementation. The early end-to-end
proof is specified in `docs/early-proof-of-concept.md`, not yet implemented.
See `docs/phase-1-findings.md` for evidence, unresolved integration gates, and the
proposed pilot. Update this checkpoint with later explicit authorization.
