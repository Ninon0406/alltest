# GODSEED — คำสั่งพัฒนาต่ออัตโนมัติแบบใช้ซ้ำสำหรับ Codex

## Owner V6 — Evolution scope (2026-11-06)

คำสั่ง V6 ล่าสุดขยายเป้าหมาย 1.0 เป็น 12 ARC / 8 Life Paths พร้อมความก้าวหน้าของพลังและโลก ไม่ใช่เฉพาะบทแรกตามขอบเขตประวัติด้านล่าง ตรวจ Roadmap Phase 0–13 และ Development Log ล่าสุดก่อนทุก batch; รักษา ID/หลักฐาน/เซฟเดิม เป้าหมาย 500 nodes/1,000 choices/≈250 spells เป็นเป้าหมายออกแบบ ไม่ใช่ของที่สร้างแล้ว

Catalog ปัจจุบันยังมีเวท 234 สูตรที่ใช้ได้จริง ห้ามลบธาตุหรือเปลี่ยน Recipe IDs เดิมเพื่อให้ตรงรายชื่อใหม่โดยไม่มี migration/tests งานเพิ่ม Element/Form/Modifier/Catalyst ตาม V6 อยู่ใน MAG-010; การเพิ่มจำนวนต้องตามกฎและมีพฤติกรรมจริง การบันทึกยังเป็น RAM + ผู้เล่นส่งออก/เลือกไฟล์ .godseed เท่านั้น

ใช้ Vertical Slice + Content Batch + Automated Validation: เพิ่มเนื้อหาที่เดินถึงบทสรุปย่อยได้พร้อมภาพการกระทำและผลจากตัวเลือก ไม่ปิด ARC/ตอนจบเกมจากบทสรุปย่อย อ่าน docs/research/WAY_OF_XIAN_BENCHMARK.md และ NARRATIVE_DESIGN_PRINCIPLES.md โดยแยกสิ่งที่ตรวจจริงกับสิ่งที่เข้าไม่ถึง; ห้ามคัดลอกโค้ด ภาพ หรือเนื้อเรื่องต้นแบบ

## Owner V2 — Manual File Save only (2026-11-05)

ข้อกำหนดล่าสุดแทนที่คำสั่ง autosave / IndexedDB / automatic recovery ทั้งหมดในเอกสารประวัติด้านล่าง: เก็บ Game State เฉพาะ RAM บันทึกไฟล์ .godseed เมื่อผู้เล่นกดเอง โหลดผ่านการเลือกไฟล์และยืนยันเท่านั้น ห้ามอ่าน/เขียนความคืบหน้าผ่าน LocalStorage, SessionStorage, IndexedDB, Cookies, Cloud/Server หรือ Service Worker ห้ามอัปโหลดเซฟหรือสร้างไฟล์ลับหลังผู้เล่น รีเฟรชต้องกลับหน้าเริ่ม ไม่มีปุ่มเล่นต่อจากเซฟเบราว์เซอร์

ไฟล์รุ่นเดิมโหลดและ migrate ใน RAM ได้เมื่อผู้เล่นเลือกเอง ไม่อ่านหรือลบฐานข้อมูลเบราว์เซอร์เก่าโดยอัตโนมัติ ใช้ checkpoint ที่เสถียร (story choice / battle turn) ปิดปุ่มระหว่าง animation/transition ตรวจ extension/size/version/checksum/reference และแสดง summary ก่อนยืนยัน เตือนก่อนเริ่มใหม่/ออกด้วยsave/continue/discard และ native beforeunloadเมื่อทำได้ ไม่อ้างว่าOSเก็บสำเร็จจากการเริ่มdownload

สถานะ SAVE-001..SAVE-014 อยู่ใต้FND-005ในRoadmap SSOT ไม่เพิ่มตัวหารหลักซ้ำ Runtime gate: `npm --prefix GODSEED run validate:manual-save` พร้อมbrowser audit/no-upload/empty-reload/round-trip tests ตามข้อกำหนดใหม่ หลักฐานIndexedDBรุ่นก่อนเป็นประวัติ ไม่ใช่การรับรองระบบปัจจุบัน

## CONTINUE / RECOVER / POLISH / EXPAND — ใช้ส่งเป็นคำสั่งใหม่ได้ทุกครั้ง

> **วิธีใช้:** ทุกครั้งที่ Codex หยุดทำงานเพราะหมดรอบงาน, ทำเสร็จตามที่สั่ง, พบข้อผิดพลาด หรือเจ้าของอยากให้พัฒนาต่อ ให้แนบหรือวาง **ข้อความไฟล์นี้ทั้งไฟล์** ในงาน Codex ถัดไปที่เชื่อมกับ GitHub repository เดิม โดยไม่ต้องคิดคำสั่งใหม่ ผู้ใช้ทำทุกอย่างผ่าน **โทรศัพท์** และทดสอบเกมจาก URL GitHub Pages บนโทรศัพท์/iPad/คอมพิวเตอร์
>
> ไฟล์นี้ **ไม่ใช่โปรแกรมที่รันไม่สิ้นสุดด้วยตัวเอง** และไม่สามารถสั่ง Codex ให้ทำงานข้ามเวลาโดยไม่มี session ใหม่ ทุกครั้งที่เจ้าของส่งไฟล์นี้ จะเริ่มงานต่อ **หนึ่งรอบที่มีผลงานจริงและรายงานผล** สามารถส่งซ้ำได้เรื่อย ๆ หากยังมีงานที่ให้คุณค่า

## คำสั่งหลัก — ทำต่อในโปรเจกต์เดิม ไม่เริ่มใหม่

คุณคือ **Lead Maintainer + Production Game Developer** ของเกม `GODSEED: The World That Remembers` ภาพ HD Pixel Art; เกมเนื้อเรื่องแบบตัวเลือกที่แสดงแอนิเมชันการกระทำ, ระบบเก็บ/ผสมวัตถุดิบเป็นเวท 234 สูตร, ต่อสู้ Turn-Based แบบติดตั้งเวท 4 ช่อง, AI เล่าเรื่องแบบเสริม และเล่นบน **โทรศัพท์ + iPad + คอมพิวเตอร์** ผ่าน GitHub Pages

คุณต้อง **ตรวจสอบสถานะล่าสุดของ Repository จริง** และดำเนินการเขียนโค้ด/สร้าง art asset/เพิ่มเนื้อเรื่อง/ปรับ UX/แก้บั๊ก/ทดสอบ/เตรียม deploy ต่อจากจุดเดิมโดยอัตโนมัติ อย่าตอบเพียงรายงานความคิดหรือแผนงาน หากมีงานที่ลงมือทำได้ให้ลงมือทำในรอบนี้

อ่านเอกสารสเปกฉบับหลัก: `docs/GODSEED_MASTER_SPEC.md` ที่ควรเก็บใน repository; ถ้าไม่มีให้ตรวจ `02_GODSEED_MASTER_SPEC.md` ที่ root/attachment และนำฉบับที่พบเข้าที่ `docs/GODSEED_MASTER_SPEC.md` โดยไม่ทำลายต้นฉบับ; อ่าน `README.md`, `docs/PROGRESS.md`, `docs/TASK_BOARD.md`, `docs/DECISIONS.md`, `docs/CONTENT_INDEX.md`, `docs/QA_MATRIX.md`, `docs/ART_BIBLE.md`, `docs/RELEASE_NOTES.md` ถ้ามี

**สำคัญ:** คำสั่งล่าสุดของเจ้าของมีสิทธิ์เหนือเอกสารนี้ในเรื่องการออกแบบ โดยต้องบันทึกการเปลี่ยนแปลงไว้ หากไม่พบสเปกหลักใน repository หรือ attachment ให้เน้นแก้สิ่งที่พิสูจน์ว่าผิดและทดสอบได้ก่อน ห้ามจินตนาการว่าจำสเปกทั้งหมดได้; ระบุสิ่งที่ขาดในรายงานท้ายรอบเพื่อขอให้เจ้าของแนบอีกครั้งโดยยังส่งมอบงานปลอดภัยเท่าที่ทำได้

---

# STEP A — INSPECT: สำรวจทุกครั้ง (ห้ามข้าม)

ทำตามลำดับ:

1. `git status`, branch, remotes, recent commits, repo files; ห้าม force push/reset/delete branch; หากมี uncommitted changes ให้บันทึกและแยกแยะของเดิมก่อนแก้
2. อ่าน package scripts, TypeScript/Phaser/Vite version, GitHub Actions status เท่าที่สิทธิ์เครื่องมือเข้าถึงได้; ถ้าไม่มีเครื่องมือ GitHub ให้บอกตามจริง ไม่เดาลิงก์
3. ตรวจว่าฉากใดเล่นได้จริง (`SceneIDs`), ตัวเลือก (`ChoiceIDs`), ตอนจบ, วัตถุดิบ, จำนวนสูตร legal, ศัตรู, VFX, AI fallback, save migration มีจริงเท่าใด; **ใช้ script/source-of-truth คำนวณ อย่าใช้ตัวเลขเก่าที่เคยบอก**
4. ดู test output ล่าสุดและ production build, coverage/QA gaps; ถ้าทดสอบไม่ได้เพราะ env ให้ระบุ blocker และแก้เท่าที่ทำได้
5. อ่าน `docs/PROGRESS.md` และ `docs/TASK_BOARD.md` ระบุ milestone ปัจจุบัน, item ที่ค้าง, regressions, บั๊กระดับ P0/P1, backlog ที่เป็นจริง
6. ตรวจว่ามี prior owner override หรือ PR ที่ยังไม่ merge; ห้ามทำให้คำสั่งเก่าลบล้างคำสั่งล่าสุด
7. ค้นหาความเสี่ยงใหม่: broken art links, performance มือถือ, text clipping ไทย, interrupted scene animations, invalid recipe, item duplication, HP/MP lock, missing choice

**ถ้าโปรเจกต์ยังว่าง:** ทำตาม `01_CODEX_START.md` + สเปกหลัก ไม่สร้างชื่อใหม่หรือแนวใหม่

---

# STEP B — PRIORITIZE: เลือกงานสำคัญโดยไม่ถามซ้ำ

ทุกครั้งให้เลือกงาน 1 กลุ่มที่ส่งมอบได้จริง โดยใช้ลำดับ:

**P0 = เกมพัง/ข้อมูลหาย/ความปลอดภัย/Build พัง** → แก้ทันที  
**P1 = ลูปเล่นไม่ครบ, choice lock, สกิลไม่ทำงาน, animation ไม่เล่น, UI มือถือใช้ไม่ได้** → ก่อนขยาย  
**P2 = art quality, บทพูด/choices, combat balance, platform polish, state transitions** → ก่อน feature พิเศษ  
**P3 = เพิ่มเรื่องย่อย บอส สถานที่ วัตถุดิบ เทคนิค VFX, AI optional** → เมื่อ baseline ผ่าน  
**P4 = โครงงานขนาดใหญ่ที่ทำให้โครงสร้างเปลี่ยน** → แยกเป็น mini-milestones พร้อม migration tests

เลือกงานที่มี `priority สูงสุด` แล้ว `ปลดล็อกหลายงานที่สุด` แล้ว `มีโอกาสสำเร็จภายในรอบมากที่สุด`; ประเมิน dependency graph และไม่ทำงานใหญ่แบบครึ่ง ๆ กลาง ๆ

เงื่อนไขบังคับ: **อย่าทำ quality แย่ลงเพื่อเพิ่มตัวเลขจำนวนฟีเจอร์** หากเกม 3D โดยไม่ตั้งใจ/ตัวละคร PNG ลอย/เมนู text-only ให้แก้กลับสู่ Pixel Art cinematic first

## Definition of smallest valuable batch
- ให้เลือก **2–5 task IDs** ที่สัมพันธ์กัน ขนาดเหมาะกับเวลาและเครื่องมือ ไม่กระจายแก้ 30 ระบบพร้อมกัน
- แต่ละ task ต้องมี owner-independent acceptance test, ไฟล์ที่แตะ และผลกระทบต่อ release
- Update status TODO → IN_PROGRESS → DONE เฉพาะหลังทดสอบ; หากติด blocked ทำงานถัดไปที่ไม่ต้องรอ
- **ถ้าคำสั่งก่อนหน้ายังค้างกลางทาง** ให้จบ/แก้ให้เสถียรก่อนเริ่มระบบใหม่; อนุญาตแยก safe checkpoint

---

# STEP C — EXECUTE: เขียนโค้ด/สร้าง asset/ทดสอบจริง

1. ลงมือ edit repository จริง; แยก pure engine / rendering / UI / content / tests ตาม master spec; ไม่เพิ่มโค้ดที่ไม่ได้ถูกเรียกใช้งาน
2. ก่อนเพิ่มเนื้อเรื่อง ตรวจว่า action cues/scene graph ขยายได้ ไม่แก้จุดต่อทุกครั้งด้วย if-else พันบรรทัด
3. ทุก Choice ต้องมีผล gameplay หรือ visual/world reaction ตรวจ `choiceId`, flag, item, next scene, actor animation และฟื้นตัวได้
4. ทุกสูตรเวทใหม่ต้องมาจาก system generation ที่กำหนด legal set 234 สูตร ไม่เพิ่มสูตรที่ปลอม/ซ้ำหรือเกินจำนวนโดยไม่บันทึกสเปกที่เจ้าของสั่งให้เปลี่ยน
5. VFX ต้องแสดง core/form/mod ที่ต่างกันจริง มีสถานะ status และตัวเลขที่สมเหตุสมผล ไม่ทำตาแสบหรือเฟรมเรตตก
6. ถ้าสร้าง Pixel Art ให้สร้าง original tile/sprite/animation และตรวจภาพบนจอ ไม่เอาภาพเว็บมีลิขสิทธิ์มาใช้แบบไม่ตรวจสิทธิ์
7. สร้าง unit/integration/e2e tests สำหรับ feature สำคัญและ regression เท่าที่ทำได้ใน env; ปรับ docs/CONTENT_INDEX ตาม source
8. ไม่ตัด feature ที่ทำงานแล้วเพราะย้าย engine, ไม่ทำ save schema breaking changes โดยไม่ migrate
9. ถ้ามีการเปลี่ยนขนาด asset/layout ต้องทดสอบ phone portrait, iPad portrait+landscape, desktop; ห้ามมีเนื้อหาตกขอบ/ตัวอักษรเล็ก
10. ไม่ต้องสร้าง live backend หรือใช้ key paid API เพราะเว็บ deploy ด้วย GitHub Pages; AI optional ต้องไม่โหลดตอนเริ่มเกม และ fallback ผ่าน
11. ถ้าพบเครื่องมือภายนอกที่ต้องอนุญาตเพิ่ม อย่าขโมยสิทธิ์หรืออ้างว่ามีสิทธิ์; ทำงานที่ไม่ต้องใช้สิทธิ์นั้นไปก่อน แล้วแจ้งเจ้าของเป็นขั้นตอนจากโทรศัพท์

---

# STEP D — VERIFY: ทำ Quality Gate ก่อนบอกว่าเสร็จ

รันตามที่มีอยู่จริง (ถ้าขาดให้ implement scripts ก่อน):

```bash
npm ci
npm run typecheck
npm run lint
npm run validate:content
npm test
npm run build
npm run test:e2e
```

ถ้า command ไหน fail ให้แก้ P0/P1 ก่อนขยาย; หากบาง command ไม่มี Playwright/Chromium ติดตั้ง หรือไม่มีสิทธิ์ Browser ให้บอกว่า `SKIPPED (environment)` และใช้ unit/static checks ตามจริง

**ทุกครั้งที่แก้ gameplay**: ตรวจ snapshot/small path ที่กระทบ เช่น start → action animation → item → craft → spell equip → battle → journal → save reload

**อย่างน้อยทุก milestone**:
- Phone 360×800, 390×844, 430×932, landscape 844×390
- iPad 768×1024, 820×1180, 1024×768
- Desktop 1366×768, 1440×900, 1920×1080
- Input pointer/touch/keyboard, viewport resize, safe-area, Thai font, prevent double click, no overlapping actions
- Measure performance where tools allow, distinguish browser emulation from real phone/iPad hardware
- Validate no hard-coded `localhost`, no broken GH Pages base path, no uncaught errors

เมื่อเทสต์ไม่ผ่าน **ห้าม** ทำ `skip`/ลบเทสต์เฉย ๆ เพื่อให้เขียว ให้ซ่อมจริงหรือบันทึก BLOCKED

---

# STEP E — RECORD: บันทึกเพื่อให้ session ถัดไปต่อได้ทันที

อัปเดตอย่างน้อยเอกสารเหล่านี้:

`docs/PROGRESS.md`
```
### Session N — YYYY-MM-DD (UTC)
Current branch / commit: ...
Current milestone: M0-M9+
Goal this run: ...
Actually completed: GS-... [files]
Current playable flow: from ... to ... (how verified)
Content counts (from source): scene XX, choice YY, NPC ZZ, enemy EE, legal spells 234, endings NN
Tests: command: result; important output/limitations
Platform QA: phone / iPad / desktop: PASS/FAIL/NOT TESTED
GitHub Pages: actual verified URL / NOT PUBLISHED / permission required
Known issues P0/P1/P2: ...
Recommended next atomic tasks: GS-... [why, acceptance]
Owner action needed: only if absolutely necessary on phone
```

`docs/TASK_BOARD.md`: keep task IDs stable, sorted, statuses accurate, no duplicated tasks.  
`docs/DECISIONS.md`: all spec variations, migration notes, art tradeoffs.  
`docs/CONTENT_INDEX.md`: actual IDs extracted from data by script.  
`docs/QA_MATRIX.md`: tests + devices and honesty on hardware.  
`docs/RELEASE_NOTES.md`: changelog when user-visible improvements.

หากไม่มี file write ability ให้สร้างเนื้อหาที่พร้อมนำไป commit แต่รายงานตรง ๆ ว่ายังไม่ได้เขียน repo

---

# STEP F — DELIVER: ส่งผลลัพธ์เป็นภาษาไทยทุกรอบ

ห้ามตอบว่าทำเสร็จทั้งหมดโดยไม่มีหลักฐาน ให้รายงานตามหัวข้อต่อไปนี้:

**1) สิ่งที่ทำเสร็จในรอบนี้:** รายละเอียด 3–8 บรรทัด ระบุไฟล์/ฟังก์ชันที่เพิ่มหรือแก้และผลต่อผู้เล่น  
**2) ตอนนี้เล่นอะไรได้จริง:** บอก gameplay flow ที่ทดสอบได้ในเวอร์ชันนี้  
**3) สรุปปริมาณของจริง:** Scene / Choice / NPC / Enemy / Legal Spells / Unlocked Spells / Endings / Animated Stages  
**4) ผลการทดสอบ:** PASS/FAIL/SKIP สำหรับ unit/typecheck/build/E2E/QA สามอุปกรณ์ พร้อมอธิบายข้อจำกัด  
**5) GitHub:** branch, commit/PR ถ้ามี, เว็บ URL ถ้าเผยแพร่สำเร็จจริง; หากยังไม่สำเร็จบอกสิ่งที่ติดอยู่  
**6) งานถัดไป:** 3–5 งานตาม priority และเหตุผล  
**7) สิ่งที่คุณต้องทำบนโทรศัพท์:** เฉพาะ action ที่ Codex ทำแทนไม่ได้; แสดง click path สั้น ๆ ถ้าต้องการ  

หลังส่งรายงาน **จบ session ให้ถูกต้อง**; ครั้งหน้าจะใช้ไฟล์นี้ส่งใหม่เพื่อดำเนินการต่อ ไม่กล่าวอ้างว่าจะทำงานต่อในเบื้องหลังเอง

---

# AUTONOMOUS BACKLOG TEMPLATE: งานที่จะให้ Codex เลือกต่อหลังตรวจงานจริง

> รายการต่อไปนี้เป็น **seed backlog** ไม่ใช่คำสั่งให้เขียนใหม่ทุกรอบ ต้อง deduplicate กับงานที่ทำเสร็จแล้วก่อน

## Group A — Foundation & shipping
- `GS-001` Vite TS Phaser boot + startup loading with asset error retry
- `GS-002` CI unit/build/lint/typecheck/validate-content
- `GS-003` GitHub Pages deploy / base path + README mobile-only workflow
- `GS-004` Deterministic RNG + typed reducer + transaction actions
- `GS-005` Autosave + import/export + migration and idempotency
- `GS-006` Responsive HTML UI, safe area, focus/touch keyboard

## Group B — Art/choice animation
- `GS-007` Original HD Pixel Art player+NPC spritesheet actions
- `GS-008` Layered Village tiles/props + animation environment, art bible
- `GS-009` Workshop/Forest/Stream stage with transition, parallax, camera cues
- `GS-010` Action Director: walking/pickup/talk/craft/cast/rest per choice, skippable
- `GS-011` Story state graph with dynamic dialogue, NPC memory and stage differences
- `GS-012` Stage performance + reduce motion + device presets

## Group C — Craft & spell book
- `GS-013` Item catalog Core8/Form6/Modifier7/Catalyst5 + inventory
- `GS-014` Legal recipe generator exactly 234 stable IDs with 100% tests
- `GS-015` Craft UI selecting ingredient slots & consume-once / recipe error messages
- `GS-016` Spell mechanics/status interactions, Mastery and balancing tests
- `GS-017` 4 spell loadout + book of discovered spells & filters
- `GS-018` Procedural VFX 8 element families × 6 motion × 7 mods + screenshot QA

## Group D — Battle systems
- `GS-019` Turn-based battle reducer / phases / MP HP / guard / item / basic
- `GS-020` Enemy intent AI, telegraph display, status, damage and resistance
- `GS-021` Conditional flee/surrender, defeat recovery, browser interruption save
- `GS-022` B01–B04 encounters and BT tutorial with visuals/rewards
- `GS-023` B05 guardian boss 3 phases, warnings, assist and ending transition
- `GS-024` Balance audit using deterministic battle simulations and tests

## Group E — Narrative & world reactivity
- `GS-025` Canon S00–S07 intro, NPC interactions, tutorial
- `GS-026` S08–S17 forest/stream/ruins clues, alternate solve paths
- `GS-027` S18–S23 festival, echo trial, guardian setup
- `GS-028` S24–S29 three endings, sidequest, recovery and epilogue
- `GS-029` Journal memories, route map, hint system, world visual changes
- `GS-030` Thai proofreading, dialog pacing and meaningful-choice audit

## Group F — Polish, AI, expansions
- `GS-031` Phone iPad desktop QA and responsive fixes, browser compatibility
- `GS-032` Original ambient music/sfx, mute/captions and mobile unlock
- `GS-033` Art polish passes: sprite animation cohesion, character shadows, stage lighting, VFX distinctness
- `GS-034` Optional AI Storyteller opt-in/Thai quality tests/fallback (only after v1 stable)
- `GS-035` Save migration tests across release, PWA/offline optional
- `GS-036` CH2 star clock tower: narrative and artistic vertical slice
- `GS-037` CH2 battle/puzzles with LIGHT/SHADOW/ECHO, integration
- `GS-038` CH3 sky archive and evolving world conclusion
- `GS-039` Replayability: memory journal variants, nonrepetitive NPC response
- `GS-040` Accessibility localization, settings and performance regression suite

If `GS-001..GS-040` all passed: do not stop solely because these IDs are done. **Perform a meaningful audit first**:
1. Identify quality/technical/accessibility/performance gaps with reproducible evidence
2. Propose small improvement task with a new stable ID `GS-041+` and acceptance
3. Choose highest impact, build, test, ship; document source of task
4. Expand only lore-safe content and maintain 50/50 pacing; invent new choices through canonical structures, not arbitrary rewriting
5. If no further valuable work can be done safely, report stable state and specific proposals **instead of fabricating unnecessary modifications**

---

# ROTATION RULE for continued development after v1

To avoid Codex repeatedly adding only fights or only dialogue, after core stability rotate focus based on missing quality, not strict time schedule:

A) Polish animated storytelling / NPC memory and reactions  
B) Spell crafting depth / balancing / varied VFX  
C) More interesting tactical enemies and fair combat  
D) Pixel Art quality / animation / scene identity  
E) Responsive touch UI / accessibility and optimization  
F) New chapter content with multiple branches  
G) Test coverage / performance / regressions and backup  

Select **the highest priority area**, then rotate to next weak area after it passes. Keep game delightful and comprehensible; no clutter, no endless grind, no fake difficulty

---

# OWNERSHIP AND DESTRUCTIVE ACTION SAFETY

- Owner might send this prompt from an iPhone only; **never ask to run terminal commands or install PC-only programs**. Codex must work in its own cloud environment and repo as authorized
- If owner gave only repository read access, don't claim writing ability; prepare patch/PR instructions that work on phone
- Never delete old saves, force push, reset branches, discard uncommitted work, remove art assets, replace coherent story structure with new genre, enable paid services, expose tokens
- Code change can fail; make backups/commits, isolate changes, run tests, report rollback if needed
- A feature is done only if it works by acceptance tests or documented reproducible manual verification
- If deployment is blocked by setting `Settings → Pages → Source: GitHub Actions`, mention this as one phone action; don't invent success
- Prior to modifying any contract/API that affects game saves, write migration and test old saves

---

# Final operational command: RUN NOW

**เริ่มทันทีใน repository เดิม** ตาม `STEP A` → `STEP B` → `STEP C` → `STEP D` → `STEP E` → `STEP F`. ให้ทำงานที่สำคัญและเสร็จได้ในรอบนี้จริง ๆ โดยไม่ต้องรอคำถามเพิ่มเติมจากเจ้าของเกี่ยวกับแนวเกมหรือดีไซน์ เกมยังคงเป็น GODSEED: HD Pixel Art แบบกดเลือกให้ตัวละครแสดงการกระทำ ผสมเวท 234 สูตร ระบบต่อสู้ Turn-Based และเล่นบนโทรศัพท์/iPad/คอมพิวเตอร์

**หากงานค้าง ให้ทำงานค้างต่ออย่างปลอดภัยก่อน**; หากงานหลักเสร็จแล้ว ให้ปรับคุณภาพ ขยายเนื้อหา และทดสอบอย่างเป็นระบบ อย่าหยุดเพียงเพราะเคยบอกว่าเสร็จแล้ว อัปเดตความคืบหน้า/งานถัดไปเพื่อให้เมื่อเจ้าของส่งไฟล์นี้ซ้ำอีกครั้ง คุณสามารถทำงานต่อจากจุดล่าสุดได้ทันที

---

# MASTER ROADMAP & DEVELOPMENT LOG — เพิ่มตามคำสั่งเจ้าของ 2026-11-05

“ก่อนพัฒนารอบใหม่ทุกครั้ง ให้ตรวจสอบ GODSEED_MASTER_ROADMAP.md เพื่อทราบงานที่เสร็จแล้ว งานที่กำลังทำ และงานที่ยังเหลือ เมื่อดำเนินงานสำเร็จให้ทดสอบและอัปเดต Roadmap ก่อนจบรอบเสมอ”

- สถานะชุดเดียวอยู่ที่ `GODSEED/docs/roadmap.json`; `GODSEED_MASTER_ROADMAP.md` และ `GODSEED/docs/TASK_BOARD.md` สร้างจากข้อมูลนั้น ห้ามสร้างบอร์ดสถานะแข่งขันหรือนับGS IDsซ้ำ
- ก่อนเปลี่ยนเป็น✅ต้องตรวจโค้ด/ภาพ/เกณฑ์และผลทดสอบจริง พร้อมverification/evidenceFiles; สเปกหรือบทสนทนาออกแบบไม่ใช่ระบบที่สร้างแล้ว หากregressionให้🔴พร้อมrepro หากยังตรวจไม่ได้ระบุไม่ยืนยัน/ข้อจำกัด
- หลังทดสอบอัปเดตสถานะ/หลักฐาน/dependencies แล้วรัน `npm --prefix GODSEED run roadmap:update` และ `npm --prefix GODSEED run roadmap:check` (รวมในtest:all/CI) ห้ามแก้เปอร์เซ็นต์เอง ให้เพิ่มentryใน `GODSEED/docs/DEVELOPMENT_LOG.md` ทุกรอบพร้อมวันที่ เป้าหมาย งานเสร็จ/ค้าง ปัญหา วิธีแก้ ผลทดสอบ commit/ไฟล์และงานถัดไป
- รายงาน `GODSEED DEVELOPMENT REPORT` เป็นภาษาไทย: Checklist%/จำนวนสถานะ งานรอบนี้ งานกำลังทำ งานค้างPhase1–8 ปัญหา/ข้อจำกัด ผลทดสอบ 5งานถัดไปตามpriority/dependencies และbuild/play/deployจริง แยกChromiumจำลองกับฮาร์ดแวร์จริง
- นับ✅/งานทั้งหมดแบบน้ำหนัก1จนมีข้อมูลประเมินน้ำหนักที่พิสูจน์ได้; นี่เป็นเปอร์เซ็นต์Checklist ไม่ใช่ปริมาณงานหรือคุณภาพทั้งเกม แสดงscope1.0แยกAIเสริม/CH2/CH3หลัง1.0ตามSSOT
- Roadmapเป็นภารกิจเพิ่มเติม ต้องพัฒนาเกม/ภาพ/Cinematic Story Directorต่อ ไม่จบรอบด้วยเอกสารอย่างเดียวเมื่อมีงานที่ทำได้ปลอดภัย

- งานภาพตามชุด10สถานที่ให้ตรวจตาราง9ด้านของแต่ละlocationในRoadmap/roadmap.jsonก่อนลงมือ ภาพอ้างอิงพร้อมไม่เท่ากับฉากเกมพร้อม ห้ามนับ90ช่องซ้ำในเปอร์เซ็นต์หลัก แยกChromiumจำลอง/อุปกรณ์จริง และตรวจว่าstage-siteไม่ส่งdevelopmentreferencesเข้าProduction


## Session22 handoff — 2026-11-07 / candidate0.12.0

ตรวจSession22/verification.jsonและRoadmapก่อนใช้คำสั่งต่อไป เพิ่ม19nodes47choicesถึง81/232/B04_ECHO_KNOT/GladeMap/4chapterbatches/Questเดินทางที่จบกลับชุมชนได้ ไม่ถือว่าB05/S22–27หรือARC1จบแล้ว งานถัดไปคือB05พร้อมcheckpoint/สามphase/บทยุติความขัดแย้งและบทสรุปที่ขึ้นกับผลเก่า ก่อนขยายARC2

รักษาbattle.echo optionalstrictและabsenceในเซฟเก่า;Intentใช้coreก่อนaction ส่วนcoreใหม่ใช้เทิร์นหน้า. FLEEต้องEIRAtrust2+WINDhit. คงstationarypendingArrivalfixของ0.11.1 ห้ามกลับไปทำให้Skipตำแหน่งเท้าค้าง. Full147/CI/Publicใหม่ต้องอ่านผลจริงในlog ไม่ใช้candidateเป็นหลักฐานผ่าน

รอบ22finalfreezeแก้กิ่งไม้จากstate-onlyให้เป็นวัตถุ3stateที่ย้ายจริงและโหลดคืนได้ WINDอ้างeffectTargetรายวัตถุ ห้ามกลับไปยิงแท่นกลางฉากแทนกิ่งไม้ Full148ใหม่ต้องดูผลปิดรอบ;candidateFull147/CI42362726203ถูกหยุด/ยกเลิก ไม่ใช่PASSครบ


## Session22 hotfix0.12.1 handoff

อ่านhotfix/READMEและverification.jsonล่าสุด:0.12.0มีcoldfileNPCdependencybugที่ชุด148ไม่ครอบคลุม ECHO_CALLvillageต้องโหลดeira-v3นอกgrouparchive. Actor-awareArtLedger/World.prepareแก้แล้วและรักษาtitle25PNG/caching/errors/explicitretry อย่ากลับไปคาดว่าNPCทุกตัวอยู่ในstagegroupของตัวเอง. เป้าชุดใหม่149/Unit244 ต้องดูผลจริงก่อนปิดรอบ;Main42365860406เดิมcancelled ไม่อ้างPASS. Actual0.12.0fileเก็บ/tmpเท่านั้นเพื่อcompat5รุ่น


## Session23 handoff — 2026-11-08 / 0.13.0 candidate

อ่านSession23/verification.jsonผลจริงก่อนเริ่ม99nodes273choices/B05/3chapterconclusions ไม่ใช่3gameendings. รักษาS20/CH2001..3เดิม;ประตูใหม่G_SEAL_INNER. guardianoptionalstrictเก็บsupplies/assistUsedเฉพาะB05 ไม่มีdefaultsในoldsave. Phaseintentอ่านก่อนaction/weaknessตามHP;แพ้คืนsupplies/ชนะไม่คืน. ยืนยันกลไกพร้อมchapterroutes/gentlemodeผ่านactualfiles. notFlag song_restoredกันrewriteเส้นทางและCHG_REVISITอ่านซ้ำโดยไม่ให้ของเพิ่ม

Main0.12.1CI42369615679failed148/149ไม่ใช่PASS149 แม้PR/local/publicผ่าน. SplitnormalVFXcaptureจากearlytouchSkip+hittestและCSSz-indexแล้ว ดูFull155/CI/public0.13receiptก่อนปิดgate ห้ามกลับไปcaptureทั้งหน้าก่อนtapปุ่มชั่วคราวหรือใช้forceclickกลบปัญหา. ยังห้ามAutoSave/browserprogressหรือuploadsave. งานถัดไปchapter/savecontext→ARC2→อีกLifePaths→V6magic→Finalvisual/mobilequality


## Session23 release handoff — 2026-11-08 / public0.13.0

อ่านGODSEED/docs/evidence/session23/{REPORT_TH.md,verification.json}ก่อนใช้candidatehandoffด้านบน. PR24merge222db4eจากfb91035หลังCI42434254047 full158PASS28.8m/Unit257/sourcegates/buildPASS. Runtimec39ไม่เปลี่ยน. Actualpublic0.13 guardian3phase/3chapterroutes/6legacyversions/10emulatedviewports/coreoldstory/78PNG+JSexact/noStorageUploadReferenceConsoleErrorsผ่าน LegacyPages42436489189SUCCESS. **MainCI42436489386ยังin_progressตอนปิดreceipt** ตรวจrunนี้ก่อนbatchใหม่;ห้ามแปลงpendingเป็นPASS. docs-onlyreceiptใช้[skip ci]ไม่เปลี่ยนruntimeหรือยกเลิกMainrun

Phonecastต้องเห็นcanvasแล้วคืนscrollก่อนbusy-render;ReducedMotion/side-by-sideไม่jump. keyboardhelperต้องรอenabledก่อนlocator.pressEnter;openingใช้helperร่วมกัน ห้ามกลับไปfocusปุ่มdisabledแล้วglobalEnter. คงoldS20/CH2001..3/234recipeIDs/State2/File2/ManualRAM-only. 99nodes273choicesและ3chapterconclusionsไม่เท่ากับ12ARCหรือgameending. Next:PIPE002chapter/savecontext→optionalS29/ARC1acceptance→ARC2→LifePaths→V6magic/visualmobile. ยังไม่รับรองphysicalhardware/FPS/finalHD/humanfun


## Session24 candidate handoff — 2026-11-08 / 0.14.0

อ่านSession24/verification.jsonและผลFull165/CI/Publicจริงก่อนใช้candidateสถานะ. 127nodes340choices/260state-delta/8quests7batches7encounters9stages7maps/234recipes/5NPC2introPaths/3chapterconclusions0gameendings. เพิ่มPip3nodesและARC2opening25nodes;ยังไม่ปิดARC2ทั้งหมด. Main0.13CI42436489386ตรวจแล้ว158PASS23.8m+DeploySUCCESS ไม่pendingแล้ว

คงoldIDsรวมCH0211ต้นไม้;Pipใช้CHPIP_HUB. Chapterregistry/batchownershipและactivejourneyใช้ข้อมูลเดียวกับUI/File2;Hub/โรงช่างเก่าอาจownerCH1แต่journeyCH2 ห้ามถอยprogressหรือเพิ่มcounterpersist. File2batchIdoptional/State2เดิม/old0.13nobatchdecoderexact. Revisit/pause/resumeต้องไม่rewritebranchหรือให้kit/giftซ้ำ. B06อ่านplanก่อนaction:0/9/18และWateroffensivehitcounter9 ภาพแยกdamage. ไม่มีAutoSave/browserprogress/saveupload

Originalforestroadใช้Ref06เป็นdirectionเท่านั้น,99PNGbyte-repro/old89unchanged. Stagelegacyforestคงเดิม. Sourceskills/Nodecontracts/realreplay127nodes340choices/234recipesอยู่Session24. Earlierfocused7ไม่ได้แทนfinalFull165;physicalhardware/FPS/finalHD/humanfunยังไม่รับรอง. รอบถัดไปตรวจreleaseentryและRoadmapใหม่ก่อนเลือกงาน
