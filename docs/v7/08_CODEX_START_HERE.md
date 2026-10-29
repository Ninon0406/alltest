# ข้อความเริ่มงาน V7 — คัดลอกส่งใน Codex

Repository: `Ninon0406/alltest` (branch ล่าสุดที่ merge แล้ว)

ฉันแนบ **REBORN_CODEX_V7_ALL_IN_ONE.md** และไฟล์ JSON ของ V7 มาให้ หรือได้วางไฟล์ V7 ไว้ใน `docs/v7/` ของ repo แล้ว โปรดอ่านทั้งหมด รวมถึง `AGENTS.md`, `docs/NEXT_CODEX_TASK.md`, `ROADMAP.md`, `GAME_DESIGN.md`, `CONTENT_MANIFEST.md` และ source code จาก HEAD ปัจจุบัน

**คำสั่ง V7 นี้เหนือกว่า V6 เฉพาะส่วนที่ขัดแย้งกัน แต่ต้องรักษาของเดิมที่ใช้งานได้จริง** โดยเฉพาะ One Life, One Run แบบ memory-only, ผลสรุปชีวิตเมื่อจบเกม, calendar 360 วัน/ปี, seed birth, พิธีปลุกพลัง, 20 careers, map graph, single-page UI และ test suites

ฉันต้องการให้คุณ **แก้โค้ดจริง ไม่เพียงตอบเป็นแผน** ให้ทำงานต่อจากสถานะล่าสุด โดยมีลำดับใหม่ดังนี้:

1. แก้ความผิดวัย: 0 เดือนถึงทารกต้องทำได้เฉพาะสิ่งสมเหตุสมผล; ไม่มีอ่านตำรา ฝึกเวท หรือเลือกจุดเน้นอาชีพตั้งแต่เกิด; สร้างเวลาเป็นเดือนและสัมพันธ์กับปฏิทินจริงในเกม
2. ปรับ Time Control: pause/speed 1×–16×, progress bar เคลื่อนไหวชัดและมีข้อความวัน/เดือน, Next Decision หยุดที่ **critical choices** ก่อนตัดสินใจ ไม่ auto-pick, ไม่มี offline aging
3. ทำให้ `Choice-first` เป็นแกนของเกม: การเกิด การเติบโตสำคัญ พิธีปลุกพลัง การเลือก 8 อาชีพจาก Top-eligible, อาชีพ/ความสัมพันธ์/ออกเดินทาง/ความเสี่ยง/ต่อชีวิต/เป็นเทพ ทุกอย่างต้องเกิดผ่าน choice ที่มี effects จริง
4. เพิ่ม Story Engine ที่ใช้ `03_CONTENT_DATA.md` ซึ่งมี 120 original fork briefs และ 123 life event briefs; implement first playable cluster ที่ครบอายุ 0–19 แล้วค่อยขยายอย่างตรวจสอบได้; อย่านับเนื้อหาใน spec ว่าเสร็จจนกว่าเกิดในเกมได้
5. เพิ่ม Pixel Character V2 ตาม 20+ variants ต่อ trait, สืบหน้าตาจากพ่อแม่, scene/location art และ map consistency ตาม `02_STORY_WORLD_BIBLE.md` กับ `06_ASSET_SEED_MANIFEST.json`; เครื่องมือสร้างภาพไม่มีให้ใช้ code-generated original pixel PNG/WebP โดยต้องเซฟไฟล์จริงไว้ใน repo
6. Map modal ตอนนี้เป็น **read-only map** เห็นตำแหน่ง, จุดเกิด, พิกัดและสถานที่ที่รู้จัก; ไม่สามารถกดเดินทางจากแผนที่; การย้ายที่อยู่ต้องทำผ่าน story choices, แสดงค่าความเสี่ยง/ผลได้/เวลาที่ใช้; เมื่อย้ายแล้ว scene และพิกัดเปลี่ยนตาม
7. Status ชัด: Age (เดือน/ปี), Level 1–100, title ใหม่ทุกสิบระดับของ 20 สาย, aura ทุก 5 ระดับ, ความเหมาะสมกับการฝึกและตัวเลือกที่ฝึกได้นอกสายอย่างมีโอกาสเติบโต
8. สุดท้าย Level 100 เป็น **ฉากจบเป็นเทพที่ต้องอายุ≥1000 ปี** ผ่าน Lv99, ค้นพบเป้าหมายด้วยตนเอง, trials ตามอาชีพ และ active play≥30นาที; ห้ามเลื่อนขั้นจาก XP อย่างเดียว
9. เพิ่ม asset tool, owned equipment, NPC, ร้านค้า, ทางเลือกความสัมพันธ์ผู้ใหญ่, ความขัดแย้งในโลกแฟนตาซีแบบไม่โจ่งแจ้ง, และเนื้อเรื่องชีวิตมากมายตามแผนการพัฒนา

ให้เริ่ม **Phase V7-2 การแก้ทารก+เวลา+critical choices** ก่อน เพราะเป็นข้อผิดพลาดที่เห็นชัด แล้วพัฒนาต่อ Phase ที่ต่อเนื่องกันตาม dependency หาก phase นี้มีอยู่แล้วใน HEAD ให้ข้ามอย่างมีหลักฐานไป phase ถัดไป

ทดสอบ Vitest, Playwright, Content Audit, production preview และ GitHub Pages ตาม workflow เดิม. แก้ `app.html` และ `src/**`, ไม่แก้ generated root index/assets ด้วยมือ. หลัง build ใช้ stage-site ใน repo นี้ และตรวจ public site จริงหากเข้าถึงได้

ทุกครั้งก่อนจบงานต้องอัปเดต `docs/NEXT_CODEX_TASK.md` ให้ระบุ **สถานะ implement, tests, blockers, งานที่ต้องทำต่อ** โดยรักษาระบบหนึ่งชีวิต/รีเฟรชแล้วเริ่มใหม่และบันทึกเฉพาะผลสรุปชีวิตจริง

ภายใต้สิทธิ์ที่มีฉันอนุมัติการพัฒนา/ทดสอบ/commit/publish ปกติของ repo นี้ ไม่อนุมัติการซื้อบริการ การเปิดเผย secrets หรือการกระทำทำลายนอกขอบเขต และห้ามข้ามการยืนยันของแพลตฟอร์ม

**เริ่มเขียนและทดสอบโค้ดทันที อย่าส่งเพียง roadmap**
