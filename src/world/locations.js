const entries=[
 ['dawn','หมู่บ้านรุ่งอรุณ','อาร์เวเนีย',80,150,'rural','หมู่บ้านริมธารที่ผู้คนแบ่งเมล็ดพันธุ์และใช้ศาลาร่วมกัน',['rest','work']],
 ['market','ตลาดใบหม่อน','อาร์เวเนีย',155,170,'market','แผงผักและร้านขนมรับซื้อผลผลิตจากสวนรอบหมู่บ้าน',['food','work']],
 ['school','โรงเรียนใต้ต้นไทร','อาร์เวเนีย',120,95,'school','ครูชุมชนให้ยืมกระดานชนวนและสอนอ่านแก่เด็กทุกฐานะ',['study']],
 ['grove','สวนรากแก้ว','อาร์เวเนีย',45,225,'rural','แปลงผักสมุนไพรเปิดให้ช่วยรดน้ำและเรียนรู้ฤดูกาล',['work','rest']],
 ['capital','เมืองสะพานอำพัน','อาร์เวเนีย',215,105,'capital','เมืองคลองที่หอสมุดและลานช่างตั้งอยู่ริมสะพานหิน',['study','food','work']],
 ['mist','ชุมชนผาหมอก','วัลดอร์',320,115,'rural','บ้านหินอิงเขาและไร่ขั้นบันไดอยู่เหนือทะเลหมอก',['rest','work']],
 ['forge','โรงตีเหล็กกังหัน','วัลดอร์',390,105,'forge','ช่างใช้ล้อกังหันช่วยสูบลม เปิดพื้นที่ให้ผู้มาเยือนสังเกตอย่างปลอดภัย',['study','work']],
 ['mine','ลานหินประกาย','วัลดอร์',360,190,'mine','ลานคัดแร่เหนือเหมือง ผู้ดูแลรับงานแยกหินบนผิวดิน',['work']],
 ['pass','ช่องเขาระฆัง','วัลดอร์',280,215,'road','ศาลาระฆังลมเป็นที่พักก่อนข้ามแนวเขา',['rest']],
 ['starfall','หุบเขาดาวตก','เซเลสเทีย',500,125,'rural','ผู้คนเก็บบันทึกดาวที่เห็นจากไร่กลางหุบเขา',['rest','work']],
 ['library','หอสมุดคลื่นแสง','เซเลสเทีย',565,80,'library','หนังสือสำเนาเปิดให้อ่านฟรีในระเบียงแสงเหนือ',['study']],
 ['observatory','ลานดูดาวอรุณ','เซเลสเทีย',630,145,'school','แผนภาพท้องฟ้าช่วยให้ผู้เยือนเรียนรู้ทิศโดยไม่ต้องใช้เวท',['study','rest']],
 ['herb','เรือนยาน้ำค้าง','เซเลสเทีย',545,210,'herb','ผู้ปรุงยาสอนแยกใบไม้ก่อนจัดตำรากลิ่นสมุนไพร',['study','food']],
 ['roots','หมู่บ้านรากแก้ว','ไนท์เวียร์',105,350,'rural','บ้านไม้ล้อมต้นไม้ใหญ่และทางเดินที่คนนำทางดูแล',['rest','work']],
 ['forest','ป่าเฟิร์นเงิน','ไนท์เวียร์',180,320,'forest','เส้นทางธรรมชาติข้างลำธารสำหรับดูนกและเก็บเมล็ดที่ร่วงแล้ว',['study','rest']],
 ['ruins','ลานหอเก่า','ไนท์เวียร์',245,385,'ruins','พื้นที่ภายนอกซากหอมีภาพสลักให้คัดลอก โดยยังไม่เปิดทางใต้ดิน',['study']],
 ['moonport','ท่าเรือแสงจันทร์','อาเคลอน',445,365,'port','เรือประมงเล็กกลับฝั่งพร้อมเสียงเรียกขายปลาทุกเช้า',['food','work','rest']],
 ['fishmarket','ตลาดปลาคราม','อาเคลอน',510,335,'market','ตาชั่งของสหกรณ์เปิดให้ฝึกบันทึกราคาและจัดตะกร้าปลา',['food','work']],
 ['lighthouse','ประภาคารลมใต้','อาเคลอน',590,395,'port','ผู้เฝ้าแสงดูแลบันไดและบันทึกสัญญาณเรือยามเย็น',['study','rest']],
 ['dock','อู่เรือใบแก้ว','อาเคลอน',390,440,'port','ช่างเรือฝึกขัดไม้และผูกเชือกบนฝั่งให้ผู้มาเรียนรู้',['study','work']],
];
export const locations=Object.fromEntries(entries.map(([id,name,region,x,y,tag,description,services])=>[id,{id,name,parent:region,x,y,tags:[tag],description,services,neighbors:[],minAge:0}]));
const links=[['dawn','market',1,0],['dawn','school',1,0],['dawn','grove',1,0],['market','capital',2,2],['capital','mist',4,5],['mist','forge',1,0],['forge','mine',2,1],['mist','pass',2,1],['forge','starfall',4,5],['starfall','library',1,0],['library','observatory',2,1],['starfall','herb',1,0],['grove','roots',4,4],['roots','forest',1,0],['forest','ruins',2,1],['ruins','moonport',5,6],['moonport','fishmarket',1,0],['fishmarket','lighthouse',2,1],['moonport','dock',1,0],['herb','moonport',5,6]];
export const routes=links.map(([from,to,days,gold])=>({from,to,days,gold,minAge:locations[from].parent===locations[to].parent?4:12}));
for(const route of routes){locations[route.from].neighbors.push(route.to);locations[route.to].neighbors.push(route.from);}
export function homeLocation(name){return Object.values(locations).find(l=>l.name===name)?.id??'dawn';}
