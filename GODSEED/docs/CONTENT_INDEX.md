# Current source — Session19 / 0.9.0

21Scene/70Choice/70uniqueChoiceIDs/5companionNPC/4reachableEncounter(includingTraining)/234legal+uniqueSpellIDs/0chapterending/7Stage. Extracted by inspect:content; JSON/IDs in [Session19](evidence/session19/content.json). AddedS15_RUINS/S16_RUINS_RESULT/S17_ECHO_TABLET,CH0207+CH1501–1504+CH1601–1602+CH1701–1703,B03_RUIN_SENTINEL,ruinsStage. Every18oldscene/60oldchoice retained.

New sources for existingFORM_WARD/MOD_PIERCE/FORM_RAY enable actual WIND_WARD_LINGER discovery/defense; no new recipe or material definition. Q_ARCHIVE_NOTES is one shared completion acrosscopy/listen and NPC remembers facts. Other quest/chapter/endings remain partial. Old statements about future ruins below are historical0.8andearlier, not the current feature state.

---

# Content index 0.9.0

Computed with `npm run inspect:content` (`scripts/inspect-content.mjs` imports actual typed source through Vite SSR; no browser/gameplay writes).

18scenes /60choices /60uniqueChoiceIDs /5companionNPC /3reachable encounters /234legal spells /234uniqueSpellIDs /0authored chapter ending scenes /6stage IDs. Catalog8cores/6forms/7mods; stateVersion2.

## Scene IDs

`S00_WAKE`, `S01_FIRST_STEPS`, `S02_HUB`, `S02_TREE`, `S03_LUMI`, `S03B_MAREN`, `S04_KORO`, `S05_CRAFT_TUTORIAL`, `S06_GARDEN`, `S07_ARCHIVE`, `S14_RESEARCH`, `S11_STREAM`, `S12_STREAM_RESULT`, `S08_FOREST_GATE`, `S09_FOREST`, `S10_FOREST_RESULT`, `S13_FOREST_SHRINE`, `S28_RECOVER`

## Choice IDs

`CH0001`, `CH0002`, `CH0003`, `CH0004`, `CH0101`, `CH0102`, `CH0103`, `CH0201`, `CH0202`, `CH0203`, `CH0204`, `CH0206`, `CH0205`, `CH0209`, `CH0210`, `CH0211`, `CH02T1`, `CH02T2`, `CH0301`, `CH0302`, `CH0303`, `CH03B1`, `CH03B2`, `CH03B3`, `CH0401`, `CH0402`, `CH0403`, `CH0404`, `CH0405`, `CH0501`, `CH0502`, `CH0503`, `CH0601`, `CH0602`, `CH0603`, `CH0701`, `CH0702`, `CH0703`, `CH1401`, `CH1402`, `CH1403`, `CH1101`, `CH1102`, `CH1103`, `CH1104`, `CH1201`, `CH1202`, `CH1203`, `CH0801`, `CH0802`, `CH0803`, `CH0901`, `CH0903`, `CH0904`, `CH1001`, `CH1002`, `CH1301`, `CH1303`, `CH2801`, `CH2802`

## Actors, encounters and stages

`pip`, `lumi`, `maren`, `koro`, `eira-v3`

`BT_TRAINING`, `B02_STREAM_WISP`, `B01_FOREST_SPROUT`

`village`, `garden`, `workshop`, `forest`, `archive`, `stream`

NPC counts represent authored companion dialogue; renderer suffixes identify textures, not extra characters.14actor PNG sheets include retained fallback/old player and four-direction idle art. Six stages each have rear/ground/front, plus four retained legacy fallback stages and two new composited fallbacks.

Session5 adds4scenes/15choices (2hub routes+6archive/research+7stream/result), oneNPC and oneencounter. Canonical IDs and every older transition remain. Archive branches unlock essential facts on all exits. New ingredients CORE_WATER/CORE_ECHO/FORM_RAY/MOD_LINGER come from actual options; bell is a quest item. Starter/grants and234recipe legality unchanged. ECHO+RAY+LINGER remains illegal; a real route supplies Koro's extraORB to craft ECHO_ORB_LINGER instead.

Five distinct spells are actually discovered/equipped/used across real browser routes: WIND_ORB_SEEK, BLOOM_RING_HEAL, FIRE_ORB_SPLIT, WATER_RING_HEAL, ECHO_ORB_LINGER. This is observed path coverage, not a free starter loadout or all234materials available. Supplied-material unit fixtures still exercise all234 recipes separately.

Clue facts: forest_clue/stream_clue/archive_read/ruins_clue. The fourth remains future ruinstory; no bogus ruins/festival button is exposed.0fullchapterendings; slice_complete marks only the original forest-note milestone.

Session6/0.4.1: counts unchanged; no scenes, choices, NPCs, encounters, spells or artwork added. View-only recipe/book filters and equip/unequip UI actions are not story choices.

Session7/0.4.2: inspector rerun; content counts unchanged17/56/5/3/234/0endings/6stages. Eight choice-specific cinematic paths and six travel lanes are presentation data, not new SceneIDs/ChoiceIDs/materials/spells. No PNG additions; same39 original PNGs (28versioned files checked by public verifier).

Session8/0.5.0 inspector confirms unchanged17scenes/56choices/5NPC/3encounters/234legal/0endings/6stages,5spellsobservedthroughrealroutes. Player movement adds24originalframes/onePNG; total40PNGs,29versioned files audited by publicverifier. SameScene/ChoiceIDs/materials/rewards; authored movement paths are presentation data. State2/database1/envelope1 unchanged.


Session12/0.6.0: CH0004 optionalrestunderseedtree (S00→S00) addsonechoice, preservingall17sceneIDs/oldbranches/3encounters/234spells/0endings. tree_memory andrest_under_tree flagsdriveleaf/posememory; rest_benchrestoresCH0210pose. 6stageIDs,7locationpresentations asvillage nowhascenter+tree. Originalart50PNGtotal/39versioned;10newPNG185,199bytes/40oldbyte-identical. Referencepack10concepts is not10finishedgameplaymaps.

Session12 final extension: S02_TREE is reachable from hub via CH0211 and returns via CH02T2; CH02T1 rests there without extra gifts/trust. Old17sceneIDs remain, currenttotal18/60. Existinghub saves visitwithoutrestarting.

Session13: counts unchanged18/60/5NPC/3encounters/234legal/0endings/6stageIDs. Added3gatheringvisuals for existingCH0102/CH0601/CH0603, not newitems/recipes/choices;51runtimePNGtotal.

รอบ14 / 0.6.2: ตรวจ source อีกครั้ง 18Scene/60Choice/5NPC/3Encounters/234legal/0Endings/6Stages เท่าเดิม; 53runtimePNG, 42versionedPNG รวมแปลงและท่ารดน้ำใหม่ 2 ไฟล์ การผสมที่ทดสอบจากของจริงยัง 5 สูตร ไม่ใช่การเข้าถึง234สูตรทั้งหมดจากเนื้อเรื่อง

Session15/0.7.0: source counts unchanged18scenes/60choices/5NPC/3encounters/234legal/0endings/6stages. NewMaren runtimeactor replacespresentation only; existingCH0602flags now have a seated/hummingtimeline. 54PNG runtime /43versionedPNG plusownedSVGmark. State2 unchanged; fileformat2 replacesbrowserstorage.


## รอบ 16 — ตรวจจาก source 2026-11-06

inspect:content ยืนยัน 18 Scene / 60 Choice / 5 NPC / 3 Encounter / 234 legal / 0 Endings / 6 Stage เหมือนเดิม เพิ่มเฉพาะ presentation location `elder_garden`, แผนที่/ต้นฉบับภาพสวน และการนั่งตาม CH03B1 ไม่มี Story ID, loot, สูตร หรือศัตรูใหม่ State2/File2 เดิม; GAME_VERSION 0.7.1
