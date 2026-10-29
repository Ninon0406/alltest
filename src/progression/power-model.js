// The first complete realm only. Higher realms/deity are never awarded by this model.
import {firstRealmTitles} from '../data/power-titles.js';
export const FIRST_REALM_CAP=10;
export const createPower=()=>({version:2,level:1,xp:0,practiceDays:0,window:null,count:0,deferred:false,certification:null});
export const powerCost=level=>Math.ceil(30*1.12**(level-1));
export function validPower(p){return p?.version===2&&Number.isSafeInteger(p.level)&&p.level>=1&&p.level<=FIRST_REALM_CAP&&Number.isSafeInteger(p.xp)&&p.xp>=0&&(p.level===10?p.xp===0:p.xp<=(p.level===9?powerCost(9):powerCost(p.level)-1))&&Number.isSafeInteger(p.practiceDays)&&p.practiceDays>=0&&p.practiceDays%7===0&&(p.window===null||Number.isSafeInteger(p.window)&&p.window>=0)&&Number.isSafeInteger(p.count)&&p.count>=0&&p.count<=5&&typeof p.deferred==='boolean'&&(p.level===10?['steady','reflect'].includes(p.certification)&&!p.deferred:p.certification===null);}
export const hasPower=state=>validPower(state.power)&&(!state.power.deferred||state.power.level===9&&state.power.xp===powerCost(9))&&(!state.power.practiceDays||state.age>=12&&state.progression.awakening.step===7&&state.power.practiceDays<=state.time.absoluteDay-state.time.birthAbsoluteDay-12*360)&&Array.from({length:state.power.level-1},(_,i)=>powerCost(i+1)).reduce((sum,n)=>sum+n,0)+state.power.xp<=state.power.practiceDays/7*12;
export const powerReady=state=>hasPower(state)&&state.power.level===9&&state.power.xp===powerCost(9);
export const powerWorkBonus=state=>hasPower(state)&&state.power.level>=5?1:0;
export function powerTitle(state){
 const p=state.power;if(!hasPower(state)||p.level<5)return 'ผู้เริ่มสัมผัสชีพจร';
 const title=firstRealmTitles[state.progression.activeCareerId]??'ผู้เริ่มสัมผัสชีพจร';
 return p.level===10?`${title} · ${p.certification==='steady'?'ชีพจรมั่นคง':'ชีพจรใคร่ครวญ'}`:title;
}
export function powerTrainingMissing(state){
 const reasons=[];
 if(!hasPower(state))reasons.push('ชีวิตนี้ไม่มีบันทึกการฝึกประสานพลัง');
 if(state.age<12||state.progression.awakening.step<7)reasons.push('อายุครบ 12 ปีและผ่านพิธีทั้งเจ็ดขั้น');
 if(!state.progression.activeCareerId)reasons.push('เลือกอาชีพเพื่อฝึกผ่านงานที่ถนัด');
 if(state.power?.level===10)reasons.push('ขอบเขตเริ่มต้นสมบูรณ์แล้ว ฝึกทักษะหรือใช้ชีวิตด้านอื่นต่อได้');
 if(powerReady(state))reasons.push('ทบทวนบทฝึกเพื่อรับรองขอบเขตก่อนฝึกประสานพลังต่อ');
 return reasons;
}
export function powerPracticeQuote(state){
 const p=state.power,window=Math.floor(state.time.absoluteDay/30),count=p?.window===window?p.count:0;
 const base=Math.max(6,12-count*2);
 return {days:7,xp:p?.level===9?Math.min(base,powerCost(9)-p.xp):base,window};
}
export function powerDecision(state){
 if(!powerReady(state)||state.power.deferred)return null;
 const p=state.progression;
 return {id:'power.first-realm',kind:'power',title:'จังหวะที่กลายเป็นของตนเอง',text:'การฝึกหลายเดือนทำให้คุณประสานงานที่ถนัดกับลมหายใจได้อย่างมั่นคง ก่อนรับรองระดับสิบ คุณอยากรักษาจังหวะนี้ด้วยวิธีใด? การรับรองไม่ผ่านเวลาเพิ่ม และไม่เติมพลังทันที',choices:[
  {id:'steady',label:'ยืนยันด้วยจังหวะร่างกายที่ฝึกมา',description:'ใช้ความอึด 15 และสมาธิ 10 · ความอึดสูงสุดถาวร +5 · ถ้าฝึกประสานพลังอยู่จะกลับสู่ชีวิตสมดุล',disabled:state.stamina<15||p.focus<20,unavailable:'ต้องมีความอึด 15 และสมาธิอย่างน้อย 20 พักบททดสอบและพักฟื้นก่อนได้'},
  {id:'reflect',label:'ประสานลมหายใจกับบันทึกการฝึก',description:'ใช้มานา 10 และสมาธิ 15 · มานาสูงสุดถาวร +5 · ถ้าฝึกประสานพลังอยู่จะกลับสู่ชีวิตสมดุล',disabled:state.mana<10||p.focus<25,unavailable:'ต้องมีมานา 10 และสมาธิอย่างน้อย 25 พักบททดสอบและพักฟื้นก่อนได้'},
  {id:'later',label:'พักเรื่องนี้แล้วใช้ชีวิตด้านอื่นก่อน',description:'ไม่เสียเวลาและทรัพยากร · ถ้าฝึกประสานพลังอยู่จะกลับสู่ชีวิตสมดุล · เปิดบททดสอบอีกครั้งได้เมื่อพร้อม'},
 ]};
}
