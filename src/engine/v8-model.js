import {calendar} from './time.js';
import {v8LifeEvents,originKind} from '../data/v8-life-events.js';
import {awakeningEvents} from '../data/events/awakening.js';
import {eligibleCareers,readiness} from '../progression/engine.js';
import {powerDecision,powerTrainingMissing,powerReady,hasPower} from '../progression/power-model.js';
import {effectiveStats} from '../character/equipment-stats.js';
import {findRoute} from '../world/travel.js';
import {locations} from '../world/locations.js';

export const isV8=state=>state.v8?.version===1;
export const naturalEndDay=state=>state.time.birthAbsoluteDay+state.birth.lifespan*360;
const focus=(id,label,description)=>({id,label,description});
export function v8Focuses(state){
 const months=calendar(state).ageMonths;
 if(months<12)return [];
 if(months<48)return [focus('care','ดูแลจากครอบครัว','พักและรับการดูแลตามวัย'),focus('play','เล่นอย่างปลอดภัย','ความสุขและความคุ้นเคยกับคนใกล้ตัว'),focus('observe','สำรวจรอบบ้านกับผู้ใหญ่','ค่อย ๆ รู้จักสิ่งรอบตัว')];
 if(months<144)return [focus('play','เล่นกับเพื่อน','ความสุขและสายสัมพันธ์'),focus('help','ช่วยครอบครัว','งานเล็กที่ปลอดภัยและความไว้ใจ'),focus('stories','ฟังเรื่องเล่าและเรียนพื้นฐาน','ความรู้โดยไม่เร่งฝึกพลัง'),focus('move','ออกกำลังตามวัย','พัก เล่น และดูแลสุขภาพ')];
 const cultivation=!powerTrainingMissing(state).length;
 return [
  focus(cultivation?'cultivate':'practice',cultivation?'ฝึกประสานพลัง':'ฝึกวิชาพื้นฐาน',cultivation?'ฝึกจริงเจ็ดวันต่อเดือน สลับพักและหยุดรับรองระดับด้วยตนเอง':'ฝึกทักษะตามความถนัดเมื่อร่างกายพร้อม ไม่ให้ระดับพลัง'),
  focus('work',months<228?'ฝึกงานหาเงิน':'ทำงานตามกำลัง','รับงานหนึ่งช่วงต่อเดือนเมื่อพร้อม มีค่าจ้างและความเหนื่อยจริง'),
  focus('bonds',months>=720?'ถ่ายทอดและพบปะ':'สร้างความสัมพันธ์','ให้เวลากับคนรอบตัวและความสุข'),
  focus('study','ศึกษาความรู้','สะสมความรู้และฝึกความคิดอย่างค่อยเป็นค่อยไป'),
  focus('rest','พักและดูแลชีวิต','ฟื้นสุขภาพ ความอึด มานา และสมาธิ'),
 ];
}
export function eligibleV8Events(state){
 const months=calendar(state).ageMonths,v=state.v8;
 return v8LifeEvents.filter(e=>!v.completed.includes(e.id)&&months<=e.ageMaxMonths&&(!e.origin||e.origin===originKind(state))&&(!e.requires?.flags||e.requires.flags.every(f=>v.flags[f])));
}
export function nextV8EventDay(state,excludeId=null){
 const now=state.time.absoluteDay;
 return Math.min(naturalEndDay(state),...eligibleV8Events(state).filter(e=>e.id!==excludeId).map(e=>Math.max(now,state.time.birthAbsoluteDay+e.ageMinMonths*30)));
}
export function v8TravelQuote(state){
 const candidates=locations[state.world.currentLocationId].neighbors.map(id=>({id,route:findRoute(state,id,'walk')})).filter(x=>x.route).sort((a,b)=>Number(state.world.visited.includes(a.id))-Number(state.world.visited.includes(b.id))||a.id.localeCompare(b.id));
 return candidates[0]??null;
}
export function v8ChoiceQuote(state,event,choice){
 const q={...choice,timeDays:choice.timeDays??0,costGold:choice.costGold??0,stamina:choice.stamina??0,disabled:false,unavailable:''};
 if(choice.special==='travel'){
  const trip=v8TravelQuote(state);q.trip=trip;
  if(trip){q.timeDays=trip.route.days;q.costGold=trip.route.gold;q.stamina=trip.route.days*2;q.destination=locations[trip.id].name;}
  else q.unavailable='ไม่มีเส้นทางข้างเคียงที่เปิดตามวัย';
 }
 if(choice.special==='defend'){
  const stats=effectiveStats(state);q.readiness=stats.str+stats.con+(hasPower(state)?state.power.level-1:0);
  if(q.readiness<32)q.unavailable=`ความพร้อมร่างกายและพลัง ${q.readiness}/32 เลือกเจรจาหรือถอยได้เสมอ`;
 }
 if(state.gold<q.costGold)q.unavailable=`ต้องมีเงิน ${q.costGold} เหรียญ มีทางเลือกฟรี`;
 if(state.stamina<q.stamina)q.unavailable=`ต้องมีความอึด ${q.stamina} เลือกทางที่ไม่ฝืนกำลังได้`;
 if(state.time.absoluteDay+q.timeDays>=naturalEndDay(state)&&q.timeDays)q.unavailable='เวลาชีวิตที่เหลือไม่พอสำหรับงานนี้ เลือกทางที่ไม่ใช้เวลาเพิ่มได้';
 if(state.time.absoluteDay+q.timeDays>nextV8EventDay(state,event.id))q.unavailable='มีเรื่องสำคัญก่อนงานนี้จะเสร็จ เลือกทางที่ใช้เวลาน้อยกว่าได้';
 q.disabled=!!q.unavailable;return q;
}
export function v8Decision(state){
 const v=state.v8;if(!isV8(state)||v.stage!=='life'||v.outcome||state.run.status==='ended')return null;
 const a=state.progression.awakening;
 if(v.ritual&&a.step<7){const e=awakeningEvents[a.step];return {id:e.id,kind:'ritual',title:e.title,prose:e.pages[0],context:'ceremony',step:a.step,choices:e.choices.map(c=>({...c,timeDays:1,costGold:0,stamina:0,description:'ใช้เวลา 1 วัน · ไม่มีค่าเข้าพิธี'}))};}
 if(v.ritual&&a.step===7&&!v.careerOffered){
  const eligible=eligibleCareers(state).slice(0,8);
  return {id:'v8.career',kind:'career',title:'เส้นทางที่เปิดอยู่',prose:'ความถนัดเป็นจุดเริ่ม ไม่ใช่คำตัดสินชีวิต เลือกอาชีพที่เข้าเงื่อนไขจริง หรือใช้ชีวิตชุมชนโดยไม่ผูกอาชีพ',choices:[...eligible.map(c=>({id:`career:${c.id}`,careerId:c.id,label:c.label,description:`ความพร้อม ${readiness(state,c)} · เริ่มฝึกงาน 7 วัน ฟรี · ${c.job}`,timeDays:7,costGold:0,stamina:0})),{id:'career:ordinary',label:'ใช้ชีวิตชุมชนโดยไม่ผูกอาชีพ',description:'ไม่เสียเงินหรือเวลา · เรียน ทำงานพื้นฐาน และสร้างความสัมพันธ์ต่อได้',timeDays:0,costGold:0,stamina:0}]};
 }
 const power=powerDecision(state);if(power)return {...power,prose:power.text};
 const months=calendar(state).ageMonths;
 const event=eligibleV8Events(state).filter(e=>months>=e.ageMinMonths).sort((a,b)=>a.priority-b.priority||a.ageMinMonths-b.ageMinMonths||a.id.localeCompare(b.id))[0];
 return event?{...event,kind:'story',choices:event.choices.map(c=>v8ChoiceQuote(state,event,c))}:null;
}
export function v8NextDecisionDay(state){
 if(state.run.status==='ended'||state.v8.stage==='reveal'||state.v8.outcome||v8Decision(state))return state.time.absoluteDay;
 return nextV8EventDay(state);
}
export function v8CanResumePower(state){return powerReady(state)&&state.power.deferred&&!state.v8.outcome&&!v8Decision(state);}
