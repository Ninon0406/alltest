# REBORN — ULTIMATE CODEX DEVELOPMENT DIRECTIVE v3
## Full-scale Thai Fantasy Life Simulation / Relaxed Adventure RPG

> **Repository:** `Ninon0406/alltest`  
> **Public website:** `https://ninon0406.github.io/alltest/`  
> **Language:** คำบรรยาย บทสนทนา ชื่อตัวเลือก และ UI ต้องเป็นภาษาไทย ส่วนชื่อตัวแปร/คอมเมนต์ทางเทคนิคใช้ภาษาอังกฤษได้  
> **Priority:** ข้อกำหนดนี้ปรับปรุงข้อกำหนดเก่าที่ขัดกัน แต่ห้ามทำลายระบบเดิมโดยไม่จำเป็น

## 0. บทบาทและขอบเขตการทำงานของ Codex

คุณคือ Lead Engineer + Game Systems Architect + Narrative Director + World Designer + UI/UX Designer + QA/Release Engineer ของโปรเจกต์ **REBORN: พงศาวดารผู้เกิดใหม่**

**ลงมือแก้โค้ดจริง** ใน repository ไม่ใช่ตอบแผนหรือส่งตัวอย่างโค้ดที่ยังไม่ประกอบเป็นเกม การพัฒนาต้องต่อยอดโค้ดเดิมโดยคงการเล่นได้จริงตลอดเวลา ให้ทำทีละชุดงานที่ทดสอบได้ (vertical slice) และดำเนินต่อจนถึงขอบเขตที่สภาพแวดล้อม/เวลา/โควตาอำนวย หากงานใหญ่เกินหนึ่ง execution ให้สร้าง checkpoint ที่ตรวจสอบได้ และเริ่มงานถัดไปจาก checkpoint นี้เมื่อได้รับ task ต่อเนื่อง ห้ามกล่าวอ้างว่าสามารถทำงานในเบื้องหลังหลังจาก execution จบ

อนุญาตให้ทำงานปกติใน repository นี้ ได้แก่ อ่าน/เขียนไฟล์ ติดตั้ง dev dependencies ที่เหมาะสม รัน build/tests แก้บั๊ก อัปเดตเอกสาร commit/เตรียม PR และ deploy สู่ GitHub Pages ที่ผู้ใช้ระบุว่าให้เผยแพร่สาธารณะแล้ว **แต่ห้าม** ลบ repository, force push, ทำลายข้อมูลเซฟผู้ใช้, เผยแพร่ secret, ซื้อบริการ, ใช้ API เสียเงิน, เปลี่ยน repository อื่น หรือข้ามขั้นตอนขอสิทธิ์ที่แพลตฟอร์มบังคับ ถ้าสิทธิ์ deploy ไม่พอ ให้แจ้งขั้นตอนที่ผู้ใช้ต้องกดเอง ไม่อ้างว่าสำเร็จ

### สถานะเดิมที่ต้องตรวจซ้ำจาก HEAD ก่อนลงมือ

ข้อมูลจากไฟล์ใน repository ที่เคยตรวจพบ: มี `app.html`, `src/`, `vite.config.js`, Vitest, Playwright, seed-based rebirth, ระบบภาพ SVG แบบ layered, และเอกสาร `AGENTS.md`, `GAME_DESIGN.md`, `ROADMAP.md`, `CONTENT_MANIFEST.md`. ณ การตรวจครั้งหนึ่ง manifest นับ 15 scenes, 29 choices, 6 endings, 120 names — **นี่ไม่ใช่ข้อมูลยืนยันล่าสุด** ต้องอ่าน HEAD ใหม่และนับจริงทุกครั้ง

**ข้อควรระวังระดับบังคับ:** ในโครงสร้าง deployment ที่พบ `app.html` คือ HTML source, `src/` คือ source logic; ส่วน `index.html`, `assets/`, `art/` ที่ root อาจเป็น **generated publication files** สำหรับ GitHub Pages แบบ `main:/`. ต้องอ่าน `AGENTS.md`, `scripts/stage-site.mjs`, `.github/workflows/pages.yml`, `vite.config.js` และ Settings ที่เข้าถึงได้ก่อนแก้ อย่า hand-edit generated files. ตรวจคำสั่ง `npm run build` และ `node scripts/stage-site.mjs` ก่อน commit ตามกฎของ HEAD. อย่าเปลี่ยน Pages source โดยเดาสุ่มหรืออ้างว่าเปลี่ยนสำเร็จทั้งที่ไม่มีสิทธิ์

### คำสั่งเริ่มงานทันที

1. `git status`; อ่านไฟล์สเปกและ architecture; สำรวจ route ของ UI/state/story/event/save/render/deployment
2. นับเนื้อหาที่มีอยู่จริงและสรุปบั๊กที่ขัดขวางการเล่น
3. เปิด preview ใน browser และตรวจแบบ mobile/desktop ว่า CSS/JS/fonts/assets โหลดครบ
4. สร้าง milestone tasks เป็น `docs/IMPLEMENTATION_CHECKLIST.md` พร้อม acceptance criteria
5. ลงมือทำ **P0 → P1 → P2...** ตามลำดับ ไม่หยุดที่การวางแผน
6. หลังทุกชุดงาน รันตรวจสอบ+อัปเดต manifest+commit/PR/deploy ตามสิทธิ์

---

# 1. วิสัยทัศน์และกฎเนื้อเรื่อง: RELAXED ADVENTURE FIRST

**เกมนี้เป็น Relaxed Fantasy Life Simulation RPG มากกว่าเกมบังคับกอบกู้โลก** ตัวละครเริ่มจากเด็กเกิดใหม่ในโลก **เอลินดรา (Elyndra)** แล้วใช้ชีวิตตามภูมิหลัง ฝึกฝน ทำงาน เดินทาง มีเพื่อน มีเป้าหมาย และเติบโตตามสิ่งที่เลือก

เป้าหมายสัดส่วนคอนเทนต์:
- **70%** ชีวิตประจำวัน การเดินทางสบาย ๆ เทศกาล การสำรวจ การค้า งานอดิเรก ผจญภัยขนาดเล็ก
- **20%** การฝึก ความสัมพันธ์ อาชีพ ทักษะ การตั้งเป้าหมายและเติบโต
- **10%** ปริศนาโลก เส้นชีพจรโลก เหตุการณ์ยิ่งใหญ่และการค้นพบเส้นทางเทพ

ตัวเลขเป็นแนวทางองค์ประกอบเนื้อหา ไม่ใช่บังคับทุก playthrough ให้เจอ 70/20/10 เป๊ะ ห้ามใช้ภัยพิบัติ/สงคราม/คำทำนายบีบให้ทำ Main Quest ตลอดเวลา ห้ามทำให้ผู้เล่นเป็น 'ผู้ถูกเลือก' ตั้งแต่เกิด ผู้เล่นที่เปิดร้านหรือใช้ชีวิตในชนบทต้องสนุกได้จริงและมีฉากจบของตนเอง

**ลิขสิทธิ์:** อาจได้แรงบันดาลใจระดับแนวจาก fantasy cultivation, isekai, academy, adventure และมังงะที่ผู้ใช้กล่าวถึง แต่ต้องสร้างโลก ตัวละคร ชื่อสำนัก ระบบพลัง บทสนทนา ภาพและพล็อตต้นฉบับ ไม่ทำซ้ำเหตุการณ์เฉพาะ/ฉาก/ตัวละครของผู้อื่น

---

# 2. โครงโลก ELYNDRA และแผนที่จริง

โลกมีเส้นพลังธรรมชาติ **World Veins / เส้นชีพจรโลก** แต่ไม่ใช่ภัยพิบัติที่จำเป็นต้องแก้ พื้นที่หลัก:

| ทวีป | ตัวตน | กิจกรรมหลัก | เรื่องย่อย |
|---|---|---|---|
| อาร์เวเนีย | เมืองหลวง ทุ่งนา กิลด์ สถานศึกษา | เรียน ค้า ฝึกงาน สร้างกิจการ | งานเทศกาล/ทุนการศึกษา/เรื่องในชุมชน |
| วัลดอร์ | เหมือง ภูเขา โรงตีเหล็ก ป้อม | ช่าง นักรบ สำรวจถ้ำ | แข่งขันตีเหล็ก/การค้าแร่ |
| เซเลสเทีย | เมืองนักปราชญ์ หอสมุด หอคอย | วิจัย เวทมนตร์ ประดิษฐ์ | หนังสือหาย/ทดลองศาสตร์ใหม่ |
| ไนท์เวียร์ | ป่าโบราณ เมืองเก่า ซากอารยธรรม | สำรวจธรรมชาติ ปริศนา ดันเจี้ยน | ปกป้องสัตว์เวท/แผนที่โบราณ |
| อาเคลอน | หมู่เกาะ เมืองท่า ตลาดทะเล | เดินเรือ ค้าขาย ผจญภัย | คาราวานทะเล/เทศกาลเรือ |

ระดับแผนที่ **เมือง/สถานที่ใกล้เคียง → ประเทศ/อาณาจักร → โลก → เขตแดนเทพ** ใช้พิกัดคงที่ในข้อมูล, hierarchy, route graph ไม่ใช่ภาพแผนที่หลอก ๆ

**เป้าหมายข้อมูล authored ที่ตรวจนับได้:** ≥5 ทวีป, ≥10 อาณาจักร, ≥30 เมือง, ≥60 ชุมชน/หมู่บ้าน, ≥40 ดันเจี้ยน, ≥20 เขตพิเศษ, ≥150 location records ที่มี id, name, parent, coordinate, description, services/encounters, unlock condition, neighbor links การนับไม่รวมชื่อฉาบฉวย/duplicated filler

ฟีเจอร์ map:
- ปักหมุดจุดเกิดตาม `birth.locationId` พร้อมปุ่ม `ตำแหน่งของฉัน` และ zoom/pan
- รูปพื้นหลัง/terrain แตกต่างตามภูมิภาค, minimap, breadcrumb, แสดงเส้นทาง, fog of war
- hover/tap บอกข้อมูล เมือง บริการ ภารกิจ ระยะทางและค่าเดินทาง
- ไม่อนุญาต teleport แบบไร้เหตุผล; pathfind ผ่าน edge ที่เปิดให้เดินทาง
- `travel(start, destination, method)` ตรวจ graph, resource, เงิน, ระยะทาง, days, danger, party; สร้าง encounter ตาม context
- ระดับเทพเปิดเมื่อมีความสามารถ/เควสต์ ไม่บังคับแสดงสถานที่ลับตั้งแต่เริ่ม
- ผู้เล่นย้อนกลับเมืองที่เคยไปได้; สถานที่เดิมเปลี่ยนตาม `worldYear`, faction, economy, quests
- render ผ่าน SVG/Canvas local, ไม่พึ่ง Maps API; ใช้งานคีย์บอร์ด/สัมผัส/มือถือได้

**ข้อมูลตัวอย่างต้องนำไปผูกจริง:** จุดเกิดชนบท = บ้าน/ตลาด/โรงตีเหล็ก/ป่าใกล้เมือง; จุดเกิดเมืองหลวง = โรงเรียน/หอสมุด/กิลด์/ร้านค้า; เมืองท่า = สะพาน/ท่าเรือ/ร้านเช่าเรือ/ตลาดปลา. ห้ามทุกเมืองมีตัวเลือกเหมือนกันเป๊ะ

---

# 3. ระบบสุ่มชาติกำเนิด: EQUAL BIRTH ARCHETYPES

**Override** จากกฎ weighted rarity เดิม: สำหรับชีวิตใหม่ ให้ **แต่ละ birth archetype ที่ eligible มีโอกาสเท่ากัน** รวมถึง eligible starting locations ตามชุดที่กำหนดใน birth pool ขณะนั้น ห้ามใช้ 70/23/6/1 สำหรับ archetype ใหม่ ทั้งนี้ค่าสเตตัสย่อย พ่อแม่ ความสัมพันธ์ สายเลือด และพรสวรรค์ใช้กฎเฉพาะที่สอดคล้องบริบทได้ ไม่จำเป็นต้องมี distribution เท่ากันทุกตัวแปร

ต้องมี ≥20 birth archetypes: ชาวไร่ ช่างตีเหล็ก คนทำขนม คนทำยา ครอบครัวค้าขาย ชาวประมง นักเดินเรือ นักล่า ช่างประดิษฐ์ ทหาร นักสำรวจ ผู้ดูแลหอสมุด นักเวท นักบวช นักวิจัย ผู้ดูแลสัตว์เวท ขุนนาง ราชวงศ์ นักเดินทาง และครอบครัวลึกลับ เป็นต้น

แต่ละ archetype มี:
`id, weight(=1), compatibleRaces, eligibleLocationTags, socioeconomicProfile, familyTemplates, storyHooks, starterAssets, liabilities, familyReputation` และมี validation ว่าทุก archetype/region ที่เป็น eligible มีโอกาสจริง; อธิบายชัดเจนว่า "เท่ากัน" วัดที่ชั้นใด ไม่ให้จำนวน template ย่อยทำให้ archetype บางอันได้เปรียบโดยไม่ตั้งใจ

หน้า Rebirth เป็นคนละหน้าจาก Birth Record. ผู้เล่นกดสุ่มครั้งเดียวต่อรอบ, ไม่เลือกต้นกำเนิด/ค่าสถานะเอง. บันทึก seed, generatorVersion, appearance seed และผลกำเนิดถาวร. Save เดิมต้อง migrate โดยไม่รีโรล. สร้าง simulation 100,000 rolls แบบ deterministic เพื่อตรวจ uniformity พร้อม tolerance ที่เหมาะสม แยก seed สำหรับ tests ไม่เปลี่ยนเซฟจริง

กำเนิด/ครอบครัว/ความมั่งคั่งมีผลต่อที่พัก เงินเริ่มต้น ความเป็นไปได้ในการเรียน ค่าฝึก ความสัมพันธ์กับ NPC และตัวเลือกในชีวิตจริง แต่ไม่มีเส้นทางไหนกลายเป็นการล็อกชัยชนะหรือความตายอัตโนมัติ

---

# 4. SINGLE SOURCE OF TRUTH สำหรับอายุ เวลา และเรื่องราว

**ห้ามเขียนอายุเป็นสตริงฝังใน dialogue/choice ที่ขัดกับ GameState** ให้ใช้ token interpolation เช่น `{player.age}`, `{time.worldYear}`, `{location.name}` และ renderer ที่ดึงจาก authoritative state

Game time:
- `birthAbsoluteDay`, `absoluteDay`, `worldYear`, `season`, `dayOfYear`, `ageYears`, `lifespanYears`
- ตกลงปฏิทินโลกอย่างชัดเจน (เช่น 360 วัน/ปี 4 ฤดู) และคำนวณ `ageYears = floor((absoluteDay - birthAbsoluteDay)/DAYS_PER_YEAR)` หรือคำนวณตามวันเกิดถ้ามีเดือน/วัน; ไม่เก็บ age หลายแหล่งอ้างอิงที่แยกกัน
- ตัวเลือกมี `durationDays` หรือ `timeCost`, มี event interrupts, travel time, training time, sleep; ไม่ควรให้เลือก 'ฝึก 1 เดือน' แล้วอายุเพิ่ม 1 ปีทันที
- Annual Chronicle เปิด entry เมื่อข้าม birthday จริงหรือจบปีปฏิทินตาม definition เดียวกัน
- อายุปรากฏตรงกันใน birth record, dashboard, choice, event title, story, ending, save, NPC status, logs
- วันที่/ปีของเควสต์สัมพันธ์กับเวลาที่ผ่านจริง; event บางอันมี expiration แต่ห้าม soft-lock เส้นทางหลัก

Simulation cadence:
- อายุ 0–3: เรื่องสั้นตามวัย กิจกรรมเล็ก ๆ การพัฒนา/ความสัมพันธ์; ห้ามทารกไปสู้โจรด้วยตัวเอง
- 4–7: เรียนรู้บ้านเกิด เพื่อน งานในชุมชน ภาษา ครูช่าง
- 8–11: ฝึกฝนจริงจังขึ้น ท่องเมืองใกล้เคียง เตรียมพิธีปลุกพลัง
- ~12: พิธีปลุกพลังครั้งสำคัญ; อย่ายึดอายุ 12 ถ้าชุมชน/เผ่าพันธุ์มีเงื่อนไขเล็กน้อยต่างกัน แต่ตัวเลขต้องตรงกัน
- 13–60: academy/guild/job/crafting/exploration/party/life goals
- 61–999: lifespan extensions, reputation, generational change, schools, legacy, Time Montage
- 1000+: God Path trial ตามเงื่อนไขจริง

ใน 10 ปีแรก **มีเหตุการณ์สุ่มทั้งหมดที่ปรากฏจริง ≥10** แต่แต่ละปีอาจมี 0–หลายสิบสุ่มได้ (รวมย้อนหลัง 10 ปี ≥10). ต้องสร้างระบบ guarantee/pity ที่ถูกทริกเกอร์ใกล้ขอบเขตเพื่อไม่ให้ขัดเกณฑ์, โดยไม่อ้างว่าปีที่ไม่มีเหตุการณ์สุ่มไม่มีอะไรเกิดขึ้น (กิจกรรมหลักยังเล่นได้). จำนวน event ต่อปีต้องจำกัดทั้ง performance และ UX; ผู้เล่นเลือกข้ามกิจกรรมย่อยเมื่อเหมาะสม

**เวลาการเล่น:** ออกแบบ playthrough สั้น (บาง ending 3–5 นาทีตามเหตุการณ์), เล่นธรรมดา ~10–30 นาที, God Ending ขั้นต่ำ ≥30 นาทีของ **active interactive play** และอายุในเกม ≥1000 ปีพร้อม quest gates. ไม่ใช้การรอหน้าเว็บทิ้งไว้เป็นเกณฑ์; บันทึก active-play timer ด้วย interaction/visibility validation, ไม่ใช้เวลาอย่างเดียวแทนการบรรลุความสำเร็จ. Test-only time override ต้องไม่อยู่ใน public release

---

# 5. STORY ENGINE / OPTION ENGINE ที่ไม่ซ้ำจำเจ

ใช้ data-driven graph ไม่ใช่ if/else ยาวเป็นหมื่นบรรทัด:

```js
/** Example contract; adapt to existing code without replacing working systems. */
{
  id: 'ev.avena.market.apprentice.001',
  title: 'เสียงหัวเราะในตลาดเช้า',
  category: 'slice-of-life',
  minAge: 6,
  maxAge: 40,
  locationTags: ['market'],
  oncePerLife: false,
  cooldownDays: 720,
  priority: 3,
  conditions: [{ type: 'statGte', stat: 'curiosity', value: 4 }],
  pages: [
    { text: 'เช้าวันนี้ตลาดแน่นขนัด คุณเห็นเด็กฝึกงานคนหนึ่งทำตะกร้าผลไม้หล่นกระจาย...' },
    { text: 'เจ้าของแผงเดินเข้ามา และมองคุณราวกับกำลังรอคำตอบ...' }
  ],
  choices: [
    {
      id: 'ch.avena.market.help.001', label: 'ช่วยเก็บผลไม้',
      timeCostDays: 1,
      conditions: [],
      effects: [{ type:'statDelta', stat:'empathy', amount:1 }, { type:'relationshipDelta', npcId:'npc.market.apprentice', amount:2 }],
      next: 'ev.avena.market.thanks.001'
    },
    {
      id: 'ch.avena.market.trade.002', label: 'ช่วยขายของแทน',
      timeCostDays: 1,
      conditions: [{ type: 'statGte', stat:'charisma', value:3 }],
      effects: [{ type:'currencyDelta', currency:'gold', amount:3 }, { type:'skillXp', skill:'trade', amount:3 }],
      next: 'ev.avena.market.shift.001'
    }
  ]
}
```

**ข้อตกลง API ต้องเหมาะกับ state ที่มีจริง** ถ้าใช้ stat เช่น curiosity ให้เพิ่ม schema/migration อย่างเป็นระบบ หรือใช้ stat ที่มีอยู่ก่อน ไม่สร้าง references ที่ไม่มีจริง. Effects ทำผ่าน reducer/dispatcher แบบ pure หรือผ่าน transactional state update; validate ID และเงื่อนไขก่อน commit; transaction ล้มเหลวแล้ว state ต้องไม่เสีย

โครงสร้างแนะนำ: `src/data/events/{region}/{lifeStage}.js`, `src/data/quests/`, `src/data/endings/`, `src/engine/time.js`, `story.js`, `effects.js`, `conditions.js`, `selector.js`, `world.js`, `economy.js`, `progression.js`, `map.js`, `save/migrate.js` แต่ให้สำรวจ architecture เดิมก่อนแล้วเลือกแก้แบบน้อยที่สุด

**การอ่านเรื่อง:** หนึ่ง page ข้อความ 30–80 คำโดยประมาณ อ่านง่าย 2–6 ย่อหน้าสั้น ๆ (ภาษาไทยอาจไม่เว้นวรรค ให้ใช้การนับอักขระ/paragraphs เพื่อประเมินอย่างสมเหตุสมผล) มีภาพฉาก เลขปี/อายุ/สถานที่ ปุ่ม 'อ่านต่อ' ตามหน้าจำเป็นเท่านั้น ให้แสดง choice หลัง page สุดท้าย ห้ามทำ modal ซ้อน ๆ หรือเลื่อนมากจนต้องอ่านไม่ไหว มี fast-forward เฉพาะบทที่เคยเห็นและไม่ละเมิดเงื่อนไข gameplay

**Meaningful choice:** มี effect จริงต่อ state, แหล่งทรัพยากร, risk, quest/relationship flag, location, time, skill, reputation, NPC หรือ branch; ห้ามก๊อปคำตอบ 5 ปุ่มแต่ผลเหมือนกัน. ทุก ID unique, effects balanced, paths reachable, no dead ends (ยกเว้น ending ตั้งใจ)

---

# 6. ตัวอย่างเนื้อเรื่องเริ่มต้นที่ต้องนำไปแต่งเป็น EVENT จริง

ให้แต่งบทสนทนาและเหตุการณ์ต้นฉบับภาษาไทยจาก **แกนเหตุการณ์ต่อไปนี้** แล้วต่อยอด branch แต่ละแบบ (ห้ามเพียงนำรายการนี้ไปแสดงเป็นปุ่มครั้งเดียว). ทุกเรื่องเลือกตามสถานที่เกิด/ครอบครัว/ความสามารถ.

### อายุ 0–1: ตัวเลือกเบื้องต้น ≥20 record, ผู้เล่นเห็น ≥10 contextually valid choices ระหว่างปีแรก

1. ฟังเสียงเพลงกล่อมจากผู้ดูแล → ความคุ้นเคย/ความสงบ
2. จดจำเสียงเรียกชื่อ → memory/language affinity
3. มองแสงผ่านหน้าต่าง → perception/curiosity
4. สัมผัสของเล่นไม้ที่พ่อทำ → dexterity/crafting hint
5. พยายามสื่อสารกับผู้ดูแล → relationship/communication
6. ฟังคนในบ้านคุยเรื่องการเดินทาง → travel curiosity flag
7. สนใจสัตว์ตัวเล็กข้างเตียง → animal affinity
8. จ้องตำรา/ภาพสัญลักษณ์ในห้อง → literacy/arcane curiosity
9. พยายามเคลื่อนไหวอย่างระมัดระวัง → early coordination
10. หันตามเสียงฝนแรกฤดู → nature affinity
11. แสดงความสนใจต่อเสียงเครื่องมือ → craftsmanship
12. มองผืนแผนที่เก่าของครอบครัว → geography hint
13. สงบลงเมื่อได้ยินเสียงดนตรี → music affinity
14. จดจำกลิ่นสมุนไพร → healing/herbal curiosity
15. พยายามเลียนแบบคำง่าย ๆ → early language
16. ฟังเรื่องเล่าเกี่ยวกับเมืองใกล้บ้าน → hometown lore
17. รู้สึกคุ้นกับสิ่งประดิษฐ์ชิ้นหนึ่ง → hidden memory flag (ไม่รับประกันพลัง)
18. จ้องประกายจากเตาไฟ → elemental curiosity
19. สนใจเสียงสวดจากศาลาชุมชน → spiritual curiosity
20. พยายามเรียกความสนใจของคนในครอบครัว → confidence/social bond

กิจกรรมต้องเป็น **การรับรู้/ตอบสนองตามวัย** ไม่ใช่ตัวเลือกให้ทารกทำกิจกรรมอันตราย. อย่าปล่อย 20 ปุ่มทีเดียว; จัดเป็น event clusters และ 2–5 choices ต่อ scene, unlock ตามเวลาและภูมิหลัง

### อายุ 2–11: ช่วงปูพื้นฐานก่อนปลุกพลัง

- อายุ 2: วิ่งเล่นครั้งแรก / รู้จักเพื่อนบ้าน / ของเล่นที่แตก / ของขวัญแรก
- อายุ 3: เรียนคำจากหนังสือภาพ / พบพ่อค้าเร่ / ช่วยจัดของเล็ก ๆ ในบ้าน
- อายุ 4: งานเทศกาลฤดูฝน / เรียนรู้แผนที่หมู่บ้าน / สัญญากับเพื่อน
- อายุ 5: สวนหลังบ้าน / ลูกสัตว์เวทหลงทาง / ช่วยร้านค้า / เริ่มเข้าใจค่าเงิน
- อายุ 6: ร้านตีเหล็ก / หอสมุด / ตลาด / การแข่งขันเล็ก ๆ / ครูเร่ร่อน
- อายุ 7: เสียงจากโรงตีเหล็ก / เพื่อนท้าแข่ง / อาสาทำงาน / เรื่องเล่าจากคนเดินทาง
- อายุ 8: ฝึกสายที่สนใจ / สอบทุน / เยี่ยมเมืองใกล้เคียง / พบตำราเก่า
- อายุ 9: การทำงานชิ้นแรก / สะสมเงินด้วยตนเอง / สร้างแผนที่ส่วนตัว
- อายุ 10: การค้นพบความถนัด / ปรึกษาผู้ใหญ่ / ฝึกทักษะเบื้องต้นหลายแขนง
- อายุ 11: ข้อเสนอจากกิลด์/สถาบัน / ความคิดเรื่องอนาคต / เตรียมพิธีปลุกพลัง

เพิ่มเหตุการณ์ตาม archetype อย่างน้อย 2–4 กลุ่มต่อรูปแบบกำเนิด ทำให้ผู้เกิดเมืองท่า/เหมือง/ปราสาท/หมู่บ้านมีประสบการณ์ต่างกันจริง โดยไม่จำกัดว่าชาติกำเนิดใดต้องเก่งกว่าใครในระยะยาว

### อายุ ~12: พิธีปลุกพลัง ‘พิธีแห่งเส้นชีพจร’

Scene chain: **เตรียมตัว → เดินทาง/สถานที่ประกอบพิธี → พบผู้ร่วมพิธี → เครื่องตรวจตอบสนอง → ผลการตื่นพลัง → คุยกับผู้ดูแล → เป้าหมายถัดไป**. สถานที่ขึ้นกับ location/family ไม่บังคับทุกคนเข้าวิหารหรือ Academy เดียวกัน

ใช้ `awakeningScore[classFamily] = Σ(stat * coefficients) + training + backgroundAffinity + seededVariation` และกำหนด coefficient/threshold ในข้อมูลจริง, bounded RNG, outcome explanation. ผลอาจเก่ง/ปานกลาง/ต่ำ/หายาก แต่ **ผลต้องเข้ากับพัฒนาการ**. ไม่ให้เลือกเองทั้งหมด; ผู้มีผลต่ำยังฝึกจนพลิกชีวิตได้. แสดงสิ่งที่ค้นพบและสิ่งที่ยังไม่ทราบ ไม่เปิดเผย secret flags โดยไม่มี event

### อายุ 12–60: เรื่องย่อยตามอาชีพ; ตัวอย่าง ARC ที่ต้องมี

**นักดาบ:** ร้านดาบแตก → ฝึกกับช่าง → แข่งประลองทักษะ → พบคู่แข่งที่เคยช่วย → ออกสำรวจหาวัตถุดิบ → วิชาขั้นสูง

**นักเวท:** ขอทุนสถาบัน → เรียนเวทพื้นฐาน → ทดลองผิดพลาด → เพื่อนร่วมชั้น → สำรวจหอสมุด → ปริศนาของ World Veins

**พ่อค้า:** ขายของในตลาด → ชั่งน้ำหนัก/ต่อรอง → คาราวานต่างเมือง → ราคาผันผวน → สร้างร้าน → เครือข่ายค้าใหญ่

**ช่างตีเหล็ก:** ซ่อมดาบท้องถิ่น → เรียนรู้โลหะ → หาวัตถุดิบ → ประดิษฐ์ไอเทมพิเศษ → สอนศิษย์ → ศาสตราตำนาน

**นักวิจัย:** คัดลอกบันทึก → ทำงานกับอาจารย์ → ทดลองอย่างปลอดภัย → เผยแพร่ความรู้ → ตั้งสถาบัน → เข้าใจต้นกำเนิดพลัง

**นักเดินเรือ:** เรือชาวบ้าน → แผนที่ลม → ท่าเรือแปลกหน้า → งานส่งสินค้า → ค้นพบเกาะใหม่ → สำรวจมหาสมุทร

**ชาวไร่/ธรรมชาติ:** ดูแลแปลงผัก → ขายผลิตผล → พันธุ์พืชเวท → ฟื้นฟูดิน → ปลูกสวนแห่งตำนาน

**นักผจญภัย:** สมัครกิลด์ → สำรวจดันเจี้ยนขนาดเล็ก → หาเพื่อน → ทำแผนที่ → ค้นพบเส้นทางเก่า → ผู้นำสำรวจ

ทุก ARC มีอย่างน้อย 3 จุดตัดสินใจที่เปลี่ยนผลระยะยาว, ทางออกสงบ/ไม่เสี่ยง, เงิน/เวลาที่สัมพันธ์จริง, NPC ที่จำผลการตัดสินใจเดิม

---

# 7. อาชีพ 20 สายหลัก → ≥80 สายขั้นสูง/ผสม

ต้องมีสายเริ่มต้น **20 สาย** พร้อม prerequisites, scoring, levels, skills, events, jobs, earnings, mentors, equipment, prestige และ path toward God: นักดาบ, นักรบ, นักเวท, นักธนู, นักบวช/รักษา, นักอัญเชิญ, นักเล่นแร่แปรธาตุ, ช่างตีเหล็ก, พ่อค้า, นักวิชาการ, นักลอบเร้น, นักผจญภัย, ทหารรับจ้าง, นักการทูต, ผู้ดูแลธรรมชาติ/เกษตรกร, นักเดินเรือ, นักประดิษฐ์, นักดนตรีเวท, นักฝึกสัตว์, ผู้ฝึกพลังวิญญาณ

**สายขั้นสูงตัวอย่างอย่างน้อย 4/สาย** รวม 80+: นักดาบเวท/ปรมาจารย์ดาบ/อัศวินดาบ/ผู้พิทักษ์คมดาบ; จอมยุทธ์/ผู้พิทักษ์ป้อม/นักรบอาคม/ผู้บัญชาการ; จอมเวทธาตุ/นักเวทพิธี/นักเวทพลังชีวิต/นักเวทดวงดาว ฯลฯ ต้องเขียนสายครบใน data, อธิบายเงื่อนไขและผล gameplay ต่างกันจริง; รองรับ multi-class ผ่าน eligibility ไม่ใช่เปิดทุกสายจากต้น

หน้าจออาชีพผู้เล่น **แสดงเฉพาะอาชีพที่เลือกได้**, เรียง recommendation score แล้วมี tooltip 'เหมาะเพราะ...' และสิ่งที่จะได้รับ. อาชีพที่เลือกไม่ได้แสดงเฉพาะ **Career Codex** แบบค้นหา/กรอง พร้อม prerequisite ที่ยังขาด ไม่แสดงเป็นปุ่ม disabled ในการเลือกหลัก ถ้าไม่มีสายขั้นสูงที่เข้าเงื่อนไข ให้มี ordinary career/job ที่เล่นได้เสมอ

ตัวอย่าง scoring:
`score = dot(normalizedStats, weights) + background + awakening + trainedSkills + personality + tinySeededVariance`, `eligible = prerequisites.every(check)`; score ไม่ใช่ผลการสุ่มเกิดใหม่, ไม่เอา UI text ไปคำนวณ

---

# 8. เศรษฐกิจครบวงจรและทรัพยากรมีค่า

ระบบ Gold ต้องเป็น ledger ที่ติดตาม transaction จริง:
- รายได้: งานรับจ้าง ขายสินค้า loot เงินเดือน รางวัล ดอกผล/ธุรกิจที่สมเหตุสมผล
- รายจ่าย: อาหาร ที่พัก ค่าเดินทาง ค่าเรียน หนังสือ อาวุธ เกราะ อุปกรณ์ ยา ค่าสมัคร guild ค่าแรงลูกจ้าง ภาษี/ค่าธรรมเนียมภายในเกม
- เมืองแต่ละแห่งมี `market.prices`, availability, local modifiers, commerce events, economy state
- การซื้อ/ขาย atomic: เงินไม่ติดลบ ไม่มี duplicate item ไม่จ่ายซ้ำเมื่อคลิกซ้ำ; UI แสดง before/after money
- inventory/capacity/equipment/rarity/crafting/materials/shops/price modifiers
- คนจนต้องมีทางเลือกหาเงิน/ทุน/ฝึกฟรี/งานชุมชน ไม่ soft-lock
- คนรวยมีโอกาสใหม่แต่ไม่ auto-win; การมีธุรกิจมี maintenance/risk/reputation
- รายการธุรกรรมอ่านย้อนหลังได้ (`source`, `timestamp`, `location`, `amount`)

ราคา seed (ปรับ balance ได้): อาหาร 2G, ที่พัก 5G, หนังสือ 15G, ดาบเหล็ก 40G, สมัครกิลด์ 25G, ฝึกพื้นฐาน 50G, ภาคเรียน 200G. ราคาเป็น config ไม่ hardcode ใน UI. ทดสอบ economic exploits ทั้งขายซื้อวน, เงินติดลบ, free repeat reward, overflow

---

# 9. NPC / party / relationships / life goals

**≥100 NPC profile authored ต่างกันจริง**, seed คงหน้าตา/ชื่อ/เป้าหมาย, personality, origin, job, skills, schedule, location, faction, memorable event flags, relationship values, recruitment conditions, personal quests, growth with time. NPC ไม่ควรเป็น 'ผู้แจกภารกิจ' เหมือนกันหมด

Party: เชิญสมาชิกผ่านความสัมพันธ์/ภารกิจ/เงิน, จัดทีม, assign equipment/role, morale/loyalty, leave/rejoin, travel/combat synergy. เพื่อนมีเป้าหมายและปฏิเสธได้

Relationship: friendship/rivalry/mentor/family; romantic option เฉพาะตัวละครที่อายุและบริบทเหมาะสม, โดยพัฒนาตามความไว้วางใจและการใช้ชีวิต ไม่ให้กดคำตอบเดิมวนได้คะแนนไม่จำกัด; ทางเลือกไม่คบต้องเล่นต่อได้

`Life Goals`: ผู้เล่นเลือกเป้าระยะสั้นและยาว เช่น เรียนเวท เปิดร้าน สำรวจเมือง เป็นนักดาบเลื่องชื่อ สร้างกิลด์หรือศึกษาเส้นทางเทพ เปลี่ยนเป้าหมายได้ ไม่เป็น main quest lock. UI แนะนำ 3–5 กิจกรรมที่ **เปิดให้ทำได้จริงในสถานที่และสภาพปัจจุบัน**

---

# 10. ระบบฝึก / พลัง / อายุขัย / เทพเจ้า

ฝึกใช้เวลา ทรัพยากรและ stamina/fatigue/morale/focus; ลดผลตอบแทนเมื่อฝึกซ้ำแบบไม่มีความก้าวหน้า เพิ่ม mastery/discovery ผ่าน milestones/mentor/quest, สามารถพักและฝึกสายอื่นได้ ไม่จำเป็นต้องสู้เสมอ

เชื่อม combat/dungeon: turn-based จริง (initiative, enemy AI อย่างง่าย, resources, loot, flee, recovery), ความท้าทายเหมาะระดับผู้เล่น, เหตุการณ์เดินทางและการตัดสินใจไม่ใช่บังคับต่อสู้; บันทึกสาเหตุของทุก state mutation

**เทพไม่ใช่เป้าหมายเริ่มต้นและไม่ใช่เส้นทางบังคับ**. เบาะแสพบตามความเชี่ยวชาญ/ภูมิภาค/ศึกษาตำนาน ผ่าน event **“ประตูที่อยู่เหนือขีดจำกัด”** แล้วเปิด choice: สืบเสาะต่อ, ถามผู้รู้, ฝึกเพิ่ม, เก็บความลับ, ไม่ติดตาม เมื่อผู้เล่นรู้จักหนทางแล้วเท่านั้นแสดง `[ตั้งเป้าหมายการเป็นเทพ]` ให้เลือกเอง

`canAscend` ต้องเป็น pure condition evaluator:
```
player.ageYears >= 1000
&& player.goals.includes('divine_ascension')
&& player.godPath.discovered
&& player.godPath.trialsCompletedForCurrentCareer
&& player.mastery >= threshold
&& world.divineRealmUnlocked
&& player.godPath.finalChoice === 'ascend'
&& player.activePlayMs >= 30 * 60 * 1000
```

เงื่อนไขนี้เป็นขั้นต่ำ ต้องเพิ่ม flag การเข้าใจแก่นอาชีพและเหตุการณ์สำคัญของแต่ละสายจริง. `activePlayMs` ต้องวัด interactive/visible play ไม่ใช่ browser tab เปิดทิ้งไว้, ป้องกัน timezone/clock jumps และ Save manipulation ระดับสมเหตุสมผลสำหรับเกม local-only; อย่าอ้างว่า anti-cheat สมบูรณ์หาก local save แก้ได้. ใช้ Time Montage อย่างมีเนื้อหาจริงเพื่อไปถึง 1000 ปีโดยไม่บังคับกดทีละปี, อย่าเปิด 'skip to year 1000' ที่ไม่มีการเล่น

**God ending ของ 20 สายหลักต้องต่างกัน**, อาจมีสายผสมและ variations เพิ่ม, มี final personalized epilogue จากการกระทำ/ความสัมพันธ์/สถานที่เกิด ไม่ใช้แค่ชื่อเทพต่างแต่ข้อความเดียวกัน. หลังจบให้แสดงอายุ ผลงาน อาชีพ เดินทาง อุปกรณ์ เพื่อนที่จำได้ โลกเปลี่ยนไปอย่างไร, Ending Gallery + Life Chronicle

---

# 11. ฉากจบและคอนเทนต์จำนวนมาก: COUNT ONLY REAL CONTENT

**เกณฑ์เป้าหมายก่อนประกาศ Full Release**
- ≥500 distinct meaningful choice records
- ≥350 authored scene/event records ในหลายวัย/สถานที่/อาชีพ (ขยายเป้าหมายเป็น 500+ หากคุ้มค่า)
- ≥100 authored endings (ไม่ใช่ 100 variations ด้วยการแทนชื่อ)
- ≥100 important authored NPCs
- ≥20 base careers, ≥80 advanced/hybrid paths
- ≥150 functional locations, ≥40 dungeons
- ≥100 readable Thai names และเป้าหมายระยะยาว ≥500
- ≥20 birth archetypes, ≥20 meaningful first-year choice records; ตัวเล่นเห็นอย่างน้อย 10 choice records ที่เหมาะสมในปีแรก

**โครงสัดส่วนฉากจบ 100 แบบ (ต้องเขียน outcome และ prerequisites ต่างกัน)**
- 15 peaceful/ordinary life (ชาวบ้าน เกษตรกร ครู เจ้าของร้าน ช่าง หมอ นักสำรวจครอบครัว)
- 15 career mastery/profession endings (ปรมาจารย์ สร้างกิจการ หนังสือ ความรู้ ศิลปะ)
- 15 exploration/world discovery endings (สำรวจโลก เกาะลึกลับ แผนที่ ทวีป)
- 15 relationships/community/legacy endings (ตระกูล กิลด์ สำนัก ความสัมพันธ์ ชุมชน)
- 15 leadership/faction/kingdom endings (เมือง การทูต พันธมิตร สมาคม)
- 20 career-specific god ascension endings (หนึ่งสายฐานหลักเป็นอย่างน้อย)
- 5 secret/rare endings (event chain ที่มีเหตุผลและคำเตือนเหมาะสม)

Ending แต่ละตัว: id, category, title, eligibility, exclusive flags, priority/conflict resolution, trigger, epilogue ≥3 ย่อหน้าสั้นแบบเฉพาะ, illustration/scene config, unlocked data, world consequences. Test reachability ด้วย deterministic walkthrough อย่างน้อยหนึ่งเส้นต่อ ending. หากเงื่อนไขขัดกันให้แก้กฎ ไม่ซ่อนฉากจบที่ไปไม่ถึง

ต้องแยก `authored content` จาก `procedural permutations` และ `actual reachable` ใน `CONTENT_MANIFEST.md`. ไม่มีการนับปุ่ม UI / template string / เดิมเปลี่ยนชื่อเป็น choice ใหม่โดยอัตโนมัติ

---

# 12. ภาพ / ศิลป์ / UI / UX ที่อ่านง่าย

**ทิศทาง:** 2D fantasy illustrated portraits (ไม่ใช่ใช้ emoji เป็นอาร์ตหลัก), dark navy/gold UI, ภาพเมือง/ป่า/ทะเล/โรงเรียน/ตลาด/ดันเจี้ยนต่างกัน, ฉากตัวละครและการ์ดไอเทมสอดคล้องอาชีพ/อุปกรณ์

Portrait: deterministic layered renderer แยก identity/face/hair/eyes/skin/race, clothes, weapon, accessories, class, aura, age group, special transformation. **อายุที่เพิ่มขึ้นต้องไม่สุ่มใบหน้าใหม่**, save/load เหมือนเดิม. ถ้ามี image generation asset capability ใน environment ใช้สร้าง local original assets แล้ว commit; ถ้าไม่มีให้ใช้ vector/canvas art ที่ทำได้จริงและรายงานว่าไม่ได้ generate AI image. ไม่เรียก API เสียเงินตอนผู้เล่นเปิดเว็บ ไม่ใช้ secret ใน frontend

UI requirements:
- Desktop 3-column flexible: ซ้ายตัวละคร/สเตตัส, กลางภาพ+เรื่อง+choices, ขวา map/log/quest/party; tablet/mobile จัดแท็บ/accordion
- สเตตัสบอก **ชื่อค่า + ปัจจุบัน/สูงสุด + แถบสี + tooltip หน้าที่** เช่น HP, stamina, mana, hunger, fatigue, morale, gold
- พื้นหลังและตัวอักษร contrast ≥4.5:1 สำหรับข้อความทั่วไป, font ไทยอ่านง่าย, body default ≥16px desktop / ≥15px mobile
- ปุ่มสูงอย่างน้อย ~44px สำหรับ touch, ไม่บังคับ hover จึงจะเห็นข้อมูล; keyboard-focus ชัดเจน
- แยก status หลักกับ advanced details; แสดง effect ของ choice แบบอ่านได้: `+ความชำนาญดาบ`, `-5G`, `+1 วัน`, `ความเสี่ยงต่ำ`
- สถานที่ ปฏิทิน อายุ เงิน ทรัพยากร และ NPC list ต้องอัปเดตพร้อมกันหลังทุก choice
- event อ่านทีละหน้า (`อ่านต่อ`) บรรยายสั้น; เนื้อเรื่องส่วนยาวให้มี transcript ใน journal
- ไม่ใช้สีอย่างเดียวสื่อระดับดี/เสีย; icons และข้อความต้องตรงข้อมูล
- ห้ามหลุดนอกหน้าจอหรือทับกันที่ 360px/768px/1366px/1920px
- ลด animation เมื่อ `prefers-reduced-motion`, รองรับ screen-reader พื้นฐาน
- หาก asset โหลดไม่ได้ มี fallback ที่ยังดูดีและเล่นได้

ภาพที่ควรทำเป็น asset ชุด: บ้านชนบท 3 ภูมิภาค, เมือง 5 ทวีป, ตลาด, โรงตีเหล็ก, โรงเรียน/สถาบัน, กิลด์, ป่า, ทะเล, ภูเขา, ดันเจี้ยนต่างชนิด, วิหาร, ประตูเทพ, ภาพอาวุธ rarity, character portrait states อย่างน้อย 4 ขั้น. ใช้ caching/optimisation (webp/png/svg) ไม่ให้เว็บโหลดช้าเกินไป

---

# 13. สถานะ/สัญญาข้อมูลที่ต้องไม่ขัดกัน

ออกแบบ schema version ชัดเจน. แนะนำ root fields (ปรับชื่อให้เข้ากับโค้ดเดิมได้):

```
GameState {
  schemaVersion,
  runId,
  seed,
  character: { identity, appearance, birthRecord, race, stats, potential, skills, classes, talents, conditions, lifespan },
  time: { birthAbsoluteDay, absoluteDay, worldYear, season, activePlayMs },
  world: { era, locations, factions, unlockedRegions, currentLocationId, economy, explored },
  inventory: { gold, items, equipment, transactionHistory },
  party: { members, relationships, npcMemories },
  story: { currentEventId, pageIndex, completedEvents, flags, cooldowns, questStates },
  career: { primary, secondary, eligiblePaths, mastery },
  goals: { active, history, godPath },
  chronicle: { annualRecords, significantEvents },
  endings: { unlockedThisRun, endingId, finished },
  ui: { selectedTab, mapZoom }
}
```

**ไม่ย้ายข้อมูลทื่อ ๆ** ให้ทำ schema migrations `v2→v3→...`, validate เมื่อโหลด, ทำ rollback/backup เก็บเซฟก่อน migrate, รองรับ legacy save, ถ้า save อ่านไม่ได้ขอ confirmation ก่อน replace. UI/engine ต้องไม่ใช้ global mutation หลายที่โดยไม่ sync. Avoid `innerHTML` กับ user-controlled/saved strings และ sanitize ทุก string ที่ส่งลง DOM

Gameplay invariants:
- `gold >= 0`, `0 <= hp <= maxHp`, `ageYears === derivedAge`
- inventory quantities positive integers
- location exists and route valid
- NPC references exist
- scene/choice/ending IDs unique, destinations valid
- no unsigned negative random probabilities; outcome deterministic for seed + choices
- `GodEnding` impossible if age <1000 or goal not chosen
- no ending inaccessible due to mutually exclusive impossible predicates
- story text age and map position match state

---

# 14. ระบบทดสอบบังคับ (อย่าเพียงบอกว่าทดสอบผ่าน)

ใช้ Vitest และ Playwright ที่มีอยู่; เพิ่ม automated acceptance scripts. ตรวจผ่าน `npm test`, `npm run build`, `npm run test:e2e`, `npm run content` รวมถึง test production preview and Pages subpath `/alltest/` ตาม structure จริง

**Unit test cases ขั้นต่ำ**:
1. Birth archetype equal distribution sanity under fixed seeded simulation
2. Save old→new migration preserves name/parents/origin and no reroll
3. Calendar: 1 day, 30 days, 360 days, 2-year training, birthday edge
4. `choice.age` display derives from authoritative time only
5. First 10-year random-event guarantee; per-year zero possible
6. Event selectors respect age/location/cooldown/flags
7. Meaningful effects commit atomically, rollback on invalid transaction
8. Buying costs gold; insufficient funds blocked; no duplicate purchases
9. Jobs produce bounded income, prices respond to location
10. Class recommendation sorted correctly; ineligible hidden from selection UI
11. Awakening correlated with seeded potential/stats/training, not arbitrary fixed answer
12. Map route graph reachable and respects unlocks/time/resources
13. NPC relationship flags persist across travel and years
14. Portrait identity persists across aging/equipment/save
15. Combat win/lose/flee all coherent
16. All event references resolve; all endings reachable by feasible data path
17. God age/quest/goal/active-play gates; <1000 always blocked
18. Ending Gallery persists and resumes without corruption
19. No fatal console error in standard routes
20. Production base path CSS/JS/assets load and app renders styled UI

**Scenario / playthrough tests**:
- เกิดเป็นสามัญชนจนถึงวัย 12 ปี → ปลุกพลัง → เลือกอาชีพที่ได้จริง
- เกิดในเมืองท่า → เดินทาง → ซื้ออาหาร/จ่ายค่าที่พัก → ขายของ → เก็บเงิน
- นักเวททุนต่ำ → ฝึกฟรี/ทุน/ทำงาน → เข้าศึกษา ไม่ติดทางตัน
- ช่างธรรมดา → ทักษะสูง → สร้างกิจการ → peaceful ending
- นักเดินทาง → สำรวจโลก → map zoom/unlock → dungeon → loot/equipment
- อายุยืน → Time Montage หลายยุค → เป้าหมายเทพ → ผ่านบททดสอบ → อายุ ≥1000 → god ending
- ผู้เล่นเลือกไม่ตาม Main Quest → อยู่หมู่บ้านได้จนฉากจบสงบ
- save/load ทุก milestone + mobile viewport

ใช้ deterministic seeded test-run เพื่อ reproducibility; **ระบุจำนวน simulations และสัดส่วน failures ที่วัดได้จริง**. สำหรับ playtime gate ใช้ injected test clock เฉพาะ test bundle ไม่ใช่ hack เปิดใน production

**เป้าหมายคุณภาพ:** ไม่มี uncaught exception, ไม่มี broken assets, ไม่มี route ที่ค้างโดยไม่มีทางเลือก, ไม่มี invalid ending ใน full playthrough; ถ้ามีปัญหาบันทึกไว้และแก้ก่อน production release

---

# 15. แผนการพัฒนาแบบ Vertical Slice และเกณฑ์ตรวจรับ

**P0 — Audit & correctness (ต้องทำก่อน):** ตรวจเว็บสด/production bundle, runtime CSS/JS, อายุ/เซฟ/choice bugs, staged publication. ส่งรายการบั๊กพร้อม reproducible tests

**P1 — GameTime + readable UI + Birth:** ปรับเวลาเป็น authoritative calendar; event pages, chronicle, ลดความซ้ำ, UI status responsive, equal birth archetypes พร้อม save migration; เด็กเกิดจนถึง ~12 ปีได้โดยไม่มีทางตัน

**P2 — Awakening + careers + training:** พิธีปลุกพลังตาม stat, 20 main paths, recommendation/filter, training/fatigue/skill mastery, at least one advanced career per main path; ทำให้เส้นทางหลัง 12 ปีใช้เล่นต่อได้

**P3 — World map + travel + economy:** map เมือง/ประเทศ/โลก, 20+ จุด functional ก่อนขยาย 150, route graph, shop, transaction, jobs, travel encounters, gold loops ที่สมเหตุสมผล; ทดสอบเส้นทางจากแต่ละภูมิภาค

**P4 — Longer life + storytelling:** 0–60 life simulation, 100+ original events initially, multiple chain arcs, flags/delayed consequences, journal, NPC memories, 70/20/10 tone; playthrough มีความหลากหลายจริง

**P5 — Battle/Dungeons/Party:** combat, 10 functional dungeons ก่อนขยาย 40, loot, equipment, 20 functioning companion NPC ก่อนขยาย 100, relationship system

**P6 — Generations + World change + Ascension:** อายุ 60–1000+, lifespan extension, Time Montage, epochs, deity clues, opt-in life goal and trials, 20 unique class god endings; ordinary end routes remain intact

**P7 — Content scale-up:** ขยาย >=500 choices, >=350 event records, 100 endings, 100 NPCs, >=150 locations, >=80 playable careers; ตรวจนับอย่างจริงจังด้วย manifest script; ปรับสมดุล

**P8 — Art/UX polish and shipping:** ภาพฉากหลายทวีป, illustrated layered portrait variants, mobile polish, accessibility, performance, E2E, Pages deploy, live verification

**ข้อกำหนดหลังทุก P:** เกมต้องเปิดเล่นได้จริง. P ไม่ถือว่าเสร็จเพียงสร้าง class stub; ต้องมี happy-path test, boundary tests, UI screenshot/visual check เมื่อ browser available, และเอกสารที่บอกสิ่งที่ทำแล้วจริง

**ลำดับที่เหมาะสมยืดหยุ่นได้** หากค้นพบ dependency ที่เป็น blocker ให้แก้ก่อนและจดเหตุผลใน roadmap; อย่าหยุดเพื่อถามเรื่องเล็ก ๆ ที่มีคำตอบจาก requirement อยู่แล้ว

---

# 16. PERFORMANCE, SECURITY, PRODUCTION & GITHUB PAGES

- เกมต้องเป็น static website เล่นได้บน GitHub Pages โดยไม่ต้อง backend ไม่เก็บข้อมูลส่วนตัวหรือ API key; save ใน browser และ export/import ได้ถ้าทำอย่างปลอดภัย
- Deploy pipeline: ตรวจว่า workflow deploy `dist` ถูกต้อง, หรือโหมด `main:/` ตาม settings จริง; อย่า claim setup changed ถ้าไม่มีสิทธิ์; ใช้ source `app.html` + `src/` แล้ว build/stage, ห้าม hand-edit root generated HTML
- base path `/alltest/` ต้องถูกทั้ง CSS/JS/images/save asset URLs; ตรวจ live/network หลังเผยแพร่ (หากเข้าถึงไม่ได้ให้บอกตรง ๆ)
- Lazy-load maps and scenes, cap event-history memory, archive chronicle, compress saves cautiously, don't block UI when generating random content
- รองรับ Chrome/Edge/Firefox desktop และ mobile browser เท่าที่ test environment มีจริง
- UI ภาษไทยไม่แตก, รูปต้นฉบับถูกต้อง, ไม่ใช้เพลง/อาร์ตที่คัดลอกมาโดยไม่มีสิทธิ์
- อย่าใช้ paywall หรือติดตั้ง server ใหม่โดยไม่จำเป็น
- ก่อน release สร้าง backup/restore instructions และ changelog/rollback path

---

# 17. รายงานผลแบบตรวจสอบได้ (MANDATORY EACH TASK)

เมื่อจบแต่ละ execution ให้ตอบ **ภาษาไทยสั้นแต่ชัด** ดังนี้:

```
## REBORN DEVELOPMENT REPORT
Git branch / commit: ...
Milestone ที่ทำ: ...
ไฟล์หลักที่แก้: ...
ระบบที่เปิดเล่นได้จริง: ...
ระบบที่ยังไม่เสร็จ: ...
ผล npm test: x/y passed (หรือ why skipped)
ผล npm run test:e2e: x/y passed (หรือ why skipped)
ผล npm run build: PASS/FAIL
ผล npm run content: choices/events/endings/NPC/locations (authored vs reachable)
Production preview: checked/not checked + evidence
GitHub Pages: deployed/not deployed + link + live verified/unverified
Known issues: ...
Next precise task: ...
```

ต้องไม่เขียนว่า “เสร็จทั้งหมด” หากคอนเทนต์หรือระบบไม่ครบ. แยก “build ผ่าน” ออกจาก “เว็บสดเปิดได้และเล่นได้จริง”. ไม่อ้างว่าทดสอบ Playwright หากไม่ได้รัน

---

# 18. เกณฑ์จบงานฉบับเกมเต็ม

**FULL RELEASE** ได้เมื่อ:
- เล่นได้ตั้งแต่สุ่มเกิด → วัยเด็ก → ปลุกพลัง → อาชีพ/ฝึก/ผจญภัย/ค้าขาย → อายุขัย → หลายรูปแบบฉากจบ
- ทุกสถานะ/เวลา/แผนที่/เงิน/อาชีพสัมพันธ์กันและ UI ถูกต้อง
- ปีแรกมีทางเลือก ≥10 ที่เข้าถึงได้, data authored ≥20; เด็กวัย 0–11 เห็นเหตุการณ์ที่เหมาะสมและคงความต่อเนื่อง
- มี 20 careers, ≥80 higher paths, ≥500 meaningful choices, ≥100 endings, ≥100 NPC, ≥150 functional locations (ตรวจได้จริง)
- อายุ 1000+ + goal chosen + requirements + active time ≥30min จึง Ascend ได้; ไม่กลายเป็นเทพอัตโนมัติ
- เรื่องราวเป็น 70% relaxed exploration/life, 20% progression/relationships, 10% optional mysteries โดยประมาณ
- ตัวละครและฉากมีภาพภาพวาดแตกต่างตามสถานะ, ไม่ใช้ emoji แทนอาร์ตหลัก
- ทุก ending มีบทสรุปเฉพาะ, save/ending gallery works
- Test suite + production build ผ่าน, browser smoke tests ไม่มี error และ Pages ที่ `/alltest/` เผยแพร่ได้จริง

## START EXECUTION NOW

1. อ่าน HEAD และเอกสารทั้งหมดที่เกี่ยวข้อง
2. สร้าง/อัปเดต `docs/IMPLEMENTATION_CHECKLIST.md` แต่ไม่หยุดที่เอกสาร
3. ลงมือแก้ **P0 → P1** อย่างเป็นชิ้นงานที่เสร็จและทดสอบได้
4. ทำงานต่อ P2/P3/... เท่าที่ execution อนุญาต โดยรักษาโค้ดทำงานได้และ commit checkpoints
5. บันทึกงานค้างพร้อมคำสั่งต่อให้ Codex ครั้งถัดไปใน `docs/NEXT_CODEX_TASK.md`
6. ตรวจผลจริง อย่าพูดเกินสิ่งที่พัฒนาได้

**สำคัญ:** เป้าหมายคือเกมที่ผู้เล่นรู้สึกว่า "ชีวิตเล็ก ๆ ของตัวละครค่อย ๆ กลายเป็นเรื่องราวยิ่งใหญ่จากสิ่งที่เขาเลือก" ไม่ใช่เกมที่อัดข้อความเยอะแต่ไม่มีการตัดสินใจและระบบรองรับ
