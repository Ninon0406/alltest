import {v8LifeEvents,v8Observations} from '../src/data/v8-life-events.js';
import {v8Endings} from '../src/data/v8-endings.js';
import {simulateV8,chooseV8Policy,v8Act} from './v8-simulation.mjs';
import {v8Decision} from '../src/engine/v8-model.js';
import {eligibleCareers} from '../src/progression/engine.js';
import {completedSummary} from '../src/save/archive.js';
import {v8CommunityEvents} from '../src/data/v8-community-events.js';
import {v8CallbackPaths} from './v8-story-policies.mjs';
import {v8CareerEvents} from '../src/data/v8-career-events.js';
import {careerEvents} from '../src/data/events/careers.js';
import {validateProgression} from '../src/progression/validate.js';
export function auditV8(){
 const ids=new Set(),allChoices=new Set(),seen=new Set(),reached=new Set(),endings=new Set(),origins=new Set();let lives=0,minAge=Infinity,maxAge=0,maxSteps=0;
 for(const e of v8LifeEvents){
  if(ids.has(e.id)||!e.once||!e.interrupt||e.choices.length<2||e.choices.length>5)throw Error('Invalid V8 event '+e.id);ids.add(e.id);
  for(const c of e.choices){const key=`${e.id}:${c.id}`;if(allChoices.has(key)||!c.outcomeText||c.timeDays<0)throw Error('Invalid V8 choice '+key);allChoices.add(key);if(c.followUp&&!v8LifeEvents.some(e=>e.id===c.followUp))throw Error('Missing V8 callback');}
 }
 function run(seed,options={}){
  const {state:s,seen:trace,steps}=simulateV8(seed,options);lives++;maxSteps=Math.max(maxSteps,steps);minAge=Math.min(minAge,s.age);maxAge=Math.max(maxAge,s.age);
  if(s.run.status!=='ended'||s.age!==s.birth.lifespan)throw Error('V8 lifetime stalled');completedSummary(s,'2026-10-30T00:00:00Z');
  for(const id of trace.events)seen.add(id);for(const id of trace.choices)reached.add(id);endings.add(s.run.endingId);origins.add(s.birth.archetypeId);return s;
 }
 for(const seed of [...Array(100).keys(),108])run(seed);
 // Target conditional callbacks, every strategy in each real origin, and naturally long-lived eras.
 for(const seed of [0,1,2,5,8,17,108])for(let policy=0;policy<4;policy++)run(seed,{policy});
 for(let reply=0;reply<3;reply++)run(8,{policy:0,choose:(d,p,options)=>d.id==='v8.scholarship-reply'?d.choices[reply]:chooseV8Policy(d,p,options)});
 run(0,{policy:2,focus:'practice'});
 run(0,{policy:0,awaken:true});
 run(0,{policy:2,choose:(d,p,options)=>d.id==='v8.nearby-invitation'?d.choices.find(c=>c.id==='stay'):chooseV8Policy(d,p,options)});
 const checkpointPaths=new Set();
 for(const event of v8CommunityEvents)for(const target of event.choices){
  const storyPath=v8CallbackPaths[event.id.slice(3)];
  let selectedTarget=false;
  const s=run(0,{policy:0,storyPath,focus:storyPath==='library'?'study':'bonds',choose:(d,p,options)=>{
   if(d.id===event.id){selectedTarget=true;return d.choices.find(c=>c.id===target.id);}
   if(selectedTarget)return chooseV8Policy(d,p,{...options,storyPath:'quiet'});
   if(d.id==='v8.old-book'&&event.id==='v8.hard-assignment'&&target.id==='teacher')return d.choices.find(c=>c.id==='teacher');
   if(d.id==='v8.delayed-payment'&&event.id==='v8.payment-followup')return d.choices.find(c=>c.id==='part');
   return chooseV8Policy(d,p,options);
  }});
  if(!s.v8.completed.includes(event.id))throw Error(`Callback was not reached: ${event.id}:${target.id}`);
  checkpointPaths.add(`${event.id}:${target.id}`);
 }
 for(const storyPath of ['library','family','circle','fairwork']){
  const s=run(0,{policy:0,storyPath,focus:storyPath==='library'?'study':'bonds'});
  if(s.run.endingId!==`v8.${storyPath}`)throw Error('Wrong chained ending '+storyPath);
 }
 const vocationSeeds={farmer:0,healer:2,smith:0,scholar:1},vocationEndings={farmer:'v8.seedbank',healer:'v8.consent',smith:'v8.repairs',scholar:'v8.margins'};
 let vocationChoiceLives=0;
 for(const event of v8CareerEvents)for(const target of event.choices){
  vocationChoiceLives++;
  const careerId=event.requires.careerId;let selected=false;
  const s=run(vocationSeeds[careerId],{awaken:true,policy:0,careerId,focus:'study',storyPath:'vocation',choose:(d,p,o)=>{
   if(d.id===event.id){selected=true;return d.choices.find(c=>c.id===target.id);}
   return chooseV8Policy(d,p,selected?{...o,storyPath:'quiet'}:o);
  }});
  if(!s.v8.completed.includes(event.id))throw Error('Unreached vocation callback '+event.id);
 }
 for(const [careerId,seed]of Object.entries(vocationSeeds)){
  const s=run(seed,{awaken:true,policy:0,careerId,focus:'study',storyPath:'vocation'});
  if(s.run.endingId!==vocationEndings[careerId]||!s.progression.records[careerId].advanced||s.power.practiceDays!==0)throw Error('Unreachable professional epilogue '+careerId);
 }
 const reps=new Map();for(let seed=0;seed<200&&reps.size<20;seed++){
  const r=simulateV8(seed,{stopAge:12});if(!reps.has(r.state.birth.archetypeId))reps.set(r.state.birth.archetypeId,r.state);
 }
 for(let s of reps.values()){
  s=v8Act(s,{type:'v8Choice',decisionId:v8Decision(s).id,choiceId:'join'});
  for(let i=0;i<7;i++){s=v8Act(s,{type:'v8Continue'});const d=v8Decision(s);s=v8Act(s,{type:'v8Choice',decisionId:d.id,choiceId:d.choices[i%2].id});}
  s=v8Act(s,{type:'v8Continue'});if(!eligibleCareers(s).length||v8Decision(s).choices.filter(c=>c.careerId).length>8)throw Error('Origin has no eligible V8 career');
 }
 const careerSeeds=new Map();
 for(let seed=0;seed<1000&&careerSeeds.size<20;seed++)simulateV8(seed,{policy:0,awaken:true,stopAge:13,choose:(d,p,options)=>{
  if(d.kind==='career')for(const c of d.choices)if(c.careerId&&!careerSeeds.has(c.careerId))careerSeeds.set(c.careerId,seed);
  return chooseV8Policy(d,p,options);
 }});
 if(careerSeeds.size!==20)throw Error('Not all twenty V8 career families are offered');
 for(const [id,seed]of careerSeeds){
  const {state:s}=simulateV8(seed,{policy:0,awaken:true,focus:'rest',careerPolicy:'pause',careerId:id});
  if(s.run.status!=='ended'||s.progression.activeCareerId!==id||s.power.level!==1||s.power.practiceDays!==0)throw Error('V8 career ordinary-life route failed: '+id);
 }
 const migrated=new Set(),migratedChoices=new Set(),promoted=new Set();let promotionLives=0;
 for(const [careerId,seed]of careerSeeds)for(let policy=0;policy<2;policy++){
  const {state:s,seen:trace}=simulateV8(seed,{policy:0,awaken:true,focus:'study',careerId,choose:(d,p,o)=>d.kind==='career-story'?d.choices[policy]:chooseV8Policy(d,p,o)});promotionLives++;validateProgression(s);
  if(s.run.status!=='ended'||!s.progression.records[careerId].advanced||s.power.level!==1||s.power.practiceDays!==0)throw Error('Career promotion failed '+careerId);
  promoted.add(careerId);for(const id of trace.events)if(id.startsWith('career.'))migrated.add(id);
  for(const id of trace.choices)if(id.startsWith('career.'))migratedChoices.add(id);
 }
 if(migrated.size!==careerEvents.length||migratedChoices.size!==careerEvents.reduce((n,e)=>n+e.choices.length,0))throw Error('Incomplete migrated career responses');
 const missing=[...allChoices].filter(id=>!reached.has(id));
 if(missing.length)throw Error('Unreached V8 choices: '+missing.join(', '));
 if(origins.size!==20||endings.size!==Object.keys(v8Endings).length)throw Error('Incomplete V8 ordinary paths');
 return {authoredStoryForks:ids.size,authoredStoryChoices:allChoices.size,caregiverObservations:v8Observations.length,ordinaryEndings:Object.keys(v8Endings).length,reusedRitualStages:7,reusedRitualChoices:14,reachableForks:[...ids].filter(id=>seen.has(id)).length,reachableChoices:allChoices.size,reachableEndings:endings.size,simulatedNaturalLives:lives,callbackChoiceNaturalLives:checkpointPaths.size,newVocationForks:v8CareerEvents.length,newVocationChoices:v8CareerEvents.reduce((n,e)=>n+e.choices.length,0),vocationChoiceNaturalLives:vocationChoiceLives,migratedCareerEpisodes:migrated.size,migratedCareerResponses:migratedChoices.size,careerPromotionLives:promotionLives,promotedCareerFamilies:promoted.size,distinctBaseSeeds:101,originCareerChecks:reps.size,careerNaturalLives:careerSeeds.size,careerSeeds:Object.fromEntries(careerSeeds),ageRange:[minAge,maxAge],maxDecisionsAndContinuationsAndSeeks:maxSteps,realTimePlayDuration:'not measured; simulations use explicit skip controls',phase2Target:{newMoments:65,newChoices:150,newEndingTarget:12,complete:false}};
}
