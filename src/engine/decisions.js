import {lifeMilestones} from '../data/yearly.js';
import {careerEvents} from '../data/events/careers.js';
import {awakeningEvents} from '../data/events/awakening.js';
import {calendar} from './time.js';
import {isV7,developmentDecision,nextDevelopmentDay} from './development.js';
function careerDue(state,event){return Math.max([13,15,17][event.stage],state.yearly.cooldowns[event.id]??0,(state.yearly.lastCareerAge??-10)+2);}
export function pendingDecision(state){
 const development=developmentDecision(state);if(development)return development;
 const y=state.yearly,a=state.progression.awakening,age=calendar(state).ageYears;
 if(age>=12&&a.step<7&&!a.paused){
  if(isV7(state)){const e=awakeningEvents[a.step];return {id:'turn.awakening',stage:a.step,kind:'awakening',title:`พิธีแห่งเส้นชีพจร · ${a.step+1}/7 · ${e.title}`,text:e.pages.join('\n\n'),choices:[...e.choices.map(c=>({...c,description:'เลือกขั้นตอนนี้ด้วยตนเอง · ใช้เวลา 1 วัน'})),{id:'later',label:'พักพิธีไว้ก่อน',description:'เก็บขั้นตอนและผลที่วัดแล้ว กลับมาเมื่อพร้อม'}]};}
  return {id:'turn.awakening',kind:'awakening',title:'พิธีแห่งเส้นชีพจร',text:'เลือกแนวทางเข้าร่วมพิธี ระบบจะดำเนินขั้นตอนที่เหลือและเก็บผลเดิมถ้ามีการวัดไปแล้ว คุณพักเรื่องนี้ไว้ก่อนได้',choices:[
   {id:'curious',label:'เข้าร่วมด้วยความใฝ่รู้',description:'เน้นการสังเกตและทบทวนสมุด'},
   {id:'careful',label:'เข้าร่วมอย่างรอบคอบ',description:'ค่อย ๆ ทำความเข้าใจขั้นตอนและขีดจำกัด'},
   {id:'community',label:'ให้กำลังใจผู้ร่วมพิธี',description:'เน้นการฟังและช่วยคนรอบตัว'},
   {id:'determined',label:'ตั้งใจค้นหาเส้นทางของตน',description:'เน้นเป้าหมายและการพัฒนาต่อ'},
   {id:'later',label:'พักพิธีไว้ก่อน',description:'ใช้ชีวิตด้านอื่นแล้วกลับมาเมื่อพร้อม'},
  ]};
 }
 if(y.lastMajorAge===age)return null;
 const careerId=state.progression.activeCareerId,record=state.progression.records[careerId];
 if(careerId&&record.arcStep<3){
  const e=careerEvents.find(e=>e.careerId===careerId&&e.stage===record.arcStep);
  if(age>=careerDue(state,e))return {id:e.id,kind:'career',title:e.title,text:e.pages.join('\n\n'),event:e,choices:[...e.choices.map(c=>({id:c.id,label:c.label,description:'พัฒนาคุณลักษณะ ความชำนาญ และผลถาวรตามเรื่องอาชีพ'})),{id:'consult',label:'ปรึกษาผู้มีประสบการณ์แล้วค่อยลงมือ',description:'เรียนรู้จากคำแนะนำ ได้ความชำนาญและประสิทธิภาพการฝึก'},{id:'later',label:'เก็บเรื่องนี้ไว้ทบทวนอีกสองปี',description:'ใช้ชีวิตด้านอื่นต่อได้'}]};
 }
 const e=lifeMilestones.find(e=>age>=e.minAge&&age<=e.maxAge&&!y.completed.includes(e.id));
 return e?{...e,kind:'life'}:null;
}
// Absolute calendar boundary, shared by the planner and every external timed action.
export function nextDecisionDay(state){
 if(!isV7(state))return Infinity;
 if(pendingDecision(state))return state.time.absoluteDay;
 const {ageYears:age}=calendar(state),birth=state.time.birthAbsoluteDay,now=state.time.absoluteDay;
 const due=[nextDevelopmentDay(state)];
 const a=state.progression.awakening;if(a.step<7&&!a.paused)due.push(birth+12*360);
 const careerId=state.progression.activeCareerId,r=state.progression.records[careerId];
 const earliest=state.yearly.lastMajorAge===age?age+1:age;
 if(r&&r.arcStep<3){const e=careerEvents.find(e=>e.careerId===careerId&&e.stage===r.arcStep);due.push(birth+Math.max(earliest,careerDue(state,e))*360);}
 for(const e of lifeMilestones)if(!state.yearly.completed.includes(e.id)&&age<=e.maxAge){const year=Math.max(earliest,e.minAge);if(year<=e.maxAge)due.push(birth+year*360);}
 return Math.min(Infinity,...due.filter(day=>day>=now));
}
export function guardDecisionTime(state,days){
 if(!isV7(state))return;
 if(pendingDecision(state))throw Error('มีการตัดสินใจสำคัญรออยู่ กรุณาตัดสินใจก่อนใช้เวลา');
 if(state.time.absoluteDay+days>nextDecisionDay(state))throw Error('กิจกรรมนี้จะข้ามเหตุการณ์สำคัญ ใช้ชีวิตต่อจนถึงจุดตัดสินใจก่อน');
}
