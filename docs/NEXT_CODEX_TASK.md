# Continue REBORN after 0.3.0 (Ultimate Directive v3)

Read AGENTS.md, docs/REBORN_CODEX_ULTIMATE_DIRECTIVE.md, docs/IMPLEMENTATION_CHECKLIST.md, and the actual current HEAD. Do not recreate the previous implementation or change Pages settings by guessing.

## Completed working slice

- P0: replaced 30-click aging and direct age writes with a 360-day calendar; fixed legacy hardcoded age-12 title, overflowing resources, stale trait UI and status/log synchronization. Existing build/stage publication remains intact.
- P1 core: generator-v2 equal 20 archetypes; uniform birthplace draw conditional on archetype; generator-v1 births remain reproducible. Calendar-backed infancy through age 12, pages, flags, 38 authored annual/household/activity events, 76 choices, birthday chronicles, journal, and preserved legacy chapters.
- Save schema 3: retains v0/v1/v2 identity/progression and immutable birth record; backs up exact raw save before migration, rejects bad data, repairs projections from authoritative time. Failed writes do not commit actions. Old characters can pause/resume their legacy chapter and enter annual life without resetting stats. Download current/pre-migration saves in the character record. Gallery retained on restart.
- P3 foundation: 20 connected actual locations across 5 regions, map pan/zoom/current/birth pins/fog, route quotes, age gates, travel time/cost/stamina, slower free walking, local work/rest/study, safe free recovery at every node, stamina gates, bread buy/eat/sell, transaction ledger, replay guards.

## Precise next task: P2 awakening and meaningful adult progression

1. Add data-driven 20 base career families with coefficient/threshold prerequisites. Implement the awakening preparation → gathering → measurement → result → explanation chain at age ~12. Base it on existing stats/memories/archetype/training; do not let the user freely choose results or imply the legacy class selector already implements awakening.
2. Use `dispatch` / `storyToken` / pure cloned state and commit-before-replace workflow. Apply time with `advanceTime`; never write `age`, `day` or `season` independently. Add schema migrations for new training/mastery/awakening fields.
3. Expose only eligible careers and recommended reasons, keep a free ordinary job path. Add actual training with diminishing rewards and recovery. Tie initial adult events to results; extend annual authored stories beyond age 11.
4. Add 2–4 context-specific family/region event groups per archetype. Current archetype hooks are context notes, not 40–80 authored branches. P1 full narrative variation is therefore unfinished.
5. Expand P3 with conditional travel encounters and real inventories/equipment. Current services only trade bread, offer free shared shelter/study and supervised work; no weapons, housing rental, crafting, price simulation or businesses yet.

## Important invariants / files

- `src/engine/time.js`: absoluteDay/birthAbsoluteDay authoritative. `age`, `day`, `season` are compatibility projections. Chronicle opens only on actual birthday crossing. Old import starts with its stored age plus old day offset; no fabricated historical annual entries.
- `src/data/events/childhood.js`, `src/engine/life.js`: 10 infant clusters (20 authored choices); 2 core events/year ages 1–11, one seeded household interruption/year, daily interval to birthday. Fresh first 10 years guarantee random interruptions; external activities cannot bypass birthday interruption. This guarantee is prospective, not fabricated for imported older lives.
- Preserve generator 1 tables in `src/data/birth.js` and `generateBirthV1`. Generator 2 archetypes/pool are frozen; `src/data/birth-origin-v2.json` is an immutable generation snapshot, not extra world content. Create generator 3 for altered pools, archetypes or starting-money rules. Do not invalidate saved records when adding map nodes.
- `src/world/locations.js`: actual canonical map graph. Birth pool does not define additional map nodes. No teleport, no paid route if money insufficient, walking remains a fallback.
- `src/save/storage.js`: preserve `reborn_save_backup_before_v3`; never overwrite it on another load. Unknown/corrupt saves remain until product confirmation. Export backup before rollback to the pre-v3 release.
- `app.html` + `src/` are source. Run build, then `node scripts/stage-site.mjs`; root index/assets/art are generated, retain old hashed assets. Pages source remains legacy main:/; integration changing it returned 403 previously.

## Known limitations / not a full release

No real awakening, 20-career gameplay, skill tree, active-play timer, lifespan enforcement, extension, ascension, equipment, combat, dungeons, authored important NPC profiles or 100 endings. At 12+, daily activities/map/services continue and the optional preserved story arcs lead to the original six endings. Old major war narrative is opt-in, not forced in the new life loop. Birth catalog has 120 names, 8 histories, 4 talents; do not inflate counts. Portrait is the prior layered SVG foundation, not complete equipment/curse/transform rendering. Detailed 3-column desktop layout, richer region artwork, import UI, archived long-life histories and full performance caps remain future work.

## Validation and continuation commands

```sh
npm ci
npm test
npm run content
npm run build
node scripts/stage-site.mjs
npm run test:e2e
npm run preview -- --port 4184
node scripts/verify-production.mjs http://127.0.0.1:4184/
```

Local baseline: 28 unit tests (including 100,000 equal-origin draws; 100 annual lives; 100 legacy branch traversals), 20 desktop/mobile E2E cases; content audit separately traverses 100 annual paths and 100 legacy births. Re-run after changes and report real outcomes. Verifier checks 1920/1366/768/360 widths. After an authorized push, verify the live URL rather than claiming success from workflow status alone.
