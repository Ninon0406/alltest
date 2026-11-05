import {createHash} from 'node:crypto';
import {describe, expect, it} from 'vitest';
import {decodeSave, encodeSave} from '../src/engine/save-file';
import {fresh, legacySchema, schema, type State} from '../src/engine/state';
import {choose, craft, fight} from '../src/systems/game';
import {allSpells, byId} from '../src/systems/spells';

function tutorial() {
 let state=fresh('ผู้ทดสอบ',1);
 for(const choice of ['CH0001','CH0101','CH0202','CH0401'])state=choose(state,choice);
 return state;
}
function forest() {
 let state=craft(tutorial(),'WIND','ORB','SEEK');
 for(const choice of ['CH0205','CH0801','CH0901'])state=choose(state,choice);
 return state;
}
function training() {
 let state=craft(tutorial(),'WIND','ORB','SEEK');
 for(const choice of ['CH0202','CH0404'])state=choose(state,choice);
 return state;
}
function winWithPulse(initial:State) {
 let state=initial;
 for(let turns=0;state.battle&&turns<20;turns++)state=fight(state,'BASIC_PULSE');
 expect(state.battle).toBeUndefined();
 return state;
}
// Controlled combat fixtures unlock later ingredients/spells; these are not claims
// that the current story slice exposes all 234 recipes to players.
function withSpell(initial:State,id:string) {
 const state=structuredClone(initial);
 state.known=[id];state.equipped=[id];state.rng=0;state.seed=1;
 return state;
}

describe('authored encounter identity and recovery',()=>{
 it('Koro starts a 35 HP practice enemy that attacks on every turn',()=>{
  const initial=training();
  expect(initial.battle).toMatchObject({id:'BT_TRAINING',enemyHp:35,checkpoint:'S04_KORO',next:'S04_KORO'});
  const first=fight(initial,'BASIC_PULSE');
  const second=fight(first,'BASIC_PULSE');
  expect([first.hp,second.hp]).toEqual([95,90]);
  expect(second.battle).toMatchObject({enemyHp:27,turn:3});
  expect(initial.hp).toBe(100);
 });
 it('forest starts with 42 HP and alternates an attack with a guard turn',()=>{
  const initial=forest();
  expect(initial.battle).toMatchObject({id:'B01_FOREST_SPROUT',enemyHp:42,checkpoint:'S09_FOREST'});
  const first=fight(initial,'BASIC_PULSE');
  const second=fight(first,'BASIC_PULSE');
  expect([first.hp,second.hp]).toEqual([93,93]);
 });
 it('flee and practice surrender return to their own checkpoints without rewards',()=>{
  for(const action of ['FLEE','SURRENDER']){
   const initial=training(),result=fight(initial,action);
   expect(result.scene).toBe('S04_KORO');expect(result.battle).toBeUndefined();
   expect(result.ticks).toBe(initial.ticks+1);expect(result.xp).toBe(initial.xp);
   expect(result.rewarded).toEqual([]);
  }
  const result=fight(forest(),'FLEE');
  expect(result.scene).toBe('S09_FOREST');expect(result.battle).toBeUndefined();
  expect(()=>fight(forest(),'SURRENDER')).toThrow();
 });
 it('loss and retry remember the authored checkpoint of either encounter',()=>{
  for(const [initial,checkpoint] of [[training(),'S04_KORO'],[forest(),'S09_FOREST']] as const){
   initial.hp=1;
   const lost=fight(initial,'BASIC_PULSE');
   expect(lost.scene).toBe('S28_RECOVER');expect(lost.hp).toBe(70);expect(lost.mp).toBe(20);
   expect(lost.battle).toBeUndefined();expect(lost.recoveryScene).toBe(checkpoint);
   const retried=choose(lost,'CH2801');
   expect(retried.scene).toBe(checkpoint);expect(retried.inventory).toEqual(lost.inventory);
   expect(retried.xp).toBe(initial.xp);
  }
 });
 it('training and forest first-win rewards are separate and cannot be farmed',()=>{
  let state=winWithPulse(training());
  expect(state.scene).toBe('S04_KORO');expect(state.xp).toBe(15); // First craft 10, practice 5.
  expect(state.inventory.IT_POTION_DEW).toBe(3);
  expect(state.inventory.CORE_BLOOM??0).toBe(0);expect(state.flags.battle_B01_done).not.toBe(true);
  expect(state.flags.first_battle_won).not.toBe(true);expect(state.flags.training_won).toBe(true);
  expect(state.rewarded).toEqual(['win:BT_TRAINING']);
  state=winWithPulse(choose(state,'CH0404'));
  expect(state.xp).toBe(15);expect(state.inventory.IT_POTION_DEW).toBe(3);
  expect(state.rewarded).toEqual(['win:BT_TRAINING']);

  state=choose(state,'CH0401'); // Workshop visit does not duplicate the spent starter kit.
  state=choose(state,'CH0503');
  for(let rests=0;rests<6;rests++)state=choose(state,'CH0210');
  for(const choice of ['CH0205','CH0801','CH0901'])state=choose(state,choice);
  state=winWithPulse(state);
  expect(state.scene).toBe('S10_FOREST_RESULT');expect(state.xp).toBe(27);
  expect(state.inventory.CORE_BLOOM).toBe(1);expect(state.flags.battle_B01_done).toBe(true);
  expect(state.flags.first_battle_won).toBe(true);
  expect(new Set(state.rewarded)).toEqual(new Set(['win:BT_TRAINING','win:B01_FOREST_SPROUT']));
  for(const choice of ['CH1002','CH1303','CH0205','CH0801','CH0901'])state=choose(state,choice);
  state=winWithPulse(state);
  expect(state.xp).toBe(27);expect(state.inventory.CORE_BLOOM).toBe(1);
 });
 it('the forest clue unlocks a one-time usable fire recipe at Koro',()=>{
  const locked=choose(craft(tutorial(),'WIND','ORB','SEEK'),'CH0202');
  expect(()=>choose(locked,'CH0405')).toThrow();
  let state=fight(forest(),'FLEE');
  for(const choice of ['CH0903','CH1303','CH0202','CH0405'])state=choose(state,choice);
  expect(state.scene).toBe('S05_CRAFT_TUTORIAL');
  expect(state.inventory).toMatchObject({CORE_FIRE:1,FORM_ORB:1,MOD_SPLIT:1,CORE_WIND:0,MOD_SEEK:0});
  state=craft(state,'FIRE','ORB','SPLIT');
  expect(state.known).toContain('SPELL_FIRE_ORB_SPLIT');
  for(const choice of ['CH0503','CH0202','CH0405'])state=choose(state,choice);
  expect(state.inventory.CORE_FIRE).toBe(0);expect(state.inventory.FORM_ORB).toBe(0);
  expect(state.inventory.MOD_SPLIT).toBe(0);expect(state.inventory.CORE_WIND).toBe(0);
 });
});

describe('elemental turns and deterministic transactions',()=>{
 it('the fire weakness belongs to the forest enemy, not the practice enemy',()=>{
  const id='SPELL_FIRE_ORB_SEEK';
  expect(fight(withSpell(training(),id),id).battle!.enemyHp).toBe(10); // 25 damage, no weakness
  expect(fight(withSpell(forest(),id),id).battle!.enemyHp).toBe(12); // 30 damage, +20% weakness
 });
 it('new SEAR survives selection and deals exactly two later ticks',()=>{
  const initial=withSpell(training(),'SPELL_FIRE_ORB_LINGER');
  let state=fight(initial,'SPELL_FIRE_ORB_LINGER');
  expect(state.battle!.enemyHp).toBe(17);expect(state.battle!.status.SEAR).toBe(2);
  state=fight(state,'GUARD');
  expect(state.battle!.enemyHp).toBe(14);expect(state.battle!.status.SEAR).toBe(1);
  state=fight(state,'GUARD');
  expect(state.battle!.enemyHp).toBe(11);expect(state.battle!.status.SEAR??0).toBe(0);
  state=fight(state,'GUARD');expect(state.battle!.enemyHp).toBe(11);
 });
 it('a two-phase ward expires even when some shield remains',()=>{
  const initial=withSpell(training(),'SPELL_LIGHT_WARD_GUARD');
  let state=fight(initial,'SPELL_LIGHT_WARD_GUARD');
  expect(state.battle!.shieldTurns).toBe(1);expect(state.battle!.shield).toBeGreaterThan(0);
  expect(state.hp).toBe(100);expect(state.battle!.status).toEqual({});
  state=fight(state,'BASIC_PULSE');
  expect(state.hp).toBe(100);expect(state.battle!.shieldTurns).toBe(0);expect(state.battle!.shield).toBe(0);
  state=fight(state,'BASIC_PULSE');expect(state.hp).toBe(95);
 });
 it('wind on wet defers exactly one enemy action and then recovers',()=>{
  const initial=withSpell(training(),'SPELL_WIND_ORB_SEEK');initial.battle!.status.WET=2;
  let state=fight(initial,'SPELL_WIND_ORB_SEEK');
  expect(state.hp).toBe(100);expect(state.battle!.status.SLOWED??0).toBe(0);
  state=fight(state,'GUARD');expect(state.hp).toBe(97);
 });
 it('wet fire amplification consumes wet duration and rooted water heals the player',()=>{
  const fire=withSpell(training(),'SPELL_FIRE_ORB_SEEK');fire.battle!.status.WET=1;
  const burned=fight(fire,'SPELL_FIRE_ORB_SEEK');
  expect(burned.battle!.enemyHp).toBe(5);expect(burned.battle!.status.WET??0).toBe(0);
  const water=withSpell(training(),'SPELL_WATER_ORB_SEEK');water.hp=50;water.battle!.status.ROOTED=1;
  expect(fight(water,'SPELL_WATER_ORB_SEEK').hp).toBe(48); // heal 3, then practice damage 5
 });
 it('grounded grants armor and bloom can turn the player buff into 3 MP',()=>{
  const target=withSpell(training(),'SPELL_WIND_ORB_SEEK');target.battle!.status.GROUNDED=2;
  expect(fight(target,'SPELL_WIND_ORB_SEEK').battle!.enemyHp).toBe(16); // 21 impact - 2 armor
  const player=withSpell(training(),'SPELL_BLOOM_ORB_SEEK');player.mp=30;player.battle!.playerStatus.GROUNDED=2;
  const result=fight(player,'SPELL_BLOOM_ORB_SEEK');
  expect(result.mp).toBe(23);expect(result.hp).toBe(97);
 });
 it('resonance empowers the next offensive hit once, including a two-hit echo',()=>{
  const wind=withSpell(training(),'SPELL_WIND_ORB_SEEK');wind.battle!.status.RESONANCE=2;
  const result=fight(wind,'SPELL_WIND_ORB_SEEK');
  expect(result.battle!.enemyHp).toBe(12);expect(result.battle!.status.RESONANCE??0).toBe(0);
  const echo=withSpell(training(),'SPELL_ECHO_ORB_SEEK');echo.battle!.status.RESONANCE=2;
  expect(fight(echo,'SPELL_ECHO_ORB_SEEK').battle!.enemyHp).toBe(9);
 });
 it('seeded accuracy, rooted evasion and veil affect the actor casting the spell',()=>{
  const id='SPELL_WIND_ORB_AMPLIFY';
  const miss=withSpell(training(),id);miss.seed=15360; // First RNG draw is 0.9669.
  expect(fight(miss,id).battle!.enemyHp).toBe(35);
  const rooted=structuredClone(miss);rooted.battle!.status.ROOTED=1;
  expect(fight(rooted,id).battle!.enemyHp).toBe(11);
  const veiled=structuredClone(rooted);veiled.battle!.playerStatus.VEIL=1;
  expect(fight(veiled,id).battle!.enemyHp).toBe(35);
  const seek=withSpell(miss,'SPELL_WIND_ORB_SEEK');seek.seed=15360;seek.battle!.playerStatus.VEIL=1;
  expect(fight(seek,'SPELL_WIND_ORB_SEEK').battle!.enemyHp).toBe(14);
  const enemy=training();enemy.seed=15360;enemy.rng=0;enemy.battle!.status.VEIL=1;
  expect(fight(enemy,'BASIC_PULSE').hp).toBe(100);
 });
 it('light clears veil and shadow reacting to gleam cannot immediately reapply it',()=>{
  const light=withSpell(training(),'SPELL_LIGHT_ORB_SEEK');light.battle!.status.VEIL=1;
  expect(fight(light,'SPELL_LIGHT_ORB_SEEK').battle!.status.VEIL??0).toBe(0);
  const shadow=withSpell(training(),'SPELL_SHADOW_ORB_SEEK');shadow.battle!.status={GLEAM:2,VEIL:1};
  expect(fight(shadow,'SPELL_SHADOW_ORB_SEEK').battle!.status.VEIL??0).toBe(0);
 });
 it('swirl boosts the following status chance without keeping an expired swirl stack',()=>{
  const id='SPELL_WATER_ORB_LINGER',plain=withSpell(training(),id);plain.seed=79;
  // Independent fixed RNG fixture: hit draw .0047, status draw .3735.
  expect(fight(plain,id).battle!.status.WET??0).toBe(0);
  const swirling=structuredClone(plain);swirling.battle!.status.SWIRL=1;
  const result=fight(swirling,id);
  expect(result.battle!.status.WET).toBe(2);expect(result.battle!.status.SWIRL??0).toBe(0);
 });
 it('pierce ignores half of the guard reduction and split resolves both impacts',()=>{
  const pierce=withSpell(forest(),'SPELL_WIND_ORB_PIERCE');pierce.battle!.turn=2;
  expect(fight(pierce,'SPELL_WIND_ORB_PIERCE').battle!.enemyHp).toBe(28); // 18 × .75 -> 14
  const split=withSpell(training(),'SPELL_FIRE_ORB_SPLIT');
  expect(fight(split,'SPELL_FIRE_ORB_SPLIT').battle!.enemyHp).toBe(11); // two 12-point impacts
 });
 it('missed elemental attacks cannot consume extra wet duration, slow or nourish',()=>{
  const fire=withSpell(training(),'SPELL_FIRE_ORB_AMPLIFY');fire.seed=15360;fire.battle!.status.WET=2;
  const result=fight(fire,'SPELL_FIRE_ORB_AMPLIFY');
  expect(result.battle!.enemyHp).toBe(35);expect(result.battle!.status.WET).toBe(1);
  const wind=withSpell(training(),'SPELL_WIND_ORB_AMPLIFY');wind.seed=15360;wind.battle!.status.WET=2;
  expect(fight(wind,'SPELL_WIND_ORB_AMPLIFY').hp).toBe(95);
  const water=withSpell(training(),'SPELL_WATER_ORB_AMPLIFY');water.seed=15360;water.hp=50;
  water.battle!.status.ROOTED=1;water.battle!.playerStatus.VEIL=1;
  expect(fight(water,'SPELL_WATER_ORB_AMPLIFY').hp).toBe(45);
 });
 it('replaying a turn is deterministic; rejected actions cannot spend or mutate state',()=>{
  const initial=training();expect(fight(initial,'SPELL_WIND_ORB_SEEK')).toEqual(fight(initial,'SPELL_WIND_ORB_SEEK'));
  initial.mp=0;initial.inventory.IT_MANA_LEAF=0;
  const before=structuredClone(initial);
  for(const action of ['SPELL_WIND_ORB_SEEK','SPELL_FIRE_ORB_SPLIT','IT_MANA_LEAF','invalid']){
   expect(()=>fight(initial,action)).toThrow();expect(initial).toEqual(before);
  }
  expect(fight(initial,'BASIC_PULSE').mp).toBe(0);expect(fight(initial,'GUARD').mp).toBe(6);
 });
 it('all 234 recipes craft with supplied later ingredients and resolve finite playable turns',()=>{
  expect(allSpells).toHaveLength(234);
  for(const recipe of allSpells){
   let state=tutorial();
   state.inventory={[`CORE_${recipe.core}`]:1,[`FORM_${recipe.form}`]:1,[`MOD_${recipe.mod}`]:1};
   state=craft(state,recipe.core,recipe.form,recipe.mod);
   expect(state.known,recipe.id).toContain(recipe.id);
   for(const item of [`CORE_${recipe.core}`,`FORM_${recipe.form}`,`MOD_${recipe.mod}`])expect(state.inventory[item],recipe.id).toBe(0);
   for(const choice of ['CH0202','CH0404'])state=choose(state,choice);
   state.hp=60;
   const before=structuredClone(state),resolved=fight(state,recipe.id);
   expect(state,recipe.id).toEqual(before);
   expect(schema.safeParse(resolved).success,recipe.id).toBe(true);
   expect(resolved.mp,recipe.id).toBe(40-byId[recipe.id].mp);
   expect(resolved.battle!.turn,recipe.id).toBe(2);
   expect(resolved.battle!.enemyHp,recipe.id).toBeGreaterThan(0);
   expect(resolved.battle!.enemyHp<35||resolved.hp>55||resolved.battle!.shield>0,recipe.id).toBe(true);
   for(const value of [resolved.hp,resolved.mp,resolved.battle!.enemyHp,resolved.battle!.shield,...Object.values(resolved.battle!.status),...Object.values(resolved.battle!.playerStatus)]){
    expect(Number.isFinite(value),recipe.id).toBe(true);expect(value,recipe.id).toBeGreaterThanOrEqual(0);
   }
  }
 });
});

function legacyFixture(shield=9) {
 return {version:1,runId:'historical-godseed-run',seed:9876,rng:19,revision:42,name:'ผู้เดินทางเดิม',scene:'S09_FOREST',ticks:12,hp:61,mp:19,
  inventory:{IT_POTION_DEW:1,CORE_FIRE:2},known:['SPELL_WIND_ORB_SEEK'],equipped:['SPELL_WIND_ORB_SEEK'],flags:{forest_open:true},
  choices:['CH0001','CH0901'],trust:{KORO:2},rewarded:[],gathered:{CH0802:1},journal:['ความทรงจำก่อนอัปเดต'],
  battle:{id:'B01_FOREST_SPROUT',enemyHp:17,turn:4,shield,status:{SEAR:1},checkpoint:'S09_FOREST',next:'S10_FOREST_RESULT'}};
}
// Fixture encoding uses Node's independent SHA-256 implementation, while the game
// decoder uses WebCrypto. Sorting models the published canonical save wire format.
function sortedJson(value:unknown):string {
 if(Array.isArray(value))return `[${value.map(sortedJson).join(',')}]`;
 if(value!==null&&typeof value==='object')return `{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${sortedJson((value as Record<string,unknown>)[key])}`).join(',')}}`;
 return JSON.stringify(value)??'null';
}

describe('non-destructive version 1 save migration',()=>{
 it('starts fresh runs at version 2 without altering validated legacy resources or RNG',()=>{
  expect(fresh()).toMatchObject({version:2,xp:0});
  const old=legacyFixture(),snapshot=structuredClone(old);
  expect(legacySchema.safeParse(old).success).toBe(true);
  const result=schema.parse(old);
  expect(result).toMatchObject({...old,version:2,xp:0,battle:{...old.battle,playerStatus:{},shieldTurns:2,log:[]}});
  expect(old).toEqual(snapshot);
  expect(result.runId).toBe(old.runId);expect(result.rng).toBe(19);expect(result.revision).toBe(42);
  expect(schema.parse(result)).toEqual(result);
  expect(schema.parse(legacyFixture(0)).battle!.shieldTurns).toBe(0);
 });
 it('verifies an original V1 envelope before migration and round-trips the upgraded battle',async()=>{
  const old=legacyFixture();
  const envelope={format:'GODSEED_SAVE',formatVersion:1,state:old,checksum:createHash('sha256').update(sortedJson(old)).digest('hex')};
  const loaded=await decodeSave(JSON.stringify(envelope));
  expect(loaded.legacy).toBe(true);expect(loaded.state).toEqual(schema.parse(old));
  expect((await decodeSave(await encodeSave(loaded.state))).state).toEqual(loaded.state);
  expect((await decodeSave(JSON.stringify(old))).state).toEqual(loaded.state);
  envelope.state.hp=62;
  await expect(decodeSave(JSON.stringify(envelope))).rejects.toThrow();
 });
 it('does not use migration to accept corrupt historical battles or resources',()=>{
  const wrongItem=legacyFixture();wrongItem.inventory.CORE_FIRE=-1;
  expect(schema.safeParse(wrongItem).success).toBe(false);
  const wrongScene=legacyFixture();wrongScene.battle.checkpoint='S99_MISSING';
  expect(schema.safeParse(wrongScene).success).toBe(false);
  const wrongSpell=legacyFixture();wrongSpell.equipped=['SPELL_FIRE_ORB_SPLIT'];
  expect(schema.safeParse(wrongSpell).success).toBe(false);
 });
});
it('rejects a positive imported shield with no remaining lifetime',()=>{const state=training();state.battle!.shield=9;state.battle!.shieldTurns=0;expect(schema.safeParse(state).success).toBe(false);});
