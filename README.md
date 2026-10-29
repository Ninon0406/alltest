# REBORN · หนึ่งชีวิตในเอลินดรา

Original Thai fantasy life RPG, Vite + vanilla ES modules, static GitHub Pages. Current release 0.11.0 adds inherited pixel characters, parent portraits and an owned casual wardrobe to the first 30-fork V7 early-life cluster.

Play: https://ninon0406.github.io/alltest/

## One Life One Run

The live run exists only in the current tab's JS memory. Refresh/close returns to an unstarted rebirth screen; click to roll a fresh life. A new tab has an independent run. In-page map, training, bag, shop, character and journal dialogs preserve that life. There is no save/load/backup/import/export-active-run UI or offline aging. Native exit warning is best effort; mobile browsers can discard memory.

Only a genuinely completed authored ending produces a compact summary in `reborn_finished_lives_v1` (100 latest, one per runId, exportable, no resume). If archive storage fails, the finished summary remains downloadable/retryable. Unfinished refresh/exit never creates a death or ending. Existing `reborn_save` and backups are untouched and ignored, and `reborn_ending_gallery` is readable legacy history only. Old validators remain for offline historical tests, not active restoration.

## Play and current scope

The age/power header stays above the scene. Until three, age is shown in months and routines stay under caregiver supervision. Thirty V7 childhood/teen forks offer 90 actual choices, with early memories/relationships changing later outcomes and eligibility. Later choose an age-appropriate focus and advance 1/2/5 years or seek a decision. Seven awakening stages are chosen individually. Autoplay is optional, fixed 30-day ticks at 1/2/4/8/16×; actual calendar progress stops on decisions, hidden tabs, overlays and rejected actions.

Scholarship/enrollment choices charge the actual wallet, with free alternatives. School/mentor/family choices carry into later gates, training support and wages; support grants no immediate XP or income. Event eligibility and expiry share the time scheduler, so delaying the ceremony cannot block free learning. Expandable outcome receipts and selected-stat training quotes show the actual effects. Nine new school forks at months 48/60/84/90/108/114/126/132/138 connect seed play, craft, friendships and ceremony preparation. Showing a practice record requires actual training; reviewing a diary requires an earned record. Free alternatives always remain. Ages 4–11 have at most two major childhood decisions per year.

The map is a position/information viewer. Choose journeys from the main scene: caravan, free walking or staying, with real days/money/stamina/ledger. Career panels recommend up to eight eligible paths; other eligible paths remain in the codex. All dialogs keep one live run and support keyboard/ESC and session-only font/motion options.

New runs use 64×80 layered file-backed pixel actors with five immutable traits inherited from both parents and at most one small variation. Nine groups have 20 visible variants each; 183 committed transparent PNGs include 180 catalog parts and three age/body layers. Wrapped infants, toddlers, children, teens and adults share stable DNA; older characters gain gray hair without changing identity. The Birth Record shows actual parents/child and trait origins.

Five family-gift garments (two tops, pants, shoes and hat) are actually owned. From age three, the bag allows changing owned clothes and removing the hat; each change updates the sprite with zero days, money or stat changes. Unowned/wrong-slot clothing and stale actions are rejected. New v2 characters never invent a weapon or aura from career text. Original v1 portraits and birth generators remain for historical compatibility.

Twenty location-specific PNG backdrops remain generated from local tile compositions. Run `node scripts/verify-assets.mjs` to check mapping/dimensions/hashes; regenerate deliberately with `node scripts/generate-scene-assets.mjs` using installed Chromium. No hosted image service runs in gameplay. One original AI family-room background is stored with its PNG source and compressed runtime WebP; character parts are authored procedurally, not AI-generated. Combat gear/shops/modifiers, power growth, lifespan/deity paths, full fork/ending targets and combat remain incomplete. Existing equal births, 360-day calendar, 20 base/20 higher careers, twenty map nodes and six original endings remain; see CONTENT_MANIFEST.md for honest playable versus draft counts.

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
node scripts/verify-character-assets.mjs
node scripts/verify-character-composition.mjs
```

Playwright uses `/usr/bin/chromium` or `CHROMIUM_PATH`; production preview test port 4173. Desktop/mobile scenarios plus a separate seven-width project test overlays, real transactions, no active persistence, independent tabs, lifecycle, genuine terminal archive and storage failure downloads. Unit tests retain the 100,000-origin audit, 40 detailed career paths and 20 annual-planner promotions.

## Publication

Source: `app.html`, `src/`, `public/`. Root `index.html`, `assets/`, `art/` are generated compatibility outputs for existing Pages `main:/`. Build then stage-site; retain prior published hashes for cached HTML. Do not hand-edit generated HTML. `.github/workflows/pages.yml` tests/builds and deploys, then runs all three public verifiers. A successful push alone is not evidence of working public CSS/gameplay. Vite uses relative `./` paths for `/alltest/`. No backend, paid API or external runtime art service is required.

Read docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md, docs/USER_DIRECTIVE_V7.md and docs/NEXT_CODEX_TASK.md before continuation. Interior/place art and modeled journeys, combat equipment, power/mortality, combat/NPC/long-life content targets are unfinished.
