# Single-enemy combat balance — 0.4.0

Canonical encounter values unchanged: B01 HP42/power7/FIRE×1.2, alternating attack/guard; practice HP35/power5/no elemental weakness, attacking each turn. New craft XP10, practice first win XP5+potion1, B01 first win XP12+bloom1; repeat wins give no extra rewards. XP does not grant level stats yet.

Accuracy: SEEK always lands; other offensive spells have95% base hit, reduced10 percentage points by caster VEIL. ROOTED removes target's5% base evasion. BASIC_PULSE remains guaranteed and free. Status chance35%, SWIRL adds15 points, cap85%; no extra enemy-status RNG for HEAL/GUARD. All randomness uses saved seed/counter. Damage per hit uses focus10, finite nonnegative defense and max999; SPLIT and repeat ECHO use two60% hits. PIERCE halves the guard contribution; GROUNDED reduces impact by2.

SEAR2 does no immediate extra tick on application, then3 damage on each of the next two full actions; refreshes reset duration, not intensity. FIRE+WET multiplies once per landed cast by1.2 and consumes an extra wet duration. WET+WIND skips that immediate enemy action once, representing reduced speed in this single-actor turn model; this is not a general speed-stat/ATB system. GROUNDED on offensive Earth protects its target; support Earth protects player. BLOOM+ground restores caster MP3. WATER+root heals caster HP3. LIGHT dispels enemy VEIL even if the attack later misses. SHADOW+GLEAM dispels/prevents new VEIL for that cast. Enemy RESONANCE is a vulnerability mark for the next offensive player spell; consume it once before any chance to reapply. Repeat ECHO produces two reduced hits. Defensive fields last two enemy phases.

# # Reproducible regression: tests/balance.test.ts

Each row runs seeds1..100, actual authored ingredient collection/crafting. Only the explicitly labelled zero-MP scenario sets MP0 in a controlled negative fixture. Assertions require a victory route/reward, HP>0 and completion before30 turns. All600 runs win; no losses or unfinished battles.

| Encounter | Policy | Runs | Maximum turns | Minimum ending HP |
| --- | --- | ---: | ---: | ---: |
| Training | Story-crafted WIND, GUARD when MP low |100|2|95|
| Forest | Story-crafted WIND, GUARD when MP low |100|3|93|
| Training | Story-crafted support-only BLOOM, BASIC_PULSE |100|9|60|
| Forest | Story-crafted support-only BLOOM, BASIC_PULSE |100|14|51|
| Training | Explicit0MP fixture, WIND/GUARD |100|6|83|
| Forest | Explicit0MP fixture, WIND/GUARD |100|8|78|

This establishes early-loop reachability and low-resource escape from a power lock, not a claim of final strategic difficulty, boss balance, every policy being winning, or measured human50/50 playtime. Multiple enemies/party members, mastery, boss phases and disable immunity remain future work. All234 recipes resolve a finite one-turn fixture test; later-element fixtures do not imply story availability.


## 0.4.0 B02_STREAM_WISP

SSOT values:52 HP, power8, WIND×1.2. Splash attacks on normal turns. At≤26 HP on an even selection phase, a no-damage mist is announced. If the enemy survives and is not slowed, mist applies VEIL1 to the player; it survives that enemy phase and expires after the next player action. Intent is captured before the player acts, so crossing the HP threshold cannot change an announced splash. BASIC/SEEK remain reliable counters. Victory grants14 XP and Water1 once; no forest/practice flags or rewards. Flee/recovery use S11.

Independent verbose run: `npx --prefix GODSEED vitest run GODSEED/tests/balance.test.ts --reporter=verbose --silent=false`. Nine policies,900 victories,0 losses/unfinished:600 authored starts and300 explicit MP0 fixtures. Original six rows above unchanged. New rows each use seeds1–100:

| Encounter | Policy | Runs | Maximum turns | Minimum ending HP |
| --- | --- | ---: | ---: | ---: |
| Stream | Actual WIND/GUARD |100|3|84|
| Stream | Actual support-only BLOOM/BASIC |100|13|28|
| Stream | Explicit MP0 WIND/GUARD |100|8|59|

These establish viability rather than final human pacing/difficulty. Browser routes separately discover and use WATER_RING_HEAL and ECHO_ORB_LINGER through real materials. No stats progression, mastery or new recipe definitions were added.
