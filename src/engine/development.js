import {developmentEvents} from '../data/events/development.js';
import {calendar,recordAction,normalize} from './time.js';
export const isV7=state=>state.story?.version===7;
export const createStory=()=>({version:7,completed:[],flags:{},relationships:{caregivers:0,community:0}});
export function developmentDecision(state){
 if(!isV7(state))return null;
 const month=calendar(state).ageMonths;
 const event=developmentEvents.find(e=>month>=e.month&&month<=e.maxMonth&&!state.story.completed.includes(e.id));
 return event?{...event,kind:'development',severity:'major',choices:event.choices.map(c=>({...c,disabled:!!c.requires?.some(key=>!state.story.flags[key]),unavailable:'ต้องเคยช่วยคืนถุงเงินให้เจ้าของ'}))}:null;
}
export function nextDevelopmentDay(state){
 if(!isV7(state))return Infinity;
 const now=state.time.absoluteDay,month=calendar(state).ageMonths;
 return Math.min(Infinity,...developmentEvents.filter(e=>!state.story.completed.includes(e.id)&&month<=e.maxMonth).map(e=>Math.max(now,state.time.birthAbsoluteDay+e.month*30)));
}
export function resolveDevelopment(state,event,choice){
 if(choice.disabled)throw Error(choice.unavailable);
 const applied=[];
 function apply(effect){
  if(effect.op==='when'){if(state.story.flags[effect.key])effect.effects.forEach(apply);return;}
  if(effect.op==='memory')state.childhoodMemory[effect.key]+=effect.amount;
  else if(effect.op==='relationship')state.story.relationships[effect.key]+=effect.amount;
  else if(effect.op==='flag')state.story.flags[effect.key]=true;
  else throw Error('ผลของเรื่องราวไม่ถูกต้อง');
  applied.push({...effect});
 }
 choice.effects.forEach(apply);state.story.completed.push(event.id);
 recordAction(state,`${event.title} — ${choice.label}`,0,{majorDecision:event.id,choiceId:choice.id,sourceId:event.sourceId,ageMonths:calendar(state).ageMonths,effects:applied});
 return normalize(state);
}
