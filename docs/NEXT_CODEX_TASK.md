# Continue REBORN — V7 / 0.13.0

Read AGENTS.md, ROADMAP.md, GAME_DESIGN.md, CONTENT_MANIFEST.md, docs/USER_DIRECTIVE_V7.md and docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md. Continue the existing repository; V7 supersedes conflicting historical text. One Life remains memory-only, old active-save keys/backups remain untouched, and frozen birth generators 1/2 plus appearance-v1 remain reproducible. Do not redo completed infant/time/story/character/interior or equipment foundations.

## Base and completed work

Started by fast-forwarding the existing isolated checkout to actual origin/main `12d41ed` (0.12.0; runtime `dc94d89`). Existing care-only infancy, shared exact decision stops, manual seven-stage awakening, first 30 V7 forks / 90 choices, twenty careers, main-page travel, inherited family characters, five actual family garments, twenty outdoor scenes and sixteen actual interiors remain.

0.13.0 equipment foundation:

- Six actual catalog items: age-eight supervised training staff and travel coat; age-twelve blunt training sword, focus rod, wooden shield and padded vest. Three real slots: main hand, off hand and outer body. Eight thematic shops use existing canonical nodes (market/capital/forge/library/herb/moonport/fishmarket/dock), no new fictional location or authored NPC counts.
- `state.equipment` starts empty, capacity twelve, one of each design, version one. No free career gear or rerolled family garments. Buy/half-price return costs one actual day, uses existing wallet/ledger/journal/time guards and obeys pending/future decisions. Buying never auto-equips. Returns require actual ownership, the offering shop and prior unequip. Invalid/stale/double/unowned/wrong-slot/age/base-requirement requests preserve input state.
- `equipment-stats.js` is a pure projection. Existing `state.stats` and maxHp/maxMana/maxStamina retain earned values. Effective stats and capacities add only currently equipped item modifiers. Removing capacity clamps current resources; equipping/re-equipping never heals. Career eligibility, promotion and stored awakening still use earned base stats. This prevents removable bonuses from becoming permanent qualifications.
- Tools add a bounded per-stat XP bonus only to actual seven-day practice; no instant XP, power or money from equipping. The travel coat reduces real community/career work stamina by two; monthly-planner availability checks use the same quote. Current/max resource UI and training/status explanations share the projections. Power is still honestly level one.
- Six original procedural transparent 64×80 gear PNGs use existing [32,77] body anchors. Their manifest checks dimensions, bytes, decoded pixels, hard alpha, source/license, uniqueness and canonical shop references. These are authored pixel geometry, not AI-generated art. Runtime layers only owned/equipped items; family reference portraits receive no combat gear. Bag, shop, status and read-only map stock information are integrated. Terminal summaries include compact actually worn IDs/labels only, never active inventory/state.
- New gameplay/unit/browser/production checks cover payment exactly once, explicit equip, removals, caps/no free healing, real training/work bonuses, resale, actual sprite layers and fresh rebirth without storage. The fourth production script `scripts/verify-equipment.mjs` runs actual birth-to-twelve, real walking to the shop, genuine transactions/practice/work/returns and reload on desktop/mobile. CI validates staged gear files and runs this public script too.

## Current work / latest verification

This round is complete and fully verified locally, independently on actual Pages, and by the full remote CI build/deploy/live workflow. No current code work or partial mechanic stub is left. Start the next earned-power milestone below.

Confirmed: npm ci; **104/104 Vitest cases** across fifteen files; npm run content; npm run build; node scripts/stage-site.mjs; source/staged character/interior/equipment validators; all **180 complete character composition fixtures** visibly distinct; **59/59 Playwright cases**, zero skipped, including desktop/mobile and seven viewport widths. The new equipment case also earns a real farmer promotion through timed focus/decisions and proves its permanent capacity survives gear removal.

All FOUR production scripts passed independently against `http://127.0.0.1:4185/`: seven-width CSS/JS/scene/character/interior/gear hashes and decoding; genuine childhood/ritual/career/teen progression; independent tabs and authentic age-60 terminal-only history; and real equipment purchase/equip/training/work/return/refresh at 1366, 320 and 360 widths. The actual 320px scene and bag screenshots were visually inspected, with registered held staff/coat and readable scrollable gear information, no horizontal overflow. Initial new unit helper failures correctly triggered the existing decision guard when a requested job crossed a future event; the helper now advances to and resolves that real decision. No game-time guard was weakened.

Required checks for future gameplay changes: npm test; npm run content; npm run build; node scripts/stage-site.mjs; npm run test:e2e; source/staged equipment, interior and character validators; all 180 complete character compositions; all FOUR production scripts on preview and actual Pages. Run heavy suites sequentially. Keep genuine lifetime browser budgets, no skips/retries or injected gameplay ages/wallets/gear. Snapshot getters are read-only evidence.

## Actual counts

Stories unchanged: 156 scenes/events / 359 choices / six reachable endings. Non-legacy: 141 events / 330 choices. First early-life cluster: 30 executable V7 forks / 90 reachable choices (27 adapted briefs, three original follow-ups). Existing audited cohorts: 100 V7 lives through twenty, 100 old branch traversals, 100 detailed childhood lives, forty complete career paths and five annual lives beyond sixty.

Art: 20 outdoor PNGs + 16 interior PNGs + 183 transparent character PNGs (180 catalog parts, three support layers) + 6 transparent equipment PNGs. Retained AI room sources/runtime derivatives are each one artwork. Source/staged copies, 60 interior references, composition fixtures and parent profiles are not additional authored art/NPC/location/story counts. Five cosmetic family garments per run remain free and do not grant modifiers.

World: 20 nodes / five regions / twenty edges; eight equipment shops on existing nodes; twenty base + twenty earned advanced careers; 120 names; zero important authored NPC profiles or functional dungeons. Draft V7 JSON is not implemented content. Equipment foundations do not imply earned power, combat, loot or survival probability modeling.

## Next milestone — earned power before modeled route encounters

1. Inspect `src/progression/engine.js`, career affinity/result/training caps, `src/engine/decisions.js`, `src/engine/yearly.js`, new equipment projections, and V7 levels/titles/long-life constraints. Define a small real earned-power slice from actual timed activities with deterministic simulations and meaningful manual milestone choices. Keep career XP/mastery, earned stats and global power separate; never equate gear or XP directly with deity status.
2. Integrate actual power progression/first earned titles/visual milestone into manual practice and monthly focus using shared quotes, costs and calendar boundaries. Stop at manual breakthrough decisions; preserve free ordinary-life routes, no infant power training or fabricated advanced auras. Hard-block level 100 until every V7 age≥1000/trial/active-play/manual-terminal gate exists. Do not claim the full 1–100 system from a small initial slice.
3. Only after earned power is tested, add one complete choice-based route encounter with actual strategy/cost/reward/retreat and deterministic outcome. Use real gear-derived readiness and canonical graph/current position. Show no numerical survival probability without a tested/calibrated model. Expand later story/NPC/endings in coherent reachable chains.

## Remaining / known limitations

Full ≥100 forks / ≥100 reachable endings; stronger affinity balance; earned power, career-tier titles/auras/breakthroughs; modeled route risk/rewards and combat/dungeons/loot; advanced equipment tiers; businesses/crafting; important NPCs/companions/relationships; mortality/lifespan extension/eras and ≥1000-year deity routes. More place/room types and weather/wealth/time-of-day art remain. Existing interiors share regional room art. Detailed historical reader remains outside rather than guessing venues. Parent portraits are fixed birth reference profiles, not an aging NPC system. The six item stat modifiers prepare effective stats for future encounters; currently actual practice/job/capacity mechanics are already connected.

No known unfinished gameplay stub. Physical iOS/PWA/native unload behavior remains outside guaranteed Chromium coverage. Public/CI status is recorded separately below and never inferred merely from successful push.

## Files changed this round

New: `src/data/equipment.js`; `src/character/equipment-stats.js`, `src/character/equipment.js`; `src/ui/equipment-view.js`, `src/ui/avatar/equipment-parts.js`; `public/assets/sprites/garments/**`; `scripts/generate-equipment-assets.mjs`, `scripts/verify-equipment-assets.mjs`, `scripts/published-equipment-check.mjs`, `scripts/equipment-playthrough.mjs`, `scripts/verify-equipment.mjs`; `tests/equipment.test.js`, `tests/browser/equipment.spec.js`.

Updated: .gitignore (intermediate work), run/action/time/monthly planner, economy/progression quotes, main/game/career/map/avatar/styles/archive, content/production/CI scripts, package/lock (0.13.0), AGENTS/README/GAME_DESIGN/ROADMAP/CONTENT_MANIFEST/CHANGELOG/USER_DIRECTIVE_V7/art provenance/NEXT and generated root index/assets. Source remains app.html/src/public; root files are generated. Retain old hashed assets and existing main:/ Pages settings. No active-save migration.

## Commit / publication

Base: `12d41ed`. Runtime **`8ed7362d4ce29aa206dd6f8db4d71f7ae8391c18`** is pushed normally to main. This isolated checkout uses local branch `work`, so the actual fast-forward push is `git push origin HEAD:main`, after checking origin/main ancestry.

Branch Pages [40937025537](https://github.com/Ninon0406/alltest/actions/runs/40937025537) succeeded. Actual public HTML at https://ninon0406.github.io/alltest/ serves **`assets/app-rp9I9wkb.js` / `assets/app-mtsUBFr5.css`**. All FOUR independently run public scripts passed: seven widths and all required image hashes/decodes; real birth-to-twenty school/ritual/career/wardrobe/teen flow; independent tabs, genuine age-sixty ending and exactly one terminal-only summary; new actual gear purchase/equip/practice/work/resale/rebirth at **1366 / 320 / 360**. No production errors or active writes were observed.

Full test/composition/build/deploy/live workflow [40937025638](https://github.com/Ninon0406/alltest/actions/runs/40937025638) **completed successfully** (both build and deploy). Downloaded build-job logs confirm **104 unit cases and 59 browser cases passed**, browser suite 3.3 minutes, zero skipped tests. Content audit, complete character compositions, staged gear/interior validation, artifact upload, deployment and the combined FOUR live checks all succeeded. Committed source and generated asset hashes were unchanged by CI, so no replacement compiled commit was needed. This final documentation-only verification record uses `[site-build]`; see git log -1 for its exact hash. Never mark all V7 complete.
