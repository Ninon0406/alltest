# Test report — 2026-11-04 UTC

## Verified local checks

- `npm ci --prefix GODSEED`: PASS (153 packages). Dependency warning: ESLint 9 vendor support status is deprecated; build/lint works with the locked stack, future dependency maintenance needed.
- `npm run typecheck --prefix GODSEED`: PASS, strict TypeScript
- `npm run lint --prefix GODSEED`: PASS
- `npm run validate:content --prefix GODSEED`: PASS, 2 graph/branch tests
- `npm test --prefix GODSEED`: PASS, 14 unit/integration tests
- `npm run build`: PASS, production bundle plus staged Pages root. Main JS approximately 1.49 MB / 403 KB gzip; not a measured FPS/hardware result

Checks cover 336 candidates / 234 unique legal recipes and per-modifier counts, finite definitions, transaction rejection without material loss, first discovery, starter no-farm, duplicate equipment rejection, opening-to-forest-to-hub path, deterministic combat, zero-MP fallback, defeat checkpoint, items and repeat-win reward idempotency. Unit tests explicitly use boundary fixtures for zero-MP/low-HP negatives; the golden browser flow uses real actions without injected gameplay state.

## Browser verification

Initial production run: six portrait/tablet/desktop cases passed; 844×390 failed because Canvas overflow intercepted the inventory click. Fixed world overflow containment and desk stacking, with world canvas pointer events disabled because player input is DOM choices. Full final rerun recorded below when complete.

Screenshots: `test-results/title-360.png`, `battle-360.png`, `battle-768.png`, `battle-1366.png`, `loop-<width>x<height>.png`; CI uploads these as `godseed-browser-evidence`. Local test-results is intentionally ignored by Git.

## Explicit limitations

Not full chapter/boss/endings acceptance. Not 234 behavior/VFX golden render cases. No actual iOS/iPad Safari/Android/Windows/macOS hardware tests or measured 50/50 play duration. No audio. No imported old GODSEED versions exist; next schema needs migration tests. No claim public deployment before main merge. Save/export/import exists; automated browser coverage currently emphasizes stable-boundary autosave/reload rather than every failure/import path.

## Final rerun: PASS

`npm run test:e2e --prefix GODSEED`: **9/9 passed in 2.0 minutes**, zero skipped. Seven real start→gather→craft→auto-equip→battle→win→clue→village→inventory→save/reload paths at 360×800, 390×844, 768×1024, 1024×768, 1366×768, 1920×1080, 844×390. Extra tests cover actual /alltest/ static subpath assets, keyboard Enter, skip, double click without duplicate feather, reload/continue, and touchscreen tap.

No pageerror or HTTP ≥400 observed in the seven loops or subpath case. Assertions include no horizontal overflow. These are Chromium browser simulations, not real hardware. Phone 360px and desktop 1366px battle screenshots were visually inspected; art is still provisional, not visual-gate accepted. Portrait 430×932, 820×1180 and desktop 1440×900 are not separately tested this round.

Final strict typecheck and lint pass after browser test additions. Content 2/2 and unit/integration 14/14 passed. Source whitespace check passes. Compiled Phaser vendor license blocks contain upstream trailing spaces; `.gitattributes` excludes only generated bundle JS from whitespace checks. Public Pages/remote CI results are separate from these local checks.

## GitHub and public release proof

- Installation `220e992` preserved in the PR ancestry and pushed; implementation `74b37c4`, source-check notes `dc7191b`; PR #1 merged into main at `ba3d3eabe40524e7c9570adec9c3d9c2113170cd`.
- PR CI [41917050132](https://github.com/Ninon0406/alltest/actions/runs/41917050132) SUCCESS including browser checks and uploaded evidence.
- Existing main:/ Pages [41917826588](https://github.com/Ninon0406/alltest/actions/runs/41917826588) SUCCESS.
- Public https://ninon0406.github.io/alltest/ PASS via `node GODSEED/scripts/verify-public.mjs https://ninon0406.github.io/alltest/`: touch/start/gather/craft/auto-equip/B01/win/clue/hub/reload/continue, no observed page errors or HTTP failures.
- Public bundle SHA-256 `8809c91ca8a5f093ecdb7c266e96dd2b57c64e52185560e8cf63668ad5bc1a97`, equal to staged local bytes. Screenshot `test-results/public-battle-390.png`. Public validation ran twice successfully (temporary verifier, then committed-path reusable verifier).
- First check before Pages completed correctly rejected stale old HTML. A Node APIRequest fetch later encountered EAI_AGAIN due executor direct DNS; changed verification to browser fetch through the configured browser networking. Neither attempt was reported as a game success. Successful reports above use actual public responses.

Main Actions [41917827558](https://github.com/Ninon0406/alltest/actions/runs/41917827558) SUCCESS: build job 126882080674 completed all checks; deploy job 126883733592 completed configure-pages and deploy-pages successfully at 2026-11-04 21:40:53 UTC. Final gameplay source is the merged ba3d3ea tree; later release-evidence edits do not change that bundle.

Post-Actions deployment public rerun also PASS using the reusable verifier: same SHA-256, actual touch/craft/B01/return/reload flow and empty observed error list. Three successful public loops in total; the final one verifies the Actions-deployed site.

# Session 2 — 0.1.1 save recovery (2026-11-04 UTC)

All earlier sections above record 0.1 publication history; current changes and limitations are in this section.

- Baseline before modifications: typecheck/lint/content 2/unit 14/build PASS.
- Reproduced the original backup-corruption bug with `npx vitest run tests/save.test.ts`: FAIL before implementation, PASS afterward. No test disabled to obtain a pass.
- `npm ci --prefix GODSEED`: PASS, 156 development/runtime packages. Existing ESLint vendor-support warning remains; no runtime dependency added.
- `npm run test:all --prefix GODSEED`: PASS strict TypeScript, ESLint, content 2/2, unit/integration **27/27**, production build. Save tests exercise actual fake-indexeddb transactions, abort/rollback, corruption, concurrent transaction serialization, duplicate writes, archive retention/retry, canonical SHA-256 files, undefined completed-combat fields, legacy raw-v1 files, malformed/changed/unknown/oversized inputs, and explicit memory fallback.
- Focused new storage Playwright suite initially **6/6 PASS** in 21.7s. Expanded full rerun adds a landscape memory-mode case and all ten required viewport sizes; final result will be recorded below.
- Game data not injected into golden paths. Corruption/storage-denial/quota fixtures deliberately modify browser storage methods only for negative/recovery scenarios and are not counted as authored content.
- Game state/database remain version 1. No new gameplay schema migration, chapter content, final art or hardware performance acceptance is claimed. Unknown future versions reject safely; raw 0.1 state files remain usable.
- `docs/GODSEED_MASTER_SPEC.md` is an exact copy of supplied root spec (SHA-256 451ce8aa3e95ee291aa3782a74c7037cd1b0196b92837bf03ad7e33ebc44879d).

Current limitations: browser/hardware Safari tests, cross-tab conflict resolution, future state-schema migrations and PWA remain pending. Memory mode cannot preserve unsaved progress across reload without export or successful retry. Checksum provides corruption detection rather than authenticity.

Expanded browser suite: **19/19 PASS in 3.0m**, zero skipped. Ten full first-slice loops (all ten required viewports), Pages subpath/keyboard/skip/double click, touchscreen tap, corrupt-primary recovery, checksum export/import/rejection, legacy import/cancel, memory-mode portrait/landscape, quota-failure retry and accessible archived runs. The 360px path reloads after an actual battle spell and asserts identical player HP/MP and enemy HP on continue.

Final review added a further regression for a transient startup read failure hiding an older durable run, followed by memory play, retry and another autosave. This failed before the extra different-run archival write. The fix archives the valid older run in the same save transaction and refreshes the archive list after retry. Latest unit/integration total is **28/28**; targeted browser storage suite is rerun after that boundary change, and remote CI reruns all 19 before merge.

After the additional retry archival fix: targeted browser storage **7/7 PASS in 22.7s**. Final typecheck/lint/content 2/unit+integration 28/build passed again after Thai-only recovery wording. `git diff --check` clean. Source counts rechecked: 13 scenes / 39 choices; definitions remain 234.

Final title-form review: preserve the typed name across cancelled import and disable editing during startup/async work. Added the assertion to the legacy-import browser case. Latest typecheck/lint/content 2/unit+integration 28/build PASS; targeted storage suite **7/7 PASS in 23.9s** after this UI adjustment. No additional gameplay rule changes.

## 0.1.1 remote CI and public proof

- Implementation `8a2b08d`, title-input refinement `927fb3e`, PR #2 MERGED at `2c4ba8d4397788ad7598f29d1e13285ffcc23fe6`.
- [PR CI 41922783511](https://github.com/Ninon0406/alltest/actions/runs/41922783511) SUCCESS including all current browser tests and evidence upload. The earlier run on a superseded commit was cancelled to avoid redundant runner work; it is not counted as passing CI.
- [main:/ Pages 41923735255](https://github.com/Ninon0406/alltest/actions/runs/41923735255) SUCCESS.
- Public command `node GODSEED/scripts/verify-public.mjs https://ninon0406.github.io/alltest/` PASS: actual touch/start/gather/craft/equip/B01/win/clue/hub/reload/continue, then checksum export and import round trip. Observed page-error/HTTP failure list empty.
- Public JS SHA-256 `a868db3cf9c4ee9194d40a3ff544c66e9467d5f3dea23a5634de813ba068ce1e`, equal to local staged build. Independent canonical hash of the downloaded save matches its checksum and the save contains the actually completed clue flag. Screenshot test-results/public-battle-390.png.

[Main workflow 41923735832](https://github.com/Ninon0406/alltest/actions/runs/41923735832) SUCCESS. Build job 126902572225 completed the full current suite; deploy job 126904802941 completed configure-pages/deploy-pages at 2026-11-04 22:20:34 UTC. Release-evidence edits after this point do not change the game bundle.

Post-Actions public HTML/JS hash gate PASS: same a868db3cf9c4ee9194d40a3ff544c66e9467d5f3dea23a5634de813ba068ce1e. This confirms the Actions-deployed bundle matches the already validated public gameplay/checksum/import loop.

# Session 3 — 0.2.0 combat and training (2026-11-04 UTC)

Base3ca8268 working tree clean and latest remote CI passed before work. All earlier session sections describe their own release; current model is State2, database1, checksum envelope1.

- npm ci: PASS (same156 locked dependencies; existing ESLint support warning, no new runtime dependency).
- Strict TypeScript, lint, content2/2, production build: PASS.
- Unit/integration/balance **59/59 PASS** across four files; includes 24 combat cases, original save/loop regressions and original raw-V1 snapshot retention. All234 recipes actually craft with explicitly supplied later-material fixtures and resolve a finite meaningful first turn; this does not imply current story access to every ingredient.
- Reproducible balance tests: **600 victories, zero losses/unfinished**, 100 seeds ×2 encounters ×3 policies.400 runs use actual story collection/crafting;200 explicitly inject MP0 as negative fixtures. See BALANCE.md for max turns/min HP and scope limits.
- New focused browser suite4/4 PASS in40.5s on phone390, iPad820, desktop1366 plus active-battle V1 restore. Full suite then **23/23 PASS in3.4m**, zero skipped: existing ten-viewports forest loops, keyboard/subpath/touch, seven save-recovery cases, three new HEAL/FIRE/practice/surrender/reload paths and a true V1 IndexedDB battle fixture.
- V1 fixture preserves runId/seed/rng/revision/resources; status help opens by native details; GUARD commits V2 with only the actual action's changes, and legacy-v1:<runId> still equals the original raw record. Node independently hashes original V1 file envelopes before decoder migration; tampering rejected.
- Browser upgrade path consumes actual BLOOM/RING/HEAL, sees enemy HP unchanged on healing, obtains one-time forest-clue FIRE/ORB/SPLIT, reloads after a real practice cast and completes with separate training reward/XP. No gameplay state is injected into those three-device paths. Corruption/migration/zero-MP test fixtures are labelled separately.
- Visually reviewed actual fire-cast-phone.png: Thai text and2×2 loadout fit, workshop/player/provisional spirit visible; art remains prototype. training-{390,820,1366}.png and existing loop/save evidence are uploaded by CI. No actual Safari/hardware/FPS or50/50 pacing claim.
- git diff --check clean. Specs/skills and existing art assets preserved; canonical master spec unchanged.

Remaining acceptance: full party/multi-enemy targeting, mastery/earned levels, boss resistance/phases, chapter endings, full234 VFX visual distinctness and final art. LIGHT dispels VEIL before hit resolution, including a miss; new enemy VEIL counts its current enemy phase and may appear in the log rather than a next-turn chip. Status interpretations are recorded in DECISIONS/BALANCE rather than silently changing the spec.
