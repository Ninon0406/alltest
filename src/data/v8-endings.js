export const v8Endings={
 'v8.library':{title:'ห้องอ่านที่ไม่ต้องรอผู้เขียน',text:'บันทึกที่คุณตรวจแหล่งที่มา เปิดให้อ่าน และยอมให้คนรุ่นใหม่แก้ไข ได้เดินทางต่อด้วยผู้อ่านของมันเอง เมื่อคุณจากไปตามอายุขัย ห้องอ่านยังต้อนรับคำถามใหม่'},
 'v8.circle':{title:'ตารางเวรที่มีที่ว่างให้พัก',text:'คุณช่วยเริ่มวงอาสาและส่งสิทธิ์ตัดสินใจให้คนรุ่นต่อไป จนถึงปลายอายุขัย สายสัมพันธ์ที่ดูแลไว้ยังทำให้การขอความช่วยเหลือเป็นเรื่องธรรมดา'},
 'v8.fairwork':{title:'งานที่วางใจในสองลายมือ',text:'ใบงานที่คุณแก้ตามจริง บัญชีร่วมที่ตรวจจนปิด และตัวอย่างที่มอบให้ผู้เริ่มใหม่ กลายเป็นวิธีทำงานที่คนอื่นเลือกใช้ต่อ คุณพักจากงานครั้งสุดท้ายเมื่อถึงปลายอายุขัย'},
 'v8.family':{title:'จดหมายที่เว้นที่ให้อีกคน',text:'จากการฟังบนโต๊ะวัยเด็ก สู่ข้อตกลงเมื่อเติบโตและจดหมายที่ต่างคนเติมเรื่องของตนได้ คุณจากไปตามอายุขัยพร้อมความสัมพันธ์ที่ไม่ได้ต้องเห็นตรงกันทุกเรื่อง'},
 'v8.garden':{title:'สวนที่ยังผลิบาน',text:'สวนเล็กและความเอื้อเฟื้อของคุณยังเป็นที่พักให้คนในชุมชน ชีวิตจบลงตามธรรมชาติท่ามกลางสิ่งที่ได้ดูแล'},
 'v8.pages':{title:'หน้ากระดาษที่ส่งต่อ',text:'สมุดที่คุณเรียบเรียงถูกส่งให้คนรุ่นต่อไป คำถามจากชีวิตธรรมดายังชวนให้คนอื่นเรียนรู้ หลังคุณจากไปตามอายุขัย'},
 'v8.roads':{title:'ทางเดินที่มีเรื่องเล่า',text:'คุณได้เห็นบ้านมากกว่าหนึ่งแห่งและนำเรื่องเหล่านั้นกลับมาแบ่งปัน เมื่อถึงปลายอายุขัย เส้นทางที่เลือกยังอยู่ในความทรงจำของผู้คน'},
 'v8.home':{title:'บ้านใต้แสงเย็น',text:'คุณผ่านวันธรรมดาและการตัดสินใจในแบบของตนเอง เมื่อถึงปลายอายุขัย บ้านและช่วงเวลาสงบก็มีความหมายเพียงพอแล้ว'},
};
export function v8EndingId(state){
 const {flags,bonds,knowledge}=state.v8;
 if(flags.researchVerified&&flags.libraryPublished&&flags.schoolLegacy&&knowledge>=60)return 'v8.library';
 if(flags.careCircleStarted&&flags.careCircleShared&&bonds>=50)return 'v8.circle';
 if(flags.documentedWork&&flags.allianceAudited&&flags.workPassedOn&&(state.v8.wagesDue??0)===0)return 'v8.fairwork';
 if(flags.familyListening&&flags.familyReconciled&&flags.familyLetters&&bonds>=35)return 'v8.family';
 if(flags.legacyBook&&knowledge>=50)return 'v8.pages';
 if(flags.legacyRoad&&state.world.visited.length>=2)return 'v8.roads';
 if(flags.legacyGarden&&bonds>=30)return 'v8.garden';
 return 'v8.home';
}
