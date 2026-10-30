import {createRun} from './run.js';
import {calendar,advanceTime,recordAction,normalize} from './time.js';
import {storyToken} from './life.js';
import {v8Decision,v8NextDecisionDay,v8Focuses,naturalEndDay,v8CanResumePower,isV8} from './v8-model.js';
import {v8Observations} from '../data/v8-life-events.js';
import {v8EndingId} from '../data/v8-endings.js';
import {advanceAwakening} from '../progression/awakening.js';
import {selectCareer,currentCareer,train,workCareer} from '../progression/engine.js';
import {trainPower,resolvePower,resumePower} from '../progression/power.js';
import {hasPower,powerReady} from '../progression/power-model.js';
import {travel} from '../world/travel.js';
import {effectiveCapacities} from '../character/equipment-stats.js';

export function createV8Run(seed,identity){
 const state=createRun(seed,identity);state.story.version=8;state.morale=70;
 state.v8={version:1,stage:'reveal',focus:'care',nextFocus:null,knowledge:0,bonds:0,completed:[],observed:[],flags:{},relationship:'none',ritual:false,careerOffered:false,outcome:null,lastRoutineWindow:null,routineDays:0,lastAmbient:null,finishedAtDay:null};
 return state;
}
const clamp=n=>Math.max(0,Math.min(100,n));
export const v8Vitals=state=>({health:state.hp/effectiveCapacities(state).maxHp*100,happiness:state.morale,knowledge:state.v8.knowledge,bonds:state.v8.bonds,gold:state.gold,stamina:state.stamina,focus:state.progression.focus,mana:state.mana,power:state.power.level});
function delta(before,state){const after=v8Vitals(state);return Object.fromEntries(Object.entries(after).map(([key,n])=>[key,Math.round((n-before[key])*100)/100]).filter(([,n])=>n!==0));}
function observe(state){
 for(const event of v8Observations)if(calendar(state).ageMonths>=event.month&&!state.v8.observed.includes(event.id)){
  state.v8.observed.push(event.id);state.v8.lastAmbient={title:event.title,text:event.text};
  recordAction(state,event.title,0,{eventId:event.id,automatic:true,ageMonths:calendar(state).ageMonths});
 }
}
function effect(state,effects){
 const v=state.v8;
 for(const [key,value]of Object.entries(effects)){
  if(key==='knowledge'||key==='bonds')v[key]=clamp(v[key]+value);
  else if(key==='happiness')state.morale=clamp(state.morale+value);
  else if(key==='health')state.hp+=effectiveCapacities(state).maxHp*value/100;
  else if(key==='gold')state.gold+=value;
  else if(key==='flag')v.flags[value]=true;
  else if(key==='memory')for(const [id,n]of Object.entries(value))state.childhoodMemory[id]+=n;
  else if(key==='trust')state.story.relationships.community+=value;
  else if(key==='relationship')v.relationship=value;
  else throw Error('ผลของเรื่องราวไม่ถูกต้อง');
 }
 normalize(state);
}
function outcome(state,d,c,before,text){state.v8.outcome={eventId:d.id,title:d.title,choice:c.label,text,changes:delta(before,state),day:state.time.absoluteDay};}
function choose(state,action){
 const d=v8Decision(state),c=d?.choices.find(c=>c.id===action.choiceId);
 if(!d||d.id!==action.decisionId||!c||c.disabled)throw Error(c?.unavailable??'การตัดสินใจนี้เปลี่ยนไปแล้ว');
 const before=v8Vitals(state),v=state.v8;
 if(d.kind==='ritual'){
  for(const item of c.effects)state.childhoodMemory[item.key]+=item.amount;
  advanceAwakening(state);
  recordAction(state,`${d.title} — ${c.label}`,1,{majorDecision:d.id,choiceId:c.id,ageMonths:calendar(state).ageMonths});advanceTime(state,1);
  outcome(state,d,c,before,state.progression.awakening.step===7?'คุณออกจากศาลาพร้อมผลเดิมที่บันทึกไว้แล้ว เลือกเส้นทางต่อไปตามความพร้อมได้':'คุณผ่านขั้นตอนนี้อย่างไม่เร่งรีบ และยังเป็นผู้เลือกขั้นถัดไปเอง');
 }else if(d.kind==='career'){
  v.careerOffered=true;
  if(c.careerId)selectCareer(state,c.careerId);else{v.flags.ordinaryPath=true;recordAction(state,'เลือกชีวิตชุมชนโดยไม่ผูกอาชีพ',0,{majorDecision:d.id,choiceId:c.id});}
  if(c.careerId){state.journal.at(-1).majorDecision=d.id;state.journal.at(-1).choiceId=c.id;}
  outcome(state,d,c,before,c.careerId?`คุณเริ่มเส้นทาง${c.label}ด้วยการฝึกงานจริงเจ็ดวัน ยังมีเวลาสำหรับชีวิตด้านอื่น`:'คุณเลือกชีวิตที่ไม่ต้องแข่งขันด้านพลัง งานพื้นฐานและการเรียนรู้ยังเดินต่อได้');
 }else if(d.kind==='power'){
  resolvePower(state,c.id);if(v.focus==='cultivate')v.focus='rest';v.nextFocus=null;
  outcome(state,d,c,before,c.id==='later'?'คุณเก็บบทฝึกไว้ พักฟื้นจริงแล้วกลับมาทบทวนได้เมื่อพร้อม':'ระดับสิบมาจากวันฝึกที่สะสมและการยืนยันของคุณ ไม่มีการเติมทรัพยากรทันที');
 }else{
  v.completed.push(d.id);
  if(c.special==='ritual'){v.ritual=true;state.progression.awakening.paused=false;}
  if(c.special==='travel')travel(state,c.trip.id,'walk');
  else{
   state.gold-=c.costGold;state.stamina-=c.stamina;
   if(c.costGold)state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:`story:${d.id}`,amount:-c.costGold});
  }
  effect(state,c.effects);
  if(c.effects.gold)state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:`story:${d.id}`,amount:c.effects.gold});
  recordAction(state,`${d.title} — ${c.label}`,c.timeDays,{majorDecision:d.id,choiceId:c.id,ageMonths:calendar(state).ageMonths,goldDelta:state.gold-before.gold});
  if(c.special!=='travel')advanceTime(state,c.timeDays);
  let text=c.outcomeText;
  if(d.id==='v8.home-return')text+=(v.relationship==='partner'?' คนที่คบกันยังเป็นส่วนหนึ่งของการนัดหมาย':v.relationship==='friend'?' มิตรภาพที่คุณเลือกยังมีพื้นที่ในบ้านนี้':' คุณรักษาพื้นที่อิสระและติดต่อคนรอบตัวตามที่สบายใจ');
  outcome(state,d,c,before,text);
 }
 normalize(state);
}
function finish(state){
 if(state.time.absoluteDay<naturalEndDay(state))return;
 state.v8.finishedAtDay=state.time.absoluteDay;state.run.status='ended';state.run.endingId=v8EndingId(state);
 recordAction(state,'ชีวิตถึงปลายอายุขัยตามธรรมชาติ',0,{terminal:true});
}
// Each calendar month permits one actual timed practice/job; the remainder is ordinary life.
function routine(state,end){
 const v=state.v8,window=Math.floor(state.time.absoluteDay/30),start=state.time.absoluteDay;
 if(v.lastRoutineWindow!==window){
  const left=end-start,ready=state.stamina>=15&&state.progression.fatigue<80&&state.progression.focus>=25&&state.morale>=20;
  if(left>=7&&state.age>=12){
   if(v.focus==='cultivate'&&!powerReady(state)&&ready){trainPower(state);v.lastRoutineWindow=window;}
   else if(v.focus==='practice'&&ready){train(state,currentCareer(state)?.primary??'con');v.lastRoutineWindow=window;}
   else if(v.focus==='work'&&state.stamina>=15&&state.progression.fatigue<85){
    if(currentCareer(state))workCareer(state);
    else{state.gold+=5;state.stamina-=10;state.progression.fatigue+=10;recordAction(state,'งานพื้นฐานที่เหมาะกับวัยในชุมชน',7,{goldDelta:5});state.world.ledger.push({day:start,location:state.world.currentLocationId,source:'v8:community-work',amount:5});advanceTime(state,7);}
    v.lastRoutineWindow=window;
   }
  }
 }
 const remaining=powerReady(state)&&!state.power.deferred?0:end-state.time.absoluteDay;
 if(remaining){
  const recovery=remaining/30;
  state.stamina+=Math.ceil(recovery*30);state.mana+=Math.ceil(recovery*25);state.progression.focus=clamp(state.progression.focus+Math.ceil(recovery*25));state.progression.fatigue=clamp(state.progression.fatigue-Math.ceil(recovery*30));
  if(v.focus==='rest'||v.focus==='care'||v.focus==='move')state.hp+=remaining/30*2;
  advanceTime(state,remaining);
 }
 const actualDays=state.time.absoluteDay-start,portion=actualDays/30,months=calendar(state).ageMonths;
 if(months>=12){
  const knowledge=['observe','stories','study'].includes(v.focus)?1:0;
  const bonds=v.focus==='bonds'?0.5:['play','help'].includes(v.focus)?0.25:0;
  v.knowledge=clamp(v.knowledge+portion*(knowledge+(v.flags.schoolKit&&knowledge?0.25:0)));
  v.bonds=clamp(v.bonds+portion*(bonds+(v.flags.neighborFriend&&bonds?0.1:0))-(bonds?0:Math.max(0,v.bonds-40)*0.015*portion));
  const comfort=['play','bonds','rest','care'].includes(v.focus)?85:70;
  state.morale+=(comfort-state.morale)*0.03*portion;
 }
 v.routineDays+=actualDays;normalize(state);return actualDays;
}
function passTime(state,days){
 const v=state.v8,before=v8Vitals(state),start=state.time.absoluteDay;
 const target=Math.min(start+days,naturalEndDay(state));let steps=0;
 while(state.time.absoluteDay<target){
  if(++steps>13000)throw Error('ช่วงเวลายาวเกินขอบเขตการจำลอง');
  if(v8Decision(state))break;
  const focuses=v8Focuses(state);
  if(v.nextFocus){if(focuses.some(f=>f.id===v.nextFocus))v.focus=v.nextFocus;v.nextFocus=null;}
  if(focuses.length&&!focuses.some(f=>f.id===v.focus))v.focus=focuses.find(f=>f.id==='rest')?.id??focuses[0].id;
  const end=Math.min(target,(Math.floor(state.time.absoluteDay/30)+1)*30,v8NextDecisionDay(state));
  if(end<=state.time.absoluteDay)break;
  routine(state,end);observe(state);finish(state);
  if(state.run.status==='ended')break;
  if(calendar(state).dayInYear===0)recordAction(state,`วันธรรมดาในปีอายุ ${state.age}`,0,{automatic:true,focusId:v.focus});
 }
 if(calendar(state).ageMonths>12)v.lastAmbient={title:'วันธรรมดาที่ค่อย ๆ เดินไป',text:`คุณใช้เวลา${v8Focuses(state).find(f=>f.id===v.focus)?.label??'รับการดูแล'}ที่${state.location}`,changes:delta(before,state)};
 normalize(state);
}
export function dispatchV8(input,action){
 if(!isV8(input)||!hasPower(input))throw Error('ข้อมูลชีวิตไม่ถูกต้อง');
 if(input.run.status==='ended')throw Error('ชีวิตนี้จบแล้ว เริ่มชีวิตใหม่เพื่อเล่นต่อ');
 if(action.token!==storyToken(input))throw Error('รายการนี้เปลี่ยนไปแล้ว กรุณาเลือกจากหน้าปัจจุบัน');
 const state=structuredClone(input),v=state.v8;
 if(v.stage==='reveal'){
  if(action.type!=='v8Begin')throw Error('เริ่มชีวิตจากบันทึกการเกิดก่อน');
  v.stage='life';observe(state);
 }else if(v.outcome){
  if(action.type!=='v8Continue')throw Error('อ่านผลแล้วดำเนินชีวิตต่อก่อน');v.outcome=null;
 }else if(action.type==='v8Choice')choose(state,action);
 else if(v8Decision(state))throw Error('มีเรื่องสำคัญรอให้คุณเลือก เวลาได้หยุดแล้ว');
 else if(action.type==='v8Focus'){
  if(!v8Focuses(state).some(f=>f.id===action.focus))throw Error('แนวทางนี้ยังไม่เหมาะกับวัยหรือความพร้อม');v.nextFocus=action.focus;
 }else if(action.type==='v8Tick'){
  if(action.days!==30)throw Error('เวลาอัตโนมัติเดินครั้งละหนึ่งเดือน');passTime(state,action.days);
 }else if(action.type==='v8Seek')passTime(state,Math.max(1,v8NextDecisionDay(state)-state.time.absoluteDay));
 else if(action.type==='v8ResumePower'){
  if(!v8CanResumePower(state))throw Error('ไม่มีบทฝึกที่พร้อมทบทวน');resumePower(state);
 }else throw Error('ทำรายการนี้ไม่ได้');
 normalize(state);if(!hasPower(state))throw Error('บันทึกพลังไม่สอดคล้องกับวันฝึกจริง');state.life.revision++;return state;
}
