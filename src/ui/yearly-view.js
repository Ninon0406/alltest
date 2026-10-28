import { availableYearActivities,pendingDecision } from '../engine/yearly.js';
import { yearlyActivities } from '../data/yearly.js';
import { storyToken,textTokens } from '../engine/life.js';
import { calendar } from '../engine/time.js';
import { locations } from '../world/locations.js';
import { paragraph,actionButton,statNames } from './life-view.js';
let auto=false,speed=1,timer=null,refreshActive=null;
export function stopYearlyAuto(){auto=false;clearTimeout(timer);timer=null;}
export function isYearlyAuto(){return auto;}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopYearlyAuto();else refreshActive?.();});
function section(parent,title){const card=document.createElement('section');card.className='year-card';parent.append(card);if(title)paragraph(card,title,'h3');return card;}
function reportText(r){return `${yearlyActivities.find(a=>a.id===r.focusId)?.label??'ชีวิตตามแผน'} • ${r.days} วัน • เงิน ${r.goldDelta>=0?'+':''}${r.goldDelta} เหรียญ${Object.entries(r.statDeltas).length?' • '+Object.entries(r.statDeltas).map(([k,v])=>`${statNames[k]} ${v>=0?'+':''}${v}`).join(' • '):''}`;}
export function renderYearly(parent,state,perform,refresh){
 refreshActive=refresh;clearTimeout(timer);timer=null;parent.replaceChildren();const decision=pendingDecision(state),c=calendar(state),token=storyToken(state);
 if(decision)stopYearlyAuto();
 const toolbar=document.createElement('div');toolbar.className='year-toolbar';parent.append(toolbar);
 paragraph(toolbar,`${c.ageYears} ปี`,'strong').className='year-age';paragraph(toolbar,`ปีโลก ${c.worldYear} • ${state.name} • ${state.location}`);
 const controls=document.createElement('div');controls.className='year-controls';toolbar.append(controls);
 const button=(label,click)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=click;controls.append(b);return b;};
 const play=button(auto?'หยุดเวลา':'เล่นอัตโนมัติ',()=>{if(document.hidden)return;auto=!auto;refresh();});play.setAttribute('aria-pressed',String(auto));play.disabled=!!decision;
 for(const value of [1,2,4,8])button(`${value}×`,()=>{speed=value;refresh();}).setAttribute('aria-pressed',String(speed===value));
 actionButton(controls,'ถึงจุดตัดสินใจถัดไป (สูงสุด 10 ปี)',{type:'advanceYears',years:10,token},perform).disabled=!!decision;
 const progress=document.createElement('div');progress.className='year-clock';toolbar.append(progress);const fill=document.createElement('div');progress.append(fill);if(auto){fill.style.animation=`year-tick ${8000/speed}ms linear forwards`;}
 paragraph(toolbar,auto?`กำลังใช้ชีวิตตามแผน • 1 ปีทุก ${(8/speed).toFixed(0)} วินาที • หยุดอัตโนมัติเมื่อพบเรื่องสำคัญ`:'เวลาไม่เดินเมื่อปิดหน้าเว็บหรือย้ายไปเมนูอื่น เลือกผ่านปีเองหรือเปิดเล่นอัตโนมัติได้','small');
 const layout=document.createElement('div');layout.className='year-layout';parent.append(layout);const center=document.createElement('div'),aside=document.createElement('aside');layout.append(center,aside);
 const landscape=document.createElement('div');landscape.className='scene-banner year-landscape';center.append(landscape);paragraph(landscape,`${state.location} • เอลินดรา`,'span').className='scene-caption';
 if(decision){
  const card=section(center,'การตัดสินใจครั้งสำคัญ');card.classList.add('major-decision');paragraph(card,decision.title,'h2');paragraph(card,textTokens(decision.text,state));
  for(const choice of decision.choices){
   const label=choice.label+(choice.description?'\n'+choice.description:choice.stat?`\n${statNames[choice.stat]} +1 • ความทรงจำ +2${choice.gold?' • +'+choice.gold+' เหรียญ':''}`:'');
   const b=actionButton(card,label,{type:'majorChoice',decisionId:decision.id,choiceId:choice.id,token},perform);b.className='major-option';
  }
 }else{
  const card=section(center,'ปีนี้อยากเน้นอะไร');paragraph(card,state.age<4?'ช่วงนี้ครอบครัวยังดูแลคุณ เลือกแนวการเรียนรู้และการตอบสนองที่เหมาะกับวัยได้ เรื่องเล็กจะค่อย ๆ สะสมในบันทึก':'เลือกแนวชีวิตไว้ครั้งเดียว แผนนี้ใช้ต่อในปีถัดไปได้ ระบบจัดการกิจวัตรและเวลาพักให้ แต่จะไม่ตัดสินใจเรื่องสำคัญแทนคุณ');
  const choices=document.createElement('div');choices.className='year-focus-grid';card.append(choices);
  for(const activity of availableYearActivities(state)){
   const b=actionButton(choices,`${activity.label}\n${activity.description}`,{type:'yearFocus',focus:activity.id,token},perform);b.className='year-focus';b.setAttribute('aria-pressed',String(state.yearly.focus===activity.id));
  }
  if(state.yearly.focus==='train'){
   const select=document.createElement('select');select.setAttribute('aria-label','หัวข้อฝึกประจำปี');for(const [id,name]of Object.entries(statNames)){const option=document.createElement('option');option.value=id;option.textContent=name;select.append(option);}select.value=state.yearly.stat;select.onchange=()=>perform({type:'yearFocus',focus:'train',stat:select.value,token});card.append(select);
  }
  const next=document.createElement('div');next.className='year-next';card.append(next);
  for(const years of [1,2,5])actionButton(next,`ใช้ชีวิตต่อ ${years} ปี`,{type:'advanceYears',years,token},perform).className=years===1?'primary':'secondary';
  paragraph(card,'ผ่านหลายปีจะหยุดก่อนจุดสำคัญ เรื่องทั่วไปสรุปตามแนวชีวิตที่เลือก ไม่ต้องกดตอบทีละสองข้อทุกเหตุการณ์','small');
 }
 const report=state.yearly.reports.at(-1);if(report){const card=section(center,`สรุปปีที่ผ่านมา — อายุ ${report.age} → ${report.age+1} ปี`);paragraph(card,reportText(report));paragraph(card,`เรื่องทั่วไป ${report.counts.stories} ช่วง • ฝึก ${report.counts.training} รอบ • ทำงาน ${report.counts.work} รอบ • พัก ${report.counts.rest} รอบ • เดินทาง ${report.counts.travel} ช่วง`);}
 const journal=section(center,'บันทึกชีวิตล่าสุด');
 for(const entry of state.journal.slice(-8).reverse()){const row=document.createElement('div');row.className='year-journal-row';journal.append(row);paragraph(row,`${entry.age} ปี`,'strong');paragraph(row,entry.title+(entry.automatic?' • เกิดขึ้นระหว่างใช้ชีวิตตามแผน':''));}
 if(!state.journal.length)paragraph(journal,'ชีวิตใหม่เริ่มต้นแล้ว เลือกแผนและผ่านปีเพื่อดูเรื่องราวเติบโต');
 actionButton(center,'อ่านเรื่องแบบละเอียด (ทางเลือก)',{type:'setPacing',view:'detailed',token},perform);
 if(state.age>=12)actionButton(center,'เปิดเรื่องราวเส้นทางเดิม',{type:'legacyArc',token},perform);
 const family=section(aside,'ครอบครัวและบ้านเกิด');paragraph(family,state.family);if(state.birth){paragraph(family,`มารดา: ${state.birth.parents.mother} • ${state.birth.parents.motherOccupation}`);paragraph(family,`บิดา: ${state.birth.parents.father} • ${state.birth.parents.fatherOccupation}`);paragraph(family,`บ้านเกิด: ${state.birth.initial.location}`);}else paragraph(family,'ข้อมูลครอบครัวจากชีวิตเดิมยังคงอยู่ ไม่มีการสุ่มพ่อแม่ย้อนหลัง');
 const map=section(aside,'ตำแหน่งปัจจุบัน');paragraph(map,`${locations[state.world.currentLocationId].parent} › ${state.location}`);paragraph(map,`เคยเยือน ${state.world.visited.length} สถานที่`);const mapButton=document.createElement('button');mapButton.textContent='เปิดแผนที่และบริการ';mapButton.onclick=()=>{stopYearlyAuto();document.querySelector('[data-view="map"]').click();};map.append(mapButton);
 const history=section(aside,'แผนที่ชีวิต');const base=Math.floor(state.age/100)*100;paragraph(history,`อายุ ${base}–${base+99} ปี • หนึ่งช่อง = หนึ่งปี ไม่ใช่การพยากรณ์อายุขัย`,'small');const grid=document.createElement('div');grid.className='life-grid';history.append(grid);const detail=paragraph(history,'แตะปีที่มีบันทึกเพื่ออ่านสรุป');
 for(let age=base;age<base+100;age++){
  const record=state.chronicle.find(r=>r.age===age),cell=document.createElement(record?'button':'span');cell.className='life-cell'+(age===state.age?' current':age<state.age?' past':' future');cell.title=`อายุ ${age} ปี`;if(age===state.age)cell.setAttribute('aria-current','date');
  if(record){cell.setAttribute('aria-label',`อ่านบันทึกอายุ ${age} ปี`);cell.onclick=()=>{detail.textContent=`อายุ ${age} ปี: ${record.actions.find(a=>a.annualReport)?.title??record.actions.at(-1)?.title??'ไม่มีเหตุการณ์ที่บันทึกไว้'}`;};}grid.append(cell);
 }
 if(auto&&!decision&&!document.hidden)timer=setTimeout(()=>{timer=null;if(!auto||document.hidden)return;const done=perform({type:'advanceYears',years:1,token});if(!done){stopYearlyAuto();refresh();}},8000/speed);
}
