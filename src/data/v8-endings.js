export const v8Endings={
 'v8.garden':{title:'สวนที่ยังผลิบาน',text:'สวนเล็กและความเอื้อเฟื้อของคุณยังเป็นที่พักให้คนในชุมชน ชีวิตจบลงตามธรรมชาติท่ามกลางสิ่งที่ได้ดูแล'},
 'v8.pages':{title:'หน้ากระดาษที่ส่งต่อ',text:'สมุดที่คุณเรียบเรียงถูกส่งให้คนรุ่นต่อไป คำถามจากชีวิตธรรมดายังชวนให้คนอื่นเรียนรู้ หลังคุณจากไปตามอายุขัย'},
 'v8.roads':{title:'ทางเดินที่มีเรื่องเล่า',text:'คุณได้เห็นบ้านมากกว่าหนึ่งแห่งและนำเรื่องเหล่านั้นกลับมาแบ่งปัน เมื่อถึงปลายอายุขัย เส้นทางที่เลือกยังอยู่ในความทรงจำของผู้คน'},
 'v8.home':{title:'บ้านใต้แสงเย็น',text:'คุณผ่านวันธรรมดาและการตัดสินใจในแบบของตนเอง เมื่อถึงปลายอายุขัย บ้านและช่วงเวลาสงบก็มีความหมายเพียงพอแล้ว'},
};
export function v8EndingId(state){
 const {flags,bonds,knowledge}=state.v8;
 if(flags.legacyBook&&knowledge>=50)return 'v8.pages';
 if(flags.legacyRoad&&state.world.visited.length>=2)return 'v8.roads';
 if(flags.legacyGarden&&bonds>=30)return 'v8.garden';
 return 'v8.home';
}
