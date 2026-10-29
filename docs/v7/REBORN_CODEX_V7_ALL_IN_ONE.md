# REBORN CODEX V7 — ALL IN ONE INSTRUCTIONS + ORIGINAL CONTENT

> Send this to Codex or store in `docs/v7/`. Structured JSON data in the pack remains recommended for import.



---

<!-- BEGIN 01_MASTER_DIRECTIVE.md -->

# REBORN V7 — CODEX PRODUCTION MASTER DIRECTIVE
## Decision-first isekai life RPG · original story · persistent world · one life per run

> สำหรับส่ง Codex ใน Repository `Ninon0406/alltest` โดยตรง เป็นข้อกำหนดล่าสุดที่เหนือกว่า directive เก่าเฉพาะส่วนที่ขัดแย้ง แต่ห้ามทำลายโค้ดที่ทำงานได้อยู่แล้ว
> เว็บไซต์ปลายทาง `https://ninon0406.github.io/alltest/`
> **สำคัญ: นี่คือคำสั่งให้พัฒนาซอฟต์แวร์จริง ไม่ใช่ให้เขียนคำอธิบายว่าควรพัฒนาอย่างไร**

# 00 — หน้าที่และนิยามของงาน

คุณคือทีมวิศวกรเกม, นักออกแบบระบบ RPG, ผู้กำกับเนื้อเรื่อง, นักออกแบบพิกเซลอาร์ต, UX Designer, Test Engineer และ Release Engineer ของ REBORN

เป้าหมายสูงสุด: เปลี่ยน REBORN ที่มีอยู่ให้เป็นเกมชีวิตเกิดใหม่ต่างโลกซึ่งควบคุมด้วยตัวเลือก ใช้เวลาผ่านระบบจำลองชีวิตอย่างมีความหมาย มีโครงเรื่องชีวิตแตกแขนงกว้าง มีแผนที่ของโลกคงที่ มีภาพและฉากเฉพาะพื้นที่ และสามารถเผยแพร่เล่นบน GitHub Pages ได้จริง

อย่าส่งมอบเพียง roadmap, mocks, placeholder, ชื่ออาชีพที่ยังไม่มี mechanics หรือภาพลวงว่าทำได้แล้ว

อ้างอิง `02_STORY_WORLD_BIBLE.md` และ `03_CONTENT_DATA.md` ที่แนบมาด้วยสำหรับรายละเอียดโลก สถานที่ ตัวละคร อาชีพ และบรรทัดฐานเนื้อเรื่อง หาก Codex มองไม่เห็นไฟล์แนบ ให้แจ้งชื่อไฟล์ที่ขาดอย่างตรงไปตรงมาและทำเฉพาะส่วนที่มีข้อมูล

## กติกาอำนาจอนุมัติ

ผู้ใช้อนุมัติให้ทำงานพัฒนาปกติภายใน repo นี้: สร้าง/แก้ไฟล์, ติดตั้ง dev dependencies ทั่วไป, ทดสอบ, build, สร้าง commit/PR และเผยแพร่ผ่าน GitHub Pages **ภายใต้สิทธิ์และนโยบายแพลตฟอร์มที่ใช้งานจริง** อย่าข้ามการอนุมัติของระบบ, อย่าใช้บริการเสียเงิน, อย่าแตะ repo อื่น, อย่าลบข้อมูลนอกขอบเขต, อย่า expose secrets

## ต้องตรวจ HEAD ก่อน

อ่าน `AGENTS.md`, `docs/NEXT_CODEX_TASK.md`, `ROADMAP.md`, `GAME_DESIGN.md`, `CONTENT_MANIFEST.md`, `docs/REBORN_CODEX_UI_PIXEL_ONE_LIFE_DIRECTIVE.md` และโค้ดจริง

Baseline ที่ตรวจจาก GitHub ก่อนเขียนคำสั่งนี้: 0.7.0; One Life และ dashboard หน้าจอเดียวมีแกนทำงานแล้ว; ระบบชาติกำเนิดโอกาสเท่ากัน 20 archetypes; เครื่องคำนวณอายุ 360 วันต่อปี; พิธี 7 ขั้น; 20 สายอาชีพต้น + 20 ขั้นสูง; มีแผนที่ 20 locations/5 regions/20 route edges; นับได้ 126 event/scene, 269 choices, 6 endings; ยังไม่มีชุด appearance 20+ แบบจริง, owned equipment, power growth, 1000-year god gate, NPC สำคัญหรือดันเจี้ยนจริง

หากโค้ดใหม่กว่า baseline ให้ถือว่า HEAD เป็นความจริง อย่าสั่งซ้ำสิ่งที่เสร็จแล้ว ตรวจหลักฐานใน tests และโค้ด

# 01 — Product Pillars / จิตวิญญาณเกม

1. **Choice-first**: เหตุการณ์ที่มีผลสำคัญกับชีวิตจะหยุดเวลาและให้ผู้เล่นตัดสินใจเอง
2. **Focus-driven idle simulation**: กิจวัตรประจำวัน/เดือน/ปีผ่านได้เมื่อผู้เล่นเลือกว่าช่วงนี้ตั้งใจทำอะไร; มีแถบเวลาแสดงความคืบหน้าชัดเจน
3. **Original fantasy coming-of-age**: 70% ชีวิตประจำวันและผจญภัยสบายใจ, 20% ฝึก/งาน/คนรอบตัว, 10% โลกและพล็อตใหญ่; สัดส่วนเป็นเป้าหมาย content มิใช่สคริปต์บังคับทุก run
4. **No save mid-run**: รีเฟรชแล้วชีวิตจบจากหน่วยความจำ ต้องสุ่มใหม่; เก็บเฉพาะ compact terminal archive เมื่อจบจริง ไม่เก็บ active state, RNG หรือวิธีกลับมาเล่นต่อ
5. **Visual storytelling**: ภาพพิกเซลอ่านง่ายและเปลี่ยนตามสถานที่/ตัวละคร/อุปกรณ์/ระดับพลัง
6. **Honest game systems**: เงิน, อาวุธ, ภาพ, โอกาสรอด, ระดับพลัง, การเพิ่มอายุ และที่อยู่ต้องใช้ source of truth เดียวกัน
7. **Every path viable**: ชนชั้นเริ่มต้นไม่กำหนดฉากจบตายตัว; อาชีพเกษตรกรและงานธรรมดามีความลึกและโอกาสก้าวสูงเช่นเดียวกับอาชีพต่อสู้
8. **No hollow padding**: ต้องมี unique authored scenarios, choice outcomes, follow-up flags; แยก counts ระหว่าง authored, procedural variation, tested reachable

# 02 — Source-Tree Contract / ห้ามแก้ไฟล์ผิด

- ต้นฉบับหน้าเว็บคือ `app.html`
- งาน CSS/JS คือ `src/**`
- ภาพต้นฉบับ/ทรัพยากรสร้างเกมให้ลง `public/art/**`, `public/assets/**`
- `index.html`, `assets/**`, `art/**` ที่ root เป็น output สำหรับ Pages แบบ main:/ ใน repo นี้; อย่าแก้ด้วยมือ
- `npm run build` แล้ว `node scripts/stage-site.mjs` เพื่อสร้างไฟล์เผยแพร่ จากนั้นตรวจ assets และ public URL
- รักษา Vite, ES Modules, vanilla JS, Vitest, Playwright, deterministic seeded random และ 360-days/year time authority
- เคารพ code path `src/engine/time.js`: ทุกการผ่านวันต้องใช้ `advanceTime`; `age` เป็น derived field จาก absoluteDay/birthAbsoluteDay
- UI action ต้องผ่าน pure reducer/dispatch, revision token, in-memory commit; ห้ามแก้ state ใน render function โดยไม่มี action
- ห้ามรื้อ `run.js`, archive และ birth generator เวอร์ชันเก่าที่ freeze แล้วเพียงเพื่อความสะดวก
- ทำความสะอาดความขัดแย้งระหว่าง directives ล่าสุดด้วยการเขียน `docs/USER_DIRECTIVE_V7.md`; หากมีข้อขัดแย้งให้อ้าง user V7 ก่อน historical text

# 03 — Screen/UI: one-document immersive panel

## โครงหน้าหลัก desktop

Top strip (ไม่กินพื้นที่): ชื่อ · อายุเป็นปี/เดือน · ปฏิทิน/ปีโลก · **ระดับพลัง 1–100** · ขอบเขตพลัง · เงิน · ปุ่ม pause

Left narrow panel: ตัวละครแบบ pixel full-body, เห็นพื้นหลังสถานที่และของสวมใส่, HP/MP/STA แบบ bar ที่เห็นตัวเลขจริง

Center: พื้นหลังฉากตาม location + เนื้อเรื่องขนาด 2–4 บรรทัดต่อหน้า + decision card 3–5 choices; ปุ่มอ่านต่อเมื่อยังไม่ถึง choice

Right optional dock: focus ที่เลือก, อัตราเวลาที่ผ่าน, ผลล่าสุด, เป้าหมาย/อาชีพ, ความเสี่ยงที่ใกล้เข้ามา (ไม่เฉลยเหตุการณ์ลับ)

Bottom on mobile: เรื่องราว · สถานะ · แผนที่ · กระเป๋า · ประวัติ; ทุกอย่างเป็น modal/drawer/tabpanel ภายใน document เดียว, ไม่ navigation reload

## UI Priority

- ชัดที่สุด: อายุ, ระดับพลัง, เป้าหมาย, ผลการเลือก
- ระบบ stat ต้องแสดง label ภาษาไทย + ตัวเลข + tooltip สั้น ๆ ไม่แสดง acronym แบบไร้คำอธิบาย
- บอก “เหมาะกับสาย” Top 3 แบบเบื้องต้นก่อนปลุก และ top 8 eligible หลังปลุก
- แสดงว่าตอนนี้ทำกิจกรรมอะไร, ใช้เวลากี่วัน/เดือน และผลที่คาดได้
- ปุ่ม 44×44 CSS px อย่างน้อยในจุดแตะหลัก; 320px ไม่ล้นแนวนอน; focus visible, keyboard control, screen reader
- panel art ต้องไม่เกิน ~35% ความสูง viewport บนมือถือและใช้ภาพ pixel ขนาดเล็กใกล้เคียง 320x180 แล้วขยายแบบ nearest-neighbor
- ความยาวเนื้อเรื่องแต่ละหน้า: หลัก 1–4 ประโยค; กดอ่านต่อทีละช่วง; ไม่แสดงกำแพงข้อความยาว
- พื้นหลังแตกต่างตามสถานที่และประเภทสิ่งปลูกสร้าง, คนที่อยู่ในฉากต้องอยู่ใน scene layer ไม่ใช่ overlay ลอยผิดมุม
- มี Settings แบบ session-only: font 100/112/125%, reduced motion, volume ถ้ามีเสียง; ห้ามเก็บ active save
- ถ้าเปิด modal/time panel ให้หยุด auto และคืน focus เมื่อปิด

## ใช้ design reference อย่างปลอดภัย

ใช้เพียง interaction pattern ระดับแนวคิดของ 1in8b.life: pause, speed, next decision, progress bar, compact status และ event modal; ห้ามคัดลอก CSS/ภาพ/ข้อความ/ข้อมูลเฉพาะเว็บดังกล่าว สร้างเกมต้นฉบับ

# 04 — Time Engine / วัยเด็กตามพัฒนาการ

**แก้ความไม่สมเหตุสมผลของทารก**: ตั้งแต่เกิดถึง 0 เดือน ห้ามเลือก “อ่านตำรา”, “ฝึกสร้างสรรค์”, “เลือกเป้าหมายอาชีพ”, “ไปกิลด์”, “ฝึกเวท/ดาบ”, “ตัดสินใจระดับผู้ใหญ่”

ช่วงอายุและ agency:

| อายุ | ทำอะไรได้ในเกม | ทางเลือกที่สมเหตุสมผล |
|---|---|---|
| 0–2 เดือน | รับรู้สัมผัส/เสียง/ใบหน้า ปฏิกิริยาทารก | ฟังเสียง, มองใบหน้าผู้ดูแล, สงบเมื่อปลอบ (เป็นปฏิกิริยา/ท่าที) |
| 3–5 เดือน | สนใจเสียง/วัตถุ เริ่มส่งเสียงและเคลื่อนไหวมากขึ้น | เอื้อมมือ, หันตามเสียง, ส่งเสียงตอบ, เล่นกับผู้ดูแล |
| 6–11 เดือน | เล่น/สัมผัส/สำรวจปลอดภัย ความสามารถต่างกันรายเด็ก | คลาน/เกาะตามความพร้อม, เล่นของใกล้ตัว, ส่งเสียงสื่อสาร, เลือกคนคุ้นเคย |
| 1–2 ปี | เริ่มเดิน/พูด/สำรวจ/เล่นง่าย ๆ | เลือกของเล่น, ตอบรับผู้ดูแล, เล่นใกล้บ้านพร้อมผู้ใหญ่ |
| 3–5 ปี | เล่าเรื่อง, สังเกต, เรียนรู้แบบเล่น | ช่วยงานเบา ๆ, ถามคำถาม, เล่นบทบาท, เรียนรู้เพลง/นิทาน |
| 6–11 ปี | อ่านขั้นต้น/ฝึกทักษะง่ายภายใต้การดูแล | ศึกษา, ฝึกกายเบา ๆ, ร่วมกิจกรรมโรงเรียน, พบอาจารย์ |
| 12–19 ปี | พิธีปลุก, เรียนสำนัก/งาน/กิลด์ตามวัยและบริบท | เลือก top 8 สายอาชีพที่มีสิทธิ์, ฝึก, พบเหตุการณ์, เดินทางตามข้อจำกัด |
| 20–39 ปี | เลือกเส้นชีวิตอิสระเข้มข้น | งาน, ค้าขาย, มิตรภาพ, ออกสำรวจ, เรียนขั้นสูง |
| 40–79 ปี | อาชีพ/ครอบครัว/ชื่อเสียง/ความเชี่ยวชาญ | บททดสอบใหญ่, ฝึก, ลงทุน, ทำงานในชุมชน, สำรวจ |
| 80–149 ปี | ต่อชีวิตได้ก็ต่อเมื่อมีฐานความสามารถ/ภูมิหลังที่รองรับ | หน้าต่าง major choice น้อยลง (~5 รอบ) แต่ยังฝึก/ทำงาน/เดินทางผ่าน focus |
| 150–299 ปี | แสดงพัฒนายุคสมัยและความทรงจำ | 4–8 major arcs ต่อช่วง + time montage |
| 300–599 ปี | ผู้เชี่ยวชาญและตำนานท้องถิ่น | 4–8 major arcs + โปรเจกต์ฝึกระยะยาว |
| 600–999 ปี | ขั้นก่อนเหนือโลก | 4–8 major arcs + อีเวนต์เฉพาะอาชีพ |
| 1000+ ปี | เงื่อนไขรับขอบเขตเทพและ level 100 | ความเชี่ยวชาญ, การเดินทาง, บททดสอบสุดท้าย, เลือกจบด้วยตนเอง |

**เวลาจริงของผู้เล่น**: ความคาดหวังสำหรับ run ปกติ อายุ 0–20 ~3–5 นาที (ขึ้นกับการอ่าน), 20–40 ~2–4 นาที; 40–80 ~3–5 นาที; มีชีวิต 80–150 และต่อไปกระชับขึ้นโดยตัดกิจวัตร ไม่ใช่ตัดเหตุการณ์สำคัญ; god route ใช้ active play อย่างน้อย 30 นาที (รวมการเลือกจริง ไม่ใช่เปิดแท็บทิ้ง)

## กฎ time simulation

1. แสดง Pause, 1×/2×/4×/8×/16× และ progress bar พร้อมความหมายว่าใช้เวลากี่วันต่อ tick
2. ความเร็ว UI เปลี่ยนเฉพาะความเร็วการจำลองในเวลาจริง ไม่เปลี่ยน RNG ผลการเลือกหรือ probability
3. ปุ่ม “จนถึงเหตุการณ์สำคัญถัดไป” เร่งผ่านเพียง safe routine loop และหยุดก่อน decision
4. ถ้ามี choice สำคัญ/โจมตี/ถูกดัก/ขัดแย้ง/ถูกหักหลัง/แต่งงานผู้ใหญ่/ทะลวงขอบเขต/ข้อเสนออาชีพ ให้หยุดเวลาอัตโนมัติ ไม่ auto-pick
5. Routine focus อาจแสดงตัวเลือก “ฝึกทักษะ”, “หาเงิน”, “พักผ่อน”, “ศึกษา”, “ช่วยครอบครัว”, “ดูแลกิจการ”, “สำรวจอย่างปลอดภัย” เฉพาะช่วงอายุที่สมเหตุสมผล
6. วัยทารก 0–2 ปีไม่มี focus สายอาชีพ: ใช้ “อยู่ภายใต้การดูแล/เรียนรู้ตามวัย” ที่ระบบติดตามจาก caregivers และ micro-scene ที่พัฒนาการสมจริง ไม่ใช่ให้ทารกทำ task ผู้ใหญ่
7. `pendingDecision` ต้องมี precedence เหนือ auto/day advancement; on race condition, pause before commit days exceeding event trigger
8. ห้ามบังคับจำนวน click ปีละ 30 ครั้ง, แต่ให้ choice กระจุกตัวตามช่วงอายุที่เหมาะกับ story
9. ทุก event เกิดที่ actual absoluteDay/age และ location; สถานะที่แสดงใน choice ต้องสอดคล้อง
10. หลายร้อยปีใช้ montage แต่บันทึกการเปลี่ยนยุค, รายได้, skill และ relationships ระหว่างช่วงอย่างซื่อสัตย์
11. หากไม่มี event ก็ไม่ต้องปลอม event ขึ้น; ถ้าสุ่ม event ไม่ถึงตาม guarantee ให้เลือกจาก eligible pool ตาม seed หรือมี fallback original age-appropriate
12. autoplay ปิดโดย default และไม่ทำงานเมื่อ tab hidden, screen locked, modal open หรือมี pending choice; ไม่มี offline aging

# 05 — Decision Engine และ Event Scheduler

**แยก 3 ระดับ**

- `critical`: ชาติกำเนิด, พิธี, อาชีพ, ความขัดแย้งส่วนตัว, เรื่องครอบครัวสำคัญ, ออกเดินทางไปพื้นที่เสี่ยง, อันตรายที่มีผลถาวร, ความสัมพันธ์ผู้ใหญ่, breaking limit, god gate; ต้องมี 3–5 unique choices และหยุดเวลา
- `major`: ค่ายฝึก, การขอทุน, เลือกอาจารย์, เปลี่ยนอาชีพ, ทำธุรกิจ, รับภารกิจ, แก้ความขัดแย้ง; สั่งผู้เล่นตัดสินใจเองเมื่อเป็นทางแยกจริง
- `ambient`: พบสินค้า, ข่าว, สภาพอากาศ, ไปทำงาน, ฝึก routine; ผลตาม focus, สรุปลง chronicle, บางครั้งต่อไปสู่ critical event

## Event schema ตัวอย่าง (ให้ใช้งานจริง ไม่ใช่ stub)

```js
{
 id: 'child.village.found-coin.01',
 ageMinMonths: 84, ageMaxMonths: 143,
 locations: ['starter_village','river_market'],
 category: 'social', severity: 'major',
 requirements: {anyFlags:['knows_market','helps_family']},
 cooldownYears: 999, maxOccurrences: 1,
 weight: 12,
 title: 'เหรียญที่หน้าร้าน',
 pages: ['ระหว่างเดินตลาด คุณพบถุงเงินที่ดูเหมือนมีคนทำตกไว้', 'เจ้าของร้านอยู่ไม่ไกล แต่ไม่ทันสังเกตถุงนั้น'],
 choices: [
  {id:'return',label:'นำไปคืน',effects:[{op:'relationship',target:'shopkeeper',delta:2},{op:'flag',key:'honest_child',value:true}]},
  {id:'ask',label:'ถามหาคนทำหาย',effects:[{op:'time',days:1},{op:'reputation',delta:1},{op:'flag',key:'searched_owner',value:true}]},
  {id:'leave',label:'ไม่แตะต้อง',effects:[{op:'flag',key:'avoided_trouble',value:true}]}
 ], followUps:['adult.market.trust.01']
}
```

ห้ามพิมพ์หน้า UI แล้วแอบแก้ state; ทุก effect ต้องผ่าน action reducer ที่ validate ก่อน commit

## Unique-branch policy

- แยก `sceneId`, `branchId`, `choiceId`, `consequenceId`, `locationId`
- อย่างน้อย 120 distinct authored fork nodes ใน Story Bible; แปลงเป็น runnable scenes พร้อม downstream consequences ไม่ต่ำกว่า 100 fork nodes ที่ reachable จริง
- แต่ละ fork ต้องมีอย่างน้อย 3 choice consequences และอย่างน้อย 2 downstream path distinctions (แตกต่าง flags, NPC, สถานที่, profession, skill, ending)
- ห้ามนับกิจวัตร “ทำงาน/พัก/ฝึก” ที่ใช้ซ้ำเป็น unique branch nodes
- ตรวจ broken references, unreachable nodes, impossible stat gates, repeat spam, dead ends
- event-randomness seeded and deterministic for unit tests; rarity configurable per environment, importance, age and prior choice
- choice influence ทำให้มี triggered confrontation/ambush/financial dispute/betrayal ได้ แต่ต้องมี foreshadowing และวิธีหลีกเลี่ยง/เจรจา ไม่ใช่ forced punishment ที่ไม่มีเหตุผล
- รายละเอียดโลกช่วงแรกสงบเป็นหลัก แต่เมื่อผู้เล่นเลือกความเสี่ยงเอง odds ของ conflict เปลี่ยน

# 06 — Status / Affinity / Training Guidance

Main bars: HP, MP, Stamina; secondary compact: เงิน, ความเหนื่อย, ขวัญ, ความสัมพันธ์; expandable panel แสดง Strength, Dexterity, Constitution, Intelligence, Wisdom, Perception, Charisma, Spiritual Power, Crafting และ survival values จาก state จริง

หน้าต่าง “สายที่เหมาะ” ต้องแสดง Top 3 context recommendation ก่อนอายุ 12 เป็นเพียงแนวโน้ม ไม่รับรองผลพิธี

ตอนอายุ 12 ทำพิธีปลุกพลังเดิม 7 ขั้นอย่างต่อเนื่อง แล้วแสดง **อาชีพที่ eligibility ผ่านจริงเพียง Top 8** จาก 20 อาชีพหลัก โดย sorting ตาม affinity score; ถ้า eligible <8 ให้แสดงเฉพาะที่ได้; ถ้ามี tie ให้ seeded stable tie-break; ไม่โชว์ปุ่มกดไม่ได้ หากไม่ผ่านเกณฑ์ ไปดูได้เฉพาะ codex ว่าขาดอะไร

แสดง badge: “เหมาะมาก”, “เหมาะ”, “พอฝึกได้”, “ต้องฝึกเพิ่ม”; ระบุเหตุผลอิง stats/การฝึก/บันทึกจริง ไม่เดาจากค่าที่ไม่มี

ฝึกตรงสายให้โบนัสการเรียนรู้สมเหตุสมผล (ตัวอย่าง 1.20–1.55 เท่าตาม affinity), ฝึกนอกสายได้แต่ค่าเริ่มช้า (ตัวอย่าง 0.55–0.95 เท่า) และอาจมีโอกาสพลิกผ่านการฝึก อาจารย์ บททดสอบและเหตุการณ์โชค ไม่ใช่ตันถาวร

อย่าให้ยึดแค่ birth stats; achievements, teacher, luck, investment of time และ secondary skills เปลี่ยนความเหมาะสมได้

แยก `baseStats`, `trainedStats`, `equipmentModifiers`, `temporaryBuffs`, `derivedStats`; equip/unequip ไม่สะสมโบนัสซ้ำ

# 07 — Power 1–100 / Levels, Titles, Aura

`power.level` 1..100 เป็น global realm power แยกจาก careerXP และ mastery, ต้องได้รับจากกิจกรรมจริง

10 ขอบเขต แต่ละขอบเขตมี 10 ระดับ:

- Lv 1–10: ผู้เริ่มสัมผัสชีพจร
- Lv 11–20: ผู้หล่อเลี้ยงแก่นพลัง
- Lv 21–30: ผู้ร้อยประสานพลัง
- Lv 31–40: ผู้เปิดประตูจิต
- Lv 41–50: ผู้สถาปนารากฐาน
- Lv 51–60: ผู้สะท้อนกฎโลก
- Lv 61–70: ผู้ก่อรูปร่างปฐมธาตุ
- Lv 71–80: ผู้ก้าวพ้นมนุษย์
- Lv 81–90: ผู้เดินข้ามกาล
- Lv 91–99: ผู้ใกล้ขอบเขตเทพ
- Lv 100: เทพผู้เข้าใจกฎแห่งตน

แต่ละอาชีพ 20 สายมี **ชื่อตำแหน่งเฉพาะอาชีพทุกสิบระดับ** (200 title labels ใน content bible); global realm ยังคงร่วมกันเพื่อเข้าใจง่าย

Aura/visual milestone ทุก 5 ระดับ: palette, particle, ground circle, edge glow, environment feedback สะท้อนระดับโดยอิง power.level ที่ได้จริง ไม่มีอุปกรณ์แสดงที่ยังไม่ได้เป็นเจ้าของ

ผลเกมสำคัญทุก 10 ระดับ เช่น unlock skill/perk, world tier, route, longevity opportunity; ขั้น 50+ เริ่มมี social consequences; ขั้น 90–99 cost สูงแบบไม่เป็นเส้นตรง, ต้องการ mastery + quest + time + breakthrough ไม่ grind แค่ปุ่มเดียว

ตัวอย่าง progression economics (ออกแบบและปรับสมดุลตาม simulation): XP requirement = `ceil(30 * 1.12^(level-1) * milestoneMultiplier)` มี milestone factor x2.0 ที่ level 10,20,... และ higher-tier x3.0 ที่ 90+; **ไม่ใช้เลขแบบสุ่มไร้ calibration**; สร้าง deterministic simulation paths ของ career 20 สายก่อน final tuning

**Level 100 = deity ending** เฉพาะเมื่อ
- chronological age ≥1000 ปี
- Lv 99 + fully earned advancement, สายอาชีพและความเข้าใจถึงเกณฑ์
- มีหลักฐานขอบเขตเทพที่พบจากชีวิตจริง
- เลือก goal “เป็นเทพ” เองหลังพบหลักฐาน
- ผ่าน 3 trials เฉพาะ career รวม one social/ethical and one mastery task
- เดินทางตาม story choices ถึง divine region
- เวลามีปฏิสัมพันธ์จริง ≥30 นาที (ไม่คิดเวลา idle/tab hidden)
- player manually chooses Ascend; ถ้าปฏิเสธยังอยู่ Lv99 แล้วดำเนินชีวิตได้

ห้ามออก level100 ก่อน gate ทุกข้อ; 100 เป็น terminal god conclusion, ไม่ใช่ได้รับ power แล้วแอบจบโดยไม่มีฉากจบ

# 08 — อายุขัย / ความลำบาก / Breakthrough

- วัยต้นมี natural lifespan ที่สมเหตุสมผลแยกตาม race และบริบท (ไม่มีการรับรองชีวิตยืนยาว)
- Lv ไม่ใช่ค่าอายุขัยตายตัวเพียงตัวเดียว; race, constitution, health, talents, long-life practices, items, injuries, choices และ quest conditions ล้วนมีผล
- design example tier gates: ไม่มี breakthrough มีอายุธรรมชาติ; longevity I ช่วยขยายเป้าหมายถึง 120–160, II ถึง 250–350, III ถึง 500–650, IV ถึง 1000+ แต่ต้องมีเงื่อนไขและความเสี่ยง
- Lv80 ไม่เท่ากับอายุ 80; แสดง unit ชัดทุกที่, ไม่เอา year ไปเปรียบ level ผิด
- หลัง 80 ปี narrator ใช้ montage สนับสนุนจุดตัดสินใจ 5–8 จุดใน 80–150 ปี แต่ผู้เล่นทำกิจวัตรกับ focus เพิ่มเติมได้หากต้องการ
- ชีวิตสั้นต้องมี legacy endings ที่มีคุณค่า ไม่ใช่เกมแพ้เฉย ๆ; การสิ้นสุดชีวิตเกิดจากระบบ event/health/lifespan ที่ตรวจสอบได้ ไม่สุ่มตายแบบไม่สื่อเหตุผล

# 09 — Map + Travel Choices (critical separation)

**คำสั่งล่าสุด:** ให้ Map เป็น informational viewer เป็นหลัก ไม่ให้กดหมุดเพื่อเดินทางหรือเปิดเว็บหน้าใหม่

- แผนที่ 4 scales: local town, country, world, high-realm เมื่อปลดล็อก
- Map modal แสดง Current Position marker, Birth Position, known landmarks, paths, unexplored fog; zoom/pan, legend และ selected-location card แบบอ่านอย่างเดียว
- **การเดินทางจริงอยู่ใน Story Choice และ Action Focus** ที่กดจากหน้าหลักเท่านั้น ไม่ทำผ่านหมุดแผนที่; เมื่อตัดสินใจย้ายแล้ว `currentLocationId` อัปเดต, ภาพฉากและ avatar anchor เปลี่ยนทันที
- ปัจจุบันมี 20 location IDs; ต้องรักษา canonical IDs และเส้นทางเดิม เพิ่ม location ใหม่ตาม World Bible โดยมี coordinates ตายตัว, region, type, background, climate, hazards, services, route graph
- ห้ามสุ่มหมุดอิสระจาก story; ทุก story location ต้อง resolve ไป canonical locationId ที่มีใน world graph
- Travel Choice Card มี: ที่หมาย, เส้นทาง, วันที่ใช้, ค่าใช้จ่าย, ความต้องการด้าน stamina/equipment, ขอบเขตพลังที่แนะนำ, risk category, modeled survival probability หรือ `ไม่สามารถประเมินได้` ถ้าไม่มี model, reward expectation และเหตุการณ์ที่อาจเกิด
- survivability number ต้องคำนวณจาก `encounterModel(state, route, chosenStrategy)` + actual seeded outcome, ไม่แต่งเลข 97% บน UI หากยังไม่มีสมการที่ทดสอบได้; แสดงช่วงความไม่แน่นอนหรือ label ง่าย ๆ หากข้อมูลไม่พอ
- ทางฟรีหรือปลอดภัยกว่าไม่ควรถูกตัดทิ้งเพียงเพราะเงินน้อย; choices เช่น ไปกับคาราวาน, รอฤดู, ฝึกก่อน, ไม่ไป
- Travel encounter อาจเกิดดักทาง, โจรในโลกแฟนตาซี, พายุ, ทางปิด, คนขอความช่วยเหลือ, ผู้ร่วมทางยื่นข้อเสนอ, ความเข้าใจผิด; ต้องมีวิธีเจรจา/หลบ/ขอความช่วยเหลือ/ถอยอย่างสมเหตุสมผล
- Map viewer ไม่ต้องมี action travel buttons หรือธุรกรรมในแผนที่

# 10 — Art Pipeline / 8-bit & 16-bit local assets

สำคัญมาก: *รูปภาพทั้งหมดต้องใช้งานได้จริงและเก็บอยู่ใน repo*, ไม่เรียก image-generation API ทุกครั้งที่ผู้เล่นเปิดเว็บ

## ที่เก็บไฟล์

- `public/assets/sprites/characters/` sprite sheets transparent PNG/WebP
- `public/assets/sprites/garments/` upper/pants/shoes/hats/cloaks/armor/shields/held props
- `public/assets/sprites/effects/` aura/magic/ground particles
- `public/assets/scenes/locations/` each canonical location id unique scene asset
- `public/assets/scenes/interiors/` inn/house/classroom/forge/guild/hall/camp/library/temple/shop etc
- `public/assets/maps/` tiles and composed maps
- `public/assets/items/` weapons/tools/consumables/treasures
- `public/assets/manifest.json` asset IDs, path, dimensions, hash, license, location linkage and fallback
- `scripts/generate-art.mjs` or `scripts/generate-art.py` deterministic local generation from palette+template+seed when generative image tool not available

**ภาพต้องสร้างจริง ไม่ใช่เขียนแค่ชื่อไฟล์**: หาก Codex มีเครื่องมือสร้างภาพเรียกใช้งานได้ ให้สร้าง original sprites/tiles/backgrounds และบันทึกเป็น local assets; หากไม่มีให้ใช้ procedural pixel-art generation (Canvas/SVG -> PNG/WebP) ที่ผูกกับ data, ภาพแต่ละแหล่งต้องมี silhouette/landmark/palette แตกต่างจริง แล้วรายงานความแตกต่างระหว่าง artwork ที่ AI สร้างกับภาพ procedural อย่างซื่อสัตย์

20+ visible variants ต่อหมวดอย่างน้อย: hair shapes, hair colors, face shapes, eye variants, skin tones, shirt/top, pants, shoes, hats; optional jacket, cloak, accessories, racial ears/horns/tail ตาม race; parent DNA inheritance weighting + small variation; ไม่ใช้ skin/race เป็นลำดับความดีหรือความสามารถ

All layered at same sprite anchor/scale (เช่น logical 48×64/64×80) และใช้ `image-rendering: pixelated`; ต้องตรวจ pixel registration/occlusion ให้จริง ไม่ใช่เลื่อนผม/ตา/รองเท้าผิดตำแหน่ง

`appearance` random หนเดียวตอนเกิด; ผลลัพธ์ immutable สำหรับ facial features; outfit เป็น owned/equipped, ไม่สุ่มเปลี่ยนทุก render

Equipment/backpack effects: equipped items derived stat modifiers; renderer uses actual equipped itemIds; เมื่อเปลี่ยน sword/coat/shoes, sprite เปลี่ยนด้วย; ไม่มี gear -> ไม่วาดถือ gear; changes to career may affect uniform only if obtained/worn correctly

Background: location scene = area environment + building/interior + weather/season/daylight + actor placement, exactly map locationId; scene should reflect house/inn/school/dojo/barracks/forest/harbor etc when story is there; use fallback only if no primary asset and audit missing asset

Generate high-quality 16-bit style environments (320×180 / 256×144 logical), use 8-bit-style UI icon if beneficial; avoid huge nonresponsive full-screen illustrations, mobile compressed WebP, lazy-load, batch caching

UI should display 'asset unavailable' fallback gracefully only in development; release checks enforce 100% required location mapping coverage. Preserve local asset file rights/licensing; original artwork only

# 11 — Economy / Gear / NPC / Combat / Relationships

- Owned inventory: id, quantity, quality, slots, stack rules, capacity, gold transaction logs; recipes and service prices real; no free phantom item
- Shop purchase/return, job salary, business, trade, travel fee, food and rest affect state; price never negative; transaction atomic
- Encounter combat **fictional, non-graphic** turn-based: strategy stance, preparation, escape, negotiate, allies, consequences, resources; no realistic violence instructions
- Combat scaling by realm: weak foes in safe nearby zones, mid-tier guild quests, high-tier ancient ruins, divine rare quests; threat ratio and location warnings must align; no guaranteed win from level alone
- Moral/economic choices: business negotiation, dubious offer, theft as narrative decision, fraud accusation, rival clan dispute, reconciliation/retreat/mediation; produce reputation, restitution or long-term consequences, not instructions for real crime
- NPC memories: names, goals, affiliation, age, relation delta, location, encounter ID, last event; seasonal life updates; 100 authored important NPC target (not auto-generated parent placeholder counted as authored)
- Romantic relationships only between adult characters; optional, non-explicit, mutually consenting, no forced pairing/harem; family/children modeled age appropriately
- Negative relationships can lead to betrayal/conflict, but needs foreshadowing and player counterplay; no arbitrary scripted punishment

# 12 — Story World Bible / Authors' source of truth

`02_STORY_WORLD_BIBLE.md`: geography, age rules, named NPCs, original 20 profession × 10 titles, long-lived societies, deity ending ideals, original lore and continuity

`03_CONTENT_DATA.md`: 120 authored fork briefs across professions and age bands; 120 original ambient/major event seeds; condition/age/location/cause/effect/followup; Codex must implement actual runnable events and add original prose. A brief seed is **not** counted as implemented scene until fully coded and reachable

All player-facing narrative in Thai; each card 1–4 succinct Thai sentences, detailed via progressive pages/chronicle; avoid repetitive generative copy, use unique vocabulary per region and career; no copyrighted character, named magic system, sect, plot, dialogue or artwork from inspiration media

## Original arc outline

- Birth/0–3: Home, caregivers, immediate environment, learning by senses; no baby self-training
- 4–11: village life, friends, simple craft, first books, age-appropriate learning and minor risk
- 12: awakening ceremony, 8 eligible directions chosen out of existing 20, mentor/funding alternatives
- 13–19: school, apprenticeship, solo exploration with guardrails, faction introduction, friendships
- 20–39: careers, travel, contracts, business, training mastery, voluntary relationship stories
- 40–79: apprentices, city responsibilities, political choices, specialization, risky breakthrough
- 80–149: first extension quests, moving settlements, aging family, local legends
- 150–299: era changes, hidden archives, lifetime projects
- 300–599: balancing faction influence, city legacies, evolving methods
- 600–999: unifying one's discipline, quiet pilgrimages, trials of identity
- 1000+: discovered path, voluntary goal, profession-specific three trials, level 100 and ending

# 13 — Progression and interaction contracts

Every scene/choice has `timeCost`, `minAgeMonths/maxAgeMonths`, `requirements`, `effects`, `followUps`, `locationId` and safe alternative. Do not display a choice for unavailable careers or implausible skills; do not fake ages by hardcoding narration

All randomized outcome rolls derive from a seed+event instance key; do not reroll on UI refresh/navigation (same tab), and do not reveal secret outcomes ahead of choice

Return player to the main decision surface after each interaction. Story background automatically syncs to actual scene location/time; no navigation reload to change modal

Long-run memory archives compact faithfully. Do not save active GameState anywhere (localStorage/IndexedDB/sessionStorage/service workers/URL/backend). Only terminal summary `reborn_finished_lives_v1` persists and never grants Resume. Do not auto-archive unfinished refresh/exit as death

# 14 — Metrics and testing / proof of actual completion

Required metrics by *actual implementation*:

- `uniqueForksAuthored` / `reachableForks`: target ≥120 conceptual forks, ≥100 proven runnable fork nodes
- `uniqueChoicesAuthored`: ≥500 genuinely different records with effects
- `eventTemplates`: ≥350 separate authored situations eventually (V7 pack contains starter bank; expand fully)
- `endingsAuthored/reachable`: target 100 non-identical end paths (20 god-career paths included) but milestone-gated; 6 existing must remain functional
- `NPCProfiles`: 100 important independently authored profiles eventually
- `career`: 20 existing base family IDs, ≥80 unique advanced/hybrid routes eventually
- `locations`: retain 20 canonical; increase to 150 graph-grounded locations eventually; every added location gets pixel background, services/entry/exit, plot hook
- `assets`: real PNG/WebP/SVG files with manifest/hashes, file existence and render tests; counts separately for sprites, distinct artworks and combinations

Write scripts to check:

- wrong infant actions by minAgeMonths; 0-month game shows no adult training
- expected age/month consistent on all choice pages
- one action changes exactly appropriate time once
- timer 1x–16x changes only wall-clock advance rate, not event outcomes (seed determinism)
- pending critical decisions block autoplay and speed
- 1000 seeded path simulations (including early death/safe, poor wealthy, 20 careers, 80–150, 1000+)
- top8 eligible only and no unavailable career shown
- grade training multipliers consistent; non-affinity still possible
- power high-grade unlock conditions and god gate at 1000+ age/active 30min
- death/terminal gallery idempotent and reload resets run
- map pins refer canonical location IDs and view-only (never travel by map)
- travel as choice updates current location, background, costs, days and risks atomically
- no phantom item after equip, inventory ownership, sprite layer matches equipment
- family DNA deterministic, appearance ≥20 distinct visual variants each group
- mobile 320/360/390/768/1024/1366/1920, reduced-motion, keyboard focus, no overflow
- all assets referenced exist and load in production `base` path `/alltest/`
- route probability estimator is calibrated against simulator or hidden if unsupported
- text uses content narrative in data, no placeholder Latin lorem, no dead buttons

## Required commands (adapt only if actual package changes)

```sh
npm ci
npm test
npm run content
npm run build
node scripts/stage-site.mjs
npm run test:e2e
npm run preview -- --port 4185
node scripts/verify-production.mjs http://127.0.0.1:4185/
node scripts/verify-progression.mjs http://127.0.0.1:4185/
node scripts/verify-one-life.mjs http://127.0.0.1:4185/
```

Verify actual live `https://ninon0406.github.io/alltest/` if internet/browser allowed; never treat build pass alone as proof of public health

# 15 — Implementation phases; prioritized to deliver useful game quickly

**PHASE V7-1**: Audit current HEAD; update directives, drop contradictory older rules, regression snapshots; ensure live run remains in memory only

**PHASE V7-2**: Correct infant & time/pacing behavior, dedicated pause speed/progress bar that stops for choices, event precedence, first 0–36 months truthful; show age in months until 3y

**PHASE V7-3**: Decision engine & branching content infrastructure; port real 120 fork briefs, implement first 30–50 fully authored forks across 0–19, verify followups; after solid expand to ≥100

**PHASE V7-4**: V2 inherited pixel appearance 20+ each category; sprite sheet pipeline and stable father/mother resemblance; equipment display wired only after ownership

**PHASE V7-5**: Distinct scene art, interiors, location id asset manifest and map UI read-only; travel through story choices, risks and rewards; preserve canonical world graph

**PHASE V7-6**: 8-of-20 post-ceremony eligible cards, clear status/focus/affinity, career XP/training balance, career-specific 10-tier titles

**PHASE V7-7**: Owned equipment + economy + contextual encounters + non-graphic combat, relationships and adult NPCs

**PHASE V7-8**: 1–99 power progression, milestone FX, lifespan breakthroughs and fast time for 80–1000, world eras

**PHASE V7-9**: Expand 350+ events, 500+ meaningful choices, 100 NPC, 150 locations, 80 advanced careers, more regional imagery, 100 endings including 20 god final variants

**PHASE V7-10**: QA sweeps & full release; edge-case balance, mobile, asset performance, public GitHub Pages validation

**Order may be dependency-adjusted** e.g., minimum item ownership before drawing held weapons. Never claim later phases done because a basic UI exists.

# 16 — How Codex should work through constraints

1. Read current HEAD and existing next-task file.
2. Compare concrete code/test evidence with this directive.
3. Make a tight implementation plan internally (no long user-facing narration).
4. Implement the **largest complete testable slice** of the earliest incomplete phase in this task, rather than a huge unfinished batch.
5. Run required checks and fix errors; do not mark partial as completed.
6. Update actual counts, `docs/NEXT_CODEX_TASK.md`, AGENTS/ROADMAP/CHANGELOG/CONTENT_MANIFEST as relevant; include failed tests or external verification blockers.
7. Build + stage assets and publish only within repo permissions and authorization; verify real public page when possible.
8. On next Codex task resume using newest HEAD and next-task file. Never claim autonomous infinite background work or completion after task ends.

## Required final report format

- Working HEAD/commit hash
- Files changed grouped by feature
- Implemented actual mechanics and UI behavior
- Story content added: authored vs reachable counts
- Art assets created: actual files and paths
- Test commands, totals, failures and skipped checks
- Deployment link + observed public verification or stated limitation
- Exact remaining incomplete phase and next 3 implementation steps
- Any deliberate tradeoffs and blockers

# 17 — Completion gate / do not misrepresent progress

A phase is DONE only when its UI+state+tests+production behavior are integrated. A target count in this document is **not** evidence of implementation. If the environment has no image generation tool, use authentic procedural sprites and report it, never claim AI generated images. Do not create a thousand lines of story prose in a code comment and count it as game content.

# 18 — START EXECUTING NOW

Inspect `docs/NEXT_CODEX_TASK.md` then implement V7-2 infant/time fix as first visible enhancement if not yet finished; coordinate with appearance V7-4 if that phase is already underway and avoid regressions. Next implement the decision engine and the first coherent story branch cluster with actual gameplay. Do not stop at planning; write, test, and publish real changes. Preserve the game's one-life memory-only contract throughout.

<!-- END 01_MASTER_DIRECTIVE.md -->


---

<!-- BEGIN 02_STORY_WORLD_BIBLE.md -->

# REBORN — ORIGINAL WORLD & CHARACTER BIBLE
## Canonical lore, place atlas, career tier names and important NPC catalogue
> ต้นฉบับนี้สร้างสำหรับ REBORN; ใช้เป็น Source Bible ให้ Codex ไม่ใช่คำอ้างว่าระบบเหล่านี้ทำงานในเกมแล้ว

## ปฐมบทโลกเอลินดรา
เอลินดราไม่ใช่โลกที่รอผู้กล้ามากอบกู้ ทุกเมืองมีฤดูกาล ตลาด อาชีพ ความทรงจำ และผู้คนที่ดำเนินชีวิตอยู่ก่อนผู้เล่นถือกำเนิด

พลังของโลกไหลผ่านเส้นชีพจรที่ไม่สามารถครอบครองได้ทั้งหมด นักวิชาการมองว่าเป็นแบบแผน นักฝึกมองว่าเป็นพลัง พ่อค้ามองว่าเป็นแหล่งเปลี่ยนแปลงเส้นทางค้า

มนุษย์ เผ่าพฤกษา เผ่าภูผา และเผ่าทะเลต่างมีประเพณีและรูปแบบชีวิต ไม่ใช่ลำดับความเหนือกว่า เผ่าพันธุ์ส่งผลต่อรูปลักษณ์ สิ่งแวดล้อม และสังคม ไม่ใช่ความดีหรือความชั่ว

สำนักและสถาบันเปิดรับผู้เรียนไม่เท่ากัน แต่ทุกพื้นที่มีงานพื้นฐานและอาจารย์อิสระที่เป็นทางเลือกแก่ผู้ไม่มีทุน

การปลุกพลังเมื่อราวอายุ 12 ปีเป็นพิธีสะท้อนแนวถนัด มิใช่คำพิพากษาชีวิต ผู้เรียนอาจเปลี่ยนเส้นทางได้จากความพยายามและการพบผู้สอนที่เหมาะ

เหตุการณ์ใหญ่ในประวัติศาสตร์จะปรากฏเมื่อการกระทำของผู้เล่นพาไปเกี่ยวข้อง นักฝึกในหมู่บ้านอาจอยู่โดยไม่เคยได้ยินข้อพิพาทระดับทวีป

ความเป็นเทพเป็นความเป็นไปได้สูงสุดที่ต้องค้นพบด้วยตัวเอง หลังมีอายุ 1,000 ปีและผ่านบทพิสูจน์แห่งศาสตร์ของตน แม้เป็นเทพก็เป็นฉากจบที่ผู้เล่นยินยอมเลือก ไม่ใช่โชคจากพิธีเกิด

### สัดส่วนแนวทางการเล่า
- 70% ชีวิตประจำวัน กิจกรรมในเมือง เทศกาล งาน การสำรวจ และการเดินทางอย่างสมัครใจ
- 20% การเรียน อาชีพ ศิษย์/ครู มิตรภาพ ความสัมพันธ์ครอบครัวและคู่ชีวิตผู้ใหญ่
- 10% ตำนาน รอยแยกของพลัง โลกเก่า และความเป็นเทพ; เลือกไม่ติดตามได้

## ภูมิศาสตร์และการทำแผนที่
5 ทวีปจัดวางบนแผนที่โลก 900x700 พิกัดในตารางต่อไปเป็นพิกัดออกแบบเริ่มต้น ไม่ใช่ค่าที่บังคับทับ 20 canonical locations ปัจจุบัน ให้ Codex match aliases ใน data เดิมก่อนเพิ่ม IDs ใหม่
แต่ละสถานที่มี `sceneId`/`artId` ที่ต้องสร้างภาพจริงใน repo, `x,y` สำหรับ pin และ `storyHook` ที่อย่างน้อยต้องนำไปใช้ในเหตุการณ์หนึ่งครั้ง

### อาร์เวเนีย — อาณาจักรของแม่น้ำ ทุ่งหญ้า และนคร
โทนภาพ: biome `plains` แต่ landmark ของแต่ละจุดต้องแตกต่าง เช่น เมืองหลวงมีสิ่งปลูกสร้างหลักเฉพาะตัว ไม่ใช้ภาพทุ่งหญ้าเดียวกันทุกหมู่บ้าน
- **arvenia_01 · นครลูเมียร์** (`capital`; map 70,65; art `scene_arvenia_01`) — ภาพ: พระราชวังและหอนาฬิกา. ปมชีวิต: ตราประทับขุนนางหายจากคลังเอกสาร.
- **arvenia_02 · เมืองออร์เดล** (`city`; map 108,69; art `scene_arvenia_02`) — ภาพ: ตลาดไม้และสะพานหิน. ปมชีวิต: คู่ค้าขอให้สืบราคาธัญพืช.
- **arvenia_03 · เมืองเบลไวน์** (`city`; map 146,73; art `scene_arvenia_03`) — ภาพ: คลองสามสาย. ปมชีวิต: สมาคมเรือต้องการล่ามอิสระ.
- **arvenia_04 · เมืองเฟรนลีย์** (`city`; map 184,65; art `scene_arvenia_04`) — ภาพ: หอสมุดบนเนิน. ปมชีวิต: เด็กฝึกพบหน้าตำราที่ถูกฉีก.
- **arvenia_05 · เมืองคอร์วิน** (`city`; map 222,69; art `scene_arvenia_05`) — ภาพ: ป้อมคุ้มทาง. ปมชีวิต: มีการถกเถียงเรื่องภาษีเกวียน.
- **arvenia_06 · เมืองเมโลรา** (`city`; map 260,73; art `scene_arvenia_06`) — ภาพ: สวนฤดูใบไม้ผลิ. ปมชีวิต: ชาวสวนค้นพบเมล็ดพันธุ์เรืองแสง.
- **arvenia_07 · หมู่บ้านเฮเซล** (`village`; map 79,108; art `scene_arvenia_07`) — ภาพ: ทุ่งข้าวและกังหันลม. ปมชีวิต: ปีนี้น้ำในคลองมาช้ากว่าปกติ.
- **arvenia_08 · หมู่บ้านวินด์บรูค** (`village`; map 117,112; art `scene_arvenia_08`) — ภาพ: สะพานลำธาร. ปมชีวิต: เพื่อนวัยเด็กสร้างแพจำลอง.
- **arvenia_09 · หมู่บ้านเซลัน** (`village`; map 155,116; art `scene_arvenia_09`) — ภาพ: ต้นโอ๊กกลางชุมชน. ปมชีวิต: มีนิทานเกี่ยวกับผู้เฝ้าป่า.
- **arvenia_10 · หมู่บ้านลิสการ์ด** (`village`; map 193,108; art `scene_arvenia_10`) — ภาพ: ลานฝึกเล็ก. ปมชีวิต: ครูฝึกหาเด็กช่วยจัดอุปกรณ์.
- **arvenia_11 · หมู่บ้านริเวนทอล** (`village`; map 231,112; art `scene_arvenia_11`) — ภาพ: ท่าเรือแม่น้ำ. ปมชีวิต: เรือบรรทุกตำรามาช้า.
- **arvenia_12 · หมู่บ้านเฟิร์นวูด** (`village`; map 269,116; art `scene_arvenia_12`) — ภาพ: เรือนเพาะชำ. ปมชีวิต: ยารักษาพืชผิดฤดู.
- **arvenia_13 · หมู่บ้านสโตนเมโดว์** (`village`; map 70,151; art `scene_arvenia_13`) — ภาพ: บ้านหินและทุ่งเลี้ยง. ปมชีวิต: ผู้ใหญ่จัดงานแข่งทักษะชุมชน.
- **arvenia_14 · หมู่บ้านคาสต์วาล** (`village`; map 108,155; art `scene_arvenia_14`) — ภาพ: ป่าชายทุ่ง. ปมชีวิต: นายช่างตามหาทองแดงเก่า.
- **arvenia_15 · หมู่บ้านเอมเบอร์ริล** (`village`; map 146,159; art `scene_arvenia_15`) — ภาพ: เตาเผาอิฐ. ปมชีวิต: ผลงานเครื่องปั้นถูกสลับ.
- **arvenia_16 · หมู่บ้านเกรนฮอลล์** (`village`; map 184,151; art `scene_arvenia_16`) — ภาพ: โกดังข้าว. ปมชีวิต: มีบัญชีผลผลิตไม่ตรงกัน.
- **arvenia_17 · หมู่บ้านซีดพาธ** (`village`; map 222,155; art `scene_arvenia_17`) — ภาพ: ทางเดินเมล็ดพันธุ์. ปมชีวิต: พืชหายากขึ้นริมทาง.
- **arvenia_18 · หมู่บ้านคริสต์บริดจ์** (`village`; map 260,159; art `scene_arvenia_18`) — ภาพ: สะพานสีขาว. ปมชีวิต: ผู้เฒ่าเล่าเรื่องคนแปลกหน้า.
- **arvenia_19 · หมู่บ้านเซเวนโฮม** (`village`; map 79,194; art `scene_arvenia_19`) — ภาพ: บ้านเจ็ดตระกูล. ปมชีวิต: สองบ้านเถียงกันเรื่องแนวรั้ว.
- **arvenia_20 · หมู่บ้านสกายทิล** (`village`; map 117,198; art `scene_arvenia_20`) — ภาพ: เนินชมดาว. ปมชีวิต: ผู้สังเกตฟ้าพบดาวหรี่แสง.
- **arvenia_21 · โรงเตี๊ยมลูกจันทร์** (`inn`; map 155,202; art `scene_arvenia_21`) — ภาพ: บ้านไม้สองชั้น. ปมชีวิต: นักเดินทางทิ้งจดหมายไม่จ่าหน้า.
- **arvenia_22 · โรงเรียนแสงเช้า** (`school`; map 193,194; art `scene_arvenia_22`) — ภาพ: ลานหญ้ากับกระดานหิน. ปมชีวิต: ครูต้องการจัดงานแสดงฝีมือ.
- **arvenia_23 · ลานฝึกออร์เดล** (`training`; map 231,198; art `scene_arvenia_23`) — ภาพ: พื้นหินลายวง. ปมชีวิต: ศิษย์ใหม่ทะเลาะเรื่องลำดับฝึก.
- **arvenia_24 · ตลาดโค้งน้ำ** (`market`; map 269,202; art `scene_arvenia_24`) — ภาพ: แผงผ้าริมคลอง. ปมชีวิต: มีคนขายแผนที่โบราณที่น่าสงสัย.
- **arvenia_25 · สวนเอลเดอร์** (`garden`; map 70,237; art `scene_arvenia_25`) — ภาพ: เรือนกระจกแก้ว. ปมชีวิต: ปลูกพืชได้เฉพาะคืนเดือนมืด.
- **arvenia_26 · หอระฆังเหนือธาร** (`landmark`; map 108,241; art `scene_arvenia_26`) — ภาพ: ระฆังเงินริมแม่น้ำ. ปมชีวิต: เสียงระฆังดังทั้งที่ไม่มีคนตี.
- **arvenia_27 · หอสมุดร่มฝน** (`library`; map 146,245; art `scene_arvenia_27`) — ภาพ: บันไดหินกับหน้าต่างสี. ปมชีวิต: ชุดตำราถูกจัดผิดชั้น.
- **arvenia_28 · ท่าคาราวานตะวันทอง** (`caravan`; map 184,237; art `scene_arvenia_28`) — ภาพ: รถลากและป้ายทาง. ปมชีวิต: พ่อค้าขาดผู้นำทางชั่วคราว.
- **arvenia_29 · ป่าชุมชนไอวี่** (`forest`; map 222,241; art `scene_arvenia_29`) — ภาพ: ต้นไม้เตี้ยและเห็ดสีฟ้า. ปมชีวิต: ขบวนเก็บสมุนไพรพบร่องรอยสัตว์.
- **arvenia_30 · ซากหอสังเกตการณ์** (`ruin`; map 260,245; art `scene_arvenia_30`) — ภาพ: หออิฐสึกและเถาวัลย์. ปมชีวิต: มีสัญลักษณ์กลุ่มช่างโบราณ.

### วัลดอร์ — เทือกเขา หุบเขา โรงหลอมและฐานฝึก
โทนภาพ: biome `mountain` แต่ landmark ของแต่ละจุดต้องแตกต่าง เช่น เมืองหลวงมีสิ่งปลูกสร้างหลักเฉพาะตัว ไม่ใช้ภาพทุ่งหญ้าเดียวกันทุกหมู่บ้าน
- **valdor_01 · นครแบล็คริดจ์** (`capital`; map 365,65; art `scene_valdor_01`) — ภาพ: ปราการหินดำ. ปมชีวิต: คำสั่งซ่อมกำแพงเกิดความขัดแย้ง.
- **valdor_02 · เมืองฮาร์ดเฟล** (`city`; map 403,69; art `scene_valdor_02`) — ภาพ: ลานหินและโรงตี. ปมชีวิต: โลหะล็อตใหม่มีลายแปลก.
- **valdor_03 · เมืองเรดพาส** (`city`; map 441,73; art `scene_valdor_03`) — ภาพ: ด่านหุบผา. ปมชีวิต: เส้นทางขนแร่ถูกหิมะปิด.
- **valdor_04 · เมืองเฟอร์รัน** (`city`; map 479,65; art `scene_valdor_04`) — ภาพ: หอนาฬิกาโรงงาน. ปมชีวิต: ช่างหนุ่มขอให้ทดสอบสิ่งประดิษฐ์.
- **valdor_05 · เมืองสโตนเวค** (`city`; map 517,69; art `scene_valdor_05`) — ภาพ: ป้อมริมหน้าผา. ปมชีวิต: หน่วยลาดตระเวนต้องการแผนเส้นทาง.
- **valdor_06 · เมืองคอปเปอร์เบย์** (`city`; map 555,73; art `scene_valdor_06`) — ภาพ: หมู่เตาหลอม. ปมชีวิต: ฝุ่นหลอมทำให้สวนใกล้เมืองเสียหาย.
- **valdor_07 · หมู่บ้านแอชฮิล** (`village`; map 374,108; art `scene_valdor_07`) — ภาพ: เนินเถ้าถ่าน. ปมชีวิต: บ่อน้ำใกล้ภูเขามีกลิ่นแร่.
- **valdor_08 · หมู่บ้านเฟลนอร์** (`village`; map 412,112; art `scene_valdor_08`) — ภาพ: ทุ่งหญ้าหิมะ. ปมชีวิต: นักฝึกแข่งเดินทางบนทางชัน.
- **valdor_09 · หมู่บ้านสตีลรูท** (`village`; map 450,116; art `scene_valdor_09`) — ภาพ: ฐานรากเหล็ก. ปมชีวิต: พิพิธภัณฑ์หมู่บ้านถูกย้าย.
- **valdor_10 · หมู่บ้านฮอลโลว์ร็อก** (`village`; map 488,108; art `scene_valdor_10`) — ภาพ: ถ้ำหินตื้น. ปมชีวิต: มีแสงอบอุ่นลอดจากผนัง.
- **valdor_11 · หมู่บ้านไอรอนลีฟ** (`village`; map 526,112; art `scene_valdor_11`) — ภาพ: ต้นสนใบเงิน. ปมชีวิต: ชาวบ้านทำถ่านจากกิ่งร่วง.
- **valdor_12 · หมู่บ้านเกรย์ฟอร์ด** (`village`; map 564,116; art `scene_valdor_12`) — ภาพ: สะพานเหล็ก. ปมชีวิต: เสียงรถลากรบกวนผู้พักอาศัย.
- **valdor_13 · หมู่บ้านอัลพิน** (`village`; map 365,151; art `scene_valdor_13`) — ภาพ: ลานหิมะ. ปมชีวิต: เด็กเล็กติดใจนิทานท้องถิ่น.
- **valdor_14 · หมู่บ้านมอสแฮมเมอร์** (`village`; map 403,155; art `scene_valdor_14`) — ภาพ: หินผามอสส์. ปมชีวิต: ช่างทุบหินพบรูปแกะสลัก.
- **valdor_15 · หมู่บ้านซีเมนต์ครอส** (`village`; map 441,159; art `scene_valdor_15`) — ภาพ: เรือนหินขาว. ปมชีวิต: การสร้างทางเท้าพบช่องเก่า.
- **valdor_16 · หมู่บ้านคลีฟวูด** (`village`; map 479,151; art `scene_valdor_16`) — ภาพ: ท่อนไม้ภูเขา. ปมชีวิต: เกวียนไม้ขาดคนพาเที่ยว.
- **valdor_17 · หมู่บ้านโฟร์จเนสต์** (`village`; map 517,155; art `scene_valdor_17`) — ภาพ: กระท่อมใกล้ปล่องไฟ. ปมชีวิต: ผู้ดูแลเตาขอสูตรลดควัน.
- **valdor_18 · หมู่บ้านเบลโลว์** (`village`; map 555,159; art `scene_valdor_18`) — ภาพ: ร่องลม. ปมชีวิต: เสียงหวีดจากอุโมงค์เก่า.
- **valdor_19 · หมู่บ้านแกรนิตฮอลล์** (`village`; map 374,194; art `scene_valdor_19`) — ภาพ: เหมืองทรายหิน. ปมชีวิต: เครื่องมือของกลุ่มช่างหาย.
- **valdor_20 · หมู่บ้านซิลเวอร์ธอร์น** (`village`; map 412,198; art `scene_valdor_20`) — ภาพ: ป่าพุ่มหนามเงิน. ปมชีวิต: พบรอยทางสัตว์ที่มาผิดฤดู.
- **valdor_21 · โรงเตี๊ยมค้อนพัก** (`inn`; map 450,202; art `scene_valdor_21`) — ภาพ: บ้านหินเตี้ย. ปมชีวิต: ลูกค้าพูดถึงคำขอช่วยของนักตีเหล็ก.
- **valdor_22 · สถาบันผู้พิทักษ์ผา** (`school`; map 488,194; art `scene_valdor_22`) — ภาพ: ลานเดินบนหน้าผา. ปมชีวิต: ครูขาดผู้ช่วยจัดเวร.
- **valdor_23 · ค่ายฝึกทิศเหนือ** (`camp`; map 526,198; art `scene_valdor_23`) — ภาพ: เต็นท์ฝึกและป้ายสี. ปมชีวิต: ผู้ฝึกใหม่อยากปรับกฎพัก.
- **valdor_24 · ตลาดแร่รุ่งอรุณ** (`market`; map 564,202; art `scene_valdor_24`) — ภาพ: แผงแร่ใต้หลังคา. ปมชีวิต: ราคาผงแร่ผันผวน.
- **valdor_25 · โรงหลอมมังกรหิน** (`forge`; map 365,237; art `scene_valdor_25`) — ภาพ: ปล่องเตาสองยอด. ปมชีวิต: โลหะบางชนิดไม่ยอมรับอาคม.
- **valdor_26 · อุโมงค์แสงแร่** (`tunnel`; map 403,241; art `scene_valdor_26`) — ภาพ: อุโมงค์ผลึก. ปมชีวิต: เครื่องหมายทางขาดไปสองจุด.
- **valdor_27 · ธารน้ำแข็งยืนยง** (`landmark`; map 441,245; art `scene_valdor_27`) — ภาพ: หิมะสว่าง. ปมชีวิต: แสงเหนือสะท้อนเป็นรูปลายแผนที่.
- **valdor_28 · สนามแข่งแรงศรัทธา** (`arena`; map 479,237; art `scene_valdor_28`) — ภาพ: เวทีไม้ในเมือง. ปมชีวิต: การแข่งขันทักษะต้องการกรรมการ.
- **valdor_29 · ป่าหินเสียงก้อง** (`forest`; map 517,241; art `scene_valdor_29`) — ภาพ: เสาหินธรรมชาติ. ปมชีวิต: เสียงสะท้อนคล้ายคำอธิบาย.
- **valdor_30 · ป้อมอาร์คติน** (`fort`; map 555,245; art `scene_valdor_30`) — ภาพ: กำแพงหินมุมสูง. ปมชีวิต: การซ่อมป้อมต้องการผู้ประสานงาน.

### เซเลสเทีย — หอสมุด สถาบันและแหล่งค้นคว้า
โทนภาพ: biome `arcane` แต่ landmark ของแต่ละจุดต้องแตกต่าง เช่น เมืองหลวงมีสิ่งปลูกสร้างหลักเฉพาะตัว ไม่ใช้ภาพทุ่งหญ้าเดียวกันทุกหมู่บ้าน
- **celestia_01 · นครอัสเทล** (`capital`; map 645,65; art `scene_celestia_01`) — ภาพ: หอคอยกระจก. ปมชีวิต: กฎการยืมตำราโบราณถูกแก้ไข.
- **celestia_02 · เมืองเนรูม** (`city`; map 683,69; art `scene_celestia_02`) — ภาพ: คลองเรืองแสง. ปมชีวิต: ปรากฏละอองแสงผิดลักษณะ.
- **celestia_03 · เมืองวาเรล** (`city`; map 721,73; art `scene_celestia_03`) — ภาพ: ลานประดิษฐ์. ปมชีวิต: กลไกคำนวณเสียก่อนงานประกวด.
- **celestia_04 · เมืองอีซาริน** (`city`; map 759,65; art `scene_celestia_04`) — ภาพ: หอสังเกตการณ์. ปมชีวิต: สมุดดาวสองเล่มไม่ตรงกัน.
- **celestia_05 · เมืองฟอเรล** (`city`; map 797,69; art `scene_celestia_05`) — ภาพ: เรือนแก้วกลางเมือง. ปมชีวิต: วัสดุเวทสะท้อนความฝัน.
- **celestia_06 · เมืองซิลารา** (`city`; map 835,73; art `scene_celestia_06`) — ภาพ: โค้งสะพานสีคราม. ปมชีวิต: นักเรียนพบรูปแบบเสียงประหลาด.
- **celestia_07 · หมู่บ้านมิราเวล** (`village`; map 654,108; art `scene_celestia_07`) — ภาพ: เรือนริมทะเลสาบ. ปมชีวิต: นักบันทึกท้องถิ่นจัดเก็บนิทาน.
- **celestia_08 · หมู่บ้านเอนวิน** (`village`; map 692,112; art `scene_celestia_08`) — ภาพ: โขดแก้ว. ปมชีวิต: พบผลึกที่เปลี่ยนสีเมื่อฝนตก.
- **celestia_09 · หมู่บ้านลูซาร์** (`village`; map 730,116; art `scene_celestia_09`) — ภาพ: สวนแสงดาว. ปมชีวิต: ผู้เฒ่าสอนอ่านสัญลักษณ์.
- **celestia_10 · หมู่บ้านนิมบัส** (`village`; map 768,108; art `scene_celestia_10`) — ภาพ: เนินหมอก. ปมชีวิต: โรงเรียนหาเครื่องมือวัดลม.
- **celestia_11 · หมู่บ้านเอลลิน** (`village`; map 806,112; art `scene_celestia_11`) — ภาพ: ทุ่งสีม่วง. ปมชีวิต: ผู้ปลูกสมุนไพรต้องการบัญชี.
- **celestia_12 · หมู่บ้านเนียร์เพจ** (`village`; map 844,116; art `scene_celestia_12`) — ภาพ: ห้องเขียนหนังสือ. ปมชีวิต: อาสาสมัครช่วยจัดสารานุกรม.
- **celestia_13 · หมู่บ้านคอนสเตล** (`village`; map 645,151; art `scene_celestia_13`) — ภาพ: หินเรียงดาว. ปมชีวิต: มีคำถามเรื่องตำแหน่งดาว.
- **celestia_14 · หมู่บ้านซอเรล** (`village`; map 683,155; art `scene_celestia_14`) — ภาพ: น้ำพุเรืองแสง. ปมชีวิต: พบเสียงดนตรีจากท่อใต้ดิน.
- **celestia_15 · หมู่บ้านเฟนริล** (`village`; map 721,159; art `scene_celestia_15`) — ภาพ: ต้นไม้ผลึก. ปมชีวิต: ผลึกถูกเก็บผิดฤดูกาล.
- **celestia_16 · หมู่บ้านวาลิส** (`village`; map 759,151; art `scene_celestia_16`) — ภาพ: ศาลาโต๊ะสลัก. ปมชีวิต: มีจดหมายขอผู้ตรวจสัญลักษณ์.
- **celestia_17 · หมู่บ้านเมทิส** (`village`; map 797,155; art `scene_celestia_17`) — ภาพ: สวนยาสมุนไพร. ปมชีวิต: เด็กขอเรียนรู้การสังเกตพืช.
- **celestia_18 · หมู่บ้านอาเดริน** (`village`; map 835,159; art `scene_celestia_18`) — ภาพ: ทางเดินร่มเงา. ปมชีวิต: หนังสือหายหน้าเดียว.
- **celestia_19 · หมู่บ้านอีเธอร์ครอส** (`village`; map 654,194; art `scene_celestia_19`) — ภาพ: สะพานแก้ว. ปมชีวิต: ผู้คนสงสัยเสียงใต้สะพาน.
- **celestia_20 · หมู่บ้านออลเตอร์** (`village`; map 692,198; art `scene_celestia_20`) — ภาพ: ระฆังหอเล็ก. ปมชีวิต: พระจันทร์สะท้อนในกระจกผิดมุม.
- **celestia_21 · โรงเตี๊ยมหมึกคราม** (`inn`; map 730,202; art `scene_celestia_21`) — ภาพ: โต๊ะหมึกและโคม. ปมชีวิต: นักเดินทางฝากบทกวีปริศนา.
- **celestia_22 · โรงเรียนเซเวนสคริปต์** (`school`; map 768,194; art `scene_celestia_22`) — ภาพ: กระดานอักษร. ปมชีวิต: นักเรียนมีวิธีจำตำราต่างกัน.
- **celestia_23 · สถาบันอัสเทล** (`academy`; map 806,198; art `scene_celestia_23`) — ภาพ: โถงเสาแก้ว. ปมชีวิต: ทุนเรียนหนึ่งที่ยังไม่มีผู้รับ.
- **celestia_24 · หอสมุดคีรีแสง** (`library`; map 844,202; art `scene_celestia_24`) — ภาพ: ชั้นหนังสือวน. ปมชีวิต: บางเล่มไม่มีชื่อผู้เขียน.
- **celestia_25 · ห้องทดลองเมฆเงิน** (`laboratory`; map 645,237; art `scene_celestia_25`) — ภาพ: เตาทดลองเงียบ. ปมชีวิต: ผลึกตอบสนองเสียงเพลง.
- **celestia_26 · ตลาดสมุดลับ** (`market`; map 683,241; art `scene_celestia_26`) — ภาพ: แผงกระดาษ. ปมชีวิต: มีของปลอมปะปนกับต้นฉบับ.
- **celestia_27 · สวนทดลองอ่อนแสง** (`garden`; map 721,245; art `scene_celestia_27`) — ภาพ: เรือนพฤกษา. ปมชีวิต: ดอกไม้บานตามเสียง.
- **celestia_28 · หอดูดาวฝาแฝด** (`observatory`; map 759,237; art `scene_celestia_28`) — ภาพ: โดมสองยอด. ปมชีวิต: แผนที่ฟ้าเวอร์ชันเก่าขัดกับใหม่.
- **celestia_29 · สะพานนิรันดร์** (`landmark`; map 797,241; art `scene_celestia_29`) — ภาพ: เสาหินเขียนอักษร. ปมชีวิต: ทุกฤดูเกิดสัญลักษณ์ใหม่.
- **celestia_30 · ซากหอจารึก** (`ruin`; map 835,245; art `scene_celestia_30`) — ภาพ: ชิ้นหินอักขระ. ปมชีวิต: จารึกบันทึกเมืองที่ไม่เคยมี.

### ไนท์เวียร์ — ป่าหมอก ซากเมืองและด่านสำรวจ
โทนภาพ: biome `forest` แต่ landmark ของแต่ละจุดต้องแตกต่าง เช่น เมืองหลวงมีสิ่งปลูกสร้างหลักเฉพาะตัว ไม่ใช้ภาพทุ่งหญ้าเดียวกันทุกหมู่บ้าน
- **nightveir_01 · นครดัสก์วูด** (`capital`; map 90,395; art `scene_nightveir_01`) — ภาพ: นครไม้กับโคม. ปมชีวิต: สภาป่าต้องหาข้อตกลงเรื่องเส้นทาง.
- **nightveir_02 · เมืองมูนพาธ** (`city`; map 128,399; art `scene_nightveir_02`) — ภาพ: ถนนใต้จันทร์. ปมชีวิต: นักล่าสมุนไพรพบร่องรอยผู้มาเยือน.
- **nightveir_03 · เมืองเอคโควิล** (`city`; map 166,403; art `scene_nightveir_03`) — ภาพ: บ้านไม้เสียงสะท้อน. ปมชีวิต: คำเล่าจากสองยุคไม่ตรงกัน.
- **nightveir_04 · เมืองเวนดาร์** (`city`; map 204,395; art `scene_nightveir_04`) — ภาพ: หินตะไคร่และหอช่าง. ปมชีวิต: ช่างสำรวจขอให้ทำแผนใหม่.
- **nightveir_05 · เมืองเพลรูน** (`city`; map 242,399; art `scene_nightveir_05`) — ภาพ: สะพานหมอก. ปมชีวิต: กลุ่มพ่อค้ามีข้อพิพาทข้ามเขต.
- **nightveir_06 · เมืองเฟย์เดล** (`city`; map 280,403; art `scene_nightveir_06`) — ภาพ: สวนหิ่งห้อย. ปมชีวิต: เสียงเพลงบางคืนดึงสัตว์มาใกล้.
- **nightveir_07 · หมู่บ้านลูนาโฟล** (`village`; map 99,438; art `scene_nightveir_07`) — ภาพ: ลำธารจันทร์. ปมชีวิต: ผู้เฝ้าลำธารพบเงาในน้ำ.
- **nightveir_08 · หมู่บ้านเดลมอสส์** (`village`; map 137,442; art `scene_nightveir_08`) — ภาพ: มอสส์เขียวสด. ปมชีวิต: นักสมุนไพรจับคู่ใบไม้ผิดต้น.
- **nightveir_09 · หมู่บ้านฮอลโลว์ฟิน** (`village`; map 175,446; art `scene_nightveir_09`) — ภาพ: โคนไม้ใหญ่. ปมชีวิต: บันทึกกลุ่มเดินป่าเก่าหาย.
- **nightveir_10 · หมู่บ้านสตาร์เฟิร์น** (`village`; map 213,438; art `scene_nightveir_10`) — ภาพ: เฟิร์นเรืองแสง. ปมชีวิต: นักดนตรีเข้ามาพักชั่วคราว.
- **nightveir_11 · หมู่บ้านโอว์ลฮิล** (`village`; map 251,442; art `scene_nightveir_11`) — ภาพ: เนินเสียงนก. ปมชีวิต: ผู้เฒ่าเล่าเรื่องดาวตก.
- **nightveir_12 · หมู่บ้านเนบิวล์** (`village`; map 289,446; art `scene_nightveir_12`) — ภาพ: หมอกเช้า. ปมชีวิต: มีเสียงเรียกชื่อผิดบ้าน.
- **nightveir_13 · หมู่บ้านเงาริมธาร** (`village`; map 90,481; art `scene_nightveir_13`) — ภาพ: เรือนไม้ริมแก่ง. ปมชีวิต: เรือข้ามฟากขาดคนดูแล.
- **nightveir_14 · หมู่บ้านวูดวิสป์** (`village`; map 128,485; art `scene_nightveir_14`) — ภาพ: โคมกลางต้นไม้. ปมชีวิต: โคมไม่ดับแม้ฝนตก.
- **nightveir_15 · หมู่บ้านกราสมูน** (`village`; map 166,489; art `scene_nightveir_15`) — ภาพ: สนามหญ้าแสงดาว. ปมชีวิต: เด็กจัดการแสดงเงา.
- **nightveir_16 · หมู่บ้านเฟย์รูท** (`village`; map 204,481; art `scene_nightveir_16`) — ภาพ: รากไม้โค้ง. ปมชีวิต: พบจดหมายในโพรงเก่า.
- **nightveir_17 · หมู่บ้านคริมสันลีฟ** (`village`; map 242,485; art `scene_nightveir_17`) — ภาพ: ใบไม้สีแดง. ปมชีวิต: งานเทศกาลประจำปีใกล้มาถึง.
- **nightveir_18 · หมู่บ้านสลีปิงพอนด์** (`village`; map 280,489; art `scene_nightveir_18`) — ภาพ: สระน้ำสงบ. ปมชีวิต: สะพานไม้ส่งเสียงแปลก.
- **nightveir_19 · หมู่บ้านเอลเดอร์มอสส์** (`village`; map 99,524; art `scene_nightveir_19`) — ภาพ: ต้นไม้โบราณ. ปมชีวิต: มีคนขอคำปรึกษาจากผู้ดูแลต้นไม้.
- **nightveir_20 · หมู่บ้านบรันช์เชด** (`village`; map 137,528; art `scene_nightveir_20`) — ภาพ: บ้านบนกิ่ง. ปมชีวิต: บันไดเชื่อมชุมชนชำรุด.
- **nightveir_21 · โรงเตี๊ยมใบไม้เงียบ** (`inn`; map 175,532; art `scene_nightveir_21`) — ภาพ: โคมเรืองแสง. ปมชีวิต: ผู้เดินทางฝากสมุดว่างไว้.
- **nightveir_22 · สำนักการเดินป่า** (`school`; map 213,524; art `scene_nightveir_22`) — ภาพ: ลานรากไม้. ปมชีวิต: อาจารย์ทดสอบการสังเกต.
- **nightveir_23 · ค่ายแสงหิ่งห้อย** (`camp`; map 251,528; art `scene_nightveir_23`) — ภาพ: เต็นท์ริมธาร. ปมชีวิต: ผู้คุมค่ายตรวจคนหลงทาง.
- **nightveir_24 · ตลาดหมอกสีเงิน** (`market`; map 289,532; art `scene_nightveir_24`) — ภาพ: แผงไม้ใต้หมอก. ปมชีวิต: สินค้าแต่ละถิ่นไม่ติดป้าย.
- **nightveir_25 · หอเฝ้าจันทร์** (`tower`; map 90,567; art `scene_nightveir_25`) — ภาพ: หอคอยใต้ต้นใหญ่. ปมชีวิต: กลุ่มดาวมีตำแหน่งผิด.
- **nightveir_26 · ทางแยกเสียงกระซิบ** (`crossroads`; map 128,571; art `scene_nightveir_26`) — ภาพ: ทางสามแพร่ง. ปมชีวิต: ป้ายบอกทางสองอันชี้ต่างกัน.
- **nightveir_27 · ดงชะมดเขียว** (`forest`; map 166,575; art `scene_nightveir_27`) — ภาพ: กอไม้หนาทึบ. ปมชีวิต: กลุ่มเก็บเห็ดขอคนช่วยบันทึก.
- **nightveir_28 · ซากเมืองเฟลริน** (`ruin`; map 204,567; art `scene_nightveir_28`) — ภาพ: เสาหินในรากไม้. ปมชีวิต: พบลายมือของเด็กในเมืองร้าง.
- **nightveir_29 · สระกระจกเหนือหมอก** (`lake`; map 242,571; art `scene_nightveir_29`) — ภาพ: น้ำใสราวกระจก. ปมชีวิต: แสงสะท้อนห่างจากวัตถุจริง.
- **nightveir_30 · ประตูหินเถาวัลย์** (`gate`; map 280,575; art `scene_nightveir_30`) — ภาพ: ประตูหินใต้พฤกษา. ปมชีวิต: รอยจารึกถูกปิดด้วยใบไม้.

### อาเคลอน — เกาะเมืองท่าและเส้นน้ำค้าขาย
โทนภาพ: biome `coast` แต่ landmark ของแต่ละจุดต้องแตกต่าง เช่น เมืองหลวงมีสิ่งปลูกสร้างหลักเฉพาะตัว ไม่ใช้ภาพทุ่งหญ้าเดียวกันทุกหมู่บ้าน
- **akelon_01 · นครคอราลิส** (`capital`; map 480,395; art `scene_akelon_01`) — ภาพ: เมืองท่าปะการัง. ปมชีวิต: สภาท่าทะเลถกเรื่องการเทียบท่า.
- **akelon_02 · เมืองไทด์เบย์** (`city`; map 518,399; art `scene_akelon_02`) — ภาพ: ท่าเรือสีขาว. ปมชีวิต: เรือขนของกลับมาเร็วผิดปกติ.
- **akelon_03 · เมืองเวฟฮาร์ต** (`city`; map 556,403; art `scene_akelon_03`) — ภาพ: ตลาดปลาและธง. ปมชีวิต: พ่อค้าเสนองานสำรวจชายฝั่ง.
- **akelon_04 · เมืองฟอร์มาริน** (`city`; map 594,395; art `scene_akelon_04`) — ภาพ: โรงเรือไม้. ปมชีวิต: เครื่องมือช่างเรือหาย.
- **akelon_05 · เมืองอีสเทิร์นรีฟ** (`city`; map 632,399; art `scene_akelon_05`) — ภาพ: บ้านริมหาด. ปมชีวิต: พบเศษแก้วสีฟ้า.
- **akelon_06 · เมืองสตรอมพอร์ต** (`city`; map 670,403; art `scene_akelon_06`) — ภาพ: ประภาคาร. ปมชีวิต: พายุทำให้แผนเดินเรือเปลี่ยน.
- **akelon_07 · หมู่บ้านซีบลูม** (`village`; map 489,438; art `scene_akelon_07`) — ภาพ: ทุ่งเกลือชายทะเล. ปมชีวิต: เด็กเก็บเปลือกหอยหลากสี.
- **akelon_08 · หมู่บ้านคลาวด์โคฟ** (`village`; map 527,442; art `scene_akelon_08`) — ภาพ: อ่าวเล็ก. ปมชีวิต: มีเรื่องเล่าแสงในทะเล.
- **akelon_09 · หมู่บ้านอควาเดล** (`village`; map 565,446; art `scene_akelon_09`) — ภาพ: บ่อน้ำจืด. ปมชีวิต: จดหมายจากเมืองหลวงมาถึง.
- **akelon_10 · หมู่บ้านซอลท์ริล** (`village`; map 603,438; art `scene_akelon_10`) — ภาพ: ลานตากเกลือ. ปมชีวิต: ชาวบ้านแบ่งพื้นที่ใหม่.
- **akelon_11 · หมู่บ้านโกลด์ฟิน** (`village`; map 641,442; art `scene_akelon_11`) — ภาพ: สะพานปลา. ปมชีวิต: เรือจับปลากลับมามือเปล่า.
- **akelon_12 · หมู่บ้านไวท์แซนด์** (`village`; map 679,446; art `scene_akelon_12`) — ภาพ: หาดทรายขาว. ปมชีวิต: นักท่องเที่ยวหลงทาง.
- **akelon_13 · หมู่บ้านบลูครีก** (`village`; map 480,481; art `scene_akelon_13`) — ภาพ: ลำคลองทะเล. ปมชีวิต: เด็กแข่งเรือใบจำลอง.
- **akelon_14 · หมู่บ้านเพิร์ลฮาร์เบอร์** (`village`; map 518,485; art `scene_akelon_14`) — ภาพ: อ่าวไข่มุก. ปมชีวิต: ไข่มุกผิดรูปถูกพบ.
- **akelon_15 · หมู่บ้านซีเฟน** (`village`; map 556,489; art `scene_akelon_15`) — ภาพ: ผาหญ้าริมทะเล. ปมชีวิต: บันไดไปชายหาดเสียหาย.
- **akelon_16 · หมู่บ้านแบรคิช** (`village`; map 594,481; art `scene_akelon_16`) — ภาพ: น้ำกร่อย. ปมชีวิต: ชาวสวนทดลองพืชทนเกลือ.
- **akelon_17 · หมู่บ้านฟ็อกทิด** (`village`; map 632,485; art `scene_akelon_17`) — ภาพ: โขดหินจิ้งจอก. ปมชีวิต: มีรอยเท้าสัตว์ใหม่.
- **akelon_18 · หมู่บ้านเวลดาร์รีฟ** (`village`; map 670,489; art `scene_akelon_18`) — ภาพ: แนวหินใต้ทะเล. ปมชีวิต: คนเฝ้าคลื่นได้ยินเสียงแปลก.
- **akelon_19 · หมู่บ้านอันเดอร์เซล** (`village`; map 489,524; art `scene_akelon_19`) — ภาพ: โพรงหินริมอ่าว. ปมชีวิต: ลูกเรือพบลูกแก้วเก่า.
- **akelon_20 · หมู่บ้านฮาร์เบอร์ไลท์** (`village`; map 527,528; art `scene_akelon_20`) — ภาพ: โคมแนวท่า. ปมชีวิต: มีคนขอช่วยซ่อมโคม.
- **akelon_21 · โรงเตี๊ยมคลื่นพัก** (`inn`; map 565,532; art `scene_akelon_21`) — ภาพ: หลังคาปะการัง. ปมชีวิต: แผนที่เดินเรือเวอร์ชันใหม่เพิ่งมาถึง.
- **akelon_22 · สำนักการเดินเรือ** (`school`; map 603,524; art `scene_akelon_22`) — ภาพ: เรือฝึกที่จอดนิ่ง. ปมชีวิต: ครูสอบการอ่านลมและธง.
- **akelon_23 · ค่ายช่างเรือ** (`camp`; map 641,528; art `scene_akelon_23`) — ภาพ: อู่สร้างเรือ. ปมชีวิต: ช่างเก่าหวงแบบร่างลำเรือ.
- **akelon_24 · ตลาดน้ำเงินรุ่ง** (`market`; map 679,532; art `scene_akelon_24`) — ภาพ: ตลาดริมน้ำ. ปมชีวิต: เครื่องเทศจากต่างทวีปมาถึง.
- **akelon_25 · ประภาคารฟ้าสด** (`lighthouse`; map 480,567; art `scene_akelon_25`) — ภาพ: หอสูงสีฟ้า. ปมชีวิต: ดวงไฟกะพริบแปลก.
- **akelon_26 · ถ้ำเสียงคลื่น** (`cave`; map 518,571; art `scene_akelon_26`) — ภาพ: ปากถ้ำริมหน้าผา. ปมชีวิต: เสียงสะท้อนคล้ายระฆัง.
- **akelon_27 · เกาะนกเมฆ** (`island`; map 556,575; art `scene_akelon_27`) — ภาพ: หน้าผานกทะเล. ปมชีวิต: นกกลับรังผิดฤดู.
- **akelon_28 · ศาลาท่าเที่ยง** (`landmark`; map 594,567; art `scene_akelon_28`) — ภาพ: ศาลาเงาเสา. ปมชีวิต: ขบวนพ่อค้าขอผู้ช่วยแปลคำ.
- **akelon_29 · ลานโคมฉลามดาว** (`festival`; map 632,571; art `scene_akelon_29`) — ภาพ: ธงสีสัน. ปมชีวิต: งานเทศกาลหาเจ้าหน้าที่.
- **akelon_30 · ซากท่าแห่งกาล** (`ruin`; map 670,575; art `scene_akelon_30`) — ภาพ: ท่าเรือหินเก่า. ปมชีวิต: พบโซ่สมอจากอารยธรรมเก่า.

## อาชีพ 20 สายหลัก × 10 ฉายาตามระดับ
ชื่อขอบเขตกลางของ Lv1–100 อยู่ใน Master Directive. แต่ละชื่อข้างล่างเป็น title ที่แสดงควบกับ career ณ 1–10, 11–20, ..., 91–100; Lv100 ต้องผ่าน deity gate เท่านั้น; หากยัง Lv99 แสดง rank 91–99 ตามปกติ
### `sword` — นักดาบ
- Lv 1–10: **มือฝึกดาบ**
- Lv 11–20: **ผู้ก้าวด้วยคม**
- Lv 21–30: **นักดาบประจำทาง**
- Lv 31–40: **จอมดาบรับลม**
- Lv 41–50: **ผู้ผสานจังหวะ**
- Lv 51–60: **ผู้เฝ้ารอยคม**
- Lv 61–70: **ปรมาจารย์ร้อยกระบวน**
- Lv 71–80: **ผู้พิทักษ์คมฟ้า**
- Lv 81–90: **ผู้ตีความดาบโลก**
- Lv 91–100: **ผู้เข้าใจกฎแห่งคม** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `warrior` — นักรบ
- Lv 1–10: **ผู้ฝึกความอดทน**
- Lv 11–20: **นักรบตั้งมั่น**
- Lv 21–30: **ผู้คุ้มกันประชา**
- Lv 31–40: **หัวหน้าหน่วยภาคสนาม**
- Lv 41–50: **ผู้แบกรับคำสัตย์**
- Lv 51–60: **ผู้บัญชาการรากฐาน**
- Lv 61–70: **ผู้พิทักษ์หลายยุค**
- Lv 71–80: **จอมยุทธ์แห่งความมั่นคง**
- Lv 81–90: **ผู้ยืนเหนือพายุ**
- Lv 91–100: **ผู้ยึดมั่นกฎปกป้อง** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `mage` — นักเวท
- Lv 1–10: **ผู้ฟังเสียงมานา**
- Lv 11–20: **ศิษย์อักขระ**
- Lv 21–30: **ผู้ทอมนตรา**
- Lv 31–40: **นักเวทสมดุลธาตุ**
- Lv 41–50: **ผู้ถักทอวงเวท**
- Lv 51–60: **มหาเวทแห่งสี่ฤดู**
- Lv 61–70: **ผู้เปิดหอคอยจิต**
- Lv 71–80: **นักเวทเหนือขอบฟ้า**
- Lv 81–90: **ผู้เข้าใจบทบัญญัติเวท**
- Lv 91–100: **ผู้รักษากฎแห่งมนตรา** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `archer` — นักธนู
- Lv 1–10: **ผู้รู้ทิศลม**
- Lv 11–20: **นักแม่นศรชุมชน**
- Lv 21–30: **ผู้จับจังหวะไกล**
- Lv 31–40: **ผู้เฝ้าเส้นขอบ**
- Lv 41–50: **นักธนูวิถีดาว**
- Lv 51–60: **ปราชญ์แห่งสายลม**
- Lv 61–70: **ผู้พิทักษ์ระยะไกล**
- Lv 71–80: **จอมศรข้ามขอบฟ้า**
- Lv 81–90: **ผู้มองเห็นหลายยุค**
- Lv 91–100: **ผู้เข้าใจกฎแห่งวิถี** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `healer` — นักบวชผู้รักษา
- Lv 1–10: **ผู้ดูแลบาดแผล**
- Lv 11–20: **ศิษย์แห่งความเมตตา**
- Lv 21–30: **นักเยียวยาชุมชน**
- Lv 31–40: **ผู้คืนความหวัง**
- Lv 41–50: **นักรักษาแห่งแสงอรุณ**
- Lv 51–60: **ผู้เข้าใจวงจรชีวิต**
- Lv 61–70: **ปราชญ์แห่งการฟื้นฟู**
- Lv 71–80: **ผู้พิทักษ์ลมหายใจ**
- Lv 81–90: **ผู้ข้ามขอบเขตการเยียวยา**
- Lv 91–100: **ผู้เข้าใจกฎแห่งชีวิต** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `summoner` — นักอัญเชิญ
- Lv 1–10: **ผู้รับฟังภูต**
- Lv 11–20: **ผู้รักษาคำมั่น**
- Lv 21–30: **ผู้ร่วมทางกับสัตว์เวท**
- Lv 31–40: **นักประสานจิต**
- Lv 41–50: **ผู้ถักทอพันธสัญญา**
- Lv 51–60: **ผู้ดูแลฝูงดาว**
- Lv 61–70: **จอมพันธมิตรข้ามดินแดน**
- Lv 71–80: **ผู้ฟังทุกจิตวิญญาณ**
- Lv 81–90: **ผู้เชื่อมประสานสองโลก**
- Lv 91–100: **ผู้เข้าใจกฎแห่งสายสัมพันธ์** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `alchemist` — นักเล่นแร่แปรธาตุ
- Lv 1–10: **ผู้สังเกตสาร**
- Lv 11–20: **ศิษย์ขวดแก้ว**
- Lv 21–30: **นักปรุงต้นตำรับ**
- Lv 31–40: **ผู้แยกแก่นวัตถุ**
- Lv 41–50: **ปราชญ์ส่วนผสม**
- Lv 51–60: **ผู้ค้นสูตรหายาก**
- Lv 61–70: **นักแปรสภาพแห่งหุบเขา**
- Lv 71–80: **ผู้แปรข้อจำกัด**
- Lv 81–90: **จอมปราชญ์แห่งรูปทรง**
- Lv 91–100: **ผู้เข้าใจกฎแห่งธาตุ** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `smith` — ช่างตีเหล็ก
- Lv 1–10: **ผู้ช่วยโรงตี**
- Lv 11–20: **นักอ่านเนื้อโลหะ**
- Lv 21–30: **ช่างสร้างเครื่องมือ**
- Lv 31–40: **ผู้หลอมคำสัตย์**
- Lv 41–50: **ช่างศาสตราชุมชน**
- Lv 51–60: **ผู้สร้างงานต้นแบบ**
- Lv 61–70: **ปรมาจารย์เปลวหลอม**
- Lv 71–80: **ผู้ตีความวัสดุดาว**
- Lv 81–90: **ช่างเหนือกาลเวลา**
- Lv 91–100: **ผู้เข้าใจกฎแห่งการสร้าง** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `merchant` — พ่อค้า
- Lv 1–10: **ผู้ช่วยแผงค้า**
- Lv 11–20: **นักอ่านราคา**
- Lv 21–30: **พ่อค้าคาราวาน**
- Lv 31–40: **ผู้เชื่อมตลาดเมือง**
- Lv 41–50: **หัวหน้าสมาคมสินค้า**
- Lv 51–60: **ผู้สร้างการค้าสามทวีป**
- Lv 61–70: **นักเจรจาแห่งยุค**
- Lv 71–80: **ผู้รักษาสมดุลตลาด**
- Lv 81–90: **เจ้าพ่อเครือข่ายโลก**
- Lv 91–100: **ผู้เข้าใจกฎแห่งการแลกเปลี่ยน** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `scholar` — นักวิชาการ
- Lv 1–10: **นักอ่านมือใหม่**
- Lv 11–20: **ผู้จัดชั้นตำรา**
- Lv 21–30: **นักบันทึกชุมชน**
- Lv 31–40: **นักวิเคราะห์บันทึก**
- Lv 41–50: **ผู้เรียบเรียงความรู้**
- Lv 51–60: **ปราชญ์แห่งหอสมุด**
- Lv 61–70: **ผู้เชื่อมศาสตร์**
- Lv 71–80: **ผู้รวบรวมความรู้ยุค**
- Lv 81–90: **นักแปลภาษาของโลก**
- Lv 91–100: **ผู้เข้าใจกฎแห่งปัญญา** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `shadow` — นักลอบเร้น
- Lv 1–10: **ผู้ฝึกสังเกต**
- Lv 11–20: **ผู้เดินเงียบ**
- Lv 21–30: **นักสืบข่าวภาคสนาม**
- Lv 31–40: **ผู้แกะรอยความลับ**
- Lv 41–50: **ผู้เฝ้ามุมมอง**
- Lv 51–60: **จอมวิเคราะห์เงา**
- Lv 61–70: **ผู้เห็นรอยลวง**
- Lv 71–80: **ผู้คุ้มกันที่ไร้ชื่อ**
- Lv 81–90: **ผู้ตีความความเงียบ**
- Lv 91–100: **ผู้เข้าใจกฎแห่งเงา** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `adventurer` — นักผจญภัย
- Lv 1–10: **ผู้เดินทางใกล้บ้าน**
- Lv 11–20: **ผู้เปิดแผนที่**
- Lv 21–30: **นักสำรวจถิ่นไกล**
- Lv 31–40: **ผู้นำทางคาราวาน**
- Lv 41–50: **นักอ่านภูมิประเทศ**
- Lv 51–60: **ผู้พิชิตเส้นทางยาก**
- Lv 61–70: **ผู้พบดินแดนใหม่**
- Lv 71–80: **นักเดินทางข้ามยุค**
- Lv 81–90: **ผู้ก้าวข้ามเขตโลก**
- Lv 91–100: **ผู้เข้าใจกฎแห่งเส้นทาง** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `mercenary` — ทหารรับจ้าง
- Lv 1–10: **ผู้คุ้มกันฝึกหัด**
- Lv 11–20: **ผู้รักษาสัญญาจ้าง**
- Lv 21–30: **นักสู้คาราวาน**
- Lv 31–40: **หัวหน้าคุ้มกัน**
- Lv 41–50: **ผู้วางแผนป้องกัน**
- Lv 51–60: **ผู้ดูแลกองกำลัง**
- Lv 61–70: **นายกองรับสัญญา**
- Lv 71–80: **ผู้รักษาความปลอดภัยยุค**
- Lv 81–90: **ผู้ประสานกองทัพเมือง**
- Lv 91–100: **ผู้เข้าใจกฎแห่งหน้าที่** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `diplomat` — นักการทูต
- Lv 1–10: **ผู้ฟังคำเจรจา**
- Lv 11–20: **ผู้ไกล่เกลี่ยชุมชน**
- Lv 21–30: **ผู้ประสานสองเมือง**
- Lv 31–40: **ทูตเชื่อมสะพาน**
- Lv 41–50: **ผู้ฟังเสียงประชา**
- Lv 51–60: **ทูตแห่งห้าภูมิภาค**
- Lv 61–70: **ผู้รักษาคำมั่นสภา**
- Lv 71–80: **นักเจรจาข้ามยุค**
- Lv 81–90: **ผู้ร้อยประสานอาณาจักร**
- Lv 91–100: **ผู้เข้าใจกฎแห่งสันติ** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `farmer` — ผู้ดูแลธรรมชาติ
- Lv 1–10: **ผู้เพาะเมล็ด**
- Lv 11–20: **ผู้ดูแลแปลง**
- Lv 21–30: **นักปลูกชุมชน**
- Lv 31–40: **ผู้ฟื้นฟูดิน**
- Lv 41–50: **ช่างสวนทุกฤดู**
- Lv 51–60: **ผู้ดูแลป่าชีวิต**
- Lv 61–70: **ผู้สร้างระบบนิเวศ**
- Lv 71–80: **ปราชญ์แห่งเมล็ดพันธุ์**
- Lv 81–90: **ผู้ปลุกดอกไม้เหนือกาล**
- Lv 91–100: **ผู้เข้าใจกฎแห่งการเติบโต** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `sailor` — นักเดินเรือ
- Lv 1–10: **ผู้เรียนสัญญาณคลื่น**
- Lv 11–20: **ผู้ถือหางเสือ**
- Lv 21–30: **นักอ่านกระแสน้ำ**
- Lv 31–40: **ผู้สำรวจอ่าวไกล**
- Lv 41–50: **กัปตันแห่งดาวเหนือ**
- Lv 51–60: **ผู้เชื่อมท่าเรือ**
- Lv 61–70: **นักเดินทางข้ามมหาสมุทร**
- Lv 71–80: **ผู้ก้าวผ่านพายุยุค**
- Lv 81–90: **กัปตันเหนือเส้นขอบ**
- Lv 91–100: **ผู้เข้าใจกฎแห่งคลื่น** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `inventor` — นักประดิษฐ์
- Lv 1–10: **ผู้ช่วยกลไก**
- Lv 11–20: **นักวาดแบบมือใหม่**
- Lv 21–30: **ผู้ซ่อมเครื่องกล**
- Lv 31–40: **ช่างออกแบบต้นแบบ**
- Lv 41–50: **ผู้สร้างเครื่องมือเมือง**
- Lv 51–60: **นักพัฒนากลไกเวท**
- Lv 61–70: **จอมช่างกลข้ามทวีป**
- Lv 71–80: **ผู้พัฒนาเครื่องจักรยุค**
- Lv 81–90: **ผู้สร้างจักรกลแห่งดาว**
- Lv 91–100: **ผู้เข้าใจกฎแห่งนวัตกรรม** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `musician` — นักดนตรีเวท
- Lv 1–10: **ผู้ฟังทำนอง**
- Lv 11–20: **นักขับขานชุมชน**
- Lv 21–30: **ผู้ถักเสียงแห่งใจ**
- Lv 31–40: **นักประสานเสียงกลุ่ม**
- Lv 41–50: **ผู้รักษาความทรงจำเพลง**
- Lv 51–60: **ปรมาจารย์บทเพลง**
- Lv 61–70: **ผู้ปลุกพลังด้วยทำนอง**
- Lv 71–80: **ผู้ขับขานข้ามยุค**
- Lv 81–90: **นักดนตรีแห่งดวงดาว**
- Lv 91–100: **ผู้เข้าใจกฎแห่งสั่นสะเทือน** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `beastkeeper` — นักฝึกสัตว์
- Lv 1–10: **ผู้ดูแลสัตว์เล็ก**
- Lv 11–20: **ผู้เข้าใจท่าทาง**
- Lv 21–30: **นักฝึกคู่หู**
- Lv 31–40: **ผู้รักษาฝูงสัตว์**
- Lv 41–50: **ผู้ประสานสัตว์เวท**
- Lv 51–60: **จอมผู้ดูแลป่า**
- Lv 61–70: **ผู้ร่วมทางสัตว์ตำนาน**
- Lv 71–80: **ผู้สื่อสารข้ามเผ่า**
- Lv 81–90: **ผู้คุ้มครองชีวิตหายาก**
- Lv 91–100: **ผู้เข้าใจกฎแห่งชีวิตร่วม** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

### `spirit` — ผู้ฝึกพลังวิญญาณ
- Lv 1–10: **ผู้รับรู้อารมณ์**
- Lv 11–20: **ผู้ฝึกสมาธิ**
- Lv 21–30: **นักสัมผัสพลัง**
- Lv 31–40: **ผู้ขัดเกลาจิต**
- Lv 41–50: **ผู้สานจิตกับโลก**
- Lv 51–60: **ผู้ฟังจิตหลายยุค**
- Lv 61–70: **ปรมาจารย์ความสงบ**
- Lv 71–80: **ผู้เห็นเส้นทางในจิต**
- Lv 81–90: **ผู้ร้อยประสานวิญญาณ**
- Lv 91–100: **ผู้เข้าใจกฎแห่งจิต** (เฉพาะ terminal god finale เมื่อเงื่อนไขสำเร็จ)

## แนวคิดฉากจบระดับเทพประจำสาย
- **GOD_SWORD**: นักดาบ → ผู้เข้าใจกฎแห่งคม; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `บทพิสูจน์ความยับยั้งชั่งใจเมื่อมีอำนาจเหนือคนอื่น` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_WARRIOR**: นักรบ → ผู้ยึดมั่นกฎปกป้อง; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `ช่วยคนอ่อนแอกว่าโดยไม่หวังสมบัติ` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_MAGE**: นักเวท → ผู้รักษากฎแห่งมนตรา; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `สร้างงานหรือความรู้ที่จะมีคุณค่าหลังตนจากไป` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_ARCHER**: นักธนู → ผู้เข้าใจกฎแห่งวิถี; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เผชิญความผิดพลาดในอดีตแล้วรับผลตามจริง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_HEALER**: นักบวชผู้รักษา → ผู้เข้าใจกฎแห่งชีวิต; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เลือกว่าจะใช้อำนาจรักษาสมดุลหรือเพื่อชื่อเสียง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_SUMMONER**: นักอัญเชิญ → ผู้เข้าใจกฎแห่งสายสัมพันธ์; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `บทพิสูจน์ความยับยั้งชั่งใจเมื่อมีอำนาจเหนือคนอื่น` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_ALCHEMIST**: นักเล่นแร่แปรธาตุ → ผู้เข้าใจกฎแห่งธาตุ; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `ช่วยคนอ่อนแอกว่าโดยไม่หวังสมบัติ` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_SMITH**: ช่างตีเหล็ก → ผู้เข้าใจกฎแห่งการสร้าง; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `สร้างงานหรือความรู้ที่จะมีคุณค่าหลังตนจากไป` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_MERCHANT**: พ่อค้า → ผู้เข้าใจกฎแห่งการแลกเปลี่ยน; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เผชิญความผิดพลาดในอดีตแล้วรับผลตามจริง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_SCHOLAR**: นักวิชาการ → ผู้เข้าใจกฎแห่งปัญญา; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เลือกว่าจะใช้อำนาจรักษาสมดุลหรือเพื่อชื่อเสียง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_SHADOW**: นักลอบเร้น → ผู้เข้าใจกฎแห่งเงา; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `บทพิสูจน์ความยับยั้งชั่งใจเมื่อมีอำนาจเหนือคนอื่น` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_ADVENTURER**: นักผจญภัย → ผู้เข้าใจกฎแห่งเส้นทาง; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `ช่วยคนอ่อนแอกว่าโดยไม่หวังสมบัติ` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_MERCENARY**: ทหารรับจ้าง → ผู้เข้าใจกฎแห่งหน้าที่; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `สร้างงานหรือความรู้ที่จะมีคุณค่าหลังตนจากไป` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_DIPLOMAT**: นักการทูต → ผู้เข้าใจกฎแห่งสันติ; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เผชิญความผิดพลาดในอดีตแล้วรับผลตามจริง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_FARMER**: ผู้ดูแลธรรมชาติ → ผู้เข้าใจกฎแห่งการเติบโต; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เลือกว่าจะใช้อำนาจรักษาสมดุลหรือเพื่อชื่อเสียง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_SAILOR**: นักเดินเรือ → ผู้เข้าใจกฎแห่งคลื่น; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `บทพิสูจน์ความยับยั้งชั่งใจเมื่อมีอำนาจเหนือคนอื่น` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_INVENTOR**: นักประดิษฐ์ → ผู้เข้าใจกฎแห่งนวัตกรรม; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `ช่วยคนอ่อนแอกว่าโดยไม่หวังสมบัติ` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_MUSICIAN**: นักดนตรีเวท → ผู้เข้าใจกฎแห่งสั่นสะเทือน; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `สร้างงานหรือความรู้ที่จะมีคุณค่าหลังตนจากไป` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_BEASTKEEPER**: นักฝึกสัตว์ → ผู้เข้าใจกฎแห่งชีวิตร่วม; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เผชิญความผิดพลาดในอดีตแล้วรับผลตามจริง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง
- **GOD_SPIRIT**: ผู้ฝึกพลังวิญญาณ → ผู้เข้าใจกฎแห่งจิต; ต้องมี Lv99, อายุ≥1000, อุดมการณ์ที่ผู้เล่นเลือก, 3 unique trials (mastery, relationship/world impact, personal truth), ทำ `เลือกว่าจะใช้อำนาจรักษาสมดุลหรือเพื่อชื่อเสียง` และกดยืนยันเข้าประตูขั้นสุดท้ายด้วยตนเอง. บทสรุปต้องอ้างถึงสถานที่แรกและผู้ร่วมทางจริง

## ตัวละครสำคัญ 100 คน (Original NPC Story Seeds)
NPC รายการนี้เป็น **draft catalogue** ให้ Codex ทำ personality flags, dialogues, encounters และ relationships จริงก่อนนับเป็น NPC สำเร็จใน CONTENT_MANIFEST; แม้ชื่อดูคล้ายกันต้องเพิ่มเหตุการณ์เฉพาะคน
- **npc_001 · อีรัน อาร์วิน** — ผู้ดูแลหอสมุด; บ้าน `arvenia_04`; นิสัย สุขุม; เป้าหมาย: รักษาตำราครอบครัวที่หลงเหลือ; ปม: กลัวความผิดพลาดจากอดีต. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_002 · ไลรา อาร์วิน** — หัวหน้าตลาด; บ้าน `arvenia_11`; นิสัย กระตือรือร้น; เป้าหมาย: เปิดทางค้าระหว่างสองเมือง; ปม: ต้องดูแลสมาชิกครอบครัวที่เจ็บป่วย. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_003 · เดเมีย อาร์วิน** — ช่างฝีมือ; บ้าน `arvenia_18`; นิสัย จริงจัง; เป้าหมาย: พัฒนาเครื่องมือชุมชน; ปม: ไม่เชื่อคนใหม่ง่าย ๆ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_004 · วาริน อาร์วิน** — ผู้สอนทักษะ; บ้าน `arvenia_25`; นิสัย อารมณ์ดี; เป้าหมาย: พิสูจน์วิธีสอนที่ไม่แบ่งชนชั้น; ปม: มีคู่แข่งที่เก่งกว่าแต่หวังดี. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_005 · โซเรน อาร์วิน** — ผู้ดูแลอาหาร; บ้าน `arvenia_02`; นิสัย อดทน; เป้าหมาย: ช่วยคนขาดโอกาสเข้าถึงอาหาร; ปม: ถูกขอให้ย้ายเมือง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_006 · นิลา อาร์วิน** — นักสำรวจ; บ้าน `arvenia_09`; นิสัย ระวังตัว; เป้าหมาย: ค้นสถานที่ที่ผู้คนลืม; ปม: สูญเสียเงินทุนครั้งก่อน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_007 · วาเลน อาร์วิน** — หัวหน้าคาราวาน; บ้าน `arvenia_16`; นิสัย ตรงไปตรงมา; เป้าหมาย: พากลุ่มเดินทางกลับโดยปลอดภัย; ปม: เคยให้คำสัญญาที่ทำไม่ได้. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_008 · อาริเอล อาร์วิน** — นักวิจัยพืช; บ้าน `arvenia_23`; นิสัย ขี้สงสัย; เป้าหมาย: หาคำตอบเรื่องพืชผิดฤดู; ปม: พยายามซ่อนความภูมิใจ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_009 · โคริน อาร์วิน** — ผู้แทนชุมชน; บ้าน `arvenia_30`; นิสัย รอบคอบ; เป้าหมาย: แก้การเข้าใจผิดของสองครอบครัว; ปม: ชื่อเสียงเก่าทำให้คนเข้าใจผิด. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_010 · เธีย อาร์วิน** — นักดนตรี; บ้าน `arvenia_07`; นิสัย อ่อนโยน; เป้าหมาย: ประพันธ์เพลงที่เล่าเรื่องคนธรรมดา; ปม: ถูกดึงเข้าเรื่องการเมืองท้องถิ่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_011 · เลวิน อาร์วิน** — ผู้สังเกตดาว; บ้าน `arvenia_14`; นิสัย สุขุม; เป้าหมาย: ตรวจข้อมูลดาวที่ขัดแย้ง; ปม: กำลังหาทายาทในงาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_012 · ยูรีส อาร์วิน** — นักประดิษฐ์; บ้าน `arvenia_21`; นิสัย กระตือรือร้น; เป้าหมาย: สร้างของใช้ที่ทำงานได้โดยไม่สิ้นเปลือง; ปม: ต้องตัดสินใจระหว่างงานและบ้าน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_013 · เฟลิน อาร์วิน** — ผู้ดูแลสัตว์เวท; บ้าน `arvenia_28`; นิสัย จริงจัง; เป้าหมาย: ฟื้นฟูความไว้วางใจระหว่างสัตว์กับคน; ปม: มีจดหมายที่ยังไม่ได้ส่ง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_014 · อาเวียร์ อาร์วิน** — นักเขียนแผนที่; บ้าน `arvenia_05`; นิสัย อารมณ์ดี; เป้าหมาย: ทำแผนที่ให้คนเดินทางยากจน; ปม: ต้องชดเชยความเสียหายของชุมชน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_015 · คีร่า อาร์วิน** — เจ้าของโรงเตี๊ยม; บ้าน `arvenia_12`; นิสัย อดทน; เป้าหมาย: รักษาโรงเตี๊ยมไม่ให้ปิด; ปม: ไม่แน่ใจว่าควรเชื่อข่าวลือ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_016 · โนเอล อาร์วิน** — นักฝึกอาชีพ; บ้าน `arvenia_19`; นิสัย ระวังตัว; เป้าหมาย: ฝึกศิษย์โดยไม่ใช้อำนาจ; ปม: มีศิษย์ที่ฝึกช้ากว่าคนอื่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_017 · มีเรีย อาร์วิน** — ผู้ช่วยวิหาร; บ้าน `arvenia_26`; นิสัย ตรงไปตรงมา; เป้าหมาย: ตามหาบันทึกช่วยเหลือผู้คน; ปม: ถูกขอให้เป็นพยาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_018 · เซรอน อาร์วิน** — ผู้ไกล่เกลี่ย; บ้าน `arvenia_03`; นิสัย ขี้สงสัย; เป้าหมาย: ไกล่เกลี่ยข้อพิพาทพื้นที่; ปม: ลังเลจะบอกความจริง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_019 · ลูเธียร์ อาร์วิน** — ผู้จัดเทศกาล; บ้าน `arvenia_10`; นิสัย รอบคอบ; เป้าหมาย: รักษางานเทศกาลจากการเลิกจัด; ปม: ไม่อยากให้เด็กทำผิดตามตน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_020 · เอลด้า อาร์วิน** — นักบันทึกประวัติศาสตร์; บ้าน `arvenia_17`; นิสัย อ่อนโยน; เป้าหมาย: รวบรวมเรื่องเล่าของคนไม่มีชื่อ; ปม: สนใจโลกมากกว่าชื่อเสียง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_021 · อีรัน โฟลด์** — ผู้สอนทักษะ; บ้าน `valdor_04`; นิสัย กระตือรือร้น; เป้าหมาย: ช่วยคนขาดโอกาสเข้าถึงอาหาร; ปม: ไม่เชื่อคนใหม่ง่าย ๆ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_022 · ไลรา โฟลด์** — ผู้ดูแลอาหาร; บ้าน `valdor_11`; นิสัย จริงจัง; เป้าหมาย: ค้นสถานที่ที่ผู้คนลืม; ปม: มีคู่แข่งที่เก่งกว่าแต่หวังดี. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_023 · เดเมีย โฟลด์** — นักสำรวจ; บ้าน `valdor_18`; นิสัย อารมณ์ดี; เป้าหมาย: พากลุ่มเดินทางกลับโดยปลอดภัย; ปม: ถูกขอให้ย้ายเมือง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_024 · วาริน โฟลด์** — หัวหน้าคาราวาน; บ้าน `valdor_25`; นิสัย อดทน; เป้าหมาย: หาคำตอบเรื่องพืชผิดฤดู; ปม: สูญเสียเงินทุนครั้งก่อน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_025 · โซเรน โฟลด์** — นักวิจัยพืช; บ้าน `valdor_02`; นิสัย ระวังตัว; เป้าหมาย: แก้การเข้าใจผิดของสองครอบครัว; ปม: เคยให้คำสัญญาที่ทำไม่ได้. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_026 · นิลา โฟลด์** — ผู้แทนชุมชน; บ้าน `valdor_09`; นิสัย ตรงไปตรงมา; เป้าหมาย: ประพันธ์เพลงที่เล่าเรื่องคนธรรมดา; ปม: พยายามซ่อนความภูมิใจ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_027 · วาเลน โฟลด์** — นักดนตรี; บ้าน `valdor_16`; นิสัย ขี้สงสัย; เป้าหมาย: ตรวจข้อมูลดาวที่ขัดแย้ง; ปม: ชื่อเสียงเก่าทำให้คนเข้าใจผิด. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_028 · อาริเอล โฟลด์** — ผู้สังเกตดาว; บ้าน `valdor_23`; นิสัย รอบคอบ; เป้าหมาย: สร้างของใช้ที่ทำงานได้โดยไม่สิ้นเปลือง; ปม: ถูกดึงเข้าเรื่องการเมืองท้องถิ่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_029 · โคริน โฟลด์** — นักประดิษฐ์; บ้าน `valdor_30`; นิสัย อ่อนโยน; เป้าหมาย: ฟื้นฟูความไว้วางใจระหว่างสัตว์กับคน; ปม: กำลังหาทายาทในงาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_030 · เธีย โฟลด์** — ผู้ดูแลสัตว์เวท; บ้าน `valdor_07`; นิสัย สุขุม; เป้าหมาย: ทำแผนที่ให้คนเดินทางยากจน; ปม: ต้องตัดสินใจระหว่างงานและบ้าน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_031 · เลวิน โฟลด์** — นักเขียนแผนที่; บ้าน `valdor_14`; นิสัย กระตือรือร้น; เป้าหมาย: รักษาโรงเตี๊ยมไม่ให้ปิด; ปม: มีจดหมายที่ยังไม่ได้ส่ง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_032 · ยูรีส โฟลด์** — เจ้าของโรงเตี๊ยม; บ้าน `valdor_21`; นิสัย จริงจัง; เป้าหมาย: ฝึกศิษย์โดยไม่ใช้อำนาจ; ปม: ต้องชดเชยความเสียหายของชุมชน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_033 · เฟลิน โฟลด์** — นักฝึกอาชีพ; บ้าน `valdor_28`; นิสัย อารมณ์ดี; เป้าหมาย: ตามหาบันทึกช่วยเหลือผู้คน; ปม: ไม่แน่ใจว่าควรเชื่อข่าวลือ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_034 · อาเวียร์ โฟลด์** — ผู้ช่วยวิหาร; บ้าน `valdor_05`; นิสัย อดทน; เป้าหมาย: ไกล่เกลี่ยข้อพิพาทพื้นที่; ปม: มีศิษย์ที่ฝึกช้ากว่าคนอื่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_035 · คีร่า โฟลด์** — ผู้ไกล่เกลี่ย; บ้าน `valdor_12`; นิสัย ระวังตัว; เป้าหมาย: รักษางานเทศกาลจากการเลิกจัด; ปม: ถูกขอให้เป็นพยาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_036 · โนเอล โฟลด์** — ผู้จัดเทศกาล; บ้าน `valdor_19`; นิสัย ตรงไปตรงมา; เป้าหมาย: รวบรวมเรื่องเล่าของคนไม่มีชื่อ; ปม: ลังเลจะบอกความจริง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_037 · มีเรีย โฟลด์** — นักบันทึกประวัติศาสตร์; บ้าน `valdor_26`; นิสัย ขี้สงสัย; เป้าหมาย: รักษาตำราครอบครัวที่หลงเหลือ; ปม: ไม่อยากให้เด็กทำผิดตามตน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_038 · เซรอน โฟลด์** — ผู้ดูแลหอสมุด; บ้าน `valdor_03`; นิสัย รอบคอบ; เป้าหมาย: เปิดทางค้าระหว่างสองเมือง; ปม: สนใจโลกมากกว่าชื่อเสียง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_039 · ลูเธียร์ โฟลด์** — หัวหน้าตลาด; บ้าน `valdor_10`; นิสัย อ่อนโยน; เป้าหมาย: พัฒนาเครื่องมือชุมชน; ปม: กลัวความผิดพลาดจากอดีต. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_040 · เอลด้า โฟลด์** — ช่างฝีมือ; บ้าน `valdor_17`; นิสัย สุขุม; เป้าหมาย: พิสูจน์วิธีสอนที่ไม่แบ่งชนชั้น; ปม: ต้องดูแลสมาชิกครอบครัวที่เจ็บป่วย. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_041 · อีรัน ซีเรีย** — หัวหน้าคาราวาน; บ้าน `celestia_04`; นิสัย จริงจัง; เป้าหมาย: แก้การเข้าใจผิดของสองครอบครัว; ปม: ถูกขอให้ย้ายเมือง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_042 · ไลรา ซีเรีย** — นักวิจัยพืช; บ้าน `celestia_11`; นิสัย อารมณ์ดี; เป้าหมาย: ประพันธ์เพลงที่เล่าเรื่องคนธรรมดา; ปม: สูญเสียเงินทุนครั้งก่อน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_043 · เดเมีย ซีเรีย** — ผู้แทนชุมชน; บ้าน `celestia_18`; นิสัย อดทน; เป้าหมาย: ตรวจข้อมูลดาวที่ขัดแย้ง; ปม: เคยให้คำสัญญาที่ทำไม่ได้. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_044 · วาริน ซีเรีย** — นักดนตรี; บ้าน `celestia_25`; นิสัย ระวังตัว; เป้าหมาย: สร้างของใช้ที่ทำงานได้โดยไม่สิ้นเปลือง; ปม: พยายามซ่อนความภูมิใจ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_045 · โซเรน ซีเรีย** — ผู้สังเกตดาว; บ้าน `celestia_02`; นิสัย ตรงไปตรงมา; เป้าหมาย: ฟื้นฟูความไว้วางใจระหว่างสัตว์กับคน; ปม: ชื่อเสียงเก่าทำให้คนเข้าใจผิด. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_046 · นิลา ซีเรีย** — นักประดิษฐ์; บ้าน `celestia_09`; นิสัย ขี้สงสัย; เป้าหมาย: ทำแผนที่ให้คนเดินทางยากจน; ปม: ถูกดึงเข้าเรื่องการเมืองท้องถิ่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_047 · วาเลน ซีเรีย** — ผู้ดูแลสัตว์เวท; บ้าน `celestia_16`; นิสัย รอบคอบ; เป้าหมาย: รักษาโรงเตี๊ยมไม่ให้ปิด; ปม: กำลังหาทายาทในงาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_048 · อาริเอล ซีเรีย** — นักเขียนแผนที่; บ้าน `celestia_23`; นิสัย อ่อนโยน; เป้าหมาย: ฝึกศิษย์โดยไม่ใช้อำนาจ; ปม: ต้องตัดสินใจระหว่างงานและบ้าน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_049 · โคริน ซีเรีย** — เจ้าของโรงเตี๊ยม; บ้าน `celestia_30`; นิสัย สุขุม; เป้าหมาย: ตามหาบันทึกช่วยเหลือผู้คน; ปม: มีจดหมายที่ยังไม่ได้ส่ง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_050 · เธีย ซีเรีย** — นักฝึกอาชีพ; บ้าน `celestia_07`; นิสัย กระตือรือร้น; เป้าหมาย: ไกล่เกลี่ยข้อพิพาทพื้นที่; ปม: ต้องชดเชยความเสียหายของชุมชน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_051 · เลวิน ซีเรีย** — ผู้ช่วยวิหาร; บ้าน `celestia_14`; นิสัย จริงจัง; เป้าหมาย: รักษางานเทศกาลจากการเลิกจัด; ปม: ไม่แน่ใจว่าควรเชื่อข่าวลือ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_052 · ยูรีส ซีเรีย** — ผู้ไกล่เกลี่ย; บ้าน `celestia_21`; นิสัย อารมณ์ดี; เป้าหมาย: รวบรวมเรื่องเล่าของคนไม่มีชื่อ; ปม: มีศิษย์ที่ฝึกช้ากว่าคนอื่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_053 · เฟลิน ซีเรีย** — ผู้จัดเทศกาล; บ้าน `celestia_28`; นิสัย อดทน; เป้าหมาย: รักษาตำราครอบครัวที่หลงเหลือ; ปม: ถูกขอให้เป็นพยาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_054 · อาเวียร์ ซีเรีย** — นักบันทึกประวัติศาสตร์; บ้าน `celestia_05`; นิสัย ระวังตัว; เป้าหมาย: เปิดทางค้าระหว่างสองเมือง; ปม: ลังเลจะบอกความจริง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_055 · คีร่า ซีเรีย** — ผู้ดูแลหอสมุด; บ้าน `celestia_12`; นิสัย ตรงไปตรงมา; เป้าหมาย: พัฒนาเครื่องมือชุมชน; ปม: ไม่อยากให้เด็กทำผิดตามตน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_056 · โนเอล ซีเรีย** — หัวหน้าตลาด; บ้าน `celestia_19`; นิสัย ขี้สงสัย; เป้าหมาย: พิสูจน์วิธีสอนที่ไม่แบ่งชนชั้น; ปม: สนใจโลกมากกว่าชื่อเสียง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_057 · มีเรีย ซีเรีย** — ช่างฝีมือ; บ้าน `celestia_26`; นิสัย รอบคอบ; เป้าหมาย: ช่วยคนขาดโอกาสเข้าถึงอาหาร; ปม: กลัวความผิดพลาดจากอดีต. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_058 · เซรอน ซีเรีย** — ผู้สอนทักษะ; บ้าน `celestia_03`; นิสัย อ่อนโยน; เป้าหมาย: ค้นสถานที่ที่ผู้คนลืม; ปม: ต้องดูแลสมาชิกครอบครัวที่เจ็บป่วย. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_059 · ลูเธียร์ ซีเรีย** — ผู้ดูแลอาหาร; บ้าน `celestia_10`; นิสัย สุขุม; เป้าหมาย: พากลุ่มเดินทางกลับโดยปลอดภัย; ปม: ไม่เชื่อคนใหม่ง่าย ๆ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_060 · เอลด้า ซีเรีย** — นักสำรวจ; บ้าน `celestia_17`; นิสัย กระตือรือร้น; เป้าหมาย: หาคำตอบเรื่องพืชผิดฤดู; ปม: มีคู่แข่งที่เก่งกว่าแต่หวังดี. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_061 · อีรัน นาริน** — นักดนตรี; บ้าน `nightveir_04`; นิสัย อารมณ์ดี; เป้าหมาย: ฟื้นฟูความไว้วางใจระหว่างสัตว์กับคน; ปม: เคยให้คำสัญญาที่ทำไม่ได้. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_062 · ไลรา นาริน** — ผู้สังเกตดาว; บ้าน `nightveir_11`; นิสัย อดทน; เป้าหมาย: ทำแผนที่ให้คนเดินทางยากจน; ปม: พยายามซ่อนความภูมิใจ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_063 · เดเมีย นาริน** — นักประดิษฐ์; บ้าน `nightveir_18`; นิสัย ระวังตัว; เป้าหมาย: รักษาโรงเตี๊ยมไม่ให้ปิด; ปม: ชื่อเสียงเก่าทำให้คนเข้าใจผิด. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_064 · วาริน นาริน** — ผู้ดูแลสัตว์เวท; บ้าน `nightveir_25`; นิสัย ตรงไปตรงมา; เป้าหมาย: ฝึกศิษย์โดยไม่ใช้อำนาจ; ปม: ถูกดึงเข้าเรื่องการเมืองท้องถิ่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_065 · โซเรน นาริน** — นักเขียนแผนที่; บ้าน `nightveir_02`; นิสัย ขี้สงสัย; เป้าหมาย: ตามหาบันทึกช่วยเหลือผู้คน; ปม: กำลังหาทายาทในงาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_066 · นิลา นาริน** — เจ้าของโรงเตี๊ยม; บ้าน `nightveir_09`; นิสัย รอบคอบ; เป้าหมาย: ไกล่เกลี่ยข้อพิพาทพื้นที่; ปม: ต้องตัดสินใจระหว่างงานและบ้าน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_067 · วาเลน นาริน** — นักฝึกอาชีพ; บ้าน `nightveir_16`; นิสัย อ่อนโยน; เป้าหมาย: รักษางานเทศกาลจากการเลิกจัด; ปม: มีจดหมายที่ยังไม่ได้ส่ง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_068 · อาริเอล นาริน** — ผู้ช่วยวิหาร; บ้าน `nightveir_23`; นิสัย สุขุม; เป้าหมาย: รวบรวมเรื่องเล่าของคนไม่มีชื่อ; ปม: ต้องชดเชยความเสียหายของชุมชน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_069 · โคริน นาริน** — ผู้ไกล่เกลี่ย; บ้าน `nightveir_30`; นิสัย กระตือรือร้น; เป้าหมาย: รักษาตำราครอบครัวที่หลงเหลือ; ปม: ไม่แน่ใจว่าควรเชื่อข่าวลือ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_070 · เธีย นาริน** — ผู้จัดเทศกาล; บ้าน `nightveir_07`; นิสัย จริงจัง; เป้าหมาย: เปิดทางค้าระหว่างสองเมือง; ปม: มีศิษย์ที่ฝึกช้ากว่าคนอื่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_071 · เลวิน นาริน** — นักบันทึกประวัติศาสตร์; บ้าน `nightveir_14`; นิสัย อารมณ์ดี; เป้าหมาย: พัฒนาเครื่องมือชุมชน; ปม: ถูกขอให้เป็นพยาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_072 · ยูรีส นาริน** — ผู้ดูแลหอสมุด; บ้าน `nightveir_21`; นิสัย อดทน; เป้าหมาย: พิสูจน์วิธีสอนที่ไม่แบ่งชนชั้น; ปม: ลังเลจะบอกความจริง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_073 · เฟลิน นาริน** — หัวหน้าตลาด; บ้าน `nightveir_28`; นิสัย ระวังตัว; เป้าหมาย: ช่วยคนขาดโอกาสเข้าถึงอาหาร; ปม: ไม่อยากให้เด็กทำผิดตามตน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_074 · อาเวียร์ นาริน** — ช่างฝีมือ; บ้าน `nightveir_05`; นิสัย ตรงไปตรงมา; เป้าหมาย: ค้นสถานที่ที่ผู้คนลืม; ปม: สนใจโลกมากกว่าชื่อเสียง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_075 · คีร่า นาริน** — ผู้สอนทักษะ; บ้าน `nightveir_12`; นิสัย ขี้สงสัย; เป้าหมาย: พากลุ่มเดินทางกลับโดยปลอดภัย; ปม: กลัวความผิดพลาดจากอดีต. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_076 · โนเอล นาริน** — ผู้ดูแลอาหาร; บ้าน `nightveir_19`; นิสัย รอบคอบ; เป้าหมาย: หาคำตอบเรื่องพืชผิดฤดู; ปม: ต้องดูแลสมาชิกครอบครัวที่เจ็บป่วย. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_077 · มีเรีย นาริน** — นักสำรวจ; บ้าน `nightveir_26`; นิสัย อ่อนโยน; เป้าหมาย: แก้การเข้าใจผิดของสองครอบครัว; ปม: ไม่เชื่อคนใหม่ง่าย ๆ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_078 · เซรอน นาริน** — หัวหน้าคาราวาน; บ้าน `nightveir_03`; นิสัย สุขุม; เป้าหมาย: ประพันธ์เพลงที่เล่าเรื่องคนธรรมดา; ปม: มีคู่แข่งที่เก่งกว่าแต่หวังดี. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_079 · ลูเธียร์ นาริน** — นักวิจัยพืช; บ้าน `nightveir_10`; นิสัย กระตือรือร้น; เป้าหมาย: ตรวจข้อมูลดาวที่ขัดแย้ง; ปม: ถูกขอให้ย้ายเมือง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_080 · เอลด้า นาริน** — ผู้แทนชุมชน; บ้าน `nightveir_17`; นิสัย จริงจัง; เป้าหมาย: สร้างของใช้ที่ทำงานได้โดยไม่สิ้นเปลือง; ปม: สูญเสียเงินทุนครั้งก่อน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_081 · อีรัน วัลเซล** — ผู้ดูแลสัตว์เวท; บ้าน `akelon_04`; นิสัย อดทน; เป้าหมาย: ตามหาบันทึกช่วยเหลือผู้คน; ปม: ชื่อเสียงเก่าทำให้คนเข้าใจผิด. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_082 · ไลรา วัลเซล** — นักเขียนแผนที่; บ้าน `akelon_11`; นิสัย ระวังตัว; เป้าหมาย: ไกล่เกลี่ยข้อพิพาทพื้นที่; ปม: ถูกดึงเข้าเรื่องการเมืองท้องถิ่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_083 · เดเมีย วัลเซล** — เจ้าของโรงเตี๊ยม; บ้าน `akelon_18`; นิสัย ตรงไปตรงมา; เป้าหมาย: รักษางานเทศกาลจากการเลิกจัด; ปม: กำลังหาทายาทในงาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_084 · วาริน วัลเซล** — นักฝึกอาชีพ; บ้าน `akelon_25`; นิสัย ขี้สงสัย; เป้าหมาย: รวบรวมเรื่องเล่าของคนไม่มีชื่อ; ปม: ต้องตัดสินใจระหว่างงานและบ้าน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_085 · โซเรน วัลเซล** — ผู้ช่วยวิหาร; บ้าน `akelon_02`; นิสัย รอบคอบ; เป้าหมาย: รักษาตำราครอบครัวที่หลงเหลือ; ปม: มีจดหมายที่ยังไม่ได้ส่ง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_086 · นิลา วัลเซล** — ผู้ไกล่เกลี่ย; บ้าน `akelon_09`; นิสัย อ่อนโยน; เป้าหมาย: เปิดทางค้าระหว่างสองเมือง; ปม: ต้องชดเชยความเสียหายของชุมชน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_087 · วาเลน วัลเซล** — ผู้จัดเทศกาล; บ้าน `akelon_16`; นิสัย สุขุม; เป้าหมาย: พัฒนาเครื่องมือชุมชน; ปม: ไม่แน่ใจว่าควรเชื่อข่าวลือ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_088 · อาริเอล วัลเซล** — นักบันทึกประวัติศาสตร์; บ้าน `akelon_23`; นิสัย กระตือรือร้น; เป้าหมาย: พิสูจน์วิธีสอนที่ไม่แบ่งชนชั้น; ปม: มีศิษย์ที่ฝึกช้ากว่าคนอื่น. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_089 · โคริน วัลเซล** — ผู้ดูแลหอสมุด; บ้าน `akelon_30`; นิสัย จริงจัง; เป้าหมาย: ช่วยคนขาดโอกาสเข้าถึงอาหาร; ปม: ถูกขอให้เป็นพยาน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_090 · เธีย วัลเซล** — หัวหน้าตลาด; บ้าน `akelon_07`; นิสัย อารมณ์ดี; เป้าหมาย: ค้นสถานที่ที่ผู้คนลืม; ปม: ลังเลจะบอกความจริง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_091 · เลวิน วัลเซล** — ช่างฝีมือ; บ้าน `akelon_14`; นิสัย อดทน; เป้าหมาย: พากลุ่มเดินทางกลับโดยปลอดภัย; ปม: ไม่อยากให้เด็กทำผิดตามตน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_092 · ยูรีส วัลเซล** — ผู้สอนทักษะ; บ้าน `akelon_21`; นิสัย ระวังตัว; เป้าหมาย: หาคำตอบเรื่องพืชผิดฤดู; ปม: สนใจโลกมากกว่าชื่อเสียง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_093 · เฟลิน วัลเซล** — ผู้ดูแลอาหาร; บ้าน `akelon_28`; นิสัย ตรงไปตรงมา; เป้าหมาย: แก้การเข้าใจผิดของสองครอบครัว; ปม: กลัวความผิดพลาดจากอดีต. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_094 · อาเวียร์ วัลเซล** — นักสำรวจ; บ้าน `akelon_05`; นิสัย ขี้สงสัย; เป้าหมาย: ประพันธ์เพลงที่เล่าเรื่องคนธรรมดา; ปม: ต้องดูแลสมาชิกครอบครัวที่เจ็บป่วย. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_095 · คีร่า วัลเซล** — หัวหน้าคาราวาน; บ้าน `akelon_12`; นิสัย รอบคอบ; เป้าหมาย: ตรวจข้อมูลดาวที่ขัดแย้ง; ปม: ไม่เชื่อคนใหม่ง่าย ๆ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_096 · โนเอล วัลเซล** — นักวิจัยพืช; บ้าน `akelon_19`; นิสัย อ่อนโยน; เป้าหมาย: สร้างของใช้ที่ทำงานได้โดยไม่สิ้นเปลือง; ปม: มีคู่แข่งที่เก่งกว่าแต่หวังดี. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_097 · มีเรีย วัลเซล** — ผู้แทนชุมชน; บ้าน `akelon_26`; นิสัย สุขุม; เป้าหมาย: ฟื้นฟูความไว้วางใจระหว่างสัตว์กับคน; ปม: ถูกขอให้ย้ายเมือง. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_098 · เซรอน วัลเซล** — นักดนตรี; บ้าน `akelon_03`; นิสัย กระตือรือร้น; เป้าหมาย: ทำแผนที่ให้คนเดินทางยากจน; ปม: สูญเสียเงินทุนครั้งก่อน. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_099 · ลูเธียร์ วัลเซล** — ผู้สังเกตดาว; บ้าน `akelon_10`; นิสัย จริงจัง; เป้าหมาย: รักษาโรงเตี๊ยมไม่ให้ปิด; ปม: เคยให้คำสัญญาที่ทำไม่ได้. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง
- **npc_100 · เอลด้า วัลเซล** — นักประดิษฐ์; บ้าน `akelon_17`; นิสัย อารมณ์ดี; เป้าหมาย: ฝึกศิษย์โดยไม่ใช้อำนาจ; ปม: พยายามซ่อนความภูมิใจ. Choice hook: ช่วย/ร่วมงาน/ปฏิเสธด้วยความสุภาพ/ทำงานอื่น; ผลต่างคือความสัมพันธ์ สถานะอาชีพ ข้อมูลและบทต่อเนื่อง

## ความสัมพันธ์และช่วงวัย
วัย 0–11 ให้เน้นครอบครัว มิตรภาพ ความสัมพันธ์ครูศิษย์ และความผูกพันชุมชน ไม่แต่งเหตุการณ์ความรักผู้ใหญ่ในวัยเด็ก
วัย 12–17 ให้ความสำคัญกับมิตรภาพ ความชื่นชมและการเติบโตส่วนตัว ไม่มีการบังคับความสัมพันธ์
วัยผู้ใหญ่ 18+ จึงเปิดเนื้อเรื่องคู่ชีวิตแบบสมัครใจ ยินยอมทั้งสองฝ่าย ไม่โจ่งแจ้ง และไม่มีหลายคู่พร้อมกันเป็นเส้นทางบังคับ
แต่ละ NPC ควรมีความทรงจำของความช่วยเหลือ/การปฏิเสธ/สัญญา/ข้อพิพาท และอาจเปลี่ยนที่อยู่ตามเวลา โดย UI แสดงสถานที่ล่าสุดจาก state จริง

## Art direction consistency
ภาพสถานที่สร้างตาม `artId` ทุกจุด: 16-bit pixel environment (logical 320×180) ให้สีสอดคล้องภูมิอากาศ/ทวีป แต่มี silhouette/landmark เฉพาะ; indoor/outdoor variants สำหรับโรงเตี๊ยม โรงเรียน สำนักกิลด์ ป้อม ห้องสมุด โรงหลอม บ้าน
ไฟล์ sprite ตัวละครเป็น layer ที่ anchor เดียวกัน: skin, face, eyes, hair, shirt, pants, shoes, hats, cloak, equipment, aura. สายผม/ผิว/หน้าพ่อแม่สืบทอดแบบมีโอกาสผสมที่ตรวจสอบได้; ไม่ให้ skin tone ส่งผลต่อสติปัญญา/ความดี/สถานะ
ภาพและชื่อภาพทุกชนิดต้องเป็นต้นฉบับของ REBORN ไม่ทำ fanart/copy character อันมีลิขสิทธิ์

<!-- END 02_STORY_WORLD_BIBLE.md -->


---

<!-- BEGIN 03_CONTENT_DATA.md -->

# REBORN — STORY CHOICE LIBRARY V7
## Authorial briefs: 120 distinct career branch points + original life-event seeds
> IMPORTANT: รายการต่อไปนี้เป็น **ปม/บทเลือกต้นฉบับสำหรับให้ Codex เขียนเป็น runnable events** ไม่ใช่เกมที่ทำเสร็จแล้ว. ต้องเชื่อม flags, location, age, stat effects, cooldown และ followups จริงก่อนนับ authored/reachable ใน CONTENT_MANIFEST

## Story Branch Rules
- ช้อยส์สำคัญหยุดเวลาและไม่ถูก auto-resolve แม้ speed 16x หรือ Next Decision
- ทุกเหตุการณ์มี title, Thai micro-prose 2–4 ประโยค, age month ranges, eligible location IDs, conditional flags, fixed once/cooldown, 3 choices, genuine effects, at least 1 followup
- ตัวเลือกที่ผู้เล่นทำไม่ได้ให้ซ่อนไว้หรือเสนอ prerequisite action อย่างชัดเจน, อย่าโชว์ปุ่ม disabled เต็มหน้าจอ
- การเลือกเส้นไม่ตรงพรสวรรค์ต้องยังพัฒนาได้; ใช้ talent multiplier + training duration + luck (seeded) ไม่ปิดเส้นทางโดยไม่มีเหตุผล
- `followUp` ในเอกสารนี้เป็น hook ไม่ใช่ transition ทันทีเสมอ; ต้อง recheck age/location/relationship condition และไม่ข้ามเหตุการณ์อื่นสำคัญ
- โครงเรื่องช่วงอายุ 0–11 อยู่ใน Ambient Bank แบบเด็กตามวัย; ผู้ใหญ่คือผู้รับผิดชอบกิจกรรมที่เด็กยังทำเองไม่ได้

## 20 Career Arcs × 6 Forks = 120 Original Branch Nodes
แต่ละ arc เป็นเส้นชีวิตแยกที่ผู้เล่นอาจเข้าหรือออกเมื่อเปลี่ยนอาชีพ; 6 stages เป็นเหตุการณ์สำคัญตามวัย, ไม่ใช่ auto-level โดยไม่ฝึก
### สาย `sword`
#### `arc_sword_01` — ดาบไม้ในลานฝึก (วัย 12–19 ปี)
**สถานการณ์:** นักเรียนอายุน้อยพบดาบไม้ที่เจ้าของลืมไว้และครูยืนเฝ้า; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **คืนดาบให้ครูและถามวิธีฝึก** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sword_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ชวนเพื่อนซ้อมจังหวะเท้า** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sword_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **สังเกตท่าทางแล้วฝึกเบื้องต้น** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sword_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sword_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_sword_02` — ผู้ท้าชิงแห่งสะพานลม (วัย 19–35 ปี)
**สถานการณ์:** นักดาบต่างเมืองขอประลองแบบมีกรรมการ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **รับคำท้าตามกติกา** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sword_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เจรจาแลกเปลี่ยนเทคนิค** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sword_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ปฏิเสธแล้วฝึกอีกหนึ่งฤดู** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sword_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sword_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_sword_03` — ดาบไร้ชื่อของช่างเก่า (วัย 35–80 ปี)
**สถานการณ์:** ช่างวัยชราขอให้ทดสอบความสมดุลของดาบ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **บอกปัญหาตรงไปตรงมา** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sword_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยช่างทำบันทึกการทดลอง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sword_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **นำเรื่องนี้ไปถามอาจารย์** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sword_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sword_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_sword_04` — ศิษย์ที่ไม่กล้ากลับบ้าน (วัย 80–150 ปี)
**สถานการณ์:** ลูกศิษย์แพ้การแข่งขันและท้อใจ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ฝึกคู่จนฟื้นความมั่นใจ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sword_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ให้เขาหยุดพักและฟังเรื่องราว** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sword_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ติดต่อครอบครัวเพื่อช่วยเหลือ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sword_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sword_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_sword_05` — วิชาคำนับพายุ (วัย 150–600 ปี)
**สถานการณ์:** พบตำราท่าดาบซึ่งเน้นการไม่ชักดาบ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ฝึกยับยั้งตัวเองเพื่อปกป้อง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sword_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ศึกษาที่มาของตำรา** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sword_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ถ่ายทอดให้ศิษย์ของสำนัก** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sword_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sword_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_sword_06` — คำสัตย์ที่ขอบฟ้า (วัย 600–1250 ปี)
**สถานการณ์:** ผู้ครองคมดาบได้รับคำเชิญให้ทดสอบจิตใจเหนือยุค; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ยอมรับบททดสอบด้วยตนเอง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sword_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **กลับไปเยี่ยมผู้ที่เคยช่วยเหลือ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sword_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลือกฝึกในโลกมนุษย์ต่อไป** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sword_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_sword_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `warrior`
#### `arc_warrior_01` — ยามค่ำหน้าประตูบ้าน (วัย 12–19 ปี)
**สถานการณ์:** ผู้ดูแลถนนต้องการช่วยจัดเวรในเทศกาล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **อาสาช่วยตรวจทางอย่างปลอดภัย** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_warrior_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ทำป้ายเตือนอุบัติเหตุ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_warrior_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ช่วยผู้ใหญ่จัดรายชื่อเวร** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_warrior_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_warrior_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_warrior_02` — โล่ที่หนักเกินกำลัง (วัย 19–35 ปี)
**สถานการณ์:** เพื่อนร่วมฝึกพยายามใช้อุปกรณ์ที่ยังไม่เหมาะ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **แนะนำการฝึกขั้นพื้นฐาน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_warrior_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอคำปรึกษาครูฝึก** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_warrior_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ช่วยเพื่อนพักและวางเป้าหมายใหม่** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_warrior_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_warrior_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_warrior_03` — การรักษาสัญญาคาราวาน (วัย 35–80 ปี)
**สถานการณ์:** คาราวานถูกข่าวลือเรื่องความปลอดภัยทำให้ลังเล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เสนอเส้นทางมีผู้คุ้มกัน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_warrior_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอข้อมูลจากด่านจริง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_warrior_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ยกเลิกงานที่ไม่ปลอดภัย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_warrior_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_warrior_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_warrior_04` — เวรเฝ้าหลังฤดูหนาว (วัย 80–150 ปี)
**สถานการณ์:** กำลังคนขาดช่วงพายุหิมะ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **จัดตารางช่วยชุมชน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_warrior_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สอนรุ่นใหม่รักษาความพร้อม** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_warrior_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอความร่วมมือจากเมืองใกล้เคียง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_warrior_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_warrior_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_warrior_05` — ป้อมที่ไม่มีศัตรู (วัย 150–600 ปี)
**สถานการณ์:** ปราสาทเก่าเหลือแต่หน้าที่ดูแลผู้เดินทาง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เปลี่ยนพื้นที่เป็นศูนย์ช่วยเหลือ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_warrior_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ตั้งสถาบันสอนการปกป้อง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_warrior_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เปิดให้ชุมชนตรวจสอบการดูแล** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_warrior_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_warrior_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_warrior_06` — คำปฏิญาณเหนือยุค (วัย 600–1250 ปี)
**สถานการณ์:** อดีตผู้พิทักษ์ต้องตัดสินใจว่าจะปกป้องสิ่งใด; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ยึดมั่นความปลอดภัยของผู้คน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_warrior_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **รักษาความสงบระหว่างเผ่า** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_warrior_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **มอบอำนาจให้ผู้อื่นก่อนออกเดินทาง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_warrior_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_warrior_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `mage`
#### `arc_mage_01` — หยดแสงบนปลายปากกา (วัย 12–19 ปี)
**สถานการณ์:** ระหว่างเรียนอักขระ แสงมานาแสดงรูปทรงต่างจากตัวอย่าง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ถามครูถึงสาเหตุ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mage_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **วาดแบบรูปทรงไว้เปรียบเทียบ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mage_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ฝึกควบคุมลมหายใจตามคำสอน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mage_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mage_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_mage_02` — หอสมุดที่ปิดก่อนค่ำ (วัย 19–35 ปี)
**สถานการณ์:** หอสมุดต้องปิดชั่วคราวและศิษย์หลายคนกังวล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ช่วยจัดหนังสือให้คืนเปิดได้เร็ว** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mage_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เรียนกับเพื่อนนอกหอสมุด** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mage_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอผู้ดูแลแนะนำเล่มที่ยืมได้** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mage_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mage_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_mage_03` — มนตราเปลี่ยนสีฤดูกาล (วัย 35–80 ปี)
**สถานการณ์:** อาคมป้องกันสวนเปลี่ยนสีตามอากาศ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **วัดผลอย่างเป็นระบบ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mage_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เรียกผู้เชี่ยวชาญพฤกษา** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mage_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หยุดทดลองจนตรวจความปลอดภัย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mage_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mage_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_mage_04` — ข้อถกเถียงในสภาเวท (วัย 80–150 ปี)
**สถานการณ์:** สภาจะใช้พลังมานาเพื่อบ้านเมืองแบบไหน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เสนอการกระจายพลังให้ชุมชน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mage_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ทำงานวิจัยผลระยะยาว** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mage_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลือกสอนคนรุ่นใหม่แทนการเมือง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mage_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mage_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_mage_05` — คำอธิบายกฎที่หายไป (วัย 150–600 ปี)
**สถานการณ์:** จารึกเก่าชี้ว่ามีแบบแผนเหนือเวทคุ้นเคย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สำรวจหอจารึก** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mage_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จัดทีมแปลตำรา** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mage_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **บันทึกข้อสงสัยรอหลักฐานเพิ่ม** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mage_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mage_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_mage_06` — มานาที่เลือกได้ (วัย 600–1250 ปี)
**สถานการณ์:** ก่อนข้ามขอบเขต ผู้รู้ต้องเลือกการใช้ความรู้; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ใช้เวทเพื่อการศึกษาร่วมกัน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mage_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ใช้เพื่อรักษาสมดุลธรรมชาติ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mage_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลือกกลับสอนศิษย์ก่อน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mage_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_mage_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `archer`
#### `arc_archer_01` — สายลมปิดลานฝึก (วัย 12–19 ปี)
**สถานการณ์:** ลมแรงทำให้การแข่งขันยกเลิก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เสนอเรียนเรื่องทิศลม** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_archer_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยเก็บอุปกรณ์ให้ครู** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_archer_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ชวนเพื่อนทบทวนจังหวะสายตา** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_archer_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_archer_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_archer_02` — ลูกศรสัญญาณจากเนิน (วัย 19–35 ปี)
**สถานการณ์:** ผู้ลาดตระเวนใช้สัญญาณขอความช่วยเหลือ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **แจ้งผู้ดูแลเส้นทาง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_archer_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สังเกตต้นทางจากจุดปลอดภัย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_archer_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เตรียมเครื่องหมายทิศทางให้คนอื่น** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_archer_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_archer_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_archer_03` — การแข่งขันที่ไม่ใช้คะแนน (วัย 35–80 ปี)
**สถานการณ์:** นักธนูสองเมืองแลกเปลี่ยนวิธีสอน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สอนศิษย์ใหม่อย่างใจเย็น** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_archer_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **บันทึกข้อแตกต่างทางเทคนิค** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_archer_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **วัดความปลอดภัยของสนามฝึก** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_archer_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_archer_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_archer_04` — หอเฝ้าที่ไร้ผู้เห็น (วัย 80–150 ปี)
**สถานการณ์:** หอเฝ้าทางข้ามถูกละเลย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **จัดเวรและระบบสื่อสาร** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_archer_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เสนอสร้างทางใหม่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_archer_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ร่วมชุมชนตัดสินใจเรื่องงบประมาณ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_archer_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_archer_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_archer_05` — แผนภูมิทิศลมพันปี (วัย 150–600 ปี)
**สถานการณ์:** บันทึกทิศลมเปลี่ยนทุกยุค; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตรวจข้อมูลภาคสนาม** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_archer_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ประสานนักวิชาการ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_archer_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **สอนวิธีอ่านลมให้ชุมชน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_archer_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_archer_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_archer_06` — เส้นทางสายตาสุดท้าย (วัย 600–1250 ปี)
**สถานการณ์:** การทดสอบขั้นสูงให้มองเห็นภัยโดยไม่ใช้อำนาจทำร้าย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เลือกปกป้องการเดินทาง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_archer_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เลือกสอนผู้อื่นพึ่งตนเอง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_archer_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอเวลาสำรวจตนก่อน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_archer_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_archer_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `healer`
#### `arc_healer_01` — กล่องสมุนไพรตกหล่น (วัย 12–19 ปี)
**สถานการณ์:** ผู้ช่วยห้องพักฟื้นทำกล่องสมุนไพรหล่น; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ช่วยเก็บตามชื่อกำกับ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_healer_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **แจ้งผู้ดูแลตรวจรายการ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_healer_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **อาสาศึกษาฉลากให้ถูกต้อง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_healer_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_healer_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_healer_02` — วันทำงานยาวของผู้รักษา (วัย 19–35 ปี)
**สถานการณ์:** คนในเมืองเข้าคิวขอคำปรึกษา; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ช่วยจัดคิวอย่างเป็นธรรม** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_healer_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอผู้ช่วยเพิ่มจากชุมชน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_healer_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ช่วยจัดพื้นที่พักสงบ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_healer_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_healer_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_healer_03` — สมุนไพรผิดฤดู (วัย 35–80 ปี)
**สถานการณ์:** สวนยามีพืชออกดอกไม่ตามฤดู; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **จดข้อมูลและปรึกษาผู้เชี่ยวชาญ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_healer_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **หยุดใช้พืชที่ไม่ทราบที่มา** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_healer_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ช่วยเกษตรกรฟื้นแปลง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_healer_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_healer_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_healer_04` — ทางเลือกของสำนักเยียวยา (วัย 80–150 ปี)
**สถานการณ์:** สำนักต้องเลือกเน้นคนทั่วไปหรือชนชั้นสูง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เสนอทุนสำหรับผู้ขาดโอกาส** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_healer_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จัดระบบหมุนเวียนคนดูแล** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_healer_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ตั้งหน่วยศึกษาเพื่อเพิ่มทรัพยากร** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_healer_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_healer_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_healer_05` — ตำราลมหายใจยุคเก่า (วัย 150–600 ปี)
**สถานการณ์:** พบความรู้การดูแลชีวิตที่ต้องใช้ความรับผิดชอบ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตรวจหลักฐานร่วมสำนัก** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_healer_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จัดประชุมแลกเปลี่ยนวิชา** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_healer_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เก็บต้นฉบับไว้จนเข้าใจขอบเขต** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_healer_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_healer_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_healer_06` — บททดสอบแห่งการยืนข้างชีวิต (วัย 600–1250 ปี)
**สถานการณ์:** ผู้รักษาต้องแสดงความสามารถควบคู่ความถ่อมตน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เลือกสอนคนรุ่นใหม่** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_healer_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เลือกช่วยเหลือทุกเผ่า** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_healer_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลือกกลับดูแลคนใกล้ตัว** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_healer_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_healer_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `summoner`
#### `arc_summoner_01` — รอยเท้าเล็กในสวน (วัย 12–19 ปี)
**สถานการณ์:** สัตว์เวทหลงทางเข้ามาในสวนโรงเรียน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ค่อย ๆ เว้นระยะและแจ้งผู้ดูแล** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_summoner_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **วางน้ำไว้ในจุดปลอดภัย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_summoner_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ศึกษาร่องรอยโดยไม่จับต้อง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_summoner_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_summoner_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_summoner_02` — เพื่อนร่วมทางที่เงียบ (วัย 19–35 ปี)
**สถานการณ์:** คู่หูสัตว์เวทไม่ตอบรับการฝึก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **หยุดฝึกแล้วสังเกตความต้องการ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_summoner_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ให้ผู้ดูแลสัตว์ช่วยประเมิน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_summoner_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เปลี่ยนรูปแบบกิจกรรมให้เหมาะกับคู่หู** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_summoner_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_summoner_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_summoner_03` — พันธสัญญาไม่สมดุล (วัย 35–80 ปี)
**สถานการณ์:** ผู้ร่วมทางเสนอข้อตกลงที่เอาเปรียบสิ่งมีชีวิต; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ขอแก้สัญญาอย่างเป็นธรรม** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_summoner_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ปรึกษาผู้มีประสบการณ์** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_summoner_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ปฏิเสธข้อตกลง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_summoner_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_summoner_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_summoner_04` — เสียงเรียกในป่าคู่ขนาน (วัย 80–150 ปี)
**สถานการณ์:** สองฝูงสัตว์เวทแย่งถิ่นหากิน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ช่วยทำพื้นที่ร่วมโดยไม่รบกวน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_summoner_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **รวบรวมข้อมูลฤดูกาล** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_summoner_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เจรจาผ่านผู้ดูแลที่เข้าใจทั้งสองฝูง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_summoner_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_summoner_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_summoner_05` — หอพันธมิตรที่ยังไม่เปิด (วัย 150–600 ปี)
**สถานการณ์:** อาคารเก่าเคยเป็นที่พักของสัตว์เวท; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ฟื้นฟูเป็นศูนย์พักพิง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_summoner_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ตั้งสำนักสอนจริยธรรม** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_summoner_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เปลี่ยนเป็นสวนเปิดให้ชุมชน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_summoner_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_summoner_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_summoner_06` — คำสัญญาก่อนประตูสูง (วัย 600–1250 ปี)
**สถานการณ์:** ถึงเวลาตัดสินใจว่าพลังร่วมหมายถึงอะไร; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **รักษาอิสระของคู่หู** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_summoner_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เชื่อมความเข้าใจระหว่างคนกับสัตว์** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_summoner_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ใช้ชีวิตกับกลุ่มเดิมต่อไป** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_summoner_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_summoner_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `alchemist`
#### `arc_alchemist_01` — ขวดแก้วที่ไม่มีป้าย (วัย 12–19 ปี)
**สถานการณ์:** กล่องวัตถุดิบในห้องเรียนไม่ติดชื่อ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **แจ้งอาจารย์ก่อนแตะ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_alchemist_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยออกแบบป้ายมาตรฐาน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_alchemist_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **อ่านคู่มือการจัดเก็บ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_alchemist_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_alchemist_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_alchemist_02` — ตลาดสมุนไพรเกินราคา (วัย 19–35 ปี)
**สถานการณ์:** คนขายโต้แย้งเรื่องราคาพืชหายาก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตรวจแหล่งที่มา** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_alchemist_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เสนอรับซื้ออย่างยุติธรรม** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_alchemist_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับมาศึกษาสรรพคุณก่อนลงทุน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_alchemist_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_alchemist_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_alchemist_03` — สูตรจากต่างทวีป (วัย 35–80 ปี)
**สถานการณ์:** ช่างปรุงจากอีกเมืองนำสูตรแปลกมาแลก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **แลกความรู้โดยให้เครดิต** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_alchemist_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จ่ายเงินเพื่อเรียนอย่างถูกต้อง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_alchemist_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ตรวจความปลอดภัยก่อนทดลอง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_alchemist_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_alchemist_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_alchemist_04` — โรงปรุงอายุร้อยปี (วัย 80–150 ปี)
**สถานการณ์:** สูตรที่เคยนิยมเริ่มไม่เหมาะกับเมืองปัจจุบัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **วิจัยส่วนผสมท้องถิ่น** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_alchemist_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เปิดฝึกให้รุ่นใหม่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_alchemist_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เชิญผู้ใช้ผลิตภัณฑ์ร่วมประเมิน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_alchemist_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_alchemist_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_alchemist_05` — แร่ที่เลียนแบบแสงดาว (วัย 150–600 ปี)
**สถานการณ์:** วัตถุโบราณอาจเปลี่ยนรูปเมื่อผ่านฤดู; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ศึกษาโดยเครื่องมือปลอดภัย** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_alchemist_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอความร่วมมือกับนักวิชาการ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_alchemist_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เก็บรอผู้เชี่ยวชาญขั้นสูง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_alchemist_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_alchemist_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_alchemist_06` — กฎแห่งการเปลี่ยนรูป (วัย 600–1250 ปี)
**สถานการณ์:** บททดสอบสูงสุดถามว่าการเปลี่ยนแปลงต้องรับผิดชอบอย่างไร; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เผยแพร่หลักฐานต่อผู้คน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_alchemist_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยสร้างมาตรฐานอุตสาหกรรม** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_alchemist_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับไปปรับปรุงสูตรพื้นฐาน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_alchemist_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_alchemist_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `smith`
#### `arc_smith_01` — เหล็กแผ่นแรกของครูช่าง (วัย 12–19 ปี)
**สถานการณ์:** ร้านตีเหล็กมีแผ่นโลหะที่ช่างอนุญาตให้สังเกต; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ถามเรื่องชนิดของวัสดุ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_smith_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยจัดโต๊ะงานที่ปลอดภัย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_smith_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **จดรูปทรงอุปกรณ์โดยไม่จับเตา** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_smith_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_smith_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_smith_02` — สัญญาซ่อมสะพานไม้ (วัย 19–35 ปี)
**สถานการณ์:** ชุมชนต้องการอุปกรณ์ช่วยซ่อมสะพาน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ร่วมวางแผนกับช่างใหญ่** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_smith_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เสนออุปกรณ์ที่ง่ายต่อการดูแล** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_smith_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอประเมินต้นทุนอย่างโปร่งใส** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_smith_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_smith_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_smith_03` — งานประกวดฝีมือท้องถิ่น (วัย 35–80 ปี)
**สถานการณ์:** ช่างฝีมือหลายสำนักส่งงานต้นแบบ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ส่งผลงานใช้งานจริง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_smith_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ร่วมทีมกับนักประดิษฐ์** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_smith_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลือกเป็นกรรมการประเมินความปลอดภัย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_smith_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_smith_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_smith_04` — งานใหญ่กับค่านิยมเล็ก (วัย 80–150 ปี)
**สถานการณ์:** ผู้มีอำนาจเสนอค่าจ้างสูงแลกตัดขั้นตอนตรวจคุณภาพ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ปฏิเสธและรักษามาตรฐาน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_smith_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เจรจาเงื่อนไขใหม่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_smith_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **คืนมัดจำอย่างตรงไปตรงมา** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_smith_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_smith_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_smith_05` — โรงตีที่เสียงค้อนหาย (วัย 150–600 ปี)
**สถานการณ์:** ช่างรุ่นใหม่ขาดผู้สอน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เปิดหลักสูตรฝึกฟรี** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_smith_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **พัฒนาคู่มือภาพพิกเซล** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_smith_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ออกเดินทางค้นวิธีการเรียนจากชุมชนอื่น** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_smith_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_smith_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_smith_06` — สิ่งสร้างที่มีค่าหลังพันปี (วัย 600–1250 ปี)
**สถานการณ์:** ผู้สร้างต้องตัดสินใจชิ้นงานสุดท้ายของตน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างเครื่องมือช่วยคนรุ่นหลัง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_smith_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สร้างศูนย์ความรู้ช่าง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_smith_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **มอบผลงานให้ชุมชนดูแล** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_smith_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_smith_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `merchant`
#### `arc_merchant_01` — บัญชีตลาดใบแรก (วัย 12–19 ปี)
**สถานการณ์:** เจ้าของร้านให้ช่วยนับสินค้าเล็กน้อย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ช่วยตรวจรายการตรงไปตรงมา** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_merchant_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สังเกตแนวโน้มราคา** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_merchant_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เสนอจัดป้ายราคาชัดเจน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_merchant_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_merchant_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_merchant_02` — คาราวานเปลี่ยนเส้นทาง (วัย 19–35 ปี)
**สถานการณ์:** สินค้าในเมืองขาดแคลนเพราะทางถูกปิด; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เลือกเส้นทางปลอดภัยกว่า** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_merchant_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **หารือกับผู้ค้ารายอื่น** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_merchant_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **พักการซื้อขายเพื่อป้องกันขาดทุน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_merchant_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_merchant_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_merchant_03` — ข้อตกลงที่กำกวม (วัย 35–80 ปี)
**สถานการณ์:** คู่ค้าต่างถิ่นเสนอแบ่งกำไรแต่เงื่อนไขไม่ชัด; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ขอเอกสารใหม่ก่อนเซ็น** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_merchant_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เจรจาผ่านคนกลาง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_merchant_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ปฏิเสธจนกว่ามีหลักฐาน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_merchant_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_merchant_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_merchant_04` — ตลาดที่กำลังถูกผูกขาด (วัย 80–150 ปี)
**สถานการณ์:** กลุ่มการค้ารายใหญ่กดราคาผู้ผลิต; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตั้งตลาดร่วมชุมชน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_merchant_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เจรจาให้เกิดเกณฑ์ราคาเป็นธรรม** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_merchant_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หาทางพาผลิตภัณฑ์สู่เมืองอื่น** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_merchant_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_merchant_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_merchant_05` — สมาคมการค้าข้ามยุค (วัย 150–600 ปี)
**สถานการณ์:** เครือข่ายร้านรอดผ่านการเปลี่ยนราชวงศ์; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตั้งกองทุนเพื่อคนเริ่มต้น** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_merchant_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ลงทุนเทคโนโลยีขนส่ง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_merchant_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **แบ่งความรู้ให้ผู้สืบทอด** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_merchant_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_merchant_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_merchant_06` — เหรียญสุดท้ายเหนือกาล (วัย 600–1250 ปี)
**สถานการณ์:** ข้อสอบสูงสุดถามว่าความมั่งคั่งควรเชื่อมผู้คนอย่างไร; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างเส้นทางช่วยคนขาดโอกาส** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_merchant_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **วางกติกาการแลกเปลี่ยนโปร่งใส** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_merchant_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับไปดูแลร้านเก่าที่เป็นจุดเริ่ม** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_merchant_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_merchant_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `scholar`
#### `arc_scholar_01` — คำผิดในตำราเรียน (วัย 12–19 ปี)
**สถานการณ์:** พบข้อความขัดกันในหนังสือสองเล่ม; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ถามครูถึงหลักฐาน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_scholar_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เปรียบเทียบต้นฉบับ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_scholar_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **บันทึกข้อสงสัยเพื่อค้นต่อ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_scholar_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_scholar_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_scholar_02` — คำถามที่ไม่มีข้อสอบ (วัย 19–35 ปี)
**สถานการณ์:** สถาบันให้แก้โจทย์เปิดที่มีหลายแนวคิด; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ทดลองเก็บข้อมูลเอง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_scholar_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ร่วมอภิปรายกับเพื่อน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_scholar_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขออาจารย์ช่วยระบุข้อจำกัด** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_scholar_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_scholar_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_scholar_03` — ลำดับเหตุการณ์ไม่ลงตัว (วัย 35–80 ปี)
**สถานการณ์:** บันทึกเมืองเก่าสองชุดบอกปีไม่ตรงกัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สำรวจหอจารึก** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_scholar_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอข้อมูลจากชุมชน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_scholar_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ยอมรับว่าไม่รู้จนมีหลักฐาน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_scholar_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_scholar_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_scholar_04` — ความรู้ที่ถูกซ่อน (วัย 80–150 ปี)
**สถานการณ์:** บางฝ่ายไม่อยากเผยข้อมูลให้คนทั่วไป; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เปิดโต๊ะเสวนาสาธารณะ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_scholar_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **รักษาข้อมูลส่วนบุคคลก่อนเผยแพร่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_scholar_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เสนอเผยแพร่สรุปที่ตรวจสอบได้** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_scholar_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_scholar_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_scholar_05` — ภาษาจากอารยธรรมที่หาย (วัย 150–600 ปี)
**สถานการณ์:** จารึกมีรหัสภาษาหลายชั้น; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ทำงานกับนักแปลต่างเผ่า** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_scholar_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เทียบสัญลักษณ์จากแผนที่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_scholar_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **รวบรวมบันทึกเฉพาะที่ตรวจสอบแล้ว** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_scholar_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_scholar_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_scholar_06` — หน้าแรกของหนังสือพันปี (วัย 600–1250 ปี)
**สถานการณ์:** นักปราชญ์ต้องเลือกมรดกแห่งความรู้; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างห้องเรียนเปิด** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_scholar_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เขียนสารานุกรมที่ตรวจทานได้** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_scholar_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับไปสอนเด็กที่หมู่บ้านเดิม** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_scholar_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_scholar_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `shadow`
#### `arc_shadow_01` — เสียงฝีเท้าหลังตลาด (วัย 12–19 ปี)
**สถานการณ์:** ผู้ช่วยตลาดพบของหายและข่าวลือมากมาย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **รายงานผู้ดูแลอย่างมีหลักฐาน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_shadow_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ถามคนที่เกี่ยวข้องโดยสุภาพ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_shadow_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **สังเกตรูปแบบเวรยาม** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_shadow_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_shadow_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_shadow_02` — ข้อความที่มาถึงผิดคน (วัย 19–35 ปี)
**สถานการณ์:** จดหมายงานราชการส่งผิดผู้รับ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **คืนให้หน่วยงานที่ถูกต้อง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_shadow_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอพยานการส่งคืน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_shadow_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หาทางแจ้งผู้รับตัวจริงอย่างปลอดภัย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_shadow_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_shadow_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_shadow_03` — เงาในงานเทศกาล (วัย 35–80 ปี)
**สถานการณ์:** มีคนแอบเปลี่ยนป้ายงานแล้วคนเข้าใจผิด; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ค้นต้นตอจากเบาะแส** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_shadow_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ประสานผู้จัดงาน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_shadow_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เสนอระบบยืนยันข่าวสาร** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_shadow_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_shadow_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_shadow_04` — ผู้ว่าจ้างที่ปิดบังชื่อ (วัย 80–150 ปี)
**สถานการณ์:** คนลึกลับจ้างให้สืบข้อมูลส่วนบุคคล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ปฏิเสธงานที่ละเมิดสิทธิ์** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_shadow_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอตรวจความชอบธรรมก่อน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_shadow_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ส่งต่อให้ผู้ดูแลชุมชน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_shadow_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_shadow_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_shadow_05` — เครือข่ายข่าวสารเก่า (วัย 150–600 ปี)
**สถานการณ์:** ข่าวลือย้อนกลับหลายยุคทำให้คนโต้แย้ง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างระบบตรวจหลักฐาน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_shadow_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ทำงานกับนักวิชาการ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_shadow_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลือกปกป้องผู้แจ้งข่าวโดยไม่เปิดเผย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_shadow_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_shadow_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_shadow_06` — การหายไปอย่างมีความหมาย (วัย 600–1250 ปี)
**สถานการณ์:** ผู้เดินเงาต้องเลือกว่าจะใช้ความลับเพื่ออะไร; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ปกป้องผู้คนที่ไม่มีเสียง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_shadow_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เปิดเผยความจริงที่ตรวจสอบได้** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_shadow_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เก็บความรู้ไว้รอเวลาที่ปลอดภัย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_shadow_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_shadow_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `adventurer`
#### `arc_adventurer_01` — แผนที่รอบบ้านฉบับแรก (วัย 12–19 ปี)
**สถานการณ์:** เด็กได้เรียนรู้ป้ายบอกทางและความสำคัญของการแจ้งผู้ใหญ่; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **วาดทางปลอดภัยรอบชุมชน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_adventurer_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ถามนักเดินทางเรื่องที่พบ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_adventurer_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ช่วยทำสัญลักษณ์ให้คนเดินทาง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_adventurer_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_adventurer_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_adventurer_02` — ทางแยกหน้าหมู่บ้าน (วัย 19–35 ปี)
**สถานการณ์:** นักเดินทางรุ่นใหม่เลือกว่าจะไปทุ่งหรือเมือง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ไปกับกลุ่มที่มีประสบการณ์** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_adventurer_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ออกสำรวจระยะสั้นตามใบอนุญาต** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_adventurer_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **พักฝึกความพร้อมก่อน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_adventurer_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_adventurer_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_adventurer_03` — จดหมายจากผู้หลงทาง (วัย 35–80 ปี)
**สถานการณ์:** พบนักเดินทางขอความช่วยเหลือในเส้นทาง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ประสานผู้คุ้มกัน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_adventurer_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **แบ่งเสบียงเท่าที่พอ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_adventurer_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **นำข้อมูลทางไปแจ้งเมือง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_adventurer_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_adventurer_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_adventurer_04` — ดาวที่ไม่อยู่บนแผนที่ (วัย 80–150 ปี)
**สถานการณ์:** พบแผนที่โบราณที่ตำแหน่งไม่ตรงปัจจุบัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สำรวจร่วมคณะ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_adventurer_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **วัดพิกัดใหม่ก่อนเดิน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_adventurer_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขายข้อมูลสรุปอย่างรับผิดชอบ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_adventurer_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_adventurer_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_adventurer_05` — เส้นทางเปลี่ยนยุค (วัย 150–600 ปี)
**สถานการณ์:** เมืองที่เคยว่างกลับคึกคัก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างบันทึกภูมิประเทศใหม่** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_adventurer_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยผู้คนย้ายไปพื้นที่ปลอดภัย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_adventurer_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **สอนการอ่านแผนที่ให้รุ่นใหม่** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_adventurer_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_adventurer_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_adventurer_06` — ขอบสุดท้ายของแผนที่ (วัย 600–1250 ปี)
**สถานการณ์:** ผู้เดินทางพบทางที่ไม่มีบันทึก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **นำเพื่อนร่วมทางอย่างปลอดภัย** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_adventurer_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **หาหลักฐานก่อนก้าวต่อ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_adventurer_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับบ้านเพื่อขอคำปรึกษา** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_adventurer_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_adventurer_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `mercenary`
#### `arc_mercenary_01` — สัญญาฝึกคุ้มกันฉบับแรก (วัย 12–19 ปี)
**สถานการณ์:** คาราวานขอผู้ช่วยจัดรายการสัมภาระ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตรวจความพร้อมภายใต้ผู้ใหญ่** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mercenary_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอคำอธิบายกติกางาน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mercenary_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ช่วยบันทึกเส้นทางปลอดภัย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mercenary_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mercenary_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_mercenary_02` — การจ้างที่จ่ายไม่ตรง (วัย 19–35 ปี)
**สถานการณ์:** ผู้ว่าจ้างจะลดค่าจ้างหลังจบงาน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ขอให้ทบทวนสัญญา** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mercenary_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ใช้คนกลางเจรจา** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mercenary_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **รายงานกิลด์แล้วไม่รับงานต่อ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mercenary_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mercenary_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_mercenary_03` — คาราวานที่มีกลุ่มเห็นต่าง (วัย 35–80 ปี)
**สถานการณ์:** ผู้เดินทางสองฝ่ายไม่ไว้ใจกัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **จัดกฎคุ้มกันร่วม** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mercenary_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอเปลี่ยนหัวหน้าขบวน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mercenary_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ยกเลิกการเดินทางที่เสี่ยงเกิน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mercenary_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mercenary_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_mercenary_04` — หน้าที่ที่เกินค่าจ้าง (วัย 80–150 ปี)
**สถานการณ์:** ชาวบ้านขอการช่วยเหลือแต่ทุนไม่พอ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เสนอคุ้มกันแบบหมุนเวียน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mercenary_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ตั้งกองทุนชุมชน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mercenary_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หาผู้สนับสนุนจากเมือง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mercenary_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mercenary_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_mercenary_05` — กองกำลังแห่งความไว้ใจ (วัย 150–600 ปี)
**สถานการณ์:** กองคุ้มกันอายุร้อยปีเริ่มยึดถืออำนาจ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตั้งระบบตรวจสอบภายนอก** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mercenary_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ฝึกหัวหน้ารุ่นใหม่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mercenary_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **แบ่งงานกับหน่วยงานท้องถิ่น** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mercenary_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_mercenary_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_mercenary_06` — สัญญาที่ไม่มีวันสิ้นสุด (วัย 600–1250 ปี)
**สถานการณ์:** ผู้คุ้มกันต้องเลือกหลักที่ควรอยู่เหนือคำสั่ง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เลือกความปลอดภัยของประชาชน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_mercenary_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เลือกการตรวจสอบอำนาจ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_mercenary_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ส่งต่อหน้าที่ให้คนรุ่นหลัง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_mercenary_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_mercenary_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `diplomat`
#### `arc_diplomat_01` — สองบ้านกับแนวรั้ว (วัย 12–19 ปี)
**สถานการณ์:** เด็กเห็นครอบครัวสองบ้านไม่เห็นตรงกัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ชวนทั้งสองฝ่ายคุยกับผู้ใหญ่** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_diplomat_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ฟังเรื่องราวแยกฝั่ง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_diplomat_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอครูช่วยอธิบายกติกาชุมชน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_diplomat_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_diplomat_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_diplomat_02` — สภาเด็กแห่งตลาด (วัย 19–35 ปี)
**สถานการณ์:** โรงเรียนจัดเกมเจรจาแบบง่าย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เสนอข้อตกลงที่ทุกคนเข้าใจ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_diplomat_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **รับบทผู้จดข้อเสนอ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_diplomat_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เปิดให้คนเงียบได้พูด** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_diplomat_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_diplomat_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_diplomat_03` — พิธีต้อนรับต่างถิ่น (วัย 35–80 ปี)
**สถานการณ์:** ผู้แทนต่างเมืองมีธรรมเนียมไม่เหมือนกัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ถามความหมายของพิธี** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_diplomat_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จัดล่ามช่วยทุกฝ่าย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_diplomat_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลื่อนงานเพื่อหลีกเลี่ยงเข้าใจผิด** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_diplomat_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_diplomat_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_diplomat_04` — ข้อเสนอที่ไม่เท่าเทียม (วัย 80–150 ปี)
**สถานการณ์:** นครใหญ่จะแลกทรัพยากรกับหมู่บ้านเล็ก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เสนอเงื่อนไขเป็นธรรม** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_diplomat_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **นำเข้าที่ประชุมสาธารณะ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_diplomat_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอเวลาเก็บข้อมูลเพิ่ม** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_diplomat_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_diplomat_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_diplomat_05` — สนธิสัญญาหลังราชวงศ์ (วัย 150–600 ปี)
**สถานการณ์:** เมืองสองแห่งต้องทบทวนคำสัญญาเดิม; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เจรจาให้ยืดหยุ่นตามยุค** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_diplomat_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จัดผู้สังเกตการณ์อิสระ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_diplomat_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ชวนชุมชนร่วมแก้ไข** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_diplomat_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_diplomat_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_diplomat_06` — โต๊ะว่างเหนือเมฆ (วัย 600–1250 ปี)
**สถานการณ์:** ผู้ประสานต้องตัดสินใจคุณค่าการอยู่ร่วมกัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างสนธิสัญญาใหม่** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_diplomat_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เปิดพื้นที่ให้คนรุ่นหลัง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_diplomat_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หยุดรับตำแหน่งแล้วเผยแพร่บทเรียน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_diplomat_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_diplomat_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `farmer`
#### `arc_farmer_01` — เมล็ดพันธุ์ของผู้ใหญ่ (วัย 12–19 ปี)
**สถานการณ์:** เด็กเห็นผู้ดูแลสวนคัดเมล็ด; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ช่วยแยกตามสีอย่างง่าย** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_farmer_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ถามว่าเมล็ดโตอย่างไร** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_farmer_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **นั่งดูการรดน้ำกับผู้ใหญ่** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_farmer_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_farmer_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_farmer_02` — ฝนที่มาช้า (วัย 19–35 ปี)
**สถานการณ์:** ชาวบ้านกังวลเรื่องน้ำในสวน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ช่วยทำตารางใช้น้ำ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_farmer_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ร่วมขุดร่องเล็กกับผู้ใหญ่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_farmer_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เสนอปลูกพืชที่เหมาะฤดู** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_farmer_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_farmer_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_farmer_03` — ที่ดินแปลงเล็ก (วัย 35–80 ปี)
**สถานการณ์:** ครอบครัวมีที่ดินที่ต้องเลือกระหว่างขายกับดูแล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เริ่มแปลงเรียนรู้** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_farmer_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เช่าที่ให้เพื่อนบ้านทำกิน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_farmer_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หารือชุมชนเรื่องพื้นที่ส่วนกลาง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_farmer_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_farmer_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_farmer_04` — ป่าที่คืนความเขียว (วัย 80–150 ปี)
**สถานการณ์:** พื้นที่เก่ากลายเป็นทุ่งแห้ง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เริ่มเพาะต้นไม้ท้องถิ่น** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_farmer_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ศึกษาระบบน้ำอย่างยั่งยืน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_farmer_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เชิญชุมชนวางเป้าหมายร่วม** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_farmer_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_farmer_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_farmer_05` — เมล็ดที่รอดผ่านยุค (วัย 150–600 ปี)
**สถานการณ์:** พืชท้องถิ่นกำลังถูกลืม; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างธนาคารเมล็ดพันธุ์** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_farmer_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สอนวิธีปลูกแก่เด็ก** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_farmer_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ค้นต้นพันธุ์ที่เหมาะกับโลกใหม่** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_farmer_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_farmer_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_farmer_06` — สวนแห่งกฎชีวิต (วัย 600–1250 ปี)
**สถานการณ์:** ผู้ปลูกได้รับบททดสอบความสมดุล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **คืนสิทธิ์ดูแลพื้นที่แก่ชุมชน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_farmer_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ปลูกป่าร่วมหลายทวีป** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_farmer_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับสู่สวนเล็กที่เป็นจุดเริ่ม** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_farmer_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_farmer_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `sailor`
#### `arc_sailor_01` — ธงสีบนเรือจำลอง (วัย 12–19 ปี)
**สถานการณ์:** ครูใช้ธงฝึกสัญญาณเดินเรือ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เรียนอ่านธงกับเพื่อน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sailor_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยตรวจเรือจำลอง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sailor_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ทำบันทึกสภาพอากาศ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sailor_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sailor_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_sailor_02` — คลื่นลูกแรกในอ่าว (วัย 19–35 ปี)
**สถานการณ์:** ลูกเรือใหม่ต้องเลือกรอบเดินเรือ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ฝึกกับกัปตันในอ่าวปลอดภัย** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sailor_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เรียนการอ่านลมก่อนออก** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sailor_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **อยู่ช่วยงานท่าเรือ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sailor_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sailor_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_sailor_03` — เรือที่กลับมาช้า (วัย 35–80 ปี)
**สถานการณ์:** เรือส่งข่าวล่าช้าจนคนเป็นห่วง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ประสานจุดติดต่อบนฝั่ง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sailor_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ตรวจแผนทะเลกับช่างแผนที่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sailor_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอให้เรืออื่นรอข่าวก่อนเสี่ยง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sailor_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sailor_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_sailor_04` — การค้าผ่านหมอกหนา (วัย 80–150 ปี)
**สถานการณ์:** เรือสินค้าต้องเลือกระหว่างรอพายุกับเส้นทางไกล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **หยุดรอฤดูปลอดภัย** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sailor_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เดินเส้นทางยาวที่มีผู้ชำนาญ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sailor_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เจรจาค่าความเสียหายกับผู้จ้าง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sailor_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sailor_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_sailor_05` — ดวงดาวเปลี่ยนทิศ (วัย 150–600 ปี)
**สถานการณ์:** ตำรานำทางเก่าใช้ไม่ได้กับบางทะเล; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างแผนที่ใหม่** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sailor_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ฝึกกัปตันรุ่นใหม่** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sailor_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ร่วมกับนักดูดาวเก็บข้อมูล** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sailor_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_sailor_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_sailor_06` — ทะเลที่ไม่มีขอบ (วัย 600–1250 ปี)
**สถานการณ์:** ก่อนข้ามมิติ ผู้เดินเรือต้องเลือกอนาคตการเดินทาง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เปิดทางให้คนอื่นสำรวจ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_sailor_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ปกป้องเส้นทางชายฝั่ง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_sailor_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับไปดูแลผู้คนในท่าแรก** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_sailor_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_sailor_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `inventor`
#### `arc_inventor_01` — กล่องไม้กลไกง่าย (วัย 12–19 ปี)
**สถานการณ์:** ครูแสดงของเล่นกลไกที่ปลอดภัย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ถามว่าเฟืองทำงานอย่างไร** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_inventor_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ช่วยแยกชิ้นจำลองภายใต้ครู** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_inventor_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **วาดแบบลงสมุด** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_inventor_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_inventor_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_inventor_02` — ซ่อมไฟในตลาด (วัย 19–35 ปี)
**สถานการณ์:** ไฟสาธารณะของตลาดทำงานไม่สม่ำเสมอ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ร่วมช่างซ่อมอย่างถูกขั้นตอน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_inventor_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ออกแบบตารางตรวจคุณภาพ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_inventor_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ทำแบบจำลองหาสาเหตุ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_inventor_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_inventor_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_inventor_03` — สิ่งประดิษฐ์ที่คนไม่ใช้ (วัย 35–80 ปี)
**สถานการณ์:** เครื่องมือใหม่ยุ่งยากเกินชาวบ้าน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ขอความคิดเห็นผู้ใช้จริง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_inventor_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ลดขั้นตอนการใช้งาน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_inventor_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **พัฒนาเครื่องมือคู่มือภาพ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_inventor_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_inventor_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_inventor_04` — งบประมาณของห้องทดลอง (วัย 80–150 ปี)
**สถานการณ์:** ผู้สนับสนุนอยากเห็นผลเร็ว; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ต่อรองเวลาและการทดสอบ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_inventor_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **หาพันธมิตรมหาวิทยาลัย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_inventor_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หยุดโครงการเมื่อเสี่ยงเกิน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_inventor_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_inventor_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_inventor_05` — เมืองที่ใช้เครื่องมือเก่า (วัย 150–600 ปี)
**สถานการณ์:** ระบบเครื่องกลเดิมทำให้คนเสียเวลา; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **พัฒนาวิธีซ่อมให้ทุกคน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_inventor_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สร้างมาตรฐานเปิด** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_inventor_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ฝึกช่างประจำชุมชน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_inventor_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_inventor_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_inventor_06` — เครื่องจักรเพื่อใคร (วัย 600–1250 ปี)
**สถานการณ์:** ข้อสอบสุดท้ายให้เลือกประโยชน์ของการประดิษฐ์; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สร้างระบบเข้าถึงได้ทุกคน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_inventor_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **แบ่งความรู้เพื่อให้ต่อยอด** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_inventor_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ส่งมอบสิทธิ์แก่ชุมชน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_inventor_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_inventor_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `musician`
#### `arc_musician_01` — เพลงที่บ้านร้อง (วัย 12–19 ปี)
**สถานการณ์:** ผู้ดูแลร้องทำนองท้องถิ่นให้เด็กฟัง; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ร้องตอบด้วยเสียงง่าย ๆ ตามวัย** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_musician_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จำจังหวะจากการตบมือ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_musician_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ขอให้ผู้ใหญ่เล่าเรื่องเพลง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_musician_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_musician_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_musician_02` — เสียงในเทศกาลฤดูฝน (วัย 19–35 ปี)
**สถานการณ์:** นักดนตรีชุมชนชวนเข้าวงเล็ก; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ร่วมเล่นตามทักษะ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_musician_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จัดพื้นที่ให้คนฟัง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_musician_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ถามที่มาของทำนองเก่า** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_musician_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_musician_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_musician_03` — บทเพลงที่เกิดจากการเดินทาง (วัย 35–80 ปี)
**สถานการณ์:** ชาวเมืองต่างทวีปร้องเพลงไม่เหมือนกัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **แลกเปลี่ยนเพลงอย่างให้เครดิต** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_musician_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **แต่งเพลงใหม่จากประสบการณ์ตน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_musician_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เก็บเรื่องเล่าของผู้ร้อง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_musician_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_musician_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_musician_04` — งานแสดงเพื่อชื่อเสียง (วัย 80–150 ปี)
**สถานการณ์:** นายทุนเสนองานใหญ่แต่ห้ามพูดถึงผู้แต่งเดิม; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ขอแก้เครดิตให้ถูกต้อง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_musician_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ปฏิเสธงานอย่างสุภาพ** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_musician_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ตั้งการแสดงชุมชนเอง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_musician_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_musician_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_musician_05` — บทเพลงของเมืองที่เปลี่ยน (วัย 150–600 ปี)
**สถานการณ์:** เพลงเก่ากลายเป็นความทรงจำของคนรุ่นก่อน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เปิดหอเสียงและเรื่องเล่า** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_musician_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สอนเด็กจากหลายเมือง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_musician_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เดินทางหาเสียงใหม่อย่างต่อเนื่อง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_musician_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_musician_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_musician_06` — ทำนองเหนือกาล (วัย 600–1250 ปี)
**สถานการณ์:** เมื่อเสียงสะท้อนโลกเปิดออกต้องเลือกว่าจะร้องเพื่อใคร; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ร้องเพื่อความทรงจำทุกชีวิต** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_musician_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ร้องให้เมืองที่ถูกลืม** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_musician_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **กลับไปขับเพลงในบ้านเกิด** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_musician_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_musician_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `beastkeeper`
#### `arc_beastkeeper_01` — อาหารในรังที่ล้ม (วัย 12–19 ปี)
**สถานการณ์:** พบสัตว์เล็กต้องการดูแลจากผู้เชี่ยวชาญ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **แจ้งผู้ดูแลสัตว์ทันที** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_beastkeeper_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เฝ้าดูจากระยะปลอดภัย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_beastkeeper_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ช่วยเตรียมน้ำตามคำแนะนำ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_beastkeeper_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_beastkeeper_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_beastkeeper_02` — คู่หูที่ไม่เหมือนใคร (วัย 19–35 ปี)
**สถานการณ์:** สัตว์เวทใหม่ไม่ชอบวิธีฝึกทั่วไป; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สังเกตนิสัยเฉพาะ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_beastkeeper_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ปรึกษาผู้ฝึกที่เคยดูแล** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_beastkeeper_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ปรับเวลาฝึกให้ไม่กดดัน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_beastkeeper_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_beastkeeper_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_beastkeeper_03` — ตลาดสัตว์เวท (วัย 35–80 ปี)
**สถานการณ์:** พ่อค้าเสนอสัตว์ที่ไม่รู้แหล่งที่มา; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ตรวจหลักฐานการดูแล** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_beastkeeper_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ปฏิเสธการค้าไม่โปร่งใส** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_beastkeeper_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **หาข้อมูลเรื่องถิ่นอาศัยก่อน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_beastkeeper_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_beastkeeper_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_beastkeeper_04` — ถิ่นที่ถูกถางทาง (วัย 80–150 ปี)
**สถานการณ์:** พื้นที่สัตว์เวทลดลงเพราะการค้าขยาย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เจรจาทางผ่านที่ไม่รบกวน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_beastkeeper_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ร่วมวางแผนอนุรักษ์** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_beastkeeper_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ย้ายพื้นที่ฝึกของสำนัก** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_beastkeeper_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_beastkeeper_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_beastkeeper_05` — ศิษย์ผู้ฟังเสียงสัตว์ (วัย 150–600 ปี)
**สถานการณ์:** รุ่นใหม่ฝึกโดยไม่สังเกตความพร้อมของคู่หู; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **สอนเรื่องการยินยอมและหยุดพัก** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_beastkeeper_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **จัดกิจกรรมเรียนรู้ร่วมกัน** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_beastkeeper_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ให้สัตว์เลือกการฝึกที่เหมาะ** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_beastkeeper_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_beastkeeper_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_beastkeeper_06` — คำสัญญาหลายเผ่าพันธุ์ (วัย 600–1250 ปี)
**สถานการณ์:** ผู้ฝึกต้องเลือกว่าจะเข้าใจคำว่าคู่หูอย่างไร; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **มอบอิสระให้สัตว์เวท** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_beastkeeper_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สร้างศูนย์เรียนรู้ร่วมคนกับสัตว์** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_beastkeeper_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ออกสำรวจความสัมพันธ์โลกต่อไป** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_beastkeeper_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_beastkeeper_discovery` (เมื่อเงื่อนไขพร้อม).

### สาย `spirit`
#### `arc_spirit_01` — ความเงียบในสวนเช้า (วัย 12–19 ปี)
**สถานการณ์:** เด็กพบว่าบางครั้งการฟังเสียงลมช่วยให้สงบ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **นั่งพักกับผู้ดูแล** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_spirit_01.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **เล่าให้ครูฟังว่ารู้สึกอย่างไร** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_spirit_01.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ฟังเสียงใบไม้โดยไม่ฝืนตัวเอง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_spirit_01.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_spirit_02` (เมื่อเงื่อนไขพร้อม).

#### `arc_spirit_02` — การฝึกที่เร่งเกินไป (วัย 19–35 ปี)
**สถานการณ์:** ผู้เรียนพลังวิญญาณพยายามฝึกจนเหนื่อย; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **หยุดพักแล้วทบทวน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_spirit_02.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ขอครูช่วยปรับเป้าหมาย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_spirit_02.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ฝึกเบา ๆ ร่วมเพื่อน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_spirit_02.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_spirit_03` (เมื่อเงื่อนไขพร้อม).

#### `arc_spirit_03` — เสียงกระซิบจากหอจารึก (วัย 35–80 ปี)
**สถานการณ์:** สัญลักษณ์ตอบสนองการทำสมาธิ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **จดบันทึกอย่างระมัดระวัง** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_spirit_03.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ถามผู้รู้เรื่องความหมาย** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_spirit_03.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **พักเมื่อมีอาการไม่สบาย** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_spirit_03.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_spirit_04` (เมื่อเงื่อนไขพร้อม).

#### `arc_spirit_04` — ผู้คนต่างความเชื่อ (วัย 80–150 ปี)
**สถานการณ์:** สำนักสองแห่งตีความจิตวิญญาณต่างกัน; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **เปิดวงสนทนา** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_spirit_04.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **ศึกษาแนวคิดทั้งสอง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_spirit_04.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **เลือกทำงานช่วยชุมชนระหว่างข้อถกเถียง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_spirit_04.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_spirit_05` (เมื่อเงื่อนไขพร้อม).

#### `arc_spirit_05` — กระจกที่สะท้อนอดีต (วัย 150–600 ปี)
**สถานการณ์:** ผู้ฝึกพบภาพจำเก่าที่ควรทำความเข้าใจ; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ขอคำปรึกษาคนที่เชื่อถือ** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_spirit_05.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **บันทึกบทเรียนโดยไม่ตัดสินตัวเอง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_spirit_05.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **ทำงานช่วยผู้มีประสบการณ์คล้ายกัน** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_spirit_05.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `arc_spirit_06` (เมื่อเงื่อนไขพร้อม).

#### `arc_spirit_06` — ประตูความสงบ (วัย 600–1250 ปี)
**สถานการณ์:** ข้อสอบสุดท้ายถามว่าอำนาจทางจิตควรอยู่กับใคร; ต้องผูกกับตำแหน่งที่อยู่ในเมือง/สำนัก/ร้าน/เส้นทางที่ประกอบอาชีพนี้จริง
**เงื่อนไข:** มีอาชีพหรือความชำนาญสายนี้, ผ่าน milestone ก่อนเมื่อเป็นขั้น 2+, ไม่ตาย, อายุในช่วงที่กำหนด; หากเข้ามาสายนี้ช้าให้ปรับ min age โดยรักษา sequence
**สามช้อยส์ที่ต้องทำเป็น gameplay จริง:**
- `explore` **ใช้เพื่อความสงบของผู้คน** → ได้รับความชำนาญเฉพาะสายและบันทึกผลการเลือก; ให้สร้าง distinct story flag `arc_spirit_06.explore` และสะท้อนในเหตุการณ์ถัดไป
- `cooperate` **สอนการเข้าใจตนแก่คนรุ่นหลัง** → เพิ่มความไว้วางใจ/ความสัมพันธ์หรือเปลี่ยนเงื่อนไขผู้ร่วมทาง; ให้สร้าง distinct story flag `arc_spirit_06.cooperate` และสะท้อนในเหตุการณ์ถัดไป
- `reassess` **อยู่ในโลกต่อเพื่อเรียนรู้อีกครั้ง** → เปลี่ยน flag/เวลา/โอกาสพบเหตุการณ์หลังจากนี้; ให้สร้าง distinct story flag `arc_spirit_06.reassess` และสะท้อนในเหตุการณ์ถัดไป
**ผลระยะยาว:** ปรับคะแนนความเชี่ยวชาญ/ความสัมพันธ์/ต้นทุนต่อเนื่อง; เลือกความร่วมมือจะพา NPC หรือ mentor กลับมา, เลือกศึกษาเองจะให้ insight ที่ต่างกัน. **Follow-up:** `god_spirit_discovery` (เมื่อเงื่อนไขพร้อม).

## Life Event Bank — original age-appropriate optional encounters
เหตุการณ์เหล่านี้อาจสุ่มระหว่าง focus/time lapse ตาม pool ที่พร้อมและมี cooldown; ไม่บังคับว่าต้องเกิดทั้งหมดใน run เดียว; infant options เป็นพฤติกรรม/การตอบสนอง ไม่ใช่กลยุทธ์ผู้ใหญ่
### `life_evt_001` — เสียงหัวใจในห้องอุ่น (อายุ 0–2 เดือน)
**เกิดเมื่อ:** ผู้ดูแลอุ้มเด็กแรกเกิดให้คุ้นเสียง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ผ่อนคลายเมื่อได้ยินเสียงคุ้น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_001.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` มองหน้าผู้ดูแลอย่างสงบ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_001.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งเสียงเล็ก ๆ เพื่อเรียกความสนใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_001.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_002` — แสงแรกผ่านม่าน (อายุ 0–2 เดือน)
**เกิดเมื่อ:** แสงเช้าผ่านหน้าต่างห้องนอน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` มองตามแสงที่ไม่จ้า → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_002.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หันมาทางเสียงผู้ดูแล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_002.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` พักสายตาแล้วหลับ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_002.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_003` — มืออุ่นของครอบครัว (อายุ 0–3 เดือน)
**เกิดเมื่อ:** คนในบ้านยื่นนิ้วให้เด็กจับ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` จับนิ้วอย่างแผ่วเบา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_003.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขยับแขนตามสัมผัส → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_003.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งเสียงตอบเมื่อถูกทัก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_003.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_004` — เสียงระฆังไกล (อายุ 0–4 เดือน)
**เกิดเมื่อ:** ระฆังหมู่บ้านดังเข้ามาในบ้าน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` หันตาตามทิศเสียง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_004.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` อยู่กับเสียงปลอบของผู้ดูแล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_004.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` พักในอ้อมดูแล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_004.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_005` — ลมหายใจตามฤดู (อายุ 0–5 เดือน)
**เกิดเมื่อ:** อากาศภายนอกเปลี่ยนจนครอบครัวจัดห้องใหม่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` พักในผ้าที่เหมาะอุณหภูมิ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_005.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ตอบสนองต่อเสียงคุ้น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_005.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` มองลายผ้าห่มใหม่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_005.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_006` — ใบหน้าคนแปลกหน้า (อายุ 2–6 เดือน)
**เกิดเมื่อ:** ญาติมาเยี่ยมและพูดด้วยน้ำเสียงเบา. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` มองสลับผู้ดูแลกับญาติ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_006.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ส่งเสียงอ้อแอ้ตอบ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_006.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` หันกลับไปหาคนคุ้นเคย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_006.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_007` — เสียงหัวเราะหน้าต่าง (อายุ 3–8 เดือน)
**เกิดเมื่อ:** พี่หรือเพื่อนบ้านเล่นอยู่ไกลออกไป. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ฟังเสียงอย่างสนใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_007.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` มองของเล่นที่ผู้ดูแลถือ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_007.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ร้องเรียกคนคุ้นเคย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_007.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_008` — โมบายไม้ประดับ (อายุ 3–9 เดือน)
**เกิดเมื่อ:** ของเล่นไม้แขวนอยู่ในระยะปลอดภัย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ยกมือเอื้อมมอง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_008.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` สังเกตสีลวดลาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_008.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งเสียงเมื่อของเล่นขยับ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_008.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_009` — ผ้าสีสดในฤดูฝน (อายุ 4–9 เดือน)
**เกิดเมื่อ:** ผู้ดูแลพับผ้าสีสดให้ดู. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` แตะผ้าอย่างนุ่มนวล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_009.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` มองสีที่ต่างกัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_009.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ยิ้มตอบเสียงเรียก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_009.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_010` — ของเล่นกลิ้งบนเสื่อ (อายุ 5–12 เดือน)
**เกิดเมื่อ:** ลูกบอลผ้านุ่มกลิ้งไปบนเสื่อ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เอื้อมมือเมื่อพร้อม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_010.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ส่งเสียงเรียกผู้ใหญ่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_010.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ดูการเคลื่อนที่อย่างสนใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_010.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_011` — รอยเท้าข้างเตียง (อายุ 6–12 เดือน)
**เกิดเมื่อ:** ผู้ดูแลช่วยให้เด็กสำรวจพื้นที่ปลอดภัย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` มองทางที่ว่าง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_011.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เกาะตัวผู้ดูแลตามพัฒนาการ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_011.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เล่นกับพื้นผิวเสื่อ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_011.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_012` — น้ำฝนบนชายคา (อายุ 6–12 เดือน)
**เกิดเมื่อ:** หยดฝนกระทบหลังคาบ้าน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ฟังจังหวะฝน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_012.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หันมองหน้าต่าง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_012.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งเสียงตามเสียงฝน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_012.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_013` — คำเรียกแรกของบ้าน (อายุ 8–15 เดือน)
**เกิดเมื่อ:** คนในครอบครัวเรียกชื่อตัวละคร. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ตอบด้วยเสียงตามวัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_013.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` มองคนเรียก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_013.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ทำท่าทางคุ้นเคย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_013.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_014` — กล่องผ้าของผู้ดูแล (อายุ 9–18 เดือน)
**เกิดเมื่อ:** ผู้ดูแลยื่นกล่องผ้าที่ปลอดภัยให้เล่น. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` หยิบผ้าชิ้นเล็กดู → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_014.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ยื่นคืนด้วยความสนใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_014.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เลือกผ้าที่ชอบจับ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_014.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_015` — ไม้กลองของเล่น (อายุ 10–20 เดือน)
**เกิดเมื่อ:** เด็กได้ของเล่นที่เคาะแล้วมีเสียง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ลองเคาะเบา ๆ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_015.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ฟังคนอื่นทำให้ดู → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_015.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เก็บของเล่นใกล้ตัว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_015.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_016` — ก้าวแรกข้างคนคุ้น (อายุ 10–24 เดือน)
**เกิดเมื่อ:** ผู้ดูแลชวนเดินตามความพร้อมที่ต่างกันของแต่ละเด็ก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` จับมือเดินเมื่อพร้อม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_016.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` นั่งพักและดูรอบบ้าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_016.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เล่นของใกล้ตัวต่อ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_016.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_017` — คำศัพท์ของดอกไม้ (อายุ 12–30 เดือน)
**เกิดเมื่อ:** คนในบ้านชี้ดอกไม้หน้าบ้านและเรียกชื่อ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` พูดตามคำง่าย ๆ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_017.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ชี้ดอกไม้เพื่อให้เล่าอีก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_017.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ฟังแล้วจดจำเสียง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_017.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_018` — เงาใต้โต๊ะ (อายุ 12–32 เดือน)
**เกิดเมื่อ:** เด็กสนใจเงาโต๊ะบนพื้น. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ยื่นมือแตะเงา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_018.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามผู้ใหญ่ด้วยคำง่าย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_018.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` มองการเปลี่ยนรูปเมื่อแสงย้าย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_018.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_019` — ของเล่นกับเพื่อนบ้าน (อายุ 15–36 เดือน)
**เกิดเมื่อ:** เด็กเล็กพบเพื่อนที่มีของเล่นหนึ่งชิ้น. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ผลัดกันเล่นเมื่อได้รับช่วย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_019.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ดูเพื่อนเล่นแล้วเลียนแบบ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_019.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนผู้ใหญ่ช่วยจัดเกม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_019.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_020` — นิทานก่อนนอน (อายุ 18–42 เดือน)
**เกิดเมื่อ:** ผู้ดูแลเล่านิทานเรื่องสวนแสงในเมือง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ขอฟังเรื่องสัตว์ในสวน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_020.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอฟังเรื่องผู้เดินทาง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_020.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` หลับขณะฟังตอนท้าย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_020.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_021` — ถ้วยน้ำของเด็ก (อายุ 18–42 เดือน)
**เกิดเมื่อ:** เด็กได้ฝึกช่วยเก็บถ้วยของตัวเอง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ยกถ้วยไปที่วางภายใต้ดูแล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_021.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอผู้ใหญ่ช่วย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_021.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ดูวิธีเก็บให้ถูกที่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_021.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_022` — วันที่ตลาดคึกคัก (อายุ 24–48 เดือน)
**เกิดเมื่อ:** ผู้ดูแลพาไปดูตลาดอย่างปลอดภัย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` มองสีผ้าตามร้าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_022.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ฟังเสียงคนขาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_022.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ถามเรื่องผลไม้ในตะกร้า → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_022.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_023` — ต้นอ่อนริมรั้ว (อายุ 24–48 เดือน)
**เกิดเมื่อ:** เด็กพบต้นอ่อนขึ้นหลังบ้าน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ขอช่วยรดน้ำเบา ๆ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_023.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามว่ามันเป็นต้นอะไร → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_023.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ดูการเปลี่ยนแปลงสัปดาห์ถัดไป → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_023.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_024` — การแบ่งขนม (อายุ 24–60 เดือน)
**เกิดเมื่อ:** เด็กได้รับขนมสองชิ้นและมีเพื่อนอยู่ใกล้. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` แบ่งให้เพื่อนหนึ่งชิ้น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_024.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ชวนแบ่งกันที่โต๊ะ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_024.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เก็บไว้ถามผู้ดูแลก่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_024.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_025` — กล่องสีของโรงเรียน (อายุ 30–60 เดือน)
**เกิดเมื่อ:** ครูให้เด็กวาดสถานที่ในจินตนาการ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` วาดบ้านของตัวเอง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_025.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` วาดต้นไม้ที่อยากไปเห็น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_025.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` วาดคนที่คอยช่วยเหลือ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_025.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_026` — เพลงประจำหมู่บ้าน (อายุ 30–66 เดือน)
**เกิดเมื่อ:** ชุมชนซ้อมร้องเพลงสำหรับงานเล็ก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ร้องตามบทสั้น ๆ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_026.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ฟังจังหวะกลอง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_026.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ช่วยถือป้ายภาพเพลง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_026.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_027` — คำถามเรื่องแม่น้ำ (อายุ 36–72 เดือน)
**เกิดเมื่อ:** เด็กสงสัยว่าน้ำจากหมู่บ้านไหลไปไหน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามครูเรื่องทิศทาง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_027.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ดูแผนที่รูปภาพ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_027.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เดินดูริมฝั่งกับผู้ใหญ่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_027.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_028` — รองเท้าคู่ใหม่ (อายุ 36–72 เดือน)
**เกิดเมื่อ:** เด็กได้รองเท้าที่ต้องลองเดินให้พอดี. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ลองเดินในลานบ้าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_028.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามผู้ใหญ่เรื่องขนาด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_028.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ดูแลรองเท้าคู่เก่า → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_028.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_029` — เมล็ดพันธุ์สองสี (อายุ 36–72 เดือน)
**เกิดเมื่อ:** ผู้ปลูกให้เลือกเมล็ดสำหรับแปลงเรียนรู้. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เลือกเมล็ดที่โตเร็ว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_029.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เลือกเมล็ดที่ต้องดูแลนาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_029.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ถามวิธีดูแลก่อนเลือก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_029.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_030` — นิทานบ้านหลายหลัง (อายุ 42–72 เดือน)
**เกิดเมื่อ:** ครูเล่าประเพณีของเพื่อนจากต่างเผ่า. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามเรื่องอาหารของเพื่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_030.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เล่าเรื่องบ้านตนอย่างสุภาพ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_030.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนกันวาดรูปหมู่บ้าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_030.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_031` — เสียงลมในงานวัด (อายุ 48–84 เดือน)
**เกิดเมื่อ:** งานเทศกาลมีดนตรีและเครื่องเล่นปลอดภัย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ดูการแสดงเพลง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_031.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยจัดของงานกับผู้ใหญ่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_031.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนเพื่อนไปชมต้นไม้ประดับ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_031.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_032` — สะพานไม้ชำรุด (อายุ 48–96 เดือน)
**เกิดเมื่อ:** ชุมชนติดป้ายเตือนสะพานที่ยังซ่อมไม่เสร็จ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เดินทางอ้อมปลอดภัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_032.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` แจ้งผู้ใหญ่ที่กำลังมา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_032.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ช่วยทำป้ายให้มองเห็นชัด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_032.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_033` — นกตกจากกิ่งเตี้ย (อายุ 48–96 เดือน)
**เกิดเมื่อ:** เด็กพบลูกนกดูเหมือนต้องการคนดูแล. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` บอกผู้ดูแลสัตว์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_033.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เฝ้าดูจากระยะไม่รบกวน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_033.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` หาข้อมูลจากครูเรื่องสัตว์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_033.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_034` — ตลาดเครื่องมือเล็ก (อายุ 60–108 เดือน)
**เกิดเมื่อ:** ช่างสาธิตของเล่นกลไกในตลาด. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามหลักการทำงาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_034.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอลองของเล่นที่ปลอดภัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_034.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนเพื่อนวาดแบบ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_034.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_035` — สมุดบันทึกหน้าแรก (อายุ 60–108 เดือน)
**เกิดเมื่อ:** ครูแจกสมุดให้นักเรียนบันทึกความชอบ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เขียนชื่อสถานที่ที่อยากไป → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_035.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เขียนงานที่อยากลอง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_035.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เขียนชื่อคนที่อยากขอบคุณ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_035.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_036` — เพื่อนย้ายหมู่บ้าน (อายุ 60–120 เดือน)
**เกิดเมื่อ:** เพื่อนวัยเด็กแจ้งว่าจะย้ายบ้าน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` มอบภาพวาดเป็นที่ระลึก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_036.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอที่อยู่สำหรับจดหมาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_036.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ร่วมจัดงานเล็กเพื่อส่งเพื่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_036.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_037` — ข้อถกเถียงหน้าห้อง (อายุ 72–132 เดือน)
**เกิดเมื่อ:** เด็กสองกลุ่มไม่เห็นด้วยเรื่องกติกาเกม. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เสนอผลัดกันเลือกกติกา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_037.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ฟังเหตุผลทั้งสองฝั่ง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_037.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอครูช่วยไกล่เกลี่ย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_037.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_038` — เสียงเรียกจากโรงตี (อายุ 72–132 เดือน)
**เกิดเมื่อ:** ช่างประจำหมู่บ้านเชิญเด็กสังเกตงานอย่างปลอดภัย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามวิธีอ่านเนื้อโลหะ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_038.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยจัดอุปกรณ์ที่เย็นแล้ว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_038.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` จดภาพเครื่องมือที่เห็น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_038.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_039` — หนังสือหายไปหนึ่งเล่ม (อายุ 72–132 เดือน)
**เกิดเมื่อ:** ห้องเรียนขาดหนังสือที่มีคนยืม. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามระบบการยืม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_039.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยค้นจากชั้นที่อนุญาต → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_039.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เสนอทำบัญชีหนังสือใหม่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_039.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_040` — ข่าวจากคาราวาน (อายุ 72–132 เดือน)
**เกิดเมื่อ:** ขบวนเดินทางนำข่าวเมืองใหม่มาถึง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามเรื่องวิถีชีวิตต่างถิ่น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_040.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ดูแผนที่ร่วมผู้ใหญ่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_040.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เรียนรู้คำทักทายต่างภาษา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_040.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_041` — การแข่งขันในลานเล็ก (อายุ 78–144 เดือน)
**เกิดเมื่อ:** โรงเรียนจัดงานแสดงทักษะ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ลงแข่งทักษะที่ฝึกจริง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_041.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยเพื่อนเตรียมงาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_041.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เป็นผู้จดคะแนนอย่างเป็นธรรม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_041.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_042` — นักเล่านิทานเดินทาง (อายุ 84–144 เดือน)
**เกิดเมื่อ:** ผู้เดินทางพักที่โรงเตี๊ยมและเล่าตำนานเขตแดน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ขอฟังเรื่องทะเล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_042.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอฟังเรื่องหอสมุด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_042.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอฟังเรื่องต้นไม้โบราณ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_042.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_043` — งานอาสาสะพานชุมชน (อายุ 84–144 เดือน)
**เกิดเมื่อ:** ผู้ใหญ่จัดงานชุมชนซ่อมทางเท้า. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ช่วยนับจำนวนแผ่นไม้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_043.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ทำป้ายขอบคุณคนทำงาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_043.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` นำอาหารว่างไปให้ผู้ดูแล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_043.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_044` — เข็มทิศที่ฝังดิน (อายุ 90–144 เดือน)
**เกิดเมื่อ:** เด็กเจอชิ้นไม้รูปเข็มทิศเก่าที่รากไม้. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ส่งให้คนดูแลเก็บ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_044.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` วาดรูปไว้ถามครู → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_044.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ถามนักเดินทางเรื่องสัญลักษณ์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_044.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_045` — ถุงเงินที่เจ้าของตามหา (อายุ 96–144 เดือน)
**เกิดเมื่อ:** พบเหรียญที่มีตราร้านค้าตกอยู่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` คืนเจ้าของที่ตรวจสอบได้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_045.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` แจ้งหัวหน้าตลาด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_045.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ไม่แตะแล้วเดินไปบอกผู้ใหญ่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_045.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_046` — กุญแจเรือนเก่า (อายุ 96–144 เดือน)
**เกิดเมื่อ:** คนรู้จักถามว่าจะช่วยหาเจ้าของกุญแจได้ไหม. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามเพื่อนบ้านอย่างสุภาพ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_046.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ฝากไว้กับผู้ดูแลชุมชน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_046.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` จดรูปร่างกุญแจก่อนส่งคืน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_046.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_047` — ครูฝึกเงียบขรึม (อายุ 96–144 เดือน)
**เกิดเมื่อ:** ครูฝึกมาเยี่ยมโรงเรียนเป็นครั้งแรก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามเรื่องวินัยการฝึก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_047.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เลือกชมการสาธิตที่ปลอดภัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_047.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอคำแนะนำจากครูประจำชั้น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_047.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_048` — บัตรเชิญวันทดสอบ (อายุ 108–144 เดือน)
**เกิดเมื่อ:** เด็กได้รับข่าวพิธีปลุกพลังเมื่ออายุครบ 12. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามขั้นตอนพิธี → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_048.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ทบทวนสิ่งที่ชอบทำ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_048.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` คุยกับครอบครัวเรื่องค่าเดินทาง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_048.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_049` — คืนก่อนพิธีเส้นชีพจร (อายุ 132–144 เดือน)
**เกิดเมื่อ:** ความตื่นเต้นก่อนพิธีทำให้เด็กคิดถึงอดีต. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เขียนบันทึกสิ่งที่ภูมิใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_049.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามผู้ดูแลเรื่องความกังวล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_049.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` พักผ่อนให้เพียงพอ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_049.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_050` — ใบสมัครสำนักแรก (อายุ 144–180 เดือน)
**เกิดเมื่อ:** หลังพิธีเปิดรับผู้เรียนหลายทาง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` สมัครทุนในสาขาเหมาะสม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_050.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอทดลองเรียนหนึ่งภาค → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_050.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ฝึกกับอาจารย์ชุมชน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_050.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_051` — ค่าเล่าเรียนที่ยังไม่ครบ (อายุ 144–204 เดือน)
**เกิดเมื่อ:** ผู้เล่นต้องคำนวณเงินก่อนเข้าโรงเรียน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ทำงานพิเศษที่เหมาะวัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_051.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ยื่นขอทุนพร้อมเอกสาร → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_051.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เลือกเรียนฟรีกับชุมชน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_051.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_052` — ข้อเสนอจากกิลด์ (อายุ 144–216 เดือน)
**เกิดเมื่อ:** กิลด์ออกใบแนะนำงานเริ่มต้น. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` รับภารกิจปลอดภัยใกล้บ้าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_052.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เลือกฝึกวิชาก่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_052.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอเจ้าหน้าที่อธิบายสัญญา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_052.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_053` — หอพักเสียงดัง (อายุ 156–216 เดือน)
**เกิดเมื่อ:** เพื่อนในหอพักต่างเวลานอน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เสนอแบ่งเวลาพัก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_053.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ชวนทำตารางใช้พื้นที่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_053.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอผู้ดูแลหอพักช่วยไกล่เกลี่ย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_053.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_054` — สมาคมสอนฟรี (อายุ 156–228 เดือน)
**เกิดเมื่อ:** อาจารย์อิสระเปิดสอนทักษะทุกชนชั้น. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เรียนทักษะพื้นฐาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_054.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยจัดห้องเรียนแลกค่าเรียน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_054.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนคนที่ขาดทุนมาลงทะเบียน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_054.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_055` — คาราวานฝึกงาน (อายุ 168–228 เดือน)
**เกิดเมื่อ:** ขบวนสินค้าเปิดรับผู้ช่วยตามวัยและกฎเมือง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ตรวจความปลอดภัยก่อนสมัคร → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_055.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` รับงานบันทึกเส้นทาง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_055.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เลือกงานจัดสินค้าในเมือง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_055.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_056` — แหวนตราที่เก็บได้ (อายุ 168–228 เดือน)
**เกิดเมื่อ:** พบของตกหล่นมีตราสกุลหนึ่ง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ส่งคืนผ่านเจ้าหน้าที่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_056.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามหาที่มาของตราอย่างสุภาพ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_056.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ฝากไว้ที่สำนักให้ประกาศหา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_056.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_057` — ร้านค้าของญาติ (อายุ 168–240 เดือน)
**เกิดเมื่อ:** ญาติชวนช่วยงานร้านช่วงงานเทศกาล. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ช่วยขายตามราคาที่กำหนด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_057.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยจัดคลังสินค้า → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_057.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอให้สอนทำบัญชี → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_057.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_058` — คำพูดของเพื่อนร่วมชั้น (อายุ 168–240 เดือน)
**เกิดเมื่อ:** เพื่อนเล่าว่าได้รับข้อเสนอจากกลุ่มแปลกหน้า. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ชวนไปปรึกษาอาจารย์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_058.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอตรวจเงื่อนไขงาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_058.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เตือนเพื่อนให้ตัดสินใจเองอย่างรอบคอบ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_058.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_059` — งานประกวดทักษะ (อายุ 180–252 เดือน)
**เกิดเมื่อ:** เมืองจัดงานโชว์ฝีมือหลากหลาย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` นำผลงานที่ฝึกจริงไปแสดง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_059.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ร่วมงานในฐานะผู้ช่วย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_059.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ศึกษาเทคนิคจากผู้ร่วมงาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_059.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_060` — เส้นทางท่องเมือง (อายุ 180–252 เดือน)
**เกิดเมื่อ:** ผู้เล่นมีเวลาว่างหลังภาคเรียน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เดินชมตลาดพร้อมเพื่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_060.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ไปเยี่ยมสถานที่ทางประวัติศาสตร์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_060.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` พักฝึกทักษะเดิมในเมือง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_060.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_061` — สมุดหนี้ของครอบครัว (อายุ 180–300 เดือน)
**เกิดเมื่อ:** ครอบครัวมีค่าใช้จ่ายต้องวางแผน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ช่วยจัดงบประมาณ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_061.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หารายได้จากงานถูกกฎหมาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_061.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปรึกษาผู้ใหญ่ที่เชื่อถือได้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_061.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_062` — ข่าวลือการแข่งขันลับ (อายุ 180–300 เดือน)
**เกิดเมื่อ:** เพื่อนชวนเข้าการแข่งที่ไม่มีผู้จัดชัดเจน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` หาข้อมูลและปฏิเสธหากเสี่ยง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_062.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เลือกการแข่งขันทางการ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_062.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขออาจารย์แนะนำทางพัฒนาฝีมือ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_062.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_063` — คำชวนของนักเดินทาง (อายุ 192–300 เดือน)
**เกิดเมื่อ:** กลุ่มสำรวจเสนอให้ร่วมทางไปเมืองใหม่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ตรวจเส้นทางและโอกาสรอด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_063.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หารือกับผู้คุ้มกัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_063.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` พักฝึกจนพร้อม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_063.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_064` — ทางแยกโรงเรียนกับงาน (อายุ 192–360 เดือน)
**เกิดเมื่อ:** นักเรียนกำลังเลือกเรียนต่อหรือทำงาน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` สมัครเรียนด้วยทุน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_064.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ฝึกงานกับช่าง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_064.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ทำงานเก็บทุนหนึ่งปี → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_064.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_065` — ข้อเสนอทุนจากผู้ไม่คุ้น (อายุ 204–360 เดือน)
**เกิดเมื่อ:** ผู้สนับสนุนเสนอทุนแต่มีสัญญาผูกมัด. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ขอเวลาอ่านเงื่อนไข → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_065.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามฝ่ายแนะแนว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_065.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปฏิเสธข้อเสนอไม่ชัด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_065.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_066` — วันกลับบ้าน (อายุ 216–360 เดือน)
**เกิดเมื่อ:** เวลาผ่านมาหลายปี ผู้เล่นกลับบ้านครั้งแรกหลังฝึก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ช่วยครอบครัวทำงาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_066.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เล่าประสบการณ์ให้คนในบ้าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_066.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ตรวจว่าใครต้องการความช่วยเหลือ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_066.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_067` — คนขายของปลอม (อายุ 216–420 เดือน)
**เกิดเมื่อ:** ร้านหนึ่งเสนออุปกรณ์พิเศษราคาถูกผิดปกติ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ขอดูหลักฐานสินค้า → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_067.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เดินไปซื้อร้านที่เชื่อถือได้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_067.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` แจ้งหน่วยงานดูแลตลาด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_067.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_068` — อุบัติเหตุที่สะพานเชิงเขา (อายุ 216–420 เดือน)
**เกิดเมื่อ:** มีคนบอกว่าทางข้ามใช้ไม่ได้ชั่วคราว. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` รอทีมซ่อมและช่วยจัดป้าย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_068.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เลือกเส้นทางอ้อมที่ตรวจแล้ว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_068.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` กลับจุดพักเพื่อประเมินงาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_068.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_069` — คนส่งข่าวที่ขาดน้ำ (อายุ 216–420 เดือน)
**เกิดเมื่อ:** ผู้ส่งข่าวเหนื่อยจากการเดินทาง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` พาไปจุดพักอย่างปลอดภัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_069.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยติดต่อคนที่รอข่าว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_069.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งต่อเจ้าหน้าที่ประจำด่าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_069.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_070` — สัญญารับงานเกินกำลัง (อายุ 240–480 เดือน)
**เกิดเมื่อ:** ผู้ว่าจ้างเสนอค่าตอบแทนสูงกว่าอัตราปกติ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ขอดูความเสี่ยงและเงื่อนไข → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_070.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หาผู้ร่วมงานที่มีประสบการณ์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_070.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปฏิเสธงานจนกว่าจะพร้อม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_070.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_071` — การพบคู่แข่งเก่า (อายุ 240–540 เดือน)
**เกิดเมื่อ:** คู่แข่งจากสำนักเดิมกลับมาขอคุย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` แลกเปลี่ยนผลงานที่ผ่านมาด้วยดี → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_071.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอโอกาสแข่งขันอย่างเป็นธรรม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_071.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนร่วมงานแทนแข่งขัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_071.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_072` — โรงเตี๊ยมที่ไม่มีห้อง (อายุ 240–540 เดือน)
**เกิดเมื่อ:** เดินทางมาถึงเมืองที่มีงานเทศกาลทำให้ที่พักเต็ม. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` หาที่พักสำรองที่ตรวจได้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_072.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` รอพักที่จุดบริการสาธารณะ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_072.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` สอบถามราคาเมืองข้างเคียง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_072.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_073` — บันทึกสำนักที่เปลี่ยนมือ (อายุ 240–600 เดือน)
**เกิดเมื่อ:** ครูเก่าขอให้ช่วยรักษาบันทึกการฝึก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` รับดูแลเอกสาร → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_073.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยจัดทำสำเนาให้ศิษย์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_073.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งมอบให้หอสมุดเมือง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_073.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_074` — กิลด์ขอให้เป็นพยาน (อายุ 240–600 เดือน)
**เกิดเมื่อ:** ผู้ร่วมงานโต้แย้งเรื่องค่าจ้าง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เล่าเฉพาะสิ่งที่เห็นจริง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_074.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ชวนทั้งฝ่ายทบทวนหลักฐาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_074.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอใช้คนกลางที่เป็นกลาง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_074.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_075` — ข่าวความขัดแย้งสองตระกูล (อายุ 264–600 เดือน)
**เกิดเมื่อ:** บ้านสองสกุลแข่งขันเรื่องที่ดินมานาน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เสนอการเจรจาผ่านสภา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_075.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` รับงานสำรวจหลักฐานกรรมสิทธิ์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_075.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` หลีกเลี่ยงการเข้าข้างโดยไร้ข้อมูล → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_075.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_076` — โอกาสเปิดร้านแรก (อายุ 264–660 เดือน)
**เกิดเมื่อ:** มีแผงขายว่างใกล้ตลาด. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เช่าทดลองหนึ่งฤดู → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_076.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เป็นหุ้นส่วนกับเพื่อนที่ไว้ใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_076.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เก็บเงินอีกช่วงก่อนเริ่ม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_076.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_077` — ภารกิจช่วยโรงเรียน (อายุ 264–660 เดือน)
**เกิดเมื่อ:** โรงเรียนขาดอุปกรณ์บางอย่าง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` บริจาคสิ่งที่มีตามกำลัง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_077.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ทำงานสอนพิเศษตามความสามารถ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_077.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ช่วยหาผู้สนับสนุน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_077.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_078` — งานเทศกาลต่างทวีป (อายุ 264–660 เดือน)
**เกิดเมื่อ:** ผู้เล่นพบประเพณีที่ไม่คุ้นเคย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามเจ้าบ้านด้วยความเคารพ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_078.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ร่วมงานในบทบาทอาสาสมัคร → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_078.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` บันทึกความทรงจำลงสมุด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_078.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_079` — ของขวัญจากผู้มีพระคุณ (อายุ 288–720 เดือน)
**เกิดเมื่อ:** คนเคยช่วยเหลือส่งของเล็กน้อยมาให้. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ส่งคำขอบคุณกลับ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_079.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` แวะเยี่ยมเมื่อเดินทางผ่าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_079.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เก็บไว้เป็นของที่ระลึก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_079.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_080` — ห้องทดลองหรือบ้านพัก (อายุ 288–720 เดือน)
**เกิดเมื่อ:** ผู้เล่นมีงบจำกัดต้องเลือกระหว่างลงทุนกับที่พัก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ปรับปรุงที่พักก่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_080.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เริ่มโครงการขนาดเล็ก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_080.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` แบ่งงบแบบระวังตัว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_080.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_081` — บทเรียนของศิษย์รุ่นแรก (อายุ 300–780 เดือน)
**เกิดเมื่อ:** มีรุ่นน้องขอให้ช่วยสอนทักษะ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` จัดคาบเบื้องต้น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_081.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` แนะนำผู้สอนที่เหมาะ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_081.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` สอนวิธีฝึกด้วยตนเองอย่างปลอดภัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_081.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_082` — ตลาดที่ราคาผันผวน (อายุ 300–780 เดือน)
**เกิดเมื่อ:** สินค้าเมืองแพงขึ้นเพราะเส้นทางค้าสะดุด. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ปรับรายการซื้อให้ประหยัด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_082.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หาข้อมูลราคาต่างเมือง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_082.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ช่วยตั้งระบบแบ่งปันของจำเป็น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_082.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_083` — ภารกิจที่เพื่อนขอร้อง (อายุ 300–840 เดือน)
**เกิดเมื่อ:** เพื่อนร่วมทางขอช่วยเรื่องเอกสารสัญญา. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ร่วมไปฟังการเจรจา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_083.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยตรวจข้อมูลที่เกี่ยวข้อง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_083.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` แนะนำคนกลางที่เชี่ยวชาญ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_083.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_084` — คำเชิญเข้ากลุ่มลับ (อายุ 312–900 เดือน)
**เกิดเมื่อ:** องค์กรไม่เปิดชื่อขอร่วมโครงการที่เสี่ยง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ถามเป้าหมายและหลักประกัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_084.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ปรึกษาคนที่ไว้ใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_084.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปฏิเสธจนกว่าจะโปร่งใส → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_084.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_085` — ความสำเร็จที่ถูกเข้าใจผิด (อายุ 312–960 เดือน)
**เกิดเมื่อ:** มีคนกล่าวว่าผู้เล่นเป็นเจ้าของผลงานของผู้อื่น. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ชี้แจงเครดิตแท้จริง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_085.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เชิญเจ้าของผลงานร่วมอธิบาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_085.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปล่อยให้เจ้าหน้าที่ตรวจสอบ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_085.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_086` — จดหมายจากพ่อแม่ (อายุ 336–960 เดือน)
**เกิดเมื่อ:** มีจดหมายถามถึงชีวิตของลูกที่จากบ้านไปนาน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ตอบอย่างอบอุ่น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_086.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` วางแผนกลับเยี่ยม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_086.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งของที่ครอบครัวต้องการ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_086.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_087` — คำถามเรื่องคู่ชีวิต (อายุ 360–960 เดือน)
**เกิดเมื่อ:** ตัวละครผู้ใหญ่ที่สนิทกันเริ่มพูดคุยเรื่องอนาคต. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` พูดถึงเป้าหมายร่วมอย่างตรงไปตรงมา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_087.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ใช้เวลาเรียนรู้กันต่อ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_087.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เลือกคงความเป็นเพื่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_087.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_088` — บ้านที่อยากซื้อ (อายุ 360–960 เดือน)
**เกิดเมื่อ:** พบบ้านในเมืองที่อยากตั้งหลัก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ตรวจค่าใช้จ่ายและสภาพบ้าน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_088.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เช่าพักก่อนเพื่อเรียนรู้พื้นที่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_088.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ลงทุนกับงานที่ต้องทำก่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_088.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_089` — คู่ค้าขอแก้ข้อตกลง (อายุ 360–960 เดือน)
**เกิดเมื่อ:** คู่ค้าเก่ามีปัญหาที่ส่งงานตามเวลาไม่ได้. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เจรจาปรับกำหนดอย่างเป็นธรรม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_089.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หาวิธีแบ่งงานใหม่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_089.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ยุติสัญญาตามเงื่อนไขอย่างสุภาพ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_089.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_090` — เด็กฝึกทำงานพลาด (อายุ 420–1080 เดือน)
**เกิดเมื่อ:** ผู้ช่วยรุ่นใหม่ทำงานผิดลำดับจนลูกค้ากังวล. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` สอนขั้นตอนใหม่โดยใจเย็น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_090.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอให้ตรวจงานร่วมทีม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_090.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` แบ่งงานให้เหมาะประสบการณ์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_090.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_091` — สภาเมืองขอคำปรึกษา (อายุ 420–1200 เดือน)
**เกิดเมื่อ:** ชื่อเสียงทำให้สภาขอความเห็นเรื่องโครงการชุมชน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ให้ข้อมูลจากประสบการณ์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_091.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ขอศึกษาเอกสารก่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_091.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งต่อผู้เชี่ยวชาญที่เหมาะกว่า → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_091.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_092` — เดินทางกลับสำนักเก่า (อายุ 480–1200 เดือน)
**เกิดเมื่อ:** โรงเรียนที่เคยเรียนเชิญกลับไปเยี่ยม. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` สอนศิษย์หนึ่งฤดู → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_092.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` บริจาคหนังสือที่ตรวจแล้ว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_092.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชมงานของอาจารย์รุ่นใหม่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_092.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_093` — ความขัดแย้งจากอดีต (อายุ 480–1440 เดือน)
**เกิดเมื่อ:** คนที่เคยผิดใจกันต้องมาทำงานร่วมกัน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` พูดคุยความจริงอย่างเปิดใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_093.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ตั้งกฎทำงานชัดเจน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_093.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอคนกลางประสาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_093.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_094` — การแบ่งมรดกความรู้ (อายุ 480–1440 เดือน)
**เกิดเมื่อ:** ผู้สืบทอดหลายคนอยากได้รับตำรา. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` จัดระบบยืมที่เป็นธรรม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_094.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เผยแพร่สำเนาตามสิทธิ์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_094.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` นัดหารือโดยมีพยาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_094.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_095` — เมืองที่เคยเงียบ (อายุ 480–1560 เดือน)
**เกิดเมื่อ:** เมืองเกิดการค้าขยายจนผู้คนปรับชีวิตไม่ทัน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เสนอพื้นที่ส่วนกลาง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_095.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยผู้ค้าเล็กร่วมมือ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_095.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` วางแผนเดินทางพักจากความวุ่นวาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_095.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_096` — การแข่งขันเพื่อสำนัก (อายุ 540–1680 เดือน)
**เกิดเมื่อ:** สำนักต่างเมืองอยากเทียบคุณภาพหลักสูตร. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` จัดงานแลกเปลี่ยน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_096.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ส่งตัวแทนมาศึกษากัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_096.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ใช้ผู้ประเมินอิสระ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_096.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_097` — ตัวเลือกของผู้ก่อตั้ง (อายุ 540–1800 เดือน)
**เกิดเมื่อ:** ผู้เล่นมีโอกาสตั้งองค์กรขึ้นเอง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` สร้างกติกาตรวจสอบได้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_097.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เริ่มจากกลุ่มเล็กในชุมชน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_097.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` รับตำแหน่งที่ปรึกษาแทน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_097.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_098` — เหตุการณ์ฝนผิดฤดู (อายุ 600–1800 เดือน)
**เกิดเมื่อ:** หลายหมู่บ้านพบฤดูกาลเปลี่ยนเล็กน้อย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ติดตามข้อมูลกับชุมชน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_098.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หาทางช่วยการเพาะปลูก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_098.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปรึกษาผู้รู้เวทเกี่ยวกับสภาพอากาศ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_098.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_099` — เงื่อนไขของการต่อชีวิต (อายุ 720–2400 เดือน)
**เกิดเมื่อ:** ผู้ฝึกเริ่มเห็นความจำเป็นต้องดูแลสุขภาพกับพลัง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ประเมินข้อจำกัดตนกับผู้รู้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_099.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ฝึกระยะยาวอย่างมีวินัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_099.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` วางแผนใช้ชีวิตในอายุขัยที่เหลือ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_099.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_100` — คำขอร้องของศิษย์รุ่นสอง (อายุ 720–2400 เดือน)
**เกิดเมื่อ:** ศิษย์มาขอให้ตัดสินใจแทนเขา. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ให้คำแนะนำและคืนสิทธิ์ตัดสินใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_100.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ร่วมวางเป้าหมาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_100.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` แนะนำผู้รู้ในสายที่ต่างออกไป → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_100.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_101` — จดหมายจากลูกหลาน (อายุ 720–2400 เดือน)
**เกิดเมื่อ:** ครอบครัวขอให้ผู้เล่นพบลูกหลานที่ไม่ได้เห็นนาน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` นัดเยี่ยมตามเวลาที่ตกลง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_101.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ส่งเรื่องเล่าที่เด็กอ่านได้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_101.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` คุยกับผู้ดูแลครอบครัวเรื่องความพร้อม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_101.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_102` — คู่ชีวิตกับเส้นทางยืนยาว (อายุ 720–3000 เดือน)
**เกิดเมื่อ:** คู่ชีวิตผู้ใหญ่พูดถึงแผนอนาคตเมื่ออายุขัยต่างกัน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` พูดคุยอย่างเคารพทางเลือกของกัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_102.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` สร้างความทรงจำร่วมในวันนี้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_102.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ยอมรับเส้นทางแตกต่างโดยยังดูแลกัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_102.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_103` — สมบัติของเมืองเก่า (อายุ 840–3600 เดือน)
**เกิดเมื่อ:** เมืองขอให้ช่วยจัดพิพิธภัณฑ์ผลงานช่าง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ร่วมบันทึกประวัติ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_103.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ช่วยวางระบบเข้าชม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_103.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ส่งวัตถุคืนเจ้าของชุมชน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_103.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_104` — ถนนใหม่ผ่านป่าชุมชน (อายุ 840–3600 เดือน)
**เกิดเมื่อ:** แผนขยายเส้นทางค้ากระทบพื้นที่สีเขียว. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เสนอสำรวจผลกระทบ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_104.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ออกแบบเส้นทางทางเลือก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_104.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ร่วมฟังชุมชนทุกฝ่าย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_104.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_105` — ข้อตกลงที่ถูกละเลย (อายุ 960–4800 เดือน)
**เกิดเมื่อ:** สภาท้องถิ่นลืมคำสัญญาที่เคยให้ไว้. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ขอเปิดหลักฐานเดิม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_105.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เสนอเจรจารอบใหม่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_105.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ช่วยหาวิธีชดเชยอย่างเหมาะสม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_105.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_106` — บ้านเกิดเปลี่ยนชื่อ (อายุ 960–4800 เดือน)
**เกิดเมื่อ:** ชุมชนตั้งชื่อเมืองใหม่เพื่อระลึกคนในอดีต. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เล่าเรื่องที่รู้ให้ถูกต้อง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_106.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เคารพมติปัจจุบัน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_106.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ช่วยทำป้ายประวัติหลายภาษา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_106.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_107` — เส้นทางลมหายใจยาว (อายุ 960–6000 เดือน)
**เกิดเมื่อ:** ผู้เล่นพบศาสตร์ที่อาจช่วยให้ฝึกต่อไปอีกยุค. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ศึกษาข้อจำกัดอย่างจริงจัง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_107.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามผู้เชี่ยวชาญจากต่างทวีป → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_107.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` พักและประเมินเป้าหมายก่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_107.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_108` — สำนักที่มีผู้สืบทอด (อายุ 1200–7200 เดือน)
**เกิดเมื่อ:** ลูกศิษย์หลายรุ่นต้องการหลักสูตรใหม่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เปิดสภาศิษย์และครู → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_108.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` สร้างเส้นทางฝึกหลายระดับ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_108.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปล่อยให้รุ่นใหม่ออกแบบตนเอง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_108.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_109` — ตระกูลคู่แข่งขอสงบศึก (อายุ 1200–7200 เดือน)
**เกิดเมื่อ:** คู่แข่งสมัยหนุ่มต้องการยุติข้อพิพาท. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เจรจาข้อตกลงต่อหน้าพยาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_109.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ชวนทำโครงการร่วม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_109.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ปฏิเสธแบบไม่สร้างความแค้นเพิ่ม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_109.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_110` — ชื่อเสียงที่เปลี่ยนเป็นตำนาน (อายุ 1200–9600 เดือน)
**เกิดเมื่อ:** ผู้เล่นได้ยินเรื่องเล่าถึงตนที่ผิดไปจากความจริง. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` บันทึกความจริงอย่างถ่อมตน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_110.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ปล่อยให้คนรุ่นหลังตีความ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_110.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ขอให้คนเคยร่วมงานเล่าอีกมุม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_110.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_111` — นักวิชาการรุ่นหลาน (อายุ 1440–9600 เดือน)
**เกิดเมื่อ:** นักศึกษาใหม่มาขอรู้เรื่องโลกยุคก่อน. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` สอนจากหลักฐานที่มี → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_111.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` พาไปดูสถานที่เก่า → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_111.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ให้เขาออกสำรวจเพื่อพบความจริงเอง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_111.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_112` — มหาวิทยาลัยที่ย้ายเมือง (อายุ 1440–9600 เดือน)
**เกิดเมื่อ:** สถาบันเก่ากำลังย้ายไปเมืองใหม่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ช่วยเก็บเอกสาร → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_112.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` มอบทุนเดินทางแก่ศิษย์ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_112.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เป็นที่ปรึกษาโครงการย้าย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_112.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_113` — ตลาดที่ไร้เหรียญเดิม (อายุ 1800–12000 เดือน)
**เกิดเมื่อ:** รูปแบบการแลกเปลี่ยนเปลี่ยนไปหลายยุค. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ปรับกิจการให้เข้ากับสมัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_113.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ศึกษาผลต่อคนยากจน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_113.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เปิดศูนย์ความรู้การค้าสำหรับคนใหม่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_113.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_114` — หอคอยรอยจำ (อายุ 1800–12000 เดือน)
**เกิดเมื่อ:** พบสถานที่ที่เก็บความทรงจำบางอย่างของโลก. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` จดบันทึกโดยไม่แตะสิ่งที่ไม่เข้าใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_114.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เชิญผู้เชี่ยวชาญหลายสาย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_114.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เก็บเป็นเป้าหมายระยะยาว → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_114.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_115` — ศิษย์อยากเดินทาง (อายุ 2400–18000 เดือน)
**เกิดเมื่อ:** คนที่ฝึกมานานขอแยกไปสร้างสำนักใหม่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ให้พรและคำแนะนำ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_115.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` มอบคู่มือที่เหมาะสม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_115.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนวางกฎรักษาความปลอดภัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_115.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_116` — งานเทศกาลสามร้อยปี (อายุ 2400–18000 เดือน)
**เกิดเมื่อ:** งานเทศกาลที่เคยร่วมตอนเด็กถูกจัดใหม่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เข้าร่วมในฐานะคนธรรมดา → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_116.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` บอกเล่าของเดิมให้ผู้จัด → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_116.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ช่วยจัดพื้นที่สำหรับทุกวัย → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_116.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_117` — อาจารย์คนสุดท้ายของยุค (อายุ 3000–24000 เดือน)
**เกิดเมื่อ:** ผู้ร่วมยุคเรียนรู้คนเดิมจากไปตามธรรมชาติ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` บันทึกเรื่องของเขาอย่างให้เกียรติ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_117.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` สอนรุ่นใหม่จากสิ่งที่เรียนรู้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_117.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ดูแลชุมชนที่เขาเคยรัก → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_117.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_118` — หนังสือจากเมืองที่หายไป (อายุ 3600–30000 เดือน)
**เกิดเมื่อ:** ได้รับสำเนาหนังสือของเมืองที่ไม่ปรากฏในแผนที่ใหม่. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` สืบจากจดหมายและหลักฐาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_118.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามนักทำแผนที่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_118.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เก็บไว้จนพร้อมเดินทาง → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_118.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_119` — ทุ่งดาวเหนือเมฆ (อายุ 4800–36000 เดือน)
**เกิดเมื่อ:** ผู้มีพลังสูงเห็นปรากฏการณ์ซึ่งคนทั่วไปไม่สังเกต. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` บันทึกโดยไม่ตีความเกินหลักฐาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_119.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` หารือผู้รู้สาขาอื่น → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_119.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` กลับไปฝึกวิชาตนต่อ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_119.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_120` — เส้นเวลาแห่งการเรียนรู้ (อายุ 6000–48000 เดือน)
**เกิดเมื่อ:** ความรู้ที่ถืออยู่กำลังล้าสมัย. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` เรียนกับคนรุ่นใหม่ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_120.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ออกสำรวจเรื่องที่ไม่รู้ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_120.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` สร้างห้องเรียนข้ามยุค → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_120.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_121` — คำถามเรื่องการเป็นเทพ (อายุ 7200–60000 เดือน)
**เกิดเมื่อ:** มีหลักฐานว่าคนบางคนเคยข้ามขีดจำกัด. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` ศึกษาต้นฉบับเพิ่ม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_121.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` ถามผู้เชี่ยวชาญที่ไว้ใจ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_121.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` เลือกใช้ชีวิตปกติไปก่อน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_121.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_122` — ทางเลือกเหนือหน้าประตู (อายุ 9600–120000 เดือน)
**เกิดเมื่อ:** เมื่อใกล้ขอบเขตสูง ผู้เล่นได้รับข้อมูลของบททดสอบ. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` รับเรื่องไว้ศึกษาอย่างมีหลักฐาน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_122.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เลือกเดินทางตามเงื่อนไข → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_122.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ยังไม่สนใจและอยู่กับผู้คน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_122.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

### `life_evt_123` — จุดเริ่มที่ยังคงอยู่ (อายุ 12000–240000 เดือน)
**เกิดเมื่อ:** หลังผ่านพันปี ผู้เล่นกลับพบร่องรอยบ้านเกิด. แสดงฉากให้ตรงที่อยู่ปัจจุบันและโทนพื้นหลังตามช่วงวัย/สถานที่ที่มี
**ทางเลือก:**
- `a` กลับไปเยี่ยมสถานที่เดิม → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_123.a` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `b` เปิดบันทึกเส้นทางตน → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_123.b` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
- `c` ชวนศิษย์สืบทอดสิ่งดีที่เหลือ → สร้างผลที่เหมาะกับวัยและเชื่อม event-specific flag `life_evt_123.c` (สัมพันธ์ผู้ดูแล/ความสนใจ/ความชำนาญ/เวลา/ข่าว); ห้ามใส่ XP อาชีพในทารก
**ความต่อเนื่อง:** ถ้าเลือกดูแลผู้อื่น/ศึกษา/สำรวจ ความชอบระยะยาวและโอกาสพบบทเรียนที่สัมพันธ์กันจะเปลี่ยน โดยไม่กำหนดอนาคตตายตัว

## Risk & Choice Consequence Examples for Codex
- **CHOICE_ROUTE_01:** ผู้เล่นเลือกข้ามช่องเขาหรือพักฝึก | Condition: อัตรารอดคำนวณจากระดับพลัง อุปกรณ์ ภูมิอากาศ เพื่อนร่วมทาง, มีทางเลี่ยงหรือถอนตัว | Outcomes: ไป: ได้ skill/loot/ชื่อเสียงหรือพบทางตัน; รอ: เสียเวลาแต่เพิ่มความพร้อม; ร่วมคณะ: ค่าจ้างแต่ปลอดภัยขึ้น
- **CHOICE_MARKET_02:** ผู้เล่นเป็นพ่อค้าและถูกเสนอสินค้าราคาถูกผิดปกติ | Condition: ความเสี่ยงการถูกหลอกและชื่อเสียงร้าน | Outcomes: ตรวจแหล่งที่มา: เสียเวลา; ซื้อ: ได้กำไรหรือเสียทุน; ไม่ซื้อ: เสียโอกาสแต่ปลอดภัย
- **CHOICE_CONFLICT_03:** ตระกูลคู่แข่งส่งคนมาเจรจา | Condition: ความสัมพันธ์เก่าและ flags การแข่งขัน | Outcomes: ไกล่เกลี่ย: ลด conflict; แข่งขันตามกติกา: ได้ reputation; หลีกเลี่ยง: ลดความเสี่ยงและพล็อตเปลี่ยน
- **CHOICE_TRAVEL_04:** ระหว่างเดินทางมีผู้ขอให้พากลับหมู่บ้าน | Condition: stamina, party resources, loyalty | Outcomes: ช่วย: ใช้เวลา/ได้รับ trust; ขอให้เมืองช่วย: ปลอดภัย; ไม่รับ: ยังคงเดินทางแต่มีข่าวตามมา
- **CHOICE_AMBUSH_05:** กลุ่มดักทางที่เคยขัดแย้งมาปรากฏในช่องเขา | Condition: foreshadowing ผ่าน rumor, age-appropriate non-graphic combat | Outcomes: เจรจา: social check; ถอนตัว: lose time; ป้องกัน: encounter check with tier
- **CHOICE_BETRAY_06:** คู่ค้าซ่อนข้อมูลต้นทุนทำให้โครงการขาดทุน | Condition: document trail, NPC memory | Outcomes: ตรวจบัญชี: ได้หลักฐาน; ให้โอกาสแก้ไข: relationship changes; ยุติสัญญา: เงินคืนบางส่วน
- **CHOICE_FAMILY_07:** ครอบครัวขอให้เลือกระหว่างกลับบ้านกับงานยาว | Condition: care responsibilities and time | Outcomes: กลับบ้าน: relation up; ทำงาน: income up but regret; ประสานคนช่วย: cost up, both partial
- **CHOICE_PARTNER_08:** คู่ชีวิตวัยผู้ใหญ่ได้รับข้อเสนอย้ายเมือง | Condition: consent, personal goals and communication | Outcomes: ย้ายตาม: location update; ตัดสินใจแยกที่อยู่: relationship path; ร่วมวางแผน: delay and compromise
- **CHOICE_RANK_09:** ผู้เล่นเข้าใกล้ขอบเขตขั้นถัดไป | Condition: level milestone, resource requirements | Outcomes: ฝึกยาว: time/risk; ขอ mentor: cost/trust; พักศึกษาข้อมูล: lower risk slower
- **CHOICE_GOD_10:** อายุเกิน 1000 และหลักฐานกฎโลกพร้อม | Condition: hard 1000 age, Lv99, 30min active, trials | Outcomes: รับการเป็นเทพ: terminal Lv100; กลับไปอยู่โลก: keep Lv99; เลื่อนการตัดสินใจ: quest remains

## Endless-feeling play without infinite recycled text
ต้องใช้ event memory/cooldowns, 20 อาชีพ × 6 arcs, 120+ age events, ภูมิหลังและเมืองที่ต่างกัน, delayed consequences, NPC relationships และ dynamic years; อย่านำข้อความหนึ่งกลับมาพิมพ์ซ้ำเพื่อเพิ่มจำนวนบรรทัด

<!-- END 03_CONTENT_DATA.md -->


---

<!-- BEGIN 07_ART_IMPLEMENTATION.md -->

# REBORN — Asset Production Implementation Notes

Asset JSON file `06_ASSET_SEED_MANIFEST.json` includes **150 location-specific image prompts**, **20 interior categories**, and **180 distinct layered-character design entries** across 9 groups of 20. These are targets/data, not generated pictures.

## Generation steps for Codex
1. Audit available image-generation tools. Do not assume one exists.
2. Generate actual small PNG/WebP files into `public/assets` using available original art generator or script producing pixel tiles programmatically. The game should never call a paid hosted model during gameplay.
3. For visual repeatability build tile composition from place-specific `landmark`, `kind`, palette and seed; each location has a fixed asset ID. Distinct image assets do not require all images to be hand-painted, but must be visually different, not just overlaid text.
4. Create 180 actual transparent PNG sprite parts (or a compatible optimized sprite atlas with 180 distinct rendered appearances) and validate each can be composed into full-body avatar with correct anchors.
5. Render parents from independent but related feature arrays and derive child appearance by seeded crossing; not all traits must match both parents; no race/skin-tone superiority.
6. Introduce ownership-aware gear overlays; item IDs must come from inventory/equipment, not scene appearance guesses.
7. Implement aura variants at least every 5 levels; visual effects can be procedural layers generated locally; provide reduced motion fallback.
8. Generate fallback and check no broken assets at GitHub Pages `/alltest/`.
9. Check actual screenshots for 320px/mobile and desktop, no pixel art occupying the whole screen.
10. Use original assets only; do not reproduce any protected scenes/characters/objects from named inspiration franchises.

## Grade acceptance
- Location scenes = 150 unique logical mapping, 150 files **if all 150 locations implemented**; otherwise report currently implemented portion and complete missing slices.
- At least 20 distinct **visible** designs per 9 group categories; mere labels/IDs without rendered pixels do not pass.
- Each interior category has at least one original local art, with appropriate location ID reference.
- Avatar placement anchored to same perspective between background scene and character.
- Display actual currently owned sword/shield/tool/clothing and correct level aura; do not display cosmetic gear as owned equipment.

<!-- END 07_ART_IMPLEMENTATION.md -->
