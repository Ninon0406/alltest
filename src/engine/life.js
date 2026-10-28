import { infantEvents, childhoodEvents, randomEvents, dailyEvent } from '../data/events/childhood.js';
import { seededRandom } from './random.js';
import { calendar, advanceTime, recordAction, normalize } from './time.js';
export function currentEvent(state) {
 const age=calendar(state).ageYears,completed=state.life.completed;
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
  else if(effect.type==='recover'){state.hp+=effect.amount;state.stamina+=effect.amount;state.mana+=effect.amount;state.morale+=5;}
  else throw Error('ผลลัพธ์ที่ไม่รู้จัก');
 }
 if(event.category==='random')state.life.randomYears.push(age);
 else if(event.id!=='daily.life')state.life.completed.push(`${age}:${event.id}`);
 recordAction(state,`${event.title} — ${choice.label}`,days,{eventId:event.id,choiceId:choice.id,random:event.category==='random',effects:structuredClone(choice.effects)});
 advanceTime(state,days);state.life.page=0;return normalize(state);
}
export function textTokens(text,state){const c=calendar(state);return text.replaceAll('{player.age}',String(c.ageYears)).replaceAll('{time.worldYear}',String(c.worldYear)).replaceAll('{location.name}',state.location);}
