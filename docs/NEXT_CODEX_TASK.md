# Continue REBORN — V7 / 0.11.0

Read AGENTS.md, ROADMAP.md, GAME_DESIGN.md, CONTENT_MANIFEST.md, docs/USER_DIRECTIVE_V7.md and docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md. Continue the current repository. V7 supersedes conflicting historical rules. One Life is memory-only; never restore/write/delete old active saves/backups. Preserve frozen birth generators 1/2 and appearance-v1.

## Base / completed implementation

Continued from published `8f31f85` / runtime `433546d` (0.10.0). The existing first 30 V7 forks / 90 choices, infant care, clock/pause/decision boundaries, seven manual ritual stages, map journeys, 20 base/20 advanced careers and six endings are retained.

V7-4 implementation this round:

- New `createRun` lives get appearance version 2 with five traits (face, hair shape/color, eyes, skin), actual independent mother/father profiles and per-trait donor provenance. At least four traits match their selected parent exactly; at most one varies by one catalog step. Both parents and child render from the same actual catalog. Appearance randomness uses a separate seed stream; frozen births/names/race/wealth/stats/resources and old appearance-v1 are unchanged. Appearance does not affect ability scores.
- 180 original authored procedural PNG variants: nine groups × 20, using the V7 catalogue labels. Three extra transparent PNGs provide body, infant wrap and infant hair. Logical 64×80, fixed anchor [32,77], binary alpha, byte and decoded-RGBA SHA-256. The verifier rejects empty/opaque/corrupt/missing/duplicate parts. A separate graphics fixture audit confirms all 180 complete composed characters remain visually distinct. Fixtures are not played lives or NPC counts.
- Real layered file rendering, with skin/hair tint filters, race details, wrapped infants, growing toddler/child/teen proportions, and gray hair in older age. Trait indices never reroll. New renderer shows only actual owned clothes and no invented class weapon/aura. Historical v1 portraits/sprites stay intact.
- Family record displays mother/child/father, their actual names, expandable trait origins and a local family-room background. One original AI background is preserved as `docs/art/family-room-source.png`; a 118 KiB WebP derivative is used in the UI. They count as one artwork. Character PNGs are procedural, not AI-generated. No image service runs during play/build.
- Five family-gift garments are actually owned per run: two tops, pants, shoes and hat. From age three, the bag changes only owned same-slot clothes; hat can be stored again. Changes consume zero days/gold/stats/XP, retain face/parents and use revision tokens/clone-and-commit. Infant/toddler dressing is supervised; active choices remain pending while cosmetic actions are allowed. Body clothing is kept on. No purchases, combat modifiers, armor or weapons are claimed.
- The wardrobe stays expanded when a successful action refreshes its dialog. Family trait text uses safe DOM text; SVG interpolates only validated numeric/catalog values. Terminal history stores the compact v2 identity and actual worn-item labels once, never the active state or birth seed.

## Current work / tests

V7-4 is complete, published and verified locally and on actual Pages. Full CI passed test/build/composition/staging/deploy/live checks. No incomplete gameplay stub is left; start V7-5 below.

Confirmed: `npm ci`; 88/88 Vitest cases; `npm run content`; `npm run build`; `node scripts/stage-site.mjs`; source/staged character asset validation; the complete 180-fixture composition audit; full 51/51 Playwright cases (zero skipped). Unit coverage includes 1,000 deterministic families, bounded real donor inheritance, coverage of all twenty trait values and all eighty casual clothing designs, frozen birth parity, actual timed progression, atomic invalid/unowned dressing, wrapped infant/hat state and terminal-only archived identity.

All three production-preview and actual public-site scripts passed: seven responsive widths, 20 existing scene PNGs and all 183 character PNG hashes/decodes plus the family background, actual family portraits, overlays/month/progress/no resume; birth-to-20 manual school/ceremony/career/job/training/tuition, zero-cost owned clothes with unchanged genes/stats/time; independent tabs, zero active writes, genuine age-60 ending, one archived inherited identity and no seed/resume. Family and main-screen screenshots were visually reviewed at 360×900; no overflow. Final full CI passed; the GitHub Playwright annotation explicitly reports 51 passed.

Early pixel probes found duplicate face/eye designs, then another face pair while standardizing eye registration. These were corrected with actual eyebrow/chin/eyelid/iris geometry; both PNG-level and complete-composition checks now pass twenty distinct outputs in each group. Do not substitute metadata/name hashes for rendered pixels.

Required final commands: npm test; npm run content; npm run build; node scripts/stage-site.mjs; npm run test:e2e; node scripts/verify-character-assets.mjs (also staged root); node scripts/verify-character-composition.mjs; all three production scripts on preview then actual Pages. Heavy suites run sequentially. Existing two genuine birth-to-age-60 tests keep a 90-second budget for constrained runners; other budgets/assertions remain. No retries/skips or injected ages in gameplay tests. Composition-only art fixtures use a controlled adult pose explicitly, with no claim of progression reachability.

## Actual counts

Story unchanged: **156 scenes/events, 359 authored choices, six reachable endings**, including **30 V7 forks / 90 reachable choices**, 27 adapted briefs + three originals. Non-legacy: 141 events / 330 choices. Existing audits: 100 V7 lives through 20, 100 old branch traversals, 100 detailed childhood runs, 40 career runs, five annual lives beyond 60.

Art: **180 catalog PNGs + three support PNGs**, nine groups / 20 distinct variants each; one AI family-room artwork in two formats (source PNG + runtime WebP). Twenty location PNGs remain. Source/staged copies are not counted twice; generated combinations/1,000 parent profiles are not new artworks or authored NPCs. The per-run wardrobe owns five of eighty catalog garment designs; all eighty occur across tested births. No new story, location, important NPC or ending is added.

Other retained counts: 20 map nodes / five regions / 20 edges; 20 base / 20 earned advanced careers; 120 names; zero important authored NPC profiles/dungeons. Source-pack draft counts are not implemented counts.

## Next milestone — V7-5 interiors and place context

After this release is verified, do not redo V7-4 or the first 30-fork cluster.

1. Inspect existing `src/ui/scene.js`, `src/ui/scene-art.js`, story venue/context, canonical `src/world/locations.js` and V7 interior prompts. Add a small coherent set of real house/classroom/ceremony interior art tied to actual current node and story context. Preserve all twenty location IDs, outside backgrounds and read-only map.
2. Make room/context selection derive from GameState and actual story/ritual stage; it must never relocate the player or simulate a visit by moving a map pin. Generate real local files with dimensions/hash/provenance and fallback/production checks. Keep UI compact and age plausible.
3. Prove entering/leaving the context and journeys update actual scene, position, cost, days and stamina exactly once. Power-aware encounters need a real encounter/power/gear model before displaying survival probabilities. Extend actual owned inventory/gear before drawing weapons/modifiers; reuse the basic wardrobe without regranting gifts or rerolling appearance.

## Remaining / limits

Full ≥100-fork/≥100-ending expansion; richer interiors/new places; actual route encounters/combat/dungeons; graded affinity/title/aura/power growth; combat gear/shops/modifiers; crafting/businesses; important NPCs/companions; mortality/extension/eras/≥1000-year deity gates remain incomplete. Power is still honestly level 1, separate from practice/career XP. Parent portraits are fixed adult birth-reference appearance profiles; parent aging/current NPC status and a full NPC relationship/lifespan model are not simulated by this phase.

No known unresolved regression in completed local, CI and public checks. Physical iOS/PWA/native unload behavior remains outside guaranteed Chromium coverage.

## Files changed

New: `src/data/appearance-v2.js`, `src/character/inheritance.js`, `src/character/wardrobe.js`, `src/ui/avatar/pixel-parts.js`, `src/ui/avatar/pixel-avatar.js`, `src/ui/family-view.js`, `src/ui/wardrobe-view.js`, `scripts/generate-character-assets.mjs`, `scripts/verify-character-assets.mjs`, `scripts/verify-character-composition.mjs`, `scripts/published-character-check.mjs`, `tests/inheritance.test.js`, `tests/browser/family.spec.js`, `public/assets/sprites/**`, `public/art/family-room.webp`, `docs/art/**`.

Updated: run/actions/appearance, v1 sprite/portrait delegation, birth record/panels/styles/main bag UI, terminal archive, content/production/progression checks, layout tests, package/lock, Pages workflow composition check, AGENTS/README/ROADMAP/GAME_DESIGN/CONTENT_MANIFEST/USER_DIRECTIVE_V7/CHANGELOG and generated publication files. Source: app.html/src/public; root index/assets/art are generated main:/ compatibility outputs. Keep old published hashes; do not change Pages settings.

## Commit / publication

Base `8f31f85b00f8f6247b62593da4da371db66f1b11`. Prior final full CI [40845239881](https://github.com/Ninon0406/alltest/actions/runs/40845239881) passed for 0.10.0.

0.11.0 runtime commit: `a38c1bad92c8fdfb5035f7bc52f2c0aa049288bb`. Branch Pages [40881537540](https://github.com/Ninon0406/alltest/actions/runs/40881537540) and full test/composition/build/deploy/live workflow [40881537802](https://github.com/Ninon0406/alltest/actions/runs/40881537802) both completed successfully. Actual public HTML independently fetched from https://ninon0406.github.io/alltest/ serves `assets/app-Bp4m3zB2.js` / `assets/app-BGZLPjBY.css`; all three public scripts passed. Source and committed PNGs were unchanged by CI. The final documentation-only verification record uses `[site-build]`; see `git log -1` for its exact hash. Preserve the old published hashes and current main:/ Pages configuration.
