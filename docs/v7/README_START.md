# REBORN CODEX V7 — คำแนะนำใช้ชุดเอกสาร

ชุดนี้เป็น **คำสั่งออกแบบและคลังเนื้อหา** สำหรับพัฒนาเกมที่มีอยู่แล้ว ไม่ใช่เว็บไซต์เกมที่ทำเสร็จและยังไม่ใช่รูปภาพจริง

## ไฟล์ในชุด

- `REBORN_CODEX_V7_ALL_IN_ONE.md`: สเปกหลัก + World Bible + Story Library + คำสั่งสร้างภาพ (ไฟล์เดียวสำหรับอ่านง่าย)
- `01_MASTER_DIRECTIVE.md`: กฎพัฒนา เทคนิค อายุ ระบบช้อยส์ map/risk/UI/save/level 100
- `02_STORY_WORLD_BIBLE.md`: lore 5 regions, 150 drafted locations, 20 careers × 10 rank titles, 100 NPC draft profiles, 20 deity endings ideas
- `03_CONTENT_DATA.md`: 120 original profession branching prompts (20 × 6) + 123 age-appropriate life event prompts + decision risk examples
- `04_WORLD_SOURCE.json`: place records, coordinates, NPC drafts, rank names ในรูป structured source สำหรับ Codex parser
- `05_STORY_SOURCE.json`: structured original branch/event briefs สำหรับสร้าง runnable story data
- `06_ASSET_SEED_MANIFEST.json`: 150 per-location scene art prompts + 20 interior art prompts + 180 sprite-variant entries
- `07_ART_IMPLEMENTATION.md`: กฎ pipeline ภาพ pixel ที่เซฟลง repo จริง
- `08_CODEX_START_HERE.md`: คำสั่งเริ่ม task ใหม่
- `09_CODEX_CONTINUE.md`: คำสั่งทำต่อทุก task

## ใช้ใน Codex อย่างไร

**วิธีที่แนะนำ:** แตก ZIP แล้วนำไฟล์ V7 ไปเพิ่มใน Repository `Ninon0406/alltest` ในโฟลเดอร์ `docs/v7/` ผ่าน GitHub (ให้ไฟล์ `.json` และ `.md` อยู่ครบ). จากนั้นเปิด Codex บน repo เดียวกันและคัดลอกข้อความ `08_CODEX_START_HERE.md` ไปส่ง. หาก Codex รองรับการแนบไฟล์ สามารถแนบ all-in-one + JSON แทนได้โดยต้องยืนยันว่า Codex อ่านไฟล์เหล่านั้นได้จริง

เมื่อจบงานและ code/commit ถูก merge เข้า branch ที่เลือกแล้ว ส่ง `09_CODEX_CONTINUE.md` ในงานใหม่ ห้ามเปิด task หลายอันแก้ไฟล์เดียวกันโดยไม่ประสาน branch

## ข้อจำกัดที่ต้องทราบ

- งานขนาดนี้มีหลาย phase ไม่มีการรับประกันเสร็จใน task เดียวหรือไม่ติดโควตา Codex
- ชื่ออาชีพ/สถานที่/เหตุการณ์ในไฟล์เป็น **ต้นฉบับออกแบบ**, Codex ต้อง implement และทดสอบก่อนจะนับเป็นของที่เล่นได้
- งานศิลป์ต้องทำเป็นไฟล์ PNG/WebP/SVG จริงใน repo; JSON prompts ไม่ใช่รูปภาพ
- Github Pages เป็นเว็บ static; ไม่ควรพึ่ง paid generative image API ขณะผู้เล่นเปิดเว็บ
- 1in8b.life เป็นแค่ UX inspiration pause/speed/pending decision; ต้องไม่คัดลอก code/design/content หรือพฤติกรรม save (REBORN ไม่เซฟ active run)
- แหล่งเรียนรู้ช่วงทารก: CDC milestones 2, 6 และ 12 เดือน; ใช้เพื่อความสมเหตุสมผลของเกม ไม่ใช่เกณฑ์ทางการแพทย์รายบุคคล
- แรงบันดาลใจจากแนวคิดทั่วไปของนิยายต่างโลก/ฝึกพลังเท่านั้น ไม่คัดลอกพล็อต ตำนาน ชื่อตัวละคร ท่าเฉพาะ ระบบพลังหรือภาพจากผลงานที่มีลิขสิทธิ์

## แหล่งศึกษาแนวคิด (ไม่ใช่เนื้อเรื่องเกม)

- https://www.cdc.gov/act-early/milestones/2-months.html
- https://www.cdc.gov/act-early/milestones/6-months.html
- https://www.cdc.gov/act-early/milestones/1-year.html
- https://1in8b.life/th/
- https://sevenseasentertainment.com/books/mushoku-tensei-jobless-reincarnation-light-novel-vol-1/
