# GODSEED — ความคืบหน้า 0.6.0

### Session12 — 2026-11-05 UTC · World visual expansion (ต้นแบบสองสถานที่)

Base d4da87a บน feat/godseed-village-references; ตรวจ main/PR9 ที่รวมแล้ว ไม่ทิ้ง commit220e992 และไม่เริ่มโปรเจกต์ใหม่ อ่าน03/SSOT/Roadmap/Skillsเดิมก่อนพัฒนาตามคำสั่งภาพอ้างอิงล่าสุด

- นำเข้า ZIP เจ้าของ 13ไฟล์:10WebP+manifest+README+Contact Sheet ที่ assets/reference/godseed พร้อม SHA provenance เปิด Contact Sheetครบ10แห่ง และภาพ01/03แบบเต็ม ไม่ใช้ภาพเต็มเป็นพื้นหลังเกม
- สร้าง10PNGต้นฉบับ185,199bytes: หมู่บ้าน/ต้นไม้rear-ground-front, fountain6frames, tree432×208, leaves8frames, directionalidle4views; รักษา40PNGเดิม byte-identical ภาพใหม่ยัง procedural prototype ต่ำกว่าความละเอียด/งานศิลป์ finalHD ของconcept
- Anchor/collider/roadgraphใน scene-definitions.ts เป็นพิกัดเท้าบนแผนที่ที่วาดเอง; ตรวจfootprint10×4ทุก2px/Dijkstraเฉพาะถนนที่แต่งไว้ ไม่มีfree-roam ทางขาดหยุดพร้อมข้อความ ไม่ตัดผ่านวัตถุ
- CH0201เดินอ้อมฐานน้ำพุ→fountain_frontแล้วหันเหนือ; CH0004ใหม่เดินใต้กิ่ง→seat→นั่งคงอยู่/ใบไม้ตามtree_memory/เพื่อนPipจดจำหนึ่งครั้ง; ข้าม/ลดการเคลื่อนไหว/reloadใช้transactionเดิม Restใช้+15HP/+10MPและเวลา1tickเหมือนระบบเดิม ไม่มีของซ้ำ
- แก้จุดเดิมที่resetทุกshow: คงตำแหน่งเมื่อเป็นrun/stage/location/battlemodeเดิม; idleใช้ทิศล่าสุด ไม่ใช่side-facingทุกครั้ง ท่านั่ง/น้ำพุrestoreจากflags+sceneanchor ไม่เพิ่มserializedพิกัด ไม่เปลี่ยนState2/DB1/envelope1
- Roadmapยัง SSOTเดิม เพิ่มlocations9ด้าน×10แห่งแยกจากคะแนนหลัก และงานVIS-013/014ตามขอบเขตเจ้าของใหม่ รวม76งาน ไม่มีการนับ90ช่องซ้ำ คำสั่ง03เดิมไม่ถูกลบ
- แก้stage-siteเดิมที่คัดลอกroot/assetsทั้งหมดจนเสี่ยงเอาreferenceเข้าartifact: เก็บเฉพาะhashedJS/CSSเก่าสำหรับcachedHTML; public runtimePNGครบเหมือนเดิม validate:referencesตรวจอีกครั้งหลังstaging

ปริมาณจาก inspect:content: 18scenes/60choices/NPC5/3encounters/234legal/0endings/6stageIDs และ7location presentations (villageมีcenter/tree);50PNG/39versionedPNG ไม่มีBattle Glade/Crystal Clearingฉบับใหม่ แปดreferenceที่เหลือยังไม่แปลง

ผลปัจจุบัน: npmci/type/lint/content2/game105/roadmap7/build/PACKAGING PASS; focused4viewportผ่านก่อนGroundMaskแก้ครั้งสุดท้าย Full63และภาพหลังแก้กำลังตรวจ ดู TEST_REPORT/Development Log ก่อนถือว่าสถานะVIS-013/014ผ่าน Publicยัง0.5.1จนกว่าbranchนี้ผ่านและเผยแพร่จริง

ข้อจำกัด: NPC/actionนอกwalk/idleยังไม่ครบทุกทิศ; run/kneel/stand beatsยังต้นแบบ; ยังไม่มีเส้นทางhouse→gate→village, crystal collect/workshop art/battle gladeใหม่, low-devicepreset/lazyloading, sound/finalHD/Safarihardware ส่วนเนื้อเรื่องruins/festival/boss/สามตอนจบยังค้าง

งานถัดไป: gateภาพสองฉากและpublish → house/gate routes → crystal+workshop → battle glade/recipeVFX → NPCposes/ruinsเนื้อเรื่องตามdependencies ไม่ขยายทั้ง10แบบหยาบ

เพิ่ม S02_TREE และ CH0211/CH02T1/CH02T2 สำหรับเซฟที่ผ่านฉากเปิดแล้ว: เมนูสถานที่อื่น→แวะใต้ต้นเมล็ด→พัก→กลับจัตุรัส ไม่ต้องเริ่มเกมใหม่ ไม่ให้วัตถุดิบ/trustซ้ำ

ผล focused ล่าสุด: direction+location10/10 PASS2.4m; หลังปรับให้ภาพตัวละครซ้อนกิ่งจริง (foot186) location5/5 PASS1.1m ภาพหลังแก้เปิดตรวจแล้ว ขณะนี้ full63 บน source44bde3c กำลังตรวจ ไม่ใช้ผลก่อนแก้แทนผลปลายรอบ

GitHub Pages: APIแก้ Source เป็น Actions ถูกปฏิเสธ403 จึงยังเป็นlegacy main:/ ไม่เปลี่ยนค่าโดยอ้างสำเร็จ Workflowเดิมยัง deployได้ แต่การกันreferenceออกArtifactรับรองเฉพาะActions/dist เกมไม่โหลดConceptFiles ส่วนการตั้งค่าให้เหลือSourceเดียวเจ้าของทำจากโทรศัพท์ได้ตามREADME

Full baseline source44bde3c: local63/63 PASS14.9m และ PRCI42037332359 SUCCESS ยืนยันแก้helpertimeoutแล้ว คืนQA-006DONE จากนั้นเพิ่มRenderer guardสองจุด: หยุดเดินเป็นidleทันทีระหว่างกล้องกลับ และให้import/restoreไม่เก็บตำแหน่งจากฉากก่อน ทดสอบarrival+locations6กรณีบนbuildใหม่ รอCIเต็ม64ของsourceสุดท้าย ไม่รวมcaseใหม่ในตัวเลข63ย้อนหลัง

---

Session11 latest: PR9 merged; camera acceptance forcurrent6stages/3encounters complete. Checklist19/74=25.7%(v126.8%). Public0.5.1 verified; finalmainCI proof inTEST_REPORT. Previoussessions below retain historicalstates.

### Session8 —2026-11-05 UTC

Basebda8f51 · พัฒนาในfeat/godseed-directional-hero รวมPR#8เข้าmain3b62a2f · M1art/Cinematic polish. ใช้Master Roadmap/03/Skillsเดิมหลังตรวจsource/asset/CI ไม่เริ่มใหม่ ไม่เพิ่มtrackerซ้ำ

- VIS-003 DONEเฉพาะplayerwalk: 24originalframes/4views, dominant-axisfacing, distance-pacedlegs, feet/depth/shadowตามground; VIS-006integrationคงskip/reduced/once-onlysave พร้อมfallbackภาพเดิม
- FND-009ปรับห้างานถัดไปให้ตัดDONE/blockedและยกproblemก่อน; same74taskdataset/6validator tests ไม่เพิ่มงานเพื่อเพิ่มเปอร์เซ็นต์
- Checklist18/74=24.3%: ✅18 🟡39 ⬜16 🔴0 ⛔1; v1 18/71=25.4%. เป็นจำนวนงาน ไม่ใช่สัดส่วนแรงงาน/คุณภาพเกม
- Baseline install/checks90unit/content2/buildผ่าน; currentgameunit94/roadmap6/type/lint/content2/buildPASS; focused17/17 PASS2.4m รวมfourdevices, missingPNGfallback, skip/reduced/bench/defeat. FinalPRCI42004666730 full50ผ่าน; mainCI42005831839 full50/build/deploySUCCESS, actualpublic/save/29PNG/hash and post-ActionsrendererPASS
- Regenerateทั้งหมดผ่าน newPNG19,427bytes deterministic old39byte-identical; runtimephone-north/desktop-eastและatlasตรวจจริง ยังไม่อ้างfinalHD/hardwareFPS
- ปริมาณเดิม17scenes/56choices/NPC5/3encounters/234legal/5สูตรค้นพบใช้จริงในtests/0endings/6stages; newonePNG→40ทั้งหมด/29versioned. State2/DB1/envelope1เดิม ไม่มีการเปลี่ยนengine/rewards/storyIDs
- LocalfullพบkeyboardharnessกดEnterก่อนstartพร้อม; แก้readiness+slowPNG500msแล้ว focusedrepeat3/3PASS21.9s finalPRCI42004666730ผ่านfull50แล้ว จึงคืนQA-006DONE ไม่ใช่เกมรับคำสั่งระหว่างloading; QA-009ยังblockedSafari/physicalhardware. NPC/actionทุกทิศ/camera/ruins/festival/boss/endings/audio/masteryยังไม่ครบ
- ห้างานถัดไปตามgeneratedboard: VIS-004 → VIS-011 → VIS-008 → CMB-006 → STO-001 (B03/B04รอฉาก, canonและboss/endingsต่อจากนั้น)
- Ownerไม่ต้องตั้งค่า/รันTerminal; 0.5.0เผยแพร่และactualpublicgameplay/save/29PNG/JSผ่านแล้ว mainActions42005831839และpost-Actionsgateผ่านแล้ว หลักฐานในTEST_REPORT

## ประวัติก่อนรอบนี้

### Session7 —2026-11-05 UTC

Basef0eb125 · พัฒนาในfeat/godseed-roadmap-cinematics รวมPR#7เข้าmain7279ceaแล้ว · M1/M2 polish + GS-041 tracking. ตรวจgit/workingtree/lastCI/เอกสาร03/spec/Skills/โค้ด/PNG/ผลทดสอบก่อนแก้ ไม่เริ่มใหม่และไม่ลบงานเดิม

- FND-009/GS-041 DONE: rootGODSEED_MASTER_ROADMAP.md 8Phases/74งาน, JSONสถานะชุดเดียว, generator/validator5tests+CI, Task Boardเป็นgeneratedview, Development Logย้อนหลัง0–6และรอบ7, append03/AGENTSเดิม
- VIS-006/GS-010 DONEหลังแก้และทดสอบregression full-suite; เฉพาะขอบเขตเส้นทาง: 8choice-specificapproaches/6travel lanes ก่อนinteraction; left/rightfacing/skip/reduced/reload-safe; ยกตัวนั่งบนbenchด้วยsupportdepthโดยคืนdepth/shadowหลังจบ
- Checklistรวม23.0% =17/74งาน; ✅17 🟡40 ⬜16 🔴0 ⛔1. เฉพาะ1.0=23.9%(17/71). นี่คือChecklistแบบน้ำหนัก1 ไม่ใช่สัดส่วนแรงงาน/เวลา/คุณภาพเกม AI/CH2/CH3แยกscope
- Baseline npmci/checksผ่าน; finaltype/lint/content2/unit90/buildผ่าน, roadmap5ผ่าน, finaltouch4ผ่าน31.4s. ตรวจภาพphone390/desktop1366หลังแก้benchocclusionจริง Final full45/45 PASS8.4m และPR CI41997711472 SUCCESS; mainCI41998656125/full45/build/deploy SUCCESS; actualpublicgameplay/save/28PNG/JSและpost-Actionsrenderer gatePASS
- ปริมาณจากsourceยัง17scenes/56choices/NPC5/3encounters/234legal/5สูตรทดสอบค้นพบจริง/0endings/6stages/39PNGs; State2/DB1/envelope1เดิม ไม่มีcontent/PNGใหม่
- ปัญหาที่พบและแก้: screenshotจับได้benchบังrestแม้automatedcheckแรกผ่าน จึงแก้anchor/supportdepthและดูภาพซ้ำ ยังไม่อ้างfinalHDvisualgate
- งานค้างตามRoadmap: สี่ทิศ/NPC/camera/ฉากruins+festivalก่อนB03–05/storyendings; catalyst/mastery/audio/234VFX/hardwareQAยังไม่ครบ QA-009ติดข้อจำกัดSafari/physicaldevicesที่environmentไม่มี ไม่เท่ากับเกมมีregressionที่พิสูจน์แล้ว
- ห้างานถัดไป: VIS-003 → VIS-004 → VIS-011; VIS-008 → CMB-006 ตามdependencyและคำสั่งล่าสุดที่ให้เน้นงานภาพ/Cinematicก่อน งานSTO-001/สามบทสรุปต่อจากsliceนั้น
- เจ้าของไม่ต้องรันTerminalหรือตั้งค่าใหม่; เผยแพร่รุ่น0.4.2และตรวจactualpublicgameplay/save/hashผ่านแล้ว MainActions41998656125และpost-Actionsassets/rendererผ่านแล้ว หลักฐานในTEST_REPORT


## ประวัติก่อนรอบนี้

### Session 6 — 2026-11-05 UTC

Base09a5c19 · GS-015/017 (M2 polish). พัฒนาใน feat/godseed-alchemy-ui แล้วรวม PR#6 เข้า main ที่ f57ab5c. Working treeสะอาดก่อนเริ่ม ต่อจาก0.4.0 ไม่เริ่มใหม่ ใช้Skills Spell Alchemy/Responsive/QA/Pages; อ่านคำสั่ง03และตรวจระบบเดิมก่อนแก้

## ทำจริง

- ตัวอย่างสูตรก่อนยืนยัน: ซ่อนชื่อที่ยังไม่ค้นพบ แสดงMP/ผล/วัตถุดิบขาด เหตุผลสูตรไม่เข้ากัน และปิดปุ่มเมื่อผสมไม่ได้ สูตรเดิมไม่เรียกร้องวัตถุดิบซ้ำ
- สมุดเวทกรองธาตุ/ประเภทโจมตี-เยียวยา-โล่/เพดานMP พร้อมข้อความเมื่อไม่พบผล ไม่เปิดเผยสูตรที่ยังไม่รู้จัก
- ถอดเวทได้ รวมถอดทั้งหมด ช่องที่เหลือเลื่อนขึ้นโดยคงสูตรถาวรไว้ กรองเดิมและหน้าสมุดยังอยู่หลังจัดช่อง เซฟรูปแบบเดิมรองรับช่องว่าง0รายการได้
- แยกUIเป็น ui/alchemy-panel.ts และpure view models systems/alchemy.ts; engine unequipตรวจslot/ช่วงต่อสู้และใช้transactionเดิม

## ตรวจสอบ

Baseline npmci/type/lint/content2/unit81/build PASS. Unitใหม่6กรณี รวมทั้งหมด87/87 PASS; browserทดสอบสูตรผิด/สูตรซ้ำ/filter/ถอด/reload/สู้ชนะด้วยชุดเวทว่าง ชุดเต็ม40/40 PASS7.9m ก่อนfinal UI feedback polish; finaltouch4/4 PASS54.5s (390/820/1024/1366), finaltype/lint/buildและproduction-previewทั้งลูป/เซฟ/28PNGผ่าน Final PR CI41991912483 และmain checks/deploy41992926513 PASS รวม41 browser cases; main:/ Pages41992926258 SUCCESS. เว็บจริงเล่นทั้งเส้นทางเดิม/หอสมุด/ลำธาร/เซฟและ28PNG/hashผ่าน รวมpost-Actions byte/renderer gate ผลละเอียดดูTEST_REPORT

## ปริมาณ / ความเข้ากันได้

17ฉาก/56ตัวเลือก/NPC5/encounters3/234สูตร/0บทสรุป/6ฉากภาพเคลื่อนไหว เหมือน0.4.0 ไม่มีเนื้อเรื่องหรือภาพใหม่ ทดสอบค้นพบ/ติดตั้ง/ใช้จริง5สูตรผ่านเส้นทางที่เล่นได้ (ไม่ใช่มอบ234สูตรให้ผู้เล่น) ไม่เปลี่ยนState2/DB1/envelope1 รูปแบบequippedยังเป็นarrayไม่เกิน4ช่องที่ไม่มีช่องโหว่

ไม่พบบั๊กP0/P1ใหม่จากการตรวจรอบนี้ งานค้างที่ทราบ: ingredient origins/icons/reveal, เนื้อเรื่อง/บอส/บทสรุป, ภาพ/VFXขั้นสุดท้าย และการตรวจSafari/ฮาร์ดแวร์จริง ตัวเลือกเนื้อเรื่องส่วนที่ยังไม่สร้างยังไม่เปิดให้ผู้เล่นเข้าทางตัน

## งานถัดไป

1. GS-026/022 โบราณสถานS15–S17+B03 พร้อมpuzzle bypassและภาพจริง
2. GS-027/023/028 เทศกาล/guardian/สามบทสรุป
3. GS-018/033/031 VFX/NPC artและSafari/อุปกรณ์จริง

ภาพยังต้นแบบ; ยังไม่ทดสอบฮาร์ดแวร์จริง/FPS/Safari; ยังไม่มีboss/endings/audio/mastery/party/mapเต็ม เว็บจริง https://ninon0406.github.io/alltest/ ตรวจ0.4.1ผ่านแล้ว ไม่ต้องให้เจ้าของตั้งค่าหรือรันคำสั่งเพิ่ม

### Session9 —2026-11-05 UTC

Camera Director prototype: VIS-011 remainsIN_PROGRESS. Added12px boundedpan/450ms ease, fixedoverscan/fullmotion andoriginal1:1reducedframing, cancellation/returncenter withonce-only saves. Camera pure2 tests; game96/content2/roadmap6/type/lint/buildPASS, focus4PASS12.3s; full54/CI pending. ExistingRoadmap/03 workflow reused, percentages24.3% unchanged. No newassets/story/schema. SeeTEST_REPORT/DEVELOPMENT_LOG for exactgates and nexttasks.

Session9 localfull54/54PASS10.6m afterfinalscopeguard. Source77b62e9/PR#9 readyforreview, notmerged/published because all-scenevisualacceptance remains. Public0.5.0 preserved. Camera core works; VIS-011 and percentages remainunchanged, nextowneractionnotrequired.

SourceCI42011348567SUCCESS full54 on77b62e9. Finalcommitupdatesonlyevidence/docs; no0.5.1deployclaim. ContinuefromPR#9 nextcycle and finishvisualframingacceptance beforemerge. Checklist18/74 remains24.3%; no additionalDONEstatus fromprototype.

### Session10 —2026-11-05 UTC

ContinuePR9/baseebe49f5. Fixedcameraoffense→foe vs support/craft→player, retainingpath/scenelocations. Addedgenuine6stagegallery/actualtrainingpan onfourviewports:4/4PASS1.0m; unit97/content2/roadmap6/type/lint/buildPASS. Full58CIpending, nofull58claim. VIS-011IN_PROGRESS andChecklist24.3%unchanged; finalbattle/VFXreview remains. Noassets/story/saveformat change, public0.5.0 preserved. NextfinishPR9 beforeNPC/ruins/battles/canon.

### Session11 —2026-11-05 UTC

ClosedPR9cameraacceptance forcurrent6stages/3encounters: gallery4PASS2.1m includingrealoffensive/supportcasts/battlewins, plus97unit/content2/roadmap6/type/lint/buildPASS. SourcePRCI58SUCCESS; mergee470fe8/test-only570091bmain. No runtime/art/story/schema changes thissession. VIS-011DONE scopedcurrentcontent; checklist19/74=25.7%, v119/71=26.8%, ✅19 🟡38 ⬜16 🔴0 ⛔1. FullcurrentmainCI/publicproofinTEST_REPORT whencomplete. Futureboss/newstagecameraQA/finalHD/all234VFX/Safarihardware stillnotaccepted. NextVIS-004/VIS-008/CMB-006/STO-001/QA-009.
