# Decisions — 2026-11-04

1. Latest owner override explicitly removes REBORN. Remove old tracked game and publication content; preserve GODSEED bundle, ten Skills, installation evidence and normal Git history. GODSEED now owns Pages root; earlier plan for a separate URL is superseded.
2. Phaser 4.2.1 verified available through npm and pinned. Vite/TS use current resolved lockfile; Phaser typings compile and actual production browser boots, validating the APIs used. No claim all vendor documentation APIs were exhaustively checked.
3. Deliver a complete first forest loop before entire chapter. Keep canonical Scene/Choice IDs; omit unimplemented routes rather than show empty menus or claim chapter completion. Four procedural stage variants are provisional, not final HD art.
4. All 234 recipes have definitions, canonical costs/power/support category and composed descriptor. Current single-enemy slice executes damage, split/seek, heal, shield, pierce, basic SEAR/WET/RESONANCE. Other elemental reactions, full duration/target semantics and visual differences across every modifier remain backlog. Do not equate definition coverage with full behavioral acceptance.
5. Starter is learned by actual on-screen craft rather than gifted as a usable spell before discovery, following §7.6 tutorial transaction and avoiding dummy success.
6. Reward choices with repeatable gathering are limited per in-game day; no real-time timer. One-shot gifts/trust keyed by Choice ID. Repeat gathering cooldown text remains UI debt.
7. IndexedDB failures preserve current state but currently prevent new action commits. Future memory-only fallback must clearly label lack of persistence. No read/write of legacy game save keys.
8. Relative base is chosen to support existing project Pages root and nested previews. Must be verified under /alltest/ before release.


## Session 2 — 0.1.1

9. Prioritize concrete P0/P1 save loss/unplayable storage failures before adding more narrative or art. Existing first-slice rules and all 234 recipe definitions are preserved.
10. Proved corruption propagation with a failing regression on the original implementation; one validated atomic transaction replaces the earlier read-then-write pair. Preserve last-good backup when primary is invalid, rather than saving corrupt input as recovery.
11. Memory fallback is automatic with a persistent Thai warning and export/retry controls. This intentionally supersedes decision 7's earlier behavior that blocked gameplay on storage failures. Do not call a memory-only action durably saved.
12. Keep state/database schema 1. Add file envelope format 1 with canonical SHA-256 and explicitly support raw state-v1 imports. This is backward-compatible file handling; no new game state migration is needed or claimed.
13. Existing archive slots were written but inaccessible. Expose validated archived runs on title/save screens, including export. Memory-created archives remain session-only until successful retry flushes them. New runs never silently erase the current valid run.
14. Copy the owner's canonical root master spec to docs/GODSEED_MASTER_SPEC.md byte-for-byte, SHA-256 451ce8aa3e95ee291aa3782a74c7037cd1b0196b92837bf03ad7e33ebc44879d. Preserve original Markdown hard line breaks via a narrowly scoped gitattributes rule. Do not maintain divergent design editions.

15. Final review found a retry edge case: startup inspection failure can hide a valid old run from the session. Archive any different-run primary inside the save transaction itself, so later retry and subsequent autosaves cannot lose that older run. A new failing regression proved this boundary before the fix.


## Session 3 — 0.2.0

16. Work on single-enemy combat effects/training now that save reliability is established. Data-drive B01 vs BT_TRAINING before adding bosses. Keep first chapter incomplete until its real paths exist.
17. State2 is required for per-player status, finite shield lifetime, stable combat log, XP and generic recoveryScene. Validate original V1/checksum before conversion, preserve identity/resources/RNG and save an original raw snapshot. No historical XP backfill; future levels/mastery remain gated work, not implied by displaying XP.
18. Resolve status ambiguities explicitly: offensive GROUNDED protects the target; enemy RESONANCE is a consumed vulnerability mark. VEIL lowers the affected actor's outgoing accuracy, not an evasion buff. New VEIL counts the immediate enemy phase; SEAR/SWIRL/ROOTED survive until their next relevant player action. Reapplication refreshes bounded duration. See BALANCE for timing.
19. WET+WIND's speed reduction is represented by skipping the current enemy phase in this single-actor model, with explicit Thai outcome log. This is a bounded implementation interpretation, not a hidden general speed system. Boss disables/immunity must be designed before B05 is enabled.
20. Add CH0404 training and CH0405 forest-clue handoff as authored workshop options, because canonical training/first fire recipe existed in the spec without implementation. The gift is one-time and must be consumed by real crafting; never give a fake learned spell or repeat resources. Existing scene and choice IDs unchanged.
21. Training uses the workshop and an explicitly provisional Pip sheet. Fix support VFX recipient, moving shadows and skip/tween cleanup now; do not count this as final art, a new unique enemy sprite, or all234 VFX acceptance.

## Session4 — 0.3.0 (2026-11-05 UTC)

22. Prioritize GS-007/008/009/010/033 because final art/depth/action identity is the current presentation gap. Add no new gameplay or save fields. Keep remaining chapter scenes/endings explicitly incomplete.
23. Generate independently layered original assets with local pixel drawing code, editable layouts/manifests and a distinct training creature. Preserve legacy originals as fallback. This supersedes decision21's temporary Pip reuse; it does not certify final HD art.
24. The renderer observes resolved states and commands; it never grants resources, changes RNG or invents outcomes. Animate the final battle on its old stage before committing/showing the new state. Token cancellation plus settle-once promises make skip/reduced/show cleanup deterministic.
25. Respect OS motion initially and when changed; reduced idle/ambient holds still. Disable actions until rendering is ready. Missing new-art files fall back to old originals with a Thai notice. Broader loading retry/offline support remains open.
26. Read-only renderer diagnostics support assertions of real poses/texture/layers, alongside actual UI actions and durable IndexedDB reads. No golden route gameplay writes or fake exposed game state. Visual assets stay provisional until full manual/device art gates pass.

27. Manual844×390 review caught an inherited grid/aspect-ratio preferred-width bug despite the old overflow test passing. Constrain short-landscape world to its grid width and remove its preferred ratio; preserve the canvas16:9 ratio inside. Add geometry assertions for canvas/scene/desk boundaries so hidden clipping cannot masquerade as responsive acceptance.


## Session5 —0.4.0(2026-11-05 UTC)

28. ChooseGS-009/011/022/026/029 after a clean0.3baseline. Deliver the bounded archive/stream loop; preserve first forest milestone and all older actions rather than claiming a complete chapter. Ruins/festival/boss remain a documented next slice.
29. Share declarative condition evaluation between UI/reducer; known-WIND story use must be actually discovered, while Lumi OR crafting opens the stream. Scene-target animation uses the known spell descriptor. Canon story use has no listedMPcost, so it is not billed as a battle cast.
30. S14's every exit unlocks archive_read/ruins_open; rare Echo/Ray/Linger grants and trust stay one-time. Q_STREAM_CLEAN bell choice grants canonical Water reward once; listening never resets a prior cleanup. New story facts fit existing bool flags/choices and need no new mandatory save fields.
31. Keep State2/DB1/envelope1; widen only current battle catalog/HP for B02. Preserve strict historicalV1battle rules. An explicit0.3V2 fixture stays byte-equivalent by field and stable B02 checked files round-trip. Forward releases load old saves; downgrade to an old game that lacks new scenes is not promised.
32. B02 HP52/power8/WIND+20% asSSOT. At<=26HP on even turns it announces a no-damage mist that applies playerVEIL for the next action. Lock this plan before the player moves; crossing the threshold cannot retroactively change a displayed intent. SEEK/BASIC stay reliable counters. Simulations and timing tests cover these rules.
33. Add original archive/stream3layers+fallbacks and distinct Eira/water-spirit silhouettes. Retain all old art; water6frames and fog/planter show actual cleanup. Prototype quality remains explicit; no finalHD orhardwareFPS certification.
34. Clue journal/hints and Eira/Maren lines depend only on witnessed flags/choices. OptionalAI still absent. Collapse only the two new hub locations under semantic“สถานที่อื่น”; preserve access to all existing primary choices. Record coordinates for the next ruins slice without advertising a nonfunctional travel button. Festival readiness/event staging is deferred until its real route exists.

35. Final review corrected story spell endpoints to authored scenery anchors rather than a companion's coordinates. WIND dispels bridge mist at330/150; archive study glows at manuscript240/142. Keep battle recipient rules unchanged and assert the observed WIND endpoint during the genuine skip path.

36. A genuine WATER-first route demonstrated that CH0205 must accept forest_open OR crafted_first, as SSOT specifies. Fix the former single-flag gate and preserve the shared UI/reducer check; add a failing-then-passing real-choice regression. Keep clearing stream mist and rescuing the bell as separate journal facts, tied to stream_clean versus CH1201.

## Session6 — 0.4.1

37. Complete pending GS-015/017 preview/filter/unequip before another large location slice. New materials in0.4 make recipe compatibility feedback useful. Reuse canonical legality/stats; do not change234 definitions or invent unknown names.
38. Unequip compacts remaining slots to preserve the published State2 array contract; permit zero spells because BASIC_PULSE/GUARD remain available. Recipes are never removed. Reject changes in battle and invalid slots. Filters remain ephemeral and do not mutate saves.

## Session7 —0.4.2

39. Latest owner adds an eight-phase Master Roadmap alongside continued art/Cinematic development. Single human-reviewed status dataset generates both full checklist and the old Task Board view. Preserve GS IDs as cross-references and historical status in Git/TEST_REPORT rather than competing boards or double-counting. Count DONE/tasks without partial credit; distinguish checklist progress from labor/game quality. Version1.0 scope remains chapter1 perSSOT; optionalAI/CH2/CH3 do not silently become launch requirements.
40. Select GS-041 and GS-010 as a bounded batch. Routes are authored presentation-only points, not open-world navigation, saved positions or new story rewards. Actual animation precedes the existing once-only transaction persistence. All state/DB/file versions and existing scene/choice/spell counts stay unchanged.
41. Real screenshots exposed a seating occlusion bug after automated assertions initially passed. Fix seat anchor/support-depth and hide ground shadow during seated rest; retain true foot-Y sorting elsewhere. Reviewed phone/desktop runtime after correction. Mark only bounded path director complete; whole art, four-direction sprite, NPC, camera and HD gates remain incomplete.

## Session8 —0.5.0

42. Reuse the existing74-task Master Roadmap and03workflow; no duplicate tracker or repeated appended instructions. Prioritize VIS-003/VIS-006 and the FND-009 queue update. Retain everyoldGS mapping; granular playerwalking acceptance does not finish broadGS-007/033 or NPC/finalart tasks.
43. Add a versioned, independently drawn four-view playerwalk sheet while retaining hero-v2 for nonwalking actions/fallback. Direction comes only from authored leg vectors; no new movement controls or saved positions. Pace by distance to avoid identical travel durations over unequal distances; reduced/skip still settle the same engine result once. Village south step and archive floor approach provide actual visual use of allviews without inventingnewchoices orrewards.
44. The old generatedfive-task queue always included the firstID even afterDONE. Derive it from unfinished candidate statuses and prioritize recordedregressions; keep allstatuses/denominators in roadmap.json. Six negative/counting/queue tests support future truthful updates. Hardware/Safari remainsblocked, optionalAI/CH2/CH3 remain outsidev1criticalpath.

45. Session9: develop VIS-011 camera core as a bounded prototype, retaining its IN_PROGRESS status pending full framing acceptance. Use fixedoverscan rather than repeatedzoomjumps; reducedmotion1:1 and skip resets camera immediately. Pan/return ties to resolved story/battle commands, not game state changes or menu-only operations. No new art/story/schema. Preserve previous percentages until complete evidence exists.

46. Session10: finishpreviousPR9 acceptance beforeanotherproject/slice. Correct cameraoffense recipient instead ofcountingexistingwrongfocusascomplete. Six-stagegallery andtrainingoffense broaden evidence; allbattle/VFXreview stilloutstanding, keepVIS-011IN_PROGRESS andpercentunchanged. PreviousCI54 is not new-tree58proof; recordpendinghonestly.

47. Session11 completesPR9 current-contentcameraacceptance beforeanotherfeature. MarkVIS-011DONE only for6currentstages/3encounters after genuinegallery+battlecoverage andruntime review. Newfuturecontent needs its own framingregressions; do not equatecameraDONE withfinalHD/234VFX/hardware approval. No newtasks/denominatorinflation, no runtime/state changes for acceptance-onlybatch.


## Session12 — 0.6.0 /2026-11-05 — owner visual expansion

- Latestowner references override earlier visualstudies, not story/crafting/combatcontracts. Importexact13originalfiles withSHA256provenance; viewed10-locationContactSheet and full01/03. Referenceavailability is separate from playable/finalsceneacceptance. No independentthirdpartylicense asserted for ownerconcepts.
- Choose a complete, bounded village/treeprototype; keep8referenceconversionsunstarted. ReusevillageStageID with locationdefinitions, preserving17storyIDs. Add optionalCH0004restattheopening; canonotherwiseunchanged, no newcombat or rewardgift.
- Rootcauseofmostlyright-facingstops is legacyidletexture and unconditionalpositionreset onshow, not absentfourviewwalking. Supplyoriginalidleviews and preserveposition/facing withinthesamemap; restorestableanchors/restflags onreload. No requiredsavefields/migration. Generalpositionpersistenceacrossallbattle/reloadroutes remainsfuturework.
- Usefixedroadgraph+sampledfootprintvalidation ratherthan open-worldA*. Overheadboughs sortatfoot201 but do notblockfloor; benchlegs aregroundsolids andseat usesraiseddepth239. Allcoordinatesauthoredonthegeneratedmap.
- RefineGroundLayeralphamaskafterbrowserreviewcaughtwallscoveredbygrass; addregressionpixels. Art remains belowfinalHDconceptquality andspecialnonwalkposesstilllegacy.
- ProtectPagesartifact fromrootreferencecopy: stage-site retains onlyprevioushashedclientJS/CSS; old40PNGsourceoutputs stillpublic andbyteidentical. Developmentconcepts are neverimportedbyruntime.
- ExtendexistingSSOTwith9aspect/locationmatrix, not a secondtracker/90globaltasks; add2boundedtasks becauseownerexpandedactualscope. Percentage maydecreasewithnewdenominator beforetestscomplete; no inventedpartialcredit.

- Add revisitable S02_TREE with CH0211/CH02T1/CH02T2 so existing saves can experience the new location without restarting. Opening CH0004 remains optional; revisit rest grants no new trust/material reward. Old 17 scene IDs are preserved; total is18/60.
- Initial directional browser wait assumed a reset entry point and timed out at5s on the retained bench→exit road. Keep genuine road traversal; wait up to12s (eight bounded900ms legs + interaction/camera), and remove zero-distance graph steps rather than fabricating a walk/facing change. Rerun final focused/full gates; preserve the initial failure in the report.


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


## รอบ 14 — 2026-11-05 UTC — รดน้ำแล้วโลกจดจำ (0.6.2)

เริ่มจาก `0498235` บน main ที่สะอาด และผล CI รุ่น 0.6.1 ผ่าน 70 กรณี เลือกงานย่อย VIS-005 / VIS-008 / STO-003: CH0601 เคยแสดงเพียงท่าหยิบ แม้บทกำหนดให้รดน้ำก่อน เก็บหลักฐานรุ่นก่อนใน Session13 และพัฒนาต่อโดยไม่เปลี่ยน State2 / IndexedDB1 / save envelope1

ทำจริง: เดินถึงจุดเดิม หันตะวันออก ถือบัวรดน้ำ/เทน้ำ → ดินเปียก → ดอกไม้บาน → หยิบเมล็ด → commit ตามระบบเดิม แปลง 64×48 มีสามสถานะและ Hero 64×48 มีสี่เฟรมต้นฉบับ ใช้ร่างเดิมที่กริด 1:1 พร้อมแขน บัว และหยดน้ำใหม่ ข้อมูล `garden-staging.ts` แยกจาก reward reducer; ภาพและบทมาเรนอ่าน garden_tended จากเซฟ การกลับมาเห็นดอกบานและได้คำแนะนำเวทเยียวยาไม่มีรางวัลเพิ่มจาก renderer

ตรวจภาพจริงพบว่าแปลงใหม่ทับทางออกเดิม จึงเปลี่ยน fixed garden exit ให้อ้อมด้านล่าง พร้อมทดสอบแนวเท้า 10×4 ไม่ตัดฐานแปลง ทางหยิบทั้งสองยังเข้าจุดเดิม ไม่มี free roam หรือเปลี่ยนการเดินสี่ทิศ ท่ารดน้ำเพิ่มความหมายให้ทางเลือกช่วย NPC แต่ยังไม่ได้พิสูจน์ความสนุกกับผู้เล่นจริง

ผลตรวจเบื้องต้น: npm ci, TypeScript, Lint, Content 2, Unit 114, Roadmap 7, Production Build, Reference Packing ผ่าน; Browser เฉพาะงานใหม่ 7/7 ผ่าน 55.8 วินาที (390×844, 844×390, 820×1180, 1024×768, 1366×768 รวม reload กลางท่าก่อน commit / skip once / PNG ขาด / กลับมาและโหลดดอกบาน) Full Browser Suite 77/77 ผ่านทั้ง local และ CI ตรวจเว็บจริงแล้ว ดูหลักฐานปิดรอบด้านล่าง ภาพทั้งหมด 53 PNG สร้างซ้ำตรง byte; ใหม่ 2 ไฟล์รวม 9,869 bytes

บั๊กระหว่างพัฒนา: Art Test จับหยดน้ำเลยแถวเท้า 44 จึงแก้ระยะหยดใน Generator แล้วผ่าน ไม่ข้าม Assertion; แก้ข้อความ Locator ใน Test ให้ตรงชื่อ Choice จริงก่อนรัน รอบนี้ไม่เปลี่ยนสูตร 234 สูตร / จำนวน 18 Scene, 60 Choice, 5 NPC, 3 Encounters, 0 Endings

ข้อจำกัดและแผนที่ทำได้ในรอบนี้: ส่งมอบและตรวจ Browser Emulation + Build + PR/Pages ตามสิทธิ์; ไม่รออุปกรณ์จริง ไม่ขอเจ้าของรัน Terminal และไม่ลดเกณฑ์ hardware ของ QA-009 การรับรอง Safari/เครื่องจริงและ FPS/thermal ยังเป็น release gate ที่ยังไม่ยืนยัน ภาพยังเป็นต้นแบบ ไม่ถือว่าแปลง Reference สวนครบทั้งฉาก

Checklist ยังคง 21/76 = 27.6% (scope1.0 21/73 = 28.8%) ทั้งสามงานใหญ่ยัง in_progress หลักฐานภาพก่อน/ระหว่าง/หลังอยู่ใน `docs/evidence/session14/` ไม่เพิ่มงานย่อยเพื่อปั่นเปอร์เซ็นต์

งานถัดไปตาม dependency: (1) บทฟังเพลง CH0602 ต้องมีที่นั่งและท่าฟังตรงมาเรน (2) ปรับฉากสวนตาม Reference ให้ทางเดิน/อาคาร/สมุนไพรเป็นชั้นจริง (3) ท่าพิเศษ NPC พร้อมบุคลิก (4) Workshop และเอฟเฟกต์ผสมตามสูตร (5) B03/โบราณสถานหลังภาพ/ปฏิสัมพันธ์ที่เกี่ยวข้องพร้อม


### หลักฐานปิดรอบ 14 — 0.6.2

Source `3862287` / [PR#12](https://github.com/Ninon0406/alltest/pull/12) / merge `eca15b2`. Local Full77 PASS; PR CI42065834761 และ main CI42068520631 ทดสอบ/Build/Deploy SUCCESS. Unit114 / Content2 / Roadmap7 / TypeScript / Lint / Reference Packing PASS; Focus7/7 PASS55.8s; ภาพ53PNGสร้างซ้ำตรงbyte

Icon patch7c5f455/PR#13แก้favicon404ที่พบจากstrictconsoleaudit ใช้BASE_URL+originalSVG พร้อมSVG MIMEและเพิ่มconsole.error listener; scopedbuild/reference/subpath/icon200/startgameผ่าน JSเกมเดิมไม่เปลี่ยน ไม่อ้างfull77ใหม่สำหรับmetadatapatch

ตรวจ https://ninon0406.github.io/alltest/ จริง: ก่อนรดน้ำเซฟยังไม่เปลี่ยน → รดน้ำ → รับของ/trustครั้งเดียว → กลับสวนดอกบานและมาเรนจำได้ → reload คงผล ผ่าน เส้นทางหลัก/ผสม5สูตร/ต่อสู้3แบบ/ส่งออก–นำเข้าเซฟผ่าน ตรวจหลังActionsdeployซ้ำ 42versionedPNG และ JavaScript SHA256 `3e3f9ee32870e266ed809a043217ca8492a9f4826b89af3bfa4708d305e1be70` ตรงBuild, 0Conceptrequests/0ConsoleErrors ในเส้นทางที่ตรวจ ภาพ actualpublic ก่อน/ระหว่าง/หลังอยู่ในevidence/session14

Checklist21/76=27.6%คงเดิม ไม่มีการรับรองfinalHD/อุปกรณ์จริง/Safari/FPSหรือความสนุกจากผู้เล่นจริง ปรับขอบเขตรอบนี้ให้ส่งมอบด้วยBrowser EmulationและPagesได้ครบ โดยคงQA-009เป็นreleasegateที่ยังไม่ยืนยัน


## Session15 — 2026-11-05 UTC — candidate0.7.0 / Manual File Save + Maren listening

Base2126f88บนmainสะอาด; branchfeat/godseed-manual-file-save. Owner V2เปลี่ยนข้อกำหนดเซฟเป็นRAM/file-onlyก่อนเริ่มงานภาพต่อ ถอดbackendsave.ts/storage-session.tsและfake-indexeddbจากdependency ระบบเดิมอยู่ในGit ไม่อ่าน/ลบDBของรุ่นเก่า

ทำจริง: ManualSession RAM; explicit .godseed export/file2พร้อมchecksumครอบmetadata+State2; V1envelope/rawfile migrateในRAM; validateIDs/ขนาด/extension/version/prototypekeys; previewชื่อไฟล์/ตัวละคร/ฉาก/HP/MP/XP/เวลา/เวทก่อนconfirm; dirtyexitสามทาง/nativebeforeunload; safe-boundarydisable; คำแนะนำFiles/Downloadsและให้ผู้เล่นยืนยันเองหลังตรวจไฟล์ ไม่อ้างOSdownloadsuccess

ต่อ VIS-004/VIS-005/STO-003: CH0602เดินอ้อมแปลงไปนั่งม้านั่ง312/197 support243 มาเรนฮัมเพลงจริงด้วยoriginal8frames32×48 (idle/hum) ผมมวยสีเงิน/ผ้าคลุมพีช/กระโปรงพลัม; NPCยืน365/212เพื่อไม่ซ้อนม้านั่ง กลับสวนมีคำตอบจากmaren_listened/song_memory_hint และfile roundtripรักษาความทรงจำ ไม่เพิ่มของ/สูตร/ศัตรู/ฉากใหม่

ผลเบื้องต้น: baseline0.6.2checksผ่าน; currentUnit115/Content2/Roadmap8/type/lint/build/manual-sourcegateผ่าน; Focus15/15ผ่าน1.4m รวมfiveviewports (phoneportrait/landscape,iPadสองแนว,desktop), malformed/oversize/extension/cancel/legacy/dirtyexit/beforeunload/no-progress-storage/no-upload และMaren/listen/fileload ภาพเปิดตรวจจริงแล้ว Full85E2Eผ่านทั้งlocal/PR/main และเผยแพร่0.7.0แล้ว ดูหลักฐานปิดรอบด้านล่าง

ปรับtestsตามownercontractใหม่: เปลี่ยนการอ่านIDBเป็นการดาวน์โหลดไฟล์จริง; refreshต้องเห็นหน้าเริ่มก่อนเลือกไฟล์เอง backenddisk/recoverytestsเดิมถูกแทนด้วยfile/volatile/audit tests ไม่ลบgameplay assertions สูตร234/การต่อสู้/ทิศ/กล้องคงอยู่ แก้expectlegacyEnvelopeเป็นรุ่นเก่าและFileVersion2ตามสเปกใหม่

Roadmapหลัก20/76=26.3% (v120/73=27.4%) จากเดิม21/76 เพราะFND-005ที่เคยDONEตามเกณฑ์autosaveต้องเปิดประเมินใหม่ตามV2 งานSAVE14ข้อเป็นsubtasks ไม่นับเพิ่มในตัวหารหลัก หลักฐานมือถือจริง/Safariยังไม่ยืนยัน จึงSAVE-011/012in_progress/QA-009blocked ไม่ใช่อ้างโค้ดเกมพัง

ขอบเขตจริงยัง18Scene/60Choice/5NPC/3Encounters/234legal/5สูตรจากrouteที่ทดสอบ/0Endings/6Stages ภาพยังต้นแบบ AIไม่จำเป็นต่อการเล่น ความสนุกประเมินภายใน ยังไม่มีhumanplaytest

งานต่อ: 1)Safari/iOS/Androidfiledownload/uploadจริง 2)ปรับภาพสวน/CollisionตามReference05เต็มฉาก 3)ท่าพิเศษNPCที่เหลือ 4)Workshop/VFX 5)Ruins/B03ตามdependencies; checkpointปลายรอบต้องเก็บผลCI/Pagesจริงก่อนจบ


### หลักฐานปิด Session15 — 0.7.0

Source `0676719` / PR#14 / merge `8b610f3`. Local85/85PASS; PR CI42113575343 full85/build SUCCESS; main CI42116389685 full85/build/deploy SUCCESS. Unit115/Content2/Roadmap8/type/lint/build/manual-sourcegate/referencechecksPASS; focused15/15PASS1.4m; ทดสอบปุ่มโหลดพร้อมใช้งาน 1/1 PASS11.4s; 54PNGสร้างซ้ำตรงbyte มาเรนใหม่7,039bytes

เว็บจริง https://ninon0406.github.io/alltest/ ผ่านexplicit.godseed download/nativefilechooser/summary-confirm/exact-state-roundtrip/emptyrefresh/beforeunload/nohiddendownload/no-browserprogressstorage/no-saveupload; รับของ/ผสม5สูตร/3การต่อสู้/โหลดกลางเทิร์น/ความทรงจำครบตามrouteเดิม และCH0602นั่งฟังMaren/bloomจากfileผ่าน ตรวจหลังActionsdeploy43versionedPNG+JSตรงBuild `53e61c12e64e90d82fddaa3efb851c12de7da4cfae171c573a4df174c14cedc2` ไม่มีConceptrequests/ConsoleErrorsในเส้นทางตรวจ

SAVE12/14=85.7%สำหรับงานย่อย (SAVE-011/SAVE-012 อุปกรณ์จริงยัง in_progress) FND-005จึงยังin_progress Checklistหลัก20/76=26.3%, scope1.020/73=27.4% ไม่เพิ่มSAVE14เข้าdenominatorซ้ำ ไม่มีhardwareSafari/FPS/humanfunacceptance ภาพยังprototype ไม่อ้าง1.0หรือRef05ครบฉาก


## รอบ 16 — 2026-11-06 UTC — สวนสมุนไพรและเส้นทางตามฉาก (0.7.1)

Base `ea50dfa` / branch `feat/godseed-herb-garden-scene` สะอาดก่อนเริ่ม ตรวจคำสั่ง V2, Roadmap, Log รอบ 15 และระบบจริงแล้ว Baseline 0.7.0 checks ผ่าน เลือก VIS-008 / VIS-009 / VIS-010 ต่อจากงานรอบก่อน เพราะ SAVE-011/012 ต้องใช้อุปกรณ์จริงที่ยังไม่มี ไม่เขียนระบบเซฟที่ผ่านแล้วซ้ำ

สร้างต้นฉบับใหม่ 6 PNG ใน art-v9: สวนสามเลเยอร์ บ้านสมุนไพรหลังคาม่วง หน้าต่างขวดยา ถนนหิน ซุ้มเถาวัลย์ที่แยกความลึก หม้อยา 6 เฟรม และสมุนไพรแขวน 4 เฟรม รวม 71,335 bytes เปิด Contact Sheet 10 แห่งและ Reference 05 จริง ใช้เป็นแนวทางวัสดุ/สี ไม่อ่านหรือคัดลอกพิกเซลจากภาพอ้างอิง Generator และ Director ใช้ถนน/Anchor จาก garden-map.ts ชุดเดียวกัน มี Collision 9 ส่วน ตรวจพื้นที่เท้า 10×4 ทุกช่วงทาง

รักษา CH0601 รดน้ำ/ดอกบาน/เก็บของ, CH0602 นั่งฟัง และ CH0603 เก็บน้ำค้าง พร้อมเชื่อม CH03B1 ให้เดินไปนั่งฟังอดีตบนม้านั่งจริง คง cue เชิงกฎเป็น talk เพื่อไม่เพิ่ม HP/MP/เวลาโดยไม่ตั้งใจ บันทึกได้เฉพาะไฟล์ตามเดิม State2/File2 ไม่เปลี่ยน ผลเกมยัง 18 Scene / 60 Choice / 5 NPC / 3 Encounter / 234 สูตร / 0 ตอนจบ / 6 Stage

ผลตรวจปัจจุบัน: Unit 121 / Content 2 / Roadmap 8 / TypeScript / Lint / Build / manual-save source gate / reference packing ผ่าน; Focused Browser 20/20 ผ่านบน 390×844, 844×390, 820×1180, 1024×768, 1366×768 รวม PNG fallback, Reduced Motion, เดินเก็บน้ำค้าง/ความลึก, รดน้ำ/นั่ง/ความทรงจำ/โหลดไฟล์ ชุดเต็ม 93 กรณีผ่านทั้ง local/PR/main และเผยแพร่ 0.7.1 แล้ว ดูหลักฐานปิดรอบ

ภาพสวน/เก็บน้ำค้างบน phone และ iPad เปิดตรวจจาก browser แล้ว เก็บภาพก่อน 0.7.0 และภาพหลังใน docs/evidence/session16 งานภาพยังเป็นต้นแบบ ไม่ใช่ final HD หรือ Reference 05 ครบฉาก มือถือจริง/Safari/FPS/ความสนุกจากผู้เล่นจริงยังไม่ยืนยัน Checklist ใหญ่คง 20/76 = 26.3% (1.0: 20/73 = 27.4%) ไม่เพิ่มงานซ้ำเพื่อเพิ่มเปอร์เซ็นต์

ปัญหาระหว่างพัฒนา: Test ใหม่คาดค่า phase ว่า interact แต่ระบบใช้ interaction จึงแก้ให้ตรง contract แล้วรันซ้ำผ่าน; พบว่าการเปลี่ยน cue ของบทสนทนาเป็น rest จะเพิ่มโบนัสพักโดยอัตโนมัติ จึงรักษา talk และแยกท่านั่งใน Director พร้อม Unit ตรวจ HP/MP/เวลา/รางวัลเดิม ไม่มีการปิด assertion หรือข้ามกรณีที่ไม่ผ่าน

งานถัดไป: (1) ปรับสวนและต้นไม้ตามภาพอ้างอิงให้ผ่านคุณภาพทั้งฉาก (2) ท่าพิเศษ NPC อื่น (3) ห้องผสมเวท/VFX (4) โบราณสถาน/B03 ตาม dependency (5) ทดสอบ Files/Downloads และ file picker บนมือถือจริงเมื่อมีอุปกรณ์ ไม่หยุดงานภาพเพื่อรอหรือเขียนระบบเซฟซ้ำ


## ยืนยันปิดรอบ 16 — 0.7.1 / 2026-11-06 UTC

Source `5847801` / PR #15 / main merge `8950542`. Local Browser 93/93 ผ่าน (17.9 นาที), PR CI42192866046 และ main CI42195039742 ตรวจชุดเต็มและ Build ผ่าน; main Deploy สำเร็จ Unit121 / Content2 / Roadmap8 / TypeScript / Lint / Build / Source gate / Reference packing ผ่าน Focus20/20 ผ่าน; 60 PNG สร้างซ้ำตรง byte, 54 เดิมไม่เปลี่ยน, 6 ใหม่รวม 71,335 bytes

ตรวจเว็บจริง https://ninon0406.github.io/alltest/ ผ่านสวนใหม่ หม้อยา/สมุนไพรเคลื่อนไหว เป้าหมายเก็บน้ำค้าง/ซุ้มบังตามความลึก รดน้ำ/ดอกบาน นั่งฟัง ความทรงจำ และ native file picker/โหลดครบ State/รีเฟรชหน้าเริ่ม ตรวจพบ browser storage และการส่งข้อมูลที่เปลี่ยนสถานะออกนอกเครื่อง 0 ครั้ง เส้นทางเดิมผสม5สูตร/ต่อสู้3แบบ/ความทรงจำ/ไฟล์ผ่าน ตรวจหลัง Actions Deploy: 49 versionedPNG และ JS SHA256 `b77768c89479cb77ecdb50f41b9dbf5c5e589e351a01105560c33f6dff4b359e` ตรง Build, 0 Reference requests / Console errors ในเส้นทางที่ตรวจ

คง Checklist หลัก20/76=26.3% (1.0:20/73=27.4%) งานภาพใหญ่ยังไม่ครบ ไม่ปิดงานจากภาพอ้างอิงอย่างเดียว สถานที่ garden ยังเป็นต้นแบบ งานเซฟหลักทำได้แล้ว12/14 เหลือ SAVE-011/012 ที่ต้องทดสอบอุปกรณ์จริง จัด FND-005 และสองงานย่อยเป็น blocked เพื่อให้คิวไม่ย้อนเขียนระบบที่ผ่านแล้วซ้ำ: จำนวนรวม ✅20 🟡38 ⬜16 🔴0 ⛔2 เปอร์เซ็นต์ไม่เปลี่ยน QA-009 ยังคง blocked เช่นเดิม ไม่มีการรับรอง Safari/iOS/Android จริง, FPS หรือความสนุกจากผู้เล่นจริง

[รายงานภาษาไทยและภาพก่อน/หลัง](evidence/session16/REPORT_TH.md) / [หลักฐาน JSON](evidence/session16/verification.json) เกม source ไม่เปลี่ยนหลัง commit ที่ผ่าน CI; Commit ปิดรอบเพิ่มเฉพาะเอกสาร/หลักฐาน ตัวตรวจเว็บ และ Fixture ของ Roadmap Test


### ตรวจคิวงานหลังจัดสถานะอุปกรณ์จริง

การเปลี่ยน FND-005 เป็น blocked เปิดเผยว่า Test คิวงานเดิมอาศัยสถานะสดและคาดให้ FND-005 อยู่ลำดับแรกตลอด แก้เฉพาะ Fixture ใน scripts/roadmap.test.mjs ให้กำหนด in_progress ชัดเจน แล้วตรวจทั้ง done และ blocked ว่าถูกตัดจากคิว และยังตรวจว่า regression ขึ้นก่อน ไม่มีการลบหรือผ่อน Assertion ผลสุดท้าย Roadmap 8/8 ผ่าน ดู evidence/session16/roadmap-final.txt การแก้ปิดรอบนี้กระทบเอกสาร/ข้อมูลคิว/ตัวตรวจ QA ไม่เปลี่ยนเกมหรือ Asset หลัง Source5847801 ที่ผ่าน CI


## Session17 — 2026-11-06 — recoverable stage loading before further expansion

Choose FND-004 first: all57PNG loaded at title, no explicit recovery, and a global timeout was overridden by Phaser per-file defaults. Keep the existing renderer/fallbacks and add a small static catalog + ledger; no new state machine or persistent asset manifest. Supply a real per-file8000ms timeout and maxRetries0. Prepare assets before state commit/import replacement, keep previous RAM checkpoint while loading, and allow explicit retry without a state mutation. Cold title now23PNG/301231bytes vs57/629017; this measures PNG transfer budget, not FPS or total JS cost. Cached revisits issue no new PNG requests.

Second related delivery: original Koro + grounded anvil and recipe pose required by Master Spec. Keep workshop art provisional, hide prop in combat, and do not change lesson rewards, spell rules, enemy AI or saves. No story scope expansion simply to raise completion. FND-004 is done on targeted fault/budget/import verification; broad VIS-004/005/008 and quality gates remain in_progress. Hardware-only Save11/12 and QA009 remain blocked.

Finalaudit: distinguish transfer success from decoded texture success. Phaser does not emitloaderror on decodefailure, so reconcile attempted vs successful keys at batch completion; preserve existing fallback and explicit retry. FND004 temporarilyproblem, restored after initial/lazycorruption tests pass. No downloaded save or asset content is executed.

Session17 final gates: local/PR/main full105 andactualpublic0.7.2/51PNG/JS PASS. KeepFND004done andbroaderartin_progress; no score for merely havingreferencesornewPNG. Preserve original234recipes/18scenes/60choices/3encounters/0endings andmanualfileState2/File2. Receiptcommitchangesmetadataonly; no repeatfullsuitewithouta runtimechange.


## Session18 — 2026-11-06 — workshop before further world expansion

ChooseVIS008/007/005/010 andMAG007related work: existing workshop had a generic lane, side-facing craft pose and VFX aimed at the NPC. Add a fixed authored map and actual workbench without touching the crafting/combat reducers or save schema. Keep a clean training layout and coherent layer fallback. Rendering uses the real recipe's3parts and procedural effect; no hundreds of videos.

Inspection found skip cancels in mid-lane: retain a validated endpoint until explicit skip/motion cancellation, then complete it. Head rows initially assumed incorrectly; now reference directionalIdle and protect the head pixels in tests. First new reward assertion mishandled absent trust: fix undefined-as-zero, keeping exact reward checks. Preserve failure evidence and rerun. No score increase from partial art: overall21/76unchanged; prototype subgates tracked under the existing workshop location.


Session18 release receipt: after local/PR/main113PASS and actualpublic0.8.0 verification, freeze runtime atff5e67d (mergef465839). Record remaining provisional art, training legacy room, hardware/FPS/fun gates and unchanged27.6% checklist. Do not mark whole VIS008/MAG007 complete from a workshop subgate. Closing documentation/evidence commit uses [skip ci] because no runtime or build inputs change; post-Actions hashes and scoped roadmap validation provide the receipt.


## Session19 — 2026-11-06 UTC — canonical listening routes before later bosses

Continue from1b9d598; choose VIS008/STO001/CMB006. Deliver S15–17/CH0207/B03 as one playable content/art group. B04 needs its S21/festival route and remains pending; do not expose a fake boss/festival option. Count21scenes70choices4encounters7stages,234unchanged,0chapterendings. No whole milestone is DONE from this partial batch.

Q_ARCHIVE_NOTES has one shared reward flag for both canonical completion choices. Reward eligibility is checked before effects, and route flags restore the last branch independent of first-visit-only choice history. Reuse File2/State2 rather than destructive migrations; new gameVersion guards downgrade. Only explicit manual files are read/written.

B03 uses canonical66HP/10power/EARTH20%. On every third enemy action, announce then apply a two-player-action ward and make no attack; do not change an announced intent after player damage. PIERCE mitigates the half reduction.32seeds×2starterpolicies win4–7turns; this measures reachability rather than human enjoyment. Reuse existing reusable WARD spell engine instead of adding fake recipes.

Dedicated prop metadata and lazy NPC/water dependencies extend existing asset contracts. Original art remains provisional. Test failures were retained and fixed: map clearance, missing MP in fixture, legacy-only prop validation, wrong button label, observation timing, remembered-vs-open probe, and the real FLEE/pillar intersection. Stop the superseded full suite and rerun final source; never claim its partial passes as complete.


Session19 CI setup audit: PR18/run42239707225 passed Unit151/Build but spent11min3s fetching17.3MB optional font packages from the Ubuntu resolute mirror. Maintainer cancellation coincided with completed browser downloads; no E2E ran, so this run is CANCELLED, never PASS. Pin ubuntu-24.04, install the Thai Loma font explicitly, and download Playwright's supported --only-shell Chromium. All123 browser cases remain required; native-library errors still fail the run. No runtime/test/build-input changes. New PR CI must pass before merging. Logs summarized in evidence/session19/ci-installer-cancelled.json.
