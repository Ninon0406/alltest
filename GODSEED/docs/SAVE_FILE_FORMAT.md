# GODSEED Manual File Save — current contract

Owner V2 supersedes historical autosave instructions. The website keeps player progress only in RAM. Explicit file selection is the only way to continue after navigation/reload. Existing browser databases are not read or silently erased. No progress is sent to a server.

Save: “บันทึกเกมเป็นไฟล์” → validate complete State → canonical SHA256 payload → browser download `GODSEED_Save_YYYY-MM-DD.godseed`. JSON inside; MIMEapplication/json. Starting download cannot prove that OS retained it. Player may acknowledge after checking Files/Downloads; state changes invalidate that acknowledgement. On iPhone/iPad, if a preview opens use Share→Save to Files. Physical Safari/Android testing remains unconfirmed.

Load: fileinput `.godseed` (or historical `.json`) → byte size≤1,000,000 → JSON.parse → formatVersion → checksum → state migration/schema/reference checks → summary → explicitconfirm. Cancel/errors preserve RAM. No eval. Inputs never upload.

File2 fields: formatGODSEED_SAVE, formatVersion2, gameVersion, exportedAtUTCISO, chapterIdCHAPTER_1, checkpoint{sceneId,storyNodeId,kind:story_choice|battle_turn}, completeState, checksum. Hash covers everyfieldexceptchecksum with sortedobjectkeys; arraysretainorder, undefinedomitted. This detects corruption, not authentic ownership or anti-cheat.

State2 carries everycurrentlyimplementedfield: run/name/seed/rng/revision/scene/ticks/hp/mp/xp/recoveryScene/inventory/known/equipped/flags/choices/trust/rewarded/gathered/journal andoptionalbattle (enemyHP/turn/shield/status/playerStatus/log/checkpoint/next). Current game has no separatelevel/gear/party/masterylevel progression; do not invent correspondingvalues. Futureimplementedfields require schema+migrationtests. Restflags andscenecheckpoint restore authored staging; no mid-animation snapshot. Stablebattleturns can be exported.

Compatibility: File1 checksum is verified on originalstate before State1→2 migration. RawState1/2JSON can only load via explicitchoice and is labeledlegacy. Futureformats/gameversions, inconsistentcheckpoint, nonexistentScene/Item/Spell/Choice/NPC/Encounter, invalidstatus/equipment/HP, oversizedfile andwrongextensions reject withThaierrors.

Retiredcontracts: startupIDBread, autosave, recoverycopies, backgroundarchives andstorage-retryUI. Testsfor these were replaced byfile/volatile/no-write/no-upload assertions; gameplay/migration/combat assertions remain.


0.11/0.11.1 additive battle data: optional strict `pathActions{scouted?,rootGuardUsed?}` has no default, so absent old fields remain absent. `TRAIL_FOCUS` is player-only1–2turns, requires the coherent earned Explorer rank2 and scouted:true. Root-guard expenditure requires coherent Nature rank2. Rank flags require actual foundation/trial flags; intro-path state is derived from existingflags, not a second save store.0.11.1 only fixes renderer cancellation placement; no File/State version change. Native imports of original0.9,0.10 and0.11 clients preserve State exactly.
