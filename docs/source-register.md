# Phase 1 source and service register

Reviewed 2026-11-01. This is a feasibility review, not a declaration of live coverage.
Web-tool retrieval may use indexed/cached representations. It does not establish
connectivity from the future Node backend, raw response schemas, CORS, or uptime.

## Candidate collection set

Start with one news feed, one official announcement channel, community reports,
and supplementary BIPAD. Do not enable a collector until its permission and
technical gates pass. No external publisher has been contacted or account created.

| Candidate | Observed evidence | Access/permission decision | Next gate and fallback |
| --- | --- | --- | --- |
| Kathmandu Post RSS | [Publisher feed](https://kathmandupost.com/rss) returned readable titles, links, and summaries through web retrieval. [Robots](https://kathmandupost.com/robots.txt) returned no blanket disallow. | Feed availability verified at web-tool level only. Robots is not a reuse license. [Related KDC terms](https://epaper.ekantipur.com/termsofservice) discuss RSS but do not establish SafeRoute's specific storage/redisplay permissions or applicability to this feed. NOT approved for production collection yet. | Confirm applicable feed terms or publisher permission; fetch raw XML from deployment environment; inspect GUID/date fields and conditional-request headers. If unresolved, select another permitted feed; use attributed manual factual notes for evaluation only. |
| Department of Roads | [Official highway page](https://dor.gov.np/home/page/highway-traffic-updates) is readable and points to highway-status services. | Official provenance, but supported machine endpoint, collection terms, and precise update behavior unverified. | Inspect published interface/terms or obtain permission; start with moderator-entered source links rather than undocumented API scraping. |
| Traffic Police | [Official website](https://traffic.nepalpolice.gov.np/) timed out in web retrieval. | No live structured announcement feed or automated-use permission established. Candidate alternative to DoR, not an additional launch dependency. | Confirm reachable announcement channel and permitted method; manual references if permitted. |
| BIPAD | [API reference](https://bipadportal.gov.np/api/) was documented in prior research; current direct web open timed out. `/api/v1/highway/?limit=1` was inaccessible through the web tool. | Supplementary official source/fallback. Current records/schema, authentication, license, timestamps, pagination, and resource semantics remain unverified. | Obtain successful bounded sample for incident/highway resources; do not assume `/hazard/` is a geospatial event feed. Preserve last successful snapshot and show sync age; no fabricated replacement data. |
| Community | User-submitted, attributed observations are an approved product requirement. | Implement consent, optional photo ownership confirmation, moderation, and limited public identity exposure. | First proof may use a consenting contributor's genuine report, but that proves community ingestion, not automated external monitoring. A synthetic exercise must remain labeled demo. |
| ReliefWeb (reserve only) | [API documentation](https://apidoc.reliefweb.int/) explicitly supports programmatic access with a pre-approved appname. | Requires appname approval; original content rights still apply. Useful disaster context, not assured timely corridor coverage. | Not selected for launch; consider only if relevant reports and authorized access are obtained. Do not borrow a demo appname. |

## Collection contract (proposed)

- Initially poll an approved feed every 30 minutes, only if its terms allow it;
  this interval is a project default, not a publisher guarantee. Honor Retry-After
  and cache headers, add backoff, and prevent overlapping runs.
- Store source ID/canonical URL, title only as permitted, factual category/place,
  permitted excerpt or no excerpt, original publication time and precision,
  detectedAt, fetchedAt, content hash, and original attribution.
- Separate event time from publication time and last retrieval. Missing publication
  time stays null; a URL's date alone is not precise publication evidence.
- Avoid full-text/photo archiving unless permitted. An RSS headline can be
  insufficient for classification: retain an uncertain candidate for human review.
- Parse one article into multiple observations where it describes different roads
  or closures/reopenings. Preserve updates; deduplication must not erase recurrence.
- Preserve underlying source attribution so syndicated reports do not inflate
  independence. Repeated fetch is idempotent, not a confirmation.

## Supporting services

| Service | Feasibility finding | Pending validation |
| --- | --- | --- |
| OpenFreeMap + MapLibre | [Official quick start](https://openfreemap.org/quick_start/) documents MapLibre integration; [provider site](https://openfreemap.org/) states public usage without API keys and permits commercial use. Preferred pilot basemap candidate. | Actual Nepal style/tile/font rendering and attribution check in a browser. No service availability guarantee inferred. Keep provider configurable. |
| openrouteservice | [Directions docs](https://giscience.github.io/openrouteservice/api-reference/endpoints/directions/) and [HeiGIT API entry](https://api.heigit.org/) describe routing with an API key. | Authorized key, successful pilot route, alternative behavior, limits, and road suitability not tested. Never assume two candidates exist. |
| OSM Nepal geography | [Geofabrik](https://download.geofabrik.de/asia/nepal.html) distributes Nepal road/geographic extracts. | No extract downloaded or road geometry validated in this phase. Retain attribution and evaluate pilot geometry against reference maps. |
| Geocoding | Prefer reviewed pilot place aliases and manual map placement. [Public Nominatim policy](https://operations.osmfoundation.org/policies/nominatim/) restricts usage to a maximum 1 request/sec across the app, requires identification/attribution, and prohibits autocomplete. | Do not use public Nominatim as an unrestricted background article geocoder. Obtain an appropriate provider if automated geocoding is needed. |
| MongoDB | `mongod` and `mongosh` were not found on the current PATH. No database connection attempted or credential search performed. | User-selected local instance or Atlas connection, then real persistence/spatial-index tests after implementation approval. PATH absence does not prove no remote database exists. |

## Reproducible execution observations

The shell works; Node reports v24.22.1 and `/usr/bin/google-chrome` is present.
These do not prove Hallmark's Puppeteer dependency or browser rendering works.

Command:
`curl --max-time 20 --silent --show-error --location --write-out '\nHTTP %{http_code}\n' 'https://bipadportal.gov.np/api/v1/highway/?limit=1'`

Result: exit 6; `curl: (6) Could not resolve host: bipadportal.gov.np`; HTTP 000.

Command:
`curl --max-time 15 --silent --show-error --location --write-out '\nHTTP %{http_code}\n' 'https://kathmandupost.com/rss'`

Result: exit 6; `curl: (6) Could not resolve host: kathmandupost.com`; HTTP 000.

This establishes environment DNS failure for these checks, not upstream outages.
Do not bypass restrictions. Retry from the approved runtime when network access
works. The guessed Post `/terms-and-conditions` URL was inaccessible; do not treat
it as an inspected permission document. Web browsing alone is not a backend test.
