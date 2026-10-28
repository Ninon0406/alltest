import { lifeMilestones } from '../src/data/yearly.js';
import { pendingDecision } from '../src/engine/yearly.js';
import { awakeningEvents } from '../src/data/events/awakening.js';
import { careerEvents } from '../src/data/events/careers.js';
import { careers } from '../src/data/careers.js';
import { simulateCareer } from './progression-simulation.mjs';
import { Scenes } from '../src/data/scenes.js';
import { allLifeEvents } from '../src/data/events/childhood.js';
import { GameState,replaceState } from '../src/engine/state.js';
import { generateBirth,generateBirthV1 } from '../src/character/rebirth.js';
import { canChoose } from '../src/engine/choices.js';
import { currentEvent,storyToken } from '../src/engine/life.js';
import { dispatch } from '../src/engine/actions.js';
export function auditContent(){
 const reachedScenes=new Set(),reachedChoices=new Set(),endings=new Set(),events=new Set(),lifeChoices=new Set();
 const original=GameState;
 function visit(state,depth=0){
  if(depth>20)throw Error('Invalid scene cycle');
  const scene=Scenes[state.currentSceneId];if(!scene)throw Error('Missing scene');reachedScenes.add(state.currentSceneId);
  if(scene.isEnding){endings.add(scene.endingId);return;}
  const choices=scene.choices.filter(c=>canChoose(state,c));if(!choices.length)throw Error('Legacy dead end');
  for(const choice of choices){if(!Scenes[choice.next])throw Error('Invalid next');reachedChoices.add(choice.id);replaceState(structuredClone(state));choice.effect?.(GameState);GameState.currentSceneId=choice.next;visit(structuredClone(GameState),depth+1);}
 }
 try{for(let seed=0;seed<100;seed++)visit(generateBirthV1(seed));}finally{replaceState(original);}
 for(let seed=0;seed<50;seed++)for(let option=0;option<2;option++){
  let state=generateBirth(seed),steps=0;state=dispatch(state,{type:'setPacing',view:'detailed',token:storyToken(state)});
  while(state.age<12){
   const event=currentEvent(state);events.add(event.id);
   while(state.life.page<event.pages.length-1)state=dispatch(state,{type:'readNext',token:storyToken(state)});
   lifeChoices.add(event.choices[option].id);state=dispatch(state,{type:'lifeChoice',choiceId:event.choices[option].id,token:storyToken(state)});
   if(++steps>100)throw Error('Annual dead end');
  }
 }
 for(const c of careers)for(const policy of [0,1]){const result=simulateCareer(c,{policy});for(const id of result.seen.events)events.add(id);for(const id of result.seen.choices)lifeChoices.add(id);}
 for(let policy=0;policy<5;policy++){
  let state=generateBirth(policy),iterations=0;
  while(state.age<61){const decision=pendingDecision(state);if(decision){const choice=decision.choices[policy%decision.choices.length];if(decision.kind==='life'){events.add(decision.id);lifeChoices.add(choice.id);}state=dispatch(state,{type:'majorChoice',decisionId:decision.id,choiceId:choice.id,token:storyToken(state)});}else state=dispatch(state,{type:'advanceYears',years:5,token:storyToken(state)});if(++iterations>100)throw Error('Yearly mode stalled');}
 }
 const allEvents=[...allLifeEvents,...awakeningEvents,...careerEvents,...lifeMilestones.map(e=>({...e,choices:e.choices}))];
 const authoredChoiceIds=[...Object.values(Scenes).flatMap(s=>(s.choices??[]).map(c=>c.id)),...allEvents.flatMap(e=>e.choices.map(c=>c.id))];
 const eventIds=[...Object.keys(Scenes),...allEvents.map(e=>e.id)];
 if(new Set(authoredChoiceIds).size!==authoredChoiceIds.length||new Set(eventIds).size!==eventIds.length)throw Error('Duplicate authored IDs');
 return {authored:{legacyScenes:Object.keys(Scenes).length,annualEvents:allEvents.length,totalScenesEvents:eventIds.length,choices:authoredChoiceIds.length,endings:Object.values(Scenes).filter(s=>s.isEnding).length},reachable:{legacyScenes:reachedScenes.size,legacyChoices:reachedChoices.size,annualEvents:events.size,annualChoices:lifeChoices.size,endings:endings.size},simulation:{legacyBirths:100,annualPlaythroughs:100,annualTargetAge:12,careerPlaythroughs:40,careerTargetAge:18,baseCareers:careers.length,advancedCareers:careers.length,yearlyPlaythroughs:5,yearlyTargetAge:61}};
}
