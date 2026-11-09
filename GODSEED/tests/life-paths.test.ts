import {it,expect} from 'vitest';
import {fresh,type State} from '../src/engine/state';
import {encodeSave,decodeSave} from '../src/engine/save-file';
import {lifePaths,pathStartAvailability,pathProgress,hasPathAbility,type LifePathDefinition} from '../src/systems/life-paths';

type RuleState=Pick<State,'flags'>;
/** Flag fixtures isolate rule semantics; content tests prove the actual lessons. */
const rule=(flags:Record<string,boolean>={}):RuleState=>({flags:{...flags}});
function foundation(path:LifePathDefinition):Record<string,boolean>{
 return Object.fromEntries([path.startedFlag,path.rank1Flag,...path.requirements.rank1.map(o=>o.flag)].map(flag=>[flag,true]));
}
function certified(path:LifePathDefinition):Record<string,boolean>{
 return {...foundation(path),[path.trialFlag]:true,[path.rank2Flag]:true};
}
const explorer=lifePaths.find(path=>path.id==='EXPLORER')!;
const nature=lifePaths.find(path=>path.id==='NATURE_KEEPER')!;

it('legacy states without life path flags remain rank zero with no abilities',()=>{
 const state=fresh();state.xp=9999;
 expect(pathProgress(state).map(p=>p.rank)).toEqual([0,0,0]);
 expect(pathProgress(state).every(p=>p.status==='locked')).toBe(true);
 expect(hasPathAbility(state,'TRAIL_FOCUS')).toBe(false);expect(hasPathAbility(state,'ROOT_REFUGE')).toBe(false);
 expect(pathStartAvailability(state,'EXPLORER').reason).toContain('คืนแรก');
});
it('both introductory paths become available after the actual opening completion marker',()=>{
 const state=rule({arc1_opening_complete:true});
 expect(pathStartAvailability(state,'EXPLORER').enabled).toBe(true);
 expect(pathStartAvailability(state,'NATURE_KEEPER').enabled).toBe(true);
 expect(pathProgress(state).filter(p=>p.id!=='ALCHEMIST').every(p=>p.status==='available')).toBe(true);expect(pathProgress(state).find(p=>p.id==='ALCHEMIST')!.status).toBe('locked');
});
it('the player may resume the current course while cross-learning waits for its foundation',()=>{
 const state=rule({arc1_opening_complete:true,lp_explorer_started:true});
 expect(pathStartAvailability(state,'EXPLORER').enabled).toBe(true);
 expect(pathStartAvailability(state,'NATURE_KEEPER')).toMatchObject({enabled:false});
 expect(pathStartAvailability(state,'NATURE_KEEPER').reason).toContain('นักสำรวจ');
 expect(pathProgress(state)[0]).toMatchObject({rank:0,status:'learning',started:true});
});
it('a rank-one acknowledgement without its lessons cannot bypass the cross-learning gate',()=>{
 const flags={arc1_opening_complete:true,...foundation(explorer),lp_explorer_marked:false};
 expect(pathStartAvailability(rule(flags),'NATURE_KEEPER').enabled).toBe(false);
 expect(pathProgress(rule(flags))[0].rank).toBe(0);
 flags.lp_explorer_marked=true;
 expect(pathStartAvailability(rule(flags),'NATURE_KEEPER').enabled).toBe(true);
 expect(pathProgress(rule(flags))[0].rank).toBe(1);
 expect(hasPathAbility(rule(flags),'TRAIL_FOCUS')).toBe(false);
});
it('every prerequisite in each introductory certification is required for its ability',()=>{
 for(const path of lifePaths){
  const valid=certified(path);
  expect(hasPathAbility(rule(valid),path.ability.id)).toBe(true);
  for(const flag of Object.keys(valid)){
   expect(hasPathAbility(rule({...valid,[flag]:false}),path.ability.id),path.id+'/'+flag).toBe(false);
  }
  const rankTwoMarkerOnly=rule({[path.trialFlag]:true,[path.rank2Flag]:true});
  expect(pathProgress(rankTwoMarkerOnly).find(p=>p.id===path.id)?.rank).toBe(0);
 }
});
it('nature foundations require the garden to have actually been tended as well as course flags',()=>{
 const flags={...certified(nature),garden_tended:false};
 expect(hasPathAbility(rule(flags),'ROOT_REFUGE')).toBe(false);
 expect(pathProgress(rule(flags))[1].next).toContain('สวน');
 flags.garden_tended=true;
 expect(hasPathAbility(rule(flags),'ROOT_REFUGE')).toBe(true);
 expect(hasPathAbility(rule(flags),'TRAIL_FOCUS')).toBe(false);
});
it('cross-learning preserves the first ability and permits both courses to resume',()=>{
 const state=rule({arc1_opening_complete:true,...certified(explorer),lp_nature_started:true});
 const before=structuredClone(state);
 expect(pathStartAvailability(state,'EXPLORER').enabled).toBe(true);
 expect(pathStartAvailability(state,'NATURE_KEEPER').enabled).toBe(true);
 expect(pathProgress(state).map(p=>p.rank)).toEqual([2,0,0]);
 expect(hasPathAbility(state,'TRAIL_FOCUS')).toBe(true);expect(hasPathAbility(state,'ROOT_REFUGE')).toBe(false);
 expect(state).toEqual(before);
});
it('guidance asks for the trial and signoff without calling rank two a finished life route',()=>{
 const flags=foundation(explorer),first=pathProgress(rule(flags))[0];
 expect(first.next).toContain('บททดสอบ');expect(first.abilityUnlocked).toBe(false);
 flags[explorer.trialFlag]=true;
 expect(pathProgress(rule(flags))[0].next).toContain('รับรอง');
 flags[explorer.rank2Flag]=true;
 const second=pathProgress(rule(flags))[0];expect(second.rank).toBe(2);expect(second.next).toContain('เรียนรู้');
});
it('manual file round trip retains rule flags while preserving State2 and File2',async()=>{
 const state=fresh();state.flags={arc1_opening_complete:true,...certified(explorer),...foundation(nature)};
 const before=structuredClone(state),file=await encodeSave(state),restored=(await decodeSave(file)).state;
 expect(restored).toEqual(before);expect(pathProgress(restored)).toEqual(pathProgress(before));
 expect(hasPathAbility(restored,'TRAIL_FOCUS')).toBe(true);expect(hasPathAbility(restored,'ROOT_REFUGE')).toBe(false);
 expect(restored.version).toBe(2);expect(JSON.parse(file).formatVersion).toBe(2);
 expect('lifePaths' in restored).toBe(false);expect('paths' in restored).toBe(false);
 expect(state).toEqual(before);
});
