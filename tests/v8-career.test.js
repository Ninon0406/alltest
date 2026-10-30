import {it,expect} from 'vitest';
import {simulateV8,v8Act,chooseV8Policy} from '../scripts/v8-simulation.mjs';
import {v8Decision,v8NextDecisionDay} from '../src/engine/v8-model.js';
import {v8CanResumeCareer,v8PromotionMissing} from '../src/engine/v8-career-model.js';
import {dispatchV8} from '../src/engine/v8-life-loop.js';
import {storyToken} from '../src/engine/life.js';
import {calendar} from '../src/engine/time.js';
import {validateProgression} from '../src/progression/validate.js';
import {jobQuote} from '../src/progression/engine.js';
import {completedSummary,archiveCompleted,readArchive} from '../src/save/archive.js';
import {sceneContext} from '../src/world/scene-context.js';

const seeds={farmer:0,smith:0,healer:2,scholar:1},endings={farmer:'v8.seedbank',smith:'v8.repairs',healer:'v8.consent',scholar:'v8.margins'};
function at(id,{careerId='smith',focus='study',...options}={}){
 const s=simulateV8(seeds[careerId],{awaken:true,policy:0,focus,careerId,storyPath:'vocation',stopEvent:id,...options}).state;
 expect(v8Decision(s)?.id).toBe(id);return s;
}
const take=(s,id)=>v8Act(s,{type:'v8Choice',decisionId:v8Decision(s).id,choiceId:id});

it('original career responses spend seven real days and apply their existing stat/XP/perk exactly once',()=>{
 const s=at('career.smith.1',{focus:'rest'}),day=s.time.absoluteDay,r=s.progression.records.smith;
 expect(calendar(s).ageMonths).toBe(150);expect(r.arcStep).toBe(0);expect(r.xp).toBe(0);expect(v8NextDecisionDay(s)).toBe(day);
 const a=take(s,'career.smith.1.1'),b=take(s,'career.smith.1.2');
 expect(a.time.absoluteDay-day).toBe(7);expect(a.stats.str-s.stats.str).toBe(1);expect(a.progression.records.smith).toMatchObject({xp:10,mastery:5,arcStep:1,trainingBonus:1,payBonus:0});
 expect(b.stats.con-s.stats.con).toBe(1);expect(b.progression.records.smith).toMatchObject({xp:6,mastery:3,arcStep:1,trainingBonus:0,payBonus:1});
 for(const next of [a,b]){expect(next.power).toEqual(s.power);expect(next.gold).toBe(s.gold);expect(next.birth).toEqual(s.birth);expect(()=>validateProgression(next)).not.toThrow();expect(()=>v8Act(next,{type:'v8Seek'})).toThrow();}
 expect(a.v8.outcome.changes).toMatchObject({str:1,careerXp:10,careerMastery:5,trainingBonus:1});
});

it('paused career work keeps the same record and can resume manually without granting progress',()=>{
 const s=at('career.smith.1',{focus:'rest'}),paused=take(s,'career:pause');expect(paused.time).toEqual(s.time);expect(paused.progression).toEqual(s.progression);
 let next=v8Act(paused,{type:'v8Continue'});expect(v8CanResumeCareer(next)).toBe(true);expect(v8Decision(next)).toBeNull();
 next=v8Act(next,{type:'v8Focus',focus:'study'});const before=structuredClone(next);expect(next.progression.records.smith.xp).toBe(0);
 next=v8Act(next,{type:'v8Tick',days:30});expect(next.progression.records.smith.xp).toBeGreaterThan(0);expect(next.progression.records.smith.arcStep).toBe(0);expect(next.power.practiceDays).toBe(0);expect(next.stats.str).toBeGreaterThanOrEqual(before.stats.str);
 const resume=v8Act(next,{type:'v8ResumeCareer'});expect(resume.time).toEqual(next.time);expect(resume.progression).toEqual(next.progression);expect(v8Decision(resume).id).toBe('career.smith.1');
});

it('every career and promotion boundary pauses at its actual scheduled age',()=>{
 for(const [id,month]of [['career.smith.1',150],['career.smith.2',174],['career.smith.3',198],['v8.promotion:smith',222]]){
  const s=at(id);expect(calendar(s).ageMonths).toBe(month);expect(v8NextDecisionDay(s)).toBe(s.time.absoluteDay);expect(()=>v8Act(s,{type:'v8Tick',days:30})).toThrow();
 }
});

it('manual promotion uses earned records and applies its original resource/wage reward once',()=>{
 const s=at('v8.promotion:smith'),r=s.progression.records.smith,before=structuredClone(s);
 expect(r).toMatchObject({arcStep:3,advanced:false});expect(r.xp).toBeGreaterThanOrEqual(120);expect(r.mastery).toBeGreaterThanOrEqual(60);expect(v8PromotionMissing(s)).toEqual([]);
 const action={type:'v8Choice',decisionId:'v8.promotion:smith',choiceId:'career:promote',token:storyToken(s)},promoted=dispatchV8(s,action);
 expect(s).toEqual(before);expect(promoted.time.absoluteDay-s.time.absoluteDay).toBe(7);expect(promoted.progression.records.smith.advanced).toBe(true);expect(promoted.maxHp-s.maxHp).toBe(15);expect(promoted.hp-s.hp).toBe(15);expect(promoted.gold).toBe(s.gold);expect(promoted.power).toEqual(s.power);expect(promoted.career).toBe('ช่างศาสตราประจำเมือง');
 expect(jobQuote(promoted).gold-jobQuote(s).gold).toBe(5);expect(()=>dispatchV8(promoted,action)).toThrow();expect(()=>validateProgression(promoted)).not.toThrow();
});

it('time alone and an unfinished formal path cannot grant promotion',()=>{
 const rest=simulateV8(0,{awaken:true,careerId:'smith',focus:'rest',stopAge:30}).state;
 expect(rest.progression.records.smith).toMatchObject({arcStep:3,xp:30,mastery:15,advanced:false});expect(v8PromotionMissing(rest).length).toBeGreaterThan(0);
 const paused=simulateV8(0,{awaken:true,careerId:'smith',focus:'study',careerPolicy:'pause',stopAge:30}).state;
 expect(paused.progression.records.smith.arcStep).toBe(0);expect(paused.progression.records.smith.xp).toBeGreaterThan(120);expect(paused.progression.records.smith.advanced).toBe(false);expect(paused.power.practiceDays).toBe(0);
});

it('vocation job receipts use one real wage, resource cost, seven days and ledger entry',()=>{
 const s=at('v8.broken-tools'),q=v8Decision(s).choices.find(c=>c.id==='repair'),beforeLedger=s.world.ledger.length,after=take(s,'repair');
 expect(after.gold-s.gold).toBe(q.earnedGold);expect(after.stamina).toBe(s.stamina-q.stamina);expect(after.time.absoluteDay-s.time.absoluteDay).toBe(7);expect(after.progression.records.smith.xp-s.progression.records.smith.xp).toBe(q.skillXp);
 expect(after.world.ledger).toHaveLength(beforeLedger+1);expect(after.world.ledger.at(-1)).toMatchObject({source:'career:smith',amount:q.earnedGold});expect(after.journal.filter(e=>e.majorDecision==='v8.broken-tools')).toHaveLength(1);expect(after.power).toEqual(s.power);expect(after.equipment).toEqual(s.equipment);
});

it('vocation practice uses the true monthly training quote without power or extra elapsed days',()=>{
 const s=at('v8.seed-trial',{careerId:'farmer'}),q=v8Decision(s).choices.find(c=>c.id==='compare'),after=take(s,'compare');
 expect(after.time.absoluteDay-s.time.absoluteDay).toBe(7);expect(after.progression.practice.wis-s.progression.practice.wis).toBe(q.skillXp);expect(after.progression.records.farmer.xp-s.progression.records.farmer.xp).toBe(q.skillXp);expect(after.stamina).toBe(s.stamina-q.stamina);expect(after.progression.focus).toBe(s.progression.focus-q.focusCost);expect(after.gold).toBe(s.gold);expect(after.world.ledger).toEqual(s.world.ledger);expect(after.power).toEqual(s.power);expect(after.journal.filter(e=>e.majorDecision==='v8.seed-trial')).toHaveLength(1);
});

it('all four professional epilogues need actual promotion and voluntary project completion',()=>{
 for(const careerId of Object.keys(seeds)){
  const options={awaken:true,careerId,storyPath:'vocation',focus:'study',policy:0};
  const s=simulateV8(seeds[careerId],options).state;
  expect(s.run.endingId).toBe(endings[careerId]);expect(s.age).toBe(s.birth.lifespan);expect(s.power.practiceDays).toBe(0);expect(s.progression.records[careerId].advanced).toBe(true);
  const unpromoted=simulateV8(seeds[careerId],{...options,choose:(d,p,o)=>d.kind==='promotion'?d.choices.at(-1):chooseV8Policy(d,p,o)}).state;
  expect(unpromoted.run.endingId).not.toBe(endings[careerId]);expect(unpromoted.progression.records[careerId].advanced).toBe(false);expect(unpromoted.time.absoluteDay).toBe(s.time.absoluteDay);
  const manual=s.journal.filter(e=>e.majorDecision).reduce((n,e)=>n+e.days,0);expect(s.v8.routineDays+manual).toBe(s.time.absoluteDay-s.time.birthAbsoluteDay);expect(s.gold).toBe(s.birth.initial.gold+s.world.ledger.reduce((n,e)=>n+e.amount,0));
 }
});

it('declining projects and missing skill readiness keep a free ordinary route',()=>{
 const s=at('v8.seed-trial',{careerId:'farmer'}),next=take(s,'watch');expect(next.world).toEqual(s.world);expect(next.equipment).toEqual(s.equipment);expect(next.v8.flags.seedTrial).toBeUndefined();expect(next.time).toEqual(s.time);
 const tired=structuredClone(s);tired.stamina=0;
 const d=v8Decision(tired);expect(d.choices.find(c=>c.id==='compare').disabled).toBe(true);expect(d.choices.at(-1).disabled).toBe(false);expect(()=>take(tired,'compare')).toThrow();expect(take(tired,'watch').v8.flags.seedRest).toBe(true);
 const scholar=at('v8.unfinished-map',{careerId:'scholar'});expect(sceneContext(scholar).kind).toBe('classroom');const ended=take(scholar,'limits');expect(sceneContext(ended).kind).toBe('outdoor');expect(ended.world.currentLocationId).toBe(scholar.world.currentLocationId);
});

it('professional archive records remain terminal summaries without career progress that could resume a run',()=>{
 const store=new Map(),storage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)};
 for(const careerId of Object.keys(seeds)){
  const s=simulateV8(seeds[careerId],{awaken:true,careerId,storyPath:'vocation',focus:'study',policy:0}).state;
  const summary=completedSummary(s,'2026-10-30T00:00:00Z');summary.runId=`professional-${careerId}`;archiveCompleted(storage,summary);
  expect(summary.endingId).toBe(endings[careerId]);expect(summary.career).toBe(s.career);for(const key of ['progression','practice','v8','world','time'])expect(summary).not.toHaveProperty(key);
 }
 expect(readArchive(storage)).toHaveLength(4);
});
