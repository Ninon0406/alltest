import {powerTitle,hasPower,powerCost,powerReady,powerTrainingMissing,powerPracticeQuote,powerWorkBonus} from '../progression/power-model.js';
import {currentCareer,trainingQuote} from '../progression/engine.js';
import {paragraph,actionButton,panelButton,statNames} from './life-view.js';
import {storyToken} from '../engine/life.js';
export function renderPower(parent,state,perform){
 if(!hasPower(state))return;
 const p=state.power,section=document.createElement('details');section.className='power-panel';section.dataset.panelSection='power';section.open=state.age>=12;parent.append(section);paragraph(section,`พลังและขอบเขต · ระดับ ${p.level}/100`,'summary');
 paragraph(section,powerTitle(state),'h3');paragraph(section,`บทฝึกประสานพลังที่ทำจริง ${p.practiceDays} วัน · ${powerWorkBonus(state)?'จังหวะมั่นคงช่วยให้งานใช้ความอึดลดลง 1 ต่อครั้ง':'เมื่อถึงระดับ 5 งานจะใช้ความอึดลดลง 1 ต่อครั้ง'}`);
 if(p.level<10){const progress=document.createElement('progress');progress.max=powerCost(p.level);progress.value=p.xp;progress.setAttribute('aria-label','ความก้าวหน้าพลังในระดับปัจจุบัน');section.append(progress);paragraph(section,`${p.xp}/${powerCost(p.level)} ประสบการณ์พลัง · แยกจากประสบการณ์อาชีพ`,'small');}
 if(powerReady(state)){
  paragraph(section,'บทฝึกพร้อมรับรองระดับสิบแล้ว การตัดสินใจเป็นของคุณ');
  if(p.deferred)actionButton(section,'กลับสู่บททดสอบพลัง',{type:'resumePower',token:storyToken(state)},perform);
  else panelButton(section,'พิจารณาบททดสอบพลัง','decision');
 }else{
  const missing=powerTrainingMissing(state);if(missing.length)paragraph(section,missing.join(' · '),'small');
  else{
   const c=currentCareer(state),q=powerPracticeQuote(state),skill=trainingQuote(state,c.primary);
   paragraph(section,`ฝึก${statNames[c.primary]}ผ่านเส้นทาง${c.label} · ${q.days} วัน · ใช้ความอึด ${skill.stamina} สมาธิ ${skill.focus} · เหนื่อยล้า +${skill.fatigue}`);
   paragraph(section,`ได้พลัง ${q.xp} และประสบการณ์ทักษะ ${skill.xp} · พลังลดหลั่น 12/10/8/6 เมื่อฝึกถี่ในรอบ 30 วัน จำกัดเท่าที่เหลือก่อนรับรองระดับสิบ · อุปกรณ์ช่วยเฉพาะทักษะ`,'small');
   actionButton(section,'ฝึกประสานพลัง 7 วัน',{type:'trainPower',token:storyToken(state)},perform);
  }
 }
 paragraph(section,'ขอบเขตเริ่มสัมผัสชีพจรครอบคลุมระดับ 1–10 การรับรองใช้บทฝึกที่ทำจริงและให้เลือกวิธีด้วยตนเอง การฝึกความถนัดปกติและการผ่านปีอย่างเดียวไม่เพิ่มพลัง','small');
}
