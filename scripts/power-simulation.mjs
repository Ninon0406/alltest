import {act,simulateV7} from './v7-simulation.mjs';
import {pendingDecision,nextDecisionDay} from '../src/engine/decisions.js';
import {eligibleCareers,trainingQuote} from '../src/progression/engine.js';
import {powerReady} from '../src/progression/power-model.js';
export function settlePowerStory(s){while(pendingDecision(s)&&pendingDecision(s).kind!=='power'){const d=pendingDecision(s);s=act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices.find(c=>!c.disabled&&c.id!=='later').id});}return s;}
export function powerStart(careerId='farmer',seed=8){
 let s=settlePowerStory(simulateV7(seed,{targetAge:12,ceremony:true}).state),steps=0;
 while(!eligibleCareers(s).some(c=>c.id===careerId)){
  s=settlePowerStory(s);const c=careers.find(c=>c.id===careerId),stat=Object.entries(c.requirements).find(([k,n])=>s.stats[k]<n)?.[0]??c.primary;
  if(nextDecisionDay(s)-s.time.absoluteDay<7){s=act(s,{type:'advanceDays',days:nextDecisionDay(s)-s.time.absoluteDay});continue;}
  const q=trainingQuote(s,stat);s=act(s,s.stamina<q.stamina||s.progression.fatigue>=80||s.progression.focus<20?{type:'trainingRest'}:{type:'train',stat});if(++steps>100)throw Error('Career readiness stalled');
 }
 if(nextDecisionDay(s)-s.time.absoluteDay<7)s=settlePowerStory(act(s,{type:'advanceDays',days:nextDecisionDay(s)-s.time.absoluteDay}));
 return act(s,{type:'chooseCareer',careerId});
}
import {careers} from '../src/data/careers.js';
export function simulatePower(careerId='farmer',choice='steady'){
 let s=act(powerStart(careerId),{type:'yearFocus',focus:'cultivate'}),steps=0;
 while(!powerReady(s)){s=settlePowerStory(s);s=act(s,{type:'advanceYears',years:1});if(++steps>100)throw Error('Power training stalled');}
 const ready=structuredClone(s);
 s=act(s,{type:'majorChoice',decisionId:'power.first-realm',choiceId:'later'});
 for(let i=0;i<3;i++){s=settlePowerStory(s);if(nextDecisionDay(s)-s.time.absoluteDay<2)s=settlePowerStory(act(s,{type:'advanceDays',days:nextDecisionDay(s)-s.time.absoluteDay}));s=act(s,{type:'trainingRest'});}
 s=settlePowerStory(s);s=act(s,{type:'resumePower'});s=act(s,{type:'majorChoice',decisionId:'power.first-realm',choiceId:choice});return {state:s,ready};
}
