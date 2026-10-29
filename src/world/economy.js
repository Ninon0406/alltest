import { recoverProgression } from '../progression/engine.js';
import { locations } from './locations.js';
import { calendar, advanceTime, recordAction } from '../engine/time.js';
import { guardExternalTime } from './travel.js';
export const services={
 rest:{label:'พักในพื้นที่ปลอดภัย',days:1,gold:0,minAge:4,description:'ฟื้นความอึด 20 และขวัญกำลังใจ 5'},
 study:{label:'อ่านตำราสาธารณะ',days:7,gold:0,minAge:4,description:'สติปัญญา +1 ครั้งเดียวต่อสถานที่ต่อปี'},
 work:{label:'ช่วยงานชุมชน',days:1,gold:4,minAge:8,description:'รับ 4 เหรียญ ใช้ความอึด 10; งานเบาที่มีผู้ดูแล'},
 food:{label:'ซื้อขนมปัง',days:1,gold:-2,minAge:4,description:'ขนมปัง +1 ชิ้น เก็บในกระเป๋า'},
 eat:{label:'กินขนมปังที่มี',days:1,gold:0,minAge:4,description:'ใช้ขนมปัง 1 ชิ้น ฟื้นอาหาร 25'},
 sell:{label:'ขายขนมปังคืน',days:1,gold:1,minAge:4,description:'ขาย 1 ชิ้น ได้ 1 เหรียญ; ไม่มีการซื้อขายทำกำไรวน'},
};
export function availableServices(state){return [...new Set([...locations[state.world.currentLocationId].services,'rest']),...(state.world.inventory.bread?['eat',...(locations[state.world.currentLocationId].services.includes('food')?['sell']:[])]:[])];}
export function useService(state,id){
 const config=services[id],year=calendar(state).ageYears;
 if(!config||!availableServices(state).includes(id)||year<config.minAge)throw Error('ยังใช้บริการนี้ไม่ได้ตามวัยหรือสถานที่');
 if(state.story?.version===7&&id==='study'&&year<6)throw Error('อ่านตำราพื้นฐานกับผู้ดูแลเมื่ออายุ 6 ปี');
 if(state.gold+config.gold<0)throw Error('เงินไม่พอ ยังมีงานและที่พักชุมชนฟรี');
 if(id==='work'&&state.stamina<10)throw Error('ความอึดไม่พอ กรุณาพักก่อน');
 const key=`${state.world.currentLocationId}:${year}`;
 if(id==='study'&&state.world.studied?.includes(key))throw Error('เรียนหัวข้อนี้แล้วในปีนี้ ลองอ่านที่อื่นหรือกลับปีหน้า');
 if(id==='food'&&(state.world.inventory.bread??0)>=20)throw Error('กระเป๋าเต็มแล้ว');
 guardExternalTime(state,config.days);
 state.gold+=config.gold;
 if(id==='rest'){state.stamina+=20;state.morale+=5;state.mana+=15;recoverProgression(state,25);}
 if(id==='study'){state.stats.int++;state.world.studied??=[];state.world.studied.push(key);state.stamina-=5;}
 if(id==='work')state.stamina-=10;
 if(id==='food')state.world.inventory.bread=(state.world.inventory.bread??0)+1;
 if(id==='eat'||id==='sell'){state.world.inventory.bread--;if(state.world.inventory.bread===0)delete state.world.inventory.bread;if(id==='eat')state.hunger+=25;}
 state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:id,amount:config.gold});
 recordAction(state,config.label,config.days,{goldDelta:config.gold});advanceTime(state,config.days);return state;
}
