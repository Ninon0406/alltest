import {equipmentById,equipmentSlots,equipmentCapacity} from '../data/equipment.js';
import {equipmentRequirements,shopEquipment} from '../character/equipment.js';
import {equipmentModifiers} from '../character/equipment-stats.js';
import {storyToken} from '../engine/life.js';
import {pendingDecision} from '../engine/decisions.js';
import {paragraph,actionButton,statNames} from './life-view.js';
import {spriteAsset} from './avatar/pixel-avatar.js';
const resourceNames={maxHp:'พลังชีวิตสูงสุด',maxMana:'มานาสูงสุด',maxStamina:'ความอึดสูงสุด'};
export function describeEquipment(item){
 return [...Object.entries(item.stats).map(([k,v])=>`${statNames[k]} +${v}`),...Object.entries(item.capacities).map(([k,v])=>`${resourceNames[k]} +${v}`),...Object.entries(item.practice).map(([k,v])=>`ฝึก${statNames[k]} +${v} ประสบการณ์`),...(item.workStamina?[`งานใช้ความอึดลดลง ${item.workStamina}`]:[])].join(' · ');
}
function itemCard(parent,item){
 const card=document.createElement('section');card.className='equipment-item';card.dataset.itemId=item.id;parent.append(card);
 const img=document.createElement('img');img.src=spriteAsset(item.path);img.alt=item.label;img.width=64;img.height=80;img.loading='lazy';card.append(img);
 const info=document.createElement('div');card.append(info);paragraph(info,item.label,'h4');paragraph(info,`${equipmentSlots[item.slot]} · คุณภาพ${item.quality} · อายุ ${item.minAge} ปีขึ้นไป`,'small');paragraph(info,item.description);paragraph(info,describeEquipment(item),'small');return info;
}
export function renderEquipment(parent,state,perform){
 if(!state.equipment)return;
 const e=state.equipment,section=document.createElement('details');section.className='equipment';section.dataset.panelSection='equipment';parent.append(section);paragraph(section,`อุปกรณ์ที่เป็นเจ้าของ (${e.owned.length}/${equipmentCapacity} ช่อง)`,'summary');
 paragraph(section,'สวมและถอดไม่เสียเวลา ไม่เติมพลังทันที โบนัสคงอยู่เฉพาะขณะสวม เก็บได้แบบละหนึ่งชิ้น');
 for(const [slot,label]of Object.entries(equipmentSlots))paragraph(section,`${label}: ${equipmentById[e.equipped[slot]]?.label??'ว่าง'}`,'small');
 if(!e.owned.length)paragraph(section,'ยังไม่มีอุปกรณ์ฝึกหรือเครื่องป้องกัน ร้านในตลาด เมือง หอสมุด และท่าเรือบางแห่งมีของให้เลือก การฝึกฟรียังทำได้ตามเดิม');
 for(const id of e.owned){const item=equipmentById[id],info=itemCard(section,item),worn=e.equipped[item.slot]===id,missing=equipmentRequirements(state,item);
  if(worn)actionButton(info,`ถอด${item.label}`,{type:'equipEquipment',slot:item.slot,itemId:null,token:storyToken(state)},perform);
  else if(!missing.length)actionButton(info,`สวม${item.label}`,{type:'equipEquipment',slot:item.slot,itemId:id,token:storyToken(state)},perform);
  else paragraph(info,`ยังสวมไม่ได้: ${missing.join(' · ')}`);
 }
}
export function renderEquipmentShop(parent,state,perform){
 if(!state.equipment)return;
 paragraph(parent,'อุปกรณ์ฝึกและเครื่องป้องกัน','h3');const offered=shopEquipment(state),blocked=!!pendingDecision(state);
 if(!offered.length){paragraph(parent,'ที่นี่ไม่มีร้านอุปกรณ์ ลองตรวจบริการของตลาด เมือง หอสมุด หรือท่าเรือบนแผนที่');return;}
 paragraph(parent,'ซื้อหรือขายคืนใช้เวลา 1 วัน ซื้อแล้วเก็บในกระเป๋าและเลือกสวมเอง ขายคืนครึ่งราคาเมื่อถอดแล้ว');
 if(blocked)paragraph(parent,'มีเรื่องสำคัญรออยู่ เลือกให้เสร็จก่อนซื้อขาย');
 for(const item of offered){
  const info=itemCard(parent,item),owned=state.equipment.owned.includes(item.id),worn=state.equipment.equipped[item.slot]===item.id,missing=equipmentRequirements(state,item);
  paragraph(info,`${item.price} เหรียญ · ขายคืน ${Math.floor(item.price/2)} เหรียญ`);
  if(owned){paragraph(info,worn?'กำลังสวมอยู่ ถอดในกระเป๋าก่อนขาย':'มีอยู่ในกระเป๋าแล้ว');if(!worn&&!blocked)actionButton(info,`ขายคืน${item.label}`,{type:'sellEquipment',itemId:item.id,token:storyToken(state)},perform);}
  else if(missing.length)paragraph(info,`ยังซื้อไม่ได้: ${missing.join(' · ')}`);
  else if(state.gold<item.price)paragraph(info,`ยังขาดเงิน ${item.price-state.gold} เหรียญ`);
  else if(!blocked)actionButton(info,`ซื้อ${item.label}`,{type:'buyEquipment',itemId:item.id,token:storyToken(state)},perform);
 }
}
export function renderEquipmentStatus(parent,state){
 const bonus=equipmentModifiers(state);
 paragraph(parent,'ค่าพื้นฐานมาจากกำเนิดและการฝึกสะสม โบนัสอุปกรณ์แยกต่างหาก การรับรองอาชีพและผลพิธียังคงใช้ค่าพื้นฐาน','small');
 if(state.equipment?.owned.length)paragraph(parent,`โบนัสขณะสวม: ${Object.entries(bonus.stats).map(([k,v])=>`${statNames[k]} +${v}`).join(' · ')||'ไม่มี'}`,'small');
}
