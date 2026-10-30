import {careerRecord} from '../progression/state.js';
import {earnCareerXp,recoverProgression} from '../progression/engine.js';

// The historical reader and V8 career adapter apply the same original effects.
// Scheduling, completion and elapsed days belong to their callers.
export function applyLifeEffects(state,event,choice){
 for(const effect of choice.effects){
  if(effect.type==='stat')state.stats[effect.key]+=effect.amount;
  else if(effect.type==='memory')state.childhoodMemory[effect.key]+=effect.amount;
  else if(effect.type==='flag')state.life.flags={...state.life.flags,[effect.key]:true};
  else if(effect.type==='morale')state.morale+=effect.amount;
  else if(effect.type==='recover'){state.hp+=effect.amount;state.stamina+=effect.amount;state.mana+=effect.amount;state.morale+=5;recoverProgression(state,40);}
  else if(effect.type==='careerXp')earnCareerXp(state,event.careerId,effect.amount);
  else if(effect.type==='careerPerk')careerRecord(state,event.careerId)[effect.key]+=effect.amount;
  else throw Error('ผลลัพธ์ที่ไม่รู้จัก');
 }
}
