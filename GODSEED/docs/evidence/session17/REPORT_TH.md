# GODSEED DEVELOPMENT REPORT — Session17 / 0.7.2

## 1. สถานะก่อนเริ่มและงานที่เสร็จจริง

ต่อจาก main `78a2497` / เกม0.7.1 / PR15 โดยไม่เริ่มใหม่ ตรวจโค้ด เอกสาร Skills และ Reference08 จริง ปัญหาหลักคือโหลด57PNGตั้งแต่หน้าเริ่ม ไม่มีปุ่มกู้ภาพ และ global timeout ถูก Phaser per-file default0ทับ

- ✅ FND-004: แยกโหลดตามสถานที่ ก่อน commitตัวเลือก/ยืนยันนำเข้าเซฟ กู้ภาพด้วยปุ่มลองใหม่โดยไม่รีเฟรชหรือแก้ Game State ขณะโหลดปิดคำสั่งและเซฟชั่วคราว
- ✅ ทดสอบความเสียหายจริงในเบราว์เซอร์: PNGหาย/เสียซ้ำ/ค้าง8วินาที, กลับมาเล่นและส่งออกไฟล์ได้, ไม่commitทางเลือกซ้ำ
- ✅ ส่วนย่อย VIS-004/005: คุโร32×48/12cells พร้อมค้อน ทั่ง และท่าอธิบายสูตร CH0401/S05 ทั่งหายระหว่างลานฝึกและกลับมาหลังสู้ ReducedMotion/legacyfallback/explicitretry ผ่าน5ขนาดจอ
- 🟡 งานใหญ่ NPC/ทุกท่า/ทั้งโรงช่าง/ภาพHDขั้นสุดท้ายยังไม่เสร็จ จึงไม่เปลี่ยน VIS IDs เป็นdone

## 2. ระบบและไฟล์สำคัญ

- [art-assets.ts](../../../src/scenes/art-assets.ts): Static catalog59ภาพ/RAM ledger และกลุ่มshared+stage
- [world.ts](../../../src/scenes/world.ts), [main.ts](../../../src/main.ts): prepare/guard/retry/animationregistration/Thai loading UI
- [workshop-staging.ts](../../../src/scenes/workshop-staging.ts), [generate-koro-art.mjs](../../../scripts/generate-koro-art.mjs): ทั่งตำแหน่งจริง/ท่าพิเศษ/Assetต้นฉบับ
- [Browser loading tests](../../../tests/art-loading.spec.ts), [Koro tests](../../../tests/koro.spec.ts): Fault/retry/fileimport/checkpoint/5viewport
- [Roadmap SSOT](../../roadmap.json), Architecture/ArtBible/Progress/TaskBoard/TestReport/Decisions/DevelopmentLog อัปเดตตามจริง

คู่ภาพที่เปิดตรวจ: [ก่อนบนโทรศัพท์](before-koro-390.png) → [หลังตีทั่ง](koro-hammer-390.png); [ก่อนบนคอมพิวเตอร์](before-koro-1366.png) → [หลังถือสูตร](koro-recipe-1366.png) เป็นคนละเฟรมแอนิเมชัน ไม่ใช่baselinepixel-diff อาร์ตยังต้นแบบ

ภาพใหม่2PNGรวม10,905bytes สร้างซ้ำ62PNGตรงbyteทั้งหมด ภาพเดิม60ไฟล์ไม่เปลี่ยน Reference08ใช้เป็นทิศทางไม้/โลหะ/ทอง ไม่แปะภาพทั้งใบ

## 3. ระบบเซฟ เนื้อเรื่อง เวทมนตร์และต่อสู้

Manual File SaveยังเฉพาะRAMและไฟล์.godseedที่ผู้เล่นกดเอง State2/File2ไม่เปลี่ยน ไม่มีAutoSave/Cloud/BrowserProgressStorage/อัปโหลดเซฟ การนำเข้าเตรียมฉากก่อนแทนที่RAM และ Retryไม่เปลี่ยนrevision/RNG/Inventory/Flags/DirtyWarning/Anchor

ระบบเดิมยัง18Scene/60Choice/5NPC/3Encounter/234สูตรถูกกฎ/6Stage/0ตอนจบ รอบนี้ไม่เพิ่มกฎรางวัลหรือDamageและไม่อ้างว่าจบทั้งบท ตัวตรวจใหม่เล่นการค้นพบและติดตั้งBLOOMจริง ส่วนflowหลักตรวจWIND/FIRE/ECHO/WATERและ3การต่อสู้เมื่อทดสอบเว็บจริง

## 4. ผลการทดสอบ

| Gate | ผลตรวจล่าสุด |
| --- | --- |
| npmci / TypeScript / Lint / ProductionBuild | ผ่าน |
| GameUnit / Content / Roadmap | 126 / 2 / 8 ผ่าน |
| FocusedBrowser | 12/12ผ่าน1.2นาที |
| FullBrowser | กำลังทดสอบ105กรณี;ยังไม่ประกาศผ่าน |
| PR CI / Main CI / GitHub Pages | รอCommitและผลWorkflow |
| Reference packing / ManualSave source gate | ผ่าน;ไม่มีReferenceในdist |
| PNG reproduction | 62ตรงbyte;60เดิมคงอยู่;2ใหม่ |
| Preview UI/file/stage/retry/privacy | ผ่าน;ดูpreview-staged-art.json |
| เว็บเผยแพร่0.7.2 | ยังไม่ได้ทดสอบ;รอDeploy |
| อุปกรณ์จริง Safari/iOS/Android/iPadOS/FPS/HumanPlaytest | ยังไม่ได้ทดสอบ |

วัดหน้าเริ่มจริง:57→23PNG, encodedbytes629,017→301,231 ลด52.1% ทั้งphone/desktop Browserwarmreloadยังขอ23URLแต่ถ่ายโอนเพียง6,900bytesบนPreview (header/cachevalidation); กลับฉากในsessionเดียว0คำขอภาพเพิ่ม ไม่ใช่การรับรองFPSหรือความเร็วบนฮาร์ดแวร์

ประวัติที่ไม่ผ่าน: defaultretryทำให้3คำขอแทน1; stalledtestพบtimeout0; patchแรกTypeScriptไม่ผ่านและtestใช้Buildก่อนหน้า แก้responseTypeblob/per-filetimeout/maxRetries0และบังคับBuildผ่านก่อนรันใหม่ Focus12ผ่านจริง ไม่มีการskipหรือลดAssertion

## 5. ความคืบหน้าและChecklistจนถึง1.0

**27.6% — 21/76งาน**: ✅21 🟡37 ⬜16 🔴0 ⛔2. เฉพาะv1=21/73=28.8%. คำนวณตามจำนวนChecklist ไม่ใช่สัดส่วนแรงงานหรือคุณภาพ เพิ่มเฉพาะFND004ที่ผ่านเกณฑ์ ไม่บวก2ภาพเป็นงานใหญ่เสร็จ

[Checklistครบ76IDพร้อมDependency/หลักฐาน/เกณฑ์](../../../../GODSEED_MASTER_ROADMAP.md) และ [SAVE14งานย่อย](../../../../GODSEED_MASTER_ROADMAP.md#phase-1) ใช้SSOTเดียวกัน งานเซฟ12/14ผ่าน ไม่เพิ่มซ้ำในตัวหารหลัก

| Phase | ✅/ทั้งหมด | % | งานที่เหลือหลัก |
| --- | ---: | ---: | --- |
| 1 โครงสร้างพื้นฐาน | 7/9 | 77.8 | Responsiveครบเกณฑ์/เซฟบนอุปกรณ์จริง |
| 2 PixelArtHD | 6/14 | 42.9 | ทุกNPC/ท่า/สถานที่/แสงเงา/UIตามมาตรฐาน |
| 3 เนื้อเรื่อง | 1/8 | 12.5 | เนื้อเรื่องท้ายบท/NPC/หลายเส้นทาง/3ตอนจบ |
| 4 เวทมนตร์ | 3/9 | 33.3 | แหล่งวัตถุดิบ/Behavior/VFX/ใช้เวทในเรื่อง/สมดุล |
| 5 ต่อสู้ | 3/9 | 33.3 | ศัตรู/บอส/ปฏิกิริยาธาตุ/ความสามารถ |
| 6 โลกและเนื้อหา | 0/8 | 0.0 | สถานที่/ภารกิจ/เวลา/ความลับ/เนื้อหาทั้งบท |
| 7 คุณภาพ | 1/9 | 11.1 | เสียง/A11y/Perf/VisualRegression/EndToEnd |
| 8 ฉบับสมบูรณ์ | 0/10 | 0.0 | FullChapter/FinalArt/ReleaseGates/เวอร์ชัน1.0 |

## 6. สถานที่10แห่ง

✅คือผ่านด้านนั้น ไม่ใช่ฉากสมบูรณ์; คอลัมน์มือถือหมายถึงChromiumจำลอง

| สถานที่ | อ้างอิง | โครงสร้าง | เลเยอร์ | Collider/Anchor | การเดิน | บท | Effect | มือถือ | ฉากสมบูรณ์ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ลานน้ำพุกลางหมู่บ้าน | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| ประตูทางเข้าหมู่บ้าน | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ใต้ต้นไม้ใหญ่ | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| บ้านผู้เล่น | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| บ้านผู้เฒ่าและสวนสมุนไพร | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| ถนนสู่ป่า | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ลานผลึกเวทมนตร์ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ห้องผสมเวทมนตร์ | ✅ | 🟡 | 🟡 | ⬜ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| ศาลเจ้าโบราณ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ลานต่อสู้กลางป่า | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

Referenceพร้อมทั้ง10แห่งไม่เท่ากับฉากเกมพร้อมทั้ง10 มี6Stageต้นแบบเดิมและโรงช่างเพิ่งเริ่มยกระดับActor/Prop ยังไม่ใช่Reference08เต็มฉาก

## 7. ปัญหาที่ยังเหลือ

ยังไม่พบregressionร้ายแรงในส่วนที่ทดสอบใหม่ ชุดเต็ม/CI/เว็บจริงยังรอผลในตอนจัดทำCommit ภาพรวมและฉากอื่นยังต่ำกว่าReferenceHDครบเกณฑ์ มี0ตอนจบ ยังไม่มีบอส/เทศกาล/เสียงครบ ไม่อ้างความสนุกจากการประเมินภายในว่าเป็นผลผู้เล่นจริง

FND005/SAVE011/012และQA009ยังblockedเฉพาะฮาร์ดแวร์ ไม่รื้อเซฟที่ผ่านแล้วซ้ำ ควรตรวจมือถือจริงก่อนrelease1.0

## 8. งานถัดไป5รายการตามDependency

1. VIS-008/007: ทำWorkshopMap/Anchors/CollidersจากReference08 ใช้เส้นทางที่ปลอดภัยและKoroที่ทดสอบแล้ว
2. VIS-005/010 +MAG-007: หม้อผสม/วัตถุดิบ/จังหวะVFXตามสูตรเดิม ไม่แก้Damageจากภาพ
3. VIS-008/007: เชื่อมบ้าน–ประตู–จัตุรัสตามFixedMap/CSD
4. VIS-004/005: NPCและท่าโต้ตอบที่ขาด พร้อมReducedMotion/ฟุตแองเคอร์/QA
5. CMB-006→CMB-007→STO-001/006: ศัตรู/บอสและทางmercy/puzzle ก่อนเพิ่มตอนจบท้ายบท

คำสั่งรอบถัดไป: อ่าน03/Roadmap/Logล่าสุด แล้วต่อWorkshopFixedMapกับการปรุงจริงจากKoro/loader0.7.2 รักษา234สูตร/ManualFileSave/Combatและทดสอบก่อนขยายบท

## 9. สถานะBuild/GitHubPages

Build0.7.2ผ่านและเล่นบนPreviewได้ Source/PR/CI/Main/Public receiptsจะเติมหลังผ่านจริง ยังไม่ใช้ผล0.7.1แทนการทดสอบเวอร์ชันนี้
