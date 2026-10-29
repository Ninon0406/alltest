# Continue REBORN — V7 / 0.8.0

Read `AGENTS.md`, `docs/USER_DIRECTIVE_V7.md`, `docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md`, the V7 JSONs, and current HEAD. Continue the existing game. V7 supersedes conflicting V6 phases; never restart the project or restore active saves.

## Completed this round

- V7-1: reconciled actual HEAD/history with the supplied pack, archived the canonical V7 documents unchanged under `docs/v7/`, and separated authoring drafts from executable content.
- V7-2: care-only months 0–35; age in months until three; realistic newborn/sensory/supervised-play choices at exact month thresholds; no infant career/stat/income/travel grind. Reading focus/service starts at six for new V7 lives.
- Shared absolute-day decision boundary and manual priority: 1/2/5-year and seek plans stop exactly at a pending milestone; all external timed actions, services, careers and legacy jumps respect the same boundary. Fixed 30-day autoplay, 1/2/4/8/16× intervals, actual calendar progress with accessible day counts. Hidden tabs/panels still pause and never age offline.
- Initial V7-3 subset: nine real forks / 27 choices, eight traced to V7 briefs plus one original follow-up, through age ten. Real memory, caregiver/community relationships, flags and delayed effects; a gated community role unlocks only after returning the purse. Three policies reach every new choice; 100 seeded V7 births are audited through all seven ceremony stages.
- Seven-stage ritual now requires an actual choice at each stage for V7 runs; pause/resume, venue and once-only deterministic measurement remain. Offline historical condensed simulation remains reproducible.
- Partial V7-5/6: read-only map, main-page travel choices (caravan/walk/stay), actual route costs/stamina/time/ledger; no silent routine relocation. Up to eight eligible recommendations, with other valid careers available in the codex.
- Twenty original local scene PNGs, all canonical locations, 320×160, manifest/hash/dimension validation, real production image loading and fallback. No new world IDs or graph rewrite.
- Preserved One Life, terminal-only archive, frozen births, all 20 base/20 advanced careers, existing six endings and 20-node graph. Optional original reader/chapters remain, with explicit feedback when a jump would cross important decisions.

## Work in progress / next incomplete milestone

V7-3 narrative infrastructure is usable, but the first 30–50-fork age 0–19 milestone is incomplete (nine implemented). Next implement the coherent teen education/support/training chain, not another redesign of infancy/time/UI.

1. Port `life_evt_050` scholarship (after real completed awakening), `051` tuition/support, `054` free community lessons, `063` preparation/invitation, `064` study versus work, `066` family contact; inspect exact JSON age windows first. Use current canonical location and existing currency/XP/calendar. Add event-level eligibility/window checks shared by the scheduler before introducing ceremony-gated events, so a postponed ceremony cannot deadlock an ineligible scholarship. Keep zero-money routes, actual requirements/follow-ups and two distinct delayed consequences per fork.
2. Extend `src/data/events/development.js` and `src/engine/development.js` or a dedicated story module. Preserve the nine existing flags/relationships. Add real selectable stages with safe/manual choice boundaries; do not import draft hints as fake outcomes or count repeated focuses as new branches.
3. Add seeded path/gate/consequence coverage and genuine browser playthroughs. Then continue V7-4 inherited appearance without changing frozen birth generator tables; current sprite is appearance-v1.

## Files changed

New: `src/data/events/development.js`, `src/engine/development.js`, `src/engine/decisions.js`, `src/ui/journey-view.js`, `src/ui/scene-art.js`, `public/assets/scenes/` (20 PNGs + manifest), `scripts/v7-simulation.mjs`, `scripts/generate-scene-assets.mjs`, `scripts/verify-assets.mjs`, `tests/development.test.js`, `docs/USER_DIRECTIVE_V7.md`, full `docs/v7/` pack.

Updated: engine run/time/yearly/actions, progression timing guards, world travel/economy, main/dashboard/reader/career/map/scene UI, browser helpers/scenarios, run/pixel tests, content audit, all three production verifiers, package version, AGENTS/README/ROADMAP/GAME_DESIGN/CONTENT_MANIFEST/CHANGELOG and generated publication files.

## Remaining systems / known limits

- No inherited parent appearances, 20 actual visible variants/group, real owned gear, earned power levels or rank/aura ladder. Power remains Lv1; career XP is separate.
- No modeled travel encounters/risk by power, combat/dungeons, businesses/crafting, authored important NPC profiles/parties, natural mortality/extension, eras, ≥1000-year deity prerequisites or new ending families.
- Nine executable V7 forks are below 30–50 / ≥100 targets. Whole-library historical count is not a claim of V7 unique branching completeness. Childhood fork choices cost zero days (reactions/conversations); routines alone advance elapsed months.
- Current map graph remains 20 locations/5 regions/20 edges. Pack's 150 draft locations lack compatible route/service/age data; do not replace canonical IDs or frozen home pools.
- Twenty actual scene PNGs are baked existing compositions, not 150 new locations or inherited sprite parts. Richer contextual landmarks/interiors remain incomplete.
- Safe routine work stays at the actual location. If no community work is offered, it performs a safe pastime instead of auto-travel; use main-page journey choices to move.
- Native unload warnings/mobile discard are best effort. Chromium viewport tests do not establish physical iOS/PWA support.

## Tests and publication checkpoint

Commands required:

```sh
npm ci
npm test
npm run content
npm run build
node scripts/stage-site.mjs
npm run test:e2e
node scripts/verify-assets.mjs
npm run preview -- --port 4185
node scripts/verify-production.mjs http://127.0.0.1:4185/
node scripts/verify-progression.mjs http://127.0.0.1:4185/
node scripts/verify-one-life.mjs http://127.0.0.1:4185/
```

Latest local evidence (2026-10-29): 67/67 unit tests, 39/39 browser cases (zero skipped), content audit, production build/staging and source/staged PNG validation pass. All three production-preview scripts passed: seven viewport widths plus real month/progress/20-file loading and overlays; real birth-to-12/seven manual ritual stages/career wages/training/story at 1366/360; independent tabs/zero active writes/authentic age-60 terminal transition/exactly one summary/reload without resume. Concurrent heavy unit/content/browser execution caused two historical simulation timeouts once; rerunning the required commands sequentially passed. Browser automation was updated for explicit infant/ritual decisions and a paused test clock; final full suite passed twice. No unresolved regression was observed in these scenarios. Counts: 135 scenes/events, 296 authored choices, six endings; nine V7 forks / 27 reachable choices; 20 unique local scene PNGs; 20 base/20 advanced careers, 120 names, 0 important NPC profiles, 0 dungeons.

Base commit: `e8af5f8`. Runtime release commit: `370e5c32a1ff5fd16abb9b215671a05db9d5e963` (0.8.0), pushed to `main`. Branch Pages deployment `40807876144` succeeded. Public HTML serves `app-D8h0_Q_4.js` / `app-jJszjJhO.css` at https://ninon0406.github.io/alltest/ . All three public Chromium verifiers passed on 2026-10-29: 320/360/390/768/1024/1366/1920 layouts, actual month/progress and 20 PNG loads, same-run overlays/no resume; genuine birth-to-12/seven manual stages/career salary/practice/story at 1366/360; independent tabs/zero active storage/authentic age-60 ending/exactly one terminal summary/reload history. No runtime/request failures were observed in those scenarios. The full Actions workflow `40807876988` has passed its build/tests/content and deployed; the complete workflow, including its own live verifiers, finished successfully: https://github.com/Ninon0406/alltest/actions/runs/40807876988 .

The verification scripts now have bounded browser waits; the independent-tab verifier brings its tested page forward so background frame throttling cannot unnecessarily slow manual progression. The actual game retains hidden-tab pause behavior. These verifier changes were also exercised against the live release.

Source is `app.html`, `src/`, `public/`; build/stage `index.html`, `assets/`, `art/` for existing main:/ Pages. Keep all prior published hashed files; do not change Pages settings. The final documentation/verification follow-up commit uses `[site-build]` to skip another full custom build; the same verified runtime assets remain published.
