import {createRun} from '../src/engine/run.js';
import {dispatch} from '../src/engine/actions.js';
import {storyToken} from '../src/engine/life.js';
import {pendingDecision} from '../src/engine/decisions.js';
export const act=(state,action)=>dispatch(state,{...action,token:storyToken(state)});
export function simulateV7(seed=8,{targetAge=12,policy=0,ceremony=false}={}){
 let state=createRun(seed,{id:`v7-${seed}-${policy}`,startedAt:'2026-10-29T00:00:00Z'}),steps=0;
 const events=new Set(),choices=new Set();
 while(state.age<targetAge||ceremony&&state.progression.awakening.step<7){
  const d=pendingDecision(state);
  if(d){
   const available=d.choices.filter(c=>!c.disabled&&c.id!=='later'),choice=available[policy%available.length];events.add(d.id);choices.add(choice.id);
   state=act(state,{type:'majorChoice',decisionId:d.id,choiceId:choice.id});
  }else state=act(state,{type:'advanceYears',years:1});
  if(++steps>targetAge*4+40)throw Error('V7 simulation stalled');
 }
 return {state,events,choices};
}
