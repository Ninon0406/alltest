import { careers } from '../data/careers.js';
import { awakeningEvents } from '../data/events/awakening.js';
import { careerEvents } from '../data/events/careers.js';
import { advanceAwakening } from '../progression/awakening.js';
import { careerRecord } from '../progression/state.js';
import { earnCareerXp, recoverProgression } from '../progression/engine.js';
import { infantEvents, childhoodEvents, randomEvents, dailyEvent } from '../data/events/childhood.js';
import { seededRandom } from './random.js';
import { calendar, advanceTime, recordAction, normalize } from './time.js';
export function currentEvent(state) {
 const age=calendar(state).ageYears,completed=state.life.completed;
 const progression=state.progression;
 if(age>=12 && progression.awakening.step<7 && !progression.awakening.paused)return awakeningEvents[progression.awakening.step];
 if(age>=12 && progression.activeCareerId){const careerEvent=careerEvents.find(e=>e.careerId===progression.activeCareerId&&e.stage===progression.records[e.careerId].arcStep&&age>=e.minAge);if(careerEvent)return careerEvent;}
 const pool=age===0?infantEvents:childhoodEvents.filter(e=>e.minAge===age);
 const done=pool.filter(e=>completed.includes(`${age}:${e.id}`)).length;
 if(age<12 && done>0 && !state.life.randomYears.includes(age))return randomEvents[Math.floor(seededRandom((state.birth?.seed??0)^Math.imul(age+1,7919))()*randomEvents.length)];
 const next=pool.find(e=>!completed.includes(`${age}:${e.id}`));if(next)return next;
 return {...dailyEvent,title:age<12?'วันธรรมดาก่อนวันเกิด':dailyEvent.title,pages:age<12?['ช่วงนี้คุณมีเวลาทบทวนเรื่องที่ได้เรียนรู้ ครอบครัวยังคอยดูแลและให้เวลาพัก ความเปลี่ยนแปลงเล็กน้อยไม่ต้องรีบร้อนเสมอไป']:dailyEvent.pages,durationDays:age<12?360-(state.time.absoluteDay-state.time.birthAbsoluteDay)%360:30};
}
export function storyToken(state){return `${state.life.revision}:${state.time.absoluteDay}`;}
export function choiceDays(state,event=currentEvent(state)){
 const age=calendar(state).ageYears,remaining=360-(state.time.absoluteDay-state.time.birthAbsoluteDay)%360;
 const reserve=age<12&&event.category!=='random'&&!state.life.randomYears.includes(age)?1:0;
 return Math.min(event.durationDays,remaining-reserve);
}
export function applyLifeChoice(state,choiceId){
 const event=currentEvent(state),choice=event.choices.find(c=>c.id===choiceId);
 if(!choice || state.life.page<event.pages.length-1)throw Error('กรุณาอ่านเหตุการณ์ให้จบก่อนเลือก');
 const days=choiceDays(state,event),age=calendar(state).ageYears;
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
 if(event.category==='awakening')advanceAwakening(state);
 if(event.category==='career')careerRecord(state,event.careerId).arcStep++;
 if(event.category==='random')state.life.randomYears.push(age);
 else if(event.id!=='daily.life')state.life.completed.push(`${age}:${event.id}`);
 recordAction(state,`${event.title} — ${choice.label}`,days,{eventId:event.id,choiceId:choice.id,random:event.category==='random',effects:structuredClone(choice.effects)});
 advanceTime(state,days);state.life.page=0;return normalize(state);
}
export function textTokens(text,state){const c=calendar(state),a=state.progression.awakening;return text.replaceAll('{awakening.venue}',a.venue?.name??`ศาลาประชุม${state.location}`).replaceAll('{awakening.tier}',a.result?.tier??'ยังไม่ประเมิน').replaceAll('{awakening.top}',a.result?careers.find(item=>item.id===a.result.topId).label:'ยังไม่ประเมิน').replaceAll('{player.age}',String(c.ageYears)).replaceAll('{time.worldYear}',String(c.worldYear)).replaceAll('{location.name}',state.location);}
