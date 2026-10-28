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
  for(const choice of choices){if(!Scenes[choice.next])throw Error('Invalid next');reachedChoices.add(choice.id);replaceState(structuredClone(state));choice.effect?.();GameState.currentSceneId=choice.next;visit(structuredClone(GameState),depth+1);}
 }
 try{for(let seed=0;seed<100;seed++)visit(generateBirthV1(seed));}finally{replaceState(original);}
 for(let seed=0;seed<50;seed++)for(let option=0;option<2;option++){
  let state=generateBirth(seed),steps=0;
  while(state.age<12){
   const event=currentEvent(state);events.add(event.id);
   while(state.life.page<event.pages.length-1)state=dispatch(state,{type:'readNext',token:storyToken(state)});
   lifeChoices.add(event.choices[option].id);state=dispatch(state,{type:'lifeChoice',choiceId:event.choices[option].id,token:storyToken(state)});
   if(++steps>100)throw Error('Annual dead end');
  }
 }
 const authoredChoiceIds=[...Object.values(Scenes).flatMap(s=>(s.choices??[]).map(c=>c.id)),...allLifeEvents.flatMap(e=>e.choices.map(c=>c.id))];
 const eventIds=[...Object.keys(Scenes),...allLifeEvents.map(e=>e.id)];
 if(new Set(authoredChoiceIds).size!==authoredChoiceIds.length||new Set(eventIds).size!==eventIds.length)throw Error('Duplicate authored IDs');
 return {authored:{legacyScenes:Object.keys(Scenes).length,annualEvents:allLifeEvents.length,totalScenesEvents:eventIds.length,choices:authoredChoiceIds.length,endings:Object.values(Scenes).filter(s=>s.isEnding).length},reachable:{legacyScenes:reachedScenes.size,legacyChoices:reachedChoices.size,annualEvents:events.size,annualChoices:lifeChoices.size,endings:endings.size},simulation:{legacyBirths:100,annualPlaythroughs:100,annualTargetAge:12}};
}
