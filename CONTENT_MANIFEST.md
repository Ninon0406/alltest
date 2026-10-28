# Verified implemented content — 0.6.0

Run `npm run content` for actual authored records and deterministic union reachability.

| Content | Authored | Reachable in audit |
| --- | ---: | ---: |
| Preserved legacy scenes / choices | 15 / 29 | 15 / 29 |
| Childhood/household/daily event records | 38 | 38 |
| Awakening stages / choices | 7 / 14 | 7 / 14 |
| Career story episodes / choices | 60 / 120 | 60 / 120 |
| New rare life crossroads / choices | 6 / 30 | 6 / 30 |
| All annual event records / choices | 111 / 240 | 111 / 240 |
| Total scenes/events / meaningful choices | 126 / 269 | 126 / 269 |
| Endings | 6 | 6 |
| Playable base career families | 20 | 20 |
| Playable earned advanced paths | 20 | 20 |
| Functional map locations / regions / route edges | 20 / 5 / 20 | 20 / 5 / 20 |
| Important authored NPC profiles / functional dungeons | 0 / 0 | 0 / 0 |

Counted additions are genuinely authored situations, not repeated use or character-name permutations. The 60 career episodes are three different dilemmas per family, with detailed-reader age minima 12/13/16; default yearly pacing uses 13/15/17 or later and two-year spacing. Each option changes attributes, XP, saved story flags and a permanent training-versus-salary perk. The eight annual focuses, autoplay/time controls, generic career consultation/postponement, profession selection, training, work, map controls and promotion UI actions are functional but are not counted again as authored narrative choices.

Audit coverage: 100 legacy births with feasible branch traversal, 100 retained detailed childhood playthroughs to age 12, and 40 actual career playthroughs (20 families × two story policies) from infancy through ceremony, eligibility/practice/work, three episodes and an earned promotion at 18+. Five annual-planner policies also advance from birth beyond age 60 to cover all 30 new authored outcomes. Unit tests separately earn all 20 advanced promotions through annual planning. No injected game clock is used for these complete playthroughs. Union reachability does not mean every choice/path appears in one life. Unit and browser tests separately exercise save migrations, fatigue/currency/age boundaries and production rendering.

Other retained content: 120 distinct Thai names, 20 equally likely birth archetypes, 4 races, 8 household histories, 4 resource talents and 3 saved rare hidden identities (no hidden-power awakening yet). Original local assets remain 2 pixel illustrations, 1 AI environment and the layered SVG renderer. Career costumes extend that renderer; they are not counted as additional authored illustrations. Birth snapshots and copied publication assets do not increase location/content counts.

Not a full release: targets ≥350 events, ≥500 choices, ≥100 endings, ≥100 authored NPCs, ≥80 advanced/hybrid paths, ≥150 locations and ≥40 dungeons are not met. Equipment, combat, mentor/relationship systems, lifespan/ascension and region-specific content expansion remain outstanding.

Default pacing now chooses ordinary childhood responses automatically from the selected focus and labels those entries automatic. Authored counts include this preserved optional content, not 269 mandatory user prompts in one life. The six new life crossroads have genuinely authored situations; service controls and reuse of old narrative data do not inflate counts.

V6 Phase A changes run persistence, not authored counts. The six existing genuine terminal endings now produce a one-time concise history record; archive copies do not count as new endings. Runtime ignores active saves, while offline historical generation/migration validators remain tested. Pixel-v2 variants, power progression and owned equipment are not implemented by Phase A.
