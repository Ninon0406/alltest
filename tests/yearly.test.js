import { it,expect } from 'vitest';
import { generateBirth } from '../src/character/rebirth.js';
import { dispatch } from '../src/engine/actions.js';
import { storyToken } from '../src/engine/life.js';
import { pendingDecision } from '../src/engine/yearly.js';
import { advanceTime } from '../src/engine/time.js';
import { readSave,writeSave,decodeSave } from '../src/save/storage.js';
import { getCareer,careers } from '../src/data/careers.js';
import { missingRequirements,promotionMissing } from '../src/progression/engine.js';
import { simulateCareer } from '../scripts/progression-simulation.mjs';
const act=(s,a)=>dispatch(s,{...a,token:storyToken(s)});
function decide(s,index=0){const d=pendingDecision(s);return act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices[index].id});}
it('uses one yearly click for all infant vignettes and stores automatic context, not fake player answers',()=>{
 const initial=generateBirth(8),s=act(initial,{type:'advanceYears',years:1});expect(initial.age).toBe(0);expect(s.age).toBe(1);expect(s.time.absoluteDay).toBe(360);expect(s.chronicle).toHaveLength(1);expect(s.yearly.reports).toHaveLength(1);expect(s.journal.filter(e=>e.eventId?.startsWith('infant.'))).toHaveLength(10);expect(s.journal.filter(e=>e.eventId).every(e=>e.automatic)).toBe(true);expect(s.yearly.reports[0].counts.stories).toBe(11);
});
it('stops a many-year plan before milestones, with five meaningful choices and no repeat rewards',()=>{
 let s=act(generateBirth(3),{type:'advanceYears',years:10});expect(s.age).toBe(6);const d=pendingDecision(s);expect(d.choices).toHaveLength(5);const before=structuredClone(s);expect(()=>act(s,{type:'advanceYears',years:5})).toThrow();expect(s).toEqual(before);
 const token=storyToken(s),action={type:'majorChoice',decisionId:d.id,choiceId:d.choices[0].id,token};s=dispatch(s,action);expect(()=>dispatch(s,action)).toThrow();expect(s.stats.int).toBe(before.stats.int+1);
 s=act(s,{type:'advanceYears',years:5});expect(s.age).toBe(10);s=decide(s);s=act(s,{type:'advanceYears',years:5});expect(s.age).toBe(12);expect(pendingDecision(s).kind).toBe('awakening');
});
it('condenses the ritual into one chosen approach without losing or rerolling its measured result',()=>{
 let s=generateBirth(5);advanceTime(s,12*360);s=act(s,{type:'majorChoice',decisionId:'turn.awakening',choiceId:'careful'});expect(s.progression.awakening.step).toBe(7);const result=structuredClone(s.progression.awakening.result);
 let raw;writeSave({setItem:(_,v)=>{raw=v;}},s);s=decodeSave(raw);expect(s.progression.awakening.result).toEqual(result);expect(s.journal.filter(e=>e.eventId?.startsWith('awakening.'))).toHaveLength(7);
});
it('keeps a postponed ritual optional and resumes an existing half-completed ritual at its saved venue',()=>{
 let s=generateBirth(9);advanceTime(s,12*360);s=decide(s,4);expect(s.progression.awakening.paused).toBe(true);s=act(s,{type:'advanceYears',years:2});expect(s.age).toBe(14);s=act(s,{type:'beginAwakening'});s=decide(s);expect(s.progression.awakening.step).toBe(7);
});
it('applies real annual training, wages, recovery and bounded routine history',()=>{
 let s=generateBirth(8);advanceTime(s,12*360);s=decide(s);s=act(s,{type:'chooseCareer',careerId:'farmer'});s=act(s,{type:'yearFocus',focus:'work'});const gold=s.gold;s=act(s,{type:'advanceYears',years:1});expect(s.age).toBe(13);expect(s.gold).toBeGreaterThan(gold);expect(s.yearly.reports.at(-1).counts.work).toBeGreaterThan(20);expect(s.world.ledger.at(-1).transactions).toBeGreaterThan(20);expect(s.world.ledger.at(-1).amount).toBe(s.gold-gold);expect(s.journal.length).toBeLessThan(30);
 s=decide(s);s=act(s,{type:'yearFocus',focus:'train',stat:'wis'});const stat=s.stats.wis;s=act(s,{type:'advanceYears',years:1});expect(s.stats.wis).toBeGreaterThan(stat);expect(s.stamina).toBeGreaterThanOrEqual(0);expect(s.stamina).toBeLessThanOrEqual(s.maxStamina);expect(s.progression.fatigue).toBeLessThanOrEqual(100);
});
it('limits career dilemmas to two-year spacing and supports four strategies with valid promotion records',()=>{
 let s=generateBirth(8);advanceTime(s,12*360);s=decide(s);s=act(s,{type:'chooseCareer',careerId:'farmer'});expect(pendingDecision(s)).toBeNull();s=act(s,{type:'advanceYears',years:5});expect(s.age).toBe(13);expect(pendingDecision(s).choices).toHaveLength(4);s=decide(s,2);expect(s.progression.records.farmer.arcStep).toBe(1);
 s=act(s,{type:'advanceYears',years:5});expect(s.age).toBe(15);s=decide(s,3);expect(s.progression.records.farmer.arcStep).toBe(1);s=act(s,{type:'advanceYears',years:5});expect(s.age).toBe(17);s=decide(s,0);expect(s.progression.records.farmer.arcStep).toBe(2);
});
it('explores an actual reachable node and pays its actual time/stamina, without revealing the whole map',()=>{
 let s=generateBirth(8);advanceTime(s,4*360);const old=new Set(s.world.visited);s=act(s,{type:'yearFocus',focus:'explore'});s=act(s,{type:'advanceYears',years:1});expect(s.yearly.reports.at(-1).counts.travel).toBe(1);expect(s.world.visited.length).toBeGreaterThan(old.size);expect(s.world.visited.length).toBeLessThan(20);
});
it('backs up exact schema-4 content while retaining existing outcomes and the optional detailed cursor',()=>{
 const source=simulateCareer(getCareer('farmer'),{stopBeforePromotion:true}).state;delete source.yearly;source.life.page=1;const raw=JSON.stringify({version:4,state:source}),values=new Map([['reborn_save',raw],['reborn_save_backup_before_v4','older']]);const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 const s=readSave(storage);expect(s.birth).toEqual(source.birth);expect(s.progression).toEqual(source.progression);expect(s.life.page).toBe(1);expect(s.yearly.view).toBe('yearly');expect(values.get('reborn_save_backup_before_v5')).toBe(raw);expect(values.get('reborn_save_backup_before_v4')).toBe('older');
 const detail=act(s,{type:'setPacing',view:'detailed'});expect(detail.life.page).toBe(1);
});
it('rejects invalid plans and stale year actions atomically and only rewards time actually simulated',()=>{
 const s=generateBirth(2),before=structuredClone(s);expect(()=>act(s,{type:'yearFocus',focus:'work'})).toThrow();expect(s).toEqual(before);const action={type:'advanceYears',years:1,token:storyToken(s)},next=dispatch(s,action);expect(()=>dispatch(next,action)).toThrow();
 const bad=structuredClone(next);bad.yearly.reports[0].days=-1;expect(()=>decodeSave(JSON.stringify({version:5,state:bad}))).toThrow();
 const mid=generateBirth(2);advanceTime(mid,350);const later=act(mid,{type:'advanceYears',years:1});expect(later.yearly.reports[0].days).toBe(10);expect(later.age).toBe(1);
});
it('earns all 20 advanced careers using the annual planner, its stop points and real training',()=>{
 for(const career of careers){
  let s=generateBirth(8),steps=0;
  while(s.progression.awakening.step<7){s=pendingDecision(s)?decide(s):act(s,{type:'advanceYears',years:5});}
  while(missingRequirements(s,career).length){
   if(pendingDecision(s)){s=decide(s);continue;}
   const stat=Object.entries(career.requirements).find(([key,min])=>s.stats[key]<min)?.[0]??career.primary;
   s=act(s,{type:'yearFocus',focus:'train',stat});s=act(s,{type:'advanceYears',years:1});if(++steps>100)throw Error(`Eligibility stalled: ${career.id}`);
  }
  s=act(s,{type:'chooseCareer',careerId:career.id});
  while(promotionMissing(s,career).length){
   if(pendingDecision(s))s=decide(s,2);else{s=act(s,{type:'yearFocus',focus:'train',stat:career.primary});s=act(s,{type:'advanceYears',years:1});}
   if(++steps>150)throw Error(`Annual promotion stalled: ${career.id}`);
  }
  s=act(s,{type:'promoteCareer'});expect(s.age).toBeGreaterThanOrEqual(18);expect(s.progression.records[career.id].advanced).toBe(true);
  expect(decodeSave(JSON.stringify({version:5,state:s})).progression).toEqual(s.progression);
 }
});
