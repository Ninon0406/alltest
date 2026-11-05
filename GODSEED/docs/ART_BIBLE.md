# Sunlit Memory Fantasy — art bible0.6.2

## รอบ 14 — 2026-11-05 UTC — รดน้ำแล้วโลกจดจำ (0.6.2)

เริ่มจาก `0498235` บน main ที่สะอาด และผล CI รุ่น 0.6.1 ผ่าน 70 กรณี เลือกงานย่อย VIS-005 / VIS-008 / STO-003: CH0601 เคยแสดงเพียงท่าหยิบ แม้บทกำหนดให้รดน้ำก่อน เก็บหลักฐานรุ่นก่อนใน Session13 และพัฒนาต่อโดยไม่เปลี่ยน State2 / IndexedDB1 / save envelope1

ทำจริง: เดินถึงจุดเดิม หันตะวันออก ถือบัวรดน้ำ/เทน้ำ → ดินเปียก → ดอกไม้บาน → หยิบเมล็ด → commit ตามระบบเดิม แปลง 64×48 มีสามสถานะและ Hero 64×48 มีสี่เฟรมต้นฉบับ ใช้ร่างเดิมที่กริด 1:1 พร้อมแขน บัว และหยดน้ำใหม่ ข้อมูล `garden-staging.ts` แยกจาก reward reducer; ภาพและบทมาเรนอ่าน garden_tended จากเซฟ การกลับมาเห็นดอกบานและได้คำแนะนำเวทเยียวยาไม่มีรางวัลเพิ่มจาก renderer

ตรวจภาพจริงพบว่าแปลงใหม่ทับทางออกเดิม จึงเปลี่ยน fixed garden exit ให้อ้อมด้านล่าง พร้อมทดสอบแนวเท้า 10×4 ไม่ตัดฐานแปลง ทางหยิบทั้งสองยังเข้าจุดเดิม ไม่มี free roam หรือเปลี่ยนการเดินสี่ทิศ ท่ารดน้ำเพิ่มความหมายให้ทางเลือกช่วย NPC แต่ยังไม่ได้พิสูจน์ความสนุกกับผู้เล่นจริง

ผลตรวจเบื้องต้น: npm ci, TypeScript, Lint, Content 2, Unit 114, Roadmap 7, Production Build, Reference Packing ผ่าน; Browser เฉพาะงานใหม่ 7/7 ผ่าน 55.8 วินาที (390×844, 844×390, 820×1180, 1024×768, 1366×768 รวม reload กลางท่าก่อน commit / skip once / PNG ขาด / กลับมาและโหลดดอกบาน) Full Browser Suite 77 กรณีกำลังตรวจ ไม่อ้างว่าผ่านก่อนผลจริง ภาพทั้งหมด 53 PNG สร้างซ้ำตรง byte; ใหม่ 2 ไฟล์รวม 9,869 bytes

บั๊กระหว่างพัฒนา: Art Test จับหยดน้ำเลยแถวเท้า 44 จึงแก้ระยะหยดใน Generator แล้วผ่าน ไม่ข้าม Assertion; แก้ข้อความ Locator ใน Test ให้ตรงชื่อ Choice จริงก่อนรัน รอบนี้ไม่เปลี่ยนสูตร 234 สูตร / จำนวน 18 Scene, 60 Choice, 5 NPC, 3 Encounters, 0 Endings

ข้อจำกัดและแผนที่ทำได้ในรอบนี้: ส่งมอบและตรวจ Browser Emulation + Build + PR/Pages ตามสิทธิ์; ไม่รออุปกรณ์จริง ไม่ขอเจ้าของรัน Terminal และไม่ลดเกณฑ์ hardware ของ QA-009 การรับรอง Safari/เครื่องจริงและ FPS/thermal ยังเป็น release gate ที่ยังไม่ยืนยัน ภาพยังเป็นต้นแบบ ไม่ถือว่าแปลง Reference สวนครบทั้งฉาก

Checklist ยังคง 21/76 = 27.6% (scope1.0 21/73 = 28.8%) ทั้งสามงานใหญ่ยัง in_progress หลักฐานภาพก่อน/ระหว่าง/หลังอยู่ใน `docs/evidence/session14/` ไม่เพิ่มงานย่อยเพื่อปั่นเปอร์เซ็นต์

งานถัดไปตาม dependency: (1) บทฟังเพลง CH0602 ต้องมีที่นั่งและท่าฟังตรงมาเรน (2) ปรับฉากสวนตาม Reference ให้ทางเดิน/อาคาร/สมุนไพรเป็นชั้นจริง (3) ท่าพิเศษ NPC พร้อมบุคลิก (4) Workshop และเอฟเฟกต์ผสมตามสูตร (5) B03/โบราณสถานหลังภาพ/ปฏิสัมพันธ์ที่เกี่ยวข้องพร้อม


Current:6layered stages /7location presentations,12actor sheets including retainedlegacy alternatives; all remain original procedural prototype art. The versioned notes below describe earlier states separately.

## 0.4.0 archive/stream studies

`generate-exploration-art.mjs` independently generates12PNG underart-v3: archive/stream rear+ground+front (480×270), two opaque composited fallbacks, transparent mist, six32×32 ripple frames (192×32), Eira256×96 (8used32×48frames:idle/talk) and wisp256×144 (11usedframes:idle/attack/hit). Blank atlas cells stay transparent. Old27PNGs unchanged;39PNGs reproduce byte-for-byte.

Archive: warm stone, lavender rug, bookcases, recessed star-clock/map, motes and reading props. Stream: jade water andfall, arched timber bridge, near-bank earthen actor lane, detached moss/lantern props andwater ripples. Player/NPC feet retain y+20 with shadows/depth sorting. Savedstream_clean removes mist and adds shore flowers; archive_read adds a visible rune marker. Eira uses long lavender coat/braid/spectacles/book; water spirit uses droplet/ribbon fins rather than a recolored seed.

Runtime evidence: explore-{archive,stream-fog,stream-battle,stream-clean}-{390,820,1366}.png. Phonearchive/battle reviewed after genuine play; text/targets/groundlane fit andHUD stays beneathcanvas. Full device/backend/hardware/performance results inQA_MATRIX. Art is coherent playable prototype; oldNPCsilhouettes, advancedlighting, full234VFX distinctness andfinalHD gate still pending.

## Historical notes through0.3.0

# Sunlit Memory Fantasy — prototype art bible

Source `scripts/generate-art.mjs`; regenerate with `npm run generate:art`. Palette warm jade/leaf/sun/cream, outlines deep slate, lavender/mint spell accents. Logical canvas 480×270; actors 32×48 with 6 original source frames each. Nearest-neighbor pixel art rendering. Village/garden/workshop/forest have separate transparent world stage over sky, actors, ground shadows and airborne motes.

Animations: actor idle cycles, player walk frames, interact/pick/cast/rest pose + tween. Action library is provisional; not the full 11 states and frame counts in SSOT. World transitions fade in. VFX uses elemental color, form layout, modifier transforms with bounded local particles; not yet verified distinct for all 234 recipes.

Art debt (visual gate NOT PASSED): trees/buildings/props are mostly baked into stage layer; true per-prop occlusion/parallax/lighting/tilemap required. Contact shadows need to follow moving actors; all humanoids currently share silhouette with distinct palette. Sprout/Pip share seed-creature base. Add uniquely authored NPC/enemy silhouettes, proper named cycles and terrain-rooted path anchors. No claim final HD art or finished boss assets.

Browser screenshots in test-results are evidence of the provisional runtime, not design mockups. Reviewed phone 360px capture: Thai text and primary buttons fit; game is visible; visual depth/detail remains below final spec.

# # 0.2.0 presentation improvements

Ground shadows follow actors. Support ORB/RAIN/CHAIN/HEAL/GUARD particles target player; offensive particles target foe; split and pierce paths, limited reactions, and skippable cleanup retained. Canvas min-width fix keeps its flex item inside narrow landscape stage. Training uses workshop/Pip as provisional spirit. No new art sheet was authored; final scene depth/parallax/occlusion and distinct humanoid/enemy silhouettes remain debt. Screenshots fire-cast-phone.png and training-{390,820,1366}.png are actual browser evidence, not the six-representative-VFX/final HD gate.

# # 0.3.0 — layered original studies

Sources: retained `generate-art.mjs` plus `generate-stage-art.mjs`/`generate-actor-art.mjs`; `npm run generate:art` reproduces all27 public PNGs byte-for-byte. New16 PNGs total about256KiB on disk. Layers are480×270; props eight64×96 cells; ambient sixteen32×32 cells. Alpha cells and animation ranges are validated; textures remain nearest-neighbor with integer rendering.

Village cottages/belltower, flower-garden arch, timber workshop/forge and forest shrine have independent rear/ground/front layers.20 placed props and21 ambient instances add depth; character foot y+20 determines occlusion/shadow. Subtle rear/front parallax moves behind/around the anchored actor lane. World memory adds a banner/planter/rune only after real relevant flags. Props are scenery rather than new touch targets.

Hero256×528 atlas,32×48 cells,8 columns:11 named cycles with56 used frames; unused cells transparent. Foot row44 anchors to world y+20. Original training256×144 atlas has13 used frames: idle/attack/hit; copper/cream lantern ceramic silhouette differs from Pip. Four legacy NPC sheets and Sprout still need individual silhouettes and full action cycles. Run is supplied in the manifest but no new run choice is invented.

Actual runtime screenshots: visual-{village,garden,workshop}-{390,820,1366}.png and visual-training-{390,820,1366}.png, plus forest loops and cast evidence. They document prototype improvement, not final HD acceptance. Reduced motion holds idle poses/ambient and uses brief bounded transitions; skip removes transient particles and cancels stale animation work. Final lighting, NPC cohesion, terrain polish, VFX6 representative/all234 distinctness and physical-device performance remain open.

Portrait HUD now flows below the canvas rather than covering actor feet; bounds are asserted on phone/iPad art routes. Desktop/short landscape layout retains its existing controls.

## 0.4.2 route/support-height study

No new PNG/third-party art. Six authored travel lanes and eight prop approaches reuse original cycles, flip horizontal facing and maintain moving shadows. Bench resting uses hero rest animation at center79/193, foot213, support depth239 above bench238; shadow is hidden during the raised/cross-legged pose and restored on cancellation/scene change. Initial screenshot showed occlusion from ordinary depth and triggered a correction. Final cinematic-bench-{390,820,1024,1366}.png documents actual runtime; phone390 and desktop1366 manually reviewed. Still a procedural prototype: this is not four-direction front/back art, a final sitting animation library, complete NPC art, or final HD visual approval.

## 0.5.0 four-view player walk study

Original generator `generate-directional-art.mjs` adds one256×192PNG underart-v4, eight32×48columns ×fourrows (south/west/east/north), sixframes@10fps each and transparent unused cells. Front has a visible face; rear has hair/scarf/backstrap; side heads have authored profiles and the asymmetric satchel stays consistent. These are actual drawings on the source grid, not rotations/scaled pictures or a front/back flip. All24frames animate; the planted sole remains onrow44. Foot/depth/shadow metrics retain worldy+20.19,427bytes; deterministicSHA9897218761283fcf21747fbce0cb91a1c2652bbf2264ad7ddba37fdccacaaf87.

Directional runtime captures: directional-east-{390,820,1024,1366}.png and directional-north-{390,820,1024,1366}.png; phone390north and desktop1366east reviewed against actual movement, plus original atlas review. New tests observe south/east/west/north texture/animation and contact geometry through genuine choices, not injected animation commands. Remaining debt: individual NPC silhouettes/cycles, four-view non-walking poses, camera staging, advanced lighting, finalHD approval and physical performance. Existing39PNGs are byte-identical toGitbase after full regeneration.


## 0.6.0 — ต้นแบบหมู่บ้านและต้นไม้จากภาพอ้างอิง

เปิด Contact Sheet ทั้ง10แห่ง และภาพ01/03แบบเต็ม ใช้เป็นแนวทางสี วัสดุ หลังคาฟ้า/แดง หินครีม น้ำสีหยก ดอกไม้ และมุมมอง3/4 ภาพใหม่วาดบนกริดพิกเซลด้วยคำสั่งต้นฉบับ ไม่สุ่มสีหรือนำพิกเซลจาก concept มาตัดแปะ รายละเอียด รูปทรงต้นไม้ แสง และ NPC ยังต้องปรับอีกมากก่อนถึงเกณฑ์ final HD

| มาตรฐานร่วม | ค่าที่ใช้จริง / ข้อจำกัด |
| --- | --- |
| Logical canvas | 480×270, Phaser nearest-neighbor / roundPixels / FIT; UI ไทยแยก DOM และไม่บังคับหมุนจอ |
| Sprite | ผู้เล่น32×48, แถวเท้าต้นฉบับ44; พิกัดเท้าโลกคือ centerY+20 |
| Tile / grid | กริดวางแผน16px; ต้นแบบยังใช้ PNG Layer ไม่ใช่ reusable Tile Set ที่เสร็จแล้ว |
| มุมมอง | ฉาก3/4แบบเห็นหน้าและข้างอาคาร ใช้วัสดุและสัดส่วนร่วมกัน; ตัวละครยังมีท่าที่ต้องปรับให้เข้ากัน |
| Palette | หิน#dfcdb0, หลังคาฟ้า#628baf/แดง#c87d67, น้ำ#6dc8c0, หญ้า#82ac76, ดอกไม้#e9bdc8 |
| Lighting / shadow | แสงอุ่นกับเงาเขียวหม่นและเงาสัมผัสพื้น การเชื่อมทิศแสง/เงาทุกวัตถุยังเป็นต้นแบบ |
| Layers | rear-1000, ground-900, foreground1000; Ground เว้น alpha ตรงผนังหน้าอาคาร |
| Depth | Prop ตามฐานเท้า, actorY+20, shadowY+19; tree201 / fountain204 / bench238 / seated239 |
| Idle / walk | ท่ายืน4ทิศ ทิศละ3เฟรม@3fps; เดิน4ทิศ ทิศละ6เฟรม@10fps ไม่ใช้ flip แทนหน้า/หลัง |
| เวลาการกระทำ | เดินตามระยะประมาณ70px/s ช่วงละ200–900ms, interact600ms, cast1120ms, craft1600ms; ข้ามได้ |
| Ambient | น้ำพุ6เฟรม@6fps, ใบไม้8เฟรม@6fps ใช้Spriteวนซ้ำ6ชิ้นหลัง memory flag; หยุดเมื่อ Reduced Motion |

Generator ใหม่ `generate-village-art.mjs` และ `generate-idle-art.mjs` สร้าง10PNGรวม185,199bytes: ฉาก2แห่ง×3เลเยอร์480×270, fountain576×112 (6ช่อง96×112), tree432×208, leaves128×16 (8ช่อง16×16), idle96×192 (4ทิศ×3ช่อง32×48) รักษา40PNGเดิม byte-identical การนั่งใช้ Atlas เดิม; kneel/stand และปฏิสัมพันธ์ทุกทิศยังไม่ครบ

แก้ Anchor/Collision ได้ใน `scene-definitions.ts` พื้นที่เท้า10×4ตรวจทุก2px ถนนเป็น Fixed Graph ไม่ใช่ Open World ไม่มีการเดาพิกัดจากภาพ concept ต้นไม้บังตามฐานเท้า201และทางหลังต้นไม้186 หลังตรวจภาพครั้งแรกว่าทาง198ให้ค่า depth ถูกแต่ตัวละครยังไม่ทับกิ่งพอ

เปิดตรวจภาพ runtime390pxและ1366pxหลังแก้ Ground Mask และเส้นทางแล้ว หลักฐานใน [Session12](evidence/session12/README.md) ส่วน820/1024อยู่ในผลทดสอบและ CI Artifact ยังไม่มี Low Device Preset, Lazy Loading, FPS/thermal/hardware benchmark หรือการรับรอง Safari


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
