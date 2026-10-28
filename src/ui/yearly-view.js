import {availableYearActivities,pendingDecision} from '../engine/yearly.js';
import {yearlyActivities} from '../data/yearly.js';
import {storyToken,textTokens} from '../engine/life.js';
import {paragraph,actionButton,statNames,panelButton} from './life-view.js';
import {renderScene} from './scene.js';
let auto=false,speed=1,timer=null,refreshActive=null;
export function stopYearlyAuto(){auto=false;clearTimeout(timer);timer=null;}
export function isYearlyAuto(){return auto;}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopYearlyAuto();else refreshActive?.();});
function card(parent,title){const node=document.createElement('section');node.className='year-card';parent.append(node);if(title)paragraph(node,title,'h3');return node;}
export function renderDecision(parent,state,perform){
 const decision=pendingDecision(state);if(!decision)return;
 paragraph(parent,`อายุ ${state.age} ปี · ${decision.title}`,'h3');
 const text=textTokens(decision.text,state),parts=text.split('\n\n');paragraph(parent,parts[0]);if(parts.length>1){const more=document.createElement('details');parent.append(more);paragraph(more,'อ่านเพิ่มเติม','summary');paragraph(more,parts.slice(1).join('\n\n'));}
 for(const c of decision.choices){const description=c.description??`${statNames[c.stat]} +1 · ความทรงจำ +2${c.gold?' · +'+c.gold+' เหรียญ':''}`;actionButton(parent,`${c.label}\n${description}`,{type:'majorChoice',decisionId:decision.id,choiceId:c.id,token:storyToken(state)},perform).className='major-option';}
 paragraph(parent,'ปิดหน้าต่างเพื่อดูข้อมูลอื่นได้ เวลาจะรอจนกว่าคุณตัดสินใจ','small');
}
export function renderFocus(parent,state,perform,done){
 paragraph(parent,'เลือกหนึ่งแผนไว้ใช้ต่อจนกว่าจะเปลี่ยน เรื่องเล็กจะสะสมในบันทึก และหยุดรอคุณเมื่อมีเรื่องสำคัญ');
 const grid=document.createElement('div');grid.className='year-focus-grid';parent.append(grid);
 for(const a of availableYearActivities(state)){const b=actionButton(grid,`${a.label}\n${a.description}`,{type:'yearFocus',focus:a.id,token:storyToken(state)},action=>{if(perform(action))done();});b.className='year-focus';b.setAttribute('aria-pressed',String(state.yearly.focus===a.id));}
 if(state.age>=8){const label=document.createElement('label');label.textContent='หัวข้อเมื่อเลือกฝึกความถนัด';const select=document.createElement('select');select.setAttribute('aria-label','หัวข้อฝึกประจำปี');for(const [id,name]of Object.entries(statNames)){const option=document.createElement('option');option.value=id;option.textContent=name;select.append(option);}select.value=state.yearly.stat;select.onchange=()=>perform({type:'yearFocus',focus:state.yearly.focus,stat:select.value,token:storyToken(state)});label.append(select);parent.append(label);}
}
export function renderYearly(parent,state,perform,refresh){
 refreshActive=refresh;clearTimeout(timer);timer=null;parent.replaceChildren();const decision=pendingDecision(state),token=storyToken(state);if(decision)stopYearlyAuto();
 const toolbar=document.getElementById('timeControls');toolbar.replaceChildren();const controls=document.createElement('div');controls.className='year-controls';toolbar.append(controls);
 const play=document.createElement('button');play.textContent=auto?'หยุดเวลา':'เล่นอัตโนมัติ';play.setAttribute('aria-pressed',String(auto));play.disabled=!!decision;play.onclick=()=>{if(document.hidden)return;auto=!auto;refresh();};controls.append(play);
 const speedSelect=document.createElement('select');speedSelect.setAttribute('aria-label','ความเร็วเวลา');for(const value of [1,2,4,8]){const option=document.createElement('option');option.value=value;option.textContent=`${value}×`;speedSelect.append(option);}speedSelect.value=speed;speedSelect.onchange=()=>{speed=Number(speedSelect.value);refresh();};controls.append(speedSelect);
 const seek=actionButton(controls,'ถึงจุดสำคัญ',{type:'advanceYears',years:10,token},perform);seek.disabled=!!decision;seek.title='ผ่านเวลาได้สูงสุด 10 ปี หยุดก่อนการตัดสินใจสำคัญ';
 const clock=document.createElement('div');clock.className='year-clock';toolbar.append(clock);const fill=document.createElement('div');clock.append(fill);if(auto)fill.style.animation=`year-tick ${8000/speed}ms linear forwards`;
 const layout=document.createElement('div');layout.className='year-layout';parent.append(layout);const center=document.createElement('div'),dock=document.createElement('aside');center.className='year-center';dock.className='year-dock';layout.append(center,dock);renderScene(center,state);
 if(decision){const c=card(center,'การตัดสินใจสำคัญ');paragraph(c,decision.title,'h2');paragraph(c,'เรื่องราวนี้กำลังรอคุณ เลือกเมื่อพร้อมแล้วค่อยใช้ชีวิตต่อ');panelButton(c,'ตัดสินใจตอนนี้','decision').className='primary';}
 else{
  const c=card(center,'แนวชีวิตปีนี้'),focus=yearlyActivities.find(a=>a.id===state.yearly.focus),row=document.createElement('div');row.className='focus-heading';c.append(row);paragraph(row,focus.label,'strong');panelButton(row,'เปลี่ยนแผน','focus');paragraph(c,focus.description);
  const next=document.createElement('div');next.className='year-next';c.append(next);for(const years of [1,2,5])actionButton(next,`ใช้ชีวิตต่อ ${years} ปี`,{type:'advanceYears',years,token},perform).className=years===1?'primary':'secondary';
 }
 const optional=document.createElement('details');optional.className='optional-reading';center.append(optional);paragraph(optional,'อ่านเรื่องราวและเส้นทางเพิ่มเติม','summary');actionButton(optional,'อ่านเรื่องแบบละเอียด (ทางเลือก)',{type:'setPacing',view:'detailed',token},perform);if(state.age>=12)actionButton(optional,'เปิดเรื่องราวเส้นทางเดิม',{type:'legacyArc',token},perform);
 const last=state.yearly.reports.at(-1);if(last){const r=card(dock,`ปีที่ผ่านมา · อายุ ${last.age} → ${last.age+1}`);paragraph(r,`${last.days} วัน · เงิน ${last.goldDelta>=0?'+':''}${last.goldDelta} เหรียญ`);paragraph(r,`ฝึก ${last.counts.training} · งาน ${last.counts.work} · เดินทาง ${last.counts.travel}`,'small');const more=document.createElement('details');r.append(more);paragraph(more,'คุณลักษณะที่เปลี่ยน','summary');paragraph(more,Object.entries(last.statDeltas).map(([k,v])=>`${statNames[k]} ${v>=0?'+':''}${v}`).join(' · ')||'คุณลักษณะคงเดิม');}
 const journal=card(dock,'บันทึกล่าสุด'),recent=state.journal.filter(e=>e.annualReport||e.majorDecision||!e.automatic).slice(-3).reverse();for(const e of recent){const p=paragraph(journal,`${e.age} ปี · ${e.title}`);p.className='journal-line';}if(!recent.length)paragraph(journal,'เลือกแนวชีวิตแล้วค่อย ๆ เติบโต เรื่องราวจะเริ่มสะสมที่นี่');panelButton(journal,'บันทึกชีวิตรายปี','chronicle');
 const family=card(dock,'คนที่บ้าน');paragraph(family,state.family);if(state.birth)paragraph(family,`${state.birth.parents.mother} · ${state.birth.parents.father}`);panelButton(family,'ครอบครัวและกำเนิด','record');
 if(auto&&!decision&&!document.hidden)timer=setTimeout(()=>{timer=null;if(!auto||document.hidden)return;if(!perform({type:'advanceYears',years:1,token})){stopYearlyAuto();refresh();}},8000/speed);
}
