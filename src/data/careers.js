// Gameplay profiles. IDs and coefficient tables are independent of translated display labels.
const rows=[
 ['sword','นักดาบ','str',14,'dex',12,'ambition',['smith','soldier'],'ดูแลลานฝึกดาบ',10,'จังหวะคมดาบ','ปรมาจารย์ดาบชุมชน',4,'maxHp',15],
 ['warrior','นักรบ','con',14,'str',12,'caution',['soldier'],'จัดเวรและตรวจเครื่องป้องกัน',11,'หลักยืนมั่น','ผู้พิทักษ์ป้อม',5,'maxHp',20],
 ['mage','นักเวท','int',14,'wis',12,'curiosity',['mage','researcher'],'คัดสำเนาอักขระปลอดภัย',12,'การประสานมานา','นักเวทดวงดาว',3,'maxMana',25],
 ['archer','นักธนู','dex',14,'per',12,'caution',['hunter'],'ดูแลเป้าซ้อมและสายธนู',10,'สายตานิ่ง','ผู้พิทักษ์ลูกศร',4,'maxStamina',15],
 ['healer','นักบวชผู้รักษา','wis',14,'cha',11,'kindness',['healer','herbalist'],'จัดเวรห้องพยาบาล',9,'การเยียวยาอย่างอ่อนโยน','ผู้รักษาชีพจรชีวิต',3,'maxMana',20],
 ['summoner','นักอัญเชิญ','wis',15,'int',12,'kindness',['keeper','mage'],'บันทึกพฤติกรรมภูตคู่สัญญา',11,'คำสัญญากับภูต','ผู้ประสานพันธสัญญา',3,'maxMana',20],
 ['alchemist','นักเล่นแร่แปรธาตุ','int',14,'per',12,'caution',['herbalist','researcher'],'คัดวัตถุดิบห้องทดลอง',12,'สัดส่วนสารพื้นฐาน','ผู้ปรุงสารแสงอรุณ',5,'maxStamina',10],
 ['smith','ช่างตีเหล็ก','str',13,'con',12,'ambition',['smith','inventor'],'ซ่อมอุปกรณ์ครัวเรือน',12,'การอ่านเนื้อโลหะ','ช่างศาสตราประจำเมือง',5,'maxHp',15],
 ['merchant','พ่อค้า','cha',13,'int',11,'caution',['trader','baker'],'ดูแลแผงสินค้าชุมชน',14,'บัญชีและการต่อรอง','ผู้ดูแลเครือข่ายการค้า',7,'maxStamina',10],
 ['scholar','นักวิชาการ','int',14,'wis',12,'curiosity',['librarian','researcher'],'จัดทำดัชนีหอสมุด',10,'การตรวจแหล่งความรู้','นักปราชญ์หอสมุด',4,'maxMana',15],
 ['shadow','นักลอบเร้น','dex',14,'per',13,'caution',['hunter','mystery'],'ตรวจช่องโหว่คลังสินค้าโดยได้รับอนุญาต',13,'ก้าวเงียบและสังเกต','ผู้เฝ้าเงาเมือง',4,'maxStamina',20],
 ['adventurer','นักผจญภัย','per',13,'con',12,'curiosity',['explorer','traveler'],'สำรวจเส้นทางปลอดภัยรอบเมือง',11,'อ่านภูมิประเทศ','ผู้นำคณะสำรวจ',5,'maxStamina',20],
 ['mercenary','ทหารรับจ้าง','str',14,'con',13,'caution',['soldier','traveler'],'ตรวจรายการสัมภาระกองคาราวาน',13,'วินัยสัญญาคุ้มกัน','หัวหน้าผู้คุ้มกันคาราวาน',6,'maxHp',20],
 ['diplomat','นักการทูต','cha',14,'wis',12,'kindness',['noble','royal','trader'],'จดบันทึกประชุมชุมชน',12,'ฟังและประนีประนอม','ทูตสายสัมพันธ์',5,'maxMana',10],
 ['farmer','ผู้ดูแลธรรมชาติ','wis',0,'con',0,'kindness',['farmer','keeper'],'ดูแลสวนและแบ่งผลผลิต',8,'ฟื้นฟูดินและต้นอ่อน','ผู้ฟื้นฟูสวนตำนาน',4,'maxStamina',20],
 ['sailor','นักเดินเรือ','per',13,'dex',12,'curiosity',['sailor','fisher'],'ตรวจเชือกและสมุดน้ำขึ้น',12,'อ่านลมและกระแส','ผู้นำร่องทะเลคราม',6,'maxStamina',15],
 ['inventor','นักประดิษฐ์','int',14,'dex',12,'curiosity',['inventor','smith'],'ซ่อมกลไกใช้ในชุมชน',13,'กลไกและการทดลอง','ผู้ออกแบบกลไกอรุณ',5,'maxMana',15],
 ['musician','นักดนตรีเวท','cha',13,'wis',12,'kindness',['baker','mage'],'บรรเลงดนตรีในศาลาชุมชน',10,'ทำนองประสานมานา','คีตกวีแห่งสายลม',4,'maxMana',20],
 ['beastkeeper','นักฝึกสัตว์','wis',13,'cha',12,'kindness',['keeper','hunter'],'ดูแลสัตว์ที่พักฟื้น',9,'ความไว้วางใจต่างเผ่า','ผู้พิทักษ์ฝูงสัตว์เวท',4,'maxHp',15],
 ['spirit','ผู้ฝึกพลังวิญญาณ','wis',15,'con',12,'caution',['mystery','healer'],'นำฝึกหายใจในศาลาพัก',10,'สมาธิและลมหายใจ','ผู้ประสานจิตวิญญาณ',3,'maxMana',25],
];
export const careers=rows.map(([id,label,primary,minimum,secondary,secondMinimum,memory,backgrounds,job,wage,skill,advancedLabel,advancedPay,resource,resourceBonus])=>({
 id,label,primary,secondary,weights:{[primary]:.65,[secondary]:.35},requirements:{[primary]:minimum,[secondary]:secondMinimum},memory,backgrounds,job,wage,skill,
 advanced:{id:`${id}.master`,label:advancedLabel,minAge:18,minXp:120,minMastery:60,stat:primary,minimum:Math.max(12,minimum+2),payBonus:advancedPay,trainingBonus:1+(advancedPay%3),resource,resourceBonus},
}));
export const getCareer=id=>careers.find(c=>c.id===id);
export const statKeys=['str','dex','con','int','wis','per','luk','cha'];
