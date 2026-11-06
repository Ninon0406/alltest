# GODSEED DEVELOPMENT REPORT — รอบ18 / candidate0.8.0

## 1. สถานะก่อนเริ่ม

maina8512b7สะอาด เกม0.7.2เผยแพร่และผ่าน105browsercasesแล้ว Loader/ManualFileSaveทำงานถูกต้อง จึงไม่เขียนซ้ำ โรงช่างยังเป็นฉากเดิม มีคุโรกับทั่ง แต่ทางเดินทั่วไปและการผสมยังไม่สัมพันธ์กับหม้อจริง

## 2. งานจริงในรอบนี้และไฟล์

- [workshop-map.ts](../../../src/scenes/workshop-map.ts): 11Anchor/10Link/7Solid ตำแหน่งเท้าและทางเรียน/หยิบ/ผสม/ออก ใช้DijkstraและFootprint10×4เดิม ไม่เดินอิสระ
- [generate-workshop-art.mjs](../../../scripts/generate-workshop-art.mjs): 8PNGต้นฉบับ/64,170bytes/3layers480×270/หม้อ6frames/กล่อง3states/ท่าปรุง8frames/ยกกล่อง4frames/21icons ตามReference08ที่เปิดตรวจจริง ไม่แปะภาพทั้งใบ
- [world.ts](../../../src/scenes/world.ts), [workshop-staging.ts](../../../src/scenes/workshop-staging.ts): เดินถึงAnchorก่อนทำกิจกรรม ทิศเหนือ/ซ้ายตรงManifest สูตรจริงส่ง3ภาพลงหม้อ→mix→discovery/VFX การแสดงภาพไม่เปลี่ยนDamage/Rewards
- pendingArrivalแก้Skip/Motionที่เคยหยุดกลางทาง ชุดทดสอบยืนยันถึงปลายทาง/commitครั้งเดียว/ล้างsprites FileS05คืนAnchorตามประวัติChoiceIDs State2/File2คงเดิม
- [workshop.test.ts](../../../tests/workshop.test.ts), [workshop.spec.ts](../../../tests/workshop.spec.ts): เส้นทาง/ภาพ/สูตร/ทิศ/เบราว์เซอร์/เซฟ/fallback/skip

[ก่อนphone](before-workshop-390.png) → [หลังroom](workshop-room-390.png), [ปรุงเวท](workshop-mixing-390.png), [ยกกล่อง](workshop-lifting-390.png). [ก่อนdesktop](before-workshop-1366.png) → [หลัง](workshop-room-1366.png). ภาพruntimeเปิดตรวจแล้ว เป็นคนละเฟรม ไม่ใช่pixel-diffbaseline งานภาพยังต้นแบบ

## 3. ระบบเกมและเซฟ

Engineเนื้อเรื่อง/เวท/ต่อสู้ไม่เปลี่ยน:18Scene/60Choice/5NPC/3Encounter/234legal/0ending/6Stage. ผสมWIND/BLOOMด้วยข้อมูลจริงได้ในPreview ติดตั้งและใช้เวทเดิมได้ ลานฝึกใช้ห้องเปิดโล่งเดิม ไม่มีหม้อ/กล่อง/ทั่งบังการต่อสู้

ManualFileSaveเท่านั้น:RAMระหว่างเล่น,กดส่งออก.godseed/เลือกไฟล์และยืนยันโหลด,ไม่มีAutoSave/Cloud/BrowserProgressStorage/ส่งเซฟไปเซิร์ฟเวอร์ File2/State2ไม่เปลี่ยน GameVersion0.8.0 การเริ่มหน้าซ้ำว่างและต้องเลือกไฟล์เอง

## 4. ผลทดสอบจริง

| รายการ | ผลล่าสุด |
| --- | --- |
| npmci/type/lint/Content/Unit/Build | ผ่าน;Content2/Unit134 |
| Roadmap | 8/8ผ่าน |
| FocusBrowser | 20/20ผ่าน3.2นาที บน390×844,844×390,820×1180,1024×768,1366×768 |
| FullBrowser | กำลังรัน113;ยังไม่ประกาศผ่าน |
| Preview verifier | WIND/BLOOM/cauldronVFX/lift/nativepicker/filecheckpoint/exactstate/nostorage/nouploadผ่าน |
| PNG reproduction | 70ตรงbyte/62เดิมคงอยู่/8ใหม่ |
| CI/Deploy/Actualpublic0.8.0 | รอผลจากCommit/PR |
| PhysicalSafari/iOS/Android/iPadOS/FPS/HumanFun/FinalHD | ยังไม่ได้ทดสอบ |

ข้อผิดพลาดระหว่างพัฒนา:ทดสอบใหม่คาดundefinedtrust+1เป็นNaNแก้ค่าเริ่ม0;ตรวจภาพพบทิศSpriteผิดแก้ใช้manifestและpixeltest;[Redtest](skip-regression-before.txt)พิสูจน์Skipหยุด184/231แทน291/212 แก้pendingArrivalแล้วผ่าน20กรณี ไม่มีการskip/ลบAssertionเพื่อให้เขียว

## 5. ความคืบหน้าทั้งโครงการ

**27.6% — 21/76งาน** ✅21 🟡37 ⬜16 🔴0 ⛔2;เฉพาะv1=21/73=28.8%. เปอร์เซ็นต์เป็นจำนวนChecklist ไม่ใช่คุณภาพ/ปริมาณแรงงาน ไม่ปิดVIS008หรือMAG007จากฉากย่อย งานโรงช่างย่อยstructure/collision/Chromiumviewportเพิ่มหลักฐานผ่านแล้ว ภาพ/บท/ท่าทั้งฉากยังไม่ครบ

[Checklistครบ76IDพร้อมDependency/เกณฑ์/หลักฐานและSAVE14งานย่อย](../../../../GODSEED_MASTER_ROADMAP.md)

| Phase | ✅/ทั้งหมด | งานที่ยังเหลือหลัก |
| --- | ---: | --- |
| 1 พื้นฐาน | 7/9 | Responsiveครบ/PhysicalfileQA |
| 2 งานภาพ | 6/14 | ทุกฉาก/NPC/ท่า/UI/finalHD |
| 3 เนื้อเรื่อง | 1/8 | ท้ายบท/NPC/หลายทาง/3endings |
| 4 เวทมนตร์ | 3/9 | แหล่งวัตถุดิบ/behavior/mastery/VFX/balance |
| 5 ต่อสู้ | 3/9 | B03/B04/Boss/elementreactions |
| 6 โลก/เนื้อหา | 0/8 | ภารกิจ/เวลา/สถานที่/ความลับ/บทสรุป |
| 7 คุณภาพ | 1/9 | Audio/A11y/perf/visualregression/endtoend |
| 8 ฉบับสมบูรณ์ | 0/10 | Fullchapter/finalart/device/1.0releasegates |

## 6. สถานที่10แห่ง

✅ในตารางหมายถึงผ่านด้านนั้นสำหรับต้นแบบ ไม่ใช่ฉากfinalHD;มือถือ=Chromiumจำลอง

| สถานที่ | Ref | โครงสร้าง | เลเยอร์ | Collision | เดิน/Animation | บท | Effect | มือถือ | พร้อมทั้งฉาก |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ลานน้ำพุกลางหมู่บ้าน | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| ประตูทางเข้าหมู่บ้าน | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ใต้ต้นไม้ใหญ่ | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| บ้านผู้เล่น | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| บ้านผู้เฒ่าและสวนสมุนไพร | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| ถนนสู่ป่า | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ลานผลึกเวทมนตร์ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ห้องผสมเวทมนตร์ | ✅ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | 🟡 | ✅ | 🟡 |
| ศาลเจ้าโบราณ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| ลานต่อสู้กลางป่า | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## 7. ปัญหาที่ยังเหลือและงานถัดไป5รายการ

ภาพยังเป็นproceduralprototype,Workshopmusicbox/cluehandoffยังไม่มีท่าครบ,โบราณสถาน/บอส/เทศกาล/ตอนจบยังค้าง,ไม่มีอุปกรณ์จริงหรือhumanplaytest จึงไม่อ้างความสนุก/finalHD/1.0ว่าเสร็จ SAVE011/012และQA009ยังblocked ไม่วนทำเซฟที่ผ่านแล้วซ้ำ

1. VIS008/STO001 — แผนที่ศาลเจ้า/S15–17/ECHO puzzleเป็นDependencyของB03
2. CMB006 — B03/B04พร้อมtelegraph/AI/artหลังสถานที่พร้อม
3. VIS005 — Workshopmusicbox/cluehandoffตามบทจริง
4. VIS007/008 — บ้าน–ประตู–จัตุรัสเชื่อมเส้นทาง
5. MAG007/QA002 — VFXที่เหลือ/visualconsistency/performanceตามRoadmap ก่อนreleasegates

คำสั่งถัดไป:อ่าน03/Roadmap/Log แล้วต่อศาลเจ้า/ECHO puzzleจากต้นแบบปัจจุบัน รักษา234สูตร/ManualFileSave/Combatและทดสอบก่อนเปิดศัตรูใหม่

## 8. สถานะพร้อมเล่น/GitHubPages

Buildcandidate0.8.0ผ่านและPreviewเล่นได้ Liveล่าสุดยัง0.7.2จนกว่าPRผ่าน/รวม/Deploy. SourceCommit/PR/CI/public/postdeployจะบันทึกหลังตรวจจริง ไม่ใช้ผลรุ่นก่อนแทน
