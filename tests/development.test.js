import {it,expect} from 'vitest';
import {createRun} from '../src/engine/run.js';
import {calendar,ageLabel} from '../src/engine/time.js';
import {pendingDecision,nextDecisionDay} from '../src/engine/decisions.js';
import {availableYearActivities} from '../src/engine/yearly.js';
import {act,simulateV7} from '../scripts/v7-simulation.mjs';
import {findRoute,revealedLocations} from '../src/world/travel.js';
import {developmentEvents} from '../src/data/events/development.js';
const fresh=()=>createRun(8,{id:'development-test',startedAt:'2026-10-29T00:00:00Z'});
const choose=(s,index=0)=>{const d=pendingDecision(s);return act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices[index].id});};
it('uses real month thresholds, care-only infancy and no adult stat, practice, income or location rewards',()=>{
 let s=fresh();const stats={...s.stats},gold=s.gold,location=s.location,thresholds=[0,90,180,360,720,1080];
 for(let i=0;i<thresholds.length;i++){
  expect(s.time.absoluteDay).toBe(thresholds[i]);expect(pendingDecision(s).id).toBe(developmentEvents[i].id);expect(pendingDecision(s).choices).toHaveLength(3);
  if(i<5){expect(availableYearActivities(s).map(a=>a.id)).toEqual(['care']);expect(ageLabel(s)).toBe(`${thresholds[i]/30} เดือน`);}
  s=choose(s);if(i<5)s=act(s,{type:'advanceYears',years:10});
 }
 expect(s.stats).toEqual(stats);expect(s.gold).toBe(gold);expect(s.location).toBe(location);expect(s.progression.practice).toEqual({});expect(s.yearly.focus).toBe('balanced');expect(ageLabel(s)).toBe('3 ปี');expect(s.story.completed).toHaveLength(6);
});
it('stops all timed external actions at an exact trigger and rejects pending or stale bypasses atomically',()=>{
 let s=choose(fresh());s=act(s,{type:'advanceDays',days:89});expect(nextDecisionDay(s)).toBe(90);expect(calendar(s).dayInYear).toBe(89);
 s=act(s,{type:'advanceDays',days:30});expect(s.time.absoluteDay).toBe(90);const before=structuredClone(s);
 for(const action of [{type:'advanceDays',days:30},{type:'advanceYears',years:5},{type:'lifeChoice',choiceId:'infant.lullaby.1'},{type:'train',stat:'wis'},{type:'service',serviceId:'rest'},{type:'careerJob'},{type:'legacyArc'},{type:'journeyChoice',destination:'market',method:'walk'}]){expect(()=>act(s,action)).toThrow();expect(s).toEqual(before);}
 let older=simulateV7(8,{targetAge:8}).state;while(pendingDecision(older))older=choose(older);const boundary=nextDecisionDay(older);older=act(older,{type:'advanceDays',days:boundary-older.time.absoluteDay-3});const stable=structuredClone(older);
 expect(()=>act(older,{type:'train',stat:'wis'})).toThrow(/ข้ามเหตุการณ์/);expect(older).toEqual(stable);older=act(older,{type:'advanceDays',days:30});expect(older.time.absoluteDay).toBe(boundary);expect(pendingDecision(older).id).toBe('child.caravan');
});
it('gives the same real results for month ticks and seeking, without credit for unplayed full years',()=>{
 const start=choose(fresh());const sought=act(start,{type:'advanceDays',days:90});let ticked=start;for(let i=0;i<3;i++)ticked=act(ticked,{type:'advanceDays',days:30});
 ticked.life.revision=sought.life.revision;expect(ticked).toEqual(sought);expect(sought.yearly.reports[0].days).toBe(90);expect(sought.yearly.reports[0].endDay).toBe(90);expect(calendar(sought).yearProgress).toBe(.25);
 expect(sought.journal.some(e=>e.eventId?.startsWith('infant.'))).toBe(false);
});
it('carries early choices into later relationships, learning and a genuinely conditional community choice',()=>{
 const a=simulateV7(8,{targetAge:10,policy:0}).state,b=simulateV7(8,{targetAge:10,policy:1}).state;
 expect(a.story.relationships.community).toBeGreaterThan(b.story.relationships.community);expect(a.story.flags.shared_toy).toBe(true);expect(b.story.flags.shared_toy).toBeUndefined();
 expect(pendingDecision(a).choices[0].disabled).toBe(false);expect(pendingDecision(b).choices[0].disabled).toBe(true);
 expect(()=>choose(b)).toThrow(/คืนถุงเงิน/);const bNext=choose(b,1);expect(bNext.story.flags.community_guide).toBe(true);
 const feedback=a.journal.find(e=>e.majorDecision==='dev.library');expect(feedback.effects).toContainEqual({op:'relationship',key:'community',amount:2});
});
it('keeps all seven ritual steps manual, archives the measured result once and resumes without rerolling',()=>{
 let s=simulateV7(8,{targetAge:12}).state;for(let i=0;i<4;i++){expect(pendingDecision(s).stage).toBe(i);s=choose(s);expect(s.progression.awakening.step).toBe(i+1);}
 const measured=structuredClone(s.progression.awakening.result);s=choose(s,2);expect(s.progression.awakening.paused).toBe(true);s=act(s,{type:'beginAwakening'});for(let i=4;i<7;i++)s=choose(s);
 expect(s.progression.awakening.result).toEqual(measured);expect(s.journal.filter(e=>e.eventId?.startsWith('awakening.'))).toHaveLength(7);expect(s.journal.filter(e=>e.eventId?.startsWith('awakening.')).every(e=>!e.automatic)).toBe(true);
});
it('moves only through an explicit journey choice, with exact time, stamina and ledger costs',()=>{
 let s=simulateV7(8,{targetAge:12,ceremony:true}).state;s=act(s,{type:'yearFocus',focus:'explore'});const current=s.world.currentLocationId;s=act(s,{type:'advanceDays',days:30});expect(s.world.currentLocationId).toBe(current);if(pendingDecision(s))s=choose(s);
 const destination=[...revealedLocations(s)].find(id=>findRoute(s,id,'walk')),route=findRoute(s,destination,'walk'),before=structuredClone(s);
 expect(()=>act(s,{type:'travel',destination})).toThrow(/หน้าหลัก/);
 s=act(s,{type:'journeyChoice',destination,method:'stay'});expect(s.time).toEqual(before.time);expect(s.world).toEqual(before.world);
 const time=s.time.absoluteDay,gold=s.gold,stamina=s.stamina;s=act(s,{type:'journeyChoice',destination,method:'walk'});expect(s.world.currentLocationId).toBe(destination);expect(s.time.absoluteDay).toBe(time+route.days);expect(s.gold).toBe(gold);expect(s.stamina).toBe(stamina-route.days*2);expect(s.world.ledger.at(-1).source).toBe('travel');
});
it('reaches every new fork and all 27 real choices across the three deterministic policies',()=>{
 const reached=new Set(),choices=new Set();for(let policy=0;policy<3;policy++){const result=simulateV7(8,{targetAge:12,ceremony:true,policy});for(const id of result.events)reached.add(id);for(const id of result.choices)choices.add(id);}
 for(const e of developmentEvents){expect(reached.has(e.id)).toBe(true);for(const c of e.choices)expect(choices.has(c.id)).toBe(true);}
});
