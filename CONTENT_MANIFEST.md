# Verified implemented content — 0.13.0 / V7 subset

Run `npm run content` for authored records, deterministic union reachability and actual file validation. Counts include retained historical optional content; they are not a claim of 100 completed V7 forks or mandatory prompts in one run.

| Content | Authored | Reachable in audit |
| --- | ---: | ---: |
| Preserved legacy scenes / choices | 15 / 29 | 15 / 29 |
| Retained childhood/household/daily records | 38 | 38 |
| Awakening stages / authored responses | 7 / 14 | 7 / 14 |
| Career story episodes / responses | 60 / 120 | 60 / 120 |
| Rare original life crossroads / responses | 6 / 30 | 6 / 30 |
| Executable V7 childhood/teen forks / responses | 30 / 90 | 30 / 90 |
| All non-legacy event records / responses | 141 / 330 | 141 / 330 |
| Total scenes/events / authored choices | 156 / 359 | 156 / 359 |
| Genuine endings | 6 | 6 |
| Playable base / earned advanced career families | 20 / 20 | 20 / 20 |
| Functional map locations / regions / route edges | 20 / 5 / 20 | 20 / 5 / 20 |
| Important authored NPC profiles / functional dungeons | 0 / 0 | 0 / 0 |
| Actual local outdoor location PNGs / distinct file pixel hashes | 20 / 20 | 20 / 20 |
| Interior PNGs / distinct decoded pixel hashes | 16 / 16 | 16 / 16 |
| Canonical nodes with three room bindings (shared art) | 20 (60 references) | 20 (60 references) |
| Character catalog groups / variants per group | 9 / 20 | 9 / 20 |
| Actual transparent character PNGs (catalog + support) | 180 + 3 | 180 + 3 |
| Owned basic garment designs / reachable via births | 80 | 80 |
| Owned equipment designs / transparent gear PNGs | 6 / 6 | 6 / 6 |
| Functional equipment shops / equipment slots | 8 / 3 | 8 / 3 |
| Distinct AI family-room artworks (source PNG + runtime WebP) | 1 | 1 |

The retained nine childhood V7 nodes occur at months 0, 3, 6, 12, 24, 36, 72, 96 and 120. Eight adapt source briefs `001/008/011/016/019/027/039/045`; the community-library follow-up is original. Each has three real choices. Early comfort/voice, sharing, river questions and library work influence later memory/relationship effects; returning the purse opens the distinct trust role at ten. These effects feed the existing memory/awakening calculations or actual relationship/gate state. Relationships are a small caregiver/community foundation, not 100 authored important NPCs.

The existing 60 career episodes remain three dilemmas per career with actual stat/XP/training-versus-wage effects. New V7 lives choose each of the seven ritual stages manually; postponement is an operational action, not an extra authored fork. Focuses, calendar ticks, generic consultation/defer, travel controls, recommendations and repeated work/training are not additional narrative records.

Twelve teen forks at months 145/150/162/174/182/188/198/206/214/222/228/234 add 36 choices. Ten adapt briefs 050/051/054/052/061/059/063/064/065/066; letter/reflection follow-ups are original. Scholarships change a real 12-coin enrollment to four, with free alternatives. Other choices unlock later options, per-stat training support (max +3 XP per actual training action), career networking (max +3 coins per actual job), and family/community consequences. Decisions themselves grant no training XP, stat/power level or unearned salary. Total adapted briefs including the school cluster: 27; original V7 follow-ups: three.

Nine school forks / 27 choices adapt briefs `029/034/037/038/040/036/041/048/049`, at months 48/60/84/90/108/114/126/132/138. They connect supervised seeds/toys, fair rules, cooled craft demonstrations, caravan news, a friend moving away, actual-practice exhibition and manual ceremony preparation. Earlier choices alter later memory/bonds, record eligibility and capped support for real timed practice. Caravan maps, craft work, farewell pictures/letters and listening return in teen choices. No automatic travel, money, gear, power or instant XP is awarded. Two or fewer major childhood prompts occur in each year from four through eleven.

## Audit coverage

100 legacy births with feasible branch traversal; 100 historical detailed childhood runs; 40 complete career runs (20 × two story policies); five annual-planner policies beyond age 60; 100 new V7 seeded lives through age 20 and the full manual ceremony. All 30 V7 forks / 90 choices are exercised across the three V7 policies, including the conditional branch. Full-playthrough clocks progress through actual actions, not injected ages. Union reachability spans different runs, including the retained optional/historical reader; not every old vignette appears in the new V7 main flow.

## Character art implementation

180 committed catalog PNGs are original procedural pixel parts from `src/ui/avatar/pixel-parts.js`, matching the nine V7 groups. Three supporting PNGs provide body, infant wrap and infant hair, all 64×80 with shared anchor [32,77] and hard alpha. The manifest records SHA-256 for bytes and decoded RGBA. Every group has 20 different decoded pixel images; the graphics composition audit also confirms 20 distinct complete characters per varied group. These 180 graphics fixtures are not counted as played lives or NPC profiles.

The family-room background is one original AI-generated artwork: source `docs/art/family-room-source.png`, compressed runtime `public/art/family-room.webp`, both preserved and hashed. They are two formats of one artwork. New runs inherit at least four of five traits from actual mother/father profiles; one small variation can occur, independently of stats/race/wealth. Cohort tests cover 1,000 seeded families and all 80 casual garment designs through actual birth ownership. Parent profiles are visual records, not additional authored important NPCs.

## Interior art and actual context

Sixteen additional original 320×160 interior PNGs: fifteen procedural house/classroom/ceremony rooms across five distinct regional styles, plus one AI-generated Starfall ceremony hall. The AI source PNG and its nearest-resampled runtime PNG are one artwork. The manifest contains byte and decoded-RGBA hashes, full opacity, dimensions, provenance/license and 60 room references on the existing 20 canonical nodes. All sixteen files are distinct and used; source and staged copies do not count twice. `scripts/verify-interior-assets.mjs` checks mappings, source provenance, pixels and all thirty authored story-context decisions. Normal builds/play use local committed files. No new location, authored story, NPC or ending is counted.

A pure selector shows homes during actual care before 36 months and explicitly indoor stories, classrooms during actual library/rules/lesson decisions, and ceremony halls only during an active ritual at its real venue. Resolving/pausing/finishing leaves the room; explicit travel remains the only movement action. Other conversations and the optional historical reader keep outside views. Map previews keep outdoor landmarks. Missing room files use the matching procedural regional fallback. These image contexts are not new enter/exit actions or visited-location records.

## Art and authoring pack

Twenty original committed PNG files (320×160) now correspond one-to-one to the existing canonical locations, baked from `src/ui/scene-art.js`. `public/assets/scenes/manifest.json` binds ID/path/size/SHA-256; `scripts/verify-assets.mjs` rejects missing, duplicate or corrupt scene files. Scene and map preview render these files locally under the Pages base path, with a procedural fallback. Generated publication copies do not count twice. Other retained art: two pixel SVG illustrations, one original AI environment and v1 layered portrait/full-body renderers.

V7 JSON drafts are **not playable counts**: 150 draft locations (different IDs/no graph/service migration), 100 important-NPC drafts, 120 career-fork briefs, 123 life briefs, 200 tier titles (10 per career), 150 scene prompts, 20 interior prompts, 180 character-design entries. They lack executable effects/conditions/pixel geometry. Source target paths and labels are not generated assets or reachable endings.

Retained birth data: 120 Thai names, 20 equal archetypes, four races, eight histories, four resource talents and three rare hidden identities. Frozen generator 1/2 tables are unchanged. New-run appearance-v2 has five inherited traits, actual parent profiles and 20 distinct visible variants per group; original appearance-v1 remains for historical characters. Five family garments are owned per run (two tops plus pants/shoes/hat), drawn only from actual equipment, with no modifiers or weapons/armor. Six additional purchased equipment designs use three owned slots and eight canonical shops; these are separate from the 80 cosmetic garment designs. Bread remains the one stackable consumable. Power level is honestly 1, separate from career XP.

## Owned equipment subset

Six original procedural transparent 64×80 PNGs, with byte/decoded-pixel hashes and [32,77] anchors, represent training staff/sword, focus rod, shield, padded vest and coat. All six have actual shop payment, age/base requirements, ownership, equip/unequip and half-price return actions. Tools grant per-stat XP only during real timed practice; the coat reduces real work stamina cost by two. Derived capacities never overwrite earned base capacities and no equip action heals. Eight shop bindings use existing nodes; no new location, NPC, story fork or ending is counted. A separate equipment manifest/audit checks source and staged files; the production equipment playthrough exercises genuine birth-to-12 travel/purchase/practice/work/resale/refresh. The six design PNGs and their staged copies are six artworks, not twelve.

## Remaining targets

The first 30-fork cluster across ages 0–19 is complete. Remaining: ≥100 with verified downstream distinctions; ≥100 reachable endings; more places/room types; power-aware journeys; advanced equipment/loot and power growth; NPCs/encounters/combat/dungeons; economy/business/crafting; mortality/lifespan/eras/≥1000-year deity gates. The current release does not meet those full-game targets.

Historical 0.8.0 validation: 67 unit / 39 browser cases passed; all three preview and live GitHub Pages verifiers passed for runtime 370e5c3, including all 20 actual PNG files, seven layouts, real birth-to-career progression and a genuine terminal-only archive. These checks establish the implemented subset, not future V7 systems.

Historical 0.9.0 validation: 74 unit / 43 browser cases passed, plus content/build/staging/PNG checks and all three preview/live production verifiers. Public source `78a10b5` serves `app-jMSiVLl5.js` / `app-jJszjJhO.css`; both Pages workflows succeeded. Live checks include all 20 decoded files, seven layouts, genuine birth-to-20 teen education/payment/support and terminal-only history. Image assertions now wait for network loading before validating dimensions. See `docs/NEXT_CODEX_TASK.md` for exact evidence and remaining work.

Historical 0.10.0 validation: 80 unit / 47 browser cases passed, with zero skipped; content/build/staging/PNG audit and all three preview/live verifiers passed. Coverage includes all nine school forks, real practice/record gates, mixed childhood-to-teen callbacks, capped guidance on actual timed training, all seven layouts, real birth-to-20 progression and authentic terminal-only history. Runtime `433546d` serves `app-DcD8zOM7.js` / `app-jJszjJhO.css`. Final CI follow-up `9a06fff` passed the full test/build/deploy/live workflow [40845239881](https://github.com/Ninon0406/alltest/actions/runs/40845239881). The constrained-CPU full-lifetime cases also passed after a scoped test-budget fix; see NEXT_CODEX_TASK for the initial CI failure and exact evidence.

Historical 0.11.0 validation: 88 unit / 51 browser cases (zero skipped), the 1,000-family cohort, source/staged PNG/transparency/anchor/hash checks and 180 complete composite variants passed. Content/build/staging and all three preview/live scripts passed, including all 183 decoded character parts, seven family layouts, real school/ceremony/career/wardrobe/teen progression and terminal-only history. Published runtime `a38c1ba` serves `app-Bp4m3zB2.js` / `app-BGZLPjBY.css`. Full CI [40881537802](https://github.com/Ninon0406/alltest/actions/runs/40881537802) and branch Pages succeeded. All story/location/NPC/ending counts remain unchanged.

Historical 0.12.0 validation: 94 unit / 57 browser cases passed (zero skipped), content/build/staging, source/staged interior audit and all 180 complete character compositions passed. Scene tests cover actual care/classroom/ceremony, pause/walk/return without reroll or fictitious location, zero-cost map inspection and missing-file fallback. All three preview and independent public verification scripts passed, including all sixteen room file hashes/decodes, actual classroom/ceremony/outdoor transitions, real birth-to-20 progression and terminal-only history. Runtime `dc94d89` serves `app-DBrAbMLw.js` / `app-DtLojNI8.css`. Branch Pages [40886659722](https://github.com/Ninon0406/alltest/actions/runs/40886659722) and full test/build/deploy/live workflow [40886662148](https://github.com/Ninon0406/alltest/actions/runs/40886662148) succeeded. Story counts remain 156 events / 359 choices / six endings, including 30 V7 forks / 90 choices; 20 outdoor PNGs and 183 character PNGs remain unchanged.

Current 0.13.0 local validation: 104 unit / 59 browser cases, zero skipped; content/build/staging; source/staged equipment/interior/character audits; all 180 complete character composition fixtures; all four production-preview scripts. Equipment checks include actual payment once, ownership-only sprite layers, timed practice/work bonuses, real earned promotion retained after removing gear, half-price returns and refresh with no active persistence at 1366/320/360. All four independently run actual Pages scripts also passed, including genuine equipment flow at 1366/320/360. Published runtime `8ed7362` serves `app-rp9I9wkb.js` / `app-mtsUBFr5.css`; branch Pages 40937025537 succeeded. Full CI [40937025638](https://github.com/Ninon0406/alltest/actions/runs/40937025638) succeeded, including build/deploy/live checks; its job logs independently confirm 104 unit and 59 browser cases passed. Exact evidence is in docs/NEXT_CODEX_TASK.md.
