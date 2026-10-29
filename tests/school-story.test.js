import {it,expect} from 'vitest';
import {createRun} from '../src/engine/run.js';
import {pendingDecision,nextDecisionDay} from '../src/engine/decisions.js';
import {schoolEvents} from '../src/data/events/school.js';
import {act,simulateV7} from '../scripts/v7-simulation.mjs';
import {trainingQuote} from '../src/progression/engine.js';
function choose(s,index=0){const d=pendingDecision(s);return act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices[index].id});}
function until(id,{overrides={},practice=false}={}){
 let s=createRun(8,{id:'school-test',startedAt:'2026-10-29T00:00:00Z'});
 for(let steps=0;steps<120;steps++){
  const d=pendingDecision(s);if(d?.id===id)return s;
  if(d){const option=overrides[d.id]??d.choices.findIndex(c=>!c.disabled);s=choose(s,option);}
  else if(practice&&s.age>=8&&!Object.values(s.progression.practice).some(x=>x>0))s=act(s,{type:'train',stat:'wis'});
  else s=act(s,{type:'advanceDays',days:3600});
 }
 throw Error('Unreached school event: '+id);
}
it('stops at every new exact month, records manual zero-day choices and leaves the actual ritual at twelve',()=>{
 const {state:s}=simulateV7(8,{targetAge:12,practiceAtEight:true});
 for(const event of schoolEvents){
  const records=s.journal.filter(e=>e.majorDecision===event.id);expect(records).toHaveLength(1);
  expect(records[0]).toMatchObject({ageMonths:event.month,sourceId:event.sourceId});expect(records[0].automatic).not.toBe(true);
 }
 expect(s.time.absoluteDay).toBe(12*360);expect(pendingDecision(s).kind).toBe('awakening');expect(s.progression.awakening.step).toBe(0);expect(s.power.level).toBe(1);
 const chronological=[...schoolEvents.map(e=>e.month),72,96,120];
 for(let year=4;year<12;year++)expect(chronological.filter(m=>Math.floor(m/12)===year).length).toBeLessThanOrEqual(2);
});
it('keeps seed play and toy-making supervised without granting money, equipment, adult stats or practice',()=>{
 for(const id of ['child.seeds','child.mechanism'])for(let option=0;option<3;option++){
  const before=until(id),after=choose(before,option);
  expect(after.time).toEqual(before.time);expect(after.stats).toEqual(before.stats);expect(after.gold).toBe(before.gold);expect(after.world).toEqual(before.world);
  expect(after.progression).toEqual(before.progression);expect(after.power).toEqual(before.power);expect(after.story.completed).toContain(id);
  expect(after.story.flags).not.toEqual(before.story.flags);expect({memory:after.childhoodMemory,bonds:after.story.relationships}).not.toEqual({memory:before.childhoodMemory,bonds:before.story.relationships});
 }
});
it('requires real prior practice/records, rejects bypasses atomically and retains free routes to the ceremony',()=>{
 const untrained=until('child.fair'),before=structuredClone(untrained);expect(pendingDecision(untrained).choices[0].disabled).toBe(true);
 expect(()=>choose(untrained)).toThrow(/ฝึกพื้นฐานจริง/);expect(untrained).toEqual(before);
 const trained=until('child.fair',{practice:true}),oldPractice={...trained.progression.practice},shown=choose(trained);
 expect(shown.story.flags.child_shown_practice).toBe(true);expect(shown.progression.practice).toEqual(oldPractice);expect(shown.power.level).toBe(1);
 const noRecord=until('child.eve');expect(pendingDecision(noRecord).choices[0].disabled).toBe(true);expect(()=>choose(noRecord)).toThrow(/ต้องมีบันทึก/);
 const record=until('child.eve',{practice:true});expect(pendingDecision(record).choices[0].disabled).toBe(false);
 let free=choose(noRecord,1);expect(free.gold).toBe(noRecord.gold);expect(nextDecisionDay(free)).toBe(4320);free=act(free,{type:'advanceYears',years:5});expect(pendingDecision(free).kind).toBe('awakening');
});
it('applies caravan guidance only to later actual seven-day training and never changes location',()=>{
 const before=until('child.caravan'),base=trainingQuote(before,'per'),guided=choose(before),quote=trainingQuote(guided,'per');
 expect(guided.stats).toEqual(before.stats);expect(guided.progression).toEqual(before.progression);expect(guided.world).toEqual(before.world);expect(guided.gold).toBe(before.gold);expect(quote.xp).toBe(base.xp+1);
 const practiced=act(guided,{type:'train',stat:'per'});expect(practiced.time.absoluteDay).toBe(guided.time.absoluteDay+7);expect(practiced.progression.practice.per).toBe(quote.xp);expect(practiced.world.currentLocationId).toBe(before.world.currentLocationId);
});
it('carries the chosen seed and workshop experience into distinct later learning outcomes',()=>{
 const quick=until('child.fair'),patient=until('child.fair',{overrides:{'child.seeds':1}}),a=choose(quick,2),b=choose(patient,2);
 expect(a.story.learning.wis).toBe(1);expect(b.story.learning.wis).toBe(2);expect(trainingQuote(b,'wis').xp-trainingQuote(a,'wis').xp).toBe(1);
 const helper=until('child.fair',{practice:true,overrides:{'child.workshop':1}}),observer=until('child.fair',{practice:true});
 expect(choose(helper).story.learning.con).toBe(1);expect(choose(observer).story.learning.con??0).toBe(0);
});
it('returns to childhood choices in teenage travel advice and letters with bounded real training effects',()=>{
 const route=until('teen.invitation'),greetings=until('teen.invitation',{overrides:{'child.caravan':1}}),a=choose(route),b=choose(greetings);
 expect(a.story.learning.per).toBe(3);expect(b.story.learning.per).toBe(1);expect(a.world.currentLocationId).toBe(route.world.currentLocationId);expect(a.gold).toBe(route.gold);
 const penpal=until('teen.letter',{overrides:{'child.farewell':1,'teen.mentor':2,'teen.budget':2,'teen.direction':1}});
 // Choose a real study direction in this separate path so the letter gate is earned.
 const studying=until('teen.letter',{overrides:{'child.farewell':1,'teen.funding':1,'teen.mentor':2,'teen.budget':2}}),plain=until('teen.letter',{overrides:{'teen.funding':1,'teen.mentor':2,'teen.budget':2}});
 expect(pendingDecision(penpal).choices[0].disabled).toBe(true);
 expect(studying.story.learning.int).toBe(1);expect(plain.story.learning.int).toBe(1);
 const shared=choose(studying),ordinary=choose(plain);expect(shared.story.learning.int).toBe(3);expect(ordinary.story.learning.int).toBe(2);
 const alreadySupported=until('teen.letter',{overrides:{'child.farewell':1,'teen.mentor':2,'teen.budget':2}});expect(choose(alreadySupported).story.lastOutcome.effects.filter(e=>e.op==='learning').map(e=>e.amount)).toEqual([1,0]);
 expect(Object.values(shared.story.learning).every(x=>x<=3)).toBe(true);
});
