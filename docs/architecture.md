# Architecture decision record — Phase 1

Status: proposed for Phase 1 review; no application implementation exists.
Scope: all ten features in ../AGENTS.md, one pilot corridor, small source set.

## Components

React + TypeScript + Vite + Tailwind renders the map/list workspace. MapLibre
loads a configurable basemap and GeoJSON incident layer. Native fetch calls a
modular Express + TypeScript REST API. MongoDB/Mongoose stores normalized data.
A small scheduled process shares source adapters and services with Express.
Use npm workspaces for client/, server/, shared/; no additional major framework.

Flow: approved source -> bounded collector -> validated source observation ->
location/duplicate review -> incident association -> MongoDB spatial query ->
Express response -> MapLibre and accessible evidence list.
Community reports enter the same incident-association process; BIPAD is a separate
adapter in this pipeline, not a blocking dependency for primary collection.

## Data and retrieval contracts

Source: approved method/host, access evidence, enabled status, interval, checkpoint.
SourceObservation: external identity, attribution, original text fields as permitted,
publishedAt/precision, eventAt, detectedAt, fetchedAt, lastConfirmedAt/evidence,
category, original/normalized location, review status, incidentId, source lineage.
Incident: category, road/geometry, operational status, freshness, evidence summary.
RoadReport: user, geometry/accuracy, observation time, description/media, state,
clientSubmissionId, incidentId. Verification: report/user unique pair and vote.
ModerationAction and CollectionRun preserve audit and source-health evidence.
User/Session support public reads and protected submission/moderation.

Use unique source/resource/external-ID keys and reporter/clientSubmissionId keys.
Use 2dsphere geometry indexes plus time/status indexes; reject malformed geometry.
Missing locations remain absent rather than fabricated coordinates.

Location/route search reads cached evidence. Select recent relevant internet and
community observations first. If absent, evaluate relevant BIPAD observations.
Always attach useful BIPAD corroboration/conflicts. No source preference overrides
contradictory evidence. Report source coverage and last successful collection.
Old official records remain explicitly historical; they do not fill a "recent"
result deceptively. If collection fails, return uncertainty alongside cached data.
No recent evidence -> "No recent incident information found", not a Low band.

Freshness is category-specific and based on event/observation/publication evidence,
not retrieval time. Initial durations require supervisor review and versioning.
Expiry filters apply at query time even if a job is late; retain audit history.
Reopening requires an explicit update and does not certify an entire route.

## API boundaries

- GET /api/v1/incidents?bbox=... and GET /incidents/:id: bounded public evidence.
- GET /api/v1/data-status: sanitized source coverage/health.
- POST /api/v1/routes/evaluate: validated OD/profile -> available candidates,
  matched incident evidence, risk explanation, and coverage limitations.
- POST/PATCH /api/v1/reports and PUT /reports/:id/verification: protected workflow.
- /api/v1/auth/*: account/session lifecycle.
- /api/v1/moderation/*: audited decisions, location correction, merges.
- /api/v1/admin/sources and /collection-runs: source configuration/diagnostics.

## Assessment, offline, and deployment

Routing provider generates road-following geometry; Turf functions construct
candidate buffers and measure geometry. MongoDB retrieves candidates; reviewed
road relevance and versioned rule tables determine the advisory. Return reasons
and evidence rather than an unsupported probability. Use one evidence snapshot
for alternatives, and separate unknown coverage from observed risk.

IndexedDB stores drafts/photo blobs and an explicit outbox; stable client IDs
make retries idempotent. Preserve observedAt through offline upload. PWA shell
caching and foreground/manual retries are required; background sync is optional
browser capability, not universal delivery assurance. No map-prefetch assumption.

The early proof needs only React/Vite/TypeScript/Tailwind, MapLibre, Express,
Mongoose, runtime validation, and a parser only for the approved source format.
Add form/query/routing/PWA helpers when their actual features arrive. Use Node
utilities before adding an HTTP client, queue, or scheduler platform.

Use HTTPS, server-side credentials, bounded queries/uploads, role/ownership checks,
hashed passwords and protected sessions. Store photos outside MongoDB. Avoid
persisting journeys by default. Worker must run on an active host; deployment
pricing/quotas and storage choices are still unselected. Do not publish a site or
create paid resources as part of Phase 1.

## Early delivery adjustment

After review and explicit implementation approval, do the minimal foundation plus
one permitted observation -> MongoDB -> read API -> MapLibre vertical slice FIRST,
before full account/reporting/moderation expansion. See early-proof-of-concept.md.
Test normalization/idempotency, timestamps, and ambiguous-location exclusion in
that slice, then expand to the remaining roadmap. None of the ten features is cut.
