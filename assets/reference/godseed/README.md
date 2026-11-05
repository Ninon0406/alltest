# GODSEED — Location Art Reference Pack

ชุดภาพอ้างอิงสถานที่ 10 ภาพ สำหรับเกม GODSEED ในแนว Pixel Art HD

**สำคัญ:** ภาพเป็น CONCEPT REFERENCES ไม่ใช่แผนที่เล่นได้จริง ไม่ใช่ Tileset/Spritesheet และไม่มี collision/path coordinates จริง
Codex ต้องศึกษาองค์ประกอบแล้วสร้างฉากแบบแยกชั้นของเกมเดิม โดยไม่ใช้ภาพเดียวแปะเป็นพื้นหลังที่ตัวละครเดินได้เพียงทิศเดียว

## สถานที่

1. `01_village_center.webp` — ลานน้ำพุกลางหมู่บ้าน (`village_center`)

2. `02_village_entrance.webp` — ประตูทางเข้าหมู่บ้าน (`village_entrance`)

3. `03_ancient_tree.webp` — ใต้ต้นไม้ใหญ่ (`under_tree`)

4. `04_player_cottage.webp` — บ้านผู้เล่น (`player_home`)

5. `05_elder_herb_garden.webp` — บ้านผู้เฒ่าและสวนสมุนไพร (`elder_garden`)

6. `06_forest_road.webp` — ถนนสู่ป่า (`forest_road`)

7. `07_crystal_clearing.webp` — ลานผลึกเวทมนตร์ (`crystal_clearing`)

8. `08_spell_workshop.webp` — ห้องผสมเวทมนตร์ (`spell_workshop`)

9. `09_ancient_shrine.webp` — ศาลเจ้าโบราณ (`ancient_shrine`)

10. `10_battle_glade.webp` — ลานต่อสู้กลางป่า (`battle_glade`)

## วิธีใช้
1. แตกไฟล์ ZIP และนำโฟลเดอร์ `references/` ไปไว้ที่ `assets/reference/godseed/` หรือโฟลเดอร์อ้างอิงที่เข้ากับโครงสร้างโปรเจกต์เดิม
2. วางไฟล์ `GODSEED_LOCATIONS_MANIFEST.json` กับภาพตามที่ปรากฏในไฟล์ ZIP โดยปรับ path ใน manifest ให้ตรงที่เก็บจริง
3. ให้ Codex อ่าน 03_CODEX_CONTINUE_FOREVER.md และ MASTER ROADMAP ก่อน แล้วตรวจสอบ scene IDs และระบบเดิม
4. สร้าง playable layers, sprite animation, collisions, paths, named anchors และ story triggers จากภาพอ้างอิงแทนการเอาภาพทั้งใบมาเป็น interactive scene
5. เวลาทดสอบให้ตรวจว่าเดินสี่ทิศถูกต้อง, หยุดที่ anchor, มี sit/stand/interact และ effect ตรงตามบท
6. เขียนสถานะจริงลงใน roadmap โดยแยก reference-art created ออกจาก scene implemented / scene tested

ภาพถูกบีบอัดเป็น WebP คุณภาพสูงเพื่อสะดวกในการส่งผ่านโทรศัพท์และนำเข้า GitHub.
