// Small authored catalog. These are owned items, never career costumes or power levels.
export const equipmentSlots={mainHand:'มือหลัก',offHand:'มือรอง',body:'ชุดชั้นนอก'};
export const equipmentCapacity=12;
const definitions=[
 {id:'practice_staff',label:'ไม้ฝึกปลายมน',slot:'mainHand',price:12,minAge:8,requirements:{},stats:{dex:1},practice:{str:1,dex:1},description:'ใช้ฝึกท่าพื้นฐานกับผู้ดูแล เพิ่มประสบการณ์เมื่อฝึกพละกำลังหรือความคล่องจริง'},
 {id:'training_sword',label:'ดาบฝึกเหล็กทื่อ',slot:'mainHand',price:28,minAge:12,requirements:{str:10},stats:{str:2},practice:{str:2},description:'ดาบทื่อสำหรับลานฝึก ต้องมีพละกำลังพื้นฐานพอถืออย่างมั่นคง'},
 {id:'focus_rod',label:'คทาฝึกผลึกหม่น',slot:'mainHand',price:28,minAge:12,requirements:{int:10},stats:{int:2},capacities:{maxMana:10},practice:{int:1,wis:1},description:'ช่วยฝึกสมาธิและการอ่านอักขระ เพิ่มมานาสูงสุดโดยไม่เติมมานาทันที'},
 {id:'round_shield',label:'โล่ไม้ขอบหนัง',slot:'offHand',price:20,minAge:12,requirements:{con:10},stats:{con:1},capacities:{maxHp:6},practice:{con:1},description:'ใช้ฝึกการยืนรับน้ำหนัก เพิ่มพลังชีวิตสูงสุดโดยไม่รักษาบาดแผล'},
 {id:'padded_vest',label:'เสื้อบุลานฝึก',slot:'body',price:24,minAge:12,requirements:{},stats:{con:2},capacities:{maxHp:12},description:'เสื้อบุสำหรับการฝึกพื้นฐาน สวมทับเสื้อผ้าจากครอบครัว'},
 {id:'travel_coat',label:'เสื้อคลุมเดินทาง',slot:'body',price:18,minAge:8,requirements:{},stats:{per:1},capacities:{maxStamina:10},workStamina:2,description:'กระจายน้ำหนักสัมภาระ งานชุมชนและงานอาชีพใช้ความอึดลดลง 2 ต่อครั้ง'},
];
export const equipmentItems=definitions.map(item=>Object.freeze({...item,quality:'ธรรมดา',path:`assets/sprites/garments/${item.id}.png`,stats:Object.freeze(item.stats??{}),capacities:Object.freeze(item.capacities??{}),practice:Object.freeze(item.practice??{}),requirements:Object.freeze(item.requirements)}));
export const equipmentById=Object.fromEntries(equipmentItems.map(item=>[item.id,item]));
// Existing canonical locations only; no implied travel, new nodes or NPCs.
export const equipmentShops={
 market:['practice_staff','travel_coat','padded_vest'],
 capital:equipmentItems.map(item=>item.id),
 forge:['training_sword','round_shield','padded_vest'],
 library:['focus_rod'],herb:['focus_rod','travel_coat'],
 moonport:['practice_staff','round_shield','travel_coat'],
 fishmarket:['practice_staff','travel_coat'],dock:['round_shield','padded_vest'],
};
