import {renderScene as renderSetting} from './scene.js';
import { currentEvent, storyToken, choiceDays, textTokens } from '../engine/life.js';
import { calendar } from '../engine/time.js';
import { archetypes } from '../data/archetypes.js';
export const statNames={str:'พละกำลัง',dex:'ความคล่อง',con:'ความอึด',int:'สติปัญญา',wis:'ความเข้าใจ',per:'การสังเกต',luk:'โชค',cha:'เสน่ห์'};
export function paragraph(parent,text,tag='p'){const node=document.createElement(tag);node.textContent=text;parent.append(node);return node;}
export function actionButton(parent,label,action,perform){const button=document.createElement('button');button.type='button';button.textContent=label;button.onclick=()=>perform(action);parent.append(button);return button;}
export function panelButton(parent,label,key){const button=document.createElement('button');button.textContent=label;button.onclick=()=>document.dispatchEvent(new CustomEvent('open-game-panel',{detail:key}));parent.append(button);return button;}
export function renderLife(parent,state,perform){
 parent.replaceChildren();const event=currentEvent(state),token=storyToken(state),page=Math.min(state.life.page,event.pages.length-1),c=calendar(state);
 actionButton(parent,'กลับหน้าชีวิตรายปี',{type:'setPacing',view:'yearly',token},perform);
 renderSetting(parent,state);
 const story=document.createElement('article');story.className='scene-text-box';parent.append(story);
 paragraph(story,`${event.title} — อายุ ${c.ageYears} ปี`,'h2');
 paragraph(story,`หน้า ${page+1}/${event.pages.length} • ${state.location}`,'small');
 paragraph(story,textTokens(event.pages[page],state));
 if(page===0 && state.birth?.archetypeId){const origin=archetypes.find(a=>a.id===state.birth.archetypeId);paragraph(story,`เรื่องจากครอบครัว: ${origin.storyHooks[0]}`,'small');}
 const choices=document.createElement('div');choices.className='choices-container';parent.append(choices);
 if(page<event.pages.length-1)actionButton(choices,'อ่านต่อ',{type:'readNext',token},perform).className='primary';
 else for(const choice of event.choices){
  const effects=choice.effects.filter(e=>e.type!=='flag').map(e=>e.type==='stat'?`+${e.amount} ${statNames[e.key]}`:e.type==='memory'?'+ความทรงจำวัยเด็ก':e.type==='recover'?'ฟื้นแรง 20':e.type==='careerXp'?`+${e.amount} ประสบการณ์อาชีพ`:e.type==='careerPerk'?(e.key==='trainingBonus'?'+ประสิทธิภาพการฝึกถาวร':'+รายได้ต่องานถาวร'):'ขวัญกำลังใจ +3');
  const button=actionButton(choices,`${choice.label}\n${effects.join(' • ')} • +${choiceDays(state,event)} วัน`,{type:'lifeChoice',choiceId:choice.id,token},perform);button.className='choice-card';
 }
 if(c.ageYears>=12&&state.progression.awakening.step<7&&!state.progression.awakening.paused)actionButton(parent,'พักพิธีไว้ก่อน',{type:'pauseAwakening',token},perform);
 if(c.ageYears>=12)actionButton(parent,'เลือกเส้นทางจากเรื่องราวเดิม',{type:'legacyArc',token},perform);
}
export function renderJournal(parent,state){
 paragraph(parent,'บันทึกชีวิตและพงศาวดารรายปี','h2');paragraph(parent,`ปฏิทิน 360 วันต่อปี · ผ่านวันเกิดแล้ว ${state.chronicle.length} ครั้งในชีวิตนี้`);
 if(state.chronicle.length){
  const select=document.createElement('select');select.setAttribute('aria-label','ปีชีวิตที่ต้องการอ่าน');
  for(const year of state.chronicle.toReversed()){const o=document.createElement('option');o.value=year.age;o.textContent=`อายุ ${year.age} → ${year.age+1} ปี`;select.append(o);}parent.append(select);
  const detail=document.createElement('section');detail.className='year-card';parent.append(detail);
  const update=()=>{detail.replaceChildren();const year=state.chronicle.find(r=>r.age===Number(select.value));paragraph(detail,`อายุ ${year.age} ปี · ${year.actions.length} รายการ`,'h3');for(const e of year.actions.slice(-12))paragraph(detail,e.title+(e.automatic?' · เกิดขึ้นตามแนวชีวิต':''));if(year.actions.length>12)paragraph(detail,`แสดง 12 รายการล่าสุดจาก ${year.actions.length} รายการ`,'small');};select.onchange=update;update();
 }
 paragraph(parent,'เหตุการณ์ล่าสุด','h3');for(const e of state.journal.slice(-12).reverse())paragraph(parent,`อายุ ${e.age} ปี · ${e.location} · ${e.title}`);
 if(!state.journal.length)paragraph(parent,'ยังไม่มีเหตุการณ์ในชีวิตนี้');
}
