import {developmentEvents} from '../data/events/development.js';
import {teenEvents} from '../data/events/teen.js';
export const storyEvents=[...developmentEvents,...teenEvents];
import {calendar,recordAction,normalize} from './time.js';
export const isV7=state=>state.story?.version===7;
export const createStory=()=>({version:7,completed:[],flags:{},relationships:{caregivers:0,community:0}});
export function meetsStoryRequirements(state,requirements={}){
 if(requirements.awakeningComplete&&state.progression.awakening.step!==7)return false;
 if(requirements.completed?.some(id=>!state.story.completed.includes(id)))return false;
 if(requirements.allFlags?.some(key=>!state.story.flags[key]))return false;
 if(requirements.anyFlags&&!requirements.anyFlags.some(key=>state.story.flags[key]))return false;
 if(requirements.practiced&&!Object.values(state.progression.practice).some(x=>x>0))return false;
 return true;
}
export function storyGoldCost(state,choice){const cost=choice.cost;return cost?Math.max(0,cost.gold-(cost.discountFlag&&state.story.flags[cost.discountFlag]?cost.discount:0)):0;}
function eligibleEvents(state){const month=calendar(state).ageMonths;return storyEvents.filter(e=>month<=e.maxMonth&&!state.story.completed.includes(e.id)&&meetsStoryRequirements(state,e.requirements));}
export function developmentDecision(state){
 if(!isV7(state))return null;
 const month=calendar(state).ageMonths;
 const event=eligibleEvents(state).find(e=>month>=e.month);
 return event?{...event,kind:'development',severity:'major',choices:event.choices.map(c=>{
  const cost=storyGoldCost(state,c),reason=c.requires?.some(key=>!state.story.flags[key])?'ต้องเคยช่วยคืนถุงเงินให้เจ้าของ':!meetsStoryRequirements(state,c.requirements)?'ต้องมีประสบการณ์หรือเลือกเส้นทางก่อนหน้าตามคำอธิบาย':state.gold<cost?'เงินไม่พอ ยังมีทางเลือกที่ไม่เสียเงิน':'';
  return {...c,costGold:cost,disabled:!!reason,unavailable:reason,description:c.description+(c.cost?` · จ่าย ${cost} เหรียญจริง`:'')};
 })}:null;
}
export function nextDevelopmentDay(state){
 if(!isV7(state))return Infinity;
 const now=state.time.absoluteDay;
 return Math.min(Infinity,...eligibleEvents(state).map(e=>Math.max(now,state.time.birthAbsoluteDay+e.month*30)));
}
export function resolveDevelopment(state,event,choice){
 if(choice.disabled)throw Error(choice.unavailable);
 const applied=[],beforeGold=state.gold;
 const cost=storyGoldCost(state,choice);if(state.gold<cost)throw Error('เงินไม่พอ ยังมีทางเลือกที่ไม่เสียเงิน');
 if(cost){state.gold-=cost;state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:`story:${event.id}`,amount:-cost});}
 function apply(effect){
  if(effect.op==='when'){if(state.story.flags[effect.key])effect.effects.forEach(apply);return;}
  if(effect.op==='memory')state.childhoodMemory[effect.key]+=effect.amount;
  else if(effect.op==='relationship')state.story.relationships[effect.key]+=effect.amount;
  else if(effect.op==='flag')state.story.flags[effect.key]=true;
  else if(effect.op==='learning'){
   state.story.learning??={};const old=state.story.learning[effect.key]??0;state.story.learning[effect.key]=Math.min(3,old+effect.amount);effect={...effect,amount:state.story.learning[effect.key]-old};
  }else if(effect.op==='wage'){const old=state.story.wageBonus??0;state.story.wageBonus=Math.min(3,old+effect.amount);effect={...effect,amount:state.story.wageBonus-old};}
  else throw Error('ผลของเรื่องราวไม่ถูกต้อง');
  applied.push({...effect});
 }
 choice.effects.forEach(apply);state.story.completed.push(event.id);
 const goldDelta=state.gold-beforeGold;
 recordAction(state,`${event.title} — ${choice.label}`,0,{majorDecision:event.id,choiceId:choice.id,sourceId:event.sourceId,ageMonths:calendar(state).ageMonths,effects:applied,goldDelta});
 state.story.lastOutcome={eventId:event.id,title:event.title,choice:choice.label,text:choice.description,day:state.time.absoluteDay,goldDelta,effects:applied};
 return normalize(state);
}
