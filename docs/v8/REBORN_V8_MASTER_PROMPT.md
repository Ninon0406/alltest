# REBORN V8 — LIFE IN ELYNDRA
## COMPLETE GAMEPLAY REDESIGN / CODEX IMPLEMENTATION CONTRACT

Repository: `Ninon0406/alltest`
Live site: `https://ninon0406.github.io/alltest/`
Language: Thai for ALL player-facing text.

# 0. THIS IS A NEW TOP-PRIORITY USER DIRECTIVE

You are Codex acting as lead engineer, narrative designer, gameplay director, pixel artist and QA engineer. **Implement the game in the existing repository**, not merely write a proposal. Read actual HEAD, `AGENTS.md`, `docs/NEXT_CODEX_TASK.md`, `ROADMAP.md`, `GAME_DESIGN.md`, `CONTENT_MANIFEST.md`, current tests and V7 documentation, but **this V8 directive supersedes older specifications wherever they conflict**. The user now wants a radically simpler, faster, choice-led fantasy life simulator, broadly analogous in interaction rhythm to a small browser life-sim: start at random birth, watch time advance, pause for consequential life decisions, show small pixel scene and clear status changes, and reach a genuine life ending. Original names, compositions, writing, mechanics, graphics and UI; do NOT clone another game's code, asset sheets, proprietary layout, exact copy or data. The supplied screenshots are usability references, not reusable assets.

**Current assessed baseline (verify on HEAD):** v0.14.0 previously has one-run memory-only state, 20 base/20 promoted careers, 20 canonical locations, pixel asset catalogs, actual progression levels **1–10 only**, 156 authored scenes/events, 359 choices, six genuine endings. Retain working data as needed, but you ARE AUTHORIZED to restructure or replace the old user interface/gameplay shell. Stop spending time completing V7's enormous inventory/dungeon/1000-location backlog before this V8 loop is actually playable.

## NONNEGOTIABLE PRODUCT PILLARS

1. **Choice is the primary gameplay.** Each meaningful fork has 2–5 clear options, consequences, and future callbacks. No generic mandatory choice every month. Routine life is simulated, not micromanaged.
2. **One-screen mobile-first flow.** Pixel scene occupies modest fixed area, age/status at top, timer immediately below, story/choices below. Scrolling isn't necessary to find the main next action on a 360–390px phone when possible. All overlays in the same document.
3. **Age-realistic lives.** A newborn does not choose books, work, martial arts, school, or advanced training. Important opportunities only become available when believable.
4. **Brief individual scenes, rich entire lifetime.** Each scene typically 1–3 short Thai sentences. An uninterrupted peaceful run should be realistically completable in roughly 5–12 minutes; a more ambitious run may take 10–25; the optional full divinity path still requires meaningful engagement >=30 active minutes and age >=1000 years. These are balancing targets, not forced waiting bars.
5. **Original fantasy world.** Story is 70% relaxed slice-of-life/exploration, 20% training/relationships/careers, 10% overarching mysterious world plot. No compelled save-the-world arc.
6. **One Life, One Run.** Never persist active-run GameState. Refresh/new tab restarts at birth. Store only summaries of genuine completed lives (the already implemented archive). Never silently resurrect from old saves.
7. **No fake functionality.** If a subsystem is removed from primary UX, retain archived data if useful, but never show an inert button. Do not claim goals implemented before validation.
8. **Ship incremental runnable vertical slices.** Keep current GitHub Pages method, build, tests, and one-run invariant working after each slice. Prefer coherent implementation to enormous untestable code dumps.

# 1. PRODUCT DESIGN / USER JOURNEY

## Front Page — 'ประตูสู่เอลินดรา'
Display short atmospheric text, "เกิด" primary button, optional "ประวัติชีวิตที่จบแล้ว" and concise rule "รีเฟรช = เริ่มชีวิตใหม่". Avoid stats graphs, fabricated real-world population probabilities, account systems or 20-step creation wizard. Start is one click.

## Birth Reveal
Randomly roll and SHOW clearly: name, race, birthplace, family type, parent/guardian roles, initial household wealth, hidden potential (not revealed yet), starting traits and distinctive pixel portrait. Preserve the existing 20 equal-weight birth archetypes for newly rolled lives. Data must remain consistent with original world, no real country/Thai statistics. Show starting home scene, then one "เริ่มชีวิต" button.

## Main Lifetime Screen — one column on phones
At top: `อายุ 12 ปี 3 เดือน` prominently, `ขอบเขตพลัง Lv. 4/100` and rank subtitle (or `ยังไม่ปลุกพลัง` under 12), gold and health in compact readouts. Four–six mini status bars (สุขภาพ, ความสุข, ความรู้, ความสัมพันธ์, สมาธิ/พลัง) and a small clear `รายละเอียด` panel for expanded stats. Beneath: one crisp 16-bit-style illustrated 320x180 or 480x270 scene with SMALL full-body character sprite anchored into the physical location. Location name and current lifestyle line under art. Beneath: age/time-progress track with 1×/2×/4×/8× speeds, pause and `ข้ามไปเหตุการณ์ถัดไป`; visually animate the progress smoothly. Then decision card (when needed) OR a quiet latest-event log and focus selector. Buttons >=44px, Thai readable >=16px, no huge blank whitespace or cramped desktop-only columns.

## Decision Interruption
When major event due: STOP simulation and any autoplay immediately, show event title, age, location, 1–3 sentence Thai description, optional illustration change, 2–5 actual choices. Each choice presents believable time/cost/stat tradeoff (show exact if known, qualitative if uncertain). Grey unavailable options with a short explanation ONLY if they add value; otherwise omit. After choosing show one short outcome card, floating changes (+/-), and a single `ดำเนินชีวิตต่อ` button. No endless stacked modal dialogs. No phantom age jumps while pending.

## Other panels
`ชีวิต`, `ตัวละคร`, `บันทึกชีวิต`, `แผนที่`, `ประวัติที่จบแล้ว`, `ตั้งค่า` if needed; open as same-document tabs/dialog/drawer. **The map is initially read-only**, showing accurate current canonical location; destination selection and movement happen through story choices only, not clicking random map pins. Don't expose unfinished shop/gear/dungeon tabs in the primary loop. Optional details use collapsible disclosure, never divert away from life story.

## Ending
Show final age, race, realm/power, profession, family/friends, 3–8 impactful past decisions, money, world impact, cause/type of narrative ending and final pixel persona. Save one non-resumable terminal summary; button `เริ่มชีวิตใหม่` and archive. Never save an unfinished/abandoned run as a death.

# 2. AUTHORITATIVE GAME STATE & CLOCK

Only `src/engine/time.js` (or its migrated V8 equivalent) changes simulated elapsed time. Maintain `absoluteDay`, `birthAbsoluteDay`, ageYears, ageMonths, world year, current location, activeFocus, nextMajorDecision, journal, flags, relationships, career, learned skills, power XP/realm, costs and inventory needed by choices. Make power/skills actual state, not UI labels. Use seeded deterministic randomness for content and reproducible tests. DO NOT add active-run storage. Make state changes atomic and guarded by decision/revision token to block duplicate taps.

Use a **month-precise age scheduler**, not naive `age++`: ageYears=floor(elapsedDays/360); ageMonths=floor((elapsedDays%360)/30) or totalMonths=floor(elapsedDays/30), and every event's age window uses the same source. `advanceTime` must halt exactly at eligible major event boundaries; never age 11->14 past the awakening decision. Autoplay halts upon important choices, terminal states, tab hidden, app foreground loss and user navigation if appropriate. Honor reduced motion.

Time progression design:
- 0–12 months: automatically show caregiver-based micro-events at 0/3/6/9/12 months as *observations*; the baby has no direct strategic choices. If player choices appear, frame them as caregiver/guardian decisions, clearly distinguish agency.
- 1–3 years: limited behavior/preferences; no schooling or formal combat. 1–2 milestone choices across this stage at most.
- 4–11 years: 1–2 consequential childhood choices per year, with brief ambient life summaries and optional childhood focus (play, chores, stories, friendship, safe observation).
- 12 years: awakening ceremony, then 8 best currently eligible career recommendations from 20, sorted by fit. If fewer than 8 eligible, show all real eligible options. Include cost-free reachable ordinary pathway. Each option explains aptitude and tradeoff.
- 13–20: training, apprenticeship, school, guild admission, first independent adventures and friendships. 2–4 big decisions across several years, not per month.
- 21–40: profession advancement, money, relationships, personal ambitions. ~3–5 major choices total plus sampled random surprises.
- 41–80: mastery, family, mentoring, legacies, ordinary mortality. ~3–5 major choices. Ordinary runs naturally finish in plausible lifespan windows.
- 81–150, 151–300, 301–500, 501–750, 751–999: ONLY for genuinely long-lived eligible characters; 2–5 meaningful crossroads per era with explicit 10/25/50/100-year time projects; pause at life milestones and risk events. No 1000 manual clicks.
- 1000+: discovered divinity goal, trials, age>=1000, earned Lv.99 and manual final breakthrough to level 100, then deity ending. Never grant it for time alone.

Speed controls affect how quickly **simulated time advances while no decision is pending**, never reduce real choice count and never skip key decision events. Show clear bar fill and its unit (`ปีที่ 7 • ฤดูใบไม้ผลิ`, or `ผ่านไป 6 เดือนจาก 12`). No timer should persist after refresh.

# 3. CHOOSE A LIFE FOCUS — SIMPLE NOT A TRAINING MICROMANAGER

Show exactly 3–5 contextually age-eligible focus cards, not the same 8 across all ages. For example:
- Toddler 1–3: ดูแลจากครอบครัว, เล่นอย่างปลอดภัย, สำรวจรอบบ้านกับผู้ใหญ่.
- Child 4–11: เล่นกับเพื่อน, ช่วยครอบครัว, ฟังเรื่องเล่า/เรียนพื้นฐาน, ทดลองงานช่างอย่างปลอดภัย, ออกกำลังเหมาะกับวัย.
- Student 12–18: ศึกษาเวท, ฝึกกาย, ฝึกงานหาเงิน, สร้างมิตรภาพ, สำรวจใกล้บ้าน.
- Adult: ฝึกวิชาหลัก, ทำงาน, สร้างความสัมพันธ์, ศึกษาความรู้, เดินทางเมื่อมี choice.
- Elder/long-lived: ถ่ายทอดวิชา, เก็บตัวฝึก, ทำกิจการ, ค้นคว้า, สำรวจตามเหตุการณ์.

A focus affects passive time-based gains, encounter weights and future eligibility but **does not instantly grant xp/gold merely on tap**. Explain benefits in simple Thai. Example: วัดความเหมาะสมกับสายเวท 82% -> ordinary practice multiplier 1.25×; off-path practice 0.75× but unlock compensating discoveries. Calibrate and cap to avoid exponential runaway. Do not tie skin/race to superiority. User can switch focus at the next time tick, not lose years with each focus tap.

# 4. STATUS — CLARITY & EFFECTS

Primary stats: Health 0–100, Happiness 0–100, Knowledge, Bonds, Gold, Power Level 1–100. Detailed stats hidden in `ดูรายละเอียด`: STR, DEX, CON, INT, WIS, PER, CHA, stamina, mana, fatigue, skill mastery, affinity, potential, reputation and story flags. **Age and Power Level must be by far the most visually prominent.** Upon a choice, show only the statuses that actually changed and why. Stable colors plus icons and text labels; never color alone. Keep cost/earned comparisons reliable.

20 starting career families already exist: reuse their IDs. At awakening, show top 8 eligible matches only, ranked by actual seeded birth + earned childhood development + seven ritual stages. No classes that fail prerequisites inside recommendation cards. Include alternate low-cost path and later respec through story choices. Fit helps training speed but does not seal destiny.

# 5. POWER PROGRESSION 1–100 — STORY FIRST

Preserve earned V7 levels 1–10 and manual certification; extend through 100 with real time/training/quests/breakthrough gates and tests. Levels 1–99 are mortal or transcendent progression; 100 = actual manually confirmed deity finale. Define 10 original universal realm labels; one career-specific title for each of 20 careers per 10-level band, referencing existing authored titles when available:

01–10 ผู้เริ่มสัมผัสพลัง / ผู้ฝึกหัด
11–20 ผู้ประสานแก่นพลัง
21–30 ผู้เปิดเส้นชีพจร
31–40 ผู้ก่อแก่นวิญญาณ
41–50 ผู้ขัดเกลากฎธรรมชาติ
51–60 ผู้ก้าวพ้นสามัญ
61–70 ผู้ครองวิถีตำนาน
71–80 ผู้ท่องแดนเหนือกาล
81–90 ผู้ประสานฟ้าดิน
91–99 ผู้จารึกกฎแห่งนิรันดร์
100 เทพแห่ง[แนวอาชีพ] (terminal)

Make every successive realm measurably harder: EXP curves with tier multipliers, time costs, mastery and a manual breakthrough story. Lv.90+ requires rare earned milestones, not brute-force spam. Define four thematic visuals (small pulse at 5, orbit at 10, aura colors at 20–40, expanded halo 50–80, ornate constellation 90–99, final transformed deity at 100) and modest alternate effects per career; `prefers-reduced-motion` and 320px performance respected. Never visually reveal a high level not earned.

Lifespan: mundane lifespans plausible by race and circumstances, illness/fatigue/decisions influence outcomes; extension requires actual realm breakpoints and affordable choices, not automatically being immortal. Design specific earned checkpoints near 80/150/300/500/750/1000 years; stop at a legitimate conclusion if requirements are missed, do not soft-lock. No age-1000 guarantee. Endings at Lv.100 require actual age>=1000, explicit opted-in god goal, three substantial vocation-specific trials, discovered lore, 30+ **active interaction minutes** excluding tab-hidden/idle/autoplay-wait and a final player choice. Run a test across all 20 career families for accessibility of the goal; do not fake elapsed active play in production.

# 6. WORLD, PLACE & PIXEL SCENE

Keep existing **20 canonical connected locations and 20 authentic outdoor PNGs** before expanding. Do not construct a larger map with unreferenced fictional pins. World map uses canonical coordinates/relationships, current position, birthplace, discovered areas and legible region labels; map is READ ONLY for movement. Actual travel requires a story choice, e.g., 'ไปเมืองหอสมุด' with duration/cost/rewards and qualitative risk. If risk % cannot be calibrated, say 'ปลอดภัย/เสี่ยงเล็กน้อย/เสี่ยงมาก' rather than invented percentages. Change current location exactly once after actual travel; scene image then changes accordingly. Provide safe stay-home alternative.

Use actual source image files already committed: 20 exterior PNGs, 16 shared contextual interior PNGs, local 16-bit full-body character layers and owned equipment if available. Art selection uses real current location & indoors/outdoors context, not random pictures. Character is small and readable inside the scene. Preserve identity across age, race, family resemblance, garment/career/equipment. Do not generate runtime API images and do not steal assets from the reference site. New artwork may be generated offline ONLY if such a tool is actually available to Codex; otherwise construct original SVG/Canvas procedural pixel assets and commit exported PNG/WebP. Never claim generation where it did not happen.

# 7. LIFE STORY SYSTEM — REAL BRANCHING CONTENT

Use data-driven event schema:
```
{id, ageMinMonths, ageMaxMonths, phase, title, prose, locationIds?, requires?, excludes?, weight?, once?, cooldownMonths?, interrupt:true|false, choices:[{id,label,description,cost?,timeDays?,effects?,flags?,relationship?,followUp?,outcomeText?}]}
```
Choice records must carry real consequences; provide event scheduler deterministic priority: mandatory age moments > follow-up callbacks > contextual encounters > optional ambient summaries. Explicit event triggers may occur during long time-advances; do not skip. Each meaningful fork at least 2 non-equivalent options with nonidentical effects/callbacks. Keep story short on screen yet varied across lifetime. Set flags so an earlier act changes future NPC trust, access, debt, and titles. No repetitive copy/paste choices.

**Phase 1: ship 65–100 NEW, fully playable, measured major-life forks** (in addition to existing truly functional content), then extend to 150+ if meaningful. Do NOT count job/focus/time buttons or name permutations as authored forks. Guarantee 3 substantially distinct 5–12 minute endings from a testable distribution of origin/career policies; preserve 6 older endings if compatible, add 12+ genuinely reachable originals in first release, long-term 100. Make 20 careers all finish ordinary life without forcing Lv100, and at least one long-lived divine path demonstrable after completing its gates.

## SPECIFIC CANONICAL SCENE SCHEDULE & CHOICES

The following are ORIGINAL authored base scenes. Adapt to actual engine age-month boundaries and conditional availability; write Thai outcomes and flags, not just titles. Schedules are eligibility windows; not all scenes appear in each life. Parents are the decision makers during infancy.

### ACT A — เริ่มชีวิต (0–3 years)
A01 month 0: 'บ้านหลังแรก' — guardian chooses to keep baby close at home / stay with relatives / seek community care; affects family support and home context. Child DOES NOT select an action.
A02 month 3: 'เสียงที่คุ้นเคย' — observation of lullaby / family storytelling / quiet sleep; changes attachment flavor, not Power XP.
A03 month 6: 'มือเล็ก ๆ กับโลกใบใหญ่' — safely explore toys / watch nature from caregiver arms / rest; age-appropriate passive narrative.
A04 month 12: 'ก้าวแรก' — caregiver supports gentle walking / lets child learn at own pace / invites familiar family play.
A05 18–30 months: 'เพื่อนตัวเล็ก' — join supervised play / watch from distance / return home; future social confidence.
A06 24–36 months: 'เทศกาลประจำชุมชน' — family visits village festivities / helps prepare at home / stays quietly; introduces first civic friend.

### ACT B — วัยเด็ก (4–11 years)
B01 age 4: 'สวนหลังบ้าน' — tend seeds / observe insects / help decorate home; paths nature, research, craft.
B02 age 5: 'เด็กใหม่ในละแวกบ้าน' — befriend / keep distance / share a simple game; sets peerFlag.
B03 age 6: 'วันแรกของการเรียนรู้' — community classroom / family apprenticeship / home learning; attendance requires access/age and funds if specified, with free option.
B04 age 7: 'กระเป๋าที่ถูกลืม' — return to owner / ask elder to find owner / keep it (leads to suspicion/restitution; no how-to theft instructions).
B05 age 8: 'หนังสือเก่า' — read basics / ask teacher / exchange for another lesson; knowledge routes.
B06 age 9: 'คำชวนจากช่างเดินทาง' — learn craftsmanship / ask for travel stories / remain at home; future mentor/contact.
B07 age 10: 'ความผิดใจของเพื่อน' — apologize / explain patiently / distance self; relationship memories.
B08 age 11: 'ก่อนพิธีปลุกพลัง' — practice focus / community work / rest and prepare; no level XP without actual training time.

### ACT C — จุดเปลี่ยน (12–20 years)
C01 exactly 12: 'พิธีเส้นชีพจร' — seven existing real steps, meaningful ritual responses and saved once-per-life result.
C02 after completion: 'แปดเส้นทางที่เปิดอยู่' — select one of top eight actually eligible base careers with explanation, or free ordinary foundation; not an arbitrary random class.
C03 age 13: 'ทุนและค่าเรียน' — apply scholarship / work to fund study / independent apprenticeship; real cost/conditions.
C04 age 14: 'เพื่อนร่วมฝึก' — cooperative practice / friendly challenge / independent study; support flag.
C05 age 15: 'ข่าวจากเมืองข้างเคียง' — investigate via permitted trip / seek more info / stay home; move only via story.
C06 age 16: 'สัญญาจ้างครั้งแรก' — safe paid work / supervised guild task / concentrate on study; money/time and job effects.
C07 age 17: 'โอกาสที่ต้องตัดสินใจ' — academy / guild / workshop / family trade, filtered by actual eligibility.
C08 age 18: 'คำเชิญจากคนรู้จัก' — join small expedition / ask for training / decline; seeds exploration chain.
C09 age 19: 'คำพูดที่ไม่เป็นจริง' — confront respectfully / seek evidence / disengage; may produce a betrayal flag, not forced drama.
C10 age 20: 'ก้าวแรกของเส้นทางที่เลือก' — commit career / hybrid research / community path; consequences.

### ACT D — เริ่มสร้างชีวิต (21–40 years)
D01 age 22–25: 'งานแรกที่มั่นคง' — regular employment / small business / wandering contracts; wages/risks differ.
D02 age 24–28: 'ร้านเล็กหน้าเมือง' — lease space / partner with family / postpone business; ownership/ledger.
D03 age 25–30: 'เพื่อนเก่ากลับมา' — help / negotiate / decline; changes future network.
D04 age 27–32: 'ข่าวลือเรื่องขุมทรัพย์' — investigate with companion / hire guide / ignore; per-path risks.
D05 age 29–34: 'หนี้เก่าของครอบครัว' — repay fairly / seek mediation / restructure livelihood; debt flag.
D06 age 30–35: 'คนที่เข้าใจกัน' — develop an OPTIONAL age-appropriate adult relationship / remain friends / stay independent; respect boundaries; no mandatory marriage.
D07 age 32–38: 'โครงการของชุมชน' — fund bridge / contribute craft / teach children; reputation and resources.
D08 age 35–40: 'คู่แข่งในอาชีพ' — fair competition / collaborate / avoid rivalry; story branches.
D09 age 36–40: 'การเดินทางเสี่ยงภัย' — safer route / adventurous route / stay home; route and outcome model.
D10 age 40: 'มองย้อนวันแรก' — renew goal / change vocation / settle peaceful life; opens different midlife.

### ACT E — ความเชี่ยวชาญและมรดก (41–80 years)
E01 42–47: 'ศิษย์คนแรก' — mentor / make referral / decline.
E02 46–52: 'ปีที่รายได้ผันผวน' — conserve money / switch jobs / accept a measured risk.
E03 50–55: 'บ้านที่อยากกลับไป' — live with loved ones / renovate home / travel on.
E04 53–60: 'ตำราเล่มที่สอง' — train patiently / share knowledge / sell publishing rights.
E05 55–65: 'ทางแยกของมิตรภาพ' — reconcile / set boundaries / make amends.
E06 60–68: 'คำเชิญแห่งเมืองหลวง' — take post / advise remotely / decline.
E07 65–72: 'สิ่งที่อยากฝากไว้' — school / workshop / peaceful garden / guild legacy.
E08 70–79: 'อายุขัยและการพักผ่อน' — seek safe treatment/rest / pursue sanctioned longevity research / accept ordinary ending.
E09 75–80: 'เสียงเรียกจากตำราโบราณ' — only high-rank eligible path may seek long-life threshold; otherwise ordinary life closure.
E10 80+: 'บทสรุปของคนธรรมดา' — several satisfying terminal branches not automatically “failure”.

### ACT F — ผู้มีอายุยืน (gated)
F01 81–150: 'ต้นไม้ที่เคยปลูก' — train carefully / nurture community / study longevity; consequences over decades.
F02 120–150: 'คนรุ่นใหม่' — become mentor / retire / explore new settlement.
F03 151–300: 'สำนักเล็กและชื่อเสียง' — found school / make tools / protect records.
F04 200–300: 'มรดกของเพื่อน' — honor history / archive / pass stories on.
F05 301–500: 'หอคอยแห่งความทรงจำ' — scholarship / exploration / guardianship paths.
F06 450–500: 'ความเข้าใจใหม่' — actual realm breakthrough choice with earned costs.
F07 501–750: 'เส้นทางที่ไม่มีแผนที่' — reveal major lore via professional craft, not compulsory combat.
F08 700–750: 'เปลี่ยนยุคสมัย' — conserve legacy / evolve institution / seek solitude.
F09 751–999: 'จดหมายจากอดีต' — callbacks to childhood, friends, family or professional actions.
F10 age>=1000: 'ประตูเหนือกาลเวลา' — optional divinity aspiration with real prerequisites and choice.
F11 Lv99, age>=1000, completed trials: 'บทพิสูจน์สุดท้าย' — three vocation-specific substantial trials and final choice.
F12 Lv100: original class-specific god epilogue; alternate retirement/guardian ending if declines.

## CONDITIONAL EVENT POOLS — add at least 40 concretely authored forks, no word-swapped duplicates

Family 1: absent guardian or guardian changes → seek support / community / independence.
Family 2: struggling household harvest → contribute labor / negotiate aid / change work.
Family 3: family craft heirloom → learn / sell / preserve.
Family 4: guardian returns from overseas merchant route → ask about world / work in shop / remain settled.
Family 5: family reunion festival → reconcile / volunteer / stay.
Academic 1: costly school requires actual funds → scholarship / free local school / home learning.
Academic 2: difficult assignment → study / mentor / change subject.
Academic 3: teacher notices talent → train / experiment / avoid extra schedule.
Academic 4: test goes poorly → retry / adapt focus / work instead.
Academic 5: public presentation → present / collaborate / postpone.
Career 1: delayed wages → negotiate / seek alternative / rely on savings.
Career 2: workshop commission → accept limited project / partner / decline.
Career 3: employer asks unfair action → refuse / document / leave.
Career 4: useful contract with hidden costs → read terms / seek advice / decline.
Career 5: rival proposes alliance → accept with safeguards / compete fairly / decline.
Adventure 1: muddy forest road → safe turnaround / pay local guide / explore cautiously.
Adventure 2: storm over the coast → shelter / alternate route / postpone.
Adventure 3: old bridge warning → inspect from safe distance / detour / return.
Adventure 4: missing caravan shipment → ask guild / investigate with guards / stay away.
Adventure 5: strange ruins → record findings / consult scholars / leave intact.
Adventure 6: hostile road encounter → retreat / negotiate / defend abstractly using level/stat model; no graphic harm.
Adventure 7: misleading map seller → request proof / seek trusted guide / decline.
Adventure 8: sudden change in local ecology → help village / study / leave.
Adventure 9: unexpected mentor on the road → practice / listen / refuse.
Adventure 10: traveling companions disagree → mediate / choose cautious plan / travel separately.
Social 1: friendship invitation → accept / set boundaries / postpone.
Social 2: fellow student needs aid → share notes / offer time / decline.
Social 3: rumor about character → clarify / ask ally / ignore.
Social 4: adult partnership offer → discuss goals / maintain friendship / decline.
Social 5: family disagreement → talk / seek mediator / make independent plans.
Business 1: market demand surge → increase work / build inventory / keep stable prices.
Business 2: customer disputes quality → refund / repair / mediation.
Business 3: partnership risk → review books / small trial / refuse.
Business 4: merchant route opens → send goods with safe courier / invest / wait.
Business 5: festival stall → rent / share stand / volunteer.
Mystery 1: ancient inscription → take copy / consult scholar / leave.
Mystery 2: a dream about world veins → journal / study / dismiss.
Mystery 3: an old map detail matches childhood memory → research / ask family / ignore.
Mystery 4: power resonance at seasonal change → pause and study / supervised practice / rest.
Mystery 5: relic keeper offers a story → listen / barter stories / move on.

Each pool item above needs original Thai 1–3 sentence prose, 3 truly different authored options, preconditions, exact effects/callbacks, a cooldown/once rule and valid location/age. Expand within the 20 career families with at least TWO additional unique branches per family (40 more), depending on character skill and location. Reuse the existing 60 career arcs where valid. Expose risk without teaching real-world wrongdoing; fictional theft/betrayal can have abstract reputation/legal consequences, no procedural real-world crime instructions.

# 8. STORY BRANCH DIVERSITY / MINIMUM CONTENT ACCEPTANCE

Required first V8 release after redesign:
- True fast playable birth-to-ordinary-ending on 5+ diverse seeds.
- 3 visibly distinct birth backgrounds with mechanically different choices and at least three genuinely different ordinary endings.
- 20 real career families preserved, 8 recommendations max, free ordinary path.
- 65+ implemented playable new story moments and 150+ actual new choice records, measured after compilation; conditional pools/career branches as next slices.
- At least one age-appropriate romance option for **adult** characters and equally meaningful platonic/independent options.
- At least one short encounter that safely resolves via negotiate/retreat/defend with actual effects.
- A coherent noncombat life for poor, unawakened or low-stat characters.
- Pixel scene changes for birth/home, school, academy, guild, shop, forest, travel and relevant canonical locations using existing original assets.
- No dead controls, no reference to real Thai provinces/statistics or ungrounded percentages.

Long-term 100+ substantially different branching arcs, 100 endings and 1–100 power are goals that must be implemented in staged verified slices, not shipped as fake labels in the first run. In first V8 phase if necessary keep earned 1–10 truthful and hide future unavailable higher levels rather than making them appear accessible. The whole project is 'complete' only after all target stages are measured.

# 9. NARRATIVE STYLE

Every new player-facing scene must be short, natural Thai, low exposition. Example original vignette:

**วัย 7 ปี — กระดิ่งหน้าร้านเก่า**
"ตอนเดินผ่านตลาด คุณเห็นช่างประจำเมืองกำลังซ่อมกล่องดนตรี เสียงเบาจากข้างในทำให้คุณหยุดมอง เขาเงยหน้าขึ้นและชวนให้ช่วยแยกชิ้นส่วนที่ปลอดภัย"
A. "นั่งเรียนรู้กับช่าง" → real supervised time, craft affinity, positive mentor flag.
B. "ขอฟังเรื่องที่มาของกล่อง" → knowledge/cultural note, unlock storyteller follow-up.
C. "ไปหาเพื่อนที่ตลาด" → bonds and different future meeting.

**วัย 18 ปี — สัญญาหนึ่งฤดู**
"กิลด์ประกาศรับผู้ช่วยจัดสัมภาระสำหรับคาราวานไปเมืองใกล้เคียง ค่าตอบแทนพอซื้อหนังสือได้หลายเล่ม แต่ถนนสายนั้นเพิ่งเจอพายุ"
A. "รับงานพร้อมเส้นทางปลอดภัย" → wage, more time, lower uncertainty.
B. "ขอให้เพื่อนร่วมเดินทางช่วยตรวจเส้นทาง" → conditional bonds, cost/reward.
C. "ปฏิเสธและฝึกต่อในเมือง" → no travel, different XP.

**วัย 52 ปี — ห้องเรียนเล็ก**
"ศิษย์ฝึกงานรุ่นใหม่มาขอคำแนะนำ คุณนึกถึงวันที่ตนเคยยืนรอหน้าห้องเดียวกัน"
A. "เปิดสอนทุกสัปดาห์" → time cost, mentor reputation.
B. "เขียนคู่มือให้ชุมชน" → knowledge/legacy.
C. "พักรักษากำลัง" → recovery/happiness.

The genre touches familiar cultivation and fantasy-rebirth concepts but must not reproduce settings, named characters, unique power systems, plot points or passages from any manga/anime. Keep choices meaningful rather than melodramatic; long lore belongs in optional journal and codex, not blocking screens.

# 10. IMPLEMENTATION CUTOVER STRATEGY

A full UX redesign is authorized, but **not a destructive rewrite of the repository**. Implement a coherent V8 engine shell with an explicit separation of simulation, story scheduler, content, art and UI. Retire or hide legacy complex pages if necessary; preserve their source under existing modules until migration passes and keep tests that protect genuine choices. Reuse authoritative 360-day calendar, `advanceTime`, seeded birth generators, character renderer, realm 1–10, career eligibility, 20 world nodes, actual PNG assets, one-run memory-only infrastructure and terminal archive. Do not reintroduce old active saves. V7 authored stories may be reused only where age/flags fit; no forced 7-step ritual UI if a concise dialogue flow can represent its real steps without rerolling.

### Suggested modules (match actual repo)
- `src/engine/v8-story-scheduler.js` — event priorities, eligibility, pause-at-decision.
- `src/engine/v8-life-loop.js` — focus/ticks/auto speeds, age gates.
- `src/data/v8-life-events.js` and split per era — authored content.
- `src/ui/v8-dashboard.js` — life screen, avatar/scene/age/power/status.
- `src/ui/v8-decisions.js` — decision cards/outcome.
- `src/ui/v8-timeline.js` — smooth timer controls.
- `src/ui/v8-birth.js` — original birth summary.
- `src/ui/v8-finale.js` — terminal archive/epilogue.
- `src/data/v8-realms.js` — rank names/gates.

Do not force exact module names if current architecture offers cleaner integration; maintain stable IDs and testability. For any changes in state version, preserve gameplay under a single session; only completed archive data persists. Never count procedural image combinations as separately hand-authored location scenes.

# 11. PHASED DELIVERY — PRIORITIZE PLAYING FEEL

**Phase 0: audit existing state** — inspect current modules, compare old vs V8, document precise cutover. Do not spend entire run planning.

**Phase 1: 'PLAYABLE V8 CORE' — MOST IMPORTANT**
- New one-screen design: birth reveal, clear age & active status, pixel stage, time bar and 1/2/4/8x buttons, stop-at-decision card, outcome and continue.
- New age-appropriate focus set; remove nonsensical infant choice actions.
- Full quick ordinary lifespan loop incl. real 3 endings, no false saves, functioning archive, responsive 320–1920, five seeded end-to-end runs.
- Keep existing power 1–10 accurate while reworking UI. Do not block on 1–100 scope.
- Deploy a working site if authorized, verify public CSS/JS/real flow.

**Phase 2: 'RICH STORIES'**
- Implement at least 65 meaningful new V8 events/150 choices from above, then 40 career-specific forks and callback tests.
- Age 12 awakening and top-eight matching career choice; adult family/occupation story; passive focus.
- Enough conditional stories to feel different on multiple seeds; avoid repetitive copy.

**Phase 3: 'WORLD & ADVANCEMENT'**
- Canonical contextual travel from choices, risk model and outcome branches, correct scene change.
- Extend power levels 11–40 in verified manual realms, rank titles per career, visual auras with real state.
- Add 2–3 relevant paid services/ownership options only when a story choice uses them.

**Phase 4: 'LONG LIFE'**
- Power 41–99/real longevity checkpoints, era/time projects and explicit rare progress gates; no slow spam.
- Optional divine goal, 3 vocation-specific trials, age >=1000, 30+ active interaction minutes, Lv100 final, 20 career-specific epilogues.
- 100 actual branches and at least 30 genuinely different reachable life endings, then build toward 100.

**Phase 5: 'FINAL RELEASE'**
- ≥100 endings, actual cross-career playthrough tests, enough varied scenes to avoid obvious looping; real 20-career replay simulation.
- Comprehensive polish, performance, accessibility, broken imagery, duplicate clicks, good Thai rendering.

At END OF EACH RUN: update `docs/NEXT_CODEX_TASK.md` with: checkpoint, what actually works, test commands/results, files touched, genuine content counts and the NEXT concrete coding action. If a run runs out of time, commit coherent runnable partial work and state precisely what did not finish. Do not promise continuing autonomously without a new job/available execution window.

# 12. TESTING — MUST PASS, NOT JUST COMPILE

- Unit: time ticks/ageMonths, pause exactly at decision, deterministic seeded choices, teen jobs/age legality in fantasy setting, no infant reading or work, optional no-power path, career list max eight eligible, power can't be granted by tap, risk cost charged once, custom location image vs canonical location, no stale multi-click effects, non-resumable refresh/new-tab, archive only for authentic endings.
- E2E: 320/360/390/768/1024/1366/1920 widths, no horizontal overflow, main action visible, controls work, scene decoded, no missing CSS, focus switch, x8 clock, interruption, three distinct endings, archive non-resumable, no broken keyboard dialog, reduced motion.
- Temporal/Monte Carlo: at least 100 seed simulations; check that routine short runs reach endings (rather than everybody forced into 1000 years), meaningful forks vary, no stuck ages/soft locks, at least one career for every origin. Report observed run length without inventing real-life measured averages.
- Content graph: all required scene IDs unique, choices point to actual valid events, no unavailable choice displayed as active, no duplicate counted 'forks', no dead branches; true authored and reachable counts in `CONTENT_MANIFEST.md`.
- Performance: no runtime generative images, locally stored image assets, lazy-load relevant scenes, mobile frames responsive, offscreen tab auto-stop.
- Validate with actual project commands: `npm ci`, `npm test`, `npm run content`, `npm run build`, `node scripts/stage-site.mjs`, `npm run test:e2e`, and appropriate production verifiers; inspect generated asset URL paths under `/alltest/` and published pages when possible.

Repository publishing rule: edit `app.html`, `src/`, `public/` sources; root `index.html`, `assets/`, `art/` are generated GitHub Pages compatibility files, so do not hand edit. Build & stage using existing scripts. Preserve previous hashed assets for browsers caching older HTML. If GitHub Pages source settings can't be changed due to permission limits, leave settings and use existing working publication method. Do not claim page was verified without an actual browser/network test.

# 13. THE EXECUTION INSTRUCTION

Start implementing **Phase 1** immediately. Do not respond with theory alone. Edit real files, run tests, fix failures, generate build and stage artifacts. Continue subsequent phases when feasible while protecting a working site. If you cannot achieve the entire 100-level, 100-ending game in a single Codex run, deliver a genuinely playable V8 vertical slice **first** and record the exact next task. Do not mark entire V8 completed without functionality and reachability evidence.
