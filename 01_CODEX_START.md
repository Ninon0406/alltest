# GODSEED — คำสั่งเริ่มสร้างเกมสำหรับ Codex Cloud

> **วิธีใช้:** แนบไฟล์ `01_CODEX_START.md` และ `02_GODSEED_MASTER_SPEC.md` เข้า Codex ที่เชื่อมกับ GitHub repository ที่คุณเป็นเจ้าของ แล้วส่งคำสั่งในไฟล์นี้เป็นงานแรก โปรเจกต์นี้มีเจ้าของที่ทำงานผ่าน **โทรศัพท์เท่านั้น** จึงห้ามมีขั้นตอนบังคับให้เจ้าของใช้คอมพิวเตอร์, Terminal ส่วนตัว หรือแก้ไฟล์ด้วยตนเอง
> 
> **ลำดับอำนาจ:** คำสั่งล่าสุดจากเจ้าของ > ข้อกำหนดด้านความปลอดภัย/สิทธิ์ที่ใช้งานจริง > ไฟล์ `02_GODSEED_MASTER_SPEC.md` > ไฟล์นี้ > สิ่งที่ Codex คาดเดาเอง

## บทบาทและคำสั่งเริ่มงาน

คุณคือทีมพัฒนาเกมอินดี้ในตัวเดียว ประกอบด้วย Game Director, Gameplay Programmer, Pixel Artist/Technical Artist, Narrative Designer, UX Designer, QA Engineer และ DevOps Engineer ภารกิจของคุณคือ **ลงมือสร้างเกม GODSEED: The World That Remembers ให้เป็นโค้ดเกมที่เล่นได้จริง** ไม่ใช่ตอบเป็นแผนงานหรือ pseudocode อย่างเดียว

ให้อ่าน `02_GODSEED_MASTER_SPEC.md` **ทุกหัวข้อก่อนเริ่มลงมือ** และถือว่าเป็น Single Source of Truth (SSOT) ของการออกแบบเกม หากพบส่วนที่สเปกกำหนดไว้แล้ว อย่าออกแบบทับหรือเปลี่ยนแนวทางโดยไม่มีเหตุผลเชิงเทคนิคที่จำเป็นและบันทึกไว้ หากเกิดข้อขัดแย้งให้ทำตามข้อกำหนดที่เฉพาะเจาะจงมากกว่าและเก็บเอกสารการตัดสินใจ

### ข้อบังคับที่ห้ามต่อรอง

1. เกมเป็น **HD Pixel Art 2D** ที่มีฉากต่อเนื่อง มี Layer, Tilemap, Animation, Parallax และ Particle effects ออกแบบต้นฉบับใหม่ ไม่ใช่ภาพ JPEG/PNG ฉากเดียวแปะทับรูปคนแบบกระดาษ
2. การเล่นเป็น **ตัวเลือกเนื้อเรื่อง → แอนิเมชันตัวละครกระทำตามที่เลือก → เปลี่ยนฉาก/ระบบ** ไม่มีการเดินอย่างอิสระด้วยปุ่ม WASD หรือ joystick ในแผนที่ Open World
3. สัดส่วน **เนื้อเรื่องและทางเลือกประมาณ 50% : ผสมเวทและการต่อสู้ประมาณ 50%** ตามระยะเวลาเล่นของ vertical slice; รวมระบบสะสมวัตถุดิบ การผสมคาถา และแผนที่เส้นทาง
4. ต่อสู้แบบ **Turn-Based** มีศัตรูท่าทางชัด, เวทติดตั้ง 4 ช่อง, ไอเทม, ป้องกัน, หนี และยอมแพ้เฉพาะกรณีที่กติกาอนุญาต และทุกเวทต้องมีเอฟเฟกต์ตามสูตรของตน
5. สูตรผสมเวทใช้ 8 แก่นธาตุ × 6 รูปแบบ × 7 ตัวแปร พร้อมกฎความเข้ากันได้ **234 สูตรที่ถูกต้อง** โดยนิยามสูตรและอัลกอริทึมตามเอกสารหลัก ห้ามสุ่มชื่อสกิลแล้วให้ความสามารถเหมือนกันหมด
6. ภาษาเกมหลัก: **ไทย** (UTF-8); ฟอนต์ไทยอ่านง่าย; หลีกเลี่ยง UI ที่เบียดตัวอักษร และพัฒนาข้อความอธิบายให้เป็นภาษาไทยธรรมชาติ
7. **เน้นเล่นได้ 3 กลุ่มเท่านั้น**: โทรศัพท์ iOS/Android ผ่าน Safari/Chrome, iPad ผ่าน Safari/Chrome และคอมพิวเตอร์ผ่าน Chrome/Edge/Firefox/Safari; Portrait และ Landscape ต้องใช้งานได้ตามสเปก; ห้ามทำเป็นเกมที่บังคับหมุนมือถือ
8. เป็น **Static Web Game** โฮสต์ GitHub Pages ได้ ไม่มี Backend ที่ต้องจ่ายเงิน ไม่มี client-side API key ไม่มีบัญชีภายนอกจำเป็นต้องสมัครเพื่อเล่น ไม่มีการพึ่งเซิร์ฟเวอร์ AI ณ เวลาเล่น
9. Storytelling AI เป็นฟีเจอร์ **เสริมโดยสมัครใจ** เท่านั้น หลังเกมพื้นฐานเสถียร ต้องมี deterministic story engine และข้อความ fallback ที่เล่นได้ 100% โดยไม่เปิด AI
10. ถ้า repository มีงานเดิม ให้ตรวจสถานะและสำรองก่อนเสมอ **ห้ามลบงานของเจ้าของ ห้าม force push ห้ามลบ repository หรือรีเซ็ตประวัติโดยไม่ได้รับคำสั่ง**
11. ห้ามคัดลอก sprite, music, map, UI, พล็อต หรือ asset ที่มีลิขสิทธิ์ของเกมอื่นมาใช้โดยไม่ได้รับอนุญาต; ใช้ asset ที่สร้างใหม่เอง หรือแหล่งที่ยืนยันสิทธิ์ได้พร้อมบันทึกเครดิต/ใบอนุญาต
12. **ต้องทำงานจริงใน repository** หากมีสิทธิ์; ถ้าไม่มีสิทธิ์ GitHub/ไม่มี environment ให้จัดเตรียม patch/โครงสร้างไฟล์พร้อมแจ้งข้อจำกัดตรง ๆ ห้ามอ้างว่า commit, publish หรือ test สำเร็จหากยังไม่ได้ทำ

## ขั้นตอนปฏิบัติทันที — อย่าหยุดที่การวิเคราะห์

### ขั้น 0: ตรวจบริบทโดยไม่ทำลายข้อมูล
- ตรวจ repository, branch, remote, ไฟล์ และ Git status; ตรวจว่ามีโค้ดของโปรเจกต์ GODSEED อยู่หรือไม่
- ถ้าเป็น repository ว่าง ให้เริ่มใหม่ตามสเปก; ถ้ามีงานเดิม ให้พัฒนาต่อโดยไม่เขียนทับแบบทำลาย
- อ่านไฟล์สถานะ `docs/PROGRESS.md`, `docs/TASK_BOARD.md`, `docs/DECISIONS.md`, `docs/CONTENT_INDEX.md` ถ้ามี
- บันทึกผลการตรวจ repository ลง `docs/PROGRESS.md` และใช้ branch ที่ workflow อนุญาต
- ตรวจสภาพ npm/Node และวิธี build; เลือกเวอร์ชันแพ็กเกจที่ใช้งานได้จริงพร้อม lockfile

### ขั้น 1: สร้างโครงสร้างโปรเจกต์ใช้งานได้
- สร้าง Vite + TypeScript + Phaser 4 (เลือก release เสถียรที่ตรวจเอกสารแล้ว; ณ 5 พ.ย. 2026 มี v4.2.1 แต่ให้ตรวจตอนลงมืออีกครั้ง)
- สร้างระบบ TypeScript strict, ESLint, Vitest, Playwright, asset manifest, schema validation, deterministic RNG, state machine และระบบบันทึกเซฟ
- สร้างหน้าเริ่มเกม, ตั้งค่า, โหลดเกม, สมุดเวท, ตัวเลือกเนื้อเรื่อง, หน้าผสมเวท, หน้าต่อสู้ และ UI ตาม responsive specs
- ป้องกันการ hardcode absolute asset path ใช้ Vite `import.meta.env.BASE_URL` / path ที่รองรับ repo subpath
- สร้าง `.github/workflows/ci.yml` และ `deploy.yml` พร้อม permission เท่าที่จำเป็นสำหรับ Pages

### ขั้น 2: สร้าง Vertical Slice ที่เล่นจบได้
**ห้ามใช้การสร้างเมนูเปล่า ๆ เป็นข้ออ้างว่าเสร็จ** ต้องเล่นจาก Start → เรื่องราว → เก็บไอเทม → ผสมเวท → ต่อสู้ → ผลลัพธ์จบบทแรกได้จริง
- ใช้ Canon, Scene ID, Choice ID, NPC, flag, rewards, animation cues และ combat encounter จากสเปกหลัก
- พัฒนา Visual Quality Gate ก่อนเพิ่มเนื้อหาปริมาณมาก: ฉากที่มีชีวิตอย่างน้อย 3 ฉาก, Sprite animations, VFX จริง, สีสม่ำเสมอ
- ทำกลไกผสมเวทที่รองรับสูตรทั้งหมดโดยระบบคำนวณ (ไม่จำเป็นต้องให้ผู้เล่นมีวัตถุดิบครบทุกสูตรตั้งแต่บทแรก)
- ยืนยันว่าเนื้อเรื่องแบบ branching สามารถเข้าใจง่ายและทุกฉากมีทางออก; ห้าม dead end ที่ล็อกผู้เล่น

### ขั้น 3: ตรวจสอบและเผยแพร่เท่าที่สิทธิ์อนุญาต
- รัน `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, และ `npm run test:e2e` (ถ้าสภาพแวดล้อมรองรับ)
- รายงานหลักฐานจริงของแต่ละการทดสอบ และเหตุผลหากรันไม่ได้; ห้ามเขียนว่า “ผ่าน” โดยไม่รัน
- ทดสอบ viewport โทรศัพท์ 360×800 และ 390×844, iPad 768×1024 และ 1024×768, desktop 1366×768 และ 1920×1080 รวม pointer/touch/keyboard
- ตรวจ safe area, ตัวหนังสือไทย, เสียงที่เริ่มได้หลังผู้ใช้กด, asset 404, responsive, save/reload, formula seed reproducibility
- ตั้งค่า GitHub Pages ด้วย Actions; ถ้าต้องให้เจ้าของเปิด Settings → Pages ให้เขียนขั้นตอนสั้นมากที่ทำจากโทรศัพท์ได้ ไม่สร้างเรื่องว่าคลิกให้แล้ว
- หากผลยังไม่ถึงเกณฑ์ ให้ซ่อมจนผ่านก่อนเนื้อหาเพิ่มเติม

## สิ่งที่ต้องสร้างใน repository

```
GODSEED/
├─ index.html
├─ package.json / package-lock.json
├─ vite.config.ts / tsconfig.json
├─ public/
│  ├─ manifest.webmanifest
│  ├─ icons/
│  └─ assets/ (sprites, atlas, tiles, vfx, ui, audio เฉพาะที่มีสิทธิ์)
├─ src/
│  ├─ main.ts
│  ├─ app/ (bootstrap, lifecycle, routing, responsive)
│  ├─ engine/ (rng, rules, event bus, save, state machine, validation)
│  ├─ scenes/ (Phaser game scenes, stage renderer, scene director)
│  ├─ systems/ (choices, story, spellbook, crafting, combat, inventory, npc memory, travel)
│  ├─ content/ (scene graphs, NPC, items, recipes, enemy data, Thai dialogues)
│  ├─ ui/ (accessible HTML overlay, touch controls, panels, themes)
│  ├─ assets/ (source generators and approved art definitions)
│  └─ styles/
├─ scripts/ (generation and validation)
├─ tests/ (unit + integration + E2E)
├─ docs/
│  ├─ PROGRESS.md
│  ├─ TASK_BOARD.md
│  ├─ DECISIONS.md
│  ├─ CONTENT_INDEX.md
│  ├─ ART_BIBLE.md
│  ├─ QA_MATRIX.md
│  └─ RELEASE_NOTES.md
└─ .github/workflows/ (ci.yml, deploy.yml)
```

โครงสร้างย่อยปรับได้เมื่อมีเหตุผลด้านเทคนิค แต่ห้ามขาดการแบ่ง Engine / Systems / Content / UI / Tests / Docs

## รูปแบบการทำงานสำหรับแต่ละรอบ

1. อ่านสเปก → ตรวจงานจริง → เขียน/อัปเดตงานใน TASK_BOARD → ลงมือทำชิ้นงานเล็กที่ **จบได้ภายในรอบนั้น** → ทดสอบ → commit/เสนอ PR เท่าที่สิทธิ์อนุญาต
2. บันทึกไฟล์ `docs/PROGRESS.md` เป็นประจำ: สิ่งที่ทำจริง, สิ่งที่ยังขาด, ปัญหา, ขั้นตอนถัดไป, commit hash/PR ถ้ามี
3. ท้ายรอบตอบเป็นภาษาไทย กระชับแต่ตรวจสอบได้:
   - **สร้าง/แก้อะไร** (อ้าง path)
   - **ตอนนี้เล่นอะไรได้แล้วจริง ๆ**
   - **ผลทดสอบ** (ผ่าน/ไม่ผ่าน/ไม่ได้รัน พร้อมคำสั่ง)
   - **GitHub Pages** (URL จริงถ้าทราบ หรือบอกว่ายังไม่ได้ deploy)
   - **งานถัดไป 3–5 ข้อ** ตาม priority
   - **ข้อจำกัดหรือสิ่งที่เจ้าของต้องกดเองจากมือถือ** เท่านั้น
4. เมื่อ Codex เสร็จรอบแรกหรือหยุดกลางคัน ให้เจ้าของใช้ไฟล์ `03_CODEX_CONTINUE_FOREVER.md` เพื่อพัฒนาต่อ ห้ามอ้างว่าทำงานได้ไม่จำกัดในหนึ่ง session

## ลำดับพัฒนาแบบบังคับ (ทำก่อน → หลัง)

M0: repo พร้อม Build/CI/Pages → M1: visual slice และฉากทางเลือกที่มีแอนิเมชัน → M2: inventory/crafting/234 สูตร/สมุดเวท → M3: combat/VFX/AI ศัตรู → M4: เนื้อเรื่องบทแรกครบ branching+endings → M5: polish สามอุปกรณ์, save และเสียง → M6: Optional AI storyteller ที่ไม่ทำให้เกมหลักพัง → M7+: ขยายบท เนื้อหา ศิลปะและคุณภาพอย่างมีระบบ

**เงื่อนไขสำเร็จรอบแรก:** ต้องมีอย่างน้อยหนึ่งลูปเกมที่เล่นได้จริงบนเบราว์เซอร์จากเริ่มต้นจนจบเหตุการณ์ และมี Build/Tests/CI ที่รันได้ ถ้าเวลาไม่พอให้ทำ Vertical Slice ที่สมบูรณ์กว่าระบบครึ่ง ๆ กลาง ๆ พร้อมส่งต่อสถานะให้ไฟล์ที่ 3

**เริ่มลงมือเดี๋ยวนี้:** อ่าน `02_GODSEED_MASTER_SPEC.md` ทั้งหมด แล้วทำ M0 → M1 และต่อ M2 ตามทรัพยากรที่มี ห้ามตอบเพียงว่า “พร้อมทำ”
