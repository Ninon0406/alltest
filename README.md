# REBORN: พงศาวดารผู้เกิดใหม่

Thai browser narrative RPG. The existing Vite / vanilla ES module game now includes equal-archetype rebirth, annual childhood, awakening and playable career progression. No backend, API keys, or runtime image services are needed.

## Development

Use Node.js 22.12+ (validated on 24.19) and npm. From this checkout:

```sh
npm ci
npm run dev
```

The development server binds loopback. Saves use browser LocalStorage (`reborn_save`); unversioned and version-1/2/3 saves keep their original characters and migrate to version 4 on the next save. Invalid/future saves remain intact; replacing one requires confirmation at the rebirth screen. Restart requires confirmation and clears the active life while retaining the ending gallery and pre-upgrade backups.

## Validation

```sh
npm test
npm run build
npm run test:e2e
npm run content
```

Browser tests run the production preview on port 4173. They use `/usr/bin/chromium`; override `CHROMIUM_PATH` for another Chromium executable. If Chromium is absent, install it through your supported OS package manager or use `npx playwright install chromium` and set `CHROMIUM_PATH` to its executable. Cloud socket restrictions may require the supported elevated execution flow.

## GitHub Pages

`npm run build` emits `dist/`. Vite uses `base: './'` so assets work beneath `/alltest/` as well as a domain root. The `.github/workflows/pages.yml` workflow tests and builds `main`, uploads `dist` and deploys it using GitHub Pages. The deployment requests automatic Pages enablement; repository permissions or organization policy may require selecting **Settings → Pages → Source → GitHub Actions** first. Deployment status is shown in the repository Actions tab. Avoid history-based routing without a Pages fallback.

## Architecture and scope

`src/engine`: state, requirements and seeded randomness; `src/character`: character defaults and deterministic rebirth generator; `src/data`: story graph; `src/save`: versioned storage and validation; `src/ui`: rendering and styles. `src/main.js` initializes the shell and navigation. `public/art` contains original local pixel artwork. World, combat, inventory and relationship modules will be introduced alongside their working mechanics rather than empty placeholders.

See ROADMAP.md and CONTENT_MANIFEST.md for verified scope. Fresh games open a dedicated rebirth screen with no stat or seed controls. One click rolls and saves a life before revealing its Birth Record. The immutable record retains original attributes while the character develops. Talents immediately increase one resource maximum. Hidden potential, rare ability identities and race-based natural lifespan are saved but hidden from the interface; basic awakening is now implemented; hidden ability discovery and lifespan enforcement remain future systems. Childhood annual simulation and career stories are playable.

Generation uses Mulberry32 and a cryptographically supplied 32-bit seed. Developer tests can call `generateBirth(seed)` for exact reproduction; UI users cannot select circumstances. Fresh generator-2 lives use 20 equal archetypes; weighted generator 1 is preserved only for old birth records. Race, individual attributes and talent use separate random draws. Rare birth does not guarantee high attributes. Save files are local, readable game data, not secure secret storage.

## Publication source compatibility

The actual Pages source is currently main:/ (legacy), and the integration cannot change repository Pages settings. Edit `app.html`, not the generated root `index.html`. After `npm run build`, run `node scripts/stage-site.mjs` to stage the compiled index, assets and illustrations into main's publication directory. The workflow refreshes those files automatically and deploys dist. Browser checks verify loaded styling and gameplay after deployment: `node scripts/verify-production.mjs <url>`. This catches the previous raw-source publication failure, which a successful deploy alone did not detect.

## 0.3.0 life simulation and save upgrade

Fresh lives now use 20 equally likely archetypes and a 360-day calendar. Read each event page, then choose an action with a visible time/effect cost. Infancy and childhood continue through age 12, after which daily life, local work/services and optional original story arcs remain playable. The following release adds real awakening and career progression.

Use **บันทึกชีวิตรายปี** for birthdays/journal, **แผนที่และบริการ** for discovered routes, purchases/rest/study/jobs. Local travel opens at 4, inter-region travel at 12. Walking is slower but free. Mobile status details expand with their button.

Old saves keep characters and chapters; migration stores exact raw backup at `reborn_save_backup_before_v3`. The Birth Record lets users download current and pre-upgrade JSON. Back up before reverting to an older game release: schema 3 cannot be read by the old release. On rollback, restore the downloaded old JSON to LocalStorage only after exporting the newer save; never reset a save automatically. Import UI remains future work. Ending gallery now survives restart.

Run `npm run content` for actual authored/reachable counts; see docs/NEXT_CODEX_TASK.md for continuation and known limits. This is a working development checkpoint, not the full game described by the directive.

## 0.4.0 awakening and career progression

At age 12, **เส้นทางชีวิต** opens the seven-stage community awakening ceremony. It is free, can be paused, and records a permanent result after measurement. Return to its original venue to resume after travel. The result uses weighted visible attributes, childhood memories, basic training, contextual archetype affinity and a fixed sub-one-point seeded variation. It does not reveal hidden powers or lifespan.

Open **อาชีพและการฝึก** for the result explanation, currently eligible careers, free basic practice (age 8+), recovery, profession work and promotions. Career readiness weights current development 85% and measured affinity 15%. Twenty base families have distinct profiles/jobs and three original story episodes, available from ages 12/13/16. One advanced path per family requires age 18, XP 120, mastery 60, a higher primary attribute and all three episodes. Work pays real ledger entries; learning uses days/stamina/fatigue/focus. Repeated practice has diminishing rewards within each 30-day window. All families have a route through free practice/recovery, including penniless characters. Switching preserves each family's XP, story perks and earned promotion.

Schema 4 adds `progression` without rerolling births or granting imported characters an unearned awakening. Exact raw pre-upgrade data is retained at `reborn_save_backup_before_v4`; the previous `...before_v3` backup remains untouched and both can be downloaded from the record. Export the newest save before rollback: older releases cannot read schema 4. Import UI is still pending.

Validation: `npm test`, `npm run content`, build/stage and `npm run test:e2e`. After starting the preview, `node scripts/verify-progression.mjs <url>` plays genuinely from birth to 12, then ceremony/career/work/training/save reload on desktop/mobile without injecting age into the browser. The public deployment workflow runs this check as well as basic asset/layout checks. This release is not a complete combat/immortality/full-content game.
