# QA matrix — 2026-11-04

| Environment | Flow | Result |
| --- | --- | --- |
| Chromium 360×800, 390×844 | Full first slice + save/reload + inventory, console/assets | PASS |
| Chromium 768×1024, 1024×768 | Same real actions | PASS |
| Chromium 1366×768, 1920×1080 | Same real actions | PASS |
| Chromium 844×390 | Same, inventory accessible after overflow fix | PASS |
| Chromium /alltest/ static server | production JS/PNG paths, keyboard, skip, double click, reload | PASS |
| Chromium mobile context hasTouch | Start/choice by tap, Canvas visible | PASS |
| Actual iOS/Android/iPad/macOS/Windows hardware | Safari and physical touch/performance | NOT TESTED |
| Full chapter / 3 endings / all elemental statuses / six distinct VFX render baselines | Future milestone | NOT IMPLEMENTED |

Evidence paths: test-results/title-360.png, battle-{360,768,1366}.png, loop-<width>x<height>.png. CI uploads evidence. Current P2: tiny actor detail, baked props/limited depth and final animation quality, long scroll in battle portrait. Earlier P1 Canvas overlay on landscape fixed and regression passed. No measured FPS or 50/50 pacing claim.
