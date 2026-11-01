# Acceptance criteria and continuous validation

Status: planned checks unless explicitly marked observed in phase-1-findings.md.
No application test suite exists yet; no automated integration pass is claimed.

| ID | Feature / requirement | Acceptance condition |
| --- | --- | --- |
| F1 | Interactive map | Pilot map and list share selection; attribution visible; keyboard/list access; loading, empty, failed, and populated states. |
| F2a | Monitoring | At least one permitted external collector executes periodically with bounded retries and recorded source health. Manual entry alone does not pass. |
| F2b | Primary and fallback | Relevant recent internet/community evidence is prioritized; BIPAD fills absence and supplements existing records; stale/source-failure cases remain distinguishable. |
| F2c | Provenance and duplicates | Source/time/category/location precision/status retained; repeated fetch does not duplicate or renew evidence; syndicated stories do not count as independent confirmations. |
| F2d | Location | Ambiguous names, unsupported coordinates and unrelated nearby roads are not promoted to confirmed road hazards. Complete pilot-and-geolocation.md test set before automatic matching. |
| F3 | Reports | Valid report submits; missing required fields show errors; photo size/type limits and ownership enforced; observedAt retained. |
| F4 | Alternatives | Provider candidates compared using one evidence snapshot; distance/duration and coverage shown; no alternative and all-routes-disrupted results supported. |
| F5 | Verification | One current vote per report/user; self-verification blocked; confirm/dispute changes audited appropriately. |
| F6 | Expiry | Query-time validity excludes stale current evidence even if worker is late; history retained; expiry does not set reopened status. |
| F7 | Route checker | Reviewed road geometry matched to route corridor; nearby off-road context separated; coordinate order/units and boundary cases tested. |
| F8 | Explanation | Four rule-based bands with evidence and rule version; insufficient evidence never becomes Low automatically; exact empty message shown. |
| F9 | Moderation | Authorized review/correction/merge/resolution only; before/after and reasons recorded; review does not masquerade as physical inspection. |
| F10 | Offline | Draft survives reload; repeated upload produces one report; expired session preserves draft; manual retry and storage failure states tested. |

## Stage gates

- Before scaffolding: review Phase 1 findings and unresolved provider/source gates.
- First implementation slice: all early-proof-of-concept.md success conditions,
  ingestion validation, ambiguity negative case, and persisted-data retrieval.
- Reporting phase: API permission/ownership, vote uniqueness, expiry transitions.
- Monitoring phase: permission registry, parser samples, retractions/reopenings,
  multi-location extraction, duplicate lineage, stale-source and fallback tests.
- Routing phase: reviewed geometry set, same-road/nearby-road negatives, closure
  overrides, uncertain evidence, no alternatives, and out-of-coverage candidates.
- Offline phase: reload/reconnect/auth-expiry/double-retry/storage-error scenarios.
- Every UI phase: TypeScript/build and relevant browser checks; Hallmark app-scope
  static/render checks where available, focus, contrast, 320px/mobile and desktop
  layout, text zoom, Devanagari rendering, reduced motion, list/map parity.

Keep synthetic test cases explicitly labeled. Use Vitest/Supertest/Playwright only
when the corresponding implemented layer needs them. Do not write implementation-
mirroring tests. Store test outcomes with dataset size and environment; measure
timeliness/response times rather than inventing performance or safety claims.

## Phase 1 feasibility decision

Documentation/review can finish with explicit open gates. Implementation readiness
is conditional on runtime source connectivity, permitted real-report input,
MongoDB availability, and geometry review. Candidate-route integration separately
requires an authorized routing key and successful pilot request. The early map
proof can precede route generation, but cannot count as F4/F7/F8 completion.
