import { Scenes } from '../data/scenes.js';
import { canChoose } from './choices.js';
import { advanceTime,recordAction } from './time.js';
export function legacyDays(state,choice){
 const lived=state.time.absoluteDay-state.time.birthAbsoluteDay;
 if(choice.id.startsWith('c_child_'))return Math.max(1,6*360-lived);
 if(choice.id.startsWith('c_path_'))return Math.max(1,12*360-lived);
 if(choice.id==='c_end_peasant')return Math.max(1,60*360-lived);
 return 1;
}
export function chooseLegacy(state,id){
 const scene=Scenes[state.currentSceneId],choice=scene?.choices?.find(c=>c.id===id);
 if(state.life.mode!=='legacy'||!choice||!Scenes[choice.next]||!canChoose(state,choice))throw Error('ไม่เข้าเงื่อนไขทางเลือกนี้');
 const oldGold=state.gold,days=legacyDays(state,choice);
 choice.effect?.(state);if(id.startsWith('c_path_'))state.progression.activeCareerId=null;
 const goldDelta=state.gold-oldGold;
 if(goldDelta)state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:'legacy',amount:goldDelta});
 recordAction(state,choice.title,days,{goldDelta});advanceTime(state,days);state.currentSceneId=choice.next;
 if(Scenes[choice.next].isEnding){
  const endingId=Scenes[choice.next].endingId;
  if(!state.unlockedEndings.includes(endingId))state.unlockedEndings.push(endingId);
  if(state.run){state.run.status='ended';state.run.endingId=endingId;}
 }
}
