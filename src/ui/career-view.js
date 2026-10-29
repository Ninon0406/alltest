import { careers,getCareer,statKeys } from '../data/careers.js';
import { eligibleCareers,readiness,missingRequirements,promotionMissing,currentCareer,trainingQuote,jobQuote } from '../progression/engine.js';
import { paragraph,actionButton,statNames } from './life-view.js';
import { storyToken } from '../engine/life.js';
import {isV7} from '../engine/development.js';
import {ageLabel} from '../engine/time.js';
import {effectiveCapacities} from '../character/equipment-stats.js';
import {renderPower} from './power-view.js';
let selectedStat='wis',search='',lastCareer=null;
const rankLabel=r=>r.advanced?'ขั้นชำนาญ':'พื้นฐาน';
export function renderCareer(parent,state,perform){
 if(state.progression.activeCareerId!==lastCareer){lastCareer=state.progression.activeCareerId;selectedStat=currentCareer(state)?.primary??'wis';}
 const p=state.progression,a=p.awakening,c=currentCareer(state),token=storyToken(state);
 paragraph(parent,'อาชีพและการฝึก','h2');
 if(isV7(state)&&state.age<3){paragraph(parent,`อายุ ${ageLabel(state)} · ผู้ดูแลจัดการพัก อาหาร และการเล่นที่ปลอดภัย เรื่องอาชีพยังไม่เปิดในวัยนี้`);return;}
 paragraph(parent,`อายุ ${state.age} ปี • เงิน ${state.gold} เหรียญ • ความอึด ${state.stamina}/${effectiveCapacities(state).maxStamina} • เหนื่อยล้า ${p.fatigue}/100 • สมาธิ ${p.focus}/100`);
 renderPower(parent,state,perform);
 if(a.step<7){
  paragraph(parent,state.age<12?'พิธีแห่งเส้นชีพจรเปิดเมื่ออายุครบ 12 ปี การฝึกพื้นฐานเปิดตั้งแต่อายุ 8 ปี':`พิธีแห่งเส้นชีพจร: ผ่านแล้ว ${a.step}/7 ช่วง • ไม่มีค่าเข้าร่วม`);
  if(a.venue)paragraph(parent,`สถานที่พิธี: ${a.venue.name}`);
  if(state.age>=12){actionButton(parent,a.paused?'กลับเข้าพิธีที่พักไว้':'เข้าสู่พิธีต่อ',{type:'beginAwakening',token},perform);if(!a.paused)actionButton(parent,'พักพิธีไว้ก่อน',{type:'pauseAwakening',token},perform);}
 }
 if(a.result){
  paragraph(parent,`ผลการปลุกพลัง: ${a.result.tier}`,'h3');paragraph(parent,`แนวที่ตอบสนองเด่น: ${getCareer(a.result.topId).label} • ผลนี้คงเดิมตลอดชีวิตที่กำลังเล่น`);
  const result=document.createElement('details');parent.append(result);paragraph(result,'รายละเอียดคะแนนทั้ง 20 สาย','summary');
  for(const profile of careers){const r=a.result.scores[profile.id];paragraph(result,`${profile.label}: ${r.score.toFixed(2)} = คุณลักษณะ ${r.statPart.toFixed(2)} + วัยเด็ก ${r.memoryPart.toFixed(2)} + การฝึก ${r.trainingPart.toFixed(2)} + ภูมิหลัง ${r.background} + ความแปรผัน ${r.variation.toFixed(2)}`);}
 }
 if(c){
  const r=p.records[c.id],job=jobQuote(state);
  paragraph(parent,`${state.career} • ${rankLabel(r)}`,'h3');paragraph(parent,`${c.skill}: ประสบการณ์ ${r.xp} • ความชำนาญ ${r.mastery}/100 • ระดับทักษะ ${1+Math.floor(r.xp/40)} • เรื่องอาชีพ ${r.arcStep}/3 ตอน`);
  paragraph(parent,`ผลจากเรื่องราว: ฝึกได้เพิ่ม ${r.trainingBonus} ประสบการณ์/ครั้ง • รายได้เพิ่ม ${r.payBonus} เหรียญ/งาน`);
  actionButton(parent,`${c.job}\nรับ ${job.gold} เหรียญ • +${job.xp} ประสบการณ์ • ${job.days} วัน • ใช้ความอึด ${job.stamina}`,{type:'careerJob',token},perform);
  const missing=promotionMissing(state,c);
  if(!r.advanced){paragraph(parent,`ขั้นต่อไป: ${c.advanced.label} • รายได้เพิ่ม ${c.advanced.payBonus}/งาน • ฝึกเพิ่ม ${c.advanced.trainingBonus}/ครั้ง • ${c.advanced.resource==='maxMana'?'มานา':c.advanced.resource==='maxHp'?'พลังชีวิต':'ความอึด'}สูงสุด +${c.advanced.resourceBonus}`);if(!missing.length)actionButton(parent,'รับรองขั้นชำนาญ',{type:'promoteCareer',token},perform);else paragraph(parent,`ยังต้องมี: ${missing.join(' • ')}`);}
 }
 paragraph(parent,'ฝึกพื้นฐานฟรี','h3');
 if(state.age>=8){
  const select=document.createElement('select');select.setAttribute('aria-label','หัวข้อฝึกพื้นฐาน');for(const stat of statKeys){const option=document.createElement('option');option.value=stat;option.textContent=statNames[stat];select.append(option);}select.value=selectedStat;select.onchange=()=>{selectedStat=select.value;updateQuote();};parent.append(select);
  const quoteText=paragraph(parent,'');quoteText.className='training-quote';const updateQuote=()=>{const q=trainingQuote(state,selectedStat);quoteText.textContent=`ฝึก ${q.days} วัน • ใช้ความอึด ${q.stamina} • เหนื่อยล้า +${q.fatigue} • สมาธิ -${q.focus} • ได้ ${q.xp} ประสบการณ์ (รวมคำแนะนำ +${q.learningBonus} · อุปกรณ์ +${q.equipmentBonus}) • ทุก 20 ประสบการณ์เพิ่มคุณลักษณะ 1 จุด ผลตอบแทนลดลงเมื่อฝึกถี่ในรอบ 30 วัน`;};updateQuote();
  if(state.story?.learning)paragraph(parent,`คำแนะนำสะสม (สูงสุด 3 ต่อวิชา): ${Object.entries(state.story.learning).map(([stat,n])=>`${statNames[stat]} +${n}`).join(' · ')}`,'small');
  const b=document.createElement('button');b.textContent='เริ่มฝึกฟรี';b.onclick=()=>perform({type:'train',stat:selectedStat,token});parent.append(b);
  actionButton(parent,'พักฟื้น 2 วัน • ฟรี • ฟื้นแรง สมาธิ และลดความเหนื่อยล้า',{type:'trainingRest',token},perform);
  paragraph(parent,`ความก้าวหน้าหัวข้อ: ${statKeys.map(stat=>`${statNames[stat]} ${p.practice[stat]??0}`).join(' • ')}`);
 }
 const eligible=eligibleCareers(state).filter(profile=>profile.id!==p.activeCareerId).sort((a,b)=>readiness(state,b)-readiness(state,a));
 const recommended=isV7(state)?eligible.slice(0,8):eligible;
 paragraph(parent,'อาชีพที่พร้อมเลือก','h3');paragraph(parent,'คะแนนแนะนำผสมความพร้อมปัจจุบัน 85% กับผลพิธีเดิม 15% ฝึกเพิ่มเพื่อเปิดทางอื่นได้โดยไม่ต้องสุ่มผลใหม่');
 if(!eligible.length)paragraph(parent,a.step<7?'ผ่านพิธีให้ครบก่อนเลือกอาชีพ ความก้าวหน้าเดิมยังอยู่':'กำลังประกอบอาชีพที่เข้าเงื่อนไขอยู่ ฝึกเพิ่มเพื่อเปิดทางใหม่ได้');
 if(isV7(state)&&a.step===7)paragraph(parent,`แนะนำ ${recommended.length} สายที่เข้าเงื่อนไขสูงสุดจาก 20 สายหลัก · ทางอื่นที่พร้อมเลือกอยู่ในสารานุกรม`,'small');
 for(const profile of recommended){
  const card=document.createElement('section');card.className='career-card';parent.append(card);
  paragraph(card,profile.label,'h4');paragraph(card,`แนะนำ ${readiness(state,profile).toFixed(2)} • เหมาะกับ ${statNames[profile.primary]} และ ${statNames[profile.secondary]} • งาน ${profile.job} เริ่มต้น ${profile.wage} เหรียญ/7 วัน`);
  paragraph(card,`ฝึกทักษะ ${profile.skill} และเติบโตสู่ ${profile.advanced.label}`);
  actionButton(card,`เลือกอาชีพ ${profile.label}`,{type:'chooseCareer',careerId:profile.id,token},perform);
 }
 const codex=document.createElement('details');codex.className='career-codex';parent.append(codex);paragraph(codex,'สารานุกรมอาชีพ 20 สายหลักและ 20 ขั้นชำนาญ','summary');
 const input=document.createElement('input');input.type='search';input.setAttribute('aria-label','ค้นหาในสารานุกรมอาชีพ');input.value=search;input.placeholder='ค้นหาชื่ออาชีพ';codex.append(input);
 const list=document.createElement('div');codex.append(list);
 const update=()=>{list.replaceChildren();for(const profile of careers.filter(item=>(item.label+item.advanced.label).includes(search))){paragraph(list,`${profile.label} → ${profile.advanced.label}`,'h4');paragraph(list,`พื้นฐาน: ${missingRequirements(state,profile).join(' • ')||'เข้าเงื่อนไขแล้ว'} • ขั้นชำนาญ: อายุ 18 ปี, ประสบการณ์ 120, ความชำนาญ 60, เรื่องอาชีพครบ 3 ตอน, ${statNames[profile.advanced.stat]} ${profile.advanced.minimum}`);if(isV7(state)&&eligible.some(c=>c.id===profile.id)&&!recommended.some(c=>c.id===profile.id))actionButton(list,`เลือกอาชีพ ${profile.label}`,{type:'chooseCareer',careerId:profile.id,token},perform);}};
 input.oninput=()=>{search=input.value;update();};update();
}
