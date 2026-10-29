import {locations} from '../world/locations.js';
import {revealedLocations,findRoute} from '../world/travel.js';
import {nextDecisionDay,pendingDecision} from '../engine/decisions.js';
import {storyToken} from '../engine/life.js';
import {paragraph,actionButton} from './life-view.js';
let destination=null,lastRun=null;
export function renderJourney(parent,state,perform,refresh){
 if(lastRun!==state.run.id){lastRun=state.run.id;destination=null;}
 if(state.age<4){paragraph(parent,'วัยนี้อยู่กับผู้ดูแล ยังไม่ออกเดินทางเอง');return;}
 if(pendingDecision(state)){paragraph(parent,'มีเรื่องสำคัญรออยู่ ตัดสินใจก่อนวางแผนเดินทาง');return;}
 const options=[...revealedLocations(state)].filter(id=>findRoute(state,id));
 paragraph(parent,`ออกจาก${state.location} · เด็กอายุต่ำกว่า 12 ปีเดินทางในภูมิภาคกับผู้ดูแล`);
 if(!options.length){paragraph(parent,'ตอนนี้ยังไม่มีเส้นทางที่เปิดตามวัย');return;}
 if(!options.includes(destination))destination=options[0];
 const select=document.createElement('select');select.setAttribute('aria-label','จุดหมายการเดินทาง');for(const id of options){const option=document.createElement('option');option.value=id;option.textContent=locations[id].name;select.append(option);}select.value=destination;select.onchange=()=>{destination=select.value;refresh();};parent.append(select);
 paragraph(parent,locations[destination].description);
 for(const method of ['caravan','walk']){
  const route=findRoute(state,destination,method),stamina=route.days*2;
  paragraph(parent,route.path.map(id=>locations[id].name).join(' → '),'small');
  let reason=state.gold<route.gold?'เงินไม่พอ':state.stamina<stamina?'ความอึดไม่พอ':state.time.absoluteDay+route.days>nextDecisionDay(state)?'มีเรื่องสำคัญก่อนเดินทางถึง โปรดใช้ชีวิตต่อจนถึงเหตุการณ์นั้น':'';
  const button=actionButton(parent,`${method==='caravan'?'ร่วมขบวนเดินทาง':'เดินเท้ากับผู้ร่วมทาง'} · ${route.days} วัน · ${route.gold} เหรียญ · ใช้ความอึด ${stamina}${reason?'\n'+reason:''}`,{type:'journeyChoice',destination,method,token:storyToken(state)},perform);button.disabled=!!reason;
 }
 actionButton(parent,'อยู่ที่เดิมก่อน · ไม่เสียเวลาและทรัพยากร',{type:'journeyChoice',destination,method:'stay',token:storyToken(state)},perform);
 paragraph(parent,'เลือกแล้วจึงเปลี่ยนตำแหน่งจริง ภาพสถานที่และบันทึกจะเปลี่ยนตามเส้นทางที่เดินทาง','small');
}
