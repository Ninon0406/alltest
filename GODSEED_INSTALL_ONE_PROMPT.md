# GODSEED — ONE PROMPT TO INSTALL 10 CODEX SKILLS

**วิธีใช้บนโทรศัพท์:** เปิดงาน Codex Cloud ที่เชื่อมกับ GitHub repository ของ GODSEED → คัดลอกหรือแนบข้อความ **ทั้งไฟล์นี้** → ส่งเป็นงานใหม่เพียงครั้งเดียว. ไม่ต้องใช้ Terminal บนโทรศัพท์. หากเคยสร้าง repo skills ให้ Codex audit ก่อนเขียนทับ.

## คำสั่งถึง Codex — EXECUTE, NOT JUST EXPLAIN

คุณกำลังอยู่ใน GitHub repository ของเกม `GODSEED: The World That Remembers`. ผมเป็นเจ้าของโปรเจกต์และสั่งให้ติดตั้ง **สิบ skills เฉพาะโปรเจกต์** ตามมาตรฐาน Codex Agent Skills (`.agents/skills/<name>/SKILL.md`) จาก FILE BLOCKS ด้านล่างนี้

**ลงมือสร้างไฟล์จริง** ตาม path ที่ระบุ โดยคงข้อความ UTF-8 ครบทุกตัวอักษร ไม่สรุป ไม่ย่อ ไม่เขียนเนื้อหาคิดขึ้นแทน. สิ่งนี้เป็นคำสั่งติดตั้ง skills เท่านั้น ไม่ใช่คำสั่งเริ่มสร้างเกมใหม่ ไม่ต้องแก้ไฟล์เกมอื่น เว้นจำเป็นจริงและอนุญาตแล้ว.

ลำดับงานที่ต้องทำ:
1. ตรวจ repository, branch, `git status`, และ existing `.agents/skills` ก่อนทุกอย่าง; ตรวจว่ามี existing skill name ซ้ำหรือไม่; ห้าม force push/rebase/reset ลบข้อมูล.
2. เขียนแต่ละ FILE BLOCK ลง path เป้าหมาย; ถ้ามีไฟล์เดิม ให้เปรียบเทียบ; หากแตกต่างและมีการแก้ไขโดยเจ้าของ **อย่าเขียนทับโดยไม่สำรอง** ให้เสนอ patch หรือ merge ที่ไม่ทำลาย. ถ้าคำสั่งใหม่ชนกับ master spec ให้ยึด master spec และบันทึกปัญหา.
3. ตรวจ YAML frontmatter ของทุก `SKILL.md` ให้มี `name` ตรงชื่อโฟลเดอร์และ `description` แบบ non-empty; ตรวจว่าครบ 10 skills, ไฟล์ไม่ถูกตัด และ UTF-8 อ่านได้.
4. หากมี master spec/คำสั่งเดิม ให้รักษาไฟล์ทั้งหมด; อย่าย้ายหรือลบเอกสาร `01_CODEX_START.md`, `02_GODSEED_MASTER_SPEC.md`, `03_CODEX_CONTINUE_FOREVER.md`. Skills เป็นส่วนเสริม ไม่ใช่สิ่งทดแทน.
5. **ตั้งระบบเรียกสกิลอัตโนมัติด้วย `AGENTS.md`:** ตรวจ `AGENTS.md` ที่ repository root ก่อนเสมอ หากมีอยู่แล้วให้เพิ่มเฉพาะส่วน `GODSEED Skill Routing` แบบสั้นที่ไม่ซ้ำ ไม่ลบกฎเดิม หากไม่มีให้สร้างไฟล์คำแนะนำโครงการแบบสั้น (ประมาณ 20–40 บรรทัด) ตามแนวทางนี้:
   - ก่อนแก้เกม ให้ตรวจไฟล์ master spec และสถานะงานจริงก่อนเสมอ; งานวางระบบ/วางแผนใช้ `godseed-project-director`
   - งานภาพ Pixel Art/แอนิเมชันศิลป์ใช้ `godseed-pixel-art-director`; งานทางเลือกฉากใช้ `godseed-choice-cinematics`
   - งานวัตถุดิบ/การผสมเวทใช้ `godseed-spell-alchemy`; งาน battle/VFX ใช้ `godseed-combat-vfx`
   - งานเขียนเรื่อง/NPC/AI ใช้ `godseed-narrative-memory-ai`; งาน UI สามอุปกรณ์ใช้ `godseed-responsive-accessibility`
   - งานทดสอบใช้ `godseed-qa-automation`; งาน build/deploy ใช้ `godseed-github-pages-delivery`
   - งานพัฒนาต่อ/กู้ความคืบหน้าใช้ `godseed-continuous-development`
   - หากอินเทอร์เฟซ Codex ไม่โหลด skills อัตโนมัติ **ต้องอ่านไฟล์ `.agents/skills/<ชื่อ>/SKILL.md` ที่ตรงกับงานด้วยตนเอง** ก่อนแก้โค้ด
   - โหลดเฉพาะสกิลที่เกี่ยวข้องกับงาน ไม่อ่านทั้งสิบตัวทุกครั้งเพื่อไม่ให้บริบทหนัก; อย่าแก้เนื้อหาเกมในงานติดตั้งสกิล
   - คง `AGENTS.md` สั้น ๆ และโยนรายละเอียดขั้นตอนลง SKILL.md ตามหลัก progressive disclosure
6. เขียน/เพิ่ม `docs/SKILLPACK_INSTALL_REPORT.md` บอกชื่อ 10 skills, paths จริง, verification command & results, `AGENTS.md` routing, status Git, blocker; commit หรือ PR เฉพาะเมื่อมีสิทธิ์/เครื่องมือจริง.
7. ในคำตอบภาษาไทย รายงานว่าเขียนไฟล์ใดสำเร็จ, ยังไม่ได้ทำอะไร, ต้องเริ่ม Codex task ใหม่เพื่อให้ทักษะใหม่ถูกค้นพบหรือไม่. ห้ามอ้างติดตั้งสำเร็จหากแก้ repository ไม่ได้.
8. เมื่อพร้อมใช้งาน ให้ใช้ `$godseed-project-director` เป็นสกิลหลักในการพัฒนา GODSEED และโหลดสกิลเฉพาะส่วนตามงานจริง ไม่จำเป็นต้องอ่านครบสิบตัวทุกงาน. ถ้า Codex Cloud interface ไม่แสดง skill selector ในรอบนี้ ให้อ่านไฟล์ SKILL.md ที่เกี่ยวข้องโดยตรงและทำตามขั้นตอนแทน; ไม่กล่าวอ้างว่าระบบค้นพบ skills แล้ว.

### แนวปฏิบัติสำคัญ
- เน้นโทรศัพท์ iOS/Android, iPad และคอมพิวเตอร์เท่านั้น; ไม่บังคับให้ผมใช้คอมพิวเตอร์
- GODSEED เป็นเกม HD Pixel Art 2D แบบเลือกเหตุการณ์ ตัวละครกระทำตามตัวเลือก ไม่ใช่ Open World; เวท 234 สูตรถูกต้องตามกฎ, Turn-Based combat, AI Storyteller optional, GitHub Pages static
- ถ้าบางส่วนถูกตัดจากข้อความหรือไม่มี permission ให้หยุดก่อนเขียนไฟล์ที่ไม่ครบ และบอกตรง ๆ

## FILE BLOCKS — WRITE EXACTLY, NOT SUMMARY

### BEGIN FILE `.agents/skills/godseed-project-director/SKILL.md`

```markdown
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
```

### END FILE `.agents/skills/godseed-project-director/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-pixel-art-director/SKILL.md`

```markdown
---
name: godseed-pixel-art-director
description: Use when designing, creating, integrating, reviewing, or polishing GODSEED HD pixel art, animated sprites, tilemaps, parallax backgrounds, palette, effects, readability, and visual consistency.
---

# GODSEED Pixel Art Director — ศิลปะไม่แปะรูปกระดาษ

## เป้าหมาย
Pixel Art 2D เอกลักษณ์เดียวกัน ฉากดูมีชีวิต สดใสแต่สบายตา ตัวละครสัมผัสกับพื้นโลกจริง ผ่านการเดิน/แอนิเมชันตาม choice ไม่ใช่รูป PNG ลอยอยู่หน้าฉาก JPEG

## Art bible / เกณฑ์เสนอเพื่อยืนยันกับ master spec
- อ่าน `docs/ART_BIBLE.md` และ master spec ก่อนยึดค่าตัวเลข; หากไม่มีให้เริ่ม reference scene 320×180 หรือ 384×216 logical pixels, ปรับตาม layout/visibility; **ไม่แอบเปลี่ยนค่าเดิม**
- Tile size ใช้ 16 หรือ 32 px ตาม art bible; sprite เก็บขอบคม, scale จำนวนเต็มเท่าที่หน้าจออนุญาต, ไม่บังคับภาพล้น viewport
- Palette หลัก: หยก/เขียวมิ้นต์, เหลืองอุ่น, ลาเวนเดอร์, พีช, น้ำเงินท้องฟ้า; วัตถุมีค่าสีเข้มอ่อนแยก foreground/background
- แนว silhouette ชัด อ่านวัตถุออกในจอเล็ก; ตัวละครแยกจากฉากด้วย contrast/shadow ไม่ใช่ neon outline
- Pixel edges คมสม่ำเสมอ; ห้ามเอารูปวาดความละเอียดสูงมา resize-nearest แล้วเรียกว่า pixel art
- แสงอุ่น แยกฉากโดยเวลา/อากาศ; จำกัด bloom, shake, flashes; รองรับ reduce motion
- วัสดุเดียวกันใช้สี/texture language เดียวกัน ห้ามปะติดปะต่อ asset หลายสไตล์จนหลุดธีม

## Pipeline งานภาพ
1. อ่าน scene list, mood, layers, action cues แล้วทำ asset checklist (tile, prop, sprite, animation, UI, foreground, VFX)
2. สร้าง **original assets** โดยเครื่องมือที่มี (code-generated pixel textures, pixel tools, authorized art assets); หากระบบสร้างภาพไม่พร้อมให้ทำ procedural prototype ที่รู้ข้อจำกัด ไม่อ้างว่า finished art
3. สร้าง atlas/manifest จดขนาดช่องและ animation names พร้อม origin points, collider/ground shadow anchors
4. แบ่ง scene 5–7 ชั้นได้ตามความจำเป็น: far background, midground, ground tiles, structures, interactive props, actors, foreground/atmosphere
5. ใช้ depth sorting ตามตำแหน่งเท้า (Y-sort) เฉพาะที่มีการซ้อนวัตถุ และมี contact shadow/landing cues
6. ฉากไม่หยุดนิ่งทั้งหมด: ใบไม้/หญ้า/ลำธาร/ไฟ/เมฆ และ NPC idle loop แบบจำกัดต้นทุนประมวลผล
7. สร้าง screenshots จาก runtime จริงแล้วตรวจใน viewport phone portrait, iPad, desktop; ห้ามให้ AI ประเมินจากโค้ดเท่านั้น
8. เก็บ asset source, attribution, licenses ใน `docs/ASSET_LICENSES.md`; ไม่มีสิทธิ์ชัดเจน = ไม่รวมไฟล์

## Phaser implementation
- ตรวจ Phaser รุ่นที่ติดตั้งก่อนใช้ API; ตั้ง `pixelArt: true` หรือการกำหนด texture nearest ตาม renderer ที่มีจริง
- ตรวจ `roundPixels` และใช้ integer positioning เมื่อเหมาะกับ logical grid
- ถ้า Canvas scale fractional จนพิกเซลดูไม่คม ให้ทดสอบ scale strategies ตาม device ไม่ใช่ disable responsive
- Sprite animations ที่ต้องมีสำหรับ action library ขั้นต้น: idle, walk, interact, pickup, talk, cast, hit/react, cheer, rest; fallback to shared animation ที่คงเจตนาของ choice
- แอนิเมชันควรมีเวลาและ timing consistent; ขั้นตอนพิเศษควรสร้าง shot list (ก่อน/ขณะ/หลัง)

## ห้ามทำ
- ภาพหน้าจอจากเกมมีลิขสิทธิ์, trace sprite, ใช้ชื่อร้าน asset ที่ไม่ได้ตรวจ license
- รีใช้ sprite sheet อันเดียวเปลี่ยนเพียง hue แล้วอ้างว่าเป็นมอนสเตอร์ทุกชนิด
- เอฟเฟกต์ทั้งหน้าจอตลอดเวลา/กระพริบแรง ไม่พิจารณาคนไวต่อแสง
- ประกาศ 'สวยแล้ว' โดยไม่มี screenshot หรือ visual review

## Quality gate
ใน 3 ฉากขั้นต่ำ: ตัวละครยืนและเดินไม่ลอย, depth ถูก, pixel edges ชัด, touch choices อ่านได้, มี ambient animation, UI ไม่ทับบท, contrast เหมาะ, ไม่มี asset missing. บันทึก path screenshots และ defect list พร้อมแก้ก่อนขยายแผนที่
```

### END FILE `.agents/skills/godseed-pixel-art-director/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-choice-cinematics/SKILL.md`

```markdown
---
name: godseed-choice-cinematics
description: Use when implementing GODSEED branching narrative choices, automatic character action animation, staging, scene transitions, flags, consequences, and reachable scene graph validation; not for free-roaming controls.
---

# GODSEED Choice-to-Cinematic Engine

## Design contract
ผู้เล่นเลือกการกระทำจากเมนู → lock input → schedule animation beats → apply validated gameplay event once → set flags/items/trust/time → transition/reveal next choices → unlock input. ไม่มีเดินอิสระ ไม่ใช้ visual cut ที่ไม่แสดงการกระทำเมื่อฉากรองรับได้

## Data shape (ปรับชนิดให้เข้ากับโค้ดจริง)
```
ChoiceNode {
 id: ChoiceId; labelTh: string; prerequisites: Condition[];
 action: {actorId, cue, targetId?, pathId?, beats?: TimelineBeat[]};
 costs?: Cost[]; effects: TypedEffect[];
 next: SceneId | ConditionalTransition[];
 fallback?: SceneId;
}
```
แยก `id` กับข้อความไทย; labels ใช้สำหรับ UI อย่างเดียว; logic ใช้ typed IDs และ effect schema. ใช้ `choiceId` stable เพื่อ save migration. อย่าเปลี่ยน IDs โดยไม่มี migration

## Execution ที่ต้อง atomic
1. List enabled options จาก pure conditions (`flags`, inventory, time, trust); show disabled with readable reason หากความชัดเจนเอื้อ
2. เมื่อกด ตรวจ conditions/available costs ซ้ำ; ป้องกัน double-tap และ concurrent execution
3. Snapshot หรือ checkpoint ที่เพียงพอสำหรับ recovery; commit effects หนึ่งครั้งด้วย event ID/idempotency
4. Action director เล่น timeline ตาม `walk → interact → reaction → camera → result` ยืดหยุ่นตาม shot; skip animation ต้องนำไปสู่ state เดียวกัน
5. เกมไม่ควรเปลี่ยน state ก่อนเฟรมที่สื่อว่ากระทำแล้วถ้าไม่ตั้งใจ; display first meaningful feedback
6. หาก animation asset ขาด ให้ fallback ที่ยังอ่านรู้เรื่อง (move/gesture + captions) และ log warning, ไม่ deadlock
7. Next scene must exist; handle branching / retry; save restores a stable scene boundary (ไม่ค้างระหว่าง action)

## Storytelling rhythm
- 1–3 choices ที่แตกต่างจริงในแต่ละช่วง; เพิ่มเมื่อมีเนื้อหา ไม่ยัดปุ่มล้นจอ
- เลือกแต่ละทางให้มีหนึ่งใน: item, trust, knowledge, location, time, combat setup, journal, world visual consequence; ไม่ให้ทุกทางไปต่อเนื้อหาเดียวกันโดยไม่จดจำ
- 50% narrative/choices กับ 50% craft/battle เป็นเป้าหมายเล่นจริง ไม่ใช่นับจำนวนข้อความ
- เส้นทางทุกแบบต้องมีบทสรุปหรือเส้นทางกลับ; hint สถานที่ลับด้วย clues ที่อ่านรู้เรื่อง
- สร้างช่วงเงียบแสดงภาพและอารมณ์ได้ แต่ต้อง skip/fast-forward ได้

## Automated validation
- Check unique SceneID/ChoiceID, every referenced target exists, no unreachable mandatory scene, no deadend without explicit ending
- Enumerate representative paths from opening through item, crafting, boss, endings
- Property test: prerequisites satisfied before cost, effect once only, no negative inventory, repeat click not duplicated
- Test changing locale/layout does not affect logic; keyboard/tab/touch act the same
- Journal reflects the consequences (narrative facts authoritative from engine)

## Art/action integration
Every choice must map to cue(s) available in action library; author test verifies cue existence and valid target anchors. Scene staging uses actor positions/path waypoints and depth; do not automate free-roam A* for authored short scenes unless needed
```

### END FILE `.agents/skills/godseed-choice-cinematics/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-spell-alchemy/SKILL.md`

```markdown
---
name: godseed-spell-alchemy
description: Use for GODSEED ingredient collection, rune recipes, legal spell combinations, deterministic crafting, spellbook discovery, equipment slots, progression, and recipe validation; enforce the canonical formula rules.
---

# GODSEED Spell Alchemy — กฎเวท 234 สูตร

## ข้อเท็จจริงที่ต้องรักษา
ต้นแบบระบุ 8 cores × 6 forms × 7 modifiers = 336 combinations ก่อนกรอง; rule-set ตาม master spec อนุญาต 234 สูตร (ไม่ใช่ทุก combination ถูกกฎหมาย). **ห้ามเดากฎ filtering**: อ่านตาราง/logic ใน master spec แล้วเขียน implementation + independent verifier. ถ้าสเปกหรือจำนวนจริงไม่ตรง ให้บันทึก discrepancy และแก้ด้วย tests ไม่แก้ตัวเลขโดยเงียบ

## Typed schema
```
Ingredient { id; tags[]; rarity; sourceIds[]; inventoryMax? }
Rune { id; category: 'core'|'form'|'modifier'; unlockCondition; descriptionTh }
SpellRecipe { key: string; coreId; formId; modifierId; valid: true }
SpellDefinition { id; nameTh; damageType; targetPattern; cost; effects[]; vfx: VfxDescriptor; storyTags[] }
```
แยกวัตถุดิบ raw item จาก rune component ที่ปลดล็อก; ห้ามสูญเสียสูตรที่ค้นพบเพราะวัสดุหมดเว้น master spec ระบุแบบอื่น

## Build the engine
1. อ่าน source of truth แล้วสร้าง canonical arrays/typed enums, compatibility predicate
2. Enumerate legal combos แบบ deterministic; serialize key แน่นอน (`core/form/mod`) และ sorted output
3. Prevent duplicates in spellbook; IDs stable across saves (migration หากจำเป็น)
4. Ingredient acquisition จาก explicit scene/choice rewards: ให้ player รู้เหตุและจุดที่หาได้ ไม่ random-drop ล้วน
5. Crafting: preview components → validate ownership & compatibility → show reason → consume costs atomically → discover spell once → journal update
6. Equip 4 slots: swap/replace, prevent invalid/duplicate equip if ruled, persist through save/reload
7. Separate recipe definition from combat execution: combat reads spell stats and VFX descriptor; story queries `spell.storyTags`
8. Signature spells เฉพาะเนื้อเรื่องกำหนดด้วย explicit overrides keyed by legal combo; overrides must remain deterministic

## Generator of outcomes
Spell strength = base core contribution + form area/target profile + modifier property + progression + conditional reactions, subject to bounds; calculate in pure function, never `Math.random()` hidden in rendering. Combat RNG uses seeded stream stored in state; VFX random can use independent cosmetic seed

## Tests mandatory
- 336 candidate combos; 234 legal according to canonical spec; no duplicate keys
- 100% legal recipes have nameTh, descriptionTh, cost, effects, vfx descriptors and meaningful differences by form/mod
- Invalid recipes explain why, never consume items
- Discover once / craft retry / save migration / equip slot constraints
- Verify reachable ingredient sources for required story spells; starter path doesn't trap progress
- Spell story-tags allow meaningful non-combat choices

## Anti-patterns
Do not manually type 234 nearly identical spells; do not fake content count; do not hide mismatched formula total; do not make every skill the same particle effect with only color replaced
```

### END FILE `.agents/skills/godseed-spell-alchemy/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-combat-vfx/SKILL.md`

```markdown
---
name: godseed-combat-vfx
description: Use for GODSEED turn-based combat rules, battle state machines, enemy intents, target selection, status effects, spell particles, composition-based visual effects, and battle acceptance tests.
---

# GODSEED Turn-Based Combat + Procedural Spell VFX

## Battle state machine
`ENTER → PLAYER_SELECT → VALIDATE_ACTION → CAST_ANIMATION → APPLY_EFFECTS → RESOLVE_STATUS → CHECK_END → ENEMY_INTENT/ACT → RESOLVE_STATUS → CHECK_END → PLAYER_SELECT → EXIT`
Transitions are explicit, one active action at a time, no asynchronous race/double cast. Don't couple battle logic to Phaser animation frames. VFX can complete/skip without changing game outcome.

## Player choices
- Four equipped spell slots; visible MP cost, target, cooldown/status, disabled reason
- `ITEM`, `GUARD`, `ESCAPE` and `SURRENDER` only when battle encounter allows; forbidden actions must explain reason instead of looking clickable
- Spell effects must actually execute: damage/heal/shield/status, target rules, reactions and resource spending
- Battle enemy readable health/status and telegraphed intent whenever fair; avoid excessive screen shake
- Defeat path meaningful and recoverable according to chapter design; avoid permanent dead end without owner instruction

## Balancing model
Represent damage/heal/cost/reactions via typed pure functions; use bounded numbers and invariant checks: 0≤HP≤maxHP, 0≤MP≤maxMP, guard status, no negative cost. Seeded combat RNG in state for deterministic replay. Don't claim balanced without encounter simulations with logged results.

## VFX grammar
Define `VfxDescriptor` generated from legal recipe:
```
{ core: palette/texture/emitter; form: orb|beam|ring|rain|...;
  modifier: split|home|shield|heal|...;
  intensityTier; durationMs; reducedMotionVariant }
```
Each combination maps to **structurally distinct** effect: shape, trajectory, spawning, timing and contact event, not only hue. Compose from reusable particles/geometry; cache atlases and pools, cap particle count per hardware tier. Sprite animation, hit reaction, status icon and short result captions reinforce readability.

## Render stages per cast
`charge (0.2–0.6s) → travel/shape → impact → resolved status → UI numbers → end`; duration tunable and skip safe. Respect `prefers-reduced-motion`, sound toggle, low-power visual presets. Light effects must not flash rapidly; saturated effect is short and locally focused.

## Enemy AI behavior
Not generative LLM: deterministic weighted intent tables conditioned on HP/status/player action/history. 3 initial enemy archetypes + boss in chapter one, each with at least one distinct decision rule, counterplay clue, and attack cue.

## Quality gates
- Player can reach battle, cast each starter spell, guard, item, escape where allowed, and return to story
- Every legal spell generates syntactically valid VFX descriptor; catalog/render sample spells across all cores/forms/modifiers
- No stuck overlay/animation lock after `skip`, loss, resize, tab background/foreground
- Battle tests prove valid turn order, MP constraints, heal caps, status expiry, RNG reproduction, win/loss/escape outcomes
- Record real in-browser screenshots/video if tooling allows and label unverified hardware testing honestly
```

### END FILE `.agents/skills/godseed-combat-vfx/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-narrative-memory-ai/SKILL.md`

```markdown
---
name: godseed-narrative-memory-ai
description: Use for GODSEED Thai story content, choice consequences, NPC memories, world continuity, optional local AI storyteller, dialogue validation, and non-AI fallback text generation.
---

# GODSEED Narrative + Memory + Optional AI

## Narrative identity
World remembers meaningful actions. First chapter lore and all NPC/quest facts follow master spec; do not replace plot or invent new canon contradictory to `CH1` and `NPC_LUMI`, `NPC_MAREN`, `NPC_EIRA`, `NPC_KORO`, `NPC_PIP`, `NPC_SENTINEL`. Major motifs: the forgotten village song, music box, memory echoes, investigation, empathy, and consequences. Keep fantasy adventure approachable and non-graphic.

## Two-layer system
1. **Truth layer** = deterministic content graph + event log + state flags + item ledger + NPC trust and memories; solely engine can mutate state
2. **Expression layer** = Thai lines, contextual descriptions, NPC mood variation; AI, if enabled, gets a sanitized snapshot and returns only **candidate text**

## Context contract
Send to narrative renderer: `sceneId, actorId, relevantFlags, lastImportantEvents[], relationshipLevel, timeOfDay, tone, allowedFacts[], forbiddenClaims[], maxChars`. No private info; don't use unbounded chat histories. Returned JSON (when applicable): `{lineTh, mood, referencedEventIds[]}`; schema validate and confirm all referenced event IDs exist. Invalid output → authored fallback.

## Offline first
- A curated library of authored Thai lines and template variation must carry entire chapter without any AI/network
- Optional local model may be requested after core game starts; lazy load + progress + cancellation + memory/time budget; no blocking game loop
- No secret API key in frontend; no remote service required to finish game
- Verify Thai generation quality empirically before shipping; if poor, disable generative mode on unsupported devices and use deterministic variation
- If model requires online download, say that initial download needs internet; provide an option to delete cached model to save storage

## NPC Memory
Store compact, typed fact tags and a few event references rather than verbatim full chat: `factId, who, sourceChoiceId, when, significance, sharedWith[]`. NPC speech may vary by known facts and trust; AI cannot invent that someone remembers a non-occurring event. All world mutations go through validated choice/combat reducers.

## Content writing specification
- Thai natural, short paragraphs, plain words, no forced melodrama
- Three sorts of beats: 1) light adventurous humor 2) mystery/clues 3) emotional payoff
- Each choice clearly states intent, not guaranteed outcome; neither branch is a fake correct answer
- Choices change facts/trust/resources/knowledge or visible consequences; ensure both joyful and suspenseful sequences
- Log bilingual ID, Thai line, tone, max length, action cue, preconditions, resulting event IDs for localization and tests

## Tests / evaluation
- Run game with AI disabled and no network after assets cached: same story progression
- Fuzz invalid model output, timeout, memory pressure, unsupported browser, returned English gibberish, contradictory facts
- UI test 360px width with Thai glyphs, dialogue skipping and reading pace
- No new AI result should alter quests, inventory, HP, MP, NPC memory or outcomes
```

### END FILE `.agents/skills/godseed-narrative-memory-ai/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-responsive-accessibility/SKILL.md`

```markdown
---
name: godseed-responsive-accessibility
description: Use for GODSEED responsive web-game UI, touch accessibility, iPhone/Android phone, iPad portrait/landscape, desktop mouse/keyboard, Thai text layout, reduced motion, and performance tuning.
---

# GODSEED 3-Platform UX — phone / iPad / desktop

## Scope and hierarchy
Only required device families: **phones (iOS/Android), iPad, desktop/laptop browsers**. Owner uses phone to operate Codex; player can use any of the three. Do not demand a desktop authoring workflow. No forced device rotation and no tiny desktop-style UI on mobile.

## Must support
Phone: 360×800, 390×844, 430×932 portrait; 844×390 landscape. iPad: 768×1024, 820×1180 portrait; 1024×768 landscape. Desktop: 1366×768, 1440×900, 1920×1080. Real devices may differ; design fluid rather than exact fixed viewport mocks.

## Input principles
- Choice-driven gameplay: tap/click on visible choices; no virtual joystick or WASD game loop
- Selection/confirmation reachable by touch and keyboard; mouse hover optional bonus, never sole cue
- Tap targets at least ~44 CSS px in primary UI when practical; touch `pointerup` debounced to avoid double event
- Buttons `disabled` with reasons; focus management on modal/open/close; escape/back navigation only if safe
- Distinguish screen coordinates from game logical coordinates; account for device pixel ratio and safe areas

## Layout
- Game scene uses aspect-aware camera; letterbox intelligently rather than stretch pixels; scroll narrative text in accessible DOM overlay when needed
- Choices dock below scene on phones with room for Thai lines; on iPad/desktop use adaptive layout to avoid covering key actors
- Never place critical UI under notch/home indicator; CSS `env(safe-area-inset-*)` with fallback
- Numeric status visible (HP/MP/items) with strong contrast, icons labeled; avoid reliance on red/green alone
- Text controls: adjustable speed, skip animation, readable Thai font and line-height, contrast; do not truncate critical story choices

## Accessibility and comfort
- Honor `prefers-reduced-motion`; disable large camera shakes/flash effects and provide a settings toggle
- Sound mute and independent SFX/music levels; autoplay audio requires first user interaction
- Touch and game UI usable without audio; subtitle/caption for meaningful cues
- Focusable semantics for key actions, ARIA status updates for changes, no keyboard traps
- No dark overlay that makes vivid pixel art look muddy; ensure visual hierarchy via restrained palette

## Performance
- Prioritize fast startup and low memory phones; texture atlas, asset lazy-loading by chapter, particle budgets, bounded caches
- Profiles: Low/Medium/High based on measurements and settings; do not auto force High on iPad or Low on every phone
- Avoid high-frequency react/state rerenders around Phaser canvas; isolate DOM overlays
- Pause/limit animations when tab hidden; restore state/scene timing safely; handle orientation and dynamic viewport changes
- Measure frame consistency, scene load and memory proxies; report device emulator vs hardware separately

## Acceptance matrix
At every milestone test choices visible, touch can tap all actions, modal exits, no horizontal scroll, art not distorted, Thai text fits, spellbook crafting/equip usable, battle targets selectable, save resume consistent across phone/iPad/desktop. Use Playwright phone/tablet presets or explicit viewports; Playwright emulation is **not** real iPhone/iPad Safari hardware test—request owner’s manual check when necessary
```

### END FILE `.agents/skills/godseed-responsive-accessibility/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-qa-automation/SKILL.md`

```markdown
---
name: godseed-qa-automation
description: Use for GODSEED unit tests, content graph validation, deterministic simulation tests, Playwright phone-iPad-desktop E2E, quality gates, regression triage, and truthful build reports.
---

# GODSEED QA & Testing — อย่าอ้างว่าผ่านถ้ายังไม่ทดสอบ

## Test pyramid
- Pure engine Vitest: RNG/replay, inventory/cost idempotency, legal recipe enumerator, spell effects, battle state transitions, save migrations
- Content validation: Scene ID/Choice ID uniqueness, all transitions resolve, action cues exist, NPC references exist, required item sources reachable, endings reachable
- Integration: choice→animation→state→next scene; explore→ingredient→craft→equip→battle→return; save/reload preserves flags and spells
- E2E (Playwright): real browser interactions and screenshot baselines across phone/iPad/desktop screen configurations

## Commands to run (adapt to package scripts)
```
npm ci
npm run typecheck
npm run lint
npm run validate:content
npm test
npm run build
npm run test:e2e
```
If a command does not exist, add appropriate script or report clearly; do not mark skipped as passed. Document any test environment limitations.

## Critical invariants
- No duplicate SceneID/ChoiceID; no non-ending deadlocks; no invalid prereq cost or repeat tapping duplication
- 8×6×7 possible recipes; assert 234 legal by canonical rules, all legal craftable if ingredients available
- Saving schema versioned; old saves either migrate or fall back safely without losing progress silently
- Battle never drops below 0 HP/MP or deadlocks after animation skip; outcome path exists and is correct
- AI optional off must still complete chapter; no API secrets bundled
- Assets resolve with GH Pages repo path and Vite `base`; browser console clean of critical errors

## Device tests
Phone 360×800/390×844/430×932/844×390; iPad 768×1024/820×1180/1024×768; desktop 1366×768/1440×900/1920×1080. Check click/tap keyboard accessibility and no clipped action buttons. Prefer screenshot diff review, but update baselines only after confirming expected design changes.

## Regression protocol
1. Reproduce defect; add failing regression test where reasonable
2. Fix root cause, not disable/skips tests
3. Verify targeted test then full relevant suite
4. Capture `PASS/FAIL/SKIPPED` and command, summary and important warnings
5. Mark test coverage gaps honestly; never invent emulator/hardware QA

## Reports
Update `docs/QA_MATRIX.md` with device/browser/emulation, date, build commit, test action/result/evidence, known issues. Prioritize: P0 crash/corrupted save; P1 broken playable loop/controls; P2 readability/balance/perf; P3 polish. Do not hide failing gates behind feature count
```

### END FILE `.agents/skills/godseed-qa-automation/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-github-pages-delivery/SKILL.md`

```markdown
---
name: godseed-github-pages-delivery
description: Use to configure or repair GODSEED GitHub Pages deployment, Vite repository base path, GitHub Actions CI and Pages workflow, asset URLs, mobile-only owner setup, and release verification.
---

# GODSEED GitHub Pages Delivery

## Constraint
Publish static game from repository as HTML/CSS/JS/assets, no mandatory private backend or paid API. Owner operates through iPhone/mobile browser and may approve GitHub Settings; don't ask owner to run local terminal/Studio/VS Code.

## Vite base path correctness
- Verify actual deployment: `https://OWNER.github.io/REPO/` requires `base: '/REPO/'`; user/org root or custom domain normally `/`
- Prefer deriving config from repository/CI context when safe; use `import.meta.env.BASE_URL` for assets; never write `/assets/foo.png` hardcoded under project Pages
- Test built `dist` in repo subpath simulation and inspect 404/console
- PWA manifest/service worker scopes must stay within base path; offline is enhancement, not reason to break first-load

## GitHub Actions workflow
- CI: checkout, setup Node LTS supported by packages, `npm ci`, typecheck, lint, unit tests, content validator, build; E2E if runner setup allows
- Pages: `actions/configure-pages`, `actions/upload-pages-artifact` using `dist/`, `actions/deploy-pages`; declare `contents: read`, `pages: write`, `id-token: write` for deploy job; configure `github-pages` environment
- Verify official GitHub docs if versions/actions change; do not invent tool access or statuses
- Prevent deployment on failing build/test; push to approved branch according to actual repository rules

## Mobile owner workflow
1. Codex makes/updates files and commits/PR only with granted GitHub access
2. Owner reviews PR and CI in GitHub mobile browser/app
3. If GitHub Pages is not enabled, owner selects Settings → Pages → Source = GitHub Actions from mobile browser if available; give exact minimal steps
4. Visit **verified** URL and test on phone; if iPad/desktop not available, record untested real hardware honestly
5. Continue development with `03_CODEX_CONTINUE_FOREVER.md` and repository change log

## Security / permissions
Never solicit passwords or personal access tokens in chat; do not expose secrets in repository frontend. No force push, delete repo, unreviewed destructive migrations. Store attribution for all art/font/sound assets and check their licenses. If no repository permission, provide patch and instructions instead of claiming deployed.

## Release proof
Record commit hash, workflow run URL if actually available, actual Pages URL when verified, build output, version, smoke-test results (start→choice→craft→battle→end), Known Issues. A green Actions icon alone is not proof the game plays correctly
```

### END FILE `.agents/skills/godseed-github-pages-delivery/SKILL.md`

### BEGIN FILE `.agents/skills/godseed-continuous-development/SKILL.md`

```markdown
---
name: godseed-continuous-development
description: Use when GODSEED Codex work was interrupted, a sprint finished, the user says continue, a bug needs repair, or a mature build needs a new useful improvement without overwriting previous work.
---

# GODSEED Continue & Recover — เปิดไฟล์นี้ซ้ำได้หลายรอบ

## Principle
A new Codex session = one bounded useful batch; skills cannot run indefinitely in background. Repetition of continue prompt must advance from repo state, not re-do roadmap from memory. The user can override priorities by latest message.

## Recovery loop
1. Inspect `git status`, branch, latest commit, current files and package scripts
2. Read actual repo: master spec (`docs/GODSEED_MASTER_SPEC.md`), `03_CODEX_CONTINUE_FOREVER.md`, `docs/PROGRESS.md`, `docs/TASK_BOARD.md`, `docs/DECISIONS.md`, `docs/QA_MATRIX.md`
3. Determine current playable path, actual scene/choice/item/enemy/recipe counts from source; never copy previous claimed numbers
4. Re-run smallest relevant tests; identify failures and unfinished edits
5. Select a 2–5 task batch: P0 defects → P1 gameplay blockers → P2 art/UX/performance → P3 narrative/skills/AI expansions
6. Implement and test changes, preserving earlier features and save compatibility
7. Update progress and planned next tasks with verification evidence; use commit/PR only with permission

## Definition of improvement after first release
- Improve retention through content quality, varied fair strategies and heartwarming payoff, not coercive timers, pay-to-win, FOMO or dark patterns
- Increase story depth using flags, NPC trust, unique action cues; add reachable branches not repeated filler
- Deepen alchemy within canonical rules; do not silently increase legal count from 234
- Expand original assets/VFX if quality remains consistent; monitor performance
- Add small AI storytelling only after deterministic fallback robust
- Re-check mobile/iPad/desktop after every significant UX or rendering change

## Stop conditions
End a session when a coherent batch is implemented and verified or when blocked by permissions/resources/constraints; do not promise asynchronous continuation. If a next batch can be done in the same active session, proceed according to user request and tool limits, but always leave clean documentation.

## Output contract (Thai)
```
รอบนี้ทำอะไร: ... (path/commit)
ตอนนี้เล่นได้ถึงไหน: ... (verified flow)
ผลทดสอบ: ... (actual commands and PASS/FAIL/SKIP)
ภาพ/ความลื่น 3 อุปกรณ์: phone / iPad / desktop, real vs emulated
สถานะ GitHub Pages: URL checked / awaiting approval / not published
ปัญหาค้าง: ...
งานที่ควรทำรอบถัดไป: ... 1-3 tasks
```
Do not claim project finished forever; practical backlog and owner decisions control scope
```

### END FILE `.agents/skills/godseed-continuous-development/SKILL.md`

## FINAL VALIDATION

After materialization, check exactly these folders exist and their SKILL.md frontmatter passes:
- `.agents/skills/godseed-project-director/SKILL.md`
- `.agents/skills/godseed-pixel-art-director/SKILL.md`
- `.agents/skills/godseed-choice-cinematics/SKILL.md`
- `.agents/skills/godseed-spell-alchemy/SKILL.md`
- `.agents/skills/godseed-combat-vfx/SKILL.md`
- `.agents/skills/godseed-narrative-memory-ai/SKILL.md`
- `.agents/skills/godseed-responsive-accessibility/SKILL.md`
- `.agents/skills/godseed-qa-automation/SKILL.md`
- `.agents/skills/godseed-github-pages-delivery/SKILL.md`
- `.agents/skills/godseed-continuous-development/SKILL.md`

Then answer in Thai, referencing actual git paths and any commit/PR proof. If skills are not discoverable in current Codex session, start a **new Codex task**; don't pretend this means model weights were retrained.
