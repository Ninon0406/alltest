---
name: godseed-qa-automation
description: Use for GODSEED unit tests, content graph validation, deterministic simulation tests, Playwright phone-iPad-desktop E2E, quality gates, regression triage, and truthful build reports.
---

# GODSEED QA & Testing — อย่าอ้างว่าผ่านถ้ายังไม่ทดสอบ

## Test pyramid
- Pure engine Vitest: RNG/replay, inventory/cost idempotency, legal recipe enumerator, spell effects, battle state transitions, save migrations
- Content validation: Scene ID/Choice ID uniqueness, all transitions resolve, action cues exist, NPC references exist, required item sources reachable, endings reachable
- Integration: choice→animation→state→next scene; explore→ingredient→craft→equip→battle→return; save/reload preserves flags and spells
- E2E (Playwright): real browser interactions and screenshot baselines across phone/iPad/desktop screen configurations

## Commands to run (adapt to package scripts)
```
npm ci
npm run typecheck
npm run lint
npm run validate:content
npm test
npm run build
npm run test:e2e
```
If a command does not exist, add appropriate script or report clearly; do not mark skipped as passed. Document any test environment limitations.

## Critical invariants
- No duplicate SceneID/ChoiceID; no non-ending deadlocks; no invalid prereq cost or repeat tapping duplication
- 8×6×7 possible recipes; assert 234 legal by canonical rules, all legal craftable if ingredients available
- Saving schema versioned; old saves either migrate or fall back safely without losing progress silently
- Battle never drops below 0 HP/MP or deadlocks after animation skip; outcome path exists and is correct
- AI optional off must still complete chapter; no API secrets bundled
- Assets resolve with GH Pages repo path and Vite `base`; browser console clean of critical errors

## Device tests
Phone 360×800/390×844/430×932/844×390; iPad 768×1024/820×1180/1024×768; desktop 1366×768/1440×900/1920×1080. Check click/tap keyboard accessibility and no clipped action buttons. Prefer screenshot diff review, but update baselines only after confirming expected design changes.

## Regression protocol
1. Reproduce defect; add failing regression test where reasonable
2. Fix root cause, not disable/skips tests
3. Verify targeted test then full relevant suite
4. Capture `PASS/FAIL/SKIPPED` and command, summary and important warnings
5. Mark test coverage gaps honestly; never invent emulator/hardware QA

## Reports
Update `docs/QA_MATRIX.md` with device/browser/emulation, date, build commit, test action/result/evidence, known issues. Prioritize: P0 crash/corrupted save; P1 broken playable loop/controls; P2 readability/balance/perf; P3 polish. Do not hide failing gates behind feature count
