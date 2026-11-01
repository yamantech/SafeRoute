# Pilot and geolocation validation

## Proposed pilot: Narayangadh–Muglin corridor

Use the road connecting Narayangadh and Muglin as the initial monitored corridor,
with one driving profile. Do not include all Kathmandu–Pokhara roads at launch.
An official [DoR newsletter](https://dor.gov.np/home/publication/dor-news-letters/force/dor-newsletter-vol-29)
identifies this corridor and a debris-flow location at Mauri Khola Bridge.
This is evidence of corridor relevance, not a current incident or surveyed geometry.

The recommendation favors a bounded road with named disruption locations and
multiple source candidates. Endpoint coordinates, exact length, road IDs, and
centerline still require validation. None are invented here. Coordinate storage
will use GeoJSON WGS84 longitude/latitude order and meter-based calculations.

Alternative routes may be absent or long detours for this corridor. Keep Feature
#4 required: test no-alternative behavior here and later verify another supported
OD pair if necessary to demonstrate real candidate comparison. Broader detours
must display gaps outside the monitored corridor, not appear lower-risk merely
because observations are missing.

## Completed desk review (not algorithm accuracy testing)

| Published example | Finding | Required interpretation |
| --- | --- | --- |
| [Post, 23 September 2025](https://kathmandupost.com/national/2025/09/23/another-landslide-hits-narayangadh-muglin-road-near-tuiun-khola) | Names Tuin Khola and this road; describes recurrent closure. | Candidate road association is supported by text; exact coordinates are not. Historical evidence, not a fresh warning. Separate recurrent events/updates. |
| [OnlineKhabar, 7 September 2026](https://english.onlinekhabar.com/narayangadh-muglin-partial-closure.html) | Mentions Tuin Khola work and Krishnabhir repair in Dhading in the same article. | Do not attach every place mentioned to the same road or incident. The latter provides context for the schedule, not the same disruption location. |
| [Radio Nepal, 24 September 2025](https://radionepalonline.com/en/2025/09/24/417233.html) | Identifies Tuin Khola and the corridor. | Candidate related evidence, not automatically an independent witness. Inspect underlying attribution before raising confidence. |

These are linked research examples, not permission to crawl or republish articles.
The desk review demonstrates extraction pitfalls; coordinate accuracy and geometric
road matching remain unvalidated until a reference centerline is obtained.

## Location contract

Store original place text, normalized aliases, district/municipality context,
candidate geometries, precision class, uncertainty radius if justified, reference
source/version, road match state, reviewer, and review time. Do not invent a numeric
confidence percentage without calibration.

Location states: unresolved, candidate, reviewed-point, reviewed-segment,
area-only. Road matching is separate: unmatched, candidate, reviewed, disputed.
Neither reviewed location nor road match confirms the physical hazard itself.

Only reviewed geometry with defensible road association enters direct-impact
assessment initially. Candidate points can appear only with clear uncertainty,
separately from confirmed-location layers. Area-only evidence may appear as context;
do not turn district/municipality centroids into precise road hazards.

Candidate retrieval: name/context matching plus a spatial corridor. Then compare
affected road/bridge, uncertainty, parallel roads, river banks, junctions, and event
time. Nearest road alone is insufficient. A proposed 100/250/500m sensitivity sweep
is for testing, not adopted hazard thresholds. Choose final parameters only from
reviewed examples and report their limitations.

## Validation set before enabling automatic matches

Prepare 20 labeled cases with reference evidence: 5 explicit road/bridge points,
5 ambiguous/common place names, 4 nearby but unrelated roads/banks, 3 multi-location
articles, and 3 invalid/out-of-pilot geometries. Have the student/supervisor review
the labels. Include missing/ swapped coordinates and spelling aliases such as
Muglin/Mugling and Narayangadh/Narayanghat. Do not silently conflate similarly named
places; each alias needs district/road context.

Record expected road, acceptable precision, basis, system result, and review
decision. Gate: zero ambiguous cases promoted to confirmed direct-impact hazards;
report match precision/recall and location error only where ground truth exists.
This sample validates software behavior, not physical route safety. The dataset
and numerical evaluation are NOT completed in Phase 1.
