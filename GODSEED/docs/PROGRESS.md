# GODSEED — ความคืบหน้า 0.3.0

### Session 4 — 2026-11-05 (UTC)

Base `9c71ea7` · branch `feat/godseed-layered-art` · milestone: first playable slice / visual presentation pass. ตรวจ main, working tree, CI และคำสั่งทำต่อครบก่อนแก้ งานติดตั้ง `220e992` และงานก่อนหน้าอยู่ใน ancestry ของ main แล้ว ไม่มี PR ค้าง ไม่เริ่มโครงการใหม่

รอบนี้เลือก GS-007/008/009/010/033 ต่อจาก0.2.0 เน้นภาพและความต่อเนื่องของการกระทำ โดยคง engine/story/กติกา/สูตร/เซฟเดิม

## เสร็จจริงในรอบนี้

- ฉาก village/garden/workshop/forest แห่งละ3ชั้น มี prop แยก20ตำแหน่ง, ambient21ตำแหน่ง, parallax เฉพาะชั้นฉาก และจัด depth ตามเท้าตัวละคร ภาพความทรงจำเพิ่มเมื่อช่วยลูมิ/ดูแลสวน/พบเบาะแส
- Player sheet วาดใหม่56เฟรม/11ท่า: idle, walk, run, interact, pick_up, craft, cast, guard, hit, victory, rest; cue ที่ใช้อยู่เรียกท่าจริง ภูตฝึกมีรูปร่างเฉพาะ13เฟรม/3ท่า แยกจากพิพ
- Action Director รับผลก่อน/หลังจาก pure engine แล้วแสดงการกระทำ/การตอบสนอง/ชนะ/แพ้ ก่อนเปลี่ยนกลับฉาก ข้าม/ลดการเคลื่อนไหวกลางงานได้ ยกเลิก tween/effect และจบ transaction ครั้งเดียว
- อ่าน OS reduced-motion ตั้งแต่เริ่มและเมื่อเปลี่ยนค่า หยุด ambient/pose animation ในโหมดลดการเคลื่อนไหว ปิดปุ่มเกมขณะโหลดภาพ และแจ้งภาพสำรองภาษาไทยเมื่อ PNG ชุดใหม่โหลดไม่ครบ
- Pipeline แยก generator/manifest/layout วาดเอง16PNGใหม่ ส่วนภาพเดิมและ generator เดิมยังอยู่ครบ สร้างซ้ำแล้ว27PNGทั้งหมดมี SHA-256 เดิม

ไฟล์หลัก: `src/scenes/{world,visual-plan,actor-art,stage-layout}.ts`, `scripts/generate-{stage,actor}-art.mjs`, `public/assets/art-v2/`, `main.ts`, `tests/{art.test,visual.spec}.ts` ภาพยังเป็น original procedural prototype ไม่ผ่าน final HD/art gate; NPC เดิมและ VFX ยังมีงานต่อ

## เล่นอะไรได้จริง

ตื่น → ตัวเลือกเดิน/เก็บของ → คุโร → ผสม/ติดตั้งเวท → ป่า → ต่อสู้ → โน้ต → กลับหมู่บ้าน → reload/เล่นต่อ ยังมีสวน/เวทเยียวยา, นำ clue ให้คุโรรับส่วนผสมไฟครั้งเดียว, ผสมไฟ, ฝึกกับภูต/ยุติการฝึก/ชนะ/แพ้และกลับฉาก เซฟกู้คืน/ส่งออก checksum/นำเข้ายังคงอยู่

Source counts: **13 scenes /41 choices /4 companion NPC /2 encounters /234 legal recipes /3 spells ค้นพบและใช้ใน browser routes /0 chapter endings /4 layered animated stages /8 actor sheets** (6legacy+2new; ไม่ใช่8NPC). ไม่เพิ่มฉาก/สูตรหรือบทสรุปในรอบภาพนี้

## ตรวจสอบ / เผยแพร่

`npm ci` PASS156 packages; typecheck/lint/content2/unit+integration+balance+art63/build PASS. Local browser30/30 PASS5.4m หลังแก้ HUD; หลังแก้ landscape focused9/9 PASS1.1m รวม8 visual+ลูป844×390เดิม Production-preview verifier PASS: hash16PNG, start/forest/FIRE/practice/win/checksum export/import Remote CI/public0.3.0 ยังรอเผยแพร่ ดูหลักฐานล่าสุดใน TEST_REPORT.md

State2 / IndexedDB1 / checksum envelope1 คงเดิม ไม่มี migration ใหม่ ระบบย้าย V1 และเก็บต้นฉบับจาก0.2.0ยังอยู่ การทดสอบอุปกรณ์เป็น Chromium emulation; iOS/Safari/Android และ hardware FPS ยัง NOT TESTED

## งานถัดไป

1. GS-033/007/018 ขัดเกลา NPC silhouettes/lighting และตัวอย่าง VFX6ชุดให้ผ่านภาพจริงก่อนเรียก final HD
2. GS-026 เปิด archive/stream/ruins ตามสเปก พร้อมแหล่งวัตถุดิบ, NPC memory และ golden paths
3. GS-022/023/027/028 ต่อ B02–B05, boss/assist และเทศกาลกับสามบทสรุปเมื่อเส้นทางก่อนหน้าผ่าน

Known P2: final art/lighting, full234 VFX, audio, party/mastery, map, measured50/50 pacing. Cross-tab save conflict/PWA และ future schemasยังค้าง ไม่มีสิ่งที่เจ้าของต้องติดตั้งหรือรัน terminal

Portrait HUD now flows below the canvas rather than covering actor feet; bounds are asserted on phone/iPad art routes. Desktop/short landscape layout retains its existing controls.
