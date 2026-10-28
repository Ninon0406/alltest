import { careers,getCareer,statKeys } from '../data/careers.js';
import { careerRecord } from './state.js';
import { affinityScore } from './awakening.js';
import { guardExternalTime } from '../world/travel.js';
import { advanceTime,recordAction,normalize } from '../engine/time.js';
export function readiness(state,c){const current=affinityScore(state,c).score,measured=state.progression.awakening.result?.scores[c.id]?.score??current;return Math.round((current*.85+measured*.15)*100)/100;}
export function missingRequirements(state,c){
 const missing=[];
 if(state.age<12)missing.push('อายุอย่างน้อย 12 ปี');
 if(state.progression.awakening.step<7)missing.push('ผ่านพิธีแห่งเส้นชีพจร');
 for(const [key,min]of Object.entries(c.requirements))if(state.stats[key]<min)missing.push(`${key.toUpperCase()} อย่างน้อย ${min}`);
 if(c.id!=='farmer'&&readiness(state,c)<14)missing.push('ความพร้อมอย่างน้อย 14');
 return missing;
}
export function eligibleCareers(state){return careers.filter(c=>!missingRequirements(state,c).length).toSorted((a,b)=>readiness(state,b)-readiness(state,a));}
export function currentCareer(state){return getCareer(state.progression.activeCareerId);}
export function earnCareerXp(state,id,xp){
 const r=careerRecord(state,id);r.xp+=xp;r.mastery=Math.min(100,r.mastery+Math.max(1,Math.floor(xp/2)));
}
export function promotionMissing(state,c=currentCareer(state)){
 if(!c)return ['เลือกอาชีพก่อน'];const r=state.progression.records[c.id],a=c.advanced;
 return [state.age<a.minAge?`อายุ ${a.minAge} ปี`:null,r.xp<a.minXp?`ประสบการณ์ ${a.minXp}`:null,r.mastery<a.minMastery?`ความชำนาญ ${a.minMastery}`:null,state.stats[a.stat]<a.minimum?`${a.stat.toUpperCase()} ${a.minimum}`:null,r.arcStep<3?'จบเรื่องอาชีพ 3 ตอน':null].filter(Boolean);
}
export function selectCareer(state,id){
 const c=getCareer(id);if(!c)throw Error('ไม่พบอาชีพ');
 if(missingRequirements(state,c).length)throw Error('ยังไม่เข้าเงื่อนไขอาชีพนี้');
 if(state.progression.activeCareerId===id)throw Error('กำลังประกอบอาชีพนี้อยู่แล้ว');
 state.progression.legacyCareer??=state.career;
 careerRecord(state,id);state.progression.activeCareerId=id;
 recordAction(state,`เริ่มเส้นทาง${c.label}`,7,{careerId:id});advanceTime(state,7);state.life.page=0;
}
export function recoverProgression(state,amount=25){
 state.progression.fatigue=Math.max(0,state.progression.fatigue-amount);state.progression.focus=Math.min(100,state.progression.focus+amount);
}
export function restFromTraining(state){
 if(state.age<8)throw Error('พักตามเรื่องวัยเด็กกับครอบครัวได้ก่อนวัยฝึก');
 guardExternalTime(state,2);recoverProgression(state,40);state.stamina+=35;state.mana+=20;state.hp+=10;state.morale+=6;
 recordAction(state,'พักฟื้นจากการฝึก',2);advanceTime(state,2);
}
export function trainingQuote(state){
 const p=state.progression,window=Math.floor(state.time.absoluteDay/30),count=p.trainingWindow===window?p.trainingCount:0;
 const c=currentCareer(state),r=c?p.records[c.id]:null;
 const base=Math.max(3,8-Math.floor(count/2));
 const affinityBonus=c&&state.progression.awakening.result?.scores[c.id]?.score>=21?1:0;
 return {days:7,stamina:15,fatigue:20,focus:12,xp:base+affinityBonus+(r?.trainingBonus??0)+(r?.advanced?c.advanced.trainingBonus:0)};
}
export function train(state,stat){
 if(state.age<8)throw Error('ฝึกพื้นฐานได้เมื่ออายุ 8 ปี');
 if(!statKeys.includes(stat))throw Error('หัวข้อฝึกไม่ถูกต้อง');
 const q=trainingQuote(state),p=state.progression;
 if(state.stamina<q.stamina||p.fatigue>=80||p.focus<20||state.morale<20)throw Error('ร่างกายหรือสมาธิยังไม่พร้อม กรุณาพักฟื้นก่อน');
 guardExternalTime(state,q.days);
 const window=Math.floor(state.time.absoluteDay/30);if(p.trainingWindow!==window){p.trainingWindow=window;p.trainingCount=0;}p.trainingCount++;
 p.practice[stat]=(p.practice[stat]??0)+q.xp;
 const oldLevel=Math.floor((p.practice[stat]-q.xp)/20),newLevel=Math.floor(p.practice[stat]/20);state.stats[stat]+=newLevel-oldLevel;
 const c=currentCareer(state);if(c&&(stat===c.primary||stat===c.secondary))earnCareerXp(state,c.id,q.xp);
 state.stamina-=q.stamina;p.fatigue+=q.fatigue;p.focus-=q.focus;
 recordAction(state,'ฝึกพื้นฐานตามความถนัด',q.days,{stat,skillXp:q.xp,statGain:newLevel-oldLevel,careerId:c?.id??null});advanceTime(state,q.days);
}
export function jobQuote(state){const c=currentCareer(state);if(!c)return null;const r=state.progression.records[c.id];return {days:7,stamina:15,fatigue:12,gold:c.wage+(r.payBonus??0)+(r.advanced?c.advanced.payBonus:0),xp:6};}
export function workCareer(state){
 const c=currentCareer(state);if(!c||state.age<12||state.progression.awakening.step<7)throw Error('ผ่านพิธีและเลือกอาชีพก่อนรับงานประจำ');
 const p=state.progression,q=jobQuote(state);
 if(state.stamina<q.stamina||p.fatigue>=85)throw Error('เหนื่อยเกินไป กรุณาพักก่อนทำงาน');
 state.gold+=q.gold;state.stamina-=q.stamina;p.fatigue+=q.fatigue;earnCareerXp(state,c.id,q.xp);
 state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:`career:${c.id}`,amount:q.gold});
 recordAction(state,c.job,q.days,{careerId:c.id,goldDelta:q.gold,skillXp:q.xp});advanceTime(state,q.days);
}
export function promote(state){
 const c=currentCareer(state);if(!c)throw Error('ยังไม่ได้เลือกอาชีพ');const r=state.progression.records[c.id];
 if(r.advanced||promotionMissing(state,c).length)throw Error('ยังเลื่อนขั้นไม่ได้ หรือได้รับขั้นนี้แล้ว');
 r.advanced=true;state[c.advanced.resource]+=c.advanced.resourceBonus;
 const current={maxHp:'hp',maxMana:'mana',maxStamina:'stamina'}[c.advanced.resource];state[current]+=c.advanced.resourceBonus;
 recordAction(state,`ได้รับขั้น${c.advanced.label}`,7,{careerId:c.id});advanceTime(state,7);normalize(state);
}
