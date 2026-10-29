# Continue REBORN — V7 / 0.12.0

Read AGENTS.md, ROADMAP.md, GAME_DESIGN.md, CONTENT_MANIFEST.md, docs/USER_DIRECTIVE_V7.md and docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md. Continue the existing repository; V7 supersedes conflicting historical rules. One Life is memory-only: never restore/write/delete old active saves/backups. Preserve frozen birth generators 1/2 and appearance-v1. Do not redo completed story, clock, character or room work.

## Base and completed work

Continued from published `88490704651b73b62e3b7d70e589bf36a119c2ad`, runtime `a38c1bad92c8fdfb5035f7bc52f2c0aa049288bb` (0.11.0). Existing care-only infancy, exact 30-day clock/decision stops, thirty V7 forks / ninety choices, seven manual ceremony stages, twenty careers, actual main-page travel, inherited v2 characters and five actually owned family garments remain working.

V7-5 interior slice implemented this round:

- Sixteen real local 320×160 PNGs: house/classroom/ceremony rooms in each of five regional palettes/motifs (fifteen original procedural artworks), plus one original AI-generated Starfall ceremony hall. The original AI PNG is preserved at `docs/art/starfall-hall-source.png`; the runtime PNG is an offline nearest-neighbor resampling. Source and derivative are one artwork. No image API runs during builds/play.
- Manifest binds all twenty canonical nodes to three room types (sixty references to sixteen images). Byte and decoded-pixel hashes, dimensions, full opacity, AI-source hash, distinctness, provenance/license and all thirty story-context IDs are verified. Existing twenty outside PNGs and map IDs/edges remain unchanged. No new places, visits, stories, NPCs or endings are counted.
- `src/world/scene-context.js` purely projects actual GameState. It selects homes for infant care before 36 months and explicit home stories; classrooms for pending library/rules/lesson scenes; ceremony halls only for a pending manual ritual at the actual venue. Resolved/paused/completed rituals return outdoors. Ambiguous conversations stay outdoors. The optional detailed/historical reader conservatively uses outside landmarks. Map thumbnails always retain their outside views.
- Scene/caption/alt text identify the current node and room. Existing actual worn-character sprite stays anchored in the foreground. If a room PNG fails, the matching original regional procedural room appears; rendering cannot alter location, clock, wallet, stamina, genes, decision or ownership. There is no fake enter/exit action.
- Real tests walk away after ceremony measurement, reject resume at the wrong node, walk back and finish without rerolling. Actual trips still charge the existing route resources exactly once; map inspection is read-only. Production checks validate all sixteen file hashes/decodes and actual care/classroom/ceremony/outdoor transitions.

## Work in progress / latest local verification

Implementation is complete and playable locally. Publication evidence is recorded below after deployment; do not claim a public release until its tests/HTML actually confirm it. No partial gameplay stub is left.

Confirmed: `npm ci`; **94/94 Vitest cases** across fourteen files; `npm run content`; `npm run build`; `node scripts/stage-site.mjs`; source and staged-root interior validation; staged character validation; all **180 complete character composition fixtures** visibly distinct; **57/57 Playwright cases**, zero skipped, desktop/mobile plus seven viewport widths. Existing scene/character audits are included in content validation. New tests cover pure no-write context, actual school resolution, seven ritual stages/pause/venue travel/return, real walking costs, actual Starfall binding and missing-file fallback.

All three Production Preview scripts passed at `http://127.0.0.1:4185/`: seven widths, actual local assets and family portraits, exact month/progress/overlay behavior, birth-to-20 school/ceremony/career/jobs/training/wardrobe/tuition and genuine age-60 ending with one terminal-only archive. The 360×900 home screen was visually inspected with no overflow; classroom/ceremony checks use real action-driven age progression. An initial preview invocation mistakenly used `/alltest/` on a root-only Vite preview, so JS could not load; correcting the test URL made the full scripts pass. The public Pages URL correctly retains `/alltest/`.

Required final checks for future changes: npm test; npm run content; npm run build; node scripts/stage-site.mjs; npm run test:e2e; source/staged interior and character validators; character composition audit; all three production scripts on preview then actual Pages. Heavy suites run sequentially. Keep the existing 90-second genuine full-lifetime browser budgets; no retries/skips or injected gameplay ages. CI now also validates staged interior files after staging.

## Actual content counts

Unchanged stories: **156 scenes/events / 359 choices / six reachable endings**, including **30 executable V7 forks / 90 reachable responses** (27 adapted briefs + three originals). Non-legacy: 141 events / 330 choices. Existing audit cohorts: 100 V7 lives through twenty, 100 old branch traversals, 100 detailed childhood lives, forty career paths, five annual lives beyond sixty.

Art: **20 outdoor PNGs + 16 interior PNGs** (fifteen procedural regional rooms + one AI hall), **180 catalog PNG parts + three support PNGs**, nine groups with twenty distinct variants each, and the retained one AI family-room artwork (source PNG/runtime WebP). Staged copies and source/derivative formats are not distinct artworks. Sixty room bindings are not sixty locations. Parent profiles/composition fixtures are not authored NPCs. Five actual family garments per run remain cosmetic with zero stat/time/gold cost.

World: **20 nodes / five regions / twenty edges; twenty base and twenty earned advanced careers; 120 names; zero authored important NPC profiles or functional dungeons.** Pack drafts are not implemented counts. Power remains honestly level one, separate from career XP.

## Next milestone — owned equipment foundation before risky journeys

Do not repeat V7-4 or these three room types. V7-5's remaining encounter/risk work depends on actual owned equipment and earned power. Start a small complete ownership/effective-stat slice before displaying survival probabilities:

1. Inspect `src/character/wardrobe.js`, world inventory/services/economy, action revision tokens and training/resource validation. Extend actual item data and local shops with a small coherent set of age-appropriate gear, honest costs/slots/requirements and inventory ownership. Reuse the wardrobe without regranting gifts or rerolling identity. Keep infant/cosmetic behavior and free play routes.
2. Separate derived equipment modifiers from immutable/earned base stats and earned training resource bonuses. Equip/unequip/purchase must be atomic, stale/invalid/unowned/wrong-slot requests must preserve state, and repeated equip must not stack bonuses. Preserve caps and current/max resource semantics. Draw weapons/armor only after actual ownership/equip; add real art/manifests if drawing them. No invented career weapon or power award.
3. Prove real shop payment, inventory change, modifier removal, sprite layering, training/work behavior and One Life in unit/browser/production checks. Then define earned power/encounter mechanics and choice-based route danger/rewards from those models, preserving exact decision boundaries and manual consent. Never label guessed percentages as simulated survival.

## Remaining / known limitations

V7-5: additional room types/new places and actual route encounters/rewards. Later: full ≥100 coherent forks/≥100 reachable endings; combat equipment/modifiers/shops; graded affinity/power/title/aura/breakthroughs; actual combat/dungeons; businesses/crafting; important NPCs/companions/relationships; mortality/lifespan extension/eras/≥1000-year deity routes. Shared regional rooms do not distinguish every family's wealth or weather/daylight; those systems are not simulated here. Detailed optional reader stays outside rather than guessing venues. Parent portraits remain fixed birth-reference profiles; no parent NPC aging/lifespan is implied.

No known unresolved regression in completed local tests. Physical iOS/PWA/native unload behavior remains outside guaranteed Chromium coverage. Public/CI status is recorded separately below, without treating push success as deployment proof.

## Files changed this round

New: `src/data/interiors.js`, `src/world/scene-context.js`, `src/ui/interior-art.js`, `scripts/generate-interior-assets.mjs`, `scripts/verify-interior-assets.mjs`, `scripts/published-interior-check.mjs`, `tests/scene-context.test.js`, `tests/browser/interiors.spec.js`, `public/assets/scenes/interiors/**`, `docs/art/starfall-hall-source.png`.

Updated: scene renderer/styles, content/production/progression scripts, package/lock (0.12.0), staged-file workflow validation, AGENTS/README/GAME_DESIGN/ROADMAP/CONTENT_MANIFEST/CHANGELOG/USER_DIRECTIVE_V7/art provenance/NEXT and generated root index/assets. Source remains app.html/src/public; root publication files are generated. Keep old hashed assets and main:/ Pages configuration. No active-save or birth/state migration is introduced.

## Commit / publication

Base `88490704651b73b62e3b7d70e589bf36a119c2ad`. Prior 0.11.0 full test/composition/build/deploy/live workflow [40881537802](https://github.com/Ninon0406/alltest/actions/runs/40881537802) passed.

0.12.0 source work is pending its implementation commit and publication verification. Build currently stages `assets/app-DBrAbMLw.js` / `assets/app-DtLojNI8.css`. After committing, push normally without force; verify branch Pages and full workflow, fetch actual public HTML, then run all three public scripts. Record confirmed commit/run URLs here in a documentation-only follow-up. Never mark all V7 complete.
