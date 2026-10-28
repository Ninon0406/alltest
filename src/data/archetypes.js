import { races } from './birth.js';
import birthLocations from './birth-origin-v2.json' with {type:'json'};
// Frozen generator-v2 birthplace pool. Adding map nodes must never reroll old births.
const rows=[
 ['farmer','ครอบครัวชาวไร่',['rural'],20,'เมล็ดพันธุ์ในหีบไม้','ช่วยเก็บเมล็ดหลังฤดูฝน'],
 ['smith','ครอบครัวช่างตีเหล็ก',['forge','rural'],35,'เครื่องมือเก่าของปู่','เสียงค้อนที่ดังตรงเวลา'],
 ['baker','ครอบครัวคนทำขนม',['market','rural'],25,'เตาอบร่วมชุมชน','ส่งขนมปังให้เพื่อนบ้าน'],
 ['herbalist','ครอบครัวคนทำยา',['herb','rural'],30,'ตู้ใบไม้แห้ง','กลิ่นสมุนไพรในห้องนอน'],
 ['trader','ครอบครัวค้าขาย',['market','capital'],70,'รถเข็นสินค้าขนาดเล็ก','สมุดรายรับของมารดา'],
 ['fisher','ครอบครัวชาวประมง',['port'],25,'แหที่ซ่อมไว้ทุกฤดู','น้ำขึ้นน้ำลงยามเช้า'],
 ['sailor','ครอบครัวนักเดินเรือ',['port'],40,'หีบแผนที่ลม','จดหมายจากท่าเรือต่างแดน'],
 ['hunter','ครอบครัวพรานป่า',['rural'],20,'เสื้อคลุมกันฝน','รู้จักรอยเท้าจากคนในบ้าน'],
 ['inventor','ครอบครัวช่างประดิษฐ์',['capital','forge'],45,'ชิ้นส่วนกังหันจิ๋ว','ของเล่นที่ต้องซ่อมด้วยกัน'],
 ['soldier','ครอบครัวทหาร',['capital','rural'],40,'ตราหน่วยปลดประจำการ','เรื่องเล่าของการกลับบ้าน'],
 ['explorer','ครอบครัวนักสำรวจ',['rural','capital'],35,'แผ่นกระดาษวาดทาง','เรียนรู้ว่าสิ่งใดควรอนุรักษ์'],
 ['librarian','ครอบครัวผู้ดูแลหอสมุด',['library','capital'],30,'หนังสือภาพที่เข้าเล่มใหม่','รอยพับบนหน้าที่ชอบ'],
 ['mage','ครอบครัวนักเวท',['school','capital'],50,'โคมไฟอักขระ','พลังเล็กน้อยในชีวิตประจำวัน'],
 ['healer','ครอบครัวผู้รักษา',['herb','rural'],25,'กล่องผ้าพันแผล','การดูแลเพื่อนบ้านยามป่วย'],
 ['researcher','ครอบครัวนักวิจัย',['library','school'],35,'บันทึกสภาพอากาศ','คำถามที่ไม่มีคำตอบทันที'],
 ['keeper','ครอบครัวผู้ดูแลสัตว์',['rural'],20,'กระดิ่งไม้ขนาดเล็ก','ลูกสัตว์ที่ฝากไว้หน้าบ้าน'],
 ['noble','ครอบครัวขุนนาง',['capital'],140,'ห้องเก็บเอกสารตระกูล','ความรับผิดชอบต่อคนในเมือง'],
 ['royal','ครอบครัวเชื้อพระวงศ์',['capital'],220,'ห้องพักในเขตวัง','ต้องแบ่งเวลาให้พิธีและการเรียน'],
 ['traveler','ครอบครัวนักเดินทาง',['port','rural'],15,'กระเป๋าผ้าซ่อมหลายครั้ง','การมีบ้านมากกว่าหนึ่งแห่ง'],
 ['mystery','ครอบครัวผู้เก็บความลับ',['rural','library'],25,'กล่องที่ยังไม่เปิด','ให้ความสำคัญกับความไว้ใจ'],
];
export const archetypes=rows.map(([id,label,tags,gold,asset,hook])=>({id,label,weight:1,compatibleRaces:races.map(r=>r.id),eligibleLocationTags:tags,socioeconomicProfile:{gold,status:gold>=140?'มีฐานะ':'ดูแลตนเอง'},familyTemplates:[label],storyHooks:[hook],starterAssets:[asset],liabilities:id==='royal'?['หน้าที่ในพิธีของครอบครัว']:['ช่วยดูแลของใช้ในบ้าน'],familyReputation:gold>=140?5:0}));
export function eligibleLocations(archetype){return birthLocations.filter(l=>l.tags.some(tag=>archetype.eligibleLocationTags.includes(tag)));}
export function selectOrigin(seedRandom){
 const archetype=archetypes[Math.floor(seedRandom()*archetypes.length)];
 const pool=eligibleLocations(archetype);
 return {archetype,location:pool[Math.floor(seedRandom()*pool.length)]};
}
