import {describe,it,expect} from 'vitest';
import {scenes} from '../src/content/story';
import {lifeScenes,lifeSceneIds} from '../src/content/life-story';
import {fresh,type State} from '../src/engine/state';
import {choose,craft,fight} from '../src/systems/game';
import {choiceAvailability} from '../src/systems/story';
import {hasPathAbility,pathProgress} from '../src/systems/life-paths';
import {encodeSave,decodeSave} from '../src/engine/save-file';
import {sceneDefinitions,walkable} from '../src/scenes/scene-definitions';

const take=(s:State,...ids:string[])=>ids.reduce((state,id)=>choose(state,id),s);
function opening(){
 let s=take(fresh('ผู้เรียนรู้สองทาง',901),'CH0001','CH0101','CH0202','CH0401');s=craft(s,'WIND','ORB','SEEK');
 return take(s,'CH0201','CH0301','CH03B1','CH0204','CH0701','CH1401','CH0205','CH0802','CH0903','CH1301','CH0208','CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD','CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH');
}
const cross=(s=opening())=>choose(s,'CHLP_HUB');
const explorerRank1=(s=cross())=>take(s,'CHLP_START_EXPLORER','CHLP_E_BEGIN','CHLP_E_SURVEY_FEET','CHLP_E_MARK_RIBBON','CHLP_E_ACK_MAP');
const natureRank1=(s=cross())=>take(s,'CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_CLEAR','CHLP_N_WATER_BUCKET','CHLP_N_ACK_PATIENCE');
function win(s:State,result:string){
 let turns=0;while(s.battle&&turns++<20)s=fight(s,'BASIC_PULSE');expect(s.battle).toBeUndefined();expect(s.scene).toBe(result);expect(s.hp).toBeGreaterThan(0);return s;
}
const explorerRank2=(s=explorerRank1())=>choose(win(choose(s,'CHLP_E_TRIAL_START'),'LP_EXPLORER_RESULT'),'CHLP_E_RANK2_SHARE');
const natureRank2=(s=natureRank1())=>choose(win(choose(s,'CHLP_N_TRIAL_START'),'LP_NATURE_RESULT'),'CHLP_N_RANK2_REFUGE');
const enabled=(s:State,id:string)=>choiceAvailability(s,scenes[s.scene].choices.find(choice=>choice.id===id)!).enabled;
const rank=(s:State,id:'EXPLORER'|'NATURE_KEEPER')=>pathProgress(s).find(path=>path.id===id)!.rank;

describe('two introductory life paths use actual fieldwork and training',()=>{
 it('unlocks the hub invitation only after the real first-evening conclusion',()=>{
  const before=take(fresh(),'CH0001','CH0101'),copy=structuredClone(before);expect(enabled(before,'CHLP_HUB')).toBe(false);expect(()=>choose(before,'CHLP_HUB')).toThrow();expect(before).toEqual(copy);
  const s=opening();expect(s.flags.arc1_opening_complete).toBe(true);expect(enabled(s,'CHLP_HUB')).toBe(true);expect(choose(s,'CHLP_HUB').scene).toBe('LP_CROSSROADS');
 });
 it('allows either first path but requires coherent rank1 before learning across paths',()=>{
  const start=cross();expect(enabled(start,'CHLP_START_EXPLORER')).toBe(true);expect(enabled(start,'CHLP_START_NATURE')).toBe(true);
  const learning=take(start,'CHLP_START_EXPLORER','CHLP_E_BRIEF_BACK'),copy=structuredClone(learning);expect(enabled(learning,'CHLP_START_EXPLORER')).toBe(true);expect(enabled(learning,'CHLP_START_NATURE')).toBe(false);expect(()=>choose(learning,'CHLP_START_NATURE')).toThrow();expect(learning).toEqual(copy);
  const learned=choose(explorerRank1(start),'CHLP_E_TRIAL_BACK');expect(enabled(learned,'CHLP_START_NATURE')).toBe(true);expect(choose(learned,'CHLP_START_NATURE').flags.lp_nature_started).toBe(true);
 });
 it('does not grant explorer rank1 for merely starting or looking at a route',()=>{
  let s=take(cross(),'CHLP_START_EXPLORER','CHLP_E_BEGIN');expect(rank(s,'EXPLORER')).toBe(0);expect(s.flags.lp_explorer_surveyed).not.toBe(true);
  s=choose(s,'CHLP_E_SURVEY_FEET');expect(s.flags.lp_explorer_surveyed).toBe(true);expect(s.flags.lp_explorer_marked).not.toBe(true);expect(rank(s,'EXPLORER')).toBe(0);
  s=choose(s,'CHLP_E_MARK_RIBBON');expect(s.flags.lp_explorer_marked).toBe(true);expect(s.flags.lp_explorer_rank1).not.toBe(true);expect(rank(s,'EXPLORER')).toBe(0);
  s=choose(s,'CHLP_E_ACK_MAP');expect(rank(s,'EXPLORER')).toBe(1);expect(s.flags.lp_explorer_trial_passed).not.toBe(true);expect(hasPathAbility(s,'TRAIL_FOCUS')).toBe(false);
 });
 it('resumes an acknowledged path at its trial without resetting or repeating fieldwork',()=>{
  expect(enabled(cross(),'CHLP_RESUME_EXPLORER')).toBe(false);expect(enabled(cross(),'CHLP_RESUME_NATURE')).toBe(false);
  for(const [initial,back,resume,checkpoint] of [[explorerRank1(),'CHLP_E_TRIAL_BACK','CHLP_RESUME_EXPLORER','LP_EXPLORER_TRIAL'],[natureRank1(),'CHLP_N_TRIAL_BACK','CHLP_RESUME_NATURE','LP_NATURE_TRIAL']] as const){
   const at=choose(initial,back);expect(enabled(at,resume)).toBe(true);const out=choose(at,resume);expect(out.scene).toBe(checkpoint);expect(out.inventory).toEqual(at.inventory);expect(out.flags).toEqual(at.flags);expect(out.battle).toBeUndefined();
  }
 });
 it('nature fieldwork finds a source and waters the existing garden before acknowledgement',()=>{
  let s=take(cross(),'CHLP_START_NATURE','CHLP_N_BEGIN');expect(s.flags.garden_tended).not.toBe(true);expect(rank(s,'NATURE_KEEPER')).toBe(0);
  s=choose(s,'CHLP_N_SOURCE_CLEAR');expect(s.flags.lp_nature_source_found).toBe(true);expect(s.flags.lp_nature_watered).not.toBe(true);
  s=choose(s,'CHLP_N_WATER_BUCKET');expect(s.flags.lp_nature_watered).toBe(true);expect(s.flags.garden_tended).toBe(true);expect(rank(s,'NATURE_KEEPER')).toBe(0);
  s=choose(s,'CHLP_N_ACK_PATIENCE');expect(rank(s,'NATURE_KEEPER')).toBe(1);expect(hasPathAbility(s,'ROOT_REFUGE')).toBe(false);
 });
 it('earlier gardening is remembered but cannot replace the new source and watering objectives',()=>{
  const previous=take(opening(),'CH0203','CH0601'),at=take(cross(previous),'CHLP_START_NATURE');expect(enabled(at,'CHLP_N_REMEMBER')).toBe(true);
  const s=choose(at,'CHLP_N_REMEMBER');expect(s.flags.lp_nature_old_care_remembered).toBe(true);expect(s.flags.garden_tended).toBe(true);expect(s.flags.lp_nature_source_found).not.toBe(true);expect(s.flags.lp_nature_watered).not.toBe(true);expect(rank(s,'NATURE_KEEPER')).toBe(0);
 });
 it('starting, fleeing or surrendering a path trial cannot grant its result entry flag',()=>{
  for(const [initial,start,flag,checkpoint] of [[explorerRank1(),'CHLP_E_TRIAL_START','lp_explorer_trial_passed','LP_EXPLORER_TRIAL'],[natureRank1(),'CHLP_N_TRIAL_START','lp_nature_trial_passed','LP_NATURE_TRIAL']] as const){
   const battle=choose(initial,start);expect(battle.battle!.id).toBe('BT_TRAINING');expect(battle.battle!.enemyHp).toBe(35);expect(battle.scene).toBe(checkpoint);expect(battle.flags[flag]).not.toBe(true);
   for(const action of ['FLEE','SURRENDER']){const out=fight(battle,action);expect(out.scene).toBe(checkpoint);expect(out.flags[flag]).not.toBe(true);expect(out.battle).toBeUndefined();expect(out.rewarded).toEqual([]);}
  }
 });
 it('ordinary workshop training is not a substitute for an authored path trial',()=>{
  const ordinary=take(explorerRank1(),'CHLP_E_TRIAL_PREP','CH0404'),out=win(ordinary,'S04_KORO');expect(out.flags.training_won).toBe(true);expect(out.flags.lp_explorer_trial_passed).not.toBe(true);expect(rank(out,'EXPLORER')).toBe(1);expect(hasPathAbility(out,'TRAIL_FOCUS')).toBe(false);
 });
 it('a real basic-only explorer victory unlocks signoff, then the actual scout ability',()=>{
  const won=win(choose(explorerRank1(),'CHLP_E_TRIAL_START'),'LP_EXPLORER_RESULT');expect(won.flags.lp_explorer_trial_passed).toBe(true);expect(rank(won,'EXPLORER')).toBe(1);expect(hasPathAbility(won,'TRAIL_FOCUS')).toBe(false);
  const out=choose(won,'CHLP_E_RANK2_SHARE');expect(rank(out,'EXPLORER')).toBe(2);expect(hasPathAbility(out,'TRAIL_FOCUS')).toBe(true);expect(out.inventory.FORM_CHAIN).toBe(1);expect(out.inventory.MOD_PIERCE).toBe(1);expect(out.scene).toBe('LP_EXPLORER_HOME');
 });
 it('a real basic-only nature victory and signoff unlock root refuge with actual ingredients',()=>{
  const won=win(choose(natureRank1(),'CHLP_N_TRIAL_START'),'LP_NATURE_RESULT');expect(won.flags.lp_nature_trial_passed).toBe(true);expect(hasPathAbility(won,'ROOT_REFUGE')).toBe(false);
  const out=choose(won,'CHLP_N_RANK2_REFUGE');expect(rank(out,'NATURE_KEEPER')).toBe(2);expect(hasPathAbility(out,'ROOT_REFUGE')).toBe(true);expect(out.inventory.CORE_EARTH).toBe(1);expect(out.inventory.FORM_WARD).toBe(1);expect(out.inventory.MOD_GUARD).toBe(1);
 });
 it('real defeat keeps fieldwork but does not pass the trial, and can be retried',()=>{
  let s=choose(explorerRank1(),'CHLP_E_TRIAL_START'),turns=0;while(s.battle&&turns++<60)s=fight(s,'GUARD');expect(s.scene).toBe('S28_RECOVER');expect(s.flags.lp_explorer_trial_passed).not.toBe(true);expect(rank(s,'EXPLORER')).toBe(1);expect(s.recoveryScene).toBe('LP_EXPLORER_TRIAL');
  s=choose(s,'CH2801');expect(s.scene).toBe('LP_EXPLORER_TRIAL');const won=win(choose(s,'CHLP_E_TRIAL_START'),'LP_EXPLORER_RESULT');expect(won.flags.lp_explorer_trial_passed).toBe(true);
 });
 it('each rank1 material reward is shared by both acknowledgements and does not farm on replay',()=>{
  const e=explorerRank1(),n=natureRank1();
  const eAgain=take(e,'CHLP_E_TRIAL_BACK','CHLP_START_EXPLORER','CHLP_E_LISTEN','CHLP_E_SURVEY_WIND','CHLP_E_MARK_STONES','CHLP_E_ACK_SHOW');for(const id of ['CORE_WIND','FORM_RAIN','MOD_SEEK'])expect(eAgain.inventory[id]).toBe(e.inventory[id]);
  const nAgain=take(n,'CHLP_N_TRIAL_BACK','CHLP_START_NATURE','CHLP_N_REMEMBER','CHLP_N_SOURCE_LISTEN','CHLP_N_WATER_BUCKET','CHLP_N_ACK_BALANCE');for(const id of ['CORE_BLOOM','FORM_RING','MOD_HEAL'])expect(nAgain.inventory[id]).toBe(n.inventory[id]);
 });
 it('rank2 acknowledgement alternatives share a reward guard even after another actual win',()=>{
  const first=explorerRank2(),back=choose(first,'CHLP_E_HOME_CROSS'),again=win(choose(explorerRank1(back),'CHLP_E_TRIAL_START'),'LP_EXPLORER_RESULT');
  const out=choose(again,'CHLP_E_RANK2_SAFE');for(const id of ['FORM_CHAIN','MOD_PIERCE','IT_POTION_DEW'])expect(out.inventory[id]).toBe(first.inventory[id]);expect(out.xp).toBe(first.xp);expect(out.flags.lp_explorer_map_shared).toBe(false);expect(out.flags.lp_explorer_safe_route).toBe(true);
 });
 it('learns both paths in either order while retaining the first rank2 ability',()=>{
  let e=choose(explorerRank2(),'CHLP_E_HOME_REST');e=choose(e,'CHLP_HUB');e=natureRank2(natureRank1(e));expect(hasPathAbility(e,'TRAIL_FOCUS')).toBe(true);expect(hasPathAbility(e,'ROOT_REFUGE')).toBe(true);
  let n=choose(natureRank2(),'CHLP_N_HOME_REST');n=choose(n,'CHLP_HUB');n=explorerRank2(explorerRank1(n));expect(hasPathAbility(n,'TRAIL_FOCUS')).toBe(true);expect(hasPathAbility(n,'ROOT_REFUGE')).toBe(true);
 });
 it('fieldwork and both certifications supply three real, different recipes without fixture inventory',()=>{
  let s=explorerRank1();s=craft(s,'WIND','RAIN','SEEK');expect(s.known).toContain('SPELL_WIND_RAIN_SEEK');
  s=take(explorerRank2(s),'CHLP_E_HOME_REST','CHLP_HUB');s=natureRank1(s);s=craft(s,'BLOOM','RING','HEAL');expect(s.known).toContain('SPELL_BLOOM_RING_HEAL');
  s=natureRank2(s);s=craft(s,'EARTH','WARD','GUARD');expect(s.known).toContain('SPELL_EARTH_WARD_GUARD');expect(s.equipped).toHaveLength(4);expect(s.inventory.CORE_EARTH).toBe(0);expect(s.inventory.MOD_GUARD).toBe(0);
 });
 it('a known water spell is a real alternative to the bucket and does not duplicate field rewards',()=>{
  let s=take(opening(),'CH0203','CH0601','CH0206','CH1103','CH1202');s=craft(s,'WATER','RING','HEAL');s=take(cross(s),'CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_LISTEN','CHLP_N_WATER_SPELL','CHLP_N_ACK_BALANCE');expect(s.flags.lp_nature_water_spell).toBe(true);expect(s.flags.garden_tended).toBe(true);expect(rank(s,'NATURE_KEEPER')).toBe(1);
  const noSpell=take(cross(),'CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_CLEAR');expect(enabled(noSpell,'CHLP_N_WATER_SPELL')).toBe(false);expect(enabled(noSpell,'CHLP_N_WATER_BUCKET')).toBe(true);
 });
 it('cross-mentor capstone requires both complete paths and shares its reward across all choices',()=>{
  const one=choose(explorerRank2(),'CHLP_E_HOME_CROSS');expect(enabled(one,'CHLP_SHARED_LESSON')).toBe(false);
  const both=take(natureRank2(natureRank1(one)),'CHLP_N_HOME_CROSS');expect(enabled(both,'CHLP_SHARED_LESSON')).toBe(true);
  const first=take(both,'CHLP_SHARED_LESSON','CHLP_SHARED_GUIDE'),guard=first.inventory.MOD_GUARD,leaf=first.inventory.IT_MANA_LEAF;
  const later=take(first,'CHLP_HUB','CHLP_SHARED_LESSON','CHLP_SHARED_NEIGHBORS');expect(later.inventory.MOD_GUARD).toBe(guard);expect(later.inventory.IT_MANA_LEAF).toBe(leaf);expect(later.flags.lp_shared_guide).toBe(false);expect(later.flags.lp_shared_neighbors).toBe(true);expect(later.flags.lp_shared_exchange).toBe(true);
 });
 it('old opening files and active path battle files round-trip exactly with State2/File2',async()=>{
  const old=opening(),oldFile=await encodeSave(old),loaded=(await decodeSave(oldFile)).state;expect(loaded).toEqual(old);expect(loaded.flags.lp_explorer_started).toBeUndefined();
  const battle=fight(choose(explorerRank1(cross(loaded)),'CHLP_E_TRIAL_START'),'BASIC_PULSE'),file=await encodeSave(battle);expect(JSON.parse(file).formatVersion).toBe(2);expect((await decodeSave(file)).state).toEqual(battle);expect(battle.flags.lp_explorer_trial_passed).not.toBe(true);
 });
 it('all16 added nodes are reached by real actions and declare safe source-stage anchors',()=>{
  const visited=new Set<string>();const route=(s:State,...ids:string[])=>{visited.add(s.scene);for(const id of ids){s=choose(s,id);visited.add(s.scene);}return s;};
  let s=route(opening(),'CHLP_HUB','CHLP_START_EXPLORER','CHLP_E_BEGIN','CHLP_E_SURVEY_FEET','CHLP_E_MARK_RIBBON','CHLP_E_ACK_MAP','CHLP_E_TRIAL_START');s=win(s,'LP_EXPLORER_RESULT');visited.add(s.scene);s=route(s,'CHLP_E_RANK2_SHARE','CHLP_E_HOME_REST','CHLP_HUB','CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_CLEAR','CHLP_N_WATER_BUCKET','CHLP_N_ACK_PATIENCE','CHLP_N_TRIAL_START');s=win(s,'LP_NATURE_RESULT');visited.add(s.scene);s=route(s,'CHLP_N_RANK2_REFUGE','CHLP_N_HOME_CROSS','CHLP_SHARED_LESSON','CHLP_SHARED_REFUGES');
  expect(s.flags.lp_shared_exchange).toBe(true);expect(lifeSceneIds.filter(id=>!visited.has(id))).toEqual([]);expect(lifeSceneIds).toHaveLength(16);
  for(const scene of lifeScenes){const def=sceneDefinitions[scene.staging!.location!];expect(walkable(def,def.anchors[scene.staging!.anchor])).toBe(true);for(const choice of scene.choices){expect(scenes[choice.next]).toBeDefined();expect(choice.cinematic).toBeDefined();expect(walkable(def,def.anchors[choice.cinematic!.anchor]),choice.id).toBe(true);}}
 });
});
