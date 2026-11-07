### Session22 / 0.12.1 candidate — cold imported scene actor

แก้NPCข้ามgroupไม่ถูกโหลดเมื่อimportopeningfileแล้วเข้าECHO_CALLทันที:World.prepare/showระบุrequiredactorให้ArtLedgerและerror/retrycontext โหลดเฉพาะsheetที่ยังไม่มี คงtitle25PNGและcache. ภาพก่อน/Redจากactualpublic0.12.0และGreenอยู่[hotfix evidence](evidence/session22/hotfix/README.md)

Unit244/Focused15+coldfileabort/retry1ผ่าน File2/State2/ID/234recipes/88PNGเดิมไม่เปลี่ยน. Native0.12.0activeECHOfileเก็บเฉพาะ/tmpเพื่อเพิ่มcompatibilityเป็น5รุ่น. Full149/CI/public0.12.1รอผลจริง;MainCI42365860406ของ0.12.0cancelledเพื่อpatch ไม่ใช้148เก่าอ้างว่าpatchผ่าน

---

## 0.12.0 additive compatibility

GameVersion0.12.0;File2/State2/CHAPTER_1เดิม scene/choice/recipeเก่าทั้งหมดคงอยู่ เพิ่มB04_ECHO_KNOT maxHP76และstrict optional battle.echo={core?:existingCore,exitOpened?:true} เฉพาะB04 ไม่มีdefaultหรือการสร้างfieldใหม่ให้snapshotเก่า. coreคือธาตุจากoffensivecastล่าสุด exitOpenedมาจากWINDhit. Intent/nextturn/RNG/loadroundtripตรวจเหมือนเดิม ไม่มีstorage/backend/automaticexport

เก็บไฟล์จริงจากpublished0.11.1ก่อนdeployใน/tmpเท่านั้น (legacy-capture.jsonเก็บเฉพาะhash/metadata);ไม่commitหรือuploadเซฟผู้เล่น

---

# GODSEED Manual File Save — current contract

Owner V2 supersedes historical autosave instructions. The website keeps player progress only in RAM. Explicit file selection is the only way to continue after navigation/reload. Existing browser databases are not read or silently erased. No progress is sent to a server.

Save: “บันทึกเกมเป็นไฟล์” → validate complete State → canonical SHA256 payload → browser download `GODSEED_Save_YYYY-MM-DD.godseed`. JSON inside; MIMEapplication/json. Starting download cannot prove that OS retained it. Player may acknowledge after checking Files/Downloads; state changes invalidate that acknowledgement. On iPhone/iPad, if a preview opens use Share→Save to Files. Physical Safari/Android testing remains unconfirmed.

Load: fileinput `.godseed` (or historical `.json`) → byte size≤1,000,000 → JSON.parse → formatVersion → checksum → state migration/schema/reference checks → summary → explicitconfirm. Cancel/errors preserve RAM. No eval. Inputs never upload.

File2 fields: formatGODSEED_SAVE, formatVersion2, gameVersion, exportedAtUTCISO, chapterIdCHAPTER_1, checkpoint{sceneId,storyNodeId,kind:story_choice|battle_turn}, completeState, checksum. Hash covers everyfieldexceptchecksum with sortedobjectkeys; arraysretainorder, undefinedomitted. This detects corruption, not authentic ownership or anti-cheat.

State2 carries everycurrentlyimplementedfield: run/name/seed/rng/revision/scene/ticks/hp/mp/xp/recoveryScene/inventory/known/equipped/flags/choices/trust/rewarded/gathered/journal andoptionalbattle (enemyHP/turn/shield/status/playerStatus/log/checkpoint/next). Current game has no separatelevel/gear/party/masterylevel progression; do not invent correspondingvalues. Futureimplementedfields require schema+migrationtests. Restflags andscenecheckpoint restore authored staging; no mid-animation snapshot. Stablebattleturns can be exported.

Compatibility: File1 checksum is verified on originalstate before State1→2 migration. RawState1/2JSON can only load via explicitchoice and is labeledlegacy. Futureformats/gameversions, inconsistentcheckpoint, nonexistentScene/Item/Spell/Choice/NPC/Encounter, invalidstatus/equipment/HP, oversizedfile andwrongextensions reject withThaierrors.

Retiredcontracts: startupIDBread, autosave, recoverycopies, backgroundarchives andstorage-retryUI. Testsfor these were replaced byfile/volatile/no-write/no-upload assertions; gameplay/migration/combat assertions remain.


0.11/0.11.1 additive battle data: optional strict `pathActions{scouted?,rootGuardUsed?}` has no default, so absent old fields remain absent. `TRAIL_FOCUS` is player-only1–2turns, requires the coherent earned Explorer rank2 and scouted:true. Root-guard expenditure requires coherent Nature rank2. Rank flags require actual foundation/trial flags; intro-path state is derived from existingflags, not a second save store.0.11.1 only fixes renderer cancellation placement; no File/State version change. Native imports of original0.9,0.10 and0.11 clients preserve State exactly.
