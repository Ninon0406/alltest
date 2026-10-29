# Continue REBORN — V7 / 0.9.0

Read AGENTS.md, ROADMAP.md, docs/USER_DIRECTIVE_V7.md, docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md and actual HEAD. Continue the existing project; One Life is memory-only, no active saves or birth rerolls. V7 wins over historical conflicting rules.

## Completed this round

Continued from `6cb2299` / published 0.8.0. Retained all prior infant/time/ritual/map/art work.

- Twelve real teen forks / 36 choices, months 145,150,162,174,182,188,198,206,214,222,228,234. Ten adapt V7 life briefs 050/051/054/052/061/059/063/064/065/066, two are original letter/reflection follow-ups. Existing nine childhood forks remain; total 21 V7 forks / 63 authored and reachable choices through age 19.
- Shared event eligibility for pending decisions and next-time boundaries: completed events, flags, ceremony and practice requirements. Ineligible/expired events do not freeze time. A late resumed ceremony has priority over teen stories. Missed enrollment does not remove independent free community lessons.
- Actual tuition: normal 12 coins, 4 with scholarship offer. Cost is quoted from current flags/wallet, rejected atomically if unaffordable, recorded in the ledger once. Free apprenticeship/community alternatives remain. Family contribution transfers six real coins only when selected and affordable. No hidden debt or magic cash reward.
- Guided learning records per-stat support capped at +3 XP per actual training action; it grants no immediate practice XP, stat or power level. Existing seven-day training/stamina/fatigue still apply. Training quotes refresh for the selected stat. Networking adds at most +3 coins per actual career job, with real wages/ledger; no advance income.
- Early library/map/community/family choices affect later relationships, tuition, training support, career wages and choice eligibility. Exhibition requires real practice, continuing-study/letter options require earlier enrollment/decisions. Invitations and family contact never teleport the player.
- Expandable outcome receipts show the actual chosen branch, money changes and effective support, including zero when the support cap is reached. All new prose is Thai, local to current canonical location.
- Story validation checks V7 source age windows, prerequisite IDs/cycles, flag producers, cost definitions and effect keys. Reachability audit now simulates 100 V7 lives through age 20 with real practice and manual decisions, covering every new choice.

## Current work / incomplete phase

The coherent teen support/education chain is complete. V7-3 remains incomplete: 21 / first 30–50 / final ≥100 real forks. No half-built gameplay system is intentionally left behind. Next complete nine more coherent childhood/regional forks to reach the first 30; do not redo completed time, ritual or UI foundations.

1. Inspect unused V7 life briefs across ages 4–11, map them to the current canonical locations, and author distinct classroom/craft/nature/family situations. Bring back existing unused early flags with actual downstream effects; keep caregiver support and free options. Do not assign careers or literacy to infants.
2. Add conditional regional or teen follow-ups to these choices, with real eligibility, no missing prerequisite/flag references, and no automatic travel. `src/engine/development.js` owns eligibility/effects; `engine/decisions.js` owns shared time priority. Conditions changing only through manual actions are supported; new time-dependent conditions need explicit scheduler boundaries.
3. Prove all branches and gates with seeded paths and a real browser run. Then proceed to V7-4 inherited appearance catalogs without changing frozen birth generator 1/2 tables.

## Files changed

New: `src/data/events/teen.js`, `scripts/story-audit.mjs`, `tests/teen-story.test.js`, `tests/browser/teen.spec.js`.

Updated: `engine/development.js`, `engine/decisions.js`, `progression/engine.js`, `ui/yearly-view.js`, `ui/career-view.js`, `scripts/v7-simulation.mjs`, `scripts/content-audit.mjs`, `scripts/verify-progression.mjs`, `tests/development.test.js`, package version, AGENTS/README/ROADMAP/GAME_DESIGN/CONTENT_MANIFEST/USER_DIRECTIVE_V7/CHANGELOG, this file and generated publication files. Post-publication verification follow-up: `scripts/verify-production.mjs` and `tests/browser/yearly.spec.js` now await image loading before asserting exact dimensions; no runtime bundle change.

## Preserved rules and limitations

- Memory-only run, explicit fresh birth after refresh, no offline time, only genuine terminal summaries persist. Old saves/backups are untouched. Archive/idempotency and all six original endings remain.
- 360-day year / 30-day month; only `advanceTime` writes elapsed time. Manual decisions stop all routine/timed actions; 1–16× changes wall time only. Teen decisions are conversations/enrollment and cost zero game days; any XP/wage benefit requires subsequent actual timed work/training.
- Frozen equal births, 20 base/20 advanced careers, 60 career episodes, 20 canonical locations/5 regions/20 edges and 20 existing PNGs remain. This round creates no art files or important NPC profiles.
- Learning support is a capped flat bonus, not completed grade-affinity progression. No inherited appearance-v2, owned gear, earned power/title/aura ladder, modeled route encounters/combat/dungeons, businesses/crafting, authored NPC/party system, mortality/extension/eras, ≥1000-year deity gate or new endings. Power remains level 1.
- Events have finite age windows. Deliberately postponing the ceremony past the enrollment window misses that story, while free learning and normal life remain available. This is not a save migration.
- No known unresolved regression in completed checks; release evidence follows below. Native unload warnings and physical iOS/PWA behavior remain outside guaranteed Chromium coverage.

## Tests / counts / publication

Required: npm test; npm run content; npm run build; node scripts/stage-site.mjs; npm run test:e2e; node scripts/verify-assets.mjs; all three production verifiers on preview then actual Pages. Run heavy suites sequentially to avoid artificial CPU timeout failures.

Confirmed local: npm ci, 74/74 Vitest cases, 43/43 Playwright cases (zero skipped; full suite passed twice), content/reference/reachability audit, production build/staging and 20-file PNG validation passed. Seven responsive widths and real scholarship payments/guided training/postponed-ceremony flows passed. An initial existing journey test assumed no new decision during its 30-day interval; it now resolves the correctly triggered application before testing travel, and the full unit suite passes. All three production-preview verifiers passed: seven widths/assets/month/progress/overlays; actual birth-to-20 manual ritual/career/scholarship fee/teen-chain progression at 1366/360; independent tabs, no active writes, an authentic age-60 ending, exactly one summary and no resume.

Actual public verification on 2026-10-29: all three scripts passed at https://ninon0406.github.io/alltest/. Verified seven widths (320/360/390/768/1024/1366/1920), actual month/progress, all 20 decoded PNGs, overlays and no resume; genuine birth-to-20 manual ritual/career/job/practice/scholarship/teen-chain at 1366/360; independent tabs, zero active writes, a real age-60 peaceful ending and exactly one terminal summary. No runtime/request errors occurred in those scenarios. The first local invocation against Pages exposed a verifier race: it read `complete=false` before the image response arrived. A diagnostic confirmed HTTP 200 and decoded 320×160 PNG. The verifier now waits up to 30 seconds for loading and still rejects wrong dimensions/path, missing images and HTTP errors; the browser assertion polls the same real image dimensions. All three live checks then passed. This was a test synchronization defect, not a missing-image workaround.

After this verification-only fix, all eight desktop/mobile cases in `tests/browser/yearly.spec.js` passed again. The final full CI run also passed the complete 74-case unit / 43-case browser suites, content audit, build/staging and all three public verifiers.

Actual counts: 147 scenes/events, 332 authored choices, six endings; 21 V7 forks / 63 reachable choices, 18 adapted briefs and three original nodes; 20 existing scene PNGs, 20 base/20 advanced careers, 120 names, zero important authored NPCs/dungeons. Pack draft counts are not implemented counts.

Prior source release: `370e5c3`; base of this round: `6cb2299`. Runtime release: `78a10b53a959b3fd8c9ca7e8b51fca8159c2b635` (0.9.0), pushed to main. Both branch Pages run [40816178299](https://github.com/Ninon0406/alltest/actions/runs/40816178299) and full test/build/deploy/live-verification workflow [40816178946](https://github.com/Ninon0406/alltest/actions/runs/40816178946) completed successfully. Verification follow-up: `beb2896cb960d8139b8c910d283765736b4d7f94`; branch Pages [40838429568](https://github.com/Ninon0406/alltest/actions/runs/40838429568) and full test/build/deploy/live checks [40838430108](https://github.com/Ninon0406/alltest/actions/runs/40838430108) both completed successfully. Public HTML was independently fetched and serves `assets/app-jMSiVLl5.js` / `assets/app-jJszjJhO.css`. The final documentation-only record changes no runtime hashes; use `git log -1` for its exact ID. Publication remains https://ninon0406.github.io/alltest/ with main:/ compatibility staging. Preserve old published hashes. Do not change Pages settings. Working source is app.html/src/public; root index/assets/art are generated outputs.
