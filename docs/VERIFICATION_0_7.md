# V6 A/B release verification — 2026-10-29

Phase A source: a201167 (0.6.0). Phase B source: 010d5d5 (0.7.0). Published URL: https://ninon0406.github.io/alltest/. Expected final runtime assets: app-Csdyuu1D.js and app-Dlvd7EQ2.css, observed in actual public HTML. Both branch Pages publication steps succeeded.

## Local checks

- Vitest: 60/60 cases; none skipped. Retains 100,000-origin distribution audit, 40 detailed career routes and 20 annual promotions.
- Playwright: 37/37 unique cases; none skipped. Desktop/mobile gameplay/One-Life cases plus seven separate layout cases at 320/360/390/768/1024/1366/1920. A later language-only legacy-gallery change was checked again in both viewport projects (2/2).
- Content audit: all 126 authored scene/event records and 269 authored choices reachable in the union; six endings. Counts did not increase for UI/archives/procedural visual compositions.
- Production build, stage-site and diff whitespace checks passed. Three preview verification scripts passed. Screenshots were visually inspected for desktop/mobile main screen, map and rare multi-option dialog.

## Actual public browser checks

- `verify-production.mjs`: all seven widths load actual CSS/JS and original scene/sprite, show age/initial Lv1, use the 360-day annual plan, open map/career/bag/journal as same-run overlays, reload to unstarted rebirth without active persistence.
- `verify-progression.mjs`: genuine clicked birth-to-age-12, rare milestones, real remaining ceremony, fixed measured result in the same run, farmer selection, wages, free practice and a career episode at 1366/360. No injected age or saved-state fixture.
- `verify-one-life.mjs`: independent tabs, no active storage writes, actual original peaceful ending at age 60, one compact summary write, idempotent re-render, archive readable after refresh with no resume.
- Observed scenarios had no runtime/request errors. These checks were run against the public URL after verifying expected asset names, separately from workflow status.

## Scope limits

Tests use Chromium viewport emulation, not physical iOS/Android/PWA hardware. Native unload warnings and mobile eviction behavior are browser-controlled; a persisted-pageshow guard and normal back navigation were tested. Browser Web Locks are used where available; fallback cross-browser concurrency has not been exhaustively exercised.

Appearance-v2 inheritance/≥20 actual variants per group, owned equipment, power growth/breakthroughs, natural mortality/lifespan extension, deity route, NPC relationships and combat/dungeons are not implemented or claimed tested. The display starts at Lv1; career skill levels do not grant power levels. Phase C is the next actionable slice in NEXT_CODEX_TASK.md.
