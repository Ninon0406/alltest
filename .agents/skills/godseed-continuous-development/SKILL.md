---
name: godseed-continuous-development
description: Use when GODSEED Codex work was interrupted, a sprint finished, the user says continue, a bug needs repair, or a mature build needs a new useful improvement without overwriting previous work.
---

# GODSEED Continue & Recover — เปิดไฟล์นี้ซ้ำได้หลายรอบ

## Principle
A new Codex session = one bounded useful batch; skills cannot run indefinitely in background. Repetition of continue prompt must advance from repo state, not re-do roadmap from memory. The user can override priorities by latest message.

## Recovery loop
1. Inspect `git status`, branch, latest commit, current files and package scripts
2. Read actual repo: master spec (`docs/GODSEED_MASTER_SPEC.md`), `03_CODEX_CONTINUE_FOREVER.md`, `docs/PROGRESS.md`, `docs/TASK_BOARD.md`, `docs/DECISIONS.md`, `docs/QA_MATRIX.md`
3. Determine current playable path, actual scene/choice/item/enemy/recipe counts from source; never copy previous claimed numbers
4. Re-run smallest relevant tests; identify failures and unfinished edits
5. Select a 2–5 task batch: P0 defects → P1 gameplay blockers → P2 art/UX/performance → P3 narrative/skills/AI expansions
6. Implement and test changes, preserving earlier features and save compatibility
7. Update progress and planned next tasks with verification evidence; use commit/PR only with permission

## Definition of improvement after first release
- Improve retention through content quality, varied fair strategies and heartwarming payoff, not coercive timers, pay-to-win, FOMO or dark patterns
- Increase story depth using flags, NPC trust, unique action cues; add reachable branches not repeated filler
- Deepen alchemy within canonical rules; do not silently increase legal count from 234
- Expand original assets/VFX if quality remains consistent; monitor performance
- Add small AI storytelling only after deterministic fallback robust
- Re-check mobile/iPad/desktop after every significant UX or rendering change

## Stop conditions
End a session when a coherent batch is implemented and verified or when blocked by permissions/resources/constraints; do not promise asynchronous continuation. If a next batch can be done in the same active session, proceed according to user request and tool limits, but always leave clean documentation.

## Output contract (Thai)
```
รอบนี้ทำอะไร: ... (path/commit)
ตอนนี้เล่นได้ถึงไหน: ... (verified flow)
ผลทดสอบ: ... (actual commands and PASS/FAIL/SKIP)
ภาพ/ความลื่น 3 อุปกรณ์: phone / iPad / desktop, real vs emulated
สถานะ GitHub Pages: URL checked / awaiting approval / not published
ปัญหาค้าง: ...
งานที่ควรทำรอบถัดไป: ... 1-3 tasks
```
Do not claim project finished forever; practical backlog and owner decisions control scope
