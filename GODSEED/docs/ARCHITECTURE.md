# GODSEED architecture — 0.7.0

## Owner V2 — Manual File Save only (2026-11-05)

ข้อกำหนดล่าสุดแทนที่คำสั่ง autosave / IndexedDB / automatic recovery ทั้งหมดในเอกสารประวัติด้านล่าง: เก็บ Game State เฉพาะ RAM บันทึกไฟล์ .godseed เมื่อผู้เล่นกดเอง โหลดผ่านการเลือกไฟล์และยืนยันเท่านั้น ห้ามอ่าน/เขียนความคืบหน้าผ่าน LocalStorage, SessionStorage, IndexedDB, Cookies, Cloud/Server หรือ Service Worker ห้ามอัปโหลดเซฟหรือสร้างไฟล์ลับหลังผู้เล่น รีเฟรชต้องกลับหน้าเริ่ม ไม่มีปุ่มเล่นต่อจากเซฟเบราว์เซอร์

ไฟล์รุ่นเดิมโหลดและ migrate ใน RAM ได้เมื่อผู้เล่นเลือกเอง ไม่อ่านหรือลบฐานข้อมูลเบราว์เซอร์เก่าโดยอัตโนมัติ ใช้ checkpoint ที่เสถียร (story choice / battle turn) ปิดปุ่มระหว่าง animation/transition ตรวจ extension/size/version/checksum/reference และแสดง summary ก่อนยืนยัน เตือนก่อนเริ่มใหม่/ออกด้วยsave/continue/discard และ native beforeunloadเมื่อทำได้ ไม่อ้างว่าOSเก็บสำเร็จจากการเริ่มdownload

สถานะ SAVE-001..SAVE-014 อยู่ใต้FND-005ในRoadmap SSOT ไม่เพิ่มตัวหารหลักซ้ำ Runtime gate: `npm --prefix GODSEED run validate:manual-save` พร้อมbrowser audit/no-upload/empty-reload/round-trip tests ตามข้อกำหนดใหม่ หลักฐานIndexedDBรุ่นก่อนเป็นประวัติ ไม่ใช่การรับรองระบบปัจจุบัน

## Current file/RAM boundary

`ManualSession` owns validated RAM snapshots and an in-memory generation counter. `act` still runs a pure transaction first, plays/skips the Director, then commits exactly once to RAM. Startup creates no state. No storage backend is imported. Import holds a validated pending snapshot until explicit confirmation; errors/cancel never replace current state. A generated export does not clear dirty until the player confirms keeping the file; subsequent progress invalidates that acknowledgement. Native beforeunload only warns, never serializes.

`save-file.ts`: state schema2 preserved. File2 hashes canonical metadata+state, including gameVersion/exportedAt/chapter/checkpoint. File1 hashes its original raw state before migration. RawV1/V2JSON remains opt-in compatibility only. Imported scene/item/spell/choice/NPC/battle references are checked against current catalogs; own-property lookup rejects prototype keys. New levels/gear not implemented in gameplay are not fabricated in saves. Scene boundary and rest flags restore safe authored staging; active battles resume stable turn state and RNG.

SAVE14subtasks live inside FND-005; renderer/validator checks stableIDs/evidence/parentrollup and never adds them to overalldenominator. Actualdevice acceptance remainsseparate. `tests/file-helpers.ts` observesprogress only by player-initiated downloads, never by storage or injectedgameState.


## รอบ 14 — 2026-11-05 UTC — รดน้ำแล้วโลกจดจำ (0.6.2)

เริ่มจาก `0498235` บน main ที่สะอาด และผล CI รุ่น 0.6.1 ผ่าน 70 กรณี เลือกงานย่อย VIS-005 / VIS-008 / STO-003: CH0601 เคยแสดงเพียงท่าหยิบ แม้บทกำหนดให้รดน้ำก่อน เก็บหลักฐานรุ่นก่อนใน Session13 และพัฒนาต่อโดยไม่เปลี่ยน State2 / IndexedDB1 / save envelope1

ทำจริง: เดินถึงจุดเดิม หันตะวันออก ถือบัวรดน้ำ/เทน้ำ → ดินเปียก → ดอกไม้บาน → หยิบเมล็ด → commit ตามระบบเดิม แปลง 64×48 มีสามสถานะและ Hero 64×48 มีสี่เฟรมต้นฉบับ ใช้ร่างเดิมที่กริด 1:1 พร้อมแขน บัว และหยดน้ำใหม่ ข้อมูล `garden-staging.ts` แยกจาก reward reducer; ภาพและบทมาเรนอ่าน garden_tended จากเซฟ การกลับมาเห็นดอกบานและได้คำแนะนำเวทเยียวยาไม่มีรางวัลเพิ่มจาก renderer

ตรวจภาพจริงพบว่าแปลงใหม่ทับทางออกเดิม จึงเปลี่ยน fixed garden exit ให้อ้อมด้านล่าง พร้อมทดสอบแนวเท้า 10×4 ไม่ตัดฐานแปลง ทางหยิบทั้งสองยังเข้าจุดเดิม ไม่มี free roam หรือเปลี่ยนการเดินสี่ทิศ ท่ารดน้ำเพิ่มความหมายให้ทางเลือกช่วย NPC แต่ยังไม่ได้พิสูจน์ความสนุกกับผู้เล่นจริง

ผลตรวจเบื้องต้น: npm ci, TypeScript, Lint, Content 2, Unit 114, Roadmap 7, Production Build, Reference Packing ผ่าน; Browser เฉพาะงานใหม่ 7/7 ผ่าน 55.8 วินาที (390×844, 844×390, 820×1180, 1024×768, 1366×768 รวม reload กลางท่าก่อน commit / skip once / PNG ขาด / กลับมาและโหลดดอกบาน) Full Browser Suite 77/77 ผ่านทั้ง local และ CI ตรวจเว็บจริงแล้ว ดูหลักฐานปิดรอบด้านล่าง ภาพทั้งหมด 53 PNG สร้างซ้ำตรง byte; ใหม่ 2 ไฟล์รวม 9,869 bytes

บั๊กระหว่างพัฒนา: Art Test จับหยดน้ำเลยแถวเท้า 44 จึงแก้ระยะหยดใน Generator แล้วผ่าน ไม่ข้าม Assertion; แก้ข้อความ Locator ใน Test ให้ตรงชื่อ Choice จริงก่อนรัน รอบนี้ไม่เปลี่ยนสูตร 234 สูตร / จำนวน 18 Scene, 60 Choice, 5 NPC, 3 Encounters, 0 Endings

ข้อจำกัดและแผนที่ทำได้ในรอบนี้: ส่งมอบและตรวจ Browser Emulation + Build + PR/Pages ตามสิทธิ์; ไม่รออุปกรณ์จริง ไม่ขอเจ้าของรัน Terminal และไม่ลดเกณฑ์ hardware ของ QA-009 การรับรอง Safari/เครื่องจริงและ FPS/thermal ยังเป็น release gate ที่ยังไม่ยืนยัน ภาพยังเป็นต้นแบบ ไม่ถือว่าแปลง Reference สวนครบทั้งฉาก

Checklist ยังคง 21/76 = 27.6% (scope1.0 21/73 = 28.8%) ทั้งสามงานใหญ่ยัง in_progress หลักฐานภาพก่อน/ระหว่าง/หลังอยู่ใน `docs/evidence/session14/` ไม่เพิ่มงานย่อยเพื่อปั่นเปอร์เซ็นต์

งานถัดไปตาม dependency: (1) บทฟังเพลง CH0602 ต้องมีที่นั่งและท่าฟังตรงมาเรน (2) ปรับฉากสวนตาม Reference ให้ทางเดิน/อาคาร/สมุนไพรเป็นชั้นจริง (3) ท่าพิเศษ NPC พร้อมบุคลิก (4) Workshop และเอฟเฟกต์ผสมตามสูตร (5) B03/โบราณสถานหลังภาพ/ปฏิสัมพันธ์ที่เกี่ยวข้องพร้อม


## ระบบสถานที่และ Cinematic รอบ12

`scene-definitions.ts` เก็บ Anchor แบบพิกัดเท้า ถนนที่เชื่อมกัน Collision และระดับวัตถุที่บังตัวละครของ `village_center` กับ `under_tree` พิกัดมาจากแผนที่ต้นฉบับที่สร้างเอง ทั้งสองสถานที่ใช้ Stage ID `village` เดิม ส่วน `locationFor` แยกภาพตาม Story Scene: `S00_WAKE` และ `S02_TREE` ใช้ต้นไม้ ฉากหมู่บ้านอื่นใช้ลานน้ำพุ

`routeTo` ใช้ Dijkstra เฉพาะเส้นถนนที่เขียนไว้ ตรวจพื้นที่เท้า10×4pxทุกระยะไม่เกิน2px จุดเริ่มเชื่อมกับ Junction ที่เดินถึงได้และไม่ถูกวัตถุขวาง ถ้าจุดหมายหรือทางเดินใช้ไม่ได้จะคืน `undefined`; Director แจ้งข้อผิดพลาดและไม่บันทึกผลตัวเลือก ไม่มีทางลัดเส้นตรงผ่านวัตถุและไม่มีระบบเดินอิสระ

Director ส่งตำแหน่งปัจจุบันให้เส้นทาง CH0201/CH0004/CH02T1 และทางออกหมู่บ้าน CH0211 ใช้ `tree_path` เพื่อเดินไปทางต้นไม้ก่อนเปลี่ยนสถานที่ CH02T2 เดินออกจากใต้ต้นไม้กลับจัตุรัส ทางในฉากอื่นยังใช้ข้อมูลเดิม ข้ามจุดที่ระยะเป็นศูนย์เพื่อไม่สร้างท่าเดินหรือทิศปลอม

Renderer คงตำแหน่งและทิศเฉพาะเมื่อ main ส่ง continuity=true หลัง action ที่ทำเสร็จหรือข้าม และเป็น run/stage/location/battle mode เดิม เมื่อ import/restore/continue จะส่ง continuity=false และใช้ Anchor ประจำฉากและ flags `rest_under_tree` / `rest_bench` เพื่อคืนท่านั่ง; ไม่เพิ่มพิกัดตัวละครลงเซฟ คำสั่ง `choose` เคลียร์ท่าพักเดิมก่อนตั้งท่าของตัวเลือกปัจจุบัน `tree_memory` เก็บถาวรและให้ใบไม้/ข้อความความทรงจำ รางวัลความสัมพันธ์จาก CH0004 ให้ครั้งแรกเท่านั้น CH02T1 ไม่ให้ของหรือ trust เพิ่ม ใช้กฎพักเดิม HP+15, MP+10, เวลา1tick

`S02_TREE` เป็นฉากเนื้อเรื่องใหม่ที่เข้าได้จากเมนูสถานที่อื่น เพื่อให้เซฟเดิมที่ผ่านฉากเปิดไปแล้วกลับมาพักได้ 17Scene IDsเดิมยังอยู่ ปัจจุบันรวม18ฉาก/60ตัวเลือก State2/IndexedDB1/file envelope1ไม่เปลี่ยน เพราะ flags ใหม่เป็นข้อมูลทางเลือกใน schema เดิม

## ภาพและทรัพยากร

ท่ายืนใหม่มี4ทิศ ทิศละ3เฟรม ขนาด32×48 ที่3fps การเดินเดิม24เฟรม/4ทิศที่10fpsยังใช้ไฟล์เดิม การกระทำอื่นยังใช้ Hero Atlas เดิมและยังไม่ครบทุกมุม

ต้นไม้เป็น Prop432×208 ที่ตำแหน่ง276/201, depth201 น้ำพุเป็น Atlas96×112ต่อเฟรม รวม6เฟรม ที่254/204, depth204 ทุกวัตถุเรียงตามเท้า ตัวละครใช้ y+20 เงาใช้ y+19 กิ่งไม้เหนือหัวบังภาพแต่ไม่เป็นสิ่งกีดขวางบนพื้น ขาม้านั่งเป็น Collision และท่านั่งใช้ support depth239 เหนือม้านั่ง238 ทางหลังต้นไม้ใช้ foot186 หลังตรวจภาพจริงว่าค่า depth อย่างเดียวไม่พอให้เกิดการซ้อนภาพ

เลเยอร์เดิมยังเป็น rear-1000 / ground-900 / foreground1000 Ground มี alpha mask ตามฐานอาคารเพื่อไม่ทับผนังหน้า ใบไม้ใช้6Spriteวนซ้ำเมื่อมี tree_memory และหยุดเมื่อ Reduced Motion; Prop และ Ambient เดิมถูกทำลายเมื่อเปลี่ยนฉาก

ภาพอ้างอิงเจ้าของเก็บที่ `assets/reference/godseed/` พร้อม13SHA records และ manifest10สถานที่ ไม่มีการ import concept เข้าเกม ภาพ runtime อยู่ใน `public/assets` และสร้างจาก Generator ต้นฉบับ `stage-site.mjs` คงไฟล์ index-hash.js/css เก่าเพื่อรองรับ HTML ที่ cache โดยไม่คัดลอก development references กลับเข้า dist `validate:references` ตรวจ public/dist และทำงานซ้ำหลัง staging ใน CI

Pages Source ยังเป็น legacy main:/ เพราะ integration ไม่มีสิทธิ์แก้ Settings (API403) Workflow Actions เดิมยังเผยแพร่ได้ แต่การรับรองว่าไม่มี reference ใน Artifact หมายถึง Vite dist/Actions เท่านั้น Legacy archive อาจมีไฟล์ต้นฉบับของ Repository; เกมไม่ร้องขอไฟล์เหล่านั้น เจ้าของเปลี่ยน Source เป็น GitHub Actions จากโทรศัพท์ได้เพื่อให้เหลือเส้นทางเผยแพร่เดียว

## ข้อมูลความคืบหน้า

Roadmap ใช้ `roadmap.json` เดิม มีตาราง9ด้านต่อ10สถานที่ พร้อมหลักฐานและเกณฑ์ ไม่มีการนับ90ช่องเพิ่มในตัวหารหลัก VIS-013/014 เป็นงานส่งมอบใหม่ตามขอบเขตของเจ้าของและเชื่อม GS-042/043 สถานะฉากฉบับสมบูรณ์ยังรอ final art; การมี concept หรือผ่านองค์ประกอบต้นแบบไม่ทำให้ทั้งฉากเสร็จ

---

- `content/story.ts`: stable scene/choice IDs, requirements/locked hints, one-time rewards, authored animation cues
- `content/encounters.ts`: three distinct encounter stat/reward/escape/actor/stage definitions; no hardcoded training-as-forest behavior
- `engine/state.ts`: State2 schema and validated V1 conversion, deterministic RNG counter and immutable transactions
- `systems/game.ts`: choices/craft/equip and re-exports combat API; first successful new craft grants XP10 once
- `systems/combat.ts`: pure turn resolution, accuracy, reactions, status/ward expiry, checkpoint recovery and reward idempotency; no Phaser dependency
- `systems/spells.ts`: canonical 336 candidates ->234 legal definitions, stable IDs, mechanics and composed VFX metadata; party-support forms apply to the one currently available player
- `ui/combat-panel.ts`: accessible HP/MP bars, intent, statuses/help, logs, four slots and legal utility actions; UI cannot grant effects
- `scenes/world.ts`: layered original procedural stage/actors/particles; presentation accepts resolved commands; skip finishes the same transaction, destroys transient particles, and resets actor tweens. Ground shadows follow positions. Training uses its original art-v2 sheet
- `engine/save.ts`: atomic primary/validated-backup, durable run archive, bounded DB open; additionally stores original raw V1 current at `legacy-v1:<runId>` before first V2 write
- `engine/save-file.ts`: file envelope1 canonical SHA-256 checked against original payload BEFORE state conversion; raw V1 and V2 can be imported with confirmation
- `engine/storage-session.ts`, `ui/save-controls.ts`: persistent/memory distinction, export/retry/recovery and accessible archived runs from0.1.1 preserved

## Versions and compatibility

Game state is2, IndexedDB database/store is still1 and checksum file envelope is still1. Raw/checked V1 validates with legacy schema before conversion. Preserve runId/seed/rng/revision/HP/MP/items/choices/trust/flags/rewards and battle checkpoint/next/status/shield. Add XP0, recoveryScene default S09, playerStatus{}, empty log and shield lifespan2 if positive (otherwise0). Existing earned progress is neither rerolled nor given assumed historical XP. Once a new action commits, write V2 and retain the raw V1 snapshot. V2 validation rejects a positive shield with zero lifetime.

## Turn order

Validate -> spend/resolve player command -> eligible old SEAR DoT -> victory check -> current enemy intent or immediate slow/accuracy result -> expire actor effects -> next stable player-selection state. Only stable complete turns are saved. Newly applied/refreshed enemy effects survive until their next relevant player action. New enemy VEIL affects its immediate outgoing accuracy and expires after that enemy phase. Player defensive effects and shields count the current enemy phase; wards last exactly two phases. See BALANCE/DECISIONS for bounded interpretations and numerical constants.

Vite relative base supports /alltest/ and nested previews. Build then stage-site preserves previous GODSEED hashes in root/artifact for cached HTML. CI runs locked install/type/lint/content/unit/balance/build/browser before main deployment. Root package delegates; authoritative dependency lock is GODSEED/package-lock.json.

## Presentation pass0.3.0

`actor-art.ts` owns atlas frame ranges and animation rates; `stage-layout.ts` owns layer IDs/prop frames/ambient anchors. Generators emit16 new deterministic PNGs to `public/assets/art-v2/`, independently of the retained legacy generator. `visual-plan.ts` maps authored cues and already-resolved battle outcomes to poses; it never mutates game data.

World uses rear(-1000), ground(-900), per-prop foot depth, actor foot depth(y+20), shadows(y+19), front(1000); rear/front parallax leaves ground/actor lane anchored. Optional memory props read actual flags only. Scene replacement destroys previous props/ambient. Ambient delta is capped100ms and gated by motion/document visibility; Phaser's visibility pause is retained. No hardware performance promise follows from these bounds.

Every action has a generation token and tracked completion settlers. Skip/reduced/show/shutdown cancels tweens and effects, settles waiting promises once, and invalidates stale asynchronous work. Main still calculates immutable next state first, waits/skips presentation, persists once, then shows next state. A final battle uses before/next state to show victory/defeat before the foe disappears. UI is locked until both storage and renderer are ready. Missing art-v2 textures choose retained legacy textures and display an accessible Thai status message; full network failure/retry is not newly implemented.

Renderer `data-*` attributes are read-only observation of actual scene state for browser QA; no engine/test mutation API. State2, DB1 and file envelope1 remain unchanged. `generate:art` rebuilds original + stage + actor outputs; staging still preserves old compiled asset hashes for cached HTML.

Portrait HUD is in normal flow below the canvas, with variable-height text wrapping. Short landscape fixes `.world` to100% assigned grid width and removes its preferred aspect ratio; the inner canvas retains16:9. Browser bounds assert that scene/canvas do not extend underneath the desk.


## 0.4.0 archive/stream extension

`engine/conditions.ts` evaluates declarative flag/OR/known-element conditions. `systems/story.ts` exposes the same choice eligibility to renderer and reducer, clue facts, local hints and authored fact-conditioned memory lines. `ui/memory-panel.ts` renders only saved facts and journal records. `Choice.daily/trustAmount/when/group/spellCore/target`, scene entry flags and encounter actor/stage metadata extend content; they are not new serialized fields. Existing IDs/conditions/reward timing remain.

StoryWIND checks an actually discovered core, costs noMP as prescribed by its story effects, and sends that spell's descriptor plus a scene target to the renderer; presentation never changes inventory or flags. Daily gathering stays once per three-tick game day with visible revisit wording. Rare gifts, bell/quest rewards and trust use existing first-choice keys. S14 entry marksarchive_read; every exit marksruins_open without exposing an unfinished travel destination.

B02 currentState2 permits52HP and its newID; old V1 battle schema unchanged. State2/DB1/file-envelope1 stay compatible with0.3 source saves. No new required fields or migration; unknown future IDs remain invalid and old apps do not support new-content downgrades. `plannedIntent` is captured before player resolution so crossing lowHP cannot replace the displayed splash with a surprise mist. New playerVEIL survives that enemy phase and lasts the next player action; existing B01/BT timing unchanged.

`generate-exploration-art.mjs` emits12new original PNGs underart-v3. `exploration-art.ts` defines Eira8/wisp11 frame ranges; water uses6cells. `stageFolder/stageFallback` keeps oldURLs stable and loads archive/stream separately authored3layers/composited fallbacks. Scene memory toggles mist/props from actual flags. NPC animations and battle anchors still share the0.3 cancellation director. All six stages currently preload; lazy loading/performance profiles remain later work. `inspect:content` derives counts/IDs from source; public verifier covers old loop plus new archive/stream and supports `--assets-only` for post-deploy byte validation.

Story spell endpoints come from StageLayout.spellTarget (stream330/150, archive240/142). Renderer diagnostics expose the actually calculated endpoint. Battle and supportive spells continue targeting actors; scenery spells do not aim at companion sprites.

## 0.4.1 alchemy UI

systems/alchemy.ts derives nonmutating compatibility/missing ingredients/known-name previews and combined discovered-only filters from the canonical catalog. ui/alchemy-panel.ts owns DOM panels; UI submit remains locked during transactions. systems/game.unequip validates integer slot and forbids battle changes, then splices the existing compact array. No sparse slots, new fields or schema migration. Book filters are session presentation state, preserved across equip/unequip and reset on reload. Main restores the book screen after its transaction; all other routes preserve prior behavior.

## 0.4.2 authored movement and project tracking

`scenes/cinematic-paths.ts` contains six stage travel lanes and eight choice-specific routes. Coordinates are sprite centers (foot y+20). World resolves a route from current stage/cue/command; it traverses waypoints with walking and facing, then performs the existing cue at the anchor. Reduced motion compresses to the endpoint; every awaited leg checks the generation token so skip/toggle/show cannot resume stale work. Existing engine/transactions/persist order is unchanged. Bench rest uses authored seatDepth239 above the bench base238 and hides its ground shadow while seated; cleanup restores ordinary foot-depth and shadow. This is a support-height presentation exception, not saved player elevation/free-roaming or four-direction animation completion.

`docs/roadmap.json` is the only project task-status source. `scripts/roadmap.mjs` validates IDs/statuses/scopes/dependencies/source/evidence paths and cycles, then deterministically generates root `GODSEED_MASTER_ROADMAP.md` and `docs/TASK_BOARD.md`. `roadmap:check` includes five negative/counting tests and rejects stale output in `test:all`/CI. Human review plus actual feature tests establish status; the metadata validator cannot certify gameplay claims. Existing GS IDs are mapped through legacyIds, not counted again. All checklist tasks weight1, only DONE contributes; v1 vs optional/post-v1 scopes are explicit. `DEVELOPMENT_LOG.md` preserves session history; 03/AGENTS require review/update each batch. No tracking code loads in the game client, no telemetry/backend/dependency added.

## 0.5.0 directional player

`directional-art.ts` owns four6-frame walking ranges and pure dominant-axis direction/distance timing. `generate-directional-art.mjs` authors a separate art-v4/hero-walk.png (256×192,32×48cells,24usedframes,footrow44); all39older PNGs remain unchanged. World chooses the view for each authored route leg, disables flipping for the new sheet, then returns to existing hero-v2 action cycles at interaction. Missing new texture selects retained hero-v2/player walking with a degraded-art notice. This is player walking, not four-direction versions of every action/NPC or free-roam input.

Travel speed is approximately70 logicalpx/s, bounded200–900ms per leg; reduced motion still compresses to the final anchor in20ms. Village travel now begins with a south step and archive book approach uses a clear floor lane; the book endpoint foot245 sorts in front of table244 instead of tying depth. Generation-token cancellation, seated support-depth, transactions/serialization and save versions remain unchanged. Read-only walk diagnostics observe the actual texture/animation/foot/shadow for browser QA.

Public verifier also hashes art-v4 (29versioned PNGs total). Task Board's five-work queue now omits DONE/blocked candidates and promotes recorded regressions; six metadata tests cover this behavior. It remains a generated view of the existing74-task dataset, not another status source.

## Session9 camera prototype

camera-plan.ts defines fixed1.08 full-motion overscan and ±12px/450ms focus. Phaser zooms around viewport center; margin17.78px permits12px scroll without exposing artwork edges. Reduced useszoom1/scroll0. Genuine choice/battle/spell actions focus then return center; menu-only loadout operations do not. Camera tween cancellation joins generation-token cleanup/settlers. No state/DB/file-format change. All-scene final framing remains a VIS-011 acceptance gap.

Session10: purecameraFocus definespath→scenery→semanticactor priority; offensivecast framesNPC, supportive/craft framesplayer. World passes resolvedspell category, never grants effects fromcamera. camera-gallery.spec navigates genuine six-stage paths andobservesactualtrainingoffensepan onfourviewportgroups; no rendererstateinjection.

Session11 acceptance: camera-gallery coversall6currentstages and3encounters, includingoffensive/supportrecipient/returncenter. Futurestage/bossadditions must extendframing tests. Runtime unchanged sincee76c3e4; tests-only570091b improvesacceptancecoverage.


## Session13 — 2026-11-05 UTC — วัตถุดิบที่มองเห็นและเก็บได้จริง

Base43fdf78/0.6.0; branchfeat/godseed-visible-gathering, candidate0.6.1 งานVIS-005/MAG-002/QA-002: ขนนก เมล็ดผลิบาน และน้ำค้างเคยให้รางวัลแต่ไม่มีวัตถุในภาพ เพิ่มoriginal24×24atlas3แบบ×4เฟรมเรืองแสงเบา ๆ แยกจากconcept ไม่เปลี่ยนสูตรเวท/การต่อสู้/State2/DB1

ตำแหน่งpropอ่านจากchoicePaths endpointเดียวกับตัวละคร (feet=centerY+20), depth=feet-1 จึงอยู่ใต้ตัวละครขณะหยิบ Rendererอ่านchoices/gathered/ticksเพื่อแสดงของครั้งแรกและรายวัน ไม่อ่านจำนวนinventoryมาตัดสิน ไม่มีการเขียนstateจากrenderer เมื่อภาพขาดแสดงdegradednoticeและยังเลือก/เซฟต่อได้ ReducedMotionหยุดanimationผ่านระบบpropsเดิม

ผล: npmci/type/lint/content2/game109/build/referencechecksPASS; browserfocus5/5PASS24.2s บน390/820/1024/1366พร้อมtouch/reload/assetfallback เปิดดูภาพfeather/garden390จริงแล้ว Initialtestเลือกข้อความเมล็ดไปตรงeditionที่ซ่อนบนมือถือ จึงจำกัดlocatorใน#content ไม่ลบassertion ผลสุดท้ายfull70CIผ่านและเผยแพร่0.6.1แล้ว ดูหลักฐานยืนยันด้านล่าง

Roadmap27.6%(21/76)คงเดิม งานใหญ่3IDยังin_progress ไม่มีเพิ่มคะแนนจากภาพย่อยหรือสเปก ความสนุกยังเป็นการประเมินภายใน ไม่มีผู้เล่นจริงทดสอบ รอบนี้ไม่เพิ่มเนื้อเรื่อง/ศัตรู/สูตร/จำนวนวัตถุดิบ รักษา18Scene/60Choice/234legal/3encounters/0endings ภาพยังต้นแบบ/hardwareSafariยังไม่ทดสอบ

งานถัดไป5:1)ผูกวัตถุเก็บอื่นกับAnchor/ผลจริง 2)ปรับรายละเอียด2ฉากหลักตามreference 3)บ้าน–ประตูเชื่อมถนน 4)Crystal/WorkshopและVFX 5)NPCท่าพิเศษและQAอุปกรณ์จริง คำสั่งรอบถัดไป:ตรวจRoadmapแล้วพัฒนาต้นแบบสถานที่ต่อจากจุดที่ทดสอบผ่าน ห้ามรีเซ็ตเกมหรือเพิ่มสูตรเกิน234


### ผลยืนยันรอบ13 — 0.6.1

Source da15539 / PR#11 / main mergeff09683. PRCI42053446169 full70SUCCESS; mainCI42056090200 full70/build/deploySUCCESS. Local: game109/content2/roadmap7/type/lint/build PASS; focus5/5PASS24.2s (390/820/1024/1366+PNGfallback). 51PNGสร้างซ้ำตรงbyte รวมatlasใหม่4,140bytes

เว็บจริง https://ninon0406.github.io/alltest/ PASSทั้ง3gatheringtargets/รับรางวัล/5สูตร/3การต่อสู้/archive/stream/save/checksum/import และpost-Actionsassets+renderer. 40versionedPNG/JS SHA256 `f895af40b707e49f9f4ab0cf650f2730bf621cf75f7688f63a3e3fcb211f1097` ตรงbuild,0Conceptrequests/0ConsoleErrors. Browserจำลอง ไม่ใช่อุปกรณ์จริง ความสนุกประเมินภายใน ไม่ใช่ผลhumanplaytest

Checklist21/76=27.6%(v121/73=28.8%)คงเดิม VIS-005/MAG-002/QA-002ยังin_progressเพราะแก้ส่วนย่อย3จุด ไม่ใช่fullanimation/materials/finalHD ไม่มีการเปลี่ยนสูตร/การต่อสู้/เนื้อเรื่อง/State2/DB1/envelope1. ภาพหลัก/ท่ารดน้ำ/NPC/บอส/สามตอนจบและhardwareยังค้าง


### หลักฐานปิดรอบ 14 — 0.6.2

Source `3862287` / [PR#12](https://github.com/Ninon0406/alltest/pull/12) / merge `eca15b2`. Local Full77 PASS; PR CI42065834761 และ main CI42068520631 ทดสอบ/Build/Deploy SUCCESS. Unit114 / Content2 / Roadmap7 / TypeScript / Lint / Reference Packing PASS; Focus7/7 PASS55.8s; ภาพ53PNGสร้างซ้ำตรงbyte

Icon patch7c5f455/PR#13แก้favicon404ที่พบจากstrictconsoleaudit ใช้BASE_URL+originalSVG พร้อมSVG MIMEและเพิ่มconsole.error listener; scopedbuild/reference/subpath/icon200/startgameผ่าน JSเกมเดิมไม่เปลี่ยน ไม่อ้างfull77ใหม่สำหรับmetadatapatch

ตรวจ https://ninon0406.github.io/alltest/ จริง: ก่อนรดน้ำเซฟยังไม่เปลี่ยน → รดน้ำ → รับของ/trustครั้งเดียว → กลับสวนดอกบานและมาเรนจำได้ → reload คงผล ผ่าน เส้นทางหลัก/ผสม5สูตร/ต่อสู้3แบบ/ส่งออก–นำเข้าเซฟผ่าน ตรวจหลังActionsdeployซ้ำ 42versionedPNG และ JavaScript SHA256 `3e3f9ee32870e266ed809a043217ca8492a9f4826b89af3bfa4708d305e1be70` ตรงBuild, 0Conceptrequests/0ConsoleErrors ในเส้นทางที่ตรวจ ภาพ actualpublic ก่อน/ระหว่าง/หลังอยู่ในevidence/session14

Checklist21/76=27.6%คงเดิม ไม่มีการรับรองfinalHD/อุปกรณ์จริง/Safari/FPSหรือความสนุกจากผู้เล่นจริง ปรับขอบเขตรอบนี้ให้ส่งมอบด้วยBrowser EmulationและPagesได้ครบ โดยคงQA-009เป็นreleasegateที่ยังไม่ยืนยัน
