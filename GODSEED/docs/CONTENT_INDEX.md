# Content index0.6.0

Computed with `npm run inspect:content` (`scripts/inspect-content.mjs` imports actual typed source through Vite SSR; no browser/gameplay writes).

17scenes /57choices /57uniqueChoiceIDs /5companionNPC /3reachable encounters /234legal spells /234uniqueSpellIDs /0authored chapter ending scenes /6stage IDs. Catalog8cores/6forms/7mods; stateVersion2.

## Scene IDs

`S00_WAKE`, `S01_FIRST_STEPS`, `S02_HUB`, `S03_LUMI`, `S03B_MAREN`, `S04_KORO`, `S05_CRAFT_TUTORIAL`, `S06_GARDEN`, `S07_ARCHIVE`, `S14_RESEARCH`, `S11_STREAM`, `S12_STREAM_RESULT`, `S08_FOREST_GATE`, `S09_FOREST`, `S10_FOREST_RESULT`, `S13_FOREST_SHRINE`, `S28_RECOVER`

## Choice IDs

`CH0001`, `CH0002`, `CH0003`, `CH0004`, `CH0101`, `CH0102`, `CH0103`, `CH0201`, `CH0202`, `CH0203`, `CH0204`, `CH0206`, `CH0205`, `CH0209`, `CH0210`, `CH0301`, `CH0302`, `CH0303`, `CH03B1`, `CH03B2`, `CH03B3`, `CH0401`, `CH0402`, `CH0403`, `CH0404`, `CH0405`, `CH0501`, `CH0502`, `CH0503`, `CH0601`, `CH0602`, `CH0603`, `CH0701`, `CH0702`, `CH0703`, `CH1401`, `CH1402`, `CH1403`, `CH1101`, `CH1102`, `CH1103`, `CH1104`, `CH1201`, `CH1202`, `CH1203`, `CH0801`, `CH0802`, `CH0803`, `CH0901`, `CH0903`, `CH0904`, `CH1001`, `CH1002`, `CH1301`, `CH1303`, `CH2801`, `CH2802`

## Actors, encounters and stages

`pip`, `lumi`, `maren`, `koro`, `eira-v3`

`BT_TRAINING`, `B02_STREAM_WISP`, `B01_FOREST_SPROUT`

`village`, `garden`, `workshop`, `forest`, `archive`, `stream`

NPC counts represent authored companion dialogue; renderer suffixes identify textures, not extra characters.11actorPNG sheets include retained fallback/old player art. Six stages each have rear/ground/front, plus four retained legacy fallback stages and two new composited fallbacks.

Session5 adds4scenes/15choices (2hub routes+6archive/research+7stream/result), oneNPC and oneencounter. Canonical IDs and every older transition remain. Archive branches unlock essential facts on all exits. New ingredients CORE_WATER/CORE_ECHO/FORM_RAY/MOD_LINGER come from actual options; bell is a quest item. Starter/grants and234recipe legality unchanged. ECHO+RAY+LINGER remains illegal; a real route supplies Koro's extraORB to craft ECHO_ORB_LINGER instead.

Five distinct spells are actually discovered/equipped/used across real browser routes: WIND_ORB_SEEK, BLOOM_RING_HEAL, FIRE_ORB_SPLIT, WATER_RING_HEAL, ECHO_ORB_LINGER. This is observed path coverage, not a free starter loadout or all234materials available. Supplied-material unit fixtures still exercise all234 recipes separately.

Clue facts: forest_clue/stream_clue/archive_read/ruins_clue. The fourth remains future ruinstory; no bogus ruins/festival button is exposed.0fullchapterendings; slice_complete marks only the original forest-note milestone.

Session6/0.4.1: counts unchanged; no scenes, choices, NPCs, encounters, spells or artwork added. View-only recipe/book filters and equip/unequip UI actions are not story choices.

Session7/0.4.2: inspector rerun; content counts unchanged17/56/5/3/234/0endings/6stages. Eight choice-specific cinematic paths and six travel lanes are presentation data, not new SceneIDs/ChoiceIDs/materials/spells. No PNG additions; same39 original PNGs (28versioned files checked by public verifier).

Session8/0.5.0 inspector confirms unchanged17scenes/56choices/5NPC/3encounters/234legal/0endings/6stages,5spellsobservedthroughrealroutes. Player movement adds24originalframes/onePNG; total40PNGs,29versioned files audited by publicverifier. SameScene/ChoiceIDs/materials/rewards; authored movement paths are presentation data. State2/database1/envelope1 unchanged.


Session12/0.6.0: CH0004 optionalrestunderseedtree (S00→S00) addsonechoice, preservingall17sceneIDs/oldbranches/3encounters/234spells/0endings. tree_memory andrest_under_tree flagsdriveleaf/posememory; rest_benchrestoresCH0210pose. 6stageIDs,7locationpresentations asvillage nowhascenter+tree. Originalart50PNGtotal/39versioned;10newPNG185,199bytes/40oldbyte-identical. Referencepack10concepts is not10finishedgameplaymaps.
