# REBORN — ชีวิตในเอลินดรา · V8 / 0.17.0

เกมภาษาไทยที่สุ่มกำเนิด แล้วให้วันธรรมดาเดินไปจนถึงทางแยกที่ผู้เล่นเป็นคนเลือก ข้อกำหนดล่าสุดคือ [V8 master](docs/v8/REBORN_V8_MASTER_PROMPT.md) และจุดทำต่ออยู่ใน [NEXT_CODEX_TASK](docs/NEXT_CODEX_TASK.md)

หน้าใหม่เป็นคอลัมน์เดียว: เปิดเผยกำเนิด → เริ่มชีวิต → อายุ/พลังและสถานะ → ฉาก Pixel Art ขนาดเล็ก → เวลา 1/2/4/8× → ช้อยส์/ผล/ดำเนินชีวิตต่อ ทารกมีเหตุการณ์จากผู้ดูแล ไม่เลือกอ่านหนังสือ ทำงาน หรือฝึกพลัง แนวชีวิตเปลี่ยนผลเมื่อเดินเวลาจริง การข้ามเวลาหยุดก่อนช้อยส์เสมอ

มีทางไม่เข้าพิธีและชีวิตธรรมดาที่ไปถึงอายุขัยจริงได้ สิบสองฉากจบใช้เงื่อนไขจากสิ่งที่ทำ ไม่เก็บชีวิตที่ละทิ้ง รีเฟรชหรือเปิดแท็บใหม่เริ่มที่หน้าเกิด ประวัติเก็บเฉพาะสรุปที่เล่นต่อไม่ได้ ระบบกำเนิดเท่ากัน 20 ภูมิหลัง พิธีเจ็ดขั้น คำแนะนำอาชีพสูงสุดแปดจาก 20 สาย พลังจริงระดับ 1–10 และภาพเดิมยังใช้ร่วมกัน

เนื้อหา V8 ใหม่:55 ทางแยก/165 ช้อยส์ และเหตุการณ์สังเกตวัยทารกห้าตอน รุ่น0.17.0 เชื่อมเรื่องอาชีพเดิมครบ60 ตอน ให้พักหรือกลับมาทบทวนเองได้ อาชีพทั้ง20 สายเลื่อนขั้นได้เมื่อมีผลงานและการฝึกจริง การศึกษาอาชีพไม่บังคับฝึกพลัง เพิ่มแปดทางแยกเฉพาะผู้ดูแลธรรมชาติ ผู้รักษา ช่างตีเหล็กและนักวิชาการ พร้อมสี่ฉากจบวิชาชีพ ยังเหลือเป้าหมาย65 เหตุการณ์และอีก32 ทางแยกเฉพาะอาชีพ พลัง11–100 การยืดอายุและเส้นทางเทพ

เว็บไซต์อยู่ที่ https://ninon0406.github.io/alltest/ สคริปต์ `verify-v8.mjs` ตรวจหน้า V8 หลัก การรับค่าจ้าง ฉากจบ การเลื่อนขั้น และไฟล์เว็บรุ่นก่อนสำหรับแคช สคริปต์เดิมทั้งห้าทดสอบ `?classic=1` สถานะทดสอบ/เผยแพร่รุ่นนี้และงานถัดไปอยู่ใน NEXT_CODEX_TASK

---

## บันทึกระบบเดิมที่เก็บไว้

# REBORN · หนึ่งชีวิตในเอลินดรา

Original Thai fantasy life RPG, Vite + vanilla ES modules, static GitHub Pages. Current release 0.14.0 adds earned first-realm power (1–10), manual certification, actual titles and aura milestones to the existing owned equipment, V7 life simulation and inherited pixel families.

Play: https://ninon0406.github.io/alltest/

## One Life One Run

The live run exists only in the current tab's JS memory. Refresh/close returns to an unstarted rebirth screen; click to roll a fresh life. A new tab has an independent run. In-page map, training, bag, shop, character and journal dialogs preserve that life. There is no save/load/backup/import/export-active-run UI or offline aging. Native exit warning is best effort; mobile browsers can discard memory.

Only a genuinely completed authored ending produces a compact summary in `reborn_finished_lives_v1` (100 latest, one per runId, exportable, no resume). If archive storage fails, the finished summary remains downloadable/retryable. Unfinished refresh/exit never creates a death or ending. Existing `reborn_save` and backups are untouched and ignored, and `reborn_ending_gallery` is readable legacy history only. Old validators remain for offline historical tests, not active restoration.

## Play and current scope

The age/power header stays above the scene. Until three, age is shown in months and routines stay under caregiver supervision. Thirty V7 childhood/teen forks offer 90 actual choices, with early memories/relationships changing later outcomes and eligibility. Later choose an age-appropriate focus and advance 1/2/5 years or seek a decision. Seven awakening stages are chosen individually. Autoplay is optional, fixed 30-day ticks at 1/2/4/8/16×; actual calendar progress stops on decisions, hidden tabs, overlays and rejected actions.

Scholarship/enrollment choices charge the actual wallet, with free alternatives. School/mentor/family choices carry into later gates, training support and wages; support grants no immediate XP or income. Event eligibility and expiry share the time scheduler, so delaying the ceremony cannot block free learning. Expandable outcome receipts and selected-stat training quotes show the actual effects. Nine new school forks at months 48/60/84/90/108/114/126/132/138 connect seed play, craft, friendships and ceremony preparation. Showing a practice record requires actual training; reviewing a diary requires an earned record. Free alternatives always remain. Ages 4–11 have at most two major childhood decisions per year.

The map is a position/information viewer. Choose journeys from the main scene: caravan, free walking or staying, with real days/money/stamina/ledger. Career panels recommend up to eight eligible paths; other eligible paths remain in the codex. All dialogs keep one live run and support keyboard/ESC and session-only font/motion options.

New runs use 64×80 layered file-backed pixel actors with five immutable traits inherited from both parents and at most one small variation. Nine groups have 20 visible variants each; 183 committed transparent PNGs include 180 catalog parts and three age/body layers. Wrapped infants, toddlers, children, teens and adults share stable DNA; older characters gain gray hair without changing identity. The Birth Record shows actual parents/child and trait origins.

Five family-gift garments (two tops, pants, shoes and hat) are actually owned. From age three, the bag allows changing owned clothes and removing the hat; each change updates the sprite with zero days, money or stat changes. Unowned/wrong-slot clothing and stale actions are rejected. New v2 characters never invent a weapon or aura from career text. Original v1 portraits and birth generators remain for historical compatibility.

Six additional equipment designs are sold by eight shops at existing canonical nodes: training staff/sword, focus rod, wooden shield, padded vest and travel coat. Buying or half-price returns cost one actual day; buying never auto-equips. Age/base-stat requirements, ownership, slots and stale-action checks are enforced atomically. The bag equips three slots over the existing family wardrobe. Six original procedural transparent PNGs show the actual worn items. Bonuses are derived separately from earned stats/capacities: suitable tools add XP only on real timed practice; the coat reduces actual community/career job stamina by two. Equipping never heals or adds power; removal clamps current resources to the lower cap. The status panel explains base versus equipment values; career/ceremony qualification still uses earned values.

After all seven awakening stages and a real career choice, choose **ฝึกประสานพลัง** or its seven-day practice action. It delegates to real career-primary skill practice and earns independent power XP with monthly diminishing returns. Regular skill practice, jobs and ordinary year skips still earn no power. Level five gives one less stamina cost per actual job and the first career title/aura. A plan stops at full level-nine XP, within the exact month: choose stamina or mana certification to reach ten, or postpone at zero cost, rest and resume manually. The one-time +5 maximum reward never heals. The first realm ends at ten; higher realms and deity are still future work. Twenty first-tier titles and the two procedural SVG aura stages (5/10) are real UI, with no new PNG count.

Twenty location-specific PNG backdrops remain generated from local tile compositions. Run `node scripts/verify-assets.mjs` to check mapping/dimensions/hashes; regenerate deliberately with `node scripts/generate-scene-assets.mjs` using installed Chromium. No hosted image service runs in gameplay. One original AI family-room background is stored with its PNG source and compressed runtime WebP; character parts are authored procedurally, not AI-generated. Power beyond the first realm, combat/loot, lifespan/deity paths, full fork/ending targets and advanced equipment tiers remain incomplete. Existing equal births, 360-day calendar, 20 base/20 higher careers, twenty map nodes and six original endings remain; see CONTENT_MANIFEST.md for honest playable versus draft counts.

Sixteen additional 320×160 interior PNGs show three room types across five regional styles and one original AI Starfall ceremony hall. Actual infant care, explicitly indoor pending stories and a ceremony at its real venue select the room. Resolving a story or pausing/finishing the ceremony returns outdoors; walking still updates the same canonical node, days, wallet and stamina. Room rendering changes none of those values. All 20 nodes have room bindings (60 references to 16 images, not 60 new places/artworks); map previews keep outdoor landmarks. Ambiguous conversations stay outdoors. Missing images use the corresponding procedural room fallback. The AI original and runtime derivative are preserved with provenance; normal builds need no image API.

## Development and validation

Node 22.12+ (CI Node 24), npm, installed Chromium.

```sh
npm ci
npm run dev
npm test
npm run content
npm run build
node scripts/stage-site.mjs
npm run test:e2e
npm run preview -- --port 4185
node scripts/verify-production.mjs http://127.0.0.1:4185/
node scripts/verify-progression.mjs http://127.0.0.1:4185/
node scripts/verify-one-life.mjs http://127.0.0.1:4185/
node scripts/verify-equipment.mjs http://127.0.0.1:4185/
node scripts/verify-power.mjs http://127.0.0.1:4185/
node scripts/verify-character-assets.mjs
node scripts/verify-character-composition.mjs
node scripts/verify-interior-assets.mjs
node scripts/verify-interior-assets.mjs .
node scripts/verify-equipment-assets.mjs
node scripts/verify-equipment-assets.mjs .
```

Playwright uses `/usr/bin/chromium` or `CHROMIUM_PATH`; production preview test port 4173. Desktop/mobile scenarios plus a separate seven-width project test overlays, real transactions, no active persistence, independent tabs, lifecycle, genuine terminal archive and storage failure downloads. Unit tests retain the 100,000-origin audit, 40 detailed career paths and 20 annual-planner promotions.

## Publication

Source: `app.html`, `src/`, `public/`. Root `index.html`, `assets/`, `art/` are generated compatibility outputs for existing Pages `main:/`. Build then stage-site; retain prior published hashes for cached HTML. Do not hand-edit generated HTML. `.github/workflows/pages.yml` tests/builds and deploys, then runs all five public verifiers. A successful push alone is not evidence of working public CSS/gameplay. Vite uses relative `./` paths for `/alltest/`. No backend, paid API or external runtime art service is required.

Read docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md, docs/USER_DIRECTIVE_V7.md and docs/NEXT_CODEX_TASK.md before continuation. More places/room types, modeled risky journeys, advanced equipment/loot, power/mortality, combat/NPC/long-life content targets are unfinished.
