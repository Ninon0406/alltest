import { currentEvent, storyToken, choiceDays, textTokens } from '../engine/life.js';
import { calendar } from '../engine/time.js';
import { archetypes } from '../data/archetypes.js';
export const statNames={str:'พละกำลัง',dex:'ความคล่อง',con:'ความอึด',int:'สติปัญญา',wis:'ความเข้าใจ',per:'การสังเกต',luk:'โชค',cha:'เสน่ห์'};
export function paragraph(parent,text,tag='p'){const node=document.createElement(tag);node.textContent=text;parent.append(node);return node;}
export function actionButton(parent,label,action,perform){const button=document.createElement('button');button.type='button';button.textContent=label;button.onclick=()=>perform(action);parent.append(button);return button;}
export function renderLife(parent,state,perform){
 parent.replaceChildren();const event=currentEvent(state),token=storyToken(state),page=Math.min(state.life.page,event.pages.length-1),c=calendar(state);
 const banner=document.createElement('div');banner.className='scene-banner';parent.append(banner);
 paragraph(banner,`เอลินดรา • อายุ ${c.ageYears} ปี • ปี ${c.worldYear}`,'span').className='scene-caption';
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
 paragraph(parent,'บันทึกชีวิตและพงศาวดารรายปี','h2');
 paragraph(parent,`ปฏิทิน 360 วันต่อปี • ผ่านวันเกิดแล้ว ${state.chronicle.length} ครั้งที่มีบันทึกหลังอัปเกรด`);
 for(const year of [...state.chronicle].reverse()){
  const details=document.createElement('details');parent.append(details);paragraph(details,`อายุ ${year.age} → ${year.age+1} ปี • ${year.actions.length} การตัดสินใจ`,'summary');
  for(const entry of year.actions)paragraph(details,entry.title);
 }
 paragraph(parent,'เหตุการณ์ล่าสุด','h3');
 for(const entry of state.journal.slice(-40).reverse())paragraph(parent,`อายุ ${entry.age} ปี • ${entry.location} • ${entry.title} (+${entry.days} วัน)`);
 if(!state.journal.length)paragraph(parent,'ยังไม่มีการตัดสินใจที่บันทึกหลังอัปเกรด ข้อมูลเดิมยังคงอยู่ในเซฟสำรอง');
}
