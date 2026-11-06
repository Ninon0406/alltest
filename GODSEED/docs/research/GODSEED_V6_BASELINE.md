# GODSEED V6 — Baseline ที่ตรวจจากโค้ดจริง

วันที่ตรวจ: 2026-11-06 UTC
แหล่งก่อนเพิ่มเนื้อหา V6: commit **9b2cca25d957f825aa48b4348eff08ccac9a7c91**, เกม **0.9.0**
เอกสารนี้เป็น snapshot ก่อนการขยาย V6 ไม่ใช่จำนวนเนื้อหาล่าสุดหลังเพิ่มเทศกาล

อ่าน 03/Roadmap/Development Log และตรวจ story.ts, game.ts, combat.ts, state.ts, save-file.ts, spells.ts, scene-definitions.ts และตัวตรวจเนื้อหาเดิมแล้ว เก็บ source จาก Git ลงโฟลเดอร์ชั่วคราวเพื่อไม่ให้การแก้ไฟล์ขนานปนกับ Baseline ไม่ได้เริ่มโปรเจกต์เกมใหม่หรือเปลี่ยน source เดิม

## ตัวเลขก่อน V6

| สิ่งที่ตรวจ | ผลจริง | ความหมายและหลักฐาน |
| --- | ---: | --- |
| Story Nodes | 21 | นับ StoryScene ที่มี ID ไม่รวมเทิร์นต่อสู้ เมนู หรือข้อความ UI เป็น Node เพิ่ม |
| Nodes ที่มีเส้นทางเชิงโครงสร้าง | 21/21 | รวมทางชนะ แพ้ ถอย และ recovery ของระบบต่อสู้ ยังไม่ถือว่าเงื่อนไขผ่านเพียงเพราะมีเส้นเชื่อม |
| Nodes ที่เดินทางถึงด้วย reducer จริง | 21/21 | เริ่มจาก fresh(seed=12345) ใช้ choose/craft/fight ตามกฎ มีลำดับคำสั่งของแต่ละ Node ในไฟล์หลักฐาน |
| Choices ทั้งหมด | 70 | ID ไม่ซ้ำ |
| Choices ที่ประกาศผลต่อเกม | 70 | มี Scene/flag/reward/trust/craft/rest/environment effect อย่างน้อยหนึ่งชนิด ไม่ได้แปลว่ามี 70 ตอนจบหรือผลระยะยาวที่ต่างกัน |
| Choices ที่เรียกสำเร็จด้วย reducer จริง | 70/70 | เป็นการครอบคลุมคำสั่ง ไม่ใช่การพิสูจน์ทุกชุดเงื่อนไขหรือทุกลำดับการเลือก |
| Quest catalog แบบมี contract | 0 | รุ่นเดิมเก็บความก้าวหน้าเป็น flags และข้อความ UI ยังไม่มีโครงสร้าง Quest Chain กลาง |
| ชุดภารกิจที่ยืนยันการจบได้จาก guard ชัดเจน | อย่างน้อย 1 | Q_ARCHIVE_NOTES ใช้ archive_notes_complete และรางวัลร่วม CH1702/CH1703; ไม่เดาจำนวนภารกิจทั้งหมดจากชื่อ flag |
| Life Paths ที่มีระบบเฉพาะใช้งานจริง | 0 | ไม่มีตัวเลือกสาย/การปลดล็อกความสามารถ/กิจกรรมและบทสรุปเฉพาะสาย 8 ชนิดใน schema หรือระบบเกม |
| Stage IDs ที่เข้าได้ | 7 | village, garden, workshop, forest, archive, stream, ruins |
| Fixed-map definitions | 5 | village_center, under_tree, elder_garden, spell_workshop, ancient_shrine; เป็นคนละหน่วยกับจำนวน Stage และภาพอ้างอิง |
| ภาพอ้างอิงสถานที่ | 10 | การมีภาพอ้างอิงไม่เท่ากับมีฉากเกมครบ 10 แห่งหรือผ่านคุณภาพ HD |
| สูตรเวทใน generator | 234 | มี ID/กลไก/VFX metadata จริงและไม่ซ้ำ ยังไม่ใช่หลักฐานว่าหาวัตถุดิบสร้างครบทั้งหมดจากเรื่องได้ |
| สูตรที่สร้างสำเร็จจากของที่หาได้จริงในการสำรวจแบบมีขอบเขต | อย่างน้อย 61 | แต่ละสูตรถูกเรียก craft สำเร็จจากสถานะที่เกิดจากการเล่นจริง มี action witness แยกกัน ไม่ได้ใส่วัตถุดิบให้ครบด้วย fixture และไม่ได้อ้างว่าค้นพบทั้ง 61 สูตรในเซฟเดียว |
| Recipe ingredient types | 21 | 8 cores / 6 forms / 7 modifiers ตามระบบเดิม |
| Item catalog | 27 | 21 ส่วนผสม + 6 ไอเทมภารกิจ/สิ้นเปลือง; ยังไม่มี Catalyst เป็นส่วนที่สี่ของสูตร |
| NPC คู่สัมพันธ์ | 5 | LUMI, MAREN, KORO, EIRA, PIP; ไม่นับ Sprite ศัตรูเป็น NPC ความสัมพันธ์เพิ่ม |
| Encounter definitions | 4 | B01, B02, B03 และ BT ฝึก; ศัตรูทั่วไป 3 แบบ + การฝึก 1 แบบ |
| บอสบทหลัก B05 | 0 | ยังไม่มีการสร้างบอสปลายบทในรุ่นนี้ ไม่เรียกหุ่นทดสอบว่าเป็นบอสหลักที่เสร็จแล้ว |
| ตอนจบบท/เกมที่เข้าถึงได้ | 0 | slice_complete คือจบช่วงทดลองป่า ไม่ใช่ตอนจบบทเต็มหรือสาม ending ตามสเปกเก่า |

ผลดิบ: [content catalog](evidence/v6-baseline-content.json) · [graph และ action witnesses](evidence/v6-baseline-graph.json)

## ขอบเขตของหลักฐาน

ตัวตรวจใหม่ [story-graph.mjs](../../scripts/story-graph.mjs) แยกสองระดับ:

1. **Static validation / structural reachability** ตรวจ ID, next scene, stage, actor, item, encounter, core, flag producer, condition kind, shared reward guard, Scene Anchor, cinematic pose/effect และทางออกจากวงวนที่ไม่มีจุดจบ มี safe hub ที่ประกาศชัดคือ S02_HUB เพื่อไม่ตีความการกลับหมู่บ้านว่าเป็น bug
2. **Bounded real-reducer exploration** ใช้ fresh/choose/craft/fight จริง รายการของได้จากคำสั่งเล่นเท่านั้น การยุบสถานะใช้เพื่อเลือกค้นต่อ ไม่แก้สถานะเกม หากยังไม่พบเส้นทางจะรายงาน UNVERIFIED ไม่ใช่ UNREACHABLE

Baseline ใช้ขอบเขตสูงสุด 4,000 สถานะ / 12 วินาที และ seed เดียว ผลนี้พิสูจน์ลำดับที่พบได้ แต่ไม่พิสูจน์ว่าทุก seed ทุกชุดเงื่อนไข ทุกการเล่น หรือทุกสูตรสามารถจบได้ เหตุการณ์แพ้ใน witness ใช้คำสั่งตั้งรับโดยไม่โจมตีเพื่อเข้าจุดพักอย่างถูกกฎ ไม่มีการเปลี่ยน HP หรือใส่ Battle State จากภายนอก

Static graph ที่ผ่านไม่ได้พิสูจน์ว่ามีบทสรุปครบ การพบทางกลับ Hub และจำนวน ending=0 เป็นสัญญาณชัดว่ารุ่นก่อนมีเพดานเนื้อหาหลังจารึก S17 แม้ไม่มีหน้าจอไร้ปุ่มโดยไม่ตั้งใจ

14 การทดสอบตัวตรวจครอบคลุมการใส่ข้อผิดพลาดจริง เช่น next scene ผิด, Scene/Choice ซ้ำ, flag ไม่มีแหล่งสร้าง, reward ไม่รู้จัก, สถานที่หรือ Anchor ผิด, Anchor ชนวัตถุ, cinematic enum ผิด, วงวนออกไม่ได้ และ Quest Step ที่เชื่อมไม่ครบ ผ่านก่อนส่งต่องาน ดูคำสั่งด้านล่าง

## ระบบเดิมที่ต้องรักษา

- เกมผ่านตัวเลือกและ Cinematic Director ไม่มี free roam
- เวทเดิม 234 สูตร; การเปลี่ยน Elements/Forms/Modifiers/Catalysts ของ V6 ต้องมีแผน compatibility ไม่เปลี่ยนชื่อ ID เดิมทิ้งทันที
- Turn-Based มี HP/MP, intent, status, item, guard, escape/surrender ตาม Encounter และรางวัลชัยชนะครั้งแรก
- Manual File Save เท่านั้น: RAM → ผู้เล่นกดส่งออก .godseed → เลือกไฟล์และยืนยันนำเข้า เก็บ State2/File2; ไม่สร้างข้อมูลถาวรใน Browser หรือส่งเซฟไป Server
- ภาพ procedural ปัจจุบันเป็นต้นแบบ มีแผนที่/เลเยอร์/Anchor/ท่าตามบทจริงบางพื้นที่ แต่ยังไม่ผ่าน final HD หรือ QA อุปกรณ์จริง
- ความก้าวหน้าปัจจุบันมี XP และการค้นพบเวท ยังไม่มี Level/gear/8 Life Paths ครบตาม V6 การเพิ่ม field ในรายงานเซฟไม่เท่ากับมีระบบเหล่านั้นแล้ว

## ผลทดสอบก่อนขยาย V6

ผลของ source 0.9.0 จากงานรอบ19: Unit 151, Content 2, Roadmap 8, TypeScript/Lint/Production Build ผ่าน และ Browser ชุดเต็ม 123/123 ผ่านในเครื่อง (28.1 นาที) เป็นหลักฐานของรุ่นก่อน V6 ไม่ใช้แทนการรันทดสอบ source 0.10.0 หลังเพิ่มเนื้อหา

[ผล test:all ของรอบ19](../evidence/session19/local-checks.txt) และ [รายงานรอบ19](../evidence/session19/REPORT_TH.md) แยก Chromium จำลองออกจาก Safari/iOS/Android/iPadOS จริง, FPS/thermal และ human playtest ที่ยังไม่ได้รับรอง

## ทำซ้ำ

จาก repository root:

    node --test GODSEED/scripts/story-graph.test.mjs
    node GODSEED/scripts/story-graph.mjs --explore --output /tmp/current-story-graph.json

หากต้องการ Baseline เดิมให้ใช้ source 9b2cca2 ที่แตกจาก Git ลงโฟลเดอร์ชั่วคราว แล้วส่ง --root ให้ตัวตรวจ แทนการตรวจ working tree ใหม่และเรียกว่าเป็น Baseline เก่า รายงานล่าสุดต้องใช้คำสั่งกับ source ล่าสุดใหม่เสมอ

งาน V6 ที่ต้องปลดล็อกต่อคือ Content Pipeline และช่วงเปิดเรื่องที่มีบทสรุปย่อย, Quest contract, Life Paths, แหล่งวัตถุดิบและการเติบโตที่มีความหมาย โดยรักษาความต่อเนื่องของ NPC และของเดิม ไม่เร่งจำนวน Node ด้วยข้อมูลที่ยังเล่นไม่ถึง
