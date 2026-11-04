---
name: godseed-combat-vfx
description: Use for GODSEED turn-based combat rules, battle state machines, enemy intents, target selection, status effects, spell particles, composition-based visual effects, and battle acceptance tests.
---

# GODSEED Turn-Based Combat + Procedural Spell VFX

## Battle state machine
`ENTER → PLAYER_SELECT → VALIDATE_ACTION → CAST_ANIMATION → APPLY_EFFECTS → RESOLVE_STATUS → CHECK_END → ENEMY_INTENT/ACT → RESOLVE_STATUS → CHECK_END → PLAYER_SELECT → EXIT`
Transitions are explicit, one active action at a time, no asynchronous race/double cast. Don't couple battle logic to Phaser animation frames. VFX can complete/skip without changing game outcome.

## Player choices
- Four equipped spell slots; visible MP cost, target, cooldown/status, disabled reason
- `ITEM`, `GUARD`, `ESCAPE` and `SURRENDER` only when battle encounter allows; forbidden actions must explain reason instead of looking clickable
- Spell effects must actually execute: damage/heal/shield/status, target rules, reactions and resource spending
- Battle enemy readable health/status and telegraphed intent whenever fair; avoid excessive screen shake
- Defeat path meaningful and recoverable according to chapter design; avoid permanent dead end without owner instruction

## Balancing model
Represent damage/heal/cost/reactions via typed pure functions; use bounded numbers and invariant checks: 0≤HP≤maxHP, 0≤MP≤maxMP, guard status, no negative cost. Seeded combat RNG in state for deterministic replay. Don't claim balanced without encounter simulations with logged results.

## VFX grammar
Define `VfxDescriptor` generated from legal recipe:
```
{ core: palette/texture/emitter; form: orb|beam|ring|rain|...;
  modifier: split|home|shield|heal|...;
  intensityTier; durationMs; reducedMotionVariant }
```
Each combination maps to **structurally distinct** effect: shape, trajectory, spawning, timing and contact event, not only hue. Compose from reusable particles/geometry; cache atlases and pools, cap particle count per hardware tier. Sprite animation, hit reaction, status icon and short result captions reinforce readability.

## Render stages per cast
`charge (0.2–0.6s) → travel/shape → impact → resolved status → UI numbers → end`; duration tunable and skip safe. Respect `prefers-reduced-motion`, sound toggle, low-power visual presets. Light effects must not flash rapidly; saturated effect is short and locally focused.

## Enemy AI behavior
Not generative LLM: deterministic weighted intent tables conditioned on HP/status/player action/history. 3 initial enemy archetypes + boss in chapter one, each with at least one distinct decision rule, counterplay clue, and attack cue.

## Quality gates
- Player can reach battle, cast each starter spell, guard, item, escape where allowed, and return to story
- Every legal spell generates syntactically valid VFX descriptor; catalog/render sample spells across all cores/forms/modifiers
- No stuck overlay/animation lock after `skip`, loss, resize, tab background/foreground
- Battle tests prove valid turn order, MP constraints, heal caps, status expiry, RNG reproduction, win/loss/escape outcomes
- Record real in-browser screenshots/video if tooling allows and label unverified hardware testing honestly
