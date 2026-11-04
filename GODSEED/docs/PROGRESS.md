# GODSEED — ความคืบหน้า 0.1

วันที่ 2026-11-04 UTC · branch `feat/godseed-phase-1` · เริ่มจาก `220e992` (ติดตั้ง Skills) ซึ่ง push ขึ้น branch นี้แล้ว

เจ้าของสั่งเพิ่มเติมให้ลบ REBORN ทั้งหมด จึงนำ source, assets, tests, เอกสารและ workflow ของเกมเก่าออกจาก working tree และเปลี่ยน GODSEED เป็นเกมหลัก ไม่แก้ประวัติ Git หรือข้อมูล LocalStorage ของเว็บไซต์เดิมบนอุปกรณ์ผู้เล่น

## เล่นได้จริง

เริ่มใหม่/เล่นต่อ → S00/S01 → หมู่บ้าน → ลูมิและยาย/คุโร → รับส่วนผสม → ผสมเวทถาวรและติดตั้งอัตโนมัติ → เดินเข้าป่า → B01 ต่อสู้ต้นอ่อน → ลอกโน้ต → กลับหมู่บ้านพร้อมบันทึกความทรงจำ เป็น **vertical slice ที่จบเหตุการณ์แรก** ไม่ใช่บทแรกครบ

มี 13 scenes, 39 choices, NPC ที่มีบทพูด/ความสัมพันธ์ 4 ตัว (พิพ ลูมิ มาเรน คุโร), ศัตรูที่เข้าถึงได้ 1 ตัว, 234 legal recipe definitions, 0 chapter endings, 4 stage variants และ 6 actor sprite sheets BT_TRAINING มีชนิดข้อมูลรองรับเท่านั้น ยังเข้าเล่นไม่ได้ ไอรา/ลำธาร/โบราณสถาน/เทศกาล/บอสและบทสรุปยังไม่ได้เริ่ม

## สถานะ

- M0: Phaser 4.2.1 + TS strict + Vite + lockfile + CI พร้อม; การเผยแพร่รอ PR/main
- M1: ฉาก/idle/walk/pick/cast/talk/rest และ transition ต้นแบบ, การข้ามและลด motion, journal/trust/flags
- M2: 336 candidates กรองเป็น 234 ตามตาราง SSOT; craft หักครั้งแรก; four-slot loadout; UI เบื้องต้น ไม่ได้ปลดวัตถุดิบครบทุกสูตรใน slice
- M3: B01 turn-based, intent, MP/HP, guard, item, flee, defeat recovery, first-win reward once; ยังไม่ครบระบบ status/ธาตุ, multiple targets, mastery, assist หรือ B02–B05
- M4/M5: ยังไม่ครบ: บทแรก 3 endings, art quality, เสียง, hardware/Safari QA และการจับเวลา 50/50 ยังไม่ผ่าน acceptance
- M6 AI: ไม่เริ่ม ไม่มี external API dependency

## ทดสอบและเผยแพร่

ผลสุดท้าย: npm ci/typecheck/lint/build ผ่าน, content 2/2, unit/integration 14/14, browser 9/9 (7 viewports + subpath/keyboard/skip/double-click + touch), zero skipped ดู TEST_REPORT.md และ QA_MATRIX.md; ไม่ใช่การทดสอบบน hardware จริง

Pages ปัจจุบันใช้ `main:/` แบบ legacy URL ที่มีอยู่คือ https://ninon0406.github.io/alltest/ แต่ยังไม่ได้อ้างว่า GODSEED เผยแพร่แล้ว เตรียม compiled root สำหรับ legacy source และ Actions artifact สำหรับ workflow ไว้ทั้งคู่

## งานถัดไป

1. GS-033 ยกระดับฉาก/animation/VFX และแยก world props เป็น layers มากขึ้นก่อนขยายเนื้อหา
2. GS-016/020 ทำ status ทุกธาตุ, duration, target rules และ battle simulation ให้ครบก่อนเรียก 234 สูตรว่าใช้ได้ครบพฤติกรรม
3. GS-026/027/028 ขยาย canonical stream/archive/ruins → festival → guardian → 3 endings พร้อม golden paths

ข้อจำกัด: ยังไม่มีเสียง, route map, import checksum/migration รุ่นเก่า, full settings, asset-load retry, save failure memory fallback และ save schema hardening ทุกขอบเขต; ภาพ original procedural prototype ไม่ผ่าน final HD visual gate
