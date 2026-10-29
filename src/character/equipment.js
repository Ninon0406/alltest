import {equipmentById,equipmentSlots,equipmentShops,equipmentCapacity} from '../data/equipment.js';
import {validEquipment} from './equipment-stats.js';
import {guardExternalTime} from '../world/travel.js';
import {advanceTime,recordAction,normalize} from '../engine/time.js';

export const shopEquipment=state=>(equipmentShops[state.world.currentLocationId]??[]).map(id=>equipmentById[id]);
export function equipmentRequirements(state,item){
 const missing=[];
 if(state.age<item.minAge)missing.push(`อายุอย่างน้อย ${item.minAge} ปี`);
 const names={str:'พละกำลัง',con:'ความอึด',int:'สติปัญญา'};
 for(const [stat,value]of Object.entries(item.requirements))if(state.stats[stat]<value)missing.push(`${names[stat]}พื้นฐานอย่างน้อย ${value}`);
 return missing;
}
function checkedItem(state,id){
 if(!validEquipment(state.equipment)||!Object.hasOwn(equipmentById,id))throw Error('ไม่พบอุปกรณ์ที่ใช้ได้');
 return equipmentById[id];
}
export function buyEquipment(state,id){
 const item=checkedItem(state,id),e=state.equipment;
 if(!shopEquipment(state).includes(item))throw Error('ร้านที่นี่ไม่มีอุปกรณ์ชิ้นนี้');
 if(equipmentRequirements(state,item).length)throw Error(`ยังซื้อไม่ได้: ${equipmentRequirements(state,item).join(' · ')}`);
 if(e.owned.includes(id))throw Error('มีอุปกรณ์ชิ้นนี้แล้ว เก็บได้แบบละหนึ่งชิ้น');
 if(e.owned.length>=equipmentCapacity)throw Error('ช่องอุปกรณ์ในกระเป๋าเต็มแล้ว');
 if(state.gold<item.price)throw Error('เงินไม่พอ ยังฝึกและพักโดยไม่ซื้ออุปกรณ์ได้');
 guardExternalTime(state,1);
 state.gold-=item.price;e.owned.push(id);
 state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:`equipment:buy:${id}`,amount:-item.price});
 recordAction(state,`ซื้อ${item.label}`,1,{itemId:id,goldDelta:-item.price});advanceTime(state,1);
}
export function sellEquipment(state,id){
 const item=checkedItem(state,id),e=state.equipment;
 if(state.age<item.minAge||!shopEquipment(state).includes(item)||!e.owned.includes(id))throw Error('ขายคืนได้เฉพาะของที่มีอยู่และร้านที่จำหน่ายตามวัย');
 if(Object.values(e.equipped).includes(id))throw Error('ถอดอุปกรณ์ก่อนขายคืน');
 guardExternalTime(state,1);const refund=Math.floor(item.price/2);
 state.gold+=refund;e.owned.splice(e.owned.indexOf(id),1);
 state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:`equipment:sell:${id}`,amount:refund});
 recordAction(state,`ขายคืน${item.label}`,1,{itemId:id,goldDelta:refund});advanceTime(state,1);
}
export function equipEquipment(state,slot,id){
 if(!validEquipment(state.equipment)||!Object.hasOwn(equipmentSlots,slot))throw Error('ช่องอุปกรณ์ไม่ถูกต้อง');
 const e=state.equipment;
 if(state.age<8)throw Error('เลือกอุปกรณ์ฝึกได้เมื่ออายุ 8 ปี');
 if(id!==null){
  const item=checkedItem(state,id);
  if(!e.owned.includes(id)||item.slot!==slot)throw Error('ต้องเป็นเจ้าของอุปกรณ์และสวมให้ตรงช่อง');
  const missing=equipmentRequirements(state,item);if(missing.length)throw Error(`ยังสวมไม่ได้: ${missing.join(' · ')}`);
 }
 if(e.equipped[slot]===id)throw Error('กำลังใช้อุปกรณ์ชิ้นนี้อยู่แล้ว');
 e.equipped[slot]=id;
 // Equipping never heals; removing capacity clamps current resources to the new cap.
 normalize(state);
}
