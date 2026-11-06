# Session17 — 0.7.2 staged art and Koro

Started from main `78a2497` (published 0.7.1, source `5847801`). Read the continuation, roadmap, recent log, architecture and matching local skills. Inspected the ten-scene contact sheet, reference08 and real before/after runtime screenshots. No new project, story replacement, free-roam or save backend.

## Delivered and verified locally

- `art-assets.ts`: static local catalog, shared/stage groups and a RAM-only attempt ledger. Title loads23PNG instead of57. Scene changes and selected-file imports prepare destination art before committing the new state. Cached scene revisits request no additional art.
- Thai loading/fallback/retry UI; explicit retry only. Failed files do not retry on travel. A stuck request has a per-file8000ms XHR timeout, maxRetries0. Image and spritesheet settings are both explicit because Phaser4.2.1 per-file defaults override the global timeout with0.
- Retry updates the renderer without session.commit/load, preserving runId/revision/RNG/inventory/flags, dirty-file warning, current menus and seated anchor. Loading disables action/file controls until a consistent checkpoint exists. No state goes into asset URLs, storage or uploads.
- Original Koro32×48 atlas with12 cells: idle, hammer and recipe gestures; anvil48×32 with real grounded contact. CH0401 shows the three-sigil recipe; S05 holds it. Koro forges at the anvil in S04, freezes with Reduced Motion, and falls back to legacy idle if art is missing. Anvil is hidden in training combat and restored afterward. No combat/story/reward/recipe rules changed.
- Art remains a prototype. Reference08 has not been converted into a complete high-detail scene or collision map. Old60PNG are retained byte-identically; two new files total10,905bytes, hashes in [art-integrity.json](art-integrity.json).

## Evidence

- [Before budget](before-budget.json): actual0.7.1 title on390/1366 viewports:57PNG/629,017encoded bytes. Before images: [phone](before-koro-390.png), [desktop](before-koro-1366.png).
- [Focused browser log](focused-browser.txt):12/12PASS,1.2min. Five viewports390×844,844×390,820×1180,1024×768,1366×768 for Koro; loading budget, unvisited destination import, repeated abort, shared atlas recovery, seated checkpoint, dirty/clean file flags and actual stalled-request timeout.
- [Koro hammer](koro-hammer-390.png), [recipe](koro-recipe-1366.png), [fallback](art-retry-before-390.png), [recovered seated checkpoint](art-retry-after-390.png). Before/after are genuine screenshots at different animation frames, not a pixel-diff regression baseline.
- [Deployment verifier](verify-staged-art.mjs): UI/file-picker/cold-warm metrics/retry/RAM integrity/no storage/no uploads, run against the actual URL when published. Controlled network faults are test injections, not claims of production outages.

## Test issues preserved

First focused run exposed Phaser's default two retries: three requests instead of one. Corrected maxRetries0. Stalled-request test then exposed zero per-file timeout overriding global8000. A first patch failed TypeScript because XHR settings require responseType; the attempted tests still used the last successful build. Corrected responseType:'blob', required a successful build, verified actual XHR.timeout values8000, reran all12 tests successfully. Also corrected a new test's Thai button label to the actual existing label. No assertions removed/skipped or gameplay rules weakened.

Full regression, PR/main CI, deployment and public results are recorded in [REPORT_TH.md](REPORT_TH.md) and verification.json after those gates actually run. Hardware iOS/Android/iPadOS/Safari, FPS/thermal, full visual acceptance and human fun testing remain unverified. Manual File Save stays State2/File2; no automatic recovery.

Final audit before merge reproduced HTTP200 + damaged PNG: legacy fallback worked but status stayed ready and retry was absent ([before proof](decode-failure-before.json)). Marked FND004 problem, added batch reconciliation of requested vs successfully decoded files, and tested initial shared image plus lazy garden layer. Both now recover with unchanged RAM. Final126unit/12focusedPASS. Earlier104-case local run and PRCI42207916293 were cancelled because their source was superseded; neither is reported as a completed passing gate.
