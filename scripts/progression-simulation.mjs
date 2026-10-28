import { generateBirth } from '../src/character/rebirth.js';
import { currentEvent,storyToken } from '../src/engine/life.js';
import { dispatch } from '../src/engine/actions.js';
import { missingRequirements,promotionMissing,trainingQuote } from '../src/progression/engine.js';
export function takeAction(state,action){return dispatch(state,{...action,token:storyToken(state)});}
export function takeChoice(state,policy=0,seen){
 const event=currentEvent(state);seen?.events.add(event.id);
 while(state.life.page<event.pages.length-1)state=takeAction(state,{type:'readNext'});
 const choice=event.choices[policy%event.choices.length];seen?.choices.add(choice.id);
 return takeAction(state,{type:'lifeChoice',choiceId:choice.id});
}
export function readyToTrain(state){
 while(state.stamina<15||state.progression.fatigue>=80||state.progression.focus<20||state.morale<20)state=takeAction(state,{type:'trainingRest'});
 return state;
}
export function simulateCareer(career,{seed=8,policy=0,stopBeforePromotion=false}={}){
 let state=takeAction(generateBirth(seed),{type:'setPacing',view:'detailed'}),steps=0;const seen={events:new Set(),choices:new Set()};
 while(state.age<12){state=takeChoice(state,policy,seen);if(++steps>100)throw Error('Childhood stalled');}
 while(state.progression.awakening.step<7)state=takeChoice(state,policy,seen);
 while(missingRequirements(state,career).length){
  const key=Object.entries(career.requirements).find(([key,min])=>state.stats[key]<min)?.[0]??career.primary;
  state=takeAction(readyToTrain(state),{type:'train',stat:key});if(++steps>250)throw Error('Readiness stalled');
 }
 state=takeAction(state,{type:'chooseCareer',careerId:career.id});
 while(state.stamina<15||state.progression.fatigue>=85)state=takeAction(state,{type:'trainingRest'});
 state=takeAction(state,{type:'careerJob'});
 while(!state.progression.records[career.id].advanced){
  const record=state.progression.records[career.id],event=currentEvent(state);
  if(event.category==='career')state=takeChoice(state,policy,seen);
  else if(!promotionMissing(state,career).length){if(stopBeforePromotion)return {state,seen,steps};state=takeAction(state,{type:'promoteCareer'});}
  else if(state.stats[career.primary]<career.advanced.minimum||record.xp<120||record.mastery<60)state=takeAction(readyToTrain(state),{type:'train',stat:career.primary});
  else state=takeChoice(state,policy,seen);
  if(++steps>500)throw Error(`Career stalled: ${career.id}`);
 }
 return {state,seen,steps};
}
