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
