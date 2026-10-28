# REBORN · หนึ่งชีวิตในเอลินดรา

Original Thai fantasy life RPG, Vite + vanilla ES modules, static GitHub Pages. Current release 0.7.0 completes V6 Phases A/B and adds the initial pixel-scene foundation.

Play: https://ninon0406.github.io/alltest/

## One Life One Run

The live run exists only in the current tab's JS memory. Refresh/close returns to an unstarted rebirth screen; click to roll a fresh life. A new tab has an independent run. In-page map, training, bag, shop, character and journal dialogs preserve that life. There is no save/load/backup/import/export-active-run UI or offline aging. Native exit warning is best effort; mobile browsers can discard memory.

Only a genuinely completed authored ending produces a compact summary in `reborn_finished_lives_v1` (100 latest, one per runId, exportable, no resume). If archive storage fails, the finished summary remains downloadable/retryable. Unfinished refresh/exit never creates a death or ending. Existing `reborn_save` and backups are untouched and ignored, and `reborn_ending_gallery` is readable legacy history only. Old validators remain for offline historical tests, not active restoration.

## Play and current scope

The age/power header stays above the scene. Choose an annual focus and advance 1/2/5 years or seek a meaningful crossroad. Minor stories accumulate automatically; rare decisions open 4–5-option dialogs and hold time. Autoplay is optional, 1/2/4/8×, and stops on decisions, hidden tab, any overlay or rejected action. Details live in one accessible modal surface with ESC, keyboard focus handling and session-only font/motion options.

Original pixel figures now stand in 20 distinct procedural location backdrops. Appearance still uses the existing v1 identity; parental inheritance and ≥20 actual variants per requested group remain Phase C. Real owned equipment is Phase D. Power displays its initial Lv1; earned 1–100 progression/breakthroughs and lifespan/God routes remain Phases E/F. No empty future-system buttons are exposed. Existing equal births, 360-day calendar, seven actual awakening stages, 20 base/20 higher careers, rare annual stories, 20 connected map nodes, walking/rest/bread economy and all six original endings remain functional. See CONTENT_MANIFEST.md for actual counts.

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

Source: `app.html`, `src/`, `public/art`. Root `index.html`, `assets/`, `art/` are generated compatibility outputs for existing Pages `main:/`. Build then stage-site; retain prior published hashes for cached HTML. Do not hand-edit generated HTML. `.github/workflows/pages.yml` tests/builds and deploys, then runs all three public verifiers. A successful push alone is not evidence of working public CSS/gameplay. Vite uses relative `./` paths for `/alltest/`. No backend, paid API or external runtime art service is required.

Read docs/REBORN_CODEX_UI_PIXEL_ONE_LIFE_DIRECTIVE.md and docs/NEXT_CODEX_TASK.md before continuation. Full pixel inheritance, equipment, power/mortality, combat/NPC/long-life content targets are unfinished.
