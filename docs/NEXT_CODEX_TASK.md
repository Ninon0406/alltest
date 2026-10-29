# Continue REBORN — V7 / 0.10.0

Read AGENTS.md, ROADMAP.md, docs/USER_DIRECTIVE_V7.md, docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md and actual HEAD. Continue the existing project. V7 wins over historical conflicting rules. One Life remains memory-only; old active saves/backups stay ignored and untouched.

## Completed this round

Continued from published `5e02944` / runtime `78a10b5` (0.9.0). No project rewrite, birth-table change, persistence or time-engine replacement.

The first coherent V7 early-life cluster now has **30 runnable forks / 90 authored and reachable choices** across ages 0–19. Full V7-3 ≥100-fork expansion remains incomplete. Nine new school forks / 27 choices adapt actual V7 life briefs:

| Event | Month | Brief | Actual role |
| --- | ---: | --- | --- |
| child.seeds | 48 | 029 | Supervised seed play; patience/shared care returns in school outcomes |
| child.mechanism | 60 | 034 | Safe toy observation/play/sketching feeds later craft memories/bonds |
| child.rules | 84 | 037 | Fair turns/listening/teacher support, later friendship consequences |
| child.workshop | 90 | 038 | Cooled tools with adults; earlier toy choices and later practice guidance |
| child.caravan | 108 | 040 | Real per/cha/wis practice support; later travel advice, no teleport |
| child.farewell | 114 | 036 | Picture/contact/farewell circle; later letters/family contact |
| child.fair | 126 | 041 | Actual practice required for showing a training record; free host/recorder options |
| child.invitation | 132 | 048 | Manual preparation only; no early ceremony, money charge or profession assignment |
| child.eve | 138 | 049 | Earned-record diary gate, family conversation or rest; all lead to the real age-12 ceremony |

- New events are chronological with the existing childhood/teen nodes. Their eligibility uses the existing shared pending-decision/time-boundary scheduler. Ages 4–11 have at most two important childhood prompts per year; fixed 30-day autoplay still stops and never chooses for the player.
- Ages four/five remain supervised sensory play, memories and relationships. No adult stat, practice XP, wage or phantom equipment is granted. Actual formal practice starts at eight. School conversations consume zero game days; guidance only affects a subsequent real seven-day action, capped at +3 XP per stat. Networking wage cap remains +3 coins per actual job.
- Earlier seed/workshop choices change school reflection and learning. Caravan maps/craft, farewell pictures/letters and listening return in existing teen decisions with actual different effects. Unit tests exercise mixed paths, including free study routes and cap saturation.
- Showing a training record and reviewing a diary require actual prior actions/records. Disabled options explain the missing experience in Thai; free alternatives remain. No travel occurs through these conversations, no fee is added and no school branch changes measured awakening results after measurement.
- Existing infant care, seven manual awakening steps, 20 base/20 earned advanced careers, tuition/jobs/practice, six original endings, view-only map/main-page journeys, all 20 PNGs and terminal-only history remain.

## Current work

School/story implementation, local/public checks and final full CI publication are complete. CI follow-up adds readable failure annotations and a scoped budget for the two genuine age-60 browser scenarios. No half-built gameplay feature is intentionally left behind. Start V7-4 below.

## Next task — V7-4 inherited appearance

The first 30-fork slice is complete; do not reimplement infancy, time controls, teen funding or school stories. Full ≥100-fork expansion is still required after the visual/progression foundations.

1. Inspect `src/character/appearance.js`, `src/ui/avatar/sprite.js`, `src/ui/avatar/portrait.js`, birth generator 1/2, `docs/v7/06_ASSET_SEED_MANIFEST.json`, the world bible and appearance tests. Design a separately versioned new-run appearance initializer with stable parent/child DNA, retaining frozen historical birth generation and old appearance-v1 identity. Never reroll a live character or alter frozen origin/name/race tables.
2. Create real visible geometry/atlases for ≥20 variants per requested group; render both parents and child at aligned anchors with deterministic inheritance and small independent variation. Generated files need dimensions/hash/alpha/registration validation and actual distinct rendered silhouettes, not labels or color-only claims. Owned gear is not yet implemented; do not pretend career cosmetics are owned items.
3. Test deterministic inheritance, stable rerenders and all seven viewport widths, build/stage and verify preview/live. Continue with owned equipment before showing held gear, then earned power/title/aura and long-life systems. Keep narrative expansion traceable to the existing source pack.

## Files changed

New: `src/data/events/school.js`, `tests/school-story.test.js`, `tests/browser/school.spec.js`.

Updated: `src/engine/development.js` (chronological union, specific requirement hints), `src/data/events/teen.js` (childhood callbacks), `scripts/verify-progression.mjs` (real school-chain check), `tests/development.test.js` (actual new boundary without an injected age jump), `tests/teen-story.test.js` (current authored scope), package version, AGENTS/README/ROADMAP/GAME_DESIGN/CONTENT_MANIFEST/USER_DIRECTIVE_V7/CHANGELOG, this file and generated publication outputs. Follow-up: `playwright.config.js` enables GitHub failure annotations in CI; `tests/browser/game.spec.js` gives only the two full-lifetime scenarios 90 seconds. Every gameplay step/assertion remains, other tests retain their normal budget; no retries or skips were added.

## Limitations / remaining systems

No new art files this round; 20 existing distinct 320×160 location PNGs remain. Actor/portraits still use appearance-v1. No inherited parent catalogs, real equipped gear, earned power/title/aura ladder, route encounters/combat/dungeons, businesses/crafting, authored NPC/party system, mortality/extension/eras, ≥1000-year deity gate or new endings. Power stays honestly level 1; career XP and guidance are separate.

Stories have finite age windows and prerequisites. Timed actions stop at eligible decisions; unmet/expired prerequisites cannot freeze the clock. Some practice/record choices are intentionally unavailable without earlier actions; free paths reach the ceremony. Relationships are a small caregiver/community foundation, not authored important NPC profiles. Physical iOS/PWA/native unload behavior remains outside guaranteed Chromium coverage.

## Tests and actual counts

Required: npm test; npm run content; npm run build; node scripts/stage-site.mjs; npm run test:e2e; node scripts/verify-assets.mjs; all three production scripts on preview then actual Pages. Run heavy suites sequentially.

Confirmed: npm ci; 80/80 Vitest cases; 47/47 Playwright cases (zero skipped); content/reference/reachability audit; production build/staging; all 20 PNG files/hash/dimension checks passed. New browser cases cover honest practice/diary gates and free alternatives, real practice before exhibition, new feedback on mobile, exact seven-day guided practice and no active writes. One initial new unit assertion incorrectly expected every craft choice to change memory: drawing with friends intentionally changes relationships. Corrected the assertion to check meaningful memory or bond effects; all unit cases now pass. Existing time-guard regression now reaches the next actual school boundary via the dispatcher, without injecting a later age.

All three production-preview and actual public-site verifiers passed: seven widths (320/360/390/768/1024/1366/1920), month/calendar and all 20 decoded PNGs, overlays/no resume; genuine manual school chain/ceremony/career/job/practice/tuition/teen stories through age 20 at 1366/360; independent tabs, zero active writes, genuine age-60 peaceful ending and exactly one terminal summary. No runtime/request errors occurred in those scenarios. Final full CI also passed all suites, staging, deployment and all three live verifiers; its GitHub Playwright summary explicitly reports 47 passed.

Visually reviewed the real untrained school-exhibition dialog at 360×900 after clicked play from birth. All three options and close control fit; no horizontal overflow and no button under 44px high. No known unresolved regression in the completed local checks.

CI timing investigation: the first workflow's Playwright step failed; the original runner log host is network-denied and its old annotations contained no case details. The instrumented rerun passed the full workflow. Independently restricted only a diagnostic subprocess and its children to one CPU, with two browser workers: all four desktop/mobile full-lifetime cases hit the original 30-second test deadline. After giving only those two age-60 scenarios 90 seconds, all four passed on the same constrained CPU in 42–45 seconds each (1.5 minutes total). They still click every decision, reach age 60, check the genuine ending/archive/download and never inject ages. This establishes a real insufficient test budget under contention; it is not a claim that the inaccessible original log identified a specific failed case. The final full CI run passed with this fix and the unchanged game bundle. No known unresolved regression remains in completed checks.

Actual totals: **156 scenes/events, 359 authored choices, six reachable endings**. Non-legacy: 141 events / 330 choices. V7: **30 forks / 90 reachable choices**, 27 adapted briefs + three original follow-ups. Retained: 20 actual location PNGs, 20 map nodes / five regions / 20 edges, 20 base / 20 advanced career families, 120 names, zero important authored NPC profiles/dungeons. Source-pack drafts are not implemented counts. Audit includes 100 new V7 lives through age 20, 100 legacy branch traversals, 100 detailed childhood runs, 40 career runs and five annual runs beyond age 60.

## Commit / publication evidence

Base: `5e029449551496f958d922b98ecbd8ee94dbe473`. Prior runtime `78a10b5` and verification `beb2896` were publicly verified with all three scripts; final full CI [40838430108](https://github.com/Ninon0406/alltest/actions/runs/40838430108) passed.

Runtime: `433546dac69e5c97a22ea96345a114c473751fd0`. Branch Pages [40843895952](https://github.com/Ninon0406/alltest/actions/runs/40843895952) succeeded. Public HTML serves `assets/app-DcD8zOM7.js` / `assets/app-jJszjJhO.css`; all three public scripts passed (seven widths, actual school/ceremony/career/teen play to 20 at 1366/360, terminal-only history). Initial full workflow [40843896275](https://github.com/Ninon0406/alltest/actions/runs/40843896275) failed at Playwright; its later content/artifact/deploy steps were skipped. Reporter follow-up `0b4cb51ec61d7fa5ffaac252b177709e58e59f02` / [40844685663](https://github.com/Ninon0406/alltest/actions/runs/40844685663) passed the full test/build/deploy/live workflow. Final scoped-budget commit: `9a06fff945cdc4a20b42e090b8fd62e0177d4d79`; both branch Pages [40845239794](https://github.com/Ninon0406/alltest/actions/runs/40845239794) and full CI [40845239881](https://github.com/Ninon0406/alltest/actions/runs/40845239881) completed successfully. The final documentation-only record uses `[site-build]` to avoid rerunning unchanged tests; use `git log -1` for that record's exact hash. Preserve old hashes. Source: app.html/src/public; root index/assets/art are generated main:/ compatibility outputs. Do not change Pages settings.
