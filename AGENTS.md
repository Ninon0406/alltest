# GODSEED — active project

Latest owner directive authorizes replacing REBORN completely with GODSEED. Historical REBORN game files and policies are removed. Do not resume REBORN development. GODSEED lives in `GODSEED/` and is published at the repository Pages root.

Read `01_CODEX_START.md`, `02_GODSEED_MASTER_SPEC.md` in full, `03_CODEX_CONTINUE_FOREVER.md` and `GODSEED/docs/PROGRESS.md` before development. Master specification controls game design; latest owner instructions control scope.

Read matching `.agents/skills/<name>/SKILL.md` before use. Invoke as `$<name>`.

- `godseed-choice-cinematics`: `.agents/skills/godseed-choice-cinematics/SKILL.md`
- `godseed-combat-vfx`: `.agents/skills/godseed-combat-vfx/SKILL.md`
- `godseed-continuous-development`: `.agents/skills/godseed-continuous-development/SKILL.md`
- `godseed-github-pages-delivery`: `.agents/skills/godseed-github-pages-delivery/SKILL.md`
- `godseed-narrative-memory-ai`: `.agents/skills/godseed-narrative-memory-ai/SKILL.md`
- `godseed-pixel-art-director`: `.agents/skills/godseed-pixel-art-director/SKILL.md`
- `godseed-project-director`: `.agents/skills/godseed-project-director/SKILL.md`
- `godseed-qa-automation`: `.agents/skills/godseed-qa-automation/SKILL.md`
- `godseed-responsive-accessibility`: `.agents/skills/godseed-responsive-accessibility/SKILL.md`
- `godseed-spell-alchemy`: `.agents/skills/godseed-spell-alchemy/SKILL.md`

Keep engine, content, systems, presentation and UI separate. Thai player text. No free-roaming controls, exposed API keys or copied game assets. State mutations are transactional; progress lives only in RAM. Explicit .godseed files are the only save/load path; no browser progress storage, automatic recovery or save upload. Saves are validated before replacement. Original procedural art is provisional until visual gates pass. Do not claim full chapter/visual/mobile acceptance from a partial slice.

Run GODSEED npm ci, typecheck, lint, validate:content, test, build and test:e2e for meaningful gameplay changes. Update GODSEED/docs/{PROGRESS,TASK_BOARD,ARCHITECTURE,TEST_REPORT,DECISIONS}. No sub-agents unless explicitly requested. Commit and prepare PR with actual verification results.

Before each batch read `GODSEED_MASTER_ROADMAP.md`. Review actual work and tests before changing `GODSEED/docs/roadmap.json`; regenerate roadmap/Task Board with `npm --prefix GODSEED run roadmap:update`, then `roadmap:check`. Keep statuses honest: DONE requires recorded verification; reproducible regressions become problem, unavailable hardware remains blocked. Add an entry to `GODSEED/docs/DEVELOPMENT_LOG.md` every session. Existing GS IDs map to granular roadmap IDs; do not maintain competing status sources. Checklist percentages are not game-quality estimates. Roadmap work supplements actual gameplay/art development.

## Owner V2 — Manual File Save only (2026-11-05)

ข้อกำหนดล่าสุดแทนที่คำสั่ง autosave / IndexedDB / automatic recovery ทั้งหมดในเอกสารประวัติด้านล่าง: เก็บ Game State เฉพาะ RAM บันทึกไฟล์ .godseed เมื่อผู้เล่นกดเอง โหลดผ่านการเลือกไฟล์และยืนยันเท่านั้น ห้ามอ่าน/เขียนความคืบหน้าผ่าน LocalStorage, SessionStorage, IndexedDB, Cookies, Cloud/Server หรือ Service Worker ห้ามอัปโหลดเซฟหรือสร้างไฟล์ลับหลังผู้เล่น รีเฟรชต้องกลับหน้าเริ่ม ไม่มีปุ่มเล่นต่อจากเซฟเบราว์เซอร์

ไฟล์รุ่นเดิมโหลดและ migrate ใน RAM ได้เมื่อผู้เล่นเลือกเอง ไม่อ่านหรือลบฐานข้อมูลเบราว์เซอร์เก่าโดยอัตโนมัติ ใช้ checkpoint ที่เสถียร (story choice / battle turn) ปิดปุ่มระหว่าง animation/transition ตรวจ extension/size/version/checksum/reference และแสดง summary ก่อนยืนยัน เตือนก่อนเริ่มใหม่/ออกด้วยsave/continue/discard และ native beforeunloadเมื่อทำได้ ไม่อ้างว่าOSเก็บสำเร็จจากการเริ่มdownload

สถานะ SAVE-001..SAVE-014 อยู่ใต้FND-005ในRoadmap SSOT ไม่เพิ่มตัวหารหลักซ้ำ Runtime gate: `npm --prefix GODSEED run validate:manual-save` พร้อมbrowser audit/no-upload/empty-reload/round-trip tests ตามข้อกำหนดใหม่ หลักฐานIndexedDBรุ่นก่อนเป็นประวัติ ไม่ใช่การรับรองระบบปัจจุบัน
