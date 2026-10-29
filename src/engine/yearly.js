import { yearlyActivities } from '../data/yearly.js';
import { careers } from '../data/careers.js';
import { infantEvents,childhoodEvents } from '../data/events/childhood.js';
import { currentEvent,applyLifeChoice } from './life.js';
import { calendar,advanceTime,recordAction,normalize } from './time.js';
import { train,trainingQuote,workCareer,jobQuote,recoverProgression,earnCareerXp } from '../progression/engine.js';
import {workStaminaCost} from '../character/equipment-stats.js';
import { careerRecord } from '../progression/state.js';
import { useService,availableServices } from '../world/economy.js';
import { locations } from '../world/locations.js';
import { revealedLocations,findRoute,travel } from '../world/travel.js';
import {isV7,resolveDevelopment} from './development.js';
import {pendingDecision,nextDecisionDay} from './decisions.js';
import {powerTrainingMissing} from '../progression/power-model.js';
import {trainPower,resolvePower} from '../progression/power.js';
export {pendingDecision,nextDecisionDay} from './decisions.js';
export function availableYearActivities(state){return yearlyActivities.filter(a=>a.id==='cultivate'?!powerTrainingMissing(state).length:a.id==='care'?isV7(state)&&calendar(state).ageMonths<36:(!isV7(state)||calendar(state).ageMonths>=36)&&state.age>=a.minAge&&(!isV7(state)||a.id!=='study'||state.age>=6));}
function preference(state,choices){
 const focus=yearlyActivities.find(a=>a.id===state.yearly.focus),stats=focus.id==='train'?[state.yearly.stat]:focus.stats;
 return choices.toSorted((a,b)=>score(b)-score(a))[0];
 function score(c){return c.effects.reduce((sum,e)=>sum+(e.type==='stat'&&stats.includes(e.key)?3:0)+(e.type==='memory'&&focus.memory.includes(e.key)?2:0),0);}
}
export function resolveMajor(state,decisionId,choiceId){
 const d=pendingDecision(state);if(!d||d.id!==decisionId||!d.choices.some(c=>c.id===choiceId))throw Error('การตัดสินใจนี้เปลี่ยนไปแล้ว');
 const age=state.age;
 if(d.kind==='power')return resolvePower(state,choiceId);
 if(d.kind==='development')return resolveDevelopment(state,d,d.choices.find(c=>c.id===choiceId));
 if(d.kind==='awakening'){
  const a=state.progression.awakening;
  if(choiceId==='later'){a.paused=true;state.life.page=0;recordAction(state,'พักพิธีไว้ก่อน',0,{majorDecision:d.id});}
  else{
   if(a.venue&&a.venue.locationId!==state.world.currentLocationId)throw Error('กรุณากลับสถานที่พิธีเดิม หรือพักพิธีไว้ก่อนแล้วเดินทางกลับ');
   state.life.mode='annual';
   if(isV7(state)){const e=currentEvent(state);state.life.page=e.pages.length-1;applyLifeChoice(state,choiceId);state.journal.at(-1).majorDecision=d.id;}
   else while(a.step<7){const e=currentEvent(state);state.life.page=e.pages.length-1;const index=choiceId==='careful'?1:choiceId==='community'?(a.step===2||a.step===4||a.step===6?0:1):choiceId==='determined'?(a.step>=5?1:0):0;applyLifeChoice(state,e.choices[index].id);state.journal.at(-1).automatic=true;}
   if(a.step===7){state.yearly.completed.push(d.id);recordAction(state,'ผ่านพิธีแห่งเส้นชีพจรและบันทึกผลแล้ว',0,{majorDecision:d.id});}
  }
 }else if(d.kind==='career'){
  const e=d.event,r=careerRecord(state,e.careerId);
  if(choiceId==='later'){state.yearly.cooldowns[d.id]=age+2;recordAction(state,`พักเรื่อง ${d.title} ไว้อีกสองปี`,0,{majorDecision:d.id});}
  else if(choiceId==='consult'){
   const c=careers.find(c=>c.id===e.careerId);const oldXp=state.progression.practice[c.secondary]??0;state.progression.practice[c.secondary]=oldXp+8;state.stats[c.secondary]+=Math.floor((oldXp+8)/20)-Math.floor(oldXp/20);earnCareerXp(state,c.id,8);r.trainingBonus++;r.arcStep++;state.morale+=5;state.life.completed.push(`${age}:${e.id}`);state.life.flags={...state.life.flags,[`${e.id}.consult`]:true};recordAction(state,`${d.title} — ปรึกษาผู้มีประสบการณ์`,7,{majorDecision:d.id,choiceId:'consult'});advanceTime(state,7);
  }else{state.life.page=e.pages.length-1;applyLifeChoice(state,choiceId);state.journal.at(-1).majorDecision=d.id;}
  state.yearly.lastCareerAge=age;
 }else{
  const c=d.choices.find(c=>c.id===choiceId);state.stats[c.stat]++;state.childhoodMemory[c.memory]+=2;state.gold+=c.gold;
  if(c.gold)state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:'milestone',amount:c.gold});
  state.yearly.completed.push(d.id);recordAction(state,`${d.title} — ${c.label}`,1,{majorDecision:d.id,choiceId:c.id,goldDelta:c.gold});advanceTime(state,1);
 }
 state.yearly.lastMajorAge=age;state.life.page=0;return normalize(state);
}
function rest(state,days){recoverProgression(state,Math.max(20,days*10));state.stamina+=days*20;state.hp+=days*5;state.mana+=days*15;state.morale+=days;recordAction(state,'พักและดูแลตนเองตามแผน',days);advanceTime(state,days);}
function pastime(state,focus,days){
 state.childhoodMemory[focus.memory[0]]++;state.morale+=3;recoverProgression(state,20);state.stamina+=20;recordAction(state,`${focus.label}ตามวัย`,days);advanceTime(state,days);
}
function runOneYear(state){
 const age=state.age,start=state.time.absoluteDay,end=state.time.birthAbsoluteDay+(age+1)*360,oldGold=state.gold,oldStats={...state.stats},startJournal=state.journal.length,startLedger=state.world.ledger.length;
 const focus=yearlyActivities.find(a=>a.id===state.yearly.focus);const counts={stories:0,training:0,work:0,rest:0,travel:0,pastime:0};
 if(age<12){
  const limit=(age===0?infantEvents:childhoodEvents.filter(e=>e.minAge===age)).length+1;
  for(let i=0;i<limit&&state.time.absoluteDay<end;i++){
   const e=currentEvent(state);if(e.category!=='life'&&e.category!=='random')break;
   state.life.page=e.pages.length-1;applyLifeChoice(state,preference(state,e.choices).id);state.journal.at(-1).automatic=true;state.journal.at(-1).focusId=focus.id;counts.stories++;
  }
 }
 let loops=0,explored=false;
 while(state.time.absoluteDay<end){
  if(++loops>400)throw Error('การจำลองปีใช้เวลานานผิดปกติ');
  const left=end-state.time.absoluteDay;
  if(focus.id==='explore'&&!explored){
   const candidates=[...revealedLocations(state)].filter(id=>!state.world.visited.includes(id)).map(id=>({id,route:findRoute(state,id,'walk')})).filter(x=>x.route&&x.route.days<=left).sort((a,b)=>a.route.days-b.route.days||a.id.localeCompare(b.id));
   if(candidates.length){const c=candidates[0];if(state.stamina<c.route.days*2){rest(state,Math.min(2,left));counts.rest++;continue;}travel(state,c.id,'walk');counts.travel++;explored=true;continue;}explored=true;
  }
  if((focus.id==='train'||focus.id==='study')&&state.age>=8&&left>=7){
   const q=trainingQuote(state);if(state.stamina<q.stamina||state.progression.fatigue>=80||state.progression.focus<20||state.morale<20){rest(state,Math.min(2,left));counts.rest++;continue;}
   train(state,focus.id==='train'?state.yearly.stat:'int');counts.training++;continue;
  }
  if(focus.id==='work'&&state.age>=8){
   const professional=!!state.progression.activeCareerId,days=professional?7:1;
   if(!professional&&!availableServices(state).includes('work')){
    const jobs=Object.values(locations).filter(l=>l.services.includes('work')).map(l=>({id:l.id,route:findRoute(state,l.id,'walk')})).filter(x=>x.route).sort((a,b)=>a.route.days-b.route.days);
    const step=jobs[0]?.route.path[1],route=step?findRoute(state,step,'walk'):null;
    if(route&&route.days<=left){if(state.stamina<route.days*2){rest(state,Math.min(2,left));counts.rest++;continue;}travel(state,step,'walk');counts.travel++;continue;}
   }
   if(left>=days&&(professional||availableServices(state).includes('work'))){
    if(state.stamina<(professional?jobQuote(state).stamina:workStaminaCost(state,10))||professional&&state.progression.fatigue>=85){rest(state,Math.min(2,left));counts.rest++;continue;}
    if(professional)workCareer(state);else useService(state,'work');counts.work++;continue;
   }
  }
  const days=Math.min(30,left);
  if(focus.id==='rest'){rest(state,days);counts.rest++;}else{pastime(state,focus,days);counts.pastime++;}
 }
 const autoStories=state.journal.slice(startJournal).filter(e=>e.eventId);
 state.journal.splice(startJournal);
 const deltas=Object.fromEntries(Object.keys(oldStats).map(key=>[key,state.stats[key]-oldStats[key]]).filter(([,v])=>v!==0));
 const report={age,focusId:focus.id,startDay:start,endDay:end,days:end-start,goldDelta:state.gold-oldGold,statDeltas:deltas,counts,location:state.location};
 const totals=new Map();for(const e of state.world.ledger.splice(startLedger)){const key=e.source+'|'+e.location;const previous=totals.get(key)??{...e,transactions:0};previous.amount=(previous.transactions?previous.amount:0)+e.amount;previous.transactions++;totals.set(key,previous);}state.world.ledger.push(...totals.values());
 state.journal.push(...autoStories);
 const summary={id:state.journal.length+1,day:start,age,title:`สรุปปีอายุ ${age} — ${focus.label}`,days:end-start,location:state.location,annualReport:report,goldDelta:report.goldDelta};state.journal.push(summary);
 const closed=state.chronicle.find(c=>c.age===age);if(closed)closed.actions=state.journal.filter(e=>e.day>=state.time.birthAbsoluteDay+age*360&&e.day<end).map(e=>({...e}));
 state.yearly.reports.push(report);if(state.yearly.reports.length>200)state.yearly.reports.shift();state.life.page=0;
}
export function advanceYears(state,years){
 if(![1,2,5,10].includes(years))throw Error('เลือกผ่านเวลา 1, 2 หรือ 5 ปี หรือถึงจุดสำคัญไม่เกิน 10 ปี');
 if(state.yearly.view!=='yearly')throw Error('เปิดมุมมองรายปีก่อน');
 if(!availableYearActivities(state).some(a=>a.id===state.yearly.focus))throw Error('กิจกรรมนี้ยังไม่เหมาะกับวัย');
 if(pendingDecision(state))throw Error('มีการตัดสินใจสำคัญรออยู่ กรุณาตัดสินใจก่อนผ่านปี');
 if(isV7(state))return advanceDays(state,state.time.birthAbsoluteDay+(state.age+years)*360-state.time.absoluteDay);
 if(state.life.mode==='legacy'){state.life.legacySceneId=state.currentSceneId;state.life.mode='annual';}
 for(let i=0;i<years;i++){if(pendingDecision(state))break;runOneYear(state);}
 return normalize(state);
}
// V7 routines never choose a story response or move the player to another location.
// Fixed calendar-month slices keep 30-day autoplay and manual seeking equivalent.
function runV7Month(state,end){
 const start=state.time.absoluteDay,age=state.age,oldGold=state.gold,oldStats={...state.stats},journalStart=state.journal.length,ledgerStart=state.world.ledger.length;
 if(state.yearly.focus==='care'&&calendar(state).ageMonths>=36)state.yearly.focus='balanced';
 const focus=yearlyActivities.find(a=>a.id===state.yearly.focus);
 const counts={stories:0,training:0,work:0,rest:0,travel:0,pastime:0};
 while(state.time.absoluteDay<end&&!pendingDecision(state)){
  const left=end-state.time.absoluteDay;
  if(focus.id==='cultivate'&&left>=7){
   const q=trainingQuote(state);
   if(state.stamina<q.stamina||state.progression.fatigue>=80||state.progression.focus<20||state.morale<20){rest(state,Math.min(2,left));counts.rest++;continue;}
   trainPower(state);counts.training++;continue;
  }
  if(focus.id==='care'){
   recordAction(state,'ผู้ดูแลจัดอาหาร การพัก และการเล่นตามวัย',left);advanceTime(state,left);counts.rest++;continue;
  }
  if((focus.id==='train'||focus.id==='study')&&state.age>=8&&left>=7){
   const q=trainingQuote(state);
   if(state.stamina<q.stamina||state.progression.fatigue>=80||state.progression.focus<20||state.morale<20){rest(state,Math.min(2,left));counts.rest++;continue;}
   train(state,focus.id==='train'?state.yearly.stat:'int');counts.training++;continue;
  }
  if(focus.id==='work'&&state.age>=8){
   const professional=!!state.progression.activeCareerId,days=professional?7:1;
   if(left>=days&&(professional||availableServices(state).includes('work'))){
    if(state.stamina<(professional?jobQuote(state).stamina:workStaminaCost(state,10))||professional&&state.progression.fatigue>=85){rest(state,Math.min(2,left));counts.rest++;continue;}
    if(professional)workCareer(state);else useService(state,'work');counts.work++;continue;
   }
  }
  if(focus.id==='rest'){rest(state,left);counts.rest++;}
  else{
   // Scale routine credit by real calendar days, preventing one-day reward farming.
   state.yearly.routineDays=(state.yearly.routineDays??0)+left;
   const credits=Math.floor(state.yearly.routineDays/30);state.yearly.routineDays%=30;
   if(credits){state.childhoodMemory[focus.memory[0]]+=credits;state.morale+=3*credits;recoverProgression(state,20*credits);state.stamina+=20*credits;}
   recordAction(state,focus.id==='explore'?'สังเกตสิ่งแวดล้อมใกล้ที่พักโดยไม่ย้ายเมือง':`${focus.label}ตามวัย`,left);advanceTime(state,left);counts.pastime++;
  }
 }
 end=state.time.absoluteDay;
 const report={age,focusId:focus.id,startDay:start,endDay:end,days:end-start,goldDelta:state.gold-oldGold,statDeltas:Object.fromEntries(Object.keys(oldStats).map(k=>[k,state.stats[k]-oldStats[k]]).filter(([,v])=>v!==0)),counts,location:state.location};
 const totals=new Map();for(const e of state.world.ledger.splice(ledgerStart)){const key=e.source+'|'+e.location,old=totals.get(key)??{...e,amount:0,transactions:0};old.amount+=e.amount;old.transactions++;totals.set(key,old);}state.world.ledger.push(...totals.values());
 state.journal.splice(journalStart);state.journal.push({id:state.journal.length+1,day:start,age,ageMonths:Math.floor((start-state.time.birthAbsoluteDay)/30),title:`ช่วงที่ผ่านมา — ${focus.label}`,days:end-start,location:state.location,annualReport:report,goldDelta:report.goldDelta});
 // Merge adjacent same-focus months in the same life year, including autoplay ticks.
 const previous=state.yearly.reports.at(-1);
 if(previous&&previous.age===age&&previous.focusId===focus.id&&previous.endDay===start&&previous.location===state.location){
  previous.endDay=end;previous.days+=report.days;previous.goldDelta+=report.goldDelta;
  for(const [key,value]of Object.entries(report.counts))previous.counts[key]+=value;
  for(const [key,value]of Object.entries(report.statDeltas))previous.statDeltas[key]=(previous.statDeltas[key]??0)+value;
 }else state.yearly.reports.push(report);
 if(state.yearly.reports.length>200)state.yearly.reports.shift();
 const closed=state.chronicle.find(c=>c.age===age);if(closed)closed.actions=state.journal.filter(e=>e.day>=state.time.birthAbsoluteDay+age*360&&e.day<end).map(e=>({...e}));
 if(state.yearly.focus==='care'&&calendar(state).ageMonths>=36)state.yearly.focus='balanced';state.life.page=0;
}
export function advanceDays(state,days){
 if(!isV7(state)||!Number.isSafeInteger(days)||days<1||days>3600)throw Error('ระยะเวลาต้องอยู่ระหว่าง 1 ถึง 3,600 วัน');
 if(state.yearly.view!=='yearly')throw Error('เปิดมุมมองรายปีก่อน');
 if(pendingDecision(state))throw Error('มีการตัดสินใจสำคัญรออยู่ กรุณาตัดสินใจก่อนใช้เวลา');
 if(!availableYearActivities(state).some(a=>a.id===state.yearly.focus))throw Error('กิจกรรมนี้ยังไม่เหมาะกับวัย');
 if(state.life.mode==='legacy'){state.life.legacySceneId=state.currentSceneId;state.life.mode='annual';}
 const target=state.time.absoluteDay+days;
 while(state.time.absoluteDay<target&&!pendingDecision(state)){
  const lived=state.time.absoluteDay-state.time.birthAbsoluteDay,nextMonth=state.time.birthAbsoluteDay+(Math.floor(lived/30)+1)*30;
  const end=Math.min(target,nextMonth,nextDecisionDay(state));
  if(end<=state.time.absoluteDay)break;
  runV7Month(state,end);
 }
 return normalize(state);
}
