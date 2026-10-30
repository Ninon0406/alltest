import {it,expect} from 'vitest';
import {simulateV8,v8Act,chooseV8Policy} from '../scripts/v8-simulation.mjs';
import {v8Decision,v8NextDecisionDay,eligibleV8Events} from '../src/engine/v8-model.js';
import {v8EndingId} from '../src/data/v8-endings.js';
import {storyToken} from '../src/engine/life.js';
import {dispatchV8} from '../src/engine/v8-life-loop.js';
import {completedSummary,archiveCompleted,readArchive} from '../src/save/archive.js';
import {sceneContext} from '../src/world/scene-context.js';

const take=(s,id)=>v8Act(s,{type:'v8Choice',decisionId:v8Decision(s).id,choiceId:id});
const next=s=>v8Act(v8Act(s,{type:'v8Continue'}),{type:'v8Seek'});
function at(id,{storyPath='fairwork',focus='rest',...options}={}){
 const s=simulateV8(0,{policy:0,storyPath,focus,stopEvent:id,...options}).state;
 expect(v8Decision(s)?.id).toBe(id);return s;
}

it('teacher and public-presentation options require real childhood history and earned knowledge',()=>{
 const noTeacher=at('v8.hard-assignment'),q=v8Decision(noTeacher).choices.find(c=>c.id==='teacher');expect(q.disabled).toBe(true);expect(()=>take(noTeacher,'teacher')).toThrow();
 const teacher=at('v8.hard-assignment',{choose:(d,p,o)=>d.id==='v8.old-book'?d.choices.find(c=>c.id==='teacher'):chooseV8Policy(d,p,o)});
 expect(v8Decision(teacher).choices.find(c=>c.id==='teacher').disabled).toBe(false);expect(take(teacher,'teacher').v8.flags.assignmentMentor).toBe(true);expect(teacher.birth).toEqual(noTeacher.birth);
 const low=at('v8.public-project',{policy:2}),high=at('v8.public-project',{focus:'stories'});
 expect(low.v8.knowledge).toBeLessThan(25);expect(v8Decision(low).choices.find(c=>c.id==='present').disabled).toBe(true);expect(high.v8.knowledge).toBeGreaterThanOrEqual(25);expect(take(high,'present').v8.flags.publicNotes).toBe(true);
});

it('delivered work creates an unspendable receivable and partial payment stops at both exact callbacks',()=>{
 const s=at('v8.workshop-commission'),q=v8Decision(s).choices.find(c=>c.id==='partner'),done=take(s,'partner');
 expect(done.gold).toBe(s.gold);expect(done.v8.wagesDue).toBe(10);expect(done.stamina).toBe(s.stamina-6);expect(done.time.absoluteDay-s.time.absoluteDay).toBe(4);expect(done.v8.outcome.changes).toMatchObject({wagesDue:10});expect(q.costGold).toBe(0);
 expect(done.world.ledger.filter(e=>e.source.startsWith('wages:'))).toHaveLength(0);expect(()=>v8Act(done,{type:'v8Seek'})).toThrow();
 const due=next(done);expect(due.time.absoluteDay-due.time.birthAbsoluteDay).toBe(255*30);expect(v8Decision(due).id).toBe('v8.delayed-payment');expect(v8NextDecisionDay(due)).toBe(due.time.absoluteDay);
 const action={type:'v8Choice',decisionId:'v8.delayed-payment',choiceId:'part',token:storyToken(due)},paid=dispatchV8(due,action);
 expect(paid.gold-due.gold).toBe(5);expect(paid.v8.wagesDue).toBe(5);expect(paid.time).toEqual(due.time);expect(paid.v8.outcome.changes).toMatchObject({gold:5,wagesDue:-5});expect(()=>dispatchV8(paid,action)).toThrow();expect(due.v8.wagesDue).toBe(10);
 const follow=next(paid);expect(v8Decision(follow).id).toBe('v8.payment-followup');expect(follow.time.absoluteDay-follow.time.birthAbsoluteDay).toBe(258*30);
 const closed=take(follow,'collect');expect(closed.gold-s.gold).toBe(10);expect(closed.v8.wagesDue).toBe(0);expect(closed.world.ledger.filter(e=>e.source.startsWith('wages:')).reduce((n,e)=>n+e.amount,0)).toBe(10);
});

it('material costs, full collection and voluntary waiver conserve the actual wallet and ledger',()=>{
 const s=at('v8.workshop-commission'),done=take(s,'limited');expect(done.gold).toBe(s.gold-8);expect(done.v8.wagesDue).toBe(28);expect(done.time.absoluteDay).toBe(s.time.absoluteDay+7);
 const due=next(done),collected=take(due,'collect'),waived=take(due,'release');
 expect(collected.gold).toBe(s.gold+20);expect(collected.v8.wagesDue).toBe(0);expect(collected.world.ledger.filter(e=>e.source.startsWith('wages:')).map(e=>e.amount)).toEqual([28]);
 expect(waived.gold).toBe(due.gold);expect(waived.v8.wagesDue).toBe(0);expect(waived.v8.outcome.changes.gold).toBeUndefined();expect(waived.v8.outcome.changes.wagesDue).toBe(-28);expect(waived.world.ledger.filter(e=>e.source.startsWith('wages:'))).toEqual([]);
 const cancelled=take(s,'decline');expect(cancelled.gold).toBe(s.gold);expect(cancelled.v8.wagesDue).toBe(0);expect(eligibleV8Events(v8Act(cancelled,{type:'v8Continue'})).map(e=>e.id)).not.toContain('v8.delayed-payment');
});

it('callbacks vanish when declined and optional research never blocks the next real time boundary',()=>{
 const quiet=at('v8.steady-work',{storyPath:'quiet'});expect(quiet.v8.completed).not.toContain('v8.delayed-payment');expect(quiet.v8.completed).not.toContain('v8.payment-followup');expect(quiet.v8.completed).not.toContain('v8.archive-review');expect(quiet.v8.wagesDue).toBe(0);
 const study=at('v8.archive-review',{storyPath:'library',focus:'study'});expect(study.v8.flags.researchNotebook).toBe(true);expect(study.time.absoluteDay-study.time.birthAbsoluteDay).toBe(264*30);expect(sceneContext(study).kind).toBe('classroom');
 const declined=take(study,'private');expect(declined.v8.flags.researchVerified).toBeUndefined();expect(sceneContext(declined).kind).toBe('outdoor');expect(declined.world.currentLocationId).toBe(study.world.currentLocationId);
 expect(eligibleV8Events(v8Act(declined,{type:'v8Continue'})).map(e=>e.id)).not.toContain('v8.community-library');
});

it('every new epilogue requires several actual decisions and can be declined without ending life early',()=>{
 const deny={library:['v8.school-return','rest'],family:['v8.family-reunion','boundaries'],circle:['v8.care-handover','retire'],fairwork:['v8.rival-alliance','fair']};
 for(const [storyPath,[event,choice]]of Object.entries(deny)){
  const options={policy:0,storyPath,focus:storyPath==='library'?'study':'bonds'};
  const good=simulateV8(0,options).state,bad=simulateV8(0,{...options,choose:(d,p,o)=>d.id===event?d.choices.find(c=>c.id===choice):d.id==='v8.work-handover'&&storyPath==='fairwork'?d.choices.find(c=>c.id==='rest'):chooseV8Policy(d,p,o)}).state;
  expect(good.run.endingId).toBe(`v8.${storyPath}`);expect(v8EndingId(bad)).not.toBe(`v8.${storyPath}`);expect(good.time.absoluteDay).toBe(bad.time.absoluteDay);expect(good.age).toBe(good.birth.lifespan);expect(good.progression.activeCareerId).toBeNull();expect(good.power.practiceDays).toBe(0);
 }
});

it('new terminal records coexist with earlier epilogues and still contain no resumable account or story state',()=>{
 const data=new Map([['reborn_save','old-active-sentinel']]),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 const old=simulateV8(0).state;archiveCompleted(storage,completedSummary(old,'2026-10-30T00:00:00Z'));
 for(const storyPath of ['library','family','circle','fairwork']){
  const s=simulateV8(0,{storyPath,policy:0,focus:storyPath==='library'?'study':'bonds'}).state;
  // Independent real run IDs distinguish these birth-to-natural-end test lives.
  s.run.id=`callback-${storyPath}`;const summary=completedSummary(s,'2026-10-30T00:00:00Z');archiveCompleted(storage,summary);archiveCompleted(storage,summary);
  expect(summary.unpaidWages).toBe(s.v8.wagesDue);for(const key of ['v8','time','progression','flags','world'])expect(summary).not.toHaveProperty(key);
 }
 expect(readArchive(storage)).toHaveLength(5);expect(data.get('reborn_save')).toBe('old-active-sentinel');
});

it('new life histories reconcile all manual and routine days without adding power or automatic income',()=>{
 for(const storyPath of ['library','family','circle','fairwork']){
  const s=simulateV8(0,{storyPath,policy:0,focus:storyPath==='library'?'study':'bonds'}).state;
  const manualDays=s.journal.filter(e=>e.majorDecision).reduce((n,e)=>n+e.days,0),ledgerGold=s.world.ledger.reduce((n,e)=>n+e.amount,0);
  const initial=s.birth.initial.gold;
  expect(s.v8.routineDays+manualDays).toBe(s.time.absoluteDay-s.time.birthAbsoluteDay);expect(s.gold).toBe(initial+ledgerGold);expect(s.power.practiceDays).toBe(0);expect(s.v8.wagesDue).toBe(0);
 }
});

it('a genuinely short natural lifespan closes before an unearned later library callback',()=>{
 const s=simulateV8(35,{storyPath:'library',policy:0,focus:'study'}).state;
 expect(s.birth.lifespan).toBe(65);expect(s.v8.flags.libraryPublished).toBe(true);expect(s.v8.flags.schoolLegacy).toBeUndefined();expect(s.v8.completed).not.toContain('v8.school-return');expect(s.run.endingId).not.toBe('v8.library');expect(s.run.status).toBe('ended');expect(s.age).toBe(65);expect(()=>completedSummary(s,'2026-10-30T00:00:00Z')).not.toThrow();
});
