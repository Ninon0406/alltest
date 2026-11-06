import type {State} from '../engine/state';
import {lifePaths,pathProgress} from '../systems/life-paths';

/** Progress and guidance only. Lessons are entered through the story choices. */
export function lifePathsPanel(host:HTMLElement,state:State,onBack:()=>void){
 const text=(tag:string,value:string,parent:HTMLElement=host)=>{const node=document.createElement(tag);node.textContent=value;parent.append(node);return node;};
 host.replaceChildren();text('h1','เส้นทางชีวิต');
 text('p','เรียนรู้จากผู้คนและสิ่งที่ลงมือทำ เมื่อจบพื้นฐานขั้น 1 ของสายแรกแล้วจึงเริ่มเรียนข้ามสายได้ ความรู้เดิมยังอยู่กับคุณ');
 const statuses={locked:'ยังไม่เปิดเรียน',available:'พร้อมเริ่มเรียน',learning:'กำลังศึกษาพื้นฐาน',rank1:'พื้นฐานขั้น 1',rank2:'ความสามารถขั้นต้น 2'};
 for(const progress of pathProgress(state)){
  const definition=lifePaths.find(path=>path.id===progress.id)!;
  const card=document.createElement('section');card.className='life-path-card';card.dataset.lifePath=progress.id;card.dataset.rank=String(progress.rank);host.append(card);
  const heading=document.createElement('div');heading.className='life-path-heading';card.append(heading);
  const icon=document.createElement('span');icon.className='life-path-icon';icon.setAttribute('aria-hidden','true');
  icon.style.backgroundImage='url("'+import.meta.env.BASE_URL+'assets/art-v14/life-icons.png")';
  icon.style.setProperty('--life-icon-frame',String(definition.iconBase+progress.rank));
  heading.append(icon);text('h2',definition.name,heading);
  text('p',statuses[progress.status],card).className='life-path-status';
  text('p','อาจารย์: '+definition.mentor+' · พบได้ที่'+definition.location,card);
  if(!progress.availability.enabled)text('p',progress.availability.reason,card).className='life-path-lock';
  text('h3','ก้าวถัดไป',card);text('p',progress.next,card);
  const lessons=document.createElement('details');lessons.className='life-path-details';lessons.open=progress.started&&progress.rank<2;card.append(lessons);
  text('summary',`บทเรียน ${progress.objectives.filter(o=>o.complete).length}/${progress.objectives.length}`,lessons);
  const objectives=document.createElement('ol');objectives.className='life-path-objectives';lessons.append(objectives);
  for(const objective of progress.objectives){
   const item=document.createElement('li');item.dataset.complete=String(objective.complete);objectives.append(item);
   text('span',(objective.complete?'เรียนแล้ว · ':'รอเรียน · ')+objective.label,item);
  }
  text('h3',definition.ability.name+(progress.abilityUnlocked?' · พร้อมใช้':' · ปลดเมื่อรับรองขั้นต้น 2'),card);
  text('p',definition.ability.description,card);
  const details=document.createElement('details');details.className='life-path-details';card.append(details);
  text('summary','กิจกรรมและขอบเขตความสามารถ',details);
  const activities=document.createElement('ul');details.append(activities);
  for(const activity of definition.activities)text('li',activity,activities);
  const limits=document.createElement('ul');details.append(limits);
  for(const limit of definition.limits)text('li',limit,limits);
 }
 const back=document.createElement('button');back.type='button';back.textContent='กลับสู่เรื่องราว';back.onclick=onBack;host.append(back);
}
