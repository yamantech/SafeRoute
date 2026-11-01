# Phase 1 findings — review requested

Reviewed 2026-11-01. Phase 1 only: no application scaffold, package installs,
database writes, collector, or running MapLibre application has been created.

## Decisions and deliverables

- Proposed pilot: Narayangadh–Muglin, one driving profile; precise endpoints and
  centerline need verification. Broader coverage is deferred, not promised.
- Initial source target: one permitted news feed and one official announcement
  channel, plus community reporting and supplementary BIPAD synchronization.
- MapLibre/OpenFreeMap is a practical basemap candidate; openrouteservice is the
  routing candidate subject to a key and actual Nepal-route test.
- Use TypeScript modular monolith, MongoDB evidence storage, reviewed geolocation,
  versioned rules, and a small scheduled process. See architecture.md.
- Move the single-report end-to-end proof to the first implementation slice after
  approval, before broad feature work. See early-proof-of-concept.md.
- All ten features, Hallmark map-first direction, Tailwind, and continuous tests
  remain intact. See acceptance-criteria.md and ../design.md.

## Evidence versus unresolved gates

| Check | Outcome |
| --- | --- |
| Workspace and instructions | Read AGENTS.md, installed Hallmark SKILL.md and flow.md. No application manifest/scaffold present. |
| Runtime | Node v24.22.1; Google Chrome executable present. No mongod/mongosh found on PATH. No server/browser started. |
| News feed | Publisher RSS readable through web tool; raw backend fetch fails DNS. Permission for intended storage/display not established. |
| Official information | DoR page readable; no supported permitted automation contract validated. Traffic Police timed out. |
| BIPAD | Current root request timed out through web tool; local highway request fails DNS. No live schema/freshness validation. |
| Map service | Official MapLibre integration/public-service documentation verified; actual pilot rendering untested. |
| Routing | Directions/API-key requirement documented; no key or live pilot route validated. |
| Geolocation | Desk review identifies repeated names, historical records, and multi-road articles; no surveyed points, downloaded centerline, or numerical matching test completed. |
| Early proof | Specified, not built; respects instruction against scaffolding before review. |

## Required decisions before enabling integrations

1. Accept proposed pilot or choose another corridor.
2. Obtain a documented permitted source (feed-use terms or explicit permission).
   No external outreach has been sent. A real consenting community report can
   unblock the persistence/display proof but not the external-monitoring criterion.
3. Restore source DNS/connectivity in the approved execution/deployment environment;
   confirm successful bounded raw requests, not only web-tool access.
4. Select a development MongoDB instance and supply credentials securely at the
   implementation stage. Do not paste secrets in documentation or chat.
5. Obtain routing access and review centerline/locations; keep unreviewed observations
   out of confirmed road-impact assessments.

Phase 1 documentation is ready for review; integration readiness is conditional.
Do not report "all integrations validated". Research example dates are historical,
not live warnings. Detailed links, exact failed commands, and permission states are
in source-register.md; location cases are in pilot-and-geolocation.md.

Next authorized action must follow the user's Phase 1 review. No Phase 2 work has
started. Proposed next milestone is the minimal TypeScript scaffold plus a single
permitted-report vertical slice, with real MongoDB and MapLibre evidence.
