# REBORN — CODEX DIRECTIVE V6
## PIXEL LIFE RPG • ONE LIFE ONE RUN • POWER 1–100 • COMPACT UI • LIFESPAN PACING

**Repository:** `Ninon0406/alltest`  
**Production:** `https://ninon0406.github.io/alltest/`  
**Language:** Thai for every player-facing element; English allowed for internal code and tests.  
**Execution:** Modify working repository files, run test/build/browser checks, and publish only with configured permissions. No mock-only delivery.

> NEW USER OVERRIDE: This document supersedes earlier guidance where inconsistent, especially automatic game saves, old multi-tab restoration, oversized illustrated screens, and power progression. All other working mechanics must be preserved and extended.

# 0. FIRST READ THE ACTUAL REPOSITORY — NOT THE OLD CHAT

1. Read current `HEAD`, `AGENTS.md`, `ROADMAP.md`, `GAME_DESIGN.md`, `CONTENT_MANIFEST.md`, `docs/REBORN_CODEX_ULTIMATE_DIRECTIVE.md`, `docs/NEXT_CODEX_TASK.md`, `docs/PACING_REFERENCE.md`, `docs/IMPLEMENTATION_CHECKLIST.md`.
2. Audit actual working code, tests and current production before any changes. Do not assume this document's checkpoint is newer than `HEAD`.
3. At the inspected checkpoint (v0.5.0): 126 authored scenes/events, 269 authored choices, 6 endings, 20 playable basic careers and 20 earned advanced paths, 20 functional locations and 20 routes, seeded rebirth, 360-day authoritative calendar, annual-focus progression, 7-stage awakening, functional travel/basic market, layered SVG portrait, save schema 5. Recheck the manifest; these counts are **not** future targets already achieved.
4. Relevant entrypoints: `app.html` and `src/main.js`. Relevant systems: `src/engine/actions.js`, `src/engine/time.js`, `src/engine/yearly.js`, `src/data/yearly.js`, `src/character/appearance.js`, `src/ui/avatar/portrait.js`, `src/ui/yearly-view.js`, `src/ui/map-view.js`, `src/ui/styles.css`, `src/world/economy.js`, `src/world/travel.js`, `src/progression/`, `src/save/storage.js`, `src/save/gallery.js`.
5. IMPORTANT PAGES QUIRK: source HTML is `app.html`; root `index.html`, root `assets/` and root `art/` are **generated publication artifacts** for the existing GitHub Pages `main:/` compatibility deployment. Never hand-edit generated files. Run `npm run build`, `node scripts/stage-site.mjs`, preserve previously deployed hashed assets, and verify deployed CSS/JS. Follow repository constraints if the current setup has changed.
6. `src/engine/actions.js` currently has revision-token pure dispatch, while UI has historically saved before committing game state. Under the new One-Life rule, this MUST be refactored to in-memory atomic commit; do not merely hide Save button while persistence continues.
7. Keep existing seeded generator version 1 and version 2 deterministic for tests and historical reproducibility; do not mutate frozen birth tables/IDs. New appearance models or new birth pools require distinct version IDs. Keep *ending archives*, not active-run restoration.

# 1. NONNEGOTIABLE PRODUCT VISION

Build an original Thai-language **relaxed fantasy life simulator** with 8/16-bit pixel-art presentation and direct, lightweight interactions. Roughly 70% peaceful exploration/life, 20% careers/training/relationships, 10% optional world mysteries. The player's life begins at a randomly generated birthplace; action, study, profession and encounters organically determine outcome. No forced world-saving quest, no compulsory romance, no mandatory high-risk encounters.

**Reference https://1in8b.life/th/ and user screenshots only for interaction concepts**: readable life dashboard, fixed age/time controls, compact decision dialog, small status meters, contextual details, one-screen overlays and ending memory. Do NOT copy HTML/CSS, logos, illustrations, statistics, wording, sound, layout pixel-for-pixel, or branded identity. Original fantasy design only. Treat this as a functional UI inspiration, not a dataset or template.

**Prioritize:** functional simplicity over effects; meaningful different choices over inflated content counts; actual responsive behavior over impressive static mockups. Keep source/build compatible with static GitHub Pages with zero paid API/runtime backend.

# 2. ONE LIFE, ONE RUN — NO ACTIVE SAVE AT ALL

This is a deliberate breaking **gameplay policy change** from schema-5 auto-saving:

- The entire live run is held **only in JS memory**. No LocalStorage, SessionStorage, IndexedDB, cookies, backend, URL encoded snapshots, service-worker snapshot, persistent Redux state or automatic browser persistence of the active character, RNG, economy, position, pending action, NPCs or chronicle. A tab refresh or new navigation reload starts at the **birth / Rebirth Chamber** with a fresh independent seed. Never auto-resume previous lives.
- Opening map, inventory, status, shop, skill, quest, chronicle, options and in-app overlays **must not** refresh page or reset live in-memory run. Mobile backgrounding should pause timers but not guarantee preservation if browser discards the tab.
- A separate new tab starts a separate life, not a shared life. A browser refresh resets to unstarted Rebirth Chamber, followed by *player clicking New Life*; do not silently roll the new life before user chooses.
- No **Save/Load/Continue/Quick Save/Backup/Import Run/Restore** UI for incomplete runs. No persistent automatic changes after actions, year ticks, navigation or tab visibility changes.
- Preserve transaction semantics: `dispatch(state, action)` must validate and produce a next state without side effects; **commit in memory only after successful validation**, update state revision once, re-render. On failure, leave previous state unchanged. Remove dependency on `writeSave()` success from `Game.perform` and autoplay. Prevent double-click duplicate actions, stale tokens and timer action races.
- Maintain a stable run-scoped ID in memory for idempotency. Freeze immutable birth records *within that run*, not in storage.
- `beforeunload` can display browser-native warning only when supported, and it may not appear on mobile. Do not promise guaranteed warning, nor attempt to block browser force close. Explicit in-game exit/new run confirmation before dropping current run. `pageshow` with BFCache restoration: do not revive a previously abandoned run; design clear page-lifecycle behavior and test browser limitations. No offline aging.
- **The only permitted persistent user game data is terminal-life summaries** saved under narrowly scoped `reborn_finished_lives_v1` (and optionally completion-only ending catalog metadata derived from those summaries). Never save a nonterminal GameState or enough state to resume gameplay. No unrelated tracking unless explicitly needed and authorized.
- An entry is stored only after genuine terminal ending/death/retirement/god-ending state. A refresh, voluntary exit before ending, tab close and browser crash **must not** create a fake death or completion entry. Each ending summary written once by `runId`, with total age, occupation, power tier, major events, final appearance encoded as compact appearance/equipment identifiers, achievements, ending ID, actual active-play time, session date and human-readable epilogue.
- Archive can be viewed after future reload and has **no button to resume**. Ended life's detailed in-memory journal is readable until reload; only concise summary persists. Archive retention bounded (suggest ≤100 lives with clear user management/export). On storage error show download/copy option for completed summary, not fake success.
- Read existing `reborn_ending_gallery` carefully. Old ending IDs can be retained in an archive-only legacy section; do not overwrite user-owned completed records. Existing `reborn_save` and `reborn_save_backup_before_v*` keys **must not** be read to restore or written again. Do not clear origin-wide storage; only show an optional explicit control to delete legacy REBORN saves if user requests it; preserve legacy keys untouched otherwise.
- Historical validators and migration modules can stay in repo for compatibility/testing if no longer on runtime resume path. Refactor tests that assume gameplay auto-save, explicitly replace with no-persistence tests. Do NOT claim 'current save compatibility' means resuming incomplete runs; that is intentionally disallowed by this newest requirement.

### Acceptance tests — persistence

1. Start run, choose focus, train, travel, change gear; opening any in-app panel preserves identical runId/age/wealth/location/power.
2. Reload: no active run loads, Rebirth Chamber shows, no active run key is written; starting new life produces fresh seed.
3. New tab: independent run. Browser return/back and PWA scenarios tested where feasible with candid limitations.
4. No write to localStorage in between birth and terminal ending (monkey-patch spy and inspect browser storage).
5. On actual ending, write exactly one archive entry; reloading retains archive but never active character. Duplicate terminal callback must not duplicate entry.
6. Legacy `reborn_save` is ignored, not replayed or automatically destroyed. Existing ended gallery remains inspectable.

# 3. COMPLETE UI OVERHAUL — COMPACT, READABLE, ONE SURFACE

Build a **mobile-first game dashboard**, not a long document nor giant scrolling cards. No inner content hidden behind tiny text. Clarity first; compact 8/16-bit game graphics instead of huge decorative hero images.

## 3A. Main screen composition

Desktop/tablet ≥960px:
- **Sticky top bar:** character name + age in LARGE type (most visible), POWER LEVEL `Lv. x/100` in LARGE high-contrast type, short current realm label, date/year, current region, gold, compact active focus/time controls. Put age/power above other stats.
- **Left compact character card** (roughly 22–26% width): 8/16-bit full-body sprite + basic vitals/5 main attributes + equipment mini slots; expandable details. Avoid a tall passport card and avoid background graphs behind tiny labels.
- **Center playable scene** (42–55%): current location environmental pixel-art landscape, sprite visible standing inside it, story/narration below scene in 2–4 short lines at a time; clearly prioritized 3–6 contextual buttons (action/focus/continue) without overwhelming content. Optional 'อ่านเพิ่ม' on long stories.
- **Right dock/panel** (22–30%): relevant journal, family/party, last results, quests, contextual map preview; scroll independently only when needed.
- **Fixed bottom micro-toolbar** where appropriate: Map, Character, Train, Work, Bag, Companions, Journal, Life Goals, Settings. Avoid duplicating all links in both header and bottom.

Mobile/tablet portrait 320–768px:
- Age and level always visible at top.
- Main scene 16:9 or 4:3 max height around 160–260px, resized so narration and choices remain visible above fold as often as practical.
- Pixel sprite legible at small resolution; use crisp scaling/pixelated rendering.
- Sticky bottom five-icon navigation and overflow for extras; touch targets ≥44×44 CSS px.
- Status summary shows ~4–6 key items, expands to detailed drawer; do not stack all 100 years of journal/statistics vertically.
- All modals/drawers keyboard accessible: trap focus when modal, ESC closes, proper button labels, background scroll lock, close button, accessible contrast. Preserve state during overlays; Map is a drawer/tab/panel within same loaded document, not navigation to a new URL.

## 3B. Status hierarchy

Main visible: AGE (years, possibly months before age 1), POWER LEVEL 1–100, realm/tier, HP, Mana (when applicable), Stamina, Gold. Secondary expandable: hunger/fatigue/morale/fear, Strength, Agility, Constitution, Intelligence, Wisdom, Spirit, charisma, careers and talents. Correct derived max/current bars. Text labels must not overlap backgrounds; no status conveyed only by color. Thai font ≥14px on handheld for small labels and ≥16px for regular text where viable; adjustable scaling option.

Replace giant death/real-life-style demographic graphs and irrelevant global stats with **fantasy-specific activity journal and compact advancement timeline**. Show progress to next power level, difficulty, lifespan stage, and next opportunity.

## 3C. Modal interactions

- Map icon opens side sheet/overlay; click location -> preview within same sheet (image, distance, cost, time, requirements, visit button); click visit -> update game state, close or redraw overlay; no page reload.
- Shop icon opens inline shop overlay; select item -> description/preview -> purchase via atomic action and real wallet/inventory update.
- Training opens compact focus picker with next-level potential and costs.
- Narration is revealed in short chunks; click Continue / choose action; do not auto-scroll to bottom in disruptive way.
- Always provide selected/disabled states and clear reasons in secondary codex, while the main career selection shows eligible choices only.
- Avoid modal nesting >2 levels. No broken or decorative 'fake' buttons.

# 4. ORIGINAL 8/16-BIT PIXEL-ART VISUAL SYSTEM

Use original pixel art inspired by 8-bit/16-bit RPGs, not existing protected sprites/assets. Client-side rendering: Canvas/SVG with pixel grids or manually authored PNG spritesheets. `image-rendering: pixelated` for raster sprites, consistent palette and pixel size. 16-bit look preferred for characters and scenery, optional 8-bit low-detail mode. No paid runtime image APIs. Image generation during development can create **original base assets** if supported, but runtime must use local stored assets; if generator unavailable, create honest procedural tiles/sprites instead of pretending AI artwork exists.

## 4A. Deterministic inherited appearance

At birth, create a new versioned `appearance` (do not mutate frozen historical birth generator versions):
- ≥20 hairstyle shapes; ≥20 hair colors; ≥20 skin-tone swatches of varied tones appropriate to fantasy races (never rank or value bodies/skin); ≥20 eye styles/colors, ≥20 face-feature combinations.
- ≥20 starting upper-body outfits, ≥20 pants/leg outfits, ≥20 pairs of shoes, ≥20 hats/accessories optional; corresponding sprites and names **actually render**, not merely enumerated strings.
- Two parent appearance records also generated and stable for this run. Child's hair/eyes/skin/face traits partly inherited from parent feature pools with a clear reasonable crossover and rare mutation possibility, with race compatibility constraints. Must remain reproducible for fixed seed and algorithm version.
- Race-specific features and appropriate seasonal clothing; start clothing as actual owned/starter equipment if inventory/equipment implemented. No inconsistent random re-roll each render; same face/identity through entire life, age-stage variations only.
- No default outfit should cause incorrect body-parts layering or sex-specific appearance assumptions.

## 4B. Dynamic full-body sprite layered renderer

Layer order: terrain shadow -> back aura -> hair back -> body/skin -> face/eyes -> legs/pants -> footwear -> shirt/robes -> armor -> hair front/head gear -> accessories -> held item/weapon/tool -> front aura/particles -> relevant status indicator. Equipment slots: head, body, legs, feet, primary hand, secondary hand, accessory 1/2. Use explicit item IDs/owned inventory. Equipment changes must immediately reflect on sprite and derived stats. Never show a legendary blade not actually owned/equipped. A harmless profession illustration can be clearly labeled cosmetic if distinct.

Age stages: infant, young child, youth, adult, mature, elderly, magically long-lived, ascended; preserve recognizable identity across sprite variants. Skin/hair/eye swatches and parental resemblance retained. Aspect ratio and anchor alignment for every scene, avoid blurry scaling. Options for reduced motion and muted particles.

## 4C. Distinct scene backdrops

Assign each actual location an appropriate persistent scene descriptor: biome, settlement type, architecture, season, time-of-day, weather, tier, terrain details and small landmark. Render scene using tilemaps + foreground objects + background parallax sparingly. Target initial scenes for all 20 existing functional locations (different tile compositions; no one universal image); extend along with future functional locations to ≥150 across world/region tiers.

Scene changes when location changes; portrait/sprite **appears physically inside** current backdrop, appropriate scale and ground position, with equipped gear and aura. Preview panel in map can reuse tilemap at thumbnail resolution. Contextual sub-scenes: shop, academy, training ground, forest, guild, cave, dungeon, city, mountain, port, divine domain, etc. No deceptive stock or copyrighted artwork. Cache tiles, limit simultaneous particles and sprites for slow phones.

# 5. POWER REALM 1–100 — CENTRAL PROGRESSION

Implement an original **Elyndra Power Realm** system, not the names/mechanics/artwork of any existing anime/manhua. Level is integer 1–100. At start around Lv1 unless talent/story grants bounded justified advantage; progression exclusively through earned training/mastery/adventure/research/crafting/social/career routes. All 20 current base professions must have viable ways to gain power via their specialty, not forced fighting.

### Realm bands (original names and visuals)

| Level | Realm (Thai) | Appearance / milestone |
|---|---|---|
| 1–9 | ผู้เริ่มรับรู้พลัง | no aura; subtle sparkle at 5 |
| 10–19 | ผู้หลอมพลัง | pale wisps at 10/15 |
| 20–29 | ผู้ประสานธาตุ | colored ambient trail at 20/25 |
| 30–39 | ผู้เปิดเส้นชีพจร | ribbon sigil at 30/35 |
| 40–49 | ผู้ฝ่าขอบเขต | orbit particles at 40/45 |
| 50–59 | ผู้บัญชากฎ | subtle rune halo at 50/55 |
| 60–69 | ผู้เหนือกาลวัย | evolving wings/rings motif at 60/65 |
| 70–79 | ผู้เดินระหว่างโลก | layered elemental rings at 70/75 |
| 80–89 | ผู้ครองความลี้ลับ | ambient field + pulses at 80/85 |
| 90–99 | ผู้เข้าใกล้บัลลังก์ | unique high-rank effects at 90/95; never full deity until 100 |
| 100 | เทพผู้ก้าวข้าม | visually distinguished divine form, ending ONLY with age≥1000 and all conditions |

For each 5-level threshold (5,10,15…95,100), create distinct coherent aura shape/palette/intensity and action messages (≥20 graded visual variants). 5–10-level tiers must be visually recognizable and render deterministically. Each profession/element changes aura palette without hiding character face or equipment. Reduced-motion equivalent available. High particle tiers must still perform on mobile.

### Progress and difficulty

- Keep **XP / mastery / career ranks / powerLevel** separate. Do not equate 1 profession promotion with 10 power levels. Every level requires earned conditions and enough XP; no pure year-ticking power levels.
- Recommend a monotonic configurable XP curve, e.g. `xpToNext(level) = round(30 * level^1.55 * (level>=70?1.8:1) * (level>=90?2.7:1))`, plus milestone trials. Balance by simulated runs; avoid overflow. Never grant >99 before deity prerequisites; level 99 mastery can reach cap while waiting for ascension.
- Every 10 levels requires a class-relevant breakthrough: crafted masterwork, economic achievement, restored knowledge, expedition, martial trial, healing accomplishment etc. Not all involve combat.
- 90–99 must be markedly harder than earlier levels; reaching 100 **cannot** occur at age<1000 or before appropriate world discovery, goal selection, mastery and final trial.
- UI must show `Lv. 42 / 100`, band label, XP toward next level, plus the immediate missing requirement for next 10-rank threshold.
- Do not retroactively convert legacy profession XP to level 100 incorrectly. Initialize level for existing in-memory state within valid range and test transitions from different professions.
- Universal potential to reach god across all 20 profession families; different profession-specific final trials and endings. Godhood is optional; no chosen-one prophecy at birth.

# 6. AGE, LIFESPAN, TIME SKIP — PLAYABLE FROM BIRTH TO ≥1000

Existing authoritative 360-day calendar (`src/engine/time.js`: `absoluteDay` and `birthAbsoluteDay`) **must remain the sole source of truth**. Keep `calendar()`, `advanceTime()` and derived `age`/day/season; no hard-coded scene-age mutation. An action advances time **exactly once**. Never charge travel/work/time or gold twice. Age displayed in narration must match calendar age when event triggers. Regression-test every boundary 11→12, 19→20, 79→80, 99→100, 149→150, 299→300, 999→1000.

## 6A. Progressive pacing rules (targets, not hard enforced timers)

| Age range | Normal UX | Major decisions | Expected interactive session feel |
| 0–19 | micro-events & age-appropriate focus, 1y steps (optionally fast-forward) | frequent meaningful choices | roughly 3–5 min for ordinary path; detailed mode opt-in |
| 20–39 | compact career milestones & decade projects | 6–12 meaningful key decisions spread across period | ~3–5 min additional |
| 40–79 | one focus + recurring milestones, training/business/family | meaningful milestones not relentless popups | ~3–6 min additional |
| 80–149 | time montage with projects 5–20 years | roughly 5 major crossroads across era when alive | ~2–4 min additional |
| 150–299 | long-term training, research, settlement, expeditions | 4–8 contextual turning points | variable |
| 300–499 | century projects & world changes | 4–8 contextual turning points | variable |
| 500–799 | old-world memories & advanced mastery | 5–10 contextual turning points | variable |
| 800–999 | ultimate preparation and revelation | 5–10 contextual turning points | variable |
| 1000+ | final quest or indefinite peaceful life | final trial with choices, potentially long | deity ending ≥30min *actual interactive* play |

- On long horizons allow selectable 1/2/5/10/25/50-year **projects** depending on age & power; never skip an unhandled mandatory milestone, retirement, family development, discovered quest or fatal risk. Offer stop-before-decision. A 25y project can produce aggregated truthful microevents and a project summary, not fake individually rendered 25 yearly dialogs.
- Annual focuses already exist; **do not recreate or revert to mandatory 20 infant popups**. Preserve the current default focused annual dashboard with **rare 4–5-choice crossroads**. Create multiple authored possible childhood events in pool, but only present relevant prompts; optional detailed reader for those who want rich storytelling.
- Keep routine text 1–3 concise Thai sentences per event; split long chapter into collapsible small passages or 2–4 progressive chunks. Major crossroad can be longer; user never has to read a wall of text.
- Time acceleration 1/2/4/8× and manual skip are optional, paused on tab hidden and at meaningful decisions. Do not advance while modal, map, inventory, shop, or terminal summary open if it could cause actions during choice. Cancel timers when unmounting view. Stop on failed action; **do not require persistent save**.
- Gameplay must not rush to ending due to autoplay. Early death can produce a short run; skilled safe routes may be much longer. Avoid forcing an exact fixed real-world time for all users. A true deity run should contain enough meaningful work that typical completion is ≥30 minutes, supported by active interaction time verification, not a countdown barrier alone.

## 6B. Lifespan & breakthrough logic

- At birth record base natural lifespan by race/background, not exact deterministic death age displayed to player. Ordinary path can live out natural life barring supported hazards; avoid random unexplained fatality in childhood. Give accessible peaceful ending even for weak characters.
- Long-life potential is **earned**, not automatically conferred by year progression. Example *minimum capacity milestones* to balance, customizable after tests:
  - Lv1–19: natural lifespan (~65–110 depending on race/background) with mundane care factors.
  - Lv20–29: can unlock extension up to ~150 via successful age/health/power breakthrough.
  - Lv30–39: ~300.
  - Lv40–49: ~500.
  - Lv50–59: ~800.
  - Lv60–69: ~1,200 (enables >1000-year god pursuit).
  - Lv70–79: ~2,000.
  - Lv80–89: ~4,000.
  - Lv90–99: indefinite aging immunity possible after trials, but worldly hazards remain.
  - Lv100: deity ending unlocked **only** age≥1000 plus all separate final prerequisites.
- These caps are *potential thresholds*, not guaranteed lifespan; actual remaining lifespan and survival mechanics depend on health, choices, resources, and relevant completed trials. Older characters must be able to improve lifespan before capacity expires. Not every dangerous action kills; safe alternatives remain.
- If no milestone achieved, the person eventually reaches a suitable life conclusion, not an unexplained mandatory failure.
- 1,000-year route reachable via multiple legitimate profession policies under seeded simulations; impossible to bypass God gates by editing UI, fast-forward or calling action without prerequisites.

# 7. STORY STRUCTURE — ORIGINAL RELAXED FANTASY, MODULAR AND REPLAYABLE

World `Elyndra` is an original fantasy with 5 established regions in project. The player is not the predestined savior. Chapters are optional thematic arcs, not a rigid cinematic railroad. Life story emphasis: 70% everyday adventure/economic exploration, 20% personal growth/career/relationships, 10% overarching world mysteries. Keep personal outcomes, world lore, and encounters loosely coupled.

Implement procedural event selection from authored content catalogs **conditioned by** age band, current location, family, power, career, current focus, inventory, relationship, prior flags, season/time and rarity. Events with same narrative significance should have cooldowns, one-off flags, prerequisites and location tags. Never merely permute 5 generic sentences and count them as 500 authored choices.

**Story arcs by time:**
- 0–5: home, family, senses, learning/companionship, birth place, early personality.
- 6–11: local guild/teacher/festival/market, children’s exploration, early reading/trade/craft.
- 12–19: authentic awakening, choice of 20 eligible career families, scholarship/apprentice/mercenary/ordinary worker choices, first route adventures.
- 20–39: career mastery, independent settlement/household/business, friendly rival, training mentors, regional travel and friendship.
- 40–79: specialization, ordinary work-life, family and mature adventure, natural aging, deeper secrets only if explored.
- 80–149: long-life breakthrough or peaceful legacy; ~5 major story crossroads if alive.
- 150–299: long research, travel and civilization changes if extended life.
- 300–499: distant frontiers and mentor/reputation cycles.
- 500–799: personal legacy/kingdom changes, ancient world record, high-skill trials.
- 800–999: advanced path and revelation of optional divine mechanism.
- 1000+: final class-specific ascension or choice to remain mortal/immortal non-deity.

**Example original event families** (write actual different scenes and branches): village smith’s request; wandering mapmaker; library lantern; childhood music festival; damaged market bridge; herbal garden; lost apprentice notebook; winter trading caravan; hilltop observatory; river port competition; guild assistant training; quiet mountain teacher; sailor’s journal; traveling scholar; blacksmith forge festival; small artifact from ruins; young explorer's friendship; historic archive puzzle; community repair day; regional road toll negotiation; remote orchard restoration; city academy entrance; healer’s workshop; peaceful wilderness campsite; found family gathering; first owned home; guild expedition; merchant supply route; masterwork crafting; ancient starlight archive. Give each event at least 3 meaningful responses where age-appropriate and differentiate immediate/long-term outcomes. Use safe noncombat options.

**Progressive dialogue template:** `{id,title,locationId,ageRange,eligibility,rarity,cooldown,oneShot,artKey,segments:[{speaker?,text}],choices:[{id,label,conditions,timeCost,resourceCost,effects,flags,nextEvent,summary}],tags}`. Build schema validator, missing link detection, reachable graph tests, no duplicate IDs. Narration initial 1–3 sentences plus optionally “อ่านต่อ” (2–4 segments). Break down rather than delete rich worldbuilding.

**Catalog release targets** (verify each, do not claim until complete): ≥350 distinct authored event records (expand to 500), ≥500 meaningfully distinct choice records, ≥100 unique endings (including peaceful, profession, legend, deity), ≥100 authored NPC profiles, ≥150 functional discoverable locations, ≥80 actually playable advanced/hybrid profession paths, ≥40 functioning dungeons. A valid ending needs conditions, distinct epilogue, effects and final summary; do not inflate count through renaming. These are staged targets, not required to be faked in the next single task.

# 8. WORLD MAP IS AN IN-PAGE INTERACTIVE PANEL

Expand the existing functional `src/ui/map-view.js` and `src/world/locations.js`/`travel.js`, **do not rebuild map data or remove 20 existing connected locations**. Map is accessible through a single click and stays in same document/SPA state. Provide:
- 4 scales: Local/Town → Country/Region → World → Divine Planes (higher scales visibility depends on exploration/power, not fully accessible from birth).
- Clickable known places with pin, discovered fog, region grouping, zoom/pan/reset, current position, route highlights, visual local tile preview, travel methods and resource/time cost. Distance/cost/risk grounded in route graph. No city teleports without unlocked method.
- Selecting a place shows inline panel with `Preview / Path / Available services / Travel`; no `window.location` to navigate and no external map. Travel action uses existing atomic action once, updates location, background scene and journal. Keep age gates, accessible free/walking fallback and valid connected routes.
- At minimum produce unique contextual tile backdrop for current 20 locales; add original new locations gradually alongside real travel/routes and interactions.
- World map and avatar visual state update immediately after travel; avoid route/menu scrolling resets.

# 9. REAL GOLD, INVENTORY, EQUIPMENT AND VISUAL ITEMS

Current bread and ledger are real but starter career portrait tools are cosmetic; do not mistake them for owned gear. Continue the existing `docs/NEXT_CODEX_TASK.md` P3 equipment/inventory task, then integrate with the new UI:
- Define versioned item catalog, unique IDs, gold prices, rarity, tags, stackability, weight/capacity, compatible slots, item effects, asset layers, source/location availability and transaction journal.
- Actual purchase/sell with atomic gold and stock calculations; no negative gold/duplicate sale; inventory changes and event logs match. Equip requires ownership and appropriate age/class; unequip restores base stats; derived bonuses recomputed, never stack on toggling.
- Categories: head, upper-body, legs, shoes, main/secondary hand, accessory; starter outfits are owned but simple/cheap. 20 visual variants per starter category should show actual sprites. Tools, pack, profession-specific equipment and rare drops appear only when owned/equipped.
- Workshop/market/travel/career services impact real wallet and time. If budget insufficient provide relevant work/trade/free alternatives. No deadlock on no-gold starting origin.
- Render held/shown item in character-and-scene composition; on acquire display compact 'new item' sheet and clear rarity label. Real level VFX layered with actual equipment.
- Stats panel clearly indicates base versus derived gear boosts; stat hover/expand shows why changed.
- End-of-life summary includes genuinely obtained significant equipment, earnings, traveling and final personal effects.

# 10. CAREERS, AWAKENING, NPCS AND ENDINGS — INTEGRATE, DO NOT DUPLICATE

- Maintain existing **7-stage deterministic awakening**; measured result stored once in run, no re-roll via UI. Rank potential and show eligible careers only, sorted by suitability. Noneligible careers belong in searchable codex with missing prerequisites; do not clutter selection with dead buttons.
- Maintain 20 existing basic career families and 20 actual advanced progressions, their earned training, pay, XP and milestone stories. Add 60+ advanced/hybrid paths gradually without duplicate skill effects or stat stacking. All 20 professions should have noncombat God route at relevant mastery stages, compatible with world lore.
- Auras/powerLevel are cross-profession; avoid class XP ≡ powerLevel conflation. Level 100 is deity-only, not a default result from completing existing age-18 promotion.
- Create **real NPC data** (not just generated same-day peers) with unique IDs, origin, age, personal goals, affinity and effect of encounters. Companions and party if implemented must have stable stats and survival conditions. Optional friendship and age-appropriate romance; no forced romance. Keep relaxing adventure vibe.
- Create terminal outcome engine with at least 100 distinct target endings eventually. Early death/ordinary ending might be ~3–5 minutes, successful common life ~10–20 min, exemplary long-life ~20–30+ min, divine outcome ≥1000y and typical real engagement≥30min. These are pacing and content goals, not guaranteed timers or instant death traps. All end records archived once.
- Divine quest only **revealed**, not automatically completed, after significant mastery/discovery. Must explicitly choose goal and complete class-specific exploration, study or service trials. `powerLevel===100` must only be assigned by validated final ascension action at age≥1000 with all flags and trials; never via normal XP or stat side effects.

# 11. PERFORMANCE, ACCESSIBILITY AND QUALITY

- Avoid full background images > several MB each, giant DOM event histories, unbounded memory for ≥1000y. Use tile atlases, recycled lightweight DOM, compact journal aggregates, optional detailed in-memory segments for current era, and reasonable memory cap with honest chronology summary. Archive never stores full active GameState.
- Mobile low-end 360px portrait and 768px tablet are primary; test 320/360/390/768/1024/1366/1920 widths. Handle browser safe-area insets and font resizing. Touch targets≥44px, reduced motion, keyboard/focus support.
- Canvas 60FPS is not mandatory; time progression must never depend on render frame rate. Visual particles can run at reduced rate or be static. No per-frame save calls, no network dependency on assets not committed.
- Honor official original media copyright: do not replicate sprites, recognizable design or names from existing anime/manhua/games; original Elyndra progression names and art.
- Ensure a new Rebirth run is truly randomized but deterministic under test seed. Parental inheritance and clothing are not re-randomized when re-rendering.

# 12. DELIVERY PHASES — COMPLETE ONE SHIPPABLE SLICE AT A TIME

**Phase A — Baseline audit and ONE-LIFE migration (P0)**
- Inspect existing v0.5+ code. Update main/game/actions/save/gallery contracts so live run never writes storage. Create terminal-only archive. Replace current reload-resume tests; add two-tab/no-write/ending idempotency tests. Keep existing annual/yearly UI working. Update docs with explicit changed policy.
- Run local/test/e2e production build. Publish if repo deployment is authorized, then verify actual public result.

**Phase B — Responsive UI overhaul (P1)**
- Implement readable compact dashboard, age/level hero, collapsible status, in-page map/inventory/train/shop dialogs, tidy chronology, mobile controls, font and contrast. No decorative dead links. Test at multiple widths with screenshots and interactions.

**Phase C — Pixel-art appearance v2 + scenes (P2)**
- 20+ hair shapes/colors, 20 skin swatches, 20 starter upper-body sets, 20 pants, 20 shoes, 20 eye/face variants; stable parent resemblance; actual layered full body in biomes; each currently functional map area has distinct backdrop; aging. Tests for seed stability, layer order, variety, gear existence, reduced motion.

**Phase D — Real owned inventory/equipment + travel P3 continuation (P3)**
- Resume original `docs/NEXT_CODEX_TASK.md` owned equipment task but amend to in-memory only. Real gold/ledger, shop/travel encounters and full-body gear layers; preserve previously working bread, routes and age gates.

**Phase E — Original power 1–100 + breakthroughs (P4)**
- XP curves, tiers, 20 thresholds, class rewards, lifespans and stat-derived effects. Test 1→99, level cap, no premature godhood, low-level starting options, 20 profession-family power feasibility.

**Phase F — Long-life pacing and generational simulation (P5)**
- Keep 360-day calendar, age milestones, safe long projects, mortality/extension and 1000-year route; enhance journaling. Test all age boundaries and 1/2/5/10/25/50y advances stopping at decisions. Speed readjustment and optional auto-run; no forced repetitive 2-option popups.

**Phase G — Author authored story/world/NPC and ending content (P6+)**
- Grow 350+ event records/500 choices, 100 actual distinct endings, NPCs, careers/locations, deity arcs. Check schema, branch reachability, conditions and nonrepeating weighted selection. Maintain content manifest truthfully.

**Phase H — Polish, production and release verification (P7)**
- Unit+browser+simulation+content audits, accessibility, performance, deployment, screenshot review, public verification. Never claim full goals until measured and reachable.

### Phase completion rule

After each slice: run tests; make production build; correct failures; update `docs/NEXT_CODEX_TASK.md` with exact next slice, file paths and invariants; update `AGENTS.md` precedence to declare this new V6 policy; maintain `CONTENT_MANIFEST.md` for real counts; record tests not run honestly. Do not claim an unimplemented phase complete. Prefer a working deployed improvement over a giant broken all-at-once diff. If no direct publication permission, prepare PR/commit and give exact steps; do not bypass controls.

# 13. REQUIRED TEST MATRIX / ACCEPTANCE SPECIFICATIONS

Add Vitest, Playwright and deterministic simulations for:

**UI:** at 320/360/390/768/1024/1366/1920, age/level on-screen, readable text, no horizontal overflow or blocked buttons, map/shop/inventory/focus in-page, close/ESC/focus behavior. Character remains in scene with matching region image.

**Appearance:** ≥20 actual visual alternatives per specified group, same seed stable, child visibly inherits several parent features, every race renders, starter shirt/pants/shoes visible, equipment/effects alter relevant layers, no stale/lost gear after navigating.

**Power:** every tier 1–100 resolvable, distinct 5-level effect thresholds, 90–99 hard, normal XP cannot reach level 100, 100 requires ≥1000y + chosen goal + all trials. No color-only UI rank indication.

**Age:** time only through absoluteDay/advanceTime, no double charge, nursery–12–20–80–150–300–1000 transitions, paused decisions hold time; time montage keeps authored significant events/journal and doesn't fabricate narrative.

**No-save:** verify no active-run storage writes during *any* game action/autoplay/map/equipment, refresh resets to rebirth, opened second tab independent, completed ending summary persists, unfinished refresh/exit does not fake entry, no legacy resume, no double archive writes.

**Gameplay:** buy/equip/unequip/sell with real money/inventory/stat effects; map travel updates location/background/wealth/time exactly once; easy peace route accessible; power-based extension reachable. Avoid fake/stub methods.

**Narrative:** IDs unique, valid destinations, no incompatible age/locale/career conditions, no unreachable authored count inflation, quiet-life play valid, strong path reaches divine ending in legitimate simulated seeded run; ending summary age, level, career and equipment match last state.

**Deployment:** `npm ci`, `npm test`, `npm run content`, `npm run build`, `node scripts/stage-site.mjs`, `npm run test:e2e`, `node scripts/verify-production.mjs http://127.0.0.1:4185/` after launching preview; adapt old verifier to new refresh=no-save contract. Assert published CSS/JS load, runtime free of errors, run starts/new life, map and UI work on public URL where environment allows. Preserve root compiled deploy arrangement.

# 14. CODING RULES / RESPONSE FORMAT

- Use actual original code: do not provide only plans or huge pasted code in chat when working in Codex repository. Edit tracked files, add tests, show relevant filenames/PR/commit and verify.
- No external monetized image APIs, backend, server persistence or Firebase for single-run game. All visuals local. No copying reference site's appearance one-to-one.
- Incremental scoped diffs; do not erase the earned careers, equal 20-archetype births, annual focus, seven-stage ceremony, existing map routes, or original six endings. Maintain historical birth generator version behavior for reproducible tests, but do not persist active run.
- In every final status give: 1) commit/branch 2) implemented features 3) exact current counts 4) tests passed / skipped 5) deployed URL and actual verification method 6) pending issues / next actionable step. Never call ‘all done’ because build succeeded alone.
- No claims of asynchronous continued work: when current Codex execution reaches limit, commit a runnable checkpoint, write next instructions, and stop transparently; future execution must be explicitly started by user.

# 15. NOW EXECUTE — PHASE A FIRST, THEN CONTINUE IF ENVIRONMENT ALLOWS

Read current HEAD and instructions. Implement **Phase A and its complete tests immediately**, followed by Phase B if capacity permits. Do not ask the user to choose a menu of options; choose the next dependency-safe implementation step. Treat this prompt as permission to make ordinary changes/tests/authorized deployment within this repository, but not as permission to bypass platform approval, delete unrelated data, spend money, or use destructive unreviewed actions. Publish working updates to `https://ninon0406.github.io/alltest/` only if allowed and verify actual live behavior. Prioritize truth, working UI, and game continuity within one tab.
