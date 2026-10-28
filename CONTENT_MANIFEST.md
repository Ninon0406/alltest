# Verified implemented content — 0.3.0

Run `npm run content` for authored records and deterministic reachable counts.

| Content | Authored | Reachable in audit |
| --- | ---: | ---: |
| Preserved legacy scenes | 15 | 15 |
| Annual/household/activity event records | 38 | 38 |
| Total scene/event records | 53 | 53 |
| Legacy choice records | 29 | 29 |
| Annual choice records | 76 | 76 |
| Total meaningful choice records | 105 | 105 |
| Original endings | 6 | 6 |
| Actual functional locations | 20 | 20 via age-12 route search |
| Regions / bidirectional route edges | 5 / 20 | 5 / 20 |
| Equal-probability birth archetypes | 20 | 20 in 100,000-roll audit |
| Authored important NPC profiles / functional dungeons | 0 / 0 | 0 / 0 |

Annual records comprise 10 infant clusters (20 choices), 22 age-specific childhood events, 5 seeded household interruptions and 1 repeatable daily activity event. No UI, map control, service button or procedural combination is counted as an extra story choice. Repeated use of an activity/event is not counted again. Reachability is union coverage across deterministic paths, not a claim every choice or ending is available to every life.

`content-audit.mjs` explores legacy branches over 100 births and plays 100 annual paths (50 seeds × 2 choice policies) to age 12. Unit tests separately verify 100 complete annual lives without soft locks, age/event bounds and ten random interruptions before age 10. Birth audit measures 100,000 origin-layer draws with a fixed RNG: each archetype target 5% ±0.3 percentage points; each eligible birthplace conditional on archetype target 1/N ±3.5 points. All tolerances are assertions, not claimed exact equal frequencies.

Other real content: 120 distinct Thai names, 4 races, 8 household histories, 4 resource-affecting talents, 3 saved hidden ability identities (no awakening effects yet), 2 local pixel illustrations, 1 original AI landscape and the existing layered SVG renderer. Frozen birth-location snapshots and copied publication assets do not add content counts.

Remaining full-release targets from Ultimate Directive v3: ≥350 scene/events, ≥500 choices, ≥100 endings, ≥100 authored important NPCs, ≥20 functional career families and ≥80 higher paths, ≥150 locations and ≥40 dungeons. No full-release completion is claimed.
