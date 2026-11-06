import {describe,it,expect} from 'vitest';
import {fresh,schema,type State} from '../src/engine/state';
import {createBattle,fight,scoutAvailability,statusSummary,statusHelp} from '../src/systems/combat';
import {encodeSave,decodeSave,validateSaveState} from '../src/engine/save-file';
import {hasPathAbility} from '../src/systems/life-paths';
import type {EncounterId} from '../src/content/encounters';

// Boundary fixtures contain every authored prerequisite, rather than an XP shortcut.
const explorer={lp_explorer_started:true,lp_explorer_surveyed:true,lp_explorer_marked:true,lp_explorer_rank1:true,lp_explorer_trial_passed:true,lp_explorer_rank2:true};
const nature={lp_nature_started:true,lp_nature_source_found:true,lp_nature_watered:true,garden_tended:true,lp_nature_rank1:true,lp_nature_trial_passed:true,lp_nature_rank2:true};
function battle(id:EncounterId='BT_TRAINING',flags:Record<string,boolean>={}){
 const s=fresh('ผู้เรียนรู้จังหวะ',1);s.flags={...flags};s.scene=id==='BT_TRAINING'?'S04_KORO':id==='B01_FOREST_SPROUT'?'S09_FOREST':'S15_RUINS';
 s.known=['SPELL_WIND_ORB_AMPLIFY','SPELL_WIND_ORB_SEEK','SPELL_WIND_WARD_LINGER','SPELL_WATER_ORB_HEAL'];s.equipped=[...s.known];
 s.battle=createBattle(id,s.scene,id==='BT_TRAINING'?'S04_KORO':id==='B01_FOREST_SPROUT'?'S10_FOREST_RESULT':'S16_RUINS_RESULT');
 return schema.parse(s);
}
function equip(s:State,id:string){s.known=[id];s.equipped=[id];return s;}

describe('Explorer: one deliberate setup turn, not free damage',()=>{
 it('rejects unlearned/rank-one/low-MP scouting without mutating the snapshot',()=>{
  const untrained=battle(),rank1=battle('BT_TRAINING',{...explorer,lp_explorer_rank2:false}),low=battle('BT_TRAINING',explorer);low.mp=3;
  for(const s of [untrained,rank1,low]){const before=structuredClone(s);expect(scoutAvailability(s).enabled).toBe(false);expect(()=>fight(s,'SCOUT')).toThrow();expect(s).toEqual(before);}
  expect(scoutAvailability(untrained).reason).toContain('ระดับ 2');expect(scoutAvailability(low).reason).toContain('4 MP');
 });
 it('spends exactly4MP, deals no damage, takes the enemy turn and preserves2 fresh turns',()=>{
  const s=battle('B03_RUIN_SENTINEL',explorer),before=structuredClone(s),out=fight(s,'SCOUT');
  expect(s).toEqual(before);expect(out.mp).toBe(36);expect(out.hp).toBe(90);expect(out.battle!.enemyHp).toBe(66);expect(out.battle!.turn).toBe(2);
  expect(out.battle!.playerStatus.TRAIL_FOCUS).toBe(2);expect(out.battle!.pathActions).toEqual({scouted:true});expect(out.xp).toBe(0);expect(out.rewarded).toEqual([]);
  expect(statusSummary(out.battle!.playerStatus)).toContain('เพ่งจังหวะ · 2 เทิร์น');expect(statusHelp.TRAIL_FOCUS).toContain('เกราะพื้นดิน');
 });
 it('cannot scout a second time even after focus expires, but a new encounter resets use',()=>{
  let s=fight(battle('B03_RUIN_SENTINEL',explorer),'SCOUT');s=fight(fight(s,'GUARD'),'GUARD');
  expect(s.battle!.playerStatus.TRAIL_FOCUS).toBeUndefined();expect(scoutAvailability(s).reason).toContain('ไปแล้ว');const before=structuredClone(s);expect(()=>fight(s,'SCOUT')).toThrow();expect(s).toEqual(before);
  const next=fight(s,'FLEE');next.battle=createBattle('B03_RUIN_SENTINEL','S15_RUINS','S16_RUINS_RESULT');expect(next.battle.pathActions).toBeUndefined();expect(fight(next,'SCOUT').battle!.playerStatus.TRAIL_FOCUS).toBe(2);
 });
 it('guarantees the next offensive hit through veil and ward while flat grounded armor remains',()=>{
  const s=fight(battle('B03_RUIN_SENTINEL',explorer),'SCOUT');s.seed=15360;s.rng=0;s.battle!.playerStatus.VEIL=1;s.battle!.status={RUNE_WARD:2,GROUNDED:2};
  const control=structuredClone(s);delete control.battle!.playerStatus.TRAIL_FOCUS;
  expect(fight(control,'SPELL_WIND_ORB_AMPLIFY').battle!.enemyHp).toBe(66); // Fixed RNG misses under veil.
  const focused=fight(s,'SPELL_WIND_ORB_AMPLIFY');expect(focused.battle!.enemyHp).toBe(44); // 24 minus2 armor, no ward reduction.
  expect(focused.battle!.playerStatus.TRAIL_FOCUS).toBeUndefined();expect(focused.battle!.status.GROUNDED).toBe(1);expect(focused.battle!.pathActions!.scouted).toBe(true);
 });
 it('bypasses the forest curl rather than changing enemy intent',()=>{
  const s=fight(battle('B01_FOREST_SPROUT',explorer),'SCOUT');expect(s.battle!.turn).toBe(2);
  const control=structuredClone(s);delete control.battle!.playerStatus.TRAIL_FOCUS;
  expect(fight(control,'SPELL_WIND_ORB_AMPLIFY').battle!.enemyHp).toBe(30);
  const out=fight(s,'SPELL_WIND_ORB_AMPLIFY');expect(out.battle!.enemyHp).toBe(18);expect(out.hp).toBe(s.hp);expect(out.battle!.log).toContain('ต้นอ่อนหุบใบป้องกัน');
 });
 it('completes existing PIERCE guard penetration without ignoring armor',()=>{
  const s=equip(fight(battle('B03_RUIN_SENTINEL',explorer),'SCOUT'),'SPELL_WIND_ORB_PIERCE');s.battle!.status.RUNE_WARD=2;
  const plain=structuredClone(s);delete plain.battle!.playerStatus.TRAIL_FOCUS;
  expect(fight(plain,'SPELL_WIND_ORB_PIERCE').battle!.enemyHp).toBe(52); // Existing half-penetration:14.
  expect(fight(s,'SPELL_WIND_ORB_PIERCE').battle!.enemyHp).toBe(48); // Focus ignores guard:18.
  s.battle!.status.GROUNDED=2;expect(fight(s,'SPELL_WIND_ORB_PIERCE').battle!.enemyHp).toBe(50);
 });
 it('support leaves one remaining opportunity, then a spell consumes focus',()=>{
  let s=fight(battle('B03_RUIN_SENTINEL',explorer),'SCOUT');s.hp=50;
  s=fight(s,'SPELL_WATER_ORB_HEAL');expect(s.battle!.playerStatus.TRAIL_FOCUS).toBe(1);expect(s.hp).toBeGreaterThan(50);
  s.battle!.status.RUNE_WARD=2;s=fight(s,'SPELL_WIND_ORB_AMPLIFY');expect(s.battle!.enemyHp).toBe(42);expect(s.battle!.playerStatus.TRAIL_FOCUS).toBeUndefined();
 });
 it('two support/basic turns expire focus without giving basic attacks its benefit',()=>{
  let s=fight(battle('B03_RUIN_SENTINEL',explorer),'SCOUT');s.battle!.status.RUNE_WARD=2;
  s=fight(s,'BASIC_PULSE');expect(s.battle!.enemyHp).toBe(64);expect(s.battle!.playerStatus.TRAIL_FOCUS).toBe(1);
  s=fight(s,'SPELL_WIND_WARD_LINGER');expect(s.battle!.playerStatus.TRAIL_FOCUS).toBeUndefined();expect(s.battle!.pathActions!.scouted).toBe(true);
 });
});

describe('Nature: first guard only, preserving stronger shields',()=>{
 it('absorbs the first two enemy actions and cannot regenerate on repeated guard',()=>{
  let s=fight(battle('BT_TRAINING',nature),'GUARD');expect(s.hp).toBe(100);expect(s.battle!.shield).toBe(5);expect(s.battle!.shieldTurns).toBe(1);expect(s.battle!.pathActions).toEqual({rootGuardUsed:true});
  s=fight(s,'BASIC_PULSE');expect(s.hp).toBe(100);expect(s.battle!.shield).toBe(0);expect(s.battle!.shieldTurns).toBe(0);
  s=fight(s,'GUARD');expect(s.hp).toBe(97);expect(s.battle!.shield).toBe(0);
 });
 it('does not weaken or refresh a stronger spell shield, and still spends the first-guard use',()=>{
  const s=battle('BT_TRAINING',nature);s.battle!.shield=20;s.battle!.shieldTurns=1;
  let out=fight(s,'GUARD');expect(out.hp).toBe(100);expect(out.battle!.shieldTurns).toBe(0);expect(out.battle!.shield).toBe(0);expect(out.battle!.pathActions!.rootGuardUsed).toBe(true);
  out=fight(out,'GUARD');expect(out.hp).toBe(97);expect(out.battle!.shield).toBe(0);
 });
 it('raises a weaker shield to8 and uses enemy-action lifetime even on a no-attack turn',()=>{
  const weak=battle('BT_TRAINING',nature);weak.battle!.shield=3;weak.battle!.shieldTurns=1;
  expect(fight(weak,'GUARD').battle).toMatchObject({shield:5,shieldTurns:1});
  const equal=battle('BT_TRAINING',nature);equal.battle!.shield=8;equal.battle!.shieldTurns=1;
  expect(fight(equal,'GUARD').battle).toMatchObject({shield:5,shieldTurns:1});
  const curl=battle('B01_FOREST_SPROUT',nature);curl.battle!.turn=2;
  const out=fight(curl,'GUARD');expect(out.hp).toBe(100);expect(out.battle).toMatchObject({shield:8,shieldTurns:1,turn:3});
 });
 it('allows both studied paths without overwriting either once-per-battle marker',async()=>{
  const scouted=fight(battle('BT_TRAINING',{...explorer,...nature}),'SCOUT');
  const guarded=fight(scouted,'GUARD');expect(guarded.battle!.pathActions).toEqual({scouted:true,rootGuardUsed:true});expect(guarded.battle!.playerStatus.TRAIL_FOCUS).toBe(1);
  const loaded=(await decodeSave(await encodeSave(guarded))).state;expect(loaded).toEqual(guarded);expect(fight(loaded,'SPELL_WIND_ORB_AMPLIFY')).toEqual(fight(guarded,'SPELL_WIND_ORB_AMPLIFY'));
 });
});

describe('additive path save validation and old untrained behavior',()=>{
 it('round-trips fresh focus, expiry and spent uses without automatic recovery',async()=>{
  const s=fight(battle('B03_RUIN_SENTINEL',explorer),'SCOUT');const restored=(await decodeSave(await encodeSave(s))).state;expect(restored).toEqual(s);
  const expired=fight(fight(restored,'GUARD'),'GUARD');expect((await decodeSave(await encodeSave(expired))).state).toEqual(expired);expect(()=>fight(expired,'SCOUT')).toThrow();
 });
 it('rejects wrong owners, missing expenditure, invalid durations and malformed path-action data',()=>{
  const s=fight(battle('B03_RUIN_SENTINEL',explorer),'SCOUT'),b=s.battle!;
  const invalid=[
   {...s,battle:{...b,status:{TRAIL_FOCUS:1}}},
   ...[0,3].map(turns=>({...s,battle:{...b,playerStatus:{TRAIL_FOCUS:turns}}})),
   {...s,battle:{...b,pathActions:undefined}},
   {...s,battle:{...b,pathActions:{scouted:false}}},
   {...s,battle:{...b,pathActions:{scouted:1}}},
   {...s,battle:{...b,pathActions:{scouted:true,unknown:true}}},
   {...s,battle:{...b,pathActions:{scouted:true,rootGuardUsed:true}}},
   {...s,flags:{}},
  ];
  for(const value of invalid){expect(schema.safeParse(value).success).toBe(false);expect(()=>validateSaveState(value)).toThrow();}
  const untrained=battle();expect(schema.safeParse({...untrained,battle:{...untrained.battle,pathActions:{rootGuardUsed:true}}}).success).toBe(false);
 });
 it('accepts legitimate partial courses but rejects rank claims without foundation or trial',()=>{
  expect(schema.safeParse(battle('BT_TRAINING',{lp_explorer_started:true,lp_explorer_surveyed:true})).success).toBe(true);
  expect(schema.safeParse(battle('BT_TRAINING',{...explorer,lp_explorer_rank2:false,lp_explorer_trial_passed:false})).success).toBe(true);
  for(const flag of ['lp_explorer_started','lp_explorer_surveyed','lp_explorer_marked','lp_explorer_rank1','lp_explorer_trial_passed']){
   const invalid={...battle('BT_TRAINING',explorer),flags:{...explorer,[flag]:false}};expect(hasPathAbility(invalid,'TRAIL_FOCUS')).toBe(false);expect(schema.safeParse(invalid).success).toBe(false);
  }
 });
 it('preserves an older untrained snapshot exactly without inventing optional fields',async()=>{
  const s=battle();expect(schema.parse(s)).toEqual(s);expect((await decodeSave(await encodeSave(s))).state).toEqual(s);expect(Object.hasOwn(s.battle!,'pathActions')).toBe(false);
  const log=['ตั้งรับ ลดแรงโจมตี 40% และฟื้น MP 6','ภูตฝึกเวทจำลอง โจมตี 3'];
  expect(fight(s,'GUARD')).toEqual({...s,revision:s.revision+1,hp:97,journal:log,battle:{...s.battle,turn:2,log}});
 });
});
