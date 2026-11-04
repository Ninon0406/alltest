---
name: godseed-project-director
description: Use for GODSEED project planning, architecture, implementation sequencing, cross-system design decisions, and reconciling instructions with the master game specification; do not start unrelated projects.
---

# GODSEED Project Director — ข้อกำหนดนำทางทั้งโปรเจกต์

## จุดประสงค์และขอบเขต
ใช้งานเมื่อเริ่มโครงการ วางสถาปัตยกรรม เปลี่ยนระบบหลัก จัดลำดับงานใหม่ หรือมีคำสั่งหลายระบบชนกัน ไม่ใช่สกิลสำหรับตอบทั่วไป

## Source of truth (อ่านจริงก่อนลงมือ)
1. คำสั่งล่าสุดของเจ้าของโปรเจกต์และข้อจำกัดเครื่องมือ/สิทธิ์จริง
2. `docs/GODSEED_MASTER_SPEC.md` ถ้ามี; ถ้าไม่มีให้หา `02_GODSEED_MASTER_SPEC.md`
3. `01_CODEX_START.md` สำหรับเริ่ม; `03_CODEX_CONTINUE_FOREVER.md` สำหรับต่อรอบ
4. `docs/DECISIONS.md`, `docs/TASK_BOARD.md`, `docs/PROGRESS.md`, โค้ดจริง และผลทดสอบจริง
หากไฟล์หลักไม่อยู่ใน repo ให้ค้นไฟล์แนบ หากยังหาไม่พบ อย่าแต่งสเปกใหม่จากความจำ บันทึก blocker พร้อมทำเฉพาะงานที่ไม่เสี่ยง

## 12 เสาหลัก (ห้ามละเมิดโดยพลการ)
- GODSEED: The World That Remembers เป็นเกม **HD Pixel Art 2D** ไม่ใช่เกม 3D
- Choice-driven: กดตัวเลือก → ตัวละครเคลื่อนไหวและทำสิ่งที่เลือก → เปลี่ยนสถานะ/ฉาก → มีตัวเลือกต่อไป; ไม่มีเดินอิสระ Open World
- แกนเวลาเล่น: เนื้อเรื่อง/ตัวเลือกประมาณ 50%; หาวัตถุดิบ/ปรุงเวท/ต่อสู้ประมาณ 50%
- ต่อสู้ Turn-Based มีเวทติดตั้ง 4 ช่อง ไอเทม ป้องกัน หนี/ยอมแพ้เมื่อกฎอนุญาต
- เวทตามสูตรใน master spec: 8 cores × 6 forms × 7 modifiers และกฎที่ให้ **234 legal recipes**; ต้องคำนวณและตรวจ ไม่สร้างชื่อ 234 อันหลอก ๆ
- วัตถุดิบหาได้ด้วยการเลือกสำรวจและเหตุการณ์; เวทที่ค้นพบมีผลจริงทั้ง battle/story
- ระบบโลกจดจำ flags, inventory, trust, journal, visual state และผลทางเลือก
- AI สำหรับภาษาและบรรยากาศเป็น optional; base game deterministic/offline playable; no exposed API key
- ภาษา UI/เนื้อเรื่องหลักไทย; ชื่อ ID โค้ดอังกฤษได้
- **รองรับแค่โทรศัพท์, iPad, คอมพิวเตอร์** ผ่าน browser; touch, portrait/landscape, mouse/keyboard ตามบริบท
- Static site + GitHub Pages; เจ้าของทำงานผ่านโทรศัพท์เท่านั้น
- งานศิลปะ original/licensed เท่านั้น; เคารพสิทธิ์ สคริปต์ไม่ควรคัดลอกทรัพย์สินเกมอ้างอิง

## วิธีลงมือที่ตรวจสอบได้
1. Audit repo, branch, working tree, package scripts, playable route; ห้ามลบ/force push/reset
2. อ้าง task IDs และ milestone จาก docs ถ้าไม่มีจึงสร้างบอร์ดใหม่
3. แบ่งงานเป็น vertical slices ที่เล่นได้จริง เลือกงาน 2–5 รายการในรอบหนึ่ง
4. แยก TypeScript layers: `engine` pure rules; `systems` gameplay; `content` data; `scenes` Phaser; `ui` DOM; `assets`; `tests`; `docs`
5. ออกแบบ contracts ก่อนเชื่อม: event payload typing, data schemas, deterministic RNG, save migrations
6. ลงมือแก้โค้ดจริง; อย่าตอบแต่คำแนะนำหรือ pseudo-code หากมีสิทธิ์เขียนไฟล์
7. เพิ่ม test ตามการเปลี่ยนพฤติกรรมก่อนอ้างเสร็จ; ตรวจ build + UX สามกลุ่มอุปกรณ์
8. บันทึก `docs/PROGRESS.md`, `docs/TASK_BOARD.md`, `docs/DECISIONS.md` เมื่อเพิ่ม/เปลี่ยนกติกา

## Gate ที่ใช้ตัดสินงาน
- M0: โปรเจกต์ build + CI + Pages config
- M1: visual slice มี Pixel Art ฉากหลาย layer + action animation และ UI เลือก
- M2: item → craft → legal recipe → spellbook → equip
- M3: spell → combat effect → result → continuation
- M4: บทแรกเล่นจบ branching จริง
- M5: polish phone/iPad/desktop + save/audio/accessibility
- M6: optional AI storyteller; ห้ามเป็น critical path
- M7+: ขยายเนื้อหาแบบมี quality gates
หากมีบั๊ก P0/P1 ให้ซ่อมก่อนเพิ่มฟีเจอร์ใหญ่

## รายงานท้ายรอบ (ภาษาไทย)
เขียน: สิ่งที่ทำจริงพร้อม path; เส้นทางเล่นที่ยืนยัน; สิ่งที่ทดสอบ (ผ่าน/ล้มเหลว/ไม่ได้รัน); สถานะ mobile/iPad/desktop; Pages URL จริงหรือยังไม่เผยแพร่; blocker; งานถัดไป 3 รายการ. ห้ามบอกว่า deploy หรือผ่าน QA หากไม่มีหลักฐาน
