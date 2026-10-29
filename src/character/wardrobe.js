import {seededRandom} from '../engine/random.js';
import {catalogById,groups,garmentGroups} from '../data/appearance-v2.js';
export function createWardrobe(seed){
 const random=seededRandom(seed^0x4b93ef21),equipped=Object.fromEntries(garmentGroups.map(g=>[g,groups[g][Math.floor(random()*20)].id]));
 const extra=groups.upper[(groups.upper.findIndex(x=>x.id===equipped.upper)+1+Math.floor(random()*19))%20].id;
 const owned=[...Object.values(equipped),extra];equipped.hats=null;
 return {version:1,origin:'family',owned,equipped};
}
export function validWardrobe(w){
 return w?.version===1&&w.origin==='family'&&Array.isArray(w.owned)&&w.owned.length===5&&new Set(w.owned).size===5&&garmentGroups.every(slot=>w.owned.filter(id=>catalogById[id]?.group===slot).length===(slot==='upper'?2:1))&&garmentGroups.every(slot=>slot==='hats'&&w.equipped?.[slot]===null||w.owned.includes(w.equipped?.[slot])&&catalogById[w.equipped[slot]]?.group===slot);
}
export function dress(state,slot,itemId){
 if(state.age<3)throw Error('วัยนี้ผู้ดูแลจัดเสื้อผ้าให้ เลือกเปลี่ยนชุดได้เมื่ออายุ 3 ปี');
 const w=state.wardrobe;
 if(!validWardrobe(w)||!garmentGroups.includes(slot))throw Error('ไม่พบชุดที่ใช้ได้');
 if(itemId===null){if(slot!=='hats')throw Error('เสื้อ กางเกง และรองเท้าต้องมีชุดที่สวมอยู่');}
 else if(!w.owned.includes(itemId)||catalogById[itemId]?.group!==slot)throw Error('ต้องมีเสื้อผ้าชิ้นนี้ในกระเป๋าและสวมให้ตรงประเภท');
 if(w.equipped[slot]===itemId)throw Error('กำลังสวมชิ้นนี้อยู่แล้ว');
 w.equipped[slot]=itemId;
}
