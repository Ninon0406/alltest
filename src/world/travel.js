import { locations, routes } from './locations.js';
import { calendar, advanceTime, recordAction } from '../engine/time.js';
export function findRoute(state,destination,method='caravan'){
 if(!['caravan','walk'].includes(method))return null;
 const start=state.world.currentLocationId;if(!locations[destination] || start===destination)return null;
 const best=new Map([[start,{days:0,gold:0,path:[start]}]]),queue=[start];
 while(queue.length){queue.sort((a,b)=>best.get(a).days-best.get(b).days);const node=queue.shift(),cost=best.get(node);
  if(node===destination)return cost;
  for(const edge of routes){if(edge.minAge>calendar(state).ageYears)continue;const next=edge.from===node?edge.to:edge.to===node?edge.from:null;if(!next)continue;
   const candidate={days:cost.days+edge.days*(method==='walk'?2:1),gold:cost.gold+(method==='walk'?0:edge.gold),path:[...cost.path,next]};
   if(!best.has(next)||candidate.days<best.get(next).days){best.set(next,candidate);queue.push(next);}
  }
 }return null;
}
export function revealedLocations(state){return new Set(state.world.visited.flatMap(id=>[id,...locations[id].neighbors]));}
export function guardExternalTime(state,days){
 const age=calendar(state).ageYears;
 if(state.life.mode==='annual' && age<12 && state.time.absoluteDay+days>=state.time.birthAbsoluteDay+(age+1)*360)throw Error('อ่านเรื่องราวประจำปีให้จบก่อนเดินทางข้ามวันเกิด');
}
export function travel(state,destination,method='caravan'){
 if(!revealedLocations(state).has(destination))throw Error('ยังไม่รู้จักเส้นทางนี้');
 const route=findRoute(state,destination,method);if(!route)throw Error('เส้นทางยังไม่เปิดตามวัย เด็กอายุต่ำกว่า 4 ปีอยู่กับครอบครัว ส่วนข้ามภูมิภาคเปิดเมื่ออายุ 12 ปี');
 if(state.gold<route.gold)throw Error('เงินไม่พอสำหรับเส้นทางนี้');
 if(state.stamina<route.days*2)throw Error('ความอึดไม่พอสำหรับเส้นทางนี้ กรุณาพักในพื้นที่ปลอดภัยก่อน');
 guardExternalTime(state,route.days);
 state.gold-=route.gold;state.stamina=Math.max(0,state.stamina-route.days*2);
 state.world.ledger.push({day:state.time.absoluteDay,location:state.world.currentLocationId,source:'travel',amount:-route.gold});
 for(const id of route.path)if(!state.world.visited.includes(id))state.world.visited.push(id);
 state.world.currentLocationId=destination;state.location=locations[destination].name;
 recordAction(state,`เดินทางไป${state.location}`,route.days,{goldDelta:-route.gold,path:route.path});advanceTime(state,route.days);
 return state;
}
