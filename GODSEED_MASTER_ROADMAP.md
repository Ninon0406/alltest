# GODSEED MASTER ROADMAP

อัปเดต 2026-11-06 UTC · ตรวจจาก base commit `825bfa5` และงานรอบล่าสุดใน [Development Log](GODSEED/docs/DEVELOPMENT_LOG.md)

Source of truth ของสถานะ: [roadmap.json](GODSEED/docs/roadmap.json) · สร้างด้วย `npm --prefix GODSEED run roadmap:update` · ตรวจด้วย `npm --prefix GODSEED run roadmap:check`

## ขอบเขตและวิธีนับ

V6.0: GODSEED 1.0 ขยายเป็น 12 ARC, 8 Life Paths และผลลัพธ์ปลายทางหลากหลายตามหลักฐานการเล่นจริง เป้าหมายตัวเลขเป็นประมาณการ ไม่ใช่ข้อมูลที่สร้างแล้ว รักษาเกม choice-driven/HD Pixel Art/Turn-Based/Manual File Save และ ID เดิมทั้งหมด

ประวัติขอบเขตก่อนV6: บทแรกครบสามบทสรุปและCH2/CH3หลัง1.0; snapshotเดิม21/76=27.6% เก็บในscopeHistoryพร้อมPhase/Scope/Statusของ76IDเดิม การขยายตัวหารในV6ทำให้เปอร์เซ็นต์เปลี่ยน ไม่ใช่การลบงานที่ผ่านแล้ว AIยังเป็นoptionalและเกมพื้นฐานไม่พึ่งAI/API Key

เป้าหมายเชิงออกแบบ V6 (ยังไม่ใช่จำนวนที่สร้างแล้ว): storyNodes≈500 · consequentialChoices≈1000 · lifePaths≈8 · arcs≈12 · importantNPCs≈30 · ingredients≈100 · usableSpells≈250 · enemyTypes≈30 · bosses≈10 · endings≈15. นับของจริงจากStory Graph/โค้ด/การทดสอบเท่านั้น

ทุกงานน้ำหนัก1: เปอร์เซ็นต์ = จำนวน✅ ÷ จำนวนงาน ×100; 🟡/⬜/🔴/⛔ได้0 ไม่มีpartialเครดิต ตัวเลขเป็นความคืบหน้าของChecklistเท่านั้น ไม่ใช่เวลาที่เหลือ ปริมาณแรงงาน ความสนุก หรือคุณภาพภาพของเกมทั้งหมด งานขนาดต่างกันและรายการอาจเพิ่มได้ ต้องอ่านพร้อมจำนวนงานและlog

**ความคืบหน้ารวม Checklist: 21.1% (23/109)** · เฉพาะขอบเขต1.0: 21.3% (23/108)

| ขอบเขต | งานทั้งหมด | ✅ | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ทั้งโครงการ | 109 | 23 | 42 | 42 | 0 | 2 | 21.1% |
| 1.0 | 108 | 23 | 42 | 41 | 0 | 2 | 21.3% |
| หลัง1.0/เสริม | 1 | 0 | 0 | 1 | 0 | 0 | 0% |

## ความคืบหน้าแยกหกด้าน

| ด้าน | ✅ / ทั้งหมด | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| ระบบเกม | 7/30 | 6 | 16 | 0 | 1 | 23.3% |
| เนื้อเรื่อง | 2/22 | 7 | 13 | 0 | 0 | 9.1% |
| ภาพและแอนิเมชัน | 6/14 | 8 | 0 | 0 | 0 | 42.9% |
| เวทมนตร์ | 3/11 | 6 | 2 | 0 | 0 | 27.3% |
| การต่อสู้ | 3/11 | 5 | 3 | 0 | 0 | 27.3% |
| คุณภาพและการทดสอบ | 2/21 | 10 | 8 | 0 | 1 | 9.5% |

แต่ละงานอยู่ด้านเดียวเพื่อไม่ให้เครดิตซ้ำ และไม่รวมงานย่อยSAVE14/ความพร้อมสถานที่90ช่องในตัวหารหลัก

## Phase 0–13 ตามV6


| Phase | ✅ / ทั้งหมด | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| [0 — Audit & Benchmark — ตรวจและศึกษาต้นแบบ](#phase-0) | 2/3 | 1 | 0 | 0 | 0 | 66.7% |
| [1 — Core Playability — เกมหลักเล่นต่อได้](#phase-1) | 6/8 | 1 | 0 | 0 | 1 | 75% |
| [2 — Story Engine & Content Pipeline](#phase-2) | 2/6 | 3 | 1 | 0 | 0 | 33.3% |
| [3 — Complete Opening Experience — ช่วงเริ่มต้นครบ](#phase-3) | 0/3 | 2 | 1 | 0 | 0 | 0% |
| [4 — Life Paths — เส้นทางชีวิต](#phase-4) | 0/9 | 0 | 9 | 0 | 0 | 0% |
| [5 — Magic System — ระบบเวทและการเรียนรู้](#phase-5) | 3/11 | 6 | 2 | 0 | 0 | 27.3% |
| [6 — Combat — การต่อสู้](#phase-6) | 3/11 | 5 | 3 | 0 | 0 | 27.3% |
| [7 — World Systems — โลกและสังคม](#phase-7) | 0/10 | 6 | 4 | 0 | 0 | 0% |
| [8 — Main Story Expansion — ARC 1–6](#phase-8) | 0/6 | 0 | 6 | 0 | 0 | 0% |
| [9 — Advanced Story Expansion — ARC 7–12](#phase-9) | 0/7 | 0 | 7 | 0 | 0 | 0% |
| [10 — Visual & Cinematic Polish](#phase-10) | 6/15 | 9 | 0 | 0 | 0 | 40% |
| [11 — Endings & World Consequences](#phase-11) | 0/2 | 1 | 1 | 0 | 0 | 0% |
| [12 — Performance & Quality](#phase-12) | 1/8 | 3 | 3 | 0 | 1 | 12.5% |
| [13 — GODSEED 1.0 — Release Gates](#phase-13) | 0/10 | 5 | 5 | 0 | 0 | 0% |

## กฎสถานะ/หลักฐาน

✅ = สร้างจริงและผ่านเกณฑ์เฉพาะงาน; 🟡 = เริ่มแล้วแต่ยังไม่ครบ/ยังไม่ยืนยัน; ⬜ = มีแผนหรือสเปกแต่ยังไม่มีimplementation; 🔴 = มีระบบแต่พบfailureที่ทำซ้ำได้; ⛔ = ระบุข้อจำกัดที่ต้องปลดก่อน ไม่ใช้แทนข้ออ้างงานยาก

เอกสารออกแบบจากChatGPT/SSOTไม่ใช่หลักฐานว่าCodexสร้างเกมแล้ว งานที่อ้างspecอย่างเดียวจึงยังไม่✅ ผลการทดสอบเก่าในTEST_REPORTมีรุ่น/commitกำกับ ไม่ใช่การรับรองฟีเจอร์ที่ยังไม่สร้าง Dependenciesคือระบบที่ต้องมีเพื่อส่งมอบ; งานใหญ่ที่กำลังทำอาจมีsubsystemที่ผ่านแล้ว แต่ห้ามถือว่าgateรวมผ่านตามไปด้วย

ValidatorตรวจID/dependency cycle/ไฟล์หลักฐานและเอกสารstale ไม่สามารถพิสูจน์ข้อความอ้างว่าเสร็จแทนผู้พัฒนา ต้องรันทดสอบที่เกี่ยวข้องก่อนเปลี่ยนสถานะ หากregressionเกิดให้เปลี่ยนเป็น🔴 พร้อมreproและแก้ก่อนขยาย งานที่ขาดอุปกรณ์ให้คง⛔/ยังไม่ยืนยัน

## กระบวนการทุกรอบ

ตรวจRoadmap/โค้ด/เซฟ/CI → เลือกงานตามpriority+dependency → ทำโค้ด/ภาพ → ทดสอบ → อัปเดตJSONพร้อมหลักฐาน → สร้างRoadmap/Task Boardใหม่ → เพิ่มDevelopment Log → ตรวจroadmap:check → commit/PR/deployตามสิทธิ์ → บันทึกผลเว็บจริง ห้ามแก้เปอร์เซ็นต์หรือไฟล์generatedด้วยมือ

บอร์ดเดิมเชื่อมผ่าน legacy GS IDs ด้านล่าง ไม่ใช้บอร์ดสองชุดเป็นตัวหารซ้ำ ประวัติเดิมคงในGitและTEST_REPORT; [TASK_BOARD](GODSEED/docs/TASK_BOARD.md)เป็นมุมมองย่อจากข้อมูลชุดเดียว

## Manual File Save — งานย่อย FND-005 (Owner V2)

Checklist เซฟ 85.7% (12/14) แยกจากตัวหารหลัก งานSAVE14ข้ออยู่ภายใต้FND-005 ไม่นับซ้ำเป็น14milestones เปลี่ยนข้อกำหนดแล้วจึงตรวจสถานะFND-005ใหม่ ไม่ใช้ผลIndexedDBรุ่นเก่าแทนหลักฐานปัจจุบัน

- [x] ✅ เสร็จสมบูรณ์ **SAVE-001 — ตรวจสอบระบบเซฟเดิม**
  - ความสำคัญ: P0 · ต้องมี: ไม่มี · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: ระบุทุกstartup/action/recoverywriteและแผนแทนที่ที่ไม่อ่านฐานเก่า

- [x] ✅ เสร็จสมบูรณ์ **SAVE-002 — ยกเลิก Auto Save**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: ทุกactionเปลี่ยนเฉพาะRAM ไม่สร้างไฟล์เอง

- [x] ✅ เสร็จสมบูรณ์ **SAVE-003 — ยกเลิก Persistent Browser Game State**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: ไม่มีprogressAPIในsrcและruntimeauditไม่มีwrites

- [x] ✅ เสร็จสมบูรณ์ **SAVE-004 — Export Save เป็น .godseed**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: สร้างSnapshotถูกต้องเมื่อผู้เล่นกด ชื่อวันที่.godseedและไม่อ้างว่าOSเก็บสำเร็จ

- [x] ✅ เสร็จสมบูรณ์ **SAVE-005 — Import Save พร้อมสรุปและยืนยัน**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: เลือกรายการไฟล์ ตรวจข้อมูล แสดงsummary ยืนยันก่อนแทนRAM cancel/failเก็บเกมเดิม

- [x] ✅ เสร็จสมบูรณ์ **SAVE-006 — Save File Schema ครบระบบที่มีจริง**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: เก็บStateจริงครบmetadata checkpoint/RNG/flags/trust/inventory/known/loadout/battle ไม่สร้างLevelหรือgearที่ยังไม่มี

- [x] ✅ เสร็จสมบูรณ์ **SAVE-007 — Save Version และ Migration ไฟล์เดิม**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: file2/state2และV1envelope/rawfile migrateในRAM ไม่อ่านDB

- [x] ✅ เสร็จสมบูรณ์ **SAVE-008 — ตรวจไฟล์/ขนาด/Checksum/Scene Item Spell NPC**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: rejectoversize/extension/version/checksum/references/prototypekeys

- [x] ✅ เสร็จสมบูรณ์ **SAVE-009 — UI บันทึกและโหลดด้วย Touch/Keyboard**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: โหลดและบันทึกเข้าถึงได้จากหน้าเริ่ม/เมนู safe-boundaryและเหตุผลdisabled

- [x] ✅ เสร็จสมบูรณ์ **SAVE-010 — เตือนก่อนทิ้ง RAM/BeforeUnload**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: สามตัวเลือกsave/continue/discardพร้อมnativebeforeunload ไม่มีhiddenwrite

- [ ] ⛔ ติดข้อจำกัด **SAVE-011 — ทดสอบดาวน์โหลดบนมือถือ**
  - ความสำคัญ: P1 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-06
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Chromium touch simulation390/844/820/1024/1366ผ่านdownload/upload+preview; Safari/iOS/Androidอุปกรณ์จริงยังไม่มีหลักฐาน; ไม่มีอุปกรณ์จริงในสภาพแวดล้อมนี้ Chromiumจำลองผ่านแล้ว แต่ใช้แทนphysicalacceptanceไม่ได้
  - เกณฑ์เสร็จ: DownloadจริงในSafari/iOSและChrome/Android รวมคำแนะนำFiles/Downloads

- [ ] ⛔ ติดข้อจำกัด **SAVE-012 — ทดสอบเลือกไฟล์บนมือถือ**
  - ความสำคัญ: P1 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-06
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Chromium touch simulation390/844/820/1024/1366ผ่านdownload/upload+preview; Safari/iOS/Androidอุปกรณ์จริงยังไม่มีหลักฐาน; ไม่มีอุปกรณ์จริงในสภาพแวดล้อมนี้ Chromiumจำลองผ่านแล้ว แต่ใช้แทนphysicalacceptanceไม่ได้
  - เกณฑ์เสร็จ: เลือกไฟล์จริงในSafari/iOSและChrome/Android ไม่บังคับเมาส์

- [x] ✅ เสร็จสมบูรณ์ **SAVE-013 — Save/Load Round Trip รวมต่อสู้และความทรงจำ**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: fullstateเท่ากันก่อน/หลังfile2/V1และdeterministicnextturn

- [x] ✅ เสร็จสมบูรณ์ **SAVE-014 — ตรวจไม่มี Auto Save/Persistent State/Save Upload**
  - ความสำคัญ: P0 · ต้องมี: SAVE-001 · ตรวจ: 2026-11-05
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/docs/evidence/session15/README.md](GODSEED/docs/evidence/session15/README.md)
  - หลักฐาน: Sourceและfocusedbrowser15/15+Unit115ผ่าน ตามSession15; ไม่ใช้ผลระบบIDBเก่า · Unit115/Focus15/Full85 local+PRCI42113575343/mainCI42116389685; actualpublic manual-only/nativepicker/roundtrip/audit0 PASS
  - เกณฑ์เสร็จ: sourcegate+browserhook+networkaudit ไม่progressstorageหรือupload ไม่มีcontinueหลังrefresh


## สถานที่ตามภาพอ้างอิง 10 แห่ง

ตารางย่อยนี้ขยาย VIS-008/009/010/014 ไม่เพิ่ม90งานในตัวหารหลัก ✅ในระบบย่อยหมายถึงผ่านเกณฑ์เฉพาะต้นแบบที่มีหลักฐาน ไม่ใช่finalHD ทั้งฉาก ต้องรอคอลัมน์ฉบับสมบูรณ์ ภาพอ้างอิงอย่างเดียวให้เครดิตเฉพาะคอลัมน์แรก Chromiumจำลองไม่ใช่Safari/อุปกรณ์จริง (QA-009)

| สถานที่ | ภาพอ้างอิง | โครงสร้าง | วัตถุ/เลเยอร์ | Collision/Anchor | เดิน/Animation | เหตุการณ์ | เอฟเฟกต์ | Chromiumจำลอง | ฉากฉบับสมบูรณ์ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ลานน้ำพุกลางหมู่บ้าน | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| ประตูทางเข้าหมู่บ้าน | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ใต้ต้นไม้ใหญ่ | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| บ้านผู้เล่น | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| บ้านผู้เฒ่าและสวนสมุนไพร | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| ถนนสู่ป่า | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ลานผลึกเวทมนตร์ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ห้องผสมเวทมนตร์ | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| ศาลเจ้าโบราณ | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| ลานต่อสู้กลางป่า | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

- **village_center — ลานน้ำพุกลางหมู่บ้าน**: มีต้นแบบเล่นจริงและทดสอบChromium390/820/1024/1366ผ่าน; structure/foot-collision/anchorsผ่านในขอบเขตถนนที่สร้างแล้ว ส่วนเลเยอร์/animation/เหตุการณ์/เอฟเฟกต์ระดับฉากสมบูรณ์ยังไม่ครบ (NPC/special poses/รายละเอียดเทียบconceptยังค้าง) ดูVIS-014สำหรับขอบเขตต้นแบบที่ทดสอบ ไม่ใช้ผลย่อยแทนfinalHD/hardware; CI42042658772 full65PASS source0dc5e59; VIS-014DONEเฉพาะต้นแบบ ไม่ทำให้ทั้งสถานที่เสร็จ
  - หลักฐาน: [assets/reference/godseed/references/01_village_center.webp](assets/reference/godseed/references/01_village_center.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json) · [GODSEED/src/scenes/scene-definitions.ts](GODSEED/src/scenes/scene-definitions.ts) · [GODSEED/scripts/generate-village-art.mjs](GODSEED/scripts/generate-village-art.mjs) · [GODSEED/tests/locations.spec.ts](GODSEED/tests/locations.spec.ts) · [GODSEED/docs/evidence/session12/village-after-390.png](GODSEED/docs/evidence/session12/village-after-390.png) · [GODSEED/docs/TEST_REPORT.md](GODSEED/docs/TEST_REPORT.md)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **village_entrance — ประตูทางเข้าหมู่บ้าน**: ภาพเจ้าของพร้อมและเปิด Contact Sheet แล้ว; การแปลงเป็นสถานที่ตาม reference นี้ยังไม่เริ่ม ไม่มีพิกัด gameplay จากภาพอ้างอิง
  - หลักฐาน: [assets/reference/godseed/references/02_village_entrance.webp](assets/reference/godseed/references/02_village_entrance.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **under_tree — ใต้ต้นไม้ใหญ่**: มีต้นแบบเล่นจริงและทดสอบChromium390/820/1024/1366ผ่าน; structure/foot-collision/anchorsผ่านในขอบเขตถนนที่สร้างแล้ว ส่วนเลเยอร์/animation/เหตุการณ์/เอฟเฟกต์ระดับฉากสมบูรณ์ยังไม่ครบ (NPC/special poses/รายละเอียดเทียบconceptยังค้าง) ดูVIS-014สำหรับขอบเขตต้นแบบที่ทดสอบ ไม่ใช้ผลย่อยแทนfinalHD/hardware; CI42042658772 full65PASS source0dc5e59; VIS-014DONEเฉพาะต้นแบบ ไม่ทำให้ทั้งสถานที่เสร็จ
  - หลักฐาน: [assets/reference/godseed/references/03_ancient_tree.webp](assets/reference/godseed/references/03_ancient_tree.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json) · [GODSEED/src/scenes/scene-definitions.ts](GODSEED/src/scenes/scene-definitions.ts) · [GODSEED/scripts/generate-village-art.mjs](GODSEED/scripts/generate-village-art.mjs) · [GODSEED/tests/locations.spec.ts](GODSEED/tests/locations.spec.ts) · [GODSEED/docs/evidence/session12/tree-after-390.png](GODSEED/docs/evidence/session12/tree-after-390.png) · [GODSEED/docs/TEST_REPORT.md](GODSEED/docs/TEST_REPORT.md)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **player_home — บ้านผู้เล่น**: ภาพเจ้าของพร้อมและเปิด Contact Sheet แล้ว; การแปลงเป็นสถานที่ตาม reference นี้ยังไม่เริ่ม ไม่มีพิกัด gameplay จากภาพอ้างอิง
  - หลักฐาน: [assets/reference/godseed/references/04_player_cottage.webp](assets/reference/godseed/references/04_player_cottage.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **elder_garden — บ้านผู้เฒ่าและสวนสมุนไพร**: ภาพเจ้าของพร้อมและเปิด Contact Sheet แล้ว; การแปลงเป็นสถานที่ตาม reference นี้ยังไม่เริ่ม ไม่มีพิกัด gameplay จากภาพอ้างอิง; เกมเดิมมีฉากเกี่ยวข้องบางส่วน แต่ยังไม่ใช่การแปลง reference นี้; รอบ14 เริ่มส่วนย่อยแปลงสมุนไพรต้นฉบับ/ท่ารดน้ำ/ทางอ้อม/ดอกบานและความทรงจำใน Stage garden เดิม Browser7 ผ่าน แต่ยังไม่มีอาคารและแผนที่ครบตาม Reference05 จึงไม่ถือว่าฉากแปลงเสร็จหรือ ready; Session15 Maren original8frames/bench-listening/file-owned-memoryผ่านactualpublicและ5viewport ยังไม่ใช่Reference05ครบฉาก; รอบ16 เริ่มแปลงฉากใหม่ตามReference05จริง บ้านหลังคาม่วง/ถนนหิน/ซุ้ม/หม้อยา/สมุนไพรแยกเลเยอร์ อ่านแผนที่เดียวกับDirectorและตรวจ9Colliders Focus20ผ่าน ยังเป็นต้นแบบไม่ครบfinalHD/mobilehardware; local/PR/main93/Build/Deploy และ actualpublicสวนใหม่/49PNG/JS/ไฟล์ผ่าน ยังไม่finalHDหรือครบphysicalmobile
  - หลักฐาน: [assets/reference/godseed/references/05_elder_herb_garden.webp](assets/reference/godseed/references/05_elder_herb_garden.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json) · [GODSEED/src/scenes/garden-staging.ts](GODSEED/src/scenes/garden-staging.ts) · [GODSEED/scripts/generate-garden-art.mjs](GODSEED/scripts/generate-garden-art.mjs) · [GODSEED/docs/evidence/session14/README.md](GODSEED/docs/evidence/session14/README.md) · [GODSEED/src/scenes/garden-map.ts](GODSEED/src/scenes/garden-map.ts) · [GODSEED/scripts/generate-herb-garden-art.mjs](GODSEED/scripts/generate-herb-garden-art.mjs) · [GODSEED/tests/herb-garden.spec.ts](GODSEED/tests/herb-garden.spec.ts) · [GODSEED/docs/evidence/session16/README.md](GODSEED/docs/evidence/session16/README.md)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **forest_road — ถนนสู่ป่า**: ภาพเจ้าของพร้อมและเปิด Contact Sheet แล้ว; การแปลงเป็นสถานที่ตาม reference นี้ยังไม่เริ่ม ไม่มีพิกัด gameplay จากภาพอ้างอิง; เกมเดิมมีฉากเกี่ยวข้องบางส่วน แต่ยังไม่ใช่การแปลง reference นี้
  - หลักฐาน: [assets/reference/godseed/references/06_forest_road.webp](assets/reference/godseed/references/06_forest_road.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **crystal_clearing — ลานผลึกเวทมนตร์**: ภาพเจ้าของพร้อมและเปิด Contact Sheet แล้ว; การแปลงเป็นสถานที่ตาม reference นี้ยังไม่เริ่ม ไม่มีพิกัด gameplay จากภาพอ้างอิง
  - หลักฐาน: [assets/reference/godseed/references/07_crystal_clearing.webp](assets/reference/godseed/references/07_crystal_clearing.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **spell_workshop — ห้องผสมเวทมนตร์**: รอบ18ต้นแบบReference08:วาด3layers/หม้อ/21icons/ท่ายกกล่อง/ปรุงหันเหนือจากmanifest ใช้Map11Anchor10links7ColliderกับCSDจริง;Unit134/Focus20บน5viewportผ่านรวมfallback/filecheckpoint/skip/สูตรจริง;MobileหมายถึงChromiumจำลอง ไม่ใช่physical;โครงสร้าง/Collisionผ่านเฉพาะต้นแบบ งานภาพ/บท/ทุกท่าทั้งฉากยังin_progress; Actualpublic0.8.0 core/workshop/UI5ผ่านรวมtouch/keyboardและfileanchors ไม่มีhorizontaloverflow/normalconsoleerror;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน
  - หลักฐาน: [assets/reference/godseed/references/08_spell_workshop.webp](assets/reference/godseed/references/08_spell_workshop.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-koro-art.mjs](GODSEED/scripts/generate-koro-art.mjs) · [GODSEED/tests/koro.spec.ts](GODSEED/tests/koro.spec.ts) · [GODSEED/docs/evidence/session17/README.md](GODSEED/docs/evidence/session17/README.md) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **ancient_shrine — ศาลเจ้าโบราณ**: รอบ19ต้นแบบReference09:3layers/altar12frames/Y-sortpillars/14anchors15links8solids/hero10gestures/sentinel16frames;PureUnit17และBrowser5viewportผ่านrune/musicbox/file/questmemory,retreatregressionfixผ่านUnit17และ2Browser;Mobile=Chromiumจำลอง ไม่ใช่อุปกรณ์จริง ภาพ/ทั้งบท/ทุกท่ายังin_progress
  - หลักฐาน: [assets/reference/godseed/references/09_ancient_shrine.webp](assets/reference/godseed/references/09_ancient_shrine.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/scripts/generate-ruins-art.mjs](GODSEED/scripts/generate-ruins-art.mjs) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

- **battle_glade — ลานต่อสู้กลางป่า**: ภาพเจ้าของพร้อมและเปิด Contact Sheet แล้ว; การแปลงเป็นสถานที่ตาม reference นี้ยังไม่เริ่ม ไม่มีพิกัด gameplay จากภาพอ้างอิง; เกมเดิมมีฉากเกี่ยวข้องบางส่วน แต่ยังไม่ใช่การแปลง reference นี้
  - หลักฐาน: [assets/reference/godseed/references/10_battle_glade.webp](assets/reference/godseed/references/10_battle_glade.webp) · [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json)
  - เกณฑ์พร้อมทั้งฉาก: ครบโครงสร้าง/ชั้นภาพ/ทางเดินปลอดภัย/ทิศและท่าตามบท/เอฟเฟกต์เฉพาะสถานที่ ผ่าน browser mobile และ reviewคุณภาพฉากเทียบreference; hardwareยังติด QA-009 ไม่ถือ conceptพร้อม=ฉากเสร็จ

<a id="phase-0"></a>
## Phase 0 — Audit & Benchmark — ตรวจและศึกษาต้นแบบ

- [x] ✅ เสร็จสมบูรณ์ **FND-009 — Roadmap คำนวณได้ เชื่อมบอร์ดและDevelopment Log**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-041 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-003
  - ไฟล์: [GODSEED/scripts/roadmap.mjs](GODSEED/scripts/roadmap.mjs) · [GODSEED/docs/roadmap.json](GODSEED/docs/roadmap.json) · [GODSEED/scripts/roadmap.test.mjs](GODSEED/scripts/roadmap.test.mjs) · [GODSEED/docs/evidence/session16/roadmap-final.txt](GODSEED/docs/evidence/session16/roadmap-final.txt)
  - หลักฐาน/สถานะจริง: roadmap6/6 PASS รวมnegative metadata/counting/queue; DONEไม่กลับไปห้างานถัดไปและregressionsขึ้นก่อน; same74taskdataset; รอบ16 แก้Fixtureไม่ผูกสถานะสด ตรวจคิวin_progress/done/blocked/regressionอย่างชัดเจน Roadmap8/8ผ่าน · roadmap6/6PASS และPRCI42004666730SUCCESS; generatedchecklistตรง18/74 และqueueคืนงานunfinishedหลังปิดregression; mainCI42005831839SUCCESS; finalroadmap:check6PASS afterevidenceupdate; Session16 receipt Roadmap8/8 PASS
  - เกณฑ์เสร็จ: ID/dependency/evidence valid ไม่มีcycle เอกสารไม่stale ตรวจในCI มีlogทุกsession

- [ ] 🟡 กำลังพัฒนา **AUD-001 — Way of Xian benchmark จากเว็บ/สารานุกรมที่ตรวจได้**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-009
  - ไฟล์: [GODSEED/docs/QA_MATRIX.md](GODSEED/docs/QA_MATRIX.md) · [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/docs/research/WAY_OF_XIAN_BENCHMARK.md](GODSEED/docs/research/WAY_OF_XIAN_BENCHMARK.md)
  - หลักฐาน/สถานะจริง: กำลังตรวจจริง;ผลวิจัยจะอยู่ docs/research/WAY_OF_XIAN_BENCHMARK.md ไม่อ้างเข้าถึงระบบที่networkไม่อนุญาต
  - เกณฑ์เสร็จ: แยกสิ่งที่ทดลองจริง/เข้าถึงไม่ได้/ข้อเสนอ พร้อมแหล่งและหลักฐาน Browser/mobile ไม่แต่งระบบที่ยังไม่เห็น

- [x] ✅ เสร็จสมบูรณ์ **AUD-002 — หลักการเรื่องยาวจากแหล่งอ้างอิงที่อนุญาต**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-009
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md) · [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/docs/research/NARRATIVE_DESIGN_PRINCIPLES.md](GODSEED/docs/research/NARRATIVE_DESIGN_PRINCIPLES.md)
  - หลักฐาน/สถานะจริง: กำลังศึกษาตามV6 ไม่คัดลอกตัวละคร/บท/ระบบเฉพาะ;ผลจะอยู่ docs/research/NARRATIVE_DESIGN_PRINCIPLES.md; ยืนยันรอบ20:เอกสารระบุofficialsources/ข้อจำกัดชัด;validator15negative/positivecasesและQuestUnit6ผ่าน, test:allผ่าน175unit/Content2/Roadmap10/Build;ไม่เท่ากับเกม1.0เสร็จ · อ่านเอกสารวิจัยและsource observation:สรุปนามธรรมจากofficialsynopses/TOCที่เข้าถึงได้ ระบุapp/paywall/Qidian403และไม่อ้างว่าอ่านบททั้งหมดหรือสร้างเกมครบ
  - เกณฑ์เสร็จ: วิเคราะห์นามธรรม Soul Land1–4/Swallowed Starจากแหล่งที่เข้าถึงจริง ระบุข้อจำกัด/ลิขสิทธิ์/การใช้ในGODSEEDต้นฉบับ


<a id="phase-1"></a>
## Phase 1 — Core Playability — เกมหลักเล่นต่อได้

- [x] ✅ เสร็จสมบูรณ์ **FND-001 — โครงสร้าง Phaser/TypeScript/Vite แยกชั้นระบบ**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-001, GS-002 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: ไม่มี
  - ไฟล์: [GODSEED/package.json](GODSEED/package.json) · [GODSEED/src/main.ts](GODSEED/src/main.ts)
  - หลักฐาน/สถานะจริง: test:all รุ่น0.4.1 และbaselineรอบ7ผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ติดตั้งจากlockfile typecheck/lint/buildได้ และแยกengine/content/systems/scenes/ui

- [x] ✅ เสร็จสมบูรณ์ **FND-002 — เริ่มเกมใหม่ เล่นต่อ และตั้งชื่อ**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-001 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/main.ts](GODSEED/src/main.ts) · [GODSEED/tests/browser.spec.ts](GODSEED/tests/browser.spec.ts)
  - หลักฐาน/สถานะจริง: browser golden paths และstorage tests ผ่านในCI41992926513 · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: เริ่ม/เล่นต่อ/ยืนยันเริ่มใหม่ได้ ไม่ลบเซฟเงียบ

- [x] ✅ เสร็จสมบูรณ์ **FND-003 — Scene/Choice engine และตรวจgraphของเนื้อหาที่มี**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-004, GS-011 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/content.test.ts](GODSEED/tests/content.test.ts)
  - หลักฐาน/สถานะจริง: content2 และ56unique choices/17scenes ตรวจจากinspect:content · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: IDsไม่ซ้ำ targetมีจริง เงื่อนไขUI/reducerตรงกัน ฉากที่เปิดไม่มีทางตัน

- [x] ✅ เสร็จสมบูรณ์ **FND-004 — Asset loader/fallback/retry และแบ่งโหลดตามสถานที่**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-001, GS-012 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts) · [GODSEED/src/scenes/garden-map.ts](GODSEED/src/scenes/garden-map.ts) · [GODSEED/scripts/generate-herb-garden-art.mjs](GODSEED/scripts/generate-herb-garden-art.mjs) · [GODSEED/tests/herb-garden.spec.ts](GODSEED/tests/herb-garden.spec.ts) · [GODSEED/docs/evidence/session16/README.md](GODSEED/docs/evidence/session16/README.md) · [GODSEED/src/scenes/art-assets.ts](GODSEED/src/scenes/art-assets.ts) · [GODSEED/src/main.ts](GODSEED/src/main.ts) · [GODSEED/tests/art-loading.spec.ts](GODSEED/tests/art-loading.spec.ts) · [GODSEED/tests/art-loading.test.ts](GODSEED/tests/art-loading.test.ts) · [GODSEED/docs/evidence/session17/README.md](GODSEED/docs/evidence/session17/README.md) · [GODSEED/docs/evidence/session17/REPORT_TH.md](GODSEED/docs/evidence/session17/REPORT_TH.md) · [GODSEED/docs/evidence/session17/main-ci.json](GODSEED/docs/evidence/session17/main-ci.json) · [GODSEED/docs/evidence/session17/public-staged-art.json](GODSEED/docs/evidence/session17/public-staged-art.json) · [GODSEED/docs/evidence/session17/post-actions-assets.json](GODSEED/docs/evidence/session17/post-actions-assets.json)
  - หลักฐาน/สถานะจริง: Session17/0.7.2 source5c58122: title23PNG/301231bytesจาก57/629017,cachedrevisit0,prepareก่อนcommit/import,explicitretryรักษาRAM/dirty/anchor;per-file8000ms/maxRetries0+HTTP200decode reconciliation;Local105/PRCI42209316444/MainCI42211897135ผ่าน105และBuild/Deploy;เว็บจริง0ConsoleErrors/0ReferenceRequests/51PNG+JSตรงBuild;ดูSession17 · Unit126/Content2/Roadmap8/Focus12/Full105ผ่าน;เว็บจริงnativefilepicker/BLOOM/สามbattle/coreflow/emptyrefresh/retry/unchangedRAMผ่าน;postActions51PNG+JS SHA85c1c2b2…f29aeตรง;เป็นassetgateไม่ใช่hardwareFPS/finalHD
  - เกณฑ์เสร็จ: โหลดผิดพลาดกู้ได้ไม่deadlock วัดbudget cold/warm และแบ่งโหลดอย่างปลอดภัย

- [ ] ⛔ ติดข้อจำกัด **FND-005 — Manual File Save: RAM only / .godseed / import / validation**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-005, GS-035 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/engine/manual-session.ts](GODSEED/src/engine/manual-session.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/ui/save-controls.ts](GODSEED/src/ui/save-controls.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts) · [GODSEED/scripts/validate-manual-save.mjs](GODSEED/scripts/validate-manual-save.mjs)
  - หลักฐาน/สถานะจริง: Manual-only code/Unit115/focused15ผ่าน แต่mobilephysicaldownload/uploadยังin_progressตามSAVE-011/012; FND-005เปิดเกณฑ์ใหม่ตามOwner V2 ไม่ใช้DONEระบบautosaveเก่า; PRCI42113575343/mainCI42116389685/local85ผ่าน, actualpublicmanual/nativepicker/roundtrip/emptyreload/audit0ผ่าน; รอบ16 core/manual-file regression93ผ่าน รอเฉพาะphysicalSafari/iOS/Android SAVE-011/012 จัดblockedเพื่อไม่ให้คิวกลับมาทำcoreซ้ำ
  - เกณฑ์เสร็จ: RAM only; explicit .godseed export/import/preview/validation/migration; safe-boundary controls/dirty-exit guard; no persistent progress or save upload; mobilebrowser QA ตามSAVE tasks โดยhardwareแยกQA-009

- [ ] 🟡 กำลังพัฒนา **FND-006 — Responsive phone/iPad/desktop touch/keyboard**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-006, GS-031 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-002
  - ไฟล์: [GODSEED/src/styles/game.css](GODSEED/src/styles/game.css) · [GODSEED/tests/browser.spec.ts](GODSEED/tests/browser.spec.ts)
  - หลักฐาน/สถานะจริง: สิบviewport Chromiumผ่าน; Safari/อุปกรณ์จริงยังไม่ยืนยัน
  - เกณฑ์เสร็จ: ทุกอุปกรณ์เป้าหมายและสองแนวใช้ได้ safe area/font/touch/focus ไม่ล้นหรือบังคับหมุน

- [x] ✅ เสร็จสมบูรณ์ **FND-007 — GitHub Actions และ Pages base path**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-002, GS-003 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [.github/workflows/pages.yml](.github/workflows/pages.yml) · [GODSEED/scripts/verify-public.mjs](GODSEED/scripts/verify-public.mjs)
  - หลักฐาน/สถานะจริง: main41992926513/public0.4.1 byte+gameplay proof · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: CIกั้นdeployเมื่อfail /alltest/และเว็บจริงโหลด/เล่น/เซฟได้

- [x] ✅ เสร็จสมบูรณ์ **FND-008 — Deterministic RNG และ immutable transactions**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-004 · Phaseเดิม: 1 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts) · [GODSEED/tests/unit.test.ts](GODSEED/tests/unit.test.ts)
  - หลักฐาน/สถานะจริง: unit/combat rollbackและseed testsผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ผลเหมือนเดิมเมื่อseed/actionsเหมือนกัน invalid commandไม่เปลี่ยนstate


<a id="phase-2"></a>
## Phase 2 — Story Engine & Content Pipeline

- [x] ✅ เสร็จสมบูรณ์ **STO-002 — Branch conditions/effects ที่มีผลจริง**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: GS-004, GS-011 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003, FND-008
  - ไฟล์: [GODSEED/src/engine/conditions.ts](GODSEED/src/engine/conditions.ts) · [GODSEED/tests/exploration.test.ts](GODSEED/tests/exploration.test.ts)
  - หลักฐาน/สถานะจริง: WIND bypass/ORgate/allarchivebranches/one-time rewardผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: conditions/effectsร่วมกัน ไม่มีให้ของฟรีซ้ำ เลือกต่างแล้วflags/trust/worldตอบจริง

- [ ] 🟡 กำลังพัฒนา **STO-007 — Journal/recap/Thai pacingและfact audit**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: GS-029, GS-030 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-003
  - ไฟล์: [GODSEED/src/ui/memory-panel.ts](GODSEED/src/ui/memory-panel.ts) · [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts)
  - หลักฐาน/สถานะจริง: clues/hints/bell-vs-mistจริง; map/recap/50:50humanplayยังไม่ยืนยัน
  - เกณฑ์เสร็จ: บันทึกเฉพาะfactที่เกิด ข้อความไทยproofread recapครบ วัดpacing45–90min/50:50

- [ ] ⬜ ยังไม่ได้เริ่ม **STO-008 — Optional AI ขอบเขตชัด/opt-in/localfallback**
  - ความสำคัญ: P3 · ขอบเขต: optional · ด้าน: story · เชื่อมบอร์ดเดิม: GS-034 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-001, REL-002
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: ไม่มีAIruntime/API key; เกมหลักเล่นlocal
  - เกณฑ์เสร็จ: AIเปลี่ยนเฉพาะภาษา outputvalidate/timeout/fallback ไม่มีstatewrite/keysในclient

- [ ] 🟡 กำลังพัฒนา **WRD-003 — Main/sidequests Q_MAIN/Q_STREAM/Q_PIP/Q_ARCHIVE**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-026, GS-028, GS-029 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: STO-001, MAG-002
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/ui/memory-panel.ts](GODSEED/src/ui/memory-panel.ts) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/tests/ruins.test.ts](GODSEED/tests/ruins.test.ts) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md) · [GODSEED/docs/evidence/session20/README.md](GODSEED/docs/evidence/session20/README.md) · [GODSEED/docs/evidence/session20/REPORT_TH.md](GODSEED/docs/evidence/session20/REPORT_TH.md)
  - หลักฐาน/สถานะจริง: stream/bell/notesfactsมี; queststate/Pipfruit/S17ยังไม่ครบ; รอบ19 candidate0.9.0: S15/S16/S17+CH0207 รวม21scenes70choices,ต้นแบบReference09/14anchors8solids/B03wardturn3/รางวัลQ_ARCHIVEครั้งเดียว/State2File2เดิม;Unit151/Focus10+retreat2ผ่าน;Full123/CI/publicจะลงผลเมื่อรันจริง ไม่ปิดงานใหญ่หรือB04; V6รอบ20:46nodes142choices/25ใหม่72choices/เตรียมงาน3กิจกรรม/3บทสรุปย่อย/2Questcontracts/AnchorCSD/โคมต้นฉบับและเวลาเย็น–เช้า;Unit175ผ่าน ยังรอFull131/CI ไม่ปิดงานใหญ่
  - เกณฑ์เสร็จ: active/completed/rewards/nextobjectiveครบ4quests เซฟ/ย้อนกลับไม่ซ้ำ

- [x] ✅ เสร็จสมบูรณ์ **PIPE-001 — Story graph/condition/quest/reference validator และ baseline ที่ทำซ้ำได้**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-003
  - ไฟล์: [GODSEED/scripts/inspect-content.mjs](GODSEED/scripts/inspect-content.mjs) · [GODSEED/tests/content.test.ts](GODSEED/tests/content.test.ts) · [GODSEED/scripts/story-graph.mjs](GODSEED/scripts/story-graph.mjs) · [GODSEED/scripts/story-graph.test.mjs](GODSEED/scripts/story-graph.test.mjs)
  - หลักฐาน/สถานะจริง: กำลังสร้างstory-graph.mjsและbaselineก่อนขยาย ไม่ใช้Roadmapนับplayablecontent; ยืนยันรอบ20:เอกสารระบุofficialsources/ข้อจำกัดชัด;validator15negative/positivecasesและQuestUnit6ผ่าน, test:allผ่าน175unit/Content2/Roadmap10/Build;ไม่เท่ากับเกม1.0เสร็จ · 15validatorcases/6Questunitผ่าน;actualboundedsearch46nodes138choices121recipes/2completionwitness ไม่มีerror/deadlock;ไม่พิสูจน์exhaustiveallseeds
  - เกณฑ์เสร็จ: ตรวจunknown refs/deadends/structuralunreachable/conditions/questchainsจากข้อมูลจริง แยกboundedstate-witnessจากgraphreachability และลบfixtureที่ล้มเหลวไม่ได้

- [ ] 🟡 กำลังพัฒนา **PIPE-002 — Content production contract สำหรับเพิ่มบทเป็นชุด**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: PIPE-001, STO-002
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts) · [GODSEED/tests/content.test.ts](GODSEED/tests/content.test.ts)
  - หลักฐาน/สถานะจริง: ใช้StoryScene/Choice/cinematic/staging/timeและQuestcontractsกับ25nodes72choicesใหม่จริง แต่explicitChapterและbatchauthoringtoolingยังไม่ครบ
  - เกณฑ์เสร็จ: ทุกNodeมีchapter/location/narrative/preconditions/actions/choices/effects/rewards/next/NPC/cinematicmetadata;ใช้batchที่เล่นจบและมีvalidation+witnessจริง ไม่สร้างfillerให้ครบตัวเลข


<a id="phase-3"></a>
## Phase 3 — Complete Opening Experience — ช่วงเริ่มต้นครบ

- [ ] 🟡 กำลังพัฒนา **STO-001 — เนื้อเรื่องหลักบท1ตามScene/Choice canonครบ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: GS-025, GS-026, GS-027, GS-028 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-003
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/tests/ruins.test.ts](GODSEED/tests/ruins.test.ts) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md) · [GODSEED/docs/evidence/session20/README.md](GODSEED/docs/evidence/session20/README.md) · [GODSEED/docs/evidence/session20/REPORT_TH.md](GODSEED/docs/evidence/session20/REPORT_TH.md)
  - หลักฐาน/สถานะจริง: 17ฉาก56choices; introบางตัวเลือกและS15–S27/S29ยังขาด; รอบ19 candidate0.9.0: S15/S16/S17+CH0207 รวม21scenes70choices,ต้นแบบReference09/14anchors8solids/B03wardturn3/รางวัลQ_ARCHIVEครั้งเดียว/State2File2เดิม;Unit151/Focus10+retreat2ผ่าน;Full123/CI/publicจะลงผลเมื่อรันจริง ไม่ปิดงานใหญ่หรือB04; V6รอบ20:46nodes142choices/25ใหม่72choices/เตรียมงาน3กิจกรรม/3บทสรุปย่อย/2Questcontracts/AnchorCSD/โคมต้นฉบับและเวลาเย็น–เช้า;Unit175ผ่าน ยังรอFull131/CI ไม่ปิดงานใหญ่
  - เกณฑ์เสร็จ: canonicalchapter1ครบมีทางเล่นจบและกลับสำรวจ ทุกทางหลักผ่านgraph/golden paths

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-006 — บทแรกตั้งแต่เริ่มจนจบและชีวิตหลังบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-028 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-006, WRD-003
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: S27/ending/postchapterยังเฉพาะspec
  - เกณฑ์เสร็จ: 3ending→epilogue→revisit/recap/newrunconfirmจริง ไม่resetflagsเก่า

- [ ] 🟡 กำลังพัฒนา **ARC-001 — ARC 1 — เมล็ดพันธุ์แรก**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: PIPE-002, STO-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/docs/evidence/session20/README.md](GODSEED/docs/evidence/session20/README.md) · [GODSEED/docs/evidence/session20/REPORT_TH.md](GODSEED/docs/evidence/session20/REPORT_TH.md)
  - หลักฐาน/สถานะจริง: กำลังขยายopeningจากของเดิม;รอunit/browser/statefulrouteก่อนพิจารณาเสร็จ ไม่ถือว่าทั้งARCเสร็จจากการออกแบบ; V6รอบ20:46nodes142choices/25ใหม่72choices/เตรียมงาน3กิจกรรม/3บทสรุปย่อย/2Questcontracts/AnchorCSD/โคมต้นฉบับและเวลาเย็น–เช้า;Unit175ผ่าน ยังรอFull131/CI ไม่ปิดงานใหญ่
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;หมู่บ้าน ความผูกพันกับNPC/วัตถุดิบ/เวทแรก/การต่อสู้และบทสรุปย่อย;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ


<a id="phase-4"></a>
## Phase 4 — Life Paths — เส้นทางชีวิต

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-001 — Life Path engine/ข้ามสาย/requirement และ file migration**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-008, PIPE-002
  - ไฟล์: [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts) · [GODSEED/src/engine/save-file.ts](GODSEED/src/engine/save-file.ts) · [GODSEED/src/systems/game.ts](GODSEED/src/systems/game.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว;ต่อยอดRAM/File2ที่ผ่านแล้วโดยมีmigrationtestsของงานนี้ ไม่ต้องรอphysicalhardwareacceptanceของFND-005ก่อนเริ่มเขียนระบบ
  - เกณฑ์เสร็จ: เลือกเริ่ม/ฝึก/เปลี่ยนหรือเรียนข้ามสายด้วยเงื่อนไข deterministic ผลต่อcombat/story/resourcesแตกต่าง;ข้อมูลใหม่ในRAM/.godseedเท่านั้น oldfilemigrateได้

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-002 — นักเวทพเนจร**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือการเดินทางและปรับสูตรตามพื้นที่;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-003 — นักปรุงเวท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือเตรียมวัตถุดิบและปรับพฤติกรรมสูตร;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-004 — นักสำรวจ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือเส้นทาง/ข่าวลือ/สถานที่ลับ;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-005 — นักวิจัยอักขระ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือถอดกฎ/จารึก/ความรู้ที่เผยแพร่ได้;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-006 — ผู้พิทักษ์ธรรมชาติ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือฟื้นฟูพื้นที่และสิ่งมีชีวิต;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-007 — พ่อค้าเวทมนตร์**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือการค้า/ข้อตกลง/ทรัพยากร;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-008 — นักฝึกพลังและการต่อสู้**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือการอ่านintentและชุดเวทเชิงกลยุทธ์;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **LIFE-009 — คนธรรมดาผู้เปลี่ยนโลก**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: LIFE-001, ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีวิธีเริ่ม/ความสามารถ/ข้อจำกัด/กิจกรรม/NPC/แหล่งวัตถุดิบ/การฝึก/เหตุการณ์/ตัวเลือก/จุดเปลี่ยน/ผลmainstory/บทสรุปครบ;เอกลักษณ์คือความสัมพันธ์/งานชุมชนที่มีผลกับโลก;ทดสอบอย่างน้อยหนึ่งrouteที่เล่นต่างจากสายอื่นจริง


<a id="phase-5"></a>
## Phase 5 — Magic System — ระบบเวทและการเรียนรู้

- [ ] 🟡 กำลังพัฒนา **MAG-001 — Catalogวัตถุดิบ/ตัวเร่งและหมวดกระเป๋าตามV6**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-013 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/src/main.ts](GODSEED/src/main.ts)
  - หลักฐาน/สถานะจริง: 8/6/7catalogมี; catalyst/ไอคอน/หมวดยังไม่ครบ;ขยายเกณฑ์V6 ยังไม่ใช่implementationที่ผ่านแล้ว
  - เกณฑ์เสร็จ: ทุกรายการชื่อ/description/source/rarity/icon/categoryรวม5catalystsไม่ใช้questitemผิด; V6: เป้าหมายประมาณ100วัตถุดิบมีแหล่ง/หน้าที่/recipeusageจริง แบ่งภูมิภาคตามARC;ไม่เพิ่มรายการที่หาไม่ได้หรือไม่มีผล

- [ ] 🟡 กำลังพัฒนา **MAG-002 — แหล่งวัตถุดิบ/ค้นพบ/reachabilityทั้งบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-013, GS-026 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: MAG-001, STO-001
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/exploration.test.ts](GODSEED/tests/exploration.test.ts) · [GODSEED/src/scenes/gathering-props.ts](GODSEED/src/scenes/gathering-props.ts) · [GODSEED/tests/gathering.spec.ts](GODSEED/tests/gathering.spec.ts) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/tests/ruins.test.ts](GODSEED/tests/ruins.test.ts) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md) · [GODSEED/docs/evidence/session20/README.md](GODSEED/docs/evidence/session20/README.md) · [GODSEED/docs/evidence/session20/REPORT_TH.md](GODSEED/docs/evidence/session20/REPORT_TH.md)
  - หลักฐาน/สถานะจริง: จริง5สูตรจากstory; unit234ใช้fixtureของครบไม่ใช่storyaccess; Session13 เพิ่มภาพวัตถุดิบ3ชนิดจากpickup endpointจริง มีviewmodelรางวัลครั้งแรก/รายวันและPNGfallback; local109unit/content2/targeted5PASS; PRCI42053446169/mainCI42056090200 full70SUCCESS และเว็บจริง40PNG/JS/gathering/rewards/saveผ่าน; ไม่ถือว่าทั้งmilestoneเสร็จ งานใหญ่ยังin_progress; รอบ19 candidate0.9.0: S15/S16/S17+CH0207 รวม21scenes70choices,ต้นแบบReference09/14anchors8solids/B03wardturn3/รางวัลQ_ARCHIVEครั้งเดียว/State2File2เดิม;Unit151/Focus10+retreat2ผ่าน;Full123/CI/publicจะลงผลเมื่อรันจริง ไม่ปิดงานใหญ่หรือB04; V6รอบ20:46nodes142choices/25ใหม่72choices/เตรียมงาน3กิจกรรม/3บทสรุปย่อย/2Questcontracts/AnchorCSD/โคมต้นฉบับและเวลาเย็น–เช้า;Unit175ผ่าน ยังรอFull131/CI ไม่ปิดงานใหญ่
  - เกณฑ์เสร็จ: essentialmaterialsมีrouteไม่grind daily/rare/endgameหาได้ ตรวจscriptreachability

- [x] ✅ เสร็จสมบูรณ์ **MAG-003 — ตัวสร้าง/validatorสูตร234 stableIDs**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-014 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-008
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/tests/unit.test.ts](GODSEED/tests/unit.test.ts)
  - หลักฐาน/สถานะจริง: 336candidates234legal/unique/permodcountsผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: คำนวณกฎตามSSOTครบ rejectillegal ไม่เขียนชื่อ234สูตรหลอก

- [x] ✅ เสร็จสมบูรณ์ **MAG-004 — Craft transaction/preview/consume-once**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-015 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-003, FND-005
  - ไฟล์: [GODSEED/src/ui/alchemy-panel.ts](GODSEED/src/ui/alchemy-panel.ts) · [GODSEED/tests/alchemy.test.ts](GODSEED/tests/alchemy.test.ts) · [GODSEED/tests/alchemy.spec.ts](GODSEED/tests/alchemy.spec.ts)
  - หลักฐาน/สถานะจริง: 87unit/41browserCI0.4.1; invalid/knownไม่consume · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ตรวจของครบก่อนใช้ ชื่อunknownซ่อน พลัง/MP/ของขาดถูกต้อง กดซ้ำไม่เสียของ

- [x] ✅ เสร็จสมบูรณ์ **MAG-005 — สมุดเวทกรองธาตุ/ประเภท/MPและ4ช่องequip/unequip**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-017 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-004
  - ไฟล์: [GODSEED/src/ui/alchemy-panel.ts](GODSEED/src/ui/alchemy-panel.ts) · [GODSEED/tests/alchemy.spec.ts](GODSEED/tests/alchemy.spec.ts)
  - หลักฐาน/สถานะจริง: realtouch/filter/emptyloadout/reload/checksumผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: แสดงเฉพาะknown ไม่ซ้ำ4ช่อง เปลี่ยนนอกbattle ถอดไม่ลืมสูตร เซฟเข้ากันได้

- [ ] 🟡 กำลังพัฒนา **MAG-006 — Core/Form/Mod behavior/mastery/targetsครบ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-016, GS-020 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-003, CMB-001
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts)
  - หลักฐาน/สถานะจริง: 234finite single-targetfixtureผ่าน; mastery/party/multitargetไม่มี
  - เกณฑ์เสร็จ: category/power/MP/status/ward/multi-targetตามspec mastery0–3มีearnedupgrade/migrationtests

- [ ] 🟡 กำลังพัฒนา **MAG-007 — VFX composerแยกตามสูตรและtarget**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-018, GS-033 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: MAG-006, VIS-009
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/verification.json](GODSEED/docs/evidence/session18/verification.json) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json)
  - หลักฐาน/สถานะจริง: color/form/modparticlesและsupport/sceneanchorsมี; ยังไม่มี234distinctnessgate; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;Local113/PRCI42222588626 full113/publiccore+workshop+UI5/59PNG+JSผ่าน;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน;งานใหญ่ยังไม่ครบ
  - เกณฑ์เสร็จ: 6representativegoldensและ234descriptor/renderaudit แยกSPLIT/SEEK/AMPLIFY/statusชัดในbudget

- [ ] 🟡 กำลังพัฒนา **MAG-008 — ใช้เวทแก้เหตุการณ์เนื้อเรื่องครบ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-026 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-005, STO-002
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/exploration.spec.ts](GODSEED/tests/exploration.spec.ts)
  - หลักฐาน/สถานะจริง: knownWINDclearmist+sceneVFXจริง; shrineCH1302ยังขาด
  - เกณฑ์เสร็จ: WIND/BLOOM/ECHO/รูนตามcanonicalconditionsมีeffectsจริง fallbackไม่ติด

- [ ] 🟡 กำลังพัฒนา **MAG-009 — สมดุลเวทตลอดบทและแหล่งเติมMP**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: GS-016, GS-024 · Phaseเดิม: 4 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-006, CMB-007
  - ไฟล์: [GODSEED/tests/balance.test.ts](GODSEED/tests/balance.test.ts) · [GODSEED/docs/BALANCE.md](GODSEED/docs/BALANCE.md)
  - หลักฐาน/สถานะจริง: 900earlyloop wins3encounters; ไม่ครอบคลุมB03–05/mastery
  - เกณฑ์เสร็จ: seedpoliciesทั้งบทใช้หลายประเภทได้ไม่softlock MP0 viable curvesรายงานไม่ใช้fixtureแทนrouteจริง

- [ ] ⬜ ยังไม่ได้เริ่ม **POWER-001 — 8ระดับความเข้าใจจากธาตุถึงต้นกำเนิด**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: MAG-006, LIFE-001
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: ทั้ง8ระดับมีrequirement/unlock/combat/story/limit/training/knowledgecheck;ไม่ใช่เพิ่มเลขพลังอย่างเดียว;ทดสอบข้ามระดับไม่ได้และoldsaveไม่เสีย

- [ ] ⬜ ยังไม่ได้เริ่ม **MAG-010 — V6 Element/Form/Modifier/Catalyst และประมาณ250สูตรที่มีพฤติกรรมจริง**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: magic · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: MAG-003, MAG-004, MAG-006
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts)
  - หลักฐาน/สถานะจริง: ปัจจุบัน234legalเดิมยังเป็นมาตรฐาน runtime;250และรายชื่อV6เป็นเป้าหมาย ยังไม่เปลี่ยนสูตรหรืออ้างว่าสร้างแล้ว
  - เกณฑ์เสร็จ: ออกแบบcompatibilitymappingจาก234legacyIDsไปV6(8elements/7forms/8mods/catalysts)ก่อนเปลี่ยน;สูตรใหม่deterministic/ต่างเชิงbehavior/MP/target/VFX/combination/story;ทุกสูตรเปิดให้ใช้หาingredientsได้และoldfilesผ่าน


<a id="phase-6"></a>
## Phase 6 — Combat — การต่อสู้

- [x] ✅ เสร็จสมบูรณ์ **CMB-001 — Turn-based reducer HP/MP/guard/basic**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-019, GS-020 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-008
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: singleenemy turns/status/finiteward/MP0ผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: แต่ละcommandใช้เทิร์นถูกต้อง ค่าไม่ติดลบ guard/basicให้ทางรอด เซฟระหว่างเทิร์นได้

- [ ] 🟡 กำลังพัฒนา **CMB-002 — ความสามารถ/XP/level/party supportตามscope**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-016, GS-020 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-001, MAG-006
  - ไฟล์: [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts) · [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts)
  - หลักฐาน/สถานะจริง: XPมีแต่ยังไม่level/mastery; playerเดี่ยว
  - เกณฑ์เสร็จ: earnedlevels/stats/caps/targetingของformตรงspec migrationรักษาXPเก่า

- [x] ✅ เสร็จสมบูรณ์ **CMB-003 — AIเชิงกฎ intent/telegraphของBT/B01/B02**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-020, GS-022 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-001
  - ไฟล์: [GODSEED/src/content/encounters.ts](GODSEED/src/content/encounters.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: B02mistprelocked/turnrulesและintent testsผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: แสดงก่อนเลือก ผลตรงintentไม่มีsurprise threshold override

- [ ] 🟡 กำลังพัฒนา **CMB-004 — ใช้เวท4ช่อง/ธาตุ/status interactionsทั้งหมด**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-016, GS-018, GS-020 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-005, CMB-001
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: SEAR/WET/WIND/LIGHT/VEIL/wardsมี; multipleenemiesยังไม่มี
  - เกณฑ์เสร็จ: ทุกform/mod/coreและexpiry/immunity/targetsตามspec มีcounterที่เข้าถึงได้

- [x] ✅ เสร็จสมบูรณ์ **CMB-005 — ไอเทม หนี ยอมแพ้ recoveryของencountersที่เปิด**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-019, GS-021 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-001, FND-005
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/training.spec.ts](GODSEED/tests/training.spec.ts)
  - หลักฐาน/สถานะจริง: potion/mana/flee/surrender/defeat/checkpoint/reloadผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ตามกฎencounter consumeครั้งเดียว rewardไม่ซ้ำ lossกลับเตรียมตัวได้

- [ ] 🟡 กำลังพัฒนา **CMB-006 — B03/B04พร้อมAI/rules/art/rewards/conditionalflee**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-022, GS-026, GS-027 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: CMB-003, VIS-008
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/tests/ruins.test.ts](GODSEED/tests/ruins.test.ts) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md)
  - หลักฐาน/สถานะจริง: spec66/76HPและrulesมี โค้ดcatalogยังไม่มี; รอบ19 candidate0.9.0: S15/S16/S17+CH0207 รวม21scenes70choices,ต้นแบบReference09/14anchors8solids/B03wardturn3/รางวัลQ_ARCHIVEครั้งเดียว/State2File2เดิม;Unit151/Focus10+retreat2ผ่าน;Full123/CI/publicจะลงผลเมื่อรันจริง ไม่ปิดงานใหญ่หรือB04
  - เกณฑ์เสร็จ: B03wardturn3/B04copytelegraph EIRAconditionalflee balance/truepathsผ่าน

- [ ] ⬜ ยังไม่ได้เริ่ม **CMB-007 — B05 guardian3phases/assist25%/immunity**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-023 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-006, MAG-005
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: 150HP/3phasesออกแบบแล้ว ยังไม่มีbosscode
  - เกณฑ์เสร็จ: ครบscript/phase warning/disablelimit/assist/retry/rewards เชื่อมS23หลังชนะ

- [ ] 🟡 กำลังพัฒนา **CMB-008 — Battle animation/defeat/reactionไม่text-only**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-007, GS-018, GS-033 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-004, CMB-001
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts)
  - หลักฐาน/สถานะจริง: hero/foeattack/hit/win/loss/sceneanchoredมี; finalVFX/enemiesยังต้นแบบ
  - เกณฑ์เสร็จ: ทุกencounterมีwarn/attack/react/defeatตามผลจริง supportยิงถูกฝ่าย visualgateผ่าน

- [ ] 🟡 กำลังพัฒนา **CMB-009 — ผลชนะ/แพ้/เลี่ยงเชื่อมเรื่องทั้งบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: GS-021, GS-028 · Phaseเดิม: 5 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-005, CMB-007
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/exploration.spec.ts](GODSEED/tests/exploration.spec.ts)
  - หลักฐาน/สถานะจริง: 3encountersกลับstory flags/rewardsจริง
  - เกณฑ์เสร็จ: B01–B05และbypassทุกทางกลับcanon flags/trust/endingถูกต้องไม่ซ้ำรางวัล

- [ ] ⬜ ยังไม่ได้เริ่ม **CMB-010 — V6ศัตรูประมาณ30แบบที่ต่างเชิงพฤติกรรม**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: CMB-003, CMB-004, CMB-006
  - ไฟล์: [GODSEED/src/content/encounters.ts](GODSEED/src/content/encounters.ts) · [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: V6เป้าหมายขยายcatalog;ปัจจุบัน4encountersรวมBT/B01/B02/B03ไม่เท่ากับ30ศัตรู/10บอส ยังไม่สร้างส่วนขยายนี้
  - เกณฑ์เสร็จ: ศัตรูเป้าหมาย≈30ประเภทมีintent/กฎ/จุดอ่อน/รางวัล/routeจริง รูปแบบเกราะ/เร็ว/เปลี่ยนธาตุ/สนับสนุน/ตอบสิ่งแวดล้อมต่างกัน ทดสอบชนะ/หนี/ยอมแพ้/แพ้ที่เปิดใช้ได้ ไม่เปลี่ยนชื่ออย่างเดียว

- [ ] ⬜ ยังไม่ได้เริ่ม **CMB-011 — V6บอสประมาณ10ตัวและกลไกตามบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: combat · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: CMB-007, CMB-010
  - ไฟล์: [GODSEED/src/content/encounters.ts](GODSEED/src/content/encounters.ts) · [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: V6เป้าหมายขยายcatalog;ปัจจุบัน4encountersรวมBT/B01/B02/B03ไม่เท่ากับ30ศัตรู/10บอส ยังไม่สร้างส่วนขยายนี้
  - เกณฑ์เสร็จ: บอสเป้าหมาย≈10ตัวรวมguardianเดิมมีtelegraph/counterplay/phase/storyconsequences/ภาพเฉพาะครบ มีstrategiesที่ยุติธรรมและmanualfileกลางturnรองรับ ทุกตัวเข้าถึงจากบทจริง


<a id="phase-7"></a>
## Phase 7 — World Systems — โลกและสังคม

- [ ] 🟡 กำลังพัฒนา **STO-003 — NPC memories/ความสัมพันธ์ตลอดบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: GS-011, GS-039 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-002
  - ไฟล์: [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts) · [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts) · [GODSEED/src/scenes/garden-staging.ts](GODSEED/src/scenes/garden-staging.ts) · [GODSEED/tests/garden.spec.ts](GODSEED/tests/garden.spec.ts) · [GODSEED/docs/evidence/session14/README.md](GODSEED/docs/evidence/session14/README.md) · [GODSEED/tests/maren.spec.ts](GODSEED/tests/maren.spec.ts) · [GODSEED/scripts/generate-maren-art.mjs](GODSEED/scripts/generate-maren-art.mjs)
  - หลักฐาน/สถานะจริง: มีtrustและEira/Marenrememberedlines; ยังไม่ครบทุกNPC/ตอนจบ; รอบ14 CH0601 water→bloom→pluck และมาเรนจำ garden_tended หลังโหลด; fixed exit อ้อมฐานแปลง; local Unit114/Browser7/Build ผ่าน, local77/PRCI42065834761/mainCI42068520631 ผ่านและเว็บจริงรดน้ำ/รางวัล/ดอกบาน/มาเรน/โหลด/42PNGผ่าน; เป็นส่วนย่อย ยังไม่ครบเกณฑ์งานใหญ่; Session15 CH0602มีbenchroute/rest/hummingMarenต้นฉบับ8framesและmemoryผ่านfile-save roundtripบน5viewport; ยังไม่ครบเกณฑ์งานใหญ่
  - เกณฑ์เสร็จ: เหตุการณ์สำคัญถูกจำหลังreload trustมีทางเลือกและสะท้อนdialogue/worldทั้งบท

- [ ] 🟡 กำลังพัฒนา **STO-004 — เหตุการณ์ตามสถานที่/เวลา/ทางเลือก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: GS-011, GS-030 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-002
  - ไฟล์: [GODSEED/src/systems/game.ts](GODSEED/src/systems/game.ts) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ticks3/day/dailygatheringมี; schedule/lighting/ทุกeventยังไม่ครบ
  - เกณฑ์เสร็จ: rulepriority/time/locationถูกต้อง mainquestไม่ติดschedule และvisualตามช่วงเวลา

- [ ] 🟡 กำลังพัฒนา **WRD-001 — สถานที่/เส้นทางบท1ครบและย้อนกลับได้**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-025, GS-026, GS-027, GS-028 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-001, VIS-008
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: 17scenes/6stagesจริง; ruins/festival/sealยังขาด
  - เกณฑ์เสร็จ: S00–S29ตามSSOT mainlocationsมีroutes/sceneart/revisit ไม่มีplaceholderให้เข้า

- [ ] 🟡 กำลังพัฒนา **WRD-002 — NPC history/relationship/กิจวัตรตามโลกV6**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-011, GS-039 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-003, VIS-004
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts)
  - หลักฐาน/สถานะจริง: 5NPCdialogue/trustมี; Sentinel/ทุกmemorytagยังขาด;ขยายเกณฑ์V6 ยังไม่ใช่implementationที่ผ่านแล้ว
  - เกณฑ์เสร็จ: NPCcanon6ตัวและspecialreactions มีบท/ประวัติไม่ขัดcanonและเวลาไม่blockquest; V6: เป้าหมายNPCสำคัญ30คนขึ้นไปมีบุคลิก/เป้าหมาย/กิจกรรม/ความทรงจำ/ทางเลือกและผลจริง;5NPCปัจจุบันไม่เท่ากับครบ30

- [ ] 🟡 กำลังพัฒนา **WRD-004 — ความลับโลก/cluesและเหตุการณ์เฉพาะทางเลือก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-026, GS-029 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-002
  - ไฟล์: [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts)
  - หลักฐาน/สถานะจริง: forest/stream/archivecluesและmemorypropsมี; ruinsยังไม่มี
  - เกณฑ์เสร็จ: 4cluesและallbranchfactsเปิดความลับ/worldreactionsจริง journalไม่แต่งเหตุการณ์

- [ ] 🟡 กำลังพัฒนา **WRD-005 — เวลา/สภาพอากาศ/แสงตามบท**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-009, GS-012 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-004, VIS-010
  - ไฟล์: [GODSEED/src/systems/game.ts](GODSEED/src/systems/game.ts) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts)
  - หลักฐาน/สถานะจริง: ticks/dayมี; weather/lightingvariantsยังไม่ทำ
  - เกณฑ์เสร็จ: morning/afternoon/eveningและauthoredweatherเปลี่ยนภาพ/ข้อความ ไม่ขัดsave/quest

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-009 — หกสมาคม/reputation/ข้อตกลงและผลระหว่างฝ่าย**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: STO-003, LIFE-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: หกสมาคมต้นฉบับมีเป้าหมาย/งาน/ข้อตกลง/ข้อเสียและผลข้ามฝ่ายที่ตรวจได้ ข่าวลือมาจากfactจริงและมีfallback

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-010 — เศรษฐกิจ/ร้านค้า/การสร้างสิ่งของและแหล่งทรัพยากร**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: MAG-002, FND-008
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: ซื้อขาย/ปรุงหรือสร้างมีต้นทุน/แหล่งรับ/ข้อจำกัดจริง ไม่สร้างเงินจากloop;ราคาตามworldfactsมีtests;ไม่paid/FOMOและไม่มีcloudstate

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-011 — ฤดูกาล/อากาศ/การเดินทาง/กิจวัตรและข่าวลือตามเหตุ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: WRD-005, WRD-002, WRD-009
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: eventconditionตามเวลา/ฤดู/อากาศ/เมือง/ป่า/NPC/เส้นทางและworldflags deterministic;ผู้เล่นมีวิธีเตรียม/รอ ไม่ล็อกmainroute;ข่าวลือเช็คsourcefact

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-012 — Legacy knowledge และการเปลี่ยนสภาพโลกที่ส่งต่อ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: WRD-004, POWER-001, STO-003
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: ความรู้ที่สืบทอด/ฟื้นฟู/เปิดทางเปลี่ยนกิจกรรมNPC/ทรัพยากร/เมืองจริงในฉากและเหตุการณ์;ย้อนกลับและmanualfileคืนสถานะถูก ไม่ให้AIแก้state


<a id="phase-8"></a>
## Phase 8 — Main Story Expansion — ARC 1–6

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-007 — CH2 หอนาฬิกาดาว/เขตเมือง/ดันเจี้ยนใหม่**
  - ความสำคัญ: P3 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-036, GS-037 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-010
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: M7/CH2canonoutlineเท่านั้น ไม่มีimplementation
  - เกณฑ์เสร็จ: กำหนดboundedchapterใหม่พร้อมstory/art/puzzles/battle/save/goldenpaths; ในV6เป็นเนื้อหาเดิมที่นำมาประกอบARC3/ARC10 ไม่ถือว่าทั้งARCเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-002 — ARC 2 — เสียงกระซิบจากพฤกษา**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;ป่า/ต้นไม้ ความทรงจำ/เวทสิ่งแวดล้อม/สถานที่ลับ/ผลทางเลือกเก่า;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-003 — ARC 3 — เมืองแห่งเจ็ดหอคอย**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-002, LIFE-001, WRD-010
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;เมือง/อาจารย์/เส้นทางชีวิต/ร้านค้า/สร้างอุปกรณ์/ภารกิจเฉพาะสาย;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-004 — ARC 4 — ตำราแห่งธาตุที่สูญหาย**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-003
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;ความรู้/ผสมขั้นสูง/ปริศนาเงื่อนไข/ประวัติศาสตร์วัตถุดิบ;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-005 — ARC 5 — สัญญาระหว่างหกสมาคม**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-004, WRD-009
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;กลุ่ม/ข้อตกลง/ชื่อเสียง/เศรษฐกิจ/ผลระหว่างฝ่าย;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-006 — ARC 6 — ทะเลหมอกไร้แผนที่**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-005
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;พื้นที่ใหม่/อากาศ/ข้อมูล/ทรัพยากร/ความลับที่เชื่อมของเก่า;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ


<a id="phase-9"></a>
## Phase 9 — Advanced Story Expansion — ARC 7–12

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-008 — CH3 หอจารึกเหนือเมฆและบทสรุปโลก**
  - ความสำคัญ: P3 · ขอบเขต: v1 · ด้าน: systems · เชื่อมบอร์ดเดิม: GS-038 · Phaseเดิม: 6 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: WRD-007
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: M8/CH3outlineเท่านั้น
  - เกณฑ์เสร็จ: chapter3ครบbranches/theme/ending/art/migrationและrealplay QA; ในV6เป็นเนื้อหาเดิมที่นำมาประกอบARC3/ARC10 ไม่ถือว่าทั้งARCเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-007 — ARC 7 — มรดกของผู้ไร้นาม**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-006, WRD-012
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;ประวัติศาสตร์/legacy/knowledge/NPCmemory/branchingrevelations;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-008 — ARC 8 — เมืองที่หลงลืมเวลา**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-007
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;timeline/causeeffect/สถานะเมือง/ผู้ได้รับความช่วยเหลือ;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-009 — ARC 9 — ประตูแห่งรากโลก**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-008, POWER-001
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;mastery/บททดสอบเฉพาะสาย/เงื่อนไขเก่า/กลยุทธ์;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-010 — ARC 10 — อาณาจักรเหนือม่านดารา**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-009
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;กฎเวทใหม่/วัฒนธรรม/วัตถุดิบ/การปรับความรู้เดิม โดยคงFantasy;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-011 — ARC 11 — สงครามแห่งความทรงจำ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-010, CMB-009, STO-003
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;ผลworld/faction/ally/bossจากการตัดสินใจสะสม ไม่สุ่มผลลัพธ์;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ

- [ ] ⬜ ยังไม่ได้เริ่ม **ARC-012 — ARC 12 — GODSEED: ผู้เขียนอนาคต**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: — · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: ARC-011
  - ไฟล์: [03_CODEX_CONTINUE_FOREVER.md](03_CODEX_CONTINUE_FOREVER.md) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ข้อกำหนด V6 เป็นแผนงาน ยังไม่มี implementation/ผลทดสอบสำหรับเกณฑ์นี้ ห้ามนับสเปกว่าเกมสร้างแล้ว
  - เกณฑ์เสร็จ: มีต้น/ทางเลือกสำคัญ/ระบบเกม/จุดเปลี่ยน/บทสรุปย่อยและเส้นทางเข้าถึงจริง เชื่อมARCก่อนและผลเก่าชัดเจน;ต้นกำเนิด/ทางเลือกอนาคต/บทสรุปชีวิตหลายคุณค่า ไม่บังคับพลังสูงสุด;มีstatefulplaythrough/choiceeffects/cinematic/saveพร้อม ไม่ถือจำนวนNodeอย่างเดียวว่าเสร็จ


<a id="phase-10"></a>
## Phase 10 — Visual & Cinematic Polish

- [ ] 🟡 กำลังพัฒนา **VIS-001 — Art Bible/palette/pixel grid/สิทธิ์ครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-007, GS-033 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/docs/ART_BIBLE.md](GODSEED/docs/ART_BIBLE.md) · [GODSEED/docs/ASSET_LICENSES.md](GODSEED/docs/ASSET_LICENSES.md)
  - หลักฐาน/สถานะจริง: original generators39PNG; visual gateยังไม่ผ่าน; Session12 ต้นแบบหมู่บ้าน/ต้นไม้ผ่านCI65ในVIS-014แล้ว แต่เกณฑ์งานใหญ่/ภาพขั้นสุดท้ายยังไม่ครบ
  - เกณฑ์เสร็จ: palette/metrics/rights/lighting/atlasมาตรฐานเดียวและreviewจริงครบฉาก

- [x] ✅ เสร็จสมบูรณ์ **VIS-002 — Hero atlas 11 named action cycles**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-007 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/scenes/actor-art.ts](GODSEED/src/scenes/actor-art.ts) · [GODSEED/tests/art.test.ts](GODSEED/tests/art.test.ts)
  - หลักฐาน/สถานะจริง: 56frames/11cycles alpha/bounds/uniqueposesผ่านในart tests · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: idle/walk/run/interact/pick/craft/cast/guard/hit/victory/restมีเฟรมจริง runtimeใช้manifest

- [x] ✅ เสร็จสมบูรณ์ **VIS-003 — การเดินสี่ทิศทางพร้อมturn/foot alignment**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-007, GS-033 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-002
  - ไฟล์: [GODSEED/scripts/generate-directional-art.mjs](GODSEED/scripts/generate-directional-art.mjs) · [GODSEED/src/scenes/directional-art.ts](GODSEED/src/scenes/directional-art.ts) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/directional.spec.ts](GODSEED/tests/directional.spec.ts) · [GODSEED/tests/art.test.ts](GODSEED/tests/art.test.ts)
  - หลักฐาน/สถานะจริง: 24originalframes/fourviews; gameunit94/94, focus17/17 PASS2.4m รวม4viewports/reload/skip/reduced/newPNGfallback; phone/desktopruntime reviewed · facing/foot/depth/shadowจากactualUIchoices ตรวจครบ4ทิศ ไม่มีflipแทนหน้า/หลัง; regenerate40PNGผ่าน old39byte-identical; ไม่ใช่finalHDหรือNPCacceptance; finalPRCI42004666730 SUCCESS full50 บนcd24b9c/merge3b62a2f; mainCI42005831839 full50/deploySUCCESS and public/post29PNG/JS/rendererPASS
  - เกณฑ์เสร็จ: สี่ทิศมีoriginalframesตามเส้นทาง ไม่ใช้flipแทนหน้า/หลัง ตรวจบนสามกลุ่มจอ

- [ ] 🟡 กำลังพัฒนา **VIS-004 — NPC/ศัตรู silhouette และท่าพิเศษครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-007, GS-033 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/src/scenes/exploration-art.ts](GODSEED/src/scenes/exploration-art.ts) · [GODSEED/scripts/generate-exploration-art.mjs](GODSEED/scripts/generate-exploration-art.mjs) · [GODSEED/tests/maren.spec.ts](GODSEED/tests/maren.spec.ts) · [GODSEED/scripts/generate-maren-art.mjs](GODSEED/scripts/generate-maren-art.mjs) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-koro-art.mjs](GODSEED/scripts/generate-koro-art.mjs) · [GODSEED/tests/koro.spec.ts](GODSEED/tests/koro.spec.ts) · [GODSEED/docs/evidence/session17/README.md](GODSEED/docs/evidence/session17/README.md) · [GODSEED/docs/evidence/session17/REPORT_TH.md](GODSEED/docs/evidence/session17/REPORT_TH.md)
  - หลักฐาน/สถานะจริง: Eira/wisp/trainingมีoriginalcycles; NPCเก่ายังsharedbase; Session15 CH0602มีbenchroute/rest/hummingMarenต้นฉบับ8framesและmemoryผ่านfile-save roundtripบน5viewport; ยังไม่ครบเกณฑ์งานใหญ่; Session17 Koro32x48/12cells + groundedanvil, hammer/show_recipeตรงCH0401/S05/ReducedMotion/fallback ผ่าน5viewportในFocused12 ส่วนงานใหญ่ยังไม่ครบ; ไม่รับรองfinalHD; ผลสุดท้ายรอบ17 Local/PR/Main full105/Build/Deploy/เว็บจริงผ่าน ดูSession17/REPORT_TH;ไม่ปิดงานใหญ่
  - เกณฑ์เสร็จ: Lumi/Maren/Koro/Pip/Eira/Sentinelมีidle/walk/talk/emote/handและspecialตามspec

- [ ] 🟡 กำลังพัฒนา **VIS-005 — ยืน วิ่ง นั่ง และปฏิสัมพันธ์ตามวัตถุ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-007, GS-010 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: VIS-002
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/scenes/cinematic-paths.ts](GODSEED/src/scenes/cinematic-paths.ts) · [GODSEED/src/scenes/gathering-props.ts](GODSEED/src/scenes/gathering-props.ts) · [GODSEED/tests/gathering.spec.ts](GODSEED/tests/gathering.spec.ts) · [GODSEED/src/scenes/garden-staging.ts](GODSEED/src/scenes/garden-staging.ts) · [GODSEED/tests/garden.spec.ts](GODSEED/tests/garden.spec.ts) · [GODSEED/docs/evidence/session14/README.md](GODSEED/docs/evidence/session14/README.md) · [GODSEED/tests/maren.spec.ts](GODSEED/tests/maren.spec.ts) · [GODSEED/scripts/generate-maren-art.mjs](GODSEED/scripts/generate-maren-art.mjs) · [GODSEED/src/scenes/garden-map.ts](GODSEED/src/scenes/garden-map.ts) · [GODSEED/scripts/generate-herb-garden-art.mjs](GODSEED/scripts/generate-herb-garden-art.mjs) · [GODSEED/tests/herb-garden.spec.ts](GODSEED/tests/herb-garden.spec.ts) · [GODSEED/docs/evidence/session16/README.md](GODSEED/docs/evidence/session16/README.md) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-koro-art.mjs](GODSEED/scripts/generate-koro-art.mjs) · [GODSEED/tests/koro.spec.ts](GODSEED/tests/koro.spec.ts) · [GODSEED/docs/evidence/session17/README.md](GODSEED/docs/evidence/session17/README.md) · [GODSEED/docs/evidence/session17/REPORT_TH.md](GODSEED/docs/evidence/session17/REPORT_TH.md) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/verification.json](GODSEED/docs/evidence/session18/verification.json) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/tests/ruins.test.ts](GODSEED/tests/ruins.test.ts) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md) · [GODSEED/docs/evidence/session20/README.md](GODSEED/docs/evidence/session20/README.md) · [GODSEED/docs/evidence/session20/REPORT_TH.md](GODSEED/docs/evidence/session20/REPORT_TH.md)
  - หลักฐาน/สถานะจริง: มีrest/run/interact poses; รอบ7นั่งม้านั่ง/approachและsupportdepthผ่าน แต่runยังไม่มีstorychoiceจริง/ปฏิสัมพันธ์ยังไม่ครบ; Session12 ต้นแบบหมู่บ้าน/ต้นไม้ผ่านCI65ในVIS-014แล้ว แต่เกณฑ์งานใหญ่/ภาพขั้นสุดท้ายยังไม่ครบ; Session13 เพิ่มภาพวัตถุดิบ3ชนิดจากpickup endpointจริง มีviewmodelรางวัลครั้งแรก/รายวันและPNGfallback; local109unit/content2/targeted5PASS; PRCI42053446169/mainCI42056090200 full70SUCCESS และเว็บจริง40PNG/JS/gathering/rewards/saveผ่าน; ไม่ถือว่าทั้งmilestoneเสร็จ งานใหญ่ยังin_progress; รอบ14 CH0601 water→bloom→pluck และมาเรนจำ garden_tended หลังโหลด; fixed exit อ้อมฐานแปลง; local Unit114/Browser7/Build ผ่าน, local77/PRCI42065834761/mainCI42068520631 ผ่านและเว็บจริงรดน้ำ/รางวัล/ดอกบาน/มาเรน/โหลด/42PNGผ่าน; เป็นส่วนย่อย ยังไม่ครบเกณฑ์งานใหญ่; Session15 CH0602มีbenchroute/rest/hummingMarenต้นฉบับ8framesและmemoryผ่านfile-save roundtripบน5viewport; ยังไม่ครบเกณฑ์งานใหญ่; รอบ16 0.7.1 สวนต้นฉบับ3เลเยอร์/ซุ้มY-depth/หม้อยา6เฟรม/สมุนไพร4เฟรม/ถนนร่วมAnchor/9Colliders/CH03B1นั่งตามบท; Unit121/Focus20/Build/sourcegate/referencepackingผ่าน local93/PRCI42192866046/mainCI42195039742/เว็บจริงผ่านแล้ว ไม่รับรองfinalHDหรืออุปกรณ์จริง; actualpublic49PNG/JS/สวน/ไฟล์ผ่าน ดูSession16; Session17 Koro32x48/12cells + groundedanvil, hammer/show_recipeตรงCH0401/S05/ReducedMotion/fallback ผ่าน5viewportในFocused12 ส่วนงานใหญ่ยังไม่ครบ; ไม่รับรองfinalHD; ผลสุดท้ายรอบ17 Local/PR/Main full105/Build/Deploy/เว็บจริงผ่าน ดูSession17/REPORT_TH;ไม่ปิดงานใหญ่; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;Local113/PRCI42222588626 full113/publiccore+workshop+UI5/59PNG+JSผ่าน;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน;งานใหญ่ยังไม่ครบ; รอบ19 candidate0.9.0: S15/S16/S17+CH0207 รวม21scenes70choices,ต้นแบบReference09/14anchors8solids/B03wardturn3/รางวัลQ_ARCHIVEครั้งเดียว/State2File2เดิม;Unit151/Focus10+retreat2ผ่าน;Full123/CI/publicจะลงผลเมื่อรันจริง ไม่ปิดงานใหญ่หรือB04; V6รอบ20:46nodes142choices/25ใหม่72choices/เตรียมงาน3กิจกรรม/3บทสรุปย่อย/2Questcontracts/AnchorCSD/โคมต้นฉบับและเวลาเย็น–เช้า;Unit175ผ่าน ยังรอFull131/CI ไม่ปิดงานใหญ่
  - เกณฑ์เสร็จ: ท่าทางทุกcueตรงวัตถุ/พื้น มีเหตุการณ์นั่งและวิ่งที่ใช้จริง ไม่เพียงมีsheet

- [x] ✅ เสร็จสมบูรณ์ **VIS-006 — Director: authored paths → interaction → commit/skip**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-010 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-003, VIS-002
  - ไฟล์: [GODSEED/src/scenes/cinematic-paths.ts](GODSEED/src/scenes/cinematic-paths.ts) · [GODSEED/tests/cinematics.spec.ts](GODSEED/tests/cinematics.spec.ts) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md)
  - หลักฐาน/สถานะจริง: คืนcast/craft1120/1600msและskipก่อนscreenshot; final full45/45 PASS8.4m; PR CI41997711472 SUCCESS รวมtouch4และWINDskip; Session8four-view integration/pace/skip/reduced/fallback focus17PASS; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;full113/CI/publicบันทึกในSession18เมื่อรันจริง;งานใหญ่ยังไม่ครบ · Unitcinematics3 + full45ผ่านหลังแก้ ทุกcaseไม่skip; reviewedbench390/1366; source95c3637/PR7/merge7279cea; ไม่ใช่fullcamera/4direction/HDgate; mainCI41998656125/public2372e798…/post-deployassetgate PASS; Session18 skip/motionยืนยันปลายทางแทนตำแหน่งกลางทาง ผ่านFocus20; Session18 Local113/PRCI42222588626 full113PASS, sourceff5e67d/mergef465839/PR17
  - เกณฑ์เสร็จ: เดินถึงจุดก่อนเก็บ/นั่ง skip/toggle/reloadไม่ซ้ำผล ทดสอบphone/iPadสองแนว/desktop

- [ ] 🟡 กำลังพัฒนา **VIS-007 — Fixed Map และเมนูเส้นทาง/ตำแหน่งที่ปลดล็อก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-029 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-003, VIS-006
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/ui/memory-panel.ts](GODSEED/src/ui/memory-panel.ts) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/verification.json](GODSEED/docs/evidence/session18/verification.json) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json)
  - หลักฐาน/สถานะจริง: มีhub/สถานที่อื่น/scene IDs; ยังไม่มีroute map; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;Local113/PRCI42222588626 full113/publiccore+workshop+UI5/59PNG+JSผ่าน;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน;งานใหญ่ยังไม่ครบ
  - เกณฑ์เสร็จ: แสดงแผนที่คงที่+เส้นทางที่รู้จัก ล็อกมีเหตุผลและไปกลับได้ด้วยtouch

- [ ] 🟡 กำลังพัฒนา **VIS-008 — ฉากหมู่บ้าน ป่า โรงช่าง หอสมุด ลำธาร โบราณสถาน เทศกาล**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-008, GS-009 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/src/scenes/stage-layout.ts](GODSEED/src/scenes/stage-layout.ts) · [GODSEED/scripts/generate-stage-art.mjs](GODSEED/scripts/generate-stage-art.mjs) · [GODSEED/src/scenes/scene-definitions.ts](GODSEED/src/scenes/scene-definitions.ts) · [GODSEED/scripts/generate-village-art.mjs](GODSEED/scripts/generate-village-art.mjs) · [GODSEED/src/scenes/garden-staging.ts](GODSEED/src/scenes/garden-staging.ts) · [GODSEED/tests/garden.spec.ts](GODSEED/tests/garden.spec.ts) · [GODSEED/docs/evidence/session14/README.md](GODSEED/docs/evidence/session14/README.md) · [GODSEED/src/scenes/garden-map.ts](GODSEED/src/scenes/garden-map.ts) · [GODSEED/scripts/generate-herb-garden-art.mjs](GODSEED/scripts/generate-herb-garden-art.mjs) · [GODSEED/tests/herb-garden.spec.ts](GODSEED/tests/herb-garden.spec.ts) · [GODSEED/docs/evidence/session16/README.md](GODSEED/docs/evidence/session16/README.md) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-koro-art.mjs](GODSEED/scripts/generate-koro-art.mjs) · [GODSEED/tests/koro.spec.ts](GODSEED/tests/koro.spec.ts) · [GODSEED/docs/evidence/session17/README.md](GODSEED/docs/evidence/session17/README.md) · [GODSEED/docs/evidence/session17/REPORT_TH.md](GODSEED/docs/evidence/session17/REPORT_TH.md) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/verification.json](GODSEED/docs/evidence/session18/verification.json) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/tests/ruins.test.ts](GODSEED/tests/ruins.test.ts) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md) · [GODSEED/docs/evidence/session20/README.md](GODSEED/docs/evidence/session20/README.md) · [GODSEED/docs/evidence/session20/REPORT_TH.md](GODSEED/docs/evidence/session20/REPORT_TH.md)
  - หลักฐาน/สถานะจริง: 6layered stagesจริง; ruins/festivalยังไม่มี; Session12 ต้นแบบหมู่บ้าน/ต้นไม้ผ่านCI65ในVIS-014แล้ว แต่เกณฑ์งานใหญ่/ภาพขั้นสุดท้ายยังไม่ครบ; รอบ14 CH0601 water→bloom→pluck และมาเรนจำ garden_tended หลังโหลด; fixed exit อ้อมฐานแปลง; local Unit114/Browser7/Build ผ่าน, local77/PRCI42065834761/mainCI42068520631 ผ่านและเว็บจริงรดน้ำ/รางวัล/ดอกบาน/มาเรน/โหลด/42PNGผ่าน; เป็นส่วนย่อย ยังไม่ครบเกณฑ์งานใหญ่; รอบ16 0.7.1 สวนต้นฉบับ3เลเยอร์/ซุ้มY-depth/หม้อยา6เฟรม/สมุนไพร4เฟรม/ถนนร่วมAnchor/9Colliders/CH03B1นั่งตามบท; Unit121/Focus20/Build/sourcegate/referencepackingผ่าน local93/PRCI42192866046/mainCI42195039742/เว็บจริงผ่านแล้ว ไม่รับรองfinalHDหรืออุปกรณ์จริง; actualpublic49PNG/JS/สวน/ไฟล์ผ่าน ดูSession16; Session17 Koro32x48/12cells + groundedanvil, hammer/show_recipeตรงCH0401/S05/ReducedMotion/fallback ผ่าน5viewportในFocused12 ส่วนงานใหญ่ยังไม่ครบ; ไม่รับรองfinalHD; ผลสุดท้ายรอบ17 Local/PR/Main full105/Build/Deploy/เว็บจริงผ่าน ดูSession17/REPORT_TH;ไม่ปิดงานใหญ่; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;Local113/PRCI42222588626 full113/publiccore+workshop+UI5/59PNG+JSผ่าน;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน;งานใหญ่ยังไม่ครบ; รอบ19 candidate0.9.0: S15/S16/S17+CH0207 รวม21scenes70choices,ต้นแบบReference09/14anchors8solids/B03wardturn3/รางวัลQ_ARCHIVEครั้งเดียว/State2File2เดิม;Unit151/Focus10+retreat2ผ่าน;Full123/CI/publicจะลงผลเมื่อรันจริง ไม่ปิดงานใหญ่หรือB04; V6รอบ20:46nodes142choices/25ใหม่72choices/เตรียมงาน3กิจกรรม/3บทสรุปย่อย/2Questcontracts/AnchorCSD/โคมต้นฉบับและเวลาเย็น–เช้า;Unit175ผ่าน ยังรอFull131/CI ไม่ปิดงานใหญ่
  - เกณฑ์เสร็จ: ครบสถานที่บท1และbattle variants ใช้tile/props/layersสัมพันธ์กัน

- [ ] 🟡 กำลังพัฒนา **VIS-009 — ฉากมีมิติ แสงเงา และocclusionขั้นสุดท้าย**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-008, GS-033 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: VIS-008
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/scenes/stage-layout.ts](GODSEED/src/scenes/stage-layout.ts) · [GODSEED/src/scenes/garden-map.ts](GODSEED/src/scenes/garden-map.ts) · [GODSEED/scripts/generate-herb-garden-art.mjs](GODSEED/scripts/generate-herb-garden-art.mjs) · [GODSEED/tests/herb-garden.spec.ts](GODSEED/tests/herb-garden.spec.ts) · [GODSEED/docs/evidence/session16/README.md](GODSEED/docs/evidence/session16/README.md) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/verification.json](GODSEED/docs/evidence/session18/verification.json) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json) · [GODSEED/src/scenes/ruins-map.ts](GODSEED/src/scenes/ruins-map.ts) · [GODSEED/src/scenes/ruins-staging.ts](GODSEED/src/scenes/ruins-staging.ts) · [GODSEED/tests/ruins.test.ts](GODSEED/tests/ruins.test.ts) · [GODSEED/tests/ruins.spec.ts](GODSEED/tests/ruins.spec.ts) · [GODSEED/docs/evidence/session19/README.md](GODSEED/docs/evidence/session19/README.md)
  - หลักฐาน/สถานะจริง: มีY-depth/contactshadows/3layers; advancedlightingยังต้นแบบ; Session12 ต้นแบบหมู่บ้าน/ต้นไม้ผ่านCI65ในVIS-014แล้ว แต่เกณฑ์งานใหญ่/ภาพขั้นสุดท้ายยังไม่ครบ; รอบ16 0.7.1 สวนต้นฉบับ3เลเยอร์/ซุ้มY-depth/หม้อยา6เฟรม/สมุนไพร4เฟรม/ถนนร่วมAnchor/9Colliders/CH03B1นั่งตามบท; Unit121/Focus20/Build/sourcegate/referencepackingผ่าน local93/PRCI42192866046/mainCI42195039742/เว็บจริงผ่านแล้ว ไม่รับรองfinalHDหรืออุปกรณ์จริง; actualpublic49PNG/JS/สวน/ไฟล์ผ่าน ดูSession16; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;Local113/PRCI42222588626 full113/publiccore+workshop+UI5/59PNG+JSผ่าน;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน;งานใหญ่ยังไม่ครบ; รอบ19 candidate0.9.0: S15/S16/S17+CH0207 รวม21scenes70choices,ต้นแบบReference09/14anchors8solids/B03wardturn3/รางวัลQ_ARCHIVEครั้งเดียว/State2File2เดิม;Unit151/Focus10+retreat2ผ่าน;Full123/CI/publicจะลงผลเมื่อรันจริง ไม่ปิดงานใหญ่หรือB04
  - เกณฑ์เสร็จ: reviewactualruntimeทุกฉาก foot/propไม่ทะลุ depth/time-lightสอดคล้องภาพหลัก

- [ ] 🟡 กำลังพัฒนา **VIS-010 — สิ่งแวดล้อมเคลื่อนไหวและpresetลดกราฟิก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-012, GS-033 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: VIS-008
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/scenes/exploration-art.ts](GODSEED/src/scenes/exploration-art.ts) · [GODSEED/src/scenes/garden-map.ts](GODSEED/src/scenes/garden-map.ts) · [GODSEED/scripts/generate-herb-garden-art.mjs](GODSEED/scripts/generate-herb-garden-art.mjs) · [GODSEED/tests/herb-garden.spec.ts](GODSEED/tests/herb-garden.spec.ts) · [GODSEED/docs/evidence/session16/README.md](GODSEED/docs/evidence/session16/README.md) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/verification.json](GODSEED/docs/evidence/session18/verification.json) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json)
  - หลักฐาน/สถานะจริง: water6f/leaf/cloud/fire/glowและreduced motionมี; lowpresetยังไม่มี; Session12 ต้นแบบหมู่บ้าน/ต้นไม้ผ่านCI65ในVIS-014แล้ว แต่เกณฑ์งานใหญ่/ภาพขั้นสุดท้ายยังไม่ครบ; รอบ16 0.7.1 สวนต้นฉบับ3เลเยอร์/ซุ้มY-depth/หม้อยา6เฟรม/สมุนไพร4เฟรม/ถนนร่วมAnchor/9Colliders/CH03B1นั่งตามบท; Unit121/Focus20/Build/sourcegate/referencepackingผ่าน local93/PRCI42192866046/mainCI42195039742/เว็บจริงผ่านแล้ว ไม่รับรองfinalHDหรืออุปกรณ์จริง; actualpublic49PNG/JS/สวน/ไฟล์ผ่าน ดูSession16; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;Local113/PRCI42222588626 full113/publiccore+workshop+UI5/59PNG+JSผ่าน;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน;งานใหญ่ยังไม่ครบ
  - เกณฑ์เสร็จ: อย่างน้อย3detailsต่อฉาก budgetวัดได้ preset/reduced/hiddenไม่ทำให้เกมผิด

- [x] ✅ เสร็จสมบูรณ์ **VIS-011 — กล้อง Cinematic และtransitionตามทิศทาง**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-009, GS-010 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-006
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/main.ts](GODSEED/src/main.ts) · [GODSEED/src/scenes/camera-plan.ts](GODSEED/src/scenes/camera-plan.ts) · [GODSEED/tests/camera.spec.ts](GODSEED/tests/camera.spec.ts) · [GODSEED/tests/camera.test.ts](GODSEED/tests/camera.test.ts) · [GODSEED/tests/camera-gallery.spec.ts](GODSEED/tests/camera-gallery.spec.ts)
  - หลักฐาน/สถานะจริง: Session11: sixstages/threecurrentlyplayableencounters across4viewports; offense/supportfocus/returncenter/skip/reduced and bounds checked, gallery4/4PASS2.1m; forestphone/streamdesktopruntime reviewed; PRCI42015617056 full58SUCCESS · Bounded12px/450ms camera for current6stages/3encounters; scope excludesfutureunimplementedstages/finalHD/all234VFX/hardware; runtimecodeunchanged fromacceptedPR9/e76c3e4
  - เกณฑ์เสร็จ: boundedpan10–32px/easing350–650ms มีทิศทางต่อเนื่อง skip/reducedปลอดภัย

- [ ] 🟡 กำลังพัฒนา **VIS-012 — Pixel Art UI/icons/logo/spell revealครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-013, GS-015, GS-033 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/src/styles/game.css](GODSEED/src/styles/game.css) · [GODSEED/src/ui/alchemy-panel.ts](GODSEED/src/ui/alchemy-panel.ts)
  - หลักฐาน/สถานะจริง: DOMไทยใช้ได้ แต่inventory/textlogo/nativecontrolsยังไม่ใช่งานภาพUIครบ
  - เกณฑ์เสร็จ: icons/panels/title/reveal original cohesive อ่านชัด ไม่แทนaccessibilityด้วยภาพ

- [ ] 🟡 กำลังพัฒนา **QA-002 — Animation/art consistency/finalvisualreview**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-033 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: VIS-003, VIS-004, VIS-009, MAG-007
  - ไฟล์: [GODSEED/docs/ART_BIBLE.md](GODSEED/docs/ART_BIBLE.md) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts) · [GODSEED/src/scenes/gathering-props.ts](GODSEED/src/scenes/gathering-props.ts) · [GODSEED/tests/gathering.spec.ts](GODSEED/tests/gathering.spec.ts) · [GODSEED/src/scenes/garden-map.ts](GODSEED/src/scenes/garden-map.ts) · [GODSEED/scripts/generate-herb-garden-art.mjs](GODSEED/scripts/generate-herb-garden-art.mjs) · [GODSEED/tests/herb-garden.spec.ts](GODSEED/tests/herb-garden.spec.ts) · [GODSEED/docs/evidence/session16/README.md](GODSEED/docs/evidence/session16/README.md) · [GODSEED/src/scenes/workshop-staging.ts](GODSEED/src/scenes/workshop-staging.ts) · [GODSEED/scripts/generate-koro-art.mjs](GODSEED/scripts/generate-koro-art.mjs) · [GODSEED/tests/koro.spec.ts](GODSEED/tests/koro.spec.ts) · [GODSEED/docs/evidence/session17/README.md](GODSEED/docs/evidence/session17/README.md) · [GODSEED/docs/evidence/session17/REPORT_TH.md](GODSEED/docs/evidence/session17/REPORT_TH.md) · [GODSEED/src/scenes/workshop-map.ts](GODSEED/src/scenes/workshop-map.ts) · [GODSEED/scripts/generate-workshop-art.mjs](GODSEED/scripts/generate-workshop-art.mjs) · [GODSEED/tests/workshop.test.ts](GODSEED/tests/workshop.test.ts) · [GODSEED/tests/workshop.spec.ts](GODSEED/tests/workshop.spec.ts) · [GODSEED/docs/evidence/session18/README.md](GODSEED/docs/evidence/session18/README.md) · [GODSEED/docs/evidence/session18/verification.json](GODSEED/docs/evidence/session18/verification.json) · [GODSEED/docs/evidence/session18/public-layout.json](GODSEED/docs/evidence/session18/public-layout.json)
  - หลักฐาน/สถานะจริง: runtime screenshotsหลายฉากและfour-viewplayerphone/desktopตรวจแล้ว; finalHDทุกฉาก/ทุกNPC/VFXยังไม่ผ่าน; Session13 เพิ่มภาพวัตถุดิบ3ชนิดจากpickup endpointจริง มีviewmodelรางวัลครั้งแรก/รายวันและPNGfallback; local109unit/content2/targeted5PASS; PRCI42053446169/mainCI42056090200 full70SUCCESS และเว็บจริง40PNG/JS/gathering/rewards/saveผ่าน; ไม่ถือว่าทั้งmilestoneเสร็จ งานใหญ่ยังin_progress; รอบ16 0.7.1 สวนต้นฉบับ3เลเยอร์/ซุ้มY-depth/หม้อยา6เฟรม/สมุนไพร4เฟรม/ถนนร่วมAnchor/9Colliders/CH03B1นั่งตามบท; Unit121/Focus20/Build/sourcegate/referencepackingผ่าน local93/PRCI42192866046/mainCI42195039742/เว็บจริงผ่านแล้ว ไม่รับรองfinalHDหรืออุปกรณ์จริง; actualpublic49PNG/JS/สวน/ไฟล์ผ่าน ดูSession16; Session17 Koro32x48/12cells + groundedanvil, hammer/show_recipeตรงCH0401/S05/ReducedMotion/fallback ผ่าน5viewportในFocused12 ส่วนงานใหญ่ยังไม่ครบ; ไม่รับรองfinalHD; ผลสุดท้ายรอบ17 Local/PR/Main full105/Build/Deploy/เว็บจริงผ่าน ดูSession17/REPORT_TH;ไม่ปิดงานใหญ่; รอบ18 0.8.0:WorkshopMap11anchors/10links/7solids,3originallayers,cauldron6frames,toolboxlift,northbrewing,3actualrecipeparts→mix→discovery;skip/motionfinishที่Anchor;Unit134/Focus20/Build/Previewผ่าน;Local113/PRCI42222588626 full113/publiccore+workshop+UI5/59PNG+JSผ่าน;MainCI42225430490 full113/Build/Deployผ่าน;post-Actions59PNG+JSผ่าน;งานใหญ่ยังไม่ครบ
  - เกณฑ์เสร็จ: ทุกscene/actor/cue/effectผ่านrubricและreviewบน3กลุ่มจอ บันทึกหลักฐาน

- [x] ✅ เสร็จสมบูรณ์ **VIS-013 — นำเข้า10ภาพอ้างอิงพร้อม provenance/ติดตาม9ด้านและกันออกจากProduction**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-042 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-006
  - ไฟล์: [assets/reference/godseed/IMPORT_PROVENANCE.json](assets/reference/godseed/IMPORT_PROVENANCE.json) · [GODSEED/scripts/validate-references.mjs](GODSEED/scripts/validate-references.mjs) · [GODSEED/scripts/stage-site.mjs](GODSEED/scripts/stage-site.mjs) · [GODSEED/scripts/roadmap.mjs](GODSEED/scripts/roadmap.mjs)
  - หลักฐาน/สถานะจริง: ตรวจZIPจริง/13originalfiles/SHA256ตรง/10WebP+manifest+README+ContactSheet เปิดContactSheet10และfull01/03; SSOT9ด้านต่อ10สถานที่; validate:referencesหลังbuildและstage-site PASS0conceptfilesในpublic/dist · roadmap7/7 PASS; validate:references PASS10WebP/13checksums; งานนี้รับรองการนำเข้า/การติดตาม/packagingเท่านั้น ไม่ใช่คุณภาพฉาก
  - เกณฑ์เสร็จ: ตรวจ13ไฟล์ตรงSHA/10WebP+manifest/readme/contactsheet; SSOT9ด้านต่อ10สถานที่ ไม่มีreferencesในdistหลังstage-site

- [x] ✅ เสร็จสมบูรณ์ **VIS-014 — ต้นแบบหมู่บ้าน/ใต้ต้นไม้: Anchor routes/idleทิศ/ท่านั่งคงอยู่**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: visual · เชื่อมบอร์ดเดิม: GS-043 · Phaseเดิม: 2 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-006
  - ไฟล์: [GODSEED/src/scenes/scene-definitions.ts](GODSEED/src/scenes/scene-definitions.ts) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/scripts/generate-village-art.mjs](GODSEED/scripts/generate-village-art.mjs) · [GODSEED/scripts/generate-idle-art.mjs](GODSEED/scripts/generate-idle-art.mjs) · [GODSEED/tests/scene-definitions.test.ts](GODSEED/tests/scene-definitions.test.ts) · [GODSEED/tests/locations.spec.ts](GODSEED/tests/locations.spec.ts) · [GODSEED/tests/arrival.spec.ts](GODSEED/tests/arrival.spec.ts)
  - หลักฐาน/สถานะจริง: Source0dc5e59: game105/content2/roadmap7/type/lint/build/packagingPASS; localtarget16/16 PASS3.9m; PRCI42042658772 SUCCESS full65 รวมarrival/import/continuoussit/repeatedbench/revisit/4directions/3battles/oldsave; runtimeภาพสองสถานที่เปิดตรวจแล้ว · รับรองเฉพาะต้นแบบ2สถานที่/เส้นทางที่สร้าง: footcolliders+anchors/4-viewidle/routefollowing/นั่งต่อเนื่อง/เซฟreload-safe; ไม่ใช่finalHD/15actions/NPCหรือ10สถานที่สมบูรณ์
  - เกณฑ์เสร็จ: ต้นแบบ2สถานที่ originallayers/propdepth/footcolliders; choiceเดินถึงน้ำพุหันเหนือ/พักใต้ต้นไม้+ใบไม้/ยืนทิศเดิม/เซฟreload/skip/reduced ผ่าน4viewport และ full regression; ไม่ใช่finalHDหรือแปลงครบ10ฉาก


<a id="phase-11"></a>
## Phase 11 — Endings & World Consequences

- [ ] 🟡 กำลังพัฒนา **STO-005 — หลายเส้นทาง puzzle/mercy/battleถึงบอส**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: GS-026, GS-027 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-001, CMB-006
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/exploration.spec.ts](GODSEED/tests/exploration.spec.ts)
  - หลักฐาน/สถานะจริง: ป่า/ธารมีbypass; ruins/echo/bossยังไม่มี
  - เกณฑ์เสร็จ: mainquestมีทั้งหลบB01–B04และชนะทั้งหมดจนB05 ไม่softlock

- [ ] ⬜ ยังไม่ได้เริ่ม **STO-006 — สามบทสรุปเดิมและฉากจบV6ตามผลสะสม**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: story · เชื่อมบอร์ดเดิม: GS-028 · Phaseเดิม: 3 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-007, STO-001
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: มีเฉพาะspec S23–S27; โค้ด0endings;ขยายเกณฑ์V6 ยังไม่ใช่implementationที่ผ่านแล้ว
  - เกณฑ์เสร็จ: state/scene/art/choiceของ3endingsและepilogueจริง export/importคงending; V6: รักษาFAMILY/COMMUNITY/ARCHIVEเป็นบทสรุปเดิมที่ยังต้องสร้าง และขยายเป้าหมายรวม≈15บทสรุปที่มีความหมายจากLifePath/relations/knowledge/worldchoices ไม่สุ่มผลท้ายเรื่องหรือบังคับเป็นผู้มีพลังสูงสุด


<a id="phase-12"></a>
## Phase 12 — Performance & Quality

- [ ] 🟡 กำลังพัฒนา **QA-001 — UX Thai/dialogue/recipe hints/pacingครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-030, GS-040 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-007, VIS-012
  - ไฟล์: [GODSEED/src/main.ts](GODSEED/src/main.ts) · [GODSEED/tests/alchemy.spec.ts](GODSEED/tests/alchemy.spec.ts)
  - หลักฐาน/สถานะจริง: nativeThai/touch/filterผ่าน; humanplay/pacingยังไม่วัด
  - เกณฑ์เสร็จ: proofreadไทย มีnextobjective ใช้เวลา45–90minสมดุล50:50จากplaytest

- [ ] 🟡 กำลังพัฒนา **QA-003 — ประสิทธิภาพมือถือ/coldload/FPS/graphics profiles**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-012, GS-031 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-06
  - ต้องมี: FND-004, VIS-010
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md) · [GODSEED/docs/evidence/session19/PERFORMANCE.md](GODSEED/docs/evidence/session19/PERFORMANCE.md) · [GODSEED/docs/evidence/session19/profile-ruins.mjs](GODSEED/docs/evidence/session19/profile-ruins.mjs) · [GODSEED/docs/evidence/session19/profile-preview.json](GODSEED/docs/evidence/session19/profile-preview.json)
  - หลักฐาน/สถานะจริง: ไม่มีmeasuredFPS/framebudget/loadprofile; bundle~417kBgzipไม่ใช่FPSproof; รอบ19เริ่มdiagnostic:8s stable ruins CPU1/4,20warmrevisits/0newPNG/DOMคงที่;heap+543988bytesยังต้องตรวจretainers ไม่ใช่physical/FPSacceptance
  - เกณฑ์เสร็จ: วัดcold/warm/memory/longsessionFpsตามSSOTบนphysicalmidrange ลดgraphicsได้

- [ ] ⬜ ยังไม่ได้เริ่ม **QA-004 — เสียง/SFX/musicสิทธิ์/mute/mobileunlock**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-032 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/docs/ASSET_LICENSES.md](GODSEED/docs/ASSET_LICENSES.md) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts)
  - หลักฐาน/สถานะจริง: audio:noAudio:true ไม่มีเสียงproduction
  - เกณฑ์เสร็จ: original/licensed/musicambient/cues มีmute/captions usergestureunlock ไม่เล่นก่อนอนุญาต

- [ ] 🟡 กำลังพัฒนา **QA-005 — Accessibility contrast/focus/font/settings**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-040, GS-031 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-006
  - ไฟล์: [GODSEED/src/styles/game.css](GODSEED/src/styles/game.css) · [GODSEED/src/main.ts](GODSEED/src/main.ts)
  - หลักฐาน/สถานะจริง: nativecontrols/aria/reducedmotionมี; fullaudit/fontscale/settingsยังไม่ครบ
  - เกณฑ์เสร็จ: WCAG2.2AA/44pxtouch/focus/fontscaling/keyboard/สถานะไม่พึ่งสีครบ

- [x] ✅ เสร็จสมบูรณ์ **QA-006 — Automated unit/content/save/balance/browser baseline**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-002, GS-024, GS-031 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003, FND-005
  - ไฟล์: [GODSEED/tests/unit.test.ts](GODSEED/tests/unit.test.ts) · [GODSEED/tests/browser.spec.ts](GODSEED/tests/browser.spec.ts) · [.github/workflows/pages.yml](.github/workflows/pages.yml)
  - หลักฐาน/สถานะจริง: PRCI42042658772 SUCCESS full65 บนsource0dc5e59; localtarget16PASS3.9m และbaseline44b full63PASS14.9m/CI42037332359SUCCESS บันทึกinitialhelper5s failureและการแก้12s/zero-stepไว้ ไม่skipหรือลบassertion · automatedgateกลับมาผ่านแล้ว; latest65ครอบคลุมposehandoff/import/repeatbenchเพิ่มเติม ไม่อ้าง63เก่ารวมcaseใหม่
  - เกณฑ์เสร็จ: รันlockedCIจริงทุกPR มีnegative/storage/migration/gameflow ไม่skipเพื่อเขียว

- [ ] ⬜ ยังไม่ได้เริ่ม **QA-007 — Visual regression golden/diffและ234VFXaudit**
  - ความสำคัญ: P2 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-033, GS-031 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-002
  - ไฟล์: [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts) · [GODSEED/tests/art.test.ts](GODSEED/tests/art.test.ts)
  - หลักฐาน/สถานะจริง: มีscreenshots/assetchecks ไม่ใช่toHaveScreenshotgoldendiff
  - เกณฑ์เสร็จ: baselineapproved pinbrowser/font diffthreshold ตรวจlayout/canvas/VFXและreviewchanges

- [ ] ⬜ ยังไม่ได้เริ่ม **QA-008 — End-to-end12ARC/เส้นทางชีวิต/ผลลัพธ์และrecovery**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-028, GS-031 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: WRD-006, CMB-009, ARC-012, CMB-011, STO-006
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: currenttestsจบsliceเท่านั้น ไม่ใช่chapter
  - เกณฑ์เสร็จ: PATH_FAMILY/COMMUNITY/ARCHIVE/BATTLE_FULL/RECOVERYจริงไม่injectstate;เพิ่มV6ทุกARC/8LifePaths/ผลลัพธ์สำคัญและ15endingเป้าหมายตามscopeที่ส่งมอบ

- [ ] ⛔ ติดข้อจำกัด **QA-009 — Safari/iOS/Android/iPad/desktop physical QA**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-031 · Phaseเดิม: 7 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-006
  - ไฟล์: [GODSEED/docs/QA_MATRIX.md](GODSEED/docs/QA_MATRIX.md)
  - หลักฐาน/สถานะจริง: environmentนี้มีChromiumจำลอง ไม่มีอุปกรณ์จริงหรือSafari; ไม่ใช่บั๊กเกมที่พิสูจน์แล้ว
  - เกณฑ์เสร็จ: มีอุปกรณ์/runnerเป้าหมายและบันทึกactualinput/font/audio/storage/performanceครบ


<a id="phase-13"></a>
## Phase 13 — GODSEED 1.0 — Release Gates

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-001 — เนื้อเรื่อง12ARCและฉากจบที่มีความหมายตามขอบเขตV6**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-028 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: WRD-006, QA-008, ARC-012, STO-006
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: spec§1.1/§16; source0endings; V6ขยายเกณฑ์release ยังไม่เสร็จ
  - เกณฑ์เสร็จ: ทุกARC1–12มีต้น/ตัวเลือก/จุดเปลี่ยน/บทสรุปย่อยและเชื่อมกัน เล่นถึงฉากจบที่แตกต่างตามการตัดสินใจได้จริง เป้าหมาย15แบบต้องปรับด้วยหลักฐานและระบุ scope ที่อนุมัติ

- [ ] 🟡 กำลังพัฒนา **REL-002 — ระบบหลัก8LifePaths/พลัง/สูตร/โลก/ภารกิจ/เซฟครบV6**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-016, GS-023 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-006, CMB-007, WRD-003, FND-005, LIFE-001, LIFE-002, LIFE-003, LIFE-004, LIFE-005, LIFE-006, LIFE-007, LIFE-008, LIFE-009, POWER-001, MAG-010, WRD-009, WRD-010, WRD-011, WRD-012, CMB-011
  - ไฟล์: [GODSEED/docs/TEST_REPORT.md](GODSEED/docs/TEST_REPORT.md)
  - หลักฐาน/สถานะจริง: มีverticalslice/234definitions ไม่ใช่fullsystemsacceptance
  - เกณฑ์เสร็จ: mechanics/targets/quest/level/mastery/saveทั้งหมดผ่านacceptancetests ไม่เปิดAIก็จบได้;8LifePaths/8ระดับความเข้าใจ/สังคมและเศรษฐกิจครบตามV6;234legacyrecipesยังใช้งานและtarget250ผ่านmigration/behavioraudit

- [ ] 🟡 กำลังพัฒนา **REL-003 — ภาพ/VFXผ่านมาตรฐานHD Pixel Art**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-033 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-002, QA-007
  - ไฟล์: [GODSEED/docs/ART_BIBLE.md](GODSEED/docs/ART_BIBLE.md)
  - หลักฐาน/สถานะจริง: ต้นแบบlayeredจริง ไม่ได้finalHDapproved
  - เกณฑ์เสร็จ: finalrubricทุกscene/actor/UI/effectครบไม่มีplaceholderหลัก

- [ ] 🟡 กำลังพัฒนา **REL-004 — ไม่มีบั๊กP0/P1ที่ทราบและregressionคงเขียว**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-002, GS-031 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-008, QA-009
  - ไฟล์: [GODSEED/docs/TEST_REPORT.md](GODSEED/docs/TEST_REPORT.md)
  - หลักฐาน/สถานะจริง: current87/41ผ่าน ไม่พบP0/P1ในslice ไม่ครอบคลุมfullgame
  - เกณฑ์เสร็จ: issueaudit/repro/แก้bugsทั้งหมดcritical และtestsreleasecandidateผ่าน

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-005 — เล่นตั้งแต่เริ่มจนจบจากcleaninstall/oldsave**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-028, GS-035 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-001, REL-002, ARC-012
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: ยังจบบทไม่ได้
  - เกณฑ์เสร็จ: human+automatedfullruns/oldsaveupgrade/reloadทุกcriticalboundaryผ่าน

- [ ] 🟡 กำลังพัฒนา **REL-006 — รองรับphone/iPad/desktopreleaseacceptance**
  - ความสำคัญ: P1 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-031, GS-040 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-003, QA-005, QA-009
  - ไฟล์: [GODSEED/docs/QA_MATRIX.md](GODSEED/docs/QA_MATRIX.md)
  - หลักฐาน/สถานะจริง: สิบChromiumsizesผ่าน; physical/safariยังblocked
  - เกณฑ์เสร็จ: supportedbrowser/device/orientationทุกกลุ่มผ่านreleasechecklist

- [ ] 🟡 กำลังพัฒนา **REL-007 — Production Build/lockfile/dependencies releasecandidate**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-002 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-002, REL-003
  - ไฟล์: [GODSEED/package-lock.json](GODSEED/package-lock.json) · [.github/workflows/pages.yml](.github/workflows/pages.yml)
  - หลักฐาน/สถานะจริง: 0.4.1productionผ่าน แต่ยังไม่ใช่1.0RC
  - เกณฑ์เสร็จ: 1.0RC npmci/type/lint/content/unit/e2e/buildผ่าน bundlebudget/licensechecked

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-008 — เผยแพร่1.0 GitHub Pagesพร้อมrollback**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-003 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-007, REL-004
  - ไฟล์: [.github/workflows/pages.yml](.github/workflows/pages.yml)
  - หลักฐาน/สถานะจริง: 0.4.1เผยแพร่แล้ว; ไม่มี1.0tag/artifact
  - เกณฑ์เสร็จ: tag1.0+greenCI/artifact/pages สำรองreleaseก่อนหน้าและวิธีrollbackไม่ลบเซฟ

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-009 — ตรวจเวอร์ชัน1.0บนเว็บจริง/endings/save/art**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-003, GS-031 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-008, REL-005, REL-006
  - ไฟล์: [GODSEED/scripts/verify-public.mjs](GODSEED/scripts/verify-public.mjs)
  - หลักฐาน/สถานะจริง: publicverifierใช้กับslice; fullchapterpublicยังไม่มี
  - เกณฑ์เสร็จ: verifypublichash/assets/gameplay/endings/saveและphysicalacceptanceบน1.0URL

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-010 — พร้อม1.0และhandoff/knownissues/release notes**
  - ความสำคัญ: P0 · ขอบเขต: v1 · ด้าน: quality · เชื่อมบอร์ดเดิม: GS-003, GS-028 · Phaseเดิม: 8 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-001, REL-002, REL-003, REL-004, REL-005, REL-006, REL-007, REL-008, REL-009, QA-004
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: ยังไม่ใช่1.0; AI/CH2/CH3ไม่ใช่gate1.0
  - เกณฑ์เสร็จ: gates1.0ครบ reviewscope/credits/ownerphoneinstructions/knownissues/log/docsตรงrelease

