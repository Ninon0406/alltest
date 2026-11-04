---
name: godseed-github-pages-delivery
description: Use to configure or repair GODSEED GitHub Pages deployment, Vite repository base path, GitHub Actions CI and Pages workflow, asset URLs, mobile-only owner setup, and release verification.
---

# GODSEED GitHub Pages Delivery

## Constraint
Publish static game from repository as HTML/CSS/JS/assets, no mandatory private backend or paid API. Owner operates through iPhone/mobile browser and may approve GitHub Settings; don't ask owner to run local terminal/Studio/VS Code.

## Vite base path correctness
- Verify actual deployment: `https://OWNER.github.io/REPO/` requires `base: '/REPO/'`; user/org root or custom domain normally `/`
- Prefer deriving config from repository/CI context when safe; use `import.meta.env.BASE_URL` for assets; never write `/assets/foo.png` hardcoded under project Pages
- Test built `dist` in repo subpath simulation and inspect 404/console
- PWA manifest/service worker scopes must stay within base path; offline is enhancement, not reason to break first-load

## GitHub Actions workflow
- CI: checkout, setup Node LTS supported by packages, `npm ci`, typecheck, lint, unit tests, content validator, build; E2E if runner setup allows
- Pages: `actions/configure-pages`, `actions/upload-pages-artifact` using `dist/`, `actions/deploy-pages`; declare `contents: read`, `pages: write`, `id-token: write` for deploy job; configure `github-pages` environment
- Verify official GitHub docs if versions/actions change; do not invent tool access or statuses
- Prevent deployment on failing build/test; push to approved branch according to actual repository rules

## Mobile owner workflow
1. Codex makes/updates files and commits/PR only with granted GitHub access
2. Owner reviews PR and CI in GitHub mobile browser/app
3. If GitHub Pages is not enabled, owner selects Settings → Pages → Source = GitHub Actions from mobile browser if available; give exact minimal steps
4. Visit **verified** URL and test on phone; if iPad/desktop not available, record untested real hardware honestly
5. Continue development with `03_CODEX_CONTINUE_FOREVER.md` and repository change log

## Security / permissions
Never solicit passwords or personal access tokens in chat; do not expose secrets in repository frontend. No force push, delete repo, unreviewed destructive migrations. Store attribution for all art/font/sound assets and check their licenses. If no repository permission, provide patch and instructions instead of claiming deployed.

## Release proof
Record commit hash, workflow run URL if actually available, actual Pages URL when verified, build output, version, smoke-test results (start→choice→craft→battle→end), Known Issues. A green Actions icon alone is not proof the game plays correctly
