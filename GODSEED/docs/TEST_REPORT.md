# Test report — current0.4.1 /2026-11-05 UTC

Latest0.4.1: **87/87 unit/integration/balance/art, content2/2, production build, final41-case PR/main browser CI and public gameplay/save/art verification PASS**. Main:/ Pages and main Actions build/deploy succeeded; post-Actions byte/renderer gate passed. Earlier sections preserve historical releases; Session6 contains current evidence and limitations.

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

## 0.2.0 release proof

- Implementation bd6f705; [PR #3](https://github.com/Ninon0406/alltest/pull/3) MERGED at2eec3a1a2322c13b884cb00f70da63a045d7dccc.
- [PR CI41928767310](https://github.com/Ninon0406/alltest/actions/runs/41928767310) SUCCESS including all current tests/browser cases and artifact upload.
- [main:/ Pages41929503339](https://github.com/Ninon0406/alltest/actions/runs/41929503339) SUCCESS.
- Updated verifier first PASS on production preview, then actual public command `node GODSEED/scripts/verify-public.mjs https://ninon0406.github.io/alltest/` PASS: touch/start/forest battle/clue/reload/FIRE craft/practice/win/export checksum/import. Output trainingAndFire=true, checksumExport=true, importRoundTrip=true, empty observed page-error/HTTP-failure list.
- Public JS SHA-25631f46957156b2cd0c6243e964206f01448f9bc496eabb2dcca3db7373e0b80ff equals local staged bytes. Exported State2 contains actual slice_complete/training_won flags and independent canonical save checksum matches. Evidence public-training-390.png and public-battle-390.png.

[Main workflow41929504279](https://github.com/Ninon0406/alltest/actions/runs/41929504279) SUCCESS. Build126922499789 completed all59 unit/integration/balance cases and23 browser cases through the standard scripts; deploy126924282167 completed configure-pages/deploy-pages at2026-11-04 22:59:58 UTC. Later evidence-only edits do not change the game bundle.

Post-Actions public HTML/JS hash gate PASS: same31f46957156b2cd0c6243e964206f01448f9bc496eabb2dcca3db7373e0b80ff. Confirms the Actions-deployed bytes match the production-preview/full-browser and public gameplay/fire/practice/save validation.


# Session4 — 0.3.0 layered presentation (2026-11-05 UTC)

This section describes the current release; earlier sections retain historical results.

- Base9c71ea7 was clean; prior installation220e992 is an ancestor and all previous releases are on origin/main. No open PR before work. Current changes are presentation/art/tests/docs; engine/content/systems and State2/DB1/file-envelope1 remain unchanged.
- `npm ci --prefix GODSEED` PASS156 packages; same locked stack, existing ESLint support warning, no new dependency.
- `npm run test:all --prefix GODSEED` PASS: strict TypeScript/lint, content2/2, unit/integration/balance/art63/63, production build. Four new art tests inspect PNG bounds/layers/alpha/actual animated frames/unused cells/distinct practice silhouette. Previous600 deterministic combat simulations and all59 existing tests retained.
- `npm run generate:art --prefix GODSEED` independently SHA-256 checked before/after:27PNG identical; no changed/added/removed file and no legacy PNG Git diff. New16 source PNGs occupy approximately256KiB on disk;8 actor sheets include6 retained and2 new.
- Build after HUD fix PASS: JS1,518.91kB/gzip411.48kB; final CSS6.40kB/gzip2.09kB. Root staging preserves all old compiled hashes. Bundle size is not an FPS/hardware measurement.
- New targeted visual suite7/7 PASS in49.7s before HUD adjustment. Covers genuine walking→skip→read-only saved revision/choice exactly once→pickup; initial OS reduced motion/frozen ambient/pose and full→reduce mid-action; one intentionally aborted new PNG with Thai fallback and continued choice/save;33 genuine training guard turns→full-motion lethal guard→hit reaction on old workshop→70HP/20MP village recovery/no win reward;3 device art routes and practice victory.
- First terminal-reaction assertion used slow default polling and missed a real400ms interval; switched to read-only RAF observation registered before the action. Production timing unchanged. No test disabled, no gameplay fixtures injected into these new routes.
- Actual screenshot review found portrait HUD covering actor feet; changed portrait layout so HUD flows below canvas and can wrap long names. Added bounding-box assertions on village/garden/workshop/practice for390/820px. Full30-case suite is running against the rebuilt production artifact; results follow when complete.
- Renderer read-only data attributes describe real phase/pose/texture/layers; tests read durable IndexedDB after actions rather than substituting fake gameplay state. Existing explicit storage-corruption/migration/zero-MP fixtures remain labelled negative tests.

Still prototype: final HD/NPC silhouettes/complete VFX234/hardware FPS/Safari and real mobile devices are not certified. No new full chapter/boss/ending or recipe is claimed. Real background-tab behavior is not independently automated in this round; ambient is gated by document visibility and existing Phaser pause, but no hardware background/power claim is made.


Full local suite after portrait HUD correction: **30/30 PASS in5.4m**, zero skipped. All ten viewport loops, storage recovery and combat/migration regressions passed with no unexpected observed page/HTTP failures. Phone practice screenshot now shows actor feet and spirit above the separate HUD.

Final manual landscape review exposed a pre-existing aspect-ratio/grid issue:844×390 assigned~411px to the scene but `.world` preferred589px from its331px height; the desk hid the right portion. Explicit short-landscape width100%/aspect-ratio:auto fixes the root sizing. A new31st regression asserts actual scene/canvas bounds rather than relying solely on document scrollWidth. Focused post-fix and final remote results follow.

Final short-landscape correction: focused **9/9 PASS in1.1m**, zero skipped: all8 visual regressions (including new full-canvas boundary case) plus the original real844×390 forest/craft/save loop. TypeScript/lint PASS after final test addition. Final screenshot visual-landscape-844.png visibly contains both actors and the entire stage; phone visual-training-390.png has an unobscured ground lane; desktop training and tablet garden/village reviewed as actual runtime images. Prototype art gate remains open.

Updated production verifier PASS against final preview: touch/start/forest/clue/reload/FIRE crafting/original practice/win/independent save checksum/import; all16 new PNGs hash-equal to sources; observed page/HTTP errors empty. JS SHA-256 `d6fd27d74c3531dc620cb8fb06a2f5ec2d5352314c51eea8fe81da0da8b1025d`. This is preview proof; public0.3.0 is not claimed until remote publish/verification. PR CI will run the entire final31-case suite.


## 0.3.0 remote release proof

- Implementation00462f9; [PR#4](https://github.com/Ninon0406/alltest/pull/4) MERGED at255e79f4fef2c36d02c03e192ccba47fd4400d1b. Merge tree equals the validated implementation tree.
- [PR workflow41950932784](https://github.com/Ninon0406/alltest/actions/runs/41950932784) SUCCESS: locked install/test:all/stage/Chromium/full browser/evidence upload/Pages artifact upload all steps successful. Final browser suite contains31 cases and no skipped/fixme declarations. Remote run and step statuses were read through GitHub API; raw log archive download returned403, so no remote per-case timing is asserted.
- [main:/ Pages41951619769](https://github.com/Ninon0406/alltest/actions/runs/41951619769) SUCCESS. [Main workflow41951619885](https://github.com/Ninon0406/alltest/actions/runs/41951619885) SUCCESS.

- Actual public command `node GODSEED/scripts/verify-public.mjs https://ninon0406.github.io/alltest/` PASS: touch/start/craft/forest/clue/reload/FIRE craft/original practice spirit/win/export checksum/import. All16 new PNG hashes equal source; layered stage3 and training-v2 asserted. Independent canonical checksum matches exported State2 with slice_complete/training_won flags. No observed pageerror/HTTP failures.
- Public JS SHA-256 `d6fd27d74c3531dc620cb8fb06a2f5ec2d5352314c51eea8fe81da0da8b1025d` matches final staged local build. Evidence `test-results/public-battle-390.png` and `public-training-390.png`. Browser simulation; real hardware remains untested.


Main workflow41951619885 final SUCCESS: build126996643097 completed all checks including full31-case browser suite; deploy126998774927 completed configure-pages/deploy-pages at2026-11-05 02:00:36 UTC. Post-Actions public HTML/JS and all16 PNG byte-hash gate PASS with the same `d6fd27d74c3531dc620cb8fb06a2f5ec2d5352314c51eea8fe81da0da8b1025d`, actual renderer ready/3layers, and empty observed error list. This confirms the Actions artifact matches the already validated public gameplay/fire/practice/checksum/import flow. Final evidence-only documentation changes do not change game source/assets/bundle.


# Session 5 — 0.4.0 archive and stream (2026-11-05 UTC)

Earlier sections retain historical release results. Base `3dc997f` was clean and matched origin/main, with successful previous CI/Pages and no open PR. Owner documents, canonical spec, ten Skills and all previous assets remain. Locked install completed with the same 156 packages and existing ESLint support warning; no dependency added. Baseline typecheck/lint/content2/unit63/build passed before edits.

- Final `npm run test:all --prefix GODSEED`: PASS strict TypeScript, ESLint, content **2/2**, unit/integration/balance/art **81/81**, production build and root staging. JS 1,533.36 kB / 415.36 kB gzip; CSS 6.70 kB / 2.17 kB gzip. File size is not a measured loading-time/FPS result.
- Thirteen new exploration tests cover all nine archive branches, shared UI/reducer eligibility, repeat gifts/trust, daily rewards, real WATER/ECHO crafting, cleanup persistence, fact-based memory, B02 telegraph/status/reward/escape/recovery and save compatibility. Two art tests validate new PNG/fallback/alpha/atlas/silhouette behavior. Three new balance cases add 300 simulations; the previous 63 cases remain.
- **900 simulations: 900 wins, zero losses/unfinished**, seeds1–100 across three encounters and three policies. 600 use actual authored collection/crafting; 300 explicitly set MP0 as negative fixtures. Independent verbose balance output gives B02 maximum turns 3/13/8 and minimum ending HP84/28/59. Older encounter results unchanged; see BALANCE.md.
- `generate:art` SHA-256 audit: all **39 PNGs byte-identical** before/after regeneration. Twelve new art-v3 files; no old PNG or original generator changed. Six layered stages, new opaque fallbacks, bounded transparent mist, six water frames and distinct Eira/wisp sheets are validated.
- New focused browser **5/5 PASS in 1.5m**. Three real touch routes at390×844,820×1180,1366×768: archive → materials → craft/equip ECHO_ORB_LINGER and WATER_RING_HEAL → B02 → Echo → reload/compare complete saved snapshot → heal/WIND/basic → win → bell → clean stream → Eira reaction → clue journal. No gameplay-state writes or engine hooks; IndexedDB reads are read-only. Positive paths observed no pageerror/HTTP failures; canvas/HUD bounds asserted at390/820.
- Separate non-combat route hears the bell, learns WIND, then skips a genuine full-motion cast. Revision/choice commit once, MP unchanged, no battle reward, mist clears, and listening cannot undo cleanup. A deliberately aborted archive-rear PNG proves readable fallback and continued choices/save; expected resource failure is not counted as a clean positive-network test.
- Two test-authoring mistakes were corrected without weakening rules: a real return walk crossed a day boundary, so the setup now rests to align two collections within one day; ECHO+RAY+LINGER is canonically illegal, so the route obtains Koro's extra ORB and crafts legal ECHO_ORB_LINGER. Rejection/consume-once assertions remain. The source inspector initially raced an unnecessary Vite HTML dependency scan; disabling that scan only in the headless inspector yields clean JSON/stderr.
- Actual phone archive/battle screenshots reviewed: grounded actors, readable Thai, full stage and HUD below canvas. Evidence `explore-{archive,stream-fog,stream-battle,stream-clean}-{390,820,1366}.png`. CI uploads the full-suite evidence. Art remains a prototype rather than final HD acceptance.

Source inspector: **17 scenes / 56 unique choices / 5 companion NPC / 3 reachable encounters / 234 unique legal spells / 0 chapter endings / 6 stages**. Ten actor sheets include legacy alternatives. Five distinct spells are learned/used across real browser routes; new games start with an empty book. State2/DB1/envelope1 unchanged. Current battle validation accepts B02; an explicit published0.3 State2 fixture retains every field, checked B02 files round-trip, and old V1 tests still pass. No new required fields/migration or downgrade guarantee.

Full36-case production browser and updated preview/public verifier results remain pending at this checkpoint. Real Safari/iOS/Android/physical iPad/Windows/macOS hardware, FPS and measured50/50 human pacing are NOT TESTED. Ruins/festival/B03–B05/three endings, final NPC/VFX art, audio, party and mastery remain unfinished.


Full production browser suite **36/36 PASS in6.4m**, zero skipped, after the final gameplay/renderer/UI build. All old viewport/save/animation/combat cases and new routes passed. Then expanded new route to iPad landscape1024×768 and made ECHO's browser assertion validate both legitimate95% hit/5% miss outcomes against HP/log, with no seed override; added explicit healing MP/HP benefit assertions. Final typecheck/lint and focused **6/6 PASS in1.6m** cover phone390, iPad820/1024 and desktop1366 plus noncombat/fallback. Final configured full suite is37 cases for CI. A final scene-target presentation correction is recorded below; CI will run all37 cases on that final tree.

Updated preview verifier initially checked for a collapsed hub menu during the asynchronous new-game commit. This was a verifier wait-order error; it now waits for the stable busy=false boundary and only opens an existing summary. Gameplay and prior browser results were unaffected. Preview rerun follows.


Final presentation review found story spell endpoints were still using the NPC position. Added data-driven stage spellTarget anchors: stream bridge330/150 and archive manuscript240/142. Battle/support targeting keeps its existing actor coordinates. The WIND skip case now checks the actual rendered endpoint through read-only diagnostics and captures explore-wind-target-390.png. No gameplay/save change. Final test:all/focused6/production verifier rerun results follow.


Additional real-path regression reproduced a canonical gate bug: a player can craft WATER_RING_HEAL before visiting Koro, but CH0205 still required forest_open alone. A targeted new test failed on the old condition; the shared predicate now accepts forest_open OR crafted_first as prescribed by SSOT. The full unit suite now has81 cases (13 exploration cases); no case disabled. Journal wording also separates clearing mist from retrieving the bell: only CH1201 records the bell rescue. The non-combat WIND browser case checks that it has no bell item/rescue entry.

The public verifier now uses the OS reduced-motion preference consistently across reloads, asserts the matching UI state, and keeps the same real gameplay/save/hash checks. Full-motion/skip/scenery-target behavior is separately covered by the browser suite. This changes verification pace, not game rules. Final current results follow.


Final tree checks: strict TypeScript/ESLint/content2/unit+integration+balance+art **81/81**/production build PASS. Final focused **6/6 PASS in1.6m** after all source fixes (phone390, iPad820/1024, desktop1366, noncombat/actual scene target/skip/truthful journal and missing-PNG fallback). The new first-craft regression now passes in the unfiltered81-case run.

Final production-preview verifier PASS against the staged release: actual touch/start/WIND/forest/clue/reload/FIRE/practice/win/archive/ECHO/WATER/B02/reload/win/bell/cleanup/Eira-memory/checksum export/import. All28 versioned art PNGs match source, current JS SHA-256 `f28e1bea53a80bd676c004411d3dec7dc7d85cb96d50ee755a70c6e45276c1ea` matches staged bytes; observed pageerror/HTTP failure list empty. Final bundle1,533.36kB/415.36kB gzip. Public0.4/remote37-case proof pending before publication claims.


## 0.4.0 remote release proof

Implementation `d65aadd`; [PR #5](https://github.com/Ninon0406/alltest/pull/5) MERGED at `f35b2ad1ef0c7aa02f334ae3c599b05fed686cf8`. Merge tree equals the validated implementation. [PR workflow41960028362](https://github.com/Ninon0406/alltest/actions/runs/41960028362) SUCCESS: install, test:all (81 cases/content2/build), staging, full37-case browser suite and both evidence/artifact uploads all successful. PR deploy job skipped by its intended main-only condition; no browser cases disabled. Remote status/step conclusions inspected through GitHub API; local per-case timings are reported separately.

[main:/ Pages41961019875](https://github.com/Ninon0406/alltest/actions/runs/41961019875) SUCCESS. [Main checks/deploy41961020262](https://github.com/Ninon0406/alltest/actions/runs/41961020262) SUCCESS.


Actual public `node GODSEED/scripts/verify-public.mjs https://ninon0406.github.io/alltest/` PASS: touch/start/craft/forest/clue/reload/FIRE/practice/win/archive/ECHO/WATER/B02/reload/win/bell/clean stream/Eira memory/checksum export/import. Observed pageerror/HTTP failures empty. All28 versioned PNGs and JS SHA-256 `f28e1bea53a80bd676c004411d3dec7dc7d85cb96d50ee755a70c6e45276c1ea` match the staged release. Exported State2 has actual archive_read, stream_clean, battle_B02_done and old slice/training flags; ECHO/WATER recipes were learned through real materials. Independent canonical checksum matches and import restores the archive scene. Evidence public-stream-390.png and public-archive-390.png plus retained public forest/training captures. Browser touch simulation, not hardware certification.


Main workflow41961020262 final SUCCESS: build127027131255 completed all checks including the final37-case browser suite; deploy127029578170 completed configure-pages/deploy-pages at2026-11-05 03:28:23 UTC. Post-Actions public HTML/JS/28PNG/renderer gate PASS with the same f28e1bea53a80bd676c004411d3dec7dc7d85cb96d50ee755a70c6e45276c1ea and empty observed errors. The Actions artifact therefore matches the already verified public old/new gameplay and checksum/import flow. Final evidence-only documentation changes do not alter game code/assets/bundle.

# Session6 —0.4.1 alchemy UI

Clean base09a5c19. Locked install then baseline type/lint/content2/unit81/build PASS (unchanged dependencies). New6 pure rule/view tests cover hidden unknown names, legality/error rejection without loss, known recipes without extra costs, combined discovered-only filters, compact/empty loadout with checksum round trip and invalid/battle rejection. Unit total87/87 PASS. New browser3/3 initially PASS at390/1024/1366: real WIND/BLOOM craft, incompatible/known disabled controls, filters, remove/reload and actual empty-loadout BASIC victory. Current full40-case run and final focused pass follow below. No gameplay fixtures injected in browser routes.

No art/content count increase or save migration. Actual source inspector remains17/56/5NPC/3encounters/234/0endings/6stages. Hardware/Safari/FPS/fullchapter/finalHD remain pending.

Local full40/40 PASS7.9m. Final UI feedback polish hides missing-material warnings for known recipes, disables ingredient selectors during transactions and explains compacting slots. Final strict typecheck/lint and focused3/3 PASS35.7s after rebuilding/staging; full production-preview verifier PASS old/new story/craft/three encounters/reload/checksum export/import,28PNG hashes, no observed errors. Final JS1,537.18kB/416.94kB gzip; CSS7.05kB. Additional real-touch/iPad portrait case expands final CI suite to41; final touch results follow. No art/recipe/save/content change.

Final real-touch4/4 PASS54.5s at390×844,820×1180,1024×768,1366×768. All controls operate through taps/native selects; no pageerrors or horizontal overflow. Source/State2/DB1/envelope1 unchanged after these checks. Final CI runs41 cases. Preview JS SHA-2569c99776baba4c985e62661668e6ef9940a20b85d5f57591cb4fa77ed22e65730, all28versioned PNGs unchanged/matched.

## 0.4.1 remote release proof

Implementation `bb15214`, staged release `196ed16`; [PR #6](https://github.com/Ninon0406/alltest/pull/6) merged at `f57ab5c277b2424082b1a172aa6130d43cf27030`. Merge tree is identical to the validated PR tree. [Final PR workflow41991912483](https://github.com/Ninon0406/alltest/actions/runs/41991912483) SUCCESS: install, test:all (87 cases/content2/build), staging, full41-case browser suite and artifact/evidence uploads. PR deploy correctly skipped by main-only condition; no tests disabled. Earlier preliminary40-case PR run41990978478 also succeeded but final41-case run is the release gate.

[Main:/ Pages41992926258](https://github.com/Ninon0406/alltest/actions/runs/41992926258) SUCCESS. Actual public `node GODSEED/scripts/verify-public.mjs https://ninon0406.github.io/alltest/` PASS: touch/start/WIND/forest/clue/reload/FIRE/practice/win/archive/ECHO/WATER/B02/reload/win/world memory/checked export/import. Observed pageerror/HTTP failure list empty; independent save checksum and import round trip pass. All28 versioned PNGs and JS SHA-256 `9c99776baba4c985e62661668e6ef9940a20b85d5f57591cb4fa77ed22e65730` match staged bytes. Public browser covers retained gameplay/save routes; new preview/filter/unequip paths are covered by final real-touch cases and remote41-case CI on the same bundle. Physical hardware/Safari/FPS remain NOT TESTED.

[Main workflow41992926513](https://github.com/Ninon0406/alltest/actions/runs/41992926513) SUCCESS: build127129200466 completed all87/content2/build/full41 browser gates; deploy127132307241 completed configure-pages/deploy-pages at2026-11-05 08:22:11 UTC. Post-Actions public `--assets-only` PASS: current HTML/JS, all28 PNGs and ready layered renderer, unchanged `9c99776baba4c985e62661668e6ef9940a20b85d5f57591cb4fa77ed22e65730`, empty observed errors. The Actions artifact matches the already verified actual public gameplay/save loop. Final release-evidence documentation edits do not change code, assets or bundle.

# Session7 —0.4.2 roadmap + cinematic paths (2026-11-05 UTC)

Clean basef0eb125, branchfeat/godseed-roadmap-cinematics; latest0.4.1 main CI41992926513/Pages success inspected and no open PR before work. npmci/baseline strict/lint/content2/unit87/build PASS; no dependency changes. Read03/spec/skills/project records before choosing GS-041 and GS-010.

New pure cinematic tests3/3 validate actual choice/stage associations, bounded visible paths/support anchors, retreat and wrong-stage/combat isolation. Total game unit/integration/balance/art90/90 PASS; content2/2 and strict TypeScript/ESLint/build PASS. Initial focused cinematic+visual12/12 PASS1.3m, but real desktop screenshot showed bench occlusion; this was not accepted as visually correct. After support anchor/depth/shadow correction, final touch4/4 PASS31.4s atphone390/iPad820portrait+1024landscape/desktop1366. Read-only diagnostics observe actual rendered approach→pickup/rest anchors; actualIndexedDB validates revision once, feather1 and reload. No gameplay writes/testfixtures in these golden paths. Existing reduced-motion/skip/fallback/loss cases retained; one existing assertion now expects walk during the newly added approach before pick_up.

Roadmap validator/counting tests5/5 PASS including duplicate/unknown/cyclicIDs, missing files, unsupported status and DONE without proof; percentage onlycreditsDONE and deterministic generated checklist matches checkboxes. `roadmap:check` runs in test:all/CI. This proves metadata consistency, not completion of unimplemented gameplay. 03 original bytes preserved as exact prefix, roadmap instructions appended.

Final full45-case browser suite, preview/public release and remoteCI results follow when complete. No hardware/Safari/FPS/234VFXgolden/finalHD/fullchapter acceptance claimed. Source counts17/56/5NPC/3encounters/234legal/5observedrealcrafted/0endings/6stages, State2/DB1/envelope1, original39PNG unchanged.

Full-suite regression: WIND skip case timed out waiting for a skip button after its pre-skip full-page screenshot. Presentation refactor had also unintentionally shortened cast/craft holds by removing their original no-distance yoyo. Reproduce/snapshot confirms the game already committed to stream result, not a gameplay deadlock. Restore original total cast/craft holds1120/1600ms; inspect target then tap skip before taking the settled screenshot. No test removed or skipped. VIS-006 was moved to problem during correction; final full rerun is required before restoring DONE. The WIND screenshot is now after settling, not proof of a mid-cast render.

Initial full45 result44PASS/1FAIL8.3m (the WIND skip timing case above), zero skipped. After correction, roadmap5/type/lint/content2/gameunit90/build PASS again; final staged JS is index-vaSgvZ5Q.js (~1,539.26kB/417.52kBgzip). Full45 rerun on that final bundle is in progress; earlier preview proof belongs to the superseded index-A1R1SRl4.js and is not final-release proof.
