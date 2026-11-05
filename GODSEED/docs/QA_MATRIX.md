# QA matrix — 0.4.1 / 2026-11-05 UTC

Current0.4.1: final PR/main full41-case browser checks SUCCESS, local87/content2/build PASS, public old/new gameplay/save flow and post-Actions28PNG/JS/renderer gate PASS. Physical hardware/Safari and final art acceptance remain NOT TESTED/PENDING. Earlier version sections retain their historical results.

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

Retain all ten viewport golden paths and save/battle suites. Added genuine skip-on-walk then pickup/read-only durable-save assertions; OS reduced-motion and mid-action toggle; intentionally aborted layered PNG with accessible fallback; actual workshop defeat/reaction before recovery; layered village/garden/workshop and original practice-spirit screenshots at390×844,820×1180,1366×768. No gameplay-state injection in these paths. Missing-network/storage/migration fixtures are explicitly negative tests. Local30/30 PASS5.4m after portrait correction; final focused9/9 PASS1.1m after landscape correction. PR CI41950932784 SUCCESS with final31-case suite. See TEST_REPORT for release proof. Actual background-tab/hardware/Safari performance is not newly certified.

Portrait HUD now flows below the canvas rather than covering actor feet; bounds are asserted on phone/iPad art routes. Desktop/short landscape layout retains its existing controls.

844×390 original golden path and new canvas/world/desk geometry PASS. Manual review verifies full-stage visibility after removing inherited aspect-ratio grid overflow. All three new visual device routes PASS after both fixes; browser simulation remains distinct from hardware acceptance.

Public0.3.0 Pages PASS: actual touch/forest/FIRE/practice/win/reload/checked save export-import, all16 new PNG hashes and current JS hash, layered3 stages and original training texture. Observed error list empty. Main:/ deployment41951619769 succeeded; main Actions final gate recorded in TEST_REPORT.

Main workflow41951619885 build+deploy SUCCESS (2026-11-05 02:00:36 UTC). Final full31 browser suite successful; post-Actions public HTML/JS/16PNG hash+renderer gate PASS, same verified bundle.


## Session5 —0.4.0

Focused new5/5 PASS1.5m:390×844/820×1180/1366×768 actual touch/archive/materials/ECHO+WATER/B02/reload/full durable snapshot/win/bell/cleanedstream/Eira-memory/cluejournal; no pageerror/HTTPfailure in positive paths. Canvas/HUD bounds checked at390/820. Noncombat path and actual skippedWIND cast commit once; failednewPNG deliberately aborted for fallback test (not counted as positive network success). Real hardware/Safari/FPS remain NOTTESTED. Full36andnew public verifier results pending; release proof inTEST_REPORT.

Final local full36/36 PASS6.4m; final focused6/6 PASS1.6m adds actual archive/stream/WATER/ECHO/B02/memory at iPad landscape1024×768. Both iPad orientations now have the new genuine path. ECHO hit/miss assertions follow intended accuracy and heal assertions verify MP/benefit. No app change after full run; CI runs final37 cases.

Public0.4.0 touch route PASS: oldforest/FIRE/practice, archive research, realECHO/WATER crafting, B02 spell/reload/win, bell/clearstream and Eira memory, checked export/import. All28 versioned PNGs and current JS hash match the source; observed error list empty. main:/ Pages41961019875 SUCCESS; mainActions/post-deploy byte proof recorded next inTEST_REPORT.

Main workflow41961020262 build+deploy SUCCESS at2026-11-05 03:28:23 UTC. Final post-Actions assets-only public check PASS: current HTML, same f28e1bea53a80bd676c004411d3dec7dc7d85cb96d50ee755a70c6e45276c1ea JS and28 versioned PNGs, ready three-layer renderer and empty errors.

## Session6 —0.4.1

New Chromium cases390×844,1024×768,1366×768 use real collection/crafting, invalid/known preview, combined book filters, removal/reload and nine BASIC_PULSE turns to win practice with no equipped spells. Phone screenshot alchemy-390.png reviewed: readable selectors/no overflow, original pixel scene retained. These are browser simulations, not Safari or physical-device acceptance. Final counts/status inTEST_REPORT.

Final touch cases4/4 PASS54.5s also include iPad portrait820×1180. Full40 local PASS7.9m before final UI feedback polish; final focused/build/preview verify that polish. Final remote suite41 cases.

Final PR41991912483 and main41992926513 SUCCESS with full41 cases. Actual public gameplay/checksum/import and post-Actions JS/28PNG/renderer gate PASS, same9c99776baba4c985e62661668e6ef9940a20b85d5f57591cb4fa77ed22e65730 bundle. Touch alchemy tests cover phone390, iPad820portrait/1024landscape and desktop1366; retained full-suite golden paths still cover all ten required sizes. Hardware/Safari/FPS remain NOT TESTED.

## Session7 —0.4.2

Final focused authored-path touch4/4 PASS31.4s at390×844,820×1180,1024×768,1366×768 after support-depth fix. Real start/feather/bench/skip/workshop/reload, no injected gameplay state. Assertions observe actual interaction coordinates/depth and read durableIndexedDB revision/items. Screenshot review found an initial seating occlusion that tests alone missed; corrected/reviewed phone+desktop. Baseline focused visual+path12/12 PASS before this final correction; full final45-case suite recorded inTEST_REPORT. Real hardware/Safari remains blockedQA-009, not a reproducible game bug. Existing ten-viewport regressions retained.
