# GODSEED MASTER ROADMAP

อัปเดต 2026-11-05 UTC · ตรวจจาก base commit `bda8f51` และงานรอบล่าสุดใน [Development Log](GODSEED/docs/DEVELOPMENT_LOG.md)

Source of truth ของสถานะ: [roadmap.json](GODSEED/docs/roadmap.json) · สร้างด้วย `npm --prefix GODSEED run roadmap:update` · ตรวจด้วย `npm --prefix GODSEED run roadmap:check`

## ขอบเขตและวิธีนับ

1.0 ตาม SSOT §1.1/§16 = บทแรกครบสามบทสรุป + ระบบหลัก + คุณภาพและการเผยแพร่ CH2/CH3/เขตเมืองเป็นหลัง1.0; AIเป็นระบบเสริมหลังเกมหลักเสถียร ไม่ใช่เงื่อนไขให้เริ่มเล่นหรือออก1.0 ไม่เพิ่มopen world/free-roam

ทุกงานน้ำหนัก1: เปอร์เซ็นต์ = จำนวน✅ ÷ จำนวนงาน ×100; 🟡/⬜/🔴/⛔ได้0 ไม่มีpartialเครดิต ตัวเลขเป็นความคืบหน้าของChecklistเท่านั้น ไม่ใช่เวลาที่เหลือ ปริมาณแรงงาน ความสนุก หรือคุณภาพภาพของเกมทั้งหมด งานขนาดต่างกันและรายการอาจเพิ่มได้ ต้องอ่านพร้อมจำนวนงานและlog

**ความคืบหน้ารวม Checklist: 24.3% (18/74)** · เฉพาะขอบเขต1.0: 25.4% (18/71)

| ขอบเขต | งานทั้งหมด | ✅ | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ทั้งโครงการ | 74 | 18 | 39 | 16 | 0 | 1 | 24.3% |
| 1.0 | 71 | 18 | 39 | 13 | 0 | 1 | 25.4% |
| หลัง1.0/เสริม | 3 | 0 | 0 | 3 | 0 | 0 | 0% |

| Phase | ✅ / ทั้งหมด | 🟡 | ⬜ | 🔴 | ⛔ | Checklist |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| [1 — โครงสร้างพื้นฐาน](#phase-1) | 7/9 | 2 | 0 | 0 | 0 | 77.8% |
| [2 — งานภาพ Pixel Art HD](#phase-2) | 3/12 | 9 | 0 | 0 | 0 | 25% |
| [3 — ระบบเนื้อเรื่อง](#phase-3) | 1/8 | 5 | 2 | 0 | 0 | 12.5% |
| [4 — ระบบเวทมนตร์](#phase-4) | 3/9 | 6 | 0 | 0 | 0 | 33.3% |
| [5 — ระบบต่อสู้](#phase-5) | 3/9 | 4 | 2 | 0 | 0 | 33.3% |
| [6 — โลกและเนื้อหาขนาดใหญ่](#phase-6) | 0/8 | 5 | 3 | 0 | 0 | 0% |
| [7 — คุณภาพเกม](#phase-7) | 1/9 | 3 | 4 | 0 | 1 | 11.1% |
| [8 — เกมฉบับสมบูรณ์](#phase-8) | 0/10 | 5 | 5 | 0 | 0 | 0% |

## กฎสถานะ/หลักฐาน

✅ = สร้างจริงและผ่านเกณฑ์เฉพาะงาน; 🟡 = เริ่มแล้วแต่ยังไม่ครบ/ยังไม่ยืนยัน; ⬜ = มีแผนหรือสเปกแต่ยังไม่มีimplementation; 🔴 = มีระบบแต่พบfailureที่ทำซ้ำได้; ⛔ = ระบุข้อจำกัดที่ต้องปลดก่อน ไม่ใช้แทนข้ออ้างงานยาก

เอกสารออกแบบจากChatGPT/SSOTไม่ใช่หลักฐานว่าCodexสร้างเกมแล้ว งานที่อ้างspecอย่างเดียวจึงยังไม่✅ ผลการทดสอบเก่าในTEST_REPORTมีรุ่น/commitกำกับ ไม่ใช่การรับรองฟีเจอร์ที่ยังไม่สร้าง Dependenciesคือระบบที่ต้องมีเพื่อส่งมอบ; งานใหญ่ที่กำลังทำอาจมีsubsystemที่ผ่านแล้ว แต่ห้ามถือว่าgateรวมผ่านตามไปด้วย

ValidatorตรวจID/dependency cycle/ไฟล์หลักฐานและเอกสารstale ไม่สามารถพิสูจน์ข้อความอ้างว่าเสร็จแทนผู้พัฒนา ต้องรันทดสอบที่เกี่ยวข้องก่อนเปลี่ยนสถานะ หากregressionเกิดให้เปลี่ยนเป็น🔴 พร้อมreproและแก้ก่อนขยาย งานที่ขาดอุปกรณ์ให้คง⛔/ยังไม่ยืนยัน

## กระบวนการทุกรอบ

ตรวจRoadmap/โค้ด/เซฟ/CI → เลือกงานตามpriority+dependency → ทำโค้ด/ภาพ → ทดสอบ → อัปเดตJSONพร้อมหลักฐาน → สร้างRoadmap/Task Boardใหม่ → เพิ่มDevelopment Log → ตรวจroadmap:check → commit/PR/deployตามสิทธิ์ → บันทึกผลเว็บจริง ห้ามแก้เปอร์เซ็นต์หรือไฟล์generatedด้วยมือ

บอร์ดเดิมเชื่อมผ่าน legacy GS IDs ด้านล่าง ไม่ใช้บอร์ดสองชุดเป็นตัวหารซ้ำ ประวัติเดิมคงในGitและTEST_REPORT; [TASK_BOARD](GODSEED/docs/TASK_BOARD.md)เป็นมุมมองย่อจากข้อมูลชุดเดียว

<a id="phase-1"></a>
## Phase 1 — โครงสร้างพื้นฐาน

- [x] ✅ เสร็จสมบูรณ์ **FND-001 — โครงสร้าง Phaser/TypeScript/Vite แยกชั้นระบบ**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-001, GS-002 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: ไม่มี
  - ไฟล์: [GODSEED/package.json](GODSEED/package.json) · [GODSEED/src/main.ts](GODSEED/src/main.ts)
  - หลักฐาน/สถานะจริง: test:all รุ่น0.4.1 และbaselineรอบ7ผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ติดตั้งจากlockfile typecheck/lint/buildได้ และแยกengine/content/systems/scenes/ui

- [x] ✅ เสร็จสมบูรณ์ **FND-002 — เริ่มเกมใหม่ เล่นต่อ และตั้งชื่อ**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-001 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/main.ts](GODSEED/src/main.ts) · [GODSEED/tests/browser.spec.ts](GODSEED/tests/browser.spec.ts)
  - หลักฐาน/สถานะจริง: browser golden paths และstorage tests ผ่านในCI41992926513 · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: เริ่ม/เล่นต่อ/ยืนยันเริ่มใหม่ได้ ไม่ลบเซฟเงียบ

- [x] ✅ เสร็จสมบูรณ์ **FND-003 — Scene/Choice engine และตรวจgraphของเนื้อหาที่มี**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-004, GS-011 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/content.test.ts](GODSEED/tests/content.test.ts)
  - หลักฐาน/สถานะจริง: content2 และ56unique choices/17scenes ตรวจจากinspect:content · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: IDsไม่ซ้ำ targetมีจริง เงื่อนไขUI/reducerตรงกัน ฉากที่เปิดไม่มีทางตัน

- [ ] 🟡 กำลังพัฒนา **FND-004 — Asset loader/fallback/retry และแบ่งโหลดตามสถานที่**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-001, GS-012 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts)
  - หลักฐาน/สถานะจริง: มีPNG fallbackและwarning ทดสอบabortedPNG; ยังpreloadทั้งหมดไม่มีretryครบ
  - เกณฑ์เสร็จ: โหลดผิดพลาดกู้ได้ไม่deadlock วัดbudget cold/warm และแบ่งโหลดอย่างปลอดภัย

- [x] ✅ เสร็จสมบูรณ์ **FND-005 — IndexedDB autosave/recovery/import/export/migration**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-005, GS-035 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/engine/save.ts](GODSEED/src/engine/save.ts) · [GODSEED/tests/save.test.ts](GODSEED/tests/save.test.ts) · [GODSEED/tests/storage.spec.ts](GODSEED/tests/storage.spec.ts)
  - หลักฐาน/สถานะจริง: save regression/storage/checksum/V1 roundtrip ผ่าน; TEST_REPORT Session2–6 · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: transaction atomic เซฟเสียใช้backup quotaใช้memoryพร้อมexport เก็บV1ต้นฉบับ

- [ ] 🟡 กำลังพัฒนา **FND-006 — Responsive phone/iPad/desktop touch/keyboard**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-006, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-002
  - ไฟล์: [GODSEED/src/styles/game.css](GODSEED/src/styles/game.css) · [GODSEED/tests/browser.spec.ts](GODSEED/tests/browser.spec.ts)
  - หลักฐาน/สถานะจริง: สิบviewport Chromiumผ่าน; Safari/อุปกรณ์จริงยังไม่ยืนยัน
  - เกณฑ์เสร็จ: ทุกอุปกรณ์เป้าหมายและสองแนวใช้ได้ safe area/font/touch/focus ไม่ล้นหรือบังคับหมุน

- [x] ✅ เสร็จสมบูรณ์ **FND-007 — GitHub Actions และ Pages base path**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-002, GS-003 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [.github/workflows/pages.yml](.github/workflows/pages.yml) · [GODSEED/scripts/verify-public.mjs](GODSEED/scripts/verify-public.mjs)
  - หลักฐาน/สถานะจริง: main41992926513/public0.4.1 byte+gameplay proof · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: CIกั้นdeployเมื่อfail /alltest/และเว็บจริงโหลด/เล่น/เซฟได้

- [x] ✅ เสร็จสมบูรณ์ **FND-008 — Deterministic RNG และ immutable transactions**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-004 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts) · [GODSEED/tests/unit.test.ts](GODSEED/tests/unit.test.ts)
  - หลักฐาน/สถานะจริง: unit/combat rollbackและseed testsผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ผลเหมือนเดิมเมื่อseed/actionsเหมือนกัน invalid commandไม่เปลี่ยนstate

- [x] ✅ เสร็จสมบูรณ์ **FND-009 — Roadmap คำนวณได้ เชื่อมบอร์ดและDevelopment Log**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-041 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003
  - ไฟล์: [GODSEED/scripts/roadmap.mjs](GODSEED/scripts/roadmap.mjs) · [GODSEED/docs/roadmap.json](GODSEED/docs/roadmap.json)
  - หลักฐาน/สถานะจริง: roadmap6/6 PASS รวมnegative metadata/counting/queue; DONEไม่กลับไปห้างานถัดไปและregressionsขึ้นก่อน; same74taskdataset · generatedchecklistตรง18/74; integratedtest:all/CI; 03/AGENTS/devlogเดิมใช้ต่อไม่สร้างซ้ำ
  - เกณฑ์เสร็จ: ID/dependency/evidence valid ไม่มีcycle เอกสารไม่stale ตรวจในCI มีlogทุกsession


<a id="phase-2"></a>
## Phase 2 — งานภาพ Pixel Art HD

- [ ] 🟡 กำลังพัฒนา **VIS-001 — Art Bible/palette/pixel grid/สิทธิ์ครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-007, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/docs/ART_BIBLE.md](GODSEED/docs/ART_BIBLE.md) · [GODSEED/docs/ASSET_LICENSES.md](GODSEED/docs/ASSET_LICENSES.md)
  - หลักฐาน/สถานะจริง: original generators39PNG; visual gateยังไม่ผ่าน
  - เกณฑ์เสร็จ: palette/metrics/rights/lighting/atlasมาตรฐานเดียวและreviewจริงครบฉาก

- [x] ✅ เสร็จสมบูรณ์ **VIS-002 — Hero atlas 11 named action cycles**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-007 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-001
  - ไฟล์: [GODSEED/src/scenes/actor-art.ts](GODSEED/src/scenes/actor-art.ts) · [GODSEED/tests/art.test.ts](GODSEED/tests/art.test.ts)
  - หลักฐาน/สถานะจริง: 56frames/11cycles alpha/bounds/uniqueposesผ่านในart tests · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: idle/walk/run/interact/pick/craft/cast/guard/hit/victory/restมีเฟรมจริง runtimeใช้manifest

- [x] ✅ เสร็จสมบูรณ์ **VIS-003 — การเดินสี่ทิศทางพร้อมturn/foot alignment**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-007, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-002
  - ไฟล์: [GODSEED/scripts/generate-directional-art.mjs](GODSEED/scripts/generate-directional-art.mjs) · [GODSEED/src/scenes/directional-art.ts](GODSEED/src/scenes/directional-art.ts) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/directional.spec.ts](GODSEED/tests/directional.spec.ts) · [GODSEED/tests/art.test.ts](GODSEED/tests/art.test.ts)
  - หลักฐาน/สถานะจริง: 24originalframes/fourviews; gameunit94/94, focus17/17 PASS2.4m รวม4viewports/reload/skip/reduced/newPNGfallback; phone/desktopruntime reviewed · facing/foot/depth/shadowจากactualUIchoices ตรวจครบ4ทิศ ไม่มีflipแทนหน้า/หลัง; regenerate40PNGผ่าน old39byte-identical; ไม่ใช่finalHDหรือNPCacceptance
  - เกณฑ์เสร็จ: สี่ทิศมีoriginalframesตามเส้นทาง ไม่ใช้flipแทนหน้า/หลัง ตรวจบนสามกลุ่มจอ

- [ ] 🟡 กำลังพัฒนา **VIS-004 — NPC/ศัตรู silhouette และท่าพิเศษครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-007, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/src/scenes/exploration-art.ts](GODSEED/src/scenes/exploration-art.ts) · [GODSEED/scripts/generate-exploration-art.mjs](GODSEED/scripts/generate-exploration-art.mjs)
  - หลักฐาน/สถานะจริง: Eira/wisp/trainingมีoriginalcycles; NPCเก่ายังsharedbase
  - เกณฑ์เสร็จ: Lumi/Maren/Koro/Pip/Eira/Sentinelมีidle/walk/talk/emote/handและspecialตามspec

- [ ] 🟡 กำลังพัฒนา **VIS-005 — ยืน วิ่ง นั่ง และปฏิสัมพันธ์ตามวัตถุ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-007, GS-010 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-002
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/scenes/cinematic-paths.ts](GODSEED/src/scenes/cinematic-paths.ts)
  - หลักฐาน/สถานะจริง: มีrest/run/interact poses; รอบ7นั่งม้านั่ง/approachและsupportdepthผ่าน แต่runยังไม่มีstorychoiceจริง/ปฏิสัมพันธ์ยังไม่ครบ
  - เกณฑ์เสร็จ: ท่าทางทุกcueตรงวัตถุ/พื้น มีเหตุการณ์นั่งและวิ่งที่ใช้จริง ไม่เพียงมีsheet

- [x] ✅ เสร็จสมบูรณ์ **VIS-006 — Director: authored paths → interaction → commit/skip**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-010 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003, VIS-002
  - ไฟล์: [GODSEED/src/scenes/cinematic-paths.ts](GODSEED/src/scenes/cinematic-paths.ts) · [GODSEED/tests/cinematics.spec.ts](GODSEED/tests/cinematics.spec.ts)
  - หลักฐาน/สถานะจริง: คืนcast/craft1120/1600msและskipก่อนscreenshot; final full45/45 PASS8.4m; PR CI41997711472 SUCCESS รวมtouch4และWINDskip; Session8four-view integration/pace/skip/reduced/fallback focus17PASS · Unitcinematics3 + full45ผ่านหลังแก้ ทุกcaseไม่skip; reviewedbench390/1366; source95c3637/PR7/merge7279cea; ไม่ใช่fullcamera/4direction/HDgate; mainCI41998656125/public2372e798…/post-deployassetgate PASS
  - เกณฑ์เสร็จ: เดินถึงจุดก่อนเก็บ/นั่ง skip/toggle/reloadไม่ซ้ำผล ทดสอบphone/iPadสองแนว/desktop

- [ ] 🟡 กำลังพัฒนา **VIS-007 — Fixed Map และเมนูเส้นทาง/ตำแหน่งที่ปลดล็อก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-029 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003, VIS-006
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/ui/memory-panel.ts](GODSEED/src/ui/memory-panel.ts)
  - หลักฐาน/สถานะจริง: มีhub/สถานที่อื่น/scene IDs; ยังไม่มีroute map
  - เกณฑ์เสร็จ: แสดงแผนที่คงที่+เส้นทางที่รู้จัก ล็อกมีเหตุผลและไปกลับได้ด้วยtouch

- [ ] 🟡 กำลังพัฒนา **VIS-008 — ฉากหมู่บ้าน ป่า โรงช่าง หอสมุด ลำธาร โบราณสถาน เทศกาล**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-008, GS-009 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/src/scenes/stage-layout.ts](GODSEED/src/scenes/stage-layout.ts) · [GODSEED/scripts/generate-stage-art.mjs](GODSEED/scripts/generate-stage-art.mjs)
  - หลักฐาน/สถานะจริง: 6layered stagesจริง; ruins/festivalยังไม่มี
  - เกณฑ์เสร็จ: ครบสถานที่บท1และbattle variants ใช้tile/props/layersสัมพันธ์กัน

- [ ] 🟡 กำลังพัฒนา **VIS-009 — ฉากมีมิติ แสงเงา และocclusionขั้นสุดท้าย**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-008, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-008
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/scenes/stage-layout.ts](GODSEED/src/scenes/stage-layout.ts)
  - หลักฐาน/สถานะจริง: มีY-depth/contactshadows/3layers; advancedlightingยังต้นแบบ
  - เกณฑ์เสร็จ: reviewactualruntimeทุกฉาก foot/propไม่ทะลุ depth/time-lightสอดคล้องภาพหลัก

- [ ] 🟡 กำลังพัฒนา **VIS-010 — สิ่งแวดล้อมเคลื่อนไหวและpresetลดกราฟิก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-012, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-008
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/scenes/exploration-art.ts](GODSEED/src/scenes/exploration-art.ts)
  - หลักฐาน/สถานะจริง: water6f/leaf/cloud/fire/glowและreduced motionมี; lowpresetยังไม่มี
  - เกณฑ์เสร็จ: อย่างน้อย3detailsต่อฉาก budgetวัดได้ preset/reduced/hiddenไม่ทำให้เกมผิด

- [ ] 🟡 กำลังพัฒนา **VIS-011 — กล้อง Cinematic และtransitionตามทิศทาง**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-009, GS-010 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-006
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/src/main.ts](GODSEED/src/main.ts)
  - หลักฐาน/สถานะจริง: มีfadeและparallax6px; ยังไม่ใช่กล้องpanตามSSOT
  - เกณฑ์เสร็จ: boundedpan10–32px/easing350–650ms มีทิศทางต่อเนื่อง skip/reducedปลอดภัย

- [ ] 🟡 กำลังพัฒนา **VIS-012 — Pixel Art UI/icons/logo/spell revealครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-013, GS-015, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/src/styles/game.css](GODSEED/src/styles/game.css) · [GODSEED/src/ui/alchemy-panel.ts](GODSEED/src/ui/alchemy-panel.ts)
  - หลักฐาน/สถานะจริง: DOMไทยใช้ได้ แต่inventory/textlogo/nativecontrolsยังไม่ใช่งานภาพUIครบ
  - เกณฑ์เสร็จ: icons/panels/title/reveal original cohesive อ่านชัด ไม่แทนaccessibilityด้วยภาพ


<a id="phase-3"></a>
## Phase 3 — ระบบเนื้อเรื่อง

- [ ] 🟡 กำลังพัฒนา **STO-001 — เนื้อเรื่องหลักบท1ตามScene/Choice canonครบ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-025, GS-026, GS-027, GS-028 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: 17ฉาก56choices; introบางตัวเลือกและS15–S27/S29ยังขาด
  - เกณฑ์เสร็จ: canonicalchapter1ครบมีทางเล่นจบและกลับสำรวจ ทุกทางหลักผ่านgraph/golden paths

- [x] ✅ เสร็จสมบูรณ์ **STO-002 — Branch conditions/effects ที่มีผลจริง**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-004, GS-011 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003, FND-008
  - ไฟล์: [GODSEED/src/engine/conditions.ts](GODSEED/src/engine/conditions.ts) · [GODSEED/tests/exploration.test.ts](GODSEED/tests/exploration.test.ts)
  - หลักฐาน/สถานะจริง: WIND bypass/ORgate/allarchivebranches/one-time rewardผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: conditions/effectsร่วมกัน ไม่มีให้ของฟรีซ้ำ เลือกต่างแล้วflags/trust/worldตอบจริง

- [ ] 🟡 กำลังพัฒนา **STO-003 — NPC memories/ความสัมพันธ์ตลอดบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-011, GS-039 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-002
  - ไฟล์: [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts) · [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts)
  - หลักฐาน/สถานะจริง: มีtrustและEira/Marenrememberedlines; ยังไม่ครบทุกNPC/ตอนจบ
  - เกณฑ์เสร็จ: เหตุการณ์สำคัญถูกจำหลังreload trustมีทางเลือกและสะท้อนdialogue/worldทั้งบท

- [ ] 🟡 กำลังพัฒนา **STO-004 — เหตุการณ์ตามสถานที่/เวลา/ทางเลือก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-011, GS-030 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-002
  - ไฟล์: [GODSEED/src/systems/game.ts](GODSEED/src/systems/game.ts) · [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: ticks3/day/dailygatheringมี; schedule/lighting/ทุกeventยังไม่ครบ
  - เกณฑ์เสร็จ: rulepriority/time/locationถูกต้อง mainquestไม่ติดschedule และvisualตามช่วงเวลา

- [ ] 🟡 กำลังพัฒนา **STO-005 — หลายเส้นทาง puzzle/mercy/battleถึงบอส**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-026, GS-027 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-001, CMB-006
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/exploration.spec.ts](GODSEED/tests/exploration.spec.ts)
  - หลักฐาน/สถานะจริง: ป่า/ธารมีbypass; ruins/echo/bossยังไม่มี
  - เกณฑ์เสร็จ: mainquestมีทั้งหลบB01–B04และชนะทั้งหมดจนB05 ไม่softlock

- [ ] ⬜ ยังไม่ได้เริ่ม **STO-006 — สามตอนจบ FAMILY/COMMUNITY/ARCHIVE**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-028 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-007, STO-001
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: มีเฉพาะspec S23–S27; โค้ด0endings
  - เกณฑ์เสร็จ: state/scene/art/choiceของ3endingsและepilogueจริง export/importคงending

- [ ] 🟡 กำลังพัฒนา **STO-007 — Journal/recap/Thai pacingและfact audit**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-029, GS-030 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-003
  - ไฟล์: [GODSEED/src/ui/memory-panel.ts](GODSEED/src/ui/memory-panel.ts) · [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts)
  - หลักฐาน/สถานะจริง: clues/hints/bell-vs-mistจริง; map/recap/50:50humanplayยังไม่ยืนยัน
  - เกณฑ์เสร็จ: บันทึกเฉพาะfactที่เกิด ข้อความไทยproofread recapครบ วัดpacing45–90min/50:50

- [ ] ⬜ ยังไม่ได้เริ่ม **STO-008 — Optional AI ขอบเขตชัด/opt-in/localfallback**
  - ความสำคัญ: P3 · ขอบเขต: optional · เชื่อมบอร์ดเดิม: GS-034 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-001, REL-002
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: ไม่มีAIruntime/API key; เกมหลักเล่นlocal
  - เกณฑ์เสร็จ: AIเปลี่ยนเฉพาะภาษา outputvalidate/timeout/fallback ไม่มีstatewrite/keysในclient


<a id="phase-4"></a>
## Phase 4 — ระบบเวทมนตร์

- [ ] 🟡 กำลังพัฒนา **MAG-001 — Catalog8core/6form/7modพร้อมตัวเร่ง5และหมวดกระเป๋า**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-013 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/src/main.ts](GODSEED/src/main.ts)
  - หลักฐาน/สถานะจริง: 8/6/7catalogมี; catalyst/ไอคอน/หมวดยังไม่ครบ
  - เกณฑ์เสร็จ: ทุกรายการชื่อ/description/source/rarity/icon/categoryรวม5catalystsไม่ใช้questitemผิด

- [ ] 🟡 กำลังพัฒนา **MAG-002 — แหล่งวัตถุดิบ/ค้นพบ/reachabilityทั้งบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-013, GS-026 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-001, STO-001
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/exploration.test.ts](GODSEED/tests/exploration.test.ts)
  - หลักฐาน/สถานะจริง: จริง5สูตรจากstory; unit234ใช้fixtureของครบไม่ใช่storyaccess
  - เกณฑ์เสร็จ: essentialmaterialsมีrouteไม่grind daily/rare/endgameหาได้ ตรวจscriptreachability

- [x] ✅ เสร็จสมบูรณ์ **MAG-003 — ตัวสร้าง/validatorสูตร234 stableIDs**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-014 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-008
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/tests/unit.test.ts](GODSEED/tests/unit.test.ts)
  - หลักฐาน/สถานะจริง: 336candidates234legal/unique/permodcountsผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: คำนวณกฎตามSSOTครบ rejectillegal ไม่เขียนชื่อ234สูตรหลอก

- [x] ✅ เสร็จสมบูรณ์ **MAG-004 — Craft transaction/preview/consume-once**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-015 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-003, FND-005
  - ไฟล์: [GODSEED/src/ui/alchemy-panel.ts](GODSEED/src/ui/alchemy-panel.ts) · [GODSEED/tests/alchemy.test.ts](GODSEED/tests/alchemy.test.ts) · [GODSEED/tests/alchemy.spec.ts](GODSEED/tests/alchemy.spec.ts)
  - หลักฐาน/สถานะจริง: 87unit/41browserCI0.4.1; invalid/knownไม่consume · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ตรวจของครบก่อนใช้ ชื่อunknownซ่อน พลัง/MP/ของขาดถูกต้อง กดซ้ำไม่เสียของ

- [x] ✅ เสร็จสมบูรณ์ **MAG-005 — สมุดเวทกรองธาตุ/ประเภท/MPและ4ช่องequip/unequip**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-017 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-004
  - ไฟล์: [GODSEED/src/ui/alchemy-panel.ts](GODSEED/src/ui/alchemy-panel.ts) · [GODSEED/tests/alchemy.spec.ts](GODSEED/tests/alchemy.spec.ts)
  - หลักฐาน/สถานะจริง: realtouch/filter/emptyloadout/reload/checksumผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: แสดงเฉพาะknown ไม่ซ้ำ4ช่อง เปลี่ยนนอกbattle ถอดไม่ลืมสูตร เซฟเข้ากันได้

- [ ] 🟡 กำลังพัฒนา **MAG-006 — Core/Form/Mod behavior/mastery/targetsครบ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-016, GS-020 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-003, CMB-001
  - ไฟล์: [GODSEED/src/systems/spells.ts](GODSEED/src/systems/spells.ts) · [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts)
  - หลักฐาน/สถานะจริง: 234finite single-targetfixtureผ่าน; mastery/party/multitargetไม่มี
  - เกณฑ์เสร็จ: category/power/MP/status/ward/multi-targetตามspec mastery0–3มีearnedupgrade/migrationtests

- [ ] 🟡 กำลังพัฒนา **MAG-007 — VFX composerแยกตามสูตรและtarget**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-018, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-006, VIS-009
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts)
  - หลักฐาน/สถานะจริง: color/form/modparticlesและsupport/sceneanchorsมี; ยังไม่มี234distinctnessgate
  - เกณฑ์เสร็จ: 6representativegoldensและ234descriptor/renderaudit แยกSPLIT/SEEK/AMPLIFY/statusชัดในbudget

- [ ] 🟡 กำลังพัฒนา **MAG-008 — ใช้เวทแก้เหตุการณ์เนื้อเรื่องครบ**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-026 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-005, STO-002
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/tests/exploration.spec.ts](GODSEED/tests/exploration.spec.ts)
  - หลักฐาน/สถานะจริง: knownWINDclearmist+sceneVFXจริง; shrineCH1302ยังขาด
  - เกณฑ์เสร็จ: WIND/BLOOM/ECHO/รูนตามcanonicalconditionsมีeffectsจริง fallbackไม่ติด

- [ ] 🟡 กำลังพัฒนา **MAG-009 — สมดุลเวทตลอดบทและแหล่งเติมMP**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-016, GS-024 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-006, CMB-007
  - ไฟล์: [GODSEED/tests/balance.test.ts](GODSEED/tests/balance.test.ts) · [GODSEED/docs/BALANCE.md](GODSEED/docs/BALANCE.md)
  - หลักฐาน/สถานะจริง: 900earlyloop wins3encounters; ไม่ครอบคลุมB03–05/mastery
  - เกณฑ์เสร็จ: seedpoliciesทั้งบทใช้หลายประเภทได้ไม่softlock MP0 viable curvesรายงานไม่ใช้fixtureแทนrouteจริง


<a id="phase-5"></a>
## Phase 5 — ระบบต่อสู้

- [x] ✅ เสร็จสมบูรณ์ **CMB-001 — Turn-based reducer HP/MP/guard/basic**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-019, GS-020 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-008
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: singleenemy turns/status/finiteward/MP0ผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: แต่ละcommandใช้เทิร์นถูกต้อง ค่าไม่ติดลบ guard/basicให้ทางรอด เซฟระหว่างเทิร์นได้

- [ ] 🟡 กำลังพัฒนา **CMB-002 — ความสามารถ/XP/level/party supportตามscope**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-016, GS-020 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-001, MAG-006
  - ไฟล์: [GODSEED/src/engine/state.ts](GODSEED/src/engine/state.ts) · [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts)
  - หลักฐาน/สถานะจริง: XPมีแต่ยังไม่level/mastery; playerเดี่ยว
  - เกณฑ์เสร็จ: earnedlevels/stats/caps/targetingของformตรงspec migrationรักษาXPเก่า

- [x] ✅ เสร็จสมบูรณ์ **CMB-003 — AIเชิงกฎ intent/telegraphของBT/B01/B02**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-020, GS-022 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-001
  - ไฟล์: [GODSEED/src/content/encounters.ts](GODSEED/src/content/encounters.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: B02mistprelocked/turnrulesและintent testsผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: แสดงก่อนเลือก ผลตรงintentไม่มีsurprise threshold override

- [ ] 🟡 กำลังพัฒนา **CMB-004 — ใช้เวท4ช่อง/ธาตุ/status interactionsทั้งหมด**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-016, GS-018, GS-020 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-005, CMB-001
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/combat.test.ts](GODSEED/tests/combat.test.ts)
  - หลักฐาน/สถานะจริง: SEAR/WET/WIND/LIGHT/VEIL/wardsมี; multipleenemiesยังไม่มี
  - เกณฑ์เสร็จ: ทุกform/mod/coreและexpiry/immunity/targetsตามspec มีcounterที่เข้าถึงได้

- [x] ✅ เสร็จสมบูรณ์ **CMB-005 — ไอเทม หนี ยอมแพ้ recoveryของencountersที่เปิด**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-019, GS-021 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-001, FND-005
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/training.spec.ts](GODSEED/tests/training.spec.ts)
  - หลักฐาน/สถานะจริง: potion/mana/flee/surrender/defeat/checkpoint/reloadผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: ตามกฎencounter consumeครั้งเดียว rewardไม่ซ้ำ lossกลับเตรียมตัวได้

- [ ] ⬜ ยังไม่ได้เริ่ม **CMB-006 — B03/B04พร้อมAI/rules/art/rewards/conditionalflee**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-022, GS-026, GS-027 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-003, VIS-008
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: spec66/76HPและrulesมี โค้ดcatalogยังไม่มี
  - เกณฑ์เสร็จ: B03wardturn3/B04copytelegraph EIRAconditionalflee balance/truepathsผ่าน

- [ ] ⬜ ยังไม่ได้เริ่ม **CMB-007 — B05 guardian3phases/assist25%/immunity**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-023 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: CMB-006, MAG-005
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: 150HP/3phasesออกแบบแล้ว ยังไม่มีbosscode
  - เกณฑ์เสร็จ: ครบscript/phase warning/disablelimit/assist/retry/rewards เชื่อมS23หลังชนะ

- [ ] 🟡 กำลังพัฒนา **CMB-008 — Battle animation/defeat/reactionไม่text-only**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-007, GS-018, GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-004, CMB-001
  - ไฟล์: [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts)
  - หลักฐาน/สถานะจริง: hero/foeattack/hit/win/loss/sceneanchoredมี; finalVFX/enemiesยังต้นแบบ
  - เกณฑ์เสร็จ: ทุกencounterมีwarn/attack/react/defeatตามผลจริง supportยิงถูกฝ่าย visualgateผ่าน

- [ ] 🟡 กำลังพัฒนา **CMB-009 — ผลชนะ/แพ้/เลี่ยงเชื่อมเรื่องทั้งบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-021, GS-028 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-005, CMB-007
  - ไฟล์: [GODSEED/src/systems/combat.ts](GODSEED/src/systems/combat.ts) · [GODSEED/tests/exploration.spec.ts](GODSEED/tests/exploration.spec.ts)
  - หลักฐาน/สถานะจริง: 3encountersกลับstory flags/rewardsจริง
  - เกณฑ์เสร็จ: B01–B05และbypassทุกทางกลับcanon flags/trust/endingถูกต้องไม่ซ้ำรางวัล


<a id="phase-6"></a>
## Phase 6 — โลกและเนื้อหาขนาดใหญ่

- [ ] 🟡 กำลังพัฒนา **WRD-001 — สถานที่/เส้นทางบท1ครบและย้อนกลับได้**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-025, GS-026, GS-027, GS-028 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-001, VIS-008
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts)
  - หลักฐาน/สถานะจริง: 17scenes/6stagesจริง; ruins/festival/sealยังขาด
  - เกณฑ์เสร็จ: S00–S29ตามSSOT mainlocationsมีroutes/sceneart/revisit ไม่มีplaceholderให้เข้า

- [ ] 🟡 กำลังพัฒนา **WRD-002 — NPC history/relationship/กิจวัตรครบcanon**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-011, GS-039 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-003, VIS-004
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts)
  - หลักฐาน/สถานะจริง: 5NPCdialogue/trustมี; Sentinel/ทุกmemorytagยังขาด
  - เกณฑ์เสร็จ: NPCcanon6ตัวและspecialreactions มีบท/ประวัติไม่ขัดcanonและเวลาไม่blockquest

- [ ] 🟡 กำลังพัฒนา **WRD-003 — Main/sidequests Q_MAIN/Q_STREAM/Q_PIP/Q_ARCHIVE**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-026, GS-028, GS-029 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-001, MAG-002
  - ไฟล์: [GODSEED/src/content/story.ts](GODSEED/src/content/story.ts) · [GODSEED/src/ui/memory-panel.ts](GODSEED/src/ui/memory-panel.ts)
  - หลักฐาน/สถานะจริง: stream/bell/notesfactsมี; queststate/Pipfruit/S17ยังไม่ครบ
  - เกณฑ์เสร็จ: active/completed/rewards/nextobjectiveครบ4quests เซฟ/ย้อนกลับไม่ซ้ำ

- [ ] 🟡 กำลังพัฒนา **WRD-004 — ความลับโลก/cluesและเหตุการณ์เฉพาะทางเลือก**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-026, GS-029 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-002
  - ไฟล์: [GODSEED/src/systems/story.ts](GODSEED/src/systems/story.ts) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts)
  - หลักฐาน/สถานะจริง: forest/stream/archivecluesและmemorypropsมี; ruinsยังไม่มี
  - เกณฑ์เสร็จ: 4cluesและallbranchfactsเปิดความลับ/worldreactionsจริง journalไม่แต่งเหตุการณ์

- [ ] 🟡 กำลังพัฒนา **WRD-005 — เวลา/สภาพอากาศ/แสงตามบท**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-009, GS-012 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-004, VIS-010
  - ไฟล์: [GODSEED/src/systems/game.ts](GODSEED/src/systems/game.ts) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts)
  - หลักฐาน/สถานะจริง: ticks/dayมี; weather/lightingvariantsยังไม่ทำ
  - เกณฑ์เสร็จ: morning/afternoon/eveningและauthoredweatherเปลี่ยนภาพ/ข้อความ ไม่ขัดsave/quest

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-006 — บทแรกตั้งแต่เริ่มจนจบและชีวิตหลังบท**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-028 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-006, WRD-003
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: S27/ending/postchapterยังเฉพาะspec
  - เกณฑ์เสร็จ: 3ending→epilogue→revisit/recap/newrunconfirmจริง ไม่resetflagsเก่า

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-007 — CH2 หอนาฬิกาดาว/เขตเมือง/ดันเจี้ยนใหม่**
  - ความสำคัญ: P3 · ขอบเขต: post-v1 · เชื่อมบอร์ดเดิม: GS-036, GS-037 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-010
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: M7/CH2canonoutlineเท่านั้น ไม่มีimplementation
  - เกณฑ์เสร็จ: กำหนดboundedchapterใหม่พร้อมstory/art/puzzles/battle/save/goldenpaths หลังv1

- [ ] ⬜ ยังไม่ได้เริ่ม **WRD-008 — CH3 หอจารึกเหนือเมฆและบทสรุปโลก**
  - ความสำคัญ: P3 · ขอบเขต: post-v1 · เชื่อมบอร์ดเดิม: GS-038 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: WRD-007
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: M8/CH3outlineเท่านั้น
  - เกณฑ์เสร็จ: chapter3ครบbranches/theme/ending/art/migrationและrealplay QA


<a id="phase-7"></a>
## Phase 7 — คุณภาพเกม

- [ ] 🟡 กำลังพัฒนา **QA-001 — UX Thai/dialogue/recipe hints/pacingครบ**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-030, GS-040 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: STO-007, VIS-012
  - ไฟล์: [GODSEED/src/main.ts](GODSEED/src/main.ts) · [GODSEED/tests/alchemy.spec.ts](GODSEED/tests/alchemy.spec.ts)
  - หลักฐาน/สถานะจริง: nativeThai/touch/filterผ่าน; humanplay/pacingยังไม่วัด
  - เกณฑ์เสร็จ: proofreadไทย มีnextobjective ใช้เวลา45–90minสมดุล50:50จากplaytest

- [ ] 🟡 กำลังพัฒนา **QA-002 — Animation/art consistency/finalvisualreview**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-003, VIS-004, VIS-009, MAG-007
  - ไฟล์: [GODSEED/docs/ART_BIBLE.md](GODSEED/docs/ART_BIBLE.md) · [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts)
  - หลักฐาน/สถานะจริง: runtime screenshotsหลายฉากและfour-viewplayerphone/desktopตรวจแล้ว; finalHDทุกฉาก/ทุกNPC/VFXยังไม่ผ่าน
  - เกณฑ์เสร็จ: ทุกscene/actor/cue/effectผ่านrubricและreviewบน3กลุ่มจอ บันทึกหลักฐาน

- [ ] ⬜ ยังไม่ได้เริ่ม **QA-003 — ประสิทธิภาพมือถือ/coldload/FPS/graphics profiles**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-012, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-004, VIS-010
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: ไม่มีmeasuredFPS/framebudget/loadprofile; bundle~417kBgzipไม่ใช่FPSproof
  - เกณฑ์เสร็จ: วัดcold/warm/memory/longsessionFpsตามSSOTบนphysicalmidrange ลดgraphicsได้

- [ ] ⬜ ยังไม่ได้เริ่ม **QA-004 — เสียง/SFX/musicสิทธิ์/mute/mobileunlock**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-032 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: VIS-001
  - ไฟล์: [GODSEED/docs/ASSET_LICENSES.md](GODSEED/docs/ASSET_LICENSES.md) · [GODSEED/src/scenes/world.ts](GODSEED/src/scenes/world.ts)
  - หลักฐาน/สถานะจริง: audio:noAudio:true ไม่มีเสียงproduction
  - เกณฑ์เสร็จ: original/licensed/musicambient/cues มีmute/captions usergestureunlock ไม่เล่นก่อนอนุญาต

- [ ] 🟡 กำลังพัฒนา **QA-005 — Accessibility contrast/focus/font/settings**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-040, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-006
  - ไฟล์: [GODSEED/src/styles/game.css](GODSEED/src/styles/game.css) · [GODSEED/src/main.ts](GODSEED/src/main.ts)
  - หลักฐาน/สถานะจริง: nativecontrols/aria/reducedmotionมี; fullaudit/fontscale/settingsยังไม่ครบ
  - เกณฑ์เสร็จ: WCAG2.2AA/44pxtouch/focus/fontscaling/keyboard/สถานะไม่พึ่งสีครบ

- [x] ✅ เสร็จสมบูรณ์ **QA-006 — Automated unit/content/save/balance/browser baseline**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-002, GS-024, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-003, FND-005
  - ไฟล์: [GODSEED/tests/unit.test.ts](GODSEED/tests/unit.test.ts) · [GODSEED/tests/browser.spec.ts](GODSEED/tests/browser.spec.ts) · [.github/workflows/pages.yml](.github/workflows/pages.yml)
  - หลักฐาน/สถานะจริง: 87unit/content2/browser41 CI0.4.1และbaselineรอบ7ผ่าน · ผ่านเกณฑ์เฉพาะงานตาม TEST_REPORT Session1–6/baseline7 ไม่ใช่fullchaptergate
  - เกณฑ์เสร็จ: รันlockedCIจริงทุกPR มีnegative/storage/migration/gameflow ไม่skipเพื่อเขียว

- [ ] ⬜ ยังไม่ได้เริ่ม **QA-007 — Visual regression golden/diffและ234VFXaudit**
  - ความสำคัญ: P2 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-033, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-002
  - ไฟล์: [GODSEED/tests/visual.spec.ts](GODSEED/tests/visual.spec.ts) · [GODSEED/tests/art.test.ts](GODSEED/tests/art.test.ts)
  - หลักฐาน/สถานะจริง: มีscreenshots/assetchecks ไม่ใช่toHaveScreenshotgoldendiff
  - เกณฑ์เสร็จ: baselineapproved pinbrowser/font diffthreshold ตรวจlayout/canvas/VFXและreviewchanges

- [ ] ⬜ ยังไม่ได้เริ่ม **QA-008 — End-to-endสามตอนจบ/allbattles/recovery**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-028, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: WRD-006, CMB-009
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: currenttestsจบsliceเท่านั้น ไม่ใช่chapter
  - เกณฑ์เสร็จ: PATH_FAMILY/COMMUNITY/ARCHIVE/BATTLE_FULL/RECOVERYจริงไม่injectstate

- [ ] ⛔ ติดข้อจำกัด **QA-009 — Safari/iOS/Android/iPad/desktop physical QA**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: FND-006
  - ไฟล์: [GODSEED/docs/QA_MATRIX.md](GODSEED/docs/QA_MATRIX.md)
  - หลักฐาน/สถานะจริง: environmentนี้มีChromiumจำลอง ไม่มีอุปกรณ์จริงหรือSafari; ไม่ใช่บั๊กเกมที่พิสูจน์แล้ว
  - เกณฑ์เสร็จ: มีอุปกรณ์/runnerเป้าหมายและบันทึกactualinput/font/audio/storage/performanceครบ


<a id="phase-8"></a>
## Phase 8 — เกมฉบับสมบูรณ์

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-001 — เนื้อเรื่องบท1และ3endingครบตามscope1.0**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-028 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: WRD-006, QA-008
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: spec§1.1/§16; source0endings
  - เกณฑ์เสร็จ: releasegateยืนยันcanonicalchapter1ครบทุกending/epilogue ไม่มีblockedmainroute

- [ ] 🟡 กำลังพัฒนา **REL-002 — ระบบหลักครบ234recipes/mastery/quests/boss/save**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-016, GS-023 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: MAG-006, CMB-007, WRD-003, FND-005
  - ไฟล์: [GODSEED/docs/TEST_REPORT.md](GODSEED/docs/TEST_REPORT.md)
  - หลักฐาน/สถานะจริง: มีverticalslice/234definitions ไม่ใช่fullsystemsacceptance
  - เกณฑ์เสร็จ: mechanics/targets/quest/level/mastery/saveทั้งหมดผ่านacceptancetests ไม่เปิดAIก็จบได้

- [ ] 🟡 กำลังพัฒนา **REL-003 — ภาพ/VFXผ่านมาตรฐานHD Pixel Art**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-033 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-002, QA-007
  - ไฟล์: [GODSEED/docs/ART_BIBLE.md](GODSEED/docs/ART_BIBLE.md)
  - หลักฐาน/สถานะจริง: ต้นแบบlayeredจริง ไม่ได้finalHDapproved
  - เกณฑ์เสร็จ: finalrubricทุกscene/actor/UI/effectครบไม่มีplaceholderหลัก

- [ ] 🟡 กำลังพัฒนา **REL-004 — ไม่มีบั๊กP0/P1ที่ทราบและregressionคงเขียว**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-002, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-008, QA-009
  - ไฟล์: [GODSEED/docs/TEST_REPORT.md](GODSEED/docs/TEST_REPORT.md)
  - หลักฐาน/สถานะจริง: current87/41ผ่าน ไม่พบP0/P1ในslice ไม่ครอบคลุมfullgame
  - เกณฑ์เสร็จ: issueaudit/repro/แก้bugsทั้งหมดcritical และtestsreleasecandidateผ่าน

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-005 — เล่นตั้งแต่เริ่มจนจบจากcleaninstall/oldsave**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-028, GS-035 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-001, REL-002
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: ยังจบบทไม่ได้
  - เกณฑ์เสร็จ: human+automatedfullruns/oldsaveupgrade/reloadทุกcriticalboundaryผ่าน

- [ ] 🟡 กำลังพัฒนา **REL-006 — รองรับphone/iPad/desktopreleaseacceptance**
  - ความสำคัญ: P1 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-031, GS-040 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: QA-003, QA-005, QA-009
  - ไฟล์: [GODSEED/docs/QA_MATRIX.md](GODSEED/docs/QA_MATRIX.md)
  - หลักฐาน/สถานะจริง: สิบChromiumsizesผ่าน; physical/safariยังblocked
  - เกณฑ์เสร็จ: supportedbrowser/device/orientationทุกกลุ่มผ่านreleasechecklist

- [ ] 🟡 กำลังพัฒนา **REL-007 — Production Build/lockfile/dependencies releasecandidate**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-002 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-002, REL-003
  - ไฟล์: [GODSEED/package-lock.json](GODSEED/package-lock.json) · [.github/workflows/pages.yml](.github/workflows/pages.yml)
  - หลักฐาน/สถานะจริง: 0.4.1productionผ่าน แต่ยังไม่ใช่1.0RC
  - เกณฑ์เสร็จ: 1.0RC npmci/type/lint/content/unit/e2e/buildผ่าน bundlebudget/licensechecked

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-008 — เผยแพร่1.0 GitHub Pagesพร้อมrollback**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-003 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-007, REL-004
  - ไฟล์: [.github/workflows/pages.yml](.github/workflows/pages.yml)
  - หลักฐาน/สถานะจริง: 0.4.1เผยแพร่แล้ว; ไม่มี1.0tag/artifact
  - เกณฑ์เสร็จ: tag1.0+greenCI/artifact/pages สำรองreleaseก่อนหน้าและวิธีrollbackไม่ลบเซฟ

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-009 — ตรวจเวอร์ชัน1.0บนเว็บจริง/endings/save/art**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-003, GS-031 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-008, REL-005, REL-006
  - ไฟล์: [GODSEED/scripts/verify-public.mjs](GODSEED/scripts/verify-public.mjs)
  - หลักฐาน/สถานะจริง: publicverifierใช้กับslice; fullchapterpublicยังไม่มี
  - เกณฑ์เสร็จ: verifypublichash/assets/gameplay/endings/saveและphysicalacceptanceบน1.0URL

- [ ] ⬜ ยังไม่ได้เริ่ม **REL-010 — พร้อม1.0และhandoff/knownissues/release notes**
  - ความสำคัญ: P0 · ขอบเขต: v1 · เชื่อมบอร์ดเดิม: GS-003, GS-028 · ตรวจล่าสุด: 2026-11-05
  - ต้องมี: REL-001, REL-002, REL-003, REL-004, REL-005, REL-006, REL-007, REL-008, REL-009, QA-004
  - ไฟล์: [02_GODSEED_MASTER_SPEC.md](02_GODSEED_MASTER_SPEC.md)
  - หลักฐาน/สถานะจริง: ยังไม่ใช่1.0; AI/CH2/CH3ไม่ใช่gate1.0
  - เกณฑ์เสร็จ: gates1.0ครบ reviewscope/credits/ownerphoneinstructions/knownissues/log/docsตรงrelease

