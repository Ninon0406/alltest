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
