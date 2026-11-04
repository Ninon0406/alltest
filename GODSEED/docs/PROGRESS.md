# GODSEED — ความคืบหน้า 0.2.0

2026-11-04 UTC · base `3ca8268` · branch `feat/godseed-elemental-combat`

อ่านคำสั่งทำต่อและตรวจ main/working tree/CI รุ่นก่อนแล้ว ต่อจากเกมเดิม ระบบเซฟ 0.1.1 และลูปป่ายังอยู่ครบ รอบนี้ GS-016/018/020/022/024: combat effects, UI และการฝึกที่เข้าถึงได้จริง

## สิ่งที่ทำ

- แยกกฎต่อสู้เป็น pure module และข้อมูล encounter แยก B01 (42HP/7, โจมตีสลับตั้งรับ, แพ้ไฟ) กับ BT_TRAINING (35HP/5 ทุกเทิร์น, ยุติการฝึกได้)
- เปิดการฝึกหลังผสมเวทแรก มีพื้นหลังโรงช่าง; รางวัลครั้งแรก potion1/XP5 แยกจาก B01 bloom1/XP12 และไม่มีการตั้ง flag ชนะป่าจากการฝึก
- เพิ่มทางเลือกนำ forest_clue ให้คุโร ได้ CORE_FIRE/FORM_ORB/MOD_SPLIT อย่างละ1 ครั้งเดียว แล้วผสมเวทไฟด้วยวัตถุดิบจริง
- ทุกธาตุมีผลสถานะใน single-enemy model: DoT, wet/fire, wet/wind, swirl, grounded, gleam/veil, rooted/water, resonance/echo พร้อมระยะเวลาและการใช้ผลครั้งเดียว โล่หมดหลังสองจังหวะศัตรู
- HP/MP bars, intent, combat log, สถานะแตะอ่านคำอธิบาย, เวท4ช่องแบบ2×2, สรุปผลและรางวัลหลังสู้ เวทสนับสนุนแสดง VFX รอบผู้เล่น และเงาติดตามตัวละคร
- State schema2 ย้ายจาก V1 โดยคงตัวตน seed/RNG/resources/flags/progress; เก็บ raw V1 snapshot ก่อนเขียน V2 ครั้งแรก Database version1 และ file envelope1 ไม่เปลี่ยน ตรวจ checksum ก่อน migrate
- XP ใหม่เป็นข้อมูลประสบการณ์ที่ได้รับจริง ยังไม่มีการเลื่อน level/mastery จาก XP อัตโนมัติ ไม่ backfill รางวัลก่อนมีระบบ XP

## เล่นได้ / ปริมาณจาก source

ลูปเดิม ตื่น → คุโร → ผสมเวท → ป่า → โน้ต → กลับหมู่บ้าน ยังเล่นครบ เพิ่มสวนเพื่อผสม HEAL → ฝึก/ยุติการฝึก → สำรวจหา clue → คุโรให้ส่วนผสม FIRE → ผสม/ติดตั้ง → ฝึกด้วยเวทไฟ → reload กลางเทิร์นที่บันทึกแล้วและเล่นต่อ

13 scenes / 41 story choices / 4 NPC มีบทและความสัมพันธ์ / 2 playable encounters / 234 legal recipes / เส้นทาง browser ใหม่ค้นพบและใช้จริง 3 สูตร / 0 chapter endings / 4 stage variants / 6 actor sheets การฝึกยังใช้ Pip sheet ชั่วคราว ไม่ใช่มอนสเตอร์วาดใหม่ที่ผ่าน art gate

## ตรวจสอบ

Typecheck/lint/content 2/2/unit+integration+balance 59/59/build PASS; 600 simulated encounters ชนะทั้งหมด (400 จากทางเลือกจริง, 200 negative zero-MP fixtures ที่ระบุชัด) Focused browser ใหม่4/4 PASS; full browser 23/23 PASS (zero skipped) ดู TEST_REPORT.md; การเผยแพร่รุ่นใหม่รอ CI/merge

## งานถัดไป

1. GS-033 ยกระดับ art/props/depth/animation/VFX ให้ผ่าน visual gate ก่อนขยายฉากมากขึ้น
2. GS-026 เปิด archive/stream/ruins พร้อมวัตถุดิบธาตุที่ยังไม่เข้าถึง, NPC memory และ golden paths
3. GS-022/023/027/028 ต่อศัตรู B02–B05, boss phases/assist/disable immunity และเทศกาลกับสามบทสรุป

ยังไม่ครบ: multiple enemies/party roster/mastery/level progression, full234 visual distinctness, final HD art, audio, map, PWA, actual Safari/hardware tests, 50/50 measured human pacing ระบบเซฟยังไม่มี cross-tab conflict resolution และไม่รับ versionอนาคตที่ไม่รู้จัก
