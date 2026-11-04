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

Final strict typecheck and lint pass after browser test additions. Content 2/2 and unit/integration 14/14 passed. `git diff --check` passes. Public Pages/remote CI results are separate from these local checks.
