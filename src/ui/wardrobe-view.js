import {catalogById} from '../data/appearance-v2.js';
import {spriteAsset} from './avatar/pixel-avatar.js';
import {paragraph,actionButton} from './life-view.js';
import {storyToken} from '../engine/life.js';
export function renderWardrobe(parent,state,perform){
 const w=state.wardrobe;if(!w)return;
 const details=document.createElement('details');details.className='wardrobe';details.dataset.panelSection='wardrobe';parent.append(details);paragraph(details,`เสื้อผ้าจากครอบครัว (${w.owned.length} ชิ้น)`,'summary');
 paragraph(details,state.age<1?'ผู้ดูแลใช้ผ้าห่อตัวสีเดียวกับชุดประจำตัวให้ เลือกเปลี่ยนเสื้อผ้าได้เมื่ออายุ 3 ปี':state.age<3?'ผู้ดูแลจัดเสื้อผ้าที่พอดีกับวัยให้ เลือกเปลี่ยนชุดได้เมื่ออายุ 3 ปี':'เสื้อผ้าที่บ้านมอบให้ สลับได้โดยไม่เสียเวลา เงิน หรือเปลี่ยนพลัง');
 for(const id of w.owned){
  const item=catalogById[id],card=document.createElement('div');card.className='wardrobe-item';details.append(card);
  const img=document.createElement('img');img.src=spriteAsset(item.path);img.alt=item.label;img.width=64;img.height=80;img.loading='lazy';card.append(img);
  const info=document.createElement('div');card.append(info);paragraph(info,item.label,'strong');const worn=w.equipped[item.group]===id;paragraph(info,worn?'ชุดประจำตัว':'เก็บไว้ในกระเป๋า','small');
  if(state.age>=3&&!worn)actionButton(info,`สวม${item.label}`,{type:'dress',slot:item.group,itemId:id,token:storyToken(state)},perform);
 }
 if(state.age>=3&&w.equipped.hats)actionButton(details,'ถอดหมวกเก็บในกระเป๋า',{type:'dress',slot:'hats',itemId:null,token:storyToken(state)},perform);
}
