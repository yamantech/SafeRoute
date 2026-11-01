# Early proof of concept — specification, not implementation

The user requires an early end-to-end demonstration but authorizes Phase 1 only
and forbids scaffolding until review. This document moves the proof to the first
approved implementation slice; no database writes or map application occurred yet.

## Prerequisites

1. One real report with documented permitted collection/storage/display terms.
2. Approved runtime network access; successful raw source retrieval.
3. A MongoDB connection and permission to use a development database.
4. Reviewed location/reference geometry (not an inferred precise point).
5. Browser access to map styles/tiles and required attribution.

Preferred input is a permitted corridor news/official feed item. If permission is
unresolved, a consenting community contributor can supply a genuine observation;
that tests the data/display path but DOES NOT complete the external-monitoring gate.
A historical permitted item is acceptable if clearly labeled historical. Synthetic
data can test failure cases, never substitute for the real-report success criterion.

## Proposed files once implementation is authorized

- Root/client/server/shared package manifests, TypeScript configuration and Vite
  setup: minimum scaffold from approved Phase 2.
- server/src/config/database.ts
- server/src/modules/sources/SourceObservation.model.ts
- server/src/adapters/sources/approved-source.adapter.ts (rename for actual source)
- server/src/jobs/collect-once.ts
- server/src/modules/incidents/incident.routes.ts
- shared/src/incident.schema.ts
- client/src/styles/tokens.css and base.css
- client/src/features/map/MapPage.tsx, MapCanvas.tsx, IncidentList.tsx
- server/tests/ingestion.test.ts and e2e/incident-proof.spec.ts

## Demonstration and pass conditions

Run one bounded collection; validate source identifier, timestamps, source URL,
category and location/review status. Persist the record in real MongoDB, with a
spatial index where geometry exists. Re-fetch through Express after a process
restart to prove persistence. Show the same record on MapLibre and the list with
source, publication time or explicit unknown, detection time, and verification.
UI label must not imply moderator approval when none occurred.

Collect the same item twice: one observation remains; fetchedAt may change but
publishedAt/detectedAt/confirmation must not be fabricated or reset. Inject an
ambiguous location: hold it for review and exclude it from direct-impact geometry.
Simulate a source error: expose failure without injecting live-looking fixture data.

Record test output and screenshot evidence, source access basis, original ID,
database result, and visible metadata. No secrets or full copyrighted articles in
evidence logs. Do not claim this proof ran before these steps actually succeed.
