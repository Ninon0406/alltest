# GODSEED: THE WORLD THAT REMEMBERS
## MASTER GAME DESIGN + TECHNICAL + NARRATIVE + ART + QA SPECIFICATION
**Specification ID:** GODSEED-SSOT-1.0  
**ภาษา:** ไทย (UI, บทสนทนา, quest, คู่มือ)  
**แพลตฟอร์มที่ต้องรองรับ:** โทรศัพท์ / iPad / คอมพิวเตอร์ผ่านเบราว์เซอร์เท่านั้น  
**แนว:** Cinematic Choice-Driven Fantasy RPG / HD Pixel Art / Turn-Based Spell Crafting  
**สัดส่วนเวลาเล่นเป้าหมาย:** เนื้อเรื่องและทางเลือก 50%, หาของ+ผสมเวท+ต่อสู้ 50%  
**สถานะ:** ข้อกำหนดแม่บทสำหรับ Codex; คำสั่งล่าสุดจากเจ้าของมีสิทธิ์เปลี่ยนสเปกและต้องบันทึก Change Log

---

# 00 — หลักการบังคับของเกม (Non-Negotiable Design Pillars)

**P1 / ทางเลือกทำให้โลกขยับ:** ผู้เล่นไม่กดเดินอิสระ; เลือกการกระทำผ่านเมนูภาษาไทย → ตัวละครเคลื่อนตามเส้นทางที่กำหนด/เล่นท่าทาง → เหตุการณ์ตามระบบ → สถานะเปลี่ยนจริง → แสดงตัวเลือกต่อไป ไม่มีฉาก text-only เป็นเกมหลัก

**P2 / Pixel Art คือโลกเดียวกัน:** ภาพทุกองค์ประกอบต้องมี pixel language สม่ำเสมอ ใช้ tilemap, parallax, animation, shadows, particles, transitions, camera staging, layering จริง ห้าม “ภาพนิ่งฉาก + ตัวละครโปร่งใสแปะลอย” ห้ามนำ assets จากเกมที่มีลิขสิทธิ์มาใช้โดยไม่ได้รับอนุญาต

**P3 / เวทมนตร์สร้างเองได้จริง:** วัตถุดิบเก็บจากสถานที่และผลของทางเลือก ผู้เล่นค้นพบองค์ประกอบ 3 ส่วน → ผสม → ตรวจสูตร → ได้เวทถาวรในสมุด → ติดตั้ง 4 ช่อง → เลือกใช้ใน Turn-Based Battle โดยเอฟเฟกต์ VFX มาจากสูตร ไม่ใช่เปลี่ยนชื่อ VFX เดิมเฉย ๆ

**P4 / โลกจดจำ:** flag เหตุการณ์, ความไว้วางใจ NPC, การเปลี่ยนฉากและความทรงจำถูกบันทึก เวลาย้อนกลับสถานที่ NPC/ฉากตอบสนองตามสิ่งที่ผู้เล่นเคยทำ (ไม่ใช่บทสนทนาสุ่มไม่เชื่อมเรื่อง)

**P5 / สร้างความอบอุ่น + อยากค้นพบ:** เล่นสนุก สีสันสดใส มีอารมณ์ขัน เนื้อเรื่องให้คุณค่าการช่วยเหลือ เสนอเส้นทางหลายแบบที่ไม่มีการลงโทษไร้เหตุผล ไม่มี dark patterns, fear of missing out, gacha, pay-to-win หรือการกดเล่นแบบเสพติด

**P6 / Mobile-first แต่ไม่ทำร้าย iPad/desktop:** ใช้ HTML UI ที่เข้าถึงได้และฉาก Canvas ที่ปรับตามการแสดงผล ห้ามบังคับหมุนจอ ห้ามกล่องข้อความทับปุ่ม ห้าม hover-only UI

**P7 / สั่งทำด้วยโทรศัพท์เท่านั้น:** ผู้เป็นเจ้าของใช้ Codex Cloud + GitHub และดูเกมผ่าน GitHub Pages; ต้องพัฒนาและทดสอบบน CI ได้โดยเจ้าของไม่ต้องติดตั้งเครื่องมือ

**P8 / ไม่มี AI ก็เล่นได้สมบูรณ์:** Rule engine และข้อความภาษาไทยเป็นแกน เกมต้องเล่นได้ครบในโหมด offline หลัง preload/แคช (เมื่อรองรับ) AI เป็นชั้นแต่งบทสนทนาเสริมหลังผ่านข้อกำหนดความปลอดภัยและประสิทธิภาพ

**P9 / เนื้อเรื่องและสเปกต้องเป็นข้อมูลที่ตรวจสอบได้:** SceneID, ChoiceID, itemID, SpellID, enemyID, flags, quest state, scene transition, art cues, test IDs ระบุในไฟล์ข้อมูล มี validation detect IDs ซ้ำ, transitions ขาด, soft-lock, สูตรผิด

**P10 / ทำทีละฉบับที่เล่นจบได้:** อย่าเพิ่ม feature จนวงจรหลักพัง หลังแต่ละ milestone ต้อง Build/CI ผ่านและเล่นลูปเกมได้

---

# 01 — Vision, audience, core loop และขอบเขต

## 1.1 Elevator pitch
“ในโลกที่ความทรงจำถูกบางสิ่งขโมยไป ผู้เล่นเป็นผู้มาใหม่ที่ค่อย ๆ ค้นพบเมล็ดเวทมนตร์จากสิ่งของธรรมชาติ ผสมเป็นคาถาใหม่ และใช้ทางเลือกเล็ก ๆ สร้างผลกระทบต่อผู้คนและโลก เกมแสดงทุกการตัดสินใจด้วยแอนิเมชัน Pixel Art และใช้การต่อสู้แบบผลัดกันออกคำสั่ง”

- โทนภาพ: ชวนฝัน อบอุ่น สดใส น่าค้นหา ไม่สยอง ไม่โหด
- โทนเรื่อง: ผจญภัย 60%, ความลับ/การเติบโต 25%, ความผูกพัน 15% ภายในครึ่งเนื้อเรื่อง
- ช่วงเวลาเล่น: ผู้เล่นหนึ่ง session 8–20 นาที; เล่นจบบทแรก ~45–90 นาทีตามการสำรวจและทดลองสูตร (เป็นเป้าหมายออกแบบ ไม่ใช่การรับประกัน)
- เป้าหมายเวอร์ชัน 1.0: บทแรก “หมู่บ้านที่ลืมเสียงเพลง” เล่นจบพร้อม 3 บทสรุปเชิงความสัมพันธ์, 4 เหตุการณ์ต่อสู้หลัก, 1 บอส, เนื้อเรื่อง/เควสต์ย้อนกลับได้, ระบบเวท 234 สูตรตามกฎ, NPC ความทรงจำ, ฉาก HD Pixel Art ที่ขยับจริง, save/load และเผยแพร่ผ่าน GitHub Pages
- โหมดเซฟ: ครั้งนี้ **มีเซฟระหว่างเกม** แบบอัตโนมัติและ Export/Import เพื่อให้เหมาะกับการเล่นบนมือถือและ iPad (ต่างจาก REBORN เวอร์ชันเก่าที่เคยไม่มีเซฟกลางรัน; เป็นเกมคนละระบบ)
- เนื้อหาใหม่ในอนาคตเพิ่มเป็นบทโดยไม่ทำลายข้อมูลเดิม

## 1.2 Player promises
1. กดเลือกแล้ว **เห็นตัวละครลงมือทำ** ในเวลาเหมาะสม ไม่ต้องดู text wall อย่างเดียว
2. เก็บวัตถุดิบอย่างมีเหตุผล: สำรวจสถานที่ / เลือกช่วยคน / แก้ปริศนา / รางวัลต่อสู้
3. สูตรที่แตกต่างมีความสามารถเชิงกลไกและ VFX ต่างกันที่สังเกตได้
4. การเลือกไม่ใช่คำตอบถูกข้อเดียว: มีทางอื่นไปเป้าหมายได้
5. เกมสบายตา ฟอนต์ไทยชัด เล่นด้วยนิ้วหรือเมาส์ได้
6. เล่นได้โดยไม่สมัครสมาชิกและไม่ต้องจ่ายเงิน

## 1.3 Core loop — รอบปกติ
`Story Hub → เลือกสถานที่/การกระทำ → เล่น cinematic action 1–6 วินาที (ข้ามได้) → dialogue/flag/reward → (สำรวจ→วัตถุดิบ) / (ผสมเวท→สกิล) / (ต่อสู้→รางวัล) → NPC/สถานที่เปลี่ยน → Story Hub ใหม่`.

## 1.4 สิ่งที่เกมนี้ไม่ใช่
- ไม่ใช่ Open World ที่เล่นเดินเองด้วย joystick/WASD
- ไม่ใช่ visual novel ที่ภาพไม่ขยับเลย
- ไม่ใช่ auto-battler / idle grind / MMORPG / multiplayer
- ไม่ใช่เกมเศรษฐกิจเงินจริง การพนัน หรือ lootbox
- ไม่ใช่ AI chat ไร้โครงเรื่องที่เปลี่ยนกฎโลกเอง
- ไม่ใช่ภาพประกอบที่ขัดกับกราฟิกเกม (ตัดภาพถ่าย/AI ภาพต่างสไตล์มาแปะ)

---

# 02 — Art Direction: HD Pixel Art ที่เป็นเกมจริง

## 2.1 Visual identity และ palette
เอกลักษณ์: **Sunlit Memory Fantasy** = โลกแฟนตาซีสีมรกตอุ่นกับประกายเวทโทนทอง ลาเวนเดอร์ น้ำเงิน ฟ้า เน้นความลึกด้วยเงานุ่มที่ยังรักษาขอบ pixel art

สีพื้นฐานแนะนำ: jade `#77BFB2`, leaf `#5FA877`, sun `#F5CB7F`, twilight `#C6AAE9`, coral `#F39A91`, sky `#668DC1`, deep navy `#243B56`, text cream `#F7F4E9`, panel dark `#23354B`. ห้ามใช้พาเลตพร้อมกันทุกสีในพื้นที่เดียว ให้กำหนด dominant 60%, secondary 30%, highlights 10% ต่อฉาก มีการปรับ contrast UI ให้ผ่าน WCAG 2.2 AA สำหรับข้อความขนาดปกติ

- ภายในโลกใช้ **pixel grid ต้นฉบับ 16 px/tile** (หรือ 32 px per art tile ที่เป็นจำนวนเต็มเท่านั้น); ตัวละครมาตรฐาน 32×48 source pixel, NPC 32×48, บอส 64×64 ถึง 96×96, effects atlas ตาม tile-grid; ปรับสเกลเฉพาะ integer scale เมื่อทำได้และใช้ nearest-neighbor ใน world art
- ระยะใกล้/กลาง/ไกล: foreground ป้าย/ใบไม้, midground ตัวละครและอาคาร, background เขา/ท้องฟ้า; parallax 0.2/0.5/1.0 อย่างเหมาะสมโดยไม่ทำให้ฉากแยกเป็นกระดาษ
- สไตล์ตัวละคร: สัดส่วนหัวใหญ่เล็กน้อย เสื้อผ้ารูปทรงอ่านได้จาก silhouette แสงเฉพาะด้านเล็กน้อย ความหนา outline สม่ำเสมอ; มี shadow บนพื้นและ animation states
- ทุกฉากมีรายละเอียดมีชีวิตอย่างน้อย 3 อย่าง เช่น ใบไม้ไหว, น้ำวิบวับ, แสงเข้าหน้าต่าง, ควันปล่องไฟ, ผีเสื้อบิน, NPC ทำกิจวัตร, ฝุ่นลอย โดยปรับตาม Low Graphics mode
- **No cardboard rule:** ห้ามใช้ภาพฉากเดียวกับวัตถุติดอยู่ตายตัวและ sprite ทับแบบผิดขนาด ต้องมีแยกชั้นทิวทัศน์ ตำแหน่งยืน/occlusion กับ props, การกระพริบตา/idle, walk cycle, action cycle, VFX tied to targets และ camera easing; เพิ่มฉาก transition ที่มีทิศทางต่อเนื่อง
- ภาพอ้างอิงได้เพียงแนวทางสี/ความละเอียด เช่น HD Pixel Art RPG สมัยใหม่; ห้ามลอก artwork/map/characters/fonts ที่ไม่ได้รับสิทธิ์

## 2.2 Art production pipeline แบบ Codex ทำเองเป็นหลัก
1. เริ่มจาก **pixel-art procedural tiles + original pixel drawings in code** หากไม่มีเครื่องมือสร้างภาพที่ให้ asset ใช้งานได้จริง; เก็บ source generator reproducible (`scripts/generate-art.*`, `src/assets/`)
2. สร้าง `assets/sprites/*.png`, tile atlases และ spritesheets ตาม art spec, ใช้ pixel-perfect alpha และคำนึงถึงอนิเมชัน
3. หากใช้โมเดลสร้างภาพหรือ CC0 packs ต้องตรวจสิทธิ์ เก็บ `ASSET_LICENSES.md`, ที่มา เวอร์ชัน และ attribution ตามใบอนุญาต; แปลงให้กลมกลืนกับ pixel grid และ palette ก่อนใช้
4. **ห้ามอ้างว่า pixel-art ระดับสูงแล้วถ้ายังมี placeholder shapes:** บันทึก art debt และไม่เพิ่มเนื้อเรื่องเกิน 1 บทจน visual gate ผ่าน
5. สร้าง `docs/ART_BIBLE.md` ระบุ palette, sprite metrics, animation naming, backgrounds, composition, atlas sizes, export guidelines

## 2.3 Animation library (ต้องนำกลับมาใช้ซ้ำ)
- Player: `idle` 4f@6fps, `walk` 6f@10fps, `run` 6f@12fps, `interact` 4f@8fps, `pick_up` 6f@9fps, `craft` 8f@10fps, `cast` 6f@10fps, `guard` 3f@6fps, `hit` 3f@8fps, `victory` 6f@8fps, `rest` 4f@5fps
- NPC: idle/blink/walk/talk/emote/hand item (+ special LUMI musicbox, MAREN humming, EIRA glyph, KORO hammer)
- Enemy: idle/warn/attack/react/defeat; defeat เป็นประกายหายไป ไม่มีรายละเอียดรุนแรง
- Environment: leaves 6–8f, water 6f, lantern 4f, cloud pan, butterflies 6f, magic grass 6f
- Timing: transition 300–600ms, scene focus 0.5–1.2s, action movement 0.6–3s, spell 0.6–2.5s, dialogue typing opt-out; skip action animations ได้และไม่ทำให้ state transition เสีย
- Reduced motion: ลด parallax, shake, flashing; VFX attack flashes ไม่เกิน 3 ครั้งต่อวินาที, หลีกเลี่ยง strobes

## 2.4 Scenes art bible (เริ่มต้นอย่างน้อย)
- `BG_VILLAGE_MORNING` หมู่บ้านดอกพฤกษา: หลังคาสีน้ำผึ้ง, หอระฆังเล็ก, ทุ่งใบโค้ง, บ่อน้ำ, เส้นทางดิน; animation wind/chimney/NPC
- `BG_WORKSHOP` ร้านช่างคุโร: ชั้นคริสตัล, เตาหลอมแสงนุ่ม, โต๊ะไม้ 3 ชั้น, spark เบา; animation hammer/forge
- `BG_FOREST` ป่าม่านเมฆ: ต้นไม้หลายความสูง, หมอกฟ้าเบา, ลำแสงแดด, ทางดินคด; animation fireflies/bush
- `BG_STREAM` ลำธารสีหยก: ริมน้ำ/สะพาน, น้ำ 6f, หินมอส; animation waterfall/splash
- `BG_RUINS` โบราณสถานเสียงสะท้อน: เสาหินสีลาเวนเดอร์ รอยรูนสว่างกับเงา; animation glyph
- `BG_ARCHIVE` หอสมุดความทรงจำ: โต๊ะ, แผนที่, ชั้นหนังสือ, นาฬิกาดาว; animation dust/star projector
- `BG_FESTIVAL` จัตุรัสเทศกาล: ธง, โคมไฟ, เวทประกาย, ชาวบ้านตาม flag
- `BATTLE_FOREST`, `BATTLE_RUINS`, `BATTLE_FESTIVAL` เป็นฉากต่อสู้สร้าง layer ต่อเนื่องจากสถานที่จริง ไม่ใช่สีไล่เฉดทึบเดี่ยว ๆ

## 2.5 Camera and transitions
- Scene director รู้ตำแหน่งตัวละครในฉาก (stage anchors) `left/right/center/foreground` และเส้นทาง `walk_path` จากจุด A ไป B
- Choice `actionCue` กำหนด `enter|walk|pick|talk|craft|inspect|cast|rest|flee|celebrate`; dispatcher ส่ง animation/action→ cue sound→ state update→dialogue หรือ scene next
- Camera follow แบบจำกัดช่วง 10–32 world px, pan 350–650ms; ไม่ใช้ zoom jump บ่อย; fade+pan เฉพาะการเปลี่ยนที่มีทิศทาง
- UI dialogue panel **HTML/CSS** ไม่บังคับใช้ pixel font เล็กเกินไป; world ใช้ Phaser Canvas

---

# 03 — Responsive: โทรศัพท์, iPad, คอมพิวเตอร์ (สามกลุ่มหลักเท่านั้น)

## 3.1 Breakpoints กับ layout จริง
1. **Phone portrait** 320–480 CSS px: stage view ด้านบน ~36–44svh (min 210px, max 400px), ด้านล่าง panel ตัวเลือก/บทพูดเลื่อนเฉพาะภายในได้; เมนูอย่าง crafting/combat ใช้ bottom sheet หรือเต็มหน้าจอพร้อม back; มีปุ่มเดียวต่อแถวสำหรับ choices ยาว; ห้ามบังคับ landscape
2. **Phone landscape** ≤900 CSS px height≤500: stage ~58–65% width หรือ top 60–65% height; UI ย้ายเป็น side panel/overlay ที่ไม่บัง HP, enemy telegraph และ action buttons; ห้าม controls ตกขอบ
3. **iPad portrait** 768×1024/820×1180: stage บน 52–60% ของพื้นที่, panel ล่างสองคอลัมน์เฉพาะเมื่อข้อความไม่ตัด
4. **iPad landscape** 1024×768/1180×820: stage ซ้าย 60–65%, คอลัมน์ UI ขวา 35–40%
5. **Desktop** 1280–1920 widths: stage ซ้าย 66–72%, side UI ขวา; max overall width 1600; letterboxing มี art decorative panels ที่เข้าธีม ไม่ยืดพิกเซลผิดสัดส่วน
6. **Small desktop** 1024×600: control density compact แต่ปุ่มไม่เล็กกว่า 44×44 CSS px

## 3.2 Input / type / accessibility
- กดด้วย touch, pointer, keyboard: Tab/Shift+Tab/Enter/Space/Escape; มี visible focus, click feedback และ disable ระหว่าง animation ที่ commit แล้ว; สั่ง skip action animation ด้วยปุ่มได้
- Target ขนาด ≥44×44 CSS px, gap ระหว่างปุ่ม ≥8px เมื่อทำได้; ข้อความทั่วไป ≥16 CSS px บนโทรศัพท์, line-height 1.45–1.7; ฟอนต์ไทยมี fallback `Noto Sans Thai, system-ui, sans-serif` พร้อมตรวจใบอนุญาตฟอนต์ที่นำมา bundle
- รองรับ `env(safe-area-inset-*)` สำหรับ iPhone/iPad, visual viewport resize และ `100dvh/100svh`, keyboard notches
- ปิด/เปิดเสียงและอนิเมชันลดการเคลื่อนไหว, subtitles ทุกเหตุการณ์เสียงสำคัญ, ไม่ใช้สีอย่างเดียวบอกผลหรือสถานะ
- Touch scroll ไม่แย่ง gesture กับ canvas: `touch-action` เฉพาะพื้นที่ที่ใช้, ไม่มี double tap to zoom รบกวนโดยไม่มีเหตุผล; lock body scroll เฉพาะฉากเต็มจอเมื่อจำเป็น
- ไม่มีหน้าจอใดต้อง hover เพื่ออ่านข้อความหรือรู้ผลของสกิล

## 3.3 Targets ทดสอบ
- Phone: 360×800, 390×844, 430×932; portrait และ 844×390 landscape
- iPad: 768×1024, 820×1180, 1024×768
- Desktop: 1366×768, 1440×900, 1920×1080
- Android Chrome, iPhone Safari, iPad Safari, desktop Chrome/Edge/Firefox/Safari; browser emulation ≠ การยืนยันบนอุปกรณ์จริง: หากไม่มีเครื่องจริงให้รายงานว่า 'ยังไม่ได้ทดสอบอุปกรณ์จริง'
- Performance goal: 30fps แบบ stable low mode บนมือถือระดับกลางที่ทดสอบจริง, 60fps เมื่อเครื่องรองรับ; โหลดหน้าแรกไม่เกิน ~5 MB compressed excluding optional audio/AI เท่าที่ทำได้จริง (goal; ห้ามปลอมผล benchmark)
- ตั้ง renderer mode fallback, devicePixelRatio cap 2 หรือ dynamic, texture atlas power-of-two เมื่อมีประโยชน์, max sprite reuse, particle cap 20/50/100 ตาม Low/Medium/High; pause เมื่อ tab hidden, audio resume on gesture

---

# 04 — World lore, ตัวละคร และแกนเรื่อง (ล็อก Canon)

## 4.1 Lore
โลกชื่อ **เอลารา (Elara)** หมู่บ้านเริ่มต้นชื่อ **หมู่บ้านพฤกษารุ่ง (Asterleaf)**; คำว่า GODSEED คือ “เมล็ดแก่นทรงจำ” ที่เคยช่วยให้เรื่องเล่าของผู้คนสืบต่อกัน แต่ตอนนี้ **ม่านลืม (Veil of Forgetting)** ทำให้ความทรงจำบางชิ้นและทำนองเพลงหายไป โลกไม่พังทลาย เพียงแต่ผู้คนเริ่มลืมบางอย่างที่มีความหมาย

ผู้เล่นชื่อเริ่มต้น “อาเรน” เปลี่ยนชื่อได้ 2–16 อักขระภาษาไทย/ละตินโดย sanitize; ผู้มาใหม่ผู้มี “ประกายรับฟัง” ไม่ใช่ผู้ถูกเลือกที่เก่งที่สุด เป็นคนที่มองเห็นเศษความทรงจำบนสิ่งของและเชื่อมกลับเข้ากับโลกผ่านเวท

- ความขัดแย้งบทแรก: กล่องดนตรีของคุณยายมาเรนเล่นเพลงไม่ครบ ลูมิอยากทำให้คุณยายจำความสุขร่วมกันได้
- แก่นความลับ: สิ่งที่ทำให้เพลงหายไม่ใช่ตัวร้ายชั่วร้ายแบบตรงไปตรงมา แต่เป็นระบบอารักขาโบราณชื่อ “ผู้พิทักษ์รอยลืม” ที่ปิดผนึกความทรงจำบางส่วนเพื่อปกป้องแก่นเมล็ด
- จุดจบบทแรก: บทเพลงกลับมาในรูปแบบหนึ่ง แต่ความทรงจำอีกส่วนหนึ่งเปิดเบาะแสไปสู่หอคอยนาฬิกาดาวในบทถัดไป
- ความรุนแรง: แฟนตาซีระดับเบา ไม่มีรายละเอียดเลือด/บาดเจ็บกราฟิก ศัตรูแพ้แล้วสลายเป็นประกาย/ถอยออกไป

## 4.2 ตัวละครหลักและ Memory Tags
| ID | ตัวละคร | ลักษณะ | เป้าหมาย | Flag ที่จำ | ท่าพิเศษ |
|---|---|---|---|---|---|
| `NPC_LUMI` | ลูมิ เด็กช่างสงสัย | เสื้อฟ้าอมเขียว กระเป๋าเครื่องมือ; พูดเร็วสดใส | ซ่อมกล่องดนตรีให้ยาย | helped_box, heard_song, visited_ruins | carry_box, wave, cheer |
| `NPC_MAREN` | ยายมาเรน | ผ้าคลุมพีช ผมหงอก ยิ้มอ่อน | กลับมาร้องเพลงร่วมกับครอบครัว | listened, song_returned | hum, sit, remember |
| `NPC_EIRA` | ไอรา ผู้ดูแลหอสมุด | ผ้าคลุมลาเวนเดอร์ แว่นกลม | ค้นคว้าความทรงจำโดยไม่ทำร้ายใคร | researched, learned_echo, trusted_player | write, point_rune |
| `NPC_KORO` | คุโร ช่างอุปกรณ์ | ผ้ากันเปื้อนน้ำตาล มือใหญ่ ใจดี | ซ่อมของและสอนใช้เวทอย่างปลอดภัย | workshop_help, crafted_first | hammer, show_recipe |
| `NPC_PIP` | พิพ สิ่งมีชีวิตลูกเมล็ด | ตัวเล็กสีเขียว หางเรืองแสง | ตามหาแหล่งพลังแปลก | fed_pip, follow_player | hop, glow |
| `NPC_SENTINEL` | ผู้พิทักษ์รอยลืม | รูนหมุนรอบแกนหิน ไม่มีหน้ามนุษย์ | ปกป้องเมล็ดแก่นจากการใช้ผิด | mercy_seen, echo_restored | sigil_spin, shield |

## 4.3 NPC Trust และการเปลี่ยนบท
- Trust ต่อ NPC เริ่ม `0`, ช่วง `-2..+5`, เพิ่ม/ลดตาม flags; ไม่มีการลดแบบสุ่มตามเวลา
- ใช้ events สำคัญและ tags ไม่เก็บบทพูด AI เป็น source of truth
- แผนที่ฉากเปลี่ยนตาม facts: เมื่อ `festival_restored` จัตุรัสมีธงและชาวบ้านเพิ่ม, เมื่อ `stream_clean` น้ำสว่างขึ้น, เมื่อ `ruins_open` รูนประตูเปล่งแสง
- NPC reactions เลือกจาก `condition → lineId` ที่กำหนดลำดับ; fallback เมื่อไม่มีเงื่อนไข

## 4.4 โลกต่อจากบทแรก (roadmap ไม่ต้องสร้างทั้งหมดใน M1)
- CH2 `THE_CLOCK_TOWER` หอนาฬิกาดาว: ปริศนาความจำ/เวลา; ศัตรูสะท้อนการเลือกเวท; เพิ่มธาตุแสง/เงา
- CH3 `SKY_ARCHIVE` หอจารึกเหนือเมฆ: ความขัดแย้งระหว่างการจำทุกอย่างกับการปล่อยวางอย่างสมดุล; สายเวทเสียงสะท้อนและการจดจำ
- โครงเรื่องใหญ่: “พลังของเมล็ดไม่ใช่การควบคุมความทรงจำ แต่คือความสามารถที่ทำให้ผู้คนร่วมกันสร้างความหมายใหม่” ห้ามเปลี่ยนธีมโดยสุ่มพล็อตใหม่ทุกครั้ง

---

# 05 — Game State, data schemas, deterministic behavior

## 5.1 State shape (แยก serialized state กับ temporary scene state)

```ts
type GameState = {
  schemaVersion: 1;
  runId: string;
  seed: string;
  rngCounter: number;
  player: {
    name: string;
    level: number;
    exp: number;
    hp: number; maxHp: number;
    mp: number; maxMp: number;
    focus: number; resolve: number;
    gold: number;
    equippedSpellIds: string[]; // <= 4, ไม่ซ้ำ
  };
  story: {
    currentSceneId: string;
    chapter: number;
    day: number;
    phase: 'morning'|'afternoon'|'evening';
    flags: Record<string, boolean|number|string>;
    completedChoiceIds: string[];
    unlockedLocationIds: string[];
    activeQuestIds: string[];
    completedQuestIds: string[];
    endingId?: string;
  };
  inventory: Record<string, number>;
  knownSpellIds: string[];
  spellMastery: Record<string, number>; // 0..3
  npcTrust: Record<string, number>;
  npcMemoryEvents: Array<{npcId: string; eventId: string; day: number}>;
  combat?: CombatSaveState;
  settings: { music: boolean; sfx: boolean; reduceMotion: boolean; graphics: 'low'|'medium'|'high'; aiStory: boolean };
  meta: { createdAt: string; updatedAt: string; totalChoices: number; totalBattlesWon: number };
};
```

- ต้องใช้ Zod หรือ schema validator ที่เข้ากันได้จริง เพื่อ validate ก่อน Save/Load; migrate แทนการทิ้งเซฟเมื่ออัปเดต
- `seed`+`rngCounter` เป็นฐานของ deterministic xorshift/PRNG; no `Math.random` สำหรับผลการเล่นที่ต้อง reproducible
- ทุก Choice มี `choiceId`, `conditions`, `cost`, `effects`, `actionCues`, `nextSceneId`; ถ้าเลือกได้ต้องไม่มี soft-lock
- `performChoice(choiceId)` ใช้ transaction: validate → snapshot → compute effects → commit → play presentation; ถ้า error rollback; ไม่ให้ double click trigger ซ้ำ
- เก็บ `lastKnownGoodSave`, มี export JSON ที่ตรวจ schema และ checksum, import validate และแสดง warning ก่อน overwrite
- `IndexedDB` เป็นหลัก localStorage ใช้แค่ settings เบา ๆ; autosave ทุกครั้งหลัง story commit, combat end, craft success
- ไม่มีการเก็บข้อมูลบัญชีหรือ telemetry โดยไม่แจ้งขออนุญาต; ข้อมูลทั้งหมดอยู่ในเครื่องเป็นค่าเริ่มต้น

## 5.2 Scenario schema

```ts
type StoryScene = {
  id: string;
  chapter: number;
  stageId: string;
  bgState?: string;
  musicCue?: string;
  actors: Array<{id:string; anchor:string; pose:string}>;
  openingLines: string[]; // Thai text หรือ localization IDs
  entryEffects?: Effect[];
  choices: Array<{
    id:string; label:string;
    when?: Condition[];
    effects: Effect[];
    actionCues: ActionCue[];
    next:string;
    fallbackIfLocked?: string;
  }>;
  onceOnly?: boolean;
};
```

`Effect` ที่อนุญาต: `setFlag`, `addItem`, `removeItem`, `gainExp`, `gainGold`, `adjustTrust`, `advanceTime`, `unlockLocation`, `startQuest`, `completeQuest`, `startBattle`, `learnHint`, `setEnding`, `heal`, `restoreMp`. ใช้ discriminated unions; ห้าม eval arbitrary scripting ใน content JSON

## 5.3 Time and scene progression
- หนึ่ง action ใช้เวลา `0`, `1` หรือ `2` ticks; 3 ticks = หนึ่งวัน (morning→afternoon→evening→next day morning)
- ไม่ skip วันโดยไม่มีข้อความหรือเหตุผล; มิให้ NPC schedule block main quest; soft lock guard ให้ main quest locations accessible เสมอ
- Events พิเศษตรวจ `(flags, day, location, priorChoiceIds)` แบบ rule-based; ใช้ deterministic priority สูงกว่า random encounter
- World reactions เป็น stage decoration changes + NPC dialogue + optional reward/quest ไม่เปลี่ยนแค่ข้อความ

---

# 06 — วัตถุดิบ, กระเป๋า และการค้นพบ

## 6.1 Item rules
- เก็บวัตถุดิบด้วยตัวเลือก + action animation `walk_to_object → pick_up → item pop-up` ไม่มีการบังคับเดินเอง
- ความหายาก 3 ระดับ: Common, Uncommon, Rare; Rare ต้องมีทางได้ซ้ำหลังจบบท/ผ่านกิจกรรม และไม่บังคับ grind ไม่มีวันจบ
- หนึ่งสูตรเวทประกอบด้วย **Core 1 + Form 1 + Modifier 1** (วัตถุดิบสามชิ้น); เมื่อสำเร็จครั้งแรก consume แต่ละชนิด 1, เรียนรู้เวทถาวร; จากนั้นใช้เวทด้วย MP ไม่ต้องใช้วัตถุดิบทุกครั้ง
- การอัปเกรด Mastery ใช้ catalyst ที่ได้จากเควสต์/ความสามารถ; Mastery 1–3 ไม่เปลี่ยน SpellID, ปรับผลด้านตัวเลขในเพดานที่กำหนด
- หากสูตรไม่ถูกต้อง คืนวัตถุดิบทั้งหมด, อธิบายความขัดแย้งของสูตร; ห้ามกลืนของโดยไม่มีเหตุผล
- ไอเทมที่ผูกกับ Quest แยกจาก crafting slot หรือขึ้น warning/กันไม่ให้ใช้จนภารกิจเสร็จ

## 6.2 Catalog Core — 8 ชนิด (ต้องมี ID/ชื่อ/แหล่งหา)
| Core ID | ชื่อชิ้นส่วน | ธาตุ | สี VFX | แหล่งค้นพบ |
|---|---|---|---|---|
| `CORE_FIRE` | ถ่านอรุณ | ไฟ | ส้มแดงนุ่ม | เตาช่างคุโร / ซากไฟโบราณ |
| `CORE_WATER` | หยดธาราหยก | น้ำ | ฟ้าอมเขียว | ลำธาร / หยดใบไม้หลังฝน |
| `CORE_WIND` | ขนนกสายลม | ลม | ฟ้าขาว | ป่าม่านเมฆ / หน้าผา |
| `CORE_EARTH` | หินหัวใจดิน | ดิน | ทองอ่อน-น้ำตาล | ทางป่า / โบราณสถาน |
| `CORE_LIGHT` | เกสรอรุณ | แสง | ทองนวล | ดอกไม้เทศกาล / จัตุรัส |
| `CORE_SHADOW` | แร่ม่านค่ำ | เงา | ม่วงคราม | ซากโบราณ / ทางลับ |
| `CORE_BLOOM` | เมล็ดผลิบาน | พฤกษา | เขียวพาสเทล | สวนยาย / ป่าสุขสงบ |
| `CORE_ECHO` | เศษเสียงสะท้อน | เสียง/ความทรงจำ | ลาเวนเดอร์เงิน | หอสมุด / ผู้พิทักษ์ |

## 6.3 Catalog Form — 6 ชนิด
| Form ID | ชื่อวัตถุดิบ | รูปเวท | ผลด้านตำแหน่ง | แหล่งหา |
|---|---|---|---|---|
| `FORM_ORB` | ลูกแก้วมณี | Orb | เป้าหมายเดี่ยว | ช่างคุโร |
| `FORM_RAY` | เส้นใยดารา | Ray | เป้าหมายเดี่ยวทะลุเส้น | หอสมุด |
| `FORM_RING` | ห่วงใบไม้เงิน | Ring | ตัวเอง/เพื่อน 1 เป้าหมาย | สวนยาย |
| `FORM_RAIN` | ละอองเมฆ | Rain | ศัตรู 2 เป้าหมาย/พื้นที่ | ป่าหลังฝน |
| `FORM_WARD` | แผ่นตราผนึก | Ward | เกราะ/พื้นที่ป้องกัน | โบราณสถาน |
| `FORM_CHAIN` | ข้อเชื่อมประกาย | Chain | กระโดดไปศัตรู 2 เป้าหมาย | ซากรูน |

## 6.4 Catalog Modifier — 7 ชนิด
| Mod ID | ชื่อวัตถุดิบ | ผลเวท | แหล่งหา |
|---|---|---|---|
| `MOD_SPLIT` | ผงแยกดาว | Split | แยกอนุภาค/เพิ่ม hit spread | ป่าพราวแสง |
| `MOD_SEEK` | เข็มทิศแมลงแสง | Seek | ตามเป้าหมาย/ความแม่นยำ | ทางป่า |
| `MOD_GUARD` | เปลือกเกราะเถา | Guard | เพิ่ม shield | ป่าลึก |
| `MOD_HEAL` | น้ำค้างเยียวยา | Heal | ฟื้นพลัง HP | สวนยาย/ลำธาร |
| `MOD_PIERCE` | เขี้ยวผลึกเจาะ | Pierce | ลดผล Ward เป้าหมาย | โบราณสถาน |
| `MOD_LINGER` | ทรายเวลาอ่อน | Linger | เหลือผลต่อเนื่อง 2 เทิร์น | หอสมุด |
| `MOD_AMPLIFY` | ประกายขยายเสียง | Amplify | เพิ่ม potency + MP cost | ผู้พิทักษ์/เทศกาล |

## 6.5 Catalyst 5 ชนิด (สำหรับ mastery, ไม่ใช่หนึ่งในสามส่วนสูตร)
`CAT_EMBER` ผลึกแสงอุ่น, `CAT_MIST` หยดหมอกนิรันดร์, `CAT_GROWTH` เส้นใยต้นแม่, `CAT_RESONANCE` พิณหยกแตกประกาย, `CAT_MOON` เศษดวงจันทร์

## 6.6 Inventory UX
- เป็นหมวด `แก่นธาตุ / รูปแบบ / ตัวปรับ / ตัวเร่ง / ของภารกิจ / ของใช้` มีไอคอน Pixel Art พร้อมชื่อและข้อความอธิบาย
- crafting: มี 3 ช่องเรียงเป็น Core / Form / Modifier พร้อม tooltip ตัวอย่าง ไม่มี drag-and-drop ที่บังคับใช้ (รองรับแตะเลือกจากรายการ)
- filter ค้นสูตรตามธาตุ ค่า MP รูปแบบการโจมตี/สนับสนุน และ status
- ทุก scene content ให้กำหนด `obtainableItemIds` และทำ `scripts/check-accessibility-of-materials.ts` ตรวจ reachability ของของจำเป็น

---

# 07 — Spell Crafting Engine: กฎครบ 234 สูตร (ห้ามเขียนเองทีละ 234 ชื่อ)

## 7.1 Combination legality: นับได้ **234 สูตร** อย่างแน่นอน
มี 8 Core × 6 Form × 7 Modifier = 336 ชุดก่อนคัดกรอง กำหนด Allowed Forms ต่อ modifier ดังนี้:

| Modifier | Allowed Form IDs | Core จำกัด | จำนวน |
|---|---|---|---:|
| SPLIT | ORB, RAY, RAIN, CHAIN | ทุก 8 | 4×8=32 |
| SEEK | ORB, RAY, RAIN, CHAIN | ทุก 8 | 4×8=32 |
| GUARD | ORB, RING, RAIN, WARD | ทุก 8 | 4×8=32 |
| HEAL | ORB, RAY, RING, RAIN, WARD, CHAIN | WATER/LIGHT/BLOOM เท่านั้น | 6×3=18 |
| PIERCE | ORB, RAY, RAIN, CHAIN | ทุก 8 | 4×8=32 |
| LINGER | ORB, RING, RAIN, WARD, CHAIN | ทุก 8 | 5×8=40 |
| AMPLIFY | ORB, RAY, RING, RAIN, WARD, CHAIN | ทุก 8 | 6×8=48 |
| **รวม** | | | **234** |

**Validation tests ต้อง assert ว่า generateLegalSpells().length === 234 และ spellIds unique === 234**. ชุดที่ไม่ถูกต้องแสดงเหตุผลตามตารางโดยไม่กินวัตถุดิบ

## 7.2 Stable Spell ID and names
- Spell ID: `SPELL_{CORE}_{FORM}_{MOD}` เช่น `SPELL_FIRE_ORB_SPLIT`
- ชื่อเวทประกอบจาก deterministic lexicon ไม่ใช่ random text; รูปแบบ: `[คำหน้าธาตุ] + [คำนามรูปแบบ] + [คำสร้อยตัวปรับ]`
- Core prefix: FIRE=`เพลิง`, WATER=`ธารา`, WIND=`วายุ`, EARTH=`ศิลา`, LIGHT=`อรุณ`, SHADOW=`รัตติกาล`, BLOOM=`พฤกษา`, ECHO=`เสียงสะท้อน`
- Form noun: ORB=`ดารา`, RAY=`ลำแสง`, RING=`วงแหวน`, RAIN=`พิรุณ`, WARD=`ปราการ`, CHAIN=`สายใย`
- Modifier suffix: SPLIT=`พันประกาย`, SEEK=`นำวิถี`, GUARD=`คุ้มครอง`, HEAL=`ชีวา`, PIERCE=`ทะลวง`, LINGER=`เนิ่นนาน`, AMPLIFY=`จุติ`
- ตัวอย่าง: FIRE + ORB + SPLIT = “เพลิงดาราพันประกาย”; WATER + RING + HEAL = “ธาราวงแหวนชีวา”; ECHO + CHAIN + LINGER = “เสียงสะท้อนสายใยเนิ่นนาน”. สามารถมี curated alias สำหรับสูตรเด่นเพื่อให้อ่านลื่น เช่น `เพลิงดาราพันประกาย` ใช้ชื่อเล่น `ฝนดาวเพลิง`; **Spell ID ไม่เปลี่ยนตาม alias**
- เก็บ `legalRecipe`, `localizedName`, `description`, `mpCost`, `vfxDescriptor`, `mechanics` ที่ derive จากสูตรเป็น data objects ที่ทดสอบได้; ไม่ hardcode runtime AI สร้าง stats

## 7.3 Effect model ที่มีความต่างจริง

```ts
type SpellDefinition = {
  id: string;
  core: CoreId; form: FormId; modifier: ModId;
  nameTh: string;
  target: 'singleEnemy'|'multiEnemy'|'singleAlly'|'self'|'party';
  mpCost: number;
  power: number;
  hits: number;
  shield?: number;
  heal?: number;
  status?: { id: string; chance: number; turns: number };
  pierceWard?: number;
  duration?: number;
  vfx: { palette: string[]; emitterShape: string; motion: string; impact: string; trail: string; durationMs: number };
};
```

Power baseline (testable balancing constants; ปรับพร้อมเทสต์ได้):
- Core base power FIRE 16, WATER 12, WIND 13, EARTH 14, LIGHT 13, SHADOW 15, BLOOM 11, ECHO 12
- Form power delta ORB +2, RAY +3, RING −2, RAIN −3, WARD −4, CHAIN −2
- Modifier power delta SPLIT −2, SEEK +1, GUARD −6, HEAL −10, PIERCE 0, LINGER −3, AMPLIFY +5
- `power = max(0, coreBase + formDelta + modDelta + floor(level*0.5) + mastery*2)`; damage actual uses target defense/status, no negative values; supportive modifiers may reassign damage portion to shield/heal instead
- MP cost base 6 + Form cost (`ORB 2`,`RAY 3`,`RING 3`,`RAIN 5`,`WARD 4`,`CHAIN 5`) + Mod cost (`SPLIT 3`,`SEEK 2`,`GUARD 3`,`HEAL 5`,`PIERCE 4`,`LINGER 4`,`AMPLIFY 6`) + Core tier (`FIRE/WATER/WIND/EARTH/BLOOM 0`,`LIGHT/SHADOW 1`,`ECHO 2`), mastery level cost unchanged
- Target mapping: GUARD ⇒ ally/self (ถ้า RAIN ⇒ party); HEAL ⇒ ally/self/party according to form; others ⇒ enemy 1/2 according to form. RING/ WARD + AMPLIFY or LINGER ⇒ defensive field or ally buff rather than illegal offensive targeting (explicit class from form)
- Split: 2 hits at ~60% base each with visibly separate projectiles; Seek: reliable hit +10% impact, dynamic curved path; Guard: shield 10+base/2; Heal: heal 12+base/2, capped by maxHP; Pierce: ignore up to 50% ward; Linger: status/field lasts 2 turns; Amplify: +5 strength and dramatic 2-stage VFX
- Spell Mastery levels: 0–3, levels add `+2 power`, `+1 heal`, `+1 shield` per level but not new pattern; status application cannot exceed 85% when applicable
- No spells with exact same `{effect category, target, power, mp, status, VFX family}` unless justified by different elemental resistance; test a meaningful-distinction score rather than forcing artificial uniqueness for 234 combos

## 7.4 Elemental status and interactions
| Element | Applied status | Effect | Interaction |
|---|---|---|---|
| FIRE | `SEAR` 2 turns | damage over timeเล็กน้อย | ถ้า target `WET` ลด WET 1 turn และเพิ่ม damage +20% ครั้งเดียว |
| WATER | `WET` 2 turns | ลดต้านไฟ/เปลี่ยนปฏิกิริยา | WIND + WET: เป้าหมายถูกลด speed 1 turn |
| WIND | `SWIRL` 1 turn | เพิ่มโอกาส status ต่อไป | FIRE + SWIRL: เพิ่ม effect range เฉพาะ multi-target |
| EARTH | `GROUNDED` 2 turns | เพิ่ม guard เล็กน้อย | BLOOM + GROUNDED: สร้างต้นอ่อนฟื้น MP 3 |
| LIGHT | `GLEAM` 2 turns | ลดเงาคลุม | SHADOW + GLEAM: ปลด `VEIL` ของศัตรู |
| SHADOW | `VEIL` 1 turn | ลด accuracy ไม่เกิน 10% | LIGHT เอา VEIL ออก |
| BLOOM | `ROOTED` 1 turn | ลดการหลบ | WATER + ROOTED: ฟื้น HP ฝ่ายพันธมิตร +3 |
| ECHO | `RESONANCE` 2 turns | spell ถัดไปมี VFX echo & power +10% | ECHO ซ้อนทำให้ 2 hit ที่ลดพลัง เพื่อ balance |

โอกาสสถานะพื้นฐาน 35% (`HEAL/GUARD` ไม่ apply status ศัตรู), ใช้ seeded RNG; boss immune ต่อการ disable ซ้ำไม่จำกัด; capped status stacks; ทุก interaction มี on-screen cue ภาษาไทย

## 7.5 VFX composer — เกมต้องวาดแยกตามสูตร
**3 ชั้น**: Core color/texture → Form geometry/trajectory → Modifier transformation. ตัวแปรวัตถุดิบต้องส่งตรงเข้าระบบ VFX และ action animation
- Core patterns: FIRE ember curls, WATER splash/ripple, WIND flowing streaks, EARTH fragments/crystals, LIGHT warm rays, SHADOW silky mist (ไม่ทำให้มืดจอ), BLOOM petals/vines, ECHO concentric wave + harmonic sparkles
- Form motion: ORB projectile arc, RAY beam sweep, RING spiral around unit, RAIN particles fall onto arena, WARD layered shield bloom, CHAIN arcs between targets
- Mod change: SPLIT branching particles and 2 impact points; SEEK curved homing trail; GUARD barrier settle; HEAL outward soft wave; PIERCE fast streak through target; LINGER remaining runes 2-turn; AMPLIFY two-stage expanding pulse
- VFX identity hash uses `(core, form, modifier)`; include screenshot render tests on e.g. `FIRE_ORB_SPLIT`, `WATER_RING_HEAL`, `EARTH_WARD_GUARD`, `ECHO_CHAIN_LINGER`, `LIGHT_RAY_PIERCE`, `BLOOM_RAIN_GUARD` and validate descriptors distinct
- Pixel particles spawned by world renderer with capped count; fight remains responsive at low preset; reduce motion changes amplitude/timing, never gameplay mechanics
- No promises of 234 separately hand-drawn videos; 234 **composed unique descriptions** with visible distinguishable motion/color/shape/status

## 7.6 Spell progression and starter kit
- Player starts with `SPELL_WIND_ORB_SEEK` as tutorial preview (equipped), `SPELL_BLOOM_RING_HEAL` unlocks after workshop tutorial, `SPELL_FIRE_ORB_SPLIT` unlocks by exploring forest+KORO
- Starter `CORE_WIND` + `FORM_ORB` + `MOD_SEEK` ingredients given from intro tutorial, first craft occurs on-screen, deduct quantities, unlock spell; player may choose alternate first craft using WATER + ORB + SEEK if discovered
- All 234 legal recipes exist in code and can be discovered if materials unlocked in later chapters; **บทแรกไม่จำเป็นต้องหาได้ครบ 234**; rare elements unlock per story to preserve discovery
- Recipe browser: hidden names before discovery; discovered show full; unknown slot silhouettes + hints based on materials (ไม่เฉลยทั้งหมด)

---
# 08 — Turn-Based Combat: ระบบต่อสู้ละเอียด

## 8.1 Encounter entry
- เนื้อเรื่องเลือกทาง `startBattle` → cinematic camera pan 450ms + pixel dissolve (ลด motion มี fade) → battle stage ที่สัมพันธ์กับสถานที่เดิม; pre-battle panel แสดงศัตรูและเงื่อนไขการหนีให้รู้ก่อนเริ่ม
- ภาพมุมฉาก battle: ตัวละครซ้ายล่าง (หรือซ้าย) ศัตรูขวาบน; พื้นหลัง tile/layer ของ Forest/Ruins/Festival มี parallax และ props animated; enemy silhouette อ่านออกบนจอมือถือ
- UI battle phone portrait: ศัตรู+HP ด้านบนฉาก, ตัวผู้เล่น+HP/MP ใต้ฉาก, เวท 4 ช่องเป็น 2×2 button, utility actions ภายใต้; iPad landscape/desktop วางสกิล+telegraph ข้างฉาก
- Status chip แตะอ่านได้, คำบอกธาตุต้านทาน, predicted intent ก่อนเทิร์นผู้เล่น; เปิด Accessibility: ลดภาพกระพริบ, ความเร็ว VFX

## 8.2 Battle state
```ts
type CombatSaveState = {
  encounterId: string;
  turn: number;
  phase: 'playerSelect'|'playerResolve'|'enemyTelegraph'|'enemyResolve'|'result';
  rngCounter: number;
  party: CombatActor[];
  enemies: CombatActor[];
  pendingEnemyIntents: Array<{enemyId:string; actionId:string; targetId:string}>;
  canFlee: boolean;
  canSurrender: boolean;
  result?: 'win'|'lose'|'flee'|'surrender';
};
```
- Turn: Player action → resolve VFX/status → surviving enemies execute telegraphed actions → decrement status durations → next turn; first enemy intent announced before player picks move
- player HP=100, MP=40 (initial), Focus=10, Resolve=10; gain levels via story/battle rewards; max HP +6/level, max MP +3/level, base stats capped to avoid runaway
- `BASIC_PULSE` ปฏิกิริยาเวทธรรมดา 0MP damage 4 (always accessible separate from spell equip), GUARD reduces next incoming damage 40% and restores 6MP, ITEM consumes item with its effect, FLEE according to conditions, SURRENDER only allowed practice/explicit encounter
- 4 equippedSpellIds; if less than 4 show empty slots; battle menu never shows locked spell or allows a cast without enough MP
- Each usable spell action is one turn. Multi-hit composed within turn; enemy interrupts only via predefined counter telegraph. Formula: `damage = max(1, round(power*(1+0.02*focus)*(resistanceMultiplier) - armor))`, cap 999 per hit; resistance 0.75/1/1.25; use seeded RNG only for hit/status variation, not random one-shot
- Ally companion ability: one limited assist per encounter depending on trust, controlled as special action (no need party of 4 in first slice)
- Enemy telegraph: show icon/name of intended action e.g. “กำลังรวบรวมละออง” before turn; no unannounced lethal spikes
- Defeat never permanently destroys save. Return to checkpoint scene S28 with HP=70%, MP=50%, optional hint and retry; win receives rewards once (idempotent event). Flee to logical previous scene with small time cost; no inaccessible loss branches
- HP bars color + labels, damage feedback readable; haptic not mandatory and may not work across browsers

## 8.3 Enemy catalog chapter 1
| Encounter ID | Enemy | HP | Power | Weakness | AI/telegraph | Reward | flee/surrender |
|---|---|---:|---:|---|---|---|---|
| `B01_FOREST_SPROUT` | ต้นอ่อนหลงทาง | 42 | 7 | FIRE +20% | `leaf_dart` → `curl_guard` alternate | CORE_BLOOM, exp 12 | yes/no |
| `B02_STREAM_WISP` | วิญญาณละอองธารา | 52 | 8 | WIND +20% | `splash` / `mist_veil` on low HP | CORE_WATER, exp 14 | yes/no |
| `B03_RUIN_SENTINEL` | หุ่นรูนแสงริบหรี่ | 66 | 10 | EARTH +20% | `rune_shot`; `ward` on turn 3 | FORM_WARD, exp 18 | yes/no |
| `B04_ECHO_KNOT` | ปมเสียงย้อน | 76 | 11 | LIGHT +20% | `echo_cast` signals copy of previous elemental type | CORE_ECHO (only first win), exp 20 | conditional/no |
| `B05_MEMORY_GUARDIAN` | ผู้พิทักษ์รอยลืม | 150 | 12 | phase dependent | `seal_guard` → `pulse` → `memory_shards` repeated, telegraphed | quest ending, exp 40 | no/no |
| `BT_TRAINING` | ภูตฝึกเวทจำลอง | 35 | 5 | none | `soft_pulse` | tutorial reward, exp 5 | yes/yes |

- ตาราง HP/power เป็นค่าตั้งต้นปรับได้หลังทดสอบจริง; บันทึกหลักฐานทุกการเปลี่ยนใน `docs/BALANCE.md`
- B01/B02/B03/B04 เป็น 4 เหตุการณ์ต่อสู้ปกติ **มีทางเลี่ยงบางส่วน**; B05 เป็นบอสหลัก **การต่อสู้เป็นเงื่อนไขของบท** แต่ถ้าแพ้มี retry, optional `story-assist` ลด damage บอส 25% เพื่อไม่ติดขัด
- หาก B04 canFlee = `player has EIRA trust≥2`, หนีสำเร็จหลังใช้คาถาช่วยเปิดเส้นทาง; ไม่ได้หนีฟรีทุกกรณี
- Surrender ให้เฉพาะ BT_TRAINING พร้อมคำอธิบาย ส่วนฉากอื่นไม่แสดงปุ่มหรือแสดง locked พร้อมเหตุผล (boss ไม่มีตัวเลือกเลย)

## 8.4 Boss B05 script (ไม่ให้ Codex สุ่มทุกอย่าง)
- Phase 1 HP 150..101: วงรูนป้องกัน → โจมตีเดี่ยว → เผย clue ที่ทำให้รู้ว่าไม่ใช่ผู้ทำลาย; มี 1 เทิร์นสอน guard
- Phase 2 HP 100..51: บอสแสดง `seal_guard` 2-turn; ใช้ PIERCE ลดเกราะ หรือ BLOOM/ECHO + story effect ลด shield ได้; ไม่บังคับให้มีธาตุหายาก
- Phase 3 HP ≤50: บอสใช้ `memory_shards` เทิร์นเว้นเทิร์น เป็น area attack telegraph ชัด; หากผู้เล่นเคยช่วย LUMI/MAREN ให้เกิด assist ช่วยหนึ่งครั้ง
- ที่ 0 HP: ไม่แสดงการทำร้าย แต่บทสนทนา “ข้าเฝ้าเก็บเสียงไว้ เพราะกลัวมันสูญไปอีกครั้ง” → S23_DECISION และเลือกการจัดการเมล็ดความทรงจำ
- Boss cannot flee/surrender, ประกาศก่อนเข้าประตูว่า “เส้นทางนี้ย้อนกลับไม่ได้จนกว่าจะจบบททดสอบ แต่แพ้แล้วเริ่มใหม่ได้โดยไม่เสียของ”

## 8.5 Battle UX actions & fail-safes
- ส่วน `Item`: ของใช้จริง `IT_POTION_DEW` คืน HP 25, `IT_MANA_LEAF` คืน MP 15, `IT_FOCUS_SEED` เพิ่ม accuracy ของเวทถัดไป 15%; อย่าให้ใช้ item จำนวน 0
- ถ้า HP ฝ่ายศัตรู 0 → win ทันทีหลังผลสกิลจบ; reject การกดซ้ำ
- Status timing ประมวลผล deterministic; UI indicator ไม่แสดงอาการค้างหลังหมดเทิร์น
- ระบบตั้งเวลา auto-save หลังผู้เล่นทำ action แต่ต้อง restore to stable turn phase ไม่โหลดกลางเฟรมแอนิเมชัน
- test scenarios: no MP → BASIC_PULSE/GUARD ยังเล่นได้; equipped duplicates rejected; boss low HP; multiple enemies; flee allowed/denied; surrender practice vs boss; interrupted tab; save/load between turns; reduce motion

---

# 09 — Story Content: บทที่ 1 “หมู่บ้านที่ลืมเสียงเพลง” (Canonical scene graph)

## 9.1 Story design rule
- เนื้อเรื่องต้อง **เกิดจาก data scene graph** และมีอารมณ์อบอุ่น อัศจรรย์ ตลกบ้าง; บทพูดตัวละครไม่ยาวเกิน 2–3 บรรทัดต่อ speech bubble บน phone
- Scene ID ไม่เปลี่ยนหลัง publish; เพิ่ม Version/Migration หากต้องย้าย scene state
- ทุก scene มีฉาก BG, actor placement, 1–4 ประโยคเริ่ม, choiceIDs, actionCue และผล flags ที่นำไปใช้จริง; choices ไม่ใช่แค่เปลี่ยนบทพูดแล้วกลับจุดเดิมโดยไม่ทิ้งร่องรอย
- แยก **hub scenes** ที่กลับมาได้ `S02_HUB`, `S08_FOREST_GATE`, `S11_STREAM`, `S18_FESTIVAL_PREP` และ **one-shot scenes**; revisit มี conditional lines/props
- Scene condition for gates must have fallback visible hint; locked choice อาจแสดงเหตุผลสั้น ๆ ได้แต่ห้ามคลิกแล้วไม่เกิดอะไร
- มีกลไก `questHint()` ช่วยหาขั้นตอนที่ทำได้ต่อเมื่อผู้เล่นวน hub ≥3 รอบโดยไม่คืบหน้า

## 9.2 Required flags/quest counters (ต้องใช้ ID ตามนี้)
```
lumi_met, lumi_helped, maren_listened, musicbox_found,
koro_trained, crafted_first, first_battle_won,
forest_open, forest_clue, stream_clean, stream_clue,
archive_read, echo_hint, ruins_open, ruins_clue,
pip_fed, pip_joined, festival_ready, song_fragment,
seal_gate_found, echo_knot_cleared, guardian_resolved,
ending_kind, song_restored, village_changed,
battle_B01_done, battle_B02_done, battle_B03_done, battle_B04_done,
battle_B05_done
```
`clue_count` derive จาก `forest_clue`, `stream_clue`, `ruins_clue`, `archive_read`; `festival_ready` when `lumi_helped && crafted_first && clue_count>=2`; ให้ทุก clue เข้าถึงได้โดยไม่ต้องชนะ B01/B02/B03 ทั้งหมด

## 9.3 Scene map overview
```
S00_WAKE → S01_FIRST_STEPS → S02_HUB
                                 ├─ S03_LUMI ─ S03B_MAREN ─→ HUB
                                 ├─ S04_KORO → S05_CRAFT_TUTORIAL → HUB
                                 ├─ S06_GARDEN → HUB
                                 ├─ S07_ARCHIVE → S14_RESEARCH → HUB
                                 ├─ S08_FOREST_GATE → S09_FOREST → S10_FOREST_RESULT → S13_FOREST_SHRINE → HUB
                                 ├─ S11_STREAM → S12_STREAM_RESULT → HUB
                                 ├─ S15_RUINS → S16_RUINS_RESULT → S17_ECHO_TABLET → HUB
                                 ├─ S29_PIP_SIDEQUEST → HUB
                                 └─ S18_FESTIVAL_PREP → S19_FESTIVAL → S20_SEAL_PASSAGE
                                     → S21_ECHO_TRIAL → S22_GUARDIAN
                                     → S23_DECISION → S24 / S25 / S26 → S27_EPILOGUE
battle loss / story assist: S28_RECOVER → logical preceding hub or retrial
```

## 9.4 Scene-by-scene specification (ทุก Choice ID unique)

### `S00_WAKE` — ตื่นใต้ต้นเมล็ด (BG_VILLAGE_MORNING)
Actors player idle(center), PIP glimpse(foreground). Opening lines:
- ผู้บรรยาย: “ลมอุ่นพัดผ่านใบหญ้า ราวกับโลกกำลังสูดหายใจครั้งแรก”
- ผู้บรรยาย: “คุณลืมตาขึ้นใต้ต้นไม้ที่มีเมล็ดแสงลอยอยู่ระหว่างกิ่ง”
- พิพ: “ปิ๊บ...?”
Choices:
- `CH0001` “ลุกขึ้นสำรวจรอบตัว” → cue `stand,look_around`, flag `intro_observe=true`, S01
- `CH0002` “ลองฟังเสียงจากเมล็ดแสง” → cue `reach,glow_wave`, flag `intro_listened=true`, add `CORE_ECHO`? **ไม่ให้วัสดุหายากทันที** ให้ `learnHint: echo_whisper`, S01
- `CH0003` “เรียกหาใครสักคน” → cue `call,turn`, flag `intro_called=true`, เพิ่ม trust PIP +1, S01
No failure. ตั้ง player name ก่อน S00 ผ่าน UI แบบ optional; blank = อาเรน

### `S01_FIRST_STEPS` — เส้นทางสู่หมู่บ้าน (BG_VILLAGE_MORNING)
Opening: “ปลายทางเดินมีเสียงฆ้องเบา ๆ จากหมู่บ้านพฤกษารุ่ง” / พิพชี้ป้ายหมู่บ้าน
- `CH0101` “เดินตามป้ายไม้ไปที่จัตุรัส” → `walk_right,pan_to_village`, unlock `LOC_SQUARE`, S02
- `CH0102` “เก็บขนนกสีฟ้าที่ข้างทางก่อน” → `walk,pick_up`, add `CORE_WIND ×1`, unlock `LOC_SQUARE`, S02
- `CH0103` “ยื่นมือให้พิพเดินตาม” → `kneel,smile`, flag `pip_fed=false` unchanged, trust PIP+1, S02
Ensure player receives `CORE_WIND ×1` once via S02 tutorial grant if not CH0102; do not create softlock

### `S02_HUB` — จัตุรัสของเรื่องราว (BG_VILLAGE_MORNING / BG_FESTIVAL when ready)
Opening dynamic:
- first visit: “ชาวบ้านเดินผ่านพร้อมถือตะกร้าผลไม้ กลิ่นขนมลอยมากับลม”
- after `lumi_helped`: LUMI wave from left, banner music icon appears
- after `festival_ready`: flags and lantern props appear; after ending ambient melody added
Base options:
- `CH0201` “ไปหาลูมิที่บ่อน้ำ” → `walk_to_well`, S03
- `CH0202` “ไปโรงช่างของคุโร” → `walk_to_workshop`, S04
- `CH0203` “แวะสวนดอกไม้ของยายมาเรน” → `walk_to_garden`, S06
- `CH0204` “เข้าหอสมุดของไอรา” → `walk_to_archive`, S07
- `CH0205` “เดินทางสู่ชายป่า” → when `forest_open` OR `crafted_first` (S04 unlocks forest by conversation), cue `depart_west`, S08
- `CH0206` “สำรวจลำธารสีหยก” → when `lumi_met` OR `crafted_first`, cue `depart_east`, S11
- `CH0207` “เข้าโบราณสถานเสียงสะท้อน” → when `ruins_open`, cue `depart_north`, S15
- `CH0208` “ช่วยเตรียมเทศกาลเสียงเพลง” → when `festival_ready`, cue `festival_pan`, S18
- `CH0209` “ดูสมุดเวทและทดลองผสม” → UI route `CRAFTING_SCREEN` then return S02; no time skip
- `CH0210` “พักผ่อนที่ม้านั่ง” → cue `rest`, HP+15/MP+10/advanceTime 1, S02; add anti-spam ambient variation
- `CH0211` “ตามพิพไปดูของแปลก” → when `lumi_met`, S29
The UI can show 4–6 high-priority choices then expandable “สถานที่อื่น” list; do not cram 11 huge buttons into viewport

### `S03_LUMI` — กล่องดนตรีที่เงียบงัน (BG_VILLAGE_MORNING)
Opening: ลูมิเขย่ากล่องดนตรีอย่างระวัง / “เมื่อก่อนยายร้องเพลงกับหนูทุกเย็น แต่ตอนนี้ทำนองหายไปแล้ว...”
- `CH0301` “ช่วยดูว่ากล่องดนตรีเสียตรงไหน” → cue `inspect_box`, flag `lumi_helped=true, musicbox_found=true`, trust LUMI+2, `IT_MUSICBOX` quest item, S03B
- `CH0302` “ถามถึงเรื่องราวของเพลง” → cue `talk`, flag `lumi_met=true`, set `story_song_question=true`, trust LUMI+1, S03B
- `CH0303` “ชวนลูมิหายใจลึก ๆ แล้วค่อยหาวิธี” → cue `comfort`, flag `lumi_helped=true,lumi_met=true`, trust LUMI+2, S03B
Any path S03 sets `lumi_met=true`. If player chose CH0302, S03B offers `CH03B3` to help box, so mission remains completable

### `S03B_MAREN` — เสียงที่คุณยายจำได้ (BG_GARDEN use garden art)
Opening: มาเรนมองกล่องดนตรีแล้วเงียบไป / “ทำนองอยู่ตรงปลายลิ้น...แต่เหมือนมีใครพับกระดาษเพลงเก็บไว้”
- `CH03B1` “ฟังคุณยายเล่าเรื่องในอดีต” → cue `sit,listen`, flag `maren_listened=true`, trust MAREN+2, grant `CORE_BLOOM ×1`, S02
- `CH03B2` “ขอลองนำกล่องดนตรีไปให้ช่างดู” → `hold_box`, flag `lumi_helped=true,musicbox_found=true`, unlock workshop hint, S04
- `CH03B3` “บอกลูมิว่าจะช่วยตามหาทำนอง” → `handshake`, flag `lumi_helped=true`, trust LUMI+1, S02

### `S04_KORO` — โรงช่างที่กลิ่นเหล็กกับดอกไม้ (BG_WORKSHOP)
Opening: คุโรยกแว่นขึ้น / “ข้าซ่อมล้อเกวียนได้ แต่ซ่อมความคิดถึงของคน ต้องใช้เวทกับความตั้งใจ”
- `CH0401` “ขอเรียนการผสมเวท” → `workshop_zoom,show_three_slots`, flag `koro_trained=true`, add missing starter `CORE_WIND,FORM_ORB,MOD_SEEK` once, S05
- `CH0402` “ช่วยยกกล่องเครื่องมือ” → `pick_up_box`, add `FORM_ORB ×1`, trust KORO+1, set `workshop_help=true`, S05
- `CH0403` “ถามวิธีซ่อมกล่องดนตรี” → `inspect_musicbox`, flag `lumi_helped=true` only if `musicbox_found`, unlock `LOC_FOREST`, S05
At S04 first visit set `forest_open=true`; any path to S05 grants missing starter once

### `S05_CRAFT_TUTORIAL` — การกำเนิดเวทบทแรก (BG_WORKSHOP)
Opening: คุโร: “แค่เชื่อว่าสองสิ่งเข้ากันได้ยังไม่พอ ต้องรู้ว่าต้องการให้พลังมีรูปแบบอย่างไร”
UI must open crafting teaching Core/Form/Mod selection; validated first craft `SPELL_WIND_ORB_SEEK` and animate workbench 8 frames; allow alternate legal combination only if player has materials
- `CH0501` “ทดลองสูตรแรกจากของที่มี” → launch crafting UI; on success set `crafted_first=true`, grant exp +10 and `IT_MANA_LEAF ×2`, S02
- `CH0502` “ขอดูตัวอย่างส่วนผสมอีกครั้ง” → replay explain, S05 (non-progress option; flag tutorial hint)
- `CH0503` “ออกไปหาของเพิ่มเติมก่อน” → S02 (not locked; future return S05); user can re-enter and craft
No dummy success without actual spell created

### `S06_GARDEN` — สวนเมล็ดแห่งความทรงจำ (BG_GARDEN)
Opening: ดอกไม้บางดอกส่งเสียงกรุ๊งกริ๊งแทนกลิ่น / มาเรน: “ลองคุยกับต้นไม้ดูสิ บางครั้งมันได้ยินเราดีกว่าคน”
- `CH0601` “ช่วยรดน้ำและเก็บเมล็ด” → `water,pluck`, add `CORE_BLOOM ×1,FORM_RING ×1`, trust MAREN+1, `garden_tended=true`, S02
- `CH0602` “นั่งฟังเพลงเก่าที่คุณยายจำได้บางส่วน” → `sit,listen`, `maren_listened=true`, `song_memory_hint=true`, S02
- `CH0603` “ค้นหาน้ำค้างเยียวยา” → `kneel,collect`, add `MOD_HEAL ×1` (only once/day; show revisit cooldown), S02
- `CH0604` “ชวนยายไปงานเทศกาล” → when `lumi_helped`, trust MAREN+1, flag `maren_invited=true`, S02

### `S07_ARCHIVE` — หอสมุดของไอรา (BG_ARCHIVE)
Opening: ไอรากำลังเก็บแผนที่เก่าซึ่งมีรูนจางหาย / “มีคนมาถามเรื่องทำนองที่หายไปอีกแล้วหรือ?”
- `CH0701` “ขอดูจารึกเสียงสะท้อน” → `book_open`, S14
- `CH0702` “ถามว่าเศษความทรงจำคืออะไร” → `talk`, flag `echo_hint=true`, trust EIRA+1, S14
- `CH0703` “ช่วยจัดหนังสือก่อน” → `shelf_books`, trust EIRA+1, add `FORM_RAY ×1`, S14

### `S14_RESEARCH` — ร่องรอยบนหน้ากระดาษ (BG_ARCHIVE)
Opening: รูนปรากฏเป็นเส้นแสงเมื่อผู้เล่นแตะหน้าแผนที่ / “เสียงที่หายไปอาจถูกเก็บอยู่เหนือธารา ณ โบราณสถานเก่า”
- `CH1401` “จดพิกัดโบราณสถาน” → `trace_map`, flag `archive_read=true,ruins_open=true`, add `MOD_LINGER ×1`, S02
- `CH1402` “ศึกษาเวทเสียงสะท้อน” → `read,glow`, flag `archive_read=true,echo_hint=true`, add `CORE_ECHO ×1` once (rare, one copy), S02
- `CH1403` “ขอความช่วยเหลือจากไอรา” → `talk,hand_book`, trust EIRA+2, flag `archive_read=true,ruins_open=true`, S02
Every path to S14 grants `archive_read=true`; S14 must also unlock `ruins_open` on return no matter which path, preventing softlock

### `S08_FOREST_GATE` — ชายป่าม่านเมฆ (BG_FOREST)
Opening: ใบไม้ขยับราวกับกำลังบอกทิศทาง / “ป้ายไม้เก่าชี้ว่าครั้งหนึ่งที่นี่เป็นทางของนักดนตรีเร่”
- `CH0801` “เข้าไปตามทางแสง” → `walk_forest`, S09
- `CH0802` “เก็บขนนกกับละอองเมฆข้างทาง” → `collect`, add `CORE_WIND ×1,FORM_RAIN ×1` once/day, S09
- `CH0803` “กลับหมู่บ้านเตรียมเวทก่อน” → `walk_back`, S02

### `S09_FOREST` — ใบไม้ที่จำชื่อคุณได้ (BG_FOREST)
Opening: ต้นอ่อนตัวหนึ่งขวางทางส่งเสียงกริ๊ง; พิพดมใบไม้แล้วจามเป็นประกาย
- `CH0901` “ลองใช้เวทให้มันถอย” → `player_cast`, trigger `B01_FOREST_SPROUT`, win S10, loss S28
- `CH0902` “วางผลไม้ให้ต้นอ่อนแทน” → when `IT_FOREST_FRUIT>=1` (fruit collected via S29 or starter S08 interaction), `give_item`, consume fruit, `forest_clue=true`, trust PIP+1, S10; if unavailable show hint
- `CH0903` “สังเกตว่ามันกำลังเฝ้าอะไร” → `inspect`, flag `forest_clue=true`, S13 (bypass combat at cost of no battle rewards)
- `CH0904` “ถอยกลับไปเตรียมตัว” → S08
If CH0902 invalid still CH0903 open, ensuring ability to progress

### `S10_FOREST_RESULT` — เสียงบนใบไม้ (BG_FOREST)
Opening: ต้นอ่อนกลับมาเคลื่อนไหวอย่างสงบ / พบลวดลายโน้ตบนหินกลางป่า
- `CH1001` “ลอกลายโน้ตเก็บไว้” → `trace`, `forest_clue=true`, add `CORE_BLOOM ×1`, S13
- `CH1002` “ฟังว่าใบไม้ต้องการบอกอะไร” → `listen,wave`, `forest_clue=true`, `forest_verse=true`, S13

### `S13_FOREST_SHRINE` — ศาลาเก็บเสียงเก่า (BG_FOREST)
Opening: ข้างศาลามีเกสรทองไหวทั้งที่ไม่มีลม / ลูมิอาจปรากฏตาม trust
- `CH1301` “เก็บชิ้นส่วนโน้ตเรืองแสง” → `reach,rune_glow`, `forest_clue=true`, add `IT_NOTE_LEAF ×1` once, S02
- `CH1302` “ทดลองเวทกับศาลา” → `cast_action`, if has spell `BLOOM`/`ECHO` -> bonus `FORM_CHAIN ×1`, else hint, S02
- `CH1303` “นั่งพักกับพิพ” → `sit,pip_hop`, trust PIP+1, HP+10, S02

### `S11_STREAM` — ลำธารหยก (BG_STREAM)
Opening: น้ำไหลเป็นเส้นประกาย แต่ตรงสะพานมีหมอกหนาทึบ / “บางทีเสียงเพลงอาจถูกซ่อนอยู่ในกระแสน้ำ”
- `CH1101` “ตรวจดูหมอกใต้สะพาน” → `walk_bridge,inspect`, trigger `B02_STREAM_WISP`, win S12, loss S28
- `CH1102` “ใช้เวทลมพัดหมอก” → when known spell WIND, `cast_wind`, `stream_clean=true,stream_clue=true`, S12 (bypass)
- `CH1103` “เก็บน้ำหยกกับน้ำค้าง” → `collect`, add `CORE_WATER ×1,MOD_HEAL ×1` once/day, S12
- `CH1104` “กลับหมู่บ้าน” → S02

### `S12_STREAM_RESULT` — ทำนองในสายน้ำ (BG_STREAM)
Opening: หมอกเผยให้เห็นกระดิ่งเก่าที่ติดอยู่กับรากไม้ / น้ำกลับมาใสขึ้นหลังเลือกแก้ไข
- `CH1201` “ช่วยนำกระดิ่งออกจากรากไม้” → `careful_pull`, `stream_clean=true,stream_clue=true`, add `IT_OLD_BELL ×1` once, S02
- `CH1202` “ปล่อยกระดิ่งไว้และจำจังหวะเสียง” → `listen`, `stream_clue=true`, `stream_clean=false` unless already true, S02; หาก revisit สามารถ clean ภายหลัง
- `CH1203` “นำหยดน้ำไปให้ยายมาเรน” → `collect_water`, `stream_clue=true`, trust MAREN+1, S03B

### `S15_RUINS` — ประตูหินโบราณ (BG_RUINS)
Opening: เสาหินมีช่องว่างรูปกล่องดนตรี / ไอราเตือนว่า “ประตูเลือกคนที่ยอมฟัง ไม่ใช่คนที่เสียงดังที่สุด”
- `CH1501` “แก้รูนตามบันทึกหอสมุด” → if `archive_read`, `rune_solve`, `ruins_clue=true`, S17 (puzzle bypass)
- `CH1502` “เข้าท้าทายหุ่นพิทักษ์” → `step_forward`, start `B03_RUIN_SENTINEL`, win S16, loss S28
- `CH1503` “ลองใช้เสียงเพลงจากกล่อง” → if `musicbox_found`, `musicbox_shake`, `ruins_clue=true`, S17
- `CH1504` “กลับไปเตรียมของ” → S02

### `S16_RUINS_RESULT` — ผู้เฝ้าประตู (BG_RUINS)
Opening: หุ่นรูนหยุดขยับ เปิดช่องผนังพร้อมข้อความ “การจดจำเริ่มจากการฟัง”
- `CH1601` “อ่านรูนบนกำแพง” → `read_rune`, `ruins_clue=true`, add `MOD_PIERCE ×1`, S17
- `CH1602` “ตรวจผลึกของหุ่น” → `pick_crystal`, `ruins_clue=true`, add `FORM_WARD ×1`, S17

### `S17_ECHO_TABLET` — แผ่นจารึกแห่งคำสัญญา (BG_RUINS)
Opening: แผ่นหินบอกว่าเมล็ดแห่งความทรงจำกำลังเงียบลง / ผู้เล่นเห็นโน้ตเพลงสามดวงลอยอยู่
- `CH1701` “ถอดความหมายด้วยตัวเอง” → `trace_glyph`, `ruins_clue=true`, `song_fragment=true`, trust EIRA+1, S02
- `CH1702` “บันทึกภาพจารึกกลับไปให้ไอรา” → `draw,store`, `ruins_clue=true`, `song_fragment=true`, S07
- `CH1703` “ฟังเสียงที่แทรกอยู่ในรูน” → `listen_wave`, `ruins_clue=true`, `song_fragment=true`, `echo_hint=true`, S02

### `S29_PIP_SIDEQUEST` — พิพกับผลไม้ประหลาด (BG_VILLAGE_MORNING)
Opening: พิพพยายามดันผลไม้กลมที่ใหญ่กว่าตัวเองจนกลิ้งลงเนิน / มุกขำเบา ๆ
- `CH2901` “ช่วยพิพหยุดผลไม้” → `run_catch`, `pip_fed=true`, trust PIP+2, add `IT_FOREST_FRUIT ×2`, S02
- `CH2902` “ปล่อยให้พิพลองใช้ความคิดเอง” → `watch`, `pip_fed=true`, trust PIP+1, add `IT_FOREST_FRUIT ×1`, S02
- `CH2903` “ชวนพิพไปสวนมาเรน” → `walk_together`, `pip_joined=true`, trust PIP+1, S06
Never penalize for non-optimal side quest choices

### `S18_FESTIVAL_PREP` — งานฉลองที่ยังไม่มีเพลง (BG_FESTIVAL)
Gate `lumi_helped && crafted_first && clue_count>=2`; on entry `festival_ready=true`. Opening: ชาวบ้านแขวนโคมไฟ แต่บรรยากาศเงียบกว่าปกติ
- `CH1801` “ช่วยลูมิติดตั้งกล่องดนตรี” → `carry,place_musicbox`, trust LUMI+1, S19
- `CH1802` “ช่วยไอราเรียบเรียงโน้ต” → `arrange_notes`, trust EIRA+1, S19
- `CH1803` “ช่วยคุโรทำไฟเวทสำหรับเวที” → `craft_lanterns`, add `CORE_LIGHT ×1`, trust KORO+1, S19
- `CH1804` “กลับไปตรวจสิ่งที่ยังสงสัย” → S02

### `S19_FESTIVAL` — เพลงที่ขาดท่อนสุดท้าย (BG_FESTIVAL)
Opening: เสียงกระดิ่งดังขึ้น ชาวบ้านเงียบฟัง แล้วมีช่วงเสียงว่างในทำนอง / ลูมิ: “มันยังมีส่วนที่หายไป...แต่ตอนนี้หนูรู้แล้วว่าต้องไปหาใคร”
- `CH1901` “ตามประกายรูนที่ลอยออกจากกล่อง” → `follow_rune,fade`, `seal_gate_found=true`, S20
- `CH1902` “ปรึกษาไอราว่าเสียงหายไปไหน” → `talk_archive`, `seal_gate_found=true`, trust EIRA+1, S20
- `CH1903` “ให้กำลังใจลูมิและขอเวลาอีกนิด” → `hand_on_shoulder` (non-romantic), `seal_gate_found=true`, trust LUMI+1, S20

### `S20_SEAL_PASSAGE` — ทางผ่านผนึก (BG_RUINS variant dusk)
Opening: ซุ้มรูนเปิดออก เงาประกายค่อย ๆ กลายเป็นสะพาน / ป้ายเตือนเกี่ยวกับภารกิจที่ยังกลับมาทำได้หลังจบบท
- `CH2001` “เข้าไปตรวจเสียงที่ขาดหาย” → `step_forward`, S21
- `CH2002` “ตรวจช่องผนึกหาวัตถุดิบก่อน” → `inspect,collect`, add `CORE_SHADOW ×1` once, S21
- `CH2003` “กลับไปจัดเวทและเตรียมของ” → S02; gate remains accessible

### `S21_ECHO_TRIAL` — ปมเสียงย้อน (BATTLE_RUINS)
Opening: ปมแสงหมุนตามเสียงที่ผู้เล่นใช้ / ไอราเตือนว่า “มันจดจำสิ่งที่เธอเพิ่งทำเมื่อครู่”
- `CH2101` “เลือกต่อสู้กับปมเสียงย้อน” → `combat_intro`, battle `B04_ECHO_KNOT`, win S22, loss S28
- `CH2102` “ให้ไอราลองแยกรูนก่อน” → when trust EIRA≥2, `eira_glyph`, `echo_knot_cleared=true`, S22 (alternative bypass)
- `CH2103` “ย้อนกลับไปเตรียมตัว” → S20

### `S22_GUARDIAN` — ผู้พิทักษ์รอยลืม (BATTLE_RUINS)
Opening: ร่างรูนหินลอยขึ้นเหนือวงแหวน / “ข้าถูกสร้างมาเพื่อเก็บสิ่งที่ไม่มีใครอยากสูญเสีย” / แสดง badge ‘บอส: ไม่สามารถหนีหรือยอมแพ้; แพ้แล้วลองใหม่ได้’
- `CH2201` “ยืนยันเข้าทดสอบผนึก” → `guardian_awaken`, battle `B05_MEMORY_GUARDIAN`, win S23, loss S28
- `CH2202` “จัดเวทและทบทวนคำใบ้ก่อน” → open spellbook + tips, return S22
- `CH2203` “กลับไปเตรียมตัวที่หมู่บ้าน” → S02

### `S23_DECISION` — ทางเลือกของเมล็ด (BG_RUINS with sunrise)
Opening: เมื่อผนึกสงบ ผู้พิทักษ์ถามว่า “เสียงหนึ่งเสียงควรอยู่ในกล่องเพียงใบเดียว หรือเดินทางต่อไปกับทุกคน?”
Three distinct endings; all restore basic song, difference is how village evolves:
- `CH2301` “คืนเสียงเพลงให้ลูมิและยายด้วยตัวเอง” → `hand_memory,soft_glow`, `guardian_resolved=true,song_restored=true,ending_kind='FAMILY'`, S24
- `CH2302` “กระจายเสียงเพลงให้คนทั้งหมู่บ้านร้องร่วมกัน” → `rune_burst,community_glow`, `guardian_resolved=true,song_restored=true,ending_kind='COMMUNITY'`, S25
- `CH2303` “เก็บบทเพลงต้นฉบับไว้ในหอสมุดและมอบสำเนาให้ทุกคน” → `scribe,seal_copy`, `guardian_resolved=true,song_restored=true,ending_kind='ARCHIVE'`, S26
Choices are all valid, not moral ranking; branch visual stage decorations and NPC closing lines

### `S24_END_FAMILY` — เพลงของบ้านหลังหนึ่ง (BG_GARDEN dusk)
Opening: คุณยายมาเรนฮัมทำนองได้จนจบ ลูมิร้องคลอตามอย่างภูมิใจ / คุโรแกล้งทำหน้าเข้มเพราะมีฝุ่นเข้าตา
- `CH2401` “บันทึกเรื่องราวบทแรกลงสมุด” → `journal_write`, `village_changed=true`, setEnding `END_FAMILY`, S27

### `S25_END_COMMUNITY` — เสียงร้องของทั้งหมู่บ้าน (BG_FESTIVAL)
Opening: โคมไฟเรียงเป็นคลื่นเพลง ผู้คนช่วยกันเติมทำนองคนละนิด / ไอราบอกว่า “สิ่งที่จดจำร่วมกัน อาจไม่หายไปง่ายนัก”
- `CH2501` “จดจำคืนนี้ไว้” → `festival_pan,journal_write`, `village_changed=true`, setEnding `END_COMMUNITY`, S27

### `S26_END_ARCHIVE` — สมุดที่ไม่ปิดเล่ม (BG_ARCHIVE)
Opening: หอสมุดตั้งชั้นใหม่ชื่อ “บทเพลงของเรา” ลูมิวาดรูปกล่องดนตรีไว้บนปก / เศษรูนบนแผนที่เผยตำแหน่งหอคอยนาฬิกาดาว
- `CH2601` “เขียนบันทึกหน้าแรก” → `archive_write,star_glow`, `village_changed=true`, setEnding `END_ARCHIVE`, S27

### `S27_EPILOGUE` — โลกยังจดจำ (BG_VILLAGE_MORNING variant after festival)
Opening: หมู่บ้านเปลี่ยนตาม ending_kind, NPC พูดประโยคพิเศษ + ภาพภาพจำจาก choices 3–5 เหตุการณ์ / credit ขอบคุณผู้เล่น
- `CH2701` “กลับไปสำรวจหมู่บ้านต่อ (หลังจบบท)” → S02 free-play; show `chapter1Complete=true`; ไม่ reset flags
- `CH2702` “อ่านสมุดความทรงจำ” → open journal, return S27
- `CH2703` “เริ่มชีวิตใหม่ในโลกที่ต่างออกไป” → ต้องกด confirm ชัดเจน แล้ว create new seed/save slot; **ห้ามลบเซฟเดิมเงียบ ๆ**

### `S28_RECOVER` — จุดพักสำหรับคนไม่ยอมแพ้ (BG_VILLAGE_MORNING)
Opening: พิพเข็นใบไม้ที่เต็มด้วยยาพลังเข้ามา / “ปิ๊บ! รอบหน้าเตรียมเวทเพิ่มไหม?”
- `CH2801` “กลับจุดก่อนสู้และลองใหม่” → respawn scene based on `lastBattleCheckpointSceneId` (S09/S11/S15/S21/S22), HP 70%, MP 50%, no item duplication
- `CH2802` “กลับโรงช่างเพื่อผสมเวท” → S04
- `CH2803` “ขอคำใบ้เกี่ยวกับศัตรู” → show local hint for last encounter, return S28 (no cost)

## 9.5 Canonical dialogue lines / voice constraints
- LUMI: “หนูจำได้ว่าตอนนั้นยายยิ้ม...แต่ทำไมเสียงเพลงหายไปนะ?” / หลังช่วย: “หนูรู้แล้วว่าถ้าหาไม่เจอ ก็ลองฟังให้ดีกว่าเดิม!”
- MAREN: “ของบางอย่างไม่ได้หายไปไหน แค่กำลังรอคนช่วยเปิดหน้าต่างให้มัน”
- KORO: “เวทมนตร์ไม่ใช่การโยนแสงสีให้เต็มท้องฟ้า แต่คือการรู้ว่าอยากเปลี่ยนอะไร”
- EIRA: “หนังสือเก็บเรื่องเล่าได้ แต่หัวใจของเรื่องเล่าต้องมีคนฟัง”
- PIP: “ปิ๊บ ปิ๊บ!” / translator captions when quest requires: “(ดูเหมือนพิพอยากให้ตามไป)”
- SENTINEL: “การลืมอาจทำให้เงียบลง แต่การจำทั้งหมดก็ไม่ได้แปลว่าจะเข้าใจ”
- Narrator (opening): “ถ้าโลกหนึ่งใบจดจำทุกเรื่องราวของเราได้...คุณจะเลือกฝากอะไรไว้กับมัน?”
- Narrator (ending): “เสียงเพลงกลับมาแล้ว แต่เรื่องราวของคุณเพิ่งเริ่มต้น”
- Avoid romantic roleplay, gore, offensive stereotypes, long text blocks; tone family-friendly

## 9.6 Dialogue branch reactions
- หาก `maren_listened=true` และ `lumi_helped=true` → ใน S19 มี voice line “หนูคิดว่าเสียงของยายเริ่มกลับมาแล้ว...” และ trust +1 LUMI once
- หาก `pip_joined=true` → PIP appears on side in S20 & B05 assist animation (does not change difficulty significantly)
- หาก `stream_clean=true` → S27 สะพานมีน้ำใส ดอกไม้เพิ่ม และชาวบ้านพูดถึงการกลับมาของปลา
- หาก `archive_read=true` → EIRA ใน S22 ให้ hint ปลดกลไกบอส
- หาก `battle_B03_done=true` → KORO ชมการฝึกเวทและปลด catalyst แรกหลังจบ
- หาก `festival_ready=true` → town lantern animation changes at night
- หาก `ending_kind='FAMILY'|'COMMUNITY'|'ARCHIVE'` → S27 stage decorations and closing dialogue different, but CH2 accessible equally (later release)

## 9.7 Quest definitions and rewards
| Quest ID | Trigger | Steps | Completion | Reward |
|---|---|---|---|---|
| `Q_MAIN_SONG` | S03 | ช่วยลูมิ → ผสมเวท → หา clues 2 → เทศกาล → guardian | S23+ending | chapter closure, unlock CH2 preview |
| `Q_CRAFT_FIRST` | S04 | รับ starter parts → choose 3 slots → craft legal spell | S05 success | exp10, IT_MANA_LEAF×2 |
| `Q_STREAM_CLEAN` | S11 | จัดการหมอก/ช่วยกระดิ่ง | S12 CH1201 | CORE_WATER, town art variation |
| `Q_PIP_FRUIT` | S29 | ช่วยผลไม้/ชวนพิพ | S29 CH2901/2/3 | fruit, trust PIP |
| `Q_ARCHIVE_NOTES` | S07 | ค้นหน้ารูน/กลับมาเล่าให้ไอรา | S17 CH1702 or 1703 | FORM_RAY, trust EIRA |
| `Q_BATTLE_TRAINING` | S04 optional | ฝึกกับภูตจำลอง | win BT_TRAINING | exp5, potion×1 |

- Quests tracked per-state; rewards once; journal displays “ทำแล้ว” and next hint; optional quests never gate main quest except tutorial craft

## 9.8 Story graph checks (automated)
- Every `next` ID resolves to scene or UI route; every `startBattle` has win/loss mapping; no missing phase
- Each scene except ending/hub has outgoing playable choice, no required item permanently missable, no `onceOnly` gate traps
- 3 endings reachable from clean save with test paths; at least 3 meaningful side-choice flags that alter later dialogue/stage
- Main quest has path without winning B01,B02,B03,B04 (except B05 boss) and a path with all four battles
- LUMI quest must be completable no matter CH0301/2/3; crafting not require exact choice CH0102; ruins entry never fails if no musicbox
- No duplicate reward exploit on hub revisits/reloads; repeatable gather limited once/game-day with log

---
# 10 — AI Storyteller (เสริมหลัง M5, ห้ามบังคับใช้)

## 10.1 วัตถุประสงค์และสิทธิ์
AI มีหน้าที่ **แต่งรูปประโยคจากข้อเท็จจริง** ไม่ใช่ game master ที่เปลี่ยนค่าเกม อนุญาตเฉพาะ `ambient one-liner`, `NPC remark`, `journal flavor`, `rumor with valid flag`, `weather flavor` และบทสนทนาที่ไม่ส่งผล state โดยตรง

- AI ถูกปิดเป็นค่าเริ่มต้น; เปิดด้วย consent UI อธิบาย: ต้องดาวน์โหลดไฟล์โมเดลขนาดใหญ่เท่าใดโดยประมาณ (อ่านจากจริง), ใช้พื้นที่อุปกรณ์, offline ได้หลังโหลด และอาจช้า; มีปุ่มยกเลิก
- ใช้โมเดลขนาดเล็ก **ที่มีสิทธิ์ redistributable/use in browser และรองรับภาษาไทยจริงจากการทดสอบ** ผ่าน Web Worker/WebGPU เมื่อ browser รองรับ พร้อม fallback WASM/CPU หากผลลัพธ์และประสิทธิภาพผ่านเทสต์; ถ้าไม่ผ่านให้ใช้ Story Template Engine เท่านั้น
- ห้ามเรียก OpenAI หรือ provider paid API จาก client พร้อม hardcoded key; GitHub Pages ไม่มี server ในตัว อย่าสร้างความเข้าใจผิดว่ามี backend ปลอดภัย
- ถ้าโมเดลแรกช้าเกิน / ภาษาไทยผิด / เกิด hallucination มาก ไม่ต้องใส่ AI runtime ใน v1.0: ใช้ AI ในช่วง development เพื่อช่วยเขียน static local variations ที่ผ่านการ review แล้วแทน

## 10.2 Exact input/output contract
AI รับเฉพาะ serialized minimal context แบบไม่เผยข้อมูลส่วนบุคคล:
```ts
type StoryAIInput = {
  sceneId: string;
  speakerId: string;
  speakerStyle: 'curious'|'gentle'|'scholar'|'craftsman'|'mysterious';
  latestRelevantEvents: Array<{eventId: string; summaryTh: string}>; // max 5
  permittedFacts: string[]; // แค่ facts ที่ world engine ยืนยันแล้ว
  desiredTone: 'warm'|'playful'|'wonder'|'reflective';
  maxThaiCharacters: 120;
};
type StoryAIOutput = { textTh: string; usedFactIds: string[] };
```
- System instruction (internal prompt): “เขียน 1–2 ประโยคภาษาไทยสั้นที่สอดคล้องเฉพาะ permittedFacts; ห้ามเสนอรางวัลหรือเปลี่ยนข้อเท็จจริง; ห้ามสร้าง event ใหม่; ห้ามใช้คำไม่เหมาะกับเกมครอบครัว; ห้ามออกนอกโลก GODSEED; ถ้าไม่แน่ใจให้คืนข้อความว่าง”
- Validate length, control characters, policy-unsafe text, fact references, named entity allowlist; low confidence → fallback authored line
- Generation has timeout budget and cancellation; UI never blocks choice input waiting for AI. Cache by `sceneId + speakerId + valid context hash + locale`
- Local templates fallback: at least 4 variations per major NPC per phase; conditional on flags and `seed` but never contradict canonical script

## 10.3 AI quality gate
- >= 100 synthetic context tests with canned facts; 0 critical lore contradictions, 0 invalid item/quest claims, sensible Thai in ≥90% samples on selected test devices (if measurable); report methodology
- Stability: interrupted download, airplane mode, memory failure, browser refresh, GPU unavailable → game continues with templates
- Performance gate: AI disabled by default, no AI model loaded during initial game start; run only when user explicitly enabled; never block rendering thread

---

# 11 — UX, screens และ exact interactions

## 11.1 Main menu
Visual: animated village from stage atlas with living environment; logo GODSEED in custom pixel-friendly wordmark; buttons:
1. “เริ่มต้นเรื่องราวใหม่” (opens name+seed opt; default seed generated by crypto source if available)
2. “เล่นต่อ” (only enabled if saved state exists; show day/location)
3. “สมุดบันทึก” (only with save, inspect story/recipes)
4. “ตั้งค่า” (audio/graphics/text speed/reduce motion/AI opt-in later)
5. “วิธีเล่น” (touch+choice mechanics+spell+combat+save)
Footer: build version, license/credits, privacy (all local by default)

## 11.2 Story scene screen
- World stage/actors; compact top overlay: `Day N | time phase | location` and `Journal` icon; no busy HUD covering scenery
- Dialogue: speaker name, 1–2 lines per bubble, next arrow; text types in optional and skip; when all lines done show choices; 3–6 immediate relevant buttons (more options collapsible) with readable short label + subtle icons
- When selecting, button goes into loading/action state, other choices disabled; animate, commit and show result; cannot double select
- Choice colors: normal slate/cream, meaningful unlocked sage accent, dangerous amber only for boss confirmation (not red panic)
- Persistent buttons: settings/sound, journal, crafting (when unlocked), return to hub only where story permits

## 11.3 Crafting screen
- Tabs `ผสมเวท / สมุดเวท / จัดช่องเวท`
- Ingredient categories at top, 3 slots displayed with slot labels; selecting item lists owned qty, origin and uses
- Result preview before craft: name if known, else `เวทยังไม่ค้นพบ`, compatibility hints; no false claim if invalid; confirm craft to consume first discovery
- After success: full-screen short spell reveal (≤2s, skip), visual VFX, unlock toast, tutorial “แตะช่องเวทเพื่อใส่สกิล”; when same formula crafted again show “รู้จักเวทนี้แล้ว” **ไม่ consume**
- Equipped slot UI 4, tap-to-assign, no mandatory drag, filter by element, target, MP; allow unequip except last spell? BASIC_PULSE ensures always viable

## 11.4 Combat screen
- Player/enemy HP numeric/mini bars, MP, status, enemy intent. No text over enemy face
- 4 equipped spells 2×2, each shows icon, name (truncate gracefully), MP cost; short long-press/Info tap to open exact tooltip; inactive spells disabled with reason
- utilities `โจมตีพื้นฐาน`, `ป้องกัน`, `ไอเทม`, `หลบหนี`, and `ยอมแพ้` where allowed; after action show damage/HP update/next intent
- Boss pre-entry confirmation and no flee; in battle menu display `ไม่สามารถหนี` informative panel only, not fake active button
- End screen `ชัยชนะ` / `ถอยกลับ` / `พักแล้วลองใหม่` with rewards and action to continue, no hard cut to unrelated screen

## 11.5 Journal + map + recap
- “สมุดโลกจดจำ”: tabs `เรื่องราว`, `บุคคล`, `สถานที่`, `สมุดเวท`, `เบาะแส`
- Recap auto-generated from structured event log (not random AI): choices that mattered, whom you helped, why location changed, next suggestion
- Map is **route map** with nodes; unlocked vs unknown nodes; tapping unlocked node shows “เดินทางไป” choice that plays transition. Not free-roam movement map
- Revisit choices only show if logically reachable; required main quest breadcrumbs always visible from journal

## 11.6 Settings and recovery
- Sound/music independent; story text speed 0 (instant)/normal/slow; reduce motion default OS respect; graphics Low/Medium/High with Auto detection and manual override
- Explicit save/export/import/reset controls: `รีเซ็ตข้อมูล` behind confirmation, no surprise wipes
- If IndexedDB unavailable: try memory mode with banner, allow JSON export while session lasts; explain limitation transparently
- Update notice on new schema, browser cache update if PWA; use service worker carefully to avoid old `index.html` with new assets

---

# 12 — Audio direction

- Original ambient music only, or licensed and verified with attribution; no excerpts from commercial RPG soundtrack; game playable muted
- Sound vocabulary: UI soft wood click; pickup chime; spell pattern layered by element; enemy warning short sound; NPC voice = **text-only unless original voice created**; no TTS dependency to play
- Music themes: `Village Morning` relaxed bells, `Forest Path` plucked strings, `Archive` soft celesta, `Craft Workshop` gentle taps, `Battle` active percussion not stressful, `Guardian` orchestral-lite chimes, `Ending` warm melody; all are design directions, not permission to copy songs
- Use WebAudio unlock on first user interaction, pause/resume correctly, volume defaults music 0.4/sfx 0.65, captions for important audio cues
- Avoid sudden loud volume and repetitive shrill effects; no flashing in sync with sound

---

# 13 — Engineering architecture / code style / build

## 13.1 Stack fixed unless technical obstacle documented
- Node.js current maintained LTS available in Codex/GitHub Actions; npm + lockfile, TypeScript strict
- Phaser 4 release that is stable/works in target environment; as of 5 Nov 2026 official download lists v4.2.1, verify compatibility and source changelog before coding
- Vite bundler, Vitest unit/integration, Playwright browser E2E, ESLint, HTML/CSS native UI; React is not required and should not be introduced without measurable advantage
- No server auth, paid dependencies, unknown telemetry, or secrets; all app source committed to owner's repo
- Source data typed with schemas, asset manifest checks; eager load essentials / lazy load later chapters
- Only external assets with verified licenses; license manifest persisted

## 13.2 Module contracts
```
src/engine/rng.ts               seeded RNG API: nextFloat/nextInt/weighted/serialize
src/engine/state.ts             pure reducer + transactions, immutable updates
src/engine/save.ts              IndexedDB persistence + migration/export/import
src/engine/conditions.ts        evaluate declarative Conditions
src/engine/effects.ts           apply declarative Effects; idempotency keys
src/engine/eventBus.ts          strongly typed channels for render/UI
src/systems/story/story.ts      scene graph, choice eligibility, action queue
src/systems/story/npcMemory.ts  fact-based memory and dialogue line selection
src/systems/travel/travel.ts    route node availability, cinematic transitions
src/systems/craft/catalog.ts    8/6/7 ingredients and legality matrix
src/systems/craft/spells.ts     generated 234 stable definitions
src/systems/craft/inventory.ts  item grants, consuming once, limits
src/systems/combat/combat.ts    deterministic turn/actor/status resolution
src/systems/combat/enemyAI.ts   telegraph intents + seeded policy
src/scenes/StageDirector.ts     layered scenes and reusable action cues
src/scenes/BattleDirector.ts    battleground, camera, actors, VFX
src/scenes/SpellVFX.ts          procedural emitter composer
src/ui/                         controls, panels, screenreader hooks
src/content/                    canon scenes, dialogue, enemies, items, NPCs
src/audio/                      sfx/music manager
src/ai/                         optional storytellers; dynamic import only
```

## 13.3 Hard invariants
- Engine rules do not import Phaser; pure testable TS
- UI cannot mutate state except through commands/reducer
- Text input sanitized; no direct unsafe HTML interpolation; CSP best practice where practical without breaking GitHub Pages
- Rule engine is deterministic given state/seed/commands; story generation cannot grant items
- One scene/action transition at a time; transaction IDs prevent double rewards
- No references to missing assets at runtime; validate during `npm run validate:content`
- Event log includes choice outcome and battle outcome, but do not collect personal info
- All user-visible strings in Thai in localization catalog, not scattered raw strings in 60 places
- Avoid giant single-file code architecture; write unit tests for each module
- Browser memory use tracked, scene teardown disposes textures/listeners/tweens; use asset atlases and pool particles

## 13.4 Repo standard scripts
```
"dev": "vite",
"build": "tsc --noEmit && vite build",
"preview": "vite preview",
"typecheck": "tsc --noEmit",
"lint": "eslint .",
"test": "vitest run",
"test:e2e": "playwright test",
"validate:content": "tsx scripts/validate-content.ts",
"test:all": "npm run typecheck && npm run lint && npm run validate:content && npm run test && npm run build"
```
Codex ต้องติดตั้ง dependency ที่ใช้จริงตาม scripts; ไม่ใช่เขียนชื่อ scripts แล้วรันไม่ได้ และ `test:e2e` ต้องมี playwright config + browser install guidance

## 13.5 GitHub Pages deployment จากมือถือ
- Repository ชื่ออะไรก็ได้; Vite `base = process.env.VITE_BASE_PATH || '/'` โดย Actions คำนวณตาม `owner.github.io` root repo หรือ `/<repo>/` สำหรับ project repo; validate base against `GITHUB_REPOSITORY` ไม่ hardcode `/godseed/` ในโค้ด
- `.github/workflows/ci.yml`: on push + PR; checkout, setup-node, `npm ci`, typecheck, lint, validate:content, unit, build; e2e in CI if practical
- `.github/workflows/deploy.yml`: trigger on main after CI required status or gate inside workflow; `actions/configure-pages`, `upload-pages-artifact` dist, `deploy-pages`; permissions `contents: read`, `pages: write`, `id-token: write`; use current supported actions versions rather than guessing
- README ไทย: เจ้าของจากมือถือทำ Settings → Pages → Build and deployment → GitHub Actions ถ้ายังไม่ได้เปิด; Repo Settings อาจมี UI เปลี่ยนได้ จึงให้ลิงก์/วิธีที่ตรงจริง ไม่อ้างว่าคลิกให้แล้ว
- CI และ Deploy ไม่ควรใช้ส่วนลับใด ๆ; lockfile committed; no secrets to public repository
- Paths for spriteheets/audio/model use BASE_URL; initial URL load on `https://<owner>.github.io/<repo>/` must return no 404; if custom domain use correct base
- PWA optional after base game; service worker scope matches repo subpath, safe update strategy and explicit offline state, do not cache huge AI model automatically
- GitHub Pages เป็น static site: ไม่มี multiplayer server, global save sync, secure cloud AI endpoint หรือ secrets ฝั่งเซิร์ฟเวอร์ให้ใช้ฟรีโดยอัตโนมัติ

## 13.6 Asset budget and loading
- Essential initial download budget goal ≤5MB compressed JS/CSS+initial art (excluding optional audio and AI) after optimization; each new chapter lazy loads backgrounds/atlas
- Texture atlas limit adapt to devices, split at 1024/2048 px where appropriate; validate memory usage by browser snapshots when possible
- Display loading with progress text and retry; no black screen forever if unavailable asset
- Preload world atlas/first scene; load combat on first transition to forest; cache previously loaded stage
- Document frame-rate and memory tests honestly; device emulation alone is not enough to assert hardware performance

---

# 14 — Test strategy: tests are part of the product

## 14.1 Unit tests (minimum)
1. seeded RNG: identical seed and command sequence yields identical outcomes; varied seed yields valid but different result
2. all SceneIDs/ChoiceIDs unique, every transition resolves, all required clues reachable
3. no essential item permanently missable, no choice can trap player
4. `generateLegalSpells()` counts exactly 234; no duplicate IDs; invalid recipes refund materials
5. crafting consumes only first discovery, re-crafting known spell cannot duplicate or consume
6. all 234 spells produce finite/positive or defined supportive stats; no NaN and valid target/VFX descriptor
7. status interactions no infinite stacking; finite turn expiry; no damage negative
8. battle enemies legal AI actions; boss cannot flee/surrender, practice can
9. save schema validation, migration, idempotent rewards, export/import rejection of malformed JSON
10. NPC memory facts updated after choices; ending branches reflect actual flags; AI never mutates state
11. responsive derived UI models correct number of equipped slots & no unavailable actions shown as actionable
12. ensuring `BASIC_PULSE` when MP=0 and GUARD restores MP
13. once/day rewards cannot be duplicated by reload or repeated quick tap
14. `REDUCE_MOTION` leaves state outcomes identical; changing graphics doesn't alter RNG

## 14.2 Story integration tests: golden paths
- **PATH_FAMILY:** S00 CH0001 → S01 CH0102 → S02 CH0201 → S03 CH0301 → S03B CH03B1 → S02 CH0202 → S04 CH0401 → S05 craft WIND/ORB/SEEK → S02 CH0204 → S14 CH1401 → S02 CH0205 → S09 CH0903 → S13 CH1301 → S02 CH0208 → S18 CH1801 → S19 CH1901 → S20 CH2001 → S21 CH2101 battle win → S22 CH2201 boss win → S23 CH2301 → S24 CH2401 → S27
- **PATH_COMMUNITY:** same prerequisites with stream CH1102/CH1201 instead of forest, S23 CH2302 → S25
- **PATH_ARCHIVE:** S07/S14 clues + S15/S17 ruins + main crafting, S23 CH2303 → S26
- **PATH_BATTLE_FULL:** S09 CH0901 B01 win, S11 CH1101 B02 win, S15 CH1502 B03 win, S21 CH2101 B04 win, S22 B05 win; no item/reward double count
- **PATH_LOW_POWER:** reach S22 with minimal materials, ensure 0MP fallback, story-assist option, no impossible boss lock; retreat before boss and craft
- **PATH_RECOVERY:** lose B01/B05 → S28 → replenish → retry and win with no save corruption

The above are desired path contracts. Codex must implement missing intermediary hub returns and preconditions correctly and update path tests to match actual canonical transitions, while **never weakening assertions just to make broken code pass**. Record any necessary path adjustment in DECISIONS

## 14.3 Browser and touch E2E
- Start new, enter name Thai, select choice, watch animation state, collect item, craft spell, equip slot, enter combat, cast, finish scene, save, reload, resume
- Phone portrait 360×800: no horizontal scroll; buttons all tappable; dialogue and 4 spell slots visible; no UI behind notch/home indicator; gesture scrolling works
- iPad portrait/landscape: side panel adjusts, no giant empty space or cutoff, pointer/touch works
- Desktop mouse+keyboard: focus visible, Tab navigable, key activation, Esc closes modal
- Rotate device mid-dialogue and battle: no state duplication; no scene reset on resize
- API/GPU unavailable: fallback mode still playable and AI skipped
- Cache refresh deploy: asset fetch correct with base path; offline reload works only when assets cached and PWA enabled
- VFX distinct screenshots: 6 representative spells produce visibly different geometry and no overwhelming flashes
- Audio no autoplay until user gesture, UI works muted

## 14.4 Performance and art-quality gates
- GATE_VISUAL: at least 3 finished layered stages + player walk/interact/cast + environment animation + boss VFX + consistent palette at mobile resolution; if generated art is placeholders document fail
- GATE_PLAY: loop from opening to ending with no manual code hacks, story/craft/combat all connected and tested
- GATE_MOBILE: landscape/portrait across specified targets, focus and tap, no overlaps
- GATE_STABILITY: 20 rapid choices/resize/reload interactions without blank screen, no asset 404 or unhandled promise rejections
- GATE_BALANCE: scripted boss victory feasible with starter and gatherable spells (target combat 5–12 turns on standard), no unwinnable RNG
- GATE_CONTENT: Thai proofreading, no leftover placeholder English, NPC pronouns consistent, credits/licenses provided
- GATE_AI (if enabled): see §10.3, AI may remain off if not met

---

# 15 — Development roadmap & release gates (Codex must follow)

## M0 — Bootstrap, deploy and test harness
**Deliverables:** Vite+TypeScript+Phaser 4 boot, mobile responsive shell, safe-area CSS, assets loading screen, scripts, CI, Pages workflow, README, docs status. 
**Pass:** `npm ci && npm run test:all` green, GitHub Pages page opens on phone/tablet/desktop simulations, no public secret

## M1 — Animated choice-driven core
**Deliverables:** scenes S00,S01,S02,S03,S04, stage atlas BG_VILLAGE_MORNING and BG_WORKSHOP (plus S03 actor scene), player/NPC sprites animate, choice action director, dialogue overlay, animations skippable, story flags, save. 
**Pass:** select “ไปโรงช่าง” and watch player move then stage transition; reload resumes same state

## M2 — Ingredient/crafting spellbook
**Deliverables:** 8+6+7 ingredient definitions, crafting UI, recipe rules generated 234 unique legal spells, deterministic name/stats/VFX descriptions, inventory, one-time first discovery, 4 equip slots. 
**Pass:** successful first craft with visual feedback, wrong combinations do not consume, 234 tests pass, magic equippable

## M3 — Combat and VFX
**Deliverables:** turn battle stage, B01 + BT_TRAINING at first, all actions, statuses, enemy intent telegraph, spell VFX composer, result transition; extend B02–B05 with balance. 
**Pass:** 6 representative spells show distinct patterns, battle win/loss/retry runs, no unactionable lock

## M4 — Chapter 1 complete
**Deliverables:** scenes S00–S29 referenced in §9 and hub loops, 4 normal encounters and boss, LUMI/MAREN/KORO/EIRA/PIP, 3 endings, quest journal, route map, stage changes, recollections. 
**Pass:** all golden paths play to closure, each ending branch visibly distinct

## M5 — Mobile/iPad/Desktop polish and launch
**Deliverables:** art bible polish, animations, audio, optimization, test matrix, backups, README Thai, licenses, full GH Pages check and release notes. 
**Pass:** no high priority defects, documented screenshots/screen recordings on simulated devices + clearly labeled whether real hardware tested; 50/50 pacing evaluated via observed playthrough times

## M6 — Optional Storyteller AI
**Deliverables:** CPU/GPU checks, opt-in, local text generator if Thai quality is acceptable, fallback template, cache, validated output, consent, tests. 
**Pass:** no crash when AI disabled/unavailable, game remains playable, no secrets exposed

## M7 — Expansion chapter 2
**Deliverables:** star-clock tower, 8–12 new scenes, 2 new enemy patterns, puzzle using ECHO/LIGHT, 1 new NPC, 2 endings nuances; test migrations. 
**Pass:** saves from M5 can continue, story lore coherent

## M8 — Expansion chapter 3
**Deliverables:** sky archive, 8–12 new scenes, late game rune crafting challenges, ending arc, replay summaries, more ambient events. 
**Pass:** existing main storyline not regressed

## M9+ — Quality-first evergreen development
**Backlog categories:** art quality, chapter writing, spell reactions, accessibility, optimization, performance, economy-light sidequests, hidden scene branching, enemy/boss variety, lore encyclopedia, offline & backup reliability, accessibility localization options. **Never inflate quantity at the expense of all core loops working.**

Each milestone is a **goal, not a claim of completion**. In each Codex run, implement the highest unfinished atomic tasks, test, commit to permitted branch, update progress log. Do not delete features just to reach milestone checkbox

---

# 16 — Acceptance criteria: Definition of Done for v1.0

v1.0 may be called “เล่นได้ครบหนึ่งบท” only if all are true:

- [ ] Scene graph first chapter playable from start to 3 endings; NPC react to at least 3 choice-driven facts and at least 3 background world states differ
- [ ] Visual stage has layered tile/object animations, original pixel sprites, action animations, variable weather/lighting where specified; not paper cutout style
- [ ] Player cannot move freely; choices are the sole story navigation; actions visually occur, including travel, pickup, talk, craft, cast
- [ ] Inventory and 234 legal recipe definitions, meaningful distinct spell mechanics, at least 6 VFX representative tests
- [ ] Turn-based combat with 4 equip slots, zero-MP fallback, telegraphed enemy turns, defend, items, conditional flee/surrender, 4 normal battle encounters and boss
- [ ] Three endings from choice decisions, all with closure and epilogue
- [ ] Full Thai UI and instructions; no confusing text or unreadable tiny buttons
- [ ] Phone/iPad/desktop supported as in §03; touch+keyboard+mouse functioning; landscape/portrait where applicable
- [ ] Autosave, Export/Import JSON, recovery; no duplication exploits; schema migration
- [ ] Built/tested by CI and GH Pages deployed (or deployment blocked explicitly by missing owner permission, not falsely claimed)
- [ ] No hardcoded API keys, unsafe licensing or unreviewed protected assets
- [ ] AI if implemented is optional, opt-in, guarded and never blocks core game
- [ ] README + ART_BIBLE + TESTS + PROGRESS + CHANGELOG describe what truly exists

## 16.1 What Codex must never do
- Deliver only HTML text/menus pretending it is finished game
- Replace original Pixel Art with generic photos or copyrighted screenshots
- Break save/load by rewriting state schema without migration
- Build free-roaming open world or joystick contrary to requirement
- Provide a nonfunctional option, placeholder combat/spell that changes only labels
- Delete old content without migration/backups or alter the owner’s repository destructively
- Hide test failures, invent FPS numbers, invent published URL, invent AI performance/compatibility
- Request secrets in chat, embed API keys publicly, or rely on paid backend without approval

---

# 17 — Project documentation and reporting requirements

Files in repository updated every meaningful Codex run:

1. `docs/PROGRESS.md`: build version, latest commit, milestone status, implemented vs planned, known bugs, blocked items, next actions, last test results, deploy URL if verified
2. `docs/TASK_BOARD.md`: ordered tasks with `ID`, priority, milestone, dependencies, test/acceptance, `status=TODO|IN_PROGRESS|DONE|BLOCKED`, files changed, owner note; no duplicate tasks
3. `docs/DECISIONS.md`: architecture/art/balance decisions and reasons, owner overrides; mention any spec departures
4. `docs/CONTENT_INDEX.md`: actual scene IDs, choice IDs, NPC count, enemy count, legal spell count, recipe unlock accessibility, endings count generated from source
5. `docs/ART_BIBLE.md`: source assets, pixel grid, palette, animations, stages, style constraints, asset licenses, remaining art debt
6. `docs/QA_MATRIX.md`: platform/viewport/browser and result status, reproducible command/evidence; mark real hardware not tested explicitly
7. `docs/RELEASE_NOTES.md`: changes per version, save migrations, new content, known issues, GitHub Pages published URL if verified
8. `ASSET_LICENSES.md`: every non-generated/third-party asset license/source and usage; generated assets provenance
9. `README.md`: Thai user guide / controls / how save works / GitHub Pages status / access via phone

Example `PROGRESS.md` header:
```
# GODSEED Progress
Date (UTC): 2026-11-05
Branch/commit: (actual)
Playable state: (what was actually tested)
Current milestone: M0
Implemented: ...
Tests: [command] PASS/FAIL/SKIPPED + evidence
Known blockers: ...
Deploy status: URL or not enabled
Next tasks: GS-001, GS-002, GS-003
```
Never mark “DONE” merely because code files exist: require running proof or clear manual acceptance

---

# 18 — Extra design details to preserve game feel

## 18.1 Variety without filler
- Every 3–5 player interactions should produce at least one: new visual staging, new ingredient, useful clue, meaningful NPC reaction, combat challenge, or new ability. Do not enforce an intrusive reward popup
- Dialogue line pool for hub NPC ≥4 context-based lines each; avoid exact repeats within 4 returns unless it is deliberate catchphrase
- One comedic moment per exploration cluster, not random meme spam
- Major quest payoff: show before-and-after stage changes and journal memory collage, no long static exposition
- Give player optional choices to help people without needing to win fights

## 18.2 Environmental storytelling
- Reveal lore via details: old notches on bridge, missing notes on sheet music, moss pattern on ruin, wind chime whose tones differ by clue state
- UI map connects locations based on unlocked routes; route icons use small color-coded pixel glyphs
- Clues are facts not random keys; at least two alternate ways to get enough information for festival

## 18.3 Gentle difficulty, fail-forward
- Practice battle includes surrender and explanation; real battles offer retreat if allowed, and recover after loss
- Story Assist is optional and labeled transparently; no humiliation or penalty
- Keep challenge in choosing best spell combinations, timing guards against telegraphed attacks, and discovering synergies

## 18.4 Community-safe and age-friendly tone
- Suitable for broad audience: friendship, wonder, mystery, light fantasy combat; no graphic violence, sexual content, gambling, substance use instructions, or monetization that exploits players
- No user-uploaded freeform text shown to other players because this is single-player offline-first

---

# 19 — Technical reference documentation (verify versions when implementing)

- Phaser official download / release notes: https://phaser.io/download/phaser4
- Phaser official docs: https://www.phaser.io/oss/docs
- Vite official GitHub Pages guide: https://vite.dev/guide/static-deploy
- GitHub Pages with Actions: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- WebGPU and browser support limitations for local AI: https://huggingface.co/docs/transformers.js/guides/webgpu
- IndexedDB API docs: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- WCAG 2.2 quick reference: https://www.w3.org/WAI/WCAG22/quickref/

## Final instruction to Codex

**โปรดสร้างเกมจริงใน repository ตามสเปกนี้โดยเริ่มจากวงจรเล่นที่จบได้** และทำระบบศิลปะ/เวท/ฉากให้เชื่อมกันทุกส่วน หากต้องเลือกระหว่าง “ฟีเจอร์จำนวนมากแต่เป็น placeholder” กับ “ฟีเจอร์จำนวนน้อยแต่เล่นสมบูรณ์และภาพสวย” ให้เลือกอย่างหลัง พร้อมบันทึก backlog เพื่อขยายต่อด้วยไฟล์ `03_CODEX_CONTINUE_FOREVER.md`.

**ไม่ต้องถามเจ้าของซ้ำถึงแนวเกม สไตล์ภาพ แพลตฟอร์ม วิธีควบคุม สูตรเวท การต่อสู้ หรือเนื้อเรื่องแรก** ทุกอย่างกำหนดไว้แล้ว ถ้าจำเป็นต้องเลือกเรื่องปลีกย่อยที่ไม่ได้กำหนด ให้เลือกค่าที่ปลอดภัย เรียบง่าย สอดคล้องกับสเปก และบันทึกเหตุผลใน `docs/DECISIONS.md` แทนที่จะหยุดงาน
