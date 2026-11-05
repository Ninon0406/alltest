# QA matrix — 0.3.0 / 2026-11-05 UTC

| Environment | Flow | Result |
| --- | --- | --- |
| Chromium 360×800, 390×844, 430×932 | Full first slice, craft/equip, B01, clue, reload/continue, no horizontal overflow/pageerror/HTTP failures | PASS |
| Chromium 768×1024, 820×1180, 1024×768 | Same real actions | PASS |
| Chromium 1366×768, 1440×900, 1920×1080 | Same real actions | PASS |
| Chromium 844×390 | Same, inventory pointer accessibility | PASS |
| Chromium /alltest/ static subpath | production paths, keyboard, skip, double click, reload | PASS |
| Chromium mobile hasTouch | Start and choice by tap | PASS |
| Chromium 390×844 recovery cases | corrupt primary, checksum round trip, altered file rejection, raw-v1 import/cancel, new-run archive restore | PASS |
| Chromium 390×844 and 844×390 memory mode | denied IndexedDB, choices, warning/export, no overflow, no false continue on reload | PASS |
| Chromium 390×844 write-failure fixture | disk unchanged, memory action once, retry clears warning, reload resumes durable progress | PASS |
| Public Pages 390×844 Chromium touch | first slice + reload + exported checksum + import round trip + JS byte hash | PASS |
| Actual iOS/Android/iPad/macOS/Windows hardware and Safari | physical input and performance | NOT TESTED |
| Full chapter/3 endings/all elemental mechanics/final HD visual gate | future milestones | NOT IMPLEMENTED |

Evidence: test-results/save-recovered.png, save-memory-mode-{390,844}.png, title-360.png, battle-{360,768,1366}.png, loop-<width>x<height>.png. CI uploads screenshots. Visually inspected 390px memory warning: readable text/export/retry controls, game and touch controls remain available; scene art is still provisional. Screenshots are actual runtime, not design mockups. No FPS or 50/50 pacing claim.

## 0.2.0 update

Full suite23/23 PASS. All ten viewport loops and0.1.1 recovery checks retained. New phone390×844/iPad820×1180/desktop1366×768 paths craft/use WIND, HEAL and FIRE, surrender practice, resume stable practice turn and win with the correct separate reward. Dedicated original V1 active-battle storage fixture migrates on commit without losing the raw original. State/help bars/log/two-column slots inspected in actual screenshots; CSS flex canvas boundary and moving shadows improved. Real hardware/Safari and final HD visual acceptance still NOT TESTED/PENDING.

Public0.2.0: real Pages touch path passed forest→FIRE crafting→workshop practice→win→State2 checksum export/import; public-training-390.png is actual public evidence. Main build/deploy41929504279 succeeded. This adds no claim of real-device or full-art acceptance.

## 0.3.0 scope

Retain all ten viewport golden paths and save/battle suites. Added genuine skip-on-walk then pickup/read-only durable-save assertions; OS reduced-motion and mid-action toggle; intentionally aborted layered PNG with accessible fallback; actual workshop defeat/reaction before recovery; layered village/garden/workshop and original practice-spirit screenshots at390×844,820×1180,1366×768. No gameplay-state injection in these paths. Missing-network/storage/migration fixtures are explicitly negative tests. Local30/30 PASS5.4m after portrait correction; final focused9/9 PASS1.1m after landscape correction. PR CI runs final31 cases. See TEST_REPORT for release proof. Actual background-tab/hardware/Safari performance is not newly certified.

Portrait HUD now flows below the canvas rather than covering actor feet; bounds are asserted on phone/iPad art routes. Desktop/short landscape layout retains its existing controls.

844×390 original golden path and new canvas/world/desk geometry PASS. Manual review verifies full-stage visibility after removing inherited aspect-ratio grid overflow. All three new visual device routes PASS after both fixes; browser simulation remains distinct from hardware acceptance.
