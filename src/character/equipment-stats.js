import {equipmentById,equipmentSlots,equipmentCapacity} from '../data/equipment.js';

export function createEquipment(){return {version:1,owned:[],equipped:Object.fromEntries(Object.keys(equipmentSlots).map(slot=>[slot,null]))};}
export function validEquipment(e){
 return e?.version===1&&Array.isArray(e.owned)&&e.owned.length<=equipmentCapacity&&new Set(e.owned).size===e.owned.length&&e.owned.every(id=>Object.hasOwn(equipmentById,id))&&e.equipped&&Object.keys(e.equipped).length===Object.keys(equipmentSlots).length&&Object.keys(equipmentSlots).every(slot=>e.equipped[slot]===null||e.owned.includes(e.equipped[slot])&&equipmentById[e.equipped[slot]].slot===slot);
}
export function wornEquipment(state){
 if(state.equipment===undefined)return [];
 if(!validEquipment(state.equipment))throw Error('ข้อมูลอุปกรณ์ไม่ถูกต้อง');
 return Object.values(state.equipment.equipped).filter(Boolean).map(id=>equipmentById[id]);
}
export function equipmentModifiers(state){
 const result={stats:{},capacities:{},practice:{},workStamina:0};
 for(const item of wornEquipment(state)){
  for(const group of ['stats','capacities','practice'])for(const [key,value]of Object.entries(item[group]))result[group][key]=(result[group][key]??0)+value;
  result.workStamina+=item.workStamina??0;
 }
 return result;
}
export function effectiveStats(state){const bonus=equipmentModifiers(state).stats;return Object.fromEntries(Object.entries(state.stats).map(([key,value])=>[key,value+(bonus[key]??0)]));}
// maxHp/maxMana/maxStamina remain earned base capacities. Never write bonuses into them.
export function effectiveCapacities(state){const bonus=equipmentModifiers(state).capacities;return Object.fromEntries(['maxHp','maxMana','maxStamina'].map(key=>[key,state[key]+(bonus[key]??0)]));}
export function workStaminaCost(state,base){return Math.max(1,base-equipmentModifiers(state).workStamina);}
