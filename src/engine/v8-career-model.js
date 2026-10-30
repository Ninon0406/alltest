import {careerEvents} from '../data/events/careers.js';
import {currentCareer,promotionMissing} from '../progression/engine.js';
import {statLabels} from '../data/careers.js';

// V8 spaces the original episodes at 12½ / 14½ / 16½, never below original minimum ages.
const storyMonths=[150,174,198],promotionMonth=222;
export function v8CareerOpportunity(state){
 const c=currentCareer(state),r=c&&state.progression.records[c.id];
 if(!c||!r||state.v8.careerPaused)return null;
 if(r.arcStep<3){
  const event=careerEvents.find(e=>e.careerId===c.id&&e.stage===r.arcStep);
  return {id:event.id,kind:'career-story',event,career:c,day:state.time.birthAbsoluteDay+Math.max(storyMonths[event.stage],event.minAge*12)*30};
 }
 if(!r.advanced&&!promotionMissing(state,c,{ignoreAge:true}).length)return {id:`v8.promotion:${c.id}`,kind:'promotion',career:c,day:state.time.birthAbsoluteDay+Math.max(promotionMonth,c.advanced.minAge*12)*30};
 return null;
}
export function nextV8CareerDay(state,excludeId=null){
 const offer=v8CareerOpportunity(state);return offer&&offer.id!==excludeId?Math.max(state.time.absoluteDay,offer.day):Infinity;
}
export function v8CareerDecision(state,quote){
 const offer=v8CareerOpportunity(state);if(!offer||offer.day>state.time.absoluteDay)return null;
 const pause={id:'career:pause',label:'พักเรื่องอาชีพไว้ก่อน ใช้ชีวิตด้านอื่นต่อ',timeDays:0,costGold:0,stamina:0,description:'ฟรี · ไม่เสียประสบการณ์หรือผลงาน · กลับมาทบทวนเองเมื่อพร้อม'};
 if(offer.kind==='career-story'){
  const {event:e}=offer;
  return {id:e.id,kind:offer.kind,event:e,title:e.title,prose:e.pages.join('\n\n'),choices:[...e.choices.map(c=>{
   const q=quote(state,{id:e.id},{...c,effects:{},timeDays:e.durationDays});
   q.legacyChoice=c;
   q.description=`${e.durationDays} วัน · ฟรี · ${c.effects.map(effect=>effect.type==='stat'?`${statLabels[effect.key]} +${effect.amount}`:effect.type==='careerXp'?`ประสบการณ์อาชีพ +${effect.amount}`:effect.type==='careerPerk'?(effect.key==='trainingBonus'?'ฝึกครั้งถัดไปได้ประสบการณ์เพิ่ม':'ค่าจ้างงานครั้งถัดไปเพิ่ม'):'').filter(Boolean).join(' · ')}`;
   return q;
  }),pause]};
 }
 const c=offer.career;
 return {id:offer.id,kind:offer.kind,title:`ก้าวต่อของ${c.label}`,prose:`ผลงานสามตอนและประสบการณ์ที่สะสมทำให้คุณพร้อมรับขั้น${c.advanced.label} คุณยังเลือกใช้ชีวิตในจังหวะเดิมและกลับมาทบทวนได้`,choices:[quote(state,{id:offer.id},{id:'career:promote',label:`รับขั้น${c.advanced.label}`,effects:{},timeDays:7,description:`7 วัน · ฟรี · ${c.advanced.resource==='maxHp'?'สุขภาพสูงสุด':c.advanced.resource==='maxMana'?'มานาสูงสุด':'ความอึดสูงสุด'} +${c.advanced.resourceBonus} · ค่าจ้างครั้งถัดไป +${c.advanced.payBonus}`}),pause]};
}
export function v8CanResumeCareer(state){
 const c=currentCareer(state),r=c&&state.progression.records[c.id];
 return !!(state.v8.careerPaused&&r&&!r.advanced);
}
export function v8PromotionMissing(state){
 return promotionMissing(state).map(text=>Object.entries(statLabels).reduce((value,[id,label])=>value.replaceAll(id.toUpperCase(),label),text));
}
