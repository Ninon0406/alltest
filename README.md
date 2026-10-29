# REBORN · หนึ่งชีวิตในเอลินดรา

Original Thai fantasy life RPG, Vite + vanilla ES modules, static GitHub Pages. Current release 0.9.0 adds the complete teen education/support story chain to the V7 infant/time correction, continuing the V6 memory-only dashboard.

Play: https://ninon0406.github.io/alltest/

## One Life One Run

The live run exists only in the current tab's JS memory. Refresh/close returns to an unstarted rebirth screen; click to roll a fresh life. A new tab has an independent run. In-page map, training, bag, shop, character and journal dialogs preserve that life. There is no save/load/backup/import/export-active-run UI or offline aging. Native exit warning is best effort; mobile browsers can discard memory.

Only a genuinely completed authored ending produces a compact summary in `reborn_finished_lives_v1` (100 latest, one per runId, exportable, no resume). If archive storage fails, the finished summary remains downloadable/retryable. Unfinished refresh/exit never creates a death or ending. Existing `reborn_save` and backups are untouched and ignored, and `reborn_ending_gallery` is readable legacy history only. Old validators remain for offline historical tests, not active restoration.

## Play and current scope

The age/power header stays above the scene. Until three, age is shown in months and routines stay under caregiver supervision. Twenty-one V7 childhood/teen forks offer 63 actual choices, with early memories/relationships changing later outcomes and eligibility. Later choose an age-appropriate focus and advance 1/2/5 years or seek a decision. Seven awakening stages are chosen individually. Autoplay is optional, fixed 30-day ticks at 1/2/4/8/16×; actual calendar progress stops on decisions, hidden tabs, overlays and rejected actions.

Scholarship/enrollment choices charge the actual wallet, with free alternatives. School/mentor/family choices carry into later gates, training support and wages; support grants no immediate XP or income. Event eligibility and expiry share the time scheduler, so delaying the ceremony cannot block free learning. Expandable outcome receipts and selected-stat training quotes show the actual effects.

The map is a position/information viewer. Choose journeys from the main scene: caravan, free walking or staying, with real days/money/stamina/ledger. Career panels recommend up to eight eligible paths; other eligible paths remain in the codex. All dialogs keep one live run and support keyboard/ESC and session-only font/motion options.

Original v1 pixel actors stand in 20 location-specific PNG backdrops generated from local tile compositions. Run `node scripts/verify-assets.mjs` to check mapping/dimensions/hashes; regenerate deliberately with `node scripts/generate-scene-assets.mjs` using installed Chromium. No hosted image service runs in gameplay. Parent inheritance/variant catalogs, owned gear, power growth, lifespan/deity paths, full fork/ending targets and combat remain incomplete. Existing equal births, 360-day calendar, 20 base/20 higher careers, twenty map nodes and six original endings remain; see CONTENT_MANIFEST.md for honest playable versus draft counts.

## Development and validation

Node 22.12+ (CI Node 24), npm, installed Chromium.

```sh
npm ci
npm run dev
npm test
npm run content
npm run build
node scripts/stage-site.mjs
npm run test:e2e
npm run preview -- --port 4185
node scripts/verify-production.mjs http://127.0.0.1:4185/
node scripts/verify-progression.mjs http://127.0.0.1:4185/
node scripts/verify-one-life.mjs http://127.0.0.1:4185/
```

Playwright uses `/usr/bin/chromium` or `CHROMIUM_PATH`; production preview test port 4173. Desktop/mobile scenarios plus a separate seven-width project test overlays, real transactions, no active persistence, independent tabs, lifecycle, genuine terminal archive and storage failure downloads. Unit tests retain the 100,000-origin audit, 40 detailed career paths and 20 annual-planner promotions.

## Publication

Source: `app.html`, `src/`, `public/`. Root `index.html`, `assets/`, `art/` are generated compatibility outputs for existing Pages `main:/`. Build then stage-site; retain prior published hashes for cached HTML. Do not hand-edit generated HTML. `.github/workflows/pages.yml` tests/builds and deploys, then runs all three public verifiers. A successful push alone is not evidence of working public CSS/gameplay. Vite uses relative `./` paths for `/alltest/`. No backend, paid API or external runtime art service is required.

Read docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md, docs/USER_DIRECTIVE_V7.md and docs/NEXT_CODEX_TASK.md before continuation. Full pixel inheritance, equipment, power/mortality, combat/NPC/long-life content targets are unfinished.
