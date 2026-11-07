import {describe,it,expect} from 'vitest';
import {fresh,schema,type State} from '../src/engine/state';
import {encodeSave,decodeSave} from '../src/engine/save-file';
import {choose,craft,fight,intent} from '../src/systems/game';
import {createBattle,battleRules} from '../src/systems/combat';
import {scenes,contentBatches} from '../src/content/story';
import {echoScenes} from '../src/content/echo-story';
import {questSummary} from '../src/content/quests';
import {choiceAvailability,rememberedLines} from '../src/systems/story';
import {sceneDefinitions,clearSegment,routeTo,walkable} from '../src/scenes/scene-definitions';
import {cinematicPath} from '../src/scenes/cinematic-paths';
import {artForStage} from '../src/scenes/art-assets';
import {byId} from '../src/systems/spells';
const take=(s:State,...ids:string[])=>ids.reduce((s,id)=>choose(s,id),s);
export function opening(seed=179){
 let s=take(fresh('ผู้ฟังเสียงย้อน',seed),'CH0001','CH0101','CH0202','CH0401');s=craft(s,'WIND','ORB','SEEK');
 return take(s,'CH0201','CH0301','CH03B1','CH0204','CH0701','CH1401','CH0205','CH0802','CH0903','CH1301','CH0208','CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD','CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH');
}
export function echoTrial(seed=179){
 let s=take(opening(seed),'CHE_HUB','CHE_CALL_PROMISE','CHE_PROMISE_LISTEN','CHE_PACK_TAKE');s=craft(s,'LIGHT','ORB','SEEK');
 return take(s,'CHE_RECIPE_LIGHT','CHE_ROAD_WATER','CHE_WATER_HAND','CHE_ARCH_READ','CHE_LISTEN_PAUSE','CHE_SIGNAL_TEAM');
}
function win(state:State){let s=state,n=0;while(s.battle&&n++<40){const last=s.battle.echo?.core,sp=last==='LIGHT'?'SPELL_WIND_ORB_SEEK':'SPELL_LIGHT_ORB_SEEK';s=fight(s,s.mp>=byId[sp].mp?sp:s.hp<35&&s.inventory.IT_POTION_DEW?'IT_POTION_DEW':'GUARD');}expect(s.battle).toBeUndefined();expect(s.scene).toBe('ECHO_RESULT');return s;}
const close=(s:State)=>take(s,'CHE_RESULT_SAMPLE','CHE_SAMPLE_TAKE','CHE_RECORD_CARE','CHE_MAREN_STAY','CHE_LUMI_PAUSE','CHE_CLOSE_PIERCE');

describe('finite original Echo expedition from the real opening',()=>{
 it('locks the expedition before the first evening without modifying RAM',()=>{const s=take(fresh(),'CH0001','CH0101'),copy=structuredClone(s);expect(()=>choose(s,'CHE_HUB')).toThrow();expect(s).toEqual(copy);});
 it('earns Light materials and consumes them in an actual recipe; the kit never duplicates',()=>{
  let s=take(opening(),'CHE_HUB','CHE_CALL_PREP','CHE_PACK_TAKE');const before={...s.inventory};
  s=take(s,'CHE_RECIPE_HOME','CHE_HUB','CHE_CALL_PREP','CHE_PACK_TAKE');expect(s.inventory).toEqual(before);
  const made=craft(s,'LIGHT','ORB','SEEK');expect(made.inventory.CORE_LIGHT).toBe(before.CORE_LIGHT-1);expect(made.known).toContain('SPELL_LIGHT_ORB_SEEK');expect(made.scene).toBe('ECHO_RECIPE');
 });
 it('bypasses with earned trust, gives no battle reward, and completes a coherent quest',()=>{
  const start=echoTrial(),before=start.inventory.CORE_ECHO||0;let s=choose(start,'CH2102');expect(s.flags.echo_trial_resolved).not.toBe(true);
  s=choose(s,'CHE_BYPASS_WAIT');expect(s.flags.echo_trial_resolved).toBe(true);expect(s.flags.echo_knot_cleared).toBe(true);expect(s.flags.battle_B04_done).not.toBe(true);expect(s.rewarded).not.toContain('win:B04_ECHO_KNOT');expect(s.inventory.CORE_ECHO||0).toBe(before);
  s=close(s);expect(s.scene).toBe('S02_HUB');expect(questSummary(s).find(q=>q.id==='Q_ECHO_EXPEDITION')?.status).toBe('completed');expect(rememberedLines(s,scenes.S02_HUB)[0]).toContain('มาเรน');
 });
 it('requires actual victory before applying arrival facts, then grants CORE_ECHO/xp only once',()=>{
  const start=echoTrial(),b=choose(start,'CH2101');expect(b.scene).toBe('S21_ECHO_TRIAL');expect(b.flags.echo_trial_resolved).not.toBe(true);expect(b.flags.battle_B04_done).not.toBe(true);
  const won=win(b);expect(won.flags.battle_B04_done).toBe(true);expect(won.flags.echo_trial_resolved).toBe(true);expect(won.inventory.CORE_ECHO).toBe((start.inventory.CORE_ECHO||0)+1);expect(won.xp).toBe(start.xp+20);
  const again=win(choose(take(close(won),'CHE_HUB','CHE_CALL_PREP','CHE_PACK_TAKE','CHE_RECIPE_READY','CHE_ROAD_TRACK','CHE_TRACK_MARK','CHE_ARCH_GAP','CHE_LISTEN_NOTE','CHE_SIGNAL_SOLO'),'CH2101'));
  expect(again.inventory.CORE_ECHO).toBe(won.inventory.CORE_ECHO);expect(again.xp).toBe(won.xp);
 });
 it('shares water/ending reward guards across alternatives and keeps consequences in a file',async()=>{
  let s=take(echoTrial(),'CH2102','CHE_BYPASS_WAIT','CHE_RESULT_RECORD','CHE_RECORD_KNOWLEDGE','CHE_REPORT_LIMIT','CHE_LUMI_TRY','CHE_CLOSE_LINGER');
  const saved=(await decodeSave(await encodeSave(s))).state;expect(saved).toEqual(s);expect(rememberedLines(s,scenes.S02_HUB)[0]).toContain('รายงาน');
  const gift=s.inventory.MOD_PIERCE||0,linger=s.inventory.MOD_LINGER,water=s.inventory.FORM_RAIN;
  s=take(s,'CH0401','CH0503','CHE_HUB','CHE_CALL_PREP','CHE_PACK_TAKE','CHE_RECIPE_READY','CHE_ROAD_WATER','CHE_WATER_WIND','CHE_ARCH_READ','CHE_LISTEN_PAUSE','CHE_SIGNAL_TEAM','CH2102','CHE_BYPASS_WAIT');
  s=close(s);expect(s.inventory.MOD_PIERCE||0).toBe(gift);expect(s.inventory.MOD_LINGER).toBe(linger);expect(s.inventory.FORM_RAIN).toBe(water);
 });
 it('blocks an unearned mentor bypass and leaves an always available retreat',()=>{const s=echoTrial();s.trust.EIRA=1;const c=scenes[s.scene].choices.find(c=>c.id==='CH2102')!;expect(choiceAvailability(s,c).enabled).toBe(false);expect(()=>choose(s,c.id)).toThrow();expect(choose(s,'CH2103').scene).toBe('ECHO_ROAD');});
});

describe('Echo Knot telegraph and file-safe deterministic turns',()=>{
 const battle=()=>choose(echoTrial(),'CH2101');
 it('listens for one turn only; a basic-only strategy still faces the announced pulse',()=>{const s=battle(),one=fight(s,'BASIC_PULSE');expect(one.hp).toBe(s.hp);expect(intent(one)).toContain('โจมตี 11');expect(fight(one,'BASIC_PULSE').hp).toBe(s.hp-11);expect(one.battle?.echo).toBeUndefined();});
 it('uses the previously announced core, punishes repetition by 5, and allows switching',()=>{
  const first=fight(battle(),'SPELL_WIND_ORB_SEEK');expect(first.battle?.echo?.core).toBe('WIND');expect(intent(first)).toContain('วายุ');
  const repeated=fight(first,'SPELL_WIND_ORB_SEEK'),switched=fight(first,'SPELL_LIGHT_ORB_SEEK');expect(repeated.hp).toBe(first.hp-16);expect(switched.hp).toBe(first.hp-11);expect(switched.battle?.echo?.core).toBe('LIGHT');
 });
 it('support spells, guard and basic actions do not overwrite the remembered offensive core',()=>{
  const s=fight(battle(),'SPELL_WIND_ORB_SEEK');s.known.push('SPELL_LIGHT_RING_GUARD');s.equipped.push('SPELL_LIGHT_RING_GUARD');
  const supported=fight(s,'SPELL_LIGHT_RING_GUARD');expect(supported.battle?.echo?.core).toBe('WIND');expect(supported.battle?.shield).toBeGreaterThan(0);expect(fight(s,'GUARD').hp).toBe(s.hp-7);expect(fight(s,'BASIC_PULSE').battle?.echo?.core).toBe('WIND');
 });
 it('requires both trust and a successful Wind opening for flee; never awards victory',()=>{
  const s=battle();expect(battleRules(s).canFlee).toBe(false);expect(()=>fight(s,'FLEE')).toThrow();expect(()=>fight(s,'SURRENDER')).toThrow();
  const wind=fight(s,'SPELL_WIND_ORB_SEEK');expect(battleRules(wind).canFlee).toBe(true);const poor=structuredClone(wind);poor.trust.EIRA=1;expect(()=>fight(poor,'FLEE')).toThrow();
  const fled=fight(wind,'FLEE');expect(fled.scene).toBe('S21_ECHO_TRIAL');expect(fled.battle).toBeUndefined();expect(fled.flags.echo_trial_resolved).not.toBe(true);expect(fled.rewarded).not.toContain('win:B04_ECHO_KNOT');
 });
 it('round-trips announced core/RNG/exit and resumes exactly the same next turn',async()=>{
  const s=fight(battle(),'SPELL_WIND_ORB_SEEK'),loaded=(await decodeSave(await encodeSave(s))).state;expect(loaded).toEqual(s);expect(fight(loaded,'SPELL_LIGHT_ORB_SEEK')).toEqual(fight(s,'SPELL_LIGHT_ORB_SEEK'));
 });
 it('rejects invalid echo references while old snapshots keep all new optional fields absent',()=>{
  const s=battle();s.battle!.echo={core:'LIGHT',exitOpened:true};expect(schema.safeParse(s).success).toBe(true);
  const bad=structuredClone(s);bad.battle=createBattle('BT_TRAINING','S04_KORO','S02_HUB');bad.battle.echo={core:'LIGHT'};expect(schema.safeParse(bad).success).toBe(false);
  const old={...fresh(),battle:createBattle('B03_RUIN_SENTINEL','S15_RUINS','S16_RUINS_RESULT')};expect(schema.parse(old).battle).not.toHaveProperty('echo');expect(schema.safeParse({...s,battle:{...s.battle,echo:{core:'FAKE'}}}).success).toBe(false);
 });
 it('defeat recovers at the actual trial without completion flags or a reward',()=>{
  let s=battle();s.hp=1;s=fight(s,'BASIC_PULSE');s=fight(s,'BASIC_PULSE');expect(s.scene).toBe('S28_RECOVER');expect(s.recoveryScene).toBe('S21_ECHO_TRIAL');expect(s.flags.echo_trial_resolved).not.toBe(true);expect(choose(s,'CH2801').scene).toBe('S21_ECHO_TRIAL');
 });
 it('can win with alternating earned spells across 24 actual seeded runs',()=>{for(let seed=1;seed<=24;seed++)expect(win(choose(echoTrial(seed),'CH2101')).flags.battle_B04_done).toBe(true);});
});

describe('authored glade and content production contracts',()=>{
 it('assigns every playable node to exactly one explicit chapter batch',()=>{const ids=contentBatches.flatMap(b=>b.sceneIds);expect(new Set(ids).size).toBe(ids.length);expect([...ids].sort()).toEqual(Object.keys(scenes).sort());expect(echoScenes).toHaveLength(19);});
 it('routes every scene and choice through real unblocked glade foot anchors',()=>{
  const def=sceneDefinitions.battle_glade;for(const scene of echoScenes.filter(s=>s.stage==='glade')){
   const anchor=def.anchors[scene.staging!.anchor];expect(walkable(def,anchor)).toBe(true);
   for(const choice of scene.choices){const target=choice.cinematic!.anchor,path=routeTo(def,anchor,target)!;expect(path,choice.id).toBeDefined();for(let i=1;i<path.length;i++)expect(clearSegment(def,path[i-1],path[i]),choice.id).toBe(true);}
  }
  const flee=cinematicPath('glade','walk','FLEE',{x:130,y:219},'battle_glade')!;for(let i=1;i<flee.points.length;i++)expect(clearSegment(def,{x:flee.points[i-1].x,y:flee.points[i-1].y+20},{x:flee.points[i].x,y:flee.points[i].y+20})).toBe(true);
 });
 it('keeps references out of runtime and glade art out of cold village loading',()=>{expect(artForStage('village').some(a=>a.path.includes('art-v15'))).toBe(false);expect(artForStage('glade').filter(a=>a.path.includes('art-v15'))).toHaveLength(7);expect(artForStage('glade').every(a=>!a.path.includes('reference'))).toBe(true);});
});
