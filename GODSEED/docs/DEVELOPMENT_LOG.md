# GODSEED Development Log

Append-only ประวัติการส่งมอบ งานออกแบบในSSOTแยกจากงานที่สร้างจริง สถานะปัจจุบันดู [Master Roadmap](../../GODSEED_MASTER_ROADMAP.md) และ [PROGRESS](PROGRESS.md). Session0–6 ด้านล่างสรุปย้อนหลังจากGit/TEST_REPORT ไม่ใช่การรันทดสอบใหม่ในรอบ7; หลักฐานrelease/ข้อจำกัดดั้งเดิมยังอยู่ใน [TEST_REPORT](TEST_REPORT.md). วันที่เป็นUTC.

## Session0 — 2026-11-04 — ติดตั้งข้อกำหนด

- เป้าหมาย: ติดตั้งเอกสารและ10Skillsก่อนสร้างเกม
- ทำจริง: 01/02/03, AGENTSและ.agents/skills; commit220e992 (21:12:37UTC)
- ยังไม่เสร็จ: ยังไม่มีเกมจากการติดตั้งเอกสารอย่างเดียว
- ปัญหา/วิธีแก้: ครั้งแรกยังไม่push; เก็บcommitในancestryและรวมส่งไปกับPR#1ภายหลัง
- ตรวจสอบ: ประวัติcommit/ไฟล์ต้นฉบับ; ไม่อ้างว่ามีgameplay testsในขั้นติดตั้ง
- งานต่อ: playable sliceตามMaster Spec

## Session1 — 2026-11-04 — 0.1 playable forest slice

- เป้าหมาย: Start→choices→materials→craft→forest battle→return→saveบนPages
- ทำจริง: Phaser4/TS/Vite,13scenes39choices,234recipegenerator,IndexedDB,originalprototypeart,CI/Pages; นำREBORNออกตามคำสั่งเจ้าของในเวลานั้น
- ยังไม่เสร็จ: chapter/endings/finalart; recovery UX/backup reliability
- ปัญหา/วิธีแก้: landscape canvasกั้นปุ่ม; containment/stacking fixและviewportregression
- ผล: content2/unit14/build/browser9 PASS; mainCI41917827558/publicgameplay/hashผ่าน
- Commit/PR: 74b37c4/PR#1 mergeba3d3ea
- งานต่อ: save recoveryก่อนขยายเกม

## Session2 — 2026-11-04 — 0.1.1 save reliability

- เป้าหมาย: ไม่ทำbackupดีเสียตามprimaryและเล่นต่อเมื่อstorageถูกปฏิเสธ
- ทำจริง: atomicvalidatedbackup,checksumexport/import,memorymode/retry,archivedruns,namelock
- ยังไม่เสร็จ: futuremigrations/realhardware/fullchapter
- ปัญหา/วิธีแก้: corruptionpropagationและretryซ่อนoldrun; failingregressions→atomicwrite/archivedifferent-runในtransaction
- ผล: unit28/content2/browser19/build PASS; main41923735832/publicchecksum+importผ่าน
- Commit/PR: 8a2b08d/927fb3e/PR#2 merge2c4ba8d
- งานต่อ: turnstatuses/trainingและV1preservation

## Session3 — 2026-11-04 — 0.2.0 combat/training

- เป้าหมาย: ต่อสู้ใช้HEAL/FIRE/status/intentได้จริงและreloadเทิร์นได้
- ทำจริง: BT_TRAINING,finitewards/statuses,guard/basic/items,firegift,State2migrationเก็บrawV1
- ยังไม่เสร็จ: party/multitarget/mastery/boss/endings/finalVFX
- ปัญหา/วิธีแก้: supportเอฟเฟกต์ไปผิดฝ่ายและเงาไม่ตามตัว; recipientanchors/movingshadows/cancellation
- ผล: unit59/content2/browser23/build PASS; balance600wins; main41929504279/publicผ่าน
- Commit/PR: bd6f705/PR#3 merge2eec3a1
- งานต่อ: layeredstages/originalactorcycles

## Session4 — 2026-11-05 — 0.3.0 layered presentation

- เป้าหมาย: ลดภาพแปะ เพิ่มdepth/environment/actualactioncycles
- ทำจริง: 4stages×3layers,props/ambient/memorydecorations,hero56frames/11cycles,originaltraining13frames
- ยังไม่เสร็จ: uniqueNPCทุกตัว/HDlighting/VFXquality/physicalperformance
- ปัญหา/วิธีแก้: landscape preferred-widthซ่อนfoe; จำกัดworldcolumnและgeometrytests; skip/toggleใช้generationtoken/settleonce
- ผล: unit63/content2/browser31PR/build PASS; PNGreproducibility27files; main41951619885/public16newPNGsผ่าน
- Commit/PR: PR#4 merge255e79f
- งานต่อ: archive/streamcanonพร้อมภาพและworldmemory

## Session5 — 2026-11-05 — 0.4.0 archive/stream

- เป้าหมาย: Eira/research/stream/bypass/WATER/ECHO/B02
- ทำจริง: เพิ่ม4scenes15choices→17/56,2layeredstages+Eira/wisp/water6frames,cluejournalและNPCfactreactions
- ยังไม่เสร็จ: ruins/festival/B03–05/สามตอนจบ/queststateเต็ม
- ปัญหา/วิธีแก้: WATER-firstเข้าป่าไม่ได้; ใช้forest_open OR crafted_firstตามcanonและregression; mistclearไม่เท่ากับช่วยbellแยกfact
- ผล: unit81/content2/browser37PR/build PASS; balance900wins; main41961020262/public28PNGs/checksumผ่าน
- Commit/PR: d65aadd/PR#5 mergef35b2ad
- งานต่อ: ปรับcraft/loadoutก่อนขยายสถานที่

## Session6 — 2026-11-05 — 0.4.1 alchemy UX

- เป้าหมาย: preview/invalidfeedback/filter/unequipโดยไม่ทำเซฟเสีย
- ทำจริง: ซ่อนชื่อunknown แสดงของขาด ปิดinvalid/knownสูตร; ANDfilters; ถอดแล้วcompact/คงknownรวม0slots
- ยังไม่เสร็จ: origins/icons/reveal/recipeaccessทั่วบท
- ปัญหา/วิธีแก้: คงfilterและหน้าสมุดหลังจัดช่อง ล็อกselectระหว่างtransaction ไม่เรียกวัตถุดิบซ้ำสำหรับknown
- ผล: unit87/content2/browser41PR+main/build PASS; finaltouch4/4; main41992926513/publichash9c99776…ผ่าน
- Commit/PR: bb15214/196ed16/PR#6 mergef57ab5c; evidencef0eb125
- งานต่อ: Cinematic paths/artและruinsslice

## Session7 — 2026-11-05 — 0.4.2 roadmap + cinematic paths

- เป้าหมาย: GS-041/FND-009 ระบบติดตาม8Phasesจากหลักฐาน และGS-010/VIS-006 การเดินถึงวัตถุก่อนทำท่า
- ทำจริง: roadmap.jsonเป็นสถานะชุดเดียว; generatorสร้างMaster Roadmap/Task Boardและเปอร์เซ็นต์; validator/negative testsต่อเข้าtest:all/CI; appendคำสั่ง03/AGENTSโดยเก็บคำสั่งเดิม
- ทำเกมจริง: cinematic-paths.tsมี8choice routes+6travel lanes แยกapproach/interaction,หันซ้าย/ขวา,contactshadowตามเท้า; ม้านั่งมีsupportdepthเฉพาะท่านั่งและไม่แสดงเงาพื้นผิดระดับ; skip/reducedใช้generationtokenเดิม เซฟState2/DB1/envelope1เดิม
- ยังไม่เสร็จ: four-directionfront/backatlas,ทุกNPCsilhouette,กล้องpanตามspec,ruins/festival/B03–05/endings,finalHD/physicalSafari/เสียง/mastery ไม่ทำเครื่องหมายเสร็จจากแผน
- ปัญหาที่พบ: ภาพถ่ายครั้งแรกท่านั่งถูกม้านั่งบัง เพราะใช้footdepthของตัวนั่งต่ำกว่าฐานprop
- วิธีแก้: ยกanchorขึ้นระดับseatและใช้supportdepth239เฉพาะช่วงrest; ยกเลิก/กลับฉากคืนdepth/shadowเดิม ยังต้องreviewภาพหลังแก้ก่อนรับรองงาน
- ผลbaseline: npmci/strict/lint/content2/unit87/build PASS ไม่มีdependencyใหม่
- ผลก่อนseatfix: unit90/content2/build/focused12 PASS; ภาพจริงพบocclusionแม้assertผ่าน จึงแก้ภาพแทนการอ้างผ่านvisualgate
- ผลหลังseatfix/เต็มชุด/CI/public: ดูTEST_REPORT Session7 ซึ่งจะบันทึกเมื่อรันเสร็จ ไม่ถือค่ารอผลเป็นPASS
- ไฟล์/commit: basef0eb125, branchfeat/godseed-roadmap-cinematics; source/tests/docsรอบ7; commit/PRและผลdeployอ้างในTEST_REPORTเมื่อสร้างจริง
- งานต่อ5รายการ: VIS-003(สี่ทิศ), VIS-004(NPC), VIS-011(กล้อง), VIS-008(ฉากruins/festival), CMB-006(B03/B04พร้อมภาพตามdependency→story/boss/endings)

### Session7 follow-up regression gate

- Full local suiteพบWINDskipcase timeout: testรอfull-page screenshotก่อนกดskipจนcastจบ; presentationrefactorยังทำให้holdcast/craftสั้นจากเดิมโดยไม่ตั้งใจ
- เปลี่ยนVIS-006จากDONEเป็นproblemในdatasetระหว่างแก้ (Checklist16/74=21.6%); ไม่ลบหรือskipเทสต์เพื่อให้เขียว
- คืนcast/crafthold1120/1600msเท่าช่วงรวมเดิม และให้testอ่านactualtarget→skipทันที→ถ่ายภาพหลังsettled แทนพึ่งความเร็วscreenshot
- ผลrerun/สถานะหลังแก้ต้องอ้างTEST_REPORT; ภาพexplore-wind-targetเป็นภาพหลังsettled ไม่อ้างว่าเป็นmid-cast VFX golden

### Session7 acceptance after correction

- Final full45/45 PASS8.4m, WINDskip11.6sPASS, zero skipped; roadmap5/gameunit90/content2/strict/lint/buildPASS. PR CI41997711472SUCCESS on95c3637; older41996970778cancelled by supersedingpush, not a pass.
- RestoreVIS-006 toDONE after actual acceptance; finalChecklist17/74=23.0%, v1 17/71=23.9%, problems0/blocked1(Safarihardware). Percentages remain task-count metrics only.
- PR#7 merged7279cea; main/publicrelease proof linked fromTEST_REPORT when completed. Original03preserved and oldsave/art/content untouched.


### Session7 final release — 2026-11-05 UTC

- Main41998656125SUCCESS, deploy09:06:55UTC; main:/ Pages41998655321SUCCESS. เว็บจริง https://ninon0406.github.io/alltest/ gameplay/save/checksum/importPASS และpost-ActionsHTML/JS/28PNG/rendererPASS พร้อมemptyerrors
- JS2372e79842a5d35ab3534c7eaf9d074a98f3bac91fa1ecc4f348e739c485d301ตรงfinalbuild; game90/roadmap5/content2/browser45/productionผ่าน รายละเอียด/linksในTEST_REPORT
- Source7c9ce03+95c3637, PR#7/merge7279cea; finaldocs/status-onlycommitไม่เปลี่ยนbundle ทุกรอบถัดไปเริ่มจากRoadmap/Logนี้ ไม่มีงานเบื้องหลังต่อหลังจบsession
- ปัญหาจังหวะskipและbenchocclusionปิดหลังทดสอบจริง; ปัญหาเปิด0 ข้อจำกัด1QA-009/Safarihardware ยังไม่ใช่เกม1.0/ภาพfinalHD ไม่มีการเริ่มโปรเจกต์ใหม่/ลบระบบหรือเซฟเดิม
- งานถัดไป: VIS-003→VIS-004→VIS-011 และVIS-008→CMB-006ตามdependency/คำสั่งให้เน้นภาพ+Cinematic; ต่อไปเชื่อมSTO-001/บอส/สามบทสรุป

## Session8 —2026-11-05 UTC —0.5.0 four-view player

- เป้าหมาย: VIS-003/GS-007/033 ต่อภาพผู้เล่นและVIS-006/GS-010integration; FND-009ใช้Roadmapเดิมต่อและปรับqueueให้ไม่เลือกงานDONEซ้ำ
- ทำจริง: art-v4/hero-walk.pngต้นฉบับ24frames/fourviews+generator/manifest/purefacing/speed; Directorเลือกท่าตามwaypoint ไม่ใช่free-roam; รักษาoldactioncycles/skip/reduced/save และfallbackเมื่อPNGใหม่ขาด
- ทำtrackerจริง: sixmetadata/count/queuechecksต่อCI ตัวเลขจาก74tasksเดิม ไม่เขียนเปอร์เซ็นต์มือ ไม่append03คำสั่งเดิมซ้ำ
- ปัญหาที่พบ: queueเก่าแสดงVIS-003ซ้ำได้แม้DONE; แก้กรองสถานะและpromoteactualregressionsพร้อมnegativefixture test. แหล่งภาพเดิมยังเก็บไว้ทุกไฟล์
- ยังไม่เสร็จ: NPCsilhouettes/สี่ทิศของnonwalkingposes/camera/ruins+festival/B03–05/endings/audio/mastery/physicalSafari/finalHD
- ผลก่อนfull: baseline npmci/90unit/content2/buildPASS; gameunit94/roadmap6/type/lint/content2/buildPASS; focused17PASS2.4m รวมfourtouchsizes/fallback/skip/reduced/bench/defeat/reload
- ภาพ: regenerate40PNGผ่าน old39SHAเท่าbase; new24framePNG19,427bytes; atlasและruntimephone-north/desktop-eastดูแล้ว เงา/เท้าตามตัว ยังเป็นoriginalproceduralprototype
- สถานะ: VIS-003DONEหลังหลักฐานเฉพาะงาน; finalchecklist18/74=24.3%, v1 18/71=25.4%, problem0/blocked1QA-009 (ไม่ใช่hardwareacceptance)
- Sourcebasebda8f51, branchfeat/godseed-directional-hero; source/tests/docsนี้ ผลfull50/CI/public/commitsบันทึกต่อในTEST_REPORTเมื่อรันเสร็จ
- งานถัดไป5รายการ: VIS-004 NPC → VIS-011 camera → VIS-008 ruins/festivalart → CMB-006 B03/B04ตามdependency → STO-001canonส่วนที่ขาด ก่อนboss/endings

### Session8 verification regression

- PRCI42002997166 full50SUCCESS แต่ localfull49PASS/1FAIL10.0m: Pages keyboardtestส่งEnterก่อนrenderer/storageเปิดปุ่มstart (focusไม่รอenabled) จึงยังอยู่หน้าtitle
- เกมยังล็อกปุ่มจนพร้อมตามการออกแบบ ไม่แก้ให้ปุ่มรับคำสั่งก่อนโหลดเสร็จ; แก้harnessรอrender-readyและstartenabledก่อนใช้keyboardจริง เพิ่มdelayPNG500msเพื่อครอบคลุมboundaryนี้ ไม่injectstate/ไม่skipcase
- QA-006เปลี่ยนDONE→problemระหว่างตรวจซ้ำ; nodequeuefixtureแยกcurrentprojectregressionsออกก่อนตั้งสถานะตัวอย่าง เพื่อไม่ให้metadataที่มีproblemอย่างถูกต้องทำให้unitfixtureคาดอันดับผิด
- ผลfocusedrepeat/remoteheadใหม่และการคืนสถานะหลังผ่านจะเพิ่มในTEST_REPORT; ไม่ใช้greenCIเก่ากลบlocalfailure

### Session8 acceptance after readiness correction

- FinalPRCI42004666730 full50SUCCESS oncd24b9c after localkeyboard3/3PASS21.9s; initiallocal49/1 retainedasfailurehistory, not relabeledfullPASS. Gameunit94/roadmap6/content2/type/lint/buildPASS. Preliminary42002997166SUCCESS50 is not the finalheadgate
- Productionpreview fullold/newflow/checksum/import/29versionedart/JSgatePASS, hash41dd67354a5c542ef792c877e83a1282e6ab32250175313354f7b06296c24579; previewserverstopped
- QA-006problem→DONE after actualacceptance. FinalChecklist18/74=24.3%, v1 18/71=25.4%, ✅18 🟡39 ⬜16 🔴0 ⛔1; nextqueueagaincontainsunfinishedwork only
- PR#8 merged3b62a2f; main:/ Pages42005830950SUCCESS; mainActions/publicproof inTEST_REPORT when complete. Source/frames allpreserved; finalevidence-onlydocs will not changeclientbundle


### Session8 final release —2026-11-05 UTC

- Main42005831839SUCCESS, deploy10:00:21UTC; main:/ Pages42005830950SUCCESS. Actualpublic https://ninon0406.github.io/alltest/ fullretainedloops/save/checksum/import/29PNG/JSproofPASS and post-Actionsassets/rendererPASS, emptyobservederrors
- SameJS41dd67354a5c542ef792c877e83a1282e6ab32250175313354f7b06296c24579; originalnewPNG989721… matches source. FinalPR/mainfull50PASS, gameunit94/content2/roadmap6/type/lint/buildPASS. Localsubset17+keyboard3pass; initiallocal49/1 preserved with rootcause/fix, not rewrittenasfullPASS
- Source11a6ec1+cd24b9c/PR#8/merge3b62a2f; finalevidence-onlydocs/status update does not changeclientbytes. FinalChecklist18/74=24.3%, v1 18/71=25.4%, problem0/blocked1QA-009. Percentagesnotgamequality/laborestimates
- Nextfive: VIS-004 NPCcycles → VIS-011camera → VIS-008ruins/festivalart → CMB-006B03/B04 → STO-001canon/completion accordingdependencies. Nonwalkingfourviews/mastery/audio/fullchapter/3endings/physicalSafari/FPS/finalHDremainunfinished. Noowneractionneeded; no workcontinuesinbackground aftersession

## Session9 —2026-11-05 UTC —Camera Director prototype

- Base09906d4; branchfeat/godseed-camera-director. Reuse03/74-task roadmap and currentSkills, no duplicate tracker. GoalVIS-011/VIS-006 boundedcamera focus while retaining saves/art
- Implement camera-plan.ts, ±12px focus/450ms easing, fixed1.08overscan in fullmotion to keep artwork edges covered; reduced restores1:1 framing. Skip/show/shutdown cancel camera tweens through existing generation/settlers. Return center before completing action; inventory/loadout operations do not trigger focus
- New purecamera2tests+focused4touchcases, bounds/reduced-cancellation/reload and actualphone screenshot reviewed. No PNG/scene/recipe/schema changes. Full acceptance stillpending; VIS-011 staysIN_PROGRESS, percentagesunchanged24.3%(18/74)/v125.4%
- Setupissue: an earlycheck overlapped npmci and could notfindtsc; install completed then checks rerun sequentially. An initialfocusedrun cancelled while refining focus limits, not countedPASS. FourfocuscasesPASS12.3s on refinedpan; finalmenu-scopeguard then receivesfullsuite/CI
- Remaining: allscene/battle/camera visualacceptance, NPCs/ruins/festival/boss/endings/audio/hardwareSafari. NextVIS-004/VIS-011/VIS-008/CMB-006/STO-001. Actualfinalresults/commit/PR inTEST_REPORT

Session9 final localgate:54/54PASS10.6m, zero skipped; gameunit96/content2/roadmap6/type/lint/buildPASS. Source77b62e9 andPR#9. Candidate remainsunmerged because VIS-011 all-scene/battleframingreview is outstanding; public0.5.0 retained. Next finishframingacceptance plusNPC/ruins/festival/battles/canon perboard, no additionalDONEcredit fromprototypecore.

Session9 sourceCI42011348567SUCCESS full54 on77b62e9; final evidence-onlydoccommit follows, roadmap6rechecked. KeepPR#9open andVIS-011IN_PROGRESS pendingall-scene/battleframingreview. No permissionblock claimed; this is an unfinishedqualitygate. Public0.5.0 remainsverifiedfromSession8. NextcycleinspectthisPRfirst, finishframingreview beforedeploy; originalsystems/saves/assetsretained.

## Session10 —2026-11-05 UTC —camera target semantics/gallery

Baseebe49f5; continueopenPR#9 onfeat/godseed-camera-director, reuse03/Roadmap/Skills, no newtracker. Fixed a concrete camera flaw: offensivecasts framed the caster. PurecameraFocus now prioritizespath/scenery, framesoffense atfoe, support/crafting atplayer. Added tests for targetsemantics and genuine six-stage gallery on390/820/1024/1366, includingactualtrainingcast rightpan andbounds. Originalsave/content/assets retained.

npmci/test:allPASS: gameunit97/content2/roadmap6/type/lint/build. Newgallery4/4PASS1.0m, actualarchivephone screenshotreviewed. PreviousSession9 full54/CI54 pertains to77b62e9, not this new tree; finalCI now discovers58 cases and is not yetconfirmed. No claimfull58PASS or deployment. VIS-011 remainsIN_PROGRESS (allbattle/VFXframing pending); checklist18/74=24.3%, v118/71=25.4%, problem0/blocked1hardwareSafari. Next: finishPR9battleframing→NPCart→ruins/festival→B03/B04→canon/endings. Public0.5.0 unchanged.

## Session11 —2026-11-05 UTC —finish PR9 acceptance

Basee76c3e4, cleanbranch; PR9sourceCI42015617056 full58SUCCESS verified before work. Reuse03/74-taskRoadmap andskills. Extendgenuinegallery through B01forest andB02stream offensivecasts, actualBLOOMheal/supportpan, returncenter/wins andprevioussixstages/training onfourviewports. npmci/test:allPASS97gameunit/content2/roadmap6/type/lint/build; extendedgallery4PASS2.1m, actualforestphone/streamdesktopframingreviewed. No newruntimecode/art/story/schema; tests use actualmaterials/craft/battles, no injectedstate.

VIS-011DONE for currentlyauthored6stages/3encounters after acceptance; this is not finalHD/all234VFX/futureboss/hardwarecertification. Same74tasks→19DONE/38inprogress/16notstarted/0problem/1blocked=25.7%, v119/71=26.8%. PR9 merged e470fe8; addedtests94d1f36 preserved onbranch thencherry-pickedas570091b onmain; no reset/force/delete. FinalmainCI/publicproof followsinTEST_REPORT. NextNPC→ruins/festival→B03/B04→canon/boss/endings, deviceQAremainsblocked.

Session11 delivery: main42020164244SUCCESS/full58 anddeploy11:48:41UTC; publicfullflow +post-Actionsassets/rendererPASS samea09bffd7…/29PNGs. Sourcecamera acceptedforcurrentcontent, noadditional1.0/finalart/hardwareclaim. Evidencecommit concludescamera batch before newowner locationreference expansion.


## Session12 — 2026-11-05 — 0.6.0 references / living village and tree

- เป้าหมาย: latestowner10-referencevisualmission; ให้สองสถานที่ต้นแบบเดิน/นั่ง/โต้ตอบตรงบท พร้อมติดตามครบ10แห่ง
- ทำจริง: import13files/SHA, original10PNG, fourdirectionidle, footanchors/solids/Dijkstrafixedroads, CH0004rest/leafmemory/posepersist, CH0201fountainapproach, no-reset same-mapshow, matrix10×9ในSSOT, productionreferenceexclusion
- ปัญหาพบ: legacyidleหันขวา/resetตำแหน่งทุกshow; groundทับผนังบ้านในruntime; oldstage-siteคัดลอกdevelopmentreferencesเข้าartifactได้
- วิธีแก้: directionalidle/preserve+stableloadanchors/restflags, authoredalpha masks+pixelregression, retainhashedclientsเฉพาะJS/CSS; ไม่มีสูตร/คำนวณcombat/schemaเปลี่ยน
- ผลทดสอบ: baselinefocused4PASS56.6s; final104unit/content2/roadmap7/type/lint/build/PACKAGINGPASS; full62กำลังตรวจ ยังไม่อ้างCI/public0.6.0
- ยังไม่เสร็จ:8referenceconversions, finalHD/individualNPC/special4viewposes/house-gatewalk/crystal/workshop/battleglade/VFX234/lowpreset/lazyload/Safarihardware และremainingchapter/boss/endings
- ไฟล์/commit: base d4da87a; feat/godseed-village-references; source/evidenceในTEST_REPORT; commit/PR/deployบันทึกเมื่อมีผลจริง
- ต่อไป: completegate/publish → gate+cottage routes → crystal/workshopinteractions → battle glade+VFX → NPC/storyruinsdependencies

Session12 follow-up: source checkpoint c9d9bab / draft PR#10. Added revisitable S02_TREE for existing hub saves (18scenes/60choices), no extra trust/material gifts. First local full run interrupted after directional helper5s timeout on the longer real road from retained bench; fixes remove zero-length beats and allow bounded12s wait. Initial104unit is superseded by105 after revisit regression. Final focused10 and full63 required before VIS-014 acceptance/merge.

Finalvisualfollow-up: inspected realframes aftermaskfix. Depth-only proof was insufficient; shiftedtreepath tofoot186 sohead/boughactuallyoverlap, capturedruntime andran5/5PASS1.1m. Source44bde3c. Frozen full63 nowrunning. QA-006 moved temporarily toproblem until fullgate passes. PagesSource APIupdate returned403; no setting changed. dist/Actionsartifact excludesrefs; runtime neverloadsconcepts.

Baseline44bde3c full63/63PASS14.9m; PRCI42037332359SUCCESS. คืนQA-006DONEตามผลจริง หลังจากนั้นเติมidle-on-arrivalและexplicitcontinuityสำหรับactionเท่านั้น ป้องกันimportเซฟเก่าบนmapเดียวคงตำแหน่งน้ำพุผิดฉาก; arrival.specใช้ไฟล์ส่งออกจริงจากS01เพื่อนำเข้ากลับ ไม่injectstate. LatestCIมี64cases รอผลก่อนVIS-014DONE.

Final pose handoff: คงท่าrestตั้งแต่ขึ้นseatผ่านcamera-returnและdurable-save ไม่แทรกidleหนึ่งเฟรม; คืนvisibilityเงาตอนยืน เพิ่มread-only MutationObserver regression (ไม่เขียนstate) ในarrival.spec targeted7/7PASS1.3m, game105/type/lint/build/packagingPASS; expectedfullCI65. No further runtime/art scope changes planned this batch.

พบเส้นทางม้านั่งเดิมอ้างจุดเริ่มตายตัว จึงอาจตัดขาม้านั่งเมื่อพักซ้ำหลังเพิ่มการคงตำแหน่ง แก้ CH0210 ให้ใช้ road graph/bench_seat เหมือนน้ำพุ ทดสอบเส้นทางจากทุกAnchorและพักซ้ำที่seatแล้วไม่มีwalk beat คืนค่าsupport depthตามpostureใหม่ทุกshow ไม่แก้inventory/time/trust สูตรหรือdamage เกมunit105/content2/type/lint/build/packagingผ่าน targeted16กำลังตรวจ CI65รอsourceชุดนี้


Session12 acceptance — source0dc5e59 / PR#10: CI42042658772SUCCESS full65, localtarget16/16PASS3.9m, unit105/content2/roadmap7/type/lint/build/referencepackingPASS. VIS-013/014DONEเฉพาะนำเข้า/ต้นแบบ2ฉากที่ทดสอบ QA-006คืนDONEหลังแก้failure; Checklist21/76=27.6%, v121/73=28.8%. Matrixยังคงlayers/movement/story/effects/readyของสองแห่งเป็นin_progressตามเกณฑ์ฉากสมบูรณ์ อีก8conceptยังไม่แปลง จึงไม่ใช้ต้นแบบเพิ่มสถานะfinalHD. Metadata/evidencecommitหลังนี้ไม่แก้runtime; public0.6.0รอผลmerge/main/deploy.


### ผลเผยแพร่จริงรอบ12 — 0.6.0

PR#10รวมเข้าmainที่1563ba4 เวลา2026-11-05 14:27:48UTC Source0dc5e59ผ่านPRCI42042658772 full65แล้ว [mainActions42045246025](https://github.com/Ninon0406/alltest/actions/runs/42045246025) full65/build/job127306317476/deploy/job127313366342 SUCCESS; deployจบ2026-11-05T14:40:21Z LegacyPages42045245307SUCCESSด้วย

เว็บจริง https://ninon0406.github.io/alltest/ ผ่านการเล่นต้นไม้/น้ำพุ/ผสมWIND/FIRE/BLOOM/WATER/ECHO/ป่า/การฝึก/หอสมุด/ลำธาร/โลกจดจำ/กลับต้นไม้จากHub/โหลดท่านั่ง/ส่งออกchecksum/นำเข้าเซฟ ไม่พบconsole/page/HTTPerror JavaScriptตรงbuildSHA256 `dd41d83f0ac6a39d12a83c0d52442a6f99937633a9ae22eac784e42e1bf96516` และ39versionedPNGตรงทุกไฟล์ 0requestsไปdevelopmentreferences หลังActionsdeployตรวจassets/rendererซ้ำPASS ไม่ใช้ผลPreviewแทนเว็บจริง

ภาพเว็บจริงอยู่ที่evidence/session12/public-tree-390.pngและpublic-fountain-390.png เป็นChromiumhasTouch390×844 ไม่ใช่โทรศัพท์เครื่องจริง ภาพยังต้นแบบและQA-009/hardwareยังblocked PagesSourceSettingsยังlegacyเพราะAPI403 ไม่ได้อ้างว่าเปลี่ยนเป็นActionsสำเร็จ

รอบ12จบด้วยevidence-only checkpoint ไม่เปลี่ยนruntimeหลังsource0dc5e59/CI65 ภาพReferenceและงานค้างตรงRoadmap21/76=27.6% ไม่บังคับเจ้าของเริ่มใหม่หรือรันTerminal งานถัดไปVIS-008→VIS-004/005→CMB-006ตามdependencies


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

### ตรวจซ้ำด้วย Build ที่คงที่

Initial full run พบtestโหลดไฟล์เร็วกว่าปุ่มพร้อมในsubpathที่จงใจหน่วงPNG; แก้helperให้รอinputenabledก่อนใช้setInputFiles (ซึ่งautomationสามารถข้ามdisabledได้) แล้วtargeted1/1ผ่าน11.4s เพิ่มCSSซ่อนnativefileinputเพื่อให้มีปุ่มโหลดเพียงปุ่มเดียว และassertจำนวนปุ่มบนmobile

ระหว่างแก้CSSมีการBuildลงdistที่previewกำลังใช้ ทำให้caseกล้อง1024ได้รับHTTP404ชั่วคราว จึงหยุดfullrunนั้นและเริ่มชุด85ใหม่จากBuildคงที่ ไม่กรอง404หรือลบAssertion ไม่ใช้ผลrunที่ถูกขัดจังหวะแทนผลสุดท้าย


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


## รอบ17 — 2026-11-06 UTC — staged art and Koro (0.7.2)

เริ่มจากmain78a2497ที่สะอาด หลังPR15/0.7.1/CI93และเว็บจริงผ่าน อ่าน03/Roadmap/Log/Architecture/Skills ตรวจsnapshot18Scene/60Choice/5NPC/3Encounter/234legal/0endings/6Stage และภาพอ้างอิง10แห่ง เลือกFND004ซึ่งยังpreload57PNGและไม่มีretryเป็นงานแรก ต่อด้วยVIS004/005ส่วนคุโรที่เกี่ยวข้อง ไม่เริ่มใหม่หรือเพิ่มสูตร/เนื้อเรื่อง/ศัตรู

ทำจริง: staticcatalog/RAMledger, shared+stage loading, asyncprepareก่อนcommit/import replacement, explicitretryโดยไม่session.commit/load, boundedXHR8000ms/maxRetries0, Thai progress/fallback UIและbusyguard; oldart60ไม่เปลี่ยน เพิ่มart-v10คุโรกับทั่ง2PNG/10905bytes พื้นทั่งไม่ตัดทางเดินเดิมและซ่อนในtraining, CH0401/S05แสดงสูตรตามบท ใช้Reference08เป็นทิศทางวัสดุ ไม่คัดลอกทั้งภาพ

พบปัญหาและแก้จริง: PhaserdefaultmaxRetries2ทำให้failedassetขอ3ครั้ง; globaltimeoutถูกper-filedefault0ทับ Firstper-filepatchTypeScriptไม่ผ่านเพราะต้องมีresponseTypeทำให้การทดสอบรอบนั้นยังใช้Buildเก่า แก้blob+timeoutและบังคับBuildผ่านก่อนทดสอบใหม่ RuntimeXHRจริงเป็น8000และstalledtestกลับมาเล่นได้ แก้labelภาษาไทยในtestใหม่ให้ตรงปุ่มเดิม ไม่มีskipหรือลบAssertion

ผลยืนยันเฉพาะงาน: Unit125/Focus11/BuildPASS; Focus1.2mครอบคลุมcold/warm/revisit/importunvisitedstage/fallback/repeatedfault/8stimeout/dirtyflag/seatedanchor/Koro5viewport/ReducedMotion ภาพruntimeเปิดตรวจแล้ว titlePNG57→23,629017→301231bytes ลด52.1% ไม่ใช่FPSbenchmark ManualFileSaveเฉพาะRAM+ไฟล์เดิม State2/File2ไม่เปลี่ยน

RoadmapFND004doneบนเกณฑ์เฉพาะงาน;21/76=27.6%,v121/73=28.8%; VIS004/005/008ยังไม่ครบงานใหญ่ Workshoplocationเป็นpartialprototype ไม่ใช่10ฉากเสร็จ ไม่มีหลักฐานfinalHD/hardware/humanfun ยังขาดchapterตอนท้าย/boss/สามending/สถานที่ใหม่/เสียง/A11yและreleasegate

งานถัดไป5ตามDependency:1)Fixedworkshopmap/anchors/collidersจากReference08 2)craftcauldron+ingredientstagingกับสูตรเดิม 3)เส้นทางบ้าน–ประตู–จัตุรัส 4)ตัวละคร/NPCท่าโต้ตอบที่เหลือ 5)boss/mercy/puzzleเพื่อปลดเนื้อเรื่องท้ายบทพร้อมregression ทั้งหมดเก็บรายละเอียดในRoadmap; HardwareQAแยกไม่วนทำManualSaveซ้ำ

ผลfull/CI/commit/PR/main/deploy/actualpublicจะเพิ่มเป็นreceiptท้ายรอบตามผลจริง ดูevidence/session17 ไม่อ้างผลSession16แทน


### Session17 final audit — decode failure regression

หลังf851d09/PR16ตรวจvendorและจำลองHTTP200แต่PNGเสีย พบใช้legacyแต่statusreadyและไม่มีretryจริง ดูdecode-failure-before.json เปลี่ยนFND004เป็นproblemระหว่างแก้ เพิ่มArtLedger.settleตรวจrequestedที่decodeไม่สำเร็จเมื่อbatchcompleteและรายงานUIทั้งpreload/prepare เก็บUnitใหม่และBrowsercaseทั้งinitialshared+lazyGarden ไม่เพิ่มงานหรือเปลี่ยนเกม. FinalUnit126/Focus12PASS1.2m จึงคืนFND004doneตามเกณฑ์. ยกเลิกlocal104และCI42207916293ซึ่งทดสอบsourceก่อนแก้ ไม่ใช้เป็นpass; finalfullเป็น105casesจากโค้ดล่าสุด


### ผลปิดรอบ17 — 0.7.2 ยืนยันจริง

Source5c58122(ต่อจากf851d09) / PR16 / merge d38790e. LocalFull105/105PASS20.5m, PRCI42209316444SUCCESS105/10516.5m, MainCI42211897135SUCCESS105/10520.2m/Build/Deploy. Unit126/Content2/Roadmap8/Focus12/Reference10checksums13/ManualSource30appfilesผ่าน. Runtimecodeและ62PNGไม่เปลี่ยนหลังSourceที่ผ่านCI

เว็บจริง https://ninon0406.github.io/alltest/ ผ่านstart/tree/fountain/5craftedrecipesacross2flows/3encounters/returnstory/archive/stream/memory/filechecksum/nativepicker/exactstateimport/emptyrefresh/explicitretry/nostorage/noupload. Koroจริงและภาพก่อนหลังเปิดตรวจแล้ว PostActions51PNG+JS SHA85c1c2b2a1b086574f72559076401e195640a7acd174be53f088892c327f29aeตรงBuild,0ConceptRequests/0ConsoleErrorsในpositiveflow. Controlledfaultแยกexpectednetworkerror1 ไม่ใช่productionoutage

Roadmap21/76=27.6%(v121/73=28.8%):done21/in_progress37/not_started16/problem0/blocked2. ปิดเฉพาะFND004 VIS004/005/008ยังprototype/in_progress;0endings. Save011/012และQA009ยังรออุปกรณ์จริง ไม่อ้างhumanfunหรือfinalHD. Commitปิดรอบเฉพาะdocs/evidence/Roadmap;งานถัดไป5และdependencyตามREPORT_TH ไม่มีงานข้ามเซสชันอัตโนมัติ
