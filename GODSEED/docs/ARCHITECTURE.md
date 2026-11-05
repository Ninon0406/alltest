# GODSEED architecture — 0.6.0

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

ผล: npmci/type/lint/content2/game109/build/referencechecksPASS; browserfocus5/5PASS24.2s บน390/820/1024/1366พร้อมtouch/reload/assetfallback เปิดดูภาพfeather/garden390จริงแล้ว Initialtestเลือกข้อความเมล็ดไปตรงeditionที่ซ่อนบนมือถือ จึงจำกัดlocatorใน#content ไม่ลบassertion Full70CIยังรอ ไม่รายงานว่าpublish0.6.1แล้ว

Roadmap27.6%(21/76)คงเดิม งานใหญ่3IDยังin_progress ไม่มีเพิ่มคะแนนจากภาพย่อยหรือสเปก ความสนุกยังเป็นการประเมินภายใน ไม่มีผู้เล่นจริงทดสอบ รอบนี้ไม่เพิ่มเนื้อเรื่อง/ศัตรู/สูตร/จำนวนวัตถุดิบ รักษา18Scene/60Choice/234legal/3encounters/0endings ภาพยังต้นแบบ/hardwareSafariยังไม่ทดสอบ

งานถัดไป5:1)ผูกวัตถุเก็บอื่นกับAnchor/ผลจริง 2)ปรับรายละเอียด2ฉากหลักตามreference 3)บ้าน–ประตูเชื่อมถนน 4)Crystal/WorkshopและVFX 5)NPCท่าพิเศษและQAอุปกรณ์จริง คำสั่งรอบถัดไป:ตรวจRoadmapแล้วพัฒนาต้นแบบสถานที่ต่อจากจุดที่ทดสอบผ่าน ห้ามรีเซ็ตเกมหรือเพิ่มสูตรเกิน234
