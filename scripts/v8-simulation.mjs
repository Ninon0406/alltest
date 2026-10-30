import {createV8Run,dispatchV8} from '../src/engine/v8-life-loop.js';
import {v8Decision,v8Focuses} from '../src/engine/v8-model.js';
import {storyToken} from '../src/engine/life.js';
import {chooseV8StoryPath} from './v8-story-policies.mjs';
const identity=seed=>({id:`v8-simulation-${seed}`,startedAt:'2026-10-29T00:00:00.000Z'});
export function v8Act(state,action){return dispatchV8(state,{...action,token:storyToken(state)});}
export function chooseV8Policy(d,policy=0,{awaken=false,storyPath='quiet',careerId=null,careerPolicy='complete'}={}){
 const storyChoice=chooseV8StoryPath(d,storyPath);if(storyChoice)return storyChoice;
 if(d.id==='v8.awakening-invitation')return d.choices.find(c=>c.id===(awaken?'join':'ordinary'));
 if(d.id==='v8.career')return careerId?d.choices.find(c=>c.careerId===careerId):d.choices[0];
 if(d.kind==='career-story')return careerPolicy==='pause'?d.choices.at(-1):d.choices.filter(c=>!c.disabled)[policy%2]??d.choices.at(-1);
 if(d.kind==='promotion')return careerPolicy==='pause'||d.choices[0].disabled?d.choices.at(-1):d.choices[0];
 if(d.id==='v8.look-back')return d.choices[policy%4];
 if(d.id==='v8.nearby-invitation'&&policy===2)return d.choices.find(c=>c.id==='visit'&&!c.disabled)??d.choices[2];
 if(d.id==='v8.understanding')return d.choices[policy%3];
 const choices=d.choices.filter(c=>!c.disabled);return choices[policy%choices.length];
}
export function simulateV8(seed,{policy=seed%4,awaken=false,stopAge=Infinity,stopEvent=null,choose=chooseV8Policy,focus=null,storyPath='quiet',careerId=null,careerPolicy='complete'}={}){
 let state=createV8Run(seed,identity(seed)),steps=0;const seen={events:new Set(),choices:new Set(),origins:new Set([state.birth.archetypeId])};
 state=v8Act(state,{type:'v8Begin'});
 while(state.run.status==='active'&&state.age<stopAge){
  if(stopEvent&&v8Decision(state)?.id===stopEvent)break;
  if(++steps>300)throw Error(`V8 stalled: ${seed} ${state.age} ${state.v8.outcome?.eventId}`);
  if(state.v8.outcome)state=v8Act(state,{type:'v8Continue'});
  else{
   const d=v8Decision(state);
   if(d){const c=choose(d,policy,{awaken,state,storyPath,careerId,careerPolicy});if(!c||c.disabled)throw Error(`Unavailable policy choice: ${d.id}`);seen.events.add(d.id);seen.choices.add(`${d.id}:${c.id}`);state=v8Act(state,{type:'v8Choice',decisionId:d.id,choiceId:c.id});}
   else{
    const selected=focus??(policy===1?'study':policy===0?'bonds':policy===2?'work':'rest');
    if(v8Focuses(state).some(f=>f.id===selected)&&state.v8.focus!==selected)state=v8Act(state,{type:'v8Focus',focus:selected});
    state=v8Act(state,{type:'v8Seek'});
   }
  }
 }
 return {state,seen,steps};
}
