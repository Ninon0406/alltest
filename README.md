# REBORN: พงศาวดารผู้เกิดใหม่

Thai browser narrative RPG. Milestones 1–2 preserve the original story on a Vite / vanilla ES module foundation and add weighted random rebirth. No backend, API keys, or runtime image services are needed.

## Development

Use Node.js 22.12+ (validated on 24.19) and npm. From this checkout:

```sh
npm ci
npm run dev
```

The development server binds loopback. Saves use browser LocalStorage (`reborn_save`); unversioned and version-1 saves keep their original characters and migrate to version 2 on the next save. Invalid/future saves remain intact; replacing one requires confirmation at the rebirth screen. Restart requires confirmation and clears the current save, including unlocked endings, matching the original behavior.

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

See ROADMAP.md and CONTENT_MANIFEST.md for verified scope. Fresh games open a dedicated rebirth screen with no stat or seed controls. One click rolls and saves a life before revealing its Birth Record. The immutable record retains original attributes while the character develops. Talents immediately increase one resource maximum. Hidden potential, rare ability identities and race-based natural lifespan are saved but hidden from the interface; awakening and lifespan enforcement await later systems. Annual simulation remains a future milestone.

Generation uses Mulberry32 and a cryptographically supplied 32-bit seed. Developer tests can call `generateBirth(seed)` for exact reproduction; UI users cannot select circumstances. Birth rarity weights are 70/23/6/1 (common/special/rare/legendary) and determine starting wealth. Race, individual attributes and talent use separate random draws. Rare birth does not guarantee high attributes. Save files are local, readable game data, not secure secret storage.
