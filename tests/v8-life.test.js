import {it,expect} from 'vitest';
import {createV8Run,dispatchV8} from '../src/engine/v8-life-loop.js';
import {v8Decision,v8Focuses,v8NextDecisionDay,naturalEndDay} from '../src/engine/v8-model.js';
import {v8Act,simulateV8,chooseV8Policy} from '../scripts/v8-simulation.mjs';
import {storyToken} from '../src/engine/life.js';
import {calendar} from '../src/engine/time.js';
import {eligibleCareers,missingRequirements} from '../src/progression/engine.js';
import {hasPower} from '../src/progression/power-model.js';
import {sceneContext} from '../src/world/scene-context.js';
import {completedSummary,archiveCompleted,readArchive,ARCHIVE_KEY} from '../src/save/archive.js';
import {v8LifeEvents,originKind} from '../src/data/v8-life-events.js';
import {dispatch} from '../src/engine/actions.js';

const fresh=seed=>createV8Run(seed,{id:`test-v8-${seed}`,startedAt:'2026-10-29T00:00:00Z'});
function until(state,eventId,{policy=0,awaken=false,focus=null,select=null}={}){
 for(let step=0;step<240;step++){
  const d=v8Decision(state);if(d?.id===eventId)return state;
  if(state.run.status==='ended')throw Error(`Ended before ${eventId}`);
  if(state.v8.stage==='reveal')state=v8Act(state,{type:'v8Begin'});
  else if(state.v8.outcome)state=v8Act(state,{type:'v8Continue'});
  else if(d){const c=select?.(d,state)??chooseV8Policy(d,policy,{awaken,state});state=v8Act(state,{type:'v8Choice',decisionId:d.id,choiceId:c.id});}
  else{if(focus&&v8Focuses(state).some(f=>f.id===focus)&&state.v8.focus!==focus)state=v8Act(state,{type:'v8Focus',focus});state=v8Act(state,{type:'v8Seek'});}
 }
 throw Error('Event not reached');
}
const choose=(s,id)=>v8Act(s,{type:'v8Choice',decisionId:v8Decision(s).id,choiceId:id});

it('100 seeded lives plus a missing-origin representative end at their lifespan across all origins and four epilogues',()=>{
 const endings=new Set(),origins=new Set();let longest=0;
 for(const seed of [...Array(100).keys(),108]){
  const {state:s,steps}=simulateV8(seed);expect(s.run.status).toBe('ended');expect(s.time.absoluteDay).toBe(naturalEndDay(s));expect(s.age).toBe(s.birth.lifespan);expect(s.career).toBe('ผู้อาวุโสในชุมชน');expect(s.power.level).toBe(1);expect(hasPower(s)).toBe(true);expect(s.v8.completed.length).toBeGreaterThanOrEqual(21);expect(steps).toBeLessThan(100);
  endings.add(s.run.endingId);origins.add(s.birth.archetypeId);longest=Math.max(longest,s.age);
 }
 expect([...endings].sort()).toEqual(['v8.garden','v8.home','v8.pages','v8.roads']);expect(origins.size).toBe(20);expect(longest).toBeLessThan(500);
},60000);

it('infants receive timed caregiver observations without books, work, power or focus choices',()=>{
 let s=fresh(4);expect(sceneContext(s).kind).toBe('home');expect(v8Focuses(s)).toEqual([]);const birth=structuredClone(s.birth);
 expect(()=>v8Act(s,{type:'v8Focus',focus:'work'})).toThrow();s=v8Act(s,{type:'v8Begin'});
 for(let i=0;i<3;i++)s=v8Act(s,{type:'v8Tick',days:30});
 expect(calendar(s).ageMonths).toBe(3);expect(v8Decision(s)).toBeNull();expect(s.v8.observed).toEqual(['v8.observe.home','v8.observe.voice']);expect(s.v8.knowledge).toBe(0);expect(s.progression.practice).toEqual({});expect(s.power.practiceDays).toBe(0);
 for(const type of ['train','careerJob','trainPower','advanceYears','ascend'])expect(()=>dispatch(s,{type,token:storyToken(s)})).toThrow();
 s=v8Act(s,{type:'v8Seek'});expect(calendar(s).ageMonths).toBe(18);expect(v8Decision(s).id).toBe('v8.small-friend');expect(v8Focuses(s).map(f=>f.id)).toEqual(['care','play','observe']);expect(s.birth).toEqual(birth);
});

it('focus taps queue a next-tick change without time, gold, stats or XP and reproduce from the same seed',()=>{
 let s=until(fresh(1),'v8.small-friend');s=choose(s,'watch');s=v8Act(s,{type:'v8Continue'});
 const before=structuredClone(s);s=v8Act(s,{type:'v8Focus',focus:'observe'});
 expect(s.v8.focus).toBe(before.v8.focus);expect(s.v8.nextFocus).toBe('observe');expect(s.time).toEqual(before.time);expect(s.gold).toBe(before.gold);expect(s.stats).toEqual(before.stats);expect(s.power).toEqual(before.power);expect(s.v8.knowledge).toBe(before.v8.knowledge);
 const a=v8Act(s,{type:'v8Tick',days:30}),b=v8Act(s,{type:'v8Tick',days:30});expect(a).toEqual(b);expect(a.v8.focus).toBe('observe');expect(a.v8.knowledge).toBeGreaterThan(s.v8.knowledge);
});

it('seeking stops at exactly age twelve and stale/double choices, pending decisions and outcomes are atomic',()=>{
 const s=until(fresh(0),'v8.awakening-invitation');expect(calendar(s).ageMonths).toBe(144);expect(s.time.absoluteDay).toBe(s.time.birthAbsoluteDay+12*360);expect(v8NextDecisionDay(s)).toBe(s.time.absoluteDay);
 const before=structuredClone(s),action={type:'v8Choice',decisionId:v8Decision(s).id,choiceId:'ordinary',token:storyToken(s)};
 expect(()=>v8Act(s,{type:'v8Tick',days:30})).toThrow();const chosen=dispatchV8(s,action);expect(s).toEqual(before);expect(()=>dispatchV8(chosen,action)).toThrow();expect(()=>v8Act(chosen,{type:'v8Seek'})).toThrow();expect(chosen.time).toEqual(s.time);
});

it('three childhood backgrounds select actual family stories without rerolling birth',()=>{
 const seen=new Map();for(let seed=0;seed<40&&seen.size<3;seed++){const s=until(fresh(seed),'v8.family-festival'),after=v8Act(choose(s,'rest'),{type:'v8Continue'}),next=v8Act(after,{type:'v8Seek'});seen.set(originKind(next),v8Decision(next).id);}
 expect(Object.fromEntries(seen)).toEqual({craft:'v8.wood-pieces',stories:'v8.lamp-stories',nature:'v8.seed-cup'});
});

it('the scholarship callback needs an application and a poor life retains real free alternatives',()=>{
 let s=until(fresh(3),'v8.study-funds');s=choose(s,'apply');s=v8Act(s,{type:'v8Continue'});s=v8Act(s,{type:'v8Seek'});expect(v8Decision(s).id).toBe('v8.scholarship-reply');
 const other=until(fresh(3),'v8.first-contract',{select:d=>d.id==='v8.study-funds'?d.choices.find(c=>c.id==='self'):null});expect(other.v8.completed).not.toContain('v8.scholarship-reply');
 let seed=0;while(fresh(seed).birth.archetypeId!=='traveler')seed++;
 const poor=until(fresh(seed),'v8.steady-work',{focus:'rest',select:d=>d.id==='v8.first-school'?d.choices.find(c=>c.id==='kit'):d.id==='v8.study-funds'?d.choices.find(c=>c.id==='self'):d.id==='v8.first-contract'?d.choices.find(c=>c.id==='study'):null});
 const d=v8Decision(poor),paid=d.choices.find(c=>c.id==='small');expect(poor.gold).toBe(3);expect(paid.disabled).toBe(true);expect(d.choices.filter(c=>!c.disabled).length).toBeGreaterThanOrEqual(2);expect(()=>choose(poor,'small')).toThrow();
});

it('seven manual ritual steps preserve measurement and recommend only the best eight eligible careers',()=>{
 let s=until(fresh(6),'v8.awakening-invitation');s=choose(s,'join');let result;
 for(let step=0;step<7;step++){
  s=v8Act(s,{type:'v8Continue'});const d=v8Decision(s);expect(d.kind).toBe('ritual');expect(s.progression.awakening.step).toBe(step);expect(sceneContext(s).kind).toBe('ceremony');const day=s.time.absoluteDay;
  s=choose(s,d.choices[step%2].id);expect(s.time.absoluteDay).toBe(day+1);
  if(step===3)result=structuredClone(s.progression.awakening.result);if(step>=3)expect(s.progression.awakening.result).toEqual(result);
 }
 s=v8Act(s,{type:'v8Continue'});const d=v8Decision(s),recommended=d.choices.filter(c=>c.careerId);
 expect(recommended.map(c=>c.careerId)).toEqual(eligibleCareers(s).slice(0,8).map(c=>c.id));expect(recommended.length).toBeLessThanOrEqual(8);for(const c of eligibleCareers(s))expect(missingRequirements(s,c)).toEqual([]);
 expect(d.choices.some(c=>c.id==='career:ordinary'&&c.timeDays===0)).toBe(true);const old=s.time.absoluteDay;s=choose(s,recommended[0].id);expect(s.time.absoluteDay).toBe(old+7);expect(s.progression.activeCareerId).toBe(recommended[0].careerId);
 s=v8Act(s,{type:'v8Continue'});s=v8Act(s,{type:'v8Tick',days:30});expect(s.v8.focus).toBe('rest');expect(s.power.level).toBe(1);expect(s.power.practiceDays).toBe(0);
});

it('cultivation earns real days, pauses mid-month and reaches ten only by manual certification',()=>{
 let s=until(fresh(0),'power.first-realm',{awaken:true,focus:'cultivate'});
 expect(s.power.level).toBe(9);expect(s.power.practiceDays).toBe(266);expect(s.power.practiceDays).toBeLessThan(s.time.absoluteDay-12*360);expect(s.time.absoluteDay%30).toBe(7);expect(hasPower(s)).toBe(true);
 const manualDays=s.journal.filter(e=>e.majorDecision).reduce((sum,e)=>sum+e.days,0);expect(s.v8.routineDays+manualDays).toBe(s.time.absoluteDay-s.time.birthAbsoluteDay);
 expect(()=>v8Act(s,{type:'ascend'})).toThrow();const day=s.time.absoluteDay,stamina=s.stamina,cap=s.maxStamina;s=choose(s,'steady');expect(s.power.level).toBe(10);expect(s.stamina).toBe(stamina-15);expect(s.maxStamina).toBe(cap+5);expect(s.time.absoluteDay).toBe(day);
 s=v8Act(s,{type:'v8Continue'});expect(v8Focuses(s).some(f=>f.id==='cultivate')).toBe(false);expect(hasPower(s)).toBe(true);
});

it('a story trip charges one actual route and changes the scene once while staying does not move',()=>{
 const s=until(fresh(2),'v8.nearby-invitation'),q=v8Decision(s).choices.find(c=>c.id==='visit'),day=s.time.absoluteDay,stamina=s.stamina;
 const a=choose(s,'visit');expect(a.world.currentLocationId).toBe(q.trip.id);expect(a.time.absoluteDay).toBe(day+q.timeDays);expect(a.stamina).toBe(stamina-q.stamina);expect(a.world.visited).toContain(q.trip.id);expect(sceneContext(a).locationId).toBe(q.trip.id);expect(a.world.ledger.filter(e=>e.source==='travel')).toHaveLength(1);
 const b=choose(s,'stay');expect(b.world.currentLocationId).toBe(s.world.currentLocationId);expect(b.time.absoluteDay).toBe(day);
});

it('road options resolve by negotiation, retreat or earned readiness with exact visible costs',()=>{
 const untrained=until(fresh(0),'v8.road-warning',{focus:'rest'}),d=v8Decision(untrained),defend=d.choices.find(c=>c.id==='defend');expect(defend.disabled).toBe(true);expect(()=>choose(untrained,'defend')).toThrow();
 for(const id of ['negotiate','retreat']){const q=d.choices.find(c=>c.id===id),next=choose(untrained,id);expect(next.time.absoluteDay-untrained.time.absoluteDay).toBe(q.timeDays);expect(next.stamina).toBe(untrained.stamina-q.stamina);expect(next.hp).toBe(untrained.hp);}
 const trained=until(fresh(0),'v8.road-warning',{focus:'practice'});expect(v8Decision(trained).choices.find(c=>c.id==='defend').disabled).toBe(false);expect(choose(trained,'defend').v8.flags.roadDefended).toBe(true);
});

it('adult romance, friendship and independence retain different effects and later callbacks',()=>{
 const s=until(fresh(0),'v8.understanding');expect(s.age).toBe(30);expect(s.career).toBe('ผู้ใช้ชีวิตในชุมชน');
 for(const id of ['partner','friend','independent']){let next=choose(s,id);expect(next.v8.relationship).toBe(id);next=until(next,'v8.home-return');next=choose(next,'gather');expect(next.v8.outcome.text).toContain(id==='partner'?'คนที่คบกัน':id==='friend'?'มิตรภาพ':'พื้นที่อิสระ');}
});

it('only authentic non-resumable terminal summaries enter the existing archive once',()=>{
 expect(()=>completedSummary(fresh(0),'2026-10-30T00:00:00Z')).toThrow();const s=simulateV8(0).state,r=completedSummary(s,'2026-10-30T00:00:00Z');
 const store=new Map([['reborn_save','old untouched']]),storage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)};
 archiveCompleted(storage,r);archiveCompleted(storage,r);expect(readArchive(storage)).toHaveLength(1);expect(store.get('reborn_save')).toBe('old untouched');expect(store.size).toBe(2);expect(r.events.length).toBeLessThanOrEqual(8);expect(r).not.toHaveProperty('v8');expect(r).not.toHaveProperty('time');expect(r).not.toHaveProperty('progression');expect(JSON.parse(store.get(ARCHIVE_KEY)).lives[0].endingId).toBe('v8.garden');expect(()=>v8Act(s,{type:'v8Seek'})).toThrow();
});

it('story IDs and windows are valid and callbacks point to real data',()=>{
 expect(new Set(v8LifeEvents.map(e=>e.id)).size).toBe(v8LifeEvents.length);
 for(const e of v8LifeEvents){expect(e.choices.length).toBeGreaterThanOrEqual(2);expect(e.choices.length).toBeLessThanOrEqual(5);expect(e.ageMaxMonths).toBeGreaterThanOrEqual(e.ageMinMonths);expect(new Set(e.choices.map(c=>c.id)).size).toBe(e.choices.length);for(const c of e.choices)if(c.followUp)expect(v8LifeEvents.some(e=>e.id===c.followUp)).toBe(true);}
});
