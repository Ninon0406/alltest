# Continue REBORN — V7 / 0.14.0

Read AGENTS.md, ROADMAP.md, GAME_DESIGN.md, CONTENT_MANIFEST.md, docs/USER_DIRECTIVE_V7.md and docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md. Continue the existing repository, never rerun completed foundations. Preserve frozen birth generators 1/2, appearance-v1, memory-only One Life and terminal-only history. Old active-save keys/backups remain untouched.

## Base / completed this round

Base is published `1c69fe3` (0.13.0; runtime `8ed7362`). Existing age/time/manual choices, 30 V7 forks, inherited characters, interiors, owned gear/shops and six endings remain working.

0.14.0 implements the first complete earned-power realm, **levels 1–10 only**:

- New runs alone use power version 2. Explicit free `trainPower` or cultivation focus requires age twelve, all seven awakening stages and an actual chosen career. It delegates to the existing seven-day primary-stat training, retaining real stamina/fatigue/focus/skill XP/time. The skill journal receives power metadata before birthday closure. Ordinary skill training, jobs, birthday/time skips and gear changes grant no power.
- Independent power XP uses `ceil(30 * 1.12^(level-1))` and per-window practice awards 12/10/8/6, capped to the actual remaining XP before certification. No equipment/wealth multiplier or RNG. A forty-policy cohort (twenty actual careers × two certification choices) earns 315 actual practice days, plus truthful rest/routine/story time. No ages, wallets or gear are injected into browser/production progression.
- Level five gives a pure one-point reduction in actual community/career job stamina cost. It stacks once with the coat's two-point modifier; earned base stats and gear ownership remain separate. Twenty first-tier titles are ported from the actual V7 `careerTitles` source, and 5/10 static original SVG aura stages use earned state only. No new PNGs or invented owned items. Parents/infants never receive these aura layers.
- Full level-nine XP creates a manual pending decision. Cultivation stops immediately, even mid-month, and reports/journals use the actual elapsed endpoint. Autoplay cannot select a response. Choose physical certification (spend stamina 15/focus 10, +5 max stamina) or reflective certification (spend mana 10/focus 15, +5 max mana); both reach ten once, cost zero further days and never heal. Resource/focus shortages have honest disabled reasons and a free defer route. Deferral selects balanced life when cultivating; actual rest and an explicit resume reopen the decision. No forced retry or idle countdown.
- Level ten completes this implemented realm. There is no grant/ascend action for 11–100. Life continues through ordinary focuses, skill training, work, travel and existing genuine endings. Archive stores actual earned level/title only, without a resumable power state.

## Current work / latest checks

Implementation and all local release checks are complete. Publication and independent actual Pages results are recorded below before ending. No partial mechanic stub is left. Confirmed: **112/112 unit cases** across sixteen files; content audit including all forty power/certification policies; build/staging; source/staged image audits; full desktop/mobile/seven-width browser suite **61/61**, zero skipped. After the final capped-XP quote/text corrections, all 112 unit cases, content audit, build/staging and targeted desktop/mobile power flow **2/2** passed again. All FIVE production-preview scripts passed at `http://127.0.0.1:4185/`, including genuine first-realm power at 1366/320/360, both certification strategies and actual work/cap benefits. All 180 complete character compositions remain distinct. The actual 320px completed-realm scene/power panel were visually inspected, with a subtle registered aura, readable title/resources and no horizontal overflow. Source/staged character/interior/gear validators passed; no new PNG claims are made.

Initial focused browser failure was the test locator expecting a literal newline in a button's accessible name. Accessibility normalizes this whitespace; the locator now matches the actual accessible name. The old focused run was interrupted after diagnosis, and the corrected two-project run passed without relaxing any gameplay assertion or timeout. A later quote correction clamps power XP to the remaining certification XP, so previewed/recorded gains match GameState exactly. Final unit/browser/production results are recorded after this correction.

Required validation: npm test; npm run content; npm run build; node scripts/stage-site.mjs; npm run test:e2e; source/staged character/interior/gear validators; all 180 complete character compositions; ALL FIVE preview/public verifiers (`verify-production`, `verify-progression`, `verify-one-life`, `verify-equipment`, `verify-power`). Heavy suites run sequentially. Retain genuine lifetime budgets, no skips/retries or injected gameplay ages. `Game.snapshot` is read-only evidence.

## Actual counts / limits

Narrative unchanged: **156 scenes/events / 359 choices / six reachable endings**, including **30 executable V7 forks / 90 choices** (27 adapted, three original). The first-realm certification is one mechanical progression decision with three real responses, reported separately from authored narrative totals. Twenty titles are implemented, not all 200 pack labels. Two SVG aura stages are not new PNG files. The forty actual power/certification simulations are additional to existing birth/story/career/lifetime cohorts.

Art remains 20 outdoor + 16 interior + 183 character + 6 equipment PNGs. World remains 20 nodes / five regions / twenty edges, eight equipment shops; twenty base + twenty earned advanced careers, 120 names; zero important authored NPC profiles or functional dungeons. Copies, room bindings, parent profiles, graphics fixtures and V7 JSON drafts do not add authored content counts.

## Next milestone — real low-tier route encounter, then next earned realm

1. Inspect shared `pendingDecision` / `nextDecisionDay`, `src/world/travel.js`, canonical routes, gear-derived stats, first-realm power and V7 encounter briefs. Implement one complete non-graphic, choice-based route encounter for the existing graph with actual costs/rewards and a free retreat/safer alternative. State must retain the real departure/destination; no invented movement, ownership, people or survival percentage from art.
2. Use an explicit deterministic outcome/strategy model with actual effective gear/stat/power readiness. Stop time for the encounter choice, then charge each leg/resource exactly once. Preserve current free travel routes and ordinary peaceful lives. Display qualitative uncertainty until probabilities are calibrated against an actual simulator. Test all branches, stale/double actions, low resources, equipment removal, map read-only and genuine scene position.
3. Next extend earned power to the following realm through real quest/mastery/time gates and manual breakthroughs, with the next twenty source titles and actual aura/effects. Do not remove the cap or implement 11–99 as unchecked XP arithmetic. Level 100 remains impossible until age≥1000, discovered goal, three trials, real active play≥30min, actual divine travel and manual terminal consent are all integrated. Expand adult stories/NPC/ending chains alongside mechanics, not by copying labels to reach counts.

## Remaining / known limitations

Power 11–100, further career titles/auras/breakthroughs, graded affinity balance; route encounters/combat/dungeons/loot; advanced gear; businesses/crafting; authored important NPCs/companions/relationships; mortality/lifespan extension/eras/≥1000-year deity; ≥100 coherent forks and ≥100 reachable endings; more places/room types/weather/wealth/daylight art. Existing room art is shared regionally and the optional historical reader remains outside rather than guessing venues. Parent portraits remain fixed visual birth references. No known unresolved regression remains in the completed local checks. Public/CI results remain separate evidence until recorded below. Physical iOS/PWA/native unload behavior remains outside guaranteed Chromium coverage.

## Files changed

New: `src/progression/power-model.js`, `src/progression/power.js`, `src/data/power-titles.js`, `src/ui/power-view.js`, `src/ui/avatar/power-aura.js`; `scripts/power-simulation.mjs`, `scripts/power-audit.mjs`, `scripts/power-playthrough.mjs`, `scripts/verify-power.mjs`; `tests/power.test.js`, `tests/browser/power.spec.js`.

Updated: run/decisions/actions/monthly planner, training journal, work-cost projection, main/game/career/avatar/styles/archive, content/CI scripts, package/lock 0.14.0, AGENTS/README/GAME_DESIGN/ROADMAP/CONTENT_MANIFEST/CHANGELOG/USER_DIRECTIVE_V7/NEXT and generated root index/assets. Source remains app.html/src/public; publication files are generated. Retain old published hashes and existing main:/ Pages settings. No active-save migration or new image API.

## Commit / publication

Base `1c69fe3`. Prior 0.13.0 full CI [40937025638](https://github.com/Ninon0406/alltest/actions/runs/40937025638) succeeded. Current runtime commit and publication await the final checks above; record exact commit, browser totals, workflow conclusion and independent actual URL results before ending. This isolated checkout uses branch `work`; after checking origin/main ancestry, push normally with `git push origin HEAD:main`. Never infer deployment from push alone or claim all V7 complete.
