export const cores = ['FIRE','WATER','WIND','EARTH','LIGHT','SHADOW','BLOOM','ECHO'] as const;
export const forms = ['ORB','RAY','RING','RAIN','WARD','CHAIN'] as const;
export const mods = ['SPLIT','SEEK','GUARD','HEAL','PIERCE','LINGER','AMPLIFY'] as const;
export type Core = typeof cores[number]; export type Form = typeof forms[number]; export type Mod = typeof mods[number];
export const coreNames = ['เพลิง','ธารา','วายุ','ศิลา','อรุณ','รัตติกาล','พฤกษา','เสียงสะท้อน'];
export const formNames = ['ดารา','ลำแสง','วงแหวน','พิรุณ','ปราการ','สายใย'];
export const modNames = ['พันประกาย','นำวิถี','คุ้มครอง','ชีวา','ทะลวง','เนิ่นนาน','จุติ'];
export const colors = [0xf49a66,0x67d9df,0xd2f5f4,0xd9b878,0xffe399,0xb998e3,0x84d69a,0xd4bcf5];
const allowed:Record<Mod, readonly Form[]> = {SPLIT:['ORB','RAY','RAIN','CHAIN'],SEEK:['ORB','RAY','RAIN','CHAIN'],GUARD:['ORB','RING','RAIN','WARD'],HEAL:forms,PIERCE:['ORB','RAY','RAIN','CHAIN'],LINGER:['ORB','RING','RAIN','WARD','CHAIN'],AMPLIFY:forms};
export function legal(c:Core,f:Form,m:Mod) { return allowed[m].includes(f) && (m!=='HEAL'||['WATER','LIGHT','BLOOM'].includes(c)); }
export function spell(c:Core,f:Form,m:Mod,level=1,mastery=0) {
 if(!legal(c,f,m)) throw Error('รูปแบบและตัวปรับไม่เข้ากัน หรือธาตุนี้ไม่สามารถเยียวยาได้');
 const ci=cores.indexOf(c),fi=forms.indexOf(f),mi=mods.indexOf(m);
 const power=Math.max(0,[16,12,13,14,13,15,11,12][ci]+[2,3,-2,-3,-4,-2][fi]+[-2,1,-6,-10,0,-3,5][mi]+Math.floor(level*.5)+mastery*2);
 const support=m==='GUARD'||m==='HEAL'||f==='RING'||f==='WARD';
 return {id:`SPELL_${c}_${f}_${m}`,core:c,form:f,mod:m,name:coreNames[ci]+formNames[fi]+modNames[mi],power,mp:6+[2,3,3,5,4,5][fi]+[3,2,3,5,4,4,6][mi]+(c==='ECHO'?2:['LIGHT','SHADOW'].includes(c)?1:0),hits:m==='SPLIT'?2:1,target:support?(['RAIN','CHAIN'].includes(f)?'party':'self'):(['RAIN','CHAIN'].includes(f)?'multiEnemy':'singleEnemy'),heal:m==='HEAL'?Math.floor(12+power/2)+mastery:0,shield:support&&m!=='HEAL'?Math.floor(10+power/2)+mastery:0,pierce:m==='PIERCE'?.5:0,duration:m==='LINGER'?2:0,status:['SEAR','WET','SWIRL','GROUNDED','GLEAM','VEIL','ROOTED','RESONANCE'][ci],vfx:{color:colors[ci],shape:f,motion:m,duration:700,identity:`${c}/${f}/${m}`}};
}
export const allSpells=cores.flatMap(c=>forms.flatMap(f=>mods.filter(m=>legal(c,f,m)).map(m=>spell(c,f,m))));
export const byId=Object.fromEntries(allSpells.map(s=>[s.id,s]));
export type Spell=ReturnType<typeof spell>;
export const itemNames:Record<string,string> = Object.fromEntries([...cores.map((c,i)=>[`CORE_${c}`,['ถ่านอรุณ','หยดธาราหยก','ขนนกสายลม','หินหัวใจดิน','เกสรอรุณ','แร่ม่านค่ำ','เมล็ดผลิบาน','เศษเสียงสะท้อน'][i]]),...forms.map((f,i)=>[`FORM_${f}`,['ลูกแก้วมณี','เส้นใยดารา','ห่วงใบไม้เงิน','ละอองเมฆ','แผ่นตราผนึก','ข้อเชื่อมประกาย'][i]]),...mods.map((m,i)=>[`MOD_${m}`,['ผงแยกดาว','เข็มทิศแมลงแสง','เปลือกเกราะเถา','น้ำค้างเยียวยา','เขี้ยวผลึกเจาะ','ทรายเวลาอ่อน','ประกายขยายเสียง'][i]])]);
Object.assign(itemNames,{IT_MANA_LEAF:'ใบฟื้นเวท',IT_POTION_DEW:'น้ำค้างฟื้นพลัง',IT_NOTE_LEAF:'โน้ตบนใบไม้',IT_MUSICBOX:'กล่องดนตรี',IT_FOREST_FRUIT:'ผลไม้ป่า',IT_OLD_BELL:'กระดิ่งเก่าจากลำธาร'});
