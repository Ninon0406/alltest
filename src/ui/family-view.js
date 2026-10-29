import {pixelAvatar,spriteAsset} from './avatar/pixel-avatar.js';
import {groups,traitGroups} from '../data/appearance-v2.js';
import {paragraph} from './life-view.js';
export function renderFamily(parent,state){
 if(state.appearance?.version!==2)return;
 const section=document.createElement('section');section.className='family-lineage';parent.append(section);paragraph(section,'เค้าหน้าของครอบครัว','h3');
 const room=document.createElement('img');room.src=spriteAsset('art/family-room.webp');room.alt='ห้องอุ่นของครอบครัวใต้แสงตะเกียง';room.className='family-room';room.loading='lazy';section.append(room);
 const cards=document.createElement('div');cards.className='family-portraits';section.append(cards);
 for(const role of ['mother','child','father']){
  const card=document.createElement('figure');card.dataset.familyRole=role;cards.append(card);card.innerHTML=pixelAvatar(state,{role,context:'family',headOnly:true});
  const caption=document.createElement('figcaption');card.append(caption);paragraph(caption,{mother:'มารดา',child:'คุณ',father:'บิดา'}[role],'strong');paragraph(caption,role==='child'?state.name:state.birth.parents[role],'small');
 }
 const details=document.createElement('details');details.className='family-traits';section.append(details);paragraph(details,'ลักษณะที่ได้รับจากคนในบ้าน','summary');
 const labels={face:'เค้าหน้า',hair:'ทรงผมเมื่อโต',hairColor:'สีผม',eyes:'ดวงตา',skin:'สีผิว'};
 for(const [key,group]of Object.entries(traitGroups)){
  const trait=groups[group][state.appearance[key]],origin=state.appearance.inheritance[key],row=document.createElement('p'),img=document.createElement('img');img.src=spriteAsset(trait.path);img.alt=trait.label;img.width=64;img.height=80;img.loading='lazy';row.append(img);
  const text=document.createElement('span');text.textContent=`${labels[key]} · ${trait.label} · ${origin.variation?'มีลักษณะต่างออกไปเล็กน้อย':origin.from==='mother'?'คล้ายมารดา':'คล้ายบิดา'}`;row.append(text);details.append(row);
 }
 paragraph(details,'ลักษณะเหล่านี้คงเดิมตลอดชีวิต สีผิวและรูปลักษณ์ไม่เพิ่มหรือลดความสามารถ การเติบโตเปลี่ยนสัดส่วนและผมหงอกตามวัย','small');
}
